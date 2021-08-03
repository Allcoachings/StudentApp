import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Image, TouchableOpacity, View, TextInput } from "react-native";
import {theme} from '../config';
import ImageViewer from 'react-native-image-zoom-viewer';

class ImageZoomModal extends React.Component {
  state = {
    modalVisible: true,
  };


 
  render() {
    const { zoomModal,closeModal } = this.props;
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={zoomModal}
          onRequestClose={closeModal}>
          <View style={styles.centeredView}>
            <ImageViewer imageUrls={this.props.images.map(e => { return { url: e }})} />
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