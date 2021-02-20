import React, { Component } from 'react';
import {Text,View,Image, ImageBackground} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage  from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import jwt_decode from "jwt-decode";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

  async componentDidMount() {

     let token = await AsyncStorage.getItem("Token")
     //console.log("token123123124444444444444444444444$$$$$$$$$",token);
    
     let Deviceid = DeviceInfo.getDeviceId();
    // console.log("Deviceid=================", Deviceid);
     AsyncStorage.setItem("Deviceid", Deviceid)
     let DeviceidFetch = await AsyncStorage.getItem("Deviceid")
    // console.log("DeviceidFetch=================", DeviceidFetch);
     let Logedin = await AsyncStorage.getItem("Logedin")
   //  console.log("Logedin",Logedin)

       if(DeviceidFetch==Deviceid && Logedin=="true"){
            var decoded = jwt_decode(token);
               if(decoded.role==="0"){
                                setTimeout(
                                    () => { this.props.navigation.navigate('HomePage') },
                                    2000
                                )
                           }
                       else
                        {
                            setTimeout(
                                () => {   this.props.navigation.navigate('TabNavigator',{token:token})},
                                2000
                            )
                        }
              }else if(DeviceidFetch==Deviceid && Logedin=="false"){
                            setTimeout(
                                () => {   this.props.navigation.navigate('Registeroption')},
                                2000
                            )
             }else{
                setTimeout(
                    () => {  this.props.navigation.navigate('WelcomeScreenpage')},
                    2000
                )
         }
  }

    render() { 
            return (  
                     <View style={styles.viewStyles}>
                        <LinearGradient colors={['#03b38f', '#daeeea', '#f5fbfa','#ffffff','#f5fbfa','#daeeea','#03b38f']}
                        start={{x: 1.1, y: 0.05}} end={{x: 0.3, y: 1.0}}
                        // locations={[0,0.5,0.6]} 
                        style={styles.linearGradient}>
                         <Image
                                style={styles.image}
                                resizeMode='contain'
                                source={require('../../Images/logo.png')}  />
                        </LinearGradient>
                    </View>
                );
    }
}
 
const styles = {
    LinearGradient:{
       background:'#03B38F',
    },
    image:{
        height:hp('100%'),
        width:wp('40%'),
        marginHorizontal:'30%'
     },
    viewStyles:{
        flex:1,
        height:hp('100%'),
        width:wp('100%'),
    },

}

  
export default Hello;