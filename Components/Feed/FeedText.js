import React, { Component } from 'react';
import { View, Text,StyleSheet,FlatList,Image,findNodeHandle,UIManager, TouchableOpacity } from 'react-native';
import {EvilIcons, AntDesign, FontAwesome} from '@expo/vector-icons';
import {imageProvider, serverBaseUrl, theme} from '../config';
import CardView from '../Utils/CardView'
import { connect } from 'react-redux'
import {like_feed, unLike_feed} from "../Utils/DataHelper/Feed"
import FeedBottomComponent from './FeedBottomComponent'
import FeedHeader from './FeedHeader'
import moment from 'moment'
class FeedText extends Component {
  state = {
    canUserLike:this.props.type==1?(this.props.item.feed.feed.feedLikerIns&&this.props.item.feed.feed.feedLikerIns.includes(`,${this.props.institute.details.id},`)?(false):(true)):(this.props.type==2?(this.props.item.feed.feed.feedLikerStudent&&this.props.item.feed.feed.feedLikerStudent.includes(`,${this.props.userInfo.id},`)?(false):(true)):(true)),

    likes: this.props.item.feed.feed.likes,
  }
  showThreeMenu=()=>
  {
       
          UIManager.showPopupMenu(
              findNodeHandle(this.state.icon),
              ["Edit"],
              this.onError,
              this.onPopupEvent
          )
      
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
    onRef = icon => {
        if (!this.state.icon) {
          this.setState({icon})
        }
      }
    
editFeedPressHandler=()=>this.props.mode=="userProfile"||this.props.mode=="insProfile"?(this.props.updateEditFeedState(this.props.item.feed.feed.feedType, this.props.item.feed.feed.description, null, null, this.props.item.feed.feed.id, this.props.index,this.props.item.feed.feed.creationTime)):(null)

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

    
  render() {
      
    const{feed,posterObject} = this.props.item
    return(
        // CardView(
            <View style={{flexDirection: 'column', padding: 5}}>
                <View style={styles.boxView}>
                    <FeedHeader actions={this.props.actions} navigation={this.props.navigation} feed={feed} editFeedPressHandler={this.editFeedPressHandler} posterObject={posterObject} postedBy={feed.feed.postedBy} creationTime={feed.feed.creationTime} mode={this.props.mode}/>
                    <View onPress={()=>this.props.navigation.navigate("RenderSingleFeed",{id: feed.feed.id})} style={styles.innerBoxView}> 
                        <Text style={{fontFamily:'Raleway_400Regular', marginVertical: 10,fontSize:17}}>{feed.feed.description}</Text>
                        <FeedBottomComponent canUserLike={this.state.canUserLike} feedId={feed.feed.id} likeFeed={this.likeFeed} navigation={this.props.navigation} changeCanUserLike={this.changeCanUserLike} unLikeFeed={this.unLikeFeed} likes={this.state.likes} comments={feed.feed.commentCount} mode={this.props.mode}/>
                    </View>
                </View>
                <View style={{borderTopWidth: 4, borderColor: theme.labelOrInactiveColor, marginVertical: 10, width: '100%'}}/>
            </View>
            // ,{width: '100%', padding: 6, marginBottom: 10}
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
                        fontFamily: 'Raleway_600SemiBold'
                        // color: theme.labelOrInactiveColor, 
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
export default connect(mapStateToProps)(FeedText);

