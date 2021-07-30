import React, { Component } from 'react';
import { View, Text,StyleSheet,Modal,TouchableOpacity,TextInput,ScrollView } from 'react-native';
import CardView from '../Utils/CardView'
import{theme} from '../config'
import {addCourse} from '../Utils/DataHelper/Course'
import Toast from 'react-native-simple-toast';

class AddCourseModal extends Component {
   state={
       addCourseLoading:false,
   }



  verfiyFields=({title,description,fees})=>title&&description&&fees

  handleAddCourseCallback=(response)=> 
  {
      console.log(response.status)
      if(response.status==201)
      {
            Toast.show('Course Added Successfully.');
            this.setState({addCourseLoading:false})
            this.props.appendCourses({id:response.headers.map.location,title:this.state.title,description:this.state.description,fees:this.state.fees,instId:this.props.instId})
            this.props.closeModal()
      }
      else
      {
        Toast.show('Something Went Wrong. Please Try Again Later.');
      }
  }
  handleSubMitBtnClick=()=>
  {
      if(!this.state.addCourseLoading)
      {
          if(this.verfiyFields(this.state))
          {
              let {title,description,fees} = this.state
                addCourse(title, description,fees,this.props.instId,this.handleAddCourseCallback);
          }else
          {
              Toast.show('Please Fill All The Fields.');
          }
      }
  }
  addCourseFrom=()=>{
      return(
            <>
                
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Course Title</Text>
                        {CardView(
                            <TextInput 
                                placeholderTextColor={theme.greyColor} 
                                placeholder="Title" 
                                defaultValue={this.props.description} 
                                onChangeText={(text)=>this.setState({title: text})} 
                                style={styles.inputField}
                            />, {borderRadius: 10}
                        )}
                </View>
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Course Description</Text>
                        {CardView(
                            <TextInput 
                                placeholderTextColor={theme.greyColor} 
                                placeholder="Description" 
                                onChangeText={(text)=>this.setState({description: text})} 
                                multiline={true} 
                                numberOfLines={3} 
                                style={styles.inputField}
                            />, {borderRadius: 10}
                        )}
                </View>
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Course Fee</Text>
                        {CardView(
                            <TextInput 
                                placeholderTextColor={theme.greyColor} 
                                placeholder="Fee" 
                                keyboardType='numeric'
                                onChangeText={(text)=>this.setState({fees: text})} 
                                multiline={false} 
                                numberOfLines={1} 
                                style={styles.inputField}
                            />, {borderRadius: 10}
                        )}
                </View>
        </>
      )
  }

  render() {
    return (
        <Modal 
            animationType = {"fade"} 
            transparent = {false}
            visible = {this.props.isAddCourseModalVisible}
            onRequestClose = {() => this.props.closeModal()}>
    
            <ScrollView>
                <View style={styles.headView}>
                    <Text style={styles.headText}>Add Course</Text>
                </View>
                {this.addCourseFrom()}
                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.submitButton} onPress={this.handleSubMitBtnClick}>
                          {this.state.addCourseLoading?
                          (
                            <ActivityIndicator color={theme.primaryColor} size={"large"}/>
                          ):( 
                               <Text style={styles.submitButtonText}>Submit</Text>
                            )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addMoreButton}>
                            <Text style={styles.addMoreButtonText}>Add More+</Text>
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
});
export default AddCourseModal;
