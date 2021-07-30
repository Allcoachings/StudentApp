import React from 'react';
import { Text,StyleSheet,View,TouchableOpacity,ScrollView,Platform,Image,Dimensions,TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux'
import {screenMobileWidth} from '../config'
import AuthHeader from './AuthHeader';
import Login from './Login';
import Signup from './Signup';
import {theme} from '../config'
import Card from './Card';
import InfoModal from './InfoModal';
import OtpVerification from './OtpVerification';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SocialAuth from './SocialAuth';
// import Onboarding from 'react-native-onboarding-swiper';
import Splash from  './Splash';
import { LinearGradient } from 'expo-linear-gradient';

const width = Dimensions.get('window').width
const height = Dimensions.get('screen').height
class Auth extends React.Component {
    state = { 
        auth_mode: 0,
        isModalVisible: false,
        isOtpModal : false,
        mobile:8449129069
      } 


    changeAuthMode=(auth_mode)=>this.setState({auth_mode:auth_mode})

    renderAuthView=(auth_mode) =>
    {
        switch (auth_mode)
        {
            case 0:
                return (
                    <Login changeAuthMode={this.changeAuthMode}/>
                )

            case 1:
                return (
                    <Signup changeAuthMode={this.changeAuthMode}/>
                )
        }
    }
    phoneNumberEntered = (value) => {
        this.setState({mobile : value})
    }
    openModalOTP = ()=> 
    {
        this.setState({isOtpModal:true})
    }
    closeModalOTP = ()=> 
    {
        this.setState({isOtpModal:false})
    }
    authModeButton=(label, changeHandler_param)=>
    {
        return (
            <TouchableOpacity onPress={()=>this.changeAuthMode(changeHandler_param)} style={[styles.authBtn,this.state.auth_mode==changeHandler_param?({borderBottomColor:theme.accentColor,borderBottomWidth:2}):(null)]}>
                <Text style={[styles.authModeBtnLabel,this.state.auth_mode==changeHandler_param?({color:theme.secondaryColor}):({color:theme.labelOrInactiveColor})]}>{label}</Text>
            </TouchableOpacity>
        )
    }
    openInfoModal=()=>
    {
        this.setState({isModalVisible:true})   
    }
    render() { 
        return (
            
            // <ScrollView >
            <>
                    <View style={styles.container}> 
                        <View style={[styles.authContainer,{flex:this.props.screenWidth<=screenMobileWidth?1:0.5}]}>
                            
                            {/* <LinearGradient
                                // Button Linear Gradient
                                colors={[theme.primaryColor, '#AFeeee']}
                                style={styles.button}> */}
                                {/* <View>
                                    <AuthHeader/>
                                </View> */}
                                {/* <View style={styles.authSection}>
                                    <View style={styles.authModes}> 
                                            {this.authModeButton("Login",0)}
                                       
                                            {this.authModeButton("Sign up",1)} 
                                       
                                    </View>
                                    <View style={{paddingBottom:Platform.OS=='web'?10:2}}>
                                         {this.renderAuthView(this.state.auth_mode)} 
                                    </View>
                                </View> */}
                                <View>
                                    <Splash />
                                </View>
                                

                                {/* <View style={{marginTop:-(height*0.38),marginBottom:10,}}>
                                    <Card phoneNumberEntered={this.phoneNumberEntered} openModal={this.openModalOTP}/>
                                </View> */}

                                <View style={{position: 'absolute',bottom:25,width:width-10,margin:10,alignSelf: 'center'}}>
                                    <TouchableWithoutFeedback onPress={this.openInfoModal}>
                                        <View style={{backgroundColor:theme.accentColor,padding:15,borderRadius:10,alignItems: 'center'}}>
                                            <Text style={{fontFamily:'Raleway_700Bold',fontSize:15,color:theme.primaryColor}}>Get started</Text>
                                        </View>
                                    </TouchableWithoutFeedback>

                                </View>
                            {/* </LinearGradient> */}
        
                        </View>
                    {this.props.screenWidth<=screenMobileWidth?(null):(
                        <View style={[styles.authBannerView,{flex:this.props.screenWidth<=screenMobileWidth?0:0.5}]}>
                            <Text>Banner</Text>
                        </View>
                    )} 
                    </View>
                    <OtpVerification mobile={this.state.mobile} isOtpModal = {this.state.isOtpModal} navigation={this.props.navigation} closeModal = {this.closeModalOTP} openInfoModal={this.openInfoModal}/>
                    <InfoModal isModalVisible={this.state.isModalVisible} mobileNumber={this.state.mobile} navigation={this.props.navigation}/>
                    </>
            // </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row', 
        // paddingTop:-10
    },
        authContainer:
        {   
            flexDirection:'column', 
        },
        authSection:
        {
            margin:'5%',
            borderRadius:10,
            backgroundColor:theme.primaryColor
        },
        authModes:
        {
            flex:1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        },
        authBtn:
        {
            padding:10,
            marginTop:10,
            marginBottom:10,
            paddingLeft:'10%',
            paddingRight:'10%', 
            justifyContent: 'center',
            alignItems: 'center'
        },
            authModeBtnLabel:
            {
                fontSize:16,
                fontWeight:'bold'
            },
})
const mapStateToProps=(state)=>
{
    return{
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(Auth);