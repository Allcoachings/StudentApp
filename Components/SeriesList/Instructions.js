import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Image, TouchableOpacity, View, TextInput, Dimensions } from "react-native";
import {theme} from '../config'
import CardView from '../Utils/CardView'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height;

class Instructions extends React.Component {
  state = {
    modalVisible: true,
  };


 
  render() {
    const { closeModal } = this.props;
    return (
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={closeModal}>
          {CardView(<View style={styles.centeredView}>
            <View style={{borderBottomWidth:1,borderBottomColor:theme.labelOrInactiveColor,padding:10,}}>
                <Text style={{fontFamily:'Raleway_700Bold',fontSize:20}}>Instructions</Text>
            </View>
            <View style={{margin:10}}>
                <Text style={styles.bodyText}>Instructions Here</Text>
            </View>
            <View style={{marginTop:'auto',}}>
                <TouchableOpacity style={{backgroundColor:theme.accentColor,padding:10,alignItems: 'center'}} onPress={()=>{this.props.navigation.navigate("SingleTestSeries", {item: this.props.item}), closeModal()}}>
                    <Text style={{fontFamily:'Raleway_600SemiBold',fontSize:18,color:theme.primaryColor}}>Continue</Text>
                </TouchableOpacity >
                {/* <TouchableOpacity style={styles.btn} onPress={closeModal}>
                    <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity> */}
            </View>
          </View>,{height: height, width: width})}
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: 
  {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },  
     
    
});

export default Instructions;