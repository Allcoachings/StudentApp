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

        // this.props.mode=="student"?():(null)
        this.props.mode=="student"?(this.props.studentEnrolled?(
            <>
                {this.props.navigation.navigate('pdfViewer',{pdf:serverBaseUrl+this.props.item.fileAddress, insName: this.props.insName, insNumber: this.props.insNumber})}
                {this.props.addToHistory("document", this.props.item.id)}
            </>
        ):(Toast.show('You Have Not Enrolled For This Course.'))):(this.props.navigation.navigate('pdfViewer',{pdf:serverBaseUrl+this.props.item.fileAddress, insName: this.props.insName, insNumber: this.props.insNumber}))
        // downloadFile(this.props.item,this.props.userId,'document',(response)=>{console.log(response)})
    }

    download=(item, type)=>{
        Toast.show('PLease Wait...')
        downloadFile(item,item.fileAddress,this.props.userInfo.id,type,this.downloadCallback)
    }

    downloadCallback=(response)=>{
        
        if(response.status=="success")
        {
            Toast.show('Document Downloaded successfully. Please Check in your Downloads Section.')
        }
        else
        {
            Toast.show('Something Went Wrong. Please Try Again Later')
        }
    }

    render(){
        return( 
            <View style={styles.documentContainer}>
                <TouchableOpacity onPress={()=>{this.documentOnClick()}}>
                    <Image source={{uri:documentPlaceholder}} style={styles.documentImage}/>
                </TouchableOpacity>
                <View style={{flexShrink: 1, justifyContent: 'center'}}>
                    <View style={{ display: 'flex', flexDirection: 'row'}}>
                        <Text style={styles.documentTitle}>{this.props.item.name}</Text>
                    </View>
                </View>
                {this.props.downloadMode?(
                    <View style={{flexDirection: 'row',  marginLeft: 'auto', marginTop: 'auto', marginRight: 10, marginBottom: 15}}>
                        <View></View>
                        <TouchableOpacity onPress={()=>this.props.studentEnrolled?(this.download(this.props.item, 'document')):(Toast.show('You Have Not Enrolled For This Course.'))}>
                            <View>
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
