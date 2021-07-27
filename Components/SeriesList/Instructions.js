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
          animationType="slide"
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={closeModal}>
          {CardView(<View style={styles.centeredView}>
            <View style={styles.headView}>
                <Text style={styles.headText}>Instructions</Text>
            </View>
            <View style={styles.bodyView}>
                <Text style={styles.bodyText}>Instructions Here</Text>
            </View>
            <View style={styles.btnView}>
                <TouchableOpacity style={styles.btn} onPress={()=>{this.props.navigation.navigate("SingleTestSeries", {item: this.props.item}), closeModal()}}>
                    <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.btn} onPress={closeModal}>
                    <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
            </View>
          </View>,{height: height*0.5, width: width*0.7, justifyContent: 'center', marginTop: height*0.25,marginLeft: width*0.15,})}
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
    headerView: 
    {
        justifyContent: 'center'
    },
        headText:
        {
            fontSize: 18, 
            fontWeight: 'bold', 
            margin: 10
        },
    bodyView: 
    {
        justifyContent: 'center', 
        alignItems: 'center'
    },
        bodyText:{
            fontSize: 16,  
            margin: 10
        },
    btnView:
    {
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        marginTop: 'auto', 
        marginBottom: 10, 
        marginRight: 10
    },
        btn:
        {
            backgroundColor: theme.accentColor,
            padding:6, 
            borderRadius: 3, 
            margin: 5
        },
            btnText:
            {
                color: theme.primaryColor
            }
    
});

export default Instructions;