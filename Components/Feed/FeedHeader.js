import React, { Component } from 'react';
import { View, Text,Image,StyleSheet,findNodeHandle,UIManager, TouchableOpacity } from 'react-native';
import {imageProvider, serverBaseUrl, theme} from '../config';
import moment from 'moment'
import {Feather, AntDesign, FontAwesome} from '@expo/vector-icons';
class FeedHeader extends Component {
  state={
    
  }
  showThreeMenu=()=>
  {
       
    UIManager.showPopupMenu(
        findNodeHandle(this.state.icon),
        ["action","edit"],
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

    if (eventName !== 'itemSelected') return 
    switch (index)
    {
        case 0:
                  this.props.editFeedPressHandler()
            break;
        case 1: 

          break;
    }
  }

  render() {
      const {posterObject, postedBy, creationTime} =  this.props
    return(
            <View style={styles.rowView}>
                <Image source={{ uri: postedBy==2?(imageProvider(posterObject.studentImage)):(imageProvider(posterObject.logo))}} style={styles.circleView}/>  
                <View style={{width: '78%'}}>
                    <Text style={styles.coaching}>{posterObject.name}</Text> 
                    <Text style={styles.timeDateText}>{moment(creationTime).fromNow()}</Text>
                </View>
                <TouchableOpacity onPress={()=>this.showThreeMenu()}>
                    <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}} ref={this.onRef}/>
                </TouchableOpacity>
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
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor:theme.secondaryColor
                 
            },
            coaching:
            {
                fontSize: 15,
                marginLeft:10,
                fontFamily: 'Raleway_600SemiBold',
                width:'78%',
                color: theme.secondaryColor
            },
                timeDateText:
                {
                    fontSize: 13,
                    marginLeft:10,
                    color: theme.greyColor
                }, 
})

export default FeedHeader