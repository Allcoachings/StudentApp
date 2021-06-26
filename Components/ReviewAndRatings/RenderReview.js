import React from 'react';
import { View ,Text,Image,StyleSheet,TouchableOpacity,Modal,TextInput} from 'react-native'; 
import {connect} from 'react-redux'
import {theme,screenMobileWidth} from '../config'
import { AirbnbRating } from 'react-native-ratings';
import { Feather } from '@expo/vector-icons';

class RenderReview extends React.Component {
    state = {
        ReviewmodalVisible:false
      }

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
                                selectedColor={theme.blueColor}
                                showRating={false}
                            />
                            <Text style={styles.ratingDate}>{item.date}</Text>
                        </View>
                        <Text 
                            style={[styles.ratingText,{width:this.props.screenWidth<=screenMobileWidth?(this.props.screenWidth-50):(((this.props.screenWidth)/2)-30)}]}>
                            {item.review_des}
                        </Text>
                        {this.props.replyMode?(
                            <TouchableOpacity style={{alignSelf:'flex-end',marginRight:20}} onPress={()=>this.setState({ReviewmodalVisible:true})}>
                                <Text style={{color:theme.greyColor}}>Reply</Text>
                            </TouchableOpacity>
                            
                        ):(null)}
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
                <Modal animationType = {"fade"} transparent = {false}
                        visible = {this.state.ReviewmodalVisible}
                        onRequestClose = {() => { console.log("Modal has been closed.") } }> 
                            <View>
                                <View style={{flexDirection: 'row',alignItems: 'center',paddingBottom:10,borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor, marginTop:10}}>
                                    <View style={{marginLeft:10}}>
                                        <TouchableOpacity onPress={()=>this.setState({ReviewmodalVisible:false})}>
                                            <Feather name={'x'} size={20}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{marginHorizontal:10,flex:0.8,flexWrap:'wrap'}}>
                                        <View style={{display: 'flex', flexDirection: 'row',}}> 
                                            {/* <Image source={instituteData.logo} style={{width:35,height:35,borderRadius:5,marginRight:10}}/> */}
                                            <View>
                                                <Text numberOfLines={1} style={{color:theme.secondaryColor,fontSize:15}}>{item.name}</Text>
                                                <Text style={{color: theme.greyColor}}>Reply To Review</Text>
                                            </View>
                                        </View>

                                    </View>
                                    <View style={styles.modalHeaderRight}></View>
                                </View>
                                <View style={{ paddingHorizontal: 6,marginVertical:20,backgroundColor: 'white'}}>
                                    
                                    <TextInput style={{borderWidth: 1, borderColor: 'black', borderRadius:10, paddingLeft: 6, paddingBottom:30,}} placeholder="Write a Review" placeholderTextColor='grey'></TextInput>
                                    <TouchableOpacity style={styles.reviewbutton}>
                                        <Text style={styles.reviewbutton_text}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                                
                            </View>

                        </Modal>

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
        reviewbutton:{
            flexDirection: 'row',
            backgroundColor: theme.accentColor,
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 5,
            paddingBottom: 5,
            borderRadius: 3,
            marginTop: 5,
            alignSelf: 'center',
            marginBottom: 20,
        },
        reviewbutton_text:{
            textAlign: 'center',
            fontSize: 18,
            color: theme.primaryColor,
            
        }
})
const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth
    }
}


export default connect(mapStateToProps)(RenderReview);
