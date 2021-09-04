import React, { Component } from 'react';
import { View, Text,Image,StyleSheet, TouchableOpacity, Dimensions, Modal, FlatList, TextInput, ScrollView } from 'react-native';
import {serverBaseUrl, theme, dataLimit, appLogo, Assets, imageProvider} from '../config';
import {Feather, AntDesign, Entypo} from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import { connect } from 'react-redux'
import {fetch_comments, add_comment} from "../Utils/DataHelper/Feed"
import moment from 'moment'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class RenderSingleComment extends Component {
  state={
    
  }

  render() {
    const {item} = this.props
    return(
        <View>
            <View style={{ flex:1, flexDirection: 'row', margin: 5, padding: 10}}>
                <TouchableOpacity style={{flex: 0.15}} onPress={()=>this.props.mode="all"?(this.props.addImage(serverBaseUrl+item.commenterObject.studentImage)):(console.log("hno"))}>
                    <Image source={{uri: imageProvider(item.commenterObject.studentImage)}} style={{height: 50, width: 50, borderRadius: 25, borderWidth: 0.6, borderColor:theme.greyColor,}}/>
                </TouchableOpacity>
                <View style={{flex: 0.85, flexDirection: 'column', marginLeft: 10, marginTop: 2}}>
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={{fontFamily:'Raleway_700Bold', fontSize: 16}}>{item.commenterObject.name} {' • '}</Text>
                        <Text style={{fontFamily:'Raleway_700Bold', fontSize: 15}}>{moment(item.feedComments.timeStamp).fromNow()}</Text>
                    </View>
                    <View style={{flexShrink: 1}}>
                        <Text style={{fontFamily: 'Raleway_400Regular',  flexWrap: 'wrap'}}>{item.feedComments.comment}</Text>
                    </View>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 0.15}}>
                </View>
                <View style={{flex: 0.85,borderBottomWidth: 1, borderBottomColor: theme.labelOrInactiveColor, marginVertical: 5, marginHorizontal: 15}}/>
            </View>
        </View>
    )
  }
}
const styles = StyleSheet.create({
      container: {
          flexDirection: 'column',
      }                       
                
});

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth,
        userInfo:state.user.userInfo,
        keyboardHeight: state.screen.keyboardHeight
    }
}
export default connect(mapStateToProps)(RenderSingleComment);