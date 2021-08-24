import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions} from 'react-native';
import { theme, dataLimit, serverBaseUrl, downloadIcon } from '../config';
import { Feather } from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import Toast from 'react-native-simple-toast';
import {downloadFile} from '../Utils/DownloadFile'

class RenderVideo extends React.Component {
    state = {
        
    }

    download=(item, type)=>{
        downloadFile(item,item.videoLocation, this.props.userInfo.id,type,this.downloadCallback)
    }

    downloadCallback=(response)=>{
        console.log(response)
    }

    render(){
        return( 
            <View style={styles.videoContainer}>
                <TouchableOpacity onPress={()=>{
                    this.props.mode=="institute"?(this.props.addToHistory("video", this.props.item.id)):(null)
                    this.props.mode=="institute"?(this.props.studentEnrolled?(this.props.navigation.navigate("videoplayer",{videoUrl:serverBaseUrl+this.props.item.videoLocation})):(Toast.show('You Have Not Enrolled For This Course.'))):(this.props.navigation.navigate("videoplayer",{videoUrl:serverBaseUrl+this.props.item.videoLocation}))}
                } style={{flex: 0.35}}>
                    <Image source={{uri:this.props.item.videoThumb}} style={styles.videoImage}/>
                </TouchableOpacity>
                <View style={styles.videoColumn}>
                    <View>
                        <Text style={styles.videoText}>{this.props.item.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.videoText}>{this.props.item.description}</Text>
                    </View>
                    <View>
                        <Text style={styles.videoText}>{this.props.item.date}</Text>
                    </View>
                </View>
                {this.props.downloadMode?(
                    <View style={{flexDirection: 'column',  flex: 0.1, justifyContent: 'space-between'}}>
                        <View></View>
                        <TouchableOpacity onPress={()=>this.download(this.props.item, 'video')}>
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
            marginLeft: 5,
            flex: 0.55, 
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
