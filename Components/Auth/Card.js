import { Feather } from '@expo/vector-icons';
import React , { useState, useRef }  from 'react';
import { StyleSheet,Text, View ,TouchableOpacity,Dimensions,StatusBar,SafeAreaView} from 'react-native';
import { theme } from '../config';
// import PhoneInput from 'react-native-phone-input'
import PhoneInput from "react-native-phone-number-input";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CardView from '../Utils/CardView'
const width = Dimensions.get('window').width
const height = Dimensions.get('screen').height
const phoneInput = useRef<PhoneInput>(null);

class SocialAuth extends React.Component {
    state = {  }
    
    // componentDidMount(){
    //     this.setState({
    //         pickerData: this.phone.getPickerData()
    //     })
    // }
    
    // onPressFlag(){
    //     this.myCountryPicker.open()
    // }
    
    // selectCountry(country){
    //     this.phone.selectCountry(country.iso2)
    // }
    checkNumber=(text)=>{
        if(text.length>=10){
            var checkValid = phoneInput.current?.isValidNumber(value);
            console.log(checkValid);
            this.setState({number:text,continue:true});
        }
        else if(text.length < 10)
        {
            this.setState({continue:false})
        }
    }
    renderCard =() => {
        // phoneInput = useRef<PhoneInput>(null);
        return (
        CardView(
            <View style={styles.container}>
                <Text style={styles.label}>Get Started</Text>
                <Text style={{marginLeft:-10,marginBottom:20,fontSize:18}}>
                    Enter Your mobile or   
                        <TouchableOpacity>
                                <Text style={styles.email}> continue with email</Text>
                        </TouchableOpacity>
                    </Text>
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
                                {this.state.continue?(
                                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',marginLeft:'10%',marginRight:'10%'}}>
                                        <TouchableOpacity onPress={this.props.openModal} style={styles.authModeBtn}>
                                            <Text style={styles.btnText}>Continue</Text>
                                            <Feather name="log-in" size={20} color={theme.primaryColor} style={{marginTop:Platform.OS=='web'?5:0}}/> 
                                        </TouchableOpacity>
                                    </View>
                                ):(null)}
                                
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
            </View>,[styles.authCard]
            ))
     }
     render() {
         return (
             <View>
             <View style={{backgroundColor : '#ffe6ff'}}>
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
        marginLeft:-10,
        color:'black',
        fontWeight: 'bold',
        fontSize:25,
        margin:15
    },
    social_authBtnContainer:
    {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
        authCard:
        {
            borderTopLeftRadius:40,
            borderTopRightRadius:40,
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
            marginLeft:5
        },
        authModeBtn :
            {
                backgroundColor:theme.accentColor,
                padding:"5%",
                marginTop:'3%', 
                width:'100%',
                marginTop:25,
                height:'50%',
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