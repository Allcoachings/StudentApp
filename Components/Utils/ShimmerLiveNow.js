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
    timerBox:
    {
        flexDirection:'column',
        width:70,
        height:70,
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
 
const ShimmerLiveNow = (props) => (
    <View style={styles.container}> 
            {/* ins meta shimmers */}
            <View style={styles.upperText}>
                        <Shimmer width={WIDTH-30} height={14} />
            </View>
            <View style={styles.upperText}>
                        <Shimmer width={WIDTH-30} height={14} />
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.timerBox}> 
                        <Shimmer width={70} height={70} /> 
                </View>
                <View style={styles.timerBox}> 
                        <Shimmer width={70} height={70} /> 
                </View>
                <View style={styles.timerBox}> 
                        <Shimmer width={70} height={70} /> 
                </View>
            </View> 
            <View>
                <View>
                    <View style={styles.upperText}>
                        <Shimmer width={WIDTH-30} height={50} />
                    </View> 
                </View>
            </View> 
    </View>
);

export default ShimmerLiveNow;
