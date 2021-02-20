import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity, Image, Linking, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import StarRating from 'react-native-star-rating';
import { Accordion } from "native-base";
import { Card } from 'react-native-cards';
// import Collapsible from 'react-native-collapsible';
// import Accordion from 'react-native-collapsible/Accordion';

const dataArray = [
    {
        title: "Mulund . Padmashree Clinic", fees: "500"
    },
    { title: "Thane . Sanjeevani Hospital", fees: "750" },
    { title: "Chembur. SDS Hospital", fees: "550" }
];


class Profile1 extends Component {

    static navigationOptions = {
        title: '',
        headerStyle: {
            backgroundColor: "rgba(3,179,143,1)",
        },
        headerLeft: () => (
            <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => this.props.navigation.goBack()}
            // title="+1"
            // color="#fff"
            >
                <AntIcon name="left" style={{ fontSize: 18, color: "#fff" }}></AntIcon>
            </TouchableOpacity>
        ),
        // headerTintColor: '#000',
        // headerTitleStyle: {
        //     fontWeight: 'bold',
        // },
    };

    constructor(props) {
        super(props);
        this.state = {
            starCount: 4,
            activeSections: [],
            docTiming: [
                {
                    id: 1,
                    day: "MONDAY",
                    dayTiming: "10:00AM - 03:00PM",
                    eveTiming: "06:00AM - 09:00PM"
                },
                {
                    id: 2,
                    day: "WEDNESDAY",
                    dayTiming: "10:00AM - 03:00PM",
                    eveTiming: "06:00AM - 09:00PM"
                },
                {
                    id: 3,
                    day: "FRIDAY",
                    dayTiming: "10:00AM - 03:00PM",
                    eveTiming: "06:00AM - 09:00PM"
                },
                {
                    id: 4,
                    day: "SUNDAY",
                    dayTiming: "10:00AM - 03:00PM",
                    eveTiming: "06:00AM - 09:00PM"
                },
            ]
        };
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    _renderHeader(item, expanded) {
        return (
            <View style={{
                flexDirection: "row",
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#fff"
            }}>
                <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: "2%" }}>
                    <EntypoIcon name="location-pin" color="rgba(3,179,143,1)" size={25} />{" "}{item.title}
                </Text>
                {expanded
                    ? <AntIcon style={{ fontSize: 18 }} color="rgba(3,179,143,1)" name="down" />
                    : <AntIcon style={{ fontSize: 18 }} color="rgba(3,179,143,1)" name="up" />}
            </View>
        );
    }

    _renderContent = (item) => {
        return (
            <View
                style={{
                    backgroundColor: "#fff",
                    // paddingLeft: "10%",
                    // fontStyle: "italic",
                }}

            >
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile2")}>
                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesomeIcon name="circle" color="rgba(3,179,143,1)" style={{ marginLeft: "10%", marginTop: '1%' }} />
                        <Text
                            style={{ color: "#7a7a7a" }}
                        // style={styles.icon1}
                        > Max 15 min wait time + Verified Details
                    </Text>
                    </View>
                    <Text style={{ color: "rgba(3,179,143,1)", marginHorizontal: "10%" }}>Charges for Consultation</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcon name="clipboard-text" color="rgba(3,179,143,1)" size={18}
                            style={{ marginLeft: "10%", marginTop: '1%' }} />
                        <Text
                            style={{ color: "#7a7a7a", fontSize: 15 }}
                        > In clinic consultaion fees:</Text>
                        <FontAwesomeIcon name="rupee" color="black" size={20}
                            style={{ marginLeft: "4%", marginTop: '1%' }} />
                        <Text style={{ color: "rgba(3,179,143,1)", fontSize: 16, fontWeight: "bold", marginLeft: "2%" }}>{item.fees} /-</Text>
                    </View>
                    <Text style={[styles.icon1, { marginLeft: "10%" }]}>
                        <FontAwesomeIcon name="circle" /> Available Today
                                </Text>
                    {/* {item.content} */}
                </TouchableOpacity>
            </View>
        );
    }

    renderTiming = ({ item }) => {
        console.log("item========================", item);
        return (
            <>
                <Card style={{ borderRadius: 10, width: wp("40%"), height: hp("14%"), backgroundColor: "#e6e6e6" }}>
                    {/* <CardImage
                        source={{ uri: url }}
                        style={{ width: 200, height: "auto", borderRadius: 15, position: 'relative' }}
                    //title={item.SubTitle}
                    /> */}
                    <View
                        style={{
                            justifyContent: 'center',
                            position: 'absolute',
                            marginVertical: "10%",
                            marginHorizontal: "5%"
                        }}>
                        <Text
                            style={{ marginHorizontal: "auto", fontSize: 16, fontWeight: "bold" }}
                        >{item.day}</Text>
                        <Text
                            style={{ marginHorizontal: "auto", fontSize: 15 }}
                        >{item.dayTiming}</Text>
                        <Text
                            style={{ marginHorizontal: "auto", fontSize: 15 }}
                        >{item.eveTiming}</Text>
                    </View>
                </Card>
            </>
        );
    };



    render() {
        return (
            <View style={styles.container}>
                {/* <Text>sdlkfj</Text> */}
                <ScrollView>
                    {/* <View style={styles.responsiveBox}> */}
                    <View style={styles.firstCard}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.icon1}>
                                <FontAwesomeIcon name="circle" /> Available
                                </Text>
                            <View style={{
                                marginLeft: "37%", marginHorizontal: "5%",
                                marginVertical: "3%",
                            }}>
                                <StarRating
                                    // starStyle={{ alignSelf: "flex-end", marginRight: "5%" }}
                                    starSize={22}
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
                        <View style={{ flexDirection: "row" }}>
                            <View>
                                <Image
                                    source={require("../../assets/images/cardImage5.png")}
                                    style={styles.cardItemImagePlace}
                                ></Image>
                                <Text style={{ color: "#525151", marginHorizontal: "15%" }}>ID_201</Text>
                            </View>
                            <View>
                                <Text style={styles.text3}>Dr. XYZ</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.text5}>Physician | License ID:</Text>
                                    <Text style={styles.text4}>LT876</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.text4}>EXPERIENCE IN YEARS</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <View>
                                        <Text style={{
                                            marginHorizontal: "5%",
                                            alignSelf: 'center'
                                        }}>Overall</Text>
                                        <Text style={[styles.text4, { alignSelf: 'center' }]}>30</Text>
                                    </View>
                                    <View>
                                        <Text style={{
                                            marginHorizontal: "5%",
                                            alignSelf: 'center'
                                        }}>As a specialist</Text>
                                        <Text style={[styles.text4, { alignSelf: 'center' }]}>30</Text>
                                    </View>
                                </View>
                                {/* <Text>lksdj</Text> */}
                            </View>

                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{
                                marginHorizontal: "5%",
                                marginTop: "4%",
                            }}>
                                <FontAwesomeIcon name="graduation-cap"
                                    style={{ color: "rgba(3,179,143,1)", fontSize: 18 }}></FontAwesomeIcon>
                                        MBBS, MD - General Medicine, Post Doctoral Fellowship in Infectious Disease
                                </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{
                                marginHorizontal: "5%",
                                marginTop: "4%",
                            }}>
                                <FoundationIcon name="clipboard-notes"
                                    style={{ color: "rgba(3,179,143,1)", fontSize: 18 }}></FoundationIcon>
                                        General Physician, Infectious Disease Physician
                                </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{
                                marginHorizontal: "5%",
                                marginTop: "4%",
                            }}>
                                <SimpleLineIconsIcon name="badge"
                                    style={{ color: "rgba(3,179,143,1)", fontSize: 18 }}></SimpleLineIconsIcon>
                                        Most Recomended
                                </Text>
                            <Text style={{
                                marginHorizontal: "5%",
                                marginTop: "4%",
                            }}>
                                <MaterialIconsIcon name="star-rate"
                                    style={{ color: "rgba(3,179,143,1)", fontSize: 18 }}></MaterialIconsIcon>
                                        Most Recomended
                                </Text>

                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{
                                marginHorizontal: "5%",
                                marginTop: "4%",
                            }}>
                                <MaterialIconsIcon name="verified"
                                    style={{ color: "rgba(3,179,143,1)", fontSize: 18 }}></MaterialIconsIcon>
                                       Verified & Trusted
                                </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", marginHorizontal: "5%", }}>
                        <Text style={styles.text1}>Book Online Consultation Appointment</Text>
                        <Text style={styles.text2}>Pay online & Get 20% off</Text>
                    </View>
                    <View style={styles.secondCard}>

                        <FontAwesomeIcon name="rupee" style={{
                            fontSize: 26,
                            marginLeft: "7%", marginVertical: "5%"
                        }}></FontAwesomeIcon>
                        <Text style={{
                            marginLeft: "2%", marginVertical: "3%", fontSize: 26,
                            color: "rgba(3,179,143,1)",
                        }}>
                            500 /-
                        </Text>
                        <View>
                            <Text
                                style={{
                                    width: hp("30%"),
                                    // marginHorizontal: "5%",
                                    marginRight: "3%",
                                    marginLeft: "3%"
                                }}
                            >Consultation includes free chat, audio and video calls</Text>
                            <TouchableOpacity style={{
                                backgroundColor: "rgba(3,179,143,1)", borderRadius: 5,
                                width: wp("30%"),
                                height: hp("4%"),
                                marginHorizontal: "10%"
                            }}>
                                <View style={{ flexDirection: "row", marginHorizontal: "10%", marginVertical: "5%" }}>
                                    <MaterialIconsIcon name="videocam"
                                        style={{ color: "#fff", fontSize: 18 }}></MaterialIconsIcon>
                                    <Text style={{ color: "#fff", marginHorizontal: "5%", fontSize: 16 }}>
                                        Book Now
                                </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", marginHorizontal: "5%", marginTop: "3%" }}>
                        <Text style={styles.text1}>Book Home Visit Consultation Appointment</Text>
                        <Text style={styles.text2}>Pay online & Get 20% off</Text>
                    </View>
                    <View style={styles.secondCard}>

                        <FontAwesomeIcon name="rupee" style={{
                            fontSize: 26,
                            marginLeft: "7%", marginVertical: "5%"
                        }}></FontAwesomeIcon>
                        <Text style={{
                            marginLeft: "2%", marginVertical: "3%", fontSize: 26,
                            color: "rgba(3,179,143,1)",
                        }}>
                            1000 /-</Text>
                        <View>
                            <Text
                                style={{
                                    width: hp("30%"),
                                    // marginHorizontal: "5%",
                                    marginRight: "3%",
                                    marginLeft: "3%"
                                }}
                            >Consultation includes free chat, audio and video calls</Text>
                            <TouchableOpacity style={{
                                backgroundColor: "rgba(3,179,143,1)", borderRadius: 5,
                                width: wp("30%"),
                                height: hp("4%"),
                                marginHorizontal: "10%"
                            }}>
                                <View style={{ flexDirection: "row", marginHorizontal: "10%", marginVertical: "5%" }}>
                                    <FontAwesomeIcon name="home"
                                        style={{ color: "#fff", fontSize: 18 }}></FontAwesomeIcon>
                                    <Text style={{ color: "#fff", marginHorizontal: "5%", fontSize: 16 }}>
                                        Book Now
        </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", marginHorizontal: "5%", marginTop: "3%" }}>
                        <Text style={styles.text1}>
                            Hospitals & Clinics Dr. XyzDr1 provides Consultation
                        </Text>
                    </View>
                    <View>
                        <Accordion dataArray={dataArray} expanded={0} icon="arrow-down" expandedIcon="arrow-up"
                            iconStyle={{ color: "rgba(3,179,143,1)" }}
                            expandedIconStyle={{ color: "rgba(3,179,143,1)" }}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                        />
                    </View>
                    <View style={{ flexDirection: "row", marginHorizontal: "5%", marginTop: "3%" }}>
                        <Text style={styles.text1}>
                            Clinic Details
                        </Text>
                    </View>
                    <View style={styles.thirdCard}>
                        <View style={{ flexDirection: "row" }}>
                            <View>
                                <View style={{ flexDirection: "row" }} >
                                    <Text style={[styles.text4, { marginLeft: "5%", fontSize: 16, marginTop: "2%" }]}>
                                        Padmashree Clinic
                                </Text>
                                    <Text style={{
                                        color: 'blue', alignContent: "flex-end",
                                        marginHorizontal: "25%", marginVertical: "2%", textDecorationLine: 'underline'
                                    }}
                                        onPress={() => Linking.openURL('https://www.google.com/maps/')}>
                                        Get Location
                                    </Text>
                                </View>
                                <Text
                                    style={{ color: "#7a7a7a", marginLeft: "5%", fontSize: 15 }}
                                // style={styles.icon1}
                                > Mulund
                                </Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text
                                        style={{ color: "#7a7a7a", fontSize: 15, marginLeft: "5%", width: wp("37%") }}
                                    > In clinic consultation fees:</Text>
                                    <FontAwesomeIcon name="rupee" color="black" size={20}
                                        style={{ marginLeft: "4%", marginTop: '1%' }} />
                                    <Text style={{
                                        color: "rgba(3,179,143,1)", fontSize: 16,
                                        fontWeight: "bold", marginLeft: "2%"
                                    }}>700 /-</Text>
                                    <View
                                        style={{
                                            borderLeftWidth: 1,
                                            borderLeftColor: '#9e9e9e',
                                            marginHorizontal: "2%"
                                        }}
                                    />
                                    <Text style={styles.text6}>Pay online & Get 20% off</Text>
                                </View>
                                <Text style={{
                                    color: "#575757", fontSize: 15, marginLeft: "5%",
                                    fontSize: 16, width: wp("37%"), marginVertical: "3%"
                                }}>
                                    Timings
                                </Text>
                                {/* <View style={{ flexDirection: "row" }}>
                                    <View style={styles.fourthCard}>

                                    </View>
                                </View> */}
                                <View style={{ paddingRight: 15, width: wp("100%"), paddingLeft: 15 }}>
                                    <FlatList
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={true}
                                        style={{
                                            width: wp("100%"),
                                            // marginLeft: "2%", marginRight: "2%"
                                            // marginHorizontal: "3%"
                                        }}
                                        data={this.state.docTiming}
                                        renderItem={this.renderTiming}
                                        keyExtractor={item => item.id} ></FlatList>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "center", width: wp("100%") }}>
                                    <TouchableOpacity style={styles.button1}>
                                        <Text style={{ color: "#fff", padding: 12, }}>
                                            <MaterialIconsIcon name="videocam"
                                                style={{ color: "#fff", fontSize: 18, paddingRight: 5 }}></MaterialIconsIcon>
                                        Online Consultation</Text>
                                        {/* <View style={{ flexDirection: "row", marginHorizontal: "5%", marginTop: "5%"}}>
                                            <MaterialIconsIcon name="videocam"
                                                style={{ color: "#fff", fontSize: 18 }}></MaterialIconsIcon>
                                            <Text style={{ color: "#fff", marginHorizontal: "5%", fontSize: 16 }}>
                                                Online Consultation
                                </Text>
                                        </View> */}
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button1}>
                                        <Text style={{ color: "#fff", padding: 12, }}>
                                            <MaterialCommunityIcon name="clipboard-text"
                                                style={{ color: "#fff", fontSize: 18, paddingRight: 5 }}></MaterialCommunityIcon>
                                        Book Appointment</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button1}>
                                        <Text style={{ color: "#fff", padding: 12, }}>
                                            <FontAwesomeIcon name="home"
                                                style={{ color: "#fff", fontSize: 18, paddingRight: 5 }}></FontAwesomeIcon>
                                       Home Visit</Text>
                                    </TouchableOpacity>
                                </View>
                                
                            </View>
                        </View>
                    </View>
                    {/* </View> */}
                </ScrollView>
            </View>
        );
    }
}

export default Profile1;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button1: {
        justifyContent: "center",
        backgroundColor: "rgba(3,179,143,1)",
        height: hp("8%"),
        width: wp("30%"),
        borderRadius: 10,
        marginHorizontal: "1%",
        marginVertical: "3%"
    },
    responsiveBox: {
        width: wp('100%'),
        height: hp('100%'),
        borderWidth: 2,
        borderColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-around',
        // marginHorizontal: "10%",
        // marginVertical: "10%"
    },
    secondCard: {
        // borderWidth: 1,
        // borderRadius: 2,
        flexDirection: "row",
        borderColor: "#CCC",
        flexWrap: "nowrap",
        backgroundColor: "#FFF",
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        // elevation: 5,
        shadowOpacity: 0.21,
        shadowRadius: 0,
        // borderRadius: 12,
        overflow: "hidden",
        // marginTop: "5%",
        // marginHorizontal: "5%",
        height: hp("10%")
    },
    thirdCard: {
        // borderWidth: 1,
        // borderRadius: 2,
        flexDirection: "row",
        borderColor: "#CCC",
        flexWrap: "nowrap",
        backgroundColor: "#FFF",
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        // elevation: 5,
        shadowOpacity: 0.21,
        shadowRadius: 0,
        // borderRadius: 12,
        overflow: "hidden",
        // marginTop: "5%",
        // marginHorizontal: "5%",
        height: hp("47%")
    },
    icon1: {
        marginHorizontal: "5%",
        marginVertical: "3%",
        color: "#029400"
    },
    firstCard: {
        // flex: 1,
        // flexDirection: "row",
        // borderWidth: 1,
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
        // height: hp('55%')
    },
    cardItemImagePlace: {
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
    text1: {
        fontWeight: "bold",
        marginVertical: "2%",
        // marginHorizontal: "5%",
        width: hp('30%'),
        fontSize: 15
    },
    text2: {
        alignSelf: "flex-end",
        fontWeight: "bold",
        marginVertical: "2%",
        marginHorizontal: "5%",
        color: "rgba(3,179,143,1)",
        width: wp('20%')
    },
    text3: {
        justifyContent: "flex-start",
        marginTop: "4%",
        fontFamily: "open-sans-regular",
        fontWeight: "bold",
        fontSize: 16,
        // marginLeft: "5%"
    },
    text5: {
        fontFamily: "pt-sans-regular",
        color: "#757575",
        // marginHorizontal: "5%",
        fontSize: 14
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
    fourthCard: {
        // flex: 1,
        // flexDirection: "row",
        // borderWidth: 1,
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
        height: hp('25%')
    },
})
