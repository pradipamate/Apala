import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, Text, ImageBackground, StyleSheet, Alert, Switch } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Card, CardItem, Body, Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements'
import Modal from 'react-native-modal';
import RegistrationServices from "../../Services/RegistrationService/RegistrationServices"
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../Components/Loader'
import RadioForm from 'react-native-simple-radio-button';

export default class RegistrationByUserType extends Component {
    constructor() {
        super();
        this.state = {
             userType:0,
            loading: false
        }
    }




    handleSubmit = () => {
     console.log("userType=====",this.state.userType);
     AsyncStorage.setItem("UserType", this.state.userType)
     if(this.state.userType=="1"){
        this.props.navigation.navigate("DoctorRegistration",{userType:this.state.userType})
     }
     else{
        this.props.navigation.navigate("HomePage",{userType:this.state.userType})
     }
     
    }
    handleUserType=(type)=>{
       this.setState({
           userType:type
       })
    }
    render() {
        var radio_props = [
           
            { label: 'Are you a normal user?', value: '0' },
            { label: 'Are you a healthcare professional?', value: '1' }

        ];

        return (
            <Container>
                <ScrollView>
                    <Loader loading={this.state.loading} />
                    <View style={{ marginHorixzontal: '0%' }}>
                        <View style={styles.backgroundimage}>
                            <ImageBackground source={require('../../Images/login.png')} style={styles.bground} resizeMode='cover'>
                                <View style={styles.help}>
                                    <Text style={styles.helptext}>HELP</Text>
                                </View>
                                <View style={styles.logo}>
                                    <Image
                                        style={styles.image1}
                                        source={require('../../Images/logo.png')} />
                                </View>
                                <View style={styles.Viewcardpart}>
                                    <Card style={styles.Card}>
                                        <CardItem style={styles.carditem}>
                                            <Body style={styles.Body}>
                                                <Text style={styles.cardtitle}>User Type</Text>
                                                <View>
                                                    <RadioForm
                                                        radio_props={radio_props}
                                                        initial={0}
                                                        buttonSize={10}
                                                        formHorizontal={false}
                                                        buttonInnerColor={'#03b38f'}
                                                        buttonOuterColor={'#03b38f'}
                                                        labelStyle={{ fontSize: 11, marginHorizontal: 5, marginLeft: '0%', marginBottom:'3%'}}
                                                        //buttonWrapStyle={{marginLeft: 8,fontSize:10}}
                                                        //buttonOuterSize={80}
                                                        onPress={(value) => this.handleUserType(value)}
                                                    />
                                                </View>
                                                <TouchableOpacity style={styles.button}
                                                    onPress={() => this.handleSubmit()}>
                                                    <Text style={{ fontSize: 16, marginVertical: '3%', color: '#fff', marginHorizontal: '38%' }}>SUBMIT</Text>
                                                </TouchableOpacity>

                                                {/* <View
                                                style={styles.lines}
                                            /> */}
                                                {/* <View style={styles.fpasswordpart}>
                                                  <Text style={styles.fpassword} onPress={() => this.props.navigation.navigate('ChangePassword')}>FORGOT PASSWORD</Text>
                                            </View> */}

                                            </Body>
                                        </CardItem>
                                    </Card>
                                </View>
                                {/* <View  style={styles.lastoptionpart}>
                              <Text style={styles.lastoptiontext}>New User?</Text>  
                              <Text style={styles.lastoptiontext}><Text style={{textDecorationLine:'underline'}}>REGISTER</Text> | <Text style={{textDecorationLine:'underline'}}>REGISTER WITH EMAIL / MOBILE</Text></Text>
                     </View> */}
                            </ImageBackground>
                        </View>
                    </View>
                    {/* <View>
      <Modal isVisible={true}>
        <View style={{ flex: 1,backgroundColor:'#FFF',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              overflow: 'hidden',
            }}>
           <View style={styles.popupTitleview}>
                    <View >
                    <Text style={styles.helptext}
                            //  onPress={() => }
                            >
                                Select Plans
                            </Text>
                           
                    </View>
                    <View style={styles.help}>
                    <Icon
                            name='close'
                            size={24}
                            // color='#03b38f'
                            //fontWeight='bold'
                            /> 
                    </View>
                </View>
             
            </View>
      </Modal>
    </View> */}
                </ScrollView>
            </Container>
        )
    }
}


const styles = StyleSheet.create({
    // for popup onload
    helptext: {
        marginRight: '5%',
        marginTop: '3%',
        color: '#03b38f',
        fontWeight: 'bold',
        fontSize: 24,
        //  textDecorationLine:'underline'
    },
    help: {
        alignItems: 'flex-end',
        //   position:'absolute',
        // left:0,
        // right:0,
        // zIndex: 2
    },
    popupTitleview: {
        marginTop: hp('3%'),
        marginBottom: hp('4%'),
        marginRight: hp('1%'),
        flexDirection: 'row',
        // flex:1,
        width: '100%',
        justifyContent: 'space-between'
    },
    // Login page css
    image1: {
        height: hp('11%'),
        width: wp('45%'),
        marginLeft: '0%',
        resizeMode: 'cover',
    },
    logo: {
        textAlign: 'center',
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: '8%'
    },
    Titleview: {
        marginTop: hp('3%'),
        marginBottom: hp('4%'),
    },

    Card: {
        textAlign: 'center',
        textAlign: 'center',
        borderRadius: 20,
    },
    Viewcardpart: {
        marginTop: '30%',
        padding: '5%',
        // marginBottom:'200%'
    },
    Body: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bground: {
        height: hp('100%'),
        width: wp('100%'),
        paddingBottom: '10%'
    },
    cardtitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000',
        fontSize: 16,
        marginBottom:'5%'
    },
    button: {
        backgroundColor: '#03b38f',
        alignSelf: 'center',
        borderRadius: 30,
        marginBottom: '5%',
        marginTop: '10%'
    },
    carditem: {
        textAlign: 'center', borderRadius: 5
    },
    help: {
        alignItems: 'flex-end',

    },
    helptext: {
        marginRight: '5%',
        marginTop: '3%',
        color: '#03b38f',
        fontWeight: 'bold',
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    fpasswordpart: {
        alignItems: 'center'
    },
    fpassword: {
        fontWeight: 'bold',
        fontSize: 16,
        textDecorationLine: 'underline',
        color: 'red',
        paddingBottom: '4%'
    },
    lastoptionpart: {
        // flex:1,
        flexDirection: "row",
        padding: '2%',
        //flexDirection: 'row',
        justifyContent: 'space-around'
    },
    lastoptiontext: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
    },
    lines: {
        borderColor: '#03b38f',
        borderWidth: 0.3,
        width: "90%",
        marginTop: '3%',
        marginBottom: '3%'
    }
})