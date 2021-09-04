import React from 'react';
import { Dimensions, Text, View, StyleSheet,ActivityIndicator } from 'react-native';
import Shimmer from './Shimmer';
import { theme } from '../config';
 
const WIDTH = Dimensions.get('screen').width;


const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   marginVertical: 40,
    alignItems: 'center'
    }, 
    bannerImage:
    {
              
        width:(WIDTH/1.1)-10,
        height:150,
        borderRadius:10,
        marginTop:10
    }
  });

const ShimmerTestItem = (props) => (
    <View style={styles.container}>  
            <View style={styles.bannerImage}>
                <Shimmer width={(WIDTH/1.1)-10} height={80} />
            </View>  
    </View>
);

export default ShimmerTestItem;
