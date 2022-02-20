import React,{useState,useEffect} from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Assets, dataLimit } from '../config'
import FeedImage from '../Feed/FeedImage'
import FeedPoll from '../Feed/FeedPoll'
import FeedText from '../Feed/FeedText'
import AddFeedModal from '../InsHome/AddFeedModal'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator'
import EmptyList from '../Utils/EmptyList'

import {fetch_student_feed} from "../Utils/DataHelper/Feed"
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'

function UserCommunityPosts({navigation}) {
    
    const userInfo = useSelector(state=>state.user.userInfo)
    const [feeds,setFeeds] = useState([])
    const [isFeedLoading,setIsFeedLoading] = useState(true)
    const [isAddFeedModalVisible,setIsAddFeedModalVisible] = useState(false)
    const [categoryId,setCategoryId] = useState(null)
    const [loadingData,setLoadingData] = useState(false)
    const [offset,setOffset] = useState(0)
    const [loadingFooter,setLoadingFooter] = useState(false)
    const checkForUserCat=()=>
    {
        AsyncStorage.getItem("userCat").then((response)=>{
            // console.log(response)
             if(response)
             {
                 // console.log(response)
                 let obj = JSON.parse(response);
                //  this.setState({categoryId:obj.id}) 

                 setCategoryId(obj.id)
             }else
             {
                setCategoryId(null) 
             }
        })
    }
    const renderFeedItem=(item, index)=>
    {
        
        switch(item.feed.feed.feedType)
        {
            case 1:
                return (
                    <FeedImage item={item} type={2} navigation={navigation} mode="userProfile" updateEditFeedState={updateEditFeedState} index={index}/>
                )
            case 2:
           

                return (
                    <FeedPoll item={item} type={2} navigation={navigation} mode="userProfile" updateEditFeedState={updateEditFeedState} index={index}/>
                )
            case 3:
                return (
                    <FeedText item={item} type={2} navigation={navigation} mode="userProfile" updateEditFeedState={updateEditFeedState} index={index}/>
                )
        }
    }

    const  updateSingleFeed=(item, index)=>{
        var obj=[...feeds] 
        obj[index]=item; 
        setFeeds(obj)
    }
    const appendFeed=(feed)=>{
        let feeds_arr =[...feeds]
        feeds_arr.unshift(feed)
        setFeeds(feeds_arr)
    }
   const closeAddFeedModal = ()=>{
        setIsAddFeedModalVisible(false)
    }

    let updateEditFeedState=()=>{}

    const setUpdateEditFeedState=(ref)=>{
        updateEditFeedState=ref;
    }

    useEffect(()=>{ 
        
        fetch_student_feed(userInfo.id,offset,dataLimit, fetchFeedCallback)
    },[offset])
    
    const fetchFeedCallback=(response)=>{
        
        if(response.status==200)
        {
            response.json().then(data=>
            {
                setLoadingFooter(false)
                 
                setFeeds([...feeds,...data])
                setIsFeedLoading(false)
            })
        }
        else
        {
            // console.log("something went wrong")
        }
    }
    useEffect(()=>{
        
        checkForUserCat()
    },[])
    const  renderFooter = () => {
        try {
       
          if (loadingFooter) {
            return <CustomActivtiyIndicator mode="skimmer"/>;
          } else {
            return null;
          }
        } catch (error) {
          // console.log(error);
        }
    };
    return (
        <PageStructure
            iconName={"arrow-left"}
            btnHandler={() => {navigation.goBack()}}
            titleonheader={"Community"}
            nosearchIcon={true}
            noNotificationIcon={true}
            navigation={navigation}
        >
        <View style={styles.container}>
                    {/* <TouchableOpacity  onPress={()=>this.openAddFeedModal()} style={{backgroundColor: theme.textColor, justifyContent: 'center', alignItems: 'center', padding:5, borderRadius:5}}> 
                        <Text style={{color: theme.primaryColor}}>Add Feed</Text>
                    </TouchableOpacity>            */}
                    <View style={{height: 110}}>
                        <AddFeedModal
                                addFeedCallBack={appendFeed}
                                isAddFeedModalVisible={isAddFeedModalVisible} 
                                closeModal={closeAddFeedModal}
                                posterId={userInfo.id} 
                                posterImage={userInfo.studentImage}
                                postedBy={2}
                                categoryId={categoryId}
                                instituteDetails={userInfo}
                                setUpdateFun={setUpdateEditFeedState}
                                updateSingleFeed={updateSingleFeed}
                        />
                    </View>
                    {isFeedLoading?(
                            <CustomActivtiyIndicator mode="skimmer"/>
                    ):(
                        <FlatList
                            data={feeds}
                            renderItem={({item, index}) => renderFeedItem(item, index)}
                            keyExtractor={(item,index)=>index} 
                            ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={renderFooter}
                            onEndReached={() => 
                                {
                                    
                                    setLoadingFooter(true)
                                     setOffset(parseInt(offset)+1)
                                     
                                
                                }}
                        />
                    )}
                </View>
        </PageStructure>
    )
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        flexDirection: 'column',
        
    },
    

})
export default UserCommunityPosts
