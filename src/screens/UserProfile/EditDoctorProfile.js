
import React, { Component, Fragment } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerActions } from 'react-navigation-drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import PersonalScreen from '../EditProfile/Personal';
import LifeStyleScreen from '../EditProfile/LifeStyle';
// import MedicalScreen from '../EditProfile/Medical'
import { Header, Title, Left, Right, Body, Text, Container } from 'native-base';
import { View, TouchableOpacity, Image, ImageBackground, StyleSheet, Modal, Switch, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
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

const Tab = createMaterialTopTabNavigator();

class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: '',
      name: "",
      first_name: "",
      last_name: '',
      middle_Name: '',
      aadharNo: 0,
      basicUserData: {},
      gender: "Male",
      mobileNo: "",
      email: "",
      dob: "",
      bloodGroup: "Select Blood Group",
      maritalStatus: 1,
      height: 0,
      inches: "",
      weight: 0,
      EmergencyContact: "",
      EmergencyName: "",
      currentLocation: "",
      city: '',
      first_nameErr: "",
      middle_NameErr: "",
      last_nameErr: '',
      aadharNoErr: "",
      token: "",
      personalInfoId: '',
      loading: false,
      SingleFile: {},
      loading: false,
      role_id: "",
      doc_status: "",
      modalVisible: false
    }
    this.selectFile = this.selectFile.bind(this);
  }


  onupload = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      //console.log('Response = ', response);
      if (response.didCancel) {
        //   console.log('User cancelled image picker');
      } else if (response.error) {
        //   console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
          res: response.uri,
        });
      }
    });
  }


  async componentDidMount() {
    let token = await AsyncStorage.getItem("Token")
    //console.log("token#%%%%%%% personal",token)
    this.setState({
      token: token,
      loading: true,
    })
    this.basicUserinfo(token)
  }


  basicUserinfo = (token) => {
    if (token) {
      SidebarServices.getBasicDetails(token).then(response => {
        // console.log("response in getBasicDetails profile initial================", response.data);
        if (response) {
          if (response.status == 200) {
            AsyncStorage.setItem("personalInfoId", JSON.stringify(response.data.user.personal_info_id))
            console.log("for user------------------------->>>", response.data.user.personal_info_id)
            if (!response.data.user) {
              this.setState({

                basicUserData: response.data.userbasicinfo,
                first_name: response.data.userbasicinfo.user_full_name,
                //personalInfoId: response.data.user.personal_info_id,
                role_id: response.data.userbasicinfo.role_id,

                doc_status: response.data.userbasicinfo.status,
                //  aadharNo:response.data.user.uidai,
                //  height:response.data.user.height.toString(),
                // weight:response.data.user.weight.toString(),
                loading: false
              })
            } else {
              console.log("for user------------------------->>>", response.data.user.personal_info_id)
              this.setState({

                basicUserData: response.data.userbasicinfo,
                first_name: response.data.user.first_name,
                personalInfoId: response.data.user.personal_info_id,
                // role_id: response.data.userbasicinfo.role_id,
                doc_status: response.data.userbasicinfo.status,
                aadharNo: response.data.user.uidai,
                dob: response.data.user.dob,
                bloodGroup: response.data.user.blood_group,
                gender: response.data.user.gender,
                maritalStatus: response.data.user.marital_status,
                //  height:response.data.user.height.toString(),
                // weight:response.data.user.weight.toString(),
                height: response.data.user.height,
                weight: response.data.user.weight,
                loading: false
              })
            }

            this.setState({
              role_id: response.data.userbasicinfo.role_id,
              doc_status: response.data.userbasicinfo.status,
            })

            // console.log(response.data.userbasicinfo.role_id)

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

  handleGender = (gender) => {
    this.setState({
      gender: gender
    })
  }

  handleDOB = (dob) => {
    console.log("dob----------------------->>>", dob)
    this.setState({
      dob: dob
    })
  }

  handleBloodGroup = (bg) => {
    console.log("blood group------------->>", bg.value)
    this.setState({
      bloodGroup: bg.value
    })
  }

  handleMaritalStatus = (mStatus) => {
    this.setState({
      maritalStatus: mStatus
    })
  }

  handleHeight = (height) => {
    console.log("height--------------------->>", height)
    this.setState({
      height: height
    })
  }
  handleInches = (inches) => {
    this.setState({
      inches: inches
    })
  }
  handleWeight = (weight) => {
    this.setState({
      weight: weight
    })
  }

  handleEmergencyName = (name) => {
    this.setState({
      EmergencyName: name
    })
  }
  handleEmergenctContact = (no) => {
    this.setState({
      EmergencyContact: no
    })
  }
  selectCity = (city) => {
    this.setState({
      city: city.value
    })
  }

  handlename = (name) => {
    // console.log(name,"name@$%%%%%%")
    //if(name!==""){
    this.setState({
      first_name: name,
      first_nameErr: ''
    })

  }



  handleAadhar = (aadhar) => {
    //console.log("aadhar#%%%%%%%%",aadhar);
    if (aadhar != "") {
      // if(aadhar){
      this.setState({
        aadharNo: aadhar,
        aadharNoErr: ""
      })
    }
    else {
      this.setState({
        aadharNo: "",
        aadharNoErr: 'Adhar Number Required.'
      })
    }
  }

  handleSave = () => {
    // console.log('first_name342234234234',this.state.first_name)
    var adharcard = /^\d{12}$/;
    var adharsixteendigit = /^\d{16}$/;

    //if(adharcard.test(this.state.aadharNo)){
    let data = {}
    if (this.state.personalInfoId) {
      data = {
        first_name: this.state.first_name,
        middle_name: "",
        last_name: "",
        dob: this.state.dob,
        weight: (this.state.weight),
        gender: this.state.gender,
        height: (this.state.height),
        blood_group: this.state.bloodGroup,
        marital_status: (this.state.maritalStatus),
        uidai: (this.state.aadharNo),
        personal_info_id: this.state.personalInfoId
      }
    }
    else {
      data = {
        first_name: this.state.first_name,
        middle_name: "",
        last_name: "",
        dob: this.state.dob,
        weight: this.state.weight,
        gender: this.state.gender,
        height: this.state.height,
        blood_group: this.state.bloodGroup,
        marital_status: this.state.maritalStatus,
        uidai: this.state.aadharNo
      }
    }

    console.log("data=================>editttttt----------", data);
    // console.log("data=================>editttttt---------peronsal",this.state.token)
    ProfileServices.savePresonalInfo(data, this.state.token).then(response => {
      console.log("this.state.token======================>", this.state.token);
      if (response) {
        console.log("response in save------------------------->>>", response)
        if (response.status == 200 || response.status == 201) {
          Alert.alert("Success", "Personal information updated successfully.")
          this.basicUserinfo(this.state.token);
        }
        else {

        }
      }
    }).catch((e) => {
      console.log("error in savePresonalInfo=========>", e);
    })
  }


  selectFile = async () => {
    //Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        //Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // console.log('res : ' + res[0].type);
      //Setting the state to show single file attributes
      if (res) {
        this.setState({ SingleFile: res });
        this.uploadImage(res)
      }

    } catch (err) {
      this.setState({ SingleFile: {} });
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };


  uploadImage = (response) => {
    console.log("response in uploadImage=================", response);

    let data = [
      // { name: 'case_id', data: (response.case_id.toString()) },
      { name: 'filetype', data: "profilephoto" },
      {
        name: 'files', filename: (response.name),
        data: RNFetchBlob.wrap(response.uri), type: response.type
      }
    ]

    console.log("data in RNFetchBlob uploadImage=====================", data);

    RNFetchBlob.fetch('POST', "https://svcaapkadoctor.azurewebsites.net/api/profiles/uploadphoto", {
      Authorization: `Bearer ${this.state.token}`,
      'Content-Type': 'multipart/form-data',
    }, data).then((response) => response.json())
      .then((response) => {
        console.log("selfieeee blob response....", response);

        if (response !== null) {
          Alert.alert("Success", "Profile uploaded successfully.")
          this.basicUserinfo(this.state.token)
          this.setState({ SingleFile: {} })
        }
      }).catch((err) => {

        this.setState({ SingleFile: {} })
        console.log(" errorrr  Fectch blob response....", err);
      })

  }







  render() {
    var radio_props = [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
      { label: 'Other', value: 'Other' },
    ];
    var radio_props_Maritial_status = [
      { label: 'Married', value: 1 },
      { label: 'Single', value: 0 },
    ];

    //console.log("basicUserData1======================", this.state.height);
    console.log("height======================", this.state.height);
    return (
      <ScrollView>
        <Loader loading={this.state.loading} />
        <View style={{ backgroundColor: '#fff', padding: '5%' }}>
          {/* <Container style={styles.Container}> */}
          <View style={styles.personalprofile}>
            <View>
              {this.state.basicUserData !== undefined ?
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: '1%' }}>{this.state.basicUserData.user_full_name}</Text>
                : null}

            </View>
            <View>
              <Image
                square
                style={{ height: 70, width: 70, borderRadius: 60, marginLeft: '10%', padding: '0%' }}
                source={{ uri: ImagePath + this.state.basicUserData.profile_photo_path }}
              />
              <TouchableOpacity>
                <Text onPress={this.selectFile} style={{ textDecorationLine: 'underline', color: '#03b38f', fontWeight: 'bold' }}>Update Photo</Text>
              </TouchableOpacity>

            </View>
          </View>
          <View style={styles.lines}></View>
          <View style={styles.personalprofile}>
            <View>
              <Text style={styles.text}>Full Name</Text>
            </View>
            <View style={{ width: '50%' }}>
              <Input
                containerStyle={{ height: 50 }}
                placeholder='Enter Here'
                style={{ fontSize: 14, }}
                //leftIconContainerStyle={{ marginLeft: -1 }}
                inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03b38f' }}
                // leftIconContainerStyle={{ marginLeft: 2 }}
                //  value={this.state.basicUserData.user_full_name}
                value={this.state.first_name}
                onChangeText={text => this.handlename(text)}
                errorStyle={{ color: 'red', fontSize: 12, marginTop: 0 }}
                errorMessage={this.state.first_nameErr}
              />
            </View>
          </View>
          <View style={styles.personalprofile}>
            <View>
              <Text style={styles.text}>Contact Number</Text>
            </View>
            <View>
              {this.state.basicUserData !== undefined ?
                <Text>{this.state.basicUserData.mobile}</Text>
                : null}
            </View>
          </View>
          <View style={styles.personalprofile}>
            <View>
              <Text style={styles.text}>Email</Text>
            </View>
            <View>
              {this.state.basicUserData !== undefined ?
                <Text>{this.state.basicUserData.email}</Text>
                : null}
            </View>
          </View>
          <View style={styles.personalprofile}>
            <View>
              <Text style={styles.text}>Gender</Text>
            </View>
            <View>
              <RadioForm
                radio_props={radio_props}
                initial={0}
                buttonSize={10}
                formHorizontal={true}
                buttonInnerColor={'#03b38f'}
                buttonOuterColor={'#03b38f'}
                labelStyle={{ fontSize: 11, marginHorizontal: 5, marginLeft: '0%' }}
                onPress={(value) => this.handleGender(value)}
              />
            </View>
          </View>
          <View style={styles.personalprofile}>
            <View>
              <Text style={styles.text}>Date Of Birth</Text>
            </View>
            <View>
              <DatePicker
                style={{ width: 200 }}
                date={this.state.dob}
                mode="date"
                placeholder="select date"
                // format="MM-DD-YYYY"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                androidMode='default'
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(date) => this.handleDOB(date)}
              />
            </View>
          </View>
          <View style={styles.personalprofile}>
            <View>
              <Text style={styles.text}>Aadhar Number</Text>
            </View>
            <View style={{ width: '50%' }}>
              <Input
                containerStyle={{ height: 50 }}
                placeholder='Enter Here'
                style={{ fontSize: 14, }}
                inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03b38f' }}
                value={this.state.aadharNo !== undefined ? this.state.aadharNo : ""}
                onChangeText={(aadharNo) => this.handleAadhar(aadharNo)}
                errorMessage={this.state.aadharNoErr}
                keyboardType='numeric'
              />
            </View>
          </View>
          <View style={styles.personalprofile}>
            <View >
              <Text style={styles.text}>Blood Group</Text>
            </View>
            <View style={{ width: '50%' }}>
              <DropDownPicker style={{ width: '100%' }}
                items={[

                  { label: 'A+', value: 'A+' },
                  { label: 'A-', value: 'A-' },
                  { label: 'O+', value: 'O+' },
                  { label: 'O-', value: 'O+' },
                  { label: 'B+', value: 'B+' },
                  { label: 'B-', value: 'B-' },
                  { label: 'AB+', value: 'AB+' },
                  { label: 'AB-', value: 'AB-' }
                ]}
                placeholder={this.state.bloodGroup}
                // defaultValue={bloodobj}
                containerStyle={{ height: 40, padding: '0%' }}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={bg => this.handleBloodGroup(bg)}
              />
            </View>
          </View>
          <View style={styles.personalprofile}>
            <View>
              <Text style={styles.text}>Marital Status</Text>
            </View>
            <View style={styles.radio}>
              <RadioForm
                radio_props={radio_props_Maritial_status}
                initial={this.state.maritalStatus}
                buttonSize={10}
                formHorizontal={true}
                buttonInnerColor={'#03b38f'}
                buttonOuterColor={'#03b38f'}
                labelStyle={{ fontSize: 11, marginHorizontal: 5, marginLeft: -2 }}
                onPress={(value) => this.handleMaritalStatus(value)}
              />
            </View>
          </View>

          <View style={styles.personalprofile}>
            <View>
              <Text style={styles.text}>Height(Ft)</Text>
            </View>

            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
              <Input
                containerStyle={{ height: 50, width: '48%' }}
                placeholder={this.state.height.toString()}
                style={{ fontSize: 14, }}
                inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03b38f' }}
                value={this.state.height !== undefined ? this.state.height : ""}
                onChangeText={(text) => this.handleHeight(text)}
                keyboardType='numeric'
              />
            </View>
          </View>

          <View style={styles.lines}></View>
          <View >
            <View>
              <Text style={styles.text}>Weight(Kg)</Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>

              <Input
                containerStyle={{ height: 50, width: '40%' }}
                placeholder={this.state.weight.toString()}
                // defaultValue={this.state.weight}
                style={{ fontSize: 14, }}
                inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03b38f' }}
                // value={this.state.weight}
                value={this.state.weight !== undefined ? this.state.weight : ""}
                onChangeText={(text) => this.handleWeight(text)}
                //   errorMessage={aadharNoErr}
                keyboardType='numeric'
              />

            </View>
          </View>
          <View style={{ justifyContent: "space-between", paddingTop: '10%', paddingBottom: '10%' }}>
            <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#03b38f', padding: 10, borderRadius: 10 }}>
              <Text onPress={this.handleSave} style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginRight: '2%' }} > SAVE</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    )
  }
}



class PersonalInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      languageData: [],
      selectedlanguge: [],
      selectedLanId: [],
      streamData: [],
      selectedStreamid: [],
      selectedstreamData: [],
      qualData: [],
      selectedqualData: [],
      selectedqualId: [],
      specialityData: [],
      selectspecialityData: [],
      selectedspecialId: [],
      superSpecialitiesData: [],
      selectsuperSpecialitiesData: [],
      selectedSuperId: [],
      RID: '',
      infoId: "",

      previousLanguage:"",
      previousStream:"",
      previousQualifiction:"",
      previousSpecilities:"",
      previousSuperSpecilities:"",
      showdiv:false,
      showedit:false
    }
  }




  async componentDidMount() {
    let token = await AsyncStorage.getItem('Token')
    if (token) {
      this.language(token);
      this.getStreams(token);
      this.getQualification(token);
      this.getSpeciality(token);
      this.getSuperSpeciality(token);
      this.basicUserinfoALl(token)
    }

  }



  basicUserinfoALl = (token) => {
    if (token) {
      SidebarServices.getBasicDetails(token).then(response => {
        console.log("response in getBasicDetails profile initial================^^^^^^^^^^^^^^^^^^^^", response.data);
        if (response!==undefined) {
          if (response.status == 200) {
            console.log("1111666666666666666",this.state.showdiv)
            // && !response.data.languages && response.data.streams && !response.data.qualifications && !response.data.specialities && !response.data.superspecialities
           // if (!response.data.user ) {
              this.setState({
                loading: false,
                previousLanguage:response.data.languages,
                previousStream:response.data.streams,
                previousQualifiction:response.data.qualifications,
                previousSpecilities:response.data.specialities,
                previousSuperSpecilities:response.data.superspecialities,
                showdiv:true
              })

              
           // } 

            console.log("$$$$$$$$$$$$$$$",this.state.showdiv)
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



  language = async (token) => {
    console.log("language")
    fetch("https://svcaapkadoctor.azurewebsites.net/api/languages", {
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
        //  console.log("342344444444444",response)
        // this.getSections(response,uid)
        let arr = []
        response.map(i => {
          arr.push({
            id: i.language_id,
            name: i.language,
          })
        })
        this.setState({ languageData: arr })
        //  this.getSections(uid,response)
      })
      .catch((error) => {
        console.error(error);
      })
  }


  getStreams = async (token) => {
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
        // console.log("response#$ $$$$$$$$$$$$$$$$$$$$$$$$$$$stream",response)
        let arr = []
        response.map(i => {
          arr.push({
            id: i.stream_id,
            name: i.name,
          })
        })
        this.setState({ streamData: arr })
        //  this.getSections(uid,response)

      })
      .catch((error) => {
        console.error(error);
      })
  }


  getQualification = async (token) => {

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
        // console.log("455555555555555$$$$$$$$$$$$$$$$",response)
        let arr = []
        response.map(i => {
          arr.push({
            id: i.qualification_id,
            name: i.qualified_name,
          })
        })
        this.setState({ qualData: arr })
        //  this.getSections(uid,response)

      })
      .catch((error) => {
        console.error(error);
      })
  }



  getSpeciality = async (token) => {

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
        // console.log("response%%%%%%%%%%%%%%%getSpecialitygetSpeciality",response)

        let arr = []
        response.map(i => {
          arr.push({
            id: i.speciality_id,
            name: i.name,
          })
        })
        this.setState({ specialityData: arr })
      })
      .catch((error) => {
        console.error(error);
      })
  }


  getSuperSpeciality = async (token) => {
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
        //    console.log("#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",response)
        // console.log(" supere   country data...", response);
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



  handleSubmit = async () => {
    let token = await AsyncStorage.getItem('Token')
    let infoid = await AsyncStorage.getItem('personalInfoId')
    console.log("infoid------------------------->>>", infoid)
    this.setState({ infoId: infoid })

    if (token) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,

        },
        body: JSON.stringify({
          role_id: 1,
          workingwithus: 1,
          personalInfoId: infoid,
          languages: this.state.selectedLanId,
          streams: this.state.selectedStreamid,
          qualifications: this.state.selectedqualId,
          specialities: this.state.selectedspecialId,
          superspecialities: this.state.selectedSuperId
        })
      };

      console.log("request option------------------->>>", requestOptions)
      fetch("https://svcaapkadoctor.azurewebsites.net/api/profiles",requestOptions)
        .then(function (response) {
          this.setState({
            showdiv:true,
            showedit:false
          })

          console.log("REgistraton succes data...", response);

          if (response.status == 200) {
               
            console.log("REgistraton succes data...", response);
            Alert.alert('Congrates!', "Data hs been updated")
            // _base.props.navigation.navigate("Login")
          }
        }, function (err) {
          console.log("err in registration---------------------->>", err)
        })
    }

  }

  EdithandlerInfo=()=>{
    this.setState({
      showdiv:false,
      showedit:true
    })
  }


  render() {
    console.log("this.state.showdiv&&&&&&&&&&&&&",this.state.showdiv)
    return (

      <ScrollView keyboardShouldPersistTaps="handled">
        {this.state.showedit==false?
          <View style={{justifyContent:"flex-end",flexDirection:'row'}}>
               <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#f66', padding: 10, borderRadius: 10, margin:'2%',width:'10%'}} onPress={this.EdithandlerInfo}>
                  <Text><Icon
                          name="pencil"
                          size={20}
                          color='#fff'
                          type='material-community'
                        /></Text>
                 </TouchableOpacity>
            </View>:null}
        {this.state.showdiv==true ?
            <Container style={{padding:10}}>
                  <View>
                      <View style={styles.personalprofile}>
                          <View>
                            <Text style={styles.text}>Languages</Text>
                          </View>
                          <View>
                            {this.state.previousLanguage !== undefined ?
                              <Text>{this.state.previousLanguage.map((item)=>{
                                          return item.language+","             }
                                          )}</Text>
                              : null}
                          </View>
                        </View>

                        <View style={styles.personalprofile}>
                          <View>
                            <Text style={styles.text}>Qualification</Text>
                          </View>
                          <View>
                            {this.state.previousQualifiction !== undefined ?
                              <Text>{this.state.previousQualifiction.map((item)=>{
                                          return item.qualified_name            }
                                          )}</Text>
                              : null}
                          </View>
                        </View>

                        <View style={styles.personalprofile}>
                          <View>
                            <Text style={styles.text}>Stream</Text>
                          </View>
                          <View>
                            {this.state.previousStream !== undefined ?
                              <Text>{this.state.previousStream.map((item)=>{
                                          return item.name     }
                                          )}</Text>
                              : null}
                          </View>
                        </View>

                        <View style={styles.personalprofile}>
                          <View>
                            <Text style={styles.text}>Specilities</Text>
                          </View>
                          <View>
                            {this.state.previousSpecilities !== undefined ?
                              <Text>{this.state.previousSpecilities.map((item)=>{
                                          return item.name     }
                                          )}</Text>
                              : null}
                          </View>
                        </View>

                        <View style={styles.personalprofile}>
                          <View>
                            <Text style={styles.text}>Super Specilities</Text>
                          </View>
                          <View>
                            {this.state.previousSuperSpecilities !== undefined ?
                              <Text>{this.state.previousSuperSpecilities.map((item)=>{
                                          return item.name+","   }
                                          )}</Text>
                              : null}
                          </View>
                        </View>
                  </View>
              </Container>
        :
        <View>
        <Fragment>
          <SearchableDropdown

            multi={true}
            selectedItems={this.state.selectedlanguge}
            onItemSelect={(item) => {
              const items = this.state.selectedlanguge;
              items.push(item)
              this.setState({ selectedlanguge: items });
              // this.setState({selectedLanId:this.state.selectedlanguge.map(id=>{return id.id})})
              let obj = { "language_id": item.id }
              let itemarr = this.state.selectedLanId
              itemarr.push(obj)

              this.setState({ selectedLanId: itemarr });
              console.log("selected lan------------------------------>>>>", this.state.selectedLanId)
            }}
            containerStyle={{ padding: 5, width: '100%' }}
            onRemoveItem={(item, index) => {
              const items = this.state.selectedlanguge.filter((sitem) => sitem.id !== item.id);
              this.setState({ selectedlanguge: items });
              // console.log("item-------------------------------->>>>>>>", this.state.selectedlanguge);
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140, width: '100%' }}
            items={this.state.languageData}
            defaultIndex={2}
            chip={true}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Select Languages",
                underlineColorAndroid: "transparent",
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,

                },
                //onTextChange: text => this.handleSymptoms(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
        </Fragment>

        <Fragment>
          <SearchableDropdown
            multi={true}
            selectedItems={this.state.selectedstreamData}
            onItemSelect={(item) => {
              const items = this.state.selectedstreamData;
              items.push(item)
              this.setState({ selectedstreamData: items });
              let obj = { "stream_id": item.id }
              let itemarr = this.state.selectedStreamid
              itemarr.push(obj)
              this.setState({ selectedStreamid: itemarr });
            }}
            containerStyle={{ padding: 5, width: '100%' }}
            onRemoveItem={(item, index) => {
              const items = this.state.selectedstreamData.filter((sitem) => sitem.id !== item.id);
              this.setState({ selectedstreamData: items });
              // console.log("item------------", item);
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140, width: '100%' }}
            items={this.state.streamData}
            defaultIndex={2}
            chip={true}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Select Stream",
                underlineColorAndroid: "transparent",
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,

                },
                //onTextChange: text => this.handleSymptoms(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
        </Fragment>

        <Fragment>
          <SearchableDropdown
            multi={true}
            selectedItems={this.state.selectedqualData}
            onItemSelect={(item) => {
              const items = this.state.selectedqualData;
              items.push(item)
              this.setState({ selectedqualData: items });

              let obj = {
                "qualification_id": item.id, "month": 1,
                "year": 2019,
                "reg_number": ""
              }
              let itemarr = this.state.selectedqualId
              itemarr.push(obj)

              this.setState({ selectedqualId: itemarr });

            }}
            containerStyle={{ padding: 5, width: '100%' }}
            onRemoveItem={(item, index) => {
              const items = this.state.selectedqualData.filter((sitem) => sitem.id !== item.id);
              this.setState({ selectedqualData: items });
              // console.log("item------------",item);
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140, width: '100%' }}
            items={this.state.qualData}
            defaultIndex={2}
            chip={true}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Select Qualification",
                underlineColorAndroid: "transparent",
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,

                },
                //  onTextChange: text => this.handleSymptoms(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
        </Fragment>

        <Fragment>
          <SearchableDropdown
            multi={true}
            selectedItems={this.state.selectspecialityData}
            onItemSelect={(item) => {
              const items = this.state.selectspecialityData;
              items.push(item)
              this.setState({ selectspecialityData: items });

              let obj = { "speciality_id": item.id }
              let itemarr = this.state.selectedspecialId
              itemarr.push(obj)

              this.setState({ selectedspecialId: itemarr });

            }}
            containerStyle={{ padding: 5, width: '100%' }}
            onRemoveItem={(item, index) => {
              const items = this.state.selectspecialityData.filter((sitem) => sitem.id !== item.id);
              this.setState({ selectspecialityData: items });
              // console.log("item------------",item);
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140, width: '100%' }}
            items={this.state.specialityData}
            defaultIndex={2}
            chip={true}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Select Specialities",
                underlineColorAndroid: "transparent",
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,

                },
                //  onTextChange: text => this.handleSymptoms(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
        </Fragment>

        <Fragment>
          <SearchableDropdown
            multi={true}
            selectedItems={this.state.selectsuperSpecialitiesData}
            onItemSelect={(item) => {
              const items = this.state.selectsuperSpecialitiesData;
              items.push(item)
              this.setState({ selectsuperSpecialitiesData: items });

              let obj = { "super_speciality_id": item.id }
              let itemarr = this.state.selectedSuperId
              itemarr.push(obj)

              this.setState({ selectedSuperId: itemarr });

            }}
            containerStyle={{ padding: 5, width: '100%' }}
            onRemoveItem={(item, index) => {
              const items = this.state.selectsuperSpecialitiesData.filter((sitem) => sitem.id !== item.id);
              this.setState({ selectsuperSpecialitiesData: items });
              // console.log("item------------",item);
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140, width: '100%' }}
            items={this.state.superSpecialitiesData}
            defaultIndex={2}
            chip={true}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Select SuperSpecialities",
                underlineColorAndroid: "transparent",
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,

                },
                //  onTextChange: text => this.handleSymptoms(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
        </Fragment>

        <TouchableOpacity style={styles.button}
          onPress={(e) => this.handleSubmit(e)}>
          <Text style={{ fontSize: 16, marginVertical: '3%', color: '#fff', marginHorizontal: '35%' }}>Submit</Text>
        </TouchableOpacity>
    </View>
    }
      </ScrollView>

    );
  }
}



class Fees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat_Fees: '',
      video_Fees: '',
      voice_Fees: ''
    }
  }




  handleSubmitData = async () => {

    this.setState({
      loading: true,
    });
    let token = await AsyncStorage.getItem('Token');
    let infoid = await AsyncStorage.getItem('personalInfoId')
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({
        // role_id: 1,
        // workingwithus: 1,
        // personalInfoId: infoid,
        online_Consultations: {
          chat_fess: this.state.chat_Fees,
          voice_fess: this.state.voice_Fees,
          video_fess: this.state.video_Fees,
        }

      })
    };
    console.log("fees dat --------------->>", requestOptions)
    fetch('https://svcaapkadoctor.azurewebsites.net/api/users/onlineconsultat', requestOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log("fees response------------------------>>>", response)
        alert("Fess Has Been Updated")
        this.setState({
          loading: false,
          chat_fess: '',
          video_Fees: '',
          voice_fess: ''
        });
      })

      .catch((error) => {
        console.error(error);
      });
  };


  render() {
    return (
      <View>

        <Input
          containerStyle={{ height: 40, marginTop: 20 }}
          placeholder='Enter Chat Fees'
          style={{ fontSize: 14 }}
          value={this.state.chat_Fees}
          inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03B38F' }}
          leftIconContainerStyle={{ marginLeft: 2 }}
          onChangeText={text => this.setState({
            chat_Fees: text
          })}
          // errorMessage={this.state.userNameErrMsg}
          keyboardType='numeric'
        />

        <Input
          containerStyle={{ height: 40, marginTop: 20 }}
          placeholder='Enter Voice fees'
          style={{ fontSize: 14 }}
          value={this.state.voice_Fees}
          inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03B38F' }}
          leftIconContainerStyle={{ marginLeft: 2 }}
          onChangeText={text => this.setState({
            voice_Fees: text
          })}
          // errorMessage={this.state.userNameErrMsg}
          keyboardType='numeric'
        />
        <Input
          containerStyle={{ height: 40, marginTop: 20 }}
          placeholder='Enter video Fees'
          style={{ fontSize: 14 }}
          value={this.state.video_Fees}
          inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03B38F' }}
          leftIconContainerStyle={{ marginLeft: 2 }}
          onChangeText={text => this.setState({
            video_Fees: text
          })}
          // errorMessage={this.state.userNameErrMsg}
          keyboardType='numeric'
        />
        <TouchableOpacity style={styles.button}
          onPress={this.handleSubmitData}>
          <Text style={{ fontSize: 16, marginVertical: '3%', color: '#fff', marginHorizontal: '20%' }}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}



export default class MyTabs extends Component {

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
        {/* <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
          <Body>
            <Title style={{ color: '#fff',fontSize: 18 }}> Profile</Title>
          </Body>
          <Right>
            <TouchableOpacity>
              <Icon1 name='notifications-outline' color='#fff' size={25} style={{ marginRight: '5%' }} />
            </TouchableOpacity>
          </Right>

        </Header> */}

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
              options={{ tabBarLabel:'PERSONAL Info' }}
            />
            <Tab.Screen
              name="PersonalInfo"
              component={PersonalInfo}
              options={{ tabBarLabel: 'Professional Info' }}
            />
            <Tab.Screen
              name="Fees"
              component={Fees}
              options={{ tabBarLabel: 'Fees' }}
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