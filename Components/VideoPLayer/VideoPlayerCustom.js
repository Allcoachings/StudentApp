import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import React,{ useState,useEffect } from 'react'



export default VideoPlayerCustom=(props)=>
{
    const [isFullScreen,setFullScreen] =useState(true)
    
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('blur', () => {
            // do something
            console.log("working")
          });
      
          return unsubscribe;
        }, [props.navigation]);
      
 
    return(
    <VideoPlayer
        videoProps={{
        shouldPlay: true,
        resizeMode: Video.RESIZE_MODE_CONTAIN, 
        defaultControlsVisible:true,
        source: {
            uri: props.route.params.videoUrl,
        },
        }}
    />
    )
    
}
