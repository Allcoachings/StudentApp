import React from 'react';
import { Text,Dimensions,Platform,StyleSheet,View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {screenMobileWidth, theme, appLogo} from './config'
import {connect } from 'react-redux'; 
import MobileViewController from './MobileViewController/MobileViewController' 
import WebViewController from './WebViewController/WebViewController'
import MobileViewControllerIns from './MobileViewControllerIns/MobileViewControllerIns' 
import WebViewControllerIns from './WebViewControllerIns/WebViewControllerIns'
import {screenWidthConfigChange} from './Actions'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height; 

class Main extends React.Component {
    state = {
        width:windowWidth,
        height:windowHeight,

        mode:3
      } 

    componentDidMount()
    {
        this.props.screenWidthConfigChange(windowWidth)
        Dimensions.addEventListener('change',({ window, screen })=>{
            this.setState({width: window.width, height:screen.height})
            this.props.screenWidthConfigChange(window.width)
        });
    } 
 
    renderViewport=(screenWidth)=>
    {
        if(screenWidth > screenMobileWidth && Platform.OS === 'web')
        { 
              return(<WebViewController  userAuth={this.props.userAuth}/>)
        }
        else  
        {
              return(<MobileViewController userAuth={this.props.userAuth}/>)
        }
        // return(<MobileViewController userAuth={this.props.userAuth}/>)
    }
    renderViewportIns=(screenWidth)=>
    {
        if(screenWidth > screenMobileWidth && Platform.OS === 'web')
        { 
              return(<WebViewControllerIns  userAuth={this.props.userAuth}/>)
        }
        else  
        {
              return(<MobileViewControllerIns userAuth={this.props.userAuth}/>)
        }
        // return(<MobileViewController userAuth={this.props.userAuth}/>)
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

    render() {
        return( 
            <SafeAreaProvider  style={styles.safeAreaView}>
            {this.switchRender(this.state.mode)} 
            </SafeAreaProvider>
            )
    }
}

const styles = StyleSheet.create({
    safeAreaView:
    {
        paddingTop:Platform.OS=='android'?25:0
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
        userAuth: state.user.userAuthStatus
    }
}
export default connect(mapStateToProps,{screenWidthConfigChange})(Main);