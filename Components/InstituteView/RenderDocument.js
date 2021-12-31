import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions,findNodeHandle,UIManager,Alert, Modal} from 'react-native';
import { theme, documentPlaceholder,dataLimit, serverBaseUrl, downloadIcon } from '../config';
import { EvilIcons, Feather } from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import { downloadFile } from '../Utils/DownloadFile';
import { Picker } from 'native-base';
import Toast from 'react-native-simple-toast';
import {updatePlaylist} from '../Utils/DataHelper/Course'
import NotEnrolledModal from './NotEnrolledModal'

import { setDownloadingItem,setDownloadingItemProgress,removeDownloadingItem } from '../Actions';
import CircularProgress from 'react-native-circular-progress-indicator';
import Arrow_down_circle_black from '../Utils/Icons/Arrow_down_circle_black';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class RenderDocument extends React.Component {
    state = {
        showModal: false,
        selectedPlaylist: this.props.item.playlistId,
        savingItem:false,
        downloadProgress:0
    }
    nav=()=>{
        return(
            <NotEnrolledModal />
        )
    }
    documentOnClick = ()=>
    {

        // this.props.mode=="student"?():(null)
        this.props.mode=="student"?(this.props.studentEnrolled?(
            <>
                {this.props.navigation.navigate('pdfViewer',{pdf:serverBaseUrl+this.props.item.fileAddress, studentName: this.props.userInfo.name, studentNumber: this.props.userInfo.mobileNumber})}
                {this.props.addToHistory("document", this.props.item.id)}
            </>
        ):(
            // Toast.show('You Have Not Enrolled For This Course.')
            this.nav()
        )):(this.props.navigation.navigate('pdfViewer',{pdf:serverBaseUrl+this.props.item.fileAddress, studentName: this.props.insName, studentNumber: this.props.insNumber}))
        // downloadFile(this.props.item,this.props.userId,'document',(response)=>{console.log(response)})
    }

    download=(item, type)=>{
        Toast.show('PLease Wait...')
        this.setState({savingItem: true});
        downloadFile(item,item.videoLocation, this.props.userInfo.id,type,this.downloadCallback,this.downloadProgessCallback,(offlineItem)=>this.setDownloadingItemInRedux(offlineItem,item.videoLocation))
    }
    setDownloadingItemInRedux=(offlineItem,videoLocation)=>
    {
        this.props.setDownloadingItem({...offlineItem,url:videoLocation,type:'document'},0);
    }
    downloadProgessCallback=(progress,url)=>
    {
            this.props.setDownloadingItemProgress(progress,url)
            if(progress>=100)
            {
                this.props.removeDownloadingItem(url)
            }
            this.setState({downloadProgress:progress})
    }
    downloadCallback=(response)=>{
        if(response.status=="success")
        {
            Toast.show('Video Downloaded successfully. Please Check in your Downloads Section.')
        }
        else if(response.status=="already")
        {
            Toast.show('File saved');
        }else
        {
            Toast.show('Something Went Wrong. Please Try Again Later')
        }

        this.setState({savingItem: false});
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
            Toast.show("Playlist Updated Successfully.")
            this.props.changePlayList("document", this.state.selectedPlaylist, this.props.index)
        }
        else
        {
            console.log("error", response.status)
        }
    }

    render(){
        console.log("render", this.props.userInfo)
        return( 
            <View style={styles.documentContainer}> 
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{this.documentOnClick()}}>
                        <Image source={{uri:documentPlaceholder}} style={styles.documentImage}/>
                    </TouchableOpacity>
                    <View style={{flexShrink: 1, justifyContent: 'center'}}>
                        <View style={{ display: 'flex', flexDirection: 'row'}}>
                            <Text style={styles.documentTitle}>{this.props.item.name}</Text>
                        </View>
                    </View> 
                </View>
                <View style={{alignItems: 'center',marginRight:5}}>
                    {this.props.actions?(
                            <TouchableOpacity style={{marginLeft: 'auto', marginTop: 8}} onPress={()=>this.showThreeMenu()}>
                                    <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}} ref={this.onRef}/>
                            </TouchableOpacity>
                    ):(null)}
                    {this.props.downloadMode?(
                        <View style={{flexDirection: 'column',  marginLeft: 'auto', justifyContent: 'space-between',marginTop:'auto'}}>                  
                            {this.state.savingItem?(
                                <View style={{width:30,height:30}}>
                                    <CircularProgress
                                    value={this.state.downloadProgress}
                                    radius={20}
                                    inActiveStrokeColor={theme.accentColor}
                                    inActiveStrokeOpacity={0.2}
                                    inActiveStrokeWidth={5}
                                    activeStrokeWidth={5}
                                    textColor={'#000'}
                                    valueSuffix={'%'}
                                    />
                                </View>

                                ):(
                                    this.state.downloadProgress==100?(
                                        <MaterialIcons name="check-circle" size={30}/>
                                    ):(
                                        
                                        <TouchableOpacity onPress={()=>this.props.studentEnrolled?(this.download(this.props.item, 'document')):(Toast.show('You Have Not Enrolled For This Course.'))} style={{marginBottom: 8}}>
                                            <View>
                                                {/* <Image source={downloadIcon} style={{height: 25, width: 25}} /> */}
                                                <Arrow_down_circle_black/>
                                            </View>
                                        </TouchableOpacity>  
                                            
                                        
                                    )
                                )}
                            </View>
                        ):(null)}
                </View>

                 
                {this.state.showModal?(
                    <Modal
                        animationType="fade"
                        transparent={true}  
                        onRequestClose = {()=>{this.setState({showModal:false})}}
                        visible={this.state.showModal}
                    >
                        <View style={{height: height-80, width: width-80}}>
                            {CardView(
                                <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                    {/* <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                                            <EvilIcons name={"chevron-left"} size={18} color={theme.secondaryColor}/>
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
        justifyContent: 'space-between'
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

export default connect(mapStateToProps,{setDownloadingItem,setDownloadingItemProgress,removeDownloadingItem})(RenderDocument);
