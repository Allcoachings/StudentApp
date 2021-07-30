import React, { Component } from 'react';
import { View, Text,Modal,ScrollView,TouchableOpacity,ActivityIndicator,StyleSheet,TextInput } from 'react-native';
import {theme} from '../config'
import CardView from '../Utils/CardView';
import {addCourseDocumentPlaylist} from '../Utils/DataHelper/Course'
import Toast from 'react-native-simple-toast';

class AddDocumentPlaylist extends Component { 
    state=
    {
        name:'',
    }

    handleAddPlaylistCallBack=(reponse) =>
    {
        if(reponse.status ===201)
        {
            Toast.show('Playlist Added Successfully.');
            console.log("created",reponse.headers.map.location)
            this.props.appendPlaylist({name:this.state.name,courseId:this.props.courseId,id:reponse.headers.map.location})
            this.props.closeModal()
        }
        else
        {
            Toast.show('Something Went Wrong. Please Try Again Later.');
        }
        this.setState({addPlaylistLoading:false})
    }
    handleAddPlaylistClick=() =>
    {
        if(this.verify(this.state))
        {
            this.setState({addPlaylistLoading:true})
            addCourseDocumentPlaylist(this.state.name,this.props.courseId,this.handleAddPlaylistCallBack)
        }else
        {
            Toast.show('Please Fill All The Fields.');
        }
    }

    verify=({name}) =>name

  render() {
    return (
        <Modal 
            animationType = {"fade"} 
            transparent = {false}
            visible = {this.props.isModalVisible}
            onRequestClose = {() => this.props.closeModal()}>
    
            <ScrollView>
                <View style={styles.headView}>
                    <Text style={styles.headText}>Add Document Playlist</Text>
                </View>
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Playlist Name</Text>
                        {CardView(
                            <TextInput
                                placeholderTextColor={theme.greyColor}
                                placeholder="Name"
                                defaultValue={this.state.name}
                                onChangeText={(text)=>this.setState({name: text})}
                                style={styles.inputField}
                            />, {borderRadius: 10}
                        )}
                </View>
                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.submitButton} onPress={this.handleAddPlaylistClick}>
                          {this.state.addPlaylistLoading?
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
export default AddDocumentPlaylist;
