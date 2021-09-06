import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme, serverBaseUrl } from '../config';
import {Text, Switch, Avatar, Title, Caption, Paragraph, Drawer, TouchableRipple} from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { SET_INSTITUTE_AUTH } from '../Actions/types';

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
                            <Title>{props.institute.details.name}</Title>
                        </View>
                    </View>
                    <Drawer.Section>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={()=>{props.navigation.navigate("Home")}}
                            style={{borderBottomWidth: 0.2, borderColor: theme.greyColor}}
                        />
                        <DrawerItem
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
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Notification"
                            onPress={()=>{props.navigation.navigate("Notification",{mode: 'institute'})}}
                            style={{borderBottomWidth: 0.2, borderColor: theme.greyColor}}
                        />
                         <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Revenue"
                            onPress={()=>{props.navigation.navigate("Revenue")}}
                            style={{borderBottomWidth: 0.2, borderColor: theme.greyColor}}
                        />
                         <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Lead"
                            onPress={()=>{props.navigation.navigate("Leads")}}
                            style={{borderBottomWidth: 0.2, borderColor: theme.greyColor}}
                        />
                         <DrawerItem
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
                        />
                         <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Logout"
                            onPress={()=>
                                userLogoutButton()}
                        />
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
            justifyContent: 'center',
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
