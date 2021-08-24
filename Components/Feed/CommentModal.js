import React, { Component } from 'react';
import { View, Text,Image,StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';
import {serverBaseUrl, theme} from '../config';
import {Feather, AntDesign, FontAwesome} from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import { connect } from 'react-redux'
import {like_feed} from "../Utils/DataHelper/Feed"
import moment from 'moment'
import { FlatListSlider } from '../Utils/ImageSlider';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class CommentModal extends Component {
  state={
    modalVisible: this.props.modalVisible,
  }



  componentDidMount=()=>{

  }

  render() {
    return(
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.closeModal}
        >
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', borderBottomWidth:1,borderBottomColor:theme.labelOrInactiveColor,padding:10,}}>
                    <TouchableOpacity onPress={()=>this.props.closeModal()}>
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{fontFamily:'Raleway_700Bold',fontSize:20, marginLeft: 10}}>Comments</Text>
                </View>
            </View>

        </Modal>
    )
  }
}
const styles = StyleSheet.create({
      container: {
          height: height, 
          width: width
      }                       
                
});

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth,
        userInfo:state.user.userInfo,
    }
}
export default connect(mapStateToProps)(CommentModal);