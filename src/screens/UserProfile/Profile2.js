import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, FlatList, ScrollView, SectionList } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Card } from 'react-native-cards';

import { Accordion } from "native-base";


class Profile2 extends Component {

    static navigationOptions = {
        title: '',
        headerStyle: {
            backgroundColor: "rgba(3,179,143,1)",
            color: "white"
        },
        // headerLeft: () => (
        //     <TouchableOpacity
        //         style={{ marginLeft: 25 }}
        //     // onPress={() => this.props.navigation.goBack()}
        //     // title="+1"
        //     // color="#fff"
        //     >
        //         <AntIcon name="left" style={{ fontSize: 18, color: "#fff" }}></AntIcon>
        //     </TouchableOpacity>
        // ),
        // headerTintColor: '#000',
        // headerTitleStyle: {
        //     fontWeight: 'bold',
        // },
    };

    constructor(props) {
        super(props);
        this.state = {
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
            ],
            services: [
                {
                    id: 1,
                    description: "Skin Allergies"
                },
                {
                    id: 2,
                    description: "Allergy Treatment"
                },
                {
                    id: 3,
                    description: "Viral Fever Treatment"
                },
                {
                    id: 4,
                    description: "Insulin Free Treatment"
                },
                {
                    id: 5,
                    description: "Diabetes Management"
                },
            ],
            specialization: [
                {
                    id: 1,
                    content: "General Physician"
                },
                {
                    id: 2,
                    content: "Diabetes Treatment"
                },
                {
                    id: 3,
                    content: "Allergies Treatment"
                },
            ],
            dataArray: [
                {
                    title: "Specialization",
                    content: "sdkasjlj"
                    // content: () => {

                    //     this.state.specialization.map((item) => {
                    //         <Text
                    //             style={{
                    //                 backgroundColor: "#e3f1f1",
                    //                 padding: 10,
                    //                 fontStyle: "italic",
                    //             }}
                    //         >
                    //             {item.content}
                    //         </Text>
                    //     })
                    // }
                },
                { title: "Education", content: "kjsahdksahd" },
                { title: "Experience", content: "kjsahdksahd" },
                { title: "Awards & Recognition", content: "kjsahdksahd" },
                { title: "Membership", content: "kjsahdksahd" },
                { title: "Registrations", content: "kjsahdksahd" },
            ],

        };
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

    renderServices = ({ item }) => {
        return (
            <>
                <ScrollView>
                    <Text style={[styles.icon1, { marginLeft: "10%", color: 'black' }]}>
                        <FontAwesomeIcon name="circle" />
                        {"   "}  {item.description}
                    </Text>
                </ScrollView>

            </>
        )
    }

    _renderHeader(item, expanded) {
        return (
            <View style={{
                flexDirection: "row",
                padding: 10,
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "white"
            }}>
                <Text style={{ fontWeight: "600" }}>
                    {" "}{item.title}
                </Text>
                {expanded
                    ? <AntIcon style={{ fontSize: 18 }} name="up" />
                    : <AntIcon style={{ fontSize: 18 }} name="down" />}
            </View>
        );
    }

    _renderContent(item) {
        return (

            <>

                <Text
                    style={{
                        backgroundColor: "#e3f1f1",
                        padding: 10,
                        fontStyle: "italic",
                    }}
                >
                    {item.content}
                </Text>
                {/* {this.state.specialization.map((item) => {
                    <Text
                        style={{
                            backgroundColor: "#e3f1f1",
                            padding: 10,
                            fontStyle: "italic",
                        }}
                    >
                        {item.content}
                    </Text>
                })} */}

                {/* <FlatList
                    style={{ backgroundColor: "#fff" }}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    style={{
                        width: wp("100%"),
                        // marginLeft: "2%", marginRight: "2%"
                        // marginHorizontal: "3%"
                    }}
                    data={this.state.specialization}
                    renderItem={this.renderData}
                    keyExtractor={item => item.id} ></FlatList> */}
                {/* {item.content} */}
            </>
        );
    }
    // renderData = ({ item }) => {
    //     return (
    //         <>
    //             <View style={{ border: 1 }}>
    //                 <Text>
    //                     {item.content}
    //                 </Text>
    //             </View>
    //         </>
    //     )
    // }


    render() {
        return (
            <>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.firstCard}>
                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    <View style={{ flexDirection: "row" }} >
                                        <Text style={[styles.text4, { marginLeft: "5%", fontSize: 16, marginTop: "2%" }]}>
                                            Padmashree Clinic
                                </Text>
                                        <Text style={{
                                            color: 'blue', alignContent: "flex-end", marginHorizontal: "25%",
                                            marginVertical: "2%", textDecorationLine: 'underline'
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
                                            showsHorizontalScrollIndicator={false}
                                            style={{
                                                width: wp("100%"),
                                                // marginLeft: "2%", marginRight: "2%"
                                                // marginHorizontal: "3%"
                                            }}
                                            data={this.state.docTiming}
                                            renderItem={this.renderTiming}
                                            keyExtractor={item => item.id}></FlatList>
                                    </View>

                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginHorizontal: "5%", marginTop: "3%" }}>
                            <Text style={styles.text1}>
                                Services Provided by Dr. xyzdr1
                            </Text>
                        </View>
                        {/* <View style={styles.firstCard}> */}
                        <Card>
                            <FlatList
                                style={{ backgroundColor: "#fff" }}
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}
                                style={{
                                    width: wp("100%"),
                                    // marginLeft: "2%", marginRight: "2%"
                                    // marginHorizontal: "3%"
                                }}
                                data={this.state.services}
                                renderItem={this.renderServices}
                                keyExtractor={item => item.id}></FlatList>
                        </Card>
                        {/* </View> */}
                        <View style={{ flexDirection: "row", marginHorizontal: "5%", marginTop: "3%" }}>
                            <Text style={styles.text1}>
                                More About by Dr. xyzdr1
                            </Text>
                        </View>
                        <Card>
                            <Text style={styles.text2} onPress={() => this.props.navigation.navigate("Profile3")}>
                                Diabetes Specialist, with Special Interest in Infectious Disease,Thyroid, Skin
                           </Text>
                        </Card>
                        <View>
                            <Accordion dataArray={this.state.dataArray} expanded={0} icon="arrow-down" expandedIcon="arrow-up"
                                iconStyle={{ color: "rgba(3,179,143,1)" }}
                                expandedIconStyle={{ color: "rgba(3,179,143,1)" }}
                                renderHeader={this._renderHeader}
                                renderContent={this._renderContent}
                            />
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.bottomView}>
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
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: hp("100%")
    },
    bottomView: {
        flexDirection: "row",
        justifyContent: "center",
        width: wp("100%"),
        backgroundColor: "white"
    },
    firstCard: {
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
        height: hp("36%")
    },
    text6: {
        alignSelf: "flex-end",
        fontWeight: "bold",
        // marginVertical: "2%",
        // marginHorizontal: "5%",
        color: "rgba(3,179,143,1)",
        width: wp('25%')
    },
    text4: {
        alignSelf: "auto",
        fontFamily: "open-sans-regular",
        color: "rgba(3,179,143,1)",
        // marginHorizontal: "5%",
        fontWeight: "bold",
        fontSize: 15
    },
    text1: {
        fontWeight: "bold",
        marginVertical: "2%",
        // marginHorizontal: "5%",
        width: hp('30%'),
        fontSize: 15
    },
    text2: {
        marginVertical: "2%",
        // width: hp('30%'),
        fontSize: 15,
        // justifyContent: "center",
        alignContent: "center",
        marginHorizontal: "5%"
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
        height: hp("36%")
    },
    icon1: {
        marginHorizontal: "4%",
        marginVertical: "1%",
        // color: "#029400"
    },
    button1: {
        justifyContent: "center",
        backgroundColor: "rgba(3,179,143,1)",
        height: hp("8%"),
        width: wp("30%"),
        borderRadius: 10,
        marginHorizontal: "1%",
        marginVertical: "3%",
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 5,
        shadowOpacity: 0.21,
        shadowRadius: 0,
    },
})

export default Profile2;
