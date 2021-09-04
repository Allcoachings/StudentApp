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
    header: {
      flexDirection: 'column',
      width: '100%', 
    },
    avatar: { borderRadius: 30, width: 60, overflow: 'hidden' },
    upperText: { marginTop: 14 },
    lowerText: { marginTop: 4 },
    instituteItemContainer:
    {
        flexDirection:'column',
        width:(WIDTH/3)-20,
        height:120,
        marginRight:10,
        marginTop:10,

    },
    bannerImage:
    {
        alignSelf:'flex-start',         
        width:(WIDTH/1.1)-10,
        height:150,
        borderRadius:10,
        marginTop:10
    },
    roundContainer:
    {
        borderRadius: 10, width: 60, overflow: 'hidden'
    },
  });
const insImageWidth=(WIDTH/3)-20;
const ShimmerResult = (props) => (
    <View style={styles.container}> 
            {/* ins meta shimmers */}
            <View style={{marginTop:20}}>
                <View style={styles.upperText}>
                    <Shimmer width={WIDTH-30} height={14} />
                </View>
                <View style={styles.upperText}>
                    <Shimmer width={WIDTH-30} height={14} />
                </View>
            </View>
            <View style={{flexDirection: 'row',marginTop:30,marginBottom: 30}}>
                <View style={styles.instituteItemContainer}>
                    <Shimmer width={insImageWidth} height={120} />
                </View> 
                <View style={styles.instituteItemContainer}>
                    <Shimmer width={insImageWidth} height={120} />
                </View> 
                <View style={styles.instituteItemContainer}>
                    <Shimmer width={insImageWidth} height={120} />
                </View>  
            </View> 
            <View style={[styles.upperText,{marginBottom:15}]}>
                <Shimmer width={WIDTH-30} height={14} />
            </View>
            <View style={[styles.upperText,{marginBottom:15}]}>
                <Shimmer width={WIDTH-30} height={14} />
            </View>
            <View style={[styles.upperText,{marginBottom:15}]}>
                <Shimmer width={WIDTH-30} height={14} />
            </View>
            <View style={[styles.upperText,{marginBottom:15}]}>
                <Shimmer width={WIDTH-30} height={14} />
            </View>
            <View style={[styles.upperText,{marginBottom:15}]}>
                <Shimmer width={WIDTH-30} height={14} />
            </View>
             
    </View>
);

export default ShimmerResult;
