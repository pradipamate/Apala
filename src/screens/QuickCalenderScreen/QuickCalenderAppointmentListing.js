import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, ImageBackground, StyleSheet, FlatList, Switch, Alert } from 'react-native';
import { Container, Header, Title, Content, Card, CardItem,Icon, Item, Label, Button, Thumbnail, Left, Right, Body, Text } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';


export default class QuickCalenderAppointmentListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MyAppointment:""
        }
    }

    async componentDidMount() {
            let Selecteddate = this.props.navigation.getParam('Selecteddate', '');
            let formatedDate="date="+Selecteddate
            // let SelectedDate=Selecteddate;
            console.log('Selecteddate@E$$$$$$$$$$$$$$$$$$$$$$$$$$$$???', formatedDate);
            let token = this.props.navigation.getParam('token', '');
            console.log("tokenonQICKKKKKKKKKKKK######",token);
            // getOnlineConsultsData()
            // console.log(
            //   'Token>>>>>>>>>>>>>555555>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
            //   props.navigation.getParam('token'),
            // );
            await fetch(
            'https://svcaapkadoctor.azurewebsites.net/api/users/bookings/consultants?'+ formatedDate,
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
             console.log('AppointmentsFFFFFFFFFFFFFFFFFFF@@@@@@@@@@@@@@@@@@@@@@', response);
                // let business=[];
                this.setState({
                    MyAppointment:response
                })
               // setAppointments(response);
            })

            .catch((error) => {
                console.error(error);
            });
    }

    renderItems = ({ item }) => {
       let ImagePath = item.infoData.image;
        return (
            <>
                <Card style={{borderRadius: 20}}>
                        <CardItem style={{borderRadius: 40, marginHorizontal: '0%'}}>
                        <Left style={{flexDirection: 'row'}}>
                            <Image
                            square
                            style={{
                                height: 70,
                                width: 70,
                                borderRadius: 35,
                                backgroundColor: '#f3f3f3',
                            }}
                            source={{uri: ImagePath}}
                            />
                            <View>
                            <Text style={{fontSize: 16, fontFamily: 'bold',textAlign:'left',width:'100%'}}>
                                {item.infoData.name}{' '}
                            </Text>
                            {item.businesses !== null ? (
                                <Text
                                style={{
                                    fontSize: 12,
                                    flexWrap: 'wrap',
                                    width: '100%',
                                    marginVertical: '1%',
                                }}>
                                Appointment At{' '}
                                <Text style={{color: '#03b38f', fontWeight: 'bold'}}>
                                    {item.businesses.name}
                                </Text>{' '}
                                </Text>
                            ) : null}
                            <Text
                                style={{
                                fontSize: 12,
                                flexWrap: 'wrap',
                                width: '100%',
                                marginVertical: '1%'
                                }}>
                                Symptoms{' '}
                                <Text style={{color: '#03b38f', fontWeight: 'bold'}}>
                                {item.symptom}
                                </Text>{' '}
                            </Text>

                            <Text
                                style={{
                                fontSize: 12,
                                flexWrap: 'wrap',
                                width: '100%',
                                marginVertical: '1%',
                                }}>
                                Booking ID :{' '}
                                <Text style={{color: '#03b38f', fontWeight: 'bold'}}>
                                {item.sevice_booking_id}
                                </Text>{' '}
                            </Text>

                            <Text
                                style={{
                                fontSize: 12,
                                flexWrap: 'wrap',
                                width: '100%',
                                marginVertical: '1%',
                                }}>
                                Slot ID :{' '}
                                <Text style={{color: '#03b38f', fontWeight: 'bold'}}>
                                {item.slot_id}
                                </Text>{' '}
                            </Text>

                            <Text
                                style={{
                                fontSize: 12,
                                flexWrap: 'wrap',
                                width: '100%',
                                // color: '#03b38f',
                                }}>
                                Date Time : <Text style={{color: '#03b38f'}}>{item.appointment_datetime}</Text>
                            </Text>
                            </View>
                        </Left>
                        <Right></Right>
                        </CardItem>
                    </Card>
            </>
        );
    };


    handleMenu = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    }
   
    render() {
        return (
            <Container style={{backgroundColor:'#f9f9f9'}}> 
                <ScrollView>    
                    <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
                        <Left style={{ marginLeft: '2%' }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('QuickCalenderScreen')}>
                                <Icon name='arrow-back' size={18} style={{ padding: 0, color: '#fff' }} />
                            </TouchableOpacity>
                        </Left>
                        <Right>
                            <TouchableOpacity style={{ flexDirection: 'row',justifyContent:'flex-end' }}
                            //  onPress={() => this.props.navigation.('NotificationTab')}
>
                                <Icon3 name='star-outline' color='#fff' size={24} style={{ marginRight: '8%' }} />
                                <Icon3 name='share-variant' color='#fff' size={22} style={{ marginRight: '8%' }} />
                                <Icon3 name='bell' color='#fff' size={22} style={{ marginRight: '8%' }} />
                                <Icon3 name='dots-vertical' color='#fff' size={24}  />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                        <View>
                            {this.state.MyAppointment.length > 0 ?
                            <FlatList
                            style={{marginVertical: '3%',marginHorizontal: '3%'}}
                            data={this.state.MyAppointment}
                            renderItem={this.renderItems}
                            keyExtractor={(item) => item.id}></FlatList>
                        :<View style={styles.makecenter}><Text style={styles.heading}>No Appointment Found</Text></View>}
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
makecenter:{
    justifyContent:"center",
    alignItems: 'center',
    alignSelf: 'center'
    //height:'100%',
    //width:'100%'
    },
heading:{
    fontWeight:'bold',
    color:"#03b38f",
    fontSize:18,
    flexDirection:'column',
    justifyContent: 'center', 
   
},
// cardLeft4: { fontWeight: 'bold', width: '100%',marginTop:'1%',marginBottom:'1%' },
// section:{backgroundColor:'#fff',marginTop:'5%',padding: "5%",},
// titlecolor:{color:'grey'},
  //Container:{  padding: 10},
  bimage: {padding: 10, marginTop: '10%'},
  ImageBackground: {position: 'relative'},
  bannerheader: {position: 'absolute', right: '-2%', top: '10%'},
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
  finddoctorsliderpart: {marginBottom: '0%', padding: 10},
  findtextdoctor: {fontSize: 20, paddingBottom: 10},
  caption1: {fontSize: 12, textAlign: 'center', fontWeight: 'bold'},
  caption2: {
    textDecorationLine: 'underline',
    fontSize: 15,
    color: '#03b38f',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  captionparttiile: {position: 'absolute', left: '5%', bottom: '3%'},
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

  finddoctor: {flexDirection: 'row'},
  findPart: {
    borderRadius: 20,
    shadowOffset: {width: 0, height: 5},
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
  lastsection: {padding: 10},
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


})