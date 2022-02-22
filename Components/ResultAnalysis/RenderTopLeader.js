import React, { useRef } from 'react';
import { View,Text,Image } from 'react-native';
import { Assets, imageProvider } from '../config';
 function RenderTopLeader({item}) {
    const imageRef  = useRef(null)
  return (
      
    <View style={{flexDirection: 'row',margin:5}}>
        <Text style={{fontSize: 22, fontFamily: 'Raleway_700Bold'}}>{item?.rank}</Text>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <View>
                <Image ref={imageRef} source={{uri:imageProvider(item?.studentImage)}} 
                onError={(props)=>{
                    // console.log("i,age rrrorrrr")
                    if(imageRef.current)
                    {
                    imageRef.current.setNativeProps({
                        // source: [Assets.profile.profileIcon],
                        src:[Image.resolveAssetSource(Assets.profile.profileIcon)],
                    })
                    }
                }}    
                style={{height: 70, width: 70,borderRadius:35}}/>
            </View>
            <Text style={{fontFamily: 'Raleway_600SemiBold'}}>{item?.name}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{fontSize: 12, fontFamily: 'Raleway_400Regular'}}>Score: </Text>
                <Text style={{fontSize: 12, fontFamily: 'Raleway_600SemiBold'}}>{item?.score}</Text>
            </View>
        </View>
    </View>
  );
}

export default RenderTopLeader;
