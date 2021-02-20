import React from 'react';
import { Image, ScrollView, StyleSheet, Text, ImageBackground, View, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Provider as PaperProvider, Drawer, Dialog, TouchableRipple, RadioButton, Subheading, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import constants from '../../constant';
import AsyncStorage from '@react-native-community/async-storage';
import SidebarServices from '../Services/SidebarServices/SidebarServices'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePath from '../Services/ImagePath'

const BASE_URL = constants.BASE_URL;
const BASE_URL1 = constants.BASE_URL1;


class DrawerComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isVisible: false,
            sObj: {},
            sdata: {},
            checked: 'en',
            userName: "",
            token: ""
        }
    }


    _showDialog = () => this.setState({ isVisible: true });

    _hideDialog = () => this.setState({ isVisible: false });

    async componentDidMount() {
        let token = await AsyncStorage.getItem("Token")
        this.setState({
            token: token
        })
        if (token) {
            SidebarServices.getUserDetails(token).then(response => {
                console.log("response in userDetails HomePage================", response.data);
                if (response) {
                    if (response.status == 200) {
                        AsyncStorage.setItem("UserName", response.data.userbasicinfo.user_full_name)
                        this.setState({
                            userName: response.data.userbasicinfo.user_full_name,
                            profile_photo_path: response.data.userbasicinfo.profile_photo_path
                        })
                    }
                }
                else {
                    Alert.alert("Error", "Failed to get user information.")
                }
            }).catch((err) => {
                console.log("Err in get User Details======>", err);
            })
            let userName = AsyncStorage.getItem("UserName")
            console.log("userName=================", userName);
        }
    }

    clearAsyncStorage() {
        // showMessage({
        //     message: "Hello World",
        //     description: "This is our second message",
        //     type: "info",
        //   });

        // let userName = await AsyncStorage.getItem("Token")
        // console.log("userName",userName);
        // let userName=AsyncStorage.setItem("Token",null)
        // <FlashMessage duration={5000}>
        //     <strong>I will disapper in 5 seconds!</strong>
        // </FlashMessage>
        AsyncStorage.setItem("Logedin", "false")
        //console.log("userName");
        // await AsyncStorage.clear()
        // .then(keys => AsyncStorage.multiRemove(keys))
        // .then(() => alert('success'));
        this.props.navigation.navigate('Registeroption')
    }


    render() {
        const { checked } = this.state;
        return (
            <PaperProvider>
                <View style={{ flexDirection: 'row', backgroundColor: '#03b38f', paddingTop: '4%', paddingBottom: '4%' }}>
                    <Image
                        square
                        style={{ height: 60, width: 60, borderRadius: 60, marginLeft: '10%', marginVertical: '5%', padding: '1%' }}
                        source={{ uri: ImagePath + this.state.profile_photo_path }}
                    />
                    <View style={{ flexDirection: 'column', marginVertical: '5%', marginLeft: '-10%' }}>
                        {this.state.userDetails != {} ?
                            <Text style={styles.Info}>{this.state.userName}</Text>
                            : null}
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile', { token: this.state.token })}>
                            <Text style={styles.Info} >
                                <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>View & Edit Profile</Text>
                            </Text>
                        </TouchableOpacity>
                        {/* <Text style={styles.Info}>10% Completed {this.state.sdata.class_id}</Text> */}
                    </View>

                    <View style={{ marginLeft: '-20%', color: '#fff', marginVertical: '13%' }}>
                        <Icon
                            name='angle-right'
                            size={24}
                            color='#fff'
                        //fontWeight='bold'
                        />
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: '1%', }}>
                    <View style={{ marginHorizontal: '0%' }}>
                        <Drawer.Item
                            label='Profile'
                            icon='account'
                            style={styles.touchables}
                            onPress={() => this.props.navigation.navigate('EditProfile')}
                            theme={{ colors: { text: '#171560' } }}
                        />
                        <Drawer.Item
                            label='Change Password'
                            icon='cog'
                            style={styles.touchables}
                            onPress={() => this.props.navigation.navigate('ChangePassword', { token: this.state.token })}
                            theme={{ colors: { text: '#171560' } }}
                        />
                        <Drawer.Item
                            label='Find Doctors'
                            icon='briefcase-account'
                            style={styles.touchables}
                            onPress={() => this.props.navigation.navigate('DoctorListing')}
                            theme={{ colors: { text: '#171560' } }}
                        />
                    </View>
                    <View style={styles.lines} />
                    <View style={{ marginHorizontal: '0%' }}>
                        {/* <Drawer.Item
                            label='Find Hospitals'
                            icon='magnify'
                            style={styles.touchables}
                            onPress={() => this.props.navigation.navigate('HomePage')}
                            theme={{ colors: { text: '#171560' } }}
                        /> */}
                        <Drawer.Item
                            label='Book Appointment'//book-open-outline
                            icon='book-open-outline'
                            style={styles.touchables}
                            onPress={() => this.props.navigation.navigate('DoctorListing')}
                            theme={{ colors: { text: '#171560' } }}
                        />
                    </View>
                    <View style={styles.lines} />
                    <View style={{ marginHorizontal: '0%' }}>
                        {/* <Drawer.Item
                            label='Order Medines'
                            icon='book-multiple'
                            style={styles.touchables}
                            onPress={() => this.props.navigation.navigate('HomePage')}
                            theme={{ colors: { text: '#171560' } }}
                        /> */}
                        <Drawer.Item
                            label='My Appointments'
                            icon='book-open-outline'
                            style={styles.touchables}
                            onPress={() => this.props.navigation.navigate('MyAppoinment')}
                            theme={{ colors: { text: '#171560' } }}
                        />
                        <Drawer.Item
                            label='Add Family'
                            icon='book-multiple'
                            style={styles.touchables}
                            onPress={() => this.props.navigation.navigate('AddFamily')}
                            theme={{ colors: { text: '#171560' } }}
                        />
                    </View>
                    <View style={styles.lines} />
                    <View style={{ marginHorizontal: '0%' }}>
                        <Drawer.Item
                            label='Family Doctors'
                            icon='briefcase-account'
                            style={styles.touchables}
                            onPress={() => this.props.navigation.navigate('DoctorListing')}
                            theme={{ colors: { text: '#171560' } }}
                        />
                        <Drawer.Item
                            label='Personal Locker'
                            icon='book-variant-multiple'
                            style={styles.touchables}
                            onPress={() => this.props.navigation.navigate('DocumentList')}
                            theme={{ colors: { text: '#171560' } }}
                        />
                    </View>
                    <View style={styles.lines} />
                    {/* <View style={{ marginHorizontal: '0%' }}>
                        <Drawer.Item
                                label='Reminders'
                                icon='reminder'
                                style={styles.touchables}
                                onPress={() => this.props.navigation.navigate('HomePage')}
                                theme={{ colors: { text: '#171560' } }}
                            />
                        <Drawer.Item
                            label='My Wallet & Transactions'
                            icon='wallet'
                            style={styles.touchables}
                            onPress={() => this.props.navigation.navigate('HomePage')}
                            theme={{ colors: { text: '#171560' } }}
                        />
                    </View> */}
                    {/* <View style={styles.lines1} />
                    <View style={{ marginHorizontal: '0%' }}>
                        <Drawer.Item
                            label='Read About Health'
                            icon='book-open-variant'
                            style={styles.touchables}
                            onPress={() => this.props.navigation.navigate('HomePage')}
                            theme={{ colors: { text: '#171560' } }}
                        />
                    </View>
                    <View style={styles.lines} /> */}
                    <View style={{ marginHorizontal: '0%' }}>
                        <Drawer.Item
                            label='Help Desk'
                            icon='help-box'
                            style={styles.touchables}
                            onPress={() => this.props.navigation.navigate('HomePage')}
                            theme={{ colors: { text: '#171560' } }}
                        />
                    </View>
                    <View style={{ marginHorizontal: '0%' }}>
                        <Drawer.Item
                            label='Logout '
                            icon='logout'
                            style={styles.touchables}
                            onPress={() => this.clearAsyncStorage()}
                            theme={{ colors: { text: 'red' } }}
                        />
                    </View>
                </ScrollView>
            </PaperProvider>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    text: {
        paddingLeft: 8,
    },
    buttons: {
        marginRight: 20,
        marginBottom: 10
    },
    background: {
        width: undefined,
        padding: 15,
        paddingTop: 50,
    },
    profile_pic: {
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    name_text: {
        color: '#999',
        fontFamily: 'Roboto',
        fontSize: hp('2.6%'),
        paddingTop: 10,
    },
    touchables: {
        paddingVertical: hp('0.3%'),
    },
    Info: {
        color: '#fff', textAlign: 'left', marginHorizontal: '16%', fontSize: 16, fontWeight: 'bold'
    },
    lines: {
        borderColor: '#03b38f',
        borderWidth: 0.3,
        width: "100%",
        marginTop: '3%',
        marginBottom: '2%',
        marginHorizontal: '0%'
    },
    lines1: {
        borderColor: '#03b38f',
        borderWidth: 0.8,
        width: "100%",
        marginTop: '3%',
        marginBottom: '2%',
        marginHorizontal: '0%'
    }
});

export default DrawerComponent