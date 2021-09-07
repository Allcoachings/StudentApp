import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions,findNodeHandle,UIManager,Alert} from 'react-native';
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

    actions = ['Change Playlist'];
    showThreeMenu=()=>
    {
         
      UIManager.showPopupMenu(
          findNodeHandle(this.state.icon),
          this.actions,
          this.onError,
          this.onPopupEvent
      )
        
    }

    onPopupEvent = (eventName, index) => {

        if (eventName !== 'itemSelected') return 
        switch (this.actions[index])
        {
            case "Change Playlist":
                      this.changePlaylist()
                break;
            case "Share": 
    
              break;
        }
      }
  
    onRef = icon => {
      if (!this.state.icon) {
        this.setState({icon})
      }
    }

    confirmReport=()=>{
        Alert.alert(
        'Confirm!',
        '\n\nAre You Sure You Want To Change The Playlist?',
        [
          {text: 'Yes', onPress: () => this.setState({showModal: true})},
          {text: 'Cancel', onPress: () => {},style: 'cancel'},
        ],
        { cancelable: false }
      )
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
                    <View style={{flexDirection: 'column',  marginLeft: 'auto', justifyContent: 'space-between', marginRight:10}}>
                        <TouchableOpacity style={{marginLeft: 'auto', marginTop: 8}} onPress={()=>this.showThreeMenu()}>
                            <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}} ref={this.onRef}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.studentEnrolled?(this.download(this.props.item, 'document')):(Toast.show('You Have Not Enrolled For This Course.'))} style={{marginBottom: 8}}>
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
