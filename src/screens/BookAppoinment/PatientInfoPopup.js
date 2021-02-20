import React, { Component } from "react";
import DropDownPicker from 'react-native-dropdown-picker'
// import { Ionicons } from '@expo/vector-icons';
import { View, ScrollView, TouchableOpacity, TextInput, Image, ImageBackground, StyleSheet, FlatList, Switch, Alert, Modal } from 'react-native';
import { Container, Header, Title, Content, Button, Card, CardItem, Icon, Item, Label, Thumbnail, Left, Right, Body, Text, Input } from 'native-base';
export default class ClinikApoinModal extends Component {
    state = {
        isVisible: false,
    }

    componentDidMount() {
        this.setState({ isVisible: true })
    }

    render() {
        return (

            <View style={styles.container}>
                <Modal
                    style={styles.centeredView}
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    visible={this.state.isVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has now been closed.');
                    }}>
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
                                            this.displayModal(!this.state.isVisible);
                                        }} />
                                </View>
                                <Text style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: 17 }}>This "In-Clinic" Appointment is For</Text>

                                <View>
                                    <View style={{
                                        borderRadius: 80,
                                        width: 12,
                                        height: 12,
                                        borderWidth: 1,
                                        borderColor: 'green',
                                        backgroundColor: 'green',
                                        flexDirection: 'row',
                                        marginTop: 15,
                                        marginBottom: -18,
                                        justifyContent: 'flex-end'
                                    }}>

                                    </View>
                                    <Text style={{
                                        fontStyle: 'italic', fontSize: 19, fontWeight: 'bold', paddingLeft: 20
                                    }}>James Kelvin</Text>
                                </View>


                                <View style={{ marginBottom: 15 }}>
                                    <View style={{
                                        borderRadius: 80,
                                        width: 12,
                                        height: 12,
                                        borderWidth: 1,
                                        borderColor: 'green',
                                        flexDirection: 'row',
                                        marginTop: 12,
                                        marginBottom: -16,
                                        justifyContent: 'flex-end'
                                    }}>

                                    </View>
                                    <Text style={{ fontStyle: 'italic', fontSize: 15, fontWeight: 'bold', paddingLeft: 20 }}>Select Family Member</Text>
                                </View>

                                {/* <View style={{ borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden' }}> */}
                                <DropDownPicker style={{}}
                                    items={[
                                        { label: 'Dentist', value: 'Dentist' },
                                        { label: 'Cardologiests', value: 'Cardologiests' },
                                        { label: 'Cosmetologists', value: 'Cosmetologists' }
                                    ]}
                                    placeholder="Select Family Member"
                                    placeholderTextColor="gray"
                                    baseColor="#fff"
                                    display="flex"

                                    containerStyle={{ height: 35, width: '90%', padding: '0%', zIndex: 99999 }}
                                    style={{color: "white", width: '100%', borderColor: "#03b38f", zIndex: 99999, padding: 20 }}
                                />

                                <View>
                                    <View style={{
                                        borderRadius: 80,
                                        width: 12,
                                        height: 12,
                                        borderWidth: 1,
                                        borderColor: 'green',

                                        flexDirection: 'row',
                                        marginTop: 15,
                                        marginBottom: -16,
                                        justifyContent: 'flex-end'
                                    }}>

                                    </View>
                                    <Text style={{ fontStyle: 'italic', fontSize: 15, fontWeight: 'bold', paddingLeft: 20 }}>Book for new patient</Text>
                                </View>

                                <Text style={styles.text}>Please Provide Info About Patient here</Text>
                                <Text style={{ fontSize: 12, marginBottom: -10, color: 'gray' }}>Patient's Full Name</Text>
                                <TextInput style={{}}

                                    placeholderTextColor="gray"
                                    style={{
                                        height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 10, marginBottom: 10
                                    }}
                                />
                                <Text style={{ fontSize: 12, marginBottom: -10, color: 'gray' }}>User's Mobile Number</Text>
                                <TextInput style={{}}

                                    placeholderTextColor="gray"
                                    style={{
                                        height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 10, marginBottom: 10
                                    }}
                                />

                                <Text style={{ fontSize: 12, marginBottom: -10, color: 'gray' }}>Patient's Mobile Number</Text>
                                <TextInput style={{}}

                                    placeholderTextColor="gray"
                                    style={{
                                        height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 10, marginBottom: 10
                                    }}
                                />

                                <Text style={{ fontSize: 12, marginBottom: -10, color: 'gray' }}>Patient's Email Address(Optional)</Text>
                                <TextInput style={{}}

                                    placeholderTextColor="gray"

                                    style={{
                                        height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 10
                                    }}
                                />
                           

                            </View>
                            <View style={styles.line}></View>
                            <View style={{flexWrap:'wrap'}}>
                                <Text style={styles.conditiontext}>By booking this Appointment, I agree to <Text style={{color:"#03b38f",fontSize:10}}> Terms & Conditions</Text></Text>
                            </View>


                            <TouchableOpacity
                                style={styles.buttonsubmit}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', padding: 2, fontSize: 15 }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Modal>
                <Button
                    onPress={() => this.openModal()}
                    title="Open modal"
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    line: {
        borderColor:'#ccc',
        borderWidth:.4,
        marginTop:'4%',
        marginBottom:'4%',
         width:'90%'
    },
    container: {
        padding: 25,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
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
});

