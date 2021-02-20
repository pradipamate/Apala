
import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity,StyleSheet,Switch} from 'react-native';
import { Container, Header,Left, Right,Text } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker'

//import Loader from '../../Components/Loader'


//import { Content, Card, CardItem, Text } from 'native-base';
//import { Container, Header, Title, Content, Card, CardItem, Form, Item, Label, Input, Button, Thumbnail, Left, Right, Body, Text } from 'native-base';
//import styles from './styles';

import constants from '../../../constant';
import { times } from "lodash";
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
            <Container style={{ height: '100%'}} >
                 {/* <Loader loading={this.state.loading} /> */}
                    <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
                        <Left >
                            <TouchableOpacity
                                onPress={this.handleMenu}>
                                <Icon1 name='menu' style={{ color: '#fff', fontSize: 30 }} />
                            </TouchableOpacity>
                        </Left>
                        <Right style={{flexDirection:'row'}}> 
                                <Icon1 name='notifications-outline' color='#fff' size={25} style={{}} />
                                <Icon3 name='dots-vertical' color='#fff' size={24}  />
                        </Right>
                    </Header>
                    
                        <View style={{ marginBottom: 0, marginTop: 10 }}>
                            <Input
                                placeholder='SEARCH'
                                style={{ fontSize: 14 }}
                                rightIcon={
                                    <Icon
                                        name='search'
                                        size={20}
                                        color='#03b38f'
                                        type='material-community'
                                    />}
                                inputContainerStyle={{ borderWidth: 1, paddingLeft: '5%', borderRadius: 10, borderColor: '#03b38f' }}
                                rightIconContainerStyle={{ marginRight: '2%' }}
                            />
                        </View>
                        <View style={{ backgroundColor: '#f9f9f9', paddingTop: '2%',}}>
                           <View style={styles.container}>
                                    <Text style={{padding:10}}>Setting</Text>
                                    <View style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', marginTop: 10,justifyContent:'space-between'}}>
                                        <Text style={{ color: 'gray', padding: 12 }}>
                                            Health Tips For You
                                        </Text>
                                        <Switch 
                                            value={this.state.switchValue}
                                            onValueChange={(switchValue) => this.setState({ switchValue })} />
                                    </View>

                                    <View style={{ backgroundColor: 'white', flexDirection: 'row', zIndex: 5000, marginTop: 3 }}>
                                    <DropDownPicker style={{

                                    }}
                                        items={[
                                        { label: 'Dentist', value: 'Dentist' },
                                        { label: 'Cardologiests', value: 'Cardologiests' },
                                        { label: 'Cosmetologists', value: 'Cosmetologists' }
                                        ]}
                                        //showArrow='true'
                                        placeholder="Notification Setting"

                                        display="flex"
                                        containerStyle={{ height: 45, width: '100%', padding: '0%', }}
                                        style={{ backgroundColor: 'white', width: '100%', height: '100%', borderColor: "white", }}

                                    />
                                    </View>

                                    <View style={{ padding: 12 }}>
                                    <Text>Reminder Setting</Text>
                                    </View>

                                    <View style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', marginTop: 10,justifyContent:'space-between' }}>
                                    <Text style={{ color: 'gray', padding: 12 }}>
                                        Reminder Volume
                                    </Text>
                                    <Switch    value={this.state.switchValue}
                                        onValueChange={(switchValue) => this.setState({ switchValue })} />
                                    </View>


                                    <View style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', zIndex: 4000, marginTop: 3 }}>
                                    <DropDownPicker style={{
                                        }}
                                        items={[
                                        { label: 'Dentist', value: 'Dentist' },
                                        { label: 'Cardologiests', value: 'Cardologiests' },
                                        { label: 'Cosmetologists', value: 'Cosmetologists' }
                                        ]}
                                      //  showArrow='true'
                                        placeholder="Pop-Up Notification"

                                        display="flex"
                                        containerStyle={{ height: 45, width: '100%', padding: '0%', }}
                                        style={{ backgroundColor: 'white', width: '100%', height: '100%', borderColor: "white", }}

                                    />
                                    </View>
                                    <View style={{ padding: 12 }}>
                                    <Text>Others</Text>
                                    </View>


                                    <View style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', zIndex: 3000, marginTop: 3 }}>
                                    <DropDownPicker style={{

                                    }}
                                        items={[
                                        { label: 'Dentist', value: 'Dentist' },
                                        { label: 'Cardologiests', value: 'Cardologiests' },
                                        { label: 'Cosmetologists', value: 'Cosmetologists' }
                                        ]}
                                     //   showArrow='true'
                                        placeholder="Help and Support"

                                        display="flex"
                                        containerStyle={{ height: 45, width: '100%', padding: '0%', }}
                                        style={{ backgroundColor: 'white', width: '100%', height: '100%', borderColor: "white", }}

                                    />
                                    </View>

                                    <View style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', marginTop: 6 }}>
                                    <Text style={{ color: 'gray', padding: 12 }}>
                                        Health Tips For You
                                    </Text>
                                    </View>

                                    <View style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', marginTop: 6 }}>
                                    <Text style={{ color: 'gray', padding: 12 }}>
                                        Health Tips For You
                                    </Text>
                                    </View>
                                
                                </View>
                            </View>
                 </Container>
         </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
     // flex: 1,
    //   padding:10,
      //width: '100%',
    },
  });
