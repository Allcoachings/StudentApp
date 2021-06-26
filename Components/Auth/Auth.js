import React from 'react';
import { Text,StyleSheet,View,TouchableOpacity,ScrollView,Platform,Image} from 'react-native';
import {connect} from 'react-redux'
import {screenMobileWidth} from '../config'
import AuthHeader from './AuthHeader';
import Login from './Login';
import Signup from './Signup';
import {theme} from '../config'
import Card from './Card';
import InfoModal from './InfoModal';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SocialAuth from './SocialAuth';
// import Onboarding from 'react-native-onboarding-swiper';
import Splash from  './Splash';
class Auth extends React.Component {
    state = { 
        auth_mode: 0,
        isModalVisible: false,
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
    openModal = ()=> 
    {
        this.setState({isModalVisible:true})
    }
    authModeButton=(label, changeHandler_param)=>
    {
        return (
            <TouchableOpacity onPress={()=>this.changeAuthMode(changeHandler_param)} style={[styles.authBtn,this.state.auth_mode==changeHandler_param?({borderBottomColor:theme.accentColor,borderBottomWidth:2}):(null)]}>
                <Text style={[styles.authModeBtnLabel,this.state.auth_mode==changeHandler_param?({color:theme.secondaryColor}):({color:theme.labelOrInactiveColor})]}>{label}</Text>
            </TouchableOpacity>
        )
    }

    render() { 
        return (
            
            <ScrollView style={{backgroundColor:'#ffe6ff',paddingTop:-20}}>
                    <View style={styles.container}> 
                        <View style={[styles.authContainer,{flex:this.props.screenWidth<=screenMobileWidth?1:0.5}]}>
                                <View>
                                    <AuthHeader/>
                                </View>
                                {/* <View style={styles.authSection}>
                                    <View style={styles.authModes}> 
                                            {this.authModeButton("Login",0)}
                                       
                                            {this.authModeButton("Sign up",1)} 
                                       
                                    </View>
                                    <View style={{paddingBottom:Platform.OS=='web'?10:2}}>
                                         {this.renderAuthView(this.state.auth_mode)} 
                                    </View>
                                </View> */}
                                <View style={{marginTop:5}}>
                                    <Splash />
                                </View>
                                
                                <View style={{marginTop:-370,marginBottom:10}}>
                                    <Card openModal={this.openModal}/>
                                </View>
        
                        </View>
                    {this.props.screenWidth<=screenMobileWidth?(null):(
                        <View style={[styles.authBannerView,{flex:this.props.screenWidth<=screenMobileWidth?0:0.5}]}>
                            <Text>Banner</Text>
                        </View>
                    )} 
                    </View>
                    <InfoModal isModalVisible={this.state.isModalVisible} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        backgroundColor:'#ffe6ff',
        // paddingTop:-10
    },
        authContainer:
        {   
            flexDirection:'column',
            backgroundColor: '#ffe6ff'
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