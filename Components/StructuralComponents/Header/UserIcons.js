import React, { useRef } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Assets, imageProvider } from '../../config';

function UserIcon({userIcon}) {

    const userImageRef = useRef()
    const user = useSelector(state=>state.user.userInfo)

  return (
    <TouchableOpacity
    style={{ marginLeft: 15,marginRight:0 }}
    onPress={userIcon}
    >
        <Image
            ref={(ref)=>userImageRef.current=ref}
            source={{uri:imageProvider(user.studentImage)}}
            style={{height: 25,width:25,backgroundColor:"white",borderRadius:13}}
            onError={(props)=>{
            if(userImageRef.current)
            {
                userImageRef.current.setNativeProps({
                // source: [Assets.profile.profileIcon],
                src:[Image.resolveAssetSource(Assets.profile.profileIcon)],
                })
            }
            }}
        />
    </TouchableOpacity>
  );
}

export default UserIcon;
