import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { Modal, Text, TouchableWithoutFeedback, View } from 'react-native'
import { theme } from '../config'

function VideoSettingModal({orientation,isVisible,closeModal,qualityValue,setQualityValue,playbackSpeedValue,setPlaybackSpeedValue,isSideScreenVisible}) {

    const renderButton =(value,activeValue,label,fun)=>
    {
        const isActive = value==activeValue
        return (
            <TouchableWithoutFeedback onPress={fun}>
                <View style={[{width:80,alignItems: 'center',justifyContent: 'center',paddingVertical:5,borderRadius:5,marginHorizontal:5},isActive?{borderColor: theme.secondaryColor,backgroundColor: theme.secondaryColor,borderWidth: 1}:{borderColor: theme.labelOrInactiveColor,backgroundColor: theme.primaryColor,borderWidth: 1}]}>
                    <Text style={[{fontSize:16,fontFamily: 'Raleway_600SemiBold'},isActive?{color:theme.primaryColor}:{color: theme.secondaryColor}]}>{label}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    return (
        // <Modal
        //     visible={isVisible}
        //     onRequestClose={closeModal}
        //     transparent={false}
        // >
        // <ScrollView>
                <View style={{backgroundColor:theme.primaryColor}}>
                    <View style={{flexDirection: 'row',marginTop:10,alignItems: 'center'}}> 
                        <Entypo name="cross" size={30} color={theme.greyColor} onPress={closeModal}/>
                        <Text style={{fontSize:20,marginLeft:10,fontFamily: 'Raleway_600SemiBold',color: theme.secondaryColor}}>Video Settings</Text>
                    </View>
                    <View style={{margin:10,justifyContent: 'center',display: 'flex'}}>
                        <View style={{marginTop:20}}>  
                            <Text style={{fontSize:16,marginVertical:15,fontFamily: 'Raleway_600SemiBold',color: theme.greyColor}}>EDUCATOR VIDEO QUALITY</Text>
                            <View style={{flexDirection:'row'}}>
                                {renderButton('Low',qualityValue,'Low',()=>{setQualityValue('Low')})}
                                {renderButton('Medium',qualityValue,'Medium',()=>{setQualityValue('Medium')})}
                                {renderButton('High',qualityValue,'High',()=>{setQualityValue('High')})}
                            </View>
                        </View>
                        <View style={{marginTop:20}}>  
                            <Text style={{fontSize:16,marginVertical:10,fontFamily: 'Raleway_600SemiBold',color: theme.greyColor}}>PLAYBACK SPEED</Text>

                            <View style={{flexDirection:'row'}}>
                                {renderButton(0.75,playbackSpeedValue,'0.75x',()=>{setPlaybackSpeedValue(0.75)})}
                                {renderButton(1.00,playbackSpeedValue,'1x',()=>{setPlaybackSpeedValue(1)})}
                                {renderButton(1.25,playbackSpeedValue,'1.25x',()=>{setPlaybackSpeedValue(1.25)})} 
                            </View>
                            <View style={{flexDirection:'row',marginTop:10}}>
                                {renderButton(1.5,playbackSpeedValue,'1.5x',()=>{setPlaybackSpeedValue(1.5)})}
                                {renderButton(1.75,playbackSpeedValue,'1.75x',()=>{setPlaybackSpeedValue(1.75)})}
                                {renderButton(2,playbackSpeedValue,'2x',()=>{setPlaybackSpeedValue(2)})} 
                            </View>
                        </View> 
                    </View>
                </View> 
            // </ScrollView>
        // {/* </Modal> */}
    )
}

export default VideoSettingModal
