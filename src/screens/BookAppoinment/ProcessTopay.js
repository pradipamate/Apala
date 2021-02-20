import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, ImageBackground, StyleSheet, FlatList, Switch, Alert, NativeEventEmitter, DeviceEventEmitter } from 'react-native';
import { Container, Header, Title, Content, Card, CardItem, Icon, Item, Label, Button, Thumbnail, Left, Right, Body, Text } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import PaymentApi from '../../Services/PaymentServices/PaymentServices'
import AsyncStorage from "@react-native-community/async-storage";
import BASE_URL from '../../Services/BaseUrl'
import { Platform } from 'react-native';
import Paytm from 'react-native-paytm';
// import Paytm from '@philly25/react-native-paytm';
import Loader from '../../Components/Loader'


export default class ProcessTopay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fees: '',
            userType: '',
            date: '',
            token: '',
            serviceBookingId: "",
            checkSum: "",
            orderId: "",
            loading: false,
            feetype: "",
            data: {}
        }
    }
    // componentWillMount() {
    //     if (Platform.OS == 'ios') {
    //         const { RNPayTm } = NativeModules
    //         const emitter = new NativeEventEmitter(RNPayTm)
    //         emitter.addListener('PayTMResponse', this._handlePaytmResponse)
    //     } else {
    //         DeviceEventEmitter.addListener('PayTMResponse', this._handlePaytmResponse)
    //     }
    // }
    componentWillMount() {
        console.log("Inside componentWillMount");
        Paytm.addListener(Paytm.Events.PAYTM_RESPONSE, this._handlePaytmResponse);
    }

    componentWillUnmount() {
        console.log("Inside componentWillUnmount");
        Paytm.removeListener(Paytm.Events.PAYTM_RESPONSE, this._handlePaytmResponse);
    }

   
    _handlePaytmResponse = (resp) => {
        const { STATUS, status, response } = resp;

        // this.setState({processing: false, payment_text: ''});
        console.log(JSON.stringify(resp));

        if (STATUS == "TXN_SUCCESS") {
            this.setState({
                loading: false
            })
            
            // {data:this.state.data}
            this.handleResponse()
            
        }
        else if (STATUS == "TXN_FAILURE") {
            this.setState({
                loading: false,
                
            })
            // Alert.alert("Failure", "Transaction Failed...Try Again!!")
            this.handleResponse()
        }
        else if(status=="Cancel"){
            this.setState({
                loading: false,
            })
            Alert.alert("Cancel", "Transaction Canceled!!")
        }
    };

    handleResponse=()=>{
        PaymentApi.handleResponse(this.state.orderId, this.state.token).then(response=>{
            console.log("handleResponse=========================",response);
            
            if(response){
                if(response.status==200){
                    Alert.alert(response.data.transaction_status)
                    this.handleRedirect()
                }
            }
        })
    }
    handleRedirect=()=>{
        this.props.navigation.navigate('Booking_sucessfully', {data:this.state.data})
    }

    // _handlePaytmResponse = (resp) => {
    //     const { STATUS, status, response } = resp;

    //     this.setState({ processing: false, payment_text: '' });
    //     console.log(JSON.stringify(resp), resp);
    //     if (resp) {
    //         if (resp.STATUS == "TXN_FAILURE") {
    //             this.setState({
    //                 loading: false,
    //             })
    //             Alert.alert("Failure", "Transaction Failed...Try Again!!")
    //             // this.props.navigation.navigate('Booking_sucessfully', {data:this.state.data})
    //         }
    //         if (resp.STATUS == "TXN_SUCCESS") {
    //             this.setState({
    //                 loading: false
    //             })
    //             Alert.alert("Success", "Transaction Successful!!")
    //             // {data:this.state.data}
    //             // this.props.navigation.navigate('Booking_sucessfully')
    //         }
    //         if (resp.status == "Cancel") {
    //             this.setState({
    //                 loading: false
    //             })
    //             Alert.alert("Failure", "Transaction Canceled!!")
    //             // this.props.navigation.navigate('Booking_sucessfully', {data:this.state.data})
    //         }
    //     }

    // };

    componentDidMount() {
        let data = this.props.navigation.getParam("data", "")


        console.log("data in ProcessToPAy===================", data);
        console.log("token in ProcessToPAy============", data.token);

        this.setState({
            fees: data.fees,
            userType: data.userName,
            feetype: data.feesType,
            date: data.date,
            data: data,
            token: data.token
        })
    }
    // handleMenu = () => {
    //     this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    // }


    callTransactionUrl = (sevice_booking_id) => {

        let transaction_data = {

            transactionfor: this.state.feetype,
            amount: this.state.fees,
            transaction_for_unique_id: parseInt(sevice_booking_id),
            CHANNEL_ID: "WAP",
            CALLBACK_URL: "https://securegw-stage.paytm.in/theia/paytmCallback",
            INDUSTRY_TYPE_ID: "Retail",
            to_guid: this.state.data.item.guid,
            WEBSITE: "APPSTAGING",
            EMAIL: this.state.data.email,
            MOBILE_NO: this.state.data.mobile,

        }

        console.log("transaction_data===========*********************", transaction_data);


        PaymentApi.callTrasaction(this.state.token, transaction_data).then(response => {

            console.log("response in callTrasaction================", JSON.parse(response));

            if (response) {
                let data = JSON.parse(response)

                this.setState({
                    checkSum: data.checkSum,
                    orderId: data.order_id
                })

                this.runTransaction()
            }


        }).catch(err => {
            console.log("Error in callTrasaction============>", err);
        })
    }



    handleProceedRoPay = () => {
        this.setState({
            loading: true
        })

        // this.props.navigation.navigate('ProceedToPay',{data:data})
        let token = this.state.token
        console.log("token--------", token);
        let data = {
            to_guid: this.state.data.item.guid,
            service_id: this.state.feetype,
            appointment_datetime: this.state.data.date + "T11:00:00.246Z",
            slot_id: this.state.data.slot_id,
            business_id: 1,
            symptom: this.state.data.symptom,
        }



        console.log("data==========", data);
        PaymentApi.proceedToPay(token, data).then(response => {
            console.log("response in servicebooking==========", response);

            if (response) {

                this.setState({
                    serviceBookingId: response.data.sevice_booking_id
                })

                this.callTransactionUrl(response.data.sevice_booking_id)


            }
        }, function (err) {
            this.setState({
                loading: false
            })
        })
        // .catch(err=>{
        //     console.log("Error-----------", err);
        //     this.setState({
        //         loading:false
        //     })
        // })



    }

    runTransaction = () => {
        // let callbackUrl = paytmConfig.CALLBACK_URL;

        let { fees, orderId } = this.state;
        const callbackUrl = `https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=${orderId}`
        console.log(callbackUrl);
        const details = {
            mode: 'Staging', // 'Staging' or 'Production'
            MID: "wTjqde89158521893033",
            INDUSTRY_TYPE_ID: "Retail",
            WEBSITE: "APPSTAGING",
            CHANNEL_ID: "WAP",
            TXN_AMOUNT: this.state.fees, // String
            ORDER_ID: this.state.orderId.toString(), // String
            EMAIL: this.state.data.email, // String
            MOBILE_NO: this.state.data.mobile, // String
            CUST_ID: this.state.data.user_guid.toString(), // String
            CHECKSUMHASH: this.state.checkSum, //From your server using PayTM Checksum Utility 
            CALLBACK_URL: callbackUrl
            //  MERC_UNQ_REF: mercUnqRef, // optional



        };


        console.log("detiles============================================", details);
        Paytm.startPayment(details);


    }

    // {
    //             "to_guid": "9e7a71e0-3303-486e-9d8f-e4ebae8d9d85",

    //             "service_id":"appointment", //service options video,chat,appointment
    //             // "patient_id":140, //if booking for relative
    //              "appointment_datetime":"", //if apointment sheduled
    //               "slot_id":0 ,  // if apointment sheduled
    //              "business_id":0, //if offline apointment taken
    //               "symptom":"headche",

    //        }




    render() {
        console.log("this.state======================", this.state);
        return (
            <Container style={{ backgroundColor: '#f9f9f9' }}>
                <Loader loading={this.state.loading} />
                <ScrollView>
                    <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
                        <Left style={{ marginLeft: '2%' }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('BookAppoinment')}>
                                <Icon name='arrow-back' size={18} style={{ padding: 0, color: '#fff' }} />
                            </TouchableOpacity>
                        </Left>
                        <Right>
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
                            //  onPress={() => this.props.navigation.('NotificationTab')}
                            >
                                <Icon3 name='star-outline' color='#fff' size={24} style={{ marginRight: '8%' }} />
                                <Icon3 name='share-variant' color='#fff' size={22} style={{ marginRight: '8%' }} />
                                <Icon3 name='bell' color='#fff' size={22} style={{ marginRight: '8%' }} />
                                <Icon3 name='dots-vertical' color='#fff' size={24} />
                            </TouchableOpacity>
                        </Right>

                    </Header>
                    <View style={{ backgroundColor: '#D1E9E2', padding: 40, justifyContent: 'center', flexDirection: 'row' }}>
                        <Text><FontAwesomeIcon name='inr' color='#03b38f' size={40} style={{ marginLeft: '15%' }} />
                            <Text style={{ fontSize: 50, fontWeight: 'bold', color: '#03b38f', }}>{this.state.fees}</Text>
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: '5%', borderRadius: 20, marginVertical: '8%' }}>
                        <Card style={{ borderRadius: 20, }}>
                            <CardItem style={styles.cardItem}>
                                <Text style={{ color: "blue", fontWeight: 'bold', marginTop: '2%', marginBottom: '2%', fontSize: 17 }}>WHY CHOOSE AAPKA DOCTOR?</Text>
                                <View style={{ marginTop: '-8%', marginBottom: '-8%' }} >
                                    <Image resizeMode='contain'
                                        style={{ width: 120, height: 120, borderRadius: 20 }}
                                        source={require('../../Images/logo.png')} />
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ width: '20%' }}>
                                        <Image
                                            square
                                            style={{ height: 40, width: 40, resizeMode: 'contain' }}
                                            source={require('../../Images/piggi.png')}
                                        />
                                    </View>
                                    <View style={{ width: '80%' }}>
                                        <Text style={styles.titles}>
                                            EASY TO USE & SAVES YOUR VALUABLE TIME
                                                </Text>
                                    </View>
                                </View>

                                <View style={styles.line6}></View>

                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ width: '20%' }}>
                                        <Image
                                            square
                                            style={{ height: 40, width: 40, resizeMode: 'contain' }}
                                            source={require('../../Images/saving.png')}
                                        />
                                    </View>
                                    <View style={{ width: '80%' }}>
                                        <Text style={styles.titles}>
                                            APPOINTMENTS AT RESONABLE COSTS
                                            </Text>
                                    </View>
                                </View>

                                <View style={styles.line6}></View>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ width: '20%' }}>
                                        <Image
                                            square
                                            style={{ height: 40, width: 40, resizeMode: 'contain' }}
                                            source={require('../../Images/award.png')}
                                        />
                                    </View>
                                    <View style={{ width: '80%' }}>
                                        <Text style={styles.titles}>
                                            DIAGNOSED BY REPUTED & RENOUNED DOCTORS
                                            </Text>
                                    </View>
                                </View>
                                <View style={styles.line6}></View>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ width: '20%' }}>
                                        <Image
                                            square
                                            style={{ height: 40, width: 40, resizeMode: 'contain' }}
                                            source={require('../../Images/proof.png')}
                                        />
                                    </View>
                                    <View style={{ width: '80%' }}>
                                        <Text style={styles.titles}>
                                            POPULAR & BEST HOSPITALS {"\n"}IN THE
                                            CITY ARE ASSOCIATED{"\n"} WITH
                                            APKA DCOTOR
                                            </Text>
                                    </View>
                                </View>
                            </CardItem>
                        </Card>
                    </View>

                    <View>
                        <View style={styles.ImageBackground} >
                            <Image resizeMode='contain'
                                style={{ width: 320, height: 250, borderRadius: 20 }}
                                source={require('../../Images/Booknow.png')} />
                        </View>
                        <View style={styles.bannerheader}>
                            <View>
                                <Text style={styles.bannerheaderTitle}>
                                    Pay Online & Get{"\n"}
                                        Flat 50% OFF</Text>
                            </View>
                            <View>
                                <Text style={styles.hurryup}>    HURRY UP!!</Text>
                            </View>
                            <Text style={styles.payonline}>
                                Pay Online
                                    </Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: '5%' }}>
                        <TouchableOpacity style={styles.okbutton}
                            onPress={() => this.handleProceedRoPay()}>
                            <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Proceed to Pay</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Container>
        )
    }

}
const styles = StyleSheet.create({
    //Container:{  padding: 10},

    lastsection: { padding: 10 },

    card: { flex: 0, backgroundColor: '#fff' },
    cardItem: {
        borderRadius: 10,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3,
            flexWrap: 'wrap',

        },
        elevation: 5,
        shadowOpacity: 0.21, flexDirection: 'column', justifyContent: 'center', textAlign: 'center'
    },
    line6: {
        borderColor: '#ccc',
        borderWidth: .4,
        marginTop: '2%',
        marginBottom: '2%',
        width: '100%'
    },
    titles: {
        fontWeight: 'bold',
        color: "#03b38f",
        flexWrap: 'wrap',
        flex: 1,
    },
    ImageBackground: { position: 'relative', justifyContent: 'center', flexDirection: 'row', marginTop: '-10%' },
    bannerheader: { position: 'absolute', right: '10%', top: '5%' },
    bannerheaderTitle: { fontSize: 20, width: '100%', color: 'blue', fontWeight: 'bold', fontStyle: 'italic', },
    hurryup: { textAlign: 'left', color: 'red', fontWeight: 'bold', fontSize: 20, marginTop: '5%', fontStyle: 'italic', },
    okbutton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#03b38f',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: '4%',
        marginTop: '4%',
        padding: 10,
        width: '100%', marginHorizontal: '5%'
    },
    payonline: {
        fontWeight: 'bold',
        fontSize: 30, fontStyle: 'italic', marginTop: '25%', marginLeft: '-10%'
    }
})