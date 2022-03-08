import moment from 'moment';
import React,{useEffect,useRef,useState} from 'react';
import { Text, View,Image,TouchableOpacity,TextInput, TouchableWithoutFeedback } from 'react-native';
import { Assets, imageProvider, serverBaseUrl, theme } from '../config';
import {addVideoComment} from '../Utils/DataHelper/CourseVideos'
import { Feather, MaterialIcons,EvilIcons, Ionicons } from '@expo/vector-icons'; 
import {useSelector} from 'react-redux'
const AddComment = (props) => {
const item = props.item;
const mode = props.mode;
    let imageRef = useRef(null)
    const[comment,setComment] = useState("")
    const user = useSelector(state => state.user.userInfo) 
    const addCommentHandler =()=>
    {
        addVideoComment(comment,user.id,props.videoId,addCommentCallback);

    }
    const addCommentCallback=(response)=>
    {
            if(response.status==201)
            {
                // console.log("comment added");
                props.unshiftCommets({comment,commentTime:Date.now(),student:user,videoId:props.videoId}) 
                setComment("")
            }
    }
    return(
        <View style={{width:"100%"}}>
        <View style={{ flexDirection: 'row', margin: 5, padding: 10,borderBottomWidth:1,borderBottomColor: theme.labelOrInactiveColor,alignItems: 'center'}}> 
            <Image source={{uri: imageProvider(user.studentImage)}} style={{height: mode=="full"?20:40, width:mode=="full"?20: 40, borderRadius: 20, borderWidth: 0.6, borderColor:theme.greyColor,}}
                 ref={(ref)=>imageRef=ref}
                 onError={()=>
                     {
                         if(imageRef)
                         {
                             imageRef.setNativeProps({
                                 src:[Image.resolveAssetSource(Assets.profile.profileIcon)]
                             })
                         }
                     }}
            />
            <View style={{flex:mode=="full"?0.75:1,flexDirection: 'column', marginLeft: 10, marginTop: 2}}>
                 <TextInput 
                    onChangeText={(text)=>setComment(text)}
                    defaultValue={comment}
                    style={{width:"100%",fontSize:mode=="full"?9:15}}
                    placeholder="Add a publi comment..."
                 />
            </View>
            {comment.length?(
            <View>
                <TouchableWithoutFeedback onPress={addCommentHandler}>
                    <View>
                        <Ionicons name="send" size={20} color={theme.greyColor} />
                    </View>
                </TouchableWithoutFeedback>
            </View>):(null)}
        </View>
        </View>
    )
}

export default AddComment;
