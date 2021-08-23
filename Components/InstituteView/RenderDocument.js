import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions} from 'react-native';
import { theme, documentPlaceholder,dataLimit, serverBaseUrl } from '../config';
import { Feather } from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import { downloadFile } from '../Utils/DownloadFile';

class RenderDocument extends React.Component {
    state = {
        
    }
    documentOnClick = ()=>
    {

        this.props.mode=="institute"?(this.props.addToHistory("document", this.props.item.id)):(null)
        this.props.navigation.navigate('pdfViewer',{pdf:serverBaseUrl+this.props.item.fileAddress})
        // downloadFile(this.props.item,this.props.userId,'document',(response)=>{console.log(response)})
    }
    render(){
        return( 
            <View style={styles.documentContainer}>
                <TouchableOpacity onPress={()=>{this.documentOnClick()}}>
                    <Image source={{uri:documentPlaceholder}} style={styles.documentImage}/>
                </TouchableOpacity>
                <View style={{flexShrink: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ display: 'flex', flexDirection: 'row'}}>
                        <Text style={styles.documentTitle}>{this.props.item.name}</Text>
                    </View>
                    {/* <View>
                        <Text style={styles.documentText}>{this.state.institute.name}</Text>
                    </View> */}
                    {/* <View>
                        <Text style={styles.documentText}>{item.Views} {item.date}</Text>
                    </View> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    documentContainer:
    {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        // overflow: 'hidden'
        // justifyContent: 'center',
        // alignItems: 'center'
    },
        documentImage:
        {
            height: 100,
            width:  90,
            borderRadius: 10,
            marginRight: 10,
            borderColor: 'green', 
            // overflow: 'hidden'
        },
        documentTitle:
        {
            // flex: 1, 
            // flexWrap: 'wrap',
            flexShrink: 1,
            fontWeight: '700',
            
        },
        documentText:
        {
            color: theme.secondaryColor,
        },
 
  

})

export default RenderDocument;