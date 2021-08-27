import React from 'react';
import { Image, Text, View,StyleSheet, ActivityIndicator, Modal, TouchableOpacity, TextInput } from 'react-native';
import Review from '../ReviewAndRatings/Review'
import {connect} from 'react-redux'
import { Feather } from '@expo/vector-icons';
import {fetch_institute_reviews} from '../Utils/DataHelper/Reviews'
import { AirbnbRating } from 'react-native-ratings';
import {theme, dataLimit} from '../config'
import { addStudentReview } from '../Utils/DataHelper/Reviews'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import Toast from 'react-native-simple-toast';
class StudentReview extends React.Component {
    
    state = {
        reviewLoading: true,
        reviewOffset:0,
        reviews:[],
        studentEnrolled: this.props.studentEnrolled,
        instituteId: this.props.instituteId, 
        studentId: this.props.studentId,
        courseId: this.props.courseId,
        ReviewmodalVisible:false, 
        review:'',
        rating:0,
        total_rating_count: this.props.total_rating_count,
        one_star_count: this.props.one_star_count,
        two_star_count: this.props.two_star_count,
        three_star_count: this.props.three_star_count,
        four_star_count: this.props.four_star_count,
        five_star_count: this.props.five_star_count,
        inslogo: this.props.inslogo,
        institle: this.props.institle,
        showLoadMore: true,
        loadingFooter: false
     }

    componentDidMount() {
        this.fetchReviews()
     }

     fetchReviews=()=>{
        this.setState({reviewLoading: true})
        fetch_institute_reviews(this.state.instituteId, this.state.reviewOffset, dataLimit, this.reviewsCallBack)
     }

     addReview=()=>{
        if(this.state.review!=''&&this.state.rating!=0)
        {
           addStudentReview(this.state.studentId, this.state.courseId, this.state.review, this.state.rating, this.addReviewCallBack)
        }
        else
        {
            Toast.show("Please Fill All The Fields.")
        }
    }

    ratingCompleted=(rating)=>{
        this.setState({rating})
    }


    addReviewCallBack=(response)=>{
        
       this.setState({ReviewmodalVisible: false})
        if(response.status==200)
        {
            Toast.show("Review Added successfully!!")
            var obj={"insName": 'Cyberflow', "insReview":{"id": 3, "courseId": 1, "insId": 1,  "reply": '', "review": this.state.review, "rating": this.state.rating,"studentId": 1}, "studentImage": "sdfghj", "studentName": "DU BUDDY"}
            this.setState({ reviews: this.state.reviews.concat(obj), showReviewBox: false })
        }
        else
        {
            console.log("error", response.status)
            Toast.show("Something Went Wrong. Please Try Again Later.")
        }
    }

    reviewsCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                if(data.length>0)
                {
                    this.setState({reviews:[...this.state.reviews,...data],reviewLoading:false, showLoadMore: true});  
                }
                else
                {
                    this.setState({reviews:this.state.reviews,reviewLoading:false, showLoadMore: false}); 
                }                  
            })
        }
    }

    reviewModal(visible) {
        this.setState({ReviewmodalVisible: visible });
    }

    fetchMoreReviews=()=>{
        this.setState({reviewOffset: parseInt(this.state.reviewOffset)+1},()=>this.fetchReviews())
    }


    render() {
        return (
                <View>
                    <View style={{flexDirection: 'column', justifyContent: 'space-between', marginBottom: 10, marginTop: 10}}>
                        <Text style={styles.RatingText}>Rating & Reviews</Text>
                        {this.props.studentEnrolled?(
                            <View style={{ paddingHorizontal: 6,marginVertical:10,backgroundColor: 'white'}}>
                            <AirbnbRating 
                                starContainerStyle={[styles.instituteRating,{alignSelf:"center"}]} 
                                count={5}
                                reviews={[]} 
                                isDisabled={false}
                                defaultRating={0}
                                size={30}
                                selectedColor={theme.blueColor}
                                showRating={false}
                                onFinishRating={this.ratingCompleted}
                            />
                            <TextInput style={{borderWidth: 1, borderColor: 'black', borderRadius:10, paddingLeft: 6, paddingBottom:30,}} placeholder="Write a Review" placeholderTextColor='grey' onChangeText={(text) => this.setState({review: text})}></TextInput>
                            <TouchableOpacity style={styles.reviewbutton} onPress={()=>this.addReview()}>
                                <Text style={styles.reviewbutton_text}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                         ):(null)} 
                    </View>
                    {this.state.reviewLoading?(
                        <CustomActivtiyIndicator mode="skimmer"/>
                    ):(
                        <Review 
                            review={this.state.reviews} 
                            total_rating={this.state.total_rating_count}
                            one_star={this.state.one_star_count} 
                            two_star={this.state.two_star_count}
                            three_star={this.state.three_star_count}
                            four_star={this.state.four_star_count}
                            five_star={this.state.five_star_count}
                            userId={this.state.studentId}
                            showLoadMore={this.state.showLoadMore}
                            fetchMoreReviews={this.fetchMoreReviews}
                        />
                    )}
                    <Modal animationType = {"fade"} transparent = {false}
                        visible = {this.state.ReviewmodalVisible}
                        onRequestClose = {() => { console.log("Modal has been closed.") } }> 
                            <View>
                                <View style={{flexDirection: 'row',alignItems: 'center',paddingBottom:10,borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor, marginTop:10}}>
                                    <View style={{marginLeft:10}}>
                                        <TouchableOpacity onPress={()=>this.setState({ReviewmodalVisible:false})}>
                                            <Feather name={'arrow-left'} size={20}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{marginHorizontal:10,flex:0.8,flexWrap:'wrap'}}>
                                        <View style={{display: 'flex', flexDirection: 'row',}}> 
                                            <Image source={this.state.inslogo} style={{width:35,height:35,borderRadius:5,marginRight:10}}/>
                                            <View>
                                                <Text numberOfLines={1} style={{color:theme.secondaryColor,fontSize:15}}>{this.state.institle}</Text>
                                                <Text style={{color: theme.greyColor}}>Rate this Institute</Text>
                                            </View>
                                        </View>

                                    </View>
                                    <View style={styles.modalHeaderRight}></View>
                                </View>
                                <View style={{ paddingHorizontal: 6,marginVertical:20,backgroundColor: 'white'}}>
                                  
                                    <AirbnbRating 
                                        starContainerStyle={[styles.instituteRating,{alignSelf:"center"}]} 
                                        count={5}
                                        reviews={[]} 
                                        isDisabled={false}
                                        defaultRating={0}
                                        size={30}
                                        selectedColor={theme.blueColor}
                                        showRating={false}
                                        onFinishRating={this.ratingCompleted}
                                    />
                                    <TextInput style={{borderWidth: 1, borderColor: 'black', borderRadius:10, paddingLeft: 6, paddingBottom:30,}} placeholder="Write a Review" placeholderTextColor='grey' onChangeText={(text) => this.setState({review: text})}></TextInput>
                                    <TouchableOpacity style={styles.reviewbutton} onPress={()=>this.addReview()}>
                                        <Text style={styles.reviewbutton_text}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                                
                            </View>

                    </Modal>
                </View>     
        )
    }
}

const styles = StyleSheet.create({
      
    RatingText:
    {
        fontSize: 20, 
        fontFamily: 'Raleway_700Bold',
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
        screenWidth: state.screen.screenWidth,
    }
}
export default connect(mapStateToProps)(StudentReview);