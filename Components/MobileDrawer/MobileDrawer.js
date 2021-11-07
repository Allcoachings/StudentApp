import React from 'react';

import { Text,View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';  
import Auth from '../Auth/Auth'
import Home from '../Home/Home'
import{linkingPrefixes, theme} from '../config'
import InstituteView from '../InstituteView/InstituteView';
import Payment from '../InstituteView/Payment';
import Subscription from '../Subscription/Subscription';
import TestSeriesView from '../TestSeriesView/TestSeriesView'
import SeriesList from '../SeriesList/SeriesList'
import InsTestSeriesList from '../InsTestSeriesList/InsTestSeriesList'
import TestSeriesIns from '../TestSeriesIns/TestSeriesIns'
import CategoryList from '../CategoryList/CategoryList'
import Solutions from '../Solutions/Solutions'
import ResultAnalysis from '../ResultAnalysis/ResultAnalysis'
import SubscriptionNew from '../SubscriptionNew/SubscriptionNew'
import Feed from '../Feed/Feed'
import  {DrawerContent}  from './DrawerContent';
import MockTest from '../MockTest/MockTest';
import UserProfile from '../UserProfile/UserProfile';
import Settings from '../Settings/Settings';
import Downloads from '../Downloads/Downloads';
import BottomTab from '../BottomTab';
import PdfViewer from '../PdfViewer/PdfViewer'
import Profile from '../Profile/Profile'
import Notification from '../Home/Notification'
import VideoPlayerCustom from '../VideoPLayer/VideoPlayerCustom';
import AboutCourse from '../AboutCourse/AboutCourse'
import WebViewCustom from '../WebView/WebViewCustom';
import RenderSingleFeed from '../Feed/RenderSingleFeed'
import PinnedList from '../PinnedList/PinnedList' 
// import ReviewAndRatings from '../ReviewAndRatings/ReviewAndRatings';
const Drawer = createDrawerNavigator();


const linkingConfig = {
    screens: {
        Feed: '/feed/:userName',
        Feed:'/discussion/:id',
        Feed:'/query/:id',
        Feed:'/poll/:id', 
        Feed:'/article/:link',
        Feed:"*", 
    },
  };
  
  const linking = {
    prefixes: linkingPrefixes,
    config:linkingConfig,
  };
class index extends React.Component {
    state = {  }
   

    render() {
        return (
                <NavigationContainer>
                
                    {/* <Drawer.Navigator  >
                    </Drawer.Navigator> */}
                    <Drawer.Navigator 
                     
                    drawerContent={props => <DrawerContent {...props} userInfo={this.props.userInfo}/> } > 

                    {this.props.userAuth ?(
                        <>
                            <Drawer.Screen name="Home" component={Home} />  
                            <Drawer.Screen name="Institute"  component={InstituteView} />
                            <Drawer.Screen name="StudentInsView"  component={InstituteView} />
                            <Drawer.Screen name="TestSeries" component={TestSeriesIns}  /> 
                            <Drawer.Screen name="Subscription" component={SubscriptionNew}  /> 
                            <Drawer.Screen name="Feed" component={Feed}  /> 
                            <Drawer.Screen name="Solution" component={Solutions}  /> 
                            <Drawer.Screen name="ResultAnalysis" component={ResultAnalysis}  /> 
                            <Drawer.Screen name="CategoryList" component={CategoryList} /> 
                            <Drawer.Screen name="Category" component={CategoryList} /> 
                            <Drawer.Screen name="EditProfile" component={Profile} />  
                            <Drawer.Screen name="Notification" component={Notification} />   
                            <Drawer.Screen name="AboutCourse" component={AboutCourse} />     
                            {/* <Drawer.Screen name="SingleTestSeries" component={SingleTestSeries} /> */}
                            <Drawer.Screen name="SingleTestSeries" component={TestSeriesView} />
                            <Drawer.Screen name="ViewInsTestSeriesList" component={InsTestSeriesList} /> 
                            <Drawer.Screen name="SeriesList" component={SeriesList} />
                            <Drawer.Screen name="MockTest" component={MockTest} />
                            <Drawer.Screen name="Profile" component={UserProfile} />
                            <Drawer.Screen name="Settings" component={Settings} />
                            <Drawer.Screen name="Downloads" component={Downloads} />
                            <Drawer.Screen name="pdfViewer" component={PdfViewer} /> 
                            <Drawer.Screen name="videoplayer" component={VideoPlayerCustom} />
                            <Drawer.Screen name="Payment" component={Payment} />
                            <Drawer.Screen name="webview" component={WebViewCustom}/>
                            <Drawer.Screen name="RenderSingleFeed" component={RenderSingleFeed} />
                            <Drawer.Screen name="PinnedList" component={PinnedList}/>
                            
                           
                        </>
                    ):(
                        <Drawer.Screen name="Auth" component={Auth} initialParams={{changeMode:this.props.changeMode}} /> 
                    )}
                        
                        {/* <Drawer.Screen 
                            name="Home" 
                            component={Home} 
                            */}
                      {/*   <Drawer.Screen 
                            name="Auth" 
                            component={Auth} 
                            options={{cardStyle:{backgroundColor:theme.appBackgroundColor}}}/>
                        <Drawer.Screen
                            name="Institute" 
                            component={InstituteView} 
                            options={{ cardStyle:{backgroundColor:theme.appBackgroundColor} }}/>
                        <Drawer.Screen 
                            name="Test Series" 
                            component={TestSeriesIns} 
                            options={{cardStyle:{backgroundColor:theme.appBackgroundColor} }}/> */}
                        {/* <Drawer.Screen
                            name="SingleTestSeries" 
                            component={SingleTestSeries} 
                            options={{ cardStyle:{backgroundColor:theme.appBackgroundColor} }} sceneContainerStyle={{backgroundColor:theme.appBackgroundColor}}/>   */}
                        {/* <Drawer.Screen
                            name="Subscription" 
                            component={Subscription} 
                            options={{ cardStyle:{backgroundColor:theme.appBackgroundColor} }} sceneContainerStyle={{backgroundColor:theme.appBackgroundColor}}/>  
                        <Drawer.Screen 
                            name="SingleTestSeries" 
                            component={TestSeriesView} 
                            options={{cardStyle:{backgroundColor:theme.appBackgroundColor} }}/>
                        <Drawer.Screen 
                            name="ViewInsTestSeriesList" 
                            component={InsTestSeriesList} 
                            options={{cardStyle:{backgroundColor:theme.appBackgroundColor} }}/>
                        <Drawer.Screen 
                            name="SeriesList" 
                            component={SeriesList} 
                            options={{cardStyle:{backgroundColor:theme.appBackgroundColor} }}/>
                        <Drawer.Screen 
                            name="CategoryList" 
                            component={CategoryList} 
                            options={{cardStyle:{backgroundColor:theme.appBackgroundColor} }}/>
                        <Drawer.Screen 
                            name="Solutions" 
                            component={Solutions} 
                            options={{cardStyle:{backgroundColor:theme.appBackgroundColor} }}/>
                        <Drawer.Screen 
                            name="ResultAnalysis" 
                            component={ResultAnalysis} 
                            options={{cardStyle:{backgroundColor:theme.appBackgroundColor} }}/>
                        <Drawer.Screen 
                            name="SubscriptionNew" 
                            component={SubscriptionNew} 
                            options={{cardStyle:{backgroundColor:theme.appBackgroundColor} }}/>
                        <Drawer.Screen 
                            name="Feed" 
                            component={Feed} 
                            options={{cardStyle:{backgroundColor:theme.appBackgroundColor} }}/> */}
                    </Drawer.Navigator>
                </NavigationContainer>
        );
    }
}
export default index;

