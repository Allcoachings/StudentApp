import React from 'react';
import {theme} from '../config'
import { View,Text ,StyleSheet, TouchableOpacity} from 'react-native';
import RatingBar from '../Utils/RatingBar'; 
// import {votePoll} from "../Utils/DataHelper/WriteToDB/VotePoll"
import { connect } from 'react-redux';
class RenderPollOption extends React.Component {
    state = {  }
    percentage =()=> (this.props.item.upVote/this.props.totalVote)*100 


    // voteForPoll=(poll_id,option_id,user_id)=>
    // {
        // this.props.activateOptionLoader()
        // votePoll(poll_id,option_id,user_id,this.handleVotePollCallback)
    // }

    handleVotePollCallback=(response,option_id)=>
    {
        if(response.msg=='ok')
        {
            this.props.updateVote(option_id) 
        }else
        if(response.msg=='failed' && response.error=='No data to fetch')
        {

        }
    }

    switchCanUserVote=(status)=>
    {
         
        switch(status)
        {
            case true:
                return(
                    <TouchableOpacity onPress={()=>{}}>
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
 
export default RenderPollOption;