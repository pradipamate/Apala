import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text, ImageBackground, StyleSheet, Alert, Linking } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Card, CardItem, Body } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import RegisterServices from '../../Services/RegistrationService/RegistrationServices'

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mobileNo: "",
            mobileNoErrMsg: ""
        }
    }

    handleMobileChange = (mobileNo) => {
        const regx = /^(\+\d{2,3}[- ]?)?\d{10}$/
        console.log("regx.test(mobileNo)", regx.test(mobileNo));
        if (mobileNo !== "") {
            if (regx.test(mobileNo)) {
                this.setState({
                    mobileNo: mobileNo,
                    mobileNoErrMsg: ""
                })
            }
            else {
                this.setState({
                    mobileNo: "",
                    mobileNoErrMsg: "Enter Valid Mobile Number."
                })
            }
        }
        else {
            this.setState({
                mobileNo: "",
                mobileNoErrMsg: "Required."
            })
        }
    }

    handleVerify = () => {
        // this.props.navigation.navigate('ChangePassword')
        RegisterServices.forgotPassword(this.state.mobileNo).then(response => {
            console.log("OTPFor change pass========", response)
            if (response) {
                if (response.status == 200) {
                    Alert.alert("Success", "OTP sent Successfully.")
                    this.props.navigation.navigate('OtpAuthResetPassword', { mobileNo: this.state.mobileNo })
                }
                else {
                    Alert.alert("Failure", "Failed to send OTP... Try again")
                }
            }
            else {
                Alert.alert("Failure", "Failed to send OTP... Try again")
            }
        })
    }

    openWhatsApp = () => {
        let url =
            "whatsapp://send?text= Hello" +
            "&phone=918149171510"

        Linking.openURL(url)
            .then(data => {
                console.log("WhatsApp Opened successfully " + data);
            })
            .catch(() => {
                alert("Make sure WhatsApp installed on your device");
            });
    }
    render() {
        return (
            <View>
                <View style={styles.Titleview}>
                    <View style={styles.arrow}>
                        <Icon
                            name='angle-left'
                            size={24}
                            color='#03b38f'
                        />
                    </View>
                    <TouchableOpacity style={styles.help} onPress={this.openWhatsApp}>
                        <Text style={styles.helptext}>SUPPORT</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.logo}>
                    <Image
                        style={styles.image1}
                        source={require('../../Images/logo.png')} />
                </View>

                <View style={styles.backgroundimage}>
                    <ImageBackground source={require('../../Images/shape5-28.png')} style={styles.bground} resizeMode='cover'>
                        <View style={styles.Viewcardpart}>
                            <Card style={styles.Card}>
                                <CardItem >
                                    <Body style={styles.Body}>
                                        <Text style={styles.CardTitle}>FORGOT PASSWORD</Text>

                                        <Input
                                            containerStyle={{ height: 40, marginTop: 10, }}
                                            placeholder="Mobile Number*"
                                            placeholderTextColor="gray"
                                            keyboardType="numeric"
                                            type="number"
                                            maxLength={10}
                                            leftIcon={{ type: 'font-awesome', name: 'mobile', color: "#03b38f" }}
                                            inputContainerStyle={{ borderWidth: 1, fontSize: 12, paddingLeft: '3%', fontSize: 5, borderRadius: 10, borderColor: '#03b38f' }}
                                            inputStyle={{ color: 'black', fontSize: 12 }}
                                            onChangeText={mobileNo => this.handleMobileChange(mobileNo)}
                                        />
                                        <Text></Text>
                                        {this.state.mobileNoErrMsg !== "" ?
                                            <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.mobileNoErrMsg}</Text>
                                            : null}

                                        <TouchableOpacity style={styles.button}
                                            onPress={() => this.handleVerify()}>
                                            <Text style={{ marginHorizontal: '40%', width: '100%', fontSize: 15, marginVertical: '4%', color: '#fff' }}>VERIFY</Text>
                                        </TouchableOpacity>

                                        <View style={styles.line}></View>
                                        <View style={styles.extraoption}>
                                            <View >
                                                <Text>Back to Login</Text>
                                                <View style={styles.extraemailregistrationpart}>
                                                    <Text style={styles.extraoptionfooter} onPress={() => this.props.navigation.navigate('Login')}>Login</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>
                    </ImageBackground>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({

    image1: {
        height: hp('11%'),
        //width: wp('45%'),
        marginLeft: '0%',
        resizeMode: 'contain',
    },
    font12: {
        fontSize: 12
    },
    line: {
        borderWidth: 0.5,
        width: '100%',
        borderColor: '#A9A9A9',
        marginBottom: '3%'
    },
    logo: {
        textAlign: 'center',
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: 'row',
    },
    Titleview: {
        marginTop: hp('3%'),
        marginBottom: hp('4%'),
        marginRight: hp('1%'),
        flexDirection: 'row',
        // flex:1,
        width: '100%',
        justifyContent: 'space-between'
    },
    Title: {
        textAlign: 'right',
        color: '#03b38f',
        textDecorationLine: 'underline',
        // textAlign:'left'
        // justifyContent:'flex-end'
    },
    arrow: {
        // width:'100%',
        // textAlign:'right',
        //justifyContent:'flex-start'

    },
    Card: {
        //borderRadius:10,
        textAlign: 'center',
        textAlign: 'center',
        borderRadius: 20,
        //backgroundColor:'red',
        //marginTop:'-10%',
        paddingTop: '5%',
        paddingBottom: '5%'
    },
    Viewcardpart: {
        marginTop: '60%',
        padding: '5%',
        //width:hp('100%')
        //borderRadius:20,

    },
    help: {
        alignItems: 'flex-end',
        zIndex: 99999
    },
    helptext: {
        marginRight: '5%',
        marginTop: '3%',
        color: '#03B38F',
        fontWeight: 'bold',
        fontSize: 16,
        textDecorationLine: 'underline',
        zIndex: 99999999999,
    },
    Body: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    extraemailregistration: {
        flexDirection: 'column',

    },

    extraoptionfooter: {
        // marginRight: '5%',
        marginTop: '3%',
        color: '#03b38f',
        fontWeight: 'bold',
        fontSize: 16,
        textDecorationLine: 'underline',
        textAlign: "center"
    },
    extraoption: {
        flexDirection: "row",
        // justifyContent: 'space-between',

    },
    bground: {
        //resizeMode:'stretch',
        height: hp('100%'),
        width: wp('100%'),
        //position:'relative',
        marginTop: '-40%',
        // backgroundColor:'red'
        paddingBottom: '10%'
    },

    CardTitle: {
        //flex:1,
        textAlign: 'center',
        //justifyContent:'center',
        fontWeight: 'bold',
        color: '#000',
        marginBottom: '5%'
    },
    extraemailregistrationpart: {
        textAlign: "center"
    },
    button: {
        backgroundColor: '#03b38f',
        alignSelf: 'center',
        borderRadius: 30,
        marginTop: '3%',
        marginBottom: '6%',

    },

})