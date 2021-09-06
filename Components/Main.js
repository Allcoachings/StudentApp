import React from 'react';
import { Text,Dimensions,Platform,StyleSheet,View, TouchableOpacity,Keyboard, Image,StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {screenMobileWidth, theme, appLogo} from './config'
import {connect } from 'react-redux'; 
import MobileViewController from './MobileViewController/MobileViewController' 
import WebViewController from './WebViewController/WebViewController'
import MobileViewControllerIns from './MobileViewControllerIns/MobileViewControllerIns' 
import WebViewControllerIns from './WebViewControllerIns/WebViewControllerIns'
import {screenWidthConfigChange,setInstituteAuth,userAuthStatus,setUserInfo,setInstituteDetails,setKeyboardHeight} from './Actions'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height; 
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppLoading from 'expo-app-loading';
// import { StatusBar } from 'expo-status-bar';

class Main extends React.Component {
    state = {
        width:windowWidth,
        height:windowHeight,

        mode:3
      } 
  
      _keyboardDidShow(e) {
          // this.props.navigation.setParams({
          //     keyboardHeight: e.endCoordinates.height,
          //     normalHeight: Dimensions.get('window').height, 
          //     shortHeight: Dimensions.get('window').height - e.endCoordinates.height, 
          // }); 
          let marginTop=Dimensions.get('window').height - e.endCoordinates.height;
        //   console.log("keyboard Open",marginTop," ",e.endCoordinates.height," ",Dimensions.get('window').height);
          this.props.setKeyboardHeight(e.endCoordinates.height)
      }
      _keyboardDidHide(e) {
          // this.props.navigation.setParams({
          //     keyboardHeight: e.endCoordinates.height,
          //     normalHeight: Dimensions.get('window').height, 
          //     shortHeight: Dimensions.get('window').height - e.endCoordinates.height, 
          // }); 
        //   console.log("keyboard hidden");

          this.props.setKeyboardHeight(null)
      }
      componentWillUnmount() {
          if(this.keyboardDidShowListener)
          {
              this.keyboardDidShowListener.remove();
          }
          if(this.keyboardDidHideListener)
          {
              this.keyboardDidHideListener.remove();
          }
      }
    componentDidMount()
    {

        // StatusBar.setStatusBarBackgroundColor(theme.greyColor,true)

        // Font.loadAsync({ 
        //     Raleway_400Regular,
        //     Raleway_600SemiBold,
        //     Raleway_700Bold
        // }).then(() => {
        //     this.setState({fontLoaded:true})
        // })
        // AsyncStorage.clear()  
        AsyncStorage.getItem('authInfo').then(data => {
            if(data)
            {
                data = JSON.parse(data)
                switch(data.authType)
                {
                    case 'ins':
                            this.props.setInstituteAuth(true);
                            this.props.setInstituteDetails(data);
                    break;
                    case 'user':
                        this.props.userAuthStatus(true);
                        this.props.setUserInfo(data)
                    break;
                }
            
                
                
            }
            // console.log("nodata")
        }) 

      
        this.props.screenWidthConfigChange(windowWidth)
        Dimensions.addEventListener('change',({ window, screen })=>{
            this.setState({width: window.width, height:screen.height})
            this.props.screenWidthConfigChange(window.width)
        });
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e)=>this._keyboardDidShow(e));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (e)=>this._keyboardDidHide(2));
    } 
 
    renderViewport=(screenWidth)=>
    {
        if(screenWidth > screenMobileWidth && Platform.OS === 'web')
        { 
              return(<WebViewController  userAuth={this.props.userAuth} userInfo={this.props.userInfo}/>)
        }
        else  
        {
              return(<MobileViewController changeMode={this.changeMode} userAuth={this.props.userAuth} userInfo={this.props.userInfo}/>)
        }
        // return(<MobileViewController userAuth={this.props.userAuth}/>)
    }
    renderViewportIns=(screenWidth)=>
    {
        if(screenWidth > screenMobileWidth && Platform.OS === 'web')
        { 
              return(<WebViewControllerIns  insAuth={this.props.insAuth} institute={this.props.institute}/>)
        }
        else  
        {
              return(<MobileViewControllerIns changeMode={this.changeMode} insAuth={this.props.insAuth} institute={this.props.institute}/>)
        }
         
    }

    switchRender=(mode)=>
    {
        switch(mode)
        {
            case 1: 
                return(this.renderViewport(this.state.width));
            case 2:
                return(this.renderViewportIns(this.state.width))
            case 3: 
                return(
                   
                    <View style={styles.container}>
                        <View style={styles.logoView}>
                             <Image
                                 source={appLogo}
                                 style={styles.headerLogo}
                             />
                             <Text style={styles.logoText}>All Coachings</Text>
                         </View>
                         <View style={styles.btn}>
                             <TouchableOpacity style={styles.studentLoginBtn} 
                                 onPress={()=>this.setState({mode:1})}>
                                     <Text style={styles.studentLoginText}>Login as Student</Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={styles.instituteLoginBtn} 
                                 onPress={()=>this.setState({mode:2})}>
                                     <Text style={styles.instituteLoginText}>Login as Institute</Text>
                             </TouchableOpacity>
                         </View>
                     </View>
               
     
                )

        }
    }
    changeMode=(mode)=>
    {
        this.setState({mode})
    }
    render() {

        // if(!this.state.fontLoaded)
        // {
              
        //         return (
        //             <AppLoading/>
        //         )
        // }
        return(  
            <SafeAreaProvider  style={[styles.safeAreaView,this.props.statusBarHidden?{paddingTop:0}:null]}>
                {this.switchRender(this.state.mode)}
            </SafeAreaProvider>
            )
    }
}

const styles = StyleSheet.create({
    safeAreaView:
    {
        paddingTop:Platform.OS=='android'?StatusBar.currentHeight:0
        // paddingTop:Platform.OS=='android'?0:0
    },
        container: 
        {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
            logoView:
            {
                flex: 0.1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            },
                headerLogo:
                {
                    height: 40,
                    width: 40,
                },
                logoText:
                {
                    fontSize: 20
                },
            btn:
            {
                flex: 0.2,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '60%'
            },
                studentLoginBtn:
                {
                    backgroundColor: theme.accentColor,
                    padding: 10,
                    borderRadius: 8, 
                    height: '25%',
                    width: '100%',
                    marginBottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                    studentLoginText:
                    {
                        color: theme.primaryColor,
                        fontSize: 18
                    },
                instituteLoginBtn:
                {
                    backgroundColor: theme.accentColor,
                    padding: 10,
                    borderRadius: 8, 
                    height: '25%',
                    width: '100%',
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                    instituteLoginText:
                    {
                        color: theme.primaryColor,
                        fontSize: 18
                    }
})


const mapStateToProps = (state)=>
{
    return {
        userAuth: state.user.userAuthStatus,
        insAuth:state.institute.authStatus,
        userInfo:state.user.userInfo,
        statusBarHidden:state.screen.statusBarHidden,
        institute:state.institute
    }
}
export default connect(mapStateToProps,{setKeyboardHeight,screenWidthConfigChange,userAuthStatus,setInstituteAuth,setUserInfo,setInstituteDetails})(Main);