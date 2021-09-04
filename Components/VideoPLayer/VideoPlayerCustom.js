import { Video } from 'expo-av'
import VideoPlayer from '../Utils/expo-video-player'
import React,{ useRef,useState,useEffect } from 'react'
import {Dimensions,BackHandler,findNodeHandle,UIManager,View,Text, FlatList} from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import { setStatusBarHidden } from 'expo-status-bar'
import { SafeAreaView } from "react-navigation";
import { SET_STATUS_BAR_HIDDEN } from '../Actions/types'
import { useDispatch } from 'react-redux'
import { theme,dataLimit } from '../config'
import moment from 'moment'
import VideoCommentItem from './VideoCommentItem'
import AddComment from './AddComment'
import { fetchVideoComments, updateVideoView } from '../Utils/DataHelper/CourseVideos'

export default VideoPlayerCustom=(props)=>
{
      
    const playbackRateOptions = [0.25,0.5,0.75,1.00,1.25,1.50,1.75,2.00]
    const [inFullscreen, setInFullsreen] = useState(false)
    const [shouldPlay, setShouldPlay] = useState(true);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0) 
    const [comments,setComments] = useState([]);
    const [offset, setOffset] = useState(0)
    const playbackButtonRef = useRef(null)
    const refVideo = useRef(null)
    const dispatch = useDispatch()

    const unshiftCommets=(commentObj)=>
    {

        setComments([commentObj,...comments])
    }
    useEffect(() => {

        updateVideoView(props.route.params.item.id,(response)=>{
            console.log(response.status)
            if(response.status==200)
            {
                 console.log("updates video views")
            }
        })
        fetchVideoComments(props.route.params.item.id,offset,dataLimit,(response)=>{

            if(response.status ==200)
            {
                response.json().then(data=>
                {
                    setComments(data); 
                })
            }
        })
    },[])
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('blur', () => { 
            // refVideo.current.setStatusAsync({
            //     shouldPlay: false,
            //   })
              setShouldPlay(false)
          });
      
          return unsubscribe;
        }, [props.navigation]);
      
        useEffect(() => {
            
            
            const backHandler = BackHandler.addEventListener(
              "hardwareBackPress",
              ()=>{
                backPressHandler("hardwareBackPress");
                return false;
              }
            );
        
            return () => backHandler.remove();
          }, []);

         const backPressHandler=(mode) => {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
            setStatusBarHidden(false, 'fade')
            setInFullsreen(false)
            setShouldPlay(false)
            dispatch({ type: SET_STATUS_BAR_HIDDEN,payload:false })
            if(mode=="selfBackPress")
            {
                props.navigation.goBack();
            }
          }
          const showPlaybackSpeedOptions=()=>
          {
               
                  UIManager.showPopupMenu(
                      findNodeHandle(playbackButtonRef.current),
                      ['0.25x','0.5x','0.75x','Normal','1.25x','1.50x','1.75x','2.00x'],
                      ()=>console.log("error occured in popup menu"),
                      onPlaybackRatePopupEvent
                  )
              
          }
          const onPlaybackRatePopupIconRef = icon => {
            
              if (!playbackButtonRef.current) {
            
              
                playbackButtonRef.current=icon
              }
            }
            
         const  onPlaybackRatePopupEvent = (eventName, index) => {
      
              if (eventName !== 'itemSelected') return  
              setPlaybackSpeed(playbackRateOptions[index])
          }
          const exitFullscreen = async () => 
          { 
            setStatusBarHidden(false, 'fade')
            setInFullsreen(!inFullscreen)
            dispatch({ type: SET_STATUS_BAR_HIDDEN,payload:false })
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
          }
          const  enterFullscreen=async () => {
            setStatusBarHidden(true, 'fade')
            setInFullsreen(!inFullscreen)
            dispatch({ type: SET_STATUS_BAR_HIDDEN,payload:true })
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
            refVideo.current.setStatusAsync({
                shouldPlay: shouldPlay,
            })
            SafeAreaView.setStatusBarHeight(0);
        }

       
    return(
        <View style={{backgroundColor:theme.primaryColor,flex:1}}>
            <VideoPlayer 
                videoProps={{
                    shouldPlay: shouldPlay,
                    resizeMode:inFullscreen?Video.RESIZE_MODE_COVER: Video.RESIZE_MODE_CONTAIN, 
                    defaultControlsVisible:true,
                    ref: refVideo,
                    source: {
                        uri: props.route.params.videoUrl,
                        // uri:"https://youtu.be/uxk9wkR-ik0"
                    },
                    rate:playbackSpeed,
                    shouldCorrectPitch:true, 
                }} 
                fullscreen={{
                    inFullscreen: inFullscreen,
                    enterFullscreen,
                    exitFullscreen 
                }}

                style={{
                    videoBackgroundColor: 'black',
                    height: inFullscreen ? Dimensions.get('window').width : 160,
                    width: inFullscreen ? Dimensions.get('window').height :  Dimensions.get('window').width,
                }}


                icon={{
                    playbackApi:{
                        ref:onPlaybackRatePopupIconRef,
                        onPress:showPlaybackSpeedOptions
                    }
                }}

                videoTitle={{
                    titleIcon:inFullscreen?"chevron-down":"arrow-left",//MaterialCommuntyIcons
                    titleIconOnPress:inFullscreen?exitFullscreen:()=>backPressHandler("selfBackPress"),
                    title:props.route.params.videoTitle,
                    
                }}
            />
            {/* meta section */}
            <View style={{borderBottomWidth:1,borderBottomColor:theme.labelOrInactiveColor}}> 
                <View style={{margin:10}}> 
                    <Text style={{fontFamily: 'Raleway_600SemiBold' ,fontSize:15}}>{props.route.params.videoTitle}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color:theme.greyColor,marginTop:5}}>1K views{' • '} {moment(props.route.params.postingTime).fromNow()} </Text>
                    </View>
                </View>
            </View>
            <View> 
                <View style={{margin:10}}> 
                    <Text style={{fontFamily: 'Raleway_600SemiBold' ,fontSize:15}}>Comments</Text> 
                </View>

                    <AddComment videoId={props.route.params.item.id} unshiftCommets={unshiftCommets}/>
                    <FlatList
                        data={comments} 
                        renderItem={({item})=> <VideoCommentItem item={item}/>}
                        keyExtractor={(item)=>item.id}
                        

                    />
                    {/* <VideoCommentItem/>
                    <VideoCommentItem/>
                    <VideoCommentItem/> */}
                
            </View>

    </View>
    )
    
}
