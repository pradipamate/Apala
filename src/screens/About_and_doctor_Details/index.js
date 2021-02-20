
import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity,StyleSheet,Switch,TextInput} from 'react-native';
import { Container, Header,Left, Right,Text,Input} from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker'
import constants from '../../../constant';
const BASE_URL = constants.BASE_URL;
const BASE_URL1 = constants.BASE_URL1;

export default class DoctorListing extends Component {
    constructor(props) {
        super(props);
      
    }

    handleMenu = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    }

    render() {
        return (
            <ScrollView>
               <Container style={{backgroundColor:'#f9f9f9',height:'100%'}} >
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

                    <View style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', zIndex: 5000, marginTop: 2 }}>
                        <DropDownPicker style={{
                        }}
                        items={[
                            { label: 'Dentist', value: 'Dentist' },
                            { label: 'Cardologiests', value: 'Cardologiests' },
                            { label: 'Cosmetologists', value: 'Cosmetologists' }
                        ]}
                        showArrow='true'
                        placeholder="Notification Setting"

                        display="flex"
                        containerStyle={{ height: 45, width: '100%', padding: '0%', }}
                        style={{ backgroundColor: 'white', width: '100%', height: '100%', borderColor: "white", }}

                        />
                    </View>

                    <View style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', zIndex: 4000, marginTop: 2 }}>
                        <DropDownPicker style={{

                        }}
                        items={[
                            { label: 'Dentist', value: 'Dentist' },
                            { label: 'Cardologiests', value: 'Cardologiests' },
                            { label: 'Cosmetologists', value: 'Cosmetologists' }
                        ]}
                        showArrow='true'
                        placeholder="PoP-Up Notification"

                        display="flex"
                        containerStyle={{ height: 45, width: '100%', padding: '0%', }}
                        style={{ backgroundColor: 'white', width: '100%', height: '100%', borderColor: "white", }}

                        />
                    </View>

                    <View style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', zIndex: 3000, marginTop: 3 }}>
                        <DropDownPicker style={{

                        }}
                        items={[
                            { label: 'Dentist', value: 'Dentist' },
                            { label: 'Cardologiests', value: 'Cardologiests' },
                            { label: 'Cosmetologists', value: 'Cosmetologists' }
                        ]}
                        showArrow='true'
                        placeholder="Help and Support"

                        display="flex"
                        containerStyle={{ height: 45, width: '100%', padding: '0%', }}
                        style={{ backgroundColor: 'white', width: '100%', height: '100%', borderColor: "white", }}

                        />
                    </View>

                    <View style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', marginTop: 5 }}>
                        <Text style={{ color: 'gray', padding: 12 }}>
                        Health Tips For You
                    </Text>
                    </View>


                    <View style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', marginTop: 2 }}>
                        <Text style={{ color: 'gray', padding: 12 }}>
                        Health Tips For You
                    </Text>
                    </View>

                    <View style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', marginTop: 2 }}>
                        <Text style={{ color: 'gray', padding: 12 }}>
                        Health Tips For You
                    </Text>
                    </View>

                    <View style={styles.contactcard}>
                        <View style={styles.cardPart}>
                            <Text style={styles.font_13}>Contact</Text>
                            <Text style={{ textAlign: 'right', color: '#009688' }}> 9898989898</Text>
                        </View>

                        <View style={styles.cardPart}>
                            <Text style={styles.font_13}>Email</Text>
                            <Text style={{ textAlign: 'right', color: '#009688' }}>ayn@gmail.com</Text>
                        </View>

                        <View style={styles.cardPart}>
                            <Text style={styles.font_13}>Telephone</Text>
                            <Text style={{ textAlign: 'right', color: '#009688' }}> 9898989898</Text>
                        </View>

                        <View style={styles.cardPart}>
                            <Text style={styles.font_13}>Address</Text>
                            <Text style={{ textAlign: 'right', color: '#009688' }}>  XYZ</Text>
                            </View>
                            <View style={styles.cardPart}>
                                <Text style={styles.font_13}>Website</Text>
                                <Text style={{ textAlign: 'right', color: '#009688' }}>www.ayninfotech</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                <Text style={styles.font_13}>Support</Text>
                                <Text style={{ textAlign: 'right', color: '#009688' }}> 9898989898</Text>
                        </View>
                        <View style={{ borderBottomColor: 'gray',borderBottomWidth: 0.5,}}>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <View>
                            <Text style={styles.font_13}> Share & Rate Us</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                        <View style={{marginRight:2}}>
                            <View style={styles.buttonsubmit}>
                                    <TouchableOpacity
                                        style={{ backgroundColor: "#03b38f", justifyContent: 'flex-end', }}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 8, textAlign: 'center', }}>Share</Text>
                                    </TouchableOpacity>
                                    </View>
                            </View>
                            <View style={styles.buttonsubmit}>
                                <TouchableOpacity  style={{ backgroundColor: "#03b38f", justifyContent: 'flex-end', }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 8, textAlign: 'center', }}>Share</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                         </View>
                        <View style={{ width: '50%' }}>
                        <Text style={{ textAlign: 'left' ,fontSize:10}}>
                            Enjoying App,Please share with your friends and family
                            </Text>
                        </View>
                    </View>
                  </Container>
                </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    font_13:{fontSize:15},
    cardPart:{ flexDirection: 'row', justifyContent: 'space-between',fontSize:13 },
  container: {
    flex: 1,

    width: '100%',
  },
 
  contactcard: {
   flex:1,
    paddingTop: 40,
    paddingBottom: 40,
marginLeft:20,
marginRight:20,
marginBottom:20,
    borderTopStartRadius: 40,
    borderBottomLeftRadius: 40,
    borderTopEndRadius: 40,
    borderBottomRightRadius: 40,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderRightColor: 'white',
    borderLeftColor: 'white',
    backgroundColor: 'white',
    marginTop: 20,

  },
  buttonsubmit: {
    elevation: 8,
    backgroundColor: "#03b38f",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 30,

  },
});