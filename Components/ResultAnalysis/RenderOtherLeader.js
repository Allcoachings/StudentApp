import React, { useRef } from 'react';
import { View,Text,Image } from 'react-native';
import { Assets, imageProvider } from '../config';
 function RenderOtherLeader({item}) {
    const imageRef  = useRef(null)
  return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <View style={{borderRadius: 50, borderWidth: 1, marginRight: 5}}>
                        <Image 
                        ref={imageRef}
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
                        source={{uri:imageProvider(item.studentImage)}} style={{height: 26, width: 26,borderRadius:13}}/>
                    </View>
                    <Text style={{fontSize: 14, fontFamily: 'Raleway_700Bold'}}>{item.name}</Text>
                </View>
                <Text style={{fontSize: 14, fontFamily: 'Raleway_700Bold'}}>Score {item.score}</Text>
                <Text style={{fontSize: 14, fontFamily: 'Raleway_700Bold'}}>#{item.rank}</Text>
            </View>
    
  );
}

export default RenderOtherLeader;
