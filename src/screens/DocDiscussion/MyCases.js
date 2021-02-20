import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCardWithImageAndTitle from "../../components/MaterialCardWithImageAndTitle";
import MaterialCardWithoutImage1 from "../../components/MaterialCardWithoutImage1";
import MaterialButtonLight from "../../components/MaterialButtonLight";
// import { Card } from 'react-native-material-ui';
// import Icon from "react-native-vector-icons/Ionicons";
import FontIcon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Card, CardItem, Fab } from 'native-base';
// import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class MyCases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false
        };
    }

    handleModal = () => this.setState({ openModal: true })

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.responsiveBox}>
                    {/* <Card>
                    <CardItem>

                    </CardItem>
                </Card> */}
                    <ScrollView>
                        {/* <View style={styles.cardBody}>
                        <View style={styles.cardItemImagePlace}>
                            <Image
                                height="1"
                                width="2"
                                source={require("../../assets/images/cardImage5.png")}
                            />
                        </View>
                    </View> */}
                        <View style={styles.firstCard}>
                            {/* <View style={styles.bodyContent}></View> */}
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    source={require("../../assets/images/cardImage5.png")}
                                    style={styles.cardItemImagePlace}
                                ></Image>
                                <View>
                                    <Text style={styles.text1}>30</Text>
                                    <Text style={styles.text2}>POSTS</Text>
                                </View>
                                <View>
                                    <Text style={styles.text1}>150</Text>
                                    <Text style={styles.text2}>REACHED</Text>
                                </View>
                                <View>
                                    <Text style={styles.text1}>150</Text>
                                    <Text style={styles.text2}>DISCUSSIONS</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.drafts}
                            >
                                <Text style={{
                                    alignSelf: "center",
                                    marginVertical: "2%",
                                    fontFamily: "open-sans-regular",
                                    fontWeight: "bold",
                                    color: "#fff"
                                    // fontSize: "14px"
                                }}>Promote Profile</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.secondCard}>
                            <Text style={styles.text3}>Corona Pandemic Vaccine and its discovery in India</Text>
                            <Text style={styles.text4}>24th August 2020, 9:30 pm</Text>
                            <Text style={styles.text5}>Article on how to tacle or take precautions on corona virus pandemic.
                            Article on how to tacle or take precautions on corona virus pandemic.
                        Article on how to tacle or take precautions on corona virus pandemic.</Text>
                            <View style={styles.action1}>
                                <View style={{ flexDirection: "row", marginBottom: "3%", marginHorizontal: "2%" }}>
                                    <Text>
                                        <AntIcon name="like1" style={{
                                            color: "#00960a",
                                            fontSize: 25
                                        }} ></AntIcon>
                                    120 Likes
                                </Text>
                                    {/* <Text style={{ marginTop: '3%', fontSize: 14 }}>120 Likes</Text> */}
                                </View>
                                <View style={{ flexDirection: "row", marginBottom: "3%", marginHorizontal: "2%" }}>
                                    <Text>
                                        <FontIcon name="comments" style={{
                                            color: "#005296",
                                            fontSize: 25
                                        }} ></FontIcon>2 Comments
                                </Text>
                                    {/* <Text style={{ marginTop: '3%', fontSize: 14 }}>2 Comments</Text> */}
                                </View>
                                <View style={{ flexDirection: "row", marginBottom: "3%", marginHorizontal: "2%" }}>
                                    <Text>
                                        <AntIcon name="heart" style={{
                                            color: "#ffa8a8",
                                            fontSize: 25
                                        }} ></AntIcon>
                                    </Text>
                                    <Text style={{ marginTop: '3%', fontSize: 14 }}>Favourited</Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: "row", marginBottom: "3%",
                                justifyContent: 'flex-end', marginHorizontal: "10%"
                            }}>
                                <AntIcon name="delete" style={{
                                    color: "#c70000",
                                    fontSize: 25
                                }} />
                                <FontIcon name="pencil" style={{
                                    color: "#005296",
                                    fontSize: 25
                                }} />
                            </View>
                        </View>

                        {/* <View style={styles.cardContainer}>
                    <View style={styles.iconRow}>
                        <Icon name="ios-images" style={styles.icon}></Icon>
                        <View style={styles.loremIpsumColumn}>
                            <Text style={styles.loremIpsum}>ADD CASE IMAGES or VIDEOS</Text>
                            <Text style={styles.loremIpsum3}>
                                Maximum 5 Images can be uploaded
                            </Text>
                        </View>
                    </View>
                </View>
                <MaterialCardWithoutImage1
                    style={styles.materialCardWithoutImage1}
                ></MaterialCardWithoutImage1>
                <MaterialButtonLight
                    style={styles.materialButtonLight}
                ></MaterialButtonLight> */}


                    </ScrollView>
                    {/* <Fab
                    active={this.state.active}
                    direction="right"
                    containerStyle={{ marginLeft: 10 }}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}
                >

                </Fab> */}
                    <TouchableOpacity style={styles.TouchableOpacityStyle}
                        onPress={this.handleModal}
                    // onPress={() => { this.props.navigation.navigate("AddPost") }}
                    >
                        {/* <Text>sadd</Text> */}
                        <AntIcon name="plus" color="#fff" style={{ fontSize: 30, fontWeight: "bold" }}></AntIcon>
                    </TouchableOpacity>


                    <Modal
                        coverScreen={false}
                        isVisible={this.state.openModal}
                    >
                        <View style={styles.modal}>
                            <View style={{ alignItems: "flex-end" }}>
                                <FontIcon name="close"
                                    onPress={() => this.setState({ openModal: !this.state.openModal })}
                                    style={{ fontSize: 24, color: "red", marginRight: "2%" }}
                                />
                            </View>
                            <View>
                                <View style={styles.cardContainer}>
                                    <View style={styles.iconRow}>
                                        <EntypoIcon name="images" style={styles.icon}></EntypoIcon>
                                        <View style={styles.loremIpsumColumn}>
                                            <Text style={styles.loremIpsum}>ADD CASE IMAGES or VIDEOS</Text>
                                            <Text style={styles.loremIpsum3}>
                                                Maximum 5 Images can be uploaded
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                {/* <View> */}
                                <MaterialCardWithoutImage1
                                    style={styles.materialCardWithoutImage1}
                                ></MaterialCardWithoutImage1>
                                <MaterialButtonLight
                                    style={styles.materialButtonLight}
                                ></MaterialButtonLight>
                                {/* </View> */}
                            </View>
                            {/* <Text>lskhdlkasdf</Text> */}
                        </View>
                    </Modal>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "rgba(249,249,249,1)"
    },
    responsiveBox: {
        width: wp('100%'),
        height: hp('86%'),
        borderWidth: 2,
        borderColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-around',
        // marginHorizontal: "10%",
        // marginVertical: "10%"
    },
    modal: {
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: "#fff",
        height: "90%",
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        // marginTop: 20,
        marginLeft: 40,
        marginHorizontal: "10%"

    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        borderRadius: 100,
        backgroundColor: "rgba(3,179,143,1)",
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 5,
        shadowOpacity: 0.21,
        shadowRadius: 0,
    },
    action1: {
        flexDirection: "row",
        marginHorizontal: "5%",
        marginTop: "2%"
    },
    text1: {
        marginVertical: "12%",
        fontSize: 22,
        marginHorizontal: "7%",
        fontFamily: "pt-sans-regular",
        fontWeight: "bold",
        alignSelf: "center"
    },
    text2: {
        // marginVertical: "12%",
        // fontSize: 22,
        // marginHorizontal: "7%",
        fontFamily: "pt-sans-regular",
        fontWeight: "bold",
        alignSelf: "center",
        // fontFamily: "open-sans-700",
        // fontSize: 22,
        color: "rgba(3,179,143,1)",
    },
    text3: {
        alignSelf: "center",
        // marginVertical: "2%",
        fontFamily: "open-sans-regular",
        fontWeight: "bold",
        fontSize: 16,
        marginHorizontal: "5%"
    },
    text4: {
        fontFamily: "pt-sans-regular",
        color: "#757575",
        marginHorizontal: "5%",
        fontSize: 12
    },
    text5: {
        justifyContent: "center",
        // marginVertical: "2%",
        fontFamily: "open-sans-regular",
        fontSize: 14,
        marginHorizontal: "5%"
    },
    drafts: {
        color: "#fff",
        backgroundColor: "rgba(3,179,143,1)",
        fontSize: 14,
        fontFamily: "roboto-700",
        alignContent: "center",
        borderRadius: 12,
        height: 35,
        marginHorizontal: "6%"
    },
    loremIpsumRow: {
        height: 150,
        flexDirection: "row",
        marginTop: 50,
        // marginLeft: -291,
        // marginRight: 8
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 5,
        shadowOpacity: 0.21,
        shadowRadius: 0,
        borderRadius: 12,
    },
    loremIpsum: {
        fontFamily: "pt-sans-regular",
        color: "#121212",
        marginTop: 98,
        marginHorizontal: "6%"
    },
    // materialCardWithImageAndTitle: {
    //     height: 109,
    //     width: "100%",
    //     shadowColor: "rgba(0,0,0,1)",
    //     shadowOffset: {
    //         width: 3,
    //         height: 3
    //     },
    //     elevation: 5,
    //     shadowOpacity: 0.21,
    //     shadowRadius: 0,
    //     borderRadius: 12,
    //     // marginLeft: 216
    // },
    materialCardWithoutImage1: {
        // height: 320,
        // width: 359,
        marginTop: 22,
        alignSelf: "center",
        marginHorizontal: "10%"
    },
    materialButtonLight: {
        // height: 36,
        // width: 358,
        marginTop: 15,
        alignSelf: "center"
    },
    cardContainer: {
        borderWidth: 1,
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
        marginTop: "5%",
        marginHorizontal: "5%"
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
        marginTop: "5%",
        marginHorizontal: "3%",
        height: 140
    },
    secondCard: {
        // borderWidth: 1,
        // borderRadius: 2,
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
        // borderRadius: 12,
        overflow: "hidden",
        marginTop: "5%",
        // marginHorizontal: "5%",
        height: 250
    },
    icon: {
        color: "rgba(128,128,128,1)",
        fontSize: 60
    },
    loremIpsum: {
        fontFamily: "pt-sans-700",
        color: "rgba(78,77,77,1)",
        fontSize: 16,
        marginLeft: 5
    },
    loremIpsum3: {
        fontFamily: "pt-sans-regular",
        color: "rgba(78,77,77,1)",
        marginTop: 6
    },
    loremIpsumColumn: {
        width: 220,
        marginLeft: 28,
        marginTop: 9,
        marginBottom: 13
    },
    iconRow: {
        height: 120,
        flexDirection: "row",
        marginTop: "3%",
        marginLeft: 39,
        marginRight: 19
    },
    cardItemImagePlace: {
        backgroundColor: "#ccc",
        height: 58,
        width: 58,
        margin: 16,
        borderRadius: 100
    },
    cardBody: {
        flexDirection: "row",
        justifyContent: "space-between",
        left: 0,
        width: 357,
        height: 182,
        top: 1
    },
    bodyContent: {
        padding: 16,
        paddingTop: 24,
        flex: 1
    },
})
