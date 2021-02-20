import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Image, FlatList, Switch, Alert } from 'react-native';
import { Container, Text } from 'native-base';
import { ScrollView } from "react-native-gesture-handler";
import RadioForm from 'react-native-simple-radio-button';
import { Input } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input'
import DatePicker from 'react-native-datepicker'
import SidebarServices from '../../Services/ProfileServices/ProfileServices'
import AsyncStorage from '@react-native-community/async-storage'
import { set } from "react-native-reanimated";
import ProfileServices from '../../Services/ProfileServices/ProfileServices'
import Loader from '../../Components/Loader'



export default class FamilyMemberList extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            height: 0,
            inches: 0,
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
            loading:false
        }

    }


    async componentDidMount() {
        let token = await AsyncStorage.getItem("Token")
        console.log("token in sidebar=======>", token);
       
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
        if(name!==""){
            this.setState({
                first_name:name,
                first_nameErr:''
            })
        }
        else{
            this.setState({
                first_name:'',
                first_nameErr:'Required.'
            })
        }
        
    }
    handleMiddleName=(m_name)=>{
       
        if(m_name!==""){
            this.setState({
                middle_Name:m_name,
                middle_NameErr:''
            })
        }
        else{
            this.setState({
                middle_Name:'',
                middle_NameErr:'Required.'
            })
        }
    }
    handleLastName=(l_name)=>{
       

        if(l_name!==""){
            this.setState({
                last_name:l_name,
                last_nameErr:''
            })
        }
        else{
            this.setState({
                last_name:'',
                last_nameErr:'Required.'
            })
        }
    }
    handleAadhar=(aadhar)=>{
        var adharcard = /^\d{12}$/;
        var adharsixteendigit = /^\d{16}$/;
        if(aadhar!=""){
            if(adharcard.test(aadhar)){
                this.setState({
                    aadharNo:aadhar,
                    aadharNoErr:""
                })
            }
            else if(adharsixteendigit.test(aadhar)){
                this.setState({
                    aadharNo:aadhar,
                    aadharNoErr:""
                })
            }
            else{
                this.setState({
                    aadharNo:"",
                    aadharNoErr:'Enter Valid Aadhar Number.'
                })
            }
        }
        else{
            this.setState({
                aadharNo:"",
                aadharNoErr:'Required.'
            })
        }
        
        
    }

    handleSave = () => {
        let data ={}
       if(this.state.personalInfoId!==""){
         data = {
            first_name: this.state.first_name,
            middle_name: this.state.middle_Name,
            last_name: this.state.last_name,
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
            middle_name: this.state.middle_Name,
            last_name: this.state.last_name,
            dob: this.state.dob,
            weight: parseInt(this.state.weight),
            gender: this.state.gender,
            height: parseInt(this.state.height+"."+this.state.inches),
            blood_group: this.state.bloodGroup.value,
            marital_status: parseInt(this.state.maritalStatus),
            uidai:parseInt(this.state.aadharNo)
        }
       }
        
       


        console.log("data=================>", data);

      
            ProfileServices.savePresonalInfo(data,this.state.token).then(response=>{
                console.log("response in savepresonalInfo======================>", response);
                if(response){
                    if(response.status==200||response.status==201){
                        Alert.alert("Success","Personal information updated successfully.")
                    }
                    else{

                    }
                }
            }).catch((e)=>{
                console.log("error in savePresonalInfo=========>",e);
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

        console.log("basicUserData======================", this.state.basicUserData);
        console.log("personal_info_Id=============>", this.state.personalInfoId);
        return (
            <ScrollView>
                <Loader loading={this.state.loading} />
                <View style={{ backgroundColor: '#fff', padding: '5%' }}>
                    {/* <Container style={styles.Container}> */}

                    <View style={styles.personalprofile}>
                        <View>
                            <Text style={{ marginBottom: '1%' }} >Name</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: '1%' }}>{this.state.basicUserData.user_full_name}</Text>
                            <Text style={{ textDecorationLine: 'underline', color: '#03b38f', fontSize: 13 }}>Change Password</Text>
                        </View>
                        <View>
                            <Image
                                square
                                style={{ height: 45, width: 45, borderRadius: 60, marginLeft: '10%', padding: '0%' }}
                                source={{ uri: 'data:image/jpeg;base64,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' }}
                            />
                            <Text onPress={() => this.props.navigate.navigation('ChangePassword')} style={{ textDecorationLine: 'underline', color: '#03b38f' }}>Add Photo</Text>
                        </View>
                    </View>
                    <View style={styles.lines}></View>
                    <View style={styles.personalprofile}>
                        <View>
                            <Text style={styles.text}>First Name</Text>
                        </View>
                        <View style={{width:'50%'}}>
                            <Input
                                containerStyle={{ height: 50 }}
                                placeholder='Enter Here'
                                style={{ fontSize: 14,}}
                                //leftIconContainerStyle={{ marginLeft: -1 }}
                                inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03b38f' }}
                                // leftIconContainerStyle={{ marginLeft: 2 }}
                                value={this.state.first_name}
                                onChangeText={text => this.handlename(text)}
                                errorStyle={{color:'red',fontSize: 12,marginTop:0 }}
                                errorMessage={this.state.first_nameErr}
                                // keyboardType='numeric'
                            />
                           {/* <Text style={{fontSize:12, marginTop:10, paddingLeft:'5%', color:'red'}}>{this.state.first_nameErr}</Text> */}
                        </View>
                    </View>
                    <View style={styles.personalprofile}>
                        <View>
                            <Text style={styles.text}>Middle Name</Text>
                        </View>
                        <View style={{width:'50%'}}>
                            <Input
                                containerStyle={{ height: 50 }}
                                placeholder='Enter Here'
                                style={{ fontSize: 14,}}
                                //leftIconContainerStyle={{ marginLeft: -1 }}
                                inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03b38f' }}
                                // leftIconContainerStyle={{ marginLeft: 2 }}
                                value={this.state.middle_Name}
                                onChangeText={text => this.handleMiddleName(text)}
                                errorMessage={this.state.middle_NameErr}
                                errorStyle={{color:'red',fontSize: 12,marginTop:0 }}
                                // keyboardType='numeric'
                            />
                            {/* <Text style={{fontSize:12, marginTop:10, paddingLeft:'5%', color:'red'}}>{this.state.middle_NameErr}</Text> */}
                        </View>
                    </View>
                    <View style={styles.personalprofile}>
                        <View>
                            <Text style={styles.text}>Last Name</Text>
                        </View>
                        <View style={{width:'50%'}}>
                            <Input
                                containerStyle={{ height: 50 }}
                                placeholder='Enter Here'
                                style={{ fontSize: 14,}}
                                //leftIconContainerStyle={{ marginLeft: -1 }}
                                inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03b38f' }}
                                // leftIconContainerStyle={{ marginLeft: 2 }}
                                value={this.state.last_name}
                                onChangeText={text => this.handleLastName(text)}
                                errorMessage={this.state.last_nameErr}
                                errorStyle={{color:'red',fontSize: 12,marginTop:0 }}
                                // keyboardType='numeric'
                            />
                            {/* <Text style={{fontSize:12, marginTop:10, paddingLeft:'5%', color:'red'}}>{this.state.last_nameErr}</Text> */}
                        </View>
                    </View>
                    <View style={styles.personalprofile}>
                        <View>
                            <Text style={styles.text}>Contact Number</Text>
                        </View>
                        <View>

                            <Text>{this.state.basicUserData.mobile}</Text>
                        </View>
                    </View>
                    <View style={styles.personalprofile}>
                        <View>
                            <Text style={styles.text}>Email</Text>
                        </View>
                        <View>
                            <Text>{this.state.basicUserData.email}</Text>
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
                                //buttonWrapStyle={{marginLeft: 8,fontSize:10}}
                                //buttonOuterSize={80}
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
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => this.handleDOB(date)}
                            />
                        </View>
                    </View>
                    <View style={styles.personalprofile}>
                        <View>
                            <Text style={styles.text}>Aadhar Number</Text>
                        </View>
                        <View style={{width:'50%'}}>
                            <Input
                                containerStyle={{ height: 50 }}
                                placeholder='Enter Here'
                                style={{ fontSize: 14,}}
                                //leftIconContainerStyle={{ marginLeft: -1 }}
                                inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03b38f' }}
                                // leftIconContainerStyle={{ marginLeft: 2 }}
                                defaultValue={this.state.aadharNo}
                                onChangeText={text => this.handleAadhar(text)}
                                errorMessage={this.state.aadharNoErr}
                                keyboardType='numeric'
                            />
                            {/* <Text style={{fontSize:12, marginTop:10, paddingLeft:'5%', color:'red'}}>{this.state.aadharNoErr}</Text> */}
                        </View>
                    </View>
                    <View style={styles.lines}></View>
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
                                // defaultValue={this.state.country}
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
                                initial={0}
                                buttonSize={10}
                                formHorizontal={true}
                                buttonInnerColor={'#03b38f'}
                                buttonOuterColor={'#03b38f'}
                                labelStyle={{ fontSize: 11, marginHorizontal: 5, marginLeft: -2 }}
                                //buttonWrapStyle={{marginLeft: 8,fontSize:10}}
                                //buttonOuterSize={80}
                                onPress={(value) => this.handleMaritalStatus(value)}
                            />
                        </View>
                    </View>
                    <View style={styles.personalprofile}>
                        <View>
                            <Text style={styles.text}>Height</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-evenly' }}>
                            <NumericInput
                                value={this.state.height}
                                onChange={value => this.handleHeight(value)}
                                // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                totalWidth={80}
                                totalHeight={45}
                                minValue={3}
                                // iconSize={25}
                                step={1}
                                valueType='integer'
                                type='up-down'
                                // rounded 
                                textColor='#03b38f'
                                iconStyle={{ color: '#03b38f' }}
                            // rightButtonBackgroundColor='#03b38f' 
                            //leftButtonBackgroundColor='#03b38f'
                            />
                            <Text>Feet</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-evenly' }} >
                            <NumericInput
                                value={this.state.inches}
                                onChange={value => this.handleInches(value)}
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
                                value={this.state.weight}
                                onChange={value => this.handleWeight(value)}
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

                    {/* <View style={{ flexDirection:'row', marginBottom:'5%',justifyContent:'space-between', marginBottom:'15%'}}>
                                <View>
                                    <Text style={styles.text}>Emergency Contact</Text>
                                </View>
                                <View style={{marginLeft:'0%',flexDirection:'column',justifyContent:'space-evenly',flex:1}}> 
                                <Input
                                    containerStyle={{ height: 5, marginTop: 0,marginBottom:'10%' }}
                                    placeholder="Enter Name"
                                    placeholderTextColor="gray"
                                    inputContainerStyle={{ borderWidth: 1, fontSize: 12, fontSize: 5, borderRadius: 5, borderColor: '#03b38f' }}
                                    inputStyle={{ color: 'black', fontSize: 12 }}
                                    errorStyle={{ color: 'red', fontSize: 12 }}
                                    onChangeText={(name)=>this.handleEmergencyName(name)}
                                />
                                    <Input
                                    containerStyle={{ height: 5, marginTop:'20%',marginBottom:'15%' }}
                                    placeholder="Enter Contact"
                                    placeholderTextColor="gray"
                                    inputContainerStyle={{ borderWidth: 1, fontSize: 12, fontSize: 5, borderRadius: 5, borderColor: '#03b38f' }}
                                    inputStyle={{ color: 'black', fontSize: 12 }}
                                    errorStyle={{ color: 'red', fontSize: 12 }}
                                    onChangeText={(no)=>this.handleEmergenctContact(no)}
                                />
                                </View>
                                       
                         </View> */}


                    {/* <View style={styles.personalprofile}>
                            <View>
                                <Text style={styles.text}>Add Location</Text>
                            </View>
                            <View style={{flexDirection:'column',justifyContent:'space-between'}}>
                                    <Text style={{textDecorationLine:'underline',color:'#03b38f',fontSize:13,marginBottom:10}}>Use My Current Location</Text>
                                    <DropDownPicker style={{}}
                                                    items={[
                                                        {label: 'UK', value: 'uk'},
                                                        {label: 'France', value: 'france'},
                                                        {label: 'India', value: 'India'}
                                                    ]}
                                                    placeholder="Select City"
                                                    defaultValue={this.state.country}
                                                    containerStyle={{height: 35,padding:'0%'}}
                                                    style={{backgroundColor: '#fafafa'}}
                                                    itemStyle={{
                                                        justifyContent: 'flex-start'
                                                    }}
                                                    dropDownStyle={{backgroundColor: '#fafafa'}}
                                                    onChangeItem={(item) => this.selectCity(item)} />
                                </View>
                        </View> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: '10%', paddingBottom: '10%' }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }}>
                            <Text onPress={this.handleSave} style={{ color: '#03b38f', fontSize: 20, fontWeight: 'bold', marginRight: '2%' }} >SAVE</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', }}>
                            <Text onPress={()=> this.props.navigation.navigate('LifeStyle')} style={{ color: '#03b38f', fontSize: 20, marginLeft: '2%', fontWeight: 'bold' }}>
                                NEXT <Icon
                                    name='angle-right'
                                    size={24}
                                    color='#03b38f'
                                />
                            </Text>
                        </View>
                    </View>







                    {/* </Container> */}
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