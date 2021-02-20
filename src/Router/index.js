import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import WelcomePage from '../screens/WelcomePageScreen/index'
import WelcomeScreenpage from '../screens/WelcomePageScreens/index';
import Registeroption from '../screens/Registeroption/index';
import Login from '../screens/Login/index';
import Register from '../screens/Register/index';
import AlternateLoginOption from '../screens/AlternateLoginOption/index';
import OtpAuth from '../screens/OtpAuth/index';
import ChangePassword from '../screens/ChangePassword/index'
import OtpAuthResetPassword from '../screens/OtpAuthResetPassword/index'
import ForgotPassword from '../screens/ForgotPassword/index'
import DrawerComponent from '../Components/sidebar';
import HomePage from '../screens/HomePage/index';
import EditProfile from '../screens/EditProfile/index'
import Personal from '../screens/EditProfile/Personal'
import LifeStyle from '../screens/EditProfile/LifeStyle'
import AllDiscussionDetailsPage from '../screens/AllDiscussionDetailsPage/index'
import BookAppoinment from '../screens/BookAppoinment/index'
// import Personal from '../screens/EditProfile/Personal'
import FindDoctor from '../screens/FindDoctor/index'
import RegistrationByUserType from '../screens/RegistrationByUserType/index'
import DoctorRegistration from '../screens/RegistrationByUserType/DoctorRegistration'
import DoctorRegistrationAddress from '../screens/RegistrationByUserType/DoctorRegistrationAddress'
import DoctorListing from '../screens/DoctorListing/index'
import AddFamily from '../screens/AddFamily/index'
import AskQuestion from '../screens/AskQuestion/index'
import DoctorRegistrationProfession from '../screens/RegistrationByUserType/DoctorRegistrationProfession'
import FamilyMemberList from '../screens/AddFamily/FamilyMemberList'
import HomeScreen from '../screens/HomeScreen/index'
import CaseDiscussionScreen from '../screens/CaseDiscussionScreen/index'
import QuickCalenderScreen from '../screens/QuickCalenderScreen/index'
import PayoutScreen from '../screens/PayoutScreen/index'

import WorkInfo from '../screens/UserProfile/WorkInfo'

import SupportScreen from '../screens/SupportScreen/index'
import ProceedToPay from '../screens/BookAppoinment/ProcessTopay'
import AddFamilyMember from '../screens/AddFamily/AddFamilyMember'
import Booking_sucessfully from '../screens/BookAppoinment/Booking_sucessfully'
import Profile1 from '../screens/UserProfile/Profile1'
// import Profile2 from '../screens/UserProfile/Profile2'
// import Profile3 from '../screens/UserProfile/Profile3'
import UploadDocs from '../screens/UploadDocs/index'
import DocumentList from '../screens/DocumentList/index'
import AddPrescription from '../screens/AddPrescription/AddPrescription'

import DoctorInfo from '../screens/DoctorListing/DoctorInfo'
import MyAppoinment from '../screens/MyAppointments/index'

// for User Video & Chat Screen
import Videocall from '../screens/MyAppointments/Video'
import Chat from '../screens/MyAppointments/Chat'

// for Doctor Video & Chat Screen
import DoctorVideocall from '../screens/HomeScreen/VideoDoctorScreen'
import DoctorChat from '../screens/HomeScreen/ChatDoctorScreen'
import DoctorDocumentList from '../screens/DoctorDocumentList/index'
import UploadDocsDoctor from '../screens/UploadDocsDoctor/index'

import EditDoctorProfile from '../screens/UserProfile/EditDoctorProfile' 

// import QuickCalenderAppointmentListing from '../screens/QuickCalenderScreen/QuickCalenderAppointmentListing'

const TabNavigator = createBottomTabNavigator(
    {
        HomeScreen: {
            screen: HomeScreen,
            navigationOptions: ({ navigation, navigationOptions }) => ({
                tabBarLabel: "Home",
                tabBarIcon: ({ tintColor }) => {
                    return <Icon name="home" color={tintColor} size={30} style={{ marginTop: '4%' }} />;
                }
            }),
        },//Staffmgtpendding
        CaseDiscussionScreen: {
            screen: CaseDiscussionScreen,
            navigationOptions: ({ navigation, navigationOptions }) => ({
                tabBarLabel: "Case Study ",
                tabBarIcon: ({ tintColor }) => {
                    return <Icon name="account-group-outline" color={tintColor} size={30} style={{ marginTop: '4%' }} />;
                }
            }),
        },
        //StaffmgtRejected
        QuickCalenderScreen: {
            screen: QuickCalenderScreen,
            navigationOptions: ({ navigation, navigationOptions }) => ({
                tabBarLabel: "Calender",
                tabBarIcon: ({ tintColor }) => {
                    return <Icon name="calendar-month-outline" color={tintColor} size={30} style={{ marginTop: '4%' }} />;
                }
            }),
        },//AddInventory
        PayoutScreen: {
            screen: PayoutScreen,
            navigationOptions: ({ navigation, navigationOptions }) => ({
                tabBarLabel: "Payout",
                tabBarIcon: ({ tintColor }) => {
                    return <Icon name="credit-card-settings-outline" color={tintColor} size={30} style={{ marginTop: '4%' }} />;
                }
            }),
        },//AddInventory

        WorkInfo: {
            screen: WorkInfo,
            navigationOptions: ({ navigation, navigationOptions }) => ({
                tabBarLabel: "WorkInfo",
                tabBarIcon: ({ tintColor }) => {
                    return <Icon name="credit-card-settings-outline" color={tintColor} size={30} style={{ marginTop: '4%' }} />;
                }
            }),
        },//AddInventory

        Profile1: {
            screen: EditDoctorProfile,
            navigationOptions: ({ navigation, navigationOptions }) => ({
                tabBarLabel: " Profile",
                tabBarIcon: ({ tintColor }) => {
                    return <Icon name="account" color={tintColor} size={30} style={{ marginTop: '4%' }} />;
                }
            }),
        },//AddInventory
        SupportScreen: {
            screen: SupportScreen,
            navigationOptions: ({ navigation, navigationOptions }) => ({
                tabBarLabel: "Support",
                tabBarIcon: ({ tintColor }) => {
                    return <Icon name="face-agent" color={tintColor} size={30} style={{ marginTop: '4%' }} />;
                }
            }),
        },//AddInventory
    },
    {
        //initialRouteName: "HomeScreen",
        tabBarOptions: {   //backgroundColor:'#03b38f',
            activeTintColor: '#333',
            inactiveTintColor: '#fff',
            labelStyle: {
                fontSize: 12,
                fontWeight: "bold",
                marginBottom: 12,
            },
            style: {
                height: 70,
                backgroundColor: '#03b38f',
                borderTopColor: "#fff",
            }
        }
    },
);

const LoginStack = createStackNavigator(
    {
        WelcomeScreenpage: {
            screen: WelcomeScreenpage,
            navigationOptions: { header: null }
        },
        WelcomePage: {
            screen: WelcomePage,
            navigationOptions: { header: null }
        },
        Registeroption: {
            screen: Registeroption,
            navigationOptions: { header: null }
        },
        Login: {
            screen: Login,
            navigationOptions: { header: null, drawerLockMode: 'unlocked' },
        },
        Register: {
            screen: Register,
            navigationOptions: { header: null, drawerLockMode: 'locked-closed' }
        },
        AlternateLoginOption: {
            screen: AlternateLoginOption,
            navigationOptions: { header: null }
        },
        ForgotPassword: {
            screen: ForgotPassword,
            navigationOptions: { header: null }
        },
        OtpAuth: {
            screen: OtpAuth,
            navigationOptions: { header: null }
        },
        //ValidateOtp
        OtpAuthResetPassword: {
            screen: OtpAuthResetPassword,
            navigationOptions: { header: null }
        },
        // For Doctor Screen //
        TabNavigator: {
            screen: TabNavigator,
            navigationOptions: { header: null }
        },


        // DoctorRegistration: {
        //     screen: DoctorRegistration,
        //     navigationOptions: { header: null }
        // },
        // DoctorRegistrationProfession: {
        //     screen: DoctorRegistrationProfession,
        //     navigationOptions: { header: null }
        // },
        // AddPrescription
        AddPrescription: {
            screen: AddPrescription,
            navigationOptions: { header: null }
        },

    },
    { initialRouteName: 'WelcomePage' }
);


const HomeStack = createStackNavigator(
    {
        HomePage: {
            screen: HomePage,
            navigationOptions: { header: null }
        },//
        EditProfile: {
            screen: EditProfile,
            navigationOptions: { header: null }
        },
        ChangePassword: {
            screen: ChangePassword,
            navigationOptions: { header: null }
        },
        Personal: {
            screen: Personal,
            navigationOptions: { header: null }
        },
        LifeStyle: {
            screen: LifeStyle,
            navigationOptions: { header: null }
        },
        AllDiscussionDetailsPage: {
            screen: AllDiscussionDetailsPage,
            navigationOptions: { header: null }
        },
        BookAppoinment: {
            screen: BookAppoinment,
            navigationOptions: { header: null }
        },
        FindDoctor: {
            screen: FindDoctor,
            navigationOptions: { header: null }
        },
        //  Doctor Listing
        DoctorListing: {
            screen: DoctorListing,
            navigationOptions: { header: null }
        },

        AskQuestion: {
            screen: AskQuestion,
            navigationOptions: { header: null }
        },
        // RegistrationByUserType: {
        //     screen: RegistrationByUserType,
        //     navigationOptions: { header: null }
        // },
        // DoctorRegistration: {
        //     screen: DoctorRegistration,
        //     navigationOptions: { header: null }
        // },

        // Doctor Listing
        DoctorInfo: {
            screen: DoctorInfo,
            navigationOptions: { header: null }
        },
        ProceedToPay: {
            screen: ProceedToPay,
            navigationOptions: { header: null }
        },

        //user uplaod Docs
        UploadDocs: {
            screen: UploadDocs,
            navigationOptions: { header: null }
        },

        // DoctorRegistrationProfession: {
        //     screen: DoctorRegistrationProfession,
        //     navigationOptions: { header: null }
        // },


        //PastHomeWork
        DocumentList: {
            screen: DocumentList,
            navigationOptions: { header: null }
        },


        // AddFamily
        AddFamily: {
            screen: AddFamily,
            navigationOptions: { header: null }
        },
        FamilyMemberList: {
            screen: FamilyMemberList,
            navigationOptions: { header: null }
        },
        AddFamilyMember: {
            screen: AddFamilyMember,
            navigationOptions: { header: null }
        },

        // DoctorRegistrationAddress: {
        //     screen: DoctorRegistrationAddress,
        //     navigationOptions: { header: null }
        // },
        // Booking_sucessfully
        Booking_sucessfully: {
            screen: Booking_sucessfully,
            navigationOptions: { header: null },
        },
        MyAppoinment: {
            screen: MyAppoinment,
            navigationOptions: { header: null }
        },
        Videocall: {
            screen: Videocall,
            navigationOptions: { header: null }
        },
        Chat: {
            screen: Chat,
            navigationOptions: { header: null }
        },
        //user uplaod Docs
        UploadDocsDoctor: {
            screen: UploadDocsDoctor,
            navigationOptions: { header: null }
        },
        DoctorDocumentList: {
            screen: DoctorDocumentList,
            navigationOptions: { header: null }
        },
    },
    // {
    //     initialRouteName: 'HomePage',
    // }
);



const DoctorStack = createStackNavigator(
    {

        // TabNavigator: {
        //     screen: TabNavigator,
        //     navigationOptions: { header: null }
        // },



        EditDoctorProfile: {
            screen: EditDoctorProfile,
            navigationOptions: { header: null }
        },
        // Profile3: {
        //     screen: Profile3,
        //     navigationOptions: { header: null }
        // },

        // for Doctor Video Call & audio call
       
        // DoctorRegistration: {
        //     screen: DoctorRegistration,
        //     navigationOptions: { header: null }
        // },
        DoctorRegistrationAddress: {
            screen: DoctorRegistrationAddress,
            navigationOptions: { header: null }
        },
        // RegistrationByUserType: {
        //     screen: RegistrationByUserType,
        //     navigationOptions: { header: null }
        // },
        DoctorRegistrationProfession: {
            screen: DoctorRegistrationProfession,
            navigationOptions: { header: null }
        },
        DoctorVideocall: {
            screen: DoctorVideocall,
            navigationOptions: { header: null }
        },
        DoctorChat: {
            screen: DoctorChat,
            navigationOptions: { header: null }
        },
    },
    // {
    //     initialRouteName: 'HomePage',
    // }
);


const DrawerStack = createDrawerNavigator(
    {
        MainDrawer: { screen: HomeStack },
    },
    {
        initialRouteName: 'MainDrawer',
        backBehavior: 'initialRoute',
        drawerBackgroundColor: '#fff',

        drawerWidth: Dimensions.get('window').width * 0.75,
        contentComponent: props => (
            <DrawerComponent {...props} />
        )
    },
);


const Nav = createSwitchNavigator(
    {
        Login: LoginStack,
        Drawer: DrawerStack,
        Doctor: DoctorStack
    },
    {
        initialRouteName: 'Login'
    }
)


export default createAppContainer(Nav);