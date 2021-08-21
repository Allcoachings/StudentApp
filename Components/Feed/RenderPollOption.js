import React from 'react';
import {theme} from '../config'
import { View,Text ,StyleSheet, TouchableOpacity} from 'react-native';
import RatingBar from '../Utils/RatingBar'; 
import {votePoll} from "../Utils/DataHelper/Feed"
import { connect } from 'react-redux';
class RenderPollOption extends React.Component {
    state = {  }
    percentage =()=> (this.props.item.upVotes/this.props.totalVote)*100 


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

    switchCanUserVote=(status)=>
    {
         
        switch(status)
        {
            case true:
                return(
                    <TouchableOpacity onPress={()=>this.voteForPoll(this.props.item.feedId,this.props.item.id)}>
                        <RatingBar progressColor={theme.accentColor} duration={2000} backgroundColor={theme.primaryColor} height={20} label={this.props.item.pollOption} progress={0} borderRadius={10} style={{borderWidth:1,padding:10}}/>
                    </TouchableOpacity>
                )
            case false:
                return(
                    <View>
                        <RatingBar progressColor={theme.accentColor} duration={2000} backgroundColor={theme.primaryColor} height={20} label={this.props.item.pollOption} progress={this.percentage()} borderRadius={10}/>
                    </View>
                )
        }
    }

    renderOption=()=>
    {

        return(
            <>
                {/* <Text style={styles.optionText}>{this.props.item.pollOption}</Text> */}
                {this.switchCanUserVote(this.props.canUserVote)}
            </>
        )
    }
    render() {
        console.log(this.props.item)

        return (
            <View style={styles.container}>
                {this.renderOption()} 
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