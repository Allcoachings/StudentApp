import React from 'react';
import { View ,Text,Image,StyleSheet,TouchableOpacity,Modal,TextInput} from 'react-native'; 
import {connect} from 'react-redux'
import {theme,screenMobileWidth} from '../config'
import { AirbnbRating } from 'react-native-ratings';
import { Feather } from '@expo/vector-icons';
import {reply} from '../Utils/DataHelper/Reviews'
import  Toast  from 'react-native-simple-toast';

class RenderReview extends React.Component {
    state = {
        ReviewmodalVisible:false,
        reply:this.props.item.insReview.reply||'',
        reviews: this.props.item,
        editReply:''
      }


    sendReply=(id,rating,review,courseId, studentId, insId)=>{
        if(this.state.reply!='')
        {
            Toast.show("Please Wait...")
            reply(id, this.state.reply, rating,review,courseId, studentId, insId, this.replyCallBack)
        }
        else
        {
            Toast.show("Please Fill All The Fields.")
        }
    }

    replyCallBack=(response)=>{
        if(response.status==200)
        {
            Toast.show("Reply Added Successfully.")
            this.setState({ReviewmodalVisible: false, editReply:''})
        }
        else
        {
            console.log("response.status",response.status)
        }
    }

    renderReviews=(item)=>
    {
        console.log("item", item)
        return (
        <View style={styles.ratingContainer}>
            {item.insReview.review!=null&&item.insReview.review!=''?(  
                <View>  
                
                <View style={styles.userMetaContainer}>
                    <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.ratingUserImage}/> 
                    <Text style={styles.ratingUserName}>{item.studentName}</Text>
                    {/* {this.props.replyMode?(null):(
                        item.insReview.studentId==this.props.userId?(
                            <TouchableOpacity onPress={null}>
                                <Feather name="edit-3" size={18} color={theme.secondaryColor} />
                            </TouchableOpacity>
                        ):(null)
                    )} */}
                </View>

                <View style={styles.ratingMetaView}>
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <AirbnbRating 
                                starContainerStyle={styles.instituteRating} 
                                count={5}
                                reviews={[]} 
                                isDisabled={true}
                                defaultRating={item.insReview.rating}
                                size={12}
                                selectedColor={theme.blueColor}
                                showRating={false}
                            />
                            <Text style={styles.ratingDate}>{item.date}</Text>
                        </View>
                        <Text 
                            style={[styles.ratingText,{width:this.props.screenWidth<=screenMobileWidth?(this.props.screenWidth-50):(((this.props.screenWidth)/2)-30)}]}>
                            {item.insReview.review}
                        </Text>
                        {this.props.replyMode&&(this.state.reply==null||this.state.reply=='')?(
                            <TouchableOpacity style={{alignSelf:'flex-end',marginRight:20}} onPress={()=>this.setState({ReviewmodalVisible:true})}>
                                <Text style={{color:theme.greyColor}}>Reply</Text>
                            </TouchableOpacity>
                            
                        ):(null)}
                        {this.state.reply!=null&&this.state.reply!=''?(
                            <View style={{padding: 10, backgroundColor:theme.labelOrInactiveColor}}>
                                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 10}}>{item.insName}</Text>
                                    {this.props.replyMode?(<TouchableOpacity onPress={()=>this.setState({ReviewmodalVisible: true, editReply: this.state.reply})}>
                                        <Feather name="edit-3" size={18} color={theme.secondaryColor} />
                                    </TouchableOpacity>):(null)}
                                </View>
                                <Text>{this.state.reply}</Text>
                            </View>
                        ):(null)}
                    </View>
                </View>
            </View>):(null)}
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
                                    
                                    <TextInput 
                                        style={{borderWidth: 1, borderColor: 'black', borderRadius:10, paddingLeft: 6, paddingBottom:30,}} 
                                        defaultValue={this.state.editReply!=''?(
                                            this.state.editReply):(null)} 
                                        onChangeText={(text) =>this.setState({reply: text})} 
                                        placeholder="Write a Review" placeholderTextColor='grey'>
                                    </TextInput>
                                    <TouchableOpacity style={styles.reviewbutton} onPress={()=>this.sendReply(item.insReview.id,item.insReview.rating,item.insReview.review,item.insReview.courseId, item.insReview.studentId, item.insReview.insId)}>
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
           this.renderReviews(this.state.reviews)
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
