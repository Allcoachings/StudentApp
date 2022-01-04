import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,StatusBar,FlatList, Image,TextInput} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import { theme, appLogo, Assets } from '../config';
import { EvilIcons, Feather } from '@expo/vector-icons';
 
class ExamCategory extends React.Component {

    state={
    }

    render(){
        return (
            <> 
            <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row', borderWidth: 1, borderColor: theme.labelOrInactiveColor, backgroundColor:theme.labelOrInactiveColor+'4D', borderRadius: 5, padding:10, margin:20, alignItems: 'center'}}>
                    <Feather name={"search"} size = {20} style={{color: theme.silverColor, marginRight:5}}/>
                    <TextInput placeholder="Search for courses or institute" placeholderTextColor={theme.silverColor} style={{fontFamily: 'Raleway_600SemiBold', color: theme.silverColor, width: '80%'}}/>
                </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={Assets.examCategory.top} style={{height: 270, width: 600, resizeMode:'contain'}}/>
                    </View>
                    <View style={{padding: 10}}>
                        <View style={{backgroundColor: theme.labelOrInactiveColor+'4D', borderRadius: 6, flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 15}} >
                            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontFamily: 'Raleway_600SemiBold', color: theme.greyColor, fontSize: 16}}>Select Your Exam Category</Text>
                            </View>
                            <View>
                                <Image source={Assets.examCategory.selectCategory} style={{height: 60, width: 90, resizeMode:'contain'}}/>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10}}>
                            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.labelOrInactiveColor+'4D', borderRadius: 4, padding: 15}}>
                                <Image source={appLogo} style={{height: 50, width: 50}}/>
                                <Text>Category A</Text>
                            </View>
                            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.labelOrInactiveColor+'4D', borderRadius: 4, padding: 15}}>
                                <Image source={appLogo} style={{height: 50, width: 50}}/>
                                <Text>Category B</Text>
                            </View>
                            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.labelOrInactiveColor+'4D', borderRadius: 4, padding: 15}}>
                                <Image source={appLogo} style={{height: 50, width: 50}}/>
                                <Text>Category C</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'column', justifyContent: 'center', marginVertical: 15}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15}}> 
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}> 
                                    <Image source={Assets.examCategory.otherCategory} style={{height: 40, width: 50}}/>
                                    <Text style={{fontFamily: "Raleway_600SemiBold", fontSize: 16, marginLeft: 15, color: theme.greyColor}}>Other Categories</Text>
                                </View>
                                <EvilIcons name="chevron-right" size={24}/>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}> 
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}> 
                                    <Image source={Assets.examCategory.otherCategory} style={{height: 40, width: 50}}/>
                                    <Text style={{fontFamily: "Raleway_600SemiBold", fontSize: 16, marginLeft: 15, color: theme.greyColor}}>Other Categories</Text>
                                </View>
                                <EvilIcons name="chevron-right" size={24}/>
                            </View>
                        </View>
                        
                    </View>
                    <View style={{borderWidth: 3, borderColor: theme.labelOrInactiveColor}}/>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
                            <TouchableOpacity style={{backgroundColor: theme.accentColor, paddingVertical: 8, paddingHorizontal: 20, borderRadius: 5}}>
                                <Text style={{color: theme.primaryColor, fontSize: 14}}>Skip</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </>
        )
    }

}

export default ExamCategory;