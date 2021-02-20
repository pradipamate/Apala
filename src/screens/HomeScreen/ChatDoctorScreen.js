import React, { Component, useRef, useState, useEffect } from "react";
import {
    Text,
    Dimensions,
    BackHandler
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const dimensions = Dimensions.get('window')
import { GiftedChat } from 'react-native-gifted-chat'
import * as signalR from '@aspnet/signalr';
import { View } from "native-base";


export const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://svcaapkadoctor.azurewebsites.net/groupchat",
        {
            accessTokenFactory: () => AsyncStorage.getItem("Token").then(userInfo => userInfo),
            // transport: signalR.HttpTransportType.LongPolling | signalR.HttpTransportType.WebSockets
        })
    .build();

export default class DoctorChat extends Component {
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

    // bootstrapAsyncUserToken = async () => {
    //     return {
    //         token: await AsyncStorage.getItem('Token')
    //     };
    // };





    componentDidMount = () => {

        let stringUser = ""
        let globVar = ""

        this.getChatHistory()
        let docdata = AsyncStorage.getItem("doctordata").then(function (docname) {
            stringUser = docname
        })


        const token = AsyncStorage.getItem('token');


        connection.on('messageReceived', (remoteuser, messagefrom) => {
            console.log("got message-------------------->>", messagefrom)

            this.forReceivedMsg(messagefrom.message);

        })


        if (connection.state != signalR.HubConnectionState.Connected) {


            connection.start().then(function () {


                connection.send('join', "Dr R").then(function () {
                    console.log("joined---------------------------->>>")
                })

                connection.on('generatedUserId', (userId) => {
                    console.log("got userid-------------------->>", userId)
                })
            })
        }
    }



    onSend(messages = []) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(this.state.messages, messages),
            };
        });
        let msgdata = AsyncStorage.getItem("fromguid").then(function (idoduser) {
            let mdata = AsyncStorage.getItem("userguid").then(function (docguid) {

                let msgtoSend = {
                    type: 1,
                    fromId: docguid,
                    toId: idoduser,
                    message: messages[0].text,
                    dateSent: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                    dateSeen: new Date(Date.UTC(2016, 7, 30, 17, 20, 0))
                }

                connection.send("sendMessageToGuid", msgtoSend).then(function (success) {
                    console.log("message sent--------------------->>>", msgtoSend)
                }, function (err) {
                    console.log("message can not sent------------->>>", err)
                })
            })
        })
    }

    getChatHistory = (messagefrom) => {
        let receiverguid = ""
        let token = ""
        let opositmsg = " "
        let ownmsg = " "
        let _base = this
        let tokenof = AsyncStorage.getItem('Token').then(function (tokendoc) {
            token = tokendoc

            if (token) {


                let mdata = AsyncStorage.getItem("fromguid").then(function (idoduser) {
                    console.log("to chat id------------------------->>>", idoduser)
                    receiverguid = idoduser


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
            }
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

    render() {
        return (

            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={{
                    _id: 1,
                    name: 'Doctor '
                }}
            />

        );
    }
};