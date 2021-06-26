import React from 'react';
import { View, StyleSheet,TouchableOpacity } from 'react-native';
import { theme } from '../config';
import {Text, Switch, Avatar, Title, Caption, Paragraph, Drawer, TouchableRipple} from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { Feather } from '@expo/vector-icons';

const renderDrawerItem=(label,icon,onPress)=>
{
    return (
        <TouchableOpacity style={{flexDirection: 'row',padding:10,margin:10,marginBottom:0,alignItems: 'center',borderBottomWidth:1,borderBottomColor:theme.labelOrInactiveColor}} onPress={onPress}>
            <View style={{backgroundColor: theme.labelOrInactiveColor,borderRadius:30,padding:9}}>
              <Feather name={icon} size={20}/>
            </View>
            <Text style={{marginLeft:10,fontSize:15}}>{label}</Text>
            <Feather name="chevron-right" size={20} style={{marginLeft:'auto',alignSelf:'flex-end'}}/>
        </TouchableOpacity>
    )
}
export function DrawerContent(props){
    return(
        <View style={{flex: 1, width: '100%'}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={{display: 'flex',justifyContent: 'space-between',borderBottomWidth:1,borderBottomColor: theme.labelOrInactiveColor, flexDirection: 'row',paddingBottom:5}}>
                        
                        <View style={styles.userInfoSection}>
                            <View>
                                <Avatar.Image source={{ uri: 'https://picsum.photos/200' }}  size={80}/>
                            </View>
                            <View style={styles.userNameSec}>
                                <Title>Amit Kumar</Title>
                                <Text style={{color: theme.greyColor}}>@amit_kumar87</Text>
                            </View>
                        </View>
                        <View style={{height:"20%",justifyContent: 'center',borderWidth:1,borderColor: theme.labelOrInactiveColor,marginRight:10,paddingHorizontal:5}}>
                            <Text style={{color: theme.greyColor,   textAlign: 'center'}}>Manage Category</Text>
                        </View>
                    </View>
                    <Drawer.Section>
                        {/* <Drawer.Item
                            icon={({color, size}) => (
                                <View style={{backgroundColor: theme.labelOrInactiveColor,padding:5,borderRadius:20}}>
                                    <Icon 
                                    name="home-outline" 
                                    color={color}
                                    size={size}
                                    />
                                </View>
                            )}
                            right={({color})=>(
                                <Icon 
                                name="chevron-right"  
                                size={20}
                                />
                             )}
                            label="Home"
                            onPress={()=>{props.navigation.navigate("Home")}}
                            style={{ borderColor: theme.greyColor,justifyContent: 'center'}}
                        /> */}
                     
                        {renderDrawerItem('Home','home',()=>props.navigation.navigate("Home"))}
                        {renderDrawerItem('Auth','lock',()=>props.navigation.navigate("Auth"))}
                        {renderDrawerItem('Test Series','lock',()=>props.navigation.navigate("TestSeries"))}
                        {renderDrawerItem('Subscription','lock',()=>props.navigation.navigate("Subscription"))} 
                        {renderDrawerItem('Profile','user',()=>props.navigation.navigate("Profile"))}
                        {renderDrawerItem('Result Analysis','user',()=>props.navigation.navigate("ResultAnalysis"))}
                        {renderDrawerItem('Feed','user',()=>props.navigation.navigate("Feed"))}
                        {renderDrawerItem('Settings','user',()=>props.navigation.navigate("Settings"))}
                        {/* <Drawer.Item
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            right={({color})=>(
                                <Icon 
                                name="chevron-right"  
                                size={20}
                                />
                             )}
                            label="Auth"
                            onPress={()=>{props.navigation.navigate("Auth")}}
                            style={{ borderColor: theme.greyColor}}
                        /> */}
                         {/* <Drawer.Item
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            right={({color})=>(
                                <Icon 
                                name="chevron-right"  
                                size={20}
                                />
                             )}
                            label="Test Series"
                            onPress={()=>{props.navigation.navigate("TestSeries")}}
                            style={{ borderColor: theme.greyColor}}
                        /> */}

                        {/* <Drawer.Item
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            right={({color})=>(
                                <Icon 
                                name="chevron-right"  
                                size={20}
                                />
                             )}
                            label="Subscription"
                            onPress={()=>{props.navigation.navigate("Subscription")}}
                            style={{ borderColor: theme.greyColor}}
                        /> */}
                        {/* <Drawer.Item
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            right={({color})=>(
                                <Icon 
                                name="chevron-right"  
                                size={20}
                                />
                             )}
                            label="Profile"
                            onPress={()=>{props.navigation.navigate("Profile")}}
                            style={{ borderColor: theme.greyColor}}
                        /> */}
                        {/*<Drawer.Item
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
                        {/* <Drawer.Item
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            right={({color})=>(
                                <Icon 
                                name="chevron-right"  
                                size={20}
                                />
                             )}
                            label="Solutions"
                            onPress={()=>{props.navigation.navigate("Solution")}}
                            style={{ borderColor: theme.greyColor}}
                        /> */}
                        {/* <Drawer.Item
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            right={({color})=>(
                                <Icon 
                                name="chevron-right"  
                                size={20}
                                />
                             )}
                            label="Result Analysis"
                            onPress={()=>{props.navigation.navigate("ResultAnalysis")}}
                            style={{ borderColor: theme.greyColor}}
                        /> */}
                        {/* <Drawer.Item
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            right={({color})=>(
                                <Icon 
                                name="chevron-right"  
                                size={20}
                                />
                             )}
                            label="Feed"
                            onPress={()=>{props.navigation.navigate("Feed")}}
                            style={styles.drawerItem}
                            style={{ borderColor: theme.greyColor}}
                        /> */}
                        {/* <Drawer.Item
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            right={({color})=>(
                                <Icon 
                                name="chevron-right"  
                                size={20}
                                />
                             )}
                            label="Mock Test"
                            onPress={()=>{props.navigation.navigate("MockTest")}}
                            style={styles.drawerItem}
                        /> */}
                        {/* <Drawer.Item
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}

                                />
                            )}
                            right={({color})=>(
                                <Icon 
                                name="chevron-right"  
                                size={20}
                                />
                             )}
                            label="Settings"
                            onPress={()=>{props.navigation.navigate("Settings")}}
                            style={styles.drawerItem}
                        /> */}
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
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-start',
            marginHorizontal: 10,
            // paddingVertical:10,
            // borderBottomWidth: 0.2,
        },
            userNameSec:
            {
                justifyContent: 'center',
                // alignItems: 'center'
                marginLeft: 10,
            },
            drawerItem:
            {
                
            },
    bottomDrawer:
    {
        marginTop:'auto',
        backgroundColor: theme.greyColor,
        color: theme.primaryColor,
        marginBottom:-5
    }

})
