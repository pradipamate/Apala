import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, ImageBackground, StyleSheet, Modal,FlatList,SafeAreaView,Share } from 'react-native';
import { Container, Header, Title, Content, CardItem, Footer, FooterTab, Button, Left, Right, Body, Text } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating';
import { Card } from 'react-native-cards';
import Loader from '../../Components/Loader'
// import { Content, Card, CardItem, Text } from 'native-base';

// import { Container, Header, Title, Content, Card, CardItem, Form, Item, Label, Input, Button, Thumbnail, Left, Right, Body, Text } from 'native-base';
// import styles from './styles';
import constants from '../../../constant';
import { times } from "lodash";
const BASE_URL = constants.BASE_URL;
const BASE_URL1 = constants.BASE_URL1;

export default class DoctorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: false,
            modalVisible: false,
            sObj: {},
            studid: '',
            sectionid: '',
            starCount: 3.5,
            doctorsList: [],
            loading:false,
            starCount: 3.5
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


    render() {
        return (
            <Container style={{ height: '100%' }} >
                 <Loader loading={this.state.loading} />
                    <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
                        <Left >
                            <TouchableOpacity
                                onPress={this.handleMenu}>
                                <Icon1 name='menu' style={{ color: '#fff', fontSize: 30 }} />
                            </TouchableOpacity>
                        </Left>
                        <Right>
                            <TouchableOpacity>
                                <Icon1 name='notifications-outline' color='#fff' size={25} style={{}} />
                                {/* <Icon1 name='dots-vertical' color='#fff' size={24}  /> */}
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <ScrollView >
                    <View style={styles.doctorListingPartInfo}>
                      <SafeAreaView>
                          <Card style={{ borderRadius: 20,}}>
                                    <CardItem style={styles.cardItem}>
                                            <View style={{justifyContent:'center',flexDirection:'row',width:'100%'}}>
                                                <Image
                                                        square
                                                            style={{ height: 150, width:150,borderRadius:60, }}
                                                            source={require('../../Images/userphoto.png')}
                                                        />
                                            </View>
                                            <View style={{justifyContent:'flex-start',width:'100%'}}>
                                                <Text style={styles.cardLeft4}>
                                                    <Text style={{fontWeight:'bold'}}>Name</Text> : <Text style={styles.titledyanmic} >Dr.Xyz Dr1</Text>
                                                </Text>
                                                <Text style={styles.cardLeft4}>
                                                    <Text style={{fontWeight:'bold'}}>Profession</Text> : <Text style={styles.titledyanmic} >MBBBS, MD</Text>
                                                </Text>
                                                <Text style={styles.cardLeft4}>
                                                    <Text style={{fontWeight:'bold'}}>Profession</Text> : <Text style={styles.titledyanmic} >Physican</Text>
                                                </Text>
                                                <Text style={styles.cardLeft4}>
                                                            <Text style={{fontWeight:'bold'}}>Rating</Text> : <Text style={styles.titledyanmic} ><StarRating
                                                        // starStyle={{ alignSelf: "flex-end", marginRight: "5%" }}
                                                        starSize={18}
                                                        fullStarColor="#ffe100"
                                                        disabled={false}
                                                        maxStars={5}
                                                        rating={this.state.starCount}
                                                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                    /></Text>
                                                </Text>
                                                <Text style={styles.cardLeft4}>
                                                 <Text style={{fontWeight:'bold'}}>Reg.id</Text> : <Text style={styles.titledyanmic} >12335</Text></Text>
                                                    <Text style={styles.cardLeft4}>
                                                        <Text style={{fontWeight:'bold'}}>Total Experince</Text> : <Text style={styles.titledyanmic} > 
                                                        <Text style={styles.titledyanmic} >6 Year </Text></Text>
                                                </Text>
                                            <View style={{ flexDirection: "row" }}>
                                            <View>
                                                <Text style={{ fontWeight: "bold" }}>Speaks : <Text style={styles.titledyanmic} >English, Hindi</Text></Text>
                                            </View>
                                            </View>
                                            <Text style={styles.cardLeft4}><Text style={{fontWeight:'bold'}}>Video Fees</Text> : <Text style={styles.titledyanmic} >     
                                                <Icon
                                                    name='rupee'
                                                    size={13}
                                                    type='material-community'
                                                />300</Text> </Text>
                                            <Text style={styles.cardLeft4}><Text style={{fontWeight:'bold'}}>Voice Fees</Text> : <Text style={styles.titledyanmic} >  
                                               <Icon
                                                    name='rupee'
                                                    size={13}
                                                    type='material-community'
                                                />300</Text></Text>
                                            <Text style={styles.cardLeft4}><Text style={{fontWeight:'bold'}}>Chat Fees</Text> : <Text style={styles.titledyanmic} > 
                                                <Icon
                                                    name='rupee'
                                                    size={13}
                                                    type='material-community'
                                                />300</Text>
                                              </Text>
                                         </View>
                                    </CardItem>
                                </Card>
                            </SafeAreaView>
                </View>
            </ScrollView>
        </Container>
        )
    }
}


const styles = StyleSheet.create({
    doctorListingPartInfo:{marginHorizontal:'3%'},
    titledyanmic:{ color: '#03b38f', fontWeight: "bold",fontSize:15 },
    card: { flex: 0, backgroundColor: '#fff'},
    cardItem: {
       flexDirection:'column',
     borderRadius:10, shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
        width: 3,
        height: 3
    },
    elevation: 5,
    shadowOpacity: 0.21, width:'100%'},
      line6: {
        borderColor:'#ccc',
        borderWidth:.4,
        marginTop:'1%',
        marginBottom:'1%',
         width:'100%'
    },
});
