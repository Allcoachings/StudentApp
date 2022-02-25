import React, {useState} from 'react';
import { View, Text,TouchableOpacity,TouchableWithoutFeedback,Dimensions,Image, Modal, TextInput, ImageBackground } from 'react-native';
import CardView from '../Utils/CardView';
import {theme, Assets,defaultStudentImage} from '../config'
const width = Dimensions.get('window').width
const height = Dimensions.get('screen').height
const BackAlert = ({visible,closeModal,yesFun,noFun})=> {
      
     
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose = {closeModal}
            >
                <TouchableWithoutFeedback>
                    <View style={{height:height,width:width, backgroundColor: theme.secondaryColor+'66',alignItems: 'center',justifyContent: 'center'}}>
                        {CardView(
                            <View style={{flexDirection: 'column'}}>
                                 <View style={{marginVertical: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontFamily: 'Raleway_600SemiBold', fontSize: 18,textAlign: 'center', marginBottom: 10, color: theme.greyColor}}>
                                        Are you sure you want to go Back ?
                                    </Text>
                                </View>
                                {/* <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontFamily: 'Raleway_400Regular', fontSize: 50, color: theme.silverColor}}>{unAttemptedQues}</Text>
                                    <Text style={{fontFamily: 'Raleway_600SemiBold', fontSize: 14, color: theme.silverColor}}>Unattempted Questions</Text>
                                </View> */}
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
                                <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, marginRight: 10}}>
                                    <TouchableOpacity onPress={()=>{closeModal();noFun?noFun():null}}>
                                        <Text style={{fontSize: 15, fontFamily: 'Raleway_700Bold',color: theme.greyColor}}>No</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginLeft: 20,marginRight: 20}} onPress={()=>{closeModal();yesFun()}}> 
                                        <Text style={{fontSize: 15, fontFamily: 'Raleway_700Bold',color: theme.darkYellowColor}}>Yes</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>,{alignSelf: 'center', paddingVertical:20, borderRadius: 10}
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
     
}
export default BackAlert