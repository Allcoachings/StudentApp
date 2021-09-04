import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions} from 'react-native';
import { theme, dataLimit, serverBaseUrl, downloadIcon, numFormatter, imageProvider } from '../config';
import { Feather } from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import Toast from 'react-native-simple-toast';
import {downloadFile} from '../Utils/DownloadFile'
import moment from 'moment';
 
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
                    <View style={{flexDirection: 'row',  marginLeft: 'auto', marginTop: 'auto', marginRight: 10, marginBottom: 15}}>
                        <View></View>
                        <TouchableOpacity onPress={()=>this.download(this.props.item, 'video')}>
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
