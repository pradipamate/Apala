import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Image, FlatList, Switch, Alert } from 'react-native';
import { Container, Text } from 'native-base';
import { ScrollView } from "react-native-gesture-handler";
import RadioForm from 'react-native-simple-radio-button';
import { Input } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input'
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker'
import SidebarServices from '../../Services/ProfileServices/ProfileServices'
import AsyncStorage from '@react-native-community/async-storage'
import { set } from "react-native-reanimated";
import ProfileServices from '../../Services/ProfileServices/ProfileServices'
import Loader from '../../Components/Loader'
import ChangePassword from '../ChangePassword/index'
import ImagePath from '../../Services/ImagePath'

export default class Personal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            res:'',
            name: "",
            first_name:"",
            last_name:'',
            middle_Name:'',
            aadharNo:0,
            basicUserData: {},
            gender: "Male",
            mobileNo: "",
            email: "",
            dob: "",
            bloodGroup: "",
            maritalStatus: 1,
            height: "",
            inches: "",
            weight: '',
            EmergencyContact: "",
            EmergencyName: "",
            currentLocation: "",
            city: '',
            first_nameErr:"",
            middle_NameErr:"",
            last_nameErr:'',
            aadharNoErr:"",
            token:"",
            personalInfoId:'',
            loading:false,
        }
    }


    onupload=()=>{
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
            token:token,
            loading:true
        })
   this.basicUserinfo(token)
 }

 basicUserinfo=(token)=>{
    if (token) {
        SidebarServices.getBasicDetails(token).then(response => {
             console.log("response in getBasicDetails profile initial================", response.data);
             if (response) {
                 if (response.status == 200) {
                     this.setState({
                         basicUserData: response.data.userbasicinfo,
                         first_name:response.data.userbasicinfo.user_full_name,
                         personalInfoId: response.data.user.personal_info_id,
                         // mobileNo: response.data.userbasicinfo.mobile,
                         // email: response.data.userbasicinfo.email,
                         // personalInfoId:response.data.user.personal_info_id,
                         // first_name:response.data.user.first_name,
                         // middle_Name:response.data.user.middle_name,
                         // last_name:response.data.user.last_name,
                         dob:response.data.user.dob.toString().split(' ')[0],
                         bloodGroup:response.data.user.blood_group,
                         aadharNo:response.data.user.uidai,
                         height:response.data.user.height,
                         weight:response.data.user.weight,
                         loading:false
                     })

                 }
             }
             else {
                 this.setState({
                     loading:false
                 })
                 Alert.alert("Error", "Failed to get user information.")
             }
         }).catch((err) => {
             this.setState({
                 loading:false
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

    handleDOB = (date) => {
        this.setState({
            dob: date
        })
    }

    handleBloodGroup = (bg) => {
        this.setState({
            bloodGroup: bg
        })
    }

    handleMaritalStatus = (mStatus) => {
        this.setState({
            maritalStatus: mStatus
        })
    }

    handleHeight = (height) => {
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

    handlename=(name)=>{
      // console.log(name,"name@$%%%%%%")
        //if(name!==""){
            this.setState({
                first_name:name,
                first_nameErr:''
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


 handleAadhar=(aadhar)=>{
       //console.log("aadhar#%%%%%%%%",aadhar);
        if(aadhar!=""){
            // if(aadhar){
                this.setState({
                    aadharNo:aadhar,
                    aadharNoErr:""
                })
            }
        else{
            this.setState({
                aadharNo:"",
                aadharNoErr:'Adhar Number Required.'
            })
        }
    }

    handleSave = () => {
   // console.log('first_name342234234234',this.state.first_name)
    var adharcard = /^\d{12}$/;
    var adharsixteendigit= /^\d{16}$/;
    
     //if(adharcard.test(this.state.aadharNo)){
       let data ={}
       if(this.state.personalInfoId!==""){
         data = {
            first_name: this.state.first_name,
            middle_name: "",
            last_name: "",
            dob: this.state.dob,
            weight: parseInt(this.state.weight),
            gender: this.state.gender,
            height: parseInt(this.state.height+"."+this.state.inches),
            blood_group: this.state.bloodGroup.value,
            marital_status: parseInt(this.state.maritalStatus),
            uidai:parseInt(this.state.aadharNo),
            personal_info_id:this.state.personalInfoId
          }
       }
       else{
         data = {
            first_name: this.state.first_name,
            middle_name: "",
            last_name: "",
            dob: this.state.dob,
            weight: parseInt(this.state.weight),
            gender: this.state.gender,
            height: parseInt(this.state.height+"."+this.state.inches),
            blood_group: this.state.bloodGroup.value,
            marital_status: parseInt(this.state.maritalStatus),
            uidai:parseInt(this.state.aadharNo)
          }
       }

      //console.log("data=================>editttttt----------", data);
      // console.log("data=================>editttttt---------peronsal",this.state.token)
      ProfileServices.savePresonalInfo(data,this.state.token).then(response=>{
               // console.log("response in savepresonalInfo======================>", response);
                if(response){
                    if(response.status==200||response.status==201){
                        Alert.alert("Success","Personal information updated successfully.")
                        this.basicUserinfo(this.state.token);
                    }
                    else{

                    }
                }
            }).catch((e)=>{
                console.log("error in savePresonalInfo=========>",e);
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
            setSingleFile(res);
    
            uploadImage(res)
          }
    
        } catch (err) {
          setSingleFile({});
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

        console.log("basicUserData1======================", this.state.height);
        // console.log("basicUserData2======================", this.state.dob.toString());
        return (
            <ScrollView>
            <Loader loading={this.state.loading} />
            <View style={{ backgroundColor: '#fff', padding: '5%' }}>
              {/* <Container style={styles.Container}> */}
              <View style={styles.personalprofile}>
                <View>
                  <Text style={{ marginBottom: '1%' }} >Name</Text>
                  {this.state.basicUserData !== undefined ?
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: '1%' }}>{this.state.basicUserData.user_full_name}</Text>
                    : null}
                  <TouchableOpacity onPress={() =>this.props.navigation.navigate('ChangePassword', { token: this.state.token })}>
                    <Text style={{ textDecorationLine: 'underline', color: '#03b38f', fontSize: 13 }}>Change Password</Text>
                  </TouchableOpacity>
    
                </View>
                <View>
                  <Image
                    square
                    style={{ height: 50, width: 50, borderRadius: 60, marginLeft: '10%', padding: '0%' }}
                    source={{ uri: ImagePath+this.state.basicUserData.profile_photo_path }}
                  />
                  <TouchableOpacity>
                    <Text onPress={this.selectFile()} style={{ textDecorationLine: 'underline', color: '#03b38f' }}>Add Photo</Text>
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
                       // value={this.state.basicUserData.user_full_name}
                        value={this.state.first_name}
                        onChangeText={text =>this.handlename(text)}
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
                            value={this.state.aadharNo!== undefined ? this.state.aadharNo:""}
                            onChangeText={(aadharNo)=>this.handleAadhar(aadharNo)}
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
                    placeholder="Select Blood Group"
                    defaultValue={this.state.bloodGroup!== undefined?this.state.bloodGroup:""}
                    containerStyle={{ height: 40, padding: '0%' }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                      justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={bg =>this.handleBloodGroup(bg)}
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
                    initial={0}
                    buttonSize={10}
                    formHorizontal={true}
                    buttonInnerColor={'#03b38f'}
                    buttonOuterColor={'#03b38f'}
                    labelStyle={{ fontSize: 11, marginHorizontal: 5, marginLeft: -2 }}
                    onPress={(value) =>this.handleMaritalStatus(value)}
                  />
                </View>
              </View>
              <View style={styles.personalprofile}>
                <View>
                  <Text style={styles.text}>Height</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-evenly' }}>
                {/* <Input
                            containerStyle={{ height: 50}}
                            placeholder='Enter Here'
                            style={{ fontSize: 14, }}
                            inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03b38f' }}
                            value={this.state.height}
                            onChangeText={(aadharNo)=>this.handleAadhar(aadharNo)}
                            errorMessage={aadharNoErr}
                            keyboardType='numeric'
                        /> */}
                  <NumericInput
                    value={this.state.height}
                    onChange={value =>this.handleHeight(value)}
                    totalWidth={80}
                    totalHeight={45}
                    minValue={3}
                    step={1}
                    valueType='integer'
                    type='up-down'
                    textColor='#03b38f'
                    iconStyle={{ color: '#03b38f' }}
                  />
               
                  <Text>Feet</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-evenly' }} >
                  <NumericInput
                    value={this.state.inches}
                    onChange={value =>this.handleInches(value)}
                    // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                    totalWidth={80}
                    totalHeight={45}
                    // iconSize={25}
                    step={1}
                    valueType='integer'
                    type='up-down'
                    // rounded 
                    textColor='#03b38f'
                    iconStyle={{ color: '#03b38f' }}
                  // upDownButtonsBackgroundColor='#03b38f' 
                  // rightButtonBackgroundColor='#03b38f' 
                  //leftButtonBackgroundColor='#03b38f'
                  />
                  <Text style={{ marginLeft: '2%' }} >Inches</Text>
                </View>
              </View>
              <View style={styles.lines}></View>
              <View style={styles.personalprofile}>
                <View>
                  <Text style={styles.text}>Weight</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                    <NumericInput
                        value={this.state.weight.toString()}
                        onChange={value =>this.handleWeight(value)}
                        // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                        totalWidth={80}
                        totalHeight={45}
                        minValue={20}
                        //maxValue={40}
                        // iconSize={25}
                        step={5}
                        valueType='integer'
                        type='up-down'
                        // rounded 
                        textColor='#03b38f'
                        iconStyle={{ color: '#03b38f' }}
                    // upDownButtonsBackgroundColor='#03b38f' 
                    // rightButtonBackgroundColor='#03b38f' 
                    //leftButtonBackgroundColor='#03b38f'
                    />
                    <Text style={{ marginLeft: '2%' }}>Kg</Text>
                    </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingTop: '10%', paddingBottom: '10%' }}>
                <TouchableOpacity style={{ flexDirection: 'row',backgroundColor:'#03b38f',padding:10,borderRadius:10}}>
                  <Text onPress={this.handleSave} style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginRight: '2%' }} >SAVE</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row',backgroundColor:'#03b38f',padding:10,borderRadius:10}}>
                  <Text onPress={() =>this.props.navigation.navigate('LifeStyle')} style={{ color: '#fff', fontSize: 20, marginLeft: '2%', fontWeight: 'bold' }}>
                    NEXT 
                    {/* <Icon
                      name='angle-right'
                      size={24}
                      color='#03b38f'
                    /> */}
                  </Text>
                </View>
              </View>
    
            </View>
          </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
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