import React, { useState, useEffect } from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
// import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth, dataLimit,serverBaseUrl, Assets, imageProvider} from '../config'
import { EvilIcons } from '@expo/vector-icons';
import {connect } from 'react-redux'
import {subscriptionNew} from '../../FakeDataService/FakeData'
import CardView from '../Utils/CardView'
import { AirbnbRating } from 'react-native-ratings';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { fetchSubscribedInstituteList } from '../Utils/DataHelper/Subscription'
import RenderSingleSubsInstitute from './RenderSingleSubsInstitute'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import { useSelector } from 'react-redux'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'; 
import Enrollments from '../UserProfile/Enrollments';
import SubscriptionNew from './SubscriptionNew';
import EnrollmentsTab from './EnrollmentsTab';
const Tab = createMaterialTopTabNavigator();







export default function SubscriptionTabs(props) {
   
 
 
    return(
        <PageStructure
            // iconName={"arrow-left"}
            // btnHandler={() => {props.navigation.goBack()}}
            // titleonheader={"Subscription"}
            nosearchIcon={false} 
            userIcon={() => {props.navigation.navigate("Profile")}}
            // catInHeader={true}
            // catOnpress={toggleCatMode}
            // selectedCat={state.selectedCat}
            rightIconOnPress={() =>props.navigation.navigate("Notification")}
            // scrollMode={'scroll'}
            navigation={props.navigation}
            // searchFun={search}
            titleWithImage={true}
            noNotificationIcon={false}
            titleonheader={"All Coaching"}
            // singleItem={renderInstituteList}
        >
           <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: {  color:theme.greyColor },  
                    tabBarIndicatorStyle:{backgroundColor:theme.greyColor}
                }}
            >
                
                <Tab.Screen name="Followings" component={SubscriptionNew} />
                <Tab.Screen name="Enrollments" component={EnrollmentsTab} />
            </Tab.Navigator>
        </PageStructure>
    )
}

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        flexDirection: 'column',
        padding:10,
    },
        headView:
        {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '5%'
        },
            headText:
            {
                fontSize: 24,
                fontWeight: 'bold'
            },
        instituteheader:
        {
            flexDirection:'row',
            flex:0.2
        },
            logoCard:
            { 
                flexWrap:'wrap',
                
            }, 
                instituteheaderLogo:
                {
                    width:"100%",
                    height:"100%",
                    borderRadius:15,
                },  
            instituteheaderMeta:
            {
                flex:1,
                flexDirection:'column',
                marginLeft:'5%',
                marginRight:'5%'
            },
                instituteheaderText:
                {
                    flex:1,
                    flexWrap:'wrap',
                    fontWeight: 'bold',
                    fontSize:16,

                },  
                instituteDirector:
                {
                    color:theme.accentColor,
                    fontWeight:'bold',
                    fontSize:12,
                },
                instituteRatingView:
                {
                    flex:1,
                    flexDirection:'row',
                    alignItems: 'center'
                    // justifyContent: 'center'    
                },
                    instituteRating:
                    {
                        alignSelf:'flex-start',
                        marginRight:10,
                    },
                    voteCount:
                    {
                        fontWeight:'bold',

                    },
                followerView:
                {
                    backgroundColor: theme.primaryColor,
                    borderColor: theme.labelOrInactiveColor, 
                    borderWidth:1,
                    padding: 5,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                    follower:
                    {
                        color: theme.blueColor, 
                        fontWeight: 'bold',
                        fontSize: 16
                    }

})

// const  mapStateToProps = (state)=>
// {
//     return {
//         screenWidth: state.screen.screenWidth,
//         userInfo:state.user.userInfo,
//     }
// }
// export default connect(mapStateToProps)(SubscriptionNew); 