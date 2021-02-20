import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';

export default class Discussion extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.responsiveBox}>
                    <ScrollView>
                        <View style={styles.secondCard}>
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    source={require("../../assets/images/cardImage5.png")}
                                    style={styles.cardItemImagePlace}
                                ></Image>
                                <View>
                                    <Text style={styles.text3}>Corona Pandemic Vaccine</Text>
                                    <Text style={styles.text4}>Dr. Jon Doe - Physician</Text>
                                    <Text style={styles.text5}>24th August 2020, 9:30 pm</Text>
                                </View>

                            </View>
                            <Text style={styles.text6}>Article on how to tacle or take precautions on corona virus pandemic.
                            Article on how to tacle or take precautions on corona virus pandemic.
                            Article on how to tacle or take precautions on corona virus pandemic.</Text>
                            <View style={styles.action1}>
                                <View style={{ flexDirection: "row", marginBottom: "3%", marginHorizontal: "2%" }}>
                                    <Text>
                                        <AntIcon name="like1" style={{
                                            color: "#00960a",
                                            fontSize: 18
                                        }} ></AntIcon>
                                    120 Likes
                                </Text>
                                    {/* <Text style={{ marginTop: '3%', fontSize: 14 }}>120 Likes</Text> */}
                                </View>
                                <View style={{ flexDirection: "row", marginBottom: "3%", marginHorizontal: "2%" }}>
                                    <Text>
                                        <FontIcon name="comments" style={{
                                            color: "#005296",
                                            fontSize: 18
                                        }} ></FontIcon>2 Comments
                                </Text>
                                    {/* <Text style={{ marginTop: '3%', fontSize: 14 }}>2 Comments</Text> */}
                                </View>
                                <View style={{ flexDirection: "row", marginBottom: "3%", marginHorizontal: "2%" }}>
                                    <Text>
                                        <AntIcon name="heart" style={{
                                            color: "#ffa8a8",
                                            fontSize: 18
                                        }} ></AntIcon>Favourited
                                    </Text>
                                    {/* <Text style={{ marginTop: '3%', fontSize: 14 }}>Favourited</Text> */}
                                </View>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Image style={styles.cardItemImagePlace1}
                                    source={require("../../assets/images/cardImage5.png")}
                                ></Image>
                                <TextInput
                                    style={styles.input1}
                                    // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                    onChangeText={text => onChangeText(text)}
                                // value={value}
                                />

                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    input1: {
        borderColor: 'gray', borderWidth: 1,
        borderRadius: 12,
        height: hp('5%'),
        // width: wp
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
        // height: 250
        height: hp('40%')
    },
    cardItemImagePlace: {
        backgroundColor: "#ccc",
        height: 58,
        width: 58,
        margin: 16,
        borderRadius: 100
    },
    text3: {
        alignSelf: "auto",
        marginTop: "4%",
        fontFamily: "open-sans-regular",
        fontWeight: "bold",
        fontSize: 16,
        marginHorizontal: "5%"
    },
    text4: {
        alignSelf: "auto",
        fontFamily: "open-sans-regular",
        color: "rgba(3,179,143,1)",
        marginHorizontal: "5%",
        fontWeight: "bold"
    },
    text5: {
        fontFamily: "pt-sans-regular",
        color: "#757575",
        marginHorizontal: "5%",
        fontSize: 12
    },
    text6: {
        justifyContent: "center",
        // marginVertical: "2%",
        fontFamily: "open-sans-regular",
        fontSize: 14,
        marginHorizontal: "5%",
        alignSelf: "center"
    },
    action1: {
        flexDirection: "row",
        marginHorizontal: "5%",
        marginTop: "2%"
    },
    cardItemImagePlace1: {
        backgroundColor: "#ccc",
        height: 35,
        width: 35,
        margin: 16,
        borderRadius: 100
    },
})
