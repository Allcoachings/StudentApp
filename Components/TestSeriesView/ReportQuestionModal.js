import React, { Component ,useState} from 'react';
import { View, Text,TouchableOpacity,TouchableWithoutFeedback,Dimensions,Image, Modal, TextInput, ImageBackground } from 'react-native';
import CardView from '../Utils/CardView';
import {theme, Assets,defaultStudentImage} from '../config'
const width = Dimensions.get('window').width
const height = Dimensions.get('screen').height
class ReportQuestionModal extends React.Component {
    state={
        selectedOpt:''
    }
    renderOption=(index,text)=>{
        return(
            <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 15}} onPress={()=>this.setState({selectedOpt: index})}>
                <TouchableWithoutFeedback onPress={()=>this.setState({selectedOpt: index})}>
                    <View style={{flexDirection: 'row',alignItems: 'center'}}>
                        <View style={[{marginRight:10,borderRadius:15,paddingHorizontal:10,padding:5,borderWidth:1,borderColor: theme.labelOrInactiveColor}]}>
                            <Text>{index}</Text>
                        </View> 
                        <Text style={{fontSize: 16,fontFamily: 'Raleway_600SemiBold', color: theme.secondaryColor}}>{text}</Text>
                    </View>                        
                </TouchableWithoutFeedback>
            </View>
        )
    }
    render() {
        return(
            <Modal
                animationType="fade"
                transparent={true}
                onRequestClose={this.props.closeModal}
                visible={this.props.isModalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={this.props.closeModal}
                >
                    <View style={{height:height,width:width, backgroundColor: theme.secondaryColor+'66'}}>
                        {CardView(
                            
                            <View style={{flexDirection: 'column', justifyContent: 'space-between', padding: 20}}>
                                <Text style={{fontFamily: 'Raleway_700Bold', fontSize: 16, marginBottom: 10}}>
                                    Report question
                                </Text>
                                <View style={{marginTop: 15, justifyContent: 'space-between'}}>
                                    {this.renderOption("A","Incorrect question")}
                                    {this.renderOption("B","Incorrect answer")}
                                    {this.renderOption("C","Incorrect solution")}
                                    {this.renderOption("D","Incomplete solution")}
                                </View>
                                <View style={{marginVertical: 20}}>
                                    <TextInput style={{borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor}} placeholderTextColor={theme.labelOrInactiveColor} placeholder={"Explain Further"}/>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20}}>
                                    <TouchableOpacity onPress={()=>this.props.closeModal()}>
                                        <Text style={{fontSize: 12, fontFamily: 'Raleway_700Bold',color: theme.labelOrInactiveColor}}>CANCEL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginLeft: 10}}> 
                                        <Text style={{fontSize: 12, fontFamily: 'Raleway_700Bold',color: theme.darkYellowColor}}>REPORT</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>,{width: width*0.8,marginTop: height*0.2, marginLeft: width*0.1}
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}
export default ReportQuestionModal