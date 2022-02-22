import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Modal, Dimensions,StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { dataLimit, imageProvider, theme } from '../config';
import CardView from '../Utils/CardView';
import BackArrow from '../Utils/Icons/BackArrow'

import Toast from 'react-native-simple-toast';
import * as ImagePicker from 'expo-image-picker';
import { addMessageImage, getStudentChatMessagesForCourse, fetch_messages,saveMessage } from '../Utils/DataHelper/StudentMessage';
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import SingleStudentMessage from './SingleStudentMessage';

const height = Dimensions.get('window').height
const SendMessage =({isVisible,closeModal,title,forAdmin,courseId,instituteId,studentId,messageType})=> {

    const descriptionTextInput = useRef()
    const [description,setDescription] = useState('')
    const [messageImages,setMessageImages] = useState([])
    const [loader,setLoader] = useState(false)
    const [offset,setOffset] = useState(0)
    const [messages,setMessages] = useState([])
    const [loading,setLoading] = useState(true)
    const sendMessage = ()=>
    {

        if(!loader)
        {
            setLoader(true)
            let msgObj = {forAdmin,courseId,student:{id:studentId},messageType,message:description}
            if(instituteId)
            {
                msgObj.institute={id:instituteId}
            }
            if(messageImages.length>0)
            {
                addMessageImage(msgObj,messageImages,addMessageCallback)
            }else
            {
                saveMessage(msgObj,addMessageCallback)
            }
            
        }
        

    }

    useEffect(() => {
        if(instituteId&&studentId&&courseId&&messageType =="instituteCourseRelated")
        {
              
            getStudentChatMessagesForCourse(instituteId,studentId,courseId,offset,dataLimit,(response)=>{
                if(response.status==200)
                {
                    response.json().then(data=>{
                        setMessages(data) 
                        setLoading(false)
                    }) 
                }
            })
        }else if(messageType !="instituteCourseRelated") 
        {
            fetch_messages(true,messageType,studentId,offset,dataLimit,(response)=>{
                if(response.status==200)
                {
                    response.json().then(data=>{
                        setMessages(data) 
                        setLoading(false)
                    }) 
                }
            })
        }
        
    },[instituteId,studentId,courseId,offset,messageType])
    const addMessageCallback=(response)=>
    {
        if(response.status==201)
        {
            Toast.show("Message Sent Successfully")
            setMessageImages([])
            setDescription('')
            setLoader(false)
            closeModal()
        }
    }

    const check = async () => 
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
                handleImageBtnClick();
            }
        }
    }

    const removeImage=(item,index)=>
    {
        let messageImages_arr = [...messageImages]
        messageImages_arr.splice(index, 1);
        // this.setState(messageImages);
        setMessageImages(messageImages_arr)
    }
    const  renderimages=(item,index)=>
    {
       
     
          return (
              <View style={styles.imageContainer}>
                  <TouchableWithoutFeedback onPress={()=>removeImage(item,index)}>
                      <View style={styles.deleteImageIcon}>
                          <Feather name="x" size={20} color={theme.featureNoColor}/>
                      </View>
                  </TouchableWithoutFeedback> 
                  <Image source={{uri:  (imageProvider(item.image||item.uri))}} style={styles.image}/>
              </View>
          )
       
    }
    const   renderImageSection=()=>
    {
        return (
            <View >
   
                <FlatList
                      data={messageImages}
                      renderItem={({item,index}) =>renderimages(item,index)}
                      keyExtractor={(item,index)=>index.toString()}
                      horizontal={true}
                />
            </View>
        )
    }
    const handleImageBtnClick=async()=>
    {
  
     
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [1,1],
            quality: 1,
          });
  
  
          if(result.uri != null)
          {
               
              let images  = [...messageImages];
                    images.unshift(result)  
                    setMessageImages(images)
              
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

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            onShow={ () => { descriptionTextInput.current.focus(); }}
            onRequestClose={closeModal}>
             <View style={{backgroundColor:"#fff",height: height}}>
                {CardView(
                    <View style={{flex: 1,flexDirection: 'row',alignItems: 'center'}}>
                        {/* <View> */}
                            <TouchableWithoutFeedback onPress={()=>closeModal()}>
                                <View style={{marginLeft:10,marginRight:5}}>
                                    <BackArrow height={24} width={24}/>
                                </View> 
                            </TouchableWithoutFeedback>
                        {/* </View> */}
                        <View style={{marginBottom:5}}>
                          <Text 
                              style={{fontFamily: 'Raleway_600SemiBold',fontSize:18}} 
                          >
                              {title?title:"Send Message"}
                          </Text>
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

                {/* {this.state.loadingData?(
                    <CustomActivtiyIndicator mode="testItem" />
                  ):(
                    this.state.showResult?(
                      <FlatList 
                        data={this.state.searchData}  
                        showsVerticalScrollIndicator={false} 
                        renderItem={this.props.singleItem}
                        // numColumns={3}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                      />
                ):(
                  null
                ))} */}
                <View>

                    <FlatList

                        keyExtractor={(item,index)=>index.toString()}
                        data={messages}
                        renderItem={({item,index})=>(
                            <SingleStudentMessage
                                item={item}
                            />
                        )}

                        ListFooterComponent={
                            <>
                                <View style={{margin:10,marginBottom:50}}>

                                    {CardView(
                                        <View>
                                                <TextInput
                                                    style={{height:200 ,fontFamily:'Raleway_400Regular',marginHorizontal:10}}
                                                    placeholder="Type Message...."
                                                    multiline={true}  
                                                    ref={(input) => { descriptionTextInput.current = input; }}
                                                    defaultValue={description} 
                                                    onChangeText={(text)=>setDescription(text)}
                                                />
                
                                            <View style={{}}>
                                                {renderImageSection()} 
                                            </View>
                                            <TouchableWithoutFeedback onPress={check}>
                                                <View style={{alignSelf: 'flex-end',margin:10,flexDirection: 'row',}}>
                                                    <Feather name="image" size={20} color={theme.greyColor}/>
                                                    <Text style={{color:theme.greyColor,marginLeft:5,fontFamily: 'Raleway_600SemiBold'}}>Add Image</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    ,{width:'100%',borderRadius:5},2
                                    )}
                                    <TouchableWithoutFeedback onPress={sendMessage}>
                                        <View style={{paddingHorizontal:15,paddingVertical:5,backgroundColor:theme.accentColor,margin:10,borderRadius:15,alignSelf: 'flex-end'}}>
                                            {loader?
                                                <ActivityIndicator color={theme.primaryColor} size={"large"}/>
                                            :(<Text style={{color:theme.primaryColor,fontSize: 16}}>Send</Text>)}
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={{height:100}}/>
                            </>
                        }
                    />
                     
                </View>

           

                
            </View>   
                 
          </Modal>
    )
}

const styles = StyleSheet.create({

    imageContainer:
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
        image:
        {
            height:70,
            width: 70,
            borderRadius: 10
        },
})

export default SendMessage
