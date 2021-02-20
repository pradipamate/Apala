import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Alert, FlatList, Switch, TextInput, Linking } from 'react-native';
import { Container, Header, Title, Content, Card, CardItem, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import ImagePath from '../../Services/ImagePath'
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { FAB } from 'react-native-paper';
import Loader from '../../Components/Loader';

const axios = require('axios');
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            DocumentsData: [],
            sectionData: [],
            subData: [],
            selectedClass: null,
            selectedSection: '',
            selectedSubject: '',
            text: '',
            selectedItems: [],
        }
    }


    loadInBrowser = (item) => {
        let base = ImagePath + item.doc_path
        console.log("base", base)
        let doc = (base).toString();
        if (doc !== null) {
            // console.log(doc);
            Linking.openURL(doc).catch(err => console.error("Couldn't load page", err));
        } else {
            Alert.alert('No Document Found!!')
        }
    };

    async componentDidMount() {
        this.getDocuments()
    }

    getDocuments = async () => {
        const t = await AsyncStorage.getItem('Token')

        // console.log(" @@##$ data???", t);
        this.setState({
            loading: true
        })

        fetch('https://svcaapkadoctor.azurewebsites.net/api/profiles/documents', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${t}`
            },
        })
            .then(response => response.json())
            .then((response) => {
                // this.getSections(response,uid)
                this.setState({
                    loading: false
                })
                // console.log("Docuets data...#$$$$$$$$$%%%%%%%%%%%%%%%%%%%%", response);
                this.setState({ DocumentsData: response })
                //  this.getSections(uid,response)

            })
            .catch((error) => {
                console.error(error);
            })


    }
    renderItem = ({ item }) => {
        return (
            <>

                <TouchableOpacity style={{ marginHorizontal: '4%', borderRadius: 15, marginVertical: '2%', marginTop: '5%' }}
                    // onPress={() => this.props.navigation.navigate('TabNavigator', { item: item })
                    // }
                    >
                    <Card style={{ borderRadius: 20 }}>
                        <CardItem style={styles.cardItem}>
                            <Right style={{ flexDirection: 'column' }}>
                                <Text style={styles.cardLeft2}>Name : {item.title}</Text>
                                <Text style={styles.cardLeft}>Document ID : {item.document_id}</Text>
                                <Text style={styles.cardLeft}>verification_status : {item.verification_status}</Text>
                                <Text style={styles.cardLeft4}>Date :<Text style={{ color: '#03b38f' }}>{item.created_at}</Text></Text>
                            </Right>
                        </CardItem>
                        <CardItem style={{ backgroundColor: '#fff' }}>
                            <>
                                <Button style={{ width: '50%', backgroundColor: '#03b38f', borderRadius: 45, marginRight: '3%' }}
                                    onPress={() => this.loadInBrowser(item)} >
                                    <Text style={{ marginLeft: '22%', fontWeight: 'bold', fontSize: 14, color: '#fff', }}>Preview</Text>
                                </Button>
                            </>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </>
        );

    };
    render() {

        return (
            <Container>
                <Loader loading={this.state.loading} />
                <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
                    <Left style={{ marginLeft: '2%' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('HomePage')}>
                            <Icon name='arrow-back' size={25} style={{ padding: 0, color: '#fff' }} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff', marginLeft: '0%' }}>Documents</Title>
                    </Body>
                </Header>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '3%' }}>
                    <View><Text style={{ fontWeight: 'bold', fontSize: 17 }}>Registration Certificate</Text></View>
                    <View>
                        <TouchableOpacity style={{ backgroundColor: '#03b38f', flexDirection: 'row', alignContent: 'center', borderRadius: 10, padding: 8 }}
                            onPress={() => this.props.navigation.navigate('UploadDocs')}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Upload </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '3%' }}>
                    <View><Text style={{ fontWeight: 'bold', fontSize: 17 }}>Master degree</Text></View>
                    <View>
                        <TouchableOpacity style={{ backgroundColor: '#03b38f', flexDirection: 'row', alignContent: 'center', borderRadius: 10, padding: 8 }}
                            onPress={() => this.props.navigation.navigate('UploadDocs')}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Upload </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '3%' }}>
                    <View><Text style={{ fontWeight: 'bold', fontSize: 17 }}>Adhar Card</Text></View>
                    <View>
                        <TouchableOpacity style={{ backgroundColor: '#03b38f', flexDirection: 'row', alignContent: 'center', borderRadius: 10, padding: 8 }}
                            onPress={() => this.props.navigation.navigate('UploadDocs')}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Upload </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ padding: 10 }}><Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: '#03b38f' }}>Documents </Text></View>

                <FlatList
                    style={{ flex: 1, marginHorizontal: '2%', }}
                    data={this.state.DocumentsData}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}></FlatList>
            </Container>

        )
    }

}