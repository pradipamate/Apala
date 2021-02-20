import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, Text, ImageBackground, StyleSheet, Alert, Linking } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Card, CardItem, Body, Container } from 'native-base';
import jwt_decode from "jwt-decode";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements'
import RegistrationServices from "../../Services/RegistrationService/RegistrationServices"
import Loader from '../../Components/Loader'



export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      userNameErrMsg: "",
      password: "",
      passwordErrMsg: "",
      loading: false,
      iconName: 'eye',
      hidePass: true
    }
  }


  handlemobileChange = (text) => {
    if (text.length != 0) {
      if (text.length == 10 && /^[\d.]+$/.test(text) == true) {
        this.setState({
          userName: text,
          userNameErrMsg: ""
        })
      }
      else {
        this.setState({
          userName: text,
          userNameErrMsg: "Enter valid mobile number."
        })
      }
    }
    else {
      this.setState({
        userName: text,
        userNameErrMsg: "Required."
      })
    }
  }
  handleEye = () => {
    if (this.state.hidePass) {
      this.setState({
        hidePass: false
      })
    }
    else {
      this.setState({
        hidePass: true
      })
    }
  }

  handleChangePassword = (pass) => {
    if (pass !== "") {
      if (pass.length >= 8) {
        this.setState({
          password: pass,
          passwordErrMsg: ""
        })
      }
      else {
        this.setState({
          password: pass,
          passwordErrMsg: "Password should be atleast 8 characters."
        })
      }
    }
    else {
      this.setState({
        password: pass,
        passwordErrMsg: "Required."
      })
    }
  }

  handleSubmit = () => {

    let data = {
      password: this.state.password,
      mobile: this.state.userName
    }

    // let data={
    //   password:"Ayn@1234",
    //   mobile:"9579234681"
    // }

    // let data = {
    //   password: "Ayn@1234",
    //   mobile: "8600439794"
    // }

    this.setState({
      loading: true,
    })

    // console.log("data in Login========>", data);
    RegistrationServices.login(data).then(response => {
      //console.log("response in login===========================================>", response.data);
      if (response) {
        if (response.status == 200) {
          let token = response.data.token
          let Logedin = "true"
          AsyncStorage.setItem("Token", response.data.token)
          AsyncStorage.setItem("Logedin", Logedin)
          var decoded = jwt_decode(token)
          // console.log("decode===========",decoded);

          this.setState({
            loading: false,
          })

          showMessage({
            message: "Logged in successfully",
            // description: "Logged in successfully",
            type: "success",
            //backgroundColor: "success", // background color
            color: "#fff", // text color
          })

          // Alert.alert("Success","Logged in successfully.")

          this.setState({
            password: "",
            passwordErrMsg: "",
            userName: "",
            userNameErrMsg: ""
          })

          setTimeout(() => {
            if (decoded.role == "0") {
              console.log("1")
              this.props.navigation.navigate('HomePage')
            } else {
              this.props.navigation.navigate('TabNavigator', { token: token })
            }
          }, 20);
        }
      }
      else {
        this.setState({
          password: "",
          passwordErrMsg: "",
          userName: "",
          userNameErrMsg: "",
          loading: false
        })
        Alert.alert("Error", "Mobile number or password is incorrect.")
      }
    }).catch((err) => {
      this.setState({
        password: "",
        passwordErrMsg: "",
        userName: "",
        userNameErrMsg: "",
        loading: false
      })
      console.log("err while login====>", err)
      Alert.alert("Error", "Failed to login.")
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
    return (
      <Container>
        <ScrollView>
          <Loader loading={this.state.loading} />
          <FlashMessage position="top" />
          <View>
            <View style={styles.backgroundimage}>
              <ImageBackground source={require('../../Images/login.png')} style={styles.bground} resizeMode='cover'>
                <TouchableOpacity style={styles.help} onPress={this.openWhatsApp}>
                  <Text style={styles.helptext}>SUPPORT</Text>
                </TouchableOpacity>
                <View style={styles.logo}>
                  <Image
                    style={styles.image1}
                    source={require('../../Images/logo.png')} />
                </View>
                <View style={styles.Viewcardpart}>
                  <Card style={styles.Card}>
                    <CardItem style={styles.carditem}>
                      <Body style={styles.Body}>
                        <Text style={styles.cardtitle}>LOGIN TO</Text>
                        <Input
                          containerStyle={{ height: 40, marginTop: 20 }}
                          placeholder='Mobile Number*'
                          style={{ fontSize: 14 }}
                          leftIcon={
                            <Icon
                              name='user-circle-o'
                              size={20}
                              color='#03B38F'
                              type='material-community'
                            />
                          }
                          value={this.state.userName}
                          //leftIconContainerStyle={{ marginLeft: -1 }}
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03B38F' }}
                          leftIconContainerStyle={{ marginLeft: 2 }}
                          value={this.state.userName}
                          onChangeText={text => this.handlemobileChange(text)}
                          errorMessage={this.state.userNameErrMsg}
                          keyboardType='numeric'
                        />
                        <Input
                          containerStyle={{ height: 40, marginTop: 30 }}
                          placeholder='Password*'
                          style={{ fontSize: 14 }}
                          defaultValue={this.state.password}
                          leftIcon={
                            <Icon
                              name='lock'
                              size={20}
                              color='black'
                              color='#2DB38D'
                            />
                          }
                          secureTextEntry={this.state.hidePass}
                          rightIcon={
                            <Icon
                              name={this.state.hidePass ? "eye" : "eye-slash"}
                              size={20}
                              color='#03B38F'
                              type='material-community'
                              onPress={() => this.handleEye()}
                            />}
                          //leftIconContainerStyle={{ marginLeft: -1 }}
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03B38F' }}
                          leftIconContainerStyle={{ marginLeft: 2 }}
                          value={this.state.password}
                          onChangeText={pass => this.handleChangePassword(pass)}
                          errorMessage={this.state.passwordErrMsg}
                        //keyboardType='phone-pad'
                        />
                        <TouchableOpacity style={styles.button}
                          onPress={() => this.handleSubmit()}>
                          <Text style={{ fontSize: 16, marginVertical: '3%', color: '#fff', marginHorizontal: '38%' }}>LOGIN</Text>
                        </TouchableOpacity>
                        <View
                          style={styles.lines}
                        />
                        <View style={styles.fpasswordpart}>
                          <Text style={styles.fpassword} onPress={() => this.props.navigation.navigate('ForgotPassword')}>FORGOT PASSWORD</Text>
                        </View>
                      </Body>
                    </CardItem>
                  </Card>
                </View>
                <View style={styles.lastoptionpart}>
                  <Text style={styles.lastoptiontext} onPress={() => this.props.navigation.navigate('Register')}>NEW USER?</Text>
                  <Text style={styles.lastoptiontext}>
                    {/* <Text style={{textDecorationLine:'underline'}} onPress={() => this.props.navigation.navigate('Register')}>REGISTER</Text> |  */}
                    <Text style={{ textDecorationLine: 'underline' }} onPress={() => this.props.navigation.navigate('AlternateLoginOption')}>REGISTER WITH MOBILE</Text></Text>
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
  flashMessage: {
    position: 'absolute',
    backgroundColor: 'green',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    top: 0
  },
  // for popup onload
  helptext: {
    marginRight: '5%',
    marginTop: '3%',
    color: '#03B38F',
    fontWeight: 'bold',
    fontSize: 24,
    fontWeight: 'bold'
    //  textDecorationLine:'underline'
  },
  help: {
    alignItems: 'flex-end',
    //   position:'absolute',
    // left:0,
    // right:0,
    // zIndex: 2
  },
  popupTitleview: {
    marginTop: hp('3%'),
    marginBottom: hp('4%'),
    marginRight: hp('1%'),
    flexDirection: 'row',
    // flex:1,
    width: '100%',
    justifyContent: 'space-between'
  },
  // Login page css
  image1: {
    height: hp('12%'),
    //width: wp('45%'),
    marginLeft: '0%',
    resizeMode: 'contain',
  },
  logo: {
    textAlign: 'center',
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: '8%',
    marginBottom: '8%'
  },
  Titleview: {
    marginTop: hp('3%'),
    marginBottom: hp('4%'),
  },
  Card: {
    textAlign: 'center',
    textAlign: 'center',
    borderRadius: 20,
  },
  Viewcardpart: {
    marginTop: '30%',
    padding: '5%',
    // marginBottom:'200%'
  },
  Body: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bground: {
    height: hp('100%'),
    width: wp('100%'),
    paddingBottom: '10%'
  },
  cardtitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16
  },
  button: {
    backgroundColor: '#03B38F',
    alignSelf: 'center',
    borderRadius: 30,
    marginBottom: '5%',
    marginTop: '10%'
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
    color: '#03B38F',
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
    color: 'red',
    paddingBottom: '4%'
  },
  lastoptionpart: {
    // flex:1,
    flexDirection: "row",
    padding: '2%',
    //flexDirection: 'row',
    justifyContent: 'space-around'
  },
  lastoptiontext: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  lines: {
    borderColor: '#03B38F',
    borderWidth: 0.3,
    width: "90%",
    marginTop: '3%',
    marginBottom: '3%'
  }
})