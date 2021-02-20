import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, ImageBackground, StyleSheet, Modal, FlatList, SafeAreaView, Share } from 'react-native';
import { Container, Header, Title, Content, CardItem, Footer, FooterTab, Button, Left, Right, Body, Text } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import StarRating from 'react-native-star-rating';
import { Accordion } from "native-base";
import { Card } from 'react-native-cards';
import FindDoctorServices from '../../Services/FindDoctors/FindDoctorServices'
import Loader from '../../Components/Loader'
import AsyncStorage from '@react-native-community/async-storage';
import ImagePath from '../../Services/ImagePath'


import constants from '../../../constant';
import { times } from "lodash";
const BASE_URL = constants.BASE_URL;
const BASE_URL1 = constants.BASE_URL1;

export default class DoctorListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: false,
            modalVisible: false,
            sObj: {},
            studid: '',
            sectionid: '',
            starCount: 3.5,
            doctorsList: [],
            loading: false,
            specilityId: '',
            symptomId: "",
            openAmbulanceModal: false,
            responsehndlr: false,
            hospital: [],
            workAddress: []
        }
    }

    async componentDidMount() {

        let _base = this
        let specilityId = this.props.navigation.getParam("specialtyId", "")
        let symptomId = this.props.navigation.getParam("symptomId", "")
        console.log("specilityId==================", specilityId);
        console.log("symptomId=========================", symptomId);


        this.setState({
            modalVisible: false,
            loading: true,
            specilityId: specilityId
        })
        let token = await AsyncStorage.getItem('Token');
        let data = []
        if (specilityId !== "") {
            data = {
                searchtype: "speciality",
                searchkey: specilityId
            }
        }
        else if (symptomId !== "") {
            data = {
                searchtype: "symptom",
                searchkey: symptomId
            }
        }
        else {
            data = {
            }

        }



        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                "Accept": "application/json"
            },
            body: JSON.stringify({
                data
            })
        };

        fetch("https://svcaapkadoctor.azurewebsites.net/api/consultants", requestOptions)
            .then(response => response.json())
            .then(function (response) {
                let res = JSON.stringify(response)
                console.log("doctor list--------------------->>>", res)

                _base.setState({
                    doctorsList: JSON.parse(res),
                    loading: false
                })
                if (_base.state.doctorsList) {
                    _base.setState({ responsehndlr: true })
                }

            }, function (err) {
                console.log("err in get list---------------------->>", err)
            })



    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    bookAppointment = (item) => {
        console.log("item-=====================================================>", item);
        this.props.navigation.navigate('BookAppoinment', { item: item, Mode: "offline" })
    }
    onlineConsultation = (item) => {
        this.props.navigation.navigate('BookAppoinment', { item: item, Mode: "online" })
    }
    visitWithAmbulance = () => {
        this.setState({
            openAmbulanceModal: true
        })
    }

    onShare = async (item) => {
        try {
            const { doctorsList } = this.state.doctorsList
            const result = await Share.share({
              
                message: item.fullname,
                url:"https://aapkadoctorgrpdiag469.blob.core.windows.net/files/"
                // +item.profile_photo_path
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            alert(error.message);
        }
    }

    handleMenu = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    }

    renderItem = ({ item, index }) => {
        console.log("url==================================", item);

        if (this.state.responsehndlr == true) {

            let url = ImagePath + item.profile_photo_path

            return (
                <SafeAreaView
                    key={index}
                    style={styles.firstCard} >
                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                        {item.online_status == 1 ?
                            <Text style={styles.icon1}>
                                <FontAwesomeIcon name="circle" />Available Now</Text> : <Text style={{ ...styles.icon1, ...styles.textColor2 }}><FontAwesomeIcon name="circle" /> Not Available
                            </Text>
                        }
                        <View style={{ marginHorizontal: "5%", marginVertical: "3%", }}>
                            <StarRating
                                starSize={18}
                                fullStarColor="#ffe100"
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            borderBottomColor: '#c9c9c9',
                            borderBottomWidth: 1,
                            marginHorizontal: "4%"
                        }}
                    />

                    <View style={{ flexDirection: "row", padding: 0, justifyContent: 'space-between' }}>
                        <View style={{ marginTop: "4%", width: '40%' }}>
                        {item.profile_photo_path ?
                            <Image
                                square
                                style={{ height: 80, width: 80, borderRadius: 60, marginLeft: '5%', marginVertical: '5%', padding: '1%' }}
                                source={{ uri: url }}
                            />
:
                            <Image
                                source={require('../../Images/placeholder_image.png')}
                                style={{ height: 80, width: 80, borderRadius: 60, marginLeft: '5%', marginVertical: '5%', padding: '1%' }}></Image>
                                }
                            {/* <Text style={styles.text_id}>ID_201</Text> */}
                            <View style={{ flexDirection: 'row', marginLeft: "10%", marginTop: '4%' }}>
                                <FontAwesomeIcon5 name="award" style={{ fontSize: 20, color: "#03b38f", marginRight: '5%' }} />
                                <SimpleLineIconsIcon name="check" style={{ fontSize: 20, color: "#03b38f", marginRight: '5%' }} />
                                <FoundationIcon name="clipboard-notes" style={{ fontSize: 20, color: "#03b38f", marginRight: '5%' }} />
                            </View>

                        </View>
                        <View style={{ marginTop: "4%", width: '60%' }}>
                            <Text style={styles.text3}>{item.fullname}</Text>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{item.qualification[0].short_name}</Text>
                                <Text style={styles.text5}><Text style={{ fontWeight: 'bold', fontSize: 13 }}>
                                    {item.superSpecialities.map(i => {
                                        return i.name+", "
                                    })}
                                </Text>{"\n"}Reg.id <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{item.qualification.map(i => {
                                    return i.reg_number
                                })}</Text></Text>
                            </View>

                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    <Text style={{ alignSelf: 'center', marginRight: "5%", }}>
                                        <FontAwesomeIcon name="briefcase" style={{ fontSize: 20, color: "#03b38f", marginRight: '5%' }} />
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{ marginRight: "8%" }}>
                                        <Text style={styles.titledyanmic}> {item.totalexperience}</Text></Text>
                                </View>
                            </View>



                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    <Text style={{
                                        alignSelf: 'center',
                                        color: '#03b38f'
                                    }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
                                            <FontAwesomeIcon name="language" style={{ fontSize: 20, color: "#03b38f", marginRight: '5%' }} />
                                            {item.languages !== null &&
                                                item.languages.map(i => {
                                                    return i.language+", "
                                                })}</Text></Text>
                                </View>
                            </View>

                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                        <View style={{ width: '90%' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 13 }} >{
                                item.businesses &&
                                item.businesses.map(i => { return i.name })
                            }</Text>
                            <Text style={{
                                color: '#03b38f',
                            }}>
                                <Icon
                                    name='map-marker'
                                    size={15}
                                    type='material-community'
                                /> <Text style={{ fontSize: 13 }}>{
                                    item.businesses &&
                                    item.businesses.map(i => { return i.short_address })}</Text></Text>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', width: '10%' }}>
                            <FontAwesomeIcon name="share-alt" style={{ fontSize: 20, color: "#03b38f", }} onPress={() => this.onShare(item)} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, }}>
                        <TouchableOpacity style={styles.button1} onPress={() => this.bookAppointment(item)}>
                            <Text style={{ color: "#fff", padding: 5, fontSize: 15, }}>
                                <FontAwesomeIcon5 name="clinic-medical"
                                    style={{ color: "#fff", marginRight: 2, fontSize: 15 }}></FontAwesomeIcon5>
                                        Book Appoinment</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button1} onPress={() => this.onlineConsultation(item)}>
                            <Text style={{ color: "#fff", padding: 5, fontSize: 15, }}>
                                <MaterialIconsIcon name="videocam"
                                    style={{ color: "#fff", marginRight: 2, fontSize: 18 }} />Online Consultation {"\n"}<Text style={{ fontSize: 10, color: '#fff' }}> <Icon
                                        name='rupee'
                                        size={10}
                                        type='material-community'
                                    /> {item.voice_fees}</Text></Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView >
            )
        }
    }
    render() {
        console.log("this.state.doctorsList", this.state.doctorsList);
        return (
            <Container style={{ height: '100%' }} >
                <Loader loading={this.state.loading} />

                <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
                    <Left >
                        <TouchableOpacity
                            onPress={this.handleMenu}>
                            <Icon1 name='menu' style={{ color: '#fff', fontSize: 30 }} />
                        </TouchableOpacity>
                    </Left>
                    <Right style={{ flexDirection: 'row' }}>
                        <Icon1 name='notifications-outline' color='#fff' size={25} style={{}} />
                        <Icon3 name='dots-vertical' color='#fff' size={24} />
                    </Right>
                </Header>
                <ScrollView >
                    <View style={styles.doctorListingPart}>
                        <View style={{ marginBottom: 0, marginTop: 10 }}>
                            <Input
                                placeholder='SEARCH'
                                style={{ fontSize: 14 }}
                                rightIcon={
                                    <Icon
                                        name='search'
                                        size={20}
                                        color='#03b38f'
                                        type='material-community'
                                    />}
                                inputContainerStyle={{ borderWidth: 1, paddingLeft: '5%', borderRadius: 10, borderColor: '#03b38f' }}
                                rightIconContainerStyle={{ marginRight: '2%' }}

                            />
                        </View>
                        <View style={{ backgroundColor: '#f9f9f9', paddingTop: '2%' }}>

                            <View styles={styles.secondpart}>
                                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 13 }}>Doctor's List</Text>
                                    </View>


                                </View>
                            </View>

                            <View style>
                                <FlatList
                                    data={this.state.doctorsList}
                                    // horizontal={false}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={this.renderItem}
                                    keyExtractor={item => item.index}
                                    extraData={this.state}
                                />
                            </View>

                        </View>

                        <Modal
                            style={styles.modal}
                            animationType="slide"
                            coverScreen={true}
                            backdropOpacity={0.70}
                            transparent={true}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                            }} >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ position: 'absolute', right: '5%', top: '2%' }}>
                                        <Icon
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
                                                style={{ width: 320, height: 250, borderRadius: 20 }}
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
                                            <View style={{ marginTop: '15%' }}>
                                                <TouchableOpacity style={styles.button}
                                                    onPress={() => this.props.navigation.navigate('Registeroption')}>
                                                    <Text style={{ fontSize: 12, padding: '1%', color: '#fff', marginHorizontal: '10%', marginTop: '2%' }}>BOOK NOW</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ marginTop: '-10%' }} >
                                        <Image resizeMode='contain'
                                            style={{ width: 100, height: 100, borderRadius: 20 }}
                                            source={require('../../Images/logo.png')} />
                                    </View>

                                    <View style={{ marginBottom: 10, marginTop: -20 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Consulting Fees Includes</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                        <View style={{ borderRadius: 5, backgroundColor: '#03b38f', height: 10, width: 10, marginTop: 8, marginHorizontal: '2%' }}></View>
                                        <View><Text> Doctor Consulting Fees</Text></View>
                                    </View>
                                    <View style={styles.line}></View>

                                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                        <View style={{ borderRadius: 5, backgroundColor: '#03b38f', height: 10, width: 10, marginTop: 8, marginHorizontal: '2%' }}></View>
                                        <View><Text> Hospital Registration Fess</Text></View>
                                    </View>
                                    <View style={styles.line}></View>
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                        <View style={{ borderRadius: 5, backgroundColor: '#03b38f', height: 10, width: 10, marginTop: 8, marginHorizontal: '2%' }}></View>
                                        <View>
                                            <Text style={{}}>Free Questions can be asked to {"\n"}
                                            know about your Issues once</Text></View>
                                    </View>
                                    <View style={{}}>
                                        <TouchableOpacity style={styles.okbutton}
                                            onPress={() => this.props.navigation.navigate('Registeroption')}>
                                            <Text style={{ fontSize: 14, padding: '1%', color: '#fff', marginHorizontal: '10%' }}>OK </Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </Modal>


                        <Modal
                            style={styles.modal}
                            animationType="slide"
                            coverScreen={true}
                            backdropOpacity={0.70}
                            transparent={true}
                            visible={this.state.openAmbulanceModal}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ position: 'absolute', right: '5%', top: '2%' }}>
                                        <Icon
                                            name='times'
                                            size={25}
                                            color='#03b38f'
                                            type='material-community'
                                            onPress={() => this.setState({ openAmbulanceModal: !this.state.openAmbulanceModal })}
                                        />
                                    </View>
                                    <View style={{ marginTop: '5%' }}>

                                        <Text style={{ padding: '5%' }}>Coming Soon...</Text>

                                    </View>

                                </View>
                            </View>
                        </Modal>
                        <View>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}


const styles = StyleSheet.create({
    titledyanmic: { fontWeight: "bold", fontSize: 13 },
    centeredView: {
        flex: 1,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",

    },
    ImageBackground: { position: 'relative' },
    bannerheader: { position: 'absolute', right: '-6%', top: '15%' },
    bannerheaderTitle: { fontSize: 18, color: '#fff', width: '100%', color: 'blue', fontWeight: 'bold', fontStyle: 'italic' },
    hurryup: { textAlign: 'left', color: '#000', fontWeight: 'bold', fontSize: 20, marginLeft: '15%', marginTop: '5%', fontStyle: 'italic' },
    modalView: {
        width: '90%',
        backgroundColor: "#fff",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    button: {
        backgroundColor: '#03b38f',
        alignSelf: 'center',
        borderRadius: 30,
        marginBottom: '10%',
        //marginTop:'10%'
    },
    okbutton: {
        // flexDirection:'row',
        //justifyContent:'flex-end',
        backgroundColor: '#03b38f',
        alignSelf: 'center',
        borderRadius: 30,
        marginBottom: '4%',
        marginTop: '4%'
    },
    line: {
        borderWidth: 0.5,
        width: '60%',
        borderColor: '#A9A9A9',
        marginTop: '1%',
        marginBottom: '1%'
    },
    modal: {
        zIndex: 2,
        position: 'absolute',
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 9999,
        backgroundColor: 'red'
    },
    secondpart: {
        marginTop: '3%',
        marginBottom: '3%',
        padding: 10,
        // backgroundColor:'#f9f9f9'
    },
    doctorlisttype: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    firstCard: {
        // flex: 1,
        // flexDirection: "row",
        //borderWidth: 1,
        borderRadius: 2,
        borderColor: "#CCC",
        flexWrap: "nowrap",
        backgroundColor: "#FFF",
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 5,
        shadowOpacity: 0.21,
        shadowRadius: 0,
        borderRadius: 12,
        overflow: "hidden",
        marginTop: "2%",
        marginHorizontal: "3%",
        marginBottom: '2%',
        padding: 10,
        zIndex: 0,
        //backgroundColor:'red'
        // height: hp('55%')
    }, cardItemImagePlace: {
        backgroundColor: "#ccc",
        height: 85,
        width: 85,
        // margin: 16,
        borderRadius: 100,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        // elevation: 5,
        shadowOpacity: 0.21,
        shadowRadius: 0,
        marginVertical: "5%",
        marginHorizontal: "5%"
    },
    text3: {
        justifyContent: "flex-start",
        //marginTop: "4%",
        fontFamily: "open-sans-regular",
        fontWeight: "bold",
        fontSize: 13,
        flexWrap: 'wrap'
        // marginLeft: "5%"
    },
    fontSize: {
        fontFamily: "pt-sans-regular",
        color: "#757575",
        // marginHorizontal: "5%",
        fontWeight: "600",
        fontSize: 13
    },
    text5: {
        fontWeight: 'bold',
        // color: "#757575",
        color: '#03b38f',
        // marginHorizontal: "5%",
        fontSize: 13
    },
    text4: {
        alignSelf: "auto",
        fontFamily: "open-sans-regular",
        color: "rgba(3,179,143,1)",
        // marginHorizontal: "5%",
        fontWeight: "bold",
        fontSize: 15
    },
    text6: {
        alignSelf: "flex-end",
        fontWeight: "bold",
        // marginVertical: "2%",
        // marginHorizontal: "5%",
        color: "rgba(3,179,143,1)",
        width: wp('25%')
    },
    icon1: {
        marginHorizontal: "5%",
        marginVertical: "3%",
        color: "#029400",
        fontWeight: 'bold'
    },
    textColor1: {
        color: "red"
    },
    textColor2: {
        color: "red"
    },
    button1: {
        justifyContent: "center",
        backgroundColor: "#03b38f",
        height: hp("8%"),
        width: wp("29%"),
        borderRadius: 10,
        marginHorizontal: "1%",
        //marginVertical: "3%"
    },
    buttonHide: {
        justifyContent: "center",
        backgroundColor: "transparent",
        height: hp("8%"),
        width: wp("29%"),
        borderRadius: 10,
        marginHorizontal: "1%",
        //marginVertical: "3%",

    },
    text_id: { color: "#525151", marginHorizontal: "15%", fontWeight: 'bold' }
});





{/* 
                        <View style={{ flexDirection: "row" }}>
                            <View>
                                 <Text style={{alignSelf: 'center' ,  marginRight: "6%", }}>
                                       <MaterialIconsIcon name="call" style={{ fontSize: 20, color: "#03b38f", }} /> 
                                    </Text>
                            </View>
                            <View>
                                <Text style={{ marginRight: "5%"}}>
                                    <Icon
                                        name='rupee'
                                        size={13}
                                        type='material-community'
                                    />
                                    <Text style={styles.titledyanmic}> {item.voice_fees}</Text></Text>
                            </View>
                        </View>


                        <View style={{ flexDirection: "row" }}>
                            <View>
                                <Text style={{alignSelf: 'center' ,  marginRight: "6%", }}>
                                    <MaterialCommunityIcon name="chat" style={{ fontSize: 20, color: "#03b38f",}} /> 
                                    </Text>
                            </View>
                            <View>
                                <Text style={{marginRight: "5%"}}>
                                    <Icon
                                        name='rupee'
                                        size={13}
                                        type='material-community'
                                    /><Text style={styles.titledyanmic}> {item.chat_fees}</Text></Text>
                            </View>
                        </View> */}

{/* <View style={{ flexDirection: "row" }}>
                            <View>
                                <Text style={{
                                    marginRight: "5%",
                                    alignSelf: 'center'
                                }}>
                                    <FontAwesomeIcon5 name="video" style={{ fontSize: 20, color: "#03b38f"}} />
                                    </Text>
                            </View>
                            <View>
                                <Text >
                                    <Icon
                                        name='rupee'
                                        size={13}
                                        type='material-community'
                                    /><Text style={styles.titledyanmic}> {item.video_fees}</Text></Text>
                            </View>
                        </View> */}




{/* <View style={{}}>
                                        <TouchableOpacity style={styles.okbutton}
                                            onPress={() => this.props.navigation.navigate('Registeroption')}>
                                            <Text style={{ fontSize: 14, padding: '1%', color: '#fff', marginHorizontal: '10%' }}>OK </Text>
                                        </TouchableOpacity>
                                    </View> */}


// FindDoctorServices.getAllDoctors(token,data)
// .then(response => response.json())
// .then(response => {
//     console.log("response in getAllDoctors==================================", response);
//     if (response) {
//         let res  = JSON.stringify(response)
//         if (response.status == 200) {
//             this.setState({
//                 doctorsList: res.data,
//                 loading:false
//             })
//         }
//     }
// }).catch(Err => {
//     this.setState({
//         loading:false
//     })
//     console.log("Erro in get doctors list==================>", Err);
// })


{/* <View style={{ backgroundColor: '#03b38f',zIndex: 5000, marginTop: 3,width:'40%',borderRadius:10,}}>
                                             <DropDownPicker style={{
                                            }}
                                                items={[
                                                { icon: () => <Icon name="flag" size={18} color="#900" />, label: 'Dentist', value: 'Dentist' },
                                                { icon: () => <Icon name="flag" size={18} color="#900" />,label: 'Cardologiests', value: 'Cardologiests' },
                                                { icon: () => <Icon name="flag" size={18} color="#900" />, label: 'Cosmetologists', value: 'Cosmetologists' }
                                                ]}
                                                //showArrow='true'
                                                placeholder="Filter"
                                                display="flex"
                                                containerStyle={{ height: 45, width: '100%', padding: '0%',fontSize:18 }}
                                                style={{ backgroundColor: '#03b38f', width: '100%', height: '100%', borderColor: "#03b38f",fontSize:18 }}
                                            />
                                         </View>
                                         <View style={{zIndex: 5000, marginTop: 3,width:'40%'}}>
                                             <DropDownPicker style={{
                                            }}
                                                items={[
                                                { label: 'Dentist', value: 'Dentist' },
                                                { label: 'Cardologiests', value: 'Cardologiests' },
                                                { label: 'Cosmetologists', value: 'Cosmetologists' }
                                                ]}
                                                //showArrow='true'
                                                placeholder="Sort By"
                                                display="flex"
                                                containerStyle={{ height: 45, width: '100%', padding: '0%', }}
                                                style={{ backgroundColor: '#fff', width: '100%', height: '100%', borderColor: "#fff", }}

                                            />
                                         </View> */}


{/* <TouchableOpacity style={styles.button1} onPress={() => this.visitWithAmbulance(item)}>
                        <Text style={{ color: "#fff", padding: 5,fontSize: 16, }}>
                            <FontAwesomeIcon name="ambulance"
                                style={{ color: "#fff", marginRight: 2,fontSize: 16, }} /> Visit With Ambulance</Text>
                    </TouchableOpacity> */}