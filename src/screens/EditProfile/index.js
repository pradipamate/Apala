
import React, { Component, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerActions } from 'react-navigation-drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LifeStyleScreen from '../EditProfile/LifeStyle';
import { Header, Title, Left, Right, Body, Text,Container } from 'native-base';
import { View, TouchableOpacity, Image, ImageBackground, StyleSheet, Modal, Switch, Alert } from 'react-native';
import Icon1 from 'react-native-vector-icons/Ionicons';
import SidebarServices from '../../Services/ProfileServices/ProfileServices'
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from "react-native-gesture-handler";
import RadioForm from 'react-native-simple-radio-button';
import { Input,Card } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker'
import Loader from '../../Components/Loader'
import DocumentPicker from 'react-native-document-picker';
import ProfileServices from '../../Services/ProfileServices/ProfileServices'
import RNFetchBlob from 'rn-fetch-blob'
import ImagePath from '../../Services/ImagePath'
import Icon from 'react-native-vector-icons/FontAwesome';



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
    console.log("token#%%%%%%% personal",token)
    this.setState({
      token: token,
      loading: true,
    })
    this.basicUserinfo(token)
  }


  basicUserinfo = (token) => {
    if (token) {
      SidebarServices.getBasicDetails(token).then(response => {
        console.log("response in getBasicDetails profile initial================", response.data);
        if (response) {
          if (response.status == 200) {
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

            if (this.state.role_id !== 0) {
              console.log("role if 1=--------------------------->>>", this.state.role_id)
              //console.log("asdasdasdasdasdasd")
              AsyncStorage.setItem("modalVisible", 'true')
              AsyncStorage.setItem("doc_status", JSON.stringify(response.data.userbasicinfo.status))
            }
            else {
              console.log("role else 0=--------------------------->>>", this.state.role_id)
              AsyncStorage.setItem("modalVisible", 'false')
            }
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
    //  }
    //  else{
    // this.setState({
    //     first_name:'',
    //     first_nameErr:'Required.'
    // })
    // }

  }
  // handleMiddleName=(m_name)=>{

  //     if(m_name!==""){
  //         this.setState({
  //             middle_Name:m_name,
  //             middle_NameErr:''
  //         })
  //     }
  //     else{
  //         this.setState({
  //             middle_Name:'',
  //             middle_NameErr:'Required.'
  //         })
  //     }
  // }

  // handleLastName=(l_name)=>{
  //     if(l_name!==""){
  //         this.setState({
  //             last_name:l_name,
  //             last_nameErr:''
  //         })
  //     }
  //     else{
  //         this.setState({
  //             last_name:'',
  //             last_nameErr:'Required.'
  //         })
  //     }
  // }


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





  handleMenu = () => {
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
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
              {/* <TouchableOpacity onPress={this.changepassword}>
                  <Text style={{textDecorationLine: 'underline', color: '#03b38f', fontSize: 15}}>Change Password</Text>
                </TouchableOpacity> */}

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
          <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingTop: '10%', paddingBottom: '10%' }}>
            <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#03b38f', padding: 10, borderRadius: 10 }}>
              <Text onPress={this.handleSave} style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginRight: '2%' }} > SAVE</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', backgroundColor: '#03b38f', padding: 10, borderRadius: 10 }}>
              <Text onPress={() => this.props.navigation.navigate('LifeStyle')} style={{ color: '#fff', fontSize: 18, marginLeft: '2%', fontWeight: 'bold' }}>
                NEXT 
                </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}



class LifeStyle extends Component {
  constructor(props) {
      super(props);
      this.state = {  
          modalVisible1: false,
          smoking:"",
          alcohol:"",
          life:"",
          food:"",
          profession:"",
          lifestyleData:[],
          professionData:[]
      }
  }


  async componentDidMount(){
   
              this.setState({
                  modalVisible:false
              })
              let token = await AsyncStorage.getItem("Token")
           //   console.log("token--------------",token);

              this.getLifestyle(token)

              this.getProfession(token)
  
      }

      getProfession=(token)=>{
          ProfileServices.getProfession(token).then(response=>{
             // console.log("response in getProfession======", response);
              if(response){
                  if(response.status==200){
                      // {label: 'UK', value: 'uk'},
                      let arr=[]
                      response.data.map(i=>{
                          arr.push({label: i.profession, value: i.profession_id})
                      })
                      this.setState({professionData:arr})
                  }
              }
          })
      }
      getLifestyle=(token)=>{
          ProfileServices.getLifestyle(token).then(response=>{
             // console.log("response in getLifestyle======", response);
              if(response){
                  if(response.status==200){
                      // {label: 'UK', value: 'uk'},
                      let arr=[]
                      response.data.map(i=>{
                          arr.push({label: i.lifestyle, value: i.lifestyle_id})
                      })
                      this.setState({lifestyleData:arr})
                  }
              }
          })
      }


      onSaveClick =async  () =>{
          let token = await AsyncStorage.getItem("Token")
          //console.log("this.state.smoking,$$$$$$$$$$$$$$",this.state.smoking,)
          const doc  = {
              smoking_habit: this.state.smoking,
              alcohol_consumption: this.state.alcohol,
              lifestyle: this.state.life,
              food: this.state.food,
              profession: this.state.profession
            }
        
          console.log("doc",doc);

    if(this.state.smoking!=='' && this.state.alcohol!=='' && this.state.life!=='' && this.state.food!=='' && this.state.profession!==''){
      
     ProfileServices.postLifestyleDetails(token , doc).then(response=>{
             // console.log("response in getBasicDetails profile================", response.data);
              if(response){
                  if(response.status==200){
                      this.setState({
                          modalVisible1:true
                      })
                    //  Alert.alert("Sucess","Information updated sucessfully")
                  }
              }
              else{
  
                  Alert.alert("Error","Failed to get user information.")
              }
          }).catch((err)=>{
              console.log("Err in get User Details======>", err);
          })
         }

    else{
      Alert.alert("Error","Please fill All information.")
      }
  }


  render() { 
      return (
          <ScrollView>
             <Container style={styles1.Container}>
                      <View style={styles1.personalprofile}>
                                          <Text style={styles1.text}>Smoking Habit</Text>
                                              <DropDownPicker  
                                                          items={[
                                                              {label: 'Yes', value: 'Yes'},
                                                              {label: 'No', value: 'No'}
                                                              
                                                          ]}
                                                          placeholder="Select"
                                                          defaultValue={this.state.smoking}
                                                          containerStyle={{width:'50%', height:30}}
                                                          style={{backgroundColor: '#fafafa'}}
                                                          itemStyle={{
                                                              justifyContent: 'flex-start'
                                                          }}
                                                          dropDownStyle={{backgroundColor: '#fafafa'}}
                                                          onChangeItem={item => this.setState({
                                                              smoking: item.value
                                                  })} />
                       </View>

                       <View style={styles1.lines}></View>

                       <View style={styles1.personalprofile}>
                                          <Text style={styles1.text}>Alcohol Consumption</Text>
                                      <DropDownPicker style={{marginHorizontal:'10%'}}
                                                          items={[
                                                              {label: 'Yes', value: 'Yes'},
                                                              {label: 'No', value: 'No'}
                                                          ]}
                                                          placeholder="Select"
                                                          defaultValue={this.state.alcohol}
                                                          containerStyle={{height: 30,width:'50%'}}
                                                          style={{backgroundColor: '#fafafa'}}
                                                          itemStyle={{
                                                              justifyContent: 'flex-start'
                                                          }}
                                                          dropDownStyle={{backgroundColor: '#fafafa'}}
                                                          onChangeItem={item => this.setState({
                                                              alcohol: item.value
                                                  })} />
                       </View>
                       <View style={styles1.lines}></View>
                      <View style={styles1.personalprofile}>
                                <Text style={styles1.text}>Life style</Text>
                                      <DropDownPicker style={{marginHorizontal:'10%'}}
                                                          items={this.state.lifestyleData}
                                                          placeholder="Select"
                                                          defaultValue={this.state.life}
                                                          containerStyle={{height: 30,width:'50%'}}
                                                          style={{backgroundColor: '#fafafa'}}
                                                          itemStyle={{
                                                              justifyContent: 'flex-start'
                                                          }}
                                                          dropDownStyle={{backgroundColor: '#fafafa'}}
                                                          onChangeItem={item => this.setState({
                                                              life: item.value  })} />
                       </View>
                      <View style={styles1.lines}></View>
                       <View style={styles1.personalprofile}>
                                      <Text style={styles1.text}>Food</Text>
                                      <DropDownPicker style={{marginHorizontal:'10%'}}
                                                          items={[
                                                              {label: 'Vegetarian', value: 'Vegetarian'},
                                                              {label: 'Non-vegetarian', value: 'Non-vegetarian'},
                                                              {label: 'Both', value: 'Both'}
                                                          ]}
                                                          placeholder="Select"
                                                          defaultValue={this.state.food}
                                                          containerStyle={{height: 30,width:'50%'}}
                                                          style={{backgroundColor: '#fafafa'}}
                                                          itemStyle={{
                                                              justifyContent: 'flex-start'
                                                          }}
                                                          dropDownStyle={{backgroundColor: '#fafafa'}}
                                                          onChangeItem={item => this.setState({
                                                              food: item.value
                                                  })} />
                       </View>
                       <View style={styles1.lines}></View>
                       <View style={styles1.personalprofile}>
                                  <Text style={styles1.text}>Profession</Text>
                                      <View style={{justifyContent:'flex-end',flexDirection:'row'}}> 
                                      <DropDownPicker style={{marginHorizontal:'10%'}}
                                                          items={this.state.professionData}
                                                          placeholder="Select"
                                                          defaultValue={this.state.profession}
                                                          containerStyle={{height: 30,width:'70%'}}
                                                          style={{backgroundColor: '#fafafa'}}
                                                          itemStyle={{
                                                              justifyContent: 'flex-start'
                                                          }}
                                                          dropDownStyle={{backgroundColor: '#fafafa'}}
                                                          onChangeItem={item => this.setState({
                                                              profession: item.value
                                                  })} />
                                     </View>
                       </View>

                       <View style={styles1.lines}></View>
                       {/* <View style={{flexDirection: 'row',justifyContent:'space-evenly',marginTop:'10%'}}>
                           <View style={{flexDirection:'row'}}>
                               <Icon
                                  name='angle-left'
                                  size={24}
                                  color='#03b38f'
                                  />
                                <Text onPress={()=> this.props.navigation.navigate('Personal')}  style={{color:'#03b38f',fontSize:20,fontWeight:'bold',}}> PREVIOUS </Text>
                          </View>
                           <View >
                               <TouchableOpacity onPress={()=>this.onSaveClick()}>
                             <Text style={{color:'#03b38f',fontSize:20,fontWeight:'bold'}}>SAVE</Text>
                             </TouchableOpacity>
                          </View>
                      </View> */}
                      
                   <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingTop: '10%', paddingBottom: '10%' }}>
                          <TouchableOpacity style={{ flexDirection: 'row',backgroundColor:'#03b38f',padding:10,borderRadius:10}}>
                          <Text onPress={()=> this.props.navigation.navigate('Personal')} style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginRight: '2%' }} >PREVIOUS</Text>
                          </TouchableOpacity>
                          <View style={{ flexDirection: 'row',backgroundColor:'#03b38f',padding:10,borderRadius:10}}>
                              <Text onPress={()=>this.onSaveClick()} style={{ color: '#fff', fontSize: 20, marginLeft: '2%', fontWeight: 'bold' }}>
                                SAVE 
                              </Text>
                          </View>
                      </View>
               </Container>


              <Modal
                      animationType="slide"
                      coverScreen={true}
                      backdropOpacity={0.70}
                      transparent={true}
                      visible={this.state.modalVisible1}
                      onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      }} >
                      <Card style={{borderRadius:20}}>
                              <View style={{position:'absolute',right:'5%',top:'2%'}}>
                                  <Icon
                                          name='times'
                                          size={30}
                                          color='#03b38f'
                                          type='material-community'
                                          onPress={() => this.setState({modalVisible1:!this.state.modalVisible1})}
                                      />
                              </View>
                              <View style={{marginHorizontal:'10%',justifyContent: 'center',alignItems: 'center',marginTop:'20%'}}>
                                  <Text style={{color:'#03b38f',fontWeight:'bold',fontStyle:'italic',fontSize:25}}> GREAT </Text>
                                      <View styles={{justifyContent: 'center',flexDirection:'row'}}>
                                          <Icon name="thumbs-up" color="#029400" size={100} />
                                      </View>      
                              </View>
                              {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <TouchableOpacity style={styles.NoThanks}
                                              onPress={() => this.setState({modalVisible:!this.state.modalVisible})}>
                                            <Text style={{fontSize:14,padding:'1%',color:'#fff'}}>NO,THANKS </Text>
                                </TouchableOpacity>
                          </View> */}
                    </Card>
                </Modal>

       </ScrollView>
     )
  }
}

const styles1=StyleSheet.create({
  modalView:{
      shadowColor: "rgba(0,0,0,1)",
      shadowOffset: {
          width: 3,
          height: 3
      },
      elevation: 5,
      shadowOpacity: 0.21,
      alignContent: "center",
      flexDirection: "column",
      backgroundColor:'red'
  },
  Container:{
      padding:'5%'
  },
  personalprofile:{
      flexDirection:'row',
      //marginBottom:'4%',
     justifyContent:'space-between'

  },
  lines:{
      borderColor: '#dedddd',
      borderWidth: 0.5,
      width:"100%",
      marginTop:'3%',
      marginBottom:'3%',
      marginHorizontal:'0%'
    },
  text:{
      color:'#817a7a',
  },
  centeredView: {
    //  flex: 1,
    padding: 20,
    borderRadius:20,
      padding: 5,
      //backgroundColor:'red',
      zIndex:99999,
      
     
    },
    Addfamilybutton:{
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor:'#03b38f',
    // alignSelf:'center',
      borderRadius:3,
      marginBottom:'4%',
      marginTop:'4%'
  },
  NoThanks:{
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor:'#ff4800',
     alignSelf:'center',
      borderRadius:3,
      //marginBottom:'4%',
      //marginTop:'4%'
  },
})




export default class MyTabs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      doc_status: '',
      modalVisible1: false,
    }
  }

  async componentDidMount() {

    let modalvalue = await AsyncStorage.getItem("modalVisible");
    let doc_status_value = await AsyncStorage.getItem("doc_status");

    console.log("modalvalue", modalvalue);
    console.log("doc_status_value", doc_status_value);

    if (modalvalue == 'true') {
      this.setState({
        modalVisible: true,
        doc_status: doc_status_value
      })
    } else {
      this.setState({
        modalVisible: false,
        doc_status: doc_status_value
      })
    }

    // this.setState({
    // modalVisible:true,
    // doc_status:doc_status_value
    //})

  }


  changepassword = () => {
    this.setState({
      modalVisible: false
    })
    this.props.navigation.navigate('DoctorDocumentList')
  }

  handleMenu = () => {
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  }


  render() {
    return (
      <>
        <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
          <Left style={{ marginLeft: '2%' }}>
            <TouchableOpacity
              onPress={this.handleMenu}
            >
              <Icon1 name='menu' style={{ color: '#fff', fontSize: 30 }} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={{ color: '#fff', marginLeft: '45%', fontSize: 25 }}>Profile</Title>
          </Body>
          <Right>
            <TouchableOpacity>
              <Icon1 name='notifications-outline' color='#fff' size={25} style={{ marginRight: '5%' }} onPress={() => this.modalshowhandle} />
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
              options={{ tabBarLabel: 'PERSONAL' }}
            />
            <Tab.Screen
              name="LifeStyle"
              component={LifeStyle}
              options={{ tabBarLabel: 'LIFESTYLE' }}
            />
          </Tab.Navigator>
        </NavigationContainer>



        <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={this.modalclose}
          >
            <View style={styles.centeredView}>
              {this.state.doc_status !== 1 ?
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    Please upload Document to verify Your Professional Account</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <TouchableOpacity
                      style={{ ...styles.openButton, backgroundColor: "#03b38f", color: '#fff', }}
                      onPress={this.changepassword}>
                      <Text style={{ color: '#fff', padding: 5 }} onPress={() => this.setState({ modalVisible: false })}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ ...styles.openButton, backgroundColor: "#03b38f", }}
                      onPress={this.changepassword}>
                      <Text style={{ color: '#fff', padding: 5 }}>verify</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                :
                <View style={styles.modalView}>
                  <Text style={styles1.modalText}>
                    Congrats! Your documents has been verified
                    Now logout and login again to access your professional account</Text>
                </View>
              }
          </View>
        </Modal>
      </>
    );
  }
}





const styles= StyleSheet.create({
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
      },
      Addfamilybutton:{
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#03b38f',
      // alignSelf:'center',
        borderRadius:3,
        marginBottom:'4%',
        marginTop:'4%'
    },
    NoThanks:{
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#ff4800',
      alignSelf:'center',
        borderRadius:3,
        //marginBottom:'4%',
        //marginTop:'4%'
    },
})