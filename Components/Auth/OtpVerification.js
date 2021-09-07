import React, { Component ,useState,useRef} from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text,StyleSheet,ScrollView,TouchableOpacity,Keyboard,Dimensions,Image,TouchableWithoutFeedback, Modal, TextInput, ImageBackground,ToastAndroid} from 'react-native';
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
import registerForPushNotificationsAsync from '../Utils/PushNotification'
import PhoneInput from "react-native-phone-number-input";
// import { Toast } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
var rate ; 

const phoneInput = useRef<PhoneInput>(null);
class OtpVerification extends React.Component {  
    state = {
        phoneNumber : '',
        mode:'mobile',
        contBtnBg: false,
        loader: false
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
                console.log(data)
                this.setState({loader:false, mode: "otp", contBtnBg: false}) 
                ToastAndroid.show("Otp Sent", ToastAndroid.SHORT); 
            })
        }
    }
    handleResendBtnClick=()=>
    {
        if(this.state.phoneNumber)
        {
            if(!this.state.loader)
            {
                this.setState({loader:true})
                generateOtp(this.state.phoneNumber,this.handleOtpGenerateCallBack)
            }
        }else
        {
            this.setState({error:"Please Enter Mobile Number"})
        }
        
        
        // this.props.openModal()
    }
    
    findStudentByMobileCallBack=(response)=>
    {
        console.log(response.status)
        if(response.status==200)
        {
            response.json().then(data=>{
                if(data) 
                {
                    this.props.setUserInfo(data)
                    this.props.userAuthStatus(true);
                    AsyncStorage.setItem('authInfo', JSON.stringify({...data,authType:'user'}))  
                    // this.props.navigation.navigate("Home")   
                    registerForPushNotificationsAsync(data.id,'student',()=>{console.log('token saved')})
                }else

                {
                     
                    this.props.openInfoModal(this.state.phoneNumber)
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


    checkNumber=(text)=>{
        if(this.state.mode=="mobile")
        {
            if(text.length==10)
            {
                this.setState({contBtnBg: true, phoneNumber: text})
            }
            else 
            {
                this.setState({contBtnBg: false})
            }
        }
        else if(this.state.mode=="otp")
        {
            if(text.length==6)
            {
                this.setState({contBtnBg: true, code: text})
            }
            else 
            {
                this.setState({contBtnBg: false})
            }
        }
    }

    renderContent=()=>
    {
        // if(this.state.mode=="mobile")
        // {
            return(
                <View style={styles.container}>
                    <View style={{margin:10,marginLeft:20,width:'100%'}}>
                        <Text style={{fontFamily:'Raleway_700Bold',color:theme.secondaryColor,fontSize:20,marginBottom:5}}>{this.state.mode=="mobile"?("Your mobile number"):("Verify OTP")}</Text>
                        <Text style={{fontFamily:'Raleway_400Regular',color:theme.greyColor,marginBottom:8}}>
                        {this.state.mode=="mobile"?("We'll send on OTP for Verification"):("We have sent it on "+this.state.phoneNumber)}
                        </Text>
                       
                    </View> 
                    {this.state.error?( 
                            <Text style={styles.errorText}>{this.state.error}</Text>
                        ):(null)}
                    <View style={{marginLeft:'auto' }}>
                    {this.state.mode=="mobile"?(<PhoneInput
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
                            autoFocus
                        />):(
                            <OTPInputView
                                style={{width: '100%', height: 80,color: theme.secondaryColor, marginLeft:20,borderRadius:10}}
                                pinCount={6}
                                code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                onCodeChanged = {code => { this.checkNumber(code)}}
                                autoFocusOnLoad
                                codeInputFieldStyle={styles.underlineStyleBase}
                                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                onCodeFilled = {this.getOtp}
                            />
                        )}
                    </View>
                    <View style={{alignItems: 'center',width: width,marginTop: 'auto',marginBottom:this.props.keyboardHeight?this.props.keyboardHeight+50:15}}>

                        <View style={{margin:20}}>
                            <TouchableWithoutFeedback onPress={()=>{this.props.changeMode(2)}}>
                                <View>
                                    <Text style={{fontFamily:'Raleway_600SemiBold',fontSize:12,color:theme.greyColor}}>Login as Institute</Text> 
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <TouchableWithoutFeedback onPress={this.state.mode=="mobile"?(this.handleResendBtnClick):(this.handleContinueBtnClick)} disabled={false}>
                            <View style={[this.state.contBtnBg?({backgroundColor:theme.accentColor}):({backgroundColor:theme.greyColor}),{padding:15,borderRadius:10,alignItems: 'center',width:'95%'}]}>
                                <Text style={{fontFamily:'Raleway_700Bold',fontSize:15,color:theme.primaryColor}}>{this.state.loader?(
                                    <ActivityIndicator color={theme.primaryColor} size={"small"}/>
                                ):("Continue")}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            )
        // }
                
            // case 'otp':
            //     return (
            //         <View >
            //             <Text style={{fontSize:25,marginBottom:10,fontFamily:'Raleway_600SemiBold',marginLeft:10}}>Verify OTP</Text>
            //             <View style={{marginLeft:10,flexDirection: 'row',}}>
                            
            //                 <Text style={{fontSize:13,color:theme.greyColor,fontFamily:'Raleway_600SemiBold'}}>
            //                     We have sent it on {this.state.phoneNumber}</Text> 
            //             </View>
                        {/* <View style={{marginTop:15,marginLeft:20}}>
                            <TextInput style={styles.queDesc} onChangeText={(text)=>this.setState({Otp: text})}  placeholder="Enter OTP" placeholderTextColor={theme.labelOrInactiveColor}/>
                        </View> */}
                        {/* <View style={{marginTop:15,marginBottom:20,marginLeft:width*0.15,borderWidth:2,borderColor:theme.greyColor,borderRadius:5}}> */}
                            // <OTPInputView
                            //     style={{width: '100%', height: 80,borderRadius:10}}
                            //     pinCount={6}
                            //     code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                            //     onCodeChanged = {code => { this.setState({code})}}
                            //     autoFocusOnLoad
                            //     codeInputFieldStyle={styles.underlineStyleBase}
                            //     codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            //     onCodeFilled = {this.getOtp}
                            // />
                        {/* </View> */}
                            {/* <OtpInputs getOtp={(otp) => this.getOtp(otp)} /> */}
                        // <View style={{flexDirection:'row',marginTop:20,marginLeft:10,color:theme.greyColor,fontFamily:'Raleway_600SemiBold'}}>
                        //     <View>
                        //         <Text>
                        //             Resend Otp in 59s
                        //         </Text>  
                        //     </View>
                            {/* <View>
                                <TouchableOpacity onPress={()=>this.handleResendBtnClick()}>
                                    <Text style={[styles.email]}>Resend</Text>
                                </TouchableOpacity>
                            </View> */}
                            
                        // </View>


                    //     <View style={{flexDirection:'row',justifyContent:'center',marginTop:height*0.5,width:width*0.9,alignItems: 'center'}}>
                    //         <Text style={{fontFamily:'Raleway_600SemiBold'}}>Having Trouble? <Text style={[styles.email]}>Reach Us at www.example.com</Text></Text>
                    //     </View>
                    //     <View style={{flexDirection:'row',justifyContent:'center',marginTop:20,marginBottom:20,alignItems: 'center',width:width,borderTopWidth:1,borderTopColor:theme.labelOrInactiveColor,paddingTop:10}}> 
                    //         <TouchableWithoutFeedback onPress={this.handleContinueBtnClick}>
                    //             <View style={{backgroundColor:theme.greyColor,padding:15,borderRadius:10,alignItems: 'center',width:'95%'}}>
                    //                 <Text style={{fontFamily:'Raleway_700Bold',fontSize:15,color:theme.primaryColor}}>Continue</Text>
                    //             </View>
                    //         </TouchableWithoutFeedback>
                    //     </View>
                    // </View>
                            
                        
                // )
        // }
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
                        
                                <TouchableWithoutFeedback onPress={()=>this.props.closeModal() }>
                                    <View style={styles.header}>
                                        {/* <AuthHeader/>                         */}
                                        <Feather name="arrow-left" size={20} color={theme.greyColor}/>
                                    </View>
                                </TouchableWithoutFeedback>
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
        errorText:
        {
            fontFamily: 'Raleway_600SemiBold',
            textAlign: 'center',
            marginTop:10,
            color:theme.featureNoColor 
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
 const mapStateToProps = (state)=>
 {
     return {
         keyboardHeight: state.screen.keyboardHeight
     }
 }
export default connect(mapStateToProps,{setUserInfo,userAuthStatus})(OtpVerification);
