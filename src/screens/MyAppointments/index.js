import React, { Component, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DrawerActions } from 'react-navigation-drawer';
import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
  Switch,
  StyleSheet,
  Text,
} from 'react-native';
// import { Container, Header, Title, Left, Right, Body } from 'native-base';
import {
  Container,
  Header,
  Title,
  Content,
  Card,
  CardItem,
  Left,
  Right,
  Body,
} from 'native-base';
import ImagePath from '../../Services/ImagePath';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
// import { DrawerActions } from 'react-navigation-drawer';






function Completed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Text style={{ color: '#03b38f', fontWeight: "bold", fontSize: 18 }}>Completed!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function App(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  // const [token, setToken] = useState("");
  const [consults, setConsults] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [slot, setgetslot] = useState([]);
  useEffect(() => {
    TodayDate();
    // getAppointmentData();
  }, []);


  //   Appointsment///
  // function getAppointmentData() {

  //   let token = props.navigation.getParam('token', '');
  //   console.log(' token data???', token);
  //   // getOnlineConsultsData()
  //   // console.log(
  //   //   'Token>>>>>>>>>>>>>555555>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
  //   //   props.navigation.getParam('token'),
  //   // );
  //   fetch(
  //     'https://svcaapkadoctor.azurewebsites.net/api/users/bookings/pageNumber=1&date=10/2/2020',
  //     {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         Authorization: 'Bearer ' + token,
  //       },
  //     },
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       //  console.log('Appointments@@@@@@@@@@@@@@@@@@@@@@', response);
  //       // let business=[];
  //     //  setAppointments(response);
  //     })

  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }


  // function renderItems1(item) {
  //   console.log('itemm', item); //image
  //   let ImagePath = item.item.infoData.image;
  //   // console.log("ImagePath", item.item.infoData.image);

  //   return (
  //     <Card style={{ borderRadius: 20 }}>
  //       <CardItem style={{ borderRadius: 40, marginHorizontal: '0%' }}>
  //         <Left style={{ flexDirection: 'row' }}>
  //           <Image
  //             square
  //             style={{
  //               height: 70,
  //               width: 70,
  //               borderRadius: 35,
  //               backgroundColor: '#f3f3f3',
  //             }}
  //             source={{ ImagePath }}
  //           />
  //           <View style={{ marginLeft: '8%' }}>
  //             <Text style={{ fontSize: 16, fontFamily: 'bold' }}>
  //               {item.item.infoData.name}{' '}
  //             </Text>
  //             {item.item.businesses !== null ? (
  //               <Text
  //                 style={{
  //                   fontSize: 12,
  //                   flexWrap: 'wrap',
  //                   width: '100%',
  //                   marginVertical: '2%',
  //                 }}>
  //                 Appointment At{' '}
  //                 <Text style={{ color: '#03b38f', fontWeight: 'bold' }}>
  //                   {item.item.businesses.name}
  //                 </Text>{' '}
  //               </Text>
  //             ) : null}
  //             <Text
  //               style={{
  //                 fontSize: 12,
  //                 flexWrap: 'wrap',
  //                 width: '100%',
  //                 marginVertical: '2%',
  //               }}>
  //               Symptoms{' '}
  //               <Text style={{ color: '#03b38f', fontWeight: 'bold' }}>
  //                 {item.item.symptom}
  //               </Text>{' '}
  //             </Text>

  //             <Text
  //               style={{
  //                 fontSize: 12,
  //                 flexWrap: 'wrap',
  //                 width: '100%',
  //                 marginVertical: '2%',
  //               }}>
  //               Booking ID :{' '}
  //               <Text style={{ color: '#03b38f', fontWeight: 'bold' }}>
  //                 {item.item.sevice_booking_id}
  //               </Text>{' '}
  //             </Text>

  //             <Text
  //               style={{
  //                 fontSize: 12,
  //                 flexWrap: 'wrap',
  //                 width: '100%',
  //                 marginVertical: '2%',
  //               }}>
  //               Slot ID :{' '}
  //               <Text style={{ color: '#03b38f', fontWeight: 'bold' }}>
  //                 {item.item.slot_id}
  //               </Text>{' '}
  //             </Text>

  //             <Text
  //               style={{
  //                 fontSize: 12,
  //                 flexWrap: 'wrap',
  //                 width: '100%',
  //                 // color: '#03b38f',
  //               }}>
  //               Date Time : <Text style={{ color: '#03b38f' }}>{item.item.appointment_datetime}</Text>
  //             </Text>
  //           </View>
  //         </Left>
  //         <Right></Right>
  //       </CardItem>
  //     </Card>
  //   );
  // }

  // function AppointmentsScreen() {
  //   return (

  //     <FlatList
  //       // horizontal={true}
  //       // showsHorizontalScrollIndicator={false}
  //       style={{ marginVertical: '3%', marginHorizontal: '3%' }}
  //       data={appointments}
  //       renderItem={renderItems1}
  //       keyExtractor={(item) => item.id}></FlatList>

  //   );
  // }


  // 
  const TodayDate = async () => {
    // console.log("todayyyyyyyyyyyyyyyyy")
    let token = await AsyncStorage.getItem("Token")

    let TodayDate = new Date();
    let Selectedfdate = moment(TodayDate, 'DD/MM/YYYY');
    let modifieddate = Selectedfdate.format('MM/DD/YYYY')
    let formatedDate = "date=" + modifieddate


    //let token = props.navigation.getParam('token', '');
    // console.log('formatedDate???', formatedDate);
    // getOnlineConsultsData()
    // console.log(
    //   'Token>>>>>>>>>>>>>555555>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
    //   props.navigation.getParam('token'),
    // );
    fetch(
      'https://svcaapkadoctor.azurewebsites.net/api/users/bookings?',
      // 'https://svcaapkadoctor.azurewebsites.net/api/users/bookings',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log('user AFETR TOKENS@@@@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', response);
        setConsults(response);
      })

      .catch((error) => {
        console.error(error);
      });
  }




  const checkSerive = (item) => {
    // console.log("event.target.value", item);
    AsyncStorage.setItem("doctorName", item.item.infoData.name);
    AsyncStorage.setItem("docguid", item.item.to_guid);
    AsyncStorage.setItem("fromguid", item.item.from_guid)

    if (item.item.service_id == "video") {
      props.navigation.navigate('Videocall', { item: item })
    }
    else if (item.item.service_id == "chat") {
      props.navigation.navigate('Chat', { item: item })
    }
    else {
      props.navigation.navigate('Videocall', { item: item })
    }
  }


  function renderItems(item) {
    console.log('itemm', item); //image
    let url = ImagePath + item.item.infoData.image;
    //console.log("ImagePath@@@@@@",ImagePath);
    return (

      <Card style={{ borderRadius: 20 }}>
        <CardItem style={{ borderRadius: 40, marginHorizontal: '0%' }}>
          <Left style={{ flexDirection: 'row' }}>
            <Image
              square
              style={{
                height: 70,
                width: 70,
                borderRadius: 35,
                backgroundColor: '#f3f3f3',
              }}
              source={{ uri: url }}
            />
            <View style={{ marginLeft: '8%' }}>
              <Text style={{ fontSize: 16, }}>
                {item.item.infoData.name}{' '}
              </Text>
              <Text style={{ fontSize: 12, width: '100%' }}>Date: <Text style={{ fontSize: 12, color: '#03b38f' }}>{moment(item.item.appointment_datetime).format('DD/MM/YYYY')}</Text>{' '}
              </Text>
              <Text style={{ fontSize: 12, width: '100%' }}>Time: <Text style={{ fontSize: 12, color: '#03b38f' }}>{moment(item.item.appointment_datetime).format('H:mma')}</Text>{' '}
              </Text>
              {/* { item.item.slot_id=='chat' ?
                               <Text>{i.slot_time}</Text>
                            :item.item.slot_id=='chat'(c ? d : e)} */}
              <TouchableOpacity style={styles.button} onPress={() => checkSerive(item)} >
                <Text style={{ fontSize: 16, color: '#fff' }}>{item.item.service_id}</Text>
              </TouchableOpacity>
            </View>
          </Left>
          <Right></Right>
        </CardItem>
      </Card>
      //   </TouchableOpacity>
    );
  }


  function Todayscreen() {
    return (

      // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        // horizontal={true}
        // showsHorizontalScrollIndicator={false}
        style={{ marginVertical: '3%', marginHorizontal: '3%' }}
        data={consults}
        renderItem={renderItems}
        keyExtractor={(item) => item.id}></FlatList>
      // <View>
      //     <Text>sdfsdfsdf</Text>
      //   </View>
    );
  }


  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleMenu = () => {
    props.navigation.dispatch(DrawerActions.toggleDrawer());
  }
  return (
    <Container>
      {/* <View> */}
      <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
        <Left style={{ marginLeft: '2%' }}>
          <TouchableOpacity
            onPress={handleMenu}>
            <Icon1 name='menu' style={{ color: '#fff', fontSize: 30 }} />
          </TouchableOpacity>
        </Left>
        <Body>
          <Title style={{ color: '#fff', fontSize: 18 }}>My Appointments </Title>
        </Body>

        <Right style={{ flexDirection: 'row' }}>

          <TouchableOpacity
          //  onPress={() => this.props.navigation.('NotificationTab')}
          >
            <Icon
              name="magnify"
              color="#fff"
              size={24}
              style={{ marginRight: '5%' }}
            />
          </TouchableOpacity>

          <TouchableOpacity
          //  onPress={() => this.props.navigation.('NotificationTab')}
          >
            <Icon1
              name="notifications-outline"
              color="#fff"
              size={22}
              style={{ marginRight: '5%' }}
            />
          </TouchableOpacity>
          <TouchableOpacity
          //  onPress={() => this.props.navigation.('NotificationTab')}
          >
            <Icon
              name="dots-vertical"
              color="#fff"
              size={24}
              style={{ marginRight: '5%' }}
            />
          </TouchableOpacity>
        </Right>
      </Header>


      <NavigationContainer>
        <Tab.Navigator style={{ backgroundColor: 'green' }}>
          <Tab.Screen name="Today" component={Todayscreen} />
          {/* <Tab.Screen name="Upcoming" component={AppointmentsScreen} /> */}
          <Tab.Screen name="Completed" component={Completed} />
        </Tab.Navigator>
      </NavigationContainer>

      {/* </View> */}
    </Container>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#03B38F',
    borderRadius: 30,
    textAlign: 'center',
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '2%'
  },
  bimage: { padding: 10, marginTop: '10%' },
  ImageBackground: { position: 'relative' },
  bannerheader: { position: 'absolute', right: '-2%', top: '10%' },
  bannerheaderTitle: {
    fontSize: 20,
    color: '#fff',
    width: '100%',
    color: 'blue',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  hurryup: {
    textAlign: 'left',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: '15%',
    marginTop: '5%',
    fontStyle: 'italic',
  },
  finddoctorsliderpart: { marginBottom: '0%', padding: 10 },
  findtextdoctor: { fontSize: 20, paddingBottom: 10 },
  caption1: { fontSize: 12, textAlign: 'center', fontWeight: 'bold' },
  caption2: {
    textDecorationLine: 'underline',
    fontSize: 15,
    color: '#03b38f',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  captionparttiile: { position: 'absolute', left: '5%', bottom: '3%' },
  captionTitle: {
    fontSize: 13,
    color: '#fff',
    width: '100%',
    color: '#fff',
    fontWeight: 'bold',
  },
  parts: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },

  finddoctor: { flexDirection: 'row' },
  findPart: {
    borderRadius: 20,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    padding: 10,
  },
  blogtitlename: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    paddingBottom: '2%',
    paddingTop: '2%',
  },

  lastsection: { padding: 10 },
  lastsectionpart: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
});
