//OnlineConsults
import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, AsyncStorage, ImageBackground, Alert, FlatList, Switch } from 'react-native';
import { Container, Header, Title, Content, Card, CardItem, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Loader from '../../Components/Loader';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

let listener1;
export default class OnlineConsults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            value: false,
            isModalVisible: false,
            pdata: {},
            childID: '',
            pObj: {},
            cObj: {},
            childName: '',
            cname: '',
            data: [
                {
                    id: 1,
                    cname: 'John Doe',
                    class: '2nd standard',
                    attendace: '80%'


                },




            ]

        }
    }

    async componentDidMount() {

        
    }

    _handleMenu = () => this.props.navigation.dispatch(DrawerActions.toggleDrawer());
   

    renderItem = ({ item }) => {

        console.log(item);
        return (

            <>
                {item.id !== '' ?
                    <TouchableOpacity style={{ marginHorizontal: '4%', borderRadius: 15, marginVertical: '2%' }}
                        onPress={() => this.props.navigation.navigate('HomePage', { data: item }

                        )}>

                        <Card style={{ borderRadius: 20 }}>

                            <CardItem style={styles.cardItem}>


                                <Left style={{ flexDirection: 'column' }}>
                                    <Text style={styles.cardLeft2}>{item.login_detail.first_name}</Text>
                                    <Text style={styles.cardLeft4}>Grade {item.class_name}</Text>
                                    {/* <Text style={styles.cardLeft4}>Attendance 70%</Text> */}
                                </Left>

                                {/* <Body></Body> */}
                                <Right>
                                    <Icon2 name='account-circle' color='#171560' size={80} style={{ marginRight: '5%' }} />
                                </Right>
                            </CardItem>

                        </Card>

                    </TouchableOpacity> :
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22 }}>Sorry,No child found</Text>
                }
            </>
        );

    };
    render() {
        return (
                <Container>
                    <Loader loading={this.tate.loading} />

                    <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#171560' }}>
                        <Left style={{ marginLeft: '2%' }}>
                            <TouchableOpacity
                                onPress={this._handleMenu}>
                                <Icon name='menu' style={{ color: '#fff' }} />
                            </TouchableOpacity>
                        </Left>
                        <Body>
                            <Title style={{ color: '#fff', marginLeft: '45%', fontSize: 25 }}>home</Title>
                        </Body>
                        <Right>
                            {/* <TouchableOpacity
                     onPress={() => this.props.navigation.navigate('NotificationTab')}>
                         <Icon1 name='notifications-outline' color='#fff' size={25} style={{marginRight:'5%'}} />
                        </TouchableOpacity> */}
                        </Right>

                    </Header>
                    <ScrollView>
                       

                        <FlatList
                            style={{ marginHorizontal: '2%', marginTop: '6%' }}
                            data={this.state.pdata}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id}></FlatList>

                    </ScrollView>

                </Container>
        )
    }

}