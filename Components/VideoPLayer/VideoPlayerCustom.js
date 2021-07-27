import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import React,{ useRef,useState,useEffect } from 'react'



export default VideoPlayerCustom=(props)=>
{
    const [isFullScreen,setFullScreen] =useState(true)
    const refVideo = useRef(null)
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('blur', () => {
            // do something
            console.log("working")
            refVideo.current.setStatusAsync({
                shouldPlay: false,
              })
          });
      
          return unsubscribe;
        }, [props.navigation]);
      
 
    return(
    <VideoPlayer
    
        videoProps={{
        shouldPlay: true,
        resizeMode: Video.RESIZE_MODE_CONTAIN, 
        defaultControlsVisible:true,
        ref: refVideo,
        source: {
            uri: props.route.params.videoUrl,
        },
        }}
    />
    )
    
}
