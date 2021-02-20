

import React, { Component, useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, ScrollView, TouchableOpacity, FlatList, Modal, Image, Switch, StyleSheet, Text } from 'react-native';
// import { Container, Header, Title, Left, Right, Body } from 'native-base';
import { Container, Header, Title, Content, Card, CardItem, Item, Label, Button, Thumbnail, Left, Right, Body } from 'native-base';
import DatePicker from 'react-native-datepicker'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import PayoutServices from '../../Services/PayOutServices/PayOutServices'
import imagePath from '../../Services/ImagePath'
const findDoctordata = [
  {
    id: 1,
    name: 'shivam Parswar',
    details: '23rd Aug 2020,11 AM',
    earnings: '800',
    pName:'POD_123',
    buttonname: 'Find Doctors',
    url: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',

  },
  {
    id: 2,
    name: 'Ajit Dhadke',
    details: '2nd sept 2020,11:30 AM',
    earnings: '100',
    pName:'POD_56100',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
  },
  {
    id: 3,
    name: 'Akshay Raskar',
    details: '25rd Aug 2020,11:30 PM',
    earnings: '350',
    pName:'POD_78905',
    buttonname: 'Start Consulting',
    url: 'https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80',
  },
]


function renderItems1(item) {
  // console.log("itemmmmm", item);

  return (

    <Card style={{ borderRadius: 20 }}>
      <CardItem style={{ borderRadius: 40, marginHorizontal: '0%' }}>
        {/* <Left style={{ flexDirection: 'row' }}>

         
          <View style={{ marginLeft: '8%' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.item.pName} </Text>
            <Text style={styles.cardLeft4}>{item.item.details} </Text>


          </View>

        </Left>
        <Right>
          <View>
            <Text>₹ {item.item.earnings}/-</Text>
          </View>

        </Right> */}
        <Text>Comming soon...</Text>
      </CardItem>
    </Card>
  );
};
// function EarningsScreen() {
//   return (
//     // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     <FlatList
//       // horizontal={true}
//       // showsHorizontalScrollIndicator={false}
//       style={{ marginVertical: '3%', marginHorizontal: '3%' }}
//       data={findDoctordata}
//       renderItem={renderItems}
//       keyExtractor={item => item.id}></FlatList>
//     // </View>

//   )
// }
// function PayoutsScreen() {
//   return (
//     <FlatList
//       // horizontal={true}
//       // showsHorizontalScrollIndicator={false}
//       style={{ marginVertical: '3%', marginHorizontal: '3%' }}
//       data={findDoctordata}
//       renderItem={renderItems1}
//       keyExtractor={item => item.id}></FlatList>
//   );
// }
const Tab = createMaterialTopTabNavigator();
export default function App(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [date, setDate]=useState("")
  const [token,setToken]=useState("")
  const [totalEarning, setTotalEarning]=useState("")
  const [earningArr,setEarningArr]=useState([])



   useEffect(() => {
    let token = props.navigation.getParam('token', '');
    setToken(token)
    console.log("date===", new Date());
    let date=new Date()
    let day= date.getDay()
    let month = date.getMonth()
    let year=date.getFullYear()
    console.log("today=========================",day, month, year);
    let today=year+"-"+month+"-"+day
    setDate(today)
    console.log("token============================", token);
    getAllEarnings(today,token)

    getPayouts()
  }, []);
 // disable future dates
  
  const disableFutureDt = current => {
    return current.isBefore(date)
  }
  const handleDate=(date)=>{
    setDate(date)
    getAllEarnings(date,token)
  }

  function renderItems(item) {
    // console.log("itemmmmm", item);
  
    return (
      <>
      <View style={{padding:'3%'}}>
        <Text style={{fontSize:15,color:'#605F5E'}}>TOTAL EARNINGS</Text>
        <View style={{flexDirection:'row', justifyContent:"space-between"}}>
          <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:22, color:"#051562"}}>{'\u20B9'}</Text>
          <Text style={{fontSize:22, color:"#051562"}}> {totalEarning} /-</Text>
          </View>
          <View style={{alignSelf:'flex-end'}}>
                              <DatePicker
                                  style={{ width: 200 }}
                                  date={date}
                                  mode="date"
                                  placeholder="select date"
                                  format="YYYY-MM-DD"
                                  confirmBtnText="Confirm"
                                  androidMode='default'
                                  cancelBtnText="Cancel"
                                  isValidDate={disableFutureDt}
                                  customStyles={{
                                      dateIcon: {
                                          position: 'absolute',
                                          left: 0,
                                          top: 4,
                                          marginLeft: 0
                                      },
                                      dateInput: {
                                          marginLeft: 36
                                      }
                                      // ... You can check the source to find the other keys.
                                  }}
                                  onDateChange={(date) =>handleDate(date)}
                              />
                          </View>
        </View>

        <View style={{flexDirection:"row", justifyContent:'space-between'}}>
          <Text style={{color:'#1495DA'}}>Online - to Get</Text>
          <Text style={{color:'#DF9434'}}>Cash - to Pay</Text>
        </View>
      </View>
      <ScrollView>
     {earningArr!==[]||earningArr!==undefined?earningArr.map(item=>
      <Card style={{ borderRadius: 20 }}>
        <CardItem style={{ borderRadius: 40, marginHorizontal: '0%' }}>
          <Left style={{ flexDirection: 'row' }}>
  
            <Image
              square
              style={{ height: 70, width: 70, borderRadius: 35 }}
              source={{ uri: imagePath+item.profile_photo_path }}
            />
            <View style={{ marginLeft: '8%' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.fullname} </Text>
              <Text style={styles.cardLeft4}>{item.created_at} </Text>
  
  
            </View>
  
          </Left>
          <Right>
            <View>
              <Text>₹ {item.amount}/-</Text>
            </View>
  
          </Right>
        </CardItem>
      </Card>
      ):null}
      </ScrollView>
      </>
    );
  };

function getPayouts(){
  
}

function getAllEarnings(today,token){
  PayoutServices.getEarnings(today,token).then(response=>{
    console.log("response in getAllEarnings=====================", response);
    if(response){
      if(response.status == 200){
        setTotalEarning(response.data.totalearnings)
        setEarningArr(response.data.earnings)
      }
    }
  })
}

  return (
    <Container>
      {/* <ScrollView> */}
        <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>

          <Left>
            <Title style={{ color: '#fff', marginLeft: '10%', fontSize: 16, width: '100%' }}>Aapka Doctor </Title>
          </Left>

          <Right style={{ flexDirection: 'row' }}>

            <Switch
              style={{ marginRight: '5%' }}
              trackColor={{ false: "#f2f2", true: "#333" }}
              thumbColor={isEnabled ? "#fff" : "#fff"}
              ios_backgroundColor="#999"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />

            <TouchableOpacity
            //  onPress={() => this.props.navigation.('NotificationTab')}
            >
              <Icon name='magnify' color='#fff' size={24} style={{ marginRight: '5%' }} />
            </TouchableOpacity>

            <TouchableOpacity
            //  onPress={() => this.props.navigation.('NotificationTab')}
            >
              <Icon1 name='notifications-outline' color='#fff' size={22} style={{ marginRight: '5%' }} />
            </TouchableOpacity>
            <TouchableOpacity
            //  onPress={() => this.props.navigation.('NotificationTab')}
            >
              <Icon name='dots-vertical' color='#fff' size={24} style={{ marginRight: '5%' }} />
            </TouchableOpacity>
          </Right>

        </Header>
        <NavigationContainer>
          <Tab.Navigator style={{ backgroundColor: 'green' }}>
            <Tab.Screen name="Earnings" component={renderItems} />
            <Tab.Screen name="Payouts" component={renderItems1} />
          </Tab.Navigator>
        </NavigationContainer>

      {/* </ScrollView> */}
    </Container>


  );
}
const styles = StyleSheet.create({
  //Container:{  padding: 10},
  bimage: { padding: 10, marginTop: '10%', },
  ImageBackground: { position: 'relative' },
  bannerheader: { position: 'absolute', right: '-2%', top: '10%' },
  bannerheaderTitle: { fontSize: 20, color: '#fff', width: '100%', color: 'blue', fontWeight: 'bold', fontStyle: 'italic' },
  hurryup: { textAlign: 'left', color: '#000', fontWeight: 'bold', fontSize: 22, marginLeft: '15%', marginTop: '5%', fontStyle: 'italic' },
  finddoctorsliderpart: { marginBottom: '0%', padding: 10 },
  findtextdoctor: { fontSize: 20, paddingBottom: 10 },
  caption1: { fontSize: 12, textAlign: 'center', fontWeight: 'bold' },
  caption2: { textDecorationLine: 'underline', fontSize: 15, color: '#03b38f', textAlign: 'center', fontWeight: 'bold' },
  captionparttiile: { position: 'absolute', left: '5%', bottom: '3%' },
  captionTitle: { fontSize: 13, color: '#fff', width: '100%', color: '#fff', fontWeight: 'bold' },
  parts: {
    borderRadius: 10, shadowColor: "#000", shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, marginBottom: 20
  },

  finddoctor: { flexDirection: 'row', },
  findPart: { borderRadius: 20, shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, padding: 10 },
  blogtitlename: { textAlign: 'center', fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', paddingBottom: '2%', paddingTop: '2%' },
  button: {
    backgroundColor: '#03b38f',
    alignSelf: 'center',
    borderRadius: 30,
    marginBottom: '10%',
    marginTop: '10%'
  },
  lastsection: { padding: 10 },
  lastsectionpart: {
    borderRadius: 10, shadowColor: "#000", shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10
  },

})