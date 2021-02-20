import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MyCases from "./MyCases"
import Discussion from "./Discussion"

const Tab = createMaterialTopTabNavigator();

export default class router1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rect}>
                    <View style={styles.aapkaDoctorRow}>
                        <Text style={styles.aapkaDoctor}>Aapka Doctor</Text>
                        <MaterialIconsIcon
                            name="search"
                            style={styles.icon7}
                        ></MaterialIconsIcon>
                        <FontAwesomeIcon name="bell" style={styles.icon2}></FontAwesomeIcon>
                        <EntypoIcon
                            name="dots-three-vertical"
                            style={styles.icon3}
                        ></EntypoIcon>
                    </View>
                </View>
                {/* <NavigationContainer> */}
                <Tab.Navigator
                    // screenOptions={({ route }) => ({
                    //   tabBarLabel: ({ focused, color }) => {
                    //     let label;
                    //     if (route.name === "Timeline") {
                    //       label = focused ? "#fff" : "rgba(3,179,143,1)"
                    //     }
                    //   }
                    // })

                    // }
                    tabBarOptions={{
                        activeTintColor: 'rgba(3,179,143,1)',
                        inactiveTintColor: 'gray',
                    }}
                >
                    <Tab.Screen name="Discussion" component={Discussion} />
                    <Tab.Screen name="MyCases" component={MyCases} />
                </Tab.Navigator>
                {/* </NavigationContainer> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(249,249,249,1)"
    },
    rect: {
        width: "100%",
        height: 31,
        backgroundColor: "rgba(3,179,143,1)",
        flexDirection: "row",
        // marginTop: 29,
        alignSelf: "center"
    },
    aapkaDoctor: {
        fontFamily: "pt-sans-700",
        color: "rgba(255,255,255,1)",
        marginTop: 1
    },
    icon7: {
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        height: 20,
        width: 20,
        marginLeft: 190
    },
    aapkaDoctorRow: {
        height: 20,
        flexDirection: "row",
        flex: 1,
        marginRight: 9,
        marginLeft: 18,
        marginTop: 5
    },
    rect: {
        width: "100%",
        height: 31,
        backgroundColor: "rgba(3,179,143,1)",
        flexDirection: "row",
        // marginTop: 29,
        alignSelf: "center"
    },
    aapkaDoctor: {
        fontFamily: "pt-sans-700",
        color: "rgba(255,255,255,1)",
        marginTop: 1
    },
    icon7: {
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        height: 20,
        width: 20,
        marginLeft: 190
    },
    icon2: {
        color: "rgba(255,255,255,1)",
        fontSize: 16,
        height: 16,
        width: 16,
        marginLeft: 10,
        marginTop: 2
    },
    icon3: {
        color: "rgba(255,255,255,1)",
        fontSize: 16,
        height: 17,
        width: 16,
        marginLeft: 16,
        marginTop: 2
    },

})
