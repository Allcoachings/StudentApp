import React, { Component } from 'react';
import { View, Text,StyleSheet,FlatList,Image,findNodeHandle,UIManager, TouchableOpacity } from 'react-native';
import {Feather, AntDesign, FontAwesome} from '@expo/vector-icons';
import {imageProvider, serverBaseUrl, theme} from '../config';
import CardView from '../Utils/CardView'
import { connect } from 'react-redux'
import {like_feed, unLike_feed} from "../Utils/DataHelper/Feed"
import FeedBottomComponent from './FeedBottomComponent'
import moment from 'moment'
class FeedText extends Component {
  state = {
    // canUserLike: this.props.type==1?(this.props.item.feed.feed.feedLikerIns.includes(`,${this.props.institute.details.id},`)?(false):(true)):(this.props.type==2?(this.props.item.feed.feed.feedLikerStudent.includes(`,${this.props.userInfo.id},`)?(false):(true)):(true)),
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
    onRef = icon => {
        if (!this.state.icon) {
          this.setState({icon})
        }
      }
    
editFeedPressHandler=()=>this.props.mode=="userProfile"||this.props.mode=="insProfile"?(this.props.updateEditFeedState(feed.feed.feedType, feed.feed.description, null, null, feed.feed.id, this.props.index)):(null)

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

    
  render() {
    const{feed,posterObject} = this.props.item
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
                         
                        <Text style={{fontFamily:'Raleway_400Regular', marginVertical: 10,fontSize:17}}>{feed.feed.description}</Text>
                        <FeedBottomComponent canUserLike={this.state.canUserLike} feedId={feed.feed.id} likeFeed={this.likeFeed} navigation={this.props.navigation} changeCanUserLike={this.changeCanUserLike} unLikeFeed={this.unLikeFeed}/>
                    </View>
                </View>
                <View style={{borderTopWidth: 0.8, borderColor: theme.labelOrInactiveColor, marginVertical: 10, width: '100%'}}/>
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

