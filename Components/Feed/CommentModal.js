import React, { Component } from 'react';
import { View, Text,Image,StyleSheet, TouchableOpacity, Dimensions, Modal, FlatList, TextInput, ScrollView } from 'react-native';
import {serverBaseUrl, theme, dataLimit, appLogo, Assets, imageProvider} from '../config';
import {EvilIcons, AntDesign, Entypo} from '@expo/vector-icons';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackArrow from '../Utils/Icons/BackArrow'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class CommentModal extends Component {
  state={
   
    offset: 0,
    loadingData: true,
    commentData: [],
    comment: '',
    zoomModal: false,
    index: 0,
    userImage: []
  }



  componentDidMount=()=>{
      AsyncStorage.getItem("authInfo").then((data)=>{

        if(data)
        {
            let obj = JSON.parse(data) 
            this.setState({authType: obj.authType})
        }
      })
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
        add_comment(this.state.comment,this.state.authType=='user'?2:1, this.props.feedId, this.props.institute.details.id, this.props.userInfo.id, this.addCallback))
  }

 

  addCallback=(response)=>{
      
      if(response.status==201)
      {
            Toast.show("Comment Added Successfully!!")
            let commenterObject = {};
            
            if(this.state.authType=='user')
            {
                commenterObject =this.props.userInfo    
            }else
            {
                commenterObject = this.props.institute.details
            }
            
          var obj={
            commenterObject,
              feedComments: {
                comment: this.state.comment,
                commenter: this.state.authType=='user'?2:1,
                feedId: this.state.feedId,
                id: response.headers.map.location,
                insId: this.props.institute.details.id,
                studentId: this.props.userInfo.id
              },
            }
        this.state.commentData.push(obj)
        this.setState({comment: ''})
        this.props.updateCommentsCount(1);
      }
      else
      {
            Toast.show("Something Went Wrong. Please Try Again Later!!")
            // console.log("error", response.status)
      }
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
  
        <Modal
         
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={()=>this.props.closeModal()}
        >
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', borderBottomColor:theme.labelOrInactiveColor,padding:10,alignItems: 'center'}}>
                    <TouchableOpacity onPress={()=>this.props.closeModal()}>
                        {/* <AntDesign name="left" size={24} color="black" /> */}
                        <BackArrow height={24} width={24}/>
                    </TouchableOpacity>
                    <Text style={{fontFamily:'Raleway_700Bold',fontSize:20, marginLeft: 10,marginBottom: 5}}>Comments ({this.state.commentData.length})</Text>
                </View>
                
                <ScrollView style={{height:height}}>
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
                <RenderAddCommentBox add={this.add}  />
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
    )
  }
}
const styles = StyleSheet.create({
      container: {
          flexDirection: 'column', 
          backgroundColor: theme.primaryColor    
      }                       
                
});

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth,
        userInfo:state.user.userInfo,
        institute:state.institute,
        keyboardHeight: state.screen.keyboardHeight
    }
}
export default connect(mapStateToProps)(CommentModal);