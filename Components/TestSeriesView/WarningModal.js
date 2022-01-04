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
                    <View style={{height:height,width:width, backgroundColor: theme.labelOrInactiveColor}}>
                        {CardView(
                            <View style={{flexDirection: 'column'}}>
                                <View style={{marginVertical: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontFamily: 'Raleway_600SemiBold', fontSize: 18, marginBottom: 10, color: theme.greyColor}}>
                                        Are You Sure You Want To Pause?
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontFamily: 'Raleway_400Regular', fontSize: 50, color: theme.silverColor}}>96</Text>
                                    <Text style={{fontFamily: 'Raleway_600SemiBold', fontSize: 14, color: theme.silverColor}}>Unattempted Questions</Text>
                                </View>
                                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{backgroundColor: theme.labelOrInactiveColor+'4D', flexDirection: 'row',marginVertical: 25, borderRadius: 10, padding: 10}}>
                                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 15}}>
                                        <Text style={{color: theme.accentColor, fontSize: 16}}>1</Text>
                                        <Text style={{color: theme.textColor, fontSize: 16}}>Correct</Text>
                                    </View>
                                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 15}}>
                                        <Text style={{color: theme.buttonColor, fontSize: 16}}>1</Text>
                                        <Text style={{color: theme.textColor, fontSize: 16}}>Incorrect</Text>
                                    </View>
                                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginHorizontal: 15}}>
                                        <Text style={{color: theme.darkYellowColor, fontSize: 16}}>1</Text>
                                        <Text style={{color: theme.textColor, fontSize: 16}}>Coin</Text>
                                    </View>
                                </View>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, marginRight: 10}}>
                                    <TouchableOpacity onPress={()=>this.props.closeModal()}>
                                        <Text style={{fontSize: 12, fontFamily: 'Raleway_700Bold',color: theme.labelOrInactiveColor}}>CANCEL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginLeft: 10}}> 
                                        <Text style={{fontSize: 12, fontFamily: 'Raleway_700Bold',color: theme.darkYellowColor}}>PAUSE</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>,{width: width*0.8, height: height*0.35, marginTop: height*0.2, marginLeft: width*0.1, borderRadius: 10}
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}
export default WarningModal