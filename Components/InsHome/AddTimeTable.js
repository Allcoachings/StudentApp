import React from 'react';
import {Text, View,StyleSheet, TextInput, TouchableOpacity, ScrollView,ActivityIndicator} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth} from '../config'
import CardView from '../Utils/CardView'; 
import {addCourseTimeTableSubject} from '../Utils/DataHelper/Course'
import Toast from 'react-native-simple-toast';
class AddTimeTable extends React.Component {
    state = {
        name: "",
        
    }

    handleAddSubjectCallBack=(reponse) =>
    {
        this.setState({addSubjectLoading:false})    
        if(reponse.status ===201)
        {
            Toast.show('Time Table Added Successfully.');
            console.log("created",reponse.headers.map.location)
            this.props.route.params.appendSubject({name:this.state.name,courseId:this.props.route.params.courseId,id:reponse.headers.map.location,courseTimeTableItem:[]})
            this.props.navigation.goBack()
        }
        else
        {
            Toast.show('Something Went Wrong. Please Try Again Later.');
        }   
    }
    handleAddSubjectClick=() =>
    {
        if(!this.state.addSubjectLoading)
        {
            if(this.verify(this.state))
            {
                this.setState({addSubjectLoading:true})
                addCourseTimeTableSubject(this.state.name,this.props.route.params.courseId,this.handleAddSubjectCallBack)
            }else
            {
                Toast.show('Please Fill All The Fields.');
            }
        }
        
    }

    verify=({name}) =>name

    render() {
        console.log("add timetable course id: ",this.props.route.params.courseId)
        return(
            <PageStructure 
                nosearchIcon={true}
                noNotificationIcon={true}
                iconName="navicon"
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
            >
                <ScrollView>
                    <View style={styles.headView}>
                        <Text style={styles.headText}>Add Time Table</Text>
                    </View>
                    <View style={styles.inputView}>
                            {CardView(
                                <TextInput 
                                    placeholderTextColor={theme.greyColor} 
                                    placeholder="Add Subject Name" 
                                    defaultValue={this.props.description} 
                                    onChangeText={(text)=>this.setState({name: text})} 
                                    style={styles.inputField}
                                />, {borderRadius: 10}
                            )}
                    </View>
                    {/* <View style={styles.inputView}>
                            {CardView(
                                <TextInput 
                                    placeholderTextColor={theme.greyColor} 
                                    placeholder="Add Instructor Name" 
                                    defaultValue={this.props.description} 
                                    onChangeText={(text)=>this.setState({title: text})} 
                                    style={styles.inputField}
                                />, {borderRadius: 10}
                            )}
                    </View> */}
                    {/* <View style={{display: 'flex', flexDirection: 'column', marginLeft: 10, marginTop:'10%'}}>
                        <View>
                            <Text style={styles.labelText}>Date:</Text>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                                {CardView(
                                    <TextInput 
                                        onChangeText={(text)=>this.setState({video: text})} 
                                        style={styles.inputField}
                                    />, {borderRadius: 10, width: '20%'}
                                )}
                                <Text style={{fontSize: 20}}>To</Text>
                                {CardView(
                                    <TextInput 
                                        onChangeText={(text)=>this.setState({video: text})} 
                                        style={styles.inputField}
                                    />, {borderRadius: 10, width: '20%'}
                                )}
                            </View>
                        </View> */}
                        {/* <View style={{marginTop: '6%'}}>
                            <Text style={styles.labelText}>Time:</Text>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                                {CardView(
                                    <TextInput 
                                        onChangeText={(text)=>this.setState({video: text})} 
                                        style={styles.inputField}
                                    />, {borderRadius: 10, width: '20%'}
                                )}
                                <Text style={{fontSize: 20}}>To</Text>
                                {CardView(
                                    <TextInput 
                                        onChangeText={(text)=>this.setState({video: text})} 
                                        style={styles.inputField}
                                    />, {borderRadius: 10, width: '20%'}
                                )}
                            </View>
                        </View> */}
                    {/* </View> */}
                    <View style={styles.btnView}>
                        <TouchableOpacity style={styles.submitButton} onPress={this.handleAddSubjectClick}>
                        {this.state.addSubjectLoading?
                          (
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
        marginTop: '10%'
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

export default AddTimeTable;