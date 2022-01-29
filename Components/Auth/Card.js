import { EvilIcons } from '@expo/vector-icons';
import React , { useState, useRef }  from 'react';
import { StyleSheet,Text, View ,TouchableOpacity,Dimensions,StatusBar,SafeAreaView, TouchableWithoutFeedback} from 'react-native';
import { theme } from '../config';
// import PhoneInput from 'react-native-phone-input'
import PhoneInput from "react-native-phone-number-input";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CardView from '../Utils/CardView'
import { generateOtp } from '../Utils/DataHelper/Otp';
import { ActivityIndicator } from 'react-native-paper';
const width = Dimensions.get('window').width
const height = Dimensions.get('screen').height
 const phoneInput = useRef<PhoneInput>(null);

class SocialAuth extends React.Component {
    state = { padding:75,loader:false } 
     
    
    // onPressFlag(){
    //     this.myCountryPicker.open()
    // }
    
    // selectCountry(country){
    //     this.phone.selectCountry(country.iso2)
    // }
    checkNumber=(text)=>{
        if(text.length>=10){
            this.props.phoneNumberEntered(text)
            var checkValid = phoneInput.current?.isValidNumber(value);
            // console.log(checkValid);
            this.setState({number:text,continue:true,padding:10});
        }
        else if(text.length < 10)
        {
            this.setState({continue:false,padding:75})
        }
    }

    handleOtpGenerateCallBack=(response)=>
    {
        if(response.status==200)
        {
            response.json().then(data=>
            {
                // console.log(data)
                this.setState({loader:false})
                this.props.openModal()
            })
        }
    }
    handleContinueBtnClick=()=>
    {
        
        if(this.state.continue&&!this.state.loader)
        {
            this.setState({loader:true})
            generateOtp(this.state.number,this.handleOtpGenerateCallBack)
        }
        
        // this.props.openModal()
    }
    renderCard =() => {
        // 
        return (
        CardView(
            <View style={styles.container}>
                <Text style={styles.label}>Get Started</Text>
                <View>
                        <Text style={{ marginBottom:20,fontSize:15,color:theme.labelOrInactiveColor,justifyContent: 'center'}}>
                            Enter Your mobile  Number  
                                {/* <TouchableOpacity style={{}}>
                                        <Text style={styles.email}> continue with email</Text>
                                </TouchableOpacity> */}
                        </Text>
                </View>
                <View style={styles.social_authBtnContainer}>
                    <SafeAreaView style={styles.wrapper}>
                        <PhoneInput
                                ref={phoneInput}
                                // defaultValue={value}
                                defaultCode="DM"
                                layout="first"
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
                                // style={{height:100}}
                                />
                                
                                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',marginLeft:'10%',marginRight:'10%'}}>
                                       
                                        <TouchableWithoutFeedback onPress={this.handleContinueBtnClick}  >
                                            <View style={[styles.authModeBtn,{backgroundColor:this.state.continue?(theme.accentColor):(theme.greyColor)}]} >
                                                {this.state.loader?(
                                                    <ActivityIndicator/>
                                                ):( 
                                                    <>
                                                        <Text style={styles.btnText}>Continue</Text>
                                                        <EvilIcons name="log-in" size={20} color={theme.primaryColor} style={{marginTop:Platform.OS=='web'?5:0}}/> 
                                                    </>
                                                )}
                                            </View>
                                        </TouchableWithoutFeedback>
                                       
                                    </View>
                                
                    </SafeAreaView>
                        
                        {/* <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                const checkValid = phoneInput.current?.isValidNumber(value);
                                setShowMessage(true);
                                setValid(checkValid ? checkValid : false);
                                }}
                            >
                                <Text>Check</Text>
                            </TouchableOpacity> */}
                            
                 </View>
            </View>,[styles.authCard,{paddingBottom:'auto'}]
            ))
     }
     render() {
         return (
             <View>
             <View style={{backgroundColor : theme.transparent}}>
                 {this.renderCard()}
             </View>
             </View>
         );
     }
    
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        
        // justifyContent: 'center', 
        
    },
    label:
    {
        
        color:'black',
        fontWeight: 'bold',
        fontSize:20, 
        marginTop:15
    },
    social_authBtnContainer:
    {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
        authCard:
        {
            borderTopLeftRadius:30,
            borderTopRightRadius:30,
            width:width,
            height:height*0.3,
            padding:10,
            backgroundColor:theme.primaryColor,
            borderColor:theme.primaryColor,
            justifyContent: 'center',
            alignItems: 'center',
            
            
        },
        email:{
            color:theme.accentColor,
            textDecorationLine: 'underline',
            textDecorationStyle: 'solid',
            marginLeft:5, 
            fontSize:15, 
            
        },
            authModeBtn :
                {
                    backgroundColor:theme.accentColor,
                    padding:"5%",
                    marginTop:'3%', 
                    width:'100%',
                    marginTop:25,
                    height:height*0.07,
                    borderRadius:5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection:'row',
                    flex:1
                },
                    btnText:
                    {
                        color:theme.primaryColor,
                        fontSize:16,
                        fontWeight:'bold',
                        marginRight:10
                    }

})
export default SocialAuth;