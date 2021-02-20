import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity, FlatList, Image, Text, ImageBackground, StyleSheet, Alert, Linking } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Card, CardItem, Body } from 'native-base';
import OTPTextView from 'react-native-otp-textinput'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import RegistrationServices from '../../Services/RegistrationService/RegistrationServices'


export default class OtpAuth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      otp: "",
      password: "",
      c_password: "",
      c_passwordErrMsg: "",
      passwordErrMsg: "",
      otpErrMsg: "",
      mobileNo: ""
    }
  }
  async componentDidMount() {
    let mobileNo = this.props.navigation.getParam('mobileNo', "");
    this.setState({
      mobileNo: mobileNo
    })

  }
  handleOTP = (otp) => {
    this.setState({
      otp: otp
    })
  }
  handlePassword = (password) => {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if (password !== "") {
      if (regex.test(password)) {
        this.setState({
          password: password,
          passwordErrMsg: ""
        })
      }
      else {
        this.setState({
          password: "",
          passwordErrMsg: "Password should contain atleast one Upprecase, lowercase, digit, special character and length should be minimum 8 characters."
        })
      }
    }
    else {
      this.setState({
        passwordErrMsg: "Required.",
        password: ""
      })
    }


  }
  handleConfirmPassword = (c_pass) => {
    console.log('confirm', c_pass)
    console.log("this.state.password", this.state.password)
    if (c_pass !== "") {
      if (c_pass == this.state.password) {
        this.setState({
          c_password: c_pass,
          c_passwordErrMsg: ""
        })
      }
      else {
        this.setState({
          c_password: "",
          c_passwordErrMsg: "Password not matched."
        })
      }
    }
    else {
      this.setState({
        c_passwordErrMsg: "Required.",
        c_password: ""
      })
    }

  }
  handleResetPassword = () => {
    // this.props.navigation.navigate('HomePage')
    if (this.state.otp == "" && this.state.password == "" && this.state.c_password == "") {
      // this.setState({
      //   otpErrMsg:"Enter OTP"
      // })
      Alert.alert("Failed", "Please Fill All Fields")
      return
    }
    let data = {
      otp: this.state.otp,
      mobile: this.state.mobileNo
    }
    console.log("data=============", data);
    RegistrationServices.forgotverifyOTP(data).then(response => {
      console.log("response in forgotverifyOTP=====", response);
      if (response) {
        if (response.status == 200) {
          this.changePassword(response.data.token)
        }
      }
    }).catch(err => {
      console.log("err in forgotverifyOTP====", err);
      Alert.alert("Failure", "Failed to verify OTP.")
    })
  }


  changePassword = (token) => {
    console.log("inside changePassword");
    let data = {
      password: this.state.password
    }
    RegistrationServices.changeForgotPassword(token, data).then(response => {
      console.log("response===========================", response);
      if (response) {
        if (response.status == 200) {
          Alert.alert("Success", "Password Changed Successfully.")
          this.props.navigation.navigate('Login')
        }
      }
    }).catch(err => {
      console.log("err in changeForgotPassword", err);
      Alert.alert("Failure", "Failed to change password.")
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
      <ScrollView>
        <View>
          <View style={styles.Titleview}>
            <View style={styles.arrow}>
              <Icon
                name='angle-left'
                size={30}
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
            <ImageBackground source={require('../../Images/ResetPassword.png')} style={styles.bground} resizeMode='cover'>
              <View style={styles.Viewcardpart}>
                <Card style={styles.Card}>
                  <CardItem >
                    <Body style={styles.Body}>
                      <Text style={styles.CardTitle}>RESET PASSWORD</Text>
                      <View>
                        <OTPTextView
                          handleTextChange={(otp) => this.handleOTP(otp)}
                          containerStyle={styles.textInputContainer}
                          textInputStyle={styles.roundedTextInput}
                          defaultValue=""
                          inputCount={6}
                        />
                      </View>

                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginRight: '6%' }}>3:00</Text>
                        <Text style={{ color: 'red', textDecorationLine: 'underline' }}>RESEND</Text>
                      </View>

                      <Input
                        containerStyle={{ height: 40, marginTop: 10, marginBottom: 10 }}
                        placeholder="New Password*"
                        style={{ fontSize: 14 }}
                        placeholderTextColor="gray"
                        secureTextEntry={true}
                        onChangeText={(password) => this.handlePassword(password)}
                        inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', borderRadius: 10, borderColor: '#03b38f' }}
                        inputStyle={{ color: 'black' }}
                        leftIcon={
                          <Icon
                            name='lock'
                            size={20}
                            color='black'
                            color='#2DB38D'
                          />
                        }

                      //onChangeText={(text)=>this.setState({name:text,namerror:""})}
                      //inputContainerStyle={styles.inp}
                      // errorStyle={{color:'red',fontSize: 16}}
                      // errorMessage={ this.state.namerror }
                      //value={this.state.name} 
                      />
                      {this.state.passwordErrMsg !== "" ?
                        <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.passwordErrMsg}</Text>
                        : null}
                      <Input
                        containerStyle={{ height: 40, marginTop: 10, marginBottom: 20 }}
                        placeholder="Confirm Password*"
                        style={{ fontSize: 14 }}
                        secureTextEntry={true}
                        placeholderTextColor="gray"
                        inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', borderRadius: 10, borderColor: '#03b38f' }}
                        inputStyle={{ color: 'black' }}
                        leftIcon={
                          <Icon
                            name='lock'
                            size={20}
                            color='black'
                            color='#2DB38D'
                          />
                        }
                        onChangeText={(c_pass) => this.handleConfirmPassword(c_pass)}
                      //inputContainerStyle={styles.inp}
                      // errorStyle={{color:'red',fontSize: 16}}
                      // errorMessage={ this.state.namerror }
                      //value={this.state.name} 
                      />
                      {this.state.c_passwordErrMsg !== "" ?
                        <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.c_passwordErrMsg}</Text>
                        : null}

                      <TouchableOpacity style={styles.button}
                        onPress={() => this.handleResetPassword()}>
                        <Text style={{ marginHorizontal: '15%', width: '100%', fontSize: 15, marginVertical: '4%', color: '#fff' }}>VERIFY & RESET PASSWORD</Text>
                      </TouchableOpacity>

                      <View style={styles.line}></View>
                      <View
                        style={styles.lines}
                      />
                      <View style={styles.note}>
                        <Text style={styles.noteText}>Back to Profile </Text>
                        <View>
                          <Text style={styles.extraoptionfooter} onPress={() => this.props.navigation.navigate('Login')}>LOGIN</Text>
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
  arrow: {
    marginLeft: '1%'
  },

  image1: {
    height: hp('11%'),
    // width:wp('45%'),
    marginLeft: '0%',
    resizeMode: 'contain',
  },
  font12: {
    fontSize: 12
  },
  line: {
    borderWidth: 0.5,
    width: '100%',
    borderColor: '#A9A9A9'
  },
  logo: {
    //textAlign:'center',
    // alignItems: "center" ,
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
    // flex:1,
    color: '#03b38f',
    textDecorationLine: 'underline',
    // float:'right',
    fontWeight: 'bold'
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
    marginTop: '50%',
    padding: '5%',
    //width:hp('100%')
    // borderRadius:20,
  },
  help: {
    //alignItems:'flex-end',
    zIndex: 99999
  },
  helptext: {
    marginRight: '1%',
    marginTop: '3%',
    color: '#03B38F',
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
    zIndex: 99999999999,
  },
  Left: {
    width: 0
  },
  Right: {
    width: 0
  },
  Body: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bground: {
    //resizeMode:'stretch',
    height: hp('100%'),
    width: wp('100%'),
    //position:'relative',
    marginTop: '-40%',
    // backgroundColor:'red'
    // paddingBottom:'10%'
  },
  CardTitle: {
    //flex:1,
    textAlign: 'center',
    //justifyContent:'center',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: '5%'
  },
  button: {
    backgroundColor: '#03b38f',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: '5%',
    marginBottom: '6%'
  },
  //   carditem:{
  //       textAlign:'center'
  //   },
  textInputContainer: {
    marginBottom: 20,

  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 2,
    width: wp('10%')
  },
  noteText: {
    fontSize: 10
  },
  note: {
    paddingTop: '3%',
    paddingRight: '5%',
    paddingLeft: '5%',
    // paddingBottom:'5%'
  },
  extraoptionfooter: {
    marginRight: '5%',
    marginTop: '3%',
    color: '#03b38f',
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline'
  }
})