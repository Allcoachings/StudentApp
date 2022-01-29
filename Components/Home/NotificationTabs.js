import React, { useState, useEffect } from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
// import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth, dataLimit,serverBaseUrl, Assets, imageProvider} from '../config'
import { EvilIcons } from '@expo/vector-icons';
import {connect } from 'react-redux'   
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { useSelector } from 'react-redux'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';   
import Notification from './Notification';

const Tab = createMaterialTopTabNavigator();







export default function NotificationTabs({navigation}) {
   
 
 
    return(
        <PageStructure
            iconName={"arrow-left"}
            btnHandler={() => {navigation.goBack()}}
            titleonheader={"Notifications"}
            noNotificationIcon={true}
            navigation={navigation}
            nosearchIcon={true}
        >
           <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: {  color:theme.greyColor },  
                    tabBarIndicatorStyle:{backgroundColor:theme.greyColor} 
                }}
            >
                <Tab.Screen name="Course" component={Notification} />
                <Tab.Screen name="General" component={Notification} />
            </Tab.Navigator>
        </PageStructure>
    )
}

 

// const  mapStateToProps = (state)=>
// {
//     return {
//         screenWidth: state.screen.screenWidth,
//         userInfo:state.user.userInfo,
//     }
// }
// export default connect(mapStateToProps)(SubscriptionNew); 