import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';  
import InsHome from '../InsHome/InsHome'
import AddTest from '../InsHome/AddTest'
import AddPdf from '../InsHome/AddPdf'
import AddVideo from '../InsHome/AddVideo'
import InsRegister from '../InsRegister/InsRegister'
import {theme} from '../config'
const Drawer = createDrawerNavigator();
class indexIns extends React.Component {
    state = {  }
   
    render() {
        return (
            <>
                <NavigationContainer>
                
                    <Drawer.Navigator initialRouteName="Home"  sceneContainerStyle={{backgroundColor:theme.appBackgroundColor}}>  
                       <Drawer.Screen 
                            name="Home" 
                            component={InsHome} 
                            options={{cardStyle:{backgroundColor:theme.appBackgroundColor} }}/>
                       <Drawer.Screen 
                            name="Register" 
                            component={InsRegister} 
                            options={{cardStyle:{backgroundColor:theme.appBackgroundColor} }}/>
                       <Drawer.Screen 
                            name="AddVideos" 
                            component={AddVideo} 
                            options={{cardStyle:{backgroundColor:theme.appBackgroundColor} }}/>
                       <Drawer.Screen 
                            name="AddTestSeries" 
                            component={AddTest} 
                            options={{cardStyle:{backgroundColor:theme.appBackgroundColor} }}/>
                       <Drawer.Screen 
                            name="AddDocument" 
                            component={AddPdf} 
                            options={{cardStyle:{backgroundColor:theme.appBackgroundColor} }}/>
                       
                        {/* <Drawer.Screen 
                            name="Auth" 
                            component={Auth} 
                            options={{cardStyle:{backgroundColor:theme.appBackgroundColor}}}/>
                        <Drawer.Screen
                            name="Institute" 
                            component={InstituteView} 
                            options={{ cardStyle:{backgroundColor:theme.appBackgroundColor} }}/>
                         <Drawer.Screen
                            name="TestSeries" 
                            component={TestSeries} 
                            options={{ cardStyle:{backgroundColor:theme.appBackgroundColor} }} sceneContainerStyle={{backgroundColor:theme.appBackgroundColor}}/>  
                         <Drawer.Screen
                            name="SingleTestSeries" 
                            component={SingleTestSeries} 
                            options={{ cardStyle:{backgroundColor:theme.appBackgroundColor} }} sceneContainerStyle={{backgroundColor:theme.appBackgroundColor}}/>  
                         <Drawer.Screen
                            name="Subscription" 
                            component={Subscription} 
                            options={{ cardStyle:{backgroundColor:theme.appBackgroundColor} }} sceneContainerStyle={{backgroundColor:theme.appBackgroundColor}}/>   */}
                    </Drawer.Navigator>
                </NavigationContainer> 
            </>
        );
    }
}

export default indexIns;

