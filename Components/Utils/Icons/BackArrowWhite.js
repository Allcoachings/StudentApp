import React from 'react';
 import { View,StyleSheet,Text } from 'react-native';
import Svg, { Path, SvgXml } from "react-native-svg"
import { Image } from 'react-native'
import { Assets } from '../../config';

function Icon({height, width}) {


    
 
    return (
      <View style={styles.container}>
            <Image style={{height: height, width: width,resizeMode:'contain'}} source={Assets.header.backWhite}/>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
export default Icon
