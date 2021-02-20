import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, ImageBackground, StyleSheet, FlatList, Switch, Alert, Modal, TextInput } from 'react-native';
import { Container, Header, Title, Content, Card, CardItem, Icon, Item, Label, Button, Thumbnail, Left, Right, Body, Text } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';
import Loader from '../../Components/Loader'
// import DropDownPicker from 'react-native-dropdown-picker'
import Icon4 from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements'
// import { AsyncStorage } from 'react-native';
import HomePageServices from '../../Services/HomePageServices/HomePageServices'
import RadioForm from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker'
import ImagePath from '../../Services/ImagePath'
import AsyncStorage from '@react-native-community/async-storage';
import PaymentApi from '../../Services/PaymentServices/PaymentServices'
import { Dropdown } from 'react-native-material-dropdown';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


export default class BookAppoinment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            morning: null,
            Afternoon: null,
            Evening: null,
            Night: null,
            selectdate: null,
            doctorInfo: {},
            leading: false,
            profileImage: "",
            DoctorName: "",
            speciality: '',
            starCount: null,
            guid: "",
            isVisible: false,
            userName: "",
            userType: "User",
            item: {},
            timeSlot: "",
            fees: "chat_fees-200",
            businesses: [],
            hospitalId: "",
            mobile: "",
            email: "",
            fees_type: [],
            mode: '',
            symptom: "",
            familyMembers: [],
            patient_id:'', 
            user_guid:"",
            slot_id:'',
            appointment_datetime:''
        }
    }
    handleMenu = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    }
    DateChangehandler = (date) => {

        console.log("dateafterSelectingSLot@############",date);
        //alert();
        this.setState({
            selectdate: date,

        })



        let data = {
            guid: this.state.guid,
            date: date
        }
        this.getSlots(data)
    }


    async componentDidMount() {
        let userName = await AsyncStorage.getItem("UserName")
        let mobile = await AsyncStorage.getItem("Mobile")
        let email = await AsyncStorage.getItem("Email")
        let u_guid=await AsyncStorage.getItem("User_guid")
        console.log("userName=================", userName);
        this.setState({
            userName: userName,
            mobile: mobile,
            email: email,
            user_guid:u_guid
        })


        let date = new Date()
        //   date= new Date().split("T")[0]
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()

        let today = year + "-" + month + "-" + day
     //   console.log("Date==================================================", today);
        var token = await AsyncStorage.getItem("Token")
       // console.log("Token in BookAppointment=========================>", token);
        let item = this.props.navigation.getParam("item", "")
        let mode = this.props.navigation.getParam("Mode", "")
       console.log("mode========================>", mode);
    //    console.log("mode================================", mode);


        this.setState({
            item: item,
            businesses: item.businesses,
            mode: mode
        })


        if (item != undefined && item != null) {
            //console.log("Object.keys(item)====================================>", Object.keys(item));

            var fees_type = [
                { label: "chat_fees-" + this.state.item.chat_fees, value: "chat_fees-"+this.state.item.chat_fees },
                { label: "video_fees-" + this.state.item.video_fees, value: "video_fees-"+this.state.item.video_fees },
                { label: "voice_fees-" + this.state.item.voice_fees, value: "voice_fees-"+this.state.item.voice_fees }
            ]

            let url = ImagePath + item.profile_photo_path
            this.setState({
                doctorInfo: item,
                speciality: item.qualification[0].qualified_name,
                profileImage: url,
                DoctorName: item.fullname,
                starCount: item.rating,
                selectdate: today,
                guid: item.guid,
                fees_type: fees_type
            })
        }


      

        let data = {
            guid: this.state.guid,
            date: this.state.selectdate
        }
        this.getSlots(data)


        HomePageServices.getAllFamilyMembers(token).then(response => {
           /// console.log("response in getAllFamilyMembers=========>>>>>>>>>>>>>>>>>", response);

            if (response) {
                if (response.status == 200) {
                    let arr = []
                    if (response.data != []) {
                        response.data.map(item => {
                            arr.push({ label: item.first_name, value: item.personal_info_id })
                        })

                        this.setState({
                            familyMembers: arr
                        })
                        console.log("arr==================", arr);
                    }

                }
            }
        })




    }


    getSlots = (data) => {
        this.setState({
            loading: true
        })
        var token = AsyncStorage.getItem("Token")
        HomePageServices.getSlots(data, token).then(response => {
           console.log("response in getSlots==========================>", response.data);
            if (response) {
                if (response.status == 200) {
                    this.setState({
                        morning: response.data.morning,
                        Afternoon: response.data.afternoon,
                        Evening: response.data.evening,
                        Night: response.data.night,
                        loading: false
                    })
                }
            }

        }).catch(err => {

        })
    }

    showPopup = (item) => {
     //   console.log("time================2344444444433333333334444444444444$$$$$$$$$$$$$$$", item);
        console.log("time================2344444444433333333334444444444444$$$$$$$$$$$$$$$", item.slot_id);
        console.log("time================2344444444433333333334444444444444$$$$$$$$$$$$$$$", item.slot_time);

        let selectedtime=item.slot_time;
        let selecteddate=this.state.selectdate;
        var time = new Date("1/1/2013 " + selectedtime +' UTC'); //temp varible only for extract time 
        var selecteddate1 = new Date(selecteddate);
        selecteddate1.setHours(time.getHours());
        selecteddate1.setMinutes(time.getMinutes());
        selecteddate1.setSeconds(time.getSeconds());

        console.log("@#@@@@@@@@@@",selecteddate1);

        this.setState({
            isVisible: true,
            timeSlot: item.slot_id,
            slot_id:item.slot_id,
            appointment_datetime:selecteddate1,
            isVisible: true,
            timeSlot: item.slot_time,
            slot_id:item.slot_id
        })
    }
    renderDoctormorningtime = ({ item }) => {
        return (
            <>
                {item.available?
                <View style={{ borderRadius: 10, borderWidth: 0.7, borderColor: '#13A318', padding: 8, margin: 5 }}>
                    <Text onPress={() => this.showPopup(item)}>{item.slot_time}</Text>
                </View>
                 :
                <View style={{ borderRadius: 10, borderWidth: 0.7, borderColor: 'red', padding: 8, margin: 5 }}>
                    <Text >{item.slot_time}</Text>
                </View>
                } 
            </>
        );
};


    renderDoctorAfternoontime = ({ item }) => {
        return (
            <>
                {item.available ?
                    <View style={{ borderRadius: 10, borderWidth: 0.7, borderColor: '#13A318', padding: 8, margin: 5 }}>
                        <Text onPress={() => this.showPopup(item)}>{item.slot_time}</Text>
                    </View>
                    :
                    <View style={{ borderRadius: 10, borderWidth: 0.7, borderColor: 'red', padding: 8, margin: 5 }}>
                        <Text >{item.slot_time}</Text>
                    </View>
                }
            </>
        );
    };
    renderDoctorEveningtime = ({ item }) => {
        return (
            <>
                {item.available ?
                    <View style={{ borderRadius: 10, borderWidth: 0.7, borderColor: '#13A318', padding: 8, margin: 5 }}>
                        <Text onPress={() => this.showPopup(item)}>{item.slot_time}</Text>
                    </View>
                    :
                    <View style={{ borderRadius: 10, borderWidth: 0.7, borderColor: 'red', padding: 8, margin: 5 }}>
                        <Text >{item.slot_time}</Text>
                    </View>
                }
            </>
        );
    };
    renderDoctorNighttime = ({ item }) => {
        return (
            <>
                {item.available ?
                    <View style={{ borderRadius: 10, borderWidth: 0.7, borderColor: '#13A318', padding: 8, margin: 5 }}>
                        <Text onPress={() => this.showPopup(item)}>{item.slot_time}</Text>
                    </View>
                    :
                    <View style={{ borderRadius: 10, borderWidth: 0.7, borderColor: 'red', padding: 8, margin: 5 }}>
                        <Text >{item.slot_time}</Text>
                    </View>
                }
            </>
        );
    };
    closeModal = () => {
        this.setState({
            isVisible: false
        })
    }
    handleUserType = (user) => {
        this.setState({
            userType: user
        })

    }
    handleFamilyMember = (value) => {
        this.setState({
            patient_id: value
        })
    }
    addFamilyMember=async()=>{
        var token = await AsyncStorage.getItem("Token")
        this.setState({
            isVisible:false
        })
        this.props.navigation.navigate("AddFamilyMember", {token:token})
    }
    handleFees = (value) => {
        console.log("value===============", value);
        this.setState({
            fees: value
        })
    }
    
    handleSubmit = async () => {
        console.log("this.state.familyMembers=============",this.state.familyMembers);
        if (this.state.familyMembers == [] && this.state.userType!=="User"){
            Alert.alert("Failure", "Please add family member first!!")
            return 
        }
        else{

            this.setState({
                isVisible: false
            })
        var token = await AsyncStorage.getItem("Token")
        let fee=this.state.fees.split("-")[1]
        let feetype=this.state.fees.split("_")[0]


        if (this.state.mode == "online") {
            let data = {
                date: this.state.selectdate,
                fees: fee,
                feesType:feetype,
                userName: this.state.userType,
                item: this.state.item,
                timeSlot: this.state.timeSlot,
                slot_id: this.state.slot_id,
                token: token,
                mobile: this.state.mobile,
                email: this.state.email,
                user_guid: this.state.user_guid,
                symptom:this.state.symptom
            }
            console.log("data in online=========================",data);
            this.props.navigation.navigate('ProceedToPay', { data: data })
        }
        else if (this.state.mode == "offline") {
            let data={}
            if(this.state.userType=="User"){
                 data = {
                    to_guid: this.state.guid,
                    service_id: "appointment",
                    appointment_datetime: this.state.appointment_datetime,
                    slot_id: this.state.slot_id,
                    symptom: this.state.symptom,
                    business_id:0
                }
            }
            else{
                data = {
                    to_guid: this.state.guid,
                    service_id: "appointment",
                    appointment_datetime: this.state.appointment_datetime,
                    slot_id: this.state.slot_id,
                    symptom: this.state.symptom,
                    patient_id:this.state.patient_id,
                    business_id:0
                }
            }
            console.log("Data in handleSubmit========",);
            PaymentApi.proceedToPay(token, data).then(response => {
                console.log("response in offline Booking=============================", response);
                if (response) {
                    if (response.status == 201 || response.status == 200) {
                        this.props.navigation.navigate('Booking_sucessfully',{data:this.state.item} )
                    }
                }

            }).catch(err => {
                console.log("Err in offline Booking==============================", err);
            })
        }
    }


        // this.props.navigate.navigation("AddFamilyMember")

    }

    handleHospital = (value) => {
        console.log("hispitalId================", value);

        this.setState({
            hospitalId: value
        })
    }
    handleSymptom = (text) => {
        this.setState({
            symptom: text
        })
    }
    render() {
        //     var fees_type=[
        //     {lable:"chat_fees-"+this.state.item.chat_fees, value : this.state.item.chat_fees},
        //     {lable:"video_fees-"+this.state.item.video_fees, value : this.state.item.video_fees},
        //     {lable: "voice_fees-"+this.state.item.voice_fees, value : this.state.item.voice_fees}
        // ]


        console.log("fees_type===================", this.state.mode);
        var radio_props = []
        if (this.state.businesses != [] && this.state.businesses !== null && this.state.businesses != undefined) {
            this.state.businesses.map((item) => {
                radio_props.push({ label: item.name, value: item.business_id })
            })
        }

        var radio_props_user = [
            { label: this.state.userName, value: 'User' },
            { label: 'Select Family Member', value: 'family_member' }
        ];
       
        return (
            <Container style={{ backgroundColor: '#f9f9f9' }}>
                <Loader loading={this.state.loading} />
                <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
                    <Left style={{ marginLeft: '2%' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('DoctorListing')}>
                            <Icon name='arrow-back' size={18} style={{ padding: 0, color: '#fff' }} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff', fontSize: 20 }}>Book Appoinment </Title>
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
                    <View style={{ marginHorizontal: '5%', borderRadius: 20, marginVertical: '8%' }}>
                        <Card style={{ borderRadius: 20 }}>
                            <CardItem style={styles.cardItem}>
                                <Left style={{ flexDirection: 'row' }}>
                                    <View style={{width:'40%'}}>
                                        {/* <Image
                                            square
                                            style={{ height: 90, width: 90, borderRadius: 60, }}
                                            source={require('../../Images/SkinProblem.png')}
                                        /> */}
                                        <Image
                                            square
                                            style={{ height: 90, width: 90, borderRadius: 60, marginLeft: '5%', marginVertical: '5%', padding: '1%' }}
                                            source={{ uri: this.state.profileImage }}
                                        />
                                    </View>
                                    <View style={{width:'60%'}}>
                                        <View style={{ flexDirection: 'row', width: '100%' }}>
                                            <Text style={{ flexWrap: 'wrap',fontSize: 12,fontWeight:"bold" }}>{this.state.DoctorName}</Text>
                                        </View>
                                        <Text style={styles.cardLeft4} style={{ fontWeight: 'bold', flex: 1, flexWrap: 'wrap', flexShrink: 1, fontSize: 12}}>{this.state.speciality} </Text>
                                       <View style={{width:'30%'}}>
                                        <StarRating
                                            starSize={18}
                                            fullStarColor="#ffe100"
                                            disabled={false}
                                            maxStars={5}
                                            rating={this.state.starCount}
                                        //selectedStar={(rating) => this.onStarRatingPress(rating)}
                                        />
                                        </View>
                                        <Text style={styles.cardLeft4}>ID_02</Text>
                                    </View>
                                </Left>
                            </CardItem>
                        </Card>


                     {this.state.mode =="offline" ?
                        <View style={{marginTop: '5%', padding: "5%", }}>
                            {this.state.businesses != [] && this.state.businesses !== null && this.state.businesses != undefined ?
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}> Appoinment For</Text>
                                : null}
                            <View style={{ marginTop: '2%' }}>
                                <RadioForm
                                    radio_props={radio_props}
                                    // initial={0}
                                    buttonSize={10}
                                    value={this.state.hospitalId}
                                    formHorizontal={true}
                                    buttonInnerColor={'#03b38f'}
                                    buttonOuterColor={'#03b38f'}
                                    labelStyle={{ fontSize: 15, marginLeft: '-5%' }}
                                    buttonWrapStyle={{ fontSize: 10 }}
                                    //buttonOuterSize={80}
                                    // mode="date"
                                    style={{ marginRight: '-170%' }}
                                    onPress={(value) => this.handleHospital(value)} />
                            </View>
                        </View>
                        :null}

                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.selectdate}
                            // mode="date"
                            //placeholder="select date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            androidMode='default'
                            // cancelBtnText="Cancel"

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
                            onDateChange={(date) => this.DateChangehandler(date)}
                        />

                        <View>
                            {/* <Text style={{ fontWeight: 'bold', fontSize: 18, paddingTop: '5%' }}>{this.state.selectdate}</Text> */}
                            <Text><Text style={{ fontWeight: 'bold', fontSize: 18, marginRight: '10%' }}><Icon3 name='weather-night' size={24} style={{ Right: '10%' }} />Morning </Text>4 Slots | 3 Available</Text>
                            {this.state.morning != null ?
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    //style={{ marginBottom: '1%'}}
                                    data={this.state.morning}
                                    renderItem={this.renderDoctormorningtime}
                                    keyExtractor={item => item.id}></FlatList>
                                :
                                <Text style={{ fontSize: 12, color: 'red' }}>Slots Not Available</Text>
                            }
                        </View>

                        <View>
                            <Text><Text style={{ fontWeight: 'bold', fontSize: 18 }}><Icon3 name='weather-night' size={24} style={{ marginRight: '8%' }} />Afternoon </Text><Text style={{ marginRight: '10%' }}>7 Slots | 3 Available</Text></Text>
                            {this.state.Afternoon != null ?
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    //style={{ marginBottom: '1%'}}
                                    data={this.state.Afternoon}
                                    renderItem={this.renderDoctorAfternoontime}
                                    keyExtractor={item => item.id}></FlatList>
                                :
                                <Text style={{ fontSize: 12, color: 'red' }}>Slots Not Available</Text>
                            }
                        </View>

                        <View>
                            <Text><Text style={{ fontWeight: 'bold', fontSize: 18 }}> <Icon3 name='weather-night' size={24} style={{ marginRight: '8%' }} />Evening </Text><Text style={{ marginRight: '10%' }}>7 Slots | 3 Available</Text></Text>
                            {this.state.Evening != null ?
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    //style={{ marginBottom: '1%'}}
                                    data={this.state.Evening}
                                    renderItem={this.renderDoctorEveningtime}
                                    keyExtractor={item => item.id}></FlatList>
                                :
                                <Text style={{ fontSize: 12, color: 'red' }}>Slots Not Available</Text>
                            }
                        </View>
                        <View>
                            <Text><Text style={{ fontWeight: 'bold', fontSize: 18 }}> <Icon3 name='weather-night' size={24} style={{ marginRight: '8%' }} />Night </Text><Text style={{ marginRight: '10%' }}>7 Slots | 3 Available</Text></Text>
                            {this.state.Night != null ?
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    //style={{ marginBottom: '1%'}}
                                    data={this.state.Night}
                                    renderItem={this.renderDoctorNighttime}
                                    keyExtractor={item => item.id}></FlatList>
                                :
                                <Text style={{ fontSize: 12, color: 'red' }}>Slots Not Available</Text>
                            }
                        </View>
                    </View>

                </ScrollView>

                <Modal
                    transparent={true}
                    // style={styles.centeredView}
                    // visible={this.state.modalVisible}
                    animationType={'slide'}
                    visible={this.state.isVisible}
                // onRequestClose={() => {
                //     this.closeModal()
                // }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <View>
                                <View style={{ marginBottom: 30, }}>
                                    <Icon name="md-close" style={{
                                        color: '#03b38f',
                                        fontSize: 30,
                                        position: 'absolute',
                                        right: 1,
                                        top: 1,
                                    }}
                                        onPress={() => {
                                            this.closeModal();
                                        }} />
                                </View>
                                <Text style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: 17 }}>This "In-Clinic" Appointment is For</Text>

                                {/* <View>
                                    <View style={{
                                        borderRadius: 80,
                                        width: 12,
                                        height: 12,
                                        borderWidth: 1,
                                        borderColor: '#13A318',
                                        backgroundColor: '#13A318',
                                        flexDirection: 'row',
                                        marginTop: 15,
                                        marginBottom: -18,
                                        justifyContent: 'flex-end'
                                    }}>

                                    </View>
                                    <Text style={{
                                        fontStyle: 'italic', fontSize: 19, fontWeight: 'bold', paddingLeft: 20
                                    }}>{this.state.userName}</Text>
                                </View> */}
                                <View style={{ marginTop: '2%' }}>
                                    <RadioForm
                                        radio_props={radio_props_user}
                                        initial={0}
                                        buttonSize={10}
                                        formHorizontal={false}
                                        buttonInnerColor={'#03b38f'}
                                        buttonOuterColor={'#03b38f'}
                                        labelStyle={{ fontSize: 15 }}
                                        buttonWrapStyle={{ fontSize: 10 }}
                                        //buttonOuterSize={80}
                                        // mode="date"
                                        style={{ marginRight: '-170%' }}
                                        onPress={(value) => this.handleUserType(value)} 
                                        />
                                </View>
                                {this.state.userType == "family_member" ?
                                <>
                                    {/* <DropDownPicker
                                        items={this.state.familyMembers}
                                        placeholder="Select Family Member"
                                        placeholderTextColor="gray"
                                        baseColor="#fff"
                                        display="flex"
                                        onChangeItem={() => { this.handleFamilyMember() }}
                                        containerStyle={{ height: 35, width: '80%', padding: '0%', zIndex: 99999 }}
                                        style={{ color: "white", width: '100%', borderColor: "#03b38f", zIndex: 99999, padding: 20 }}
                                    /> */}
                                   <View >
                                            <Dropdown
                                                label='Select family member'
                                                data={this.state.familyMembers}
                                                containerStyle={{ width: '100%',  }}
                                                onChangeText={(item) => this.handleFamilyMember(item)}
                                            />
                                            </View>
                                    <Icon name="md-add-circle" 
                                    style={{
                                        color: '#03b38f',
                                        fontSize: 30,
                                        position: 'absolute',
                                        right: 1,
                                        top: 80,
                                        
                                    }}
                                    onPress={()=>{this.addFamilyMember()}}
                                         />
                                       
                                        </>
                                    : null}
                                <View>
                                    {/* <Text style={styles.cardtitle}>LOGIN TO</Text> */}
                                    <Input
                                        containerStyle={{ height: 40, width: '100%', marginTop: 20 }}
                                        placeholder='Symptom'
                                        style={{ fontSize: 14 }}

                                        //leftIconContainerStyle={{ marginLeft: -1 }}
                                        inputContainerStyle={{ height: 35, width: '100%', borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03B38F' }}
                                        leftIconContainerStyle={{ marginLeft: 2 }}
                                        value={this.state.symptom}
                                        onChangeText={text => this.handleSymptom(text)}
                                    // errorMessage={this.state.userNameErrMsg}
                                    //    keyboardType='numeric'
                                    />
                                </View>
                                {this.state.mode == "online" ?
                                    <View style={{ marginTop: '2%' }}>
                                        <RadioForm
                                            radio_props={this.state.fees_type}
                                            initial={0}
                                            buttonSize={10}
                                            formHorizontal={false}
                                            buttonInnerColor={'#03b38f'}
                                            buttonOuterColor={'#03b38f'}
                                            labelStyle={{ fontSize: 15 }}
                                            buttonWrapStyle={{ fontSize: 10 }}
                                            //buttonOuterSize={80}
                                            // mode="date"
                                            style={{ marginRight: '-170%' }}
                                            onPress={(value) => this.handleFees(value)} />
                                    </View>
                                    : null}
                            </View>
                            <TouchableOpacity
                                style={styles.buttonsubmit}
                                onPress={() => this.handleSubmit()}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', padding: 2, fontSize: 15 }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                   
                </Modal>
            </Container>
        )
    }

}
const styles = StyleSheet.create({
    //Container:{  padding: 10},

    lastsection: { padding: 10 },

    card: { flex: 0, backgroundColor: '#fff' },
    cardItem: {
        borderRadius: 10, shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 5,
        shadowOpacity: 0.21
    },
    cardLeft4: { fontWeight: 'bold', marginTop: '1%', width: '100%', marginVertical: '4%' },
    cardLeft5: { fontWeight: 'bold', marginTop: '1%', width: '100%' },

    cardLeft: { fontWeight: 'bold', color: '#333', marginTop: '1%', width: '100%' },
    cardLeft2: { fontWeight: 'bold', color: '#E67A8E', marginTop: '1%', width: '100%', fontSize: 22 },

    cardLeft1: { fontWeight: 'bold', color: '#333', marginTop: '1%', width: '100%' },

    paymentype: { fontWeight: 'bold', color: '#fff', marginTop: '1%' },
    orderStatusView: { backgroundColor: '#ff40b4', paddingHorizontal: '4%', paddingVertical: '1%', marginTop: '2%' },
    orderStausText: { fontWeight: 'bold', fontSize: 14, color: '#fff' },
    cardItem1: { backgroundColor: '#fff', marginTop: '-1%' },
    line: {
        borderColor: '#ccc',
        borderWidth: .4,
        marginTop: '4%',
        marginBottom: '4%',
        width: '90%'
    },
    // container: {
    //     padding: 25,
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    centeredView: {
        flex: 1,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",

    },
    conditiontext: {
        fontSize: 10,
        //marginTop: 20
    },
    modalView: {
        width: '90%',
        backgroundColor: "#F9F9F9",
        borderRadius: 20,
        alignItems: "center",
        // shadowColor: "red",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5
    },

    button: {
        display: 'flex',
        height: 40,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#2AC062',
        shadowColor: '#2AC062',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
    },
    buttonsubmit: {
        elevation: 8,
        backgroundColor: "#03b38f",
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 30,
        marginTop: 20,
        marginBottom: 15
    },
    closeButton: {
        display: 'flex',
        height: 60,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF3974',
        shadowColor: '#2AC062',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 22,
    },
    image: {
        marginTop: 150,
        marginBottom: 10,
        width: '100%',
        height: 350,
    },
    text: {
        fontSize: 16,
        display: 'flex',
        padding: 3,
        fontWeight: "bold",
        fontStyle: 'normal'
    },

    closeText: {
        fontSize: 24,
        color: '#00479e',
        textAlign: 'center',
    }


})
