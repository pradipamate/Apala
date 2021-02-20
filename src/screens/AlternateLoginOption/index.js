import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, Text, ImageBackground, StyleSheet, Alert, Linking, PermissionsAndroid } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Card, CardItem, Body, Container, Radio } from 'native-base';
import { Input } from 'react-native-elements';
import RegistrationServices from '../../Services/RegistrationService/RegistrationServices'
import Loader from '../../Components/Loader'
import Icon from 'react-native-vector-icons/FontAwesome';
// import SmsListener from 'react-native-android-sms-listener'

export default class AlternateLoginOption extends Component {
  constructor() {
    super();
    this.state = {
      registerMode: "mobile_verification",
      mobileNo: 0,
      mobileNoErrMsg: "",
      emailId: '',
      loading: false
    }
    // this.falsestate=this.falsestate.bind(this);
  }



  handleMobileNoChange = (mobNo) => {
    this.setState({
      mobileNo: mobNo
    })
  }

  handleEmailIdChange = (email) => {
    this.setState({
      EmailId: email
    })
  }


  handleVerify = () => {
    this.setState({
      loading: true
    })
    let mobileNo = this.state.mobileNo
    let EmailId = this.state.emailId
    console.log("mobileNo---", mobileNo);
    if (mobileNo.length == 10) {

      this.setState({
        mobileNoErrMsg: ""
      })
      let _base = this;
      
      RegistrationServices.getMobileOTP(mobileNo).then(function (response) {

        console.log("response===============>", response)
        if (response) {
          if (response.status == 200) {
            Alert.alert("Success",
              "OTP sent Successfully !!")
            _base.setState({
              mobileNo: "",
              loading: false
            })
            _base.props.navigation.navigate("OtpAuth", { mobileNo: mobileNo })
          }
          else {
            _base.setState({
              mobileNo: "",
              loading: false
            })
            Alert.alert("Error",
              "Failed to send OTP.. Please try again !!")
          }
        }
      }, function (err) {
        console.log("errr--------->>>>>", err)
        _base.setState({
          loading: false,
          mobileNoErrMsg: "Mobile Number Already Registerd",
        })
      })

    }

    else {
      this.setState({
        mobileNoErrMsg: "Mobile Number Required",
        loading: false
      })
    }

    // falsestate=()=>{
    //   this.setState({
    //     loading:false,
    //     mobileNoErrMsg:"Mobile Number Already Registerd",
    //   })
    // }

    // else{
    //   if(emailId!==""){
    //     RegistrationServices.getMobileOTP(mobileNo).then(response=>{
    //       console.log("response===============>",response)
    //       if(response){
    //         if(response.data.message=="SUBMIT_SUCCESS"){
    //           this.props.navigation.navigate('OtpAuth')
    //         }
    //         else{
    //           console.log("Failed to get OTP");
    //         }
    //       }
    //     })
    //   }

    // }

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


    var radio_props = [
      { label: 'MOBILE VERIFICATION', value: 'mobile_verification' },
      // {label: 'EMAIL VERIFICATION', value: 'email_verification' }
    ];



    return (
      <Container>
        <ScrollView>
          <Loader loading={this.state.loading} />
          <View style={{ marginHorixzontal: '0%' }}>
            <View style={styles.Titleview}>
              <View style={styles.arrow}>
                <Icon
                  name='angle-left'
                  size={30}
                  color='#03b38f'
                />
              </View>
              <TouchableOpacity style={styles.help} onPress={this.openWhatsApp}>
                <Text style={styles.helptext} >SUPPORT</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.backgroundimage}>
              <ImageBackground source={require('../../Images/registeralternateoption.png')} style={styles.bground} resizeMode='cover'>

                <View style={styles.logo}>
                  <Image
                    style={styles.image1}
                    source={require('../../Images/logo.png')} />
                </View>
                <View style={styles.Viewcardpart}>
                  <Card style={styles.Card}>
                    <CardItem style={styles.carditem}>
                      <Body style={styles.Body}>

                        <Text style={styles.cardtitle} >REGISTER WITH US</Text>

                        {/* <View  style={styles.radio}>
                                                 <RadioForm 
                                                    radio_props={radio_props}
                                                    initial={0}
                                                    buttonSize={10}
                                                    formHorizontal={true}
                                                    buttonInnerColor={'#03b38f'}
                                                    buttonOuterColor={'#03b38f'}
                                                    labelStyle={{fontSize: 11,marginHorizontal:5,marginLeft:-2}}
                                                    //buttonWrapStyle={{marginLeft: 8,fontSize:10}}
                                                    //buttonOuterSize={80}
                                                    onPress={(value) => {this.setState({registerMode:value})}}
                                                  />
                                             </View> */}
                        {/* {this.state.registerMode=="mobile_verification"? */}
                        <Input
                          containerStyle={{ height: 40, marginTop: 10 }}
                          placeholder="Mobile Number*"
                          style={{ fontSize: 14 }}
                          value={this.state.mobileNo}
                          placeholderTextColor="gray"
                          leftIcon={{ type: 'font-awesome', name: 'mobile', color: '#03b38f' }}
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03b38f' }}
                          inputStyle={{ color: 'black' }}
                          keyboardType="numeric"
                          onChangeText={(text) => this.handleMobileNoChange(text)}
                        //inputContainerStyle={styles.inp}
                        //   errorStyle={{color:'red',fontSize: 12}}
                        //  errorMessage={ this.state.mobileNoErrMsg }
                        //value={this.state.name} 
                        />

                        <Text style={{ color: 'red', fontSize: 12, marginTop: '3%', textAlign: "left" }}>{this.state.mobileNoErrMsg}</Text>
                        {/* : */}
                        {/* <Input
                                                 containerStyle={{ height: 40, marginTop: 10 }}
                                                    placeholder="Email Address*"
                                                    style={{fontSize:14}}
                                                    placeholderTextColor="gray"
                                                    inputContainerStyle={{ borderWidth: 1,paddingLeft:'8%',borderRadius:10,borderColor:'#03b38f' }}
                                                    inputStyle={{color:'black'}}
                                                    onChangeText={(text)=>this.handleEmailIdChange(text)}
                                                    //inputContainerStyle={styles.inp}
                                                    errorStyle={{color:'red',fontSize: 16}}
                                                   // errorMessage={ this.state.namerror }
                                                    //value={this.state.name} 
                                                    />
                                                  } */}
                        <View
                          style={styles.lines}
                        />

                        <View style={styles.note}>
                          <Text style={styles.noteText}>By Registering to Aapka Doctor App, I Agree to <Text style={{ color: '#03b38f', textDecorationLine: 'underline' }}>Terms & Conditions</Text> </Text>
                        </View>
                        {/* {this.state.mobileNo!==0? */}
                        <TouchableOpacity style={styles.button}
                          onPress={() => this.handleVerify()}>
                          <Text style={{ fontSize: 16, marginVertical: '3%', color: '#fff', marginHorizontal: '35%' }}>VERIFY  </Text>
                        </TouchableOpacity>
                        {/* :
                                                      <TouchableOpacity activeOpacity={1}
                                                      style={styles.buttonDisabled} >
                                              <Text style={{fontSize:16,marginVertical:'3%',color:'#fff',marginHorizontal:'35%'}}>VERIFY  </Text>
                                              </TouchableOpacity>
                                               } */}
                        <View
                          style={styles.lines}
                        />
                        <View style={styles.extraoption}>
                          <View style={styles.extraemailregistration}>
                            <Text style={{ fontSize: 13 }}>Already a User?</Text>
                            <View>
                              <Text style={styles.extraoptionfooter} onPress={() => this.props.navigation.navigate('Login')}>LOGIN</Text>
                            </View>
                          </View>
                          <View style={styles.extraemailregistration}>
                            <Text style={{ fontSize: 13 }}>Register With Us</Text>
                            <View style={styles.extraemailregistrationpart}>
                              <Text style={styles.extraoptionfooter} onPress={() => this.props.navigation.navigate('Register')}>REGISTER</Text>
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
      </Container>
    )
  }
}


const styles = StyleSheet.create({
  arrow: {
    marginLeft: '1%'
  },
  image1: {
    height: hp('12%'),
    //width:wp('45%'),
    marginLeft: '0%',
    resizeMode: 'contain',
  },
  logo: {
    textAlign: 'center',
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: '8%'
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
  Card: {
    textAlign: 'center',
    textAlign: 'center',
    borderRadius: 20,
  },
  Viewcardpart: {
    marginTop: '5%',
    padding: '5%',
  },
  Body: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bground: {
    height: hp('100%'),
    width: wp('100%'),
  },
  cardtitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
    paddingBottom: '2%',
    paddingTop: '2%'
  },
  button: {
    backgroundColor: '#03b38f',
    alignSelf: 'center',
    borderRadius: 30,
    //  marginBottom:'5%'
  },
  buttonDisabled: {
    backgroundColor: '#03b38f',
    alignSelf: 'center',
    borderRadius: 30,
    opacity: 0.7
  },
  carditem: {
    textAlign: 'center', borderRadius: 5
  },
  help: {
    alignItems: 'flex-end',

  },
  helptext: {
    marginRight: '5%',
    marginTop: '3%',
    color: '#03b38f',
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  fpasswordpart: {
    alignItems: 'center'
  },
  fpassword: {
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
    color: 'red'
  },
  extraoption: {
    width: '100%',
    flexDirection: "row",
    justifyContent: 'space-between',

  },
  extraemailregistration: {
    justifyContent: 'space-between',
    marginHorizontal: '2%'

  },
  noteText: {
    fontSize: 10
  },
  note: {
    // paddingTop: '2%',
    paddingRight: '5%',
    paddingLeft: '5%',
    paddingBottom: '5%'
  },
  extraemailregistrationpart: {
    alignItems: 'flex-end',
    textAlign: 'right'
  },
  extraoptionfooter: {
    marginRight: '5%',
    marginTop: '3%',
    color: '#03b38f',
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  lines: {
    borderWidth: 0.5,
    width: '100%',
    borderColor: '#A9A9A9',
    marginBottom: '3%',
    marginTop: '7%'
  },
  radio: {
    marginTop: '2%',
    marginBottom: '2%',
    fontSize: 10,
    paddingLeft: 10,
    paddingRight: 10,

  }
})