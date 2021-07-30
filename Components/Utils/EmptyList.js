import React from 'react';
import { Image,Text,StyleSheet,View } from 'react-native'; 

class EmptyList extends React.Component {
    state = {  }
    render() {
        return (
            <View style={styles.container}> 
                <Text style={{fontSize: 18}}>No Data Available</Text>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: { 
        justifyContent:'center',
        alignItems: 'center', 
        flex:1,
        flexDirection:'row',
        flexGrow:1
    },
        image:
        {
            margin:'10%',
            width:200,
            height:200,
        }
}) 
export default EmptyList;