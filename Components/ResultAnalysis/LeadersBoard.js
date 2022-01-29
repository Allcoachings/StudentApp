import React, { useEffect, useRef, useState } from 'react';
import { Text,View,StyleSheet,Dimensions,TouchableOpacity,FlatList,BackHandler, Image,Platform, ScrollView, TouchableWithoutFeedback} from 'react-native';
import { theme, Assets, appLogo, imageProvider } from '../config';
import { EvilIcons } from '@expo/vector-icons';
import CardView from '../Utils/CardView';
import { getTestSeriesStudentResponse } from '../Utils/DataHelper/TestSeriesResponse';
import RenderTopLeader from './RenderTopLeader';
import RenderOtherLeader from './RenderOtherLeader';
const width = Dimensions.get('window').width
let backhandler;
const LeadersBoard = ({testId})=> {
    const [offset,setOffset] = useState(0)
    const fetchRankListLimit  = 10
    const [leaderBoard,setLeaderBoard] = useState([])
    
    const imageRef = useRef(null)
    useEffect(()=>{
        getTestSeriesStudentResponse(testId,offset,fetchRankListLimit,(response)=>{
            if(response.status==200)
            {
                // console.log(response.status)
                response.json().then((data)=>{
                    setLeaderBoard(data)
                    // console.log(data)
                })
            }
        })
    },[testId])

    const renderTopLeader=(item)=>{
        return(
           <RenderTopLeader item={item}/>
        )
    }

    const renderOtherLeaders=(item)=>{
        return(
            <RenderOtherLeader item={item}/>
        )
    }

     
        return(
            <View style={{marginVertical: 15, flexDirection: 'column'}}>
                <View style={{flexDirection: 'row',backgroundColor:theme.labelOrInactiveColor+'4D',margin:10,padding:20,borderRadius:5}}>
                {/* <View style={{ flexDirection: 'row'}}> */}
                    <Image source={appLogo} style={{height: 30, width: 30}}/>
                    <Text style={{fontSize: 22, fontFamily: 'Raleway_700Bold', marginLeft: 10}}>Leader Board</Text>
                {/* </View> */}
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 15}}>
                    {leaderBoard[0]&&renderTopLeader({name:leaderBoard[0]?.student?.name,studentImage:leaderBoard[0]?.student?.studentImage,rank:leaderBoard[0]?.responseBrief?.rank,score:leaderBoard[0]?.responseBrief?.score})}
                    {leaderBoard[1]&&renderTopLeader({name:leaderBoard[1]?.student?.name,studentImage:leaderBoard[1]?.student?.studentImage,rank:leaderBoard[1]?.responseBrief?.rank,score:leaderBoard[1]?.responseBrief?.score})}
                    {
                    leaderBoard[2]&&renderTopLeader({name:leaderBoard[2]?.student?.name,studentImage:leaderBoard[2]?.student?.studentImage,rank:leaderBoard[2]?.responseBrief?.rank,score:leaderBoard[2]?.responseBrief?.score})
                    }
                     
                </View>
                {leaderBoard.map((item,index) =>{

                    if(index <2)
                    {
                        return
                    }
                    renderOtherLeaders({name:item.student?.name,studentImage:item.student?.studentImage,rank:item.responseBrief?.rank,score:item.responseBrief?.score})
                })}
               
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10}}>
                    <TouchableOpacity style={{backgroundColor: theme.violetColor, paddingVertical: 2, paddingHorizontal:10, borderRadius: 5}}>
                        <Text style={{color: theme.primaryColor}}>See All</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    
}
export default LeadersBoard