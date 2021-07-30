import React from 'react';
import {Text, View,StyleSheet, TextInput, TouchableOpacity, ScrollView,ActivityIndicator } from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth, serverBaseUrl} from '../config'
import CardView from '../Utils/CardView';
import { Feather } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';;
import {fetch_document_playlist,addCourseDocument} from '../Utils/DataHelper/Course'
import { Picker } from 'native-base'; 
import AddDocumentPlaylist from './AddDocumentPlaylist';
import Toast from 'react-native-simple-toast';

class AddPdf extends React.Component {
    state = {
        title: '',
        document: '',
        playlist:[],
        selectedPlaylist:-1,
        loadingAddDocument:false
    }
    // async docPicker() {
    //         try 
    //         {
    //             const res = await DocumentPicker.pick({
    //                 type: [DocumentPicker.types.allFiles],
    //             });
    //             console.log(
    //                 res.uri,
    //                 res.type, // mime type
    //                 res.name,
    //                 res.size
    //             );
    //         this.uploadAPICall(res);//here you can call your API and send the data to that API
    //         } catch (err) {
    //             if (DocumentPicker.isCancel(err)) 
    //             {
    //                 console.log("error -----", err);
    //             }
    //             else 
    //             {
    //                 throw err;
    //             }
    //         }
    //   }

    renderInputFiled=()=>{
        return(
            CardView(
                <TextInput 
                    placeholderTextColor={theme.greyColor} 
                    placeholder="Add Document" 
                    defaultValue={this.props.description} 
                    onChangeText={(text)=>this.setState({document: text})} 
                    multiline={true} 
                    numberOfLines={6} style={styles.inputField}
                />, {borderRadius: 10}
            )
        )}
        setSelectedPlaylist=(selectedPlaylist)=>
        {
        
                this.setState({selectedPlaylist})
        }
        appendPlaylist=(obj)=>
        {
            let playlist = this.state.playlist;
            playlist.push(obj)
            this.setState({playlist})
            this.props.route.params.appendCourseDocumentPlaylist(obj);
    
        }
        renderPickerItem=(item)=>
        {
            console.log(item)
            return( 
               
                <Picker.Item label={item.name} value={item.id} />
            )
        }
        openModal=()=>
        {
            this.setState({isModalVisible: true})
        }
        closeModal=()=>
        {
            this.setState({isModalVisible: false})
        }
        handleAddDocumentCallBack=(response)=>
        {
            this.setState({loadingAddDocument:false})
            if(response.status==201)
            {     
                Toast.show('Document Added Successfully.');
                let details = response.headers.map.location.split("*");
                this.props.route.params.appendDocument({id:details[0],fileAddr:serverBaseUrl+details[1],name:this.state.title,courseId:this.props.route.params.courseId})
                this.props.navigation.goBack();
            }
            else
            {
                Toast.show('Something Went Wrong. Please Try Again Later.');
            }
                
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
                console.log("something went wrong")
            }
            
        }
        handleAddDocumentClick=()=>
        {
            DocumentPicker.getDocumentAsync({type:"application/pdf",copyToCacheDirectory:true,multiple:false}).then(response=>
            {
                
                if(response.type=="success")
                {
                    this.setState({document:response})
                }
            })
        }
        handleSubmitButtonClick=()=>
        {
            if(this.verify(this.state))
            {
                if(!this.state.loadingAddDocument)
                {
                    this.setState({loadingAddDocument:true})
                    addCourseDocument(this.state.document,this.state.title,this.props.route.params.courseId,this.handleAddDocumentCallBack,this.state.selectedPlaylist)
                }
            }
            else
            {
                Toast.show('Please Fill All The Fields.');
            }
        }

        verify=({title,selectedPlaylist,document})=>title&&selectedPlaylist!=-1&&document.type=='success'

        componentDidMount() {
                fetch_document_playlist(this.props.route.params.courseId,this.handlePlaylistCallback)
        }

    render() {
        return(
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
            >
                <ScrollView>
                    <View style={styles.headView}>
                        <Text style={styles.headText}>Add Document</Text>
                    </View>
                    <View style={styles.inputView}>
                            <Text style={styles.labelText}>Document Title</Text>
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
                    {!this.state.loadingPlaylist?(
                            <View style={styles.inputView}>
                                
                            <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                    <Text style={styles.labelText}>Document Playlist</Text>
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
                                  
                                </View> ,{marginTop: 10, padding: 12})}
                            </View>
                            ):(null)}
                    <View style={styles.inputView}>
                            <Text style={styles.labelText}>Document(.pdf)</Text>
                            {/* <TouchableOpacity
                                onPress={() =>this.docPicker()}
                                style={styles.uploadView}
                            >
                                <Text style={{fontSize: 20, padding: 20}}>Click Here</Text>
                                
                            </TouchableOpacity> */}
                             <TouchableOpacity style={styles.submitButton} onPress={this.handleAddDocumentClick}>
                                <Text style={styles.submitButtonText}>Choose Document</Text>
                            </TouchableOpacity>
                            {/* <Feather name="link" size={12} color={theme.secondaryColor}/> */}
                            {/* {this.renderInputFiled()} */}
                    </View>
                    <View style={styles.btnView}>
                        <TouchableOpacity style={styles.submitButton} onPress={()=>this.handleSubmitButtonClick()}>
                            {this.state.loadingAddDocument?(
                                <ActivityIndicator color={theme.primaryColor} size={"large"}/>
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
                            <AddDocumentPlaylist    appendPlaylist={this.appendPlaylist} isModalVisible={this.state.isModalVisible} closeModal={this.closeModal} courseId={this.props.route.params.courseId}/>
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
            fontSize: 28,
            fontWeight: 'bold',
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

})

export default AddPdf;