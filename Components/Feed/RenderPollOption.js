import React from 'react';
import {theme} from '../config'
import { View,Text ,StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import RatingBar from '../Utils/RatingBar'; 
import {votePoll} from "../Utils/DataHelper/Feed"
import { connect } from 'react-redux';
class RenderPollOption extends React.Component {
    state = {  }
    percentage =()=> Math.round((this.props.item.upVotes/this.props.totalVote)*100,0 )


    voteForPoll=(poll_id,option_id)=>
    {
        console.log(poll_id)
        votePoll(poll_id,option_id,this.props.userType,this.props.userType==1?(this.props.institute.details.id):(this.props.userInfo.id),this.handleVotePollCallback)
    }

    handleVotePollCallback=(response,option_id)=>
    {
        if(response.status==200)
        {
            this.props.updateVote(option_id) 
        }
        else
        {
            console.log("failed")
        }
    }

    switchCanUserVote=(status,index,item)=>
    { 
        switch(status)
        {
            case true:
                return(
                    <TouchableOpacity onPress={()=>this.voteForPoll(item.feedId,item.id)}>
                        <RatingBar progressColor={theme.greyColor+"1A"} duration={2000} backgroundColor={theme.primaryColor} height={40} label={item.pollOption} progress={0} borderRadius={5} style={{borderWidth:1,padding:10}}/>
                    </TouchableOpacity>
                )
            case false:
                return(
                    <TouchableWithoutFeedback onPress={()=>this.props.setFocusedOptionIndex(index)}>
                        <View style={this.props.focusedOptionIndex==index?{borderWidth:1,borderColor:theme.blueColor,borderRadius:5}:{borderWidth:1,borderColor:theme.labelOrInactiveColor,borderRadius:5}}>
                            <RatingBar labelStyle={{color:this.props.focusedOptionIndex==index?theme.blueColor :theme.greyColor}} progressStyle={{color:this.props.focusedOptionIndex==index?theme.blueColor :theme.greyColor} } progressColor={this.props.focusedOptionIndex==index?theme.blueColor+'1A':theme.greyColor+"1A"} duration={1000} backgroundColor={theme.primaryColor} height={40} label={item.pollOption} showProgress={true} progress={this.percentage()} borderRadius={this.props.focusedOptionIndex==index?5:0}/>
                        </View>
                    </TouchableWithoutFeedback>
                )
        }
    }

    renderOption=(item)=>
    {

        return(
            <>
                {/* <Text style={styles.optionText}>{this.props.item.pollOption}</Text> */}
                {this.switchCanUserVote(this.props.canUserVote,this.props.index,item)}
            </>
        )
    }
    render() {
        
        return (
            <View style={styles.container}>
                {this.renderOption(this.props.item)} 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop:10, 
    },
        optionText:
        {
            fontSize:17,
            marginBottom:10
        }
})
 
const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth,
        userInfo:state.user.userInfo,
        institute:state.institute
    }
}
export default connect(mapStateToProps)(RenderPollOption);
