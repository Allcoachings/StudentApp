import React, { useEffect, useState } from 'react'
import { StyleSheet,View,Text,TouchableOpacity,Image, TouchableWithoutFeedback,Dimensions } from 'react-native'
// import Icon from 'react-native-vector-icons/dist/Feather';
import { useDispatch, useSelector } from 'react-redux';

import Home_Filled from './Utils/Icons/Home_Filled'; 
import HomeIcon_Outline from './Utils/Icons/Home_Outline';
import Black_Book_Filled from './Utils/Icons/Black_Book_Filled'; 
import Black_Book_Outline from './Utils/Icons/Black_Book_Outline';
import Supervised_person_Filled from './Utils/Icons/Supervised_person_Filled'; 
import Supervised_person_Outline from './Utils/Icons/Supervised_person_Outline';
import Favorite_Filled from './Utils/Icons/Favorite_Filled'; 
import Favorite_Outline from './Utils/Icons/Favorite_Outline';
import CardView from './Utils/CardView';
import { SET_NAVIGATION } from './Actions/types';
 
 
const height = Dimensions.get('window').height;
export default function TabBar({authStatus,navigation}) {
    const navState = navigation.getState()
    // // console.log("navigation.state",)
    const activeScreen = navState.routeNames[navState.index]
    // const TabScreens = ['Home','TestSeries','Subscription','Feed','SeriesList','ViewInsTestSeriesList',]
    const [activeTab,setActiveTab] = useState('Home')
    const dispatch = useDispatch()
    console.log(activeScreen," activeScreen")


    useEffect(() =>{
        dispatch({type:SET_NAVIGATION,payload:{navigation}})
    },[])


    //creating single generic  tab item structure
    const renderTabItem =  (ActiveIcon,InactiveIcon, label,key ,fun) =>
    {
        return(
                <TouchableWithoutFeedback onPress={()=>tabItemClickHandler(label,fun)}>
                        <View style={{justifyContent: 'space-between',padding:10,alignItems: 'center'}}> 
                            {activeScreen==key?(
                                ActiveIcon
                            ):(
                                InactiveIcon
                            )} 
                        </View>
                </TouchableWithoutFeedback>
        )
    }


    const tabItemClickHandler = (label,fun)=>
    {
        // // console.log('tabItemClickHandler')
            setActiveTab(label)
            fun();
    }

    return (
        // authStatus&&TabScreens.includes(activeScreen)?(

        CardView(    
            <View style={[{display:'flex',flexDirection: 'row',justifyContent: 'space-between', paddingBottom:15,margin:10}]}>
                <View>
                    {renderTabItem(<Home_Filled/>,<HomeIcon_Outline/>,"Home","Home",()=>navigation.navigate("Home"))}
                </View>
                <View>
                    {renderTabItem(<Black_Book_Filled/>,<Black_Book_Outline/>,"TestSeries","TestSeries",()=>navigation.navigate("TestSeries"))}
                </View>
                <View>
                    {renderTabItem(<Favorite_Filled/>,<Favorite_Outline/>,"Followings","Subscription",()=>navigation.navigate("Subscription"))}
                </View>
                <View>
                    {renderTabItem(<Supervised_person_Filled/>,<Supervised_person_Outline/>,"Feed","Feed",()=>navigation.navigate("Feed"))}
                </View>
            </View>,{width:'100%'}
        )
        // ):(null)
    )
}

 