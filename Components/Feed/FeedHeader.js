import React, { Component } from 'react';
import { View, Text,Image,StyleSheet,findNodeHandle,UIManager, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {Assets, imageProvider, serverBaseUrl, shareBaseUrl, shareTextFeed, theme} from '../config';
import moment from 'moment'
import {EvilIconsns, AntDesign, FontAwesome, Feather, MaterialIcons} from '@expo/vector-icons';
import onShare from '../Utils/Share';

import Toast from 'react-native-simple-toast';
import * as Clipboard from 'expo-clipboard';
import ReportFeedModal from './ReportFeedModal';

class FeedHeader extends Component {
  state={
      reportModalVisible: false
    
  }



   
  actions = ['Edit'];
  showThreeMenu=()=>
  {
       
    UIManager.showPopupMenu(
        findNodeHandle(this.state.icon),
        this.props.actions?this.props.actions:this.actions,
        this.onError,
        this.onPopupEvent
    )
      
  }

  onRef = icon => {
    if (!this.state.icon) {
      this.setState({icon})
    }
  }
  
  onPopupEvent = (eventName, index) => {


    const actions = this.props.actions?this.props.actions:this.actions
    if (eventName !== 'itemSelected') return 
    switch (actions[index])
    {
        case "Edit":
                  this.props.editFeedPressHandler()
            break;
        case "Share":  
                onShare(shareTextFeed+"\n "+shareBaseUrl+"community/post/"+this.props.feed.feed.id)
          break;
        case "Copy Link":  
            Clipboard.setString(shareBaseUrl+"community/post/"+this.props.feed.feed.id)
            Toast.show("Copied To clipboard",Toast.LENGTH_LONG)
          break;
        case "Report":  
            this.setState({reportModalVisible:true})  
             
          break;
    }
  }

  render() {
      const {posterObject, postedBy, creationTime,feed} =  this.props 
    return(
        
            <View style={styles.rowView}>
                <TouchableWithoutFeedback onPress={()=>{
                    postedBy==1?(
                            this.props.navigation.navigate('Institute',{insId:posterObject.id})
                    ):(null)
                }}>
                    <View style={{flexDirection: 'row',alignItems:"center"}}> 
                        <Image 
                            source={{ uri: postedBy==2?(imageProvider(posterObject.studentImage)):(imageProvider(posterObject.logo))}} 
                            style={styles.circleView}
                            ref={(ref)=>this.imageRef=ref}
                            onError={()=>
                                {
                                    if(this.imageRef)
                                    {
                                        this.imageRef.setNativeProps({
                                            src:[Image.resolveAssetSource(Assets.profile.profileIcon)]
                                        })
                                    }
                                }}
                        />  
                        <View style={{width: '90%'}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={[styles.coaching,{marginRight:5}]} numberOfLines={1}>{posterObject.name}</Text> 
                                {postedBy==1&&<MaterialIcons  name="verified" size={15} color={theme.greyColor} />} 
                                {this.props.mode=="userProfile"||this.props.mode=="insProfile"||this.props.actions?( 
                                    <TouchableOpacity onPress={()=>this.showThreeMenu()} style={{marginLeft:"auto",alignSelf:'flex-end'}}>
                                        <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}} ref={this.onRef}/>
                                    </TouchableOpacity>
                                ):(null)} 
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.timeDateText}>{moment(creationTime).fromNow()}</Text>
                                {this.props.feed.feed.edited?(
                                    <Text style={{fontFamily: 'Raleway_400Regular',marginHorizontal:10,color:theme.greyColor}}>(Edited)</Text>
                                ):(null)}
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
        
              
                
                {this.state.reportModalVisible?(

                    <ReportFeedModal
                        closeModal={()=>this.setState({reportModalVisible:false})}
                        isModalVisible={this.state.reportModalVisible}
                        feedId={this.props.feed.feed.id}
                    />
                ):(null)}
            </View>
        )
    }
}
const styles = StyleSheet.create({
        rowView:
        {
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10
        },
            circleView:
            {
                height: 40,
                width: 40,
                borderRadius: 25,
                backgroundColor:theme.secondaryColor
                 
            },
            coaching:
            {
                fontSize: 13,
                marginLeft:10,
                fontFamily: 'Raleway_600SemiBold',
                width:'78%',
                color: theme.secondaryColor
            },
                timeDateText:
                {
                    fontSize: 11,
                    marginLeft:10,
                    color: theme.greyColor
                }, 
})

export default FeedHeader