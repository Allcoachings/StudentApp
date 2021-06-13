import React from 'react';

import { Text,View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';  
import Auth from '../Auth/Auth'
import Home from '../Home/Home'
import{theme} from '../config'
import InstituteView from '../InstituteView/InstituteView';
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

// import ReviewAndRatings from '../ReviewAndRatings/ReviewAndRatings';
const Drawer = createDrawerNavigator();
class index extends React.Component {
    state = {  }
   
    render() {
        return (
                <NavigationContainer>
                
                    <Drawer.Navigator initialRouteName="Home"  sceneContainerStyle={{backgroundColor:theme.appBackgroundColor}}>  
                        <Drawer.Screen 
                            name="Home" 
                            component={Home} 
                            options={{cardStyle:{backgroundColor:theme.appBackgroundColor} }}/>
                        <Drawer.Screen 
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
                            options={{cardStyle:{backgroundColor:theme.appBackgroundColor} }}/>
                        {/* <Drawer.Screen
                            name="SingleTestSeries" 
                            component={SingleTestSeries} 
                            options={{ cardStyle:{backgroundColor:theme.appBackgroundColor} }} sceneContainerStyle={{backgroundColor:theme.appBackgroundColor}}/>   */}
                        <Drawer.Screen
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
                            options={{cardStyle:{backgroundColor:theme.appBackgroundColor} }}/>
                    </Drawer.Navigator>
                </NavigationContainer>
        );
    }
}
export default index;

