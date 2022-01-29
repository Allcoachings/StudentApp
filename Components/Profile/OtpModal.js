import { Feather } from '@expo/vector-icons';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useEffect, useState } from 'react';
import { Modal ,View,TouchableOpacity,Text, StyleSheet, ActivityIndicator, TouchableWithoutFeedback} from 'react-native';
import { theme } from '../config';
import CardView from '../Utils/CardView';
import BackArrow from '../Utils/Icons/BackArrow'

function OtpModal({isVisible,closeModal,email,mobile,setMobileVerificationStatus,setEmailVerificationStatus,saveDetails,isToVerifiedMobile,isToVerifiedEmail}) {
     
        
    const [codeEmail,setCodeEmail] =useState('')
    const [codeMobile,setCodeMobile] =useState('')
    const [loaderMobile,setLoaderMobile] = useState(false)
    const [error,setError] = useState()
    const [emailVerified,setEmailVerified] = useState(false)
    const [mobileVerified,setMobileVerified] = useState(false)

    const getOtpEmail=(codeEmail) =>{
        // console.log(codeEmail);
        setCodeEmail(codeEmail)
    }

    const  getOtpMobile=(codeMobile) =>{
        // console.log(codeMobile);
        setCodeMobile(codeMobile)
    } 
    const handleVeriyEmail=()=>
    {
        if(codeEmail.length==6)
        {
            setEmailVerified(true)
            setEmailVerificationStatus(true)
        }else
        {
            setError("Please Enter OTP")
        }
    }
     const handleVeriyMobile=()=>
    {
         
        if(codeMobile.length==6)
        {
            setMobileVerified(true)
            setMobileVerificationStatus(true)
        }else
        {
            setError("Please Enter OTP")
        }
    }

    useEffect(()=>{
            if((emailVerified&&mobileVerified)||(emailVerified&&!isToVerifiedMobile)||(mobileVerified&&!isToVerifiedEmail)) 
            {
                saveDetails()
                closeModal()
            }

    },[emailVerified,mobileVerified])
  return (
      <Modal
        isVisible={isVisible}
        onRequestClose={closeModal}
        transparent={false}
      >
          
        <View> 
        {CardView(
                    <View style={{flex: 1,flexDirection: 'row',alignItems: 'center',}}>
                        {/* <View> */}
                            <TouchableOpacity onPress={()=>closeModal()}>
                                <View style={{marginLeft:10,marginRight:5,height:24}}>
                                    <BackArrow height={24} width={24}/>
                                </View> 
                            </TouchableOpacity>
                        {/* </View> */}
                        <View style={{marginBottom:5}}>
                          <Text
                            numberOfLines={1}
                              style={{fontFamily: 'Raleway_600SemiBold',fontSize:18}} 
                          >
                              Verify Otp
                          </Text>
                        </View>
                        <View style={{marginLeft:'auto'}}>
                            {/* {this.state.searchWord!=''?(
                                this.state.filterData?(
                                    <TouchableOpacity onPress={() => this.setState({ searchWord: '', offset: 0, filterData: false, showResult: false, searchData: [] },() =>this.textInput.clear())}>
                                        <EvilIcons
                                          name="x"
                                          size={20} 
                                          color={theme.secondaryColor}
                                          style={styles.searchIcon}
                                        />
                                    </TouchableOpacity>
                                ):(
                                    <TouchableOpacity onPress={()=>this.setState({filterData: true, loadingData: true},()=>searchFun(this.state.offset, this.state.searchWord, this.searchCallback))}>
                                        <EvilIcons 
                                          name={'chevron-right'} 
                                          size={15} 
                                          color={theme.labelOrInactiveColor} 
                                          style={styles.searchIcon}
                                        />
                                    </TouchableOpacity>
                                )):(
                                    <Feather 
                                      name={'x'} 
                                      size={30} 
                                      color={theme.secondaryColor} 
                                      style={styles.searchIcon}
                                    />
                            )} */}
                             

                        </View>
                    </View>,
                    {width:'100%',height:50,},2
                )}
            <View style={{margin:10}}>

                <View>
                {error?( 
                            <Text style={styles.errorText}>{error}</Text>
                        ):(null)}
                </View>
                {isToVerifiedEmail?(
                    <View>
                        <View style={{flexDirection:'row',marginBottom:8,alignItems: 'center'}}>
                            <Text style={{fontFamily:'Raleway_400Regular',color:theme.greyColor}}>
                                We've sent it Otp on your email  
                            </Text>
                            <Text style={{color:theme.greyColor}}>
                                {(" "+email)}
                            </Text>
                        </View>
                        <OTPInputView
                            style={{width: '100%', height: 80,color: theme.btn_dark_background_color, borderRadius:10}}
                            pinCount={6}
                            code={codeEmail}  
                            onCodeChanged = {codeEmail => { setCodeEmail(codeEmail)}} 
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled = {getOtpEmail}
                        />
                        <TouchableWithoutFeedback onPress={()=>{handleVeriyEmail()}} >
                                <View style={[{backgroundColor:theme.greyColor,padding:10,borderRadius:10,alignItems: 'center',width:'95%',marginBottom:10}]}>
                                    <Text style={{fontFamily:'Raleway_700Bold',fontSize:15,color:theme.primaryColor}}>
                                        {loaderMobile?(
                                            <ActivityIndicator color={theme.primaryColor} size={"small"}/>
                                        ):(
                                            "Verify"
                                        )}
                                    </Text>
                                </View> 
                        </TouchableWithoutFeedback>
                    </View>
                ):(null)}
                {isToVerifiedMobile?(
                    <View>
                        <View style={{flexDirection:'row',marginBottom:8,alignItems: 'center'}}>
                            <Text style={{fontFamily:'Raleway_400Regular',color:theme.greyColor}}>
                                We've sent it Otp on your Number  
                            </Text>
                            <Text style={{color:theme.greyColor}}>
                                {(" +91"+mobile)}
                            </Text>
                        </View>
                        <OTPInputView
                            style={{width: '100%', height: 80,color: theme.btn_dark_background_color,borderRadius:10}}
                            pinCount={6}
                            code={codeMobile}  
                            onCodeChanged = {codeMobile => { setCodeMobile(codeMobile)}} 
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled = {getOtpMobile}
                        />
                        <TouchableWithoutFeedback onPress={()=>{handleVeriyMobile()}} >
                                <View style={[{backgroundColor:theme.greyColor,padding:10,borderRadius:10,alignItems: 'center',width:'95%',marginBottom:10}]}>
                                    <Text style={{fontFamily:'Raleway_700Bold',fontSize:15,color:theme.primaryColor}}>
                                        {loaderMobile?(
                                            <ActivityIndicator color={theme.primaryColor} size={"small"}/>
                                        ):(
                                            "Verify"
                                        )}
                                    </Text>
                                </View> 
                        </TouchableWithoutFeedback>
                    </View>
                ):(null)}
               
            </View>
        </View>
    </Modal>
  );
}



const styles = StyleSheet.create({
    underlineStyleBase: {      
        margin:5,
        borderRadius:10,
        color: theme.greyColor
      },
     
      underlineStyleHighLighted: {
        borderColor: theme.greyColor,
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
        errorText:
        {
            fontFamily: 'Raleway_600SemiBold',
            textAlign: 'center',
            marginTop:10,
            color:theme.featureNoColor 
        },
})
export default OtpModal;
