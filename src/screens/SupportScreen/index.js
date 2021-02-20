import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, AsyncStorage,StyleSheet, Alert, FlatList, Switch } from 'react-native';
import { Container, Header, Title, Content, Card, CardItem, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Loader from '../../Components/Loader';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { Container, Header, Title, Content, Card, CardItem, Form, Item, Label, Input, Button, Thumbnail, Left, Right, Body, Text } from 'native-base';


export default class ContactUS extends Component {
    constructor(props) {
        super(props);
        this.state={
            contactusdata:{},
            loading:false
            
        }
       
    }
    componentDidMount(){
       
    }
   

  
    render() {
        return (
            <Container>
                 <Loader loading={ this.state.loading } />
                <Header  style={{ borderBottomWidth: 0.4 ,backgroundColor:'#03b38f'}}>
                    <Left style={{ marginLeft: '2%' }}>
                    </Left>
                    <Body>
                        <Title
                          style={{
                            color: '#fff',
                           marginLeft: '8%',
                            fontSize: 16,
                            width: '100%',
                          }}>
                        Contact Us
                        </Title>
                   </Body>  
                   
                </Header>
                { this.state.contactusdata!==null && this.state.contactusdata!==undefined?
                <>
               
                <View style={{flexDirection:"column",marginTop:'0%'}}>
                    <Text style={{textAlign:'left',marginTop:'5%',fontSize:18,fontWeight:'bold',marginLeft:'8%',color:'#03b38f'}}>Contact Number </Text>
                    <Text style={{textAlign:'left',fontSize:14,color:'#454545',marginLeft:'8%'}}>9975101031</Text>

                </View>
                <View style={{flexDirection:"column",marginTop:'0%'}}>
                    <Text style={{textAlign:'left',marginTop:'5%',fontSize:18,fontWeight:'bold',marginLeft:'8%',color:'#03b38f'}}>Email</Text>
                    <Text style={{textAlign:'left',fontSize:14,color:'#454545',marginLeft:'8%'}}>test@gmail.com</Text>

                </View>
                <View style={{flexDirection:"column",marginTop:'0%'}}>
                    <Text style={{textAlign:'left',marginTop:'5%',fontSize:18,fontWeight:'bold',marginLeft:'8%',color:'#03b38f'}}>Pune,Maharashtra</Text>
                    <Text style={{textAlign:'left',fontSize:14,color:'#454545',marginLeft:'8%'}}>Address</Text>

                </View>
                <View style={{flexDirection:"column",marginTop:'4%',borderWidth:0.5,borderColor:'#999',marginHorizontal:'7%'}}>
                   
                </View>
                </>:
                 <View style={{flexDirection:"column",marginTop:'5%'}}>
                 <Text style={{textAlign:'left',marginTop:'5%',fontSize:22,fontWeight:'bold',marginLeft:'8%'}}>No Data Found!!! </Text>

             </View>

               
    }
   
               
            </Container>
        )
    }

}