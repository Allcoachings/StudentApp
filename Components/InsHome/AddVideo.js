import React from 'react';
import {Text, View,StyleSheet,Image, TextInput, TouchableOpacity, ScrollView,ActivityIndicator,Dimensions} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth, serverBaseUrl, videoDefaultThumbnail} from '../config'
import CardView from '../Utils/CardView';
import * as DocumentPicker from 'expo-document-picker';
import {addCourseVideo,fetch_video_playlist} from '../Utils/DataHelper/Course'
import { Picker } from 'native-base';
import { Feather } from '@expo/vector-icons';
import AddVideoPlaylist from './AddVideoPlaylist';
import Toast from 'react-native-simple-toast';
import RatingBar from '../Utils/RatingBar';
const width = Dimensions.get('window').width
const height = Dimensions.get('screen').width
class AddVideo extends React.Component {
    state = {
        title: "",
        description: "",
        video: {},
        videoThumb:{},
        loadingPlaylist:true,
        selectedPlaylist:-1,
        playlist:[],
        loadingAddVideo:false,
    }
    handleAddVideoClick=()=>
    {
        DocumentPicker.getDocumentAsync({type:"video/*",copyToCacheDirectory:true,multiple:false}).then(response=>
        {
            
            if(response.type=="success")
            {
                this.setState({video:response})
            }
        })
    }
    handleAddVideoThumbnailClick=()=>
    {
        DocumentPicker.getDocumentAsync({type:"image/*",copyToCacheDirectory:true,multiple:false}).then(response=>
        {
            
            if(response.type=="success")
            {
                this.setState({videoThumb:response})
            }
        })
    }
    handleAddVideoCallBack=(response)=>
    {
        if(response.status==201)
        {     
            Toast.show('Video Added Successfully.');
            let details = response.headers.map.location.split("*");
            this.props.route.params.appendVideo({id:details[0],views:0,videoLocation:serverBaseUrl+details[1],name:this.state.title,description:this.state.description,isDemo:false,courseId:this.props.route.params.courseId,videoThumb:this.state.videoThumb.uri})
        
            this.props.navigation.goBack();
        } 
        else{
            Toast.show('Something Went Wrong. Please Try Again Later.');
        }
        this.setState({loadingAddVideo:false})
    }
    
    handleProgressCallback=(percentage) =>
    {
        this.setState({percentage})
    }

    handleSubmitButtonClick=()=>
    {
        if(this.verify(this.state))
        {
            if(!this.state.loadingAddVideo)
            {

            this.setState({loadingAddVideo:true});
            addCourseVideo(this.state.video,this.state.videoThumb,this.state.title,this.state.description,false,'0',this.props.route.params.courseId,this.handleAddVideoCallBack,this.handleProgressCallback,this.state.selectedPlaylist)
            }
        }
        else
        {
            Toast.show('Please Fill All The Fields.');
        }
    }

    verify=({title,description,video,videoThumb})=>title&&description&&video.type=='success'&&videoThumb&&videoThumb.type=='success'
    openModal=()=>
    {
        this.setState({isModalVisible: true})
    }
    closeModal=()=>
    {
        this.setState({isModalVisible: false})
    }

    handlePlaylistCallback=(response)=>
    {
        console.log("response playlist",response.status)
        if(response.status == 200)
        {
            response.json().then(response=>
            { 
                console.log("response",response)
                response.unshift({id:-1,name:"Select Playlist"})
                this.setState({playlist: response,loadingPlaylist:false})
            })
                
        }else
        {
            Toast.show('Something Went Wrong.');
        }
        
    }

    componentDidMount () 
    {
        fetch_video_playlist(this.props.route.params.courseId,this.handlePlaylistCallback)
    }
    renderPickerItem=(item)=>
    {
        console.log(item)
        return( 
           
            <Picker.Item label={item.name} value={item.id} />
        )
    }
    setSelectedPlaylist=(selectedPlaylist)=>
    {
    
            this.setState({selectedPlaylist})
    }
    appendPlaylist=(obj)=>
    {
        let playlist = this.state.playlist;
        playlist.push(obj)
        this.setState({playlist})
        this.props.route.params.appendCourseVideoPlaylist(obj);

    }
    render() {
         
        return(
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}     
                nosearchIcon={true}
                noNotificationIcon={true}
            >
                 <ScrollView>
                    
                    <View style={styles.headView}>
                        <Text style={styles.headText}>Add Video</Text> 
                    </View>
                    <View style={styles.inputView}> 
                            <TouchableOpacity style={styles.submitButton} onPress={this.handleAddVideoClick}>
                                <Text style={styles.submitButtonText}>Choose Video</Text>
                            </TouchableOpacity>
                            {this.state.video.name&&<Text style={{fontFamily: 'Raleway_600SemiBold'}}>{this.state.video.name}</Text>}
                    </View>
                    <View style={[styles.inputView,{marginTop:10}]}> 
                            {this.state.videoThumb.uri?(
                                <> 
                                    <Image source={{uri:this.state.videoThumb.uri}} style={{alignSelf: 'center',width:100,height:100,borderWidth: 1,borderColor: theme.labelOrInactiveColor,margin:10}}/>
                                    <Text style={{fontFamily: 'Raleway_600SemiBold'}}>{this.state.videoThumb.name}</Text>
                                </>
                            ):(null)}
                            
                            <TouchableOpacity style={styles.submitButton} onPress={this.handleAddVideoThumbnailClick}>
                                <Text style={styles.submitButtonText}>Choose Video Thumbnail</Text>
                            </TouchableOpacity>
                    </View>
                    <View style={styles.inputView}>
                            <Text style={styles.labelText}>Video Title</Text>
                       
                                <TextInput 
                                    placeholderTextColor={theme.greyColor} 
                                    placeholder="Title" 
                                    defaultValue={this.props.description} 
                                    onChangeText={(text)=>this.setState({title: text})} 
                                    style={styles.inputField}
                                /> 
                         
                    </View>
                    <View style={styles.inputView}>
                                <Text style={styles.labelText}>Video Description</Text> 
                                <TextInput 
                                    placeholderTextColor={theme.greyColor} 
                                    placeholder="Description" 
                                    onChangeText={(text)=>this.setState({description: text})} 
                                    multiline={true} 
                                    numberOfLines={3} 
                                    style={styles.inputField}
                                /> 
                    </View>
                    {!this.state.loadingPlaylist?(
                            <View style={styles.inputView}>
                                
                            <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                    <Text style={styles.labelText}>Video Playlist</Text>
                                    <Feather name="plus" onPress={()=>this.openModal()} size={20}/>
                            </View> 
                            
                                <View style={styles.inputField}>
                                    <Picker 
                                        style={{ height:30 }}
                                        selectedValue={this.state.selectedPlaylist}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setSelectedPlaylist(itemValue)
                                        }> 
                                        {this.state.playlist&&this.state.playlist.map((item)=>this.renderPickerItem(item))}
                                        </Picker>
                                    {/* <DropDownPicker
                                        placeholder="Select Category"
                                        placeholderTextColor={theme.greyColor}
                                        containerStyle={{borderColor: theme.greyColor}}
                                        items={this.state.categories}
                                        open={this.state.open}
                                        setOpen={this.open}
                                        value={this.state.selectedPlaylist}
                                        setValue={this.setValue}
                                        dropdownContainerStyle={{
                                            zIndex:1000,
                                            elevation:100
                                        }}
                                    /> */}
                                </View>  
                            </View>
                            ):(null)}


                        {this.state.percentage?(
                            <View style={{borderWidth:1,borderColor:theme.accentColor,borderRadius:5,margin:10}}>
                                <RatingBar labelStyle={{color:theme.accentColor}} progressStyle={{color:theme.accentColor} } progressColor={theme.accentColor+'1A'} duration={0} backgroundColor={theme.primaryColor} height={40} label={"Uploading Video ..."} showProgress={this.state.percentage} progress={100} borderRadius={5}/>
                            </View> 
                        ):(null)}            
                   
                    <View style={styles.btnView}>
                        <TouchableOpacity style={styles.submitButton} onPress={this.handleSubmitButtonClick}>
                            {this.state.loadingAddVideo?(
                                <ActivityIndicator color={theme.primaryColor} style={"large"}/>
                            ):(
                                <Text style={styles.submitButtonText}>Submit</Text>
                            )}
                                
                        </TouchableOpacity>
                        
                    </View>
              
                {this.state.isModalVisible?(
                            <AddVideoPlaylist  appendPlaylist={this.appendPlaylist} isModalVisible={this.state.isModalVisible} closeModal={this.closeModal} courseId={this.props.route.params.courseId}/>
                ):(
                    null
                )}
               
                </ScrollView>
           </PageStructure>
        )}
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
        marginLeft: 10, 
    },
        labelText: {
             
            fontSize: 18,
            fontFamily: 'Raleway_600SemiBold',
            color: theme.secondaryColor,
            marginBottom: 10,
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
    btnView:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center', 
        marginTop:'auto',
        width: width-30,
        margin:10,
        alignItems: 'center'
    },
        submitButton:
        {
            borderRadius: 10,
            backgroundColor:theme.accentColor,
            padding: 10,
          
            width:'100%',
        },
            submitButtonText:
            {
                color: theme.primaryColor,
                textAlign: 'center'
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
})

export default AddVideo;