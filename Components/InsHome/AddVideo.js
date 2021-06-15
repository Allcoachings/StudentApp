import React from 'react';
import {Text, View,StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth} from '../config'
import CardView from '../Utils/CardView';

class AddVideo extends React.Component {
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
                    <View style={styles.inputView}>
                            <Text style={styles.labelText}>Video</Text>
                            {CardView(
                                <TextInput 
                                    placeholderTextColor={theme.greyColor} 
                                    placeholder="Add Video" 
                                    onChangeText={(text)=>this.setState({video: text})} 
                                    multiline={true} 
                                    numberOfLines={4} 
                                    style={styles.inputField}
                                />, {borderRadius: 10}
                            )}
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