import React, { Component, useRef, useState, useEffect } from "react";
import {
    View, ScrollView, TouchableOpacity,
    Image, ImageBackground, StyleSheet, FlatList,
    Switch, Alert, Modal, TextInput, Dimensions, SafeAreaView, StatusBar,
    PermissionsAndroid
} from 'react-native';
import { Container, Header, Title, Content, Card, CardItem, Icon, Item, Label, Button, Thumbnail, Left, Right, Body, Text } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons'


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

import * as signalR from '@aspnet/signalr';


export const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://svcaapkadoctor.azurewebsites.net/groupchat",
        {
            accessTokenFactory: () => AsyncStorage.getItem("Token").then(userInfo => userInfo),
            transport: signalR.HttpTransportType.LongPolling | signalR.HttpTransportType.WebSockets
        })
    .build();

export default class Video extends Component {
    constructor(props) {
        super(props)

        this.state = {
            localStream: null,
            remoteStream: null,
            stringGuid: "",
            OpposieUserID: ''
        }

        this.sdp
        this.candidates = []
    }

    bootstrapAsyncUserToken = async () => {
        return {
            token: await AsyncStorage.getItem('Token')
        };
    };


    componentDidMount = () => {

        let stringUser = ""
        let globVar = ""
        let _base = this;
        // let docdata = AsyncStorage.getItem("doctorName").then(function (docname) {
        //     console.log("param data---------------", docname);
        //     stringUser = docname
        // })


        // const token = AsyncStorage.getItem('Token');
        // console.log("SignalR token--------->>>>", token)


        let ddata = connection.on('SendSignal', (remoteuser, sdp) => {
            console.log("got remote user-------------------->>", remoteuser)
            this.sdp = JSON.parse(sdp)


            this.pc.setRemoteDescription(new RTCSessionDescription(this.sdp))



        })

        // connection.on('SendSignal', (remoteuser, sdp) => {
        //     console.log("got remote user-------------------->>", sdp)
        //     this.sdp = JSON.stringify(sdp)

        //         this.pc.addIceCandidate(new RTCIceCandidate(this.sdp))

        // })

        connection.on('candidate', (user, candidate) => {
            console.log("got candidate-------------------->>", user)

            this.setState({
                OpposieUserID: user
            })
            this.sdp = JSON.parse(candidate)

            this.pc.addIceCandidate(new RTCIceCandidate(this.sdp))

        })

        if (connection.state != signalR.HubConnectionState.Connected) {
            // console.log("going-----------------")


            connection.start().then(function () {


                connection.send('join', "Patient").then(function () {
                    // console.log("in condition------------>>>>", stringUser);
                })

                connection.on('generatedUserId', (userId) => {
                    console.log("got userid-------------------->>", userId);
                    _base.createOffer()

                })

            })
            // this.createOffer();


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

                // this.sendToPeer('candidate', e.candidate)
                console.log("on ice candidate-------------->>.", e)
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
        let _base = this;
        let serializePayload = JSON.stringify(payload)

        let docdataid = AsyncStorage.getItem("docguid").then(function (success) {
            console.log("value--------------->>>", success)
            // if (messageType == "SendSignal") {
            console.log("message type sendsignal--------------->>>", messageType)
            connection.send(messageType, serializePayload, success)
            // } 
            // else {
            //     console.log("message type--------------->>>", _base.state.OpposieUserID)
            //     connection.send(messageType,serializePayload,_base.state.OpposieUserID)
            // }

        })


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
                // <View style={{ padding: 15,flex:1,width:'100%'}}>
                <View>
                    <Text style={{ fontSize: 22, textAlign: 'center', color: 'white' }}>Waiting for Doctor ...</Text>
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
                    }}>
                        <View style={{ flex: 1 }}>
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
                            // flex: 1,
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
            </SafeAreaView>
        );
    }
};

// const styles = StyleSheet.create({
//     buttonsContainer: {
//         flexDirection: 'row',
//     },
//     button: {
//         margin: 5,
//         paddingVertical: 10,
//         backgroundColor: 'lightgrey',
//         borderRadius: 5,
//     },
//     textContent: {
//         fontFamily: 'Avenir',
//         fontSize: 20,
//         textAlign: 'center',
//     },
//     videosContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//     },
//     rtcView: {
//         width: 300,
//         height: 200,
//         backgroundColor: 'black',
//     },
//     scrollView: {
//         flex: 1,

//         backgroundColor: 'teal',
//         padding: 15,
//     },
//     rtcViewRemote: {
//         width: dimensions.width - 30,
//         height: 200,
//         backgroundColor: 'green',
//     }
// });


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
        // position: 'relative'
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
    // buttonswitch: {
    //     position: 'absolute',
    //     zIndex: 9999,
    //     justifyContent: 'center',
    //     borderRadius: 10,
    //     bottom: 0,
    //     marginLeft: '50%',
    //     marginRight: "20%",
    //     backgroundColor: 'red',

    // },
});




