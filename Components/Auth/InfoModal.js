import React, { Component ,useState} from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text,StyleSheet,ScrollView,TouchableWithoutFeedback,Dimensions,Image, Modal, TextInput, ImageBackground } from 'react-native';
import CardView from '../Utils/CardView';
import {theme, Assets,defaultStudentImage} from '../config'
import { StackActions, ThemeProvider } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Rating, AirbnbRating } from 'react-native-ratings';
import {setUserInfo,userAuthStatus} from '../Actions'
import {registerStudent} from '../Utils/DataHelper/EnrollStudent'
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('window').width
const height = Dimensions.get('screen').height
var rate ;

class InfoModal extends React.Component {
    state = {
        heading : 'Create your account',
        mobileNumber:this.props.mobileNumber,
        studentImage:defaultStudentImage
        
    }
    registerCallBack=(response)=>
    {
            console.log(response.status)   
            if(response.status === 201)
            {
                  this.props.setUserInfo({id:response.headers.map.location,email:this.state.email,name:this.state.name,state:this.state.state,mobileNumber:this.state.mobileNumber,userId:this.state.mobileNumber,studentImage:this.state.studentImage})
                  this.props.userAuthStatus(true);
                //   this.props.navigation.navigate("Home")
                AsyncStorage.setItem('userDetails', JSON.stringify({id:response.headers.map.location,email:this.state.email,name:this.state.name,state:this.state.state,mobileNumber:this.state.mobileNumber,userId:this.state.mobileNumber,studentImage:this.state.studentImage,authType:'user'}))

            }
    }

    handleSubmitButtonClick=() => {
        registerStudent(this.state.email,this.state.name,this.state.state,this.state.mobileNumber,this.state.studentImage,this.registerCallBack)
    }
    
    render() {
        return(
            <Modal
            animationType="fade"
            transparent={true}
            // style={{height:500,width:5001}}
            visible={this.props.isModalVisible}
            >
                <View>
                {CardView(
                    <View style={styles.container}>


                        <View style={styles.header}>
                            {/* <AuthHeader/>                         */}
                            <Feather name="chevron-left" size={20} color={theme.greyColor}/>
                        </View>
                        <View>
                            <Text style={styles.postQueText}>{this.state.heading}</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontFamily: 'Raleway_400Regular',marginLeft:'5%',marginRight:2}}>Signing up with </Text>
                                <Text style={{margin:2}}>+91 8109176342</Text>
                            </View>
                            {/* <TouchableOpacity onPress={()=>this.props.closeModal()}>
                                <Image source={Assets.discussions.closeIcon} style={styles.closeIcon}/>
                            </TouchableOpacity> */}
                             
                        </View>
                        
                        <View style={{marginTop:height*0.04}}>
                            <Text style={{marginLeft:15,fontFamily:'Raleway_600SemiBold'}}>Full Name</Text>
                        </View>
                        <View style={styles.queDescView}>
                            <TextInput style={styles.queDesc} onChangeText={(text)=>this.setState({name: text})}  placeholder="Enter full name" placeholderTextColor={theme.labelOrInactiveColor}/>
                        </View>
                        <View style={{marginTop:15}}>
                            <Text style={{marginLeft:15,fontFamily:'Raleway_600SemiBold'}}>Email address</Text>
                        </View>
                        <View style={styles.queDescView}>
                            <TextInput style={styles.queDesc} onChangeText={(text)=>this.setState({email: text})}  placeholder="Enter email address" placeholderTextColor={theme.labelOrInactiveColor}/>
                        </View>
                        <View style={{marginTop:15,}}>
                            <Text style={{marginLeft:15,fontFamily:'Raleway_600SemiBold'}}>State</Text>
                        </View>
                        <View style={styles.queDescView}>
                            <TextInput style={styles.queDesc} onChangeText={(text)=>this.setState({state: text})}  placeholder="Select your state" placeholderTextColor={theme.labelOrInactiveColor}/>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center',marginTop:'auto',marginBottom:20,alignItems: 'center',width:width,borderTopWidth:1,borderTopColor:theme.labelOrInactiveColor,paddingTop:10}}>  
                            <TouchableWithoutFeedback onPress={this.handleSubmitButtonClick}>
                                <View style={{backgroundColor:theme.greyColor,padding:15,borderRadius:10,alignItems: 'center',width:'95%'}}>
                                    <Text style={{fontFamily:'Raleway_700Bold',fontSize:15,color:theme.primaryColor}}>Continue</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                            
                        
                    </View>,{width: width, height: height-40, marginLeft: 'auto', marginRight:'auto',}
                )}
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        flexDirection: 'column',
        // width:width*0.65,
        // height: height*0.6,
        margin:'auto'
        // borderWidth: 1
    },
        header:
        {
            flexDirection: 'row',
            width: width*0.65,
            height: height*0.05,
            alignItems: 'center',
            marginTop:'5%',
            marginLeft: '5%',
            justifyContent: 'space-between',
        },
            postQueText:
            {
               fontSize: width*0.06,
               marginLeft: '5%', 
               fontFamily: 'Raleway_600SemiBold'

            },
            closeIcon:
            {
                height: height*0.027,
                alignSelf: 'flex-end',
                width: width*0.06,
                marginLeft: '15%',
                marginBottom: 10,
                marginRight: 10
            },
        queView:
        {
            marginTop: '1%',
            padding: 10
        },
            
        queDescView:
        {
            marginTop: '1%',
            padding: 10
        },
            queDesc:
            {
                borderRadius: 10,
                padding: 10,
                borderWidth: 1,
                fontFamily: 'Raleway_600SemiBold',
                borderColor:theme.labelOrInactiveColor, 
            },
        btnView: 
        {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            backgroundColor:theme.themeColor,
            width: '50%',
            marginBottom:10
        },
                       
            btnText: 
            {
                fontSize: 18,
                fontWeight:'bold',
                color: theme.primaryColor,
                padding: 10,
            },
            authModeBtn :
            {
                backgroundColor:theme.accentColor,
                padding:"5%",
                marginTop:'3%', 
                width:'100%',
                marginTop:25,
                height:height*0.05,
                borderRadius:5,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection:'row',
                flex:1
            },
                

})

export default connect(null,{setUserInfo,userAuthStatus})(InfoModal);
