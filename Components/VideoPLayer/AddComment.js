import moment from 'moment';
import React,{useEffect,useState} from 'react';
import { Text, View,Image,TouchableOpacity,TextInput, TouchableWithoutFeedback } from 'react-native';
import { imageProvider, serverBaseUrl, theme } from '../config';
import {addVideoComment} from '../Utils/DataHelper/CourseVideos'
import { MaterialIcons } from '@expo/vector-icons'; 
import {useSelector} from 'react-redux'
const AddComment = (props) => {
const item = props.item;
 
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
                console.log("comment added");
                props.unshiftCommets({comment,commentTime:Date.now(),student:user,videoId:props.videoId}) 
                setComment("")
            }
    }
    return(
        <View>
        <View style={{ flexDirection: 'row', margin: 5, padding: 10,borderBottomWidth:1,borderBottomColor: theme.labelOrInactiveColor,alignItems: 'center'}}> 
            <Image source={{uri: imageProvider(user.studentImage)}} style={{height: 40, width: 40, borderRadius: 20, borderWidth: 0.6, borderColor:theme.greyColor,}}/>
            <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 2}}>
                 <TextInput 
                    onChangeText={(text)=>setComment(text)}
                    defaultValue={comment}
                    placeholder="Add a publi comment..."
                 />
            </View>
            {comment.length?(
            <View>
                <TouchableWithoutFeedback onPress={addCommentHandler}>
                    <View>
                        <MaterialIcons name="arrow-forward" size={24} color={theme.greyColor} />
                    </View>
                </TouchableWithoutFeedback>
            </View>):(null)}
        </View>
        </View>
    )
}

export default AddComment;
