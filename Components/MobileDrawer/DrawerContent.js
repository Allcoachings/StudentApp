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
                        <View style={{marginTop: '5%'}}>
                            <Avatar.Image source={{ uri: 'https://picsum.photos/200' }}  size={80}/>
                        </View>
                        <View style={styles.userNameSec}>
                            <Title>Amit Kumar</Title>
                            <Caption>Manage Category</Caption>
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
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Auth"
                            onPress={()=>{props.navigation.navigate("Auth")}}
                        />
                         <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Test Series"
                            onPress={()=>{props.navigation.navigate("TestSeries")}}
                        />

                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Subscription"
                            onPress={()=>{props.navigation.navigate("Subscription")}}
                        />
                        {/*<DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Single Test Series"
                            onPress={()=>{}}
                        />
                        
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Institute Test Series List"
                            onPress={()=>{props.navigation.navigate("TestSeries")}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="SeriesList"
                            onPress={()=>{}}
                        /> */}
                        {/* <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Category List"
                            onPress={()=>{props.navigation.navigate("CategoryList")}}
                        /> */}
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Solutions"
                            onPress={()=>{props.navigation.navigate("Solution")}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Result Analysis"
                            onPress={()=>{props.navigation.navigate("ResultAnalysis")}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Feed"
                            onPress={()=>{props.navigation.navigate("Feed")}}
                            style={styles.drawerItem}
                        />
                    </Drawer.Section> 
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawer}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                            name="home-outline"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Login as Institute"
                    activeTintColor={theme.primaryColor}
                    inactiveTintColor={theme.primaryColor}
                    onPress={()=>{props.navigation.navigate("Auth")}}
                />
            </Drawer.Section>
            <Drawer.Section>
            </Drawer.Section>
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
            justifyContent: 'center',
            alignItems: 'center'
        },
            userNameSec:
            {
                justifyContent: 'center',
                alignItems: 'center'
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
