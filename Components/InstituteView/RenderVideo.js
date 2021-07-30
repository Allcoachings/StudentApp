import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions} from 'react-native';
import { theme, dataLimit, serverBaseUrl } from '../config';
import { Feather } from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'

class RenderVideo extends React.Component {
    state = {
        
    }

    render(){
        return( 
            <View style={styles.videoContainer}>
                <TouchableOpacity onPress={()=>{
                    this.props.mode=="institute"?(this.props.addToHistory("video", this.props.item.id)):(null)
                    this.props.navigation.navigate("videoplayer",{videoUrl:serverBaseUrl+this.props.item.videoLocation})}
                }>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    videoContainer:
    {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row'
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
            display: 'flex', 
            flexDirection: 'column'
        },
        videoText:
        {
            marginBottom: 5,
        },
  

})

export default RenderVideo;