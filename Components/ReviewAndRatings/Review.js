import React from 'react';
import { View ,StyleSheet, ScrollView, Text,FlatList} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure';
import RatingOverView from './RatingOverView';
import RenderReview from './RenderReview';
import {connect} from 'react-redux'
import { screenMobileWidth} from '../config' 

class Review extends React.Component {
    state = {  
        
        loadingReviewData:true,
        refreshing:1,
        reviewData:[],
        loadingClgData:true,
        clgData:{},
        
        
    }
     
    // startPercent = (s5,s4,s3,s2,s1,sx)=>(parseInt(sx)*100)/(parseInt(s5)+parseInt(s4)+parseInt(s3)+parseInt(s2)+parseInt(s1))

    render() {
        const rating=((parseInt(this.props.one_star)*1)+(parseInt(this.props.two_star)*2)+(parseInt(this.props.three_star)*3)+(parseInt(this.props.four_star)*4)+(parseInt(this.props.five_star*5)))/(parseInt(this.props.five_star)+parseInt(this.props.four_star)+parseInt(this.props.three_star)+parseInt(this.props.two_star)+parseInt(this.props.one_star))
        return (
            
                <ScrollView>
                <View style={styles.container}> 
                     <View style={styles.overView}>
                            <RatingOverView
                                rating={this.props.total_rating>0?(rating.toFixed(1)):(0)}
                                ratingCount={this.props.total_rating}
                                progress5={this.props.total_rating>0?((this.props.five_star/this.props.total_rating)*100):0}
                                progress4={this.props.total_rating>0?((this.props.four_star/this.props.total_rating)*100):0}
                                progress3={this.props.total_rating>0?((this.props.three_star/this.props.total_rating)*100):0}
                                progress2={this.props.total_rating>0?((this.props.two_star/this.props.total_rating)*100):0}
                                progress1={this.props.total_rating>0?((this.props.one_star/this.props.total_rating)*100):0}
                            /> 
                     </View>
                     <View style={{flex: 1}}>
                         
                            <FlatList
                                data={this.props.review}
                                renderItem={({item})=><RenderReview  replyMode={this.props.replyMode} item={item} userId={this.props.userId}/>}
                                keyExtractor={(item)=>item.id}   
                            />
                       
                            
                     </View>
                </View>
                </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop:10
    },
        overView:
        {
            flex:0.3
        },  
})
 const  mapStateToProps = (state)=>{
     return {
         screenWidth: state.screen.screenWidth
     }
 }
export default connect(mapStateToProps)(Review);