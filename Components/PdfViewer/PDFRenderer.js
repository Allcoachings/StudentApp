import React from 'react';
import { ActivityIndicator, Text, View,Dimensions } from 'react-native';

import { WebView } from 'react-native-webview';
import PDFReader from 'rn-pdf-reader-js'
import { allcoachingAdminUrl, theme } from '../config';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height; 

const renderLoadingView=()=>{  
  return (
      <View style={{position: 'absolute', width: '100%', height: '100%',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
          <ActivityIndicator color={theme.accentColor} size={"large"}/>
      </View> 
  ); 
}

const PDFRenderer = ({pdf}) => {
  const url = allcoachingAdminUrl+"pdfViewer/"+encodeURIComponent("http://172.20.10.3:8080/files/pdf.pdf")+"/"+windowWidth+"/"+windowHeight 
  console.log(pdf)
  return(
  
    //   <WebView   
    //   source={{ uri:url}}
    //   renderLoading={renderLoadingView}   
    //   startInLoadingState={true}    
    //   scalesPageToFit={true}
    //   javaScriptEnabled = {true} 
    // /> 

    <PDFReader
        source={{
          uri: pdf,
        }}
        webviewProps={{
          renderLoading:renderLoadingView,
          startInLoadingState:true, 
          scalesPageToFit:true
        }}
        withScroll
        customStyle={{
          readerContainerDocument:{backgroundColor:"#fff"},
          readerContainer:{backgroundColor:"#fff"},
          readerContainerZoomContainer:{height:0,width:0},
          readerContainerZoomContainerButton:{height:0}
        }}
        withPinchZoom
      />
)};

export default PDFRenderer;
