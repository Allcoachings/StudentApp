import React from 'react';
 import { View,StyleSheet,Text } from 'react-native';
import Svg, { Path, SvgXml } from "react-native-svg"

function Icon({height, width}) {


    const xml =`<svg xmlns="http://www.w3.org/2000/svg" height="${height?height:'30'}px" viewBox="0 0 24 24" width="${width?width:'30'}px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z"/></svg>`
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
