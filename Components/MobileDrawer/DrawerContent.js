import React, { useState } from 'react';
import { View, StyleSheet,TouchableOpacity,TouchableWithoutFeedback } from 'react-native';
import { serverBaseUrl, theme } from '../config';
import {Text, Switch, Avatar, Title, Caption, Paragraph, Drawer, TouchableRipple} from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { Feather } from '@expo/vector-icons';
import ChangeCatModal from './ChangeCatModal';

const renderDrawerItem=(label,icon,onPress)=>
{
    return (
        <TouchableOpacity style={{flexDirection: 'row',padding:10,margin:10,marginBottom:0,alignItems: 'center'}} onPress={onPress}>
            <View style={{backgroundColor: theme.labelOrInactiveColor,borderRadius:30,padding:9}}>
              <Feather name={icon} size={20}/>
            </View>
            <Text style={{marginLeft:10,fontSize:15}}>{label}</Text>
            {label=='Settings'?(<Feather name="chevron-right" size={20} style={{marginLeft:'auto',alignSelf:'flex-end'}}/>):(null)}
            
        </TouchableOpacity>
    )
}


 
export function DrawerContent(props){




    const [isCatModalOpen,setCatModalOpen] = useState(false);
    
    return(
        <View style={{flex: 1, width: '100%'}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={{display: 'flex',justifyContent: 'space-between',borderBottomWidth:1,borderBottomColor: theme.labelOrInactiveColor, flexDirection: 'row',paddingBottom:5}}>
                        <View style={styles.userInfoSection}>
                            <View>
                                <Avatar.Image source={{ uri: serverBaseUrl+props.userInfo.studentImage }}  size={80}/>
                            </View>
                            <View style={styles.userNameSec}>
                                <Title>{props.userInfo.name}</Title>
                                <Text style={{color: theme.greyColor}}>{props.userInfo.userId}</Text>
                            </View>
                        </View>
                        <TouchableWithoutFeedback style={{height:"20%",justifyContent: 'center',borderWidth:1,borderColor: theme.labelOrInactiveColor,marginRight:10,paddingHorizontal:5}}
                            onPress={()=>setCatModalOpen(true)}
                        >
                            <View style={{height:"20%",justifyContent: 'center',borderWidth:1,borderColor: theme.labelOrInactiveColor,marginRight:10,paddingHorizontal:5}}>
                                <Text style={{color: theme.greyColor,   textAlign: 'center'}}>Manage Category</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Drawer.Section>
                     
                        {/* {renderDrawerItem('Home','home',()=>props.navigation.navigate("Home"))} */}
                        {renderDrawerItem('Profile','user',()=>props.navigation.navigate("Profile"))}
                        {renderDrawerItem('Notifications','bell',()=>props.navigation.navigate("Notification",{mode: 'student'}))}
                        {renderDrawerItem('Enrollments','lock',()=>props.navigation.navigate("Enrollments"))}
                        {renderDrawerItem('Downloads','user',()=>props.navigation.navigate("Downloads"))}
                        {renderDrawerItem('Test Series','lock',()=>props.navigation.navigate("TestSeries"))}
                        
                        {/* {renderDrawerItem('Subscription','lock',()=>props.navigation.navigate("Subscription"))} 
                        
                        {renderDrawerItem('Result Analysis','user',()=>props.navigation.navigate("ResultAnalysis"))}
                    {renderDrawerItem('Feed','user',()=>props.navigation.navigate("Feed",{item: false}))} */}
                        {renderDrawerItem('Night Mode','user',()=>props.navigation.navigate("NightMode"))}
                        {renderDrawerItem('Settings','user',()=>props.navigation.navigate("Settings"))}
                        
                        
                    </Drawer.Section> 
                </View>
            </DrawerContentScrollView>
            {/* <Drawer.Section style={styles.bottomDrawer}>
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
            </Drawer.Section> */}
            <Drawer.Section>
            </Drawer.Section>

            {isCatModalOpen?(

                    <ChangeCatModal isModalVisible={isCatModalOpen} closeModal={()=>setCatModalOpen(false)} navigation={props.navigation}/>

            ):(null)}
            
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
                flexDirection: 'column',
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
