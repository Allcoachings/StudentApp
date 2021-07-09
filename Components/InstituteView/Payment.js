import React from 'react';
import { Image, Text, View,StyleSheet,ScrollView,FlatList,TouchableOpacity, Modal, TextInput} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {instituteData} from '../../FakeDataService/FakeData'
import { AirbnbRating,Rating } from 'react-native-ratings';
import {theme,screenMobileWidth} from '../config'
import CardView from '../Utils/CardView';
import MarqueeText from 'react-native-marquee';
import { Feather } from '@expo/vector-icons';

class Payment extends React.Component {
    state={}
    render() {
        return(
            <PageStructure 
                iconName={"arrow-left"}
                btnHandler={() => {this.props.navigation.goBack()}} 
            > 
            <View style={}>

            </View>
            </PageStructure>
        )
    }
}