import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions} from 'react-native';
import { theme, dataLimit, serverBaseUrl } from '../config';
import { Entypo } from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import BlinkView from 'react-native-blink-view'

class RenderLiveClass extends React.Component {
    state = {
        
    }

    render(){
        return( 
            <View style={styles.classContainer}>
                <View style={{ flex: 0.35}}>
                    <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.classImage}/>
                </View>
                <View style={{flexDirection: 'column', flexShrink: 1, flex: 0.7, marginLeft: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.classTitle}>Class Name</Text>
                    </View>
                    <View>
                        <Text style={styles.classText}>Institute Name</Text>
                    </View>
                    <View>
                        <Text style={styles.classText}>300 Aug 01 2021</Text>
                    </View>
                    <View stle={{justifyContent: 'flex-end', marginTop: 20}}>
                        <Text>10s remaining</Text>
                    </View>
                </View>
                <View>
                    <BlinkView blinking={true} delay={500}>
                        <Entypo name="dot-single" size={50} color="red" />
                    </BlinkView>
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    classContainer:
    {
        flex: 1,
        // marginTop: 10,
        marginLeft: 10,
        flexDirection: 'row',
        // borderWidth: 1
    },
        classImage:
        {
            height: 90,
            width:  100,
            borderRadius: 10,
            marginRight: 10
        },
        classTitle:
        {
            // flex: 1, 
            // flexWrap: 'wrap',
            flexShrink: 1,
            fontWeight: '700',
            
        },
        classText:
        {
            color: theme.secondaryColor,
        },
  

})

export default RenderLiveClass;