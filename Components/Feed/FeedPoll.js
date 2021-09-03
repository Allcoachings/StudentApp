import React, { Component } from 'react';
import { View, Text,StyleSheet,FlatList,Image,findNodeHandle,UIManager, TouchableOpacity } from 'react-native';
import {Feather, AntDesign, FontAwesome} from '@expo/vector-icons';
import CardView from '../Utils/CardView'; 
import {imageProvider, serverBaseUrl, theme} from '../config';
import RenderPollOption from './RenderPollOption'
import {like_feed, unLike_feed} from "../Utils/DataHelper/Feed"
import moment from 'moment' 
import { connect } from 'react-redux'
import FeedBottomComponent from './FeedBottomComponent'

class FeedPoll extends Component {
    state = {
        canUserVote: this.props.type==1?(this.props.item.feed.feed.pollVotedInstitutes.includes(`,${this.props.institute.details.id},`)?(false):(true)):(this.props.type==2?(this.props.item.feed.feed.pollVotedStudents.includes(`,${this.props.userInfo.id},`)?(false):(true)):(true)),

        optionData: this.props.item.feed.feedPollOptions,
        focusedOptionIndex:-1,
        totalPollVotes: this.props.item.feed.feed.totalPollVotes,
        canUserLike:this.props.type==1?(this.props.item.feed.feed.feedLikerIns&&this.props.item.feed.feed.feedLikerIns.includes(`,${this.props.institute.details.id},`)?(false):(true)):(this.props.type==2?(this.props.item.feed.feed.feedLikerStudent&&this.props.item.feed.feed.feedLikerStudent.includes(`,${this.props.userInfo.id},`)?(false):(true)):(true)),
    }
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
        console.log("like feed")
        this.setState({canUserLike: !this.state.canUserLike},()=>{
            like_feed(feedId,this.props.type,this.props.type==1?(this.props.institute.details.id):(this.props.userInfo.id),this.likeFeedCallBack)
        })
    }

    likeFeedCallBack=(response)=>{
        if(response.status==200)
        {
            console.log("ok")
        }
        else{
            console.log("failed")
        }
    }
    unLikeFeedCallBack=(response)=>{
        if(response.status==200)
        {
            console.log("ok")
        }
        else{
            console.log("failed")
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
    editFeedPressHandler =()=>this.props.mode=="userProfile"||this.props.mode=="insProfile"?(this.props.updateEditFeedState(feed.feed.feedType, feed.feed.pollQuestion, null, this.state.optionData, feed.feed.id, this.props.index)):(null)
    render() {
    console.log("this.state.canUserLike", this.state.optionData)
    const{feed,posterObject} = this.props.item 
    if(!posterObject)
    {
        console.log(this.props.item)
    }
    return(
        // CardView(
            <View style={{flexDirection: 'column', padding: 5}}>
                <View style={styles.boxView}> 
                    <View style={styles.rowView}>
                        <Image source={{ uri: feed.feed.postedBy==2?(imageProvider(posterObject.studentImage)):(imageProvider(posterObject.logo))}} style={styles.circleView}/>  
                        <View style={{width: '78%'}}>
                            <Text style={styles.coaching}>{posterObject.name}</Text> 
                            <Text style={styles.timeDateText}>{moment(feed.feed.creationTime).fromNow()}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.showThreeMenu()}>
                            <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}} ref={this.onRef}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.innerBoxView}>
                        
                        <Text style={{ fontFamily:'Raleway_400Regular',marginTop: 10,}}>{feed.feed.pollQuestion}</Text>
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

                        <FeedBottomComponent canUserLike={this.state.canUserLike} feedId={feed.feed.id} likeFeed={this.likeFeed} navigation={this.props.navigation} changeCanUserLike={this.changeCanUserLike} unLikeFeed={this.unLikeFeed}/>
                    </View>
                </View>
                <View style={{borderTopWidth: 0.8, borderColor: theme.labelOrInactiveColor, marginVertical: 10, width: '100%'}}/>
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
