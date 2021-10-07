import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions, findNodeHandle,UIManager, Modal} from 'react-native';
import { theme, dataLimit, serverBaseUrl, downloadIcon, numFormatter, imageProvider } from '../config';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import { Picker } from 'native-base';
import {downloadFile} from '../Utils/DownloadFile'
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import { updatePlaylist } from '../Utils/DataHelper/Course';
import RatingBar from '../Utils/RatingBar';
import CircularProgress from 'react-native-circular-progress-indicator';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
 
class RenderVideo extends React.Component {
    state = {
        showModal: false,
        playlist: this.props.courseVideosPlaylist,
        selectedPlaylist: this.props.item.playlistId,
        savingItem:false,
        downloadProgress:0
    }

    download=(item, type)=>{
        Toast.show('PLease Wait...')
        this.setState({savingItem: true});
        downloadFile(item,item.videoLocation, this.props.userInfo.id,type,this.downloadCallback,this.downloadProgessCallback)
    }
    downloadProgessCallback=(progress)=>
    {
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
    componentDidMount = () => {
         
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
        console.log("setSelectedPlaylist", selectedPlaylist)
        this.setState({showModal: false, selectedPlaylist: selectedPlaylist},()=>updatePlaylist("video",selectedPlaylist,this.props.item.id,this.updateCallback))
    }

    updateCallback=(response)=>{
        if(response.status=="200")
        {
            Toast.show("Playlist Updated Successfully.",)
            this.props.changePlayList("video", this.state.selectedPlaylist, this.props.index)
        }
        else
        {
            console.log("error", response.status)
        }
    }

    render(){
       
        return( 
            <View>
                <View style={styles.videoContainer}>
                    <TouchableOpacity onPress={()=>{
            
                        this.props.mode=="student"?(this.props.studentEnrolled?(
                            <>
                            {this.props.navigation.navigate("videoplayer",{videoUrl:serverBaseUrl+this.props.item.videoLocation,videoTitle:this.props.item.name,postingTime:this.props.item.date,item:this.props.item})}
                            {this.props.addToHistory("video", this.props.item.id)}
                            </>
                        ):(Toast.show('You Have Not Enrolled For This Course.'))):(this.props.navigation.navigate("videoplayer",{videoUrl:serverBaseUrl+this.props.item.videoLocation,videoTitle:this.props.item.name,postingTime:this.props.item.date,item:this.props.item}))}
                    } >
                        <Image source={{uri:imageProvider(this.props.item.videoThumb)}} style={styles.videoImage}/>
                    </TouchableOpacity>
                    <View style={styles.videoColumn}>
                        <View>
                            <Text style={styles.videoText}>{this.props.item.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.videoText}>{this.props.item.description}</Text>
                        </View>
                        <View>
                            <Text style={styles.videoText}>{numFormatter(this.props.item.views)+" views • "+moment(this.props.item.date).fromNow()}</Text>
                        </View>
                    </View>
                    {this.props.downloadMode?(
                        <View style={{flexDirection: 'column',  marginLeft: 'auto', justifyContent: 'space-between', marginRight:10}}>                  
                            {this.state.savingItem?(
                                <View style={{width:40,height:40}}>
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
                                        <MaterialIcons name="check-circle" size={20}/>
                                    ):(
                                        
                                            <TouchableOpacity onPress={()=>this.props.studentEnrolled?(this.download(this.props.item, 'video')):(Toast.show('You Have Not Enrolled For This Course.'))} style={{marginBottom: 8}}>
                                                <View >
                                                    <Image source={downloadIcon} style={{height: 25, width: 25}} />
                                                </View>
                                            </TouchableOpacity>
                                            
                                        
                                    )
                            )}
                        </View>
                    ):(null)}
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
            flexDirection: 'column'
        },
        videoText:
        {
            marginBottom: 5,
        },
  

})
const  mapStateToProps = (state)=>
{
    return {
        userInfo:state.user.userInfo,
    }
}
export default connect(mapStateToProps)(RenderVideo);
