import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Image, TouchableOpacity, View, TextInput } from "react-native";
import {theme,serverBaseUrl} from '../config';
import ImageViewer from 'react-native-image-zoom-viewer';

class ImageZoomModal extends React.Component {
  state = {
    modalVisible: true,
  };

  renderImage=()=>{
    switch(this.props.type)
    {
      case "normal": return (<ImageViewer index={this.props.index}   backgroundColor={theme.primaryColor} imageUrls={this.props.images.map(e => { return { url: e }})} />)
                    break;

      case "slider": return (<ImageViewer index={this.props.index} backgroundColor={theme.primaryColor} imageUrls={this.props.images.map(e => { return { url: serverBaseUrl+e.feedImage }})} />)
                    break;
    }
  }
 
  render() {
    const { zoomModal,closeModal } = this.props;
     
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={zoomModal}
          onRequestClose={closeModal}>
          <View style={styles.centeredView}>
            {this.renderImage()}
          </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: theme.primaryColor
  },
    
});

export default ImageZoomModal;