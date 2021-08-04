import { Feather } from '@expo/vector-icons';
import React, { Component } from 'react';
import { View, Text,StyleSheet,Modal,TouchableOpacity,ActivityIndicator,ScrollView,Image,TextInput,FlatList } from 'react-native';
import { addBannerImagePlaceholder, theme } from '../config';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure';
import CardView from '../Utils/CardView';
import {addImgeFeed,saveFeed} from '../Utils/DataHelper/Feed'
import * as DocumentPicker from 'expo-document-picker';
import Toast from 'react-native-simple-toast';


class AddFeedModal extends Component {
  state={
      stepCheck:2,//to check on which step user is in order to add a feed
      postType:1,
      addFeedLoading:false,
      description:'',
      pollOptions:[
          {
              
              pollOption:''
          },
          {
              
              pollOption:''
          }
        ],
        pollOptionCounter:2,
        feedItem:{}

  }
  handleAddFeedCallback=(response)=>
  {
      console.log(response.status)
      if(response.status==201)
      {
        Toast.show('Feed Added Successfully.');
          this.setState({addFeedLoading:false})
        
        let feedItem = {feed:this.state.feedItem};
        feedItem['posterObject']=this.props.instituteDetails
        console.log(feedItem)
          this.props.addFeedCallBack(feedItem)
          this.props.closeModal()
      }
      else
      {
        Toast.show('Something Went Wrong. Please Try Again Later.');
      }
  }

 
  handleAddPollFeedBtnClick=()=>
  {
      if(this.verifyPollPost(this.state))
      {
          if(!this.state.addFeedLoading)
          {
            this.setState({addFeedLoading:true})
            let posterId  = this.props.postedBy==1?({insId:this.props.posterId}):({studentId:this.props.posterId})
            let feed = {
                feed:{
                    feedType:2,
                    pollQuestion:this.state.pollQuestion,
                    postedBy:this.props.postedBy,
                    ...posterId,
                    tags:this.state.tags,
                    pollVotedInstitutes: ",",
                    pollVotedStudents: ",",
                    pollVoterList: ",",
                    feedLikerIns: ",",
                    feedLikerStudent: ",",

                },
                feedPollOptions:this.state.pollOptions
            }
            this.setState({feedItem:feed})

            saveFeed(feed,this.handleAddFeedCallback)
          }
            
      }else
      {
        Toast.show('Please Fill All The Fields.');
      }
  }
  verifyPollPost=({pollQuestion,pollOptions})=>pollQuestion&&pollOptions.filter(item=>item.pollOption)

  handleAddImageFeedBtnClick=()=>
  {
    if(this.verifyImagePost(this.state))
    {
        if(!this.state.addFeedLoading)
        {
            this.setState({addFeedLoading:true})
            let posterId  = this.props.postedBy==1?({insId:this.props.posterId}):({studentId:this.props.posterId})
            let feed = {
                feed:{
                    feedType:1,
                    description:this.state.description,
                    postedBy:this.props.postedBy,
                    ...posterId,
                    tags:this.state.tags, 
                    pollVotedInstitutes: ",",
                    pollVotedStudents: ",",
                    pollVoterList: ",",
                    feedLikerIns: ",",
                    feedLikerStudent: ",",   
                },
                feedPollOptions:null
            }
            this.setState({feedItem:feed})
            addImgeFeed(feed,this.state.postImage,this.handleAddFeedCallback)
        }  
    }
    else
    {
        Toast.show('Please Fill All The Fields.');
    }
  } 
  verifyImagePost=({postImage})=>postImage.type=='success'
  
  handleAddTextFeedBtnClick=()=>
  {
    if(this.verifyTextPost(this.state))
    {
        if(!this.state.addFeedLoading)
        {
            this.setState({addFeedLoading:true})
            let posterId  = this.props.postedBy==1?({insId:this.props.posterId}):({studentId:this.props.posterId})
            let feed = {
                feed:{
                    feedType:3,
                    description:this.state.description,
                    postedBy:this.props.postedBy,
                    ...posterId,
                    tags:this.state.tags,  
                    pollVotedInstitutes: ",",
                    pollVotedStudents: ",",
                    pollVoterList: ",",
                    feedLikerIns: ",",
                    feedLikerStudent: ",",  
                },
                feedPollOptions:null
            }
            this.setState({feedItem:feed})
            saveFeed(feed,this.handleAddFeedCallback)
        } 
    }
    else
    {
        Toast.show('Please Fill All The Fields.');
    }
  } 
  verifyTextPost=({description})=>description

  
  handleImageBtnClick=()=>
  {
      DocumentPicker.getDocumentAsync({type:"image/*",copyToCacheDirectory:true,multiple:false}).then(response=>
          {
              console.log(response)
              if(response.type=="success")
              {
                  this.setState({postImage:response})
              }
          })
  }

handleNextBtnClick=()=>
{
    this.setState({stepCheck:2})
}
feedOption=(icon,name,onPress)=>
{
    return(
        <TouchableOpacity style={{flex:1,flexDirection:'row',padding:10,borderBottomWidth:1,borderBottomColor:theme.labelOrInactiveColor}} onPress={onPress}> 
            <View style={{}}>
                <Feather name={icon} color={theme.accentColor} size={20}/>
            </View>
            <View>
                <Text>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}
renderFeedTypeOptions=()=>
{
    return (
        <View>
            {this.feedOption("image","Image Post",()=>{this.setState({postType:1,stepCheck:2})})}
            {this.feedOption("align-left","Text Post",()=>{this.setState({postType:3,stepCheck:2})})}
            {this.feedOption("bar-chart-2","Poll",()=>{this.setState({postType:2,stepCheck:2})})}
        </View>
    )
}


  renderAddImagePostForm=()=>{
      return ( 
        <View> 
                <TouchableOpacity onPress={this.handleImageBtnClick}>
                    <Image style={{width: '100%',height: 200,resizeMode:'contain'}} source={{uri:this.state.postImage?this.state.postImage.uri:addBannerImagePlaceholder}}/>
                </TouchableOpacity >
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Post Description</Text>
                        {CardView(
                            <TextInput 
                                placeholderTextColor={theme.greyColor} 
                                placeholder="Description" 
                                onChangeText={(text)=>this.setState({description: text})} 
                                multiline={true} 
                                numberOfLines={3} 
                                style={styles.inputField}
                            />, {borderRadius: 10}
                        )}
                </View> 
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Tags (# Separated)</Text>
                        {CardView(
                            <TextInput 
                                placeholderTextColor={theme.greyColor} 
                                placeholder="Tags" 
                                onChangeText={(text)=>this.setState({tags: text})} 
                                multiline={true} 
                                numberOfLines={3} 
                                style={styles.inputField}
                            />, {borderRadius: 10}
                        )}
                </View>
                 <View style={styles.btnView}>
                    <TouchableOpacity style={styles.submitButton} onPress={this.handleAddImageFeedBtnClick}>
                          {this.state.addFeedLoading?
                          (
                                <ActivityIndicator color={theme.primaryColor} size={"large"}/>
                          ):( 
                                <Text style={styles.submitButtonText}>Add</Text>
                            )}
                    </TouchableOpacity>
                     
                </View>

        </View>
      )
  }

  addPollOptions=()=>
  {
      let pollOptions  = this.state.pollOptions;
      let pollOptionCounter = this.state.pollOptionCounter+1;
      pollOptions.push({pollOption:''})
      this.setState({pollOptions,pollOptionCounter})

  }
  removePollOption=() => {
    let pollOptions  = this.state.pollOptions;
    
    let pollOptionCounter = this.state.pollOptionCounter-1;
    pollOptions.pop()
     
    this.setState({pollOptions,pollOptionCounter})
  }
  onChangeTextPollOption=(index,text)=>
  {
        let pollOptions = this.state.pollOptions;
        pollOptions[index]['pollOption'] = text;
        this.setState({pollOptions})
  }
  renderPollOption=(item,index)=>
  {
        return (
            <View style={styles.inputView}>
                <Text style={styles.labelText}>Poll Option {index+1}</Text>
                {CardView(
                    <TextInput 
                        placeholderTextColor={theme.greyColor} 
                        placeholder="Option" 
                        onChangeText={(text)=>this.onChangeTextPollOption(index, text)} 
                        multiline={true} 
                        numberOfLines={2} 
                        style={styles.inputField}
                    />, {borderRadius: 10}
                )}
            </View> 
        )
  }
  renderAddPollPostForm=()=>
  {
    return ( 
        <View>  
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Poll Question</Text>
                        {CardView(
                            <TextInput 
                                placeholderTextColor={theme.greyColor} 
                                placeholder="Question" 
                                onChangeText={(text)=>this.setState({pollQuestion: text})} 
                                multiline={true} 
                                numberOfLines={3} 
                                style={styles.inputField}
                            />, {borderRadius: 10}
                        )}
                </View> 
                <View>
                    <View style={{flex: 1,flexDirection:'row'}}>
                        <TouchableOpacity style={{backgroundColor:theme.featureYesColor,margin:10,padding:10}} onPress={this.addPollOptions}>
                            <Feather name="plus" size={20} color={theme.accentColor} />
                        </TouchableOpacity>
                        {this.state.pollOptionCounter>2?(

                        <TouchableOpacity style={{backgroundColor:theme.featureNoColor,margin:10,padding:10}} onPress={this.removePollOption}>
                            <Feather name="minus" size={20} color={theme.accentColor} />
                        </TouchableOpacity>
                        ):(null)}
                        
                    </View>
                    <FlatList 
                        data={this.state.pollOptions}  
                        renderItem={({item,index}) =>this.renderPollOption(item,index)}
                        keyExtractor={(item,index) =>index.toString()}
                    />
                </View> 
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Tags (# Separated)</Text>
                        {CardView(
                            <TextInput 
                                placeholderTextColor={theme.greyColor} 
                                placeholder="Tags" 
                                onChangeText={(text)=>this.setState({tags: text})} 
                                multiline={true} 
                                numberOfLines={3} 
                                style={styles.inputField}
                            />, {borderRadius: 10}
                        )}
                </View>
                 <View style={styles.btnView}>
                    <TouchableOpacity style={styles.submitButton} onPress={this.handleAddPollFeedBtnClick}>
                          {this.state.addFeedLoading?
                          (
                                <ActivityIndicator color={theme.primaryColor} size={"large"}/>
                          ):( 
                                <Text style={styles.submitButtonText}>Add</Text>
                            )}
                    </TouchableOpacity>
                     
                </View>

        </View>
      )
  }
  renderAddTextPostForm=()=>
  {
    return ( 
        <View> 
                {/* <TouchableOpacity onPress={this.handleImageBtnClick}>
                    <Image style={{width: '100%',height: 200,resizeMode:'contain'}} source={{uri:this.state.postImage?this.state.postImage.uri:addBannerImagePlaceholder}}/>
                </TouchableOpacity > */}
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Post Description</Text>
                        {CardView(
                            <TextInput 
                                placeholderTextColor={theme.greyColor} 
                                placeholder="Description" 
                                onChangeText={(text)=>this.setState({description: text})} 
                                multiline={true} 
                                numberOfLines={3} 
                                style={styles.inputField}
                            />, {borderRadius: 10}
                        )}
                </View> 
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Tags (# Separated)</Text>
                        {CardView(
                            <TextInput 
                                placeholderTextColor={theme.greyColor} 
                                placeholder="Tags" 
                                onChangeText={(text)=>this.setState({tags: text})} 
                                multiline={true} 
                                numberOfLines={3} 
                                style={styles.inputField}
                            />, {borderRadius: 10}
                        )}
                </View>
                 <View style={styles.btnView}>
                    <TouchableOpacity style={styles.submitButton} onPress={this.handleAddTextFeedBtnClick}>
                          {this.state.addFeedLoading?
                          (
                                <ActivityIndicator color={theme.primaryColor} size={"large"}/>
                          ):( 
                                <Text style={styles.submitButtonText}>Add</Text>
                            )}
                    </TouchableOpacity>
                     
                </View>

        </View>
      )
  }

  renderFeedSteps=(stepCheck)=>{
      switch(stepCheck)
      {
          case 1:
              return (
                this.renderFeedTypeOptions()
              )
        case 2:
            switch(this.state.postType)
            {
                case 1:
                    return (
                        this.renderAddImagePostForm()
                        ) 
                case 2:
                    return (
                        this.renderAddPollPostForm()
                        ) 
                case 3:
                    return (
                        this.renderAddTextPostForm()
                        )  
            }

      }
  }


  renderButton=(name,icon,onPress)=>
  {
    return(
        <TouchableOpacity style={{flex:1,flexDirection:'column',padding:10,alignItems: 'center'}} onPress={onPress}> 
            <View style={{}}>
                <Feather name={icon} color={theme.accentColor} size={20}/>
            </View>
            <View>
                <Text>{name}</Text>
            </View>
        </TouchableOpacity>
    )
  }
  render() {
     
    return (
        <Modal 
            animationType = {"fade"} 
            transparent = {false}
            visible = {this.props.isAddCourseModalVisible}
            onRequestClose = {() => this.props.closeModal()}>
    
            <ScrollView>
                <View style={styles.headView}> 
                   <Text style={styles.headText}>Add Feed</Text>
                </View>
                {/* {this.renderFeedSteps(this.state.stepCheck)} */}



                <View style={{borderWidth:1,borderColor:theme.labelOrInactiveColor,margin:10,borderRadius:10}}>
                    <TextInput
                        style={{height:250,fontFamily:'Raleway_400Regular',marginHorizontal:10}}
                        placeholder="Write Something...."

                    />
                    <View style={{flex:1,flexDirection:'row',justifyContent: 'flex-end'}}>
                        <View style={{marginHorizontal:10}}>
                        {this.renderButton("Poll","bar-chart-2",()=>{})} 
                        </View>
                        <View style={{marginHorizontal:10}}>
                        {this.renderButton("Image","image",()=>{})} 
                        </View>
                        <View style={{marginHorizontal:10,backgroundColor:theme.labelOrInactiveColor,borderTopLeftRadius:10,borderTopRightRadius:10}}>
                        {this.renderButton("Post","align-left",()=>{})} 
                        </View>
                    </View>
                </View>
                {/* <View style={styles.btnView}>
                    <TouchableOpacity style={styles.submitButton} onPress={this.handleNextBtnClick}>
                          {this.state.addCourseLoading?
                          (
                                <ActivityIndicator color={theme.primaryColor} size={"large"}/>
                          ):( 
                                <Text style={styles.submitButtonText}>Next</Text>
                            )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addMoreButton}>
                            <Text style={styles.addMoreButtonText}>Add More+</Text>
                    </TouchableOpacity>
                </View> */}
            </ScrollView>
   

    </Modal>

    );
  }
}

const styles = StyleSheet.create({
    headView:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
        headText:
        {
            marginTop:10,
            fontSize: 24, 
            fontFamily: 'Raleway_600SemiBold',
            color: theme.secondaryColor
        },
    inputView: {
        marginTop:'5%',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10
    },
        labelText: {
            fontSize: 18,
            fontWeight: '700',
            color: theme.secondaryColor,
            marginBottom: 10,
        },
        inputField:
        {
            padding:10,
            fontSize: 16
        },
    btnView:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
        submitButton:
        {
            borderRadius: 10,
            backgroundColor:theme.accentColor,
            padding: 10,
            marginRight:10
        },
            submitButtonText:
            {
                color: theme.primaryColor
            },
        addMoreButton:
        {
            borderRadius: 10,
            backgroundColor:theme.addMoreButtonColor,
            padding: 10,
            marginLeft: 10
        },
            addMoreButtonText:
            {
                color: theme.primaryColor
            },


    // add course css end
});

export default AddFeedModal;
