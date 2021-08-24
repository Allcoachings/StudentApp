import React, { Component } from 'react';
import { View, Text,Image,StyleSheet, TouchableOpacity, Dimensions, Modal, FlatList, TextInput } from 'react-native';
import {serverBaseUrl, theme, dataLimit, appLogo} from '../config';
import {Feather, AntDesign, FontAwesome} from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import { connect } from 'react-redux'
import {fetch_comments, add_comment} from "../Utils/DataHelper/Feed"
import moment from 'moment'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class CommentModal extends Component {
  state={
    modalVisible: this.props.modalVisible,
    offset: 0,
    loadingData: true,
    comments: []
  }



  componentDidMount=()=>{
    fetch_comments(this.props.feedId,this.state.offset,dataLimit,this.commentsCallback)
  }

  commentsCallback=(response)=>{
      if(response.status==200)
      {
            response.json().then(data=>{
                console.log(data)
                this.setState({comments:data,loadingData:false})
            })
      }
  }

  add=()=>{
    add_comment(this.state.comment, 2, this.props.feedId, 0, this.props.userInfo.id, this.addCallback)
  }

  addCallback=(response)=>{
      if(response.status==200)
      {
          console.log("success",response)
          console.log(response.map.get('location'))
      }
      else
      {
          console.log("error",response)
      }
  }

  renderSingleComment=(item)=>{
      return(
          <View style={{ flexDirection: 'row', margin: 15, padding: 10}}>
              <View>
                  <Image source={appLogo} style={{height: 50, width: 50, borderRadius: 25}}/>
              </View>
              <View style={{ flexDirection: 'column'}}>
                  <View style={{ flexDirection: 'row'}}>
                      <Text>UserName {' • '}</Text>
                      <Text>{moment(item.timeStamp).fromNow()}</Text>
                  </View>
                  <View>
                      <Text>{item.comment}</Text>
                  </View>
              </View>
          </View>
      )
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
                <View>
                    <FlatList
                        data={this.state.comments}
                        renderItem={({item}) => this.renderSingleComment(item)}
                        keyExtractor={(item,index)=>index}
                    />
                </View>
            
                <View style={{backgroundColor: 'white', position: 'absolute', bottom: 0, width: width*0.97, marginLeft: width*0.015}}>            
                    <TextInput 
                        style={{borderWidth: 1, borderColor: 'black', borderRadius:10, paddingLeft: 6, paddingBottom:30}} 
                        onChange={(text) =>this.setState({comments: text})}
                        placeholder="Write a Comment" placeholderTextColor='grey'>
                    </TextInput>
                    <TouchableOpacity style={{flexDirection: 'row',backgroundColor: theme.accentColor,paddingLeft: 8, paddingRight: 8,  paddingTop: 5, paddingBottom: 5, borderRadius: 3, marginTop: 5, alignSelf: 'center', marginBottom: 20}} onPress={()=>this.add()}>
                        <Text style={{textAlign: 'center', fontSize: 18,color: theme.primaryColor}}>Submit</Text>
                    </TouchableOpacity>
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