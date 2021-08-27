import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,ActivityIndicator } from 'react-native'; 
import { WebView } from 'react-native-webview';
import {Feather} from '@expo/vector-icons' 
import CardView from '../Utils/CardView';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { theme } from '../config';
 class WebViewCustom extends Component {
  state={
    visible: false,
    webPageTitle: '',
    webUrl: '',
    loadUrl : this.props.route.params.link,
    mode:this.props.route.params.mode||'webHeader'
  }

  renderLoadingView=()=>{  
        return (
            <View style={styles.activityIndicator}>
                <ActivityIndicator color={theme.accentColor} size={"large"}/>
            </View> 
        );
    }
    handleMessage =(event)=> 
    { 
      //   if(event.nativeEvent.data=="paymentDone")
      //   {
      //         this.props.navigation.popToTop(); 
      //   }else
      //   {
          var webData = event.nativeEvent.data.toString().split("#"); 
          if(webData[0]=="navigate")
          {
              this.props.navigation.navigate(webData[1]);
          }
          else if(webData[0]=="payment")
          {
              switch(webData[1])
              {
                  case'fail': this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  })
                    break;

                  case 'success':   this.props.navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'Home' }],
                                    })

                    break;
              }
          }
          else
          {
              this.setState({webPageTitle:webData[1],webUrl:webData[0]})
          }
          
         
          
    }

    _onNavigationStateChange = (webViewState)=>
    {
      console.log(webViewState.url)     
    }

    renderPageHeader =(mode)=>
    {

        switch(mode)
        {
            case "defaultAppHeader":
                return(
                    <PageStructure

                    iconName={"arrow-left"}
                    btnHandler={() => {this.props.navigation.goBack()}}
                    navigation={this.props.navigation}
                    >
                        {this.renderWebView()}
                    
                    </PageStructure>
                )
            default:
                return(
                    
                    <View style={styles.container}>
                        {CardView(
                            <View style={styles.header}>
                                <View style={styles.headerLeft}>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}> 
                                    <Feather name="arrow-left" size={20} /> 
                                    </TouchableOpacity>
                                    
                                </View>
                                <View style={styles.headerRight}>
                                    <Text style={styles.webPageTitle}>{this.state.webPageTitle}</Text>
                                    <Text >{this.state.webUrl}</Text>
                                </View> 
                            </View>,
                            {width:'100%'}
                        )}
                        {this.renderWebView()}
                    </View>
                )
        }
        
    }
  renderWebView=() =>
  {
    return (
        
        <WebView  
              ref="webview"
              source={{ uri:this.state.loadUrl }}
              renderLoading={this.renderLoadingView} 
              startInLoadingState={true} 
              injectedJavaScript="window.ReactNativeWebView.postMessage(window.location.origin+'#'+document.title)"
              onMessage={this.handleMessage} 
              onNavigationStateChange={this._onNavigationStateChange.bind(this)}
              javaScriptEnabled = {true}
        /> 
    );

  }

  updateComponent(){
    // console.log(this.state.discussion_id, this.props.route.params.id)
    if(this.state.loadUrl!=this.props.route.params.link)
    {
        this.setState({loadUrl:this.props.route.params.link,mode:this.props.route.params.mode})
       
    }
}
    render()
    {
        this.updateComponent();
        return (
            this.renderPageHeader(this.state.mode)
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
        header: { 
            flex:0.1,
            flexDirection: 'row',
            marginLeft:10
        }, 
            headerLeft:
            {
               flex:0.1,
               marginTop:10
            },
            headerRight:
            {
                flex:1,
                flexDirection: 'column'
            },
                webPageTitle:
                {
                    fontSize:18,
                    fontWeight: 'bold'
                }
        
})

export default WebViewCustom



