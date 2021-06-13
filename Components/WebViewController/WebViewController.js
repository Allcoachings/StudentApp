import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";  
import Auth from '../Auth/Auth'; 
import Home from '../Home/Home'
import { View } from 'react-native';
import InstituteView from '../InstituteView/InstituteView';
import TestSeries from '../TestSeries/TestSeries';
class WebViewController extends React.Component {
    state = {  }



    componentSwitch = () =>
    {
        
        /* Define routes here   
           ==> <Route path="/profile">
                    <Profile/>
                </Route> 
        */


        /* syntax for defining route with props 
           ==>      <Route path="/project/:id" render={(props)=>(<ProjectDetail {...props}/>)}/>  
        */

        return (
            <Switch>
                 
                <Route path="/auth" >
                    <Auth/>
                </Route>
                <Route path="/institute/:id">
                    <InstituteView/>
                </Route>
                <Route path="/testseries">
                    <TestSeries/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route> 
                 
               
            </Switch>
        )
    }
    render() {
        return (
            <Router>
                <View>
                    {this.props.userAuth?
                    (
                        null
                    ):(

                        <Redirect to="/auth"/>
                    )}
                    <>
                            {/* left navbar should be added here if required for web */}
                            {/* <View style={styles.leftNav}>
                                <LeftNavDrawer/>
                            </View> */}
                            <View>
                                {this.componentSwitch()}
                            </View>
                        </>
                </View>
            </Router>
        );
    }
}

export default WebViewController;