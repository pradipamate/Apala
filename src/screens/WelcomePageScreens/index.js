import React, { Component } from "react";
import { StyleSheet, Text, View,TouchableOpacity} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SliderBox } from "react-native-image-slider-box";
import { Button } from "native-base";
import AsyncStorage  from '@react-native-community/async-storage';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
         require('../../Images/slider1.png'),
         require('../../Images/slider2.png'),
         require('../../Images/slider3.png'),
         require('../../Images/slider4.png'),
         require('../../Images/slider5.png'),
         require('../../Images/slider6.png'),
      ]
    };
  }

  
 
  render() {
    return (
      <View style={styles.container}>
        <SliderBox
        style={styles.sliderimages}
          images={this.state.images}
          resizeMode={'stretch'}
          autoplay
          circleLoop
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            marginBottom: 40,
          }}/>
        
         <TouchableOpacity style={styles.touchablebutton}
                        onPress={() => this.props.navigation.navigate('Registeroption')}>
                 <Text style={styles.text}>Get Started</Text>
        </TouchableOpacity>

      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding:0,
    marginHorizontal:0,
    position:'relative'
  },
  sliderimages:{
      width:wp('100%'),
      height:hp('100%'),
    //   flex: 1,
  },
  touchablebutton:{
      position:"absolute",
      bottom:10,
      backgroundColor:'#fff',
      alignSelf:'center',
      borderRadius:30

  },
  text:{
    fontSize:17,paddingHorizontal:'6%',color:'#03b38f',paddingVertical:'1%'
  }
  
});