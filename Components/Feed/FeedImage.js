import React, { Component } from 'react';
import { View, Text,Image,StyleSheet, TouchableOpacity } from 'react-native';
import {serverBaseUrl, theme} from '../config';
import {Feather, AntDesign, FontAwesome} from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import { connect } from 'react-redux'
import {like_feed} from "../Utils/DataHelper/Feed"
import moment from 'moment'
import { FlatListSlider } from '../Utils/ImageSlider';
import FeedBottomComponent from './FeedBottomComponent'

class FeedImage extends Component {
  state={

  }

  likeFeed=(feedId)=>{
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



  render() {
    const{feed,posterObject} = this.props.item
    return(
        // CardView(
            <View style={{flexDirection: 'column', padding: 5}}>
                <View style={styles.boxView}>
                    <View style={{flex: 0.1, padding: 5}}>
                        <Image source={{ uri: serverBaseUrl+posterObject.logo}} style={styles.circleView}/> 
                      
                    </View>
                    <View style={styles.innerBoxView}>
                        <View style={styles.rowView}>
                            <View  style={{flexDirection: 'row',alignItems: 'center'}}>
                                <Text style={styles.coaching}>{posterObject.name}{' • '}<Text style={styles.timeDateText}>{moment(feed.feed.creationTime).fromNow()}</Text></Text>
                            </View>
                            
                            <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                        </View>
                        
                        {feed.feed.description?( 
                            <View style={{marginVertical:10}}>
                                <Text style={{color: theme.greyColor,fontFamily:'Raleway_400Regular'}}>
                                    {feed.feed.description}
                                </Text>
                            </View>
                        ):(null)}

                        <FlatListSlider
                                data={feed.feedImages}
                                height={250}
                                timer={5000}
                                imageKey="feedImage"
                                onPress={item => {}}
                                contentContainerStyle={{resizeMode:'cover'}} 
                                indicatorActiveColor={theme.greyColor}
                                indicatorInActiveColor={theme.labelOrInactiveColor}
                                indicatorActiveWidth={5}
                                animation 
                                autoscroll={false}
                                serverBaseUrl={serverBaseUrl}
                        />
                        <FeedBottomComponent canUserLike={this.state.canUserLike} feedId={feed.feed.id} likeFeed={this.likeFeed} navigation={this.props.navigation}/>
                                                
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
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        borderColor: theme.labelOrInactiveColor,
        // padding: 2
    },
        rowView:
        {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
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
                // marginLeft:10,
                fontWeight: 'bold',
                color: theme.secondaryColor
            },
                timeDateText:
                {
                    fontSize: 16,
                    fontWeight: '400',
                    color: theme.secondaryColor
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