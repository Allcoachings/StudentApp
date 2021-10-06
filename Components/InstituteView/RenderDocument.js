import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions,findNodeHandle,UIManager,Alert, Modal} from 'react-native';
import { theme, documentPlaceholder,dataLimit, serverBaseUrl, downloadIcon } from '../config';
import { Feather } from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import { downloadFile } from '../Utils/DownloadFile';
import { Picker } from 'native-base';
import Toast from 'react-native-simple-toast';
import {updatePlaylist} from '../Utils/DataHelper/Course'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class RenderDocument extends React.Component {
    state = {
        showModal: false,
        selectedPlaylist: this.props.item.playlistId
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
          this.props.actions,
          this.onError,
          this.onPopupEvent
      )
        
    }

    onPopupEvent = (eventName, index) => {

        if (eventName !== 'itemSelected') return 
        switch (this.actions[index])
        {
            case "Change Playlist":
                      this.setState({showModal: true})
                break;
        }
    }
  
    onRef = icon => {
      if (!this.state.icon) {
        this.setState({icon})
      }
    }

    

    renderPickerItem=(item)=>
    {
        if(item.id!=-1)
        {
            return( 
            
                <Picker.Item label={item.name} value={item.id} />
            )
        }
    }

    setSelectedPlaylist=(selectedPlaylist)=>
    {
        this.setState({showModal: false, selectedPlaylist: selectedPlaylist},()=>updatePlaylist("document",selectedPlaylist,this.props.item.id,this.updateCallback))
    }

    updateCallback=(response)=>{
        if(response.status=="200")
        {
            Toast.show("Playlist Updated Successfully.",)
            this.props.changePlayList("document", this.state.selectedPlaylist, this.props.index)
        }
        else
        {
            console.log("error", response.status)
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
                    <View style={{flexDirection: 'column',  marginLeft: 'auto', justifyContent: 'space-between', marginRight:10}}>
                        <View></View>
                        <TouchableOpacity onPress={()=>this.props.studentEnrolled?(this.download(this.props.item, 'document')):(Toast.show('You Have Not Enrolled For This Course.'))} style={{marginBottom: 8}}>
                            <View>
                                <Image source={downloadIcon} style={{height: 25, width: 25}} />
                            </View>
                        </TouchableOpacity>  
                    </View>
                ):(
                    this.props.actions.length>0?(<TouchableOpacity style={{marginLeft: 'auto', marginTop: 8}} onPress={()=>this.showThreeMenu()}>
                            <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}} ref={this.onRef}/>
                    </TouchableOpacity>):(null)
                )}
                {this.state.showModal?(
                    <Modal
                        animationType="fade"
                        transparent={true}  
                        visible={this.state.showModal}
                    >
                        <View style={{height: height-80, width: width-80}}>
                            {CardView(
                                <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                    {/* <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                                            <Feather name={"arrow-left"} size={18} color={theme.secondaryColor}/>
                                        </TouchableOpacity> */}
                                        <Text style={{fontSize: 16, fontFamily: 'Raleway_600SemiBold',color: theme.secondaryColor}}> Select Playlist</Text>
                                    {/* </View> */}
                                    <View style={{display: 'flex',flexDirection: 'column', borderWidth:1, borderRadius: 6}}>
                                    
                                        <Picker 
                                            style={{ height:50 }}
                                            selectedValue={this.state.selectedPlaylist}
                                            onValueChange={(itemValue, itemIndex) =>
                                                this.setSelectedPlaylist(itemValue)
                                            }> 
                                            {this.props.courseDocumentPlaylist&&this.props.courseDocumentPlaylist.map((item)=>this.renderPickerItem(item))}
                                        </Picker>
                                    </View>
                                </View>,{height: height*0.15, width: width*0.9, marginTop: height*0.425, marginLeft: width*0.05, justifyContent: 'center', padding: 15}
                            )}
                        </View>
                    </Modal>
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
