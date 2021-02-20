import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, ImageBackground, StyleSheet, FlatList, Switch, Alert } from 'react-native';
import { Container, Header, Title, Content, Card, CardItem, Icon, Item, Label, Button, Thumbnail, Left, Right, Body, Text } from 'native-base';
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
            morning: null,
            Afternoon: '',
            Evening: '',
            Night: '',
            selectdate: null,
            starCount: 3.5,
            data: null
        }
    }


    handleMenu = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    componentDidMount() {
        // let data = this.props.navigation.getParam("data", "")
        // console.log("data in bookingSuccess==============================", data);
        // this.setState({
        //     data: data
        // })
    }

    render() {

        var radio_props = [
            { label: 'Padmshree Clinic', value: 'Padmshree_Clinic' },
            { label: 'Sanjivini Hospital', value: 'Sanjivini_Hospital' },
            { label: 'Your Health Hospital', value: 'Other' },
        ];

        return (
            <Container style={{ backgroundColor: '#f9f9f9' }}>

                <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
                    <Left style={{ marginLeft: '2%' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('HomePage')}>
                            <Icon name='arrow-back' size={18} style={{ padding: 0, color: '#fff' }} />
                        </TouchableOpacity>
                    </Left>
                    <Right>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
                        //  onPress={() => this.props.navigation.('NotificationTab')}
                        >
                            <Icon3 name='star-outline' color='#fff' size={24} style={{ marginRight: '8%' }} />
                            <Icon3 name='share-variant' color='#fff' size={22} style={{ marginRight: '8%' }} />
                            <Icon3 name='bell' color='#fff' size={22} style={{ marginRight: '8%' }} />
                            <Icon3 name='dots-vertical' color='#fff' size={24} />
                        </TouchableOpacity>
                    </Right>

                </Header>
                <ScrollView>
                    <View style={{ backgroundColor: '#13979f', justifyContent: 'center', flexDirection: 'column', paddingBottom: '10%' }}>
                        <View style={{ justifyContent: 'center', flexDirection: "row" }}>
                            <Image
                                square
                                style={{ height: 150, width: 150, resizeMode: 'contain' }}
                                //resizeMethod='cover'
                                source={require('../../Images/book_appointments_sucessfully.png')}
                            />
                        </View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}> Appointments Booked {"\n"} Sucessfully</Text>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginTop: '2%' }}>Your Appointments is confirmed Sucessfully with 20% Discount.Happy Treatment</Text>
                    </View>

                    <View style={{ marginHorizontal: '5%', marginTop: '5%' }}>
                        <Card style={{ borderRadius: 20, }}>
                            <CardItem style={styles.cardItem}>
                                <Left style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Image
                                            square
                                            style={{ height: 90, width: 90, borderRadius: 60, }}
                                            source={require('../../Images/SkinProblem.png')}
                                        />
                                    </View>
                                    {this.state.data !== null && this.state.data != {} ?
                                        <View style={{ marginLeft: '3%' }}>
                                            <Text style={styles.cardLeft4}>{this.state.data.fullname}</Text>
                                            <Text style={styles.cardLeft4}>{this.state.data.qualification[0].qualified_name} </Text>
                                            <StarRating
                                                starSize={20}
                                                fullStarColor="#ffe100"
                                                disabled={false}
                                                maxStars={5}
                                                rating={this.state.data.rating}
                                            // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                            />
                                            <Text style={styles.cardLeft4}>{this.state.data.uid}</Text>
                                        </View>
                                        : null}
                                </Left>
                            </CardItem>
                        </Card>
                    </View>

                    <View style={styles.section}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}> Appoinment For</Text>
                        <View style={{ marginTop: '2%' }}>
                            <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                buttonSize={10}
                                formHorizontal={true}
                                buttonInnerColor={'#03b38f'}
                                buttonOuterColor={'#03b38f'}
                                labelStyle={{ fontSize: 15, marginLeft: '-5%' }}
                                buttonWrapStyle={{ fontSize: 10 }}
                                //buttonOuterSize={80}
                                mode="date"
                                style={{ marginRight: '-170%' }}
                                onPress={(value) => this.handleGender(value)} />
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Date & Time</Text>
                        <Text>Tommorrow ,i.e 23 july,2020,1:10PM </Text>
                        <Text style={{ color: 'grey' }}>Appoinment is One Day</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Hospital & Pratice Information</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text>Padmshree Clinic </Text>
                                <Text style={{ color: 'grey' }}>123 wing,a ward ,1st floor pune</Text>
                            </View>
                            <View>
                                <Image
                                    square
                                    style={{ height: 50, width: 50, resizeMode: 'contain' }}
                                    source={require('../../Images/Copy.png')}
                                />
                            </View>
                        </View>
                        <Text style={{ color: '#03b38f', fontWeight: 'bold', fontSize: 18 }}>GET Direction</Text>
                    </View>
                    <View style={{ marginHorizontal: '5%' }}>
                        <TouchableOpacity style={styles.okbutton}
                            onPress={() => this.props.navigation.navigate('MyAppoinment')}>
                            <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>BACK TO My APPOINTMENTS</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Container>
        )
    }

}
const styles = StyleSheet.create({
    //Container:{  padding: 10},
    bground: {
        height: 200, height: '10%'
    },
    card: { flex: 0, backgroundColor: '#fff' },
    cardItem: {
        borderRadius: 10,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 5,
        shadowOpacity: 0.21
    },
    line6: {
        borderColor: '#ccc',
        borderWidth: .4,
        marginTop: '1%',
        marginBottom: '1%',
        width: '100%'
    },
    titles: {
        fontWeight: 'bold',
        color: "#03b38f",

    },
    ImageBackground: { position: 'relative', justifyContent: 'center', flexDirection: 'row' },
    bannerheader: { position: 'absolute', right: '-6%', top: '15%' },
    bannerheaderTitle: { fontSize: 20, width: '100%', color: 'blue', fontWeight: 'bold', fontStyle: 'italic', marginLeft: '-30%' },
    hurryup: { textAlign: 'left', color: 'red', fontWeight: 'bold', fontSize: 20, marginLeft: '20%', marginTop: '5%', fontStyle: 'italic' },
    okbutton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#03b38f',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: '4%',
        marginTop: '4%',
        padding: 10,
        width: '100%', marginHorizontal: '5%'
    },
    payonline: {
        fontWeight: 'bold',
        fontSize: 30, fontStyle: 'italic', marginTop: '25%', marginLeft: '-10%'
    },
    cardLeft4: { fontWeight: 'bold', marginTop: '1%', width: '100%', marginVertical: '4%' },
    section: { backgroundColor: '#fff', marginTop: '5%', padding: "5%", }
})