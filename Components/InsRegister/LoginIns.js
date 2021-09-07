import React, { useState } from 'react';
import { View,Text,TouchableWithoutFeedback,TextInput,Dimensions,StyleSheet } from 'react-native';
import CardView from '../Utils/CardView'
import {theme} from '../config'
import { Feather } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import {validateLogin} from '../Utils/DataHelper/Coaching'
import {setInstituteDetails,setInstituteAuth} from '../Actions'
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('window').width
const height = Dimensions.get('screen').height





const LoginIns=(props)=>
{


    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)


    const validateCallback=(response)=>
    {
            console.log(response.status)
            if(response.status==200)
            {
                response.json().then(data=>{
                    console.log(data)
                    if(data)
                    {
                        props.setInstituteDetails(data)
                        props.setInstituteAuth(true);
                        AsyncStorage.setItem('authInfo', JSON.stringify({...data,authType:'ins'}))
                    }else 
                    {
                        setError("Wrong email or password")
                    }
                })
            }else
            {
                setError("Something went wrong")
            }
    }
    const handleSubmitButtonClick=()=>
    {
            if(verify(email,password))
            {
                    console.log("ready to validate")
                    validateLogin(email,password,validateCallback)
            }else
            {
                 setError("Plase fill all the fields")
            }
    }

    const verify=(email,password)=>email&&password

    return (
        CardView(
            <View style={styles.container}>


                <View style={styles.header}>
                    {/* <AuthHeader/>      */}
                    <TouchableWithoutFeedback onPress={()=>props.changeMode(1)}>                  
                        <Feather name="arrow-left" size={20} color={theme.greyColor}/>
                    </TouchableWithoutFeedback>
                </View>
                <View>
                    <Text style={styles.postQueText}>Login in Your Account</Text>
                    {/* <View style={{flexDirection:'row'}}> */}
                        {/* <Text style={{fontFamily: 'Raleway_400Regular',marginLeft:'5%',marginRight:2}}>Signing up with </Text> */}
                        {/* <Text style={{margin:2}}>+91 8109176342</Text> */}
                    {/* </View> */}
                    {/* <TouchableOpacity onPress={()=>this.props.closeModal()}>
                        <Image source={Assets.discussions.closeIcon} style={styles.closeIcon}/>
                    </TouchableOpacity> */}
                    {error?( 
                        <Text style={styles.errorText}>{error}</Text>
                    ):(null)}
                    
                    
                </View>
                
                
                <View style={{marginTop:15}}>
                    <Text style={{marginLeft:15,fontFamily:'Raleway_600SemiBold'}}>Email address</Text>
                </View>
                <View style={styles.queDescView}>
                    <TextInput style={styles.queDesc} onChangeText={(text)=>setEmail(text)}  placeholder="Enter email address" placeholderTextColor={theme.labelOrInactiveColor}/>
                </View>
                <View style={{marginTop:15}}>
                    <Text style={{marginLeft:15,fontFamily:'Raleway_600SemiBold'}}>Password</Text>
                </View>
                <View style={styles.queDescView}>
                    <TextInput style={styles.queDesc} secureTextEntry={true} onChangeText={(text)=>setPassword(text)}  placeholder="Enter Passsword" placeholderTextColor={theme.labelOrInactiveColor}/>
                </View>
                 




                <View 
                    style={{justifyContent:'center',marginTop:'auto',marginBottom:props.keyboardHeight?props.keyboardHeight+50:20,alignItems: 'center',width:width,paddingTop:10}}
                >  
                        <View style={{margin:10}}>
                            <TouchableWithoutFeedback onPress={()=>{props.changeAuthMode(2)}}>
                                <View>
                                    <Text style={{fontFamily:'Raleway_600SemiBold',fontSize:12,color:theme.greyColor}}>Register as Institute</Text> 
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    <TouchableWithoutFeedback onPress={handleSubmitButtonClick}>
                        
                        <View style={{backgroundColor:theme.accentColor,padding:15,borderRadius:10,alignItems: 'center',width:'95%'}}>
                        {loading?(

                                <ActivityIndicator color={theme.primaryColor} size={'small'}/>
                            ):(
                                <Text style={{fontFamily:'Raleway_700Bold',fontSize:15,color:theme.primaryColor}}>Continue</Text>    
                            )}
                            
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                    
                
            </View>,{width: width, height: height-40, marginLeft: 'auto', marginRight:'auto',}
        )

    )
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
export default connect(mapStateToProps,{setInstituteDetails,setInstituteAuth})(LoginIns)