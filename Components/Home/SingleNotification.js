import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, TouchableWithoutFeedback} from 'react-native';
import { imageProvider, theme } from '../config';
import { updateNotificationSeenStatus } from '../Utils/DataHelper/Notification';
function Bull({isVisible}) {
    return (
        <Text style={{fontSize:25,color:theme.blueColor,marginRight:10}}>
            {isVisible?"•":" "}
        </Text>
    );
}
function SingleNotification({item,navigation}) {


    const [seen,setSeen] = useState(item.notification.seen)


    useEffect(() => {
        setSeen(item.notification.seen)
    },[item])

    return(
        <TouchableWithoutFeedback onPress={()=>{

        
            if(!seen)
            {
                setSeen(true)
                updateNotificationSeenStatus(true,item.notification.id,(response)=>console.log("notification status update : ",response.status))
            }
            if(item.notification.redirectLink)
            {
                navigation.navigate('webview',{link:item.notification.redirectLink,mode:'defaultAppHeader'})
            } 
            }}>
            <View style={{marginBottom: '5%'}}>
                <View style={styles.instituteheader}>
                    <View style={{flexDirection: 'row',alignItems: 'center',alignSelf:'flex-start'}}> 

                        <Bull isVisible={!seen}/>
                        <Image source={{ uri: imageProvider(item.senderObject.image) }} style={styles.instituteheaderLogo}/>
                    </View>
                    <View style={styles.instituteheaderMeta}>
                        {/* <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Text style={styles.instituteheaderText}>{item.senderObject.name}</Text>
                        </View> */}
                        <Text numberOfLines={3} style={styles.instituteDirector}>{item.notification.message}</Text>
                        <Text style={{fontSize:12,color:theme.greyColor+"99"}}> {moment(item.notification.notificationTime).fromNow()}</Text>
                    </View>
                    {item.notification.notificationImage?(
                        <View> 
                            <Image source={{ uri: imageProvider(item.notification.notificationImage) }} style={{height:80,width:120}}/>
                        </View>
                    ):(null)}
                    
                </View>
                 
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        flexDirection: 'column',
        padding:10,
    },
        headView:
        {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '5%'
        },
            headText:
            {
                fontSize: 24,
                fontWeight: 'bold'
            },
        instituteheader:
        {
            flexDirection:'row',
            flex:0.2,
            marginBottom: 5
        },
            logoCard:
            { 
                flexWrap:'wrap',
                width:40,
                height:40, 
                borderRadius:20
                
            }, 
                instituteheaderLogo:
                {
                    width:30,
                    height:30,
                    borderRadius:10,
                },  
            instituteheaderMeta:
            {
                flex:1,
                flexDirection:'column',
                marginLeft:'2%',
                marginRight:'5%'
            },
                instituteheaderText:
                {
                    flex:1,
                    flexWrap:'wrap',
                    fontSize:16,
                    fontFamily:'Raleway_700Bold'
                },  
                instituteDirector:
                {
                    color:theme.greyColor,
                    fontSize:15,
                    fontFamily:'Raleway_600SemiBold',
                },
                instituteRatingView:
                {
                    flex:1,
                    flexDirection:'row',
                    alignItems: 'center'
                    // justifyContent: 'center'    
                },
                    instituteRating:
                    {
                        alignSelf:'flex-start',
                        marginRight:10,
                    },
                    voteCount:
                    {
                        fontWeight:'bold',

                    },
                followerView:
                {
                    backgroundColor: theme.primaryColor,
                    borderColor: theme.labelOrInactiveColor, 
                    borderWidth:1,
                    padding: 5,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                    follower:
                    {
                        color: theme.blueColor, 
                        fontWeight: 'bold',
                        fontSize: 16
                    }

})

 
export default SingleNotification;
