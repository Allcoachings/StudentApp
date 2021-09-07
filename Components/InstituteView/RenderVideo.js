import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions, findNodeHandle,UIManager, Modal} from 'react-native';
import { theme, dataLimit, serverBaseUrl, downloadIcon, numFormatter, imageProvider } from '../config';
import { Feather } from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import { Picker } from 'native-base';
import Toast from 'react-native-simple-toast';
import {downloadFile} from '../Utils/DownloadFile'
import moment from 'moment';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
 
class RenderVideo extends React.Component {
    state = {
        
    }

    download=(item, type)=>{
        Toast.show('PLease Wait...')
        downloadFile(item,item.videoLocation, this.props.userInfo.id,type,this.downloadCallback)
    }

    downloadCallback=(response)=>{
        if(response.status=="success")
        {
            Toast.show('Video Downloaded successfully. Please Check in your Downloads Section.')
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
                      return(
                        <Picker 
                            style={{ height:30 }}
                            selectedValue={this.state.selectedPlaylist}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setSelectedPlaylist(itemValue)
                            }> 
                            {this.props.courseVideosPlaylist&&this.props.courseVideosPlaylist.map((item)=>this.renderPickerItem(item))}
                        </Picker>
                      )
                break;
        }
    }
  
    onRef = icon => {
      if (!this.state.icon) {
        this.setState({icon})
      }
    }

    // changePlaylist=()=>{
    //    return(
        
    //    )
    // }

    renderPickerItem=(item)=>
    {
        console.log(item)
        return( 
           
            <Picker.Item label={item.name} value={item.id} />
        )
    }

    setSelectedPlaylist=(selectedPlaylist)=>
    {
    
            this.setState({selectedPlaylist})
    }

    render(){
        return( 
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
                        <TouchableOpacity style={{marginLeft: 'auto', marginTop: 8}} onPress={()=>this.showThreeMenu()}>
                            <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}} ref={this.onRef}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.studentEnrolled?(this.download(this.props.item, 'video')):(Toast.show('You Have Not Enrolled For This Course.'))} style={{marginBottom: 8}}>
                            <View >
                                <Image source={downloadIcon} style={{height: 25, width: 25}} />
                            </View>
                        </TouchableOpacity>
                        
                    </View>
                ):(null)}
                {/* {this.state.showModal?(
                <Modal
                    animationType="fade"
                    transparent={true}  
                    visible={this.state.showModal}
                >
                    <View>
                        {CardView(
                            <View style={styles.container}>
                                <View style={styles.inputField}>
                                    
                                </View>
                            </View>,{width: width, height: height, }
                        )}
                    </View>
                </Modal>):(null)} */}
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
