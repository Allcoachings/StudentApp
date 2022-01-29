import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pinnedInstituteList } from './Utils/DataHelper/Subscription';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_PINNED_INSTITUTE } from './Actions/types';
function BasicDataFetch() {

    const userInfo = useSelector(state=>state.user.userInfo)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        if(userInfo.id)
        {
            pinnedInstituteList(userInfo.id,0,10,(response)=>{
                if(response.status)
                {
                    response.json().then(data=>{ 
                        // // console.log(data,"done ",userInfo.id)
                        dispatch({type:SET_PINNED_INSTITUTE,payload:{data}})
                    })
                }
                setLoading(false)
            })
        }
       
    },[userInfo])
  return <></>;
}

export default BasicDataFetch;
