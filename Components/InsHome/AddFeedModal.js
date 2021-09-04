import { Feather } from '@expo/vector-icons';
import React, { Component } from 'react';
import { View, Text,StyleSheet,Modal,TouchableOpacity,TouchableWithoutFeedback,ActivityIndicator,ScrollView,Image,TextInput,FlatList } from 'react-native';
import { addBannerImagePlaceholder, theme, serverBaseUrl, imageProvider } from '../config';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure';
import CardView from '../Utils/CardView';
import {addImgeFeed,saveFeed} from '../Utils/DataHelper/Feed'
import * as DocumentPicker from 'expo-document-picker';
import Toast from 'react-native-simple-toast';


class AddFeedModal extends Component {
  state={
      stepCheck:2,//to check on which step user is in order to add a feed
      postType:3,//1 for image , 2 for poll 3 for text option 
      addFeedLoading:false,
      description:'',
      feedImageData:[],
      pollOptions:[
          { 
              pollOption:''
          },
          {
              
              pollOption:''
          }
        ],
      pollOptionCounter:2,
      feedItem:{},
      id: '',
      mode: "add",
      index: '',
      showFeedTypeOptions:false
  }

  updateState=(type, description, feedImages, pollOptions, id, index,date)=>{
      console.log(date);
    if(type==1)
    {
        this.setState({postType: type,creationTime: date, feedImageData: feedImages, description: description, mode: "edit", id: id, index: index})
    }
    else if(type==2)
    {
        this.setState({postType: type,creationTime: date, pollOptions: pollOptions, mode: "edit", id: id, description: description, pollOptionCounter: pollOptions.length, index: index})
    }
    else if(type==3)
    {
        this.setState({postType: type,creationTime: date, description: description, mode: "edit", id: id, index: index})
    }
    if(this.descriptionTextInput)
    {
        this.descriptionTextInput.focus(); 
    }
    
  }

  componentDidMount(){
        this.props.setUpdateFun(this.updateState)
  }

  handleAddFeedCallback=(response)=>
  {
      if(response.status==201)
      {
            if(this.state.mode=="edit")
            {
                Toast.show('Feed Updated Successfully.');
            }
            else
            {
                Toast.show('Feed Added Successfully.');
            }
          this.setState({addFeedLoading:false,description:"",feedImageData:[],pollOptions:[
            {
                
                pollOption:''
            },
            {
                
                pollOption:''
            }
          ]})
        let feedItem = {feed:this.state.feedItem};
        feedItem['posterObject']=this.props.instituteDetails

        // if(this.state.postType==1)
        // {
        //     let feedImagsArray=[];
        //     feedItem.feed.feedImages&&feedItem.feed.feedImages.map((item=>
        //     {
        //         feedImagsArray.push({feedImage:item})
        //     }))
        //     feedItem.feed.feedImages=feedImagsArray;
        // }

        
        if(this.state.mode!="edit"){ 

            this.props.addFeedCallBack(feedItem)
        }
        else
        {
         
            this.props.updateSingleFeed(feedItem, this.state.index)
        }
        // this.props.closeModal()
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
                    pollQuestion:this.state.description,
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
            if(this.state.mode=="edit")
            {
                feed.feed.id=this.state.id
                feed.feed.creationTime=this.state.creationTime
                 
            }
            this.setState({feedItem:feed}) 
            
            saveFeed(feed,this.handleAddFeedCallback)
          }
            
      }else
      {
        Toast.show('Please Fill All The Fields.');
      }
  }
  verifyPollPost=({description,pollOptions})=>description&&pollOptions.filter(item=>item.pollOption)

  handleAddImageFeedBtnClick=()=>
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
            if(this.state.mode=="edit")
            {
                feed.feed.id=this.state.id;
                feed.feed.creationTime=this.state.creationTime
            }
            this.setState({feedItem:feed})
            addImgeFeed(feed,this.state.feedImageData,this.handleAddFeedCallback)
        }  
     
  } 
 
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
            if(this.state.mode=="edit")
            {
                feed.feed.id=this.state.id
                feed.feed.creationTime=this.state.creationTime
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
      this.setFeedTypeOption(1);
      DocumentPicker.getDocumentAsync({type:"image/*",copyToCacheDirectory:true,multiple:false}).then(response=>
          {
           
              if(response.type=="success")
              {
                  let feedImageData  = this.state.feedImageData;
                  feedImageData.unshift(response)
                  this.setState({feedImageData})
                //   this.setState({postImage:response})
              }
          })
  }
 
 
setFeedTypeOption=(postType)=>
{
        this.setState({postType}); 
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
                    <TextInput 
                        placeholderTextColor={theme.greyColor} 
                        placeholder={"Option "+(index+1)} 
                        onChangeText={(text)=>this.onChangeTextPollOption(index, text)} 
                        multiline={true} 
                        numberOfLines={2} 
                        style={styles.inputField}
                        defaultValue={item.pollOption}
                    />  
            </View> 
        )
  }
 

  renderButton=(name,icon,onPress)=>
  {
    return(
        <TouchableOpacity style={{flex:1,flexDirection:'row',padding:10,alignItems: 'center'}} onPress={onPress}> 
            <View style={{marginTop:1}}>
                <Feather name={icon} color={theme.greyColor} size={17}/>
            </View>
            <View>
                <Text style={{fontFamily:'Raleway_600SemiBold',color: theme.greyColor,fontSize:14}}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
  }

  renderAddImageSection=()=>
  {
      return (
          <View >
 
              <FlatList
                    data={this.state.feedImageData}
                    renderItem={({item,index}) =>this.renderFeedImages(item,index)}
                    keyExtractor={(item,index)=>index.toString()}
                    horizontal={true}
              />
          </View>
      )
  }

  checkPostData=()=> {
    if(this.state.postType!=3&&this.state.feedImageData.length == 0 && this.state.pollOptions.filter(item=>item.pollOption=="").length==this.state.pollOptions.length)
    {
            this.setState({postType:3},()=>this.handleSubmitButtonClick())    
    }else
    {
        this.handleSubmitButtonClick()
    }
  }
  handleSubmitButtonClick=()=>
  {
    
   
    
      switch(this.state.postType)
      {
          case 1:
            this.handleAddImageFeedBtnClick();
            break;
          case 2:
            this.handleAddPollFeedBtnClick();
            break;
          case 3:
            this.handleAddTextFeedBtnClick();
            break;
      }
  }
  removeImage=(item,index)=>
  {
      let feedImageData = this.state.feedImageData
      feedImageData.splice(index, 1);
      this.setState(feedImageData);
  }
  renderFeedImages=(item,index)=>
  {
     
   
        return (
            <View style={styles.feedImageContainer}>
                <TouchableWithoutFeedback onPress={()=>this.removeImage(item,index)}>
                    <View style={styles.deleteImageIcon}>
                        <Feather name="x" size={20} color={theme.featureNoColor}/>
                    </View>
                </TouchableWithoutFeedback> 
                <Image source={{uri:  (imageProvider(item.feedImage||item.uri))}} style={styles.feedImage}/>
            </View>
        )
     
  }

  renderPollOPtionsSection=()=>
  {
        return (
            <View>
                
            <FlatList 
                data={this.state.pollOptions}  
                renderItem={({item,index}) =>this.renderPollOption(item,index)}
                keyExtractor={(item,index) =>index.toString()}
            />
            <View style={{flexDirection: 'row',alignItems: 'center',margin:10}}>
                    <Text style={{fontSize:18,fontFamily: 'Raleway_600SemiBold'}}>Poll Options</Text>
                    <View style={{flex: 1,flexDirection:'row',justifyContent: 'flex-end', alignItems: 'center'}}>
                        <TouchableOpacity style={{margin:10,padding:10}} onPress={this.addPollOptions}>
                            <Feather name="plus" size={20} color={theme.accentColor} />
                        </TouchableOpacity>
                        {this.state.pollOptionCounter>2?(

                        <TouchableOpacity style={{margin:10,padding:10}} onPress={this.removePollOption}>
                            <Feather name="minus" size={20} color={theme.accentColor} />
                        </TouchableOpacity>
                        ):(null)}
                        
                    </View>
                </View>
        </View> 
        );
  }
  onFocus=()=>
  {
      this.setState({showFeedTypeOptions: true})
  }
  render() {
      
    return (
        // <Modal 
        //     animationType = {"fade"} 
        //     transparent = {false}
        //     visible = {this.props.isAddCourseModalVisible}
        //     onRequestClose = {() => this.props.closeModal()}>
    
            <ScrollView>
                <View style={{flexDirection:'row',alignItems: 'center'}} >
                    <Image source={{uri: imageProvider(this.props.posterImage)}} style={{height: 50, width: 50, borderRadius: 25, borderWidth: 0.6, borderColor:theme.greyColor,}}/>
                    <View style={{borderWidth:1,flex:1,borderColor:theme.labelOrInactiveColor,margin:10,borderRadius:10}}>
                        <TextInput
                            style={{height:50,fontFamily:'Raleway_400Regular',marginHorizontal:10}}
                            placeholder="Write Something...."
                            multiline={true}  
                            ref={(input) => { this.descriptionTextInput = input; }}
                            defaultValue={this.state.description}
                            onFocus={ () => this.onFocus() }
                            onChangeText={(text)=>this.setState({description:text})}

                        />
                        {this.state.postType==1?(
                            <View style={{}}>
                                {this.renderAddImageSection()} 
                            </View>
                        ):(null)}
                        {this.state.postType==2?(
                            <View style={{}}>
                                {this.renderPollOPtionsSection()} 
                            </View>
                        ):(null)}
                        
                    {this.state.showFeedTypeOptions?( <View style={{flex:1,flexDirection:'row',justifyContent: 'flex-end'}}>
                            <View style={[styles.feedOption]}>
                            {this.renderButton("POLL","bar-chart-2",()=>this.setFeedTypeOption(2))} 
                            </View>
                            <View style={[styles.feedOption]}>
                            {this.renderButton("IMAGE","image",this.handleImageBtnClick)} 
                            </View>
                            <View style={[styles.feedOption]}>
                                {this.state.addFeedLoading?(
                                        <ActivityIndicator size={"large"} color={theme.accentColor}/>
                                ):
                                (
                                    <TouchableWithoutFeedback onPress={this.checkPostData}>
                                        <View style={[{flexDirection: 'row',padding:5,marginVertical:5,alignItems: 'center',borderRadius:3,marginTop:'auto',borderWidth: 1,borderColor:this.state.description?theme.accentColor:theme.labelOrInactiveColor},this.state.description?{backgroundColor: theme.accentColor}:{}]}>
                                            <Text style={{color:this.state.description?theme.primaryColor:theme.greyColor,fontSize:16}}>Post</Text>
                                            <Feather name="arrow-right" size={18} color={this.state.description?theme.primaryColor:theme.greyColor}/>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    // this.renderButton("Post","align-left",()=>this.handleSubmitButtonClick())
                                )}
                                    
                            </View>
                        </View>):(null)}

                    
                    </View>
                </View>
                {/* <TouchableWithoutFeedback onPress={this.handleSubmitButtonClick}>
                    <View style={{backgroundColor:theme.accentColor,padding:15,borderRadius:10,alignItems: 'center',width:'95%',alignSelf: 'center'}}> 
                        <Text style={{fontFamily:'Raleway_700Bold',fontSize:15,color:theme.primaryColor}}>Continue</Text> 
                    </View>
                </TouchableWithoutFeedback> */}
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
   

    // </Modal>

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
    feedOption:
    {
        marginHorizontal:10,
    },
    activeFeedOption:
    {
        backgroundColor:theme.labelOrInactiveColor,
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    feedImageContainer:
    {
        margin:5,
        
    },
        deleteImageIcon:
        {
            position:"absolute",
            right:0,
            top:0,
            zIndex:1000,
            elevation:1000
        },
        feedImage:
        {
            height:70,
            width: 70,
            borderRadius: 10
        },

    inputView: {
        marginTop:'5%',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10
    },
        labelText: {
            fontSize: 14, 
            color: theme.secondaryColor,
            marginBottom: 10,
            fontFamily:'Raleway_600SemiBold'
        },
        inputField:
        {
            
            borderRadius: 10,
            padding: 10,
            margin:10,
            borderWidth: 1,
            fontFamily: 'Raleway_600SemiBold',
            borderColor:theme.labelOrInactiveColor, 
        },

    // add course css end


});

export default AddFeedModal;
