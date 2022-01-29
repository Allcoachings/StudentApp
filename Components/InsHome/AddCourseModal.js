import React, { Component } from 'react';
import { View, Text,StyleSheet,Modal,TouchableWithoutFeedback,TextInput,ScrollView } from 'react-native';
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
      // console.log(response.status)
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
                      
                            <TextInput 
                                placeholderTextColor={theme.greyColor} 
                                placeholder="Title" 
                                defaultValue={this.props.description} 
                                onChangeText={(text)=>this.setState({title: text})} 
                                style={styles.inputField}
                            /> 
                </View>
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Course Description</Text>
                      
                            <TextInput 
                                placeholderTextColor={theme.greyColor} 
                                placeholder="Description" 
                                onChangeText={(text)=>this.setState({description: text})} 
                                multiline={true} 
                                numberOfLines={3} 
                                style={styles.inputField}
                            /> 
                </View>
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Course Fee</Text>
                    
                            <TextInput 
                                placeholderTextColor={theme.greyColor} 
                                placeholder="Fee" 
                                keyboardType='numeric'
                                onChangeText={(text)=>this.setState({fees: text})} 
                                multiline={false} 
                                numberOfLines={1} 
                                style={styles.inputField}
                            /> 
                        
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
    
            <>
                <View style={styles.headView}>
                    <Text style={styles.headText}>Add Course</Text>
                </View>
                {this.addCourseFrom()}
                <View style={styles.btnView}>
                    <TouchableWithoutFeedback  onPress={this.handleSubMitBtnClick}>
                        <View style={styles.submitButton}>
                          {this.state.addCourseLoading?
                          (
                            <ActivityIndicator color={theme.primaryColor} size={"large"}/>
                          ):( 
                               <Text style={styles.submitButtonText}>Submit</Text>
                          )}
                        </View>
                    </TouchableWithoutFeedback>
                    {/* <TouchableOpacity style={styles.addMoreButton}>
                            <Text style={styles.addMoreButtonText}>Add More+</Text>
                    </TouchableOpacity> */}
                </View>
            </>
   

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
            fontFamily: 'Raleway_600SemiBold',
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
            color: theme.secondaryColor,
            marginBottom: 10,
            fontFamily:'Raleway_600SemiBold'
        },
        inputField:
        {
           
            borderRadius: 10,
            padding: 10,
            margin:10,
            borderWidth: 1,
            fontFamily: 'Raleway_600SemiBold',
            borderColor:theme.labelOrInactiveColor, 
        },
    btnView:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
    
        marginBottom: 20,
    },
        submitButton:
        {
            borderRadius: 10,
            backgroundColor:theme.accentColor,
            padding: 10, 
            width:'95%',
            alignItems: 'center',


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
