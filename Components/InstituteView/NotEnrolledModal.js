import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Image, TouchableOpacity, View, TextInput } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {theme,serverBaseUrl} from '../config';

class NotEnrolledModal extends React.Component {
  state = {
    isModalVisible: true,
  };
 
  render() {
    const { closeModal } = this.props;
    const { isModalVisible } = this.state;
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
            <TouchableWithoutFeedback>
                {CardView(
                    <View style={{width: '100%', height: '100%'}}>
                        <Text>
                            Hello
                        </Text>
                    </View>
                )}
            </TouchableWithoutFeedback>
        </Modal>
    )}
}
export default NotEnrolledModal