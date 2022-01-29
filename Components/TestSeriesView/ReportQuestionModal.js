import React, { Component ,useState} from 'react';
import { View, Text,TouchableOpacity,TouchableWithoutFeedback,Dimensions,Image, Modal, TextInput, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import CardView from '../Utils/CardView';
import {theme, Assets,defaultStudentImage} from '../config'
import { reportQuestion } from '../Utils/DataHelper/ReportQuestion';
import Toast from 'react-native-simple-toast';
const width = Dimensions.get('window').width
const height = Dimensions.get('screen').height
const  ReportQuestionModal =({closeModal,isModalVisible,questionId,testSeriesId})=> {
     
    const [selectedOpt,setSelectedOpt] = useState()
    const [selectedOptText,setSelectedOptText] = useState()

    const [description,setDescription] = useState('')
    const reportBtnHandler = ()=>
    {
        reportQuestion(selectedOptText,description,questionId,testSeriesId,(response)=>{
            if(response.status==201)
            {
                Toast.show("Question Reported Successfully")
            }else
            {
                Toast.show("Something went wrong with the request")
            }
            closeModal()
        })
    }
  
    const renderOption=(index,text)=>{
        return(
            <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 15,width:'100%'}}>
                <TouchableWithoutFeedback onPress={()=>{setSelectedOpt(index);setSelectedOptText(text)}}>
                    <View style={[{flexDirection: 'row',alignItems: 'center',width:'100%',padding:5},selectedOpt==index?(styles.attemptedAns):(null)]}>
                        <View style={[{marginRight:10,borderRadius:15,paddingHorizontal:10,padding:5,borderWidth:1,borderColor: theme.labelOrInactiveColor},selectedOpt==index?(styles.attemptedAnsIndex):(null)]}>
                            <Text>{index}</Text>
                        </View> 
                        <Text style={{fontSize: 16,fontFamily: 'Raleway_600SemiBold', color: theme.secondaryColor}}>{text}</Text>
                    </View>                        
                </TouchableWithoutFeedback>
            </View>
        )
    }
   
        return(
            <Modal
                animationType="fade"
                transparent={true}
                onRequestClose={closeModal}
                visible={isModalVisible}
            >
                <ScrollView>
                <TouchableWithoutFeedback
                    onPress={closeModal}
                >
                    
                        <View style={{height:height,width:width, backgroundColor: theme.secondaryColor+'66',alignItems: 'center',justifyContent: 'center'}}>
                           
                                
                                    {CardView(
                                         <TouchableWithoutFeedback onPress={()=>{}}> 
                                            <View style={{flexDirection: 'column', justifyContent: 'space-between', padding: 20}}>
                                                <Text style={{fontFamily: 'Raleway_700Bold', fontSize: 16, marginBottom: 10}}>
                                                    Report question
                                                </Text>
                                                <View style={{marginTop: 15, justifyContent: 'space-between'}}>
                                                    {renderOption("A","Incorrect question")}
                                                    {renderOption("B","Incorrect answer")}
                                                    {renderOption("C","Incorrect solution")}
                                                    {renderOption("D","Incomplete solution")}
                                                </View>
                                                <View style={{marginVertical: 20}}>
                                                    <TextInput 
                                                        style={{borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor}} 
                                                        placeholderTextColor={theme.labelOrInactiveColor} 
                                                        placeholder={"Explain Further"}
                                                        onChangeText={(text)=>setDescription(text)}
                                                    />
                                                </View>
                                                <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20}}>
                                                    <TouchableOpacity onPress={()=>closeModal()}>
                                                        <Text 
                                                            style={{fontSize: 12, fontFamily: 'Raleway_700Bold',color: theme.labelOrInactiveColor}}>CANCEL</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{marginLeft: 10}} onPress={reportBtnHandler}> 
                                                        <Text style={{fontSize: 12, fontFamily: 'Raleway_700Bold',color: theme.darkYellowColor}}>REPORT</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        ,{width: width*0.8}
                                    )}
                                 
                          
                        </View>
                    
                </TouchableWithoutFeedback>
                </ScrollView>
            </Modal>
        )
}
 

const styles = StyleSheet.create({

    attemptedAns:
    {
        backgroundColor:theme.selectedOptColor+'66',
        borderColor:theme.primaryColor,
        borderWidth:1,
        
    },
     
    attemptedAnsIndex:
    {
        backgroundColor:theme.selectedOptColor,
        

    }
})
export default ReportQuestionModal