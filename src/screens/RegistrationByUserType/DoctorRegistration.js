import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, Text, ImageBackground, Switch, StyleSheet, Alert } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Card, CardItem, Body, Container } from 'native-base';
import { Input } from 'react-native-elements'
import DeviceInfo from 'react-native-device-info'
import DatePicker from 'react-native-datepicker'

// import ToggleSwitch from 'toggle-switch-react-native'
import CheckBox from '@react-native-community/checkbox';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

// import \{Hr}  from 'react-native-hr'
import RegistrationServices from '../../Services/RegistrationService/RegistrationServices'
import Loader from '../../Components/Loader'


var radio_props = [
  { label: 'Female', value: 0 },
  { label: 'Male', value: 1 },
  { label: 'Other', value: 2 }

];
export default class DoctorRegistration extends Component {
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
      toggleCheckBox: false,
      value: '',
      fName: '',
      fNameError: '',
      lName: '',
      lNameError: '',
      mName: '',
      mNameError: '',
      dob: '',
      dobError: '',
      age: '',
      ageError: '',
      weight: '',
      weightError: '',
      height: '',
      heightError: '',
      gender: 0,
      switch1Value: false,
      date:''
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
    let obj = {
      fName: this.state.fName,
      lName: this.state.lName,
      mName: this.state.mName,
      dob: this.state.date,
      age: this.state.age,
      weight: this.state.weight,
      height: this.state.height,
      gender: this.state.value,

    }
    console.log('objjjjj', obj);
    this.props.navigation.navigate('DoctorRegistrationAddress',{item:obj})
    // const IMEIObj = require('react-native-imei')
    // let IMEI=IMEIObj.getImei()

    // let id = DeviceInfo.getDeviceId();
    // console.log("id=================", id);
    // // const IMEI = require('react-native-imei');
    // let imeiArr = []
    // IMEI.getImei().then(imeiList => {
    //   console.log("imeiList========", imeiList)
    //   imeiArr.push(imeiList)
    // });

    // this.setState({
    //   loading: true
    // })

    // let data = {
    //   password: this.state.password,
    //   mobile: this.state.mobileNo,
    //   user_full_name: this.state.userFullName,
    //   email: this.state.email,
    //   device_id: id,
    //   IMEI: imeiArr[0],
    // }

   
   

    

  }
  render() {

    return (
      <Container>
        <ScrollView>
          <Loader loading={this.state.loading} />
          <View style={{ marginHorixzontal: '0%' }}>


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
                        <Text style={styles.cardtitle} >Basic Details</Text>
                        <Input
                          containerStyle={{ height: 40, marginTop: 10 }}
                          placeholder='First Name*'
                          placeholderTextColor="gray"
                          style={{ fontSize: 14 }}
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', borderRadius: 10, borderColor: '#03b38f' }}
                          leftIconContainerStyle={{ marginLeft: 2 }}
                          onChangeText={(fName) => this.setState({ fName: fName })}

                        // value={mobile}
                        // onChangeText={text => this.handleNameChange(text)}

                        />
                        {this.state.userFullNameErrMsg !== "" ?
                          <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.userFullNameErrMsg}</Text>
                          : null}
                        <Input
                          containerStyle={{ height: 40, marginTop: 10 }}
                          placeholder="Middle Name*"
                          style={{ fontSize: 14 }}
                          placeholderTextColor="gray"
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', borderRadius: 10, borderColor: '#03b38f' }}
                          inputStyle={{ color: 'black' }}
                          onChangeText={(mName) => this.setState({ mName: mName })}

                        // onChangeText={(text) => this.handleMobileChange(text)}

                        />
                        {this.state.mobileNoErrMsg !== "" ?
                          <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.mobileNoErrMsg}</Text>
                          : null}
                        <Input
                          containerStyle={{ height: 40, marginTop: 10 }}
                          placeholder="Last Name*"
                          style={{ fontSize: 14 }}
                          type="email"
                          placeholderTextColor="gray"
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', borderRadius: 10, borderColor: '#03b38f' }}
                          inputStyle={{ color: 'black' }}
                          onChangeText={(lName) => this.setState({ lName: lName })}

                        // onChangeText={(email) => this.handleEmailChange(email)}

                        />
                        {this.state.emailErrMsg !== "" ?
                          <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.emailErrMsg}</Text>
                          : null}
                          <DatePicker
                        style={{ width: 290, height: 50, marginHorizontal: '5%', marginVertical: '1%', marginTop: '8%' ,borderRadius:40}}
                        date={this.state.date}
                        mode="date"
                        placeholder="Date of Birth"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        maxDate={new Date()}
                        customStyles={{
                          dateIcon: {
                              position: 'absolute',
                              left: 0,
                              top: 4,
                              marginLeft: 0,
                              borderRadius: 30,
                              color: '#333'
                          },
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />
                        {/* <Input
                          containerStyle={{ height: 40, marginTop: 10, }}
                          placeholder="Date Of Birth*"
                          placeholderTextColor="gray"
                          style={{ fontSize: 14 }}
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', fontSize: 9, borderRadius: 10, borderColor: '#03b38f' }}
                          inputStyle={{ color: 'black' }}
                          onChangeText={(dob) => this.setState({ dob: dob })}

                     

                        />
                        {this.state.passwordErrMsg !== "" ?
                          <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.passwordErrMsg}</Text>
                          : null} */}
                        <Input
                          containerStyle={{ height: 40, marginTop: 10, }}
                          placeholder="Age*"
                          placeholderTextColor="gray"
                          style={{ fontSize: 14 }}
                          keyboardType="numeric"
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', fontSize: 9, borderRadius: 10, borderColor: '#03b38f' }}
                          inputStyle={{ color: 'black' }}
                          onChangeText={(age) => this.setState({ age: age })}

                        // onChangeText={(c_pass) => this.handleConfirmPassword(c_pass)}

                        />
                        {this.state.c_passErrMsg !== "" ?
                          <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.c_passErrMsg}</Text>
                          : null}
                        <Input
                          containerStyle={{ height: 40, marginTop: 10, }}
                          placeholder="Weight (kg)*"
                          placeholderTextColor="gray"
                          style={{ fontSize: 14 }}
                          keyboardType="numeric"
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', fontSize: 9, borderRadius: 10, borderColor: '#03b38f' }}
                          inputStyle={{ color: 'black' }}
                          onChangeText={(weight) => this.setState({ weight: weight })}

                        // onChangeText={(c_pass) => this.handleConfirmPassword(c_pass)}

                        />
                        {this.state.c_passErrMsg !== "" ?
                          <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.c_passErrMsg}</Text>
                          : null}
                        <Input
                          containerStyle={{ height: 40, marginTop: 10, }}
                          placeholder="Height (cm)*"
                          placeholderTextColor="gray"
                          style={{ fontSize: 14 }}
                          keyboardType="numeric"
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', fontSize: 9, borderRadius: 10, borderColor: '#03b38f' }}
                          inputStyle={{ color: 'black' }}
                          // secureTextEntry={true}
                          onChangeText={(height) => this.setState({ height: height })}

                        // onChangeText={(c_pass) => this.handleConfirmPassword(c_pass)}

                        />
                        {this.state.c_passErrMsg !== "" ?
                          <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.c_passErrMsg}</Text>
                          : null}
                        <View style={{ marginTop: '8%' }}>
                          <RadioForm
                            radio_props={radio_props}
                            initial={0}
                            formHorizontal={true}
                            buttonInnerColor={'#999'}
                            // buttonOuterColor={'green'}
                            onPress={(value) => { this.setState({ value: value }) }}
                            buttonOuterColor={'red'}
                            buttonSize={10}
                            buttonOuterSize={20}
                            labelStyle={{ fontSize: 15, marginRight: 10 }}
                            // buttonStyle={{marginLeft: 10}}
                            buttonWrapStyle={{ marginLeft: 0 }}

                          />

                        </View>
                       
                        <View style={styles.note}>
                          <Text style={styles.noteText}> </Text>
                        </View>
                        <TouchableOpacity style={styles.button}
                          onPress={(e) => this.handleRegister(e)}>
                          <Text style={{ fontSize: 16, marginVertical: '3%', color: '#fff', marginHorizontal: '35%' }}>Register</Text>
                        </TouchableOpacity>


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
    width: wp('45%'),
    marginLeft: '0%',
    resizeMode: 'cover',
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
    marginTop: '0%',
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