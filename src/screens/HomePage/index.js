import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, ImageBackground, StyleSheet, FlatList, Switch, Alert, Modal } from 'react-native';
import { Container, Header, Title, Left, Right, Body, Text, Textarea } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { FAB, List } from 'react-native-paper';
import Geocoder from 'react-native-geocoding';
import GetLocation from 'react-native-get-location'
import { Input } from 'react-native-elements'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import AsyncStorage from '@react-native-community/async-storage';
import HomePageServices from '../../Services/HomePageServices/HomePageServices'
import SidebarServices from '../../Services/SidebarServices/SidebarServices'
import Loader from '../../Components/Loader'
import ImagePath from '../../Services/ImagePath'
import SearchableDropdown from 'react-native-searchable-dropdown';
import constants from '../../../constant';
const BASE_URL = constants.BASE_URL;
const BASE_URL1 = constants.BASE_URL1;

Geocoder.init('AIzaSyBxPqdmg2ouIJZs4SKNHC3N2Qbi7mdboFY');

export default class HomePage extends Component {
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
            address: "",
            question: "",
            speciality_id: "",
            description: "",
            searchdata: "",
            allDiscussions: [],
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

        }
    }


    async componentDidMount() {

        let token = await AsyncStorage.getItem("Token")
        this.setState({
            token: token
        })
        console.log("Token in homepage=========================>", token);
        this.setState({
            loading: true
        })
        if (token) {
            this.getAllSpecialities(token)
            this.getUserDetails(token)
            this.getGeolocation()
            this.getAllDiscussions(token)
        }

    }

    getAllDiscussions = (token) => {
        HomePageServices.getAllDiscussions(token).then(response => {
            // console.log("dicus--------------->>>>", response)
            if (response) {
                if (response.status == 200) {
                    this.setState({
                        allDiscussions: response.data
                    })
                }
            }
        })
    }

    getGeolocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                Geocoder.from([location.latitude, location.longitude])
                    .then(json => {
                        var addressComponent = json.results;
                        this.setState({
                            address: addressComponent[0].formatted_address
                        })
                    })
            })
    }
    getUserDetails = (token) => {
        SidebarServices.getUserDetails(token).then(response => {
            if (response) {
                if (response.status == 200) {
                    // console.log("user response---------------------------->", response)
                    AsyncStorage.setItem("UserName", JSON.parse(response.data.userbasicinfo.user_full_name))
                    AsyncStorage.setItem("Mobile", response.data.userbasicinfo.mobile)
                    AsyncStorage.setItem("Email", response.data.userbasicinfo.email)
                    AsyncStorage.setItem("User_guid", response.data.userbasicinfo.guid)
                    this.setState({
                        userName: response.data.userbasicinfo.user_full_name
                    })
                }
            }
            else {
                Alert.alert("Error", "Failed to get user information.")
            }
        }).catch((err) => {
            console.log("Err in get User Details======>", err);
        })
    }


    getAllSpecialities = (token) => {
        HomePageServices.getAllSpecialities(token).then(response => {
            if (response) {
                if (response.status == 200) {
                    this.setState({
                        allSpecialities: response.data,
                        loading: false
                    })
                }
            }
            else {
                Alert.alert("Error", "Failed to find specialities.")
            }
        }).catch((Err) => {
            this.setState({
                loading: false
            })
            Alert.alert("Error", "Failed to find specialities.")
        })
    }

    handleSearch = (text) => {
        let data = text
        // console.log("search key------------------->>", text)
        if (text == "") {
            this.setState({
                searchdata: ""
            })
        }
        HomePageServices.getWildSearchData(data, this.state.token).then(response => {
            // console.log("response in get all specialities search=================", response.data);
            if (response) {
                this.setState({
                    searchdata: response.data
                })
            }
            else {
                // Alert.alert("Error", "Failed to find specialities.")
            }
        }).catch((Err) => {
            //  console.log("Error in getAllSpecialities=====", Err);
            // Alert.alert("Error", "Failed to find specialities.")
        })


    }

    handleClose = () => {
        this.setState({
            modalVisible: false
        })
    }

    onclickSpeciality = (item) => {
        this.props.navigation.navigate("DoctorListing", { specialtyId: item.speciality_id })
    }


    submitQuestion = () => {
        let data = {
            case_headings: this.state.question,
            case_desc: this.state.description,
            speciality_id: this.state.speciality_id,
        }

        HomePageServices.askQuestion(this.state.token, data).then(response => {
            if (response) {
                if (response.status == 201) {
                    Alert.alert("Sucess", "Your query has been submitted successfully!!")
                    this.setState({
                        question: "",
                        description: "",
                        modalVisible: false
                    })
                }
            }
        }).catch(err => {
            Alert.alert("Failure", "Failed to submit query...try again!!")
            this.setState({
                question: "",
                description: ""
            })
        })


    }

    checkCategory(item) {
        console.log("clicked item------------------------>>>", item)
        if (item.category == "symptom") {
            this.setState({
                searchdata: ""
            })
            this.props.navigation.navigate('FindDoctor')
        }
        else {
            this.setState({
                searchdata: ""
            })
            this.props.navigation.navigate("DoctorListing")
        }
    }

    openModal = (item) => {
        this.setState({
            speciality_id: item.speciality_id
        })

        this.setState({ modalVisible: true })
    }


    renderSpecialistDoctor = ({ item }) => {
        let url = ImagePath + item.imagepath
        return (
            <>
                <TouchableOpacity onPress={() => this.onclickSpeciality(item)} >
                    <Card style={{ borderRadius: 10 }}  >
                        <CardImage
                            source={{ uri: url }}
                            style={{ width: 230, height: "auto", position: 'relative' }}

                        />
                        <View style={{ justifyContent: 'center', flexDirection: 'row', position: 'absolute', bottom: '35%', left: '3%' }}>
                            <Text style={{ textAlign: "center", color: '#fff', fontSize: 13, fontWeight: 'bold' }}
                            >{item.name}</Text>
                        </View>

                        <CardAction style={{ flexDirection: 'row', justifyContent: 'center' }}

                        >
                            <View style={{ padding: 10 }}>
                                <View style={styles.captionpart}>
                                    <Text style={styles.caption1}>{item.name} </Text>
                                    <Text style={styles.caption2} onPress={() => this.openModal(item)}>Free Question/Consult Now </Text>
                                </View>
                            </View>
                        </CardAction>
                    </Card>
                </TouchableOpacity>

            </>
        );
    };

    renderItem = ({ item }) => {
        return (
            <>

                <View id={item.id} style={styles.findPart}>
                    <View style={{ paddingTop: '2%', paddingBottom: '10%', }}>
                        <Text style={styles.blogtitlename}>{item.tname}</Text>
                    </View>
                    <View style={styles.finddoctor}>
                        <View>
                            <Image resizeMode='contain'
                                style={{ width: 100, height: 100 }}
                                source={item.src} />
                        </View>
                        <View style={{ width: 160, height: "100%" }}>
                            <View>
                                <Text> {item.details}</Text>
                            </View>
                            {item.id == 1 ?
                                <TouchableOpacity style={styles.button}
                                    onPress={() => this.props.navigation.navigate('FindDoctor')}>
                                    <Text style={{ fontSize: 14, padding: '2%', color: '#fff', marginHorizontal: '10%', marginBottom: '2%' }}>{item.buttonname}</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.button}
                                    onPress={() => this.props.navigation.navigate('DoctorListing')}>
                                    <Text style={{ fontSize: 14, padding: '2%', color: '#fff', marginHorizontal: '10%', marginBottom: '2%' }}>{item.buttonname}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
            </>
        );

    };


    renderReadAboutDis_section = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AllDiscussionDetailsPage', { item: item })}>
                <Card id={item.id} style={{ borderRadius: 10 }}>
                    <CardImage
                        // source={item.src}
                        source={require('../../Images/readaboutdis_image1.png')}
                        style={{ width: 200, height: 100 }}
                    />
                    <CardTitle subtitle={item.case_headings} style={{ width: 200, }} />
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                        <Text style={{ width: 100, fontSize: 10, flex: 1, flexWrap: 'wrap', height: 70 }}>{item.speciality_name} </Text>
                    </View>
                </Card>
            </TouchableOpacity>
        );
    };

    handleMenu = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    }

    render() {

        return (
            <Container>
                <Loader loading={this.state.loading} />
                <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
                    <Left style={{ marginLeft: '2%' }}>
                        <TouchableOpacity
                            onPress={this.handleMenu}>
                            <Icon1 name='menu' style={{ color: '#fff', fontSize: 30 }} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff', marginLeft: '45%', fontSize: 25 }}>Home </Title>
                    </Body>
                    <Right style={{ flexDirection: 'row' }}>
                        <Icon1 name='notifications-outline' color='#fff' size={25} style={{ marginRight: '5%' }} />
                        <Icon name='dots-vertical' color='#fff' size={24} />
                    </Right>
                </Header>
                <View style={{
                    marginTop: '1%',
                }}>
                    <Input
                        placeholder='SEARCH'
                        style={{ fontSize: 14 }}
                        rightIcon={
                            <Icon1
                                name='search'
                                size={20}
                                color='#03b38f'
                                type='material-community'
                            />}

                        onChangeText={text => this.handleSearch(text)}
                        inputContainerStyle={{ borderWidth: 1, paddingLeft: '5%', borderRadius: 10, borderColor: '#03b38f' }}
                        rightIconContainerStyle={{ marginRight: '2%' }}
                    />



                    {this.state.searchdata !== "" ?

                        <ScrollView style={{
                            backgroundColor: "#f9f9f9",
                            // position: 'absolute',
                            height: '50%',
                            zIndex: 99999, width: '100%', padding: 10, overflow: 'scroll'
                        }}>
                            {this.state.searchdata.map(item => {
                                console.log("item-------------------------------", item.suggestion);
                                return (
                                    <TouchableOpacity
                                        onPress={() => this.checkCategory(item)}>

                                        <Text

                                            style={{ color: '#000', padding: 8 }} key={item.unique_id}>{item.suggestion}</Text>

                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>

                        : null}
                </View>




                <ScrollView>
                    <View>
                        <View style={{ backgroundColor: '#f9f9f9' }}>

                            <View style={{ backgroundColor: '#fff', paddingHorizontal: '5%' }}>
                                <Text style={{ fontSize: 13 }}>
                                    <Icon2
                                        name='map-marker'
                                        size={13}
                                        color='#03b38f'
                                        type='material-community'
                                        style={{ marginLeft: '2%' }}
                                    /> {this.state.address}
                                </Text>
                            </View>
                            <View style={styles.bimage}>
                                <View style={styles.ImageBackground} >
                                    <Image resizeMode='cover'
                                        style={{ width: "100%", height: 230, borderRadius: 20 }}
                                        source={require('../../Images/Booknow.png')} />
                                </View>
                                <View style={styles.bannerheader}>
                                    <Text style={styles.bannerheaderTitle}>
                                        FREE FIRST {"\n"}
                                            DOCTOR {"\n"}
                                            CONSULTATION</Text>
                                    <Text style={styles.hurryup}>
                                        HURRY UP!
                                            </Text>
                                </View>
                                <View style={{ marginTop: '-23%', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '10%' }}>
                                    <TouchableOpacity style={styles.button}
                                        onPress={() => this.props.navigation.navigate('MyAppoinment')}>
                                        <Text style={{ fontSize: 14, padding: '3%', color: '#fff', }}>My Appoinments</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}
                                        onPress={() => this.props.navigation.navigate('DoctorListing')}>
                                        <Text style={{ fontSize: 14, padding: '3%', color: '#fff', }}>BOOK NOW</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.finddoctorsliderpart}>
                                <View style={{ padding: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.findtextdoctor}>Find Specialist Doctors</Text>
                                        <Text style={styles.viewAll} onPress={() => this.props.navigation.navigate('DoctorListing')}> View All</Text>
                                    </View>

                                </View>

                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    //style={{ marginBottom: '1%'}}
                                    data={this.state.allSpecialities}
                                    renderItem={this.renderSpecialistDoctor}
                                    keyExtractor={item => item.id}></FlatList>

                            </View>

                            <View>
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    style={{ padding: 10 }}
                                    data={this.state.findDoctordata}
                                    renderItem={this.renderItem}
                                    keyExtractor={item => item.id}></FlatList>
                            </View>

                        </View>
                        {this.state.allDiscussions.length !== 0 ?
                            <View style={styles.lastsection}>
                                <View style={{ padding: 10 }}>
                                    <Text style={styles.findtextdoctor}>Read About Discussions</Text>
                                </View>
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    //style={{ marginBottom: '1%'}}
                                    data={this.state.allDiscussions}
                                    renderItem={this.renderReadAboutDis_section}
                                    keyExtractor={item => item.id}></FlatList>
                            </View>
                            : null}

                    </View>
                </ScrollView>
                <FAB
                    style={styles.fab}
                    medium
                    icon="plus"
                    onPress={() => this.props.navigation.navigate('DoctorListing')}
                />


                <Modal
                    style={styles.modal}
                    animationType="slide"
                    coverScreen={true}
                    backdropOpacity={0.70}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.handleClose} >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{ position: 'absolute', right: '5%', top: '2%' }}>
                                <Icon2
                                    name='times'
                                    size={25}
                                    color='#03b38f'
                                    type='material-community'
                                    onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
                                />
                            </View>
                            <View style={{ marginTop: '5%' }}>
                                <View style={styles.ImageBackground} >
                                    <Image resizeMode='contain'
                                        style={{ width: 250, height: 200, borderRadius: 20 }}
                                        source={require('../../Images/Booknow.png')} />
                                </View>
                            </View>

                            <View style={{ padding: 0, textAlign: 'center', marginHorizontal: '5%' }}>

                                <View style={{ marginBottom: 5, marginTop: 5 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 13 }}>Ask your Question to the Best Specilist Doctors in the City</Text>
                                </View>

                                <View style={styles.line}></View>

                                <View style={{ marginBottom: 5, marginTop: 5 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 13 }}>What issues problem you are facing? please Elaborate</Text>
                                </View>
                                <View style={{ width: '100%' }}>
                                    <Input
                                        containerStyle={{ height: 40, marginTop: 10, marginBottom: 10, width: '100%' }}
                                        placeholder="Ask Question"
                                        placeholderTextColor="gray"
                                        style={{ fontSize: 14 }}
                                        inputContainerStyle={{ borderWidth: 1, paddingLeft: '4%', width: '100%', fontSize: 9, borderRadius: 10, borderColor: '#03b38f' }}
                                        inputStyle={{ color: 'black' }}
                                        onChangeText={(a_no) => this.setState({ question: a_no })}

                                    // onChangeText={(c_pass) => this.handleConfirmPassword(c_pass)}

                                    />
                                </View>

                                <Textarea rowSpan={3} bordered placeholder="Description" onChangeText={(a_no) => this.setState({ description: a_no })} />

                                <View style={{ marginBottom: 5, marginTop: 5 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'red' }}>Note: All Question are throrougly processed, please avoid any kind of abusive language,threats,etc</Text>
                                </View>

                                <View style={{ marginBottom: 5, marginTop: 5 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Note:Your Question will be displayed to respective Specilist you choose, Our Doctors will reach out to you in the Discussion Section  </Text>
                                </View>
                                <View style={styles.line} />
                                <View style={{ justifyContent: 'center', flexDirection: 'row', padding: 8 }}>
                                    <TouchableOpacity style={{ backgroundColor: '#03b38f', padding: 8, borderRadius: 10 }}>
                                        <Text style={{ color: "#fff", padding: 5, fontWeight: 'bold' }} onPress={() => this.submitQuestion()}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </Container>
        )
    }

}
const styles = StyleSheet.create({
    bimage: { padding: 10, marginTop: '2%', },
    ImageBackground: { position: 'relative' },
    bannerheader: { position: 'absolute', right: '-2%', top: '10%' },
    bannerheaderTitle: { fontSize: 20, color: '#fff', width: '100%', color: 'blue', fontWeight: 'bold', fontStyle: 'italic' },
    hurryup: { textAlign: 'left', color: '#000', fontWeight: 'bold', fontSize: 22, marginLeft: '15%', marginTop: '5%', fontStyle: 'italic' },
    finddoctorsliderpart: { marginBottom: '0%', padding: 10 },
    findtextdoctor: { fontSize: 18, paddingBottom: 10 },
    caption1: { fontSize: 12, textAlign: 'center', fontWeight: 'bold' },
    caption2: { textDecorationLine: 'underline', fontSize: 15, color: '#03b38f', textAlign: 'center', fontWeight: 'bold' },
    captionparttiile: { position: 'absolute', left: '5%', bottom: '3%' },
    captionTitle: { fontSize: 13, color: '#fff', width: '100%', color: '#fff', fontWeight: 'bold' },
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