import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions} from 'react-native';
import { theme, documentPlaceholder,dataLimit, serverBaseUrl, downloadIcon } from '../config';
import { Feather } from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import { downloadFile } from '../Utils/DownloadFile';
import Toast from 'react-native-simple-toast';

class RenderDocument extends React.Component {
    state = {
        
    }
    documentOnClick = ()=>
    {

        this.props.mode=="institute"?(this.props.addToHistory("document", this.props.item.id)):(null)
        this.props.mode=="institute"?(this.props.studentEnrolled?(this.props.navigation.navigate('pdfViewer',{pdf:serverBaseUrl+this.props.item.fileAddress})):(Toast.show('You Have Not Enrolled For This Course.'))):(this.props.navigation.navigate('pdfViewer',{pdf:serverBaseUrl+this.props.item.fileAddress}))
        // downloadFile(this.props.item,this.props.userId,'document',(response)=>{console.log(response)})
    }

    download=(item, type)=>{
        downloadFile(item,item.fileAddress,this.props.userInfo.id,type,this.downloadCallback)
    }

    downloadCallback=(response)=>{
        console.log(response)
    }

    render(){
        return( 
            <View style={styles.documentContainer}>
                <TouchableOpacity onPress={()=>{this.documentOnClick()}} style={{flex: 0.25}}>
                    <Image source={{uri:documentPlaceholder}} style={styles.documentImage}/>
                </TouchableOpacity>
                <View style={{flexShrink: 1, flex: 0.63,  justifyContent: 'center'}}>
                    <View style={{ display: 'flex', flexDirection: 'row'}}>
                        <Text style={styles.documentTitle}>{this.props.item.name}</Text>
                    </View>
                </View>
                {this.props.downloadMode?(
                    <View style={{flexDirection: 'column',  flex: 0.1, justifyContent: 'space-between'}}>
                        <View></View>
                        <TouchableOpacity onPress={()=>this.download(this.props.item, 'document')}>
                            <View style={{marginBottom: 15}}>
                                <Image source={downloadIcon} style={{height: 25, width: 25}} />
                            </View>
                        </TouchableOpacity>
                        
                    </View>
                ):(null)}
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
            alignSelf: 'flex-start',
            flexShrink: 1,
            fontWeight: '700',
            
        },
        documentText:
        {
            color: theme.secondaryColor,
        },
 
  

})
const  mapStateToProps = (state)=>
{
    return {
        userInfo:state.user.userInfo,
    }
}
export default connect(mapStateToProps)(RenderDocument)
