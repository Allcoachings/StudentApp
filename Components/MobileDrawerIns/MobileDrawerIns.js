import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';  
import InsHome from '../InsHome/InsHome'
import AddTest from '../InsHome/AddTest'
import AddPdf from '../InsHome/AddPdf'
import AddVideo from '../InsHome/AddVideo'
import AddTimeTable from '../InsHome/AddTimeTable'
import InsRegister from '../InsRegister/InsRegister'
import Leads from '../Leads/Leads'
import {theme} from '../config'
import  {DrawerContent}  from './DrawerContent';
import PdfViewer from '../PdfViewer/PdfViewer'
import VideoPlayerCustom from '../VideoPLayer/VideoPlayerCustom';
const Drawer = createDrawerNavigator();
class indexIns extends React.Component {
    state = {  }
   
    render() {
        return (
            <>
                <NavigationContainer>
                
                <Drawer.Navigator drawerContent={props => <DrawerContent {...props} /> } > 
                       {this.props.insAuth?(
                            <>
                                <Drawer.Screen name="Home" component={InsHome} />  
                                <Drawer.Screen name="AddVideos" component={AddVideo}  /> 
                                <Drawer.Screen name="AddDocument" component={AddPdf}  /> 
                                <Drawer.Screen name="AddTimeTable" component={AddTimeTable}  /> 
                                <Drawer.Screen name="AddTestSeries" component={AddTest}  /> 
                                <Drawer.Screen name="Leads" component={Leads}  />
                                <Drawer.Screen name="pdfViewer" component={PdfViewer} /> 
                                <Drawer.Screen name="videoplayer" component={VideoPlayerCustom} />
                                <Drawer.Screen name="Register" component={InsRegister}  /> 
                            </>
                       ):(
                                <Drawer.Screen name="Register" component={InsRegister}  />    
                       )}
                        
                       
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

