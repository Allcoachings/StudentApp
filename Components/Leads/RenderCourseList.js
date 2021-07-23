import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { theme } from '../config';
import { Feather } from '@expo/vector-icons';
import { feedData } from '../../FakeDataService/FakeData' 
import {connect } from 'react-redux'
import CardView from '../Utils/CardView';
import Accordian from '../Utils/Accordian'
const width = Dimensions.get('window').width

class RenderCourseList extends React.Component {
    state={
        studentList:[
            {
                id: '1',
                name: 'Rashika Khatri',
                username: '@rashi',
                image: 'https://dubuddy.in/userAvatar'
            },
            {
                id: '2',
                name: 'Rashika Khatri',
                username: '@rashi',
                image: 'https://dubuddy.in/userAvatar'
            },
            {
                id: '3',
                name: 'Rashika Khatri',
                username: '@rashi',
                image: 'https://dubuddy.in/userAvatar'
            },
            {
                id: '4',
                name: 'Rashika Khatri',
                username: '@rashi',
                image: 'https://dubuddy.in/userAvatar'
            },
            {
                id: '5',
                name: 'Rashika Khatri',
                username: '@rashi',
                image: 'https://dubuddy.in/userAvatar'
            },
        ]
    }

    accordianHeader = () =>
    {
        return(
            <View style={styles.corsePriceView}>
                <Text style={styles.courseText}>{this.props.item.name}</Text>
                <Text style={styles.coursePriceText}>{this.props.item.price}</Text>
            </View>
        )
    }

    studentList=({item})=>{
        
        return(
            CardView(<View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginHorizontal: 10}}>
                    <Image source={{uri: item.image}} style={{height: 50, width:50, borderRadius: 25}} />
                </View>
                <View style={{display: 'flex', flexDirection: 'column', marginHorizontal: 10}}>
                    <Text>{item.name}</Text>
                    <Text>{item.username}</Text>
                </View>
            </View>, {marginVertical: 10, padding:5}
            )
        )
    }

    render() {
        return(    
            <Accordian header={this.accordianHeader()}>
                <FlatList 
                    data={this.state.studentList} 
                    renderItem={this.studentList}
                    keyExtractor={(item)=>item.id} 
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                />
            </Accordian>
        )
    }
}

const styles = StyleSheet.create({
    corsePriceView:
    {
        display: 'flex',
        width: width-10,
        flexDirection: 'row',
        backgroundColor: theme.blueColor+"0D",
        borderRadius: 5,
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 15,
        marginBottom: 10
    },
        courseText:
        {
            color: theme.blueColor,
            fontSize: 20,
        },
        coursePriceText:
        {
            fontSize: 20,
            color: theme.greyColor,
        }
})

export default RenderCourseList