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
        width:WIDTH-20,
        height:150,
        borderRadius:10,
        marginTop:10,
        marginLeft:10,
    },
    roundContainer:
    {
        borderRadius: 10, width: 60, overflow: 'hidden'
    },
  });
const insImageWidth=(WIDTH/3)-20;
const ShimmerInstituteViewHeader = (props) => (
    <View style={styles.container}> 
            {/* ins meta shimmers */}
            <View style={{flexDirection: 'row'}}>
                <View style={styles.instituteItemContainer}>
                    <Shimmer width={insImageWidth} height={120} />
                </View>
                <View>
                    <View style={styles.upperText}>
                        <Shimmer width={WIDTH-insImageWidth-30} height={14} />
                    </View>
                    <View style={styles.upperText}>
                        <Shimmer width={WIDTH-insImageWidth-30} height={14} />
                    </View>
                    <View style={styles.upperText}>
                        <Shimmer width={WIDTH-insImageWidth-30} height={14} />
                    </View>
                </View>
               
            </View> 
            {/* ins tab shimmers */}
            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                    <View style={styles.upperText}>
                        <Shimmer width={90} height={30} />
                    </View>
                    <View style={styles.upperText}>
                        <Shimmer width={90} height={30} />
                    </View>
                    <View style={styles.upperText}>
                        <Shimmer width={90} height={30} />
                    </View> 
            </View>
            {/* ins course box shimmers */}
            <View style={{flexDirection: 'row',justifyContent: 'space-evenly',marginTop: 10}}>
                <View style={styles.roundContainer}>
                    <Shimmer width={95} height={30} />
                </View>
                <View style={styles.roundContainer}>
                    <Shimmer width={95} height={30} />
                </View>
                <View style={styles.roundContainer}>
                    <Shimmer width={95} height={30} />
                </View> 
                <View style={styles.roundContainer}>
                    <Shimmer width={95} height={30} />
                </View> 
                 
            </View>
             {/* Course BANNER  SHIMMER */}
             <View style={styles.bannerImage}>
                <Shimmer width={(WIDTH/1.1)-10} height={150} />
            </View>  
            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                    <View style={styles.upperText}>
                        <Shimmer width={90} height={30} />
                    </View> 
                    <View style={styles.upperText}>
                        <Shimmer width={90} height={30} />
                    </View> 
            </View>
             {/* ins tab shimmers */}
             <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                    <View style={styles.upperText}>
                        <Shimmer width={70} height={30} />
                    </View>
                    <View style={styles.upperText}>
                        <Shimmer width={70} height={30} />
                    </View>
                    <View style={styles.upperText}>
                        <Shimmer width={70} height={30} />
                    </View>
                    <View style={styles.upperText}>
                        <Shimmer width={70} height={30} />
                    </View> 
            </View>
            
    </View>
);

export default ShimmerInstituteViewHeader;
