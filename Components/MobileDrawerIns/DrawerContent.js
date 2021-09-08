import React from 'react';
import { View, StyleSheet,TouchableOpacity } from 'react-native';
import { theme, serverBaseUrl } from '../config';
import {Text, Switch, Avatar, Title, Caption, Paragraph, Drawer, TouchableRipple} from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { Octicons, Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { SET_INSTITUTE_AUTH } from '../Actions/types';
const renderDrawerItem=(label,icon,onPress)=>
{
    return (
        <TouchableOpacity style={{flexDirection: 'row',padding:10,margin:10,marginBottom:0,alignItems: 'center'}} onPress={onPress}>
            <View style={{backgroundColor: theme.labelOrInactiveColor,borderRadius:30,padding:9}}>
              <Feather name={icon} size={20}/>
            </View>
            <Text style={{marginLeft:10,fontSize:15}}>{label}</Text>
            {label=='Settings'?(<Feather name="chevron-right" size={20} style={{marginLeft:'auto',alignSelf:'flex-end'}}/>):(null)}
            {label=='Notification'?(<Feather name="chevron-down" size={20} style={{marginLeft:'auto',alignSelf:'flex-end'}}/>):(null)}
            
        </TouchableOpacity>
    )
}
export function DrawerContent(props){
    const dispatch = useDispatch();
    const userLogoutButton =()=>
    {
         props.navigation.closeDrawer();
        AsyncStorage.clear().then(()=>{
            dispatch({type:SET_INSTITUTE_AUTH,payload:{authStatus:false}})
        })
    }
    return(
        <View style={{flex: 1, width: '100%'}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>

                        <View style={{marginTop: '5%' ,marginRight: 10,}}>
                            <Avatar.Image source={{ uri: serverBaseUrl+props.institute.details.logo }}  size={80}/>
                        </View>
                        <View style={styles.userNameSec}>
                            <Title numberOfLines={2} style={{fontFamily: 'Raleway_600SemiBold'}}>{props.institute.details.name}</Title>
                        </View>
                    </View>
                    <Drawer.Section>
                      
                        {renderDrawerItem('Home','user',()=>props.navigation.navigate("Home"))}
                        {/* <DrawerItem
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Account Details"
                            onPress={()=>{props.navigation.navigate("accountDetails")}}
                            style={{borderBottomWidth: 0.2, borderColor: theme.greyColor}}
                        /> */}
                     {renderDrawerItem("Account Details",'user',()=>props.navigation.navigate("accountDetails",{mode: "institute"}))}
                        {renderDrawerItem('Notification','user',props.changeNotificationType)}
                        {props.showNotificationType?( 
                            <View style={{marginLeft:20}}>
                                  
                                        <TouchableOpacity style={{flexDirection: 'row',padding:10,margin:10,marginBottom:0,alignItems: 'center'}} onPress={()=>{props.navigation.navigate("Notification",{mode: 'institute', type:"all"})}}>
             
                                             <Text style={{marginLeft:10,fontSize:15}}>{'All'}</Text>
                                             <Feather name="chevron-right" size={20} style={{marginLeft:'auto',alignSelf:'flex-end'}}/>
             
            
                                         </TouchableOpacity>
                                         <TouchableOpacity style={{flexDirection: 'row',padding:10,margin:10,marginBottom:0,alignItems: 'center'}} onPress={()=>{props.navigation.navigate("Notification",{mode: 'institute', type:"social"})}}>
             
                                            <Text style={{marginLeft:10,fontSize:15}}>{'Social'}</Text>
                                            <Feather name="chevron-right" size={20} style={{marginLeft:'auto',alignSelf:'flex-end'}}/>
                                        </TouchableOpacity>
                                       <TouchableOpacity style={{flexDirection: 'row',padding:10,margin:10,marginBottom:0,alignItems: 'center'}} onPress={()=>{props.navigation.navigate("Notification",{mode: 'institute', type:"transactional"})}}>
                                            <Text style={{marginLeft:10,fontSize:15}}>{'Transactional'}</Text>
                                          <Feather name="chevron-right" size={20} style={{marginLeft:'auto',alignSelf:'flex-end'}}/>
                                       </TouchableOpacity>
                                       <TouchableOpacity style={{flexDirection: 'row',padding:10,margin:10,marginBottom:0,alignItems: 'center'}} onPress={()=>{props.navigation.navigate("Notification",{mode: 'institute', type:"rating"})}}>
                                           <Text style={{marginLeft:10,fontSize:15}}>{'Ratings'}</Text>
                                          <Feather name="chevron-right" size={20} style={{marginLeft:'auto',alignSelf:'flex-end'}}/> 
                                      </TouchableOpacity>
                                       
                                    
    </View>
                              
                                
                        ):(null)}
                
                         {renderDrawerItem('Revenue','user',()=>props.navigation.navigate("Revenue"))}
                        {renderDrawerItem('Lead','user',()=>props.navigation.navigate("Leads"))}
                         {/* <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Settings"
                            onPress={()=>{props.navigation.navigate("Settings",{mode: "institute"})}}
                            style={{borderBottomWidth: 0.2, borderColor: theme.greyColor}}
                        /> */}
                        {renderDrawerItem('Settings','user',()=>props.navigation.navigate("Settings",{mode: "institute"}))}
                       
                        {renderDrawerItem('Logout','user',  userLogoutButton)}
                    </Drawer.Section> 
                </View>
            </DrawerContentScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: 
    {
        flex: 1,
    },
        userInfoSection:
        {   
            flexDirection: 'row',
            // justifyContent: 'center',
            // marginHorizontal:10,
            borderBottomWidth:1,
            borderBottomColor: theme.labelOrInactiveColor,
            padding:5,
            alignItems: 'center'
        },
            userNameSec:
            {
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5%'
            },
            drawerItem:
            {
                
            },
    bottomDrawer:
    {
        backgroundColor: theme.greyColor,
        color: theme.primaryColor,
        marginBottom: '20%'
    }

})
