import React from 'react';
import { View ,StyleSheet, ScrollView, Text,FlatList} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure';
import RatingOverView from './RatingOverView';
import RenderReview from './RenderReview';
import {connect} from 'react-redux'
import {review} from '../../FakeDataService/FakeData' 
import { screenMobileWidth} from '../config' 

class Review extends React.Component {
    state = {  
        
        loadingReviewData:true,
        refreshing:1,
        reviewData:[],
        loadingClgData:true,
        clgData:{},
        
        
    }
     
     
    startPercent = (s5,s4,s3,s2,s1,sx)=>(parseInt(sx)*100)/(parseInt(s5)+parseInt(s4)+parseInt(s3)+parseInt(s2)+parseInt(s1))
    render() {
        return (
            
                <ScrollView>
                <View style={styles.container}> 
                     <View style={styles.overView}>
                         
                            <RatingOverView
                                rating={4.3}
                                ratingCount={2125}
                                progress5={50}
                                progress4={50}
                                progress3={50}
                                progress2={50}
                                progress1={50}
                            />
                         
                         
                     </View>
                     <View style={{flex: 1}}>
                         
                            <FlatList
                                data={review}
                                renderItem={({item})=><RenderReview  item={item}/>}
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