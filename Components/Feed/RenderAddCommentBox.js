import React, { Component } from 'react';
import { View, Text,Image,StyleSheet, TouchableOpacity, Dimensions, Modal, FlatList, TextInput, ScrollView } from 'react-native';
import {serverBaseUrl, theme, dataLimit, appLogo, Assets, imageProvider} from '../config';
import {EvilIconsns, AntDesign, Entypo} from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import { connect } from 'react-redux'
import moment from 'moment'
import Toast from 'react-native-simple-toast';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class RenderAddCommentBox extends Component {
  state={
      comment: ''
  }

  add=()=>{
    this.props.add(this.state.comment)
    this.setState({comment: ''},()=>this.textInput.clear())
}

  render() {
      console.log("box")
    return(
        <View style={{flexDirection:'row', width: width, marginTop: 'auto',marginBottom:5}}>  
            <View style={{flex: 1,  flexDirection: 'row',borderTopWidth: 1, borderColor: this.state.comment!=''?(theme.accentColor):(theme.labelOrInactiveColor), justifyContent: 'space-between'}}>    
                <TextInput 
                    style={{ flex: 0.85, padding: 10, fontFamily: 'Raleway_400Regular'}} 
                    onChangeText={(text)=>this.setState({comment: text})}
                    placeholder="Write a Comment" placeholderTextColor='grey'
                    ref={input => { this.textInput = input }}
                />
                    <TouchableOpacity onPress={()=>this.state.comment!=''?(this.add()):(Toast.show("Please Enter The Comment."))} style={{flex: 0.15,  backgroundColor: this.state.comment!=''?(theme.accentColor):(theme.labelOrInactiveColor), justifyContent: 'center', alignItems: 'center', padding: 15}}>
                        <Entypo name="check" size={24} color={theme.primaryColor} />
                    </TouchableOpacity>
            </View>  
        </View>
    )
  }
}

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth,
        userInfo:state.user.userInfo,
        keyboardHeight: state.screen.keyboardHeight
    }
}
export default connect(mapStateToProps)(RenderAddCommentBox);