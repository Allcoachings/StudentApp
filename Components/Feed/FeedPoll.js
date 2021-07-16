import React, { Component } from 'react';
import { View, Text,StyleSheet,FlatList,Image, TouchableOpacity } from 'react-native';
import {Feather, AntDesign, FontAwesome} from '@expo/vector-icons';
import CardView from '../Utils/CardView'; 
import {theme,serverBaseUrl} from '../config'
import RenderPollOption from './RenderPollOption'
import moment from 'moment' 
class FeedPoll extends Component {
  state = {}


  render() {
    const{feed,posterObject} = this.props.item
    return(
        // CardView(
            <View style={{flexDirection: 'column', padding: 5}}>
                <View style={styles.boxView}>
                    <View style={{flex: 0.1, padding: 5,}}>
                        <Image source={{ uri: serverBaseUrl+posterObject.logo}} style={styles.circleView}/>
                    </View>
                    
                    
                    <View style={styles.innerBoxView}>
                        <View style={styles.rowView}>
                            <View  style={{flexDirection: 'row',alignItems: 'center'}}>
                                
                                <Text style={styles.coaching}>{posterObject.name}{' • '}<Text style={styles.timeDateText}>{moment(feed.feed.time_stamp).fromNow()}</Text></Text>
                            </View>
                            
                            <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                        </View>
                        <Text style={{fontSize: 18, marginTop: 10}}>{feed.feed.pollQuestion}</Text>
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
                            <TouchableOpacity style={styles.likeView}>
                                <AntDesign name="hearto" size={22} color={theme.greyColor} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.likeView}>
                                <FontAwesome name="comments" size={22} color={theme.greyColor} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.likeView}>
                                <AntDesign name="sharealt" size={22} color={theme.greyColor} />
                            </TouchableOpacity>
                        </View>
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
            flexDirection: 'column',
            flex: 0.85,
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
                marginTop: 10,
            },
                likeView:
                {
                //   marginRight: 30
                },
                    text:
                    {
                        fontSize: 18,
                        color: theme.greyColor
                    },
            // feed wala end
                            
                
});

export default FeedPoll;