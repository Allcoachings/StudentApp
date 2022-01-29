import moment from 'moment';
import React, { useRef } from 'react';
import { Text, View,Image,TouchableOpacity } from 'react-native';
import { Assets, imageProvider, serverBaseUrl, theme } from '../config';
  
const VideoCommentItem = (props) => {
const item = props.item;
const imageRef = useRef(null)
    return(
        <View>
        <View style={{ flexDirection: 'row', margin: 5, padding: 10,borderBottomWidth:1,borderBottomColor: theme.labelOrInactiveColor}}> 
            <Image 
                ref={imageRef}
                source={{uri: imageProvider(item.student.studentImage)}} 
                style={{height: 40, width: 40, borderRadius: 20, borderWidth: 0.6, borderColor:theme.greyColor,}}
                onError={(props)=>{
                    if(imageRef.current)
                    {
                      imageRef.current.setNativeProps({
                        // source: [Assets.profile.profileIcon],
                        src:[Image.resolveAssetSource(Assets.profile.profileIcon)],
                      })
                    }
                  }}    
            />
            <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 2}}>
                <View style={{ flexDirection: 'row'}}>
                    <Text style={{fontFamily:'Raleway_600SemiBold', color:theme.greyColor,fontSize: 12}}>{item.student.name}{' • '}</Text>
                    <Text style={{color:theme.greyColor,  fontSize: 12}}>{moment(item.commentTime).fromNow()}</Text>
                </View>
                <View style={{flexShrink: 1}}>
                    <Text style={{fontFamily: 'Raleway_600SemiBold',  flexWrap: 'wrap'}}>{item.comment}</Text>
                </View>
            </View>
        </View>
        </View>
    )
}

export default VideoCommentItem;
