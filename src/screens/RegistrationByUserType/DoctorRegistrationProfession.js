import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, Text, ImageBackground, Switch, StyleSheet, Alert } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Card, CardItem, Body, Container } from 'native-base';
import { Input } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';

import { Dropdown } from 'react-native-material-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import DeviceInfo from 'react-native-device-info'
import ToggleSwitch from 'toggle-switch-react-native'
import CheckBox from '@react-native-community/checkbox';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

// import \{Hr}  from 'react-native-hr'
import RegistrationServices from '../../Services/RegistrationService/RegistrationServices'
import Loader from '../../Components/Loader'
import Axios from 'axios'


var radio_props = [
  { label: 'Female', value: 0 },
  { label: 'Male', value: 1 },
  { label: 'Other', value: 2 }

];
export default class DoctorRegistrationProfession extends Component {
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
      rolesData: [],
      streamData: [],
      qualData: [],
      specialityData: [],
      superSpecialitiesData: [],
      RID: '',
      selectProf: '',
      selectStream: '',
      selectQual: '',
      selectsuper: '',
      selectspeciality: ''

    }
  }
  async componentDidMount() {
    this.getProfessions();
    this.getStreams();

    this.getQualification();
    this.getSpeciality();
    this.getSuperSpeciality();

    let mobileNo = this.props.navigation.getParam('mobileNo', "");
    let token = this.props.navigation.getParam("token")
    this.setState({
      mobileNo: mobileNo,
      token: token
    })



  }
  getProfessions = async () => {
    let token = await AsyncStorage.getItem('token')

    fetch("https://svcaapkadoctor.azurewebsites.net/api/roles", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImZlYWFiNjMwLWM3NGYtNDQ1ZC04M2Q2LTcwNzVjMzY0YjQyZiIsInJvbGUiOiIwIiwibmJmIjoxNjAyODU1NzUyLCJleHAiOjE2MzQzOTE3NTIsImlhdCI6MTYwMjg1NTc1Mn0.nuifKaLfLgw7NoQk4CK6aDJjQw1PdPZapHtI6Hg08_g'


      },

    })
      .then(response => response.json())
      .then((response) => {
        // this.getSections(response,uid)

        // console.log("country data...", response);
        let data = response.map((data) => {
          return { value: data.role_id, label: data.name }
        })
        // console.log('country dataaaaaaaaaaa', data);
        this.setState({ rolesData: data })
        //  this.getSections(uid,response)

      })
      .catch((error) => {
        console.error(error);
      })


  }
  getStreams = async () => {
    let token = await AsyncStorage.getItem('token')

    fetch("https://svcaapkadoctor.azurewebsites.net/api/streams", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImZlYWFiNjMwLWM3NGYtNDQ1ZC04M2Q2LTcwNzVjMzY0YjQyZiIsInJvbGUiOiIwIiwibmJmIjoxNjAyODU1NzUyLCJleHAiOjE2MzQzOTE3NTIsImlhdCI6MTYwMjg1NTc1Mn0.nuifKaLfLgw7NoQk4CK6aDJjQw1PdPZapHtI6Hg08_g'


      },

    })
      .then(response => response.json())
      .then((response) => {
        // this.getSections(response,uid)

        // console.log("country data...", response);
        let data = response.map((data) => {
          return { value: data.stream_id, label: data.name }
        })
        // console.log('country dataaaaaaaaaaa', data);
        this.setState({ streamData: data })
        //  this.getSections(uid,response)

      })
      .catch((error) => {
        console.error(error);
      })


  }
  getQualification = async () => {
    let token = await AsyncStorage.getItem('token')

    fetch("https://svcaapkadoctor.azurewebsites.net/api/qualifications", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImZlYWFiNjMwLWM3NGYtNDQ1ZC04M2Q2LTcwNzVjMzY0YjQyZiIsInJvbGUiOiIwIiwibmJmIjoxNjAyODU1NzUyLCJleHAiOjE2MzQzOTE3NTIsImlhdCI6MTYwMjg1NTc1Mn0.nuifKaLfLgw7NoQk4CK6aDJjQw1PdPZapHtI6Hg08_g'


      },

    })
      .then(response => response.json())
      .then((response) => {
        // this.getSections(response,uid)

        // console.log("country data...", response);
        let data = response.map((data) => {
          return { value: data.qualification_id, label: data.short_name }
        })
        // console.log('country dataaaaaaaaaaa', data);
        this.setState({ qualData: data })
        //  this.getSections(uid,response)

      })
      .catch((error) => {
        console.error(error);
      })


  }
  // getPracticing = async () => {
  //   let token = await AsyncStorage.getItem('token')

  //   fetch("https://svcaapkadoctor.azurewebsites.net/api/areas/countries", {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + token

  //     },

  //   })
  //     .then(response => response.json())
  //     .then((response) => {

  //       console.log("country data...", response);
  //       let data = response.map((data) => {
  //         return { value: data.country_code, label: data.name }
  //       })
  //       this.setState({ countriesData: data })

  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     })


  // }
  getSpeciality = async () => {
    let token = await AsyncStorage.getItem('token')

    fetch("https://svcaapkadoctor.azurewebsites.net/api/specialities", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImZlYWFiNjMwLWM3NGYtNDQ1ZC04M2Q2LTcwNzVjMzY0YjQyZiIsInJvbGUiOiIwIiwibmJmIjoxNjAyODU1NzUyLCJleHAiOjE2MzQzOTE3NTIsImlhdCI6MTYwMjg1NTc1Mn0.nuifKaLfLgw7NoQk4CK6aDJjQw1PdPZapHtI6Hg08_g'


      },

    })
      .then(response => response.json())
      .then((response) => {
        // this.getSections(response,uid)

        console.log("country data...", response);
        let data = response.map((data) => {
          return { value: data.speciality_id, label: data.name }
        })
        console.log('country dataaaaaaaaaaa', data);
        this.setState({ specialityData: data })
        //  this.getSections(uid,response)

      })
      .catch((error) => {
        console.error(error);
      })


  }
  getSuperSpeciality = async () => {
    let token = await AsyncStorage.getItem('token')

    fetch("https://svcaapkadoctor.azurewebsites.net/api/superspecialiity", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImZlYWFiNjMwLWM3NGYtNDQ1ZC04M2Q2LTcwNzVjMzY0YjQyZiIsInJvbGUiOiIwIiwibmJmIjoxNjAyODU1NzUyLCJleHAiOjE2MzQzOTE3NTIsImlhdCI6MTYwMjg1NTc1Mn0.nuifKaLfLgw7NoQk4CK6aDJjQw1PdPZapHtI6Hg08_g'

      },

    })
      .then(response => response.json())
      .then((response) => {
        // this.getSections(response,uid)

        // console.log(" supere   country data...", response);
        let data = response.map((data) => {
          return { value: data.super_speciality_id, label: data.name }
        })
        // console.log('country dataaaaaaaaaaa', data);
        this.setState({ superSpecialitiesData: data })
        //  this.getSections(uid,response)
      })
      .catch((error) => {
        console.error(error);
      })


  }


  handleRegister = async (e) => {
    // let obj1 = this.props.navigation.getParam('obj1', "");
    let obj2 = this.props.navigation.getParam('obj2', "");
    let _base = this;
    // let gen = ''
    // if (obj1.gender === '0') {
    //   gen = 'Female'
    // } if (obj1.gender === '1') {
    //   gen = 'male'
    // } else {
    //   gen = 'Other'
    // }
    let fullName = await AsyncStorage.getItem('FullName')
    let gtoken = await AsyncStorage.getItem('Gtoken')
    console.log("Gtoken", gtoken);
    if (gtoken) {

      const requestOptions = { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + gtoken,

        },
        // body: JSON.stringify({
          body: JSON.stringify({

          role_id: this.state.selectProf,
          workingwithus: 1,
          
          user: {
            first_name:fullName,
            middle_name: " ",
            last_name: " ",
         
          },
          contact: [{
            contact_type: "Residential",
            addressline_1: obj2.address,
            addressline_2: obj2.address,
            city_code: obj2.city,
            state_code: obj2.state,
            country_code: obj2.country,
            area_pin_code: obj2.pincode,
            alt_mobile: obj2.alternateMob,
            phone: obj2.landLine,
            email_id: obj2.email
          }],
          streams: [{
            stream_id: this.state.selectStream
          }],
          qualifications: [{
            qualification_id: this.state.selectQual,
            month: 1,
            year: 2019,
            reg_number: this.state.RID
          }],
          specialities: [{
            speciality_id: this.state.selectspeciality
          }],
          superspecialities: [{
            super_speciality_id: this.state.selectsuper
          }]
        })
      };
      console.log("request option------------------->>>", requestOptions)
      fetch("https://svcaapkadoctor.azurewebsites.net/api/profiles/",requestOptions)
        .then(function (response) {

          console.log("REgistraton succes data...", response);

          if (response.status == 200) {

            console.log("REgistraton succes data...", response);
            Alert.alert('Congrates!', "Basic registration has been done, Please login and go to profile to verify documents")
            _base.props.navigation.navigate("Login")
          }

        }, function (err) {
          console.log("err in registration---------------------->>", err)
        })

    }
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
                        <Text style={styles.cardtitle} >Profession Details</Text>
                        <Dropdown
                          label='Select Profession'
                          data={this.state.rolesData}
                          containerStyle={{ width: 300 }}
                          onChangeText={(item) => this.setState({ selectProf: item })}
                        />

                        <Dropdown
                          label='Select Stream'
                          data={this.state.streamData}
                          containerStyle={{ width: 300 }}
                          onChangeText={(item) => this.setState({ selectStream: item })}
                        />


                        <Dropdown
                          label='Select Qualification'
                          data={this.state.qualData}
                          containerStyle={{ width: 300 }}
                          onChangeText={(item) => this.setState({ selectQual: item })}
                        />



                        <Input
                          containerStyle={{ height: 40, marginTop: 10, }}
                          placeholder="Reg ID *"
                          placeholderTextColor="gray"
                          style={{ fontSize: 14 }}
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', fontSize: 9, borderRadius: 10, borderColor: '#03b38f' }}
                          inputStyle={{ color: 'black' }}
                          onChangeText={(RID) => this.setState({ RID: RID })}
                        //inputContainerStyle={styles.inp}
                        // errorStyle={{color:'red',fontSize: 16}}
                        // errorMessage={ this.state.namerror }
                        //value={this.state.name} 
                        />
                        {this.state.passwordErrMsg !== "" ?
                          <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.passwordErrMsg}</Text>
                          : null}



                        {/* <Dropdown
                          label='Practising Since'
                          data={this.state.countriesData}
                          containerStyle={{ width: 300 }}
                          onChangeText={(item) => this.onchanges(item)}
                        /> */}




                        <Dropdown
                          label='Speciality '
                          data={this.state.specialityData}
                          containerStyle={{ width: 300 }}
                          onChangeText={(item) => this.setState({ selectspeciality: item })}
                        />



                        <Dropdown
                          label='Super-Speciality'
                          data={this.state.superSpecialitiesData}
                          containerStyle={{ width: 300 }}
                          onChangeText={(item) => this.setState({ selectsuper: item })}
                        />

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
    paddingTop: '0%',
    paddingRight: '5%',
    paddingLeft: '5%',
    paddingBottom: '0%'
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