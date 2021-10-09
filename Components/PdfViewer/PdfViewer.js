import { Text } from 'native-base'
import * as React from 'react'
import { View } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
import { theme } from '../config'
import PDFRenderer from './PDFRenderer'

export default class PDFViewer extends React.Component {
  render() {
    return (
     
      <>
        <PDFRenderer pdf={this.props.route.params.pdf}/>
         <View style={{flexDirection: 'row',position:'absolute',top:40,left:40,zIndex:1000,elevation:1000,opacity:0.4}}>
                <Text style={{color:theme.featureNoColor}}>{this.props.route.params.studentName}  {this.props.route.params.studentNumber}</Text> 
         </View>  
       </>
    )
  }
}