import React from 'react';
import {Text, View,StyleSheet, TextInput, TouchableOpacity,TouchableWithoutFeedback, Image, ScrollView, CheckBox,ActivityIndicator,Dimensions} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth} from '../config'
import CardView from '../Utils/CardView';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from 'native-base';
import * as DocumentPicker from 'expo-document-picker';
import {Feather} from '@expo/vector-icons';
import {setInstituteDetails,setInstituteAuth} from '../Actions'
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('window').width
import Toast from 'react-native-simple-toast';
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import {uploadFile} from '../Utils/DataHelper/FileHandler'
class EditInstitute extends React.Component {
    state = {
        insName: '',
        dirName: '',
        number: '',
        email: '',
        password: '',
        insAddr: '',
        state: 'Andaman and Nicobar Islands',
        city: '',
        about: '',
        tandc: '',
        isSelected: false,
        loadingCategory:true,
        selectedCategory:-1,
        categories:[],
        open:false,
        registerLoader:false,
        indianStates:[
            "Select State",
            "Andaman and Nicobar Islands",
            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chandigarh",
            "Chhattisgarh",
            "Dadra and Nagar Haveli",
            "Daman and Diu",
            "Delhi",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jammu and Kashmir",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Ladakh",
            "Lakshadweep",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Puducherry",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttar Pradesh",
            "Uttarakhand",
            "West Bengal"
        ],
        institute: [],
        loadingInstitute: true,
        changedLogo: ''
    }


    componentDidMount(){
        fetch_instituteDetails(this.props.institute.details.id,this.instituteCallback)
    }

    instituteCallback=(response) =>
    {
        if(response.status==200)
        {
            response.json().then(data=>
                {
                    console.log(data)
                    this.setState({institute:data,loadingInstitute:false})
                })
            
        }
    }


    renderTextInput=(icon, placeholder,onPress)=>{
        return(
            // CardView(
                // <View style={{flex: 1, flexDirection: 'row'}}>
                    <>
                        <Text style={{fontFamily:'Raleway_600SemiBold',alignSelf: 'flex-start',marginLeft:10}}>{placeholder}</Text>
                        <TextInput style={styles.inputField} placeholder={"Enter "+placeholder} onChangeText={(text)=>onPress(text)} />
                    </>
            //    ,{marginTop: 10, padding: 12}
            // )
        )
    }

    setSelection=()=>{
        this.setState({isSelected: !this.state.isSelected})
    }

    handleCatgoryCallback=(response)=>
    {
        if(response.status === 200)
        {
            response.json().then(response=>
                { 
                
                response.unshift({key:-1,label:"Select Category"})
                this.setState({categories: response,loadingCategory:false},()=>{
                
                })
                })
                
        }else
        {
            console.log("something went wrong")
        }
        
    }
    componentDidMount()
    {

     
        fetch_categories(this.handleCatgoryCallback) 
        
        // fetch_categories((response)=>{console.log(response)})
    }
    renderPickerItem=(item)=>
    {
        return(
            <Picker.Item label={item.label} value={item.key} />
        )
    }
    renderPickerItemState=(item)=>
    {
        return(
            <Picker.Item label={item} value={item} />
        )
    }
    setSelectedCategory=(selectedCategory)=>
    {
                
            this.setState({selectedCategory})
    }
    
    setSelectedState=(state)=>{
        this.setState({state});
    }
    
    saveDetails=()=>{
        if(this.state.changedImage)
        {
            
        }
    }
    
    verifyFields =({insName,dirName,phone,email,pass,addr,city,state,about,selectedCategory,logo})=>{
        
        return insName&&dirName&&phone&&email&&pass&&addr&&city&&state!=this.state.indianStates[0]&&about&&selectedCategory!=-1&&logo.type=="success"
    }

    handleImageBtnClick=()=>
    {
        DocumentPicker.getDocumentAsync({type:"image/*",copyToCacheDirectory:true,multiple:false}).then(response=>
            {
               
                if(response.type=="success")
                {
                    this.setState({changedLogo:response})
                }
            })
    }

    render() {
 
        return(
               this.state.loadingInstitute?(
                   <CustomActivtiyIndicator mode="instituteView"/>
               ):( <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            {/* <AuthHeader/>                         */}
                            <TouchableWithoutFeedback onPress={()=>this.props.changeAuthMode(1)}> 
                                <Feather name="chevron-left" size={20} color={theme.greyColor}  />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.headView}>
                            <Text style={styles.headText}>{this.props.route.params.mode=="edit"?("Edit"):("Submit")} Your Institute Details</Text>
                        </View>
                        <TouchableOpacity style={styles.imageView} onPress={this.handleImageBtnClick}>
                            <Image source={{uri: imageProvider(this.state.institute.logo)}} style={styles.imageStyle}/>
                            <Text style={{fontFamily:'Raleway_600SemiBold',alignSelf: 'center'}}>{"Change Logo"}</Text>
                        </TouchableOpacity>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Institute Name',this.state.institute.name,(insName)=>{this.setState({insName})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Director Name',this.state.institute.directorName,(dirName)=>{this.setState({dirName})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Phone number',this.state.institute.phone,(phone)=>{this.setState({phone})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'E-mail ID',this.state.institute.email,(email)=>{this.setState({email})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Password',this.state.institute.password,(pass)=>{this.setState({pass})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'ConfirmPassword',this.state.institute.password,(pass)=>{this.setState({pass})})}
                        </View>
                        
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'About this Institute',this.state.institute.about,(about)=>{this.setState({about})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Institute Address',this.state.institute.address,(addr)=>{this.setState({addr})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'City',this.state.institute.city,(city)=>{this.setState({city})})}
                        </View>
                        <View style={styles.inputField}>
                            <Picker 
                            style={[styles.dropDownView,{height:30}]}
                            selectedValue={this.state.state}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setSelectedState(itemValue)
                            }>
                            {this.state.indianStates&&this.state.indianStates.map((item)=>this.renderPickerItemState(item))}
                            </Picker>
                        </View>
                        
                        
                        {!this.state.loadingCategory?(
                                <View style={styles.inputField}>
                                    <Picker

                                        style={[styles.dropDownView,{height:30}]}
                                        selectedValue={this.state.selectedCategory}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setSelectedCategory(itemValue)
                                        }>
                                        {this.state.categories&&this.state.categories.map((item)=>this.renderPickerItem(item))}
                                    </Picker>
                                </View> 
                        ):(null)}
                        


                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={this.state.isSelected}
                                onValueChange={this.setSelection}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>By pressing 'Signup' you agree to our Terms & Conditions</Text>
                        </View>

                        <View style={styles.regBtnView}>
                            <TouchableOpacity style={styles.regBtn} onPress={this.registerCoachingClickHandler}>
                                {this.state.registerLoader?(
                                    <ActivityIndicator color={theme.primaryColor} size={"large"}/>

                                ):(
                                    <Text style={styles.regBtnText}>Register</Text>
                                )}
                                
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
        ))}
    }

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
        header:
        {
            margin:10
        },
        headView:
        {
            display: 'flex',
            flexDirection: 'row', 
            alignItems: 'flex-start'
    
        },
            headText:
            {
                margin:10,
                fontSize: 20,
                
                // fontWeight: 'bold',
                fontFamily:'Raleway_600SemiBold',
                color: theme.secondaryColor
            },
        imageView:
        {
            marginTop: 10,
            alignItems: 'center'
        },
            imageStyle:
            {
                height: 60,
                width: 60,
                borderRadius: 30
            },
        inputView:
        {
            marginTop: 10,
            alignItems: 'center', 
        },
            inputField:
            {
                width: width-20,
                borderRadius: 10,
                padding: 10,
                margin:10,
                borderWidth: 1,
                fontFamily: 'Raleway_600SemiBold',
                borderColor:theme.labelOrInactiveColor, 
            },
        checkboxContainer: 
        {
            width: width-20,
            borderRadius: 10,
            padding: 10,
            margin:10,
            borderWidth: 1,
            flexDirection: 'row',
            // justifyContent: 'center',
            alignItems: 'center',
            // fontFamily: 'Raleway_600SemiBold',
            borderColor:theme.labelOrInactiveColor,
        },
            checkbox: 
            {
                borderWidth: 1,
                fontFamily: 'Raleway_600SemiBold',
                borderColor:theme.labelOrInactiveColor, 
            },
            label: 
            {
                fontSize: 12,
                fontFamily: 'Raleway_600SemiBold',
                color: theme.greyColor,
                marginLeft: 5
            },
        regBtnView:
        {
            marginTop: 10
        },
            regBtn:
            {
                marginTop: 10,
                backgroundColor: theme.accentColor,
                padding: 15,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 2
            },
                regBtnText:
                {
                    marginLeft: 15,
                    marginRight: 15,
                    fontSize: 18,
                    color: theme.primaryColor,
                    fontFamily: 'Raleway_700Bold',
                },
        dropDownView:
        {
            color: theme.greyColor,
            fontFamily: 'Raleway_600SemiBold',
        }
    
})
const  mapStateToProps = (state)=>
{
    return {
        institute:state.institute
    }
}
export default connect(mapStateToProps)(EditInstitute);