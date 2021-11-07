import React, { Component ,useState} from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { View, Text,StyleSheet,ScrollView,TouchableWithoutFeedback,Dimensions,Image, Modal, TextInput, ImageBackground } from 'react-native';
import CardView from '../Utils/CardView';
import {theme, Assets,defaultStudentImage} from '../config'
import { StackActions, ThemeProvider } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Rating, AirbnbRating } from 'react-native-ratings';
import {setUserInfo,userAuthStatus} from '../Actions'
import {registerStudent} from '../Utils/DataHelper/EnrollStudent'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from 'native-base';
import { ActivityIndicator } from 'react-native-paper';
const width = Dimensions.get('window').width
const height = Dimensions.get('screen').height
var rate ;

class InfoModal extends React.Component {
    state = {
        heading : 'Create your account',
        studentImage:defaultStudentImage,
        isLoading:false,
        indianStates:[
            "Select",
            "Andaman and Nicobar Islands",
            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chandigarh",
            "Chhattisgarh",
            "Dadra and Nagar Haveli",
            "Daman and Diu",
            "Delhi",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jammu and Kashmir",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Ladakh",
            "Lakshadweep",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Puducherry",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttar Pradesh",
            "Uttarakhand",
            "West Bengal"
        ],
        state:'Select'
        
    }


    renderPickerItem=(item)=>
    {
        return(
            <Picker.Item label={item} value={item} />
        )
    }
    registerCallBack=(response)=>
    {
             
            if(response.status === 201)
            {
                  this.props.setUserInfo({id:response.headers.map.location,email:this.state.email,name:this.state.name,state:this.state.state,mobileNumber:this.props.mobileNumber,userId:this.props.mobileNumber,studentImage:this.state.studentImage})
                  this.props.userAuthStatus(true);
                //   this.props.navigation.navigate("Home")
                AsyncStorage.setItem('authInfo', JSON.stringify({id:response.headers.map.location,email:this.state.email,name:this.state.name,state:this.state.state,mobileNumber:this.props.mobileNumber,userId:this.props.mobileNumber,studentImage:this.state.studentImage,authType:'user'}))

            }else
            {
                this.setState({error:'Email Already Registered',isLoading:false})
            }
    }
    verify=({email,name,state})=>email&&name&&state!="Select"
    handleSubmitButtonClick=() => {
        if(!this.state.isLoading)
        {
            if(this.verify(this.state))
            {
                this.setState({isLoading:true,error:null})
                registerStudent(this.state.email,this.state.name,this.state.state,this.props.mobileNumber,this.state.studentImage,this.registerCallBack)
            }else
            {
                this.setState({error:'Please fill all the fields'});
                
            }
        }
        
        
    }
    setSelectedState=(state)=>
    {
      
            this.setState({state})
    }
    render() {
        
        return(
            <Modal
            animationType="fade"
            transparent={true}
            // style={{height:500,width:5001}}
            visible={this.props.isModalVisible}
            >
                <TouchableWithoutFeedback>
                    <View style={{height:height,width:width}}>
                        
                        {CardView(
                           
                            <View style={styles.container}>
                            <ScrollView>

                                <View style={styles.header}>
                                    {/* <AuthHeader/>                         */}
                                    <EvilIcons name="chevron-left" size={20} color={theme.greyColor}/>
                                </View>
                                <View>
                                    <Text style={styles.postQueText}>{this.state.heading}</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontFamily: 'Raleway_400Regular',marginLeft:'5%',marginRight:2}}>Signing up with </Text>
                                        <Text style={{margin:2}}>+91 {this.props.mobileNumber}</Text>
                                    </View>
                                    {/* <TouchableOpacity onPress={()=>this.props.closeModal()}>
                                        <Image source={Assets.discussions.closeIcon} style={styles.closeIcon}/>
                                    </TouchableOpacity> */}
                                    {this.state.error?( 
                                        <Text style={styles.errorText}>{this.state.error}</Text>
                                    ):(null)}
                                    
                                    
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
                                    {/* <TextInput style={styles.queDesc} onChangeText={(text)=>this.setState({state: text
                                    })}  placeholder="Select your state" placeholderTextColor={theme.labelOrInactiveColor}/> */}
                                    <Picker
                                        style={[styles.queDesc,{height:30}]}
                                        selectedValue={this.state.state}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setSelectedState(itemValue)
                                        }>
                                            {/* <Picker.Item label="Java" value="java" />
                                            <Picker.Item label="JavaScript" value="js" /> */}
                                        {this.state.indianStates&&this.state.indianStates.map((item)=>this.renderPickerItem(item))}
                                        </Picker>
                                </View>
                                </ScrollView>
                                <View 
                                    style={{flexDirection:'row',justifyContent:'center',marginTop:'auto',marginBottom:this.props.keyboardHeight?this.props.keyboardHeight+10:15,alignItems: 'center',width:width,borderTopWidth:1,borderTopColor:theme.labelOrInactiveColor,paddingTop:10}}
                                >  
                                
                                    <TouchableWithoutFeedback onPress={this.handleSubmitButtonClick}>
                                        
                                        <View style={{backgroundColor:theme.accentColor,padding:15,borderRadius:10,alignItems: 'center',width:'95%'}}>
                                        {this.state.isLoading?(

                                                <ActivityIndicator color={theme.primaryColor} size={'small'}/>
                                            ):(
                                                <Text style={{fontFamily:'Raleway_700Bold',fontSize:15,color:theme.primaryColor}}>Continue</Text>    
                                            )}
                                            
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                    
                          
                            </View>,{width: width, height: height-40, marginLeft: 'auto', marginRight:'auto',}
                        )}
                    </View>
                </TouchableWithoutFeedback>
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
            errorText:
            {
                fontFamily: 'Raleway_600SemiBold',
                textAlign: 'center',
                marginTop:10,
                color:theme.featureNoColor 
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
const mapStateToProps = (state)=>
{
    return {
        keyboardHeight: state.screen.keyboardHeight
    }
}
export default connect(mapStateToProps,{setUserInfo,userAuthStatus})(InfoModal); 
