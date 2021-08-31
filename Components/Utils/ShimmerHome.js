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
              
        width:(WIDTH/1.1)-10,
        height:150,
        borderRadius:10,
        marginTop:10
    }
  });

const ShimmerHome = (props) => (
    <View style={styles.container}> 
            {/* HOME BANNER 1 SHIMMER */}
            <View style={styles.bannerImage}>
                <Shimmer width={(WIDTH/1.1)-10} height={150} />
            </View> 
            <View>
                 {/* HOME INSTITUTE Row 1 SHIMMER */} 
                <View>
                    {/* Category Name shimmer */}
                    <View style={styles.upperText}>
                        <Shimmer width={WIDTH-50} height={14} />
                    </View>
                    {/*  Institute container shimmers */}
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.instituteItemContainer}>
                            <Shimmer width={(WIDTH/3)-20} height={120} />
                        </View>
                        <View style={styles.instituteItemContainer}>
                            <Shimmer width={(WIDTH/3)-20} height={120} />
                        </View>
                        <View style={styles.instituteItemContainer}>
                            <Shimmer width={(WIDTH/3)-20} height={120} />
                        </View>
                    </View>
                </View>
                {/* HOME INSTITUTE Row 2 SHIMMER */} 
                <View>
                    {/* Category Name shimmer */}
                    <View style={styles.upperText}>
                        <Shimmer width={WIDTH-50} height={14} />
                    </View>
                    {/*  Institute container shimmers */}
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.instituteItemContainer}>
                            <Shimmer width={(WIDTH/3)-20} height={120} />
                        </View>
                        <View style={styles.instituteItemContainer}>
                            <Shimmer width={(WIDTH/3)-20} height={120} />
                        </View>
                        <View style={styles.instituteItemContainer}>
                            <Shimmer width={(WIDTH/3)-20} height={120} />
                        </View>
                    </View>
                </View>
                {/* HOME INSTITUTE Row 3 SHIMMER */} 
                <View>
                    {/* Category Name shimmer */}
                    <View style={styles.upperText}>
                        <Shimmer width={WIDTH-50} height={14} />
                    </View>
                    {/*  Institute container shimmers */}
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.instituteItemContainer}>
                            <Shimmer width={(WIDTH/3)-20} height={120} />
                        </View>
                        <View style={styles.instituteItemContainer}>
                            <Shimmer width={(WIDTH/3)-20} height={120} />
                        </View>
                        <View style={styles.instituteItemContainer}>
                            <Shimmer width={(WIDTH/3)-20} height={120} />
                        </View>
                    </View>
                </View>
                
            </View>
        <View style={styles.bannerImage}>
                <Shimmer width={(WIDTH/1.1)-10} height={150} />
        </View>
        {/* <Shimmer width={WIDTH} height={140} /> */}
    </View>
);

export default ShimmerHome;
