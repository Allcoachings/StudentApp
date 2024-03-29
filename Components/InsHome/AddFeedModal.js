import { EvilIcons, Feather } from '@expo/vector-icons';
import React, { Component } from 'react';
import { View, Text,StyleSheet,Modal,TouchableOpacity,TouchableWithoutFeedback,ActivityIndicator,ScrollView,Image,TextInput,FlatList, Platform ,Dimensions} from 'react-native';
import { addBannerImagePlaceholder, theme, serverBaseUrl, imageProvider } from '../config';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure';
import CardView from '../Utils/CardView';
import {addImgeFeed,saveFeed} from '../Utils/DataHelper/Feed'
import * as DocumentPicker from 'expo-document-picker';
import Toast from 'react-native-simple-toast';

import BackArrow from "../Utils/Icons/BackArrow"
import * as ImagePicker from 'expo-image-picker';
const height = Dimensions.get('window').height;
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

  

componentDidUpdate(prevProps, prevState) {
    if(this.props.editFeedObj&&prevProps.editFeedObj!=this.props.editFeedObj)
    {
        if(this.props.editFeedObj.feed.feed.feedType==1)
        {
            this.setState({postType: this.props.editFeedObj.feed.feed.feedType,creationTime: this.props.editFeedObj.feed.feed.creationTime, feedImageData: this.props.editFeedObj.feed.feedImages?this.props.editFeedObj.feed.feedImages:[], description: this.props.editFeedObj.feed.feed.description, mode: "edit", id: this.props.editFeedObj.feed.feed.id, index: this.props.editFeedObj.index})
        }
        else if(this.props.editFeedObj.feed.feed.feedType==2)
        {
            this.setState({postType: this.props.editFeedObj.feed.feed.feedType,creationTime: this.props.editFeedObj.feed.feed.creationTime, pollOptions: this.props.editFeedObj.feed.feedPollOptions?this.props.editFeedObj.feed.feedPollOptions:[], mode: "edit", id: this.props.editFeedObj.feed.feed.id, description: this.props.editFeedObj.feed.feed.pollQuestion, pollOptionCounter: this.props.editFeedObj?.feed?.feedPollOptions?.length?this.props.editFeedObj?.feed?.feedPollOptions?.length:0, index: this.props.editFeedObj.index})
        }
        else if(this.props.editFeedObj.feed.feed.feedType==3)
        {
            this.setState({postType: this.props.editFeedObj.feed.feed.feedType,creationTime: this.props.editFeedObj.feed.feed.creationTime, description: this.props.editFeedObj.feed.feed.description, mode: "edit", id: this.props.editFeedObj.feed.feed.id, index: this.props.editFeedObj.index})
        }
        if(this.descriptionTextInput)
        {
            this.descriptionTextInput.focus(); 
        }
    }
}

  check = async () => 
  {
      if (Platform.OS !== 'web') 
      {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') 
          {
              alert('Sorry, we need camera roll permissions to make this work!');
          }
          else
          {
              this.handleImageBtnClick();
          }
      }
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

        // let feedItem = {feed:this.state.feedItem};
        // feedItem['posterObject']=this.props.instituteDetails

        // if(this.state.postType==1)
        // {
        //     let feedImagsArray=[];
        //     feedItem.feed.feedImages&&feedItem.feed.feedImages.map((item=>
        //     {
        //         feedImagsArray.push({feedImage:item})
        //     }))
        //     feedItem.feed.feedImagesD=feedImagsArray;
        // }

        
        if(this.state.mode!="edit"){ 
            let feedItem = {feed:{...this.state.feedItem,feed:{...this.state.feedItem.feed,id:response.headers.map.location}}};
               
            feedItem['posterObject']=this.props.instituteDetails
            this.props.addFeedCallBack(feedItem)

        }
        else
        {
         
            let feedItem = {feed: this.state.feedItem};
                feedItem['posterObject']=this.props.instituteDetails
            this.props.updateSingleFeed(feedItem, this.state.index)
            this.setState({mode:"add",id:null})
        }
        if(this.props.closeModal)
        {
            this.props.closeModal()
        }
        
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
                    categoryId:this.props.categoryId?this.props.categoryId:-1
                },
                feedPollOptions:this.state.pollOptions
            }
            if(this.state.mode=="edit")
            {
                feed.feed.id=this.state.id
                feed.feed.edited=true
                feed.feed.creationTime=this.state.creationTime
                 
            }
            this.setState({feedItem:feed}) 
            
            saveFeed(feed, this.handleAddFeedCallback)
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
                    categoryId:this.props.categoryId?this.props.categoryId:-1 
                },
                feedPollOptions:null
            }
            if(this.state.mode=="edit")
            {
                feed.feed.edited=true
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
                    categoryId:this.props.categoryId?this.props.categoryId:-1
                },
                feedPollOptions:null
            }
            if(this.state.mode=="edit")
            {
                feed.feed.id=this.state.id
                feed.feed.edited=true

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
  


  handleImageBtnClick=async()=>
  {

     this.setFeedTypeOption(1);
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [1,1],
          quality: 1,
        });


        if(result.uri != null)
        {
            // this.setState({localUri : result.uri})
          //   setImageUri(result.uri);
          //   // console.log(result);
          //   setImageLoading(true);
            // this.setState({changedImage:result,studentImagePrev:{uri:result.uri}})
            // console.log(result);
            let feedImageData  = [...this.state.feedImageData];
                  feedImageData.unshift(result)
                  this.setState({feedImageData})
            // this.setState({imageLoading:true})
          //   let filename = result.uri.split('/').pop();
          //   let match = /\.(\w+)$/.exec(filename);
          //   let type = match ? `image/${match[1]}` : `image`;
          //   uploadImageToServer(result.uri,filename,type,userDetails.id,uploadImageCallback)
        }
      
      // DocumentPicker.getDocumentAsync({type:"image/*",copyToCacheDirectory:true,multiple:false}).then(response=>
      // {
      //     // console.log(response)
      //     if(response.type=="success")
      //     {
      //         this.setState({changedImage:response,studentImagePrev:{uri:response.uri}})
      //         // console.log(response)
      //     }
      // })
  }
//   handleImageBtnClick=()=>
//   {
      
//       DocumentPicker.getDocumentAsync({type:"image/*",copyToCacheDirectory:true,multiple:false}).then(response=>
//           {
           
//               if(response.type=="success")
//               {
//                   let feedImageData  = this.state.feedImageData;
//                   feedImageData.unshift(response)
//                   this.setState({feedImageData})
//                 //   this.setState({postImage:response})
//               }
//           })
//   }
 
 
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
                        <EvilIcons name="plus" size={20} color={theme.accentColor} />
                    </TouchableOpacity>
                    {this.state.pollOptionCounter>2?(

                    <TouchableOpacity style={{margin:10,padding:10}} onPress={this.removePollOption}>
                        <EvilIcons name="minus" size={20} color={theme.accentColor} />
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
  resetFeedState=()=>
  {
      this.setState({  stepCheck:2,//to check on which step user is in order to add a feed
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
        showFeedTypeOptions:false})
  }





   switchAddFeedMode = (mode)=>{
       switch(mode)
       {
           case'modal':
            return(<Modal 
             
                transparent = {true}
                visible = {this.props.isVisible}
                onRequestClose = {() => this.props.closeModal()}>
                    <View style={{height:height,backgroundColor:theme.primaryColor}}> 
                    {CardView(
                        <View style={{flex: 1,flexDirection: 'row',alignItems: 'center'}}>
                            <TouchableWithoutFeedback onPress={()=>{this.props.closeModal()}}>
                            <View style={{marginLeft:10,marginRight:5}}>
                                <BackArrow height={24} width={24}/>
                            </View>
                            </TouchableWithoutFeedback>
                            <View>
                                <Text style={{fontFamily:'Raleway_600SemiBold',color: theme.greyColor,fontSize:18}}>Add Feed</Text>
                            </View>
                            <View style={{marginLeft:'auto'}}>
                                {/* {this.state.searchWord!=''?(
                                    this.state.filterData?(
                                        <TouchableOpacity onPress={() => this.setState({ searchWord: '', offset: 0, filterData: false, showResult: false, searchData: [] },() =>this.textInput.clear())}>
                                            <EvilIcons
                                            name="x"
                                            size={20} 
                                            color={theme.secondaryColor}
                                            style={styles.searchIcon}
                                            />
                                        </TouchableOpacity>
                                    ):(
                                        <TouchableOpacity onPress={()=>this.setState({filterData: true, loadingData: true},()=>this.props.searchFun(this.state.offset, this.state.searchWord, this.searchCallback))}>
                                            <EvilIcons 
                                            name={'chevron-right'} 
                                            size={15} 
                                            color={theme.labelOrInactiveColor} 
                                            style={styles.searchIcon}
                                            />
                                        </TouchableOpacity>
                                    )):(
                                        <Feather 
                                        name={'x'} 
                                        size={30} 
                                        color={theme.secondaryColor} 
                                        style={styles.searchIcon}
                                        />
                                )} */}
                                

                            </View>
                        </View>,
                        {width:'100%',height:50},2
                    )}
                        {this.addFeedLayout()}
                    </View>
            </Modal>)
         
                break;
            default:
                return this.addFeedLayout(mode);
       }
   }

   addFeedLayout = (mode)=>
   {
       console.log(mode)
       return (
                <ScrollView>
                    <View style={{flexDirection:'row',alignItems: 'center',backgroundColor:theme.primaryColor}} >
                        {this.props.mode=="showImage"?(
                            <Image source={{uri: imageProvider(this.props.posterImage)}} style={{height: 50, width: 50, borderRadius: 25, borderWidth: 0.6, borderColor:theme.greyColor,}}/>
                        ):(null)}
                        
                        <View style={{borderWidth:1,flex:1,borderColor:theme.labelOrInactiveColor,margin:10,borderRadius:10}}>

                            
                                {this.state.description?(<View style={{position: 'absolute',right:15,top:5,zIndex:10}}>
                                <TouchableOpacity onPre ss={()=>this.resetFeedState()}>
                                    <Feather name={'x'} color={theme.featureNoColor} size={18}/>
                                </TouchableOpacity> 
                                </View>):(null)}
                            {mode=="embbedd"?(

                                <Text
                                    style={{height:50 ,fontFamily:'Raleway_400Regular',marginHorizontal:10,textAlignVertical:'center'}}
                                >Create Post ...</Text>
                            ):(
                                <TextInput
                                    style={{height:50 ,fontFamily:'Raleway_400Regular',marginHorizontal:10}}
                                    placeholder="Create Post...."
                                    multiline={true}  
                                    ref={(input) => { this.descriptionTextInput = input; }}
                                    defaultValue={this.state.description}
                                    onFocus={ () => this.onFocus() }
                                    onChangeText={(text)=>this.setState({description:text})}
                                   
                                />
                            )}
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
                                {this.renderButton("IMAGE","image",this.check)} 
                                </View>
                                <View style={[styles.feedOption]}>
                                    {this.state.addFeedLoading?(
                                            <ActivityIndicator size={"large"} color={theme.accentColor}/>
                                    ):
                                    (
                                        <TouchableWithoutFeedback onPress={this.checkPostData}>
                                            <View style={[{flexDirection: 'row',padding:5,marginVertical:5,alignItems: 'center',borderRadius:3,marginTop:'auto',borderWidth: 1,borderColor:this.state.description?theme.accentColor:theme.labelOrInactiveColor},this.state.description?{backgroundColor: theme.accentColor}:{}]}>
                                                <Text style={{color:this.state.description?theme.primaryColor:theme.greyColor,fontSize:16}}>Post</Text>
                                                <Feather name="chevron-right" size={18} color={this.state.description?theme.primaryColor:theme.greyColor}/>
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
       )
   }
  render() {
         
    return (
        this.switchAddFeedMode(this.props.mode)
   

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
