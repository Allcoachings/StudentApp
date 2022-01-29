import React, { Component ,useState} from 'react';
import { View, Text,TouchableOpacity,TouchableWithoutFeedback,Dimensions,Image, Modal, TextInput, ImageBackground } from 'react-native';
import CardView from '../Utils/CardView';
import {theme, Assets,defaultStudentImage} from '../config'
const width = Dimensions.get('window').width
const height = Dimensions.get('screen').height
class WarningModal extends React.Component {
    state={
        selectedOpt:''
    }
    
    render() {
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
            >
                <TouchableWithoutFeedback>
                    <View style={{height:height,width:width, backgroundColor: theme.secondaryColor+'66'}}>
                        {CardView(
                            <View style={{flexDirection: 'column'}}>
                                <View style={{marginVertical: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontFamily: 'Raleway_600SemiBold', fontSize: 18, marginBottom: 10, color: theme.greyColor}}>
                                        Are you sure you want to pause?
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontFamily: 'Raleway_400Regular', fontSize: 50, color: theme.silverColor}}>{this.props.unAttemptedQues}</Text>
                                    <Text style={{fontFamily: 'Raleway_600SemiBold', fontSize: 14, color: theme.silverColor}}>Unattempted Questions</Text>
                                </View>
                                {this.props.isPractice?(
                                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                         <View style={{backgroundColor: theme.labelOrInactiveColor+'4D', flexDirection: 'row',marginVertical: 25, borderRadius: 10, padding: 10}}>
                                             <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 15}}>
                                                 <Text style={{color: theme.accentColor, fontSize: 16}}>{this.props.correctQues}</Text>
                                                 <Text style={{color: theme.textColor, fontSize: 16}}>Correct</Text>
                                             </View>
                                             <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 15}}>
                                                 <Text style={{color: theme.buttonColor, fontSize: 16}}>{this.props.incorrectQues}</Text>
                                                 <Text style={{color: theme.textColor, fontSize: 16}}>Incorrect</Text>
                                             </View>
                                             {/* <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 15}}>
                                                 <Text style={{color: theme.darkYellowColor, fontSize: 16}}>1</Text>
                                                 <Text style={{color: theme.textColor, fontSize: 16}}>Coin</Text>
                                             </View> */}
                                         </View>
                                     </View>
    
                                ):(null)}
                               
                                <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, marginRight: 10}}>
                                    <TouchableOpacity onPress={()=>{this.props.closeModal();this.props.noFun?this.props.noFun():null}}>
                                        <Text style={{fontSize: 12, fontFamily: 'Raleway_700Bold',color: theme.labelOrInactiveColor}}>CANCEL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginLeft: 10}} onPress={this.props.yesFun}> 
                                        <Text style={{fontSize: 12, fontFamily: 'Raleway_700Bold',color: theme.darkYellowColor}}>PAUSE</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>,{alignSelf: 'center', marginTop: height*0.2,paddingVertical:20, borderRadius: 10}
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}
export default WarningModal