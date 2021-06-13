import React from 'react';
import { View ,Text,Image,StyleSheet} from 'react-native'; 
import {connect} from 'react-redux'
import {theme,screenMobileWidth} from '../config'
import { AirbnbRating } from 'react-native-ratings';
class RenderReview extends React.Component {
    state = {  }

    renderReviews=(item)=>
    {
        console.log(item)
        return (
        <View style={styles.ratingContainer}>
                <View style={styles.userMetaContainer}>
                    <Image source={item.user_pic} style={styles.ratingUserImage}/> 
                    <Text style={styles.ratingUserName}>{item.name}</Text>
                </View>
                <View style={styles.ratingMetaView}>
                    {/* <View style={styles.ratingUserMeta}>
                        <Text style={styles.ratingUserName}>{item.userName}</Text>
                        <Text style={styles.ratingUserid}>{item.user}</Text>
                    </View> */}
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <AirbnbRating 
                                starContainerStyle={styles.instituteRating} 
                                count={5}
                                reviews={[]} 
                                isDisabled={true}
                                defaultRating={item.review}
                                size={12}
                                selectedColor={theme.accentColor}
                                showRating={false}
                            />
                            <Text style={styles.ratingDate}>{item.date}</Text>
                        </View>
                        <Text 
                            style={[styles.ratingText,{width:this.props.screenWidth<=screenMobileWidth?(this.props.screenWidth-50):(((this.props.screenWidth)/2)-30)}]}>
                            {item.review_des}
                        </Text>
                    </View>
                    {/* <View style={styles.ratingTrendView}>
                        <View>
                            {this.renderDiscussionTrendItem('message-circle','18',()=>{})}
                        </View>
                        <View>
                            {this.renderDiscussionTrendItem('heart','12',()=>{})}
                        </View>
                        <View>
                            {this.renderDiscussionTrendItem('share-2',null,()=>{})}
                        </View>
                    </View> */}
                </View> 
        </View>
        )
    }
    render() {
        return (
           this.renderReviews(this.props.item)
        );
    }
}
const styles = StyleSheet.create({
    ratingContainer:
    {
        flex:1,
        flexDirection: 'column', 
        padding:5,
        backgroundColor:theme.primaryColor,
        marginTop:10,
    
    },
        userMetaContainer:
        {
            flexDirection:'row',
            alignItems: 'center',
            marginBottom:10
        },
            ratingUserImage:
                {
                    width:50,
                    height:50,
                    borderRadius:25,
                    marginRight:10
                },
        ratingMetaView:
            {
                flex:1,
                flexDirection: 'column',
            
            },
            instituteRating:
            {
                alignSelf: 'flex-start', 
            },

            ratingUserMeta:
                {
                    flex:1,
                    flexDirection: 'row',
                    
                },  
                ratingUserName:
                    {
                        fontWeight:'bold',
                        marginLeft:5,
                        marginRight:5
                    },
            ratingText:
                {
                     
                    flex:1, 
                    margin:5, 
                    flexWrap:'wrap',
                    
                },
            ratingTrendView:
                {
                    flex:1,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                },
                    trendItemContainer:
                    {
                        flex:1,
                        flexDirection: 'row',
                        
                    },
})
const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth
    }
}


export default connect(mapStateToProps)(RenderReview);
