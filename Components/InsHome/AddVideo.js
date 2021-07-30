import React from 'react';
import {Text, View,StyleSheet, TextInput, TouchableOpacity, ScrollView,ActivityIndicator} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth, serverBaseUrl, videoDefaultThumbnail} from '../config'
import CardView from '../Utils/CardView';
import * as DocumentPicker from 'expo-document-picker';
import {addCourseVideo,fetch_video_playlist} from '../Utils/DataHelper/Course'
import { Picker } from 'native-base';
import { Feather } from '@expo/vector-icons';
import AddVideoPlaylist from './AddVideoPlaylist';
import Toast from 'react-native-simple-toast';

class AddVideo extends React.Component {
    state = {
        title: "",
        description: "",
        video: "",
        loadingPlaylist:true,
        selectedPlaylist:-1,
        playlist:[],
        loadingAddVideo:false
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
    handleAddVideoCallBack=(response)=>
    {
        if(response.status==201)
        {     
            Toast.show('Video Added Successfully.');
            let details = response.headers.map.location.split("*");
            this.props.route.params.appendVideo({id:details[0],videoLocation:serverBaseUrl+details[1],name:this.state.title,description:this.state.description,isDemo:false,courseId:this.props.route.params.courseId,videoThumb:videoDefaultThumbnail})
        
            this.props.navigation.goBack();
        } 
        else{
            Toast.show('Something Went Wrong. Please Try Again Later.');
        }
        this.setState({loadingAddVideo:false})
    }
    handleSubmitButtonClick=()=>
    {
        if(this.verify(this.state))
        {
            if(!this.state.loadingAddVideo)
            {

            this.setState({loadingAddVideo:true});
            addCourseVideo(this.state.video,this.state.title,this.state.description,false,'0',this.props.route.params.courseId,this.handleAddVideoCallBack,this.state.selectedPlaylist)
            }
        }
        else
        {
            Toast.show('Please Fill All The Fields.');
        }
    }

    verify=({title,description,video})=>title&&description&&video.type=='success'
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
            >
                <ScrollView>
                    <View style={styles.headView}>
                        <Text style={styles.headText}>Add Video</Text>
                    </View>
                    <View style={styles.inputView}>
                            <Text style={styles.labelText}>Video Title</Text>
                            {CardView(
                                <TextInput 
                                    placeholderTextColor={theme.greyColor} 
                                    placeholder="Title" 
                                    defaultValue={this.props.description} 
                                    onChangeText={(text)=>this.setState({title: text})} 
                                    style={styles.inputField}
                                />, {borderRadius: 10}
                            )}
                    </View>
                    <View style={styles.inputView}>
                    <Text style={styles.labelText}>Video Description</Text>
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
                    {!this.state.loadingPlaylist?(
                            <View style={styles.inputView}>
                                
                            <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                    <Text style={styles.labelText}>Video Playlist</Text>
                                    <Feather name="plus" onPress={()=>this.openModal()} size={20}/>
                            </View> 
                            {CardView(
                                <View style={styles.dropdownView}>
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
                                </View> ,{marginTop: 10, padding: 12})}
                            </View>
                            ):(null)}
                    <View style={styles.inputView}>
                            <Text style={styles.labelText}>Video</Text>
                            <TouchableOpacity style={styles.submitButton} onPress={this.handleAddVideoClick}>
                                <Text style={styles.submitButtonText}>Choose Video</Text>
                            </TouchableOpacity>
                    </View>
                    <View style={styles.btnView}>
                        <TouchableOpacity style={styles.submitButton} onPress={this.handleSubmitButtonClick}>
                            {this.state.loadingAddVideo?(
                                <ActivityIndicator color={theme.primaryColor} style={"large"}/>
                            ):(
                                <Text style={styles.submitButtonText}>Submit</Text>
                            )}
                                
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addMoreButton}>
                                <Text style={styles.addMoreButtonText}>Add More+</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {this.state.isModalVisible?(
                            <AddVideoPlaylist    appendPlaylist={this.appendPlaylist} isModalVisible={this.state.isModalVisible} closeModal={this.closeModal} courseId={this.props.route.params.courseId}/>
                ):(
                    null
                )}
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
            fontWeight: 'bold',
            color: theme.secondaryColor
        },
    inputView: {
        marginTop:'5%',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
        alignItems: 'flex-start'
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
})

export default AddVideo;