import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Modal from "react-native-modal";

const Loader=props =>
{
  const {
    loading,
    ...attributes
  }=props
  
  return (
    <Modal
      isVisible={ loading }
      animationIn='fadeIn'
      animationOut='fadeOut'
      hasBackdrop={ false }
      coverScreen={ true }
    >
      <View style={ styles.centeredView }>
        <View style={ styles.modalView }>
          <Text style={{fontWeight:'bold',color:"#03b38f"}}>Logout</Text>
        </View>
      </View>
    </Modal>
  )

}
const styles=StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginHorizontal:'10%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  centeredView: {
    position:'absolute',
    top:"3%",
    right: 0,
  //  flex: 1,
   // justifyContent: "center",
  //  alignItems: "center",
    //marginTop: 22
  }
});
export default Loader;