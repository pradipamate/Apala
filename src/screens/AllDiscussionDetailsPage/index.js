import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, ImageBackground, StyleSheet, FlatList, Switch, Alert, Modal } from 'react-native';
import { Container, Header, Title, Left, Right, Body, Text, Textarea } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { FAB } from 'react-native-paper';
import Geocoder from 'react-native-geocoding';
import GetLocation from 'react-native-get-location'
import { Input } from 'react-native-elements'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import AsyncStorage from '@react-native-community/async-storage';
import HomePageServices from '../../Services/HomePageServices/HomePageServices'
import SidebarServices from '../../Services/SidebarServices/SidebarServices'
import Loader from '../../Components/Loader'
import ImagePath from '../../Services/ImagePath'

import constants from '../../../constant';
const BASE_URL = constants.BASE_URL;
const BASE_URL1 = constants.BASE_URL1;




Geocoder.init('AIzaSyBxPqdmg2ouIJZs4SKNHC3N2Qbi7mdboFY');

export default class AllDiscussionDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: false,
            modalVisible: false,
            sObj: {},
            studid: '',
            sectionid: '',
            allSpecialities: [],
            loading: false,
            latitude: "",
            longitude: "",
            address:"",
            question:"",
            speciality_id:"",
            description:"",
            url: 'https://aapkadoctorgrpdiag469.blob.core.windows.net/files/specialities/CARDIOLOGY.jpg',
            findDoctordata: [
                {
                    id: 1,
                    tname: 'Find Doctors Near You',
                    details: 'Select Preferred Doctor & Time-Slot to book an in-Clinic or Video Consultation',
                    buttonurl: 'FindDoctor',
                    buttonname: 'Find Doctors',
                    src: require('../../Images/finddoctor.png'),

                },
                {
                    id: 2,
                    tname: 'Doctors Online Now',
                    details: 'Tell us your Health Concern & we will assign you a top doctor in 60 secs',
                    buttonurl: 'https://www.google.com/',
                    buttonname: 'Start Consulting',
                    src: require('../../Images/startconsulting.png'),
                },
            ],
            
            ReadAboutDis_section: [
                {
                    id: 1,
                    SubTitle: 'Corona Precautions & Awareness',
                    BYdoctorname: 'Dr.Abc',
                    buttonurl: 'https://www.google.com/',
                    // buttonname:'Find Doctors',
                    src: require('../../Images/readaboutdis_image1.png'),

                },
                {
                    id: 2,
                    SubTitle: 'How to Loss Weight & Reduce Obesity',
                    BYdoctorname: 'Dr.Abc',
                    buttonurl: 'https://www.google.com/',
                    // buttonname:'Start Consulting',
                    src: require('../../Images/readaboutdis_image2.png'),
                },
                {
                    id: 3,
                    SubTitle: 'Eat Healthy, Be Fit & Exercise Daily',
                    BYdoctorname: 'Dr.Abc',
                    buttonurl: 'https://www.google.com/',
                    // buttonname:'Start Consulting',
                    src: require('../../Images/readaboutdis_image3.png'),
                },
            ],



        }
    }


    async componentDidMount() {

        let token = await AsyncStorage.getItem("Token")
        this.setState({
            token:token
        })
        console.log("Token in homepage=========================>", token);
        this.setState({
            loading: false
        })

       
    }

    // getAllDiscussions=(token)=>{
    //     HomePageServices.getAllDiscussions(token).then(response=>{
    //         console.log("get all discussions>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",response);
    //         if(response){
    //             if(response.status==200){
    //                 this.setState({
    //                    allDiscussions:response.data 
    //                 })
    //             }
    //         }
    //     })
    // }

  
    handleMenu = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    }

    render() {
        let item = this.props.navigation.getParam("item", "")
        console.log("discussion===============================================", item);
        return (
            <Container>
                    <Loader loading={this.state.loading} />
                    <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
                        <Left style={{ marginLeft: '2%' }}>
                            <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate('HomePage')}>
                                <Icon1 name='arrow-back' style={{ color: '#fff', fontSize: 30 }} />
                            </TouchableOpacity>
                        </Left>
                        <Body>
                            <Title style={{ color: '#fff', marginLeft: '5%', fontSize: 22 }}>Discussion Details </Title>
                        </Body>
                        <Right style={{flexDirection:'row'}}>
                                 {/* <Icon1 name='notifications-outline' color='#fff' size={25} style={{ marginRight: '5%' }} />
                                 <Icon name='dots-vertical' color='#fff' size={24}  /> */}
                        </Right>
                    </Header>
                   <ScrollView>
                    <View>
                        <View style={styles.lastsection}>
                            <View style={{ padding: 10 }}>
                                <Text style={styles.findtextdoctor}>Read About Discussions</Text>
                                <TouchableOpacity>
                <Card id={item.id} style={{ borderRadius: 10 ,padding:'4%'}}>
                    <CardImage
                        // source={item.src}
                        source={require('../../Images/readaboutdis_image1.png')}
                        style={{ width: 200, height: 100 }}
                    />
                    {/* <CardTitle subtitle={item.case_headings} style={{ width: 200  }} /> */}
                    {/* <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}> */}
                    <Text style={{ fontSize: 15, flex: 1, flexWrap: 'wrap',marginTop:'10%' }}><Text style={{color:'green'}}>{item.case_headings}</Text> </Text>
                    
                        <Text style={{ fontSize: 15, flex: 1, flexWrap: 'wrap', }}>Speciality : <Text style={{color:'green'}}>{item.speciality_name}</Text> </Text>
                        <Text style={{ fontSize: 15, flex: 1, flexWrap: 'wrap' }}>Stream : <Text style={{color:'green'}}>{item.stream_name}</Text> </Text>
                        <Text style={{ fontSize: 15, flex: 1, flexWrap: 'wrap' }}>Created At : <Text style={{color:'green'}}>{item.created_at}</Text> </Text>
                        <Text style={{ fontSize: 15, flex: 1, flexWrap: 'wrap' }}>Description : <Text style={{color:'green'}}>{item.case_desc}</Text> </Text>
                    
                    {/* </View> */}
                </Card>
            </TouchableOpacity>
                            </View>
                            
                        </View>

                    </View>
                </ScrollView>
               


                </Container>
        )
    }

}
const styles = StyleSheet.create({
    //Container:{  padding: 10},
   
    parts: {
        borderRadius: 10, shadowColor: "#000", shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, marginBottom: 20
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#03b38f',
    },

    finddoctor: { flexDirection: 'row', justifyContent: 'space-between' },
    findPart: {
        borderRadius: 20,
        // shadowColor:'#ccc',
        borderWidth: 1,
        borderColor: '#ccc',
        marginHorizontal: 5,
        //     shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.25, shadowRadius: 3.84,
        //  elevation: 3, 
        // shadowColor: "rgba(0,0,0,1)",
        // shadowOffset: {
        // width: 3,
        // height: 3
        // },
        // elevation: 5,
        // shadowOpacity: 0.21,
        padding: 10
    },
    blogtitlename: { textAlign: 'center', fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', paddingBottom: '2%', paddingTop: '2%' },
    button: {
        backgroundColor: '#03b38f',
        alignSelf: 'center',
        borderRadius: 30,
        marginBottom: '10%',
        marginTop: '10%'
    },
    lastsection: { padding: 10 },
    lastsectionpart: {
        borderRadius: 10, shadowColor: "#000", shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 10
    },
    modalView: {
        width: '100%',
        backgroundColor: "#fff",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 2
        },
        backgroundColor: '#f9f9f9',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    centeredView: {
        flex: 1,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        // zIndex:99999,
    },
    ImageBackground: { position: 'relative' },
    line: {
        borderColor: '#ccc',
        borderWidth: .4,
        marginTop: '1%',
        marginBottom: '1%'
        //width:'100%'
    },
    viewAll: { fontSize: 17, fontWeight: 'bold', color: '#03b38f' }
})