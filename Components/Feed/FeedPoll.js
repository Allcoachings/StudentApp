import React, { Component } from 'react';
import { View, Text,StyleSheet,FlatList,Image,Dimensions,findNodeHandle,UIManager, TouchableOpacity } from 'react-native';
import {EvilIconsnsnsnsns, AntDesign, FontAwesome} from '@expo/vector-icons';
import CardView from '../Utils/CardView'; 
import {imageProvider, serverBaseUrl, theme} from '../config';
import RenderPollOption from './RenderPollOption'
import {like_feed, unLike_feed} from "../Utils/DataHelper/Feed"
import moment from 'moment' 
import { connect } from 'react-redux'
import FeedBottomComponent from './FeedBottomComponent'
import FeedHeader from './FeedHeader'

import RenderHTML,{defaultSystemFonts} from 'react-native-render-html';

const width = Dimensions.get('window').width
const systemFonts = ["kruti_dev_010regular", "chanakyaregular","walkman_chanakya_901bold","walkman_chanakya_902bold","kruti_dev_010bold", ...defaultSystemFonts];
class FeedPoll extends Component {
    state = {
        canUserVote: this.props.type==1?(this.props.item.feed.feed.pollVotedInstitutes.includes(`,${this.props.institute.details.id},`)?(false):(true)):(this.props.type==2?(this.props.item.feed.feed.pollVotedStudents.includes(`,${this.props.userInfo.id},`)?(false):(true)):(true)),

        optionData: this.props.item.feed.feedPollOptions,
        focusedOptionIndex:-1,
        totalPollVotes: this.props.item.feed.feed.totalPollVotes,
        canUserLike:this.props.type==1?(this.props.item.feed.feed.feedLikerIns&&this.props.item.feed.feed.feedLikerIns.includes(`,${this.props.institute.details.id},`)?(false):(true)):(this.props.type==2?(this.props.item.feed.feed.feedLikerStudent&&this.props.item.feed.feed.feedLikerStudent.includes(`,${this.props.userInfo.id},`)?(false):(true)):(true)),

        likes: this.props.item.feed.feed.likes,
    }
    componentDidUpdate = (prevProps, prevState) => {
      
    //   let cond = JSON.stringify(this.props.item.feed.feedPollOptions) != JSON.stringify(this.state.optionData) 
    //   // console.log("after after after after",cond);
    //   if(cond)
    //   {
    //         this.setState({optionData:this.props.item.feed.feedPollOptions})
    //   }else
    //   {
    //       // console.log(this.props.item.feed.feedPollOptions,"state",this.state.optionData)
    //   }
    };
    
    setFocusedOptionIndex=(focusedOptionIndex)=>
    {
        this.setState({focusedOptionIndex})
    }
    updateVote=(option_id)=>
    {
        let optionData = this.props.item.feed.feedPollOptions.map((item)=>{
            if(item.id==option_id)
            {
                return {...item,upVotes:parseInt(item.upVotes)+1}
            }
            else
            {
                return item
            }
        })
        this.setState({totalPollVotes:parseInt(this.state.totalPollVotes)+1,optionData,canUserVote:false})
    }

    likeFeed=(feedId)=>{
        // console.log("like feed")
        this.setState({canUserLike: !this.state.canUserLike},()=>{
            like_feed(feedId,this.props.type,this.props.type==1?(this.props.institute.details.id):(this.props.userInfo.id),this.likeFeedCallBack)
        })
    }

    likeFeedCallBack=(response)=>{
        if(response.status==200)
        {
            this.setState({likes: parseInt(this.state.likes)+1})
        }
        else{
            // console.log("failed")
        }
    }
    unLikeFeedCallBack=(response)=>{
        if(response.status==200)
        {
            this.setState({likes: this.state.likes-1})
        }
        else{
            // console.log("failed")
        }
    }

    unLikeFeed=(feedId)=>{
        this.setState({canUserLike: !this.state.canUserLike},()=>{
            unLike_feed(feedId,this.props.type,this.props.type==1?(this.props.institute.details.id):(this.props.userInfo.id),this.unLikeFeedCallBack)
        })
    }

    showThreeMenu=()=>
    {
         
            UIManager.showPopupMenu(
                findNodeHandle(this.state.icon),
                ["action","edit"],
                this.onError,
                this.onPopupEvent
            )
        
    }
    onRef = icon => {
        if (!this.state.icon) {
          this.setState({icon})
        }
      }
    onPopupEvent = (eventName, index) => {

        if (eventName !== 'itemSelected') return 
      switch (index)
      {
          case 0:
                    this.editFeedPressHandler()
              break;
          case 1: 

            break;
      }
    }
    editFeedPressHandler =()=>this.props.mode=="userProfile"||this.props.mode=="insProfile"?(this.props.updateEditFeedState({...this.props.item,index:this.props.index})):(null)
    render() {
    // // console.log("this.state.canUserLike", this.state.optionData)
    const{feed,posterObject} = this.props.item 
    // if(!posterObject)
    // {
    //     // console.log(this.props.item)
    // }
  
    return(
        // CardView(
            <View style={{flexDirection: 'column', padding: 5}}>
                <View style={styles.boxView}> 
                    <FeedHeader  removeFeedFromState={this.props.removeFeedFromState} index={this.props.index} actions={this.props.actions} navigation={this.props.navigation} feed={feed}  mode={this.props.mode} editFeedPressHandler={this.editFeedPressHandler} posterObject={posterObject} postedBy={feed.feed.postedBy} creationTime={feed.feed.creationTime}/>
                    <View onPress={()=>this.props.navigation.navigate("RenderSingleFeed",{id: feed.feed.id})} style={styles.innerBoxView}>
                        
                        {/* <Text style={{fontFamily:'Raleway_400Regular', marginVertical: 10,fontSize:17}}>{feed.feed.pollQuestion}</Text> */}
                        <RenderHTML
                            contentWidth={width}
                            systemFonts={systemFonts}
                            defaultTextProps={{style: {fontWeight: 'normal', marginVertical: 10,fontSize:17}}}
                            source={{html:feed.feed.pollQuestion}}
                        />
                        <FlatList
                            data={this.state.optionData}
                            renderItem={({item,index})=><RenderPollOption setFocusedOptionIndex={this.setFocusedOptionIndex} focusedOptionIndex={this.state.focusedOptionIndex} updateVote={this.updateVote} item={item} canUserVote={this.state.canUserVote} totalVote={this.state.totalPollVotes} userType={this.props.type} index={index}/>}
                            keyExtractor={(item)=>item.id}
                            
                        />
                        {/* <View Style={{display: 'flex', flexDirection: 'column'}}>
                            <Text style={{fontSize: 16, marginTop: 3}}>Pacific Ocean</Text>
                            <Text style={{fontSize: 16, marginTop: 3}}>Atlantic Ocean</Text>
                            <Text style={{fontSize: 16, marginTop: 3}}>Indian Ocean</Text>
                            <Text style={{fontSize: 16, marginTop: 3}}>Arctic Ocean</Text>
                        </View> */}

                        <FeedBottomComponent canUserLike={this.state.canUserLike} feedId={feed.feed.id} likeFeed={this.likeFeed} navigation={this.props.navigation} changeCanUserLike={this.changeCanUserLike} unLikeFeed={this.unLikeFeed} likes={this.state.likes} comments={feed.feed.commentCount} mode={this.props.mode}/>
                    </View>
                </View>
                <View style={{borderTopWidth: 4, borderColor: theme.labelOrInactiveColor, marginVertical: 10, width: '100%'}}/>
            </View>
        //     ,{width: '100%', padding: 6, marginBottom: 10}
        // )
    )
  }
}
const styles = StyleSheet.create({
    boxView:
    {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        borderColor: theme.labelOrInactiveColor,
        // padding: 2
    },
        rowView:
        {
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10
        },
            circleView:
            {
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor:theme.secondaryColor
                 
            },
            coaching:
            {
                fontSize: 15,
                marginLeft:10, 
                fontFamily: 'Raleway_600SemiBold',
                width:'78%',
                color: theme.secondaryColor
            },
                timeDateText:
                {
                    fontSize: 13,
                    marginLeft:10,
                    color: theme.greyColor
                },
        innerBoxView:
        {
            flex: 0.85,
            flexDirection: 'column',
            borderColor: theme.labelOrInactiveColor,
            borderRadius: 2,
            // marginTop: 10,
            padding: 5,
        },
            img:
            {
                height: 150,
                width: '100%',
            },
            bottomRowContainer:
            {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10
            },
                likeView:
                {
                    // marginRight: 15
                },
                    text:
                    {
                        fontSize: 18,
                        color: theme.labelOrInactiveColor, 
                    },
            // feed wala end
                            
                
});

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth,
        userInfo:state.user.userInfo,
        institute:state.institute
    }
}
export default connect(mapStateToProps)(FeedPoll);
