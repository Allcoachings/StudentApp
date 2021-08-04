import React, { Component ,useState,useRef} from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text,StyleSheet,ScrollView,TouchableOpacity,Dimensions,Image,TouchableWithoutFeedback, Modal, TextInput, ImageBackground,ToastAndroid } from 'react-native';
import CardView from '../Utils/CardView';
import AuthHeader from './AuthHeader';
import {theme, Assets} from '../config'
import { StackActions, ThemeProvider } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Clipboard from '@react-native-community/clipboard'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import OtpInputs from '../OtpInputs';
import { generateOtp,validateOtp } from '../Utils/DataHelper/Otp';
import { findStudentByMobile } from '../Utils/DataHelper/EnrollStudent';
import {setUserInfo,userAuthStatus} from '../Actions'    

import PhoneInput from "react-native-phone-number-input";
// import { Toast } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
var rate ; 

const phoneInput = useRef<PhoneInput>(null);
class OtpVerification extends React.Component {  
    state = {
        phoneNumber : this.props.mobile,
        mode:'mobile'
    }
    getOtp=(otp) =>{
        console.log(otp);
        this.setState({ otp });
  } 
  handleOtpGenerateCallBack=(response)=>
    {
        if(response.status==200)
        {
            response.json().then(data=>
            { 
                this.setState({loader:false}) 
                ToastAndroid.show("Otp Sent", ToastAndroid.SHORT); 
            })
        }
    }
    handleResendBtnClick=()=>
    {
        if(!this.state.loader)
        {
            this.setState({loader:true})
            generateOtp(this.state.phoneNumber,this.handleOtpGenerateCallBack)
        }
        
        // this.props.openModal()
    }
    findStudentByMobileCallBack=(response)=>
    {
        console.log(response.status)
        if(response.status==200)
        {
            response.json().then(data=>{
                console.log(data)
                if(data) 
                {
                    this.props.setUserInfo(data)
                    this.props.userAuthStatus(true);
                    AsyncStorage.setItem('authInfo', JSON.stringify({...data,authType:'user'}))  
                    // this.props.navigation.navigate("Home")  
                }else
                {
                    this.props.openInfoModal()
                    this.props.closeModal() 
                }
            })
        }
    }
    otpVerificationCallback=(response)=>
    {
       
        console.log(response.status)
            if(response.status==200)
            {
                response.json().then(data=>{
                    console.log("otp status",data)
                    if(data)
                    {
                        findStudentByMobile(this.state.phoneNumber,this.findStudentByMobileCallBack)
                    }
                    this.setState({optVerificationLoading:false})
                })
            } 
    }
    handleContinueBtnClick=()=>
    {
        if(!this.state.optVerificationLoading)
        {
            this.setState({optVerificationLoading:true})
            validateOtp(this.state.otp,this.state.phoneNumber,this.otpVerificationCallback)
        }
    }





    sendOtp=()=>
    {
            this.setState({mode:"mobile"});
    }
    renderContent=()=>
    {
        switch(this.state.mode)
        {
            case 'mobile':
                return(
                    <View style={styles.container}>
                        <View style={{margin:10,marginLeft:20,width:'100%',}}>
                            <Text style={{fontFamily:'Raleway_700Bold',color:theme.secondaryColor,fontSize:20,marginBottom:5}}>Your mobile number</Text>
                            <Text style={{fontFamily:'Raleway_400Regular',color:theme.greyColor,marginBottom:8}}>We'll send on OTP for Verification</Text>
                        </View> 
                        <View style={{marginLeft:'auto' }}>
                            <PhoneInput
                                ref={phoneInput}
                                // defaultValue={value}
                                defaultCode="DM"
                                layout="first"
                                containerStyle={{
                                    borderColor:theme.secondaryColor,
                                    borderWidth:1,
                                    borderRadius:10,
                                    padding:5,
                                    width:width-20, 
                                    margin:10
                                }}
                                textInputStyle={{
                                    fontFamily:'Raleway_600SemiBold'
                                }}
                                maxLength={10}
                                onChangeText={(text) => {
                                    this.checkNumber(text)
                                }}
                                onChangeFormattedText={(text) => {
                                    // this.checkNumber(text)   
                                }}
                                withDarkTheme
                                defaultCode='IN'
                                withShadow 
                                // autoFocus
                                 
                            />
                        </View>
                        <View style={{alignItems: 'center',width: width,marginTop:'auto',marginBottom:15}}>
                            <View style={{margin:20}}>
                                <Text style={{fontFamily:'Raleway_600SemiBold',fontSize:12,color:theme.greyColor}}>Login as Institute</Text> 
                            </View>
                            <TouchableWithoutFeedback onPress={this.sendOtp}>
                                <View style={{backgroundColor:theme.greyColor,padding:15,borderRadius:10,alignItems: 'center',width:'95%'}}>
                                    <Text style={{fontFamily:'Raleway_700Bold',fontSize:15,color:theme.primaryColor}}>Continue</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                )
            case 'otp':
                return (
                    <View >
                        <Text style={{fontSize:25,marginBottom:10,fontFamily:'Raleway_600SemiBold',marginLeft:10}}>Verify OTP</Text>
                        <View style={{marginLeft:10,flexDirection: 'row',}}>
                            
                            <Text style={{fontSize:13,color:theme.greyColor,fontFamily:'Raleway_600SemiBold'}}>
                                We have sent it on {this.state.phoneNumber}</Text> 
                        </View>
                        {/* <View style={{marginTop:15,marginLeft:20}}>
                            <TextInput style={styles.queDesc} onChangeText={(text)=>this.setState({Otp: text})}  placeholder="Enter OTP" placeholderTextColor={theme.labelOrInactiveColor}/>
                        </View> */}
                        {/* <View style={{marginTop:15,marginBottom:20,marginLeft:width*0.15,borderWidth:2,borderColor:theme.greyColor,borderRadius:5}}> */}
                            <OTPInputView
                                style={{width: '100%', height: 80,borderRadius:10}}
                                pinCount={6}
                                code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                onCodeChanged = {code => { this.setState({code})}}
                                autoFocusOnLoad
                                codeInputFieldStyle={styles.underlineStyleBase}
                                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                onCodeFilled = {this.getOtp}
                            />
                        {/* </View> */}
                            {/* <OtpInputs getOtp={(otp) => this.getOtp(otp)} /> */}
                        <View style={{flexDirection:'row',marginTop:20,marginLeft:10,color:theme.greyColor,fontFamily:'Raleway_600SemiBold'}}>
                            <View>
                                <Text>
                                    Resend Otp in 59s
                                </Text>  
                            </View>
                            {/* <View>
                                <TouchableOpacity onPress={()=>this.handleResendBtnClick()}>
                                    <Text style={[styles.email]}>Resend</Text>
                                </TouchableOpacity>
                            </View> */}
                            
                        </View>


                        <View style={{flexDirection:'row',justifyContent:'center',marginTop:height*0.5,width:width*0.9,alignItems: 'center'}}>
                            <Text style={{fontFamily:'Raleway_600SemiBold'}}>Having Trouble? <Text style={[styles.email]}>Reach Us at www.example.com</Text></Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center',marginTop:20,marginBottom:20,alignItems: 'center',width:width,borderTopWidth:1,borderTopColor:theme.labelOrInactiveColor,paddingTop:10}}> 
                            <TouchableWithoutFeedback onPress={this.handleContinueBtnClick}>
                                <View style={{backgroundColor:theme.greyColor,padding:15,borderRadius:10,alignItems: 'center',width:'95%'}}>
                                    <Text style={{fontFamily:'Raleway_700Bold',fontSize:15,color:theme.primaryColor}}>Continue</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                            
                        
                )
        }
    }
    render() {
        return(
            <Modal
            animationType="fade"
            transparent={true}  
            // style={{height:500,width:5001}}
            visible={this.props.isOtpModal}
            >
                <View>
                {CardView(
                    <View style={styles.container}>
                        
                                <View style={styles.header}>
                                    {/* <AuthHeader/>                         */}
                                    <Feather name="chevron-left" size={20} color={theme.greyColor}/>
                                </View>
                            {this.renderContent()}
                    </View>,{width: width, height: height, }
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
        width:width*0.65,
        height: height*0.6,
        margin:'auto'
        // borderWidth: 1
    },
        header:
        {
            flexDirection: 'row',
            width: width,
            height: height*0.05,
            alignItems: 'center', 
            margin:10,
            justifyContent: 'space-between',
        },
        email:{
            color:theme.greyColor,
            textDecorationLine: 'underline',
            textDecorationStyle: 'solid',
            marginLeft:5,
            fontFamily:'Raleway_400Regular'
        },
        queDesc:
            {
                borderRadius: 10,
                padding: 4,
                // borderWidth: 0.5,
                backgroundColor:'rgb(242, 242, 242)',
                width:width*0.8
            },
        borderStyleBase: {
            width: 30,
            height: 45
          },
         
          borderStyleHighLighted: {
            borderColor: theme.greyColor,
          },
         
          underlineStyleBase: {     
            // width: 30,
            // paddingLeft:10,
            // paddingRight:10,
            // height: 60,
            // borderWidth: 0,
            // color:'black',
            // borderBottomWidth: 1,
            margin:5,
            borderRadius:10
          },
         
          underlineStyleHighLighted: {
            borderColor: theme.greyColor,
          },
          authModeBtn :
          {
              backgroundColor:theme.greyColor,
              padding:"5%",
              marginTop:'3%', 
              width:width*0.15,
              marginTop:25,
              height:height*0.07,
              borderRadius:50,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection:'row',
            //   flex:1
          },
              btnText:
              {
                  color:theme.primaryColor,
                  fontSize:16,
                  fontWeight:'bold',
                  marginRight:10
              }
                

})
 
export default connect(null,{setUserInfo,userAuthStatus})(OtpVerification);
