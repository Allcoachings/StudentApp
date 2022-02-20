import { __awaiter, __rest } from "tslib";
import { Audio, Video } from 'expo-av';
import { ActivityIndicator, Animated, StyleSheet, Text, TouchableWithoutFeedback, View, } from 'react-native';
import { ControlStates, ErrorSeverity, PlaybackStates } from './constants';
import { ErrorMessage, TouchableButton, deepMerge, getMinutesSecondsFromMilliseconds, styles, } from './utils';
import { MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import { defaultProps } from './props';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import Slider from '@react-native-community/slider'; 


const VideoPlayer = (tempProps) => {
    const props = deepMerge(defaultProps, tempProps); 
    let playbackInstance = null;
    let controlsTimer = null;
    let initialShow = props.defaultControlsVisible;
    let lastPress = 0;
    const [errorMessage, setErrorMessage] = useState('');
    const controlsOpacity = useRef(new Animated.Value(props.defaultControlsVisible ? 1 : 0)).current;
    const [controlsState, setControlsState] = useState(props.defaultControlsVisible ? ControlStates.Visible : ControlStates.Hidden);
    const [extraTimeToHide,setExtraTimeToHide] = useState(0);
    const [playbackInstanceInfo, setPlaybackInstanceInfo] = useState({
        position: 0,
        duration: 0,
        state: props.videoProps.source ? PlaybackStates.Loading : PlaybackStates.Error,
    });
    const [fastForwarding,setFastForwarding] = useState(false);
    const [fastBackwarding,setFastBackwarding] = useState(false);
    // We need to extract ref, because of misstypes in <Slider />
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _a = props.slider, { ref: sliderRef } = _a, sliderProps = __rest(_a, ["ref"]);
    const screenRatio = props.style.width / props.style.height;
    let videoHeight = props.style.height;
    let videoWidth = videoHeight * screenRatio;
    if (videoWidth > props.style.width) {
        videoWidth = props.style.width;
        videoHeight = videoWidth / screenRatio;
    }
 
    useEffect(() => {
        setAudio();
        return () => {
            if (playbackInstance) {
                playbackInstance.setStatusAsync({
                    shouldPlay: false,
                });
            }
        };
    }, []);
    useEffect(() => {
        if (!props.videoProps.source) {
            console.error('[VideoPlayer] `Source` is a required in `videoProps`. ' +
                'Check https://docs.expo.io/versions/latest/sdk/video/#usage');
            setErrorMessage('`Source` is a required in `videoProps`');
            setPlaybackInstanceInfo(Object.assign(Object.assign({}, playbackInstanceInfo), { state: PlaybackStates.Error }));
        }
        else {
            setPlaybackInstanceInfo(Object.assign(Object.assign({}, playbackInstanceInfo), { state: PlaybackStates.Playing }));
        }
    }, [props.videoProps.source]);
    const hideAnimation = () => {
        // props.customFunction.onVideoPlayerTouch(false)
        Animated.timing(controlsOpacity, {
            toValue: 0,
            duration: props.animation.fadeOutDuration,
            useNativeDriver: true,
        }).start(({ finished }) => {
            if (finished) {
                setControlsState(ControlStates.Hidden);
            }
        });
    };
    const animationToggle = () => {
        props.customFunction.onVideoPlayerTouch(true)
        if (controlsState === ControlStates.Hidden) {
            Animated.timing(controlsOpacity, {
                toValue: 1,
                duration: props.animation.fadeInDuration,
                useNativeDriver: true,
            }).start(({ finished }) => {
                if (finished) {
                    setControlsState(ControlStates.Visible);
                }
            });
        }
        else if (controlsState === ControlStates.Visible) {
            hideAnimation();
        }
        if (controlsTimer === null) {
            controlsTimer = setTimeout(() => {
                if (playbackInstanceInfo.state === PlaybackStates.Playing &&
                    controlsState === ControlStates.Hidden) {
                    hideAnimation();
                    setExtraTimeToHide(0)
                }
                if (controlsTimer) {
                    clearTimeout(controlsTimer);
                }
                controlsTimer = null;
            }, parseInt(2000+extraTimeToHide));
        }
    };
    // Set audio mode to play even in silent mode (like the YouTube app)
    const setAudio = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
            });
        }
        catch (e) {
            props.errorCallback({
                type: ErrorSeverity.NonFatal,
                message: 'Audio.setAudioModeAsync',
                obj: e,
            });
        }
    });
    const updatePlaybackCallback = (status) => {
     
        props.playbackCallback(status);
        if (status.isLoaded) {
            setPlaybackInstanceInfo(Object.assign(Object.assign({}, playbackInstanceInfo), { position: status.positionMillis, duration: status.durationMillis || 0, state: status.didJustFinish
                    ? PlaybackStates.Ended
                    : status.isBuffering
                        ? PlaybackStates.Buffering
                        : status.shouldPlay
                            ? PlaybackStates.Playing
                            : PlaybackStates.Paused }));
            if ((status.didJustFinish && controlsState === ControlStates.Hidden) ||
                (status.isBuffering && controlsState === ControlStates.Hidden && initialShow)) {
                animationToggle();
                initialShow = false;
            }
        }
        else {
            if (status.isLoaded === false && status.error) {
                const errorMsg = `Encountered a fatal error during playback: ${status.error}`;
                setErrorMessage(errorMsg);
                props.errorCallback({ type: ErrorSeverity.Fatal, message: errorMsg, obj: {} });
            }
        }
    };
    const fastForward =(sec)=>
    {
        setFastForwarding(true);
        const skipTime = playbackInstanceInfo.position+(sec*1000)
        playbackInstance.setPositionAsync(skipTime).then(()=>{
            
            setFastForwarding(false);
        })
        setExtraTimeToHide(1000)
    }
    const fastBackward =(sec)=>
    {
        setFastBackwarding(true);
        const skipTime = playbackInstanceInfo.position-(sec*1000)
        playbackInstance.setPositionAsync(skipTime).then(()=>{
            setFastBackwarding(false);
             
        })
        setExtraTimeToHide(1000) 
    }
    const onDoublePress=(fun)=>
    {
        const time = new Date().getTime();
        const delta = time - lastPress;

        const DOUBLE_PRESS_DELAY = 400;
        if (delta < DOUBLE_PRESS_DELAY) {
            // Success double press
            fun()
            // console.log('double press');

        }
        lastPress = time;
    }
    const togglePlay = () => __awaiter(void 0, void 0, void 0, function* () {
        
        if (controlsState === ControlStates.Hidden) {
            return;
        }
        const shouldPlay = playbackInstanceInfo.state !== PlaybackStates.Playing;
        if (playbackInstance !== null) {
            yield playbackInstance.setStatusAsync(Object.assign({ shouldPlay }, (playbackInstanceInfo.state === PlaybackStates.Ended && { positionMillis: 0 })));
            setPlaybackInstanceInfo(Object.assign(Object.assign({}, playbackInstanceInfo), { state: playbackInstanceInfo.state === PlaybackStates.Playing
                    ? PlaybackStates.Paused
                    : PlaybackStates.Playing }));
            if (shouldPlay) {
                animationToggle();
            }
        }
        
    });
    if (playbackInstanceInfo.state === PlaybackStates.Error) {
        return (<View style={{
                backgroundColor: props.style.videoBackgroundColor,
                width: videoWidth,
                height: videoHeight,
            }}>
        <ErrorMessage style={props.textStyle} message={errorMessage}/>
      </View>);
    }
    if (playbackInstanceInfo.state === PlaybackStates.Loading) {
        return (<View style={{
                backgroundColor: props.style.controlsBackgroundColor,
                width: videoWidth,
                height: videoHeight,
                justifyContent: 'center',
            }}>
        {props.icon.loading || <ActivityIndicator {...props.activityIndicator}/>}
      </View>);
    }
     
    return (<View style={{
            backgroundColor: props.style.videoBackgroundColor,
            width: videoWidth,
            height: videoHeight,
            maxWidth: '100%',
        }}>
            {(controlsState==ControlStates.Visible)?(
                <View style={{position: 'absolute',top:10,left:10,zIndex:2,flexDirection: 'row'}}>
                    <TouchableWithoutFeedback onPress={props.videoTitle.titleIconOnPress}>
                        <View> 
                            {props.videoTitle.titleIcon}
                        </View>
                    </TouchableWithoutFeedback>
                    {props.videoTitle.title?(<Text style={[{color:'white',margin:5,fontSize:15,fontFamily:'Raleway_600SemiBold'},props.videoTitle.titleStyle]}>{props.videoTitle.title}</Text>):(null)}
                </View>
            ):(null)}
            
      <Video style={styles.videoWrapper} {...props.videoProps} ref={component => {
            playbackInstance = component;
            if (props.videoProps.ref) {
                props.videoProps.ref.current = component;
            }
        }} onPlaybackStatusUpdate={updatePlaybackCallback}/>

      <TouchableWithoutFeedback onPress={animationToggle}>
        <Animated.View style={Object.assign(Object.assign({}, StyleSheet.absoluteFillObject), { opacity: controlsOpacity, justifyContent: 'center', alignItems: 'center' })}>
          <View style={Object.assign(Object.assign({}, StyleSheet.absoluteFillObject), { backgroundColor: props.style.controlsBackgroundColor, opacity: 0.5 })}/>
          <View style={{width:'100%',alignItems: 'center',flexDirection: 'row',justifyContent: 'center'}} pointerEvents={controlsState === ControlStates.Visible ? 'auto' : 'none'}>
            <View style={[ {marginRight:15,width:'30%',alignSelf: 'flex-end'}]}>
                <TouchableButton   onPress={()=>fastBackward(10)}>
                    <View style={{height:'100%', width:'100%',alignItems: 'center',justifyContent: 'center'}}> 
                        {playbackInstanceInfo.state !== PlaybackStates.Ended?(
                                <MaterialIcons name="replay-10" style={props.icon.style} size={props.icon.size/1.3} color={props.icon.color}/>
                        ):(null)}
                        
                    </View>
                </TouchableButton>
            </View>
            <View style={[styles.iconWrapper,{flexDirection: 'row',alignItems: 'center'}]}>
                
                <TouchableButton onPress={togglePlay}>
                        <View> 
                        {playbackInstanceInfo.state === PlaybackStates.Buffering &&
                            (props.icon.loading || <ActivityIndicator {...props.activityIndicator}/>)}
                        {playbackInstanceInfo.state === PlaybackStates.Playing && props.icon.pause}
                        {playbackInstanceInfo.state === PlaybackStates.Paused && props.icon.play}
                        {playbackInstanceInfo.state === PlaybackStates.Ended && props.icon.replay}
                        {((playbackInstanceInfo.state === PlaybackStates.Ended && !props.icon.replay) ||
                        (playbackInstanceInfo.state === PlaybackStates.Playing && !props.icon.pause) ||
                        (playbackInstanceInfo.state === PlaybackStates.Paused &&
                            !props.icon.pause)) && (<MaterialIcons name={playbackInstanceInfo.state === PlaybackStates.Playing
                            ? 'pause'
                            : playbackInstanceInfo.state === PlaybackStates.Paused
                            ? 'play-arrow'
                            : 'replay'} style={props.icon.style} size={props.icon.size/1.3} color={props.icon.color}/>)}
                        </View>
                </TouchableButton> 
            </View>
            <View style={[{marginLeft:15,width:'30%',alignSelf: 'flex-end'}]}>
                <TouchableButton   onPress={()=>fastForward(10)}>
                    <View style={{ height:'100%', width:'100%',alignItems: 'center',justifyContent: 'center'}}>
                        {playbackInstanceInfo.state !== PlaybackStates.Ended?(
                                <MaterialIcons name="replay-10" style={props.icon.style} size={props.icon.size/1.3} color={props.icon.color}/>
                        ):(null)}
                        
                    </View>
                </TouchableButton>
            </View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>

      <Animated.View style={[
            styles.bottomInfoWrapper,
            {
                opacity: controlsOpacity,
                marginBottom:10
            },
        ]}>
        {props.timeVisible && (<Text style={[props.textStyle, styles.timeLeft]}>
            {getMinutesSecondsFromMilliseconds(playbackInstanceInfo.position)}
          </Text>)}
        {props.slider.visible && (<Slider {...sliderProps} style={[styles.slider, props.slider.style]} value={playbackInstanceInfo.duration
                ? playbackInstanceInfo.position / playbackInstanceInfo.duration
                : 0} onSlidingStart={() => {
                if (playbackInstanceInfo.state === PlaybackStates.Playing) {
                    togglePlay();
                    setPlaybackInstanceInfo(Object.assign(Object.assign({}, playbackInstanceInfo), { state: PlaybackStates.Paused }));
                }
            }} onSlidingComplete={(e) => __awaiter(void 0, void 0, void 0, function* () {
                const position = e * playbackInstanceInfo.duration;
                if (playbackInstance) {
                    yield playbackInstance.setStatusAsync({
                        positionMillis: position,
                        shouldPlay: true,
                    });
                }
                setPlaybackInstanceInfo(Object.assign(Object.assign({}, playbackInstanceInfo), { position }));
            })}/>)}
        {props.timeVisible && (<Text style={[props.textStyle, styles.timeRight]}>
            {getMinutesSecondsFromMilliseconds(playbackInstanceInfo.duration)}
          </Text>)}
           {/* palyback speed controls */}
        {props.fullscreen.visible && (<TouchableButton onPress={() => {props.customFunction.toggleChatWindow(!props.customFunction.isChatWindowVisible);props.customFunction.toggleVideoSettings(false);props.customFunction.fullscreenScreenConfigChanged()}}>
            <View> 
                {/* <MaterialIcons name={'chat'} style={props.icon.style} size={props.icon.size/1.5} color={props.icon.color}/> */}
                {props.icon.commentIcon}
            </View>
          </TouchableButton>)}
          {props.fullscreen.visible && (<TouchableButton onPress={() => {props.customFunction.toggleVideoSettings(!props.customFunction.isSettingModalVisible);props.customFunction.toggleChatWindow(false);;props.customFunction.fullscreenScreenConfigChanged()}}>
            <View> 
                {/* <MaterialIcons name={'slow-motion-video'} style={props.icon.style} size={props.icon.size/1.5} color={props.icon.color} ref={props.icon.playbackApi.ref}/> */}
                {props.icon.settingsIcon}
            </View>
          </TouchableButton>)}
          {/* enter exit full screen */}
           {props.fullscreen.visible && (<TouchableButton onPress={() => props.fullscreen.inFullscreen
                ? props.fullscreen.exitFullscreen()
                : props.fullscreen.enterFullscreen()}>
            <View>
              {props.icon.fullscreen}
              {props.icon.exitFullscreen}
              {((!props.icon.fullscreen && props.fullscreen.inFullscreen) ||
                (!props.icon.exitFullscreen && !props.fullscreen.inFullscreen)) && (<MaterialIcons name={props.fullscreen.inFullscreen ? 'fullscreen-exit' : 'fullscreen'} style={props.icon.style} size={props.icon.size / 1.4} color={props.icon.color}/>)}
            </View>
          </TouchableButton>)}
      </Animated.View>
    </View>);
};
VideoPlayer.defaultProps = defaultProps;
export default VideoPlayer;
