
import React, { Component } from 'react';
import { Button, View, Text, TouchableOpacity, TextInput, Image, ImageBackground, StyleSheet, FlatList, Switch, Alert, Modal } from 'react-native';
import TimePicker from 'react-native-simple-time-picker';
import RadioGroup from 'react-native-radio-buttons-group';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class BlogDeatils extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            modalVisible: false,
            data: [
              {
                label: (
                  <Text style={{ color: '#03b38f', fontSize: 10, padding: 0 }}>{'MILD'}</Text>
                ),
        
        
              },
              {
                label: (
                  <Text style={{ color: 'orange', fontSize: 10 }}>{'MODERATE'}</Text>
                ),
                value: "I'm",
        
              },
              {
                label: (
                  <Text style={{ color: 'red', fontSize: 10 }}>{'(HIGH)102+'}</Text>
                ),
        
              },
        
            ],
        
            data2: [
              {
                label: (
                  <Text style={{ color: '#03b38f', fontSize: 10, padding: 0 }}>{'MILD'}</Text>
                ),
        
        
              },
              {
                label: (
                  <Text style={{ color: 'orange', fontSize: 10 }}>{'MODERATE'}</Text>
                ),
                value: "I'm",
        
              },
              {
                label: (
                  <Text style={{ color: 'red', fontSize: 10 }}>{'(HIGH)'}</Text>
                ),
        
              },
        
            ],
         }
    }

    componentDidMount(){
        this.setState({modalVisible:true})
      }
      openModal() {
        this.setState({ modalVisible: true });
      }
    
      closeModal() {
        alert("closing")
        this.setState({ modalVisible: false });
      }
    
      // update state
      onPress = data => this.setState({ data });
      onPress = data2 => this.setState({ data2 });
    
    render() { 
        const { selectedHours, selectedMinutes } = this.state;
        let selectedButton = this.state.data.find(e => e.selected == true);
        selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;
        selectedButton = selectedButton ? selectedButton.value : this.state.data2[0].label;

        return ( 
          
        <View style={styles.container}>
        <Modal
          style={styles.centeredView}
          visible={this.state.modalVisible}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <View>
                  <View style={{}}
                   onPress={() => this.closeModal()}>
                   <Icon name="times"  onPress={() => this.setState({ modalVisible: false}) } 
                      style={{
                      color: '#03b38f',
                      fontSize: 30,
                      position: 'absolute',
                      right: 1,
                      top: 1 }}   
                       
                    />
                  </View>
                  <Text style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: 25 }}>FEVER</Text>
                  <Text style={{
                    fontSize: 12, paddingLeft: 0
                  }}>Answering this will Help Dr. XYZ to know more about your issues</Text>

                  <View
                    style={{
                      borderBottomColor: '#eff0f1',
                      borderBottomWidth: 1,
                      padding: 3,
                    }}
                  />
                  <Text style={{ fontSize: 15, fontWeight: 'bold', paddingLeft: 0, marginTop: 6 }}>Since How Long Have You Had Fever?</Text>

                  <View style={{ height: 70 }}>

                    <View style={styles.timepik}>
                      <Text style={{ fontWeight: 'bold', color: '#03b38f' }}>{selectedHours} hours : {selectedMinutes} min</Text>
                      <TimePicker
                        selectedHours={selectedHours}
                        selectedMinutes={selectedMinutes}
                        onChange={(hours, minutes) => this.setState({ selectedHours: hours, selectedMinutes: minutes })}
                      />
                    </View>

                  </View>

                  <View
                    style={{
                      borderBottomColor: '#eff0f1',
                      borderBottomWidth: 1,
                      padding: 4,

                    }}
                  />
                  <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 8 }}>What Was The Maximum Temparature Recorded?</Text>
                  <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}>
                    <RadioGroup
                      radioButtons={this.state.data}
                      onPress={this.onPress}
                      flexDirection='row'

                    />
                  </View>

                  <View
                    style={{
                      borderBottomColor: '#eff0f1',
                      borderBottomWidth: 1,
                      padding: 4,

                    }}
                  />

                  <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 8 }}>Does it comes down to 99 or lower with Med?</Text>
                  <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}>
                    <RadioGroup
                      radioButtons={this.state.data2}
                      onPress={this.onPress}
                      flexDirection='row'

                    />
                  </View>

                  <View
                    style={{
                      borderBottomColor: '#eff0f1',
                      borderBottomWidth: 1,
                      padding: 4,

                    }}
                  />
                  <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 8 }}>Any other specific issue you want to mention?</Text>

                  <TextInput style={{}}
                    placeholder="Add Your Issue"
                    placeholderTextColor="gray"
                    numberOfLines={10}
                    multiline={true}
                    style={{
                      height: 70, borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 10,
                      justifyContent: "flex-start"

                    }}
                  />
                  <Text style={{ fontWeight: 'bold', color: 'red' }}>Note:
                <Text style={{ color: 'red', fontWeight: 'normal' }}>All Replies are thoroughly processed,Please avoid any kind of abusive language,threats,etc.</Text></Text>

                </View>
              </View>

              <TouchableOpacity
                style={styles.buttonsubmit} >
                <Text style={{ color: 'white', fontWeight: 'bold', padding: 3, fontSize: 18 }}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>

        </Modal>
      </View>

     );
    }
}
 

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",

  },
  conditiontext: {
    fontSize: 10,
    marginTop: 20
  },
  modalView: {
    padding: 10,
    width: '100%',
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  button: {
    display: 'flex',
    height: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0
    },
    shadowRadius: 25,
  },
  buttonsubmit: {
    elevation: 8,
    backgroundColor: "#03b38f",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 30,
    marginTop: 20,
    marginBottom: 15
  },
  closeButton: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3974',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  image: {
    marginTop: 150,
    marginBottom: 10,
    width: '100%',
    height: 350,
  },
  text: {
    fontSize: 16,
    display: 'flex',
    padding: 8,
    fontWeight: "bold",
    fontStyle: 'normal'
  },

  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
  },
  timepik: {
    flex: 1,
    backgroundColor: '#eff0f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});