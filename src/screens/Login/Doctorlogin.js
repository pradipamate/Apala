import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image,Text,ImageBackground,StyleSheet, Alert} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Card, CardItem, Body, Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements'
import Modal from 'react-native-modal';
import RegistrationServices from "../../Services/RegistrationService/RegistrationServices"
import AsyncStorage  from '@react-native-community/async-storage';
import Loader from '../../Components/Loader'


export default class Login extends Component {
  constructor() {
    super();
    this.state={
      userName:"",
      userNameErrMsg:"",
      password:"",
      passwordErrMsg:"",
      loading: false
    }
  }

  

  handlemobileChange=(text)=>{
    if(text.length!=0){
      if(text.length==10 && /^[\d.]+$/.test(text)==true ){
        this.setState({
          userName:text,
          userNameErrMsg:""
        })
      }
      else{
        this.setState({
          userName:"",
          userNameErrMsg:"Enter valid mobile number."
        })
      }
    }
    else{
      this.setState({
        userName:"",
        userNameErrMsg:"Required."
      })
    }   
     
  }


  handleChangePassword=(pass)=>{
    if(pass!==""){
      if(pass.length>=8){
        this.setState({
          password:pass,
          passwordErrMsg:""
        })
      }
      else{
        this.setState({
          password:"",
          passwordErrMsg:"Password should be atleast 8 characters."
        })
      }
    }
    else{
      this.setState({
        password:"",
        passwordErrMsg:"Required."
      })
    }
  }

  handleSubmit= ()=>{
    let data={
      password:this.state.password,
      mobile:this.state.userName
    }
    // let data={
    //   password:"",
    //   mobile:""
    // }
    this.setState({
      loading: true
    })
    console.log("data in Login========>", data);

    RegistrationServices.login(data).then(response=>{
      console.log("response in login===========================================>", response.data);
      if(response){
        if(response.status==200){
          let token=response.data.token
           AsyncStorage.setItem("Token",token)
           this.setState({
             loading:false
           })
          Alert.alert("Success","Logged in successfully.")
          this.setState({
            password:"",
            passwordErrMsg:"",
            userName:0,
            userNameErrMsg:""
          })
          this.props.navigation.navigate('HomePage')

        }
      }
      else{
        this.setState({
          password:"",
          passwordErrMsg:"",
          userName:0,
          userNameErrMsg:"",
          loading:false
        })
        Alert.alert("Error","Failed to login.")
      }
    }).catch((err)=>{
      this.setState({
        password:"",
        passwordErrMsg:"",
        userName:0,
        userNameErrMsg:"",
        loading:false
      })
      console.log("err while login====>", err)
     
        Alert.alert("Error","Failed to login.")
      
    })
  }

  render() {

    return (
      <Container>
        <ScrollView>
        <Loader loading={this.state.loading} />
          <View style={{marginHorixzontal:'0%'}}>
              <View style={styles.backgroundimage}>
                <ImageBackground source={require('../../Images/login.png')} style={styles.bground} resizeMode='cover'>
                      <View style={styles.help}>
                        <Text style={styles.helptext}>HELP</Text>
                      </View>
                      <View  style={styles.logo}>
                          <Image
                          style={styles.image1}
                          source={require('../../Images/logo.png')}  />  
                     </View>
                        <View style={styles.Viewcardpart}>
                            <Card style={styles.Card}>
                                    <CardItem style={styles.carditem}>
                                        <Body style={styles.Body}>
                                            <Text style={styles.cardtitle}>LOGIN TO</Text>
                                                 <Input
                                                    containerStyle={{ height: 40, marginTop: 20 }}
                                                    placeholder='Mobile Number/Email*'
                                                    style={{fontSize:14}} 


                                                    leftIcon={
                                                      <Icon
                                                          name='user-circle-o'
                                                          size={20}
                                                          color='#03b38f'
                                                          type='material-community'
                                                      />
                                                  }
                                                  //leftIconContainerStyle={{ marginLeft: -1 }}
                                                    inputContainerStyle={{ borderWidth: 1,paddingLeft:'2%',borderRadius:10,borderColor:'#03b38f'}}
                                                    leftIconContainerStyle={{ marginLeft: 2 }}
                                                    // value={this.state.userName}
                                                    onChangeText={text => this.handlemobileChange(text)}
                                                    errorMessage={this.state.userNameErrMsg}
                                                   keyboardType='numeric'
                                                />
                                                <Input
                                                    containerStyle={{ height: 40, marginTop: 30 }}
                                                    placeholder='Password*'
                                                    style={{fontSize:14}}
                                                    defaultValue={this.state.password}
                                                    leftIcon={
                                                      <Icon
                                                        name='lock'
                                                        size={20}
                                                        color='black'
                                                        color='#2DB38D'
                                                      />
                                                    }
                                                    secureTextEntry={true}

                                                    // rightIcon={
                                                    //   <Icon
                                                    //       name='eye'
                                                    //       size={20}
                                                    //       color='#03b38f'
                                                    //       type='material-community'
                                                    //   />}
                                                  //leftIconContainerStyle={{ marginLeft: -1 }}
                                                    inputContainerStyle={{ borderWidth: 1,paddingLeft:'2%',borderRadius:10,borderColor:'#03b38f' }}
                                                    leftIconContainerStyle={{ marginLeft: 2 }}
                                                  //  value={this.state.password  }
                                                    onChangeText={pass => this.handleChangePassword(pass)}
                                                    errorMessage={this.state.passwordErrMsg}
                                                   //keyboardType='phone-pad'
                                                />

                                            <TouchableOpacity style={styles.button}
                                                    onPress={() => this.handleSubmit()}>
                                            <Text style={{fontSize:16,marginVertical:'3%',color:'#fff',marginHorizontal:'38%'}}>LOGIN</Text>
                                            </TouchableOpacity>

                                            <View
                                                style={styles.lines}
                                            />
                                            <View style={styles.fpasswordpart}>
                                                  <Text style={styles.fpassword} onPress={() => this.props.navigation.navigate('ForgotPassword')}>FORGOT PASSWORD</Text>
                                            </View>
                                              
                                         </Body>
                                    </CardItem>
                              </Card>
                      </View>
                    <View  style={styles.lastoptionpart}>
                              <Text style={styles.lastoptiontext} onPress={() => this.props.navigation.navigate('Register')}>New User?</Text>  
                              <Text style={styles.lastoptiontext}><Text style={{textDecorationLine:'underline'}} onPress={() => this.props.navigation.navigate('Register')}>REGISTER</Text> | <Text style={{textDecorationLine:'underline'}} onPress={() => this.props.navigation.navigate('AlternateLoginOption')}>REGISTER WITH EMAIL / MOBILE</Text></Text>
                     </View>
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


const styles=StyleSheet.create({
// for popup onload
helptext:{
  marginRight:'5%',
  marginTop:'3%',
  color:'#03b38f',
  fontWeight:'bold',
  fontSize:24,
  //  textDecorationLine:'underline'
},
help:{
  alignItems:'flex-end',
//   position:'absolute',
// left:0,
// right:0,
// zIndex: 2
},
popupTitleview: {
  marginTop: hp('3%'),
  marginBottom: hp('4%'),
  marginRight: hp('1%'),
  flexDirection:'row',
 // flex:1,
  width:'100%',
  justifyContent:'space-between'
},
// Login page css
  image1:{ 
    height:hp('11%'),
    width:wp('45%'),
    marginLeft:'0%',
    resizeMode:'cover',
  },
   logo:{
    textAlign:'center',
    alignItems: "center" ,
    justifyContent:'center',
    flexDirection:'row',
    marginTop:'8%'
   },
   Titleview:{
     marginTop:hp('3%'),
     marginBottom:hp('4%'),
   },
   
    Card:{
        textAlign:'center',
        textAlign:'center',
        borderRadius:20,
    },
    Viewcardpart:{
        marginTop:'30%',
        padding: '5%',
       // marginBottom:'200%'
    },
    Body:{
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center'
    },
     bground:{
        height:hp('100%'),
        width:wp('100%'),
      paddingBottom:'10%'
      },
    cardtitle:{
        textAlign:'center',
        fontWeight:'bold',
        color:'#000',
        fontSize:16
    },
    button:{
         backgroundColor:'#03b38f',
         alignSelf:'center',
         borderRadius:30,
         marginBottom:'5%',
         marginTop:'10%'
    },
    carditem:{
        textAlign:'center',borderRadius:5
    },
    help:{
      alignItems:'flex-end',
      
    },
    helptext:{
      marginRight:'5%',
      marginTop:'3%',
      color:'#03b38f',
      fontWeight:'bold',
      fontSize:16,
       textDecorationLine:'underline'
    },
    fpasswordpart:{
      alignItems:'center'
    },
    fpassword:{
      fontWeight:'bold',
      fontSize:16,
      textDecorationLine:'underline',
      color:'red',
      paddingBottom:'4%'
    },
    lastoptionpart:{
     // flex:1,
      flexDirection:"row",
      padding: '2%',
      //flexDirection: 'row',
      justifyContent: 'space-around'
    },
    lastoptiontext:{
      color:'#fff',
      fontSize:13,
      fontWeight:'bold',
    },
    lines:{
      borderColor: '#03b38f',
      borderWidth: 0.3,
      width:"90%",
      marginTop:'3%',
      marginBottom:'3%'
    }
})