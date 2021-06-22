import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../config';
import {Text, Switch, Avatar, Title, Caption, Paragraph, Drawer, TouchableRipple} from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

export function DrawerContent(props){
    return(
        <View style={{flex: 1, width: '100%'}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>

                        <View style={{marginTop: '5%' ,marginRight: 10,}}>
                            <Avatar.Image source={{ uri: 'https://picsum.photos/200' }}  size={80}/>
                        </View>
                        <View style={styles.userNameSec}>
                            <Title>All Coachings</Title>
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
                            label="Notification"
                            onPress={()=>{}}
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
                            onPress={()=>{}}
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
                            label="Register"
                            onPress={()=>
                                props.navigation.navigate("Register")}
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
