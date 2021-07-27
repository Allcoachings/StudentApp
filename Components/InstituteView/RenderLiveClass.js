import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions} from 'react-native';
import { theme, dataLimit, serverBaseUrl } from '../config';
import { Feather } from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'

class RenderLiveClass extends React.Component {
    state = {
        
    }

    render(){
        return( 
            <View style={styles.classContainer}>
                <View>
                    <Image source={this.props.item.image} style={styles.classImage}/>
                </View>
                <View style={{flexShrink: 1}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.classTitle}>{this.props.item.title}</Text>
                    </View>
                    <View>
                        <Text style={styles.classText}>{this.props.item.institute}</Text>
                    </View>
                    <View>
                        <Text style={styles.classText}>{this.props.item.Views} {this.props.item.date}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    classContainer:
    {
        marginTop: 10,
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center'
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