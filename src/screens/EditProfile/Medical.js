import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity,  Image, FlatList, Switch } from 'react-native';
import { Container, Text } from 'native-base';
import { ScrollView } from "react-native-gesture-handler";
import { Input } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
 

export default class Medical extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <ScrollView>
               <Container style={styles.Container}>
                         <View style={{ flexDirection:'row',justifyContent:'space-between',marginBottom:'2%'}}>
                                <Text style={styles.text}>Allergies</Text>
                                <DropDownPicker 
                                                items={[
                                                    {label: 'UK', value: 'uk'},
                                                    {label: 'France', value: 'france'},
                                                    {label: 'India', value: 'India'}
                                                ]}
                                                defaultValue={this.state.country}
                                                containerStyle={{height: 30,width:'50%'}}
                                                style={{backgroundColor: '#fafafa'}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                placeholder="Add Medicines"
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => this.setState({
                                                    country: item.value
                                        })} />
                         </View>
                         
                         <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                             <View>
                               <Text style={styles.text}>Current Medications</Text>
                             </View>
                             <View>
                                   <Text style={{textDecorationLine:'underline',color:'#03b38f',fontSize:13}}>If Yes, Add Medicine</Text>
                             </View>
                        </View>
                       
                       <View>
                             <View>
                               <Input
                                            containerStyle={{ height: 5, marginTop:'2%',marginBottom:'15%'}}
                                            placeholder="Add Medicines"
                                            placeholderTextColor="gray"
                                            inputContainerStyle={{ borderWidth: 1, fontSize: 12, fontSize: 5, borderRadius: 5, borderColor: '#03b38f' }}
                                            inputStyle={{ color: 'black', fontSize: 12 }}
                                            errorStyle={{ color: 'red', fontSize: 12 }}/>
                             </View>
                       </View>

                       <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                             <View>
                               <Text style={styles.text}>Past Medications</Text>
                             </View>
                             <View>
                                   <Text style={{textDecorationLine:'underline',color:'#03b38f',fontSize:13}}>If Yes, Add Medicine</Text>
                             </View>
                       </View>
                       
                       <View>
                             <View>
                               <Input
                                            containerStyle={{ height: 5, marginTop:'2%',marginBottom:'12%'}}
                                            placeholder="Add Medicines"
                                            placeholderTextColor="gray"
                                            inputContainerStyle={{ borderWidth: 1, fontSize: 12, fontSize: 5, borderRadius: 5, borderColor: '#03b38f' }}
                                            inputStyle={{ color: 'black', fontSize: 12 }}
                                            errorStyle={{ color: 'red', fontSize: 12 }}
                                        />
                             </View>
                       </View>

                       <View style={styles.lines}></View>

                        <View style={styles.personalprofile}>
                                    <Text style={styles.text}>Chronic Diseases</Text>
                                            <DropDownPicker 
                                                            items={[
                                                                {label: 'UK', value: 'uk'},
                                                                {label: 'France', value: 'france'},
                                                                {label: 'India', value: 'India'}
                                                            ]}
                                                            placeholder="Select Disease"
                                                            defaultValue={this.state.country}
                                                            containerStyle={{height: 30,width:'50%'}}
                                                            style={{backgroundColor: '#fafafa'}}
                                                            itemStyle={{
                                                                justifyContent: 'flex-start'
                                                            }}
                                                            dropDownStyle={{backgroundColor: '#fafafa'}}
                                                            onChangeItem={item => this.setState({
                                                                country: item.value
                                                    })} />
                         </View>

                         <View style={styles.lines}></View>

                         <View style={styles.personalprofile}>
                                <Text style={styles.text}>Injuries</Text>
                                        <DropDownPicker style={{marginHorizontal:'10%'}}
                                                            items={[
                                                                {label: 'UK', value: 'uk'},
                                                                {label: 'France', value: 'france'},
                                                                {label: 'India', value: 'India'}
                                                            ]}
                                                            placeholder="Select Injuries"
                                                            defaultValue={this.state.country}
                                                            containerStyle={{height: 30,width:'50%'}}
                                                            style={{backgroundColor: '#fafafa'}}
                                                            itemStyle={{
                                                                justifyContent: 'flex-start'
                                                            }}
                                                            dropDownStyle={{backgroundColor: '#fafafa'}}
                                                            onChangeItem={item => this.setState({
                                                                country: item.value
                                                    })} />
                         </View>

                         <View style={styles.lines}></View>

                         <View style={styles.personalprofile}>
                                <Text style={styles.text}>Surgeries</Text>
                                        <DropDownPicker style={{marginHorizontal:'10%'}}
                                                            items={[
                                                                {label: 'UK', value: 'uk'},
                                                                {label: 'France', value: 'france'},
                                                                {label: 'India', value: 'India'}
                                                            ]}
                                                            placeholder="Select"
                                                            defaultValue={this.state.country}
                                                            containerStyle={{height: 30,width:'50%'}}
                                                            style={{backgroundColor: '#fafafa'}}
                                                            itemStyle={{
                                                                justifyContent: 'flex-start'
                                                            }}
                                                            dropDownStyle={{backgroundColor: '#fafafa'}}
                                                            onChangeItem={item => this.setState({
                                                                country: item.value
                                                    })} />
                         </View>

                         <View style={styles.lines}></View>
                         {/* backgroundColor:'#f8f8f8', */}
                         <View style={{flexDirection: 'row',justifyContent:'space-between',paddingTop:'10%',paddingBottom:'10%'}}>
                             <View style={{flexDirection:'row'}}>
                                 <Icon
                                    name='angle-left'
                                    size={24}
                                    color='#03b38f'
                                    // style={{marginRight:'1%'}}
                                    //fontWeight='bold'
                                    //  margin='2%'
                                    />
                                  <Text style={{color:'#03b38f',fontSize:20,fontWeight:'bold',}}> PREVIOUS </Text>
                            </View>
                             <View >
                               <Text style={{color:'#03b38f',fontSize:20,fontWeight:'bold'}}>SAVE</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                               
                                <Text style={{color:'#03b38f',fontSize:20,fontWeight:'bold',}}> NEXT <Icon
                                    name='angle-right'
                                    size={24}
                                    color='#03b38f'
                                    // style={{ma:'1%'}}
                                    //fontWeight='bold'
                                    //  margin='2%'
                                    /></Text>
                            </View>
                        </View>
              </Container>
         </ScrollView>
       )
    }
}

const styles=StyleSheet.create({
    Container:{
        padding:'5%'
    },
    personalprofile:{
        flexDirection:'row',
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
    }
})