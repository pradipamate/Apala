import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MaterialCardWithoutImage1 from "../../components/MaterialCardWithoutImage1";
import MaterialButtonLight from "../../components/MaterialButtonLight";
import EntypoIcon from 'react-native-vector-icons/Entypo';


class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cardContainer}>
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
                ></MaterialButtonLight>
            </View>
        );
    }
}
export default AddPost

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "rgba(249,249,249,1)"
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
    iconRow: {
        height: 120,
        flexDirection: "row",
        marginTop: "3%",
        marginLeft: 39,
        marginRight: 19
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
    materialCardWithoutImage1: {
        height: 320,
        width: 359,
        marginTop: 22,
        alignSelf: "center"
    },
    materialButtonLight: {
        height: 36,
        width: 358,
        marginTop: 15,
        alignSelf: "center"
    },
})