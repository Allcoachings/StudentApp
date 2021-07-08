import React, { Component ,useState} from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text,StyleSheet,ScrollView,TouchableOpacity,Dimensions,Image, Modal, TextInput, ImageBackground } from 'react-native';
import CardView from '../Utils/CardView';
import AuthHeader from './AuthHeader';
import {theme, Assets} from '../config'
import { StackActions, ThemeProvider } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Clipboard from '@react-native-community/clipboard'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import OtpInputs from '../OtpInputs';
const width = Dimensions.get('window').width
const height = Dimensions.get('screen').height
var rate ;

class OtpVerification extends React.Component {
    state = {
        phoneNumber : this.props.mobile
    }
    getOtp=(otp) =>{
        console.log(otp);
        this.setState({ otp });
  }
    render() {
        return(
            <Modal
            animationType="slide"
            transparent={true}
            // style={{height:500,width:5001}}
            visible={this.props.isOtpModal}
            >
                <View>
                {CardView(
                    <View style={styles.container}>
                        
                            <View style={styles.header}>
                                <AuthHeader/>                        
                            </View>
                        <View >
                            <View style={{marginTop:20,marginLeft:20,marginRight:-10}}>
                                <Text style={{fontSize:25,marginBottom:10}}>Enter OTP</Text>
                                <Text style={{fontSize:16}}>
                                    Verification OTP sent to {this.state.phoneNumber} 
                                    <TouchableOpacity style={{marginTop:10}}>
                                            <Text style={[styles.email,{marginBottom:-2}]}>Edit</Text>
                                    </TouchableOpacity>
                                </Text>
                            </View>
                            {/* <View style={{marginTop:15,marginLeft:20}}>
                                <TextInput style={styles.queDesc} onChangeText={(text)=>this.setState({Otp: text})}  placeholder="Enter OTP" placeholderTextColor={theme.labelOrInactiveColor}/>
                            </View> */}
                            <View style={{marginTop:15,marginBottom:20,marginLeft:width*0.15,paddingLeft:10,paddingRight:10,borderWidth:2,borderColor:theme.accentColor,borderRadius:5}}>
                                <OTPInputView
                                    style={{width: '80%', height: 80,marginLeft:10}}
                                    pinCount={6}
                                    code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                    onCodeChanged = {code => { this.setState({code})}}
                                    autoFocusOnLoad
                                    codeInputFieldStyle={styles.underlineStyleBase}
                                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                    onCodeFilled = {(code => {
                                        console.log(`Code is ${code}, you are good to go!`)
                                    })}
                                />
                            </View>
                             {/* <OtpInputs getOtp={(otp) => this.getOtp(otp)} /> */}
                            <View style={{flexDirection:'row',justifyContent:'center',marginTop:20,marginLeft:'30%',}}>
                                <View>
                                    <Text>
                                        Resend In 56s
                                    </Text>  
                                </View>
                                <View>
                                    <TouchableOpacity style={{marginTop:10}}>
                                        <Text style={[styles.email]}>Resend</Text>
                                    </TouchableOpacity>
                                </View>
                                
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'center',marginLeft:width*0.25,marginTop:height*0.35,marginBottom:20}}>
                                <TouchableOpacity  style={styles.authModeBtn}>
                                    <Feather name="arrow-right" size={20} color={theme.primaryColor} style={{marginTop:Platform.OS=='web'?5:0}}/> 
                                </TouchableOpacity>
                            
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'center',width:width*0.9}}>
                                <Text>Having Trouble? <Text style={[styles.email]}>Reach Us at www.example.com</Text></Text>
                            </View>
                        </View>
                            
                        
                    </View>,{width: width*0.9, height: height*0.85, marginLeft: 'auto', marginRight:'auto', borderRadius: 20, marginTop:height*0.05}
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
            width: width*0.65,
            height: height*0.05,
            alignItems: 'center',
            marginLeft:width*0.1,
            justifyContent: 'space-between',
        },
        email:{
            color:theme.accentColor,
            textDecorationLine: 'underline',
            textDecorationStyle: 'solid',
            marginLeft:5,
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
            borderColor: theme.accentColor,
          },
         
          underlineStyleBase: {
            width: 30,
            height: 60,
            borderWidth: 0,
            color:'black',
            borderBottomWidth: 1,
          },
         
          underlineStyleHighLighted: {
            borderColor: theme.accentColor,
          },
          authModeBtn :
          {
              backgroundColor:theme.accentColor,
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

export default OtpVerification;
