import React from 'react';
import { Image, Text, View,StyleSheet,ScrollView,FlatList,TouchableOpacity, Modal, TextInput} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {instituteData} from '../../FakeDataService/FakeData'
import { AirbnbRating,Rating } from 'react-native-ratings';
import {theme,screenMobileWidth} from '../config'
import { enrollStudent } from '../Utils/DataHelper/EnrollStudent'
import {connect} from 'react-redux'
import CardView from '../Utils/CardView';
import MarqueeText from 'react-native-marquee';
import { Feather } from '@expo/vector-icons';

class Payment extends React.Component {
    state={
        insId: 1,
        studentId: this.props.user.id,
        courseId: 1
    }


    enrollStudent=() => {
        console.log("function")
        enrollStudent(this.state.studentId, this.state.insId,this.state.courseId, this.enrollCallBack)
    }

    enrollCallBack=(response)=>{
        console.log("callBack")
        if(response.status==201)
        {
            this.props.navigation.navigate("StudentInsView")
        }
    }

    render() {
        return(
            <PageStructure 
                iconName={"arrow-left"}
                btnHandler={() => {this.props.navigation.goBack()}} 
            > 
            <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={()=>this.enrollStudent()} style={{backgroundColor: theme.featureYesColor, padding:10, justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
                    <Text>Transaction Successful</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={null} style={{backgroundColor: theme.featureNoColor, padding:10, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                    <Text>Transaction Failed</Text>
                </TouchableOpacity>
            </View>
            </PageStructure>
        )
    }
}

const  mapStateToProps = (state)=>
{
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(Payment);