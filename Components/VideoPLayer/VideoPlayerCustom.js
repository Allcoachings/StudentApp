import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import React,{ useState } from 'react'



export default VideoPlayerCustom=(props)=>
{
    const [isFullScreen,setFullScreen] =useState(true)
    console.log(props)
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
