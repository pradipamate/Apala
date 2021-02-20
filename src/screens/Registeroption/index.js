import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, FlatList, Image, Text, ImageBackground, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Container, Header, Title, Content, Card, CardItem, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';




export default class Registeroption extends Component {
  constructor() {
    super();
  }

  render() {

    return (
      <ScrollView>
        <View style={{ marginHorixzontal: '0%' }}>
          <View style={styles.Titleview}>
            <Text style={styles.Title}>WELCOME TO</Text>
          </View>
          <View style={styles.logo}>
            <Image
              style={styles.image1}
              source={require('../../Images/logo.png')} />
          </View>

          <View style={styles.backgroundimage}>
            <ImageBackground source={require('../../Images/registeroptionbg.png')} style={styles.bground} resizeMode='cover'>
              <View style={styles.Viewcardpart}>
                <Card style={styles.Card}>
                  <CardItem style={styles.carditem}>
                    <Body style={styles.Body}>
                      <Text style={styles.cardtitle}>ALREADY A USER?</Text>
                      <TouchableOpacity style={styles.button}
                        onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{ marginHorizontal: '35%', fontSize: 14, marginVertical: '4%', color: '#fff', }}>Login</Text>
                      </TouchableOpacity>

                      {/* <Text style={styles.cardtitle}>NEW USER?</Text>
                                            <TouchableOpacity style={styles.button}
                                                    onPress={() => this.props.navigation.navigate('Register')}>
                                            <Text style={{marginHorizontal:'30%',fontSize:14,marginVertical:'4%',color:'#fff'}}>REGISTER</Text>
                                            </TouchableOpacity> */}

                      {/* <Text style={styles.cardtitle}>ALTERNATE LOGIN OPTIONS</Text> */}
                      <Text style={styles.cardtitle}>NEW USER?</Text>
                      <TouchableOpacity style={styles.button}
                        onPress={() => this.props.navigation.navigate('AlternateLoginOption')}>
                        <Text style={{ padding: '5%', fontSize: 14, marginVertical: '0%', color: '#fff', marginHorizontal: '10%', }}>REGISTER WITH MOBILE</Text>
                      </TouchableOpacity>
                    </Body>
                  </CardItem>
                </Card>
              </View>
            </ImageBackground>
          </View>
        </View>

      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({

  image1: {
    height: hp('12%'),
    //width: wp('50%'),
    resizeMode: 'contain',
  },
  logo: {
    textAlign: 'center',
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
  },
  Titleview: {
    marginTop: hp('3%'),
    marginBottom: hp('4%'),
  },
  Title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Card: {
    //borderRadius:10,
    textAlign: 'center',
    textAlign: 'center',
    borderRadius: 20,
    //backgroundColor:'red',
    //marginTop:'-10%',
    paddingTop: '10%',
    paddingBottom: '10%'
  },
  Viewcardpart: {
    marginTop: '70%',
    padding: '5%',
    //width:hp('100%')
    // borderRadius:20,

  },
  Left: {
    width: 0
  },
  Right: {
    width: 0
  },
  Body: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bground: {
    //resizeMode:'stretch',
    height: hp('100%'),
    width: wp('100%'),
    //position:'relative',
    marginTop: '-30%',
    // backgroundColor:'red'
    paddingBottom: '10%'
  },
  cardtitle: {
    //flex:1,
    textAlign: 'center',
    //justifyContent:'center',
    fontWeight: 'bold',
    color: '#000',

  },
  button: {
    backgroundColor: '#03b38f',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: '5%',
    marginBottom: '5%'
  },
  cardItem: {
    textAlign: 'center'
  }
})