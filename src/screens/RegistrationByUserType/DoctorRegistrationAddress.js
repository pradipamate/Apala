import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, Text, ImageBackground, Switch, StyleSheet, Alert } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Card, CardItem, Body, Container } from 'native-base';
import { Input } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-material-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info'
import ToggleSwitch from 'toggle-switch-react-native'
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
export default class DoctorRegistrationAddress extends Component {
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
      landLine: '',
      isOn: false,
      toggleCheckBox: false,
      value: '',
      item: {},
      countriesData: [],
      citesData: [],
      statesData: [],
      selectedCountry: '',
      selectedcity: '',
      selectedstate: ''
    }
  }
  async componentDidMount() {
    this.getCountries();
    // let item = this.props.navigation.getParam('item', "");
    let token = this.props.navigation.getParam("token")
    this.setState({

      token: token,
      // item: item
    })

  }
  handleRegister = (e) => {
    let obj1 = {
      address: this.state.address,
      country: this.state.selectedCountry,
      state: this.state.selectedstate,
      city: this.state.selectedcity,
      pincode: this.state.pincode,
      alternateMob: this.state.alternateMob,
      landLine: this.state.landLine,
      // email: this.state.email

    }
    console.log("addrsss", obj1);
    // let item = this.props.navigation.getParam('item', "");
    this.props.navigation.navigate('DoctorRegistrationProfession', {  obj2: obj1 })
    // const IMEIObj = require('react-native-imei')
    // let IMEI=IMEIObj.getImei()


  }
  getCountries = async () => {
    let token = await AsyncStorage.getItem('token')

    fetch("https://svcaapkadoctor.azurewebsites.net/api/areas/countries", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token

      },

    })
      .then(response => response.json())
      .then((response) => {
        // this.getSections(response,uid)

        // console.log("country data...", response);
        let data = response.map((data) => {
          return { value: data.country_code, label: data.name }
        })
        // console.log('country dataaaaaaaaaaa', data);
        this.setState({ countriesData: data })
        //  this.getSections(uid,response)

      })
      .catch((error) => {
        console.error(error);
      })


  }
  getStates = async (id) => {
    let token = await AsyncStorage.getItem('token')

    fetch("https://svcaapkadoctor.azurewebsites.net/api/areas/states/" + id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token

      },

    })
      .then(response => response.json())
      .then((response) => {
        // this.getSections(response,uid)

        // console.log("states data...", response);
        let data = response.map((data) => {
          return { value: data.state_code, label: data.name }
        })
        // console.log('states dataaaaaaaaaaa', data);
        this.setState({ statesData: data })
        //  this.getSections(uid,response)

      })
      .catch((error) => {
        console.error(error);
      })


  }
  getCities = async (id) => {
    let token = await AsyncStorage.getItem('token')
    fetch("https://svcaapkadoctor.azurewebsites.net/api/areas/cities/" + id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token

      },

    })
      .then(response => response.json())
      .then((response) => {
        // this.getSections(response,uid)

        // console.log("cities data...", response);
        let data = response.map((data) => {
          return { value: data.city_code, label: data.name }
        })
        // console.log('cities dataaaaaaaaaaa', data);
        this.setState({ citesData: data })
        //  this.getSections(uid,response)

      })
      .catch((error) => {
        console.error(error);
      })


  }
  onchanges = (item) => {
    console.log("country code", item);
    this.setState({
      selectedCountry: item
    })
    this.getStates(item)
  }
  onchanges1 = (item) => {
    this.setState({
      selectedstate: item
    })
    this.getCities(item)
  }

  render() {

    return (
      <Container style={{ marginHorizontal: '0%', height: "100%", }}>
        <ScrollView >
          <Loader loading={this.state.loading} />
          <View style={{ marginHorizontal: '0%', flex: 1 }}>


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
                        <Text style={styles.cardtitle} >Residential Address</Text>
                        <Input
                          containerStyle={{ height: 40, marginTop: 10 }}
                          placeholder='Address *'
                          placeholderTextColor="gray"
                          style={{ fontSize: 14 }}
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', borderRadius: 10, borderColor: '#03b38f' }}
                          leftIconContainerStyle={{ marginLeft: 2 }}

                          onChangeText={(address) => this.setState({ address: address })}


                        />




                        <Dropdown
                          label='Select Country'
                          data={this.state.countriesData}
                          containerStyle={{ width: 250 }}
                          onChangeText={(item) => this.onchanges(item)}
                        />

                        <Dropdown
                          label='select State'
                          data={this.state.statesData}
                          containerStyle={{ width: 250 }}
                          onChangeText={(item) => this.onchanges1(item)}

                        />



                        <Dropdown
                          label='Select City'
                          data={this.state.citesData}
                          containerStyle={{ width: 250 }}
                          onChangeText={(item) => this.setState({
                            selectedcity: item
                          })}

                        />


                        <Input
                          containerStyle={{ height: 40, marginTop: 10, }}
                          placeholder="Pin Code *"
                          placeholderTextColor="gray"
                          style={{ fontSize: 14 }}
                          keyboardType='phone-pad'
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', fontSize: 9, borderRadius: 10, borderColor: '#03b38f' }}
                          inputStyle={{ color: 'black' }}
                          onChangeText={(pincode) => this.setState({ pincode: pincode })}

                        />
                        {this.state.c_passErrMsg !== "" ?
                          <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.c_passErrMsg}</Text>
                          : null}
                        <Input
                          containerStyle={{ height: 40, marginTop: 10, }}
                          placeholder="Alternate Mobile Number "
                          placeholderTextColor="gray"
                          keyboardType='phone-pad'
                          style={{ fontSize: 14 }}
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', fontSize: 9, borderRadius: 10, borderColor: '#03b38f' }}
                          inputStyle={{ color: 'black' }}
                          onChangeText={(alternateMob) => this.setState({ alternateMob: alternateMob })}

                        />
                        {this.state.c_passErrMsg !== "" ?
                          <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.c_passErrMsg}</Text>
                          : null}
                        <Input
                          containerStyle={{ height: 40, marginTop: 10, }}
                          placeholder="Landline "
                          placeholderTextColor="gray"
                          keyboardType='phone-pad'
                          style={{ fontSize: 14 }}
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', fontSize: 9, borderRadius: 10, borderColor: '#03b38f' }}
                          inputStyle={{ color: 'black' }}
                          onChangeText={(landLine) => this.setState({ landLine: landLine })}

                        />
                        {this.state.c_passErrMsg !== "" ?
                          <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.c_passErrMsg}</Text>
                          : null}

                        {/* <Input
                          containerStyle={{ height: 40, marginTop: 10, }}
                          placeholder="Email *"
                          placeholderTextColor="gray"
                          keyboardType='email-address'
                          style={{ fontSize: 14 }}
                          inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', fontSize: 9, borderRadius: 10, borderColor: '#03b38f' }}
                          inputStyle={{ color: 'black' }}
                          onChangeText={(email) => this.setState({ email: email })}

                        /> */}
                        {this.state.c_passErrMsg !== "" ?
                          <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.c_passErrMsg}</Text>
                          : null}


                        <View
                          style={styles.lines}
                        />
                        <View style={styles.note}>
                          <Text style={styles.noteText}> </Text>
                        </View>
                        <TouchableOpacity style={styles.button}
                          onPress={(e) => this.handleRegister(e)}>
                          <Text style={{ fontSize: 16, marginVertical: '3%', color: '#fff', marginHorizontal: '35%' }}>Continue</Text>
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
    marginBottom: '5%',
    height: '100%'
  },
  Viewcardpart: {
    marginTop: '0%',
    padding: '5%',
    //  backgroundColor:'red',
    height: '100%'
    // marginBottom:'200%'
  },
  Body: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
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