
import React, { Component, Fragment } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerActions } from 'react-navigation-drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import PersonalScreen from '../EditProfile/Personal';
import LifeStyleScreen from '../EditProfile/LifeStyle';
// import MedicalScreen from '../EditProfile/Medical'
import { Header, Title, Left, Right, Body, Text } from 'native-base';
import { View, TouchableOpacity, Image, ImageBackground, StyleSheet, Modal, Switch, Alert } from 'react-native';
import Icon1 from 'react-native-vector-icons/Ionicons';
import SidebarServices from '../../Services/ProfileServices/ProfileServices'
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from "react-native-gesture-handler";
import RadioForm from 'react-native-simple-radio-button';
import { Input } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import NumericInput from 'react-native-numeric-input'
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker'
import Loader from '../../Components/Loader'
import DocumentPicker from 'react-native-document-picker';
import ProfileServices from '../../Services/ProfileServices/ProfileServices'
import RNFetchBlob from 'rn-fetch-blob'
import ImagePath from '../../Services/ImagePath'
import SearchableDropdown from 'react-native-searchable-dropdown';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import SelectMultiple from 'react-native-select-multiple'

const GOOGLE_PLACES_API_KEY = 'AIzaSyBxPqdmg2ouIJZs4SKNHC3N2Qbi7mdboFY'; // never save your real api key in a snack!

const Tab = createMaterialTopTabNavigator();

class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: '',
      businessType: "",
      legel_enetity: '',
      clinic: '',
      ShopAct: "",
      gstno: '',
      location: '',
      infoId: "",
      token: ""
    }
  }




  async componentDidMount() {
    let token = await AsyncStorage.getItem("Token")
    //console.log("token#%%%%%%% personal",token)
    this.setState({
      token: token,
      //loading: true,
    })
    this.basicUserinfo(token)
  }

  basicUserinfo(token) {
    if (token) {
      SidebarServices.getBasicDetails(token).then(response => {
        // console.log("response in getBasicDetails profile initial================", response.data);
        if (response) {
          if (response.status == 200) {
            AsyncStorage.setItem("personalInfoId", response.data.user.personal_info_id)
            console.log("personalinfoid---------------------------->>>", response.data.user.personal_info_id)
            this.setState({ infoId: response.data.user.personal_info_id })
          }

        }
        else {
          this.setState({
            loading: false
          })
          Alert.alert("Error", "Failed to get user information.")
        }
      }).catch((err) => {
        this.setState({
          loading: false
        })
        console.log("Err in get User Details======>", err);
      })
    }
  }





  handleSave = () => {



    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token,

      },
      // body: JSON.stringify({
      body: JSON.stringify({

        role_id: 1,
        workingwithus: 1,
        personalInfoId: this.state.infoId,
        services: [{
          businesses: [{
            name: this.state.clinic,
            gst_no: this.state.gstno,
            shop_act_no: (this.state.ShopAct),
            business_type: this.state.businessType.value,
            business_legal_type: (this.state.legel_enetity.value),
            short_address: this.state.location,
            latitude: "",
            longitude: ""

          }],
        }]


      })
    };
    console.log("business dat------------------------->>>", requestOptions)
    fetch("https://svcaapkadoctor.azurewebsites.net/api/profiles/", requestOptions)
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



  render() {

    //console.log("basicUserData1======================", this.state.height);
    // console.log("height======================", this.state.height);
    return (
      <ScrollView keyboardShouldPersistTaps='always' >
        <Loader loading={this.state.loading} />
        <View style={{ backgroundColor: '#fff', padding: '5%' }}>
          <View style={{ width: '100%' }}>
            <Text >Business Type</Text>
            <DropDownPicker style={{ width: '100%' }}
              items={[
                { label: 'hospital', value: 'hospital' },
                { label: 'clinic', value: 'clinic' },
              ]}
              placeholder={this.state.businessType}
              containerStyle={{ height: 40, padding: '0%' }}
              style={{ backgroundColor: '#fafafa' }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={text => this.setState({ businessType: text })}
            />
          </View>

          <View style={{ width: '100%' }}>
            <Text >Legel Entity</Text>
            <DropDownPicker style={{ width: '100%' }}
              items={[
                { label: 'Pvt', value: 'pvt' },
                { label: 'LLP', value: 'llp' },
              ]}
              placeholder={this.state.legel_enetity}
              // defaultValue={bloodobj}
              containerStyle={{ height: 40, padding: '0%' }}
              style={{ backgroundColor: '#fafafa' }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={text => this.setState({ legel_enetity: text })}
            />
          </View>

          <View>
            <Input
              containerStyle={{ height: 40, marginTop: 20 }}
              placeholder='Enter Clinic/Hospital Name'
              style={{ fontSize: 14 }}
              value={this.state.clinic}
              inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03B38F' }}
              leftIconContainerStyle={{ marginLeft: 2 }}
              onChangeText={(text) => this.setState({
                clinic: text
              })}
            // errorMessage={this.state.userNameErrMsg}

            />
          </View>
          <View>
            <Input
              containerStyle={{ height: 40, marginTop: 20 }}
              placeholder='Enter ShopAct Number'
              style={{ fontSize: 14 }}
              value={this.state.ShopAct}
              inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03B38F' }}
              leftIconContainerStyle={{ marginLeft: 2 }}
              onChangeText={(text) => this.setState({
                ShopAct: text
              })}
            // errorMessage={this.state.userNameErrMsg}

            />
          </View>
          <View>
            <Input
              containerStyle={{ height: 40, marginTop: 20 }}
              placeholder='Enter GST Number'
              style={{ fontSize: 14 }}
              value={this.state.gstno}
              inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03B38F' }}
              leftIconContainerStyle={{ marginLeft: 2 }}
              onChangeText={(text) => this.setState({
                gstno: text
              })}
            // errorMessage={this.state.userNameErrMsg}

            />
          </View>

          <View style={{ marginTop: 10, borderRadius: 5, borderColor: 'green' }}>
            <GooglePlacesAutocomplete
              placeholder="Search"
              autoFocus={false}
              returnKeyType={'search'}
              fetchDetails={true}
              renderDescription={row => row.description}
              listViewDisplayed={false}
              query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'en', // language of the results
              }}
              onPress={(data, details = null) => {
                console.log(data.description)
                this.setState({ location: data.description })
              }}
              onFail={(error) => console.error(error)}


            />
          </View>



          <View style={{ paddingTop: '10%', paddingBottom: '10%' }}>
            <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#03b38f', padding: 10, borderRadius: 10 }}>
              <Text onPress={this.handleSave} style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', alignContent: 'center' }} > SAVE</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    )
  }
}


 const fruits = [
    { label: '10.00AM', value: '10.00AM'},
    { label: '10.30AM', value: '10.30AM' },
    { label: '11.00AM', value: '11.00AM' },
    { label: '11.30AM', value: '11.30AM' },
    { label: '12.00AM', value: '12.00AM' },
    { label: '12.30AM', value: '12.30AM' }
  ]

class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageData: [],
      selectedlanguge: [],
      streamData: [],
      selectedstreamData: [],
      qualData: [],
      selectedqualData: [],
      specialityData: [],
      selectspecialityData: [],
      superSpecialitiesData: [],
      selectsuperSpecialitiesData: [],
      slots:[],
      weekdays:"Select days",
      selectService:"Select Service",
      selectHospital:"Select Hospital/Clinic",
      selectedFruits: []
    }
  }


  async componentDidMount() {

    console.log("asybnnnn")
    let token = await AsyncStorage.getItem('Token')
    console.log("token%%%%%%%%%%%%%%%%in aycn$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", token)

    if (token) {
      // this.getSlots(token);
     
    }

  }



  getSlots = async (token) => {
    fetch("https://svcaapkadoctor.azurewebsites.net/api/slots/users", {
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
        //    console.log("#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",response)
        console.log("slots--------------------------------->>>...", response);
        // let data = response.map((data) => {
        //   return { value: data.super_speciality_id, label: data.name }
        // })

        let arr = []
        response.map(i => {
          arr.push({
            id: i.super_speciality_id,
            name: i.name,
          })
        })
        this.setState({ superSpecialitiesData: arr })
        //  this.getSections(uid,response)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  handlweekdays = (bg) => {
    console.log("weekdays------------->>", bg.value)
    this.setState({
      weekdays: bg.value
    })
  }
  handlService = (bg) => {
    console.log("weekdays------------->>", bg.value)
    this.setState({
      selectService: bg.value
    })
  }
  handlClinic = (bg) => {
    console.log("weekdays------------->>", bg.value)
    this.setState({
      selectHospital: bg.value
    })
  }
  

  handleSubmit = async () => {

    let token = await AsyncStorage.getItem('Token')
    console.log("token%%%%%%%%%%%%%%%%in aycn$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", token)

    alert("Data has been updated");
    if (token) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,

        },

        body: JSON.stringify({
          workingwithus: 1,
        
        })
      };

      console.log("request option------------------->>>", requestOptions)
      fetch("https://svcaapkadoctor.azurewebsites.net/api/profiles/", requestOptions)
        .then(function (response) {

          console.log("REgistraton succes data...", response);

          if (response.status == 200) {

            console.log("REgistraton succes data...", response);
            // Alert.alert('Congrates!', "Bsic registration has been done, Please login and go to profile to verify documents")
            _base.props.navigation.navigate("Login")
          }

        }, function (err) {
          console.log("err in registration---------------------->>", err)
        })
    }

  }

  onSelectionsChange = (selectedFruits) => {
    this.setState({ selectedFruits })
  }

  render() {
    return (

      <ScrollView>
          <View style={{ width: '100%' }}>
              <DropDownPicker style={{ width: '100%' }}
                items={[

                  { label: 'Daily', value: '7' },
                  { label: 'Sunday', value: '1' },
                  { label: 'Monday', value: '2' },
                  { label: 'Tuseday', value: '3' },
                  { label: 'Wednesday', value: '4' },
                  { label: 'Thursday', value: '5' },
                  { label: 'Friday', value: '6' },
                  { label: 'Saturday', value: '0' }
                ]}

                placeholder={this.state.weekdays}
                //defaultValue={bloodobj}
                containerStyle={{ height: 40, padding: '0%' }}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={bg => this.handlweekdays(bg)}
              />
            </View>

            <View style={{ width: '100%' }}>
              <DropDownPicker style={{ width: '100%' }}
                items={[

                  { label: 'Appointment', value: '2' },
                  { label: 'Online Consultation', value: '1' },
                 
                ]}
                placeholder={this.state.selectService}
                // defaultValue={bloodobj}
                containerStyle={{ height: 40, padding: '0%' }}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={bg => this.handlService(bg)}
              />
            </View>

            <View style={{ width: '100%' }}>
              <DropDownPicker style={{ width: '100%' }}
                items={[

                  { label: 'Clinic', value: '2' },
                  { label: 'Hospital', value: '1' },
                 
                ]}
                placeholder={this.state.selectHospital}
                // defaultValue={bloodobj}
                containerStyle={{ height: 40, padding: '0%' }}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={bg => this.handlService(bg)}
              />
            </View>

            <View>
              <Text style={{padding:12,fontSize:14}}>Select Slot</Text>
                <ScrollView style={{height:'30%'}}>
                  <SelectMultiple
                    items={fruits}
                    selectedItems={this.state.selectedFruits}
                    onSelectionsChange={this.onSelectionsChange} />
                </ScrollView>
            </View>

        <TouchableOpacity style={styles.button}
          onPress={(e) => this.handleSubmit(e)}>
          <Text style={{ fontSize: 16, marginVertical: '3%', color: '#fff', marginHorizontal: '35%' }}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}




export default class WorkInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      doc_status: ''
    }
  }

  render() {
    return (
      <>
        <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
          <Body>
            <Title style={{ color: '#fff', marginLeft: '45%', fontSize: 25 }}>WorkInfo</Title>
          </Body>
          <Right>
            <TouchableOpacity>
              <Icon1 name='notifications-outline' color='#fff' size={25} style={{ marginRight: '5%' }} />
            </TouchableOpacity>
          </Right>

        </Header>

        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Feed"
            tabBarOptions={{
              activeTintColor: '#fff',
              tabStyle: { borderRightColor: '#fff', borderRightWidth: 2 },
              labelStyle: { fontSize: 14, fontWeight: 'bold', },
              style: { backgroundColor: '#03b38f', borderRightWidth: 0.8 },
            }}
          >
            <Tab.Screen
              name="Personal"
              component={Personal}
              options={{ tabBarLabel: 'Work info' }}
            />
            <Tab.Screen
              name="PersonalInfo"
              component={PersonalInfo}
              options={{ tabBarLabel: 'Set slot' }}
            />
          </Tab.Navigator>
        </NavigationContainer>

      </>
    );
  }
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#03b38f',
    alignSelf: 'center',
    borderRadius: 30,
    marginBottom: '5%',
    marginTop: '5%'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  Container: {
    padding: '5%',
    marginBottom: '60%',
    //backgroundColor:'red'
  },
  personalprofile: {
    flexDirection: 'row',
    marginBottom: '5%',
    justifyContent: 'space-between',
  },
  lines: {
    borderColor: '#dedddd',
    borderWidth: 0.5,
    width: "100%",
    //marginTop:'4%',
    marginBottom: '4%',
    marginHorizontal: '0%'
  },
  radio: {
    marginTop: '2%',
    marginBottom: '2%',
    fontSize: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    color: '#817a7a',
  }
})