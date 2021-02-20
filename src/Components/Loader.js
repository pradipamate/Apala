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
      <View style={ styles.modal_background }>
        <View style={ styles.activity_indicator_container }>
          <ActivityIndicator size='large' color='#171560' animating={ loading } />
        </View>
      </View>
    </Modal>
  )
}
const styles=StyleSheet.create({
  modal_background: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activity_indicator_container: {
    backgroundColor: 'transparent',
    height: 100,
    width: 100,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
export default Loader;