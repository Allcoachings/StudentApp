import React from 'react';
import {Text, View,StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList,ActivityIndicator } from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth} from '../config'
import CardView from '../Utils/CardView';
import { Feather } from '@expo/vector-icons';
import {connect} from 'react-redux'
import {addTestSeries} from '../Utils/DataHelper/Course'

import { Picker } from 'native-base';
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
        addSeriesLoading:false
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
                    <Text style={styles.labelText}>Explanation</Text>
                        {CardView(
                            <TextInput 
                                placeholderTextColor={theme.greyColor} 
                                placeholder="Add Question" 
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
    handleAddSeriesCallback=(response) => 
    {
         
        if(response.status==201)
        {
            this.setState({addSeriesLoading:false})
            this.props.route.params.appendCourseTestSeries({title:this.state.title,questionCount:this.state.questionCount,timeDuration:this.state.timeDuration,isPractice:false,courseId:this.props.route.params.courseId})
            this.props.navigation.goBack()
        }
    }
    handleSubmitBtn=()=>
    {
        if(!this.state.addSeriesLoading)
        {
            this.setState({addSeriesLoading:true})
            let series = {title:this.state.title,questionCount:this.state.questionCount,timeDuration:this.state.timeDuration,isPractice:false,courseId:this.props.route.params.courseId}
            addTestSeries(series,this.state.questionData,this.handleAddSeriesCallback)
        }
        
    }

    render() {
        console.log(this.state.questionData)
        return(
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
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
                            <Text style={styles.labelText}>Duration(mins)</Text>
                            {CardView(
                                <TextInput 
                                    placeholderTextColor={theme.greyColor} 
                                    placeholder="Duration" 
                                    onChangeText={(text)=>this.setState({timeDuration: text})} 
                                    style={styles.inputField}
                                />, {borderRadius: 10}
                            )}
                    </View>
                    <FlatList 
                            data={Object.values(this.state.questionData)}
                            renderItem={({item,index})=>this.renderQuestionView(item,index)}
                            keyExtractor={(item,index)=>index.toString()}
                    />
                    
                    <View style={styles.btnView}>
                        <TouchableOpacity style={styles.submitButton} onPress={()=>this.handleSubmitBtn()}>
                                {this.state.addSeriesLoading?(
                                    <ActivityIndicator color={theme.accentColor} size={"large"}/>
                                ):(
                                    <Text style={styles.submitButtonText}>Submit</Text>
                                )}
                                
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addMoreButton} onPress={this.addQuestions}>
                                <Text style={styles.addMoreButtonText}>Add More+</Text>
                        </TouchableOpacity>
                    </View>
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
