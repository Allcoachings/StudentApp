import React, { Component } from 'react';
import { View, Text,Image,StyleSheet, TouchableOpacity, Dimensions, Modal, FlatList, TextInput, ScrollView } from 'react-native';
import {serverBaseUrl, theme, dataLimit, appLogo, Assets, imageProvider} from '../config';
import {Feather, AntDesign, Entypo} from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import { connect } from 'react-redux'
import {fetch_comments, add_comment} from "../Utils/DataHelper/Feed"
import moment from 'moment'
import Toast from 'react-native-simple-toast';
import { ActivityIndicator } from 'react-native-paper';
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import ImageZoomModal from '../InstituteView/ImageZoomModal'
import RenderSingleComment from './RenderSingleComment'
import RenderAddCommentBox from './RenderAddCommentBox'
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

  add=(comment)=>{
        Toast.show("Please Wait...")
        this.setState({comment: comment},()=>
        add_comment(this.state.comment, 2, this.props.feedId, 0, this.props.userInfo.id, this.addCallback))
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
        this.setState({comment: ''})
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
            <View>
                <View style={{ flex:1, flexDirection: 'row', margin: 5, padding: 10}}>
                    <TouchableOpacity style={{flex: 0.15}} onPress={()=>this.addImage(serverBaseUrl+item.commenterObject.studentImage)}>
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
                <View style={{ flexDirection: 'row', borderBottomColor:theme.labelOrInactiveColor,padding:10,}}>
                    <TouchableOpacity onPress={()=>this.props.closeModal()}>
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{fontFamily:'Raleway_700Bold',fontSize:20, marginLeft: 10}}>Comments ({this.props.comments})</Text>
                </View>
                
                <ScrollView>
                <View>
                    
                    {this.state.loadingData?(
                        <CustomActivtiyIndicator mode="skimmer"/>
                    ):(<FlatList
                        data={this.state.commentData}
                        renderItem={({item}) => <RenderSingleComment item={item} addImage={this.addImage} mode="all"/>}
                        keyExtractor={(item,index)=>index}
                        ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                    />)}
                </View>
                </ScrollView>
                <RenderAddCommentBox add={this.add}/>
                {/* <View style={{flexDirection:'row', width: width, marginTop: 'auto',marginBottom:this.props.keyboardHeight?this.props.keyboardHeight+40:10}}>  
                    <View style={{flex: 1,  flexDirection: 'row',borderTopWidth: 1, borderColor: this.state.comment!=''?(theme.accentColor):(theme.labelOrInactiveColor), justifyContent: 'space-between'}}>    
                        <TextInput 
                            style={{ flex: 0.85, padding: 10, fontFamily: 'Raleway_400Regular'}} 
                            onChangeText={(text)=>this.setState({comment: text})}
                            placeholder="Write a Comment" placeholderTextColor='grey'
                            ref={input => { this.textInput = input }}
                        />
                            <TouchableOpacity onPress={()=>this.state.comment!=''?(this.add(this.state.comment)):(Toast.show("Please Enter The Comment."))} style={{flex: 0.15,  backgroundColor: this.state.comment!=''?(theme.accentColor):(theme.labelOrInactiveColor), justifyContent: 'center', alignItems: 'center', padding: 15}}>
                                <Entypo name="check" size={24} color={theme.primaryColor} />
                            </TouchableOpacity>
                    </View>  
                </View> */}
                
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
export default connect(mapStateToProps)(CommentModal);