import React, { Component } from 'react';
import { View, Text,Image,StyleSheet,Share, TouchableOpacity } from 'react-native';
import {theme} from '../config';
import { AntDesign, FontAwesome} from '@expo/vector-icons';
import { connect } from 'react-redux'
import CommentModal from './CommentModal'
import onShare from '../Utils/Share';
  
class FeedBottomComponent extends Component {
  
    state={
    canUserLike: this.props.canUserLike,
    feedId: this.props.feedId,
    showCommentModal: false,
    comments:this.props.comments
  }
updateCommentsCount=(x)=>
{
    this.setState({comments:this.state.comments+x});
}
  closeModal=()=>{
    this.setState({showCommentModal: false})
  }



  render() { 
    return(
        <>
        <View style={styles.bottomRowContainer}>
            <View style={{flexDirection: 'row'}}>
                {this.props.canUserLike?(
                    <TouchableOpacity style={styles.likeView}  onPress={()=>this.props.likeFeed(this.state.feedId)}>
                        <AntDesign name="hearto" size={22} color={theme.greyColor} />
                    </TouchableOpacity>
                ):(
                    <TouchableOpacity style={styles.likeView} onPress={()=>this.props.unLikeFeed(this.state.feedId)}>
                        <AntDesign name="heart" size={22} color={theme.greyColor}/>
                    </TouchableOpacity>
                )}
                <View style={{marginLeft:5}}>
                    <Text>{this.props.likes}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',alignItems: 'center'}}>
                <TouchableOpacity style={styles.likeView} onPress={()=>this.props.mode=="single"?(console.log("no")):(this.setState({showCommentModal: true}))}>
                    <FontAwesome name="comments" size={22} color={theme.greyColor} />
                </TouchableOpacity>
                <View style={{marginLeft:5}}>
                    <Text>{this.state.comments}</Text>
                </View>
            </View> 
            <TouchableOpacity style={styles.likeView} onPress={()=>onShare("TEset Me")}>
                <AntDesign name="sharealt" size={22} color={theme.greyColor} />
            </TouchableOpacity>

          
        </View>
          {this.state.showCommentModal?(
            <CommentModal updateCommentsCount={this.updateCommentsCount} feedId={this.state.feedId} modalVisible={this.state.showCommentModal} navigation={this.props.navigation} closeModal={this.closeModal} comments={this.props.comments}/>
        ):(null)}
        </>
    )
  }
}
const styles = StyleSheet.create({
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
});

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth,
        userInfo:state.user.userInfo,
        institute:state.institute
    }
}
export default connect(mapStateToProps)(FeedBottomComponent);