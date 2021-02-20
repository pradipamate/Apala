import React, { Component, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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
import { Icon } from 'native-base';
import {
  Container,
  Header,
  Title,
  Card,
  CardItem,
  Left,
  Right,
  Body,
} from 'native-base';
import ImagePath from '../../Services/ImagePath';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import jwt_decode from "jwt-decode";
import Loader from '../../Components/Loader'
import SidebarServices from '../../Services/ProfileServices/ProfileServices'




function VisitsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Text style={{ color: '#03b38f', fontWeight: "bold", fontSize: 18 }}>Coming Soon!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function App(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [consults, setConsults] = useState([]);
  const [loading, startloader] = useState(false)
  const [appointments, setAppointments] = useState([]);

  const [modalVisible, SetmodalVisible] = useState(false)
  const [openPrescription, setopenPrescription] = useState(false)

  useEffect(() => {
    getAppointmentData();
    getOnlineConsultsData();
   
  }, []);

 


  const checkSerive = (item) => {
    //console.log("event.target.value",item);

    if (item.item.service_id == "video" || item.item.service_id == "appointment") {
      props.navigation.navigate('Videocall', { item: item })
    }
    else if (item.item.service_id == "chat") {
      props.navigation.navigate('Chat', { item: item })
    }
    else {

    }
  }

  //   Appointsment///
  function getAppointmentData() {
    startloader(true)
    let token = props.navigation.getParam('token', '');
    console.log("Tokken=sdfsdffff==========", token);
    var decoded = jwt_decode(token)
    // console.log("decodeERRRR//RR===========",decoded.role);

    AsyncStorage.setItem("Role", decoded.role)
    let TodayDate = new Date();
    let Selectedfdate = moment(TodayDate, 'DD/MM/YYYY');
    let modifieddate = Selectedfdate.format('MM/DD/YYYY')
    let formatedDate = "date=" + modifieddate


    fetch(
      'https://svcaapkadoctor.azurewebsites.net/api/users/bookings/consultants?' + formatedDate,
      // 'https://svcaapkadoctor.azurewebsites.net/api/users/bookings/consultants?pageNumber=3&date=11/10/2020',

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
        //console.log(response)
        setAppointments(response);
        startloader(false)
      })

      .catch((error) => {
        console.error(error);
      });
  }





  function renderItems1(item) {
    //console.log('itemm', item); //image
    let url = ImagePath + item.item.infoData.image;

    return (
      <Container>
        <Loader loading={loading} />
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
                <Text style={{ fontSize: 16, fontFamily: 'bold' }}>
                  {item.item.infoData.name}{' '}
                </Text>
                {item.item.businesses !== null ? (
                  <Text
                    style={{
                      fontSize: 12,
                      flexWrap: 'wrap',
                      width: '100%',
                      marginVertical: '2%',
                    }}>
                    Appointment At{' '}
                    <Text style={{ color: '#03b38f', fontWeight: 'bold' }}>
                      {item.item.businesses.name}
                    </Text>{' '}
                  </Text>
                ) : null}
                <Text
                  style={{
                    fontSize: 12,
                    flexWrap: 'wrap',
                    width: '100%',
                    marginVertical: '2%',
                  }}>
                  Symptoms{' '}
                  <Text style={{ color: '#03b38f', fontWeight: 'bold' }}>
                    {item.item.symptom}
                  </Text>{' '}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    flexWrap: 'wrap',
                    width: '100%',
                    marginVertical: '2%',
                  }}>
                  Booking ID :{' '}
                  <Text style={{ color: '#03b38f', fontWeight: 'bold' }}>
                    {item.item.sevice_booking_id}
                  </Text>{' '}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    flexWrap: 'wrap',
                    width: '100%',
                    marginVertical: '2%',
                  }}>
                  Slot ID :{' '}
                  <Text style={{ color: '#03b38f', fontWeight: 'bold' }}>
                    {item.item.slot_id}
                  </Text>{' '}
                </Text>
                <Text style={{ fontSize: 12, width: '100%', marginVertical: '2%', }}>Date: <Text style={{ fontSize: 12, color: '#03b38f' }}>{moment(item.item.appointment_datetime).format('DD/MM/YYYY')}</Text>{' '}
                </Text>
                <Text style={{ fontSize: 12, width: '100%', marginVertical: '2%', }}>Time: <Text style={{ fontSize: 12, color: '#03b38f' }}>{moment(item.item.appointment_datetime).format('H:mma')}</Text>{' '}
                </Text>
                <TouchableOpacity style={styles.button2} onPress={() => checkSerive(item)} >
                  <Text style={{ fontSize: 16, color: '#fff' }}>{item.item.service_id}</Text>
                </TouchableOpacity>
              </View>
            </Left>
            <Right></Right>
          </CardItem>
        </Card>
      </Container>
    );
  }

  function AppointmentsScreen() {
    return (

      <FlatList
        key={(item) => item.id}
        style={{ marginVertical: '3%', marginHorizontal: '3%' }}
        data={appointments}
        renderItem={renderItems1}
        keyExtractor={(item) => item.id}></FlatList>

    );
  }


  const checkSeriveGetOnline = (item) => {
    // console.log("event.target.value--------------->>>",item);
    AsyncStorage.setItem("userName", item.item.infoData.name);
    AsyncStorage.setItem("userguid", item.item.to_guid);
    AsyncStorage.setItem("fromguid", item.item.from_guid)
    console.log("doc guid---------------->>>", item.item.from_guid)


    if (item.item.service_id == "video") {
      props.navigation.navigate('DoctorVideocall', { item: item })
    }
    else if (item.item.service_id == "chat") {
      props.navigation.navigate('DoctorChat', { item: item })
    }
    else {
      props.navigation.navigate('DoctorVideocall', { item: item })
    }
  }


  //
  function getOnlineConsultsData() {
    let token = props.navigation.getParam('token', '');
    let TodayDate = new Date();
    let Selectedfdate = moment(TodayDate, 'DD/MM/YYYY');
    let modifieddate = Selectedfdate.format('MM/DD/YYYY')
    let formatedDate = "date=" + modifieddate
    // );

    // console.log("formatedDate#%%%%%%%%%%%%%%%%%",formatedDate)


    fetch(
      'https://svcaapkadoctor.azurewebsites.net/api/users/bookings/consultants?' + formatedDate,
      // 'https://svcaapkadoctor.azurewebsites.net/api/users/bookings/consultants?' + 'pageNumber=' + 3 + '&date=' + 11 / 10 / 2020,

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
        // console.log(response)

        setConsults(response);
        startloader(false)
      })

      .catch((error) => {
        console.error(error);
      });
  }
  const addPrescription = (item) => {
    let token = props.navigation.getParam('token', '');
    props.navigation.navigate("AddPrescription", { patientDetails: item, token: token })
  }
  const closeprescriptionModal = () => {
    setopenPrescription(false)
  }
  function renderItems(item) {
    // console.log('itemm', item); //image
    let url = ImagePath + item.item.infoData.image;

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
              <Text style={{ fontSize: 12, marginVertical: '2%', marginVertical: '2%', }}>Symptoms <Text style={{ color: '#03b38f' }}>{item.item.symptom}</Text> </Text>
              {/* <Text style={{fontSize: 12,width:'100%'}}>Date Time : <Text style={{fontSize: 12,color:'#03b38f' }}>{item.item.appointment_datetime}</Text>{' '}
                </Text> */}
              <Text style={{ fontSize: 12, width: '100%', marginVertical: '2%', }}>Date: <Text style={{ fontSize: 12, color: '#03b38f' }}>{moment(item.item.appointment_datetime).format('DD/MM/YYYY')}</Text>{' '}
              </Text>
              <Text style={{ fontSize: 12, width: '100%', marginVertical: '2%', }}>Time: <Text style={{ fontSize: 12, color: '#03b38f' }}>{moment(item.item.appointment_datetime).format('H:mma')}</Text>{' '}
              </Text>
              <TouchableOpacity style={styles.button2} onPress={() => checkSeriveGetOnline(item)} >
                <Text style={{ fontSize: 16, color: '#fff' }}>{item.item.service_id}</Text>
              </TouchableOpacity>
            </View>
          </Left>

          <Right></Right>
          <View>
            <TouchableOpacity onPress={() => addPrescription(item)}>
              <Icon2 name="file-plus" size={24} color="#03b38f" ></Icon2>
            </TouchableOpacity>

          </View>
        </CardItem>
      </Card>
    );
  }
  function OnlineConsultScreen() {
    return (
      <View>
        <FlatList
          key={(item) => item.id}
          style={{ marginVertical: '3%', marginHorizontal: '3%' }}
          data={consults}
          renderItem={renderItems}
          keyExtractor={(item) => item.id}></FlatList>

        {/* <Modal
                //style={styles.modal}
                animationType="slide"
                coverScreen={true}
                backdropOpacity={0.70}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }} >
                <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{position:'absolute',right:'5%',top:'2%'}}>
                                <Icon2
                                        name='times'
                                        size={25}
                                        color='#03b38f'
                                        type='material-community'
                                        onPress={SetmodalVisible(false)}
                                    />
                            </View>
                            <View style={{marginTop:'5%'}}>
                              <Text>dfsdfsdfsdfdf</Text>
                            </View>
                    </View>
                </View>
            </Modal> */}

      </View>
    );
  }

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  // const logoutmodal = () => SetmodalVisible((previousState) => !previousState);

  // const logoutmodal=()=>{
  //   console.log("asdasdasdsd")
  //   SetmodalVisible(true)
  // }






  return (
    <Container>
      <Loader loading={loading} />
      <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
        <Left>
          <Title
            style={{
              color: '#fff',
              marginLeft: '10%',
              fontSize: 16,
              width: '100%',
            }}>
            Aapka Doctor{' '}
          </Title>
        </Left>

        <Right style={{ flexDirection: 'row' }}>
          <Switch
            style={{ marginRight: '5%' }}
            trackColor={{ false: '#f2f2', true: '#333' }}
            thumbColor={isEnabled ? '#fff' : '#fff'}
            ios_backgroundColor="#999"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />

          <TouchableOpacity
          //  onPress={() => this.props.navigation.('NotificationTab')}
          >
            <Icon2
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
            <Icon2
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
          <Tab.Screen name="Online Consults" component={OnlineConsultScreen} />
          <Tab.Screen name="Appointments" component={AppointmentsScreen} />
          <Tab.Screen name="Visits" component={VisitsScreen} />
        </Tab.Navigator>
      </NavigationContainer>

      {/* </View> */}
    </Container>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  button2: {
    backgroundColor: '#03B38F',
    borderRadius: 30,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    //marginTop:'2%'
    marginHorizontal: '5%'
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
  button: {
    backgroundColor: '#03b38f',
    alignSelf: 'center',
    borderRadius: 30,
    marginBottom: '10%',
    marginTop: '10%',
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
    width: '100%'
  },
  centeredViewMyCases: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: '100%'
  },
  modalViewmycase: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    paddingLeft: 0,
    alignItems: "center",
    // alignItems: "flex-start",
    shadowColor: "#000",
    width: '96%',
    // height: '60%',
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5
  },
});
