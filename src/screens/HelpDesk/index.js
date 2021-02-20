
import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity,StyleSheet,Switch,TextInput} from 'react-native';
import { Container, Header,Left, Right,Text,Input} from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker'
import constants from '../../../constant';
const BASE_URL = constants.BASE_URL;
const BASE_URL1 = constants.BASE_URL1;

export default class DoctorListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: false,
           // loading:false
        }
    }

    async componentDidMount() {
        this.setState({
            modalVisible: false,
            //loading:true
        })
    }

    handleMenu = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    }

    render() {
        return (
            <ScrollView>
            <Container >
                 {/* <Loader loading={this.state.loading} /> */}
                    <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
                        <Left >
                            <TouchableOpacity
                                onPress={this.handleMenu}>
                                <Icon1 name='menu' style={{ color: '#fff', fontSize: 30 }} />
                            </TouchableOpacity>
                        </Left>
                        <Right style={{flexDirection:'row'}}> 
                                <Icon3 name='star-outline' color='#fff' size={24} style={{ marginRight: '5%' }} />
                                <Icon3 name='share-variant' color='#fff' size={22} style={{ marginRight: '5%' }} />
                                <Icon3 name='bell' color='#fff' size={22} style={{ marginRight: '5%' }} />
                                <Icon3 name='dots-vertical' color='#fff' size={24}  />
                        </Right>
                    </Header>
                    
                     <View style={{ backgroundColor: '#f9f9f9', paddingTop: '2%',padding:10}}>
                            <Text style={{ fontSize: 16, color: 'black',marginLeft:'5%'}}>I Have an Issue With</Text>
                            <View style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', zIndex: 6000, marginTop: 3 }}>
                                    <DropDownPicker style={{}}
                                    items={[
                                    { label: 'Dentist', value: 'Dentist' },
                                    { label: 'Cardologiests', value: 'Cardologiests' },
                                    { label: 'Cosmetologists', value: 'Cosmetologists' }
                                    ]}
                                    showArrow='true'
                                    placeholder="Booking a New Appointment"
                                    placeholderTextColor="#fff"
                                    baseColor="#fff"
                                    display="flex"
                                    containerStyle={{ height: 35, width: '100%', padding: '0%',marginLeft:'0%'}}
                                    style={{ backgroundColor: 'white', width: '100%', height: '100%', borderColor: "white",backgroundColor:'red'  }}          />
                        </View>  
                        <View style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', zIndex: 5000, marginTop: 3 }}>
                            <DropDownPicker style={{}}
                                items={[
                                { label: 'Dentist', value: 'Dentist' },
                                { label: 'Cardologiests', value: 'Cardologiests' },
                                { label: 'Cosmetologists', value: 'Cosmetologists' }
                                ]}            placeholder="Existing Appointment"
                                placeholderTextColor="#fff"
                                baseColor="#fff"
                                display="flex"
                                containerStyle={{ height: 35, width: '100%', padding: '0%', }}
                                style={{ backgroundColor: '', color: "white", width: '100%', height: '100%', borderColor: "white", }}          />
                    </View>    
                    <View style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', zIndex: 4000, marginTop: 3 }}>
                            <DropDownPicker style={{}}
                                items={[
                                { label: 'Dentist', value: 'Dentist' },
                                { label: 'Cardologiests', value: 'Cardologiests' },
                                { label: 'Cosmetologists', value: 'Cosmetologists' }
                                ]}            placeholder="Online Consultation"
                                placeholderTextColor="#fff"
                                baseColor="#fff"
                                display="flex"
                                containerStyle={{ height: 35, width: '100%', padding: '0%', }}
                                style={{ backgroundColor: '', color: "white", width: '100%', height: '100%', borderColor: "white", }}          />
                      </View>      
                            <View style={{ backgroundColor: 'white', marginTop: 3 }}>
                            <Text style={{ paddingLeft: 10,marginLeft:'2%'}}>Feedback</Text>
                            <View style={{ padding: 10 }}>
                                <TextInput style={{}}
                                placeholder="Add a feedback"
                                placeholderTextColor="gray"
                                style={{
                                    height: 40, borderColor: 'gray', borderWidth: 0.2, marginTop: 10, borderRadius: 10, padding: 10
                                }}
                                />
                            </View>      
                                </View>      
                                <View style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', zIndex: 3000, marginTop: 3 }}>
                            <DropDownPicker style={{}}
                                items={[
                                { label: 'Dentist', value: 'Dentist' },
                                { label: 'Cardologiests', value: 'Cardologiests' },
                                { label: 'Cosmetologists', value: 'Cosmetologists' }
                                ]}
                                placeholder="My Accounts & Payments"
                                placeholderTextColor="#fff"
                                baseColor="#fff"  
                                containerStyle={{ height: 35, width: '100%', padding: '0%', }}
                                style={{ backgroundColor: '', color: "white", width: '100%', borderColor: "white", }}
                            />
                            </View>       
                             <View style={{ backgroundColor: 'white', marginTop: 2 }}>
                                        <Text style={{ paddingLeft: 10,marginLeft:'2%'}}>Has a New Feature in Mind</Text>
                                           <View style={{ padding: 10 }}>
                                                    <TextInput style={{}}
                                                    placeholder="Please share your idea"
                                                    placeholderTextColor="gray"
                                                    style={{
                                                        height: 40, borderColor: 'gray', borderWidth: 0.2, marginTop: 10, borderRadius: 10, padding: 10
                                                    }}
                                              />
                                        </View>       
                            </View>  
                            <View style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', zIndex: 4000, marginTop: 3 }}>
                            <DropDownPicker style={{}}
                                items={[
                                { label: 'Dentist', value: 'Dentist' },
                                { label: 'Cardologiests', value: 'Cardologiests' },
                                { label: 'Cosmetologists', value: 'Cosmetologists' }
                                ]}            placeholder="Online Consultation"
                                placeholderTextColor="#fff"
                                baseColor="#fff"
                                display="flex"
                                containerStyle={{ height: 35, width: '100%', padding: '0%', }}
                                style={{ backgroundColor: '', color: "white", width: '100%', height: '100%', borderColor: "white", }}          />
                          </View>   
                        </View>
                 </Container>
                 <View style={styles.buttonsubmit}>
                                <TouchableOpacity
                                    style={{height:40,backgroundColor: "#03b38f",borderRadius:15}}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center', padding: 5 }}>Report An Issue</Text>
                                </TouchableOpacity>
             </View>
         </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
   //  flex: 1,
   //  position:"relative",
      padding:10,
   //   width: '100%',
    },
    buttonsubmit: {  
        //backgroundColor:'red',
        width:'100%',
      //height:'100%',
        borderRadius: 10,
        padding:10,
        //flex: 1,
        position:'absolute',
        bottom:0,
        //flexDirection:'column',
        //justifyContent:'flex-end',  
    },
  });
