import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity,Image,ImageBackground, StyleSheet,Modal} from 'react-native';
import { Container, Header, Title, Content,CardItem, Footer, FooterTab, Button, Left, Right, Body, Text,Textarea} from 'native-base';
import { CheckBox } from 'react-native-elements'
import { DrawerActions } from 'react-navigation-drawer';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import StarRating from 'react-native-star-rating';
import { Accordion } from "native-base";
import { Card } from 'react-native-cards';
import RadioForm from 'react-native-simple-radio-button';


import AsyncStorage from '@react-native-community/async-storage';
// import { Content, Card, CardItem, Text } from 'native-base';
// import { Container, Header, Title, Content, Card, CardItem, Form, Item, Label, Input, Button, Thumbnail, Left, Right, Body, Text } from 'native-base';
// import styles from './styles';
import constants from '../../../constant';
const BASE_URL = constants.BASE_URL;
const BASE_URL1 = constants.BASE_URL1;

export default class AskQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: false,
            modalVisible: false,
            sObj:{},
            studid:'',
            sectionid:'',
            starCount: 3.5
        }
    }

   async componentDidMount(){
    //this.props.navigation.addListener('willFocus', this.load)
    //const uid=await AsyncStorage.getItem('id')
    //console.log(" @@##$ data???",uid);
    // this.getStudent(uid);
            this.setState({
                modalVisible:true
            })

    }

    load=async()=>{
        
    }


    // getStudent=(uid)=>{
       
    //     fetch("https://online-edu.in/students/api/student/"+uid, {
    //             method: 'GET',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
                
    //             })
    //             .then(response => response.json())
    //             .then((response) => {
    //             let sdata=response
    //             console.log('sdata',sdata)
    //             let details=sdata.login_detail;
    //             this.setState({sObj:details,studid:sdata.id,sectionid:sdata.section_id})
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             })
    // }



    onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
      }
     
    

    handleMenu = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    }
   
    
    render() {
        var radio_props = [
            {label: 'Padmshree Clinic', value: 'Padmshree_Clinic' },
            {label: 'Sanjivini Hospital', value: 'Sanjivini_Hospital' },
            {label: 'Your Health Hospital', value: 'Other' },
          ];
      
        return (
            <Container style={{height:'100%'}} >
                <ScrollView>
                  <Header  style={{ borderBottomWidth: 0.4 ,backgroundColor:'#03b38f'}}>
                    <Left >
                        <TouchableOpacity
                            onPress={this.handleMenu}>
                            <Icon1 name='menu' style={{ color: '#fff',fontSize:30 }} />
                        </TouchableOpacity>
                    </Left>
                    <Right>
                     <TouchableOpacity>
                         <Icon1 name='notifications-outline' color='#fff' size={25} style={{}} />
                        </TouchableOpacity>
                    </Right>
                </Header>

             <Modal
                        style={styles.modal}
                        animationType="slide"
                        coverScreen={true}
                        backdropOpacity={0.70}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        }} >
                        <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{position:'absolute',right:'5%',top:'2%'}}>
                                        <Icon
                                                name='times'
                                                size={25}
                                                color='#03b38f'
                                                type='material-community'
                                                onPress={() => this.setState({modalVisible:!this.state.modalVisible})}
                                            />
                                    </View>
                                    <View style={{marginTop:'5%'}}>
                                        <View style={styles.ImageBackground} >
                                                <Image resizeMode='contain'  
                                                                style={{width:250,height:200,borderRadius:20}}
                                                                source={require('../../Images/Booknow.png')}/>
                                        </View>
                                    </View>
                               
                               <View style={{padding:0,textAlign:'center',marginHorizontal:'5%'}}>

                                    <View style={{marginBottom:5,marginTop:5}}>
                                        <Text style={{fontWeight:'bold',fontSize:13}}>Ask your Question to the Best Specilist Doctors in the City</Text>
                                    </View>
                                   
                                    <View style={styles.line}></View>

                                    <View style={{marginBottom:5,marginTop:5}}>
                                        <Text style={{fontWeight:'bold',fontSize:13}}>What issues problem you are facing? please Elaborate</Text>
                                    </View>

                                    <Textarea rowSpan={3} bordered placeholder="Type Your Problems or issues" />

                                    <View style={{marginBottom:5,marginTop:5}}>
                                        <Text style={{fontWeight:'bold',fontSize:12,color:'red'}}>Note: All Question are throrougly processed, please avoid any kind of abusive language,threats,etc</Text>
                                    </View>

                                    <View style={{marginBottom:5,marginTop:5}}>
                                        <Text style={{fontWeight:'bold',fontSize:12}}>Note:Your Question will be displayed to respective Specilist you choose, Our Doctors will reach out to you in the Discussion Section  </Text>
                                    </View>
                                    <View style={styles.line} />
                                    <View style={{justifyContent:'center',flexDirection:'row',padding:8}}>
                                        <TouchableOpacity style={{backgroundColor:'#03b38f',padding:8,borderRadius:10}}>
                                            <Text style={{ color: "#fff", padding: 5,fontWeight:'bold' }}>Submitt</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                <View>
            </View>
    </ScrollView>
</Container>
   )
 }
}


const styles = StyleSheet.create({
    checkbox: {
        alignSelf: "center",
        marginLeft:'0%',
        backgroundColor:'red'
      },
      label: {
        marginTop: '5%',
        marginLeft:'-5%',
        fontSize:13
      },
    centeredView: {
      flex: 1,
      padding: 5,
      justifyContent: "center",
      alignItems: "center",
     // zIndex:99999,
    },
ImageBackground:{ position:'relative'},
bannerheader:{position:'absolute',right:'-6%',top:'15%'},
bannerheaderTitle:{  fontSize: 18, color: '#fff',width:'100%',color:'blue',fontWeight:'bold',fontStyle:'italic'},
hurryup:{ textAlign: 'left', color:'#000',fontWeight:'bold',fontSize: 20,marginLeft:'15%',marginTop:'5%',fontStyle:'italic' },
    modalView: {
      width:'100%',
      backgroundColor: "#fff",
      borderRadius: 20,
      alignItems: "center",
      shadowColor: "red",
      shadowOffset: {
        width: 0,
        height: 2
      },
      backgroundColor:'#f9f9f9',
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    button:{
        backgroundColor:'#03b38f',
        alignSelf:'center',
        borderRadius:30,
        marginBottom:'10%',
        //marginTop:'10%'
    },
    okbutton:{
        // flexDirection:'row',
        //justifyContent:'flex-end',
        backgroundColor:'#03b38f',
       alignSelf:'center',
        borderRadius:30,
        marginBottom:'4%',
        marginTop:'4%'
    },
    line: {
        borderColor:'#ccc',
        borderWidth:.4,
        marginTop:'1%',
        marginBottom:'1%'
         //width:'100%'
    },
    
    // modal:{
    //     zIndex: 2,
    //     position:'absolute',
    //     shadowColor: "red",
    //   shadowOffset: {
    //     width: 0,
    //     height: 2
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 3.84,
    //   elevation: 5,
    //   zIndex: 9999,
    //   backgroundColor:'red'
    // },
    secondpart:{
        marginTop:'3%',
        marginBottom:'3%',
        padding: 10,
        // backgroundColor:'#f9f9f9'
    },
      doctorlisttype:{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      firstCard: {
        // flex: 1,
        // flexDirection: "row",
        // borderWidth: 1,
        borderRadius: 2,
        borderColor: "#CCC",
        flexWrap: "nowrap",
        backgroundColor: "#FFF",
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 5,
        shadowOpacity: 0.21,
        shadowRadius: 0,
        borderRadius: 12,
        overflow: "hidden",
        marginTop: "2%",
        marginHorizontal: "3%",
        marginBottom:'10%',
        padding: 10,
        zIndex: 0
        // height: hp('55%')
    },cardItemImagePlace: {
        backgroundColor: "#ccc",
        height: 85,
        width: 85,
        // margin: 16,
        borderRadius: 100,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        // elevation: 5,
        shadowOpacity: 0.21,
        shadowRadius: 0,
        marginVertical: "5%",
        marginHorizontal: "5%"
    },
    text3: {
        justifyContent: "flex-start",
        marginTop: "4%",
        fontFamily: "open-sans-regular",
        fontWeight: "bold",
        fontSize: 16,
        // marginLeft: "5%"
    },
    text5: {
        fontFamily: "pt-sans-regular",
        color: "#757575",
        // marginHorizontal: "5%",
        fontSize: 14
    },
    text4: {
        alignSelf: "auto",
        fontFamily: "open-sans-regular",
        color: "rgba(3,179,143,1)",
        // marginHorizontal: "5%",
        fontWeight: "bold",
        fontSize: 15
    },
    text6: {
        alignSelf: "flex-end",
        fontWeight: "bold",
        // marginVertical: "2%",
        // marginHorizontal: "5%",
        color: "rgba(3,179,143,1)",
        width: wp('25%')
    },
    icon1: {
        marginHorizontal: "5%",
        marginVertical: "3%",
        color: "#029400",
        fontWeight:'bold'
    },
    button1: {
        justifyContent: "center",
        backgroundColor: "#03b38f",
        height: hp("8%"),
        width: wp("29%"),
        borderRadius: 10,
        marginHorizontal: "1%",
        //marginVertical: "3%"
    },
    text_id:{ color: "#525151", marginHorizontal: "15%",fontWeight:'bold' },
    checkbox:{

    }
  });