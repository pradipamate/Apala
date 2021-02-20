import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, Text, ImageBackground, Switch, StyleSheet, Alert, Linking } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Card, CardItem, Body, Container } from 'native-base';
import { Input } from 'react-native-elements'
import DeviceInfo from 'react-native-device-info'
import ToggleSwitch from 'toggle-switch-react-native'

// import \{Hr}  from 'react-native-hr'
import RegistrationServices from '../../Services/RegistrationService/RegistrationServices'
import Loader from '../../Components/Loader'
import AsyncStorage from "@react-native-community/async-storage";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      userFullName: "",
      mobileNo: 0,
      email: "",
      password: "",
      c_password: "",
      userFullNameErrMsg: "",
      mobileNoErrMsg: "",
      emailErrMsg: '',
      passwordErrMsg: "",
      c_passErrMsg: "",
      token: "",
      isOn: false,
      switch1Value: false,
    }
  }

  async componentDidMount() {
    let mobileNo = this.props.navigation.getParam('mobileNo', "");
    let token = this.props.navigation.getParam("token")
    this.setState({
      mobileNo: mobileNo,
      token: token
    })
  }

  handleNameChange = (name) => {
    if (name !== "") {
      this.setState({
        userFullName: name,
        userFullNameErrMsg: ""
      })
    }
    else {
      this.setState({
        userFullNameErrMsg: "Required.",
        userFullName: ""
      })
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

  handleEmailChange = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email !== "") {
      if (reg.test(email)) {
        this.setState({
          email: email,
          emailErrMsg: ""
        })
      }
      else {
        this.setState({
          emailErrMsg: "Enter Valid Email Id.",
          email: ""
        })
      }

    }
    else {
      this.setState({
        emailErrMsg: "Required.",
        email: ""
      })
    }

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

    if (this.state.password !== "" && c_pass !== "") {
      if (this.state.password == c_pass) {
        this.setState({
          c_password: c_pass,
          c_passErrMsg: ""
        })
      }
      else {
        this.setState({
          c_password: "",
          c_passErrMsg: "Password Not Matched."
        })
      }
    }
    else {
      this.setState({
        c_password: "",
        c_passErrMsg: "Password Not Matched."
      })
    }
  }


  handleRegister = (e) => {
    // this.props.navigation.navigate('Registeroption')
    // const IMEIObj = require('react-native-imei')
    // let IMEI=IMEIObj.getImei()
    let id = DeviceInfo.getDeviceId();
    console.log("id=================", id);
    const IMEI = require('react-native-imei');
    let imeiArr = []
    IMEI.getImei().then(imeiList => {
      console.log("imeiList========", imeiList)
      imeiArr.push(imeiList)
    });

    this.setState({
      loading: true
    })

    let data = {
      password: this.state.password,
      mobile: this.state.mobileNo,
      user_full_name: this.state.userFullName,
      email: this.state.email,
      device_id: id,
      IMEI: imeiArr[0],
    }
    AsyncStorage.setItem("FullName", this.state.userFullName)
    console.log("data in registration========", data);

    RegistrationServices.createUser(this.state.token, data).then(response => {
      console.log("response in create user=====", response);
      AsyncStorage.setItem('Gtoken', response.data.token)

      this.setState({
        loading: false
      })
      if (response) {
        this.setState({
          loading: false
        })
        if (response.status == 200) {
          if (this.state.switch1Value) {

            this.props.navigation.navigate('DoctorRegistrationAddress')

          } else {
            this.props.navigation.navigate('Login')

          }


          Alert.alert("Success",
            "User Registered Successfully !!")
        }
      }
      else {
        this.setState({
          loading: false
        })
        Alert.alert("Error",
          "Failed to Register...Try again !!")
      }

    }).catch((e) => {
      this.setState({
        loading: false
      })
      console.log("err in registration====", e);
      Alert.alert("Error",
        "Failed to Register...Try again !!")
    })

  }

  openWhatsApp = () => {
    // let msg = 'hii';
    // let mobile = '918149171510';
    // if (mobile) {
    //   if (msg) {
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
          <View style={{ marginHorixzontal: '0%' }}>
            <TouchableOpacity style={styles.help} onPress={this.openWhatsApp}>
              <Text style={styles.helptext} >SUPPORT</Text>
            </TouchableOpacity>

            <View style={styles.backgroundimage}>
              <ImageBackground source={require('../../Images/register.png')} style={styles.bground} resizeMode='cover'>

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
                        <Input
                          containerStyle={{ height: 40, marginTop: 10 }}
                          placeholder='Full Name*'
                          placeholderTextColor="gray"
                          style={{ fontSize: 14 }}
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', borderRadius: 10, borderColor: '#03b38f' }}
                          leftIconContainerStyle={{ marginLeft: 2 }}
                          // value={mobile}
                          onChangeText={text => this.handleNameChange(text)}
                        //errorMessage={mobileErrorMessage}
                        //keyboardType='phone-pad'
                        />
                        {this.state.userFullNameErrMsg !== "" ?
                          <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.userFullNameErrMsg}</Text>
                          : null}
                        {/* <Input
                                                 containerStyle={{ height: 40, marginTop: 10 }}
                                                    placeholder="Mobile Number*"
                                                    style={{fontSize:14}}
                                                    placeholderTextColor="gray"
                                                    keyboardType="numeric"
                                                    inputContainerStyle={{ borderWidth: 1,paddingLeft:'8%',borderRadius:10,borderColor:'#03b38f' }}
                                                    inputStyle={{color:'black'}}
                                                    onChangeText={(text)=>this.handleMobileChange(text)}
                                                    //inputContainerStyle={styles.inp}
                                                    // errorStyle={{color:'red',fontSize: 16}}
                                                   // errorMessage={ this.state.namerror }
                                                    //value={this.state.name} 
                                                    />
                                                    {this.state.mobileNoErrMsg!==""?
                                                    <Text style={{color:'red',fontSize: 12,textAlign:'left'}}>{ this.state.mobileNoErrMsg }</Text>
                                                  :null} */}
                        <Input
                          containerStyle={{ height: 40, marginTop: 10 }}
                          placeholder="Email Address*"
                          style={{ fontSize: 14 }}
                          type="email"
                          placeholderTextColor="gray"
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', borderRadius: 10, borderColor: '#03b38f' }}
                          inputStyle={{ color: 'black' }}
                          onChangeText={(email) => this.handleEmailChange(email)}
                        //inputContainerStyle={styles.inp}
                        // errorStyle={{color:'red',fontSize: 16}}
                        //  errorMessage={ this.state.emailErrMsg }
                        //value={this.state.name} 
                        />
                        {this.state.emailErrMsg !== "" ?
                          <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.emailErrMsg}</Text>
                          : null}
                        <Input
                          containerStyle={{ height: 40, marginTop: 10, }}
                          placeholder="Password*"
                          placeholderTextColor="gray"
                          style={{ fontSize: 14 }}
                          secureTextEntry={true}
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', fontSize: 9, borderRadius: 10, borderColor: '#03b38f' }}
                          inputStyle={{ color: 'black' }}
                          onChangeText={(password) => this.handlePassword(password)}
                        //inputContainerStyle={styles.inp}
                        // errorStyle={{color:'red',fontSize: 16}}
                        // errorMessage={ this.state.namerror }
                        //value={this.state.name} 
                        />
                        {this.state.passwordErrMsg !== "" ?
                          <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.passwordErrMsg}</Text>
                          : null}
                        <Input
                          containerStyle={{ height: 40, marginTop: 10, }}
                          placeholder="Confirm Password*"
                          placeholderTextColor="gray"
                          style={{ fontSize: 14 }}
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', fontSize: 9, borderRadius: 10, borderColor: '#03b38f' }}
                          inputStyle={{ color: 'black' }}
                          secureTextEntry={true}
                          onChangeText={(c_pass) => this.handleConfirmPassword(c_pass)}
                        //inputContainerStyle={styles.inp}
                        // errorStyle={{color:'red',fontSize: 16}}
                        // errorMessage={ this.state.namerror }
                        //value={this.state.name} 
                        />
                        {this.state.c_passErrMsg !== "" ?
                          <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.c_passErrMsg}</Text>
                          : null}

                        <View style={{ flexDirection: 'row', marginVertical: '2%' }}>
                          <Text>Are you a healthcare professional? </Text>
                          <Switch
                            onValueChange={(value) => this.setState({ switch1Value: value })}
                            // onPress={(value)=> this.setState({switch1Value: value})}
                            value={this.state.switch1Value} />


                        </View>




                        <View
                          style={styles.lines}
                        />
                        <View style={styles.note}>
                          <Text style={styles.noteText}>By Registering to Aapka Doctor App, I Agree to <Text style={{ color: '#03b38f' }}>Terms & Conditions</Text> </Text>
                        </View>
                        <TouchableOpacity style={styles.button}
                          onPress={(e) => this.handleRegister(e)}>
                          <Text style={{ fontSize: 16, marginVertical: '3%', color: '#fff', marginHorizontal: '35%' }}>REGISTER</Text>
                        </TouchableOpacity>

                        {/* <hr marginLeft={50} lineColor='red'/> */}

                        <View style={styles.extraoption}>
                          <View style={styles.extraemailregistration}>
                            <Text style={{ fontSize: 13 }}>Already a User?</Text>
                            <View>
                              <Text style={styles.extraoptionfooter} onPress={() => this.props.navigation.navigate('Login')}>LOGIN</Text>
                            </View>
                          </View>
                          {/* <View style={styles.extraemailregistration}>
                            <Text style={{ fontSize: 13 }}>Register with Mobile</Text>
                            <View style={styles.extraemailregistrationpart}>
                              <Text style={styles.extraoptionfooter} onPress={() => this.props.navigation.navigate('AlternateLoginOption')}>REGISTER</Text>
                            </View>
                          </View> */}
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

  image1: {
    height: hp('11%'),
    //width: wp('45%'),
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
  },

  Card: {
    textAlign: 'center',
    textAlign: 'center',
    borderRadius: 20,
  },
  Viewcardpart: {
    marginTop: '5%',
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
    //marginTop:'10%'
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
    marginBottom: '5%'
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
    //flex:1,
    flexDirection: "row",
    // alignContent:'space-between',
    justifyContent: 'space-between',
    //padding: 10,

  },
  extraemailregistration: {
    //flexDirection:'row',
    justifyContent: 'space-between',
    marginHorizontal: '2%'

  },
  noteText: {
    fontSize: 10
  },
  note: {
    paddingTop: '3%',
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
    borderColor: '#03b38f',
    borderWidth: 0.3,
    width: "90%",
    marginTop: '7%',
    marginBottom: '2%'
  }
})