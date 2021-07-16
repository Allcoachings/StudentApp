import React, { Component } from 'react';
import { View, Text,StyleSheet,FlatList,Image } from 'react-native';
import {Feather} from '@expo/vector-icons';
import CardView from '../Utils/CardView'; 
import {theme,serverBaseUrl} from '../config'
import RenderPollOption from './RenderPollOption'
import moment from 'moment' 
class FeedPoll extends Component {
  state = {}


  render() {
    const{feed,posterObject} = this.props.item
    return(
        CardView(
            <View style={styles.boxView}>
                <View style={styles.rowView}>
                    <View  style={{flexDirection: 'row',alignItems: 'center'}}>
                        <Image source={{ uri: serverBaseUrl+posterObject.logo}} style={styles.circleView}/>
                        <Text style={styles.coaching}>{posterObject.name}{' • '}<Text style={styles.timeDateText}>{moment(feed.feed.time_stamp).fromNow()}</Text></Text>
                    </View>
                    
                    <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                </View>
                  
                <View style={styles.innerBoxView}>
                    <Text style={{fontSize: 18, marginBottom: 10}}>{feed.feed.pollQuestion}</Text>
                    <FlatList
                        data={feed.feedPollOptions}
                        renderItem={({item})=><RenderPollOption item={item} canUserVote={true}/>}
                        keyExtractor={(item)=>item.id}
                    />
                    {/* <View Style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{fontSize: 16, marginTop: 3}}>Pacific Ocean</Text>
                        <Text style={{fontSize: 16, marginTop: 3}}>Atlantic Ocean</Text>
                        <Text style={{fontSize: 16, marginTop: 3}}>Indian Ocean</Text>
                        <Text style={{fontSize: 16, marginTop: 3}}>Arctic Ocean</Text>
                    </View> */}

                    <View style={styles.bottomRowContainer}>
                        <View style={styles.likeView}>
                            <Feather name="thumbs-up" size={18} />
                            <Text style={styles.text}>Like</Text>
                        </View>
                        <View style={styles.likeView}>
                            <Feather name="message-square" size={18} />
                            <Text style={styles.text}>Comment</Text>
                        </View>
                        <View style={styles.likeView}>
                            <Feather name="send" size={18} />
                            <Text style={styles.text}>Share</Text>
                        </View>
                    </View>
                </View>
            </View>,{width: '100%', padding: 6, marginBottom: 10}
        )
    )
  }
}
const styles = StyleSheet.create({
    boxView:
    {
        display: 'flex',
        flexDirection: 'column',
        // borderWidth: 1,
        borderColor: theme.labelOrInactiveColor,
        padding: 2
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
                marginLeft:10,
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
            // borderWidth: 1,
            borderColor: theme.labelOrInactiveColor,
            borderRadius: 2,
            marginTop: 10,
            padding: 10,
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
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                },
                    text:
                    {
                        fontSize: 18,
                        color: theme.greyColor
                    },
            // feed wala end
                            
                
});

export default FeedPoll;
