import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity,  Image, FlatList,Modal,Alert} from 'react-native';
import {Card} from 'react-native-elements'
import { Container, Text } from 'native-base';
import { ScrollView } from "react-native-gesture-handler";
import { Input } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-community/async-storage'
import ProfileServices from '../../Services/ProfileServices/ProfileServices'


export default class LifeStyle extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            modalVisible: false,
            smoking:"",
            alcohol:"",
            life:"",
            food:"",
            profession:"",
            lifestyleData:[],
            professionData:[]
        }
    }


    async componentDidMount(){
     
                this.setState({
                    modalVisible:false
                })
                let token = await AsyncStorage.getItem("Token")
             //   console.log("token--------------",token);

                this.getLifestyle(token)

                this.getProfession(token)
    
        }

        getProfession=(token)=>{
            ProfileServices.getProfession(token).then(response=>{
               // console.log("response in getProfession======", response);
                if(response){
                    if(response.status==200){
                        // {label: 'UK', value: 'uk'},
                        let arr=[]
                        response.data.map(i=>{
                            arr.push({label: i.profession, value: i.profession_id})
                        })
                        this.setState({professionData:arr})
                    }
                }
            })
        }
        getLifestyle=(token)=>{
            ProfileServices.getLifestyle(token).then(response=>{
               // console.log("response in getLifestyle======", response);
                if(response){
                    if(response.status==200){
                        // {label: 'UK', value: 'uk'},
                        let arr=[]
                        response.data.map(i=>{
                            arr.push({label: i.lifestyle, value: i.lifestyle_id})
                        })
                        this.setState({lifestyleData:arr})
                    }
                }
            })
        }


        onSaveClick =async  () =>{
            let token = await AsyncStorage.getItem("Token")
            //console.log("this.state.smoking,$$$$$$$$$$$$$$",this.state.smoking,)

            const doc  = {
                smoking_habit: this.state.smoking,
                alcohol_consumption: this.state.alcohol,
                lifestyle: this.state.life,
                food: this.state.food,
                profession: this.state.profession
            }
            console.log("doc",doc);

            ProfileServices.postLifestyleDetails(token , doc).then(response=>{
               // console.log("response in getBasicDetails profile================", response.data);
                if(response){
                    if(response.status==200){
                        // this.setState({
                        //     modalVisible:true
                        // })
                        //AsyncStorage.setItem("modalVisible1",'true')
                        this.handler();
                       // window.location.reload(false);
                      //  window.location.reload(true);
                        // this.setState({
                        //     basicUserData:response.data.userbasicinfo,
                        //     name:response.data.userbasicinfo.user_full_name,
                        //     mobileNo:response.data.userbasicinfo.mobile
                        // })
                    }
                }
                else{
    
                    Alert.alert("Error","Failed to get user information.")
                }
            }).catch((err)=>{
                console.log("Err in get User Details======>", err);
            })
        }


    render() { 
        return (
            <ScrollView>
               <Container style={styles.Container}>
                        <View style={styles.personalprofile}>
                                            <Text style={styles.text}>Smoking Habits</Text>
                                                <DropDownPicker  
                                                            items={[
                                                                {label: 'Yes', value: 'Yes'},
                                                                {label: 'No', value: 'No'}
                                                                
                                                            ]}
                                                            placeholder="Select"
                                                            defaultValue={this.state.smoking}
                                                            containerStyle={{width:'50%', height:30}}
                                                            style={{backgroundColor: '#fafafa'}}
                                                            itemStyle={{
                                                                justifyContent: 'flex-start'
                                                            }}
                                                            dropDownStyle={{backgroundColor: '#fafafa'}}
                                                            onChangeItem={item => this.setState({
                                                                smoking: item.value
                                                    })} />
                         </View>

                         <View style={styles.lines}></View>

                         <View style={styles.personalprofile}>
                                            <Text style={styles.text}>Alcohol Consumption</Text>
                                        <DropDownPicker style={{marginHorizontal:'10%'}}
                                                            items={[
                                                                {label: 'Yes', value: 'Yes'},
                                                                {label: 'No', value: 'No'}
                                                            ]}
                                                            placeholder="Select"
                                                            defaultValue={this.state.alcohol}
                                                            containerStyle={{height: 30,width:'50%'}}
                                                            style={{backgroundColor: '#fafafa'}}
                                                            itemStyle={{
                                                                justifyContent: 'flex-start'
                                                            }}
                                                            dropDownStyle={{backgroundColor: '#fafafa'}}
                                                            onChangeItem={item => this.setState({
                                                                alcohol: item.value
                                                    })} />
                         </View>
                         <View style={styles.lines}></View>
                        <View style={styles.personalprofile}>
                                  <Text style={styles.text}>Life style</Text>
                                        <DropDownPicker style={{marginHorizontal:'10%'}}
                                                            items={this.state.lifestyleData}
                                                            placeholder="Select"
                                                            defaultValue={this.state.life}
                                                            containerStyle={{height: 30,width:'50%'}}
                                                            style={{backgroundColor: '#fafafa'}}
                                                            itemStyle={{
                                                                justifyContent: 'flex-start'
                                                            }}
                                                            dropDownStyle={{backgroundColor: '#fafafa'}}
                                                            onChangeItem={item => this.setState({
                                                                life: item.value  })} />
                         </View>
                        <View style={styles.lines}></View>
                         <View style={styles.personalprofile}>
                                        <Text style={styles.text}>Food</Text>
                                        <DropDownPicker style={{marginHorizontal:'10%'}}
                                                            items={[
                                                                {label: 'Vegetarian', value: 'Vegetarian'},
                                                                {label: 'Non-vegetarian', value: 'Non-vegetarian'},
                                                                {label: 'Both', value: 'Both'}
                                                            ]}
                                                            placeholder="Select"
                                                            defaultValue={this.state.food}
                                                            containerStyle={{height: 30,width:'50%'}}
                                                            style={{backgroundColor: '#fafafa'}}
                                                            itemStyle={{
                                                                justifyContent: 'flex-start'
                                                            }}
                                                            dropDownStyle={{backgroundColor: '#fafafa'}}
                                                            onChangeItem={item => this.setState({
                                                                food: item.value
                                                    })} />
                         </View>
                         <View style={styles.lines}></View>
                         <View style={styles.personalprofile}>
                                    <Text style={styles.text}>Profession</Text>
                                        <View style={{justifyContent:'flex-end',flexDirection:'row'}}> 
                                        <DropDownPicker style={{marginHorizontal:'10%'}}
                                                            items={this.state.professionData}
                                                            placeholder="Select"
                                                            defaultValue={this.state.profession}
                                                            containerStyle={{height: 30,width:'70%'}}
                                                            style={{backgroundColor: '#fafafa'}}
                                                            itemStyle={{
                                                                justifyContent: 'flex-start'
                                                            }}
                                                            dropDownStyle={{backgroundColor: '#fafafa'}}
                                                            onChangeItem={item => this.setState({
                                                                profession: item.value
                                                    })} />
                                       </View>
                         </View>

                         <View style={styles.lines}></View>
                         {/* <View style={{flexDirection: 'row',justifyContent:'space-evenly',marginTop:'10%'}}>
                             <View style={{flexDirection:'row'}}>
                                 <Icon
                                    name='angle-left'
                                    size={24}
                                    color='#03b38f'
                                    />
                                  <Text onPress={()=> this.props.navigation.navigate('Personal')}  style={{color:'#03b38f',fontSize:20,fontWeight:'bold',}}> PREVIOUS </Text>
                            </View>
                             <View >
                                 <TouchableOpacity onPress={()=>this.onSaveClick()}>
                               <Text style={{color:'#03b38f',fontSize:20,fontWeight:'bold'}}>SAVE</Text>
                               </TouchableOpacity>
                            </View>
                        </View> */}
                        
                     <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingTop: '10%', paddingBottom: '10%' }}>
                            <TouchableOpacity style={{ flexDirection: 'row',backgroundColor:'#03b38f',padding:10,borderRadius:10}}>
                            <Text onPress={()=> this.props.navigation.navigate('Personal')} style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginRight: '2%' }} >PREVIOUS</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row',backgroundColor:'#03b38f',padding:10,borderRadius:10}}>
                                <Text onPress={()=>this.onSaveClick()} style={{ color: '#fff', fontSize: 20, marginLeft: '2%', fontWeight: 'bold' }}>
                                  SAVE 
                                    {/* <Icon
                                    name='angle-right'
                                    size={24}
                                    color='#03b38f'
                                    /> */}
                                </Text>
                            </View>
                        </View>
                 </Container>

                    {/* <View>
                         <Modal
                                        //style={{paddingTop:'25%'}}
                                        animationType="slide"
                                        coverScreen={true}
                                        backdropOpacity={0.70}
                                        transparent={true}
                                        visible={this.state.modalVisible}
                                        onRequestClose={() => {
                                        Alert.alert("Modal has been closed.");
                                        }} >
                                        <Card style={{borderRadius:20}}>
                                                <View style={{position:'absolute',right:'5%',top:'2%'}}>
                                                    <Icon
                                                            name='times'
                                                            size={30}
                                                            color='#03b38f'
                                                            type='material-community'
                                                            onPress={() => this.setState({modalVisible:!this.state.modalVisible})}
                                                        />
                                                </View>
                                                <View style={{marginHorizontal:'10%',justifyContent: 'center',alignItems: 'center',marginTop:'20%'}}>
                                                    <Text style={{color:'#03b38f',fontWeight:'bold',fontStyle:'italic',fontSize:25}}> GREAT </Text>
                                                        <Text style={{color:'#03b38f',fontWeight:'bold',fontStyle:'italic',fontSize:25}}> 
                                                                Your Profile is all Set</Text>
                                                        <View styles={{justifyContent: 'center',flexDirection:'row'}}>
                                                            <Icon name="thumbs-up" color="#029400" size={100} />
                                                        </View>      
                                                        <Text style={{color:'#03b38f',fontWeight:'bold'}}> 
                                                                Lets Add Family Now</Text>
                                                </View>
                                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                <TouchableOpacity style={styles.Addfamilybutton}
                                                            onPress={() => this.handleAddFamily()}
                                                            >
                                                            <Text style={{fontSize:14,padding:'1%',color:'#fff',marginHorizontal:'4%'}}>ADD A FAMILY MEMBER </Text>
                                               </TouchableOpacity>
                                               <TouchableOpacity style={styles.NoThanks}
                                                             onPress={() => this.setState({modalVisible:!this.state.modalVisible})}>
                                                            <Text style={{fontSize:14,padding:'1%',color:'#fff'}}>NO,THANKS </Text>
                                               </TouchableOpacity>
                                               </View>
                                     </Card>
                              </Modal>
                        </View>  */}
         </ScrollView>
       )
    }
}

const styles=StyleSheet.create({
    modalView:{
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 5,
        shadowOpacity: 0.21,
        alignContent: "center",
        flexDirection: "column",
        backgroundColor:'red'
    },
    Container:{
        padding:'5%'
    },
    personalprofile:{
        flexDirection:'row',
        //marginBottom:'4%',
       justifyContent:'space-between'

    },
    lines:{
        borderColor: '#dedddd',
        borderWidth: 0.5,
        width:"100%",
        marginTop:'3%',
        marginBottom:'3%',
        marginHorizontal:'0%'
      },
    text:{
        color:'#817a7a',
    },
    centeredView: {
      //  flex: 1,
      padding: 20,
      borderRadius:20,
        padding: 5,
        //backgroundColor:'red',
        zIndex:99999,
        
       
      },
      Addfamilybutton:{
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#03b38f',
      // alignSelf:'center',
        borderRadius:3,
        marginBottom:'4%',
        marginTop:'4%'
    },
    NoThanks:{
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#ff4800',
       alignSelf:'center',
        borderRadius:3,
        //marginBottom:'4%',
        //marginTop:'4%'
    },
})