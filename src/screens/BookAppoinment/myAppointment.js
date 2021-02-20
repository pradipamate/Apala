import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, ImageBackground, StyleSheet, FlatList, Switch, Alert } from 'react-native';
import { Container, Header, Title, Content, Card, CardItem,Icon, Item, Label, Button, Thumbnail, Left, Right, Body, Text } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements'
import { AsyncStorage } from 'react-native';
import HomePageServices from '../../Services/HomePageServices/HomePageServices'
import RadioForm from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker'

// import AsyncStorage from '@react-native-community/async-storage';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import styles from './styles';
import constants from '../../../constant';
//const BASE_URL = constants.BASE_URL;
//const BASE_URL1 = constants.BASE_URL1;

export default class ProcessTopay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MyAppointment:[
                {
                    id: 1,
                    praticedby:'Dr.XYZ1',
                    treatementof:'ABC',
                    practiceat:'padamshree Clinic ',
                    dateandTime:'Tomarrow,i.e 23rd June 2020 1pm',
                    appointmentStatus:'One Day'
                },
                {
                    id: 2,
                    praticedby:'Dr.XYZ2',
                    treatementof:'ABC',
                    practiceat:'padamshree Clinic ',
                    dateandTime:'Tomarrow,i.e 23rd June 2020 1pm',
                    appointmentStatus:'One Day'

                },
                {
                    id: 3,
                    praticedby:'Dr.XYZ',
                    treatementof:'ABC',
                    practiceat:'padamshree Clinic ',
                    dateandTime:'Tomarrow,i.e 23rd June 2020 1pm',
                    appointmentStatus:'One Day'

                }
            ],
        }
    }


    renderMyAppointment = ({ item }) => {
        return (
            <>
                <Card id={item.id} style={{ borderRadius: 20,}} >
                            <CardItem style={styles.cardItem}>
                                <View style={{flexDirection:'column',flex: 1,flexWrap:'nowrap'}}>
                                    <View style={{ flexDirection: 'row'}}>
                                            <View>
                                                <Image
                                                        square
                                                            style={{ height: 90, width:90,borderRadius:60, }}
                                                            source={require('../../Images/userphoto.png')}
                                                        />
                                            </View>
                                            <View style={{marginLeft:'3%'}}>  
                                                <Text style={styles.cardLeft4}><Text style={styles.titlecolor}>Practice By </Text>{item.praticedby}</Text>
                                                <Text style={styles.cardLeft4}><Text style={styles.titlecolor}>Treatement of </Text>{item.treatementof} </Text>
                                                <Text style={styles.cardLeft4}><Text style={styles.titlecolor}>Praticed at </Text>{item.practiceat} </Text> 
                                            </View>
                                    </View>
                                <View style={styles.line}></View>
                                    <View style={{flexDirection:'row'}}>
                                        <View>
                                            <Text style={styles.cardLeft4}><Text style={styles.titlecolor}>Date & Time </Text></Text>
                                            <Text  style={styles.cardLeft4}>{item.dateandTime}</Text>
                                            <Text style={styles.cardLeft4}><Text style={styles.titlecolor}>Appointment is in {item.appointmentStatus} </Text></Text>
                                        </View>
                                        <View style={{justifyContent:'flex-end',flexDirection:'column',}}>
                                            <Image
                                                square
                                                    style={{ height: 70, width:70,resizeMode:'contain'}}
                                                    source={require('../../Images/scheduled.png')}
                                                />
                                        </View>
                                    </View>    
                                </View>
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
                                onPress={() => this.props.navigation.navigate('HomePage')}>
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
                    <View style={{marginHorizontal:'2%',marginTop:'5%'}}>
                            <FlatList
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}   
                               // style={{ marginBottom: '1%'}}
                                data={this.state.MyAppointment}
                                renderItem={this.renderMyAppointment}
                                keyExtractor={item => item.id}></FlatList>
                  </View>
                </ScrollView>
            </Container>
        )
    }

}
const styles = StyleSheet.create({
    line: {
        borderColor:'#ccc',
        borderWidth:.4,
        marginTop:'1%',
        marginBottom:'1%',
         //width:'100%'
    },
    //Container:{  padding: 10},
bground:{
   height:200,height:'10%'
    },
// card: { flex: 0, backgroundColor: '#fff'},
cardItem: { borderRadius:10, shadowColor: "rgba(0,0,0,1)",
shadowOffset: {
    width: 3,
    height: 3
},
elevation: 5,
shadowOpacity: 0.21},
titles:{
    fontWeight:'bold',
    color:"#03b38f",
// flexDirection:'column'
},

cardLeft4: { fontWeight: 'bold', width: '100%',marginTop:'1%',marginBottom:'1%' },
section:{backgroundColor:'#fff',marginTop:'5%',padding: "5%",},
titlecolor:{color:'grey'}
})