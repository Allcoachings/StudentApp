import React, { useEffect, useState } from 'react' 

import {  useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabBar from './TabBar'
import { createStackNavigator } from '@react-navigation/stack';


import Home from './Home/Home'
import InstituteView from './InstituteView/InstituteView';
import Payment from './InstituteView/Payment';
import Subscription from './Subscription/Subscription';
import TestSeriesView from './TestSeriesView/TestSeriesView'
import SeriesList from './SeriesList/SeriesList'
import InsTestSeriesList from './InsTestSeriesList/InsTestSeriesList'
import TestSeriesIns from './TestSeriesIns/TestSeriesIns'
import CategoryList from './CategoryList/CategoryList'
import Solutions from './Solutions/Solutions'
import ResultAnalysis from './ResultAnalysis/ResultAnalysis'
import SubscriptionNew from './SubscriptionNew/SubscriptionNew'
import Feed from './Feed/Feed' 
import MockTest from './MockTest/MockTest';
import ExamCategory from './ExamCategory/ExamCategory'
import UserProfile from './UserProfile/UserProfile';
import Settings from './Settings/Settings';
import Downloads from './Downloads/Downloads'; 
import PdfViewer from './PdfViewer/PdfViewer'
import Profile from './Profile/Profile'
import Notification from './Home/Notification'
import VideoPlayerCustom from './VideoPLayer/VideoPlayerCustom';
import AboutCourse from './AboutCourse/AboutCourse'
import WebViewCustom from './WebView/WebViewCustom';
import RenderSingleFeed from './Feed/RenderSingleFeed'
import PinnedList from './PinnedList/PinnedList' 
import Auth from './Auth/Auth';
import Enrollments from './UserProfile/Enrollments';
import UserCommunityPosts from './UserProfile/UserCommunityPosts';
import SubscriptionTabs from './SubscriptionNew/SubscriptionTabs';
import SubCategoryList from './InsTestSeriesList/SubCategoryList';
import HeaderMobile from './StructuralComponents/Header/HeaderMobile';
import { View } from 'react-native';
import NotificationTabs from './Home/NotificationTabs';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function StackNavigation(authStatus) {
    return (
      <Stack.Navigator
      screenOptions={{ headerShown: false}}
      >
         {authStatus?(          
                        <>
                            
                            
                            <Stack.Screen name="Home" component={tabNavigator} />  
                            <Stack.Screen name="Institute"  component={InstituteView} />
                            <Stack.Screen name="StudentInsView"  component={InstituteView} />
                            <Stack.Screen name="TestSeries" component={TestSeriesIns}  /> 
                            <Stack.Screen name="Subscription" component={SubscriptionTabs}  /> 
                            <Stack.Screen name="Feed" component={Feed}  /> 
                            <Stack.Screen name="Solution" component={Solutions}  /> 
                            <Stack.Screen name="ResultAnalysis" component={ResultAnalysis}  /> 
                            <Stack.Screen name="CategoryList" component={CategoryList} /> 
                            <Stack.Screen name="Category" component={CategoryList} /> 
                            <Stack.Screen name="EditProfile" component={Profile} />  
                            <Stack.Screen name="Notification" component={NotificationTabs} />   
                            <Stack.Screen name="AboutCourse" component={AboutCourse} />     
                            <Stack.Screen name="SingleTestSeries" component={TestSeriesView} />
                            <Stack.Screen name="ViewInsTestSeriesList" component={InsTestSeriesList} /> 
                            <Stack.Screen name="SeriesList" component={SeriesList} />
                            <Stack.Screen name="MockTest" component={MockTest} />
                            <Stack.Screen name="Profile" component={UserProfile} />
                            <Stack.Screen name="Settings" component={Settings} />
                            <Stack.Screen name="Downloads" component={Downloads} />
                            <Stack.Screen name="pdfViewer" component={PdfViewer} /> 
                            <Stack.Screen name="videoplayer" component={VideoPlayerCustom} />
                            <Stack.Screen name="Payment" component={Payment} />
                            <Stack.Screen name="webview" component={WebViewCustom}/>
                            <Stack.Screen name="RenderSingleFeed" component={RenderSingleFeed} />
                            <Stack.Screen name="PinnedList" component={PinnedList}/> 
                            <Stack.Screen name="Enrollments" component={Enrollments}/> 
                            <Stack.Screen name="UserCommunityPosts" component={UserCommunityPosts}/> 
                            <Stack.Screen name="ExamCategory" component={ExamCategory} />
                            <Stack.Screen name="AdminTestSubCategoryList" component={SubCategoryList} /> 
                        </>
                    ):(
                        <Stack.Screen  name="Auth" component={Auth}   /> 
                    )} 
      </Stack.Navigator>
    );
  }


function tabNavigator(){
    const authStatus =    useSelector(state=>state.user.userAuthStatus)
   return( <Tab.Navigator screenOptions={{ headerShown: false}}
                    tabBar={props => <TabBar {...props} authStatus={authStatus} />}
            >        
                <Tab.Screen name="Home" component={Home} />  
                <Tab.Screen name="TestSeries" component={TestSeriesIns}  /> 
                <Tab.Screen name="Subscription" component={SubscriptionTabs}  /> 
                <Tab.Screen name="Feed" component={Feed}  /> 
                <Tab.Screen name="SeriesList" component={SeriesList} />
                <Tab.Screen name="ViewInsTestSeriesList" component={InsTestSeriesList} /> 
            </Tab.Navigator>
        )
}
function Navigator(props) {

    const [checkingAuth,setCheckingAuth] = useState(true)
    const authStatus =    useSelector(state=>state.user.userAuthStatus)
    const headerProps = useSelector(state=>state.header.props)
    const isHeaderVisible = useSelector(state=>state.header.isHeaderVisible)
    // console.log("isHeaderVisible ",isHeaderVisible)
    return (
      // <SafeAreaView>
        <>
        {headerProps&&isHeaderVisible&&authStatus?(
            <View style={{height:35}}>
                <HeaderMobile 
                    // iconName={this.props.iconName}
                    // titleonheader={this.props.titleonheader} 
                    // replaceHeader={this.props.replaceHeader} 
                    // headerComponent={this.props.headerComponent} 
                    // btnHandler={this.props.btnHandler} 
                    // notificationreplaceshare={this.props.notificationreplaceshare} 
                    // rightIconOnPress={this.props.rightIconOnPress}
                    // nosearchIcon={this.props.nosearchIcon}
                    // noNotificationIcon={this.props.noNotificationIcon}
                    // searchFun={this.props.searchFun}
                    // singleItem={this.props.singleItem}
                    // catInHeader={this.props.catInHeader}
                    // selectedCat={this.props.selectedCat}
                    // titleWithImage={this.props.titleWithImage}
                    // userIcon={this.props.userIcon}
                    // pinIconName={this.props.pinIconName}
                    // pinUnpinIcon={this.props.pinUnpinIcon}
                    // searchReplace={this.props.searchReplace}
                    // showShareIcon={this.props.showShareIcon}
                    // pinUnpinFunction={this.props.pinUnpinFunction}
                    // showTitle={this.props.showTitle}
                        {...headerProps}
                />
            </View>

        ):(null)}
            
            <NavigationContainer> 




                {StackNavigation(authStatus)}
                 
            </NavigationContainer>
        </>
        // {/* </SafeAreaView> */}
    )
}

export default Navigator
