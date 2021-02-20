import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text, ImageBackground, StyleSheet, Alert, TextInput, ScrollView, Linking, PermissionsAndroid } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Container, Header, Title, Content, Card, CardItem, Body } from 'native-base';
import OTPTextView from 'react-native-otp-textinput'
import AsyncStorage from '@react-native-community/async-storage';
import RegistrationServices from '../../Services/RegistrationService/RegistrationServices'
import Loader from '../../Components/Loader'

// import SmsListener from 'react-native-android-sms-listener'


// let msListener =  SmsListener.addListener(message => {
//   alert("233333333333333333#######################",message);
//   console.log(message);
// });


//import SmsRetriever from 'react-native-sms-retriever';

export default class OtpAuth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      OTP: '',
      mobileNo: 0,
      loading: false,
      
    }
    this.SMSReadSubscription = {};
  }




  // requestReadSmsPermission=async()=>{
  //   try {
  //     await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_SMS,
  //       {
  //         title: "(...)",
  //         message: "Why you're asking for..."
  //       }
  //     );
  //   } catch (err) {}

  // }

  async componentDidMount() {
    // let subscription = SmsListener.addListener(message => {
    //   console.info("message@@$$$$$$$$$$$$$$$$",message)
    // })

    let mobileNo = this.props.navigation.getParam('mobileNo', "");
    this.setState({
      mobileNo: mobileNo,
      // loading:true
    });

    // this.requestReadSmsPermission();

    console.log("before otp-------------->>>>")
    //   this.SMSReadSubscription = SmsListener.addListener(message => {
    //   console.log("Message44444444444444444444444^^^^^^^:", message);
    //   //message.body will have the message.
    //   //message.originatingAddress will be the address.
    // });


    //   SmsListener.addListener(message => {
    //     alert("233333333333333333#######################",message);
    //     console.log(message);
    // });


    // const registered = await SmsRetriever.startSmsRetriever();
    // console.log("registered@$$$$$$$$$$$$$$$",registered);
    // if (registered) {
    //   //  SmsRetriever.addSmsListener(event => {
    //   //   console.log("@$$$$$$$$$$$$%%%%%%%%%%%%",event.message);
    //   //   SmsRetriever.removeSmsListener();
    //   SmsRetriever.addSmsListener(this.onReceiveSms);  
    //   // });
    //  }
  }

  // onReceiveSms = (event) => {
  //   console.log("event2344444444444444",event);
  //   SmsRetriever.removeSmsListener();
  // };





  handleVerify = () => {
    let data = {
      mobile: this.state.mobileNo,
      otp: this.state.OTP
    }
    // console.log("data in verify otp======>",data);
    RegistrationServices.verifyOTP(data).then(response => {
      console.log("response in VerifyOTP=============>>>>>>>>>", response, ">>>>>>>>>>>>>>>>", response.data.token)
      if (response) {
        if (response.status == 200) {
          let token = response.data.token
          AsyncStorage.setItem("token", token)
          this.props.navigation.navigate('Register', { mobileNo: this.state.mobileNo, token: response.data.token })
          this.setState({
            OTP: "",
            loading: false
          })
          Alert.alert("Success",
            "OTP Verified Successfully !!")
        }
      }
      else {
        this.setState({
          OTP: "",
          loading: false
        })
        Alert.alert("Error",
          "Fialed to Verify OTP !!")
      }

    }).catch((e) => {
      this.setState({
        OTP: "",
        loading: false
      })
      Alert.alert("Error", e)

    })
  }



  
  resendOtp = () => {

    // this.setState({
    //   loading: true
    // })
    let mobileNo= this.state.mobileNo;
    console.log("mobilNO",mobileNo)
      // otp: this.state.OTP

       // console.log("data in verify otp======>",data);
      let _base = this;
      RegistrationServices.getMobileOTP(mobileNo).then(function (response) {

        console.log("response in OTP AUTH RESEND===============>", response)
        if (response) {
            this.setState({
              loading: false
            })
          if (response.status == 200) {
            Alert.alert("Success",
              "OTP sent Successfully !!")
            // _base.setState({
            //   mobileNo: "",
            //   loading: false
            // })
            _base.setState({
                // otp:response
            })
           // _base.props.navigation.navigate("OtpAuth", { mobileNo: mobileNo })
          }
          else {
            // _base.setState({
            //   mobileNo: "",
            //   loading: false
            // })
            Alert.alert("Error",
              "Failed to send OTP.. Please try again !!")
          }
        }
      }, function (err) {
        console.log("errr--------->>>>>", err)
        // _base.setState({
        //   loading: false,
        //   mobileNoErrMsg: "Mobile Number Already Registerd",
        // })
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

  };

  render() {
    console.log("OTP------", this.state.OTP);
    console.log("mobileNo====", this.state.mobileNo);
    return (
      <ScrollView>
        <View>
          <Loader loading={this.state.loading} />
          <View style={styles.Titleview}>
            <TouchableOpacity onPress={this.openWhatsApp}>
              <Text style={styles.Title}> SUPPORT </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.logo}>
            <Image
              style={styles.image1}
              source={require('../../Images/logo.png')} />
          </View>

          <View style={styles.backgroundimage}>
            <ImageBackground source={require('../../Images/registeroptionbg.png')} style={styles.bground} resizeMode='cover'>
              <View style={styles.Viewcardpart}>
                <Card style={styles.Card}>
                  <CardItem >
                    <Body style={styles.Body}>
                      <Text style={styles.CardTitle}>Enter OTP</Text>
                      <View>
                        <OTPTextView
                          handleTextChange={(e) => { this.setState({ OTP: e }) }}
                          containerStyle={styles.textInputContainer}
                          textInputStyle={styles.roundedTextInput}
                          // textInputStyle={styles.roundedTextInput}
                          defaultValue=""
                          inputCount={6}
                        />
                      </View>

                      <View style={{ flexDirection: 'row' }}>

                        <Text style={{ marginRight: '6%' }}>3:00</Text>
                        <TouchableOpacity onPress={this.resendOtp}>
                               <Text style={{ color: 'red', textDecorationLine: 'underline',di}}>RESEND</Text>
                        </TouchableOpacity>
                       
                      </View>

                      <TouchableOpacity style={styles.button}
                        onPress={() => this.handleVerify()}>
                        <Text style={{ marginHorizontal: '40%', width: '100%', fontSize: 15, marginVertical: '4%', color: '#fff' }}>VERIFY</Text>
                      </TouchableOpacity>

                      <View style={styles.line}></View>
                      <View style={styles.extraoption}>
                        <View style={styles.extraemailLogin}>
                          <Text style={styles.font12}>Already a User?</Text>
                          <View>
                            <Text style={styles.extraoptionfooter} onPress={() => this.props.navigation.navigate("Login")}>LOGIN</Text>
                          </View>
                        </View>
                        <View style={styles.extraemailregistration}>
                          <Text style={styles.font12}>Register with Mobile</Text>
                          <View style={styles.extraemailregistrationpart}>
                            <Text style={styles.extraoptionfooter} onPress={() => this.props.navigation.navigate("AlternateLoginOption")}>REGISTER</Text>
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
      </ScrollView>
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
    marginRight: hp('1%')
  },
  Title: {
    textAlign: 'right',
    // flex:1,
    fontWeight: 'bold',
    color: '#03B38F',
    textDecorationLine: 'underline'
    // float:'right',   
  },
  Card: {
    //borderRadius:10,
    textAlign: 'center',
    textAlign: 'center',
    borderRadius: 20,
    paddingTop: '5%',
    paddingBottom: '5%'
  },
  Viewcardpart: {
    marginTop: '70%',
    padding: '5%',
  },
  Body: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  extraemailregistration: {
    flexDirection: 'column',
  },
  extraemailLogin: {
    flexDirection: 'column',
    marginRight: '15%',
  },
  extraoptionfooter: {
    marginRight: '5%',
    marginTop: '3%',
    color: '#03B38F',
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  extraoption: {
    //flex:1,
    width: '100%',
    flexDirection: "row",
    // alignContent:'space-between',
    justifyContent: 'space-between',
    //padding: 10,  
  },
  bground: {
    //resizeMode:'stretch',
    height: hp('100%'),
    width: wp('100%'),
    //position:'relative',
    marginTop: '-30%',
    // backgroundColor:'red'
    paddingBottom: '10%'
  },
  CardTitle: {
    fontSize: 18,
    //flex:1,
    textAlign: 'center',
    //justifyContent:'center',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: '5%'
  },
  button: {
    backgroundColor: '#03B38F',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: '5%',
    marginBottom: '6%'
  },
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 2,
    width: wp('10%')
  },
})