import React from 'react';
 import { View,StyleSheet,Text } from 'react-native';
import Svg, { Path, SvgXml } from "react-native-svg"

function HomeIcon_Outline({width,height}) {


    const xml =`<svg xmlns="http://www.w3.org/2000/svg" height="${height?height:'30'}px" viewBox="0 0 24 24" width="${width?width:'30'}px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg>`
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
export default HomeIcon_Outline
