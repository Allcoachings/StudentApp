import React from 'react';
import {Text, View,StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth} from '../config'
import CardView from '../Utils/CardView';
import { Feather } from '@expo/vector-icons';
import {connect} from 'react-redux'

class AddTest extends React.Component {
    state = {
        title: '',
        document: ''
    }

    renderOptions=(opt, placeholder)=>{
        return(
            <View style={[styles.optionInputView,{width:this.props.screenWidth<=screenMobileWidth?(this.props.screenWidth-10):((this.props.screenWidth/2)-20)}]}>
                <View style={styles.options}>
                    <Text style={styles.optionLabelText}>{opt}</Text>
                </View>
                {CardView(
                    <TextInput 
                        placeholderTextColor={theme.labelOrInactiveColor} 
                        placeholder={placeholder} 
                        onChangeText={(text)=>this.setState({document: text})} 
                        multiline={true} 
                        numberOfLines={4} 
                        style={styles.optionInputField}
                    />, {borderRadius: 10,width:'80%' }
                )}
            </View>
        )
    }

    render() {
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
                                    placeholderTextColor={theme.labelOrInactiveColor} 
                                    placeholder="Title" 
                                    onChangeText={(text)=>this.setState({title: text})} 
                                    style={styles.inputField}
                                />, {borderRadius: 10}
                            )}
                    </View>
                    <View style={styles.inputView}>
                            <Text style={styles.labelText}>Question</Text>
                            {CardView(
                                <TextInput 
                                    placeholderTextColor={theme.labelOrInactiveColor} 
                                    placeholder="Add Question" 
                                    onChangeText={(text)=>this.setState({document: text})} 
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
                                {this.renderOptions('A', 'Option 1')}
                            </View>
                            {this.renderOptions('B', 'Option 2')}
                            {this.renderOptions('C', 'Option 3')}
                            {this.renderOptions('D', 'Option 4')}
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
