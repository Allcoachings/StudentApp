import React, { Component } from 'react';
import { View, Text,Image,StyleSheet,findNodeHandle,UIManager, TouchableOpacity } from 'react-native';
import {imageProvider, serverBaseUrl, theme} from '../config';
import {EvilIconsnsnsnsns, AntDesign, FontAwesome} from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import { connect } from 'react-redux'
import {like_feed, unLike_feed} from "../Utils/DataHelper/Feed"
import moment from 'moment'
import { FlatListSlider } from '../Utils/ImageSlider';
import FeedBottomComponent from './FeedBottomComponent'
import FeedHeader from './FeedHeader'
import ImageZoomModal from '../InstituteView/ImageZoomModal'

class FeedImage extends Component {
  state={
    zoomModal: false,
    index: 0,
    imageArr:[],
    type: '',
    likes: this.props.item.feed.feed.likes,
    canUserLike:this.props.type==1?(this.props.item.feed.feed.feedLikerIns&&this.props.item.feed.feed.feedLikerIns.includes(`,${this.props.institute.details.id},`)?(false):(true)):(this.props.type==2?(this.props.item.feed.feed.feedLikerStudent&&this.props.item.feed.feed.feedLikerStudent.includes(`,${this.props.userInfo.id},`)?(false):(true)):(true)),
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
  likeFeed=(feedId)=>{ 
    this.setState({canUserLike: !this.state.canUserLike},()=>{
        like_feed(feedId,this.props.type,this.props.type==1?(this.props.institute.details.id):(this.props.userInfo.id),this.likeFeedCallBack)
    })
}
unLikeFeed=(feedId)=>{
    this.setState({canUserLike: !this.state.canUserLike},()=>{
        unLike_feed(feedId,this.props.type,this.props.type==1?(this.props.institute.details.id):(this.props.userInfo.id),this.unLikeFeedCallBack)
    })
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


likeFeedCallBack=(response)=>{
    if(response.status==200)
    {
        this.setState({likes: parseInt(this.state.likes)+1})
    }
    else{
        // console.log("failed")
    }
}

openZoomModal=() => {
    this.setState({zoomModal: true})
}

closeModal = () => {
  this.setState({ zoomModal: false });
}

addImage=(link, type)=>{
        var arr = this.state.imageArr;
        arr.pop()
        arr.push(link)
        this.setState({ imageArr: arr, type: type },()=>this.openZoomModal());   
}


    editFeedPressHandler=()=>this.props.mode=="userProfile"||this.props.mode=="insProfile"?(this.props.updateEditFeedState(this.props.item.feed.feed.feedType, this.props.item.feed.feed.description, this.props.item.feed.feedImages, null, this.props.item.feed.feed.id, this.props.index,this.props.item.feed.feed.creationTime)):(null)

  render() {
    const{feed,posterObject} = this.props.item 
   
    return(
        // CardView(
            <View style={{flexDirection: 'column', padding: 5}}>
                <View style={styles.boxView}>
                    <FeedHeader actions={this.props.actions} navigation={this.props.navigation} mode={this.props.mode} editFeedPressHandler={this.editFeedPressHandler} posterObject={posterObject} postedBy={feed.feed.postedBy} creationTime={feed.feed.creationTime} feed={feed}/>
                    <View style={styles.innerBoxView} onPress={()=>this.props.navigation.navigate("RenderSingleFeed",{id: feed.feed.id})}>
                        
                        {feed.feed.description?( 
                            <View style={{marginVertical:10}}>
                                <Text style={{fontFamily:'Raleway_400Regular', marginVertical: 10,fontSize:17}}>
                                    {feed.feed.description}
                                </Text>
                                
                            </View>
                        ):(null)}

                        {feed.feedImages.length == 1?(
                            <TouchableOpacity onPress={()=>this.addImage(imageProvider(feed.feedImages[0].feedImage), "normal")}>
                                <Image source={{uri:imageProvider(feed.feedImages[0].feedImage)}} style={styles.img}/>
                            </TouchableOpacity>
                        ):( 
                            <FlatListSlider
                                    data={feed.feedImages}
                                    height={250}
                                    timer={5000}
                                    imageKey="feedImage"
                                    onPress={item => this.setState({imageArr: feed.feedImages, zoomModal: true, index: item, type: "slider"})}
                                    contentContainerStyle={{resizeMode:'cover'}} 
                                    indicatorActiveColor={theme.greyColor}
                                    indicatorInActiveColor={theme.labelOrInactiveColor}
                                    indicatorActiveWidth={5}
                                    animation 
                                    autoscroll={false}
                                    serverBaseUrl={serverBaseUrl}
                                    imageProvider={imageProvider}
                            />
                        )}
                        <FeedBottomComponent canUserLike={this.state.canUserLike} feedId={feed.feed.id} likeFeed={this.likeFeed} navigation={this.props.navigation} changeCanUserLike={this.changeCanUserLike} unLikeFeed={this.unLikeFeed} likes={this.state.likes} comments={feed.feed.commentCount} mode={this.props.mode}/>
                                                
                    </View>
                    
                </View>
                <View style={{borderTopWidth: 4, borderColor: theme.labelOrInactiveColor, marginVertical: 10, width: '100%'}}/>
                {this.state.zoomModal?(
                    <ImageZoomModal 
                        zoomModal={this.state.zoomModal}
                        closeModal={this.closeModal}
                        images={this.state.imageArr}
                        index={this.state.index}
                        type={this.state.type}
                    />
                ):(null)}
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
export default connect(mapStateToProps)(FeedImage);