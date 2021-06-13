import React from 'react';
import {Text, View,StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth} from '../config'
import CardView from '../Utils/CardView';
import { Feather } from '@expo/vector-icons';
import DocumentPicker from "react-native-document-picker";

class AddPdf extends React.Component {
    state = {
        title: '',
        document: ''
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
                    placeholderTextColor={theme.labelOrInactiveColor} 
                    placeholder="Add Document" 
                    defaultValue={this.props.description} 
                    onChangeText={(text)=>this.setState({document: text})} 
                    multiline={true} 
                    numberOfLines={6} style={styles.inputField}
                />, {borderRadius: 10}
            )
        )}

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
                                    placeholderTextColor={theme.labelOrInactiveColor} 
                                    placeholder="Title" 
                                    defaultValue={this.props.description} 
                                    onChangeText={(text)=>this.setState({title: text})} 
                                    style={styles.inputField}
                                />, {borderRadius: 10} 
                            )}
                    </View>
                    <View style={styles.inputView}>
                            <Text style={styles.labelText}>Document(.pdf)</Text>
                            {/* <TouchableOpacity
                                onPress={() =>this.docPicker()}
                                style={styles.uploadView}
                            >
                                <Text style={{fontSize: 20, padding: 20}}>Click Here</Text>
                                
                            </TouchableOpacity> */}
                            {/* <Feather name="link" size={12} color={theme.secondaryColor}/> */}
                            {this.renderInputFiled()}
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