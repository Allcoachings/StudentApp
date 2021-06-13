import React from 'react';
import { StyleSheet,Text,View } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { theme } from '../config';

import RatingBar from '../Utils/RatingBar'
class RatingOverView extends React.Component {
    state = {  }

    renderRatingBar=(progress,ratingValue)=>{
        return(
            <View style={styles.ratingBarContainer}>
                <Text style={styles.ratingValueText}>{ratingValue}</Text>
                <RatingBar   progressColor={theme.accentColor} backgroundColor="grey" height={15} progress={progress} borderRadius={30}/>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.numericalOverView,{alignItems: 'center'}]}>
                        <Text style={styles.avgRatingValue}>{this.props.rating}</Text>
                        <AirbnbRating 
                            starContainerStyle={styles.instituteRating} 
                            count={5}
                            reviews={[]} 
                            isDisabled={true}
                            defaultRating={this.props.rating}
                            size={10} 
                            showRating={false}
                        />
                        <Text style={styles.ratingCount}>{this.props.ratingCount}</Text>
                </View>
                <View style={[styles.graphicalOverView,{justifyContent: 'center'}]}>
                
                        <View>
                            {this.renderRatingBar(this.props.progress5,'5')}
                        </View>
                        <View>
                            {this.renderRatingBar(this.props.progress4,'4')}
                        </View>
                        <View>
                            {this.renderRatingBar(this.props.progress3,'3')}
                        </View>
                            {this.renderRatingBar(this.props.progress2,'2')}
                        <View>
                            {this.renderRatingBar(this.props.progress1,'1')}
                        </View>
                  
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row'
    },
        numericalOverView:
        {
            flex:0.4,
            flexDirection:'column', 
        },
            avgRatingValue:
            {
                fontSize:40,
                fontWeight:'400',
                marginTop:10,
                marginBottom:5
            },
            instituteRating:
            {
                 
            },
            ratingCount:
            {
                fontSize:12
            },
        graphicalOverView:
        {
            flex:0.7,
            flexDirection:'column', 
        },
            ratingBarContainer:
            {
                flex:1,
                flexDirection:'row',
                alignItems: 'center'
            },
       


})
export default RatingOverView;