import React from 'react';
 import { View,StyleSheet,Text, Image } from 'react-native';
import Svg, { Path, SvgXml } from "react-native-svg"
import { Assets } from '../../config';

function Icon({height, width}) {


  return (
        <View style={styles.container}>
            <Image   style={{height: height?height:20, width:width?width:20,resizeMode:'contain'}} source={Assets.header.reply}/>
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
