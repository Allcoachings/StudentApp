import React, { Component } from 'react';
import { View, Text,Image,StyleSheet, TouchableOpacity } from 'react-native';
import {theme} from '../config';
import { AntDesign, FontAwesome} from '@expo/vector-icons';
import { connect } from 'react-redux'
import CommentModal from './CommentModal'

class FeedBottomComponent extends Component {
  
    state={
    canUserLike: this.props.canUserLike,
    feedId: this.props.feedId,
    showCommentModal: false
  }

  closeModal=()=>{
    this.setState({showCommentModal: false})
  }


  render() {
    return(
        <View style={styles.bottomRowContainer}>
            {this.state.canUserLike?(
                <TouchableOpacity style={styles.likeView}  onPress={()=>this.props.likeFeed(this.state.feedId)}>
                    <AntDesign name="hearto" size={22} color={theme.greyColor} />
                </TouchableOpacity>
            ):(
                <TouchableOpacity style={styles.likeView}>
                    <AntDesign name="heart" size={22} color={theme.greyColor}/>
                </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.likeView} onPress={()=>this.setState({showCommentModal: true})}>
                <FontAwesome name="comments" size={22} color={theme.greyColor} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.likeView}>
                <AntDesign name="sharealt" size={22} color={theme.greyColor} />
            </TouchableOpacity>

            {this.state.showCommentModal?(
                <CommentModal feedId={this.state.feedId} modalVisible={this.state.showCommentModal} navigation={this.props.navigation} closeModal={this.closeModal}/>
            ):(null)}
        </View>
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