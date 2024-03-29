import React from 'react';
import {Text, View,StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList,ActivityIndicator } from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth} from '../config'
import CardView from '../Utils/CardView';
import { EvilIcons } from '@expo/vector-icons';
import {connect} from 'react-redux'
import {addTestSeries, fetch_testSeriesPlaylist} from '../Utils/DataHelper/Course'
import Toast from 'react-native-simple-toast';

import { RadioButton } from 'react-native-paper';

import { Picker } from 'native-base';
import AddCourseTestSeriesPlaylist from './AddCourseTestSeriesPlaylist';
class AddTest extends React.Component {
    state = {
        title: '',
        document: '',
        questionCount: 1,
        questionData:{
            0:{
                question:'',
                optionA:'',
                optionB:'',
                optionC:'',
                optionD:'',
                correctOpt:'',
                explanation:'',
                testSeriesId:1
            }
        },
        addSeriesLoading:false,
        isPractice:true
    }

    addQuestions=()=>
    {
         
        let question = {
            question:'',
            optionA:'',
            optionB:'',
            optionC:'',
            optionD:'',
            correctOpt:'',
            explanation:'',
            testSeriesId:1
        };
        let questionCount = this.state.questionCount;
        this.setState({questionData:{...this.state.questionData,[questionCount]:question},questionCount:questionCount+1})
    }

    onTypeHandler=(key,indx,text)=>
    {
        let questionData = this.state.questionData;
        questionData[indx][key]=text;
        this.setState({questionData})
    }

    renderOptions=(opt, placeholder,onChangeText)=>{
        return(
            <View style={[styles.optionInputView,{width:this.props.screenWidth<=screenMobileWidth?(this.props.screenWidth-10):((this.props.screenWidth/2)-20)}]}>
                <View style={styles.options}>
                    <Text style={styles.optionLabelText}>{opt}</Text>
                </View>
                {CardView(
                    <TextInput 
                        placeholderTextColor={theme.greyColor} 
                        placeholder={placeholder} 
                        onChangeText={onChangeText} 
                        multiline={true} 
                        numberOfLines={4} 
                        style={styles.optionInputField}
                    />, {borderRadius: 10,width:'80%' }
                )}
            </View>
        )
    }
    renderQuestionView=(item,idx)=>
    {
        return (
            <>
                <View style={styles.inputView}>
                    <Text style={styles.labelText}>Question</Text>
                        {CardView(
                            <TextInput 
                                placeholderTextColor={theme.greyColor} 
                                placeholder="Add Question" 
                                onChangeText={(text)=>this.onTypeHandler('question',idx,text)} 
                                multiline={true} 
                                numberOfLines={6} 
                                style={styles.inputField}
                            />, {borderRadius: 10}
                        )}
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.labelText}>Options</Text>
                    <View style={styles.OptionsView}>
                        <View>
                            {this.renderOptions('A', 'Option 1',(text)=>this.onTypeHandler('optionA',idx,text))}
                        </View>
                        {this.renderOptions('B', 'Option 2',(text)=>this.onTypeHandler('optionB',idx,text))}
                        {this.renderOptions('C', 'Option 3',(text)=>this.onTypeHandler('optionC',idx,text))}
                        {this.renderOptions('D', 'Option 4',(text)=>this.onTypeHandler('optionD',idx,text))}
                    </View>
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.labelText}>Correct Option</Text>
                {CardView(
                    <View style={styles.dropdownView}>
                        <Picker 
                            style={{ height:30 }}
                            selectedValue={this.state.selectedPlaylist}
                            onValueChange={(itemValue, itemIndex) =>this.onTypeHandler('correctOpt',idx,itemValue)}> 
                                <Picker.Item label={'A'} value={'A'} />
                                <Picker.Item label={'B'} value={'B'} />
                                <Picker.Item label={'C'} value={'C'} />
                                <Picker.Item label={'D'} value={'D'} />
                            </Picker> 
                    </View> ,{marginTop: 10, padding: 12})}    
                </View>                            
                <View style={styles.inputView}>
                    <Text style={styles.labelText}>Correct Marks</Text>
                        {CardView(
                            <TextInput 
                                placeholderTextColor={theme.greyColor} 
                                placeholder="Correct Marks" 

                                keyboardType='numeric'
                                onChangeText={(text)=>this.onTypeHandler('correctMarks',idx,text)}   
                                style={styles.inputField}
                            />, {borderRadius: 10}
                        )}
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.labelText}>Wrong Marks</Text>
                        {CardView(
                            <TextInput 
                                placeholderTextColor={theme.greyColor} 
                                placeholder="Wrong Marks" 
                                
                                keyboardType='numeric'
                                onChangeText={(text)=>this.onTypeHandler('wrongMarks',idx,text)}   
                                style={styles.inputField}
                            />, {borderRadius: 10}
                        )}
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.labelText}>Explanation</Text>
                        {CardView(
                            <TextInput 
                                placeholderTextColor={theme.greyColor} 
                                placeholder="Explanation" 
                                onChangeText={(text)=>this.onTypeHandler('explanation',idx,text)} 
                                multiline={true} 
                                numberOfLines={6} 
                                style={styles.inputField}
                            />, {borderRadius: 10}
                        )}
                </View>
            </>
        )
    }

    componentDidMount() {
        fetch_testSeriesPlaylist(this.props.route.params.courseId,this.handlePlaylistCallback)
    }
    handlePlaylistCallback=(response)=>
    {
        // console.log("response playlist",response.status)
        if(response.status == 200)
        {
            response.json().then(response=>
            { 
                // console.log("response",response)
                response.unshift({id:-1,name:"Select Playlist"})
                this.setState({playlist: response,loadingPlaylist:false})
            })
                
        }else
        {
            Toast.show('Something Went Wrong.');
        }
    } 
    handleAddSeriesCallback=(response) => 
    {
         
        if(response.status==201)
        {
            Toast.show('Test Series Added Successfully.');
            this.setState({addSeriesLoading:false})
            this.props.route.params.appendCourseTestSeries({title:this.state.title,questionCount:this.state.questionCount,timeDuration:this.state.timeDuration,isPractice:this.state.isPractice,courseId:this.props.route.params.courseId,maxMarks:this.state.maxMarks})
            this.props.navigation.goBack()
        }
        else
        {
            Toast.show('Something Went Wrong. Please Try Again Later.');
        }
    }

    handleSubmitBtn=()=>
    {
        if(this.verify(this.state))
        {
            if(!this.state.addSeriesLoading)
            {
                this.setState({addSeriesLoading:true})
                let series = {isAdmin:true,title:this.state.title,questionCount:this.state.questionCount,timeDuration:this.state.timeDuration,isPractice:this.state.isPractice,courseId:this.props.route.params.courseId,maxMarks:this.state.maxMarks}
                
                addTestSeries(series,this.state.questionData,this.handleAddSeriesCallback)
                // console.log(series)
            }
        }
        else
        {
            Toast.show('Please Fill All The Fields.');
        }
        
    }
    setSelectedPlaylist=(selectedPlaylist)=>
    {
    
            this.setState({selectedPlaylist})
    }
    renderPickerItem=(item)=>
    {
        // console.log(item)
        return( 
           
            <Picker.Item label={item.name} value={item.id} />
        )
    }
    appendPlaylist=(obj)=>
    {
        let playlist = this.state.playlist;
        playlist.push(obj)
        this.setState({playlist})
        this.props.route.params.appendCourseTestSeriesPlaylist(obj);

    }
    openModal=()=>
    {
        this.setState({isModalVisible: true})
    }
    closeModal=()=>
    {
        this.setState({isModalVisible: false})
    }

    verify=({title,questionCount,timeDuration,isPractice,maxMarks,questionData})=>title&&questionCount&&timeDuration&&isPractice&&maxMarks&&questionData

    render() {
       
        return(
            <PageStructure
                iconName="navicon"
                nosearchIcon={true}
                noNotificationIcon={true}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                navigation={this.props.navigation}
            >
                <ScrollView>
                    <View style={styles.headView}>
                        <Text style={styles.headText}>Add Test Series</Text>
                    </View>
                    <View style={styles.inputView}>
                            <Text style={styles.labelText}>Title</Text>
                            {CardView(
                                <TextInput 
                                    placeholderTextColor={theme.greyColor} 
                                    placeholder="Title" 
                                    onChangeText={(text)=>this.setState({title: text})} 
                                    style={styles.inputField}
                                />, {borderRadius: 10}
                            )}
                    </View>
                    <View style={styles.inputView}>
                            <Text style={styles.labelText}>Test Type</Text> 
                            <View style={{flexDirection: 'row',alignItems: 'center'}}>
                                <RadioButton
                                    value={true}
                                    label="Practice"
                                    status={this.state.isPractice ? 'checked' : 'unchecked'}
                                    onPress={() => { this.setState({ isPractice: true }); }}
                                    />
                                <Text>Practice</Text>
                            </View>
                            <View style={{flexDirection: 'row',alignItems: 'center'}}>
                            <RadioButton
                                value={false}
                                label="Exam"
                                status={!this.state.isPractice ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ isPractice: false }); }}
                                />
                                <Text>Exam</Text>
                            </View>
                               
                    </View>
                    <View style={styles.inputView}>
                            <Text style={styles.labelText}>Duration(min)</Text>
                            {CardView(
                                <TextInput 
                                    placeholderTextColor={theme.greyColor} 
                                    placeholder="Duration"  
                                    keyboardType='numeric'
                                    onChangeText={(text)=>this.setState({timeDuration: text})} 
                                    style={styles.inputField}
                                />, {borderRadius: 10}
                            )}
                    </View>
                    <View style={styles.inputView}>
                            <Text style={styles.labelText}>Max Marks</Text>
                            {CardView(
                                <TextInput 
                                    placeholderTextColor={theme.greyColor} 
                                    placeholder="Max marks"  
                                    keyboardType='numeric'
                                    onChangeText={(text)=>this.setState({maxMarks: text})} 
                                    style={styles.inputField}
                                />, {borderRadius: 10}
                            )}
                    </View>
                    {!this.state.loadingPlaylist?(
                            <View style={styles.inputView}>
                                
                            <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                    <Text style={styles.labelText}>Test Series Playlist</Text>
                                    <EvilIcons name="plus" onPress={()=>this.openModal()} size={20}/>
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
                   
                    <FlatList 
                            data={Object.values(this.state.questionData)}
                            renderItem={({item,index})=>this.renderQuestionView(item,index)}
                            keyExtractor={(item,index)=>index.toString()}
                    />
                    
                    <View style={styles.btnView}>
                        <TouchableOpacity style={styles.submitButton} onPress={()=>this.handleSubmitBtn()}>
                                {this.state.addSeriesLoading?(
                                    <ActivityIndicator color={theme.primaryColor} size={"large"}/>
                                ):(
                                    <Text style={styles.submitButtonText}>Submit</Text>
                                )}
                                
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addMoreButton} onPress={this.addQuestions}>
                                <Text style={styles.addMoreButtonText}>Add More+</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {this.state.isModalVisible?(
                            <AddCourseTestSeriesPlaylist  appendPlaylist={this.appendPlaylist} isModalVisible={this.state.isModalVisible} closeModal={this.closeModal} courseId={this.props.route.params.courseId}/>
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
    OptionsView:
    {
        marginTop: 10,
        flex:1,
        flexDirection: 'column'
    },
        optionInputView:
        {
             
            flexDirection: 'row', 
            alignItems: 'center' ,
            marginTop: 10, 
           
        },
            options:
            {
                height: 30,
                width: 30,
                borderRadius: 15,
                backgroundColor:theme.labelOrInactiveColor,
                marginTop: 10,
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center'
            },
                optionLabelText: {
                    fontSize: 16,
                    fontWeight: '700',
                    color: theme.secondaryColor, 
                   
                },
            optionInputField:
            {
                padding: 10,
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

const mapStateToProps=(state)=>{
    return {
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(AddTest);
