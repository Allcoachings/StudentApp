import React, { Component } from 'react';
import { View, Text,Image,StyleSheet, TouchableOpacity, Dimensions, Modal, FlatList, TextInput, ScrollView } from 'react-native';
import {serverBaseUrl, theme, dataLimit, appLogo, Assets} from '../config';
import {Feather, AntDesign, FontAwesome} from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import { connect } from 'react-redux'
import {fetch_comments, add_comment} from "../Utils/DataHelper/Feed"
import moment from 'moment'
import Toast from 'react-native-simple-toast';
import { ActivityIndicator } from 'react-native-paper';
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import ImageZoomModal from '../InstituteView/ImageZoomModal'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class CommentModal extends Component {
  state={
    modalVisible: this.props.modalVisible,
    offset: 0,
    loadingData: true,
    commentData: [],
    comment: '',
    zoomModal: false,
    index: 0,
    userImage: []
  }



  componentDidMount=()=>{
    fetch_comments(this.props.feedId,this.state.offset,dataLimit,this.commentsCallback)
  }

  commentsCallback=(response)=>{
      if(response.status==200)
      {
            response.json().then(data=>{
            
                this.setState({commentData:data,loadingData:false})
            })
      }
  }

  add=()=>{
        Toast.show("Please Wait...")
        add_comment(this.state.comment, 2, this.props.feedId, 0, this.props.userInfo.id, this.addCallback)
  }

  openZoomModal=() => {
      this.setState({zoomModal: true})
  }

  closeModal = () => {
    this.setState({ zoomModal: false });
  }

  addCallback=(response)=>{
      
      if(response.status==201)
      {
            Toast.show("Comment Added Successfully!!")
          var obj={
            commenterObject: {
                blocked: this.props.userInfo.blocked,
                email: this.props.userInfo.email,
                id: this.props.userInfo.id,
                mobileNumber: this.props.userInfo.mobileNumber,
                name: this.props.userInfo.name,
                stateOfResidence: this.props.userInfo.stateOfResidence,
                studentImage: this.props.userInfo.studentImage,
                userId: this.props.userInfo.userId,
              },
              feedComments: {
                comment: this.state.comment,
                commenter: 2,
                feedId: this.state.feedId,
                id: response.headers.map.location,
                insId: 0,
                studentId: this.props.userInfo.id
              },
            }
        this.state.commentData.push(obj)
        this.setState({comment: ''},()=>this.textInput.clear())
      }
      else
      {
            Toast.show("Something Went Wrong. Please Try Again Later!!")
            console.log("error", response.status)
      }
  }

  addImage=(link)=>{
    this.state.userImage.pop()
      this.state.userImage.push(link)
      this.openZoomModal()
  }

  renderSingleComment=(item)=>{
      return(
          <View style={{ flex:1, flexDirection: 'row', margin: 5, padding: 10}}>
              <TouchableOpacity style={{flex: 0.15}} onPress={()=>this.addImage(serverBaseUrl+item.commenterObject.studentImage)}>
                  <Image source={{uri: serverBaseUrl+item.commenterObject.studentImage}} style={{height: 50, width: 50, borderRadius: 25, borderWidth: 0.6, borderColor:theme.greyColor,}}/>
              </TouchableOpacity>
              <View style={{flex: 0.85, flexDirection: 'column', marginLeft: 10, marginTop: 2}}>
                  <View style={{ flexDirection: 'row'}}>
                      <Text style={{fontFamily:'Raleway_700Bold', fontSize: 16}}>{item.commenterObject.name} {' • '}</Text>
                      <Text style={{fontFamily:'Raleway_700Bold', fontSize: 15}}>{moment(item.feedComments.timeStamp).fromNow()}</Text>
                  </View>
                  <View style={{flexShrink: 1}}>
                      <Text style={{fontFamily: 'Raleway_600SemiBold',  flexWrap: 'wrap'}}>{item.feedComments.comment}</Text>
                  </View>
              </View>
          </View>
      )
  }

  render() {
    return(
        <View>
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
                <View style={{flexDirection:'row', backgroundColor: 'white', width: width, marginTop: 15}}>  
                <View style={{flex: 1,  flexDirection: 'row',borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor}}>        
                    <TextInput 
                        style={{flex:0.9,borderRadius:10, paddingLeft: 6, justifyContent: 'flex-end'}} 
                        onChangeText={(text)=>this.setState({comment: text})}
                        placeholder="Write a Comment" placeholderTextColor='grey'
                        ref={input => { this.textInput = input }}
                    >

                    </TextInput>
                    {this.state.comment!=''?(
                    <TouchableOpacity onPress={()=>this.add()} style={{flex: 0.1}}>
                        <AntDesign name="arrowright" size={24} color={theme.labelOrInactiveColor} />
                    </TouchableOpacity>):(null)}
                    </View>  
                </View>
                <ScrollView>
                <View>
                    
                    {this.state.loadingData?(
                        <CustomActivtiyIndicator mode="skimmer"/>
                    ):(<FlatList
                        data={this.state.commentData}
                        renderItem={({item}) => this.renderSingleComment(item)}
                        keyExtractor={(item,index)=>index}
                        ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                    />)}
                </View>
                </ScrollView>
                
            </View>
            
        </Modal>
        {this.state.zoomModal?(
            <ImageZoomModal 
                zoomModal={this.state.zoomModal}
                closeModal={this.closeModal}
                images={this.state.userImage}
                index={this.state.index}
                type="normal"
            />
        ):(null)}

       </View>
    )
  }
}
const styles = StyleSheet.create({
      container: {
          height: height, 
          width: width,
          flexDirection: 'column',
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