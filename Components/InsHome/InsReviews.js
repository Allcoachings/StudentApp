import React from 'react';
import { Image, Text, View,StyleSheet, ActivityIndicator } from 'react-native';
import Review from '../ReviewAndRatings/Review'
import {connect} from 'react-redux'
import {fetch_institute_reviews} from '../Utils/DataHelper/Reviews'
import {theme,screenMobileWidth, serverBaseUrl, dataLimit} from '../config'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';

class InsReviews extends React.Component {
    
    state = {
        reviewLoading: true,
        reviewOffset:0,
        reviews:[]
     }

    componentDidMount() {
        this.fetchReviews()
     }

     fetchReviews=()=>{
        this.setState({reviewLoading: true})
        fetch_institute_reviews(this.props.institute.details.id, this.state.reviewOffset, dataLimit, this.reviewsCallBack)
     }

    reviewsCallBack=(response)=>{
        if(response.status==200)
        {
            console.log("review res");
            response.json().then(data=>
            {
                this.setState({reviews:data,reviewLoading:false});                   
            })
        }
    }

    render() {
        return (
            <View>
                <Text style={styles.RatingText}>Rating & Reviews</Text>
                {this.state.reviewLoading?(
                    <CustomActivtiyIndicator mode="skimmer"/>
                ):(
                    <Review replyMode 
                        review={this.state.reviews} 
                        total_rating={this.props.institute.details.total_rating_count}
                        one_star={this.props.institute.details.one_star_count} 
                        two_star={this.props.institute.details.two_star_count}
                        three_star={this.props.institute.details.three_star_count}
                        four_star={this.props.institute.details.four_star_count}
                        five_star={this.props.institute.details.five_star_count}
                    />
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    RatingText:
    {
        fontFamily: 'Raleway_700Bold',
        fontSize: 20, 
        marginTop: 10
    },  

})

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth,
        institute:state.institute
    }
}
export default connect(mapStateToProps)(InsReviews);