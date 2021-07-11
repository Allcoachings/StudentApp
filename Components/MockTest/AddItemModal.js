import React, { Component } from 'react';
import { View, Text,Modal,ScrollView,TouchableOpacity,ActivityIndicator,StyleSheet,TextInput } from 'react-native';
import {theme} from '../config'
import CardView from '../Utils/CardView';
import {addCourseTimetableItem} from '../Utils/DataHelper/Course'
class AddItemModal extends Component { 
    state=
    {
        name:'',
    }

    handleAddItemCallBack=(reponse) =>
    {
            if(reponse.status ===201)
            {
                console.log("created",reponse.headers.map.location)
                this.props.appendItems({title:this.state.title,subTitle:this.state.subTitle,date:this.state.date,time:this.state.time,subjectId:this.props.subjectId,id:reponse.headers.map.location})
                this.props.closeModal()
            }
            this.setState({addItemLoading:false})
    }
    handleAddItemClick=() =>
    {
        if(this.verify(this.state))
        {
            this.setState({addItemLoading:true})
            addCourseTimetableItem(this.state.title,this.state.subTitle,this.state.date,this.state.time,this.props.subjectId,this.handleAddItemCallBack)
        }else
        {
            console.log("empty filds")
        }
    }

    verify=({title,subTitle,date,time}) =>title&&subTitle&&date&&time

  render() {
      console.log(this.props.subjectId)
    return (
        <Modal 
            animationType = {"fade"} 
            transparent = {false}
            visible = {this.props.isModalVisible}
            onRequestClose = {() => this.props.closeModal()}>
    
            <ScrollView>
                <View style={styles.headView}>
                    <Text style={styles.headText}>Add Video Item</Text>
                </View>
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Title</Text>
                        {CardView(
                            <TextInput
                                placeholderTextColor={theme.greyColor}
                                placeholder="Title"
                                defaultValue={this.state.title}
                                onChangeText={(text)=>this.setState({title: text})}
                                style={styles.inputField}
                            />, {borderRadius: 10}
                        )}
                </View>
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Sub Title</Text>
                        {CardView(
                            <TextInput
                                placeholderTextColor={theme.greyColor}
                                placeholder="Sub Title"
                                defaultValue={this.state.subTitle}
                                onChangeText={(text)=>this.setState({subTitle: text})}
                                style={styles.inputField}
                            />, {borderRadius: 10}
                        )}
                </View>
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Date</Text>
                        {CardView(
                            <TextInput
                                placeholderTextColor={theme.greyColor}
                                placeholder="Date"
                                defaultValue={this.state.date}
                                onChangeText={(text)=>this.setState({date: text})}
                                style={styles.inputField}
                            />, {borderRadius: 10}
                        )}
                </View>
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Time</Text>
                        {CardView(
                            <TextInput
                                placeholderTextColor={theme.greyColor}
                                placeholder="Time"
                                defaultValue={this.state.time}
                                onChangeText={(text)=>this.setState({time: text})}
                                style={styles.inputField}
                            />, {borderRadius: 10}
                        )}
                </View>
                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.submitButton} onPress={this.handleAddItemClick}>
                          {this.state.addItemLoading?
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
export default AddItemModal;
