import React from 'react';
 import { View,StyleSheet,Text } from 'react-native';
import Svg, { Path, SvgXml } from "react-native-svg"

function Icon({height, width}) {


    const xml =`<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="${height?height:'30'}px" viewBox="0 0 24 24" width="${width?width:'30'}px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><path d="M16,9V4l1,0c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H7C6.45,2,6,2.45,6,3v0 c0,0.55,0.45,1,1,1l1,0v5c0,1.66-1.34,3-3,3h0v2h5.97v7l1,1l1-1v-7H19v-2h0C17.34,12,16,10.66,16,9z" fill-rule="evenodd"/></g></svg>`
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
