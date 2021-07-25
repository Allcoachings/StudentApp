import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Image, TouchableOpacity, View, TextInput } from "react-native";
import {theme} from '../config';
import SingleImageZoomViewer from 'react-native-single-image-zoom-viewer'

class ImageZoomModal extends React.Component {
  state = {
    modalVisible: true,
  };


 
  render() {
    console.log("this.props.image", this.props.image)
    const { zoomModal,closeModal } = this.props;
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={zoomModal}
          onRequestClose={closeModal}>
          <View style={styles.centeredView}>
            <Image source={{uri: this.props.image}} style={{height:'100%', width: '100%'}}/>
          </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: theme.secondaryColor
  },
    
});

export default ImageZoomModal;