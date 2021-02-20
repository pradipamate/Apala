import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, Text, ImageBackground, Switch, StyleSheet, Alert } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Card, CardItem, Body, Container,Header,Left, Right,Icon,Title } from 'native-base';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements'
import DeviceInfo from 'react-native-device-info'
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown';
// import ToggleSwitch from 'toggle-switch-react-native'
import CheckBox from '@react-native-community/checkbox';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

// import \{Hr}  from 'react-native-hr'
import RegistrationServices from '../../Services/RegistrationService/RegistrationServices'
import Loader from '../../Components/Loader'


var radio_props = [
    { label: 'Female', value: "Female" },
    { label: 'Male', value: "Male" },
    { label: 'Other', value: "Other" }

];
export default class AddFamilyMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fName:"",
            m_Name:'',
            l_Name:"",
            weight:null,
            height:null,
            gender:"Female",
            aadhar_number:"",
            blood_group:"",
            dob:"",
            m_Status:null,
            rel_type:"",
            fNameErr:"",
            m_NameErr:"",
            bloodGroupData:[
                {lable:"A+", value:"A+"},
                {lable:"AB+", value:"AB+"},
                {lable:"AB-", value:"AB-"},
                {lable:"B+", value:"B+"},
                {lable:"O+", value:"O+"},
                {lable:"A-", value:"A-"},
                {lable:"B-", value:"B-"},
                {lable:"O-", value:"O-"},
            ],
            token:""
        }
    }

    componentDidMount(){
        let token = this.props.navigation.getParam("token", "")   
        this.setState({
            token:token
        })
    }

    handleFName=(name)=>{
        if(name!==""){
            this.setState({
                fName:name,
                fNameErr:""
            })
        }
        else{
            this.setState({
                fNameErr:"Requied.",
                fName:""
            })
        }
    }
    handleMName=(m_name)=>{
        if(m_name!==""){
            this.setState({
                m_Name:m_name,
                m_NameErr:""
            })
        }
        else{
            this.setState({
                m_Name:"",
                m_NameErr:"Required."
            })
        }
        
    }

    handleLastName=(lName)=>{
        if(lName!==""){
            this.setState({
                l_Name:lName,
                l_NameErr:''
            })
        }
        else{
            this.setState({
                l_Name:"",
                l_NameErr:'Required'
            })
        }
    }
    handleWeight=(wight)=>{
        if(weight!==""||weight!==null){
            this.setState({
                weight:weight,
                weightErr:""
            })
        }
        else{
            this.setState({
                weight:"",
                weightErr:"Required."
            })
        }
        
    }
    handleHeight=(height)=>{
        if(height!==""||height!==null){
            this.setState({
                height:height,
                heightErr:""
            })
        }
        else{
            this.setState({
                height:"",
                heightErr:"Required."
            })
        }
        
    }
    handleAadhar=(aadhar)=>{
        if(aadhar!==""){
            this.setState({
                aadhar_number:aadhar,
                aadharErr:""
            })
        }
        else{
            this.setState({
                aadhar_number:"",
                aadharErr:"Required."
            })
        }
    }



    handleSubmit=()=>{
        let data={
            first_name: this.state.fName,
            middle_name: this.state.m_Name,
            last_name: this.state.l_Name,
            dob: this.state.dob,
            weight: this.state.weight,
            gender: this.state.gender,
            height: this.state.height,
            rel_type:this.state.rel_type,
            uidai:this.state.aadhar_number,
            blood_group:this.state.blood_group,
            marital_status:this.state.m_Status
        }
        if(!(this.state.fName && this.state.l_Name && this.state.m_Name && this.state.weight &&
            this.state.height && this.state.gender && this.state.aadhar_number && this.state.blood_group 
            && this.state.rel_type && this.state.dob && this.state.m_Status)){
                Alert.alert("Failure", "All fields are manditory")
                return

            }
        console.log("data=============================", data);
        RegistrationServices.addNewMember(this.state.token,data).then(response=>{
            console.log("response=============================",response);
        })
           
    }
    render() {
console.log("state================================", this.state);
        var marital_status = [
            { label: 'Married', value:0 },
            { label: 'Unmarried', value: 1 },
        ];
        var rel_type=[
            { label: 'Father', value:"Father" },
            { label: 'Mother', value:"Mother" },
            { label: 'Other', value:"Other" },
            { label: 'Married', value:0 },
        ]
        return (
            <Container>
               
                    <Loader loading={this.state.loading} />
                    <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
                    <Left style={{ marginLeft: '2%' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('BookAppoinment')}>
                            <Icon name='arrow-back' size={18} style={{ padding: 0, color: '#fff' }} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        {/* <Title style={{ color: '#fff', fontSize: 20 }}></Title> */}
                    </Body>
                    <Right>
                        <TouchableOpacity style={{ flexDirection: 'row' }}>
                            <Icon3 name='star-outline' color='#fff' size={24} style={{ marginRight: '8%' }} />
                            <Icon3 name='share-variant' color='#fff' size={22} style={{ marginRight: '8%' }} />
                            <Icon3 name='bell' color='#fff' size={22} style={{ marginRight: '8%' }} />
                            <Icon3 name='dots-vertical' color='#fff' size={24} style={{ marginRight: '3%' }} />
                        </TouchableOpacity>
                    </Right>

                </Header>
                <ScrollView>
                    <View style={{ marginHorixzontal: '0%' }}>
                        <View style={styles.backgroundimage}>
                           
                            <View style={styles.Viewcardpart}>
                                <Card style={styles.Card}>
                                    <CardItem style={styles.carditem}>
                                        <Body style={styles.Body}>
                                            <Text style={styles.cardtitle} >ADD FAMILY MEMBER</Text>
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
                                                <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.fNameErr}</Text>
                                                : null}
                                            <Input
                                                containerStyle={{ height: 40, marginTop: 10 }}
                                                placeholder="Middle Name*"
                                                style={{ fontSize: 14 }}
                                                placeholderTextColor="gray"
                                                inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', borderRadius: 10, borderColor: '#03b38f' }}
                                                inputStyle={{ color: 'black' }}
                                                onChangeText={(l_name) => this.setState({ m_Name: l_name })}

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
                                                onChangeText={(lName) => this.setState({ l_Name: lName })}

                                            // onChangeText={(email) => this.handleEmailChange(email)}

                                            />
                                            {this.state.emailErrMsg !== "" ?
                                                <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.emailErrMsg}</Text>
                                                : null}

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

                                            <View style={{ marginTop: '4%' }}>
                                                <RadioForm
                                                    radio_props={radio_props}
                                                    initial={0}
                                                    formHorizontal={true}
                                                    buttonInnerColor={'#999'}
                                                    // buttonOuterColor={'green'}
                                                    onPress={(value) => { this.setState({ gender: value }) }}
                                                    buttonOuterColor={'red'}
                                                    buttonSize={10}
                                                    buttonOuterSize={20}
                                                    labelStyle={{ fontSize: 15, marginRight: 10 }}
                                                    // buttonStyle={{marginLeft: 10}}
                                                    buttonWrapStyle={{ marginLeft: 0 }}

                                                />

                                            </View>
                                            <Input
                                                containerStyle={{ height: 40, marginTop: 10, }}
                                                placeholder="Addhar Number"
                                                placeholderTextColor="gray"
                                                style={{ fontSize: 14 }}
                                                keyboardType="numeric"
                                                inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', fontSize: 9, borderRadius: 10, borderColor: '#03b38f' }}
                                                inputStyle={{ color: 'black' }}
                                                onChangeText={(a_no) => this.setState({ aadhar_number: a_no })}

                                            // onChangeText={(c_pass) => this.handleConfirmPassword(c_pass)}

                                            />

                                            {this.state.c_passErrMsg !== "" ?
                                                <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.c_passErrMsg}</Text>
                                                : null}
                                            <View style={{width: '90%'}}>
                                            <Dropdown
                                                label='Select Blood Group'
                                                data={this.state.bloodGroupData}
                                                containerStyle={{ width: '100%',  }}
                                                onChangeText={(item) => this.setState({blood_group:item})}
                                            />
                                            </View>
                                            <View style={{width: '90%'}}>
                                            <Dropdown
                                                label='Select Relation Type'
                                                data={rel_type}
                                                containerStyle={{ width: '100%',  }}
                                                onChangeText={(item) => this.setState({rel_type:item})}
                                            />
                                            </View>
                                          
                                            <DatePicker
                                                style={{ width: 290, height: 50, marginHorizontal: '5%', marginVertical: '1%', marginTop: '8%', borderRadius: 40 }}
                                                date={this.state.dob}
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
                                                onDateChange={(date) => { this.setState({ dob: date }) }}
                                            />

                                            <View style={{ marginTop: '4%' }}>
                                                {/* <Text>Marital Status</Text> */}
                                                <RadioForm
                                                    radio_props={marital_status}
                                                    initial={0}
                                                    formHorizontal={true}
                                                    buttonInnerColor={'#999'}
                                                    // buttonOuterColor={'green'}
                                                    onPress={(value) => { this.setState({ m_Status: value }) }}
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
                                                onPress={(e) => this.handleSubmit(e)}>
                                                <Text style={{ fontSize: 16, marginVertical: '3%', color: '#fff', marginHorizontal: '35%' }}>Submit</Text>
                                            </TouchableOpacity>


                                        </Body>
                                    </CardItem>
                                </Card>
                            </View>
                            {/* </ImageBackground> */}
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