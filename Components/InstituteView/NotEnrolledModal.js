import React, {useState} from 'react';
import { View, Text,TouchableOpacity,TouchableWithoutFeedback,Dimensions,Image, Modal, TextInput, ImageBackground } from 'react-native';
import CardView from '../Utils/CardView';
import {theme, Assets,defaultStudentImage} from '../config'
import { Feather } from '@expo/vector-icons';
const width = Dimensions.get('window').width
const height = Dimensions.get('screen').height
const NotEnrolledModal = ({closeModal,purchaseCourseFun,noFun,amount})=> {
     
   
     
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
                onRequestClose={closeModal}
            >

                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={{height:height,width:width, backgroundColor: theme.secondaryColor+'66',alignItems: 'center',justifyContent: 'center'}}>
                        {CardView(
                            <TouchableWithoutFeedback>
                                <View style={{flexDirection: 'column',}}>
                                    <View style={{width: '95%',alignItems: 'flex-end',marginRight:20}}>
                                        <Feather name="x" size={20} color={theme.secondaryColor} onPress={closeModal}/>
                                    </View>
                                    <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{fontFamily: 'Raleway_600SemiBold', fontSize: 18, marginBottom: 10, color: theme.greyColor}}>
                                        Content Locked
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{ fontSize: 50, color: theme.silverColor}}>₹ {amount}</Text>
                                        {/* <Text style={{fontFamily: 'Raleway_600SemiBold', fontSize: 14, color: theme.silverColor}}>Unattempted Questions</Text> */} 
                                    </View>
                                    {/* {isPractice?(
                                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                            <View style={{backgroundColor: theme.labelOrInactiveColor+'4D', flexDirection: 'row',marginVertical: 25, borderRadius: 10, padding: 10}}>
                                                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 15}}>
                                                    <Text style={{color: theme.accentColor, fontSize: 16}}>{correctQues}</Text>
                                                    <Text style={{color: theme.textColor, fontSize: 16}}>Correct</Text>
                                                </View>
                                                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 15}}>
                                                    <Text style={{color: theme.buttonColor, fontSize: 16}}>{incorrectQues}</Text>
                                                    <Text style={{color: theme.textColor, fontSize: 16}}>Incorrect</Text>
                                                </View>
                                                
                                            </View>
                                        </View>

                                    ):(null)} */}

                                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                                        {/* <TouchableOpacity onPress={()=>{closeModal();noFun?noFun():null}}>
                                            <Text style={{fontSize: 12, fontFamily: 'Raleway_700Bold',color: theme.labelOrInactiveColor}}>CANCEL</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{marginLeft: 10}} onPress={purchaseCourseFun}> 
                                            <Text style={{fontSize: 12, fontFamily: 'Raleway_700Bold',color: theme.darkYellowColor}}>Submit</Text>
                                        </TouchableOpacity> */}
                                        <TouchableOpacity style={{marginLeft: 10}} onPress={purchaseCourseFun} style={{paddingHorizontal:10,paddingVertical:5,backgroundColor:theme.accentColor,borderRadius:10}}> 
                                            <Text style={{fontSize: 15, fontFamily: 'Raleway_700Bold',color: theme.primaryColor}}>Purchase Course</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            ,{alignSelf: 'center',paddingVertical:20, borderRadius: 10}
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
     
}
export default NotEnrolledModal