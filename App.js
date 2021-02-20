import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, AsyncStorage, FlatList, Modal, Image, Switch ,Text} from 'react-native';
import Nav from './src/Router/index'


// import Nav from './src/Services/WhocanSee/index'

export default class App extends Component {
  constructor() {
    super();
  }

  render() {

    return (
            <Nav/>
    )
  }

}

