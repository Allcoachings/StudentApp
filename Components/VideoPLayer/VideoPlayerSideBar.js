import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {  Dimensions, Image, TouchableWithoutFeedback, View } from 'react-native'
import { Assets, theme } from '../config'

function VideoPlayerSideBar({setIsSettingModalVisible,setIsSideScreenVisible,setIsCommentsVisible,setSideTabsVisible,setIsScreenConfigChanged,height}) {


    const [activeIcon,setActiveIcon,] = useState()


    const iconPressHandler = (iconFun,value)=>
    {
        iconFun()
        setActiveIcon(value)
        setIsSideScreenVisible(true)
    }
    const renderIconBtn=(icon,value,fun)=>
    {
        const isActive = value==activeIcon
            return (
                <TouchableWithoutFeedback onPress={()=>iconPressHandler(fun,value)}>
                    <View style={[{padding: 5,marginVertical:10},isActive ?{borderLeftWidth:1,borderLeftColor:theme.greyColor}:{}]}>
                       {icon}
                    </View>
                </TouchableWithoutFeedback>
            )
    }
    return (
         <View style={{alignItems: 'center',justifyContent: 'center',height,backgroundColor:theme.primaryColor}}>
             <View style={{marginVertical:'auto'}}>
                {renderIconBtn(<Image source={Assets.video.chat} style={{ width:20 ,height:20}} />,'comments',()=>{setIsCommentsVisible(true);setIsSettingModalVisible(false)})} 
                {renderIconBtn(<Image source={Assets.video.settings} style={{ width:20 ,height:20}}/>,'video',()=>{setIsSettingModalVisible(true);setIsCommentsVisible(false)})} 
                {/* {renderIconBtn('user','comments',()=>{})} 
                {renderIconBtn('user','comments',()=>{})}  */}
             </View>
             {/* <View style={{marginTop:'auto'}}>
                {renderIconBtn(<Image source={Assets.video.settings} style={{ width:20 ,height:20}}/>,'video',()=>{setIsSettingModalVisible(false);setIsCommentsVisible(false);setSideTabsVisible(false);setIsSideScreenVisible(false);setIsScreenConfigChanged(true)})} 
             </View> */}
         </View>
    )
}

export default VideoPlayerSideBar
