import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image, Platform, ScrollView, Modal, ActivityIndicator, TextInput} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
// import {connect} from 'react-redux'
import { theme,dataLimit,screenMobileWidth,serverBaseUrl,documentPlaceholder,imageProvider } from '../config';
import { Feather } from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import * as DocumentPicker from 'expo-document-picker';
import { updateStudentDetails, updateStudentImage } from '../Utils/DataHelper/UserProfile';
import {setUserInfo} from '../Actions'  
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
// import {Feed} from "../Feed/Feed"

class Profile extends React.Component {

   state={
       studentImage: this.props.userInfo.studentImage,
       name: this.props.userInfo.name,
       email: this.props.userInfo.email,
       mobileNumber: this.props.userInfo.mobileNumber,
       stateOfResidence: this.props.userInfo.stateOfResidence,
     
   }

    handleImageBtnClick=()=>
    {
        DocumentPicker.getDocumentAsync({type:"image/*",copyToCacheDirectory:true,multiple:false}).then(response=>
        {
            console.log(response)
            if(response.type=="success")
            {
                this.setState({changedImage:response})
                console.log(response)
            }
        })
    }

    

    saveDetails=()=>{
        this.setState({loader: true})
        if(this.state.changedImage)
        {
            updateStudentImage(this.props.userInfo.id, this.state.changedImage, this.imageCallback)
        }
        else
        {
            updateStudentDetails(this.props.userInfo.id, this.props.userInfo.userId, this.state.email, this.state.name, this.state.stateOfResidence, this.state.mobileNumber, this.state.studentImage, this.props.userInfo.blocked,this.updateStudentCallback)
        }
    }

    imageCallback=(response)=>{
        if(response.status==201)
        {
            this.setState({studentImage:response.headers.map.location})
            updateStudentDetails(this.props.userInfo.id, this.props.userInfo.userId, this.state.email, this.state.name, this.state.stateOfResidence, this.state.mobileNumber, this.state.studentImage, this.props.userInfo.blocked,this.updateStudentCallback)
        }
        else
        {
            console.log("image error", response.status)
            Toast.show("Failed To Update Image. Please Try Again Later.")
        }
    }

    updateStudentCallback=(response)=>{
        this.setState({loader: false})
        if(response.status==201)
        {
            var obj={
                name: this.state.name, 
                email: this.state.email, 
                mobileNumber: this.state.mobileNumber, 
                studentImage: this.state.studentImage, 
                authType: this.props.userInfo.authType, 
                blocked: this.props.userInfo.blocked, 
                stateOfResidence: this.state.stateOfResidence, 
                userId: this.props.userInfo.userId,
                id: this.props.userInfo.id,
            }
            console.log("obj", obj)

            this.props.setUserInfo(obj)
            AsyncStorage.setItem('userDetails', JSON.stringify(obj))
            Toast.show("Profile Updated Successfully.")
        }
        else
        {
            Toast.show("Something Went Wrong. Please Try Again Later.")
        }
    }

    renderTextInput=(label, dValue, onchange)=>{
        return(
            <View style={{marginTop: '7%'}}>
                <Text style={{ fontSize: 14, color: theme.greyColor, marginTop: '7%'}}>{label}</Text>
                <TextInput defaultValue={dValue} onChangeText={onchange}/>
                <View style={{borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor}}/>
            </View>
        )
    }

    render(){
    
        return (
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                titleonheader={"Edit Profile"}
                headerStyle={{ justifyContent: 'center'}}
                replaceBottomTab={false}
                nosearchIcon={true}
                noNotificationIcon={true}
            >
                <ScrollView>
                    <View style={styles.container}>
                        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={this.handleImageBtnClick}>
                            <Image source={{uri: imageProvider(this.state.studentImage)}} style={{height: 100, width: 100, borderRadius: 50}}/>
                        </TouchableOpacity>

                        {this.renderTextInput('Name*',this.props.userInfo.name, (text)=>this.setState({name: text}))}
                        {this.renderTextInput('State*',this.props.userInfo.stateOfResidence, (text)=>this.setState({stateOfResidence: text}))}
                        {this.renderTextInput('Mobile Number*',this.props.userInfo.mobileNumber, (text)=>this.setState({mobileNumber: text}))}
                        {this.renderTextInput('Email*',this.props.userInfo.email, (text)=>this.setState({email: text}))}

                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity style={{borderRadius: 10, marginTop: '7%', paddingHorizontal: 50, paddingVertical:10, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.accentColor}} onPress={()=>this.saveDetails()}>
                               {this.state.loader?(
                                    <ActivityIndicator color={theme.primaryColor} size={"large"}/>
                                ):(
                                   <Text style={{color: theme.primaryColor, fontSize:18, fontWeight: 'bold'}}>Save</Text>
                                )} 
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>   
            </PageStructure>
            
        )
    }

}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        flexDirection: 'column',
        margin:15,
        // justifyContent: 'center', 

    },
})
        

const  mapStateToProps = (state)=>
{
    return {
        userInfo:state.user.userInfo,
    }
}
export default connect(mapStateToProps,{setUserInfo})(Profile);