import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet, Alert, Dimensions, SafeAreaView, StatusBar, Modal } from 'react-native';
import { Text } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import AsyncStorage from '@react-native-community/async-storage';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons'


import * as signalR from '@aspnet/signalr';
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
} from 'react-native-webrtc';
const dimensions = Dimensions.get('window')
let oppositeuserid = ""

export const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://svcaapkadoctor.azurewebsites.net/groupchat",
        {
            accessTokenFactory: () => AsyncStorage.getItem("Token").then(userInfo => userInfo),
            transport: signalR.HttpTransportType.LongPolling | signalR.HttpTransportType.WebSockets
        })
    .build();

export default class Chat extends Component {

    constructor(props) {
        super(props)

        this.state = {
            localStream: null,
            remoteStream: null,
            stringGuid: "",
            OpposieUserID: '',
            modalVisible: false,
        }

        this.sdp
        this.candidates = []
    }



    componentDidMount = () => {

        let stringUser = ""
        let globVar = ""
        let OID = ''

        let docdata = AsyncStorage.getItem("doctordata").then(function (docname) {
            console.log("param data---------------", docname);
            stringUser = docname
        })


        // const token = AsyncStorage.getItem('token');
        // console.log("SignalR token--------->>>>", token)

        connection.on('SendSignal', (user, sdp) => {
            console.log("got remote user-------------------->>", user)

            this.setState({
                OpposieUserID: user
            })
            this.sdp = JSON.parse(sdp)
            if (this.sdp.sdp) {

                this.setState({
                    modalVisible: true
                })
                this.pc.setRemoteDescription(new RTCSessionDescription(this.sdp))
            }
        })


        connection.on('candidate', (user, candidate) => {
            console.log("got candidate-------------------->>", user)

            this.sdp = JSON.parse(candidate)
            this.pc.addIceCandidate(new RTCIceCandidate(this.sdp))

        })



        if (connection.state != signalR.HubConnectionState.Connected) {

            connection.start().then(function () {


                connection.send('join', "doctor").then(function () {
                })

                connection.on('generatedUserId', (userId) => {
                    console.log("generatedUserId userid-------------------->>", userId)
                })

            })

        }



        const pc_config = {
            "iceServers": [
                { "urls": "stun:stun.l.google.com:19302" },
                {
                    "urls": "stun:numb.viagenie.ca",
                    "username": "info@aapkadoctor.org",
                    "credential": "doctoraapka"
                },
                {
                    "urls": "turn:numb.viagenie.ca",
                    "username": "info@aapkadoctor.org",
                    "credential": "doctoraapka"
                }
            ]
        }

        this.pc = new RTCPeerConnection(pc_config)

        this.pc.onicecandidate = (e) => {

            if (e.candidate) {

                this.sendToPeer('candidate', e.candidate)
            }
        }


        this.pc.oniceconnectionstatechange = (e) => {
            console.log(e)
        }

        this.pc.onaddstream = (e) => {

            this.setState({
                remoteStream: e.stream
            })
        }

        const success = (stream) => {
            console.log(stream.toURL())
            this.setState({
                localStream: stream
            })
            this.pc.addStream(stream)
        }

        const failure = (e) => {
            console.log('getUserMedia Error: ', e)
        }

        let isFront = true;
        mediaDevices.enumerateDevices().then(sourceInfos => {
            console.log(sourceInfos);
            let videoSourceId;
            for (let i = 0; i < sourceInfos.length; i++) {
                const sourceInfo = sourceInfos[i];
                if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
                    videoSourceId = sourceInfo.deviceId;
                }
            }

            const constraints = {
                audio: true,
                video: {
                    mandatory: {
                        Width: 500,
                        Height: 500,
                        minFrameRate: 30,
                        zIndex: 5
                    },
                    facingMode: (isFront ? "user" : "environment"),
                    optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
                }
            }

            mediaDevices.getUserMedia(constraints)
                .then(success)
                .catch(failure);
        });


    }


    sendToPeer = (messageType, payload) => {
        let serializePayload = JSON.stringify(payload)

        console.log("message type--------------->>>", messageType)

        if (messageType == "SendSignal") {

            connection.send(messageType, serializePayload, this.state.OpposieUserID)
        } else {
            connection.send(messageType, serializePayload, this.state.OpposieUserID)
        }


    }
    createOffer = () => {
        console.log('Offer')

        this.pc.createOffer({ offerToReceiveVideo: 1 })
            .then(sdp => {

                this.pc.setLocalDescription(sdp)

                this.sendToPeer('SendSignal', sdp)
            })
    }

    createAnswer = () => {
        this.setState({ modalVisible: !this.state.modalVisible })
        console.log('Answer')
        this.pc.createAnswer({ offerToReceiveVideo: 1 })
            .then(sdp => {
                this.pc.setLocalDescription(sdp)

                this.sendToPeer('SendSignal', sdp)
            })
    }

    setRemoteDescription = () => {

        const desc = JSON.parse(this.sdp)
        this.pc.setRemoteDescription(new RTCSessionDescription(desc))
    }

    addCandidate = () => {

        this.candidates.forEach(candidate => {
            console.log(JSON.stringify(candidate))
            this.pc.addIceCandidate(new RTCIceCandidate(candidate))
        });
    }
    render() {
        const {
            localStream,
            remoteStream,
        } = this.state

        const remoteVideo = remoteStream ?
            (
                <RTCView
                    key={2}
                    mirror={true}
                    style={{ ...styles.rtcViewRemote }}
                    objectFit='cover'
                    streamURL={remoteStream && remoteStream.toURL()}
                />
            ) :
            (
                <View>
                    <Text style={{ fontSize: 22, textAlign: 'center', color: 'white' }}>Waiting ...</Text>
                </View>
            )

        return (

            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor="green" barStyle={'light-content'} />
                {/* <View style={{ ...styles.buttonsContainer }}>
                    <View style={{ flex: 1, }}>
                        <TouchableOpacity onPress={this.createOffer}>
                            <View style={styles.button}>
                                <Text style={{ ...styles.textContent, }}>Call</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, }}>
                        <TouchableOpacity onPress={this.createAnswer}>
                            <View style={styles.button}>
                                <Text style={{ ...styles.textContent, }}>Answer</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> */}
                <View style={{ ...styles.videosContainer, }}>
                    <View style={{
                         position: 'absolute',
                        zIndex: 9999,
                        bottom: 10,
                        width: wp('100%'),
                        height: hp('50%'),
                        //backgroundColor: 'black',
                    }}>
                        <View style={{ flex: 1 }} >
                            <TouchableOpacity onPress={() => localStream._tracks[1]._switchCamera()}>
                                <View>
                                    <RTCView
                                         zIndex={2}
                                        key={1}
                                        zOrder={0}
                                        objectFit='cover'
                                        style={{ ...styles.rtcView }}
                                        streamURL={localStream && localStream.toURL()}
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonend}>
                                <Icon1 name='call-end' style={{ color: 'white', fontSize: 30 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView style={{ ...styles.scrollView }}>
                        <View style={{
                          height:hp('50%'),
                            position: "relative",
                            width: wp('100%'),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            {remoteVideo}
                        </View>
                    </ScrollView>
                </View>

                <Modal
                    //style={styles.modal}
                    animationType="slide"
                    coverScreen={true}
                    backdropOpacity={0.70}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }} >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{ marginTop: '5%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: '5%' }} >
                                    <View style={{ backgroundColor: 'red', padding: 8, borderRadius: 10 }} >
                                        <Text style={{ color: "#fff", padding: 5, fontWeight: 'bold' }} onPress={() => this.setState({ modalVisible: !this.state.modalVisible })} >Reject</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#03b38f', padding: 8, borderRadius: 10, marginRight: '5%' }} >
                                        <Text style={{ color: "#fff", padding: 5, fontWeight: 'bold' }} onPress={() => this.createAnswer()}> Accept</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        // zIndex:99999,
    },
    modalView: {
        width: '100%',
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 2
        },
        backgroundColor: '#f9f9f9',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    button: {
        margin: 5,
        paddingVertical: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 5,
    },
    textContent: {
        fontFamily: 'Avenir',
        fontSize: 20,
        textAlign: 'center',
    },
    videosContainer: {
        flex: 1,
        zIndex: 9999,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'green'
    },
    rtcView: {
        width: wp('100%'),
        height: hp('100%'),
        // zIndex: 10,
        // backgroundColor: 'black',

    },
    scrollView: {
        flex: 1,
        backgroundColor: 'teal',
        // padding: 0,
    },
    rtcViewRemote: {
        width: wp('100%'),
        height: hp('50%'),
        zIndex: -1,
        // backgroundColor: 'black',
    },
    buttonend: {
        // flexDirection:'column',
        position: 'absolute',
        zIndex: 9999,
        justifyContent: 'center',
        borderRadius: 12,
        padding:6,
        bottom: 0,
        // marginTop: '60%',
        marginLeft: '45%',
        marginRight: "45%",
        backgroundColor: 'red',

    },
});
