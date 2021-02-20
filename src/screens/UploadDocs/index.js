import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Alert, FlatList, Switch, TextInput, Image } from 'react-native';
import { Container, Header, Title, Content, Card, CardItem, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'
// import DocumentPicker from 'react-native-document-picker';

import axios from 'axios'
export default class UploadDocs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      title: '',
      isModalVisible: false,
      email: "",
      password: "",
      name: '',
      purpose: '',
      venue: '',
      fees: '',
      date: '',
      date1: '',
      file: null

    }
  }
  addEvent = async (response) => {
  
    const token = await AsyncStorage.getItem('Token')
    console.log(" @@##$ data???", token);

  
    RNFetchBlob.fetch('POST', "https://svcaapkadoctor.azurewebsites.net/api/profiles/uploaddocuments", {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }, [
      { name: 'type', data: response.type },
      { name: 'title', data: this.state.title },
      { name: 'file', filename: response.fileName, type: response.type, data: RNFetchBlob.wrap(response.uri) },


    ]).then((response) => response.json())
      .then((response) => {
        console.log("selfieeee blob response....", response);

        if (response !== null) {
          Alert.alert("Message", response.message)

        }
         this.props.navigation.navigate('DocumentList');
        // ...
      }).catch((err) => {
        console.log(" errorrr  Fectch blob response....", err);
      })
  }

  storeData = () => {
    const options = {
      title: 'Select Avatar',
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
        quality: 0.5,
      },
    };
    if(this.state.title!==null && this.state.title!==''){
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response ======= ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log("uriiii response.latitude", response.latitude);//response.longitude

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          uri: response.uri
        });

        this.addEvent(response)
      }
    });
  }
  else{
    Alert.alert('Message',"Please Enter Document Title!!!!")
  }

  }

  render() {

    return (
      <ScrollView>
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
        <TextInput
                    style={{ marginHorizontal: '5%', borderWidth: 0.5, padding: '1%',marginTop:'10%',borderRadius:12 ,paddingHorizontal:'5%'}}
                    value={this.state.title}
                    placeholder='Enter Title *'
                    onChangeText={text => this.setState({ title: text })}
                    multiline={true}
                    numberOfLines={2}
                />


        <TouchableOpacity style={{ height: '10%', backgroundColor: '#03b38f', marginVertical: '30%', marginHorizontal: '18%', borderRadius: 35, flexDirection: 'row', alignContent: 'center', marginTop: '10%' }}
          onPress={this.storeData}
        // this.props.navigation.navigate('HomePage')}
        >
          <Text
            style={{ marginRight: '5%', color: '#fff', marginVertical: '5%', marginHorizontal: '20%', fontWeight: 'bold', fontSize: 20 }}
          >
            Upload Document
                        </Text>
        </TouchableOpacity>
        <Image
          source={{ uri: this.state.uri }}
          style={{ width: 200, height: 200, marginHorizontal: '15%' }}
        />


      </ScrollView>

    )
  }

}