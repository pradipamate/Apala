import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, Text, ImageBackground, StyleSheet, Alert, Linking } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Card, CardItem, Body, Container } from 'native-base';
import { Input } from 'react-native-elements'
import ProfileServices from '../../Services/ProfileServices/ProfileServices'
// import \{Hr}  from 'react-native-hr'
import Registerservices from '../../Services/RegistrationService/RegistrationServices'

export default class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      currentPassword: "",
      newPassword: "",
      conformPassword: "",
      newPasswordErrMsg: "",
      currentPasswordErrMsg: "",
      confirmPassErrMsg: "",
      token: ''
    }
  }

  componentDidMount() {
    let token = this.props.navigation.getParam('token')
    this.setState({
      token: token
    })
    console.log("token==================", token);

  }

  handlCurrentPassChange = (text) => {
    if (text != "") {
      this.setState({
        currentPassword: text,
        currentPasswordErrMsg: ""
      })
    }
    else {
      this.setState({
        currentPassword: "",
        currentPasswordErrMsg: "Required."
      })
    }
  }

  handleNewPassword = (password) => {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if (password !== "") {
      if (regex.test(password)) {
        this.setState({
          newPassword: password,
          newPasswordErrMsg: ""
        })
      }
      else {
        this.setState({
          newPassword: "",
          newPasswordErrMsg: "Password should contain atleast one Upprecase, lowercase, digit, special character and length should be minimum 8 characters."
        })
      }
    }
    else {
      this.setState({
        newPasswordErrMsg: "Required.",
        newPassword: ""
      })
    }

  }

  handleConfirmPassword = (text) => {
    console.log("text", text);

    if (text == this.state.newPassword) {
      this.setState({
        conformPassword: text,
        confirmPassErrMsg: ""
      })
    }
    else {
      this.setState({
        conformPassword: "",
        confirmPassErrMsg: "Password not matched."
      })
    }
  }

  handleChangePassword = () => {

    let data = {
      current_password: this.state.currentPassword,
      new_password: this.state.newPassword,
      confirm_password: this.state.conformPassword
    }
    console.log("data in handleChangePassword================", data);

    ProfileServices.changePassword(data, this.state.token).then(response => {
      console.log("response in changePassword", response);
      if (response) {
        if (response.status == 200) {
          Alert.alert("Success", "Password Changed Successfully!!")
          this.props.navigation.navigate("Login")
        }
      }

    }).catch((e) => {
      Alert.alert("Failure", "Failed to change password... Try again!!")
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
          <View style={{ marginHorixzontal: '0%' }}>
            <TouchableOpacity style={styles.help} onPress={this.openWhatsApp}>
              <Text style={styles.helptext}> SUPPORT</Text>
            </TouchableOpacity>
            <View style={styles.backgroundimage}>
              <ImageBackground source={require('../../Images/ChangePassword.png')} style={styles.bground} resizeMode='cover'>

                <View style={styles.logo}>
                  <Image
                    style={styles.image1}
                    source={require('../../Images/logo.png')} />
                </View>
                <View style={styles.Viewcardpart}>
                  <Card style={styles.Card}>
                    <CardItem style={styles.carditem}>
                      <Body style={styles.Body}>
                        <Text style={styles.cardtitle} >CHANGE PASSWORD</Text>
                        <Input
                          containerStyle={{ height: 40, marginTop: 10 }}
                          placeholder='Current Password*'
                          style={{ fontSize: 14 }}
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', borderRadius: 10, borderColor: '#03b38f' }}
                          leftIconContainerStyle={{ marginLeft: 2 }}
                          // value={mobile}
                          secureTextEntry={true}
                          onChangeText={text => this.handlCurrentPassChange(text)}
                        //errorMessage={mobileErrorMessage}
                        //keyboardType='phone-pad'
                        />
                        {this.state.currentPasswordErrMsg !== "" ?
                          <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.currentPasswordErrMsg}</Text>
                          : null}
                        <Input
                          containerStyle={{ height: 40, marginTop: 10 }}
                          placeholder="New Password*"
                          style={{ fontSize: 14 }}
                          placeholderTextColor="gray"
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', borderRadius: 10, borderColor: '#03b38f' }}
                          inputStyle={{ color: 'black' }}
                          onChangeText={(text) => this.handleNewPassword(text)}
                          secureTextEntry={true}
                          //inputContainerStyle={styles.inp}
                          errorStyle={{ color: 'red', fontSize: 16 }}
                        // errorMessage={ this.state.namerror }
                        //value={this.state.name} 
                        />
                        {this.state.newPasswordErrMsg !== "" ?
                          <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.newPasswordErrMsg}</Text>
                          : null}
                        <Input
                          containerStyle={{ height: 40, marginTop: 10 }}
                          placeholder="Confirm Password*"
                          style={{ fontSize: 14 }}
                          placeholderTextColor="gray"
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', borderRadius: 10, borderColor: '#03b38f' }}
                          inputStyle={{ color: 'black' }}
                          onChangeText={(text) => this.handleConfirmPassword(text)}
                          //inputContainerStyle={styles.inp}
                          errorStyle={{ color: 'red', fontSize: 16 }}
                          // errorMessage={ this.state.namerror }
                          secureTextEntry={true}
                        //value={this.state.name} 
                        />
                        {this.state.confirmPassErrMsg !== "" ?
                          <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.confirmPassErrMsg}</Text>
                          : null}
                        <TouchableOpacity style={styles.button}
                          onPress={() => this.handleChangePassword()}>
                          <Text style={{ fontSize: 16, marginVertical: '3%', color: '#fff', marginHorizontal: '19%' }}>CHANGE PASSWORD</Text>
                        </TouchableOpacity>

                        <View style={styles.lines} />

                        <View style={styles.note}>
                          <Text style={styles.noteText} >Back to Profile </Text>
                          <View>
                            <Text style={styles.extraoptionfooter} onPress={() => this.props.navigation.navigate("EditProfile")}>PROFILE</Text>
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

  image1: {
    height: hp('11%'),
    // width:wp('45%'),
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
  // backgroundimage:{
  //   position:'relative',
  //   //marginTop:'10%',
  // //  padding:'4%'
  // },
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
    marginBottom: '3%',
    marginTop: '5%'
  },
  carditem: {
    textAlign: 'center', borderRadius: 5
  },
  help: {
    alignItems: 'flex-end',
    //   position:'absolute',
    // left:0,
    // right:0,
    // zIndex: 2
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
    marginTop: '3%',
    marginBottom: '2%'
  }
})