import React, { useEffect, useState } from 'react'
import { StyleSheet,View,Text,TouchableOpacity,Image, TouchableWithoutFeedback,Dimensions } from 'react-native'
// import Icon from 'react-native-vector-icons/dist/Feather';
import { useSelector } from 'react-redux';

import Home_Filled from './Utils/Icons/Home_Filled'; 
import HomeIcon_Outline from './Utils/Icons/Home_Outline';
import Black_Book_Filled from './Utils/Icons/Black_Book_Filled'; 
import Black_Book_Outline from './Utils/Icons/Black_Book_Outline';
import Supervised_person_Filled from './Utils/Icons/Supervised_person_Filled'; 
import Supervised_person_Outline from './Utils/Icons/Supervised_person_Outline';
import Favorite_Filled from './Utils/Icons/Favorite_Filled'; 
import Favorite_Outline from './Utils/Icons/Favorite_Outline';
import CardView from './Utils/CardView';
 
 
const height = Dimensions.get('window').height;
export default function TabBar({authStatus,navigation}) {
  
    
   const [activeTab,setActiveTab] = useState('Home')

    //creating single generic  tab item structure
    const renderTabItem =  (ActiveIcon,InactiveIcon, label ,fun) =>
    {
        return(
                <TouchableWithoutFeedback onPress={()=>tabItemClickHandler(label,fun)}>
                        <View style={{justifyContent: 'space-between',padding:10,alignItems: 'center'}}> 
                            {activeTab==label?(
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
        console.log('tabItemClickHandler')
            setActiveTab(label)
            fun();
    }

    return (
        authStatus?(

        CardView(    
            <View style={[{display:'flex',flexDirection: 'row',justifyContent: 'space-between', paddingBottom:15,margin:10}]}>
                <View>
                    {renderTabItem(<Home_Filled/>,<HomeIcon_Outline/>,"Home",()=>navigation.navigate("Home"))}
                </View>
                <View>
                    {renderTabItem(<Black_Book_Filled/>,<Black_Book_Outline/>,"TestSeries",()=>navigation.navigate("TestSeries"))}
                </View>
                <View>
                    {renderTabItem(<Favorite_Filled/>,<Favorite_Outline/>,"Followings",()=>navigation.navigate("Subscription"))}
                </View>
                <View>
                    {renderTabItem(<Supervised_person_Filled/>,<Supervised_person_Outline/>,"Feed",()=>navigation.navigate("Feed"))}
                </View>
            </View>,{width:'100%'}
        )
        ):(null)
    )
}

 