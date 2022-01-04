import React, { useEffect, useState } from 'react' 

import {  useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabBar from './TabBar'
  

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


const Tab = createBottomTabNavigator();
 
  
function Navigator(props) {

    const [checkingAuth,setCheckingAuth] = useState(true)
    const authStatus =    useSelector(state=>state.user.userAuthStatus)
 
    return (
      // <SafeAreaView>
        <NavigationContainer> 
            <Tab.Navigator screenOptions={{ headerShown: false}}
                 tabBar={props => <TabBar {...props} authStatus={authStatus} />}
            >
                {authStatus?(          
                    <>
                         
                        <Tab.Screen name="Home" component={Home} />  
                        <Tab.Screen name="Institute"  component={InstituteView} />
                        <Tab.Screen name="StudentInsView"  component={InstituteView} />
                        <Tab.Screen name="TestSeries" component={TestSeriesIns}  /> 
                        <Tab.Screen name="Subscription" component={SubscriptionNew}  /> 
                        <Tab.Screen name="Feed" component={Feed}  /> 
                        <Tab.Screen name="Solution" component={Solutions}  /> 
                        <Tab.Screen name="ResultAnalysis" component={ResultAnalysis}  /> 
                        <Tab.Screen name="CategoryList" component={CategoryList} /> 
                        <Tab.Screen name="Category" component={CategoryList} /> 
                        <Tab.Screen name="EditProfile" component={Profile} />  
                        <Tab.Screen name="Notification" component={Notification} />   
                        <Tab.Screen name="AboutCourse" component={AboutCourse} />     
                        <Tab.Screen name="SingleTestSeries" component={TestSeriesView} />
                        <Tab.Screen name="ViewInsTestSeriesList" component={InsTestSeriesList} /> 
                        <Tab.Screen name="SeriesList" component={SeriesList} />
                        <Tab.Screen name="MockTest" component={MockTest} />
                        <Tab.Screen name="Profile" component={UserProfile} />
                        <Tab.Screen name="Settings" component={Settings} />
                        <Tab.Screen name="Downloads" component={Downloads} />
                        <Tab.Screen name="pdfViewer" component={PdfViewer} /> 
                        <Tab.Screen name="videoplayer" component={VideoPlayerCustom} />
                        <Tab.Screen name="Payment" component={Payment} />
                        <Tab.Screen name="webview" component={WebViewCustom}/>
                        <Tab.Screen name="RenderSingleFeed" component={RenderSingleFeed} />
                        <Tab.Screen name="PinnedList" component={PinnedList}/> 
                        <Tab.Screen name="ExamCategory" component={ExamCategory} /> 
                    </>
                ):(
                    <Tab.Screen  name="Auth" component={Auth} initialParams={{changeMode:props.changeMode}} /> 
                )} 
            </Tab.Navigator> 
        </NavigationContainer>
        // {/* </SafeAreaView> */}
    )
}

export default Navigator
