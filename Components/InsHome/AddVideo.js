import React from 'react';
import {Text, View,StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth, serverBaseUrl, videoDefaultThumbnail} from '../config'
import CardView from '../Utils/CardView';
import * as DocumentPicker from 'expo-document-picker';
import {addCourseVideo} from '../Utils/DataHelper/Course'

import {Picker} from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';
import AddVideoPlaylist from './AddVideoPlaylist';
class AddVideo extends React.Component {
    state = {
        title: "",
        description: "",
        video: "",
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
                 
                let details = response.headers.map.location.split("*");
                this.props.route.params.appendVideo({id:details[0],videoLocation:serverBaseUrl+details[1],name:this.state.title,description:this.state.description,isDemo:false,courseId:this.props.route.params.courseId,videoThumb:videoDefaultThumbnail})
                this.props.navigation.goBack();
            }
    }
    handleSubmitButtonClick=()=>
    {
            if(this.verify(this.state))
            {
                addCourseVideo(this.state.video,this.state.title,this.state.description,false,'0',this.props.route.params.courseId,this.handleAddVideoCallBack)
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
                            <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                <Text style={styles.labelText}>Video Playlist</Text>
                                <Feather name="plus" onPress={()=>this.openModal()} size={20}/>
                            </View> 
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
                    {!this.state.loadingCategory?(
                            <View style={styles.inputView}>
                                <Text style={styles.labelText}>Video Description</Text>
                                {CardView(
                                    <View style={styles.dropdownView}>
                                        <Picker
                                            style={{height:30}}
                                            selectedValue={this.state.selectedCategory}
                                            onValueChange={(itemValue, itemIndex) =>
                                                this.setSelectedCategory(itemValue)
                                            }>
                                                {/* <Picker.Item label="Java" value="java" />
                                                <Picker.Item label="JavaScript" value="js" /> */}
                                            {this.state.categories&&this.state.categories.map((item)=>this.renderPickerItem(item))}
                                        </Picker>
                                        {/* <DropDownPicker
                                            placeholder="Select Category"
                                            placeholderTextColor={theme.greyColor}
                                            containerStyle={{borderColor: theme.greyColor}}
                                            items={this.state.categories}
                                            open={this.state.open}
                                            setOpen={this.open}
                                            value={this.state.selectedCategory}
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
                                <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addMoreButton}>
                                <Text style={styles.addMoreButtonText}>Add More+</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {this.state.isModalVisible?(
                            <AddVideoPlaylist isModalVisible={this.state.isModalVisible} closeModal={this.closeModal}/>
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