import React, { Component } from 'react';
import { View, Text,Modal,ScrollView,TouchableOpacity,ActivityIndicator,StyleSheet,TextInput } from 'react-native';
import {theme} from '../config'
import CardView from '../Utils/CardView';
class AddVideoPlaylist extends Component { 
    state={}

  render() {
    return (
        <Modal 
            animationType = {"fade"} 
            transparent = {false}
            visible = {this.props.isModalVisible}
            onRequestClose = {() => this.props.closeModal()}>
    
            <ScrollView>
                <View style={styles.headView}>
                    <Text style={styles.headText}>Add Video Playlist</Text>
                </View>
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Playlist Name</Text>
                        {CardView(
                            <TextInput
                                placeholderTextColor={theme.greyColor}
                                placeholder="Name"
                                defaultValue={this.props.description}
                                onChangeText={(text)=>this.setState({title: text})}
                                style={styles.inputField}
                            />, {borderRadius: 10}
                        )}
                </View>
                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.submitButton} onPress={this.handleSubMitBtnClick}>
                          {this.state.addCourseLoading?
                          (
                            <ActivityIndicator color={theme.primaryColor} size={"large"}/>
                          ):( 
                               <Text style={styles.submitButtonText}>Submit</Text>
                            )}
                    </TouchableOpacity> 
                </View>
            </ScrollView>
   

    </Modal>

    );
  }
}

const styles = StyleSheet.create({
    headView:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
        headText:
        {
            marginTop:10,
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.secondaryColor
        },
    inputView: {
        marginTop:'5%',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10
    },
        labelText: {
            fontSize: 18,
            fontWeight: '700',
            color: theme.secondaryColor,
            marginBottom: 10,
        },
        inputField:
        {
            padding:10,
            fontSize: 16
        },
    btnView:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
        submitButton:
        {
            borderRadius: 10,
            backgroundColor:theme.accentColor,
            padding: 10,
            marginRight:10
        },
            submitButtonText:
            {
                color: theme.primaryColor
            },
        addMoreButton:
        {
            borderRadius: 10,
            backgroundColor:theme.addMoreButtonColor,
            padding: 10,
            marginLeft: 10
        },
            addMoreButtonText:
            {
                color: theme.primaryColor
            },


    // add course css end
})
export default AddVideoPlaylist;
