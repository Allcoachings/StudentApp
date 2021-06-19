import React from 'react';
import {Text, View,StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth} from '../config'
import CardView from '../Utils/CardView';

class AddTimeTable extends React.Component {
    state = {
        title: "",
        description: "",
        video: "",
    }

    render() {
        return(
            <PageStructure
                iconName={"menu"}
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
                                    onChangeText={(text)=>this.setState({title: text})} 
                                    style={styles.inputField}
                                />, {borderRadius: 10}
                            )}
                    </View>
                    <View style={styles.inputView}>
                            {CardView(
                                <TextInput 
                                    placeholderTextColor={theme.greyColor} 
                                    placeholder="Add Instructor Name" 
                                    defaultValue={this.props.description} 
                                    onChangeText={(text)=>this.setState({title: text})} 
                                    style={styles.inputField}
                                />, {borderRadius: 10}
                            )}
                    </View>
                    <View style={{display: 'flex', flexDirection: 'column', marginLeft: 10, marginTop:'10%'}}>
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
                        </View>
                        <View style={{marginTop: '6%'}}>
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
                        </View>
                    </View>
                    <View style={styles.btnView}>
                        <TouchableOpacity style={styles.submitButton}>
                                <Text style={styles.submitButtonText}>Submit</Text>
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