import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions, ActivityIndicator} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { theme, dataLimit, Assets, serverBaseUrl } from '../config';
import { Feather } from '@expo/vector-icons';
import { feedData } from '../../FakeDataService/FakeData' 
import {connect } from 'react-redux'
import CardView from '../Utils/CardView';
import Accordian from '../Utils/Accordian'
import { fetchStudentList } from '../Utils/DataHelper/Leads'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
const width = Dimensions.get('window').width

class RenderCourseList extends React.Component {
    state={
        loading: false,
        offset: 0,
        studentList:[],
    }

    studentListCallBack=(response)=>{
        if(response.status==200)
        {
            console.log("success student list")
            response.json().then(data=>
            {

                this.setState({studentList: data, loading: false})
            })
        }
        else
        {
            console.log("something went wrong")
        }
    }

    accordianHeader = () =>
    {
        return(
            
            <View style={styles.corsePriceView}>
                <Text style={styles.courseText}>{this.props.item.courseName}</Text>
                <Text style={styles.coursePriceText}>{this.props.item.leads}</Text>
            </View>
        )
    }

    studentList=({item})=>{

        return(
            CardView(
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{marginHorizontal: 10}}>
                        <Image source={{uri: serverBaseUrl+item.studentImage}} style={{height: 50, width:50, borderRadius: 25}} />
                    </View>
                    <View style={{display: 'flex', flexDirection: 'column', marginHorizontal: 10}}>
                        <Text>{item.studentName}</Text>
                        <Text>{item.studentUniqueId}</Text>
                    </View>
                </View>, {padding:5, marginVertical: 10}
            )
        )
    }

    fetchCourseStudent=()=>{
        this.setState({loading: true},()=>fetchStudentList(this.props.item.courseId, this.state.offset, dataLimit, this.studentListCallBack))
    }

    render() {
        return(    
            <Accordian header={this.accordianHeader()} onPress={this.fetchCourseStudent}>
                {this.state.loading?(
                    <CustomActivtiyIndicator mode="skimmer"/>
                ):(
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <FlatList 
                        data={this.state.studentList} 
                        renderItem={(item)=>{console.log(item);return this.studentList(item)}}
                        keyExtractor={(item)=>item.id} 
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                    />
                    </View> 
                )}
            </Accordian>
        )
    }
}

const styles = StyleSheet.create({
    corsePriceView:
    { 
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme.blueColor+"0D",
        width: width-width*0.15,
        marginVertical: 5,
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 5
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