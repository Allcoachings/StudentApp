import { View ,FlatList,Text} from 'react-native'
import React from 'react'
import AddComment from './AddComment'
import VideoCommentItem from './VideoCommentItem'
import { Entypo } from '@expo/vector-icons'
import { theme } from '../config'
function Comments({videoId,unshiftCommets,mode,comments,setIsCommentsVisible,setIsSideScreenVisible,height,width,flatlistHeight,showCloseIcon}) {
    // // console.log(parseFloat(flatlistHeight),flatlistHeight)
    return (
        <View style={{width,height}}> 
            <View style={{marginTop:10,flexDirection: 'row',alignItems: 'center'}}> 
                {showCloseIcon?(
                    <Entypo name="cross" size={30} color={theme.greyColor} onPress={()=>{setIsCommentsVisible(false);setIsSideScreenVisible(false)}}/>
                ):(null)}
                
                <Text style={{fontFamily: 'Raleway_600SemiBold' ,fontSize:20,marginLeft:10}}>Comments</Text> 
            </View>
            <View style={{flex:1,width:"100%"}}>
                <View style={{flex:0.83}}>
                        
                    <FlatList
                        data={comments} 
                        renderItem={({item})=> <VideoCommentItem mode={mode} item={item}/>}
                        keyExtractor={(item)=>item.id}  
                    />
                </View> 
                {/* <View style={{position:'absolute',bottom:300,left: 0}}>
                    <Text>dgsdgsdgsdg</Text> */}
                <View style={{flex:mode=="full"?0.23:1.35}}>
                    <AddComment mode={mode} videoId={videoId} unshiftCommets={unshiftCommets}/>
                </View>
            {/* </View> */}
            </View>
            
                {/* <VideoCommentItem/>
                <VideoCommentItem/>
                <VideoCommentItem/> */} 
        </View>
    )
}

export default Comments
