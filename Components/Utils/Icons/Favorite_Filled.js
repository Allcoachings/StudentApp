import React from 'react';
 import { View,StyleSheet,Text } from 'react-native';
import Svg, { Path, SvgXml } from "react-native-svg"

function Icon({height, width}) {


    const xml =`<svg xmlns="http://www.w3.org/2000/svg" height="${height?height:'30'}px" viewBox="0 0 24 24" width="${width?width:'30'}px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29 2.64-1.8 5.9-.96 7.66 1.1 1.76-2.06 5.02-2.91 7.66-1.1 1.41.96 2.28 2.59 2.34 4.29.14 3.88-3.3 6.99-8.55 11.76l-.1.09z"/></svg>`
    return (
        <View style={styles.container}>
            <SvgXml
                xml={xml} 
            />  
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
