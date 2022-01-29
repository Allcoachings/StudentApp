import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions,findNodeHandle,UIManager,Alert, Modal, TouchableWithoutFeedback} from 'react-native';
import { theme, documentPlaceholder,dataLimit, serverBaseUrl, downloadIcon } from '../config';
import { EvilIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import { downloadFile, pauseDownload } from '../Utils/DownloadFile';
import { Picker } from 'native-base';
import Toast from 'react-native-simple-toast';
import {updatePlaylist} from '../Utils/DataHelper/Course'
import NotEnrolledModal from './NotEnrolledModal'

import { setDownloadingItem,setDownloadingItemProgress,removeDownloadingItem } from '../Actions';
import CircularProgress from 'react-native-circular-progress-indicator';
import Arrow_down_circle_black from '../Utils/Icons/Arrow_down_circle_black';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import Lock from '../Utils/Icons/Lock';
class RenderDocument extends React.Component {
    state = {
        showModal: false,
        selectedPlaylist: this.props.item.playlistId,
        savingItem:false,
        downloadProgress:0
    }
    pauseDownloadRef= React.createRef()
    nav=()=>{
        return(
            <NotEnrolledModal />
        )
    }
    documentOnClick = ()=>
    {

        let link;
         if(this.props.item.fileAddress.includes("file://")||this.props.item.fileAddress.includes("http://")||this.props.item.fileAddress.includes("https://"))
        {
            link = this.props.item.fileAddress
        }else
        {
            link = serverBaseUrl+this.props.item.fileAddress
        }
        // this.props.mode=="student"?():(null)
        this.props.mode=="student"?(this.props.studentEnrolled||this.props.item.demo?(
            <>
                {this.props.navigation.navigate('pdfViewer',{pdf:link, studentName: this.props.userInfo.email, studentNumber: this.props.userInfo.mobileNumber,name:this.props.item.name})}
                {this.props.addToHistory("document", this.props.item.id)}
            </>
        ):(
            // Toast.show('You Have Not Enrolled For This Course.')
            // this.nav()
            this.props.openPurchaseCourseModal?this.props.openPurchaseCourseModal():null
        )):(this.props.navigation.navigate('pdfViewer',{pdf:link, studentName: this.props.insName, studentNumber: this.props.insNumber}))
        // downloadFile(this.props.item,this.props.userId,'document',(response)=>{// console.log(response)})
    }

    download=(item, type)=>{
        Toast.show('PLease Wait...')
        // console.log(item)
        downloadFile(item,item.fileAddress, this.props.userInfo.id,type,this.downloadCallback,this.downloadProgessCallback,(offlineItem)=>this.setDownloadingItemInRedux(offlineItem,item.fileAddress))
    }
    setDownloadingItemInRedux=(offlineItem,fileAddress)=>
    {
        
       
        this.setState({downloadRef:offlineItem.downloadRef,savingItem: true})
        this.props.setDownloadingItem({...offlineItem,url:fileAddress,type:'document'},0);
    }
    cancelDownload=()=>
    {
        this.pauseDownloadRef.current=true
        pauseDownload({downloadRef:this.state.downloadRef},()=>{
            removeDownloadingItem(this.props.fileAddress)
            this.pauseDownloadRef.current=false
        })
    }
    downloadProgessCallback=(progress,url)=>
    {
            this.props.setDownloadingItemProgress(progress,url)
            if(progress>=100)
            {
                this.props.removeDownloadingItem(url)
            }
            // console.log("progress",progress)
            this.setState({downloadProgress:progress})
    }
    downloadCallback=(response)=>{
        if(response.status=="success")
        {
            this.setState({downloadProgress:100})
            Toast.show('Video Downloaded successfully. Please Check in your Downloads Section.')
        }
        else if(response.status=="already")
        {
            Toast.show('File saved');
        }else if(!this.pauseDownloadRef?.current)
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
            // console.log("error", response.status)
        }
    }

    render(){
        // console.log("render", this.props.userInfo)
        return( 
            <View style={styles.documentContainer}> 
                <View style={{flexDirection:'row',justifyContent: 'space-between',width:'100%'}}>
                    <View style={{flexDirection:'row',}}>
                        <TouchableOpacity onPress={()=>{this.documentOnClick()}}>
                            <Image source={{uri:documentPlaceholder}} style={styles.documentImage}/>
                            {this.props.mode!="offline"&&!this.props.studentEnrolled&&!this.props.item.demo?(
                                <View style={{position: 'absolute',height:30,width:30,backgroundColor:theme.secondaryColor,borderRadius:15,right:5,top:5}}>
                                    <Lock height={20} width={20}/>
                                </View>
                            ):(null)}
                        </TouchableOpacity>
                        <View style={{flexShrink: 1, justifyContent: 'center'}}>
                            <View style={{ display: 'flex', flexDirection: 'row'}}>
                                <Text style={styles.documentTitle}>{this.props.item.name}</Text>
                            </View>

                        </View>
                    </View>
                    {this.props.downloadMode?(
                        <View style={{flexDirection: 'column',marginLeft:'auto',  marginLeft: 'auto', justifyContent: 'space-between',marginTop:'auto'}}>                  
                            {this.state.savingItem?(
                                <TouchableWithoutFeedback   onPress={this.cancelDownload}>
                                    <View style={{width:30,height:30,marginBottom: 8,alignItems: 'center',marginRight:5}}>
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
                                </TouchableWithoutFeedback>

                                ):(
                                    
                                    this.state.downloadProgress==100?(
                                        <MaterialIcons name="check-circle" size={25}/>
                                    ):(
                                        
                                        this.props.studentEnrolled||this.props.item.demo? <TouchableOpacity onPress={()=>(this.download(this.props.item, 'document'))} style={{marginBottom: 8}}>
                                            <View>
                                                {/* <Image source={downloadIcon} style={{height: 25, width: 25}} /> */}
                                                <Arrow_down_circle_black/>
                                            </View>
                                        </TouchableOpacity>  :null
                                            
                                        
                                    )
                                )}
                            </View>
                        ):(null)} 
                </View>
                <View style={{alignItems: 'center',marginRight:5}}>
                    {this.props.actions?(
                            <TouchableOpacity style={{marginLeft: 'auto', marginTop: 8}} onPress={()=>this.showThreeMenu()}>
                                    <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}} ref={this.onRef}/>
                            </TouchableOpacity>
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
            height: 90,
            width:  80,
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
