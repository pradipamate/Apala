import React, { Component, useRef, useState, useEffect } from "react";
import {
    View, ScrollView, TouchableOpacity,
    Image, ImageBackground, StyleSheet, FlatList,
    Switch, Alert, Modal, TextInput, Dimensions, SafeAreaView, StatusBar,
    PermissionsAndroid, Text
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

import AsyncStorage from '@react-native-community/async-storage';
import Icon1 from 'react-native-vector-icons/Entypo'



const dimensions = Dimensions.get('window')
import { GiftedChat } from 'react-native-gifted-chat'
import * as signalR from '@aspnet/signalr';
import Axios from "axios";


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
            messages: []
        }
        this.onSend = this.onSend.bind(this);
        this.getChatHistory = this.getChatHistory.bind(this);
        this.forReceivedMsg = this.forReceivedMsg.bind(this);

        this.sdp
        this.candidates = []
    }

    bootstrapAsyncUserToken = async () => {
        return {
            token: await AsyncStorage.getItem('Token')
        };
    };


    componentDidMount = () => {
        this.getChatHistory();
        let stringUser = ""
        let globVar = ""

        let docdata = AsyncStorage.getItem("doctordata").then(function (docname) {
            stringUser = docname
        })


        const token = AsyncStorage.getItem('Token');


        connection.on('messageReceived', (remoteuser, messagefrom) => {
            console.log("got message-------------------->>", messagefrom)

            this.forReceivedMsg(messagefrom.message);
        })


        if (connection.state != signalR.HubConnectionState.Connected) {


            connection.start().then(function () {


                connection.send('join', "nameOfUser").then(function () {
                })

                connection.on('generatedUserId', (userId) => {
                    console.log("got userid-------------------->>", userId)
                })
            })
        }
    }

    renderCustomView(props) {
        return (
            <View style={styles.footerContainer}
            >
                <Icon1 name='upload' style={{ color: 'blue', fontSize: 30 }}
                onPress={this.selectFileToUpload} />
            </View>

        );
    }

    selectFileToUpload(){
        console.log("file press-----------------------------")
        try {
            const res =  DocumentPicker.pickMultiple({
              //Provide which type of file you want user to pick
              type: [DocumentPicker.types.allFiles],
              //There can me more options as well
              // DocumentPicker.types.allFiles
              // DocumentPicker.types.images
              // DocumentPicker.types.plainText
              // DocumentPicker.types.audio
              // DocumentPicker.types.pdf
            });
            //Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
            console.log('res : ' + res[0].type);
            //Setting the state to show single file attributes
            if (res) {
            //   setSingleFile(res);
            }
      
          } catch (err) {
            setSingleFile([]);
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
              //If user canceled the document selection
              alert('Canceled from single doc picker');
            } else {
              //For Unknown Error
              alert('Unknown Error: ' + JSON.stringify(err));
              throw err;
            }
        }
    }

    componentWillMount() {
        // this.getChatHistory();
    }

    getChatHistory = (messagefrom) => {
        let receiverguid = ""
        let token = ""
        let opositmsg = " "
        let ownmsg = " "
        let _base = this
        let tokenof = AsyncStorage.getItem('Token').then(function (tokendoc) {
            token = tokendoc


            let mdata = AsyncStorage.getItem("fromguid").then(function (docguid) {
                console.log("to chat id------------------------->>>", docguid)
                receiverguid = docguid


                console.log('https://svcaapkadoctor.azurewebsites.net/chat/history/' + receiverguid)
                fetch(

                    'https://svcaapkadoctor.azurewebsites.net/chat/history/' + receiverguid,
                    {

                        method: 'GET',
                        headers: {

                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + token,
                        },
                    },
                )
                    .then((response) => response.json())
                    .then(function (response) {

                        let messagehistory = response.map(function (success) {
                            console.log("message history--------------------------->>", success)
                            let msgdataaa = AsyncStorage.getItem("fromguid").then(function (idoduser) {
                                if (success.fromId == idoduser) {
                                    ownmsg = success.message
                                    console.log("my message-------------------", ownmsg)

                                    _base.setState((previousState) => {
                                        return {
                                            messages: GiftedChat.append(previousState.messages, {
                                                _id: Math.round(Math.random() * 1000000),
                                                text: ownmsg,
                                                createdAt: new Date(),
                                                user: {
                                                    _id: 1,
                                                    name: 'React Native',
                                                    // avatar: 'https://facebook.github.io/react/img/logo_og.png',
                                                },
                                            }),
                                        };
                                    });

                                } else {
                                    opositmsg = success.message
                                    console.log("oposit message----------------", opositmsg)


                                    _base.setState((previousState) => {
                                        return {
                                            messages: GiftedChat.append(previousState.messages, {
                                                _id: Math.round(Math.random() * 1000000),
                                                text: opositmsg,
                                                createdAt: new Date(),
                                                user: {
                                                    _id: 2,
                                                    name: 'React Native',
                                                    // avatar: 'https://facebook.github.io/react/img/logo_og.png',
                                                },
                                            }),
                                        };
                                    });
                                }

                            })
                        });



                    }, function (err) {
                        console.log("errr=--------------------->>>", err)
                    })

            })
        })
    }
    forReceivedMsg(messagefrom) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, {
                    _id: Math.round(Math.random() * 1000000),
                    text: messagefrom,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        // avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                }),
            };
        });

    }

    onSend(messages = []) {
        this.setState((previousState) => {
            console.log("previous state messages-------------->>>", previousState.messages)
            return {

                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
        let toguid = ""
        let mdata = AsyncStorage.getItem("docguid").then(function (docguid) {
            console.log("to id------------------------->>>", docguid)
            toguid = docguid
        })
        let msgdata = AsyncStorage.getItem("fromguid").then(function (idoduser) {


            let msgtoSend = {
                type: 1,
                fromId: idoduser,
                toId: toguid,
                message: messages[0].text,
                dateSent: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                dateSeen: new Date(Date.UTC(2016, 7, 30, 17, 20, 0))
            }
            connection.send("sendMessageToGuid", msgtoSend).then(function (success) {
                console.log("message sent--------------------->>>", msgtoSend)
            }, function (err) {
                console.log("message can not sent------------->>>", err)
            })
            // })
        })


    }

    render() {
        return (

            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={{
                    _id: 1,
                    name: 'User Test'
                }}
                showUserAvatar
                renderChatFooter ={this.renderCustomView}
            />


        );
    }
};


const styles = StyleSheet.create({
    footerContainer: {
      marginTop: 5,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 0,
    },
   
  });