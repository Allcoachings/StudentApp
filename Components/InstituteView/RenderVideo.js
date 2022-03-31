import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions, findNodeHandle,UIManager, Modal, TouchableWithoutFeedback} from 'react-native';
import { theme, dataLimit, serverBaseUrl, downloadIcon, numFormatter, imageProvider } from '../config';
import { EvilIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import { Picker } from 'native-base';
import {downloadFile, pauseDownload} from '../Utils/DownloadFile'
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import { updatePlaylist } from '../Utils/DataHelper/Course';
import RatingBar from '../Utils/RatingBar';
import CircularProgress from 'react-native-circular-progress-indicator';
import { setDownloadingItem,setDownloadingItemProgress,removeDownloadingItem } from '../Actions';
import Arrow_down_circle_black from '../Utils/Icons/Arrow_down_circle_black';
import Lock from '../Utils/Icons/Lock';
import NotEnrolledModal from './NotEnrolledModal' 
import BlinkView from '../Utils/BlinkView';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
 
class RenderVideo extends React.Component {
    state = {
        showModal: false,
        playlist: this.props?.courseVideosPlaylist,
        selectedPlaylist: this.props?.item?.playlistId,
        savingItem:this.props.savingItem?this.props.savingItem:false,
        downloadProgress:0
    }
    pauseDownloadRef= React.createRef()
    download=(item, type)=>{
        Toast.show('PLease Wait...')
       
       
        downloadFile(item,item.videoLocation, this.props.userInfo.id,type,this.downloadCallback,this.downloadProgessCallback,(offlineItem)=>this.setDownloadingItemInRedux(offlineItem,item.videoLocation))
    }
    setDownloadingItemInRedux=(offlineItem,videoLocation)=>
    {
         
         this.setState({downloadRef:offlineItem.downloadRef,savingItem: true})
         
        this.props.setDownloadingItem({...offlineItem,url:videoLocation,type:'video'},0);
    }
    cancelDownload=()=>
    {
        this.pauseDownloadRef.current=true
        pauseDownload({downloadRef:this.state.downloadRef},()=>{
            removeDownloadingItem(this.props.videoLocation)
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
            this.setState({downloadProgress:progress})
    }
    downloadCallback=(response)=>{
        // console.log(response)
        if(response.status=="success")
        {
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
    componentDidUpdate = (prevProps, prevState) => {
      
       if(prevProps.progress!=this.props.progress)
       { 
           this.setState({downloadProgress:this.props.progress})
       }
    };
    
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
        switch (this.props.actions[index])
        {
            case "Change Playlist":
                      this.setState({showModal: true})
                break;
            case "Remove":
                this.props.removeVideo(this.props.index)
            case "Cancel":
                this.props.removeVideo()
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
        // console.log("setSelectedPlaylist", selectedPlaylist)
        this.setState({showModal: false, selectedPlaylist: selectedPlaylist},()=>updatePlaylist("video",selectedPlaylist,this.props.item?.id,this.updateCallback))
    }

    updateCallback=(response)=>{
        if(response.status=="200")
        {
            Toast.show("Playlist Updated Successfully.",)
            this.props.changePlayList("video", this.state.selectedPlaylist, this.props.index)
        }
        else
        {
            // console.log("error", response.status)
        }
    }

    
    navigateToVideoPlayer = ()=>
    {
        if(this.props.mode=="offline")
        {
            this.props.navigation.navigate("videoplayer",{videoUrl:this.props.item?.fileAddress,videoTitle:this.props.item?.name,postingTime:this.props.item?.date,item:this.props.item,studentName:this.props.userInfo.email,studentNumber:this.props.userInfo.mobileNumber})
        }
        else
        {
            if(this.props.videoType&&this.props.videoType=="live")
            {
                // if(this.props.item?.streaming&&this.props.item?.videoLocation)
                if(this.props.item?.videoLocation)
                {
                    this.props.navigation.navigate("videoplayer",{videoUrl:this.props.item?.videoLocation,videoTitle:this.props.item?.name,postingTime:this.props.item?.date,item:this.props.item,studentName:this.props.userInfo.email,studentNumber:this.props.userInfo.mobileNumber})
                }else
                {
                    Toast.show("Stream is not available")
                }
                
            }else
            {
                this.props.navigation.navigate("videoplayer",{videoUrl:serverBaseUrl+this.props.item?.videoLocation,videoTitle:this.props.item?.name,postingTime:this.props.item?.date,item:this.props.item,studentName:this.props.userInfo.email,studentNumber:this.props.userInfo.mobileNumber})
            }
            
        }
    }

    render(){
        function Bull({isVisible}) {
            return (
                <Text style={{fontSize:40,color:theme.redColor,marginRight:1}}>
                    {isVisible?"•":" "}
                </Text>
            );
        }
        return( 
            <View>
                <View style={styles.videoContainer}>
                    <TouchableOpacity onPress={()=>{
                        // console.log(this.props.item)
                        this.props.mode=="student"?(this.props.studentEnrolled||this.props.item?.demo?(
                            <>
                            {/* {this.props.navigation.navigate("videoplayer",{videoUrl:serverBaseUrl+this.props.item?.videoLocation,videoTitle:this.props.item?.name,postingTime:this.props.item?.date,item:this.props.item,studentName:this.props.userInfo.email,studentNumber:this.props.userInfo.mobileNumber})} */}
                            {this.navigateToVideoPlayer()}
                            {this.props.addToHistory("video", this.props.item?.id)}
                            </>
                        ):(
                            // Toast.show('You Have Not Enrolled For This Course.')
                            this.props.openPurchaseCourseModal?this.props.openPurchaseCourseModal():null
                            
                        )):(this.navigateToVideoPlayer())}
                    } >
                        <Image source={{uri:imageProvider(this.props.item?.videoThumb)}} style={styles.videoImage}/>
                       
                        {this.props.mode!="offline"&&!this.props.studentEnrolled&&!this.props.item?.demo?(
                            <View style={{position: 'absolute',height:30,width:30,backgroundColor:theme.secondaryColor,borderRadius:15,right:5,top:5}}>
                                <Lock height={20} width={20}/>
                            </View>
                        ):(null)}
                        
                    </TouchableOpacity>
                    <View style={styles.videoColumn}>
                        <View>
                            <Text numberOfLines={2} style={styles.videoText}>{this.props.item?.name}</Text>
                        </View>
                        <View>
                            {/* <Text numberOfLines={2} style={styles.videoText}>{this.props.item?.description}</Text> */}
                        </View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between',}}>
                            <Text>{numFormatter(this.props.item?.views)} views • {this.props.videoType=="live"?(moment(this.props.item?.liveClassDate).format("d-M-Y")+" "+this.props.item?.liveClassTime):(moment(this.props.item?.date).fromNow())}</Text>
                            {this.props.downloadMode&&this.props.item?.videoType!="live"?(
                                <View style={{flexDirection: 'column',    marginRight:10}}>                  
                                    {this.state.savingItem?(
                                        <TouchableWithoutFeedback
                                            onPress={this.cancelDownload}
                                        >
                                            <View style={{width:30,height:30,marginBottom: 8,alignItems: 'center'}}>
                                                <CircularProgress
                                                    value={this.state.downloadProgress}
                                                    radius={17}
                                                    inActiveStrokeColor={theme.greyColor}
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
                                                
                                                    // <TouchableOpacity onPress={()=>this.props.studentEnrolled?(this.download(this.props.item, 'video')):(Toast.show('You Have Not Enrolled For This Course.'))} style={{marginBottom: 8}}> 
                                                   (this.props.studentEnrolled||this.props.item?.demo)? <TouchableOpacity onPress={()=>this.download(this.props.item, 'video')} style={{marginBottom: 8}}>
                                                        <View >
                                                            {/* <Image source={downloadIcon} style={{height: 25, width: 25}} /> */}
                                                            <Arrow_down_circle_black/>
                                                        </View>
                                                    </TouchableOpacity>:null
                                                    
                                                
                                            )
                                    )}
                                </View>
                            ):(null)}
                            
                        </View>
                        <View style={{height:10}}>
                        {this.props.item?.videoType=="live"?(
                               this.props.videoType&&this.props.videoType=="live"&&this.props.item?.streaming?( 
                                <View style={{marginRight:10}}>
                                    <BlinkView  timeout={1000}>
                                        <View style={{flexDirection: 'row',alignItems: 'center'}}>
                                            <Bull isVisible/> 
                                            <Text>Live</Text>
                                        </View>
                                    </BlinkView>
                                </View>
                             ):(null)
                            ):(null)}
                        </View>
                    </View>
                   
                        {this.props.actions?(
                        <TouchableOpacity style={{marginLeft: 'auto', marginTop: 8}} onPress={()=>this.showThreeMenu()}>
                                <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}} ref={this.onRef}/>
                        </TouchableOpacity>):(null)}
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
                                        <Text style={{fontSize: 16, fontFamily: 'Raleway_600SemiBold',color: theme.secondaryColor,marginBottom: 10}}> Select Playlist</Text>
                                        <View style={{display: 'flex',flexDirection: 'column', borderWidth:1, borderRadius: 6}}>
                                        
                                            <Picker
                                                style={{ height:50 }}
                                                selectedValue={this.state.selectedPlaylist}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    this.setSelectedPlaylist(itemValue)
                                                }> 
                                                {this.props.courseVideosPlaylist&&this.props.courseVideosPlaylist.map((item)=>this.renderPickerItem(item))}
                                            </Picker>
                                        </View>
                                    </View>,{height: height*0.15, width: width*0.9, marginTop: height*0.425, marginLeft: width*0.05, justifyContent: 'center', padding: 15}
                                )}
                            </View>
                        </Modal>
                    ):(null)}
                </View>
                    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    videoContainer:
    {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
    },
        videoImage:
        {
            height: 100,
            width:  130,
            borderRadius: 10,
        },
        videoColumn:
        {
            marginTop: 6,
            marginLeft: 5,
            flexDirection: 'column',
            flexWrap:'wrap',
            width:(width-140)
        },
        videoText:
        {
            marginBottom: 5,
            flexWrap:'wrap',
            fontFamily: 'Raleway_600SemiBold',
            width:(width-140)
        },
  

})
const  mapStateToProps = (state)=>
{
    return {
        userInfo:state.user.userInfo,
    }
}
export default connect(mapStateToProps,{setDownloadingItem,setDownloadingItemProgress,removeDownloadingItem})(RenderVideo);
