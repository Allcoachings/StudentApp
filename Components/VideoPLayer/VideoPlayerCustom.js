import { Video } from 'expo-av'
import { Entypo } from '@expo/vector-icons'
import VideoPlayer from '../Utils/expo-video-player'
import React,{ useRef,useState,useEffect } from 'react'
import {Dimensions,BackHandler,findNodeHandle,UIManager,View,Text, FlatList,Image} from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import { setStatusBarHidden } from 'expo-status-bar'
import { SafeAreaView } from "react-navigation";
import { SET_STATUS_BAR_HIDDEN, TOGGLE_HEADER } from '../Actions/types'
import { useDispatch } from 'react-redux'
import { theme,dataLimit, numFormatter } from '../config'
import moment from 'moment'
import VideoCommentItem from './VideoCommentItem'
import AddComment from './AddComment'
import { fetchVideoComments, updateVideoView } from '../Utils/DataHelper/CourseVideos'
import BackArrowWhite from '../Utils/Icons/BackArrowWhite'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import VideoSettingModal from './VideoSettingModal'
import VideoPlayerSideBar from './VideoPlayerSideBar'
import CardView from '../Utils/CardView'
import Comments from './Comments'
import { Assets } from '../config'
// import * as NavigationBar from 'expo-navigation-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackAlert from './BackAlert'
 
export default VideoPlayerCustom=(props)=>
{
    //   // console.log(props);
      const {route} = props
    const playbackRateOptions = [0.25,0.5,0.75,1.00,1.25,1.50,1.75,2.00]
    const [inFullscreen, setInFullsreen] = useState(false)
    const [shouldPlay, setShouldPlay] = useState(true);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0) 
    const [comments,setComments] = useState([]);
    const [offset, setOffset] = useState(0)
    const[qualityValue, setQualityValue] = useState('Low')
    const [playbackSpeedValue, setPlaybackSpeedValue] =useState(1.00)
    const [isSettingModalVisible,setIsSettingModalVisible] = useState(false)
    const [isSideScreenVisible,setIsSideScreenVisible] = useState(false)
    const [isScreenConfigChanged,setIsScreenConfigChanged] = useState(false)
    const [ isCommentsVisible,setIsCommentsVisible] = useState(false)
    const [isSideTabsVisible,setSideTabsVisible] = useState(false)
    const playbackButtonRef = useRef(null)
    const refVideo = useRef(null)
    const dispatch = useDispatch()
    const  [backAlertVisible,setBackAlertVisible] = useState(false)

    const unshiftCommets=(commentObj)=>
    {

        setComments([commentObj,...comments])
    }

    useEffect( 
        ()=>{
            (async () => {
                const videoStatusString  = await AsyncStorage.getItem(props.route.params.videoUrl)
                // console.log(videoStatusString,"videoStatusString")
                if(videoStatusString)
                {
                    var obj = JSON.parse(videoStatusString)
                    if(!obj.didJustFinished)
                    {
                        refVideo.current.setPositionAsync(obj.positionMillis)
                    }
                }
            })()
    },[props.route.params.videoUrl])
    useEffect(() => {

        updateVideoView(props.route.params.item.id,(response)=>{
            // console.log(response.status)
            if(response.status==200)
            {
                 // console.log("updates video views")
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
    },[props.route.params.item.id])


    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => { 
           
           dispatch({type: TOGGLE_HEADER,payload:{status:false}})

        });
        
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [props.navigation]);

    // useEffect(async()=>{
    //     //  const behavior = await NavigationBar.getBehaviorAsync();
    //     //  // console.log("behaviour ",behavior);
    //     if(inFullscreen)
    //     {
    //         NavigationBar.setBehaviorAsync('overlay-swipe')
    //     }else
    //     {
    //         NavigationBar.setBehaviorAsync('inset-touch')
    //     }
    // },[inFullscreen])


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
                return true;
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
            setBackAlertVisible(true)
            // if(mode=="selfBackPress")
            // {   
                 
            //     props.navigation.goBack();
            // }
          }
          const showPlaybackSpeedOptions=()=>
          {
               
                //   UIManager.showPopupMenu(
                //       findNodeHandle(playbackButtonRef.current),
                //       ['0.25x','0.5x','0.75x','Normal','1.25x','1.50x','1.75x','2.00x'],
                //       ()=>// console.log("error occured in popup menu"),
                //       onPlaybackRatePopupEvent
                //   )

                setIsSettingModalVisible(true)
              
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
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
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

        useEffect(() =>{


            setIsScreenConfigChanged(true)
        },[isSideScreenVisible])


        useEffect(() =>{
            if(!isSideTabsVisible)
            {
                setIsSideScreenVisible(false)
            }     
        },[isSideTabsVisible])

        useEffect(() =>{ 
            if(!inFullscreen)
            {
                setIsScreenConfigChanged(false)
                setIsSideScreenVisible(false)
            
                // await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT) 
            }
        },[inFullscreen])
        
    const onPlayBackStatusUpdate =(statusObj) => 
    {
        
        if(!statusObj.isPlaying)
        {
            AsyncStorage.setItem(props.route.params.videoUrl,JSON.stringify({didJustFinished:statusObj.didJustFinished,positionMillis:statusObj.positionMillis})).then(function(){
                // console.log("saved status")
            })
        }
    }
       
    return(
        <>
        <View style={{backgroundColor:theme.primaryColor,flex:1}}>
             <View style={{flexDirection: 'row',position:'absolute',top:40,left:40,zIndex:1000,elevation:1000,opacity:0.4}}>
                <Text style={{color:theme.featureNoColor}}>{route.params.studentName}{"\n"}{route.params.studentNumber}</Text> 
            </View> 
            <View style={[{flexDirection:'row'},!inFullscreen?({height:200}):(null)]}>
                <VideoPlayer 
                    videoProps={{
                        shouldPlay: shouldPlay,
                        resizeMode:inFullscreen?Video.RESIZE_MODE_COVER: Video.RESIZE_MODE_CONTAIN, 
                        defaultControlsVisible:true,
                        ref: refVideo,
                        source: {
                            uri: props.route.params.videoUrl, 
                        },
                        rate:playbackSpeedValue, 
                        shouldCorrectPitch:true, 
                    }} 
                    playbackCallback={onPlayBackStatusUpdate}
                    fullscreen={{
                        inFullscreen: inFullscreen,
                        enterFullscreen,
                        exitFullscreen 
                    }}

                    style={{
                        videoBackgroundColor: 'black',
                        height: inFullscreen ? (isSideScreenVisible||isScreenConfigChanged )?Dimensions.get('window').width/2:Dimensions.get('window').width : 200,
                        // height: inFullscreen ? 200 : 200,
                        width: inFullscreen ? isSideScreenVisible?Dimensions.get('window').height/0.85:isScreenConfigChanged?(Dimensions.get('window').height*2):Dimensions.get('window').height :  Dimensions.get('window').width,
                    }}


                    icon={{
                        playbackApi:{
                            ref:onPlaybackRatePopupIconRef,
                            onPress:showPlaybackSpeedOptions
                        },
                        settingsIcon:<Image source={Assets.video.settings} style={{ width:25 ,height:25,marginHorizontal: 10}}/>,
                        commentIcon:<Image source={Assets.video.chat} style={{ width:25 ,height:25,marginLeft:10}} />
                    }}

                    videoTitle={{
                        titleIcon:inFullscreen?<MaterialCommunityIcons name="chevron-down" size={30} color={theme.primaryColor}/>:<BackArrowWhite height={20} width={20}/>,//MaterialCommuntyIcons
                        titleIconOnPress:inFullscreen?exitFullscreen:()=>backPressHandler("selfBackPress"),
                        title:props.route.params.videoTitle,
                        
                    }}

                    slider={{
                        thumbTintColor: theme.primaryColor,
                        minimumTrackTintColor:theme.primaryColor,
                        maximumTrackTintColor:theme.labelOrInactiveColor
                    }}
                    
                    customFunction={{
                        onVideoPlayerTouch:(status)=>{setSideTabsVisible(status);},
                        toggleVideoSettings:(status)=>{setIsSettingModalVisible(status)},
                        isSettingModalVisible,
                        fullscreenScreenConfigChanged:()=>{
                            if(inFullscreen)
                            {
                                setIsSideScreenVisible(true)
                                setIsScreenConfigChanged(true);
                                
                            }
                        },
                        toggleChatWindow:(status)=>
                        {
                            setIsCommentsVisible(status);
                        },
                        isChatWindowVisible:isCommentsVisible

                    }} 
                />
                

                    <View style={{flexDirection: 'row',height: '100%' ,width: isSideScreenVisible?'30%':0}}>
                                        
                    {isSettingModalVisible&&inFullscreen?(
                        
                        <View style={{width: '87%',height: '100%'}}> 
                        <VideoSettingModal
                            isVisible={isSettingModalVisible}
                            closeModal={()=>{setIsSettingModalVisible(false);setIsSideScreenVisible(false)}}
                            qualityValue={qualityValue}
                            setQualityValue={setQualityValue}
                            playbackSpeedValue={playbackSpeedValue}
                            setPlaybackSpeedValue={setPlaybackSpeedValue} 
                            
                        />
                        </View>
                    ):(null)} 


                    {isCommentsVisible&&inFullscreen?(
                       <Comments
                        videoId={props.route.params.item.id}
                        unshiftCommets={unshiftCommets}
                        comments={comments}
                        setIsSideScreenVisible={setIsSideScreenVisible}
                        setIsCommentsVisible={setIsCommentsVisible}
                        width={'87%'}
                        height={'100%'}
                        showCloseIcon
                        flatlistHeight={Dimensions.get('window').width}
                      />
                    ):(null)} 
{/* 
                    <View style={{}}>
                        {CardView(
                        <VideoPlayerSideBar 
                            setIsSideScreenVisible={setIsSideScreenVisible} 
                            setIsSettingModalVisible={setIsSettingModalVisible}
                            setIsCommentsVisible={setIsCommentsVisible}
                            setSideTabsVisible={setSideTabsVisible}
                            setIsSideScreenVisible={setIsSideScreenVisible}
                            setIsScreenConfigChanged={setIsScreenConfigChanged}
                            height={isScreenConfigChanged?Dimensions.get('window').width/2:Dimensions.get('window').width}
                        />,{height:'100%',width:'100%',paddingRight:10}
                        )}
                    </View> */}
                    </View>
               
               
            </View> 
            {/* meta section */}
            <View style={{borderBottomWidth:1,borderBottomColor:theme.labelOrInactiveColor}}> 
                <View style={{margin:10}}> 
                    <Text style={{color: theme.secondaryColor, fontFamily: 'Raleway_700Bold' ,fontSize:15}}>{props.route.params.videoTitle}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontFamily: 'Raleway_600SemiBold',color:theme.greyColor,marginTop:5}}>
                            {numFormatter(props.route.params.item.views)} views{' • '} {moment(props.route.params.postingTime).fromNow()} 
                        </Text>
                    </View>
                </View>
            </View>
            {isSettingModalVisible?(
                         <VideoSettingModal
                         isVisible={isSettingModalVisible}
                         closeModal={()=>{setIsSettingModalVisible(false);setIsSideScreenVisible(false)}}
                         qualityValue={qualityValue}
                         setQualityValue={setQualityValue}
                         playbackSpeedValue={playbackSpeedValue}
                         setPlaybackSpeedValue={setPlaybackSpeedValue} 
                         
                     />
                    ):(
                       <Comments
                        videoId={props.route.params.item.id}
                        unshiftCommets={unshiftCommets}
                        comments={comments}
                        setIsSideScreenVisible={setIsSideScreenVisible}
                        setIsCommentsVisible={setIsCommentsVisible}
                        width={'100%'}
                        height={'100%'}
                        
                        flatlistHeight={'100%'}
                       />
                    )} 

              
        </View>

        {backAlertVisible?( <BackAlert
                    closeModal={()=>setBackAlertVisible(false)}
                    yesFun={()=>props.navigation.goBack()}
                    noFun={()=>setBackAlertVisible(false)}
                />):(null)}
        </>
    )
    
}
