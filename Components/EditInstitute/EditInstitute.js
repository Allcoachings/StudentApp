import React from 'react';
import {Text, View,StyleSheet, TextInput, TouchableOpacity,TouchableWithoutFeedback, Image, ScrollView, CheckBox,ActivityIndicator,Dimensions} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth, imageProvider, serverBaseUrl} from '../config'
import CardView from '../Utils/CardView';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from 'native-base';
import * as DocumentPicker from 'expo-document-picker';
import {fetch_categories} from '../Utils/DataHelper/Categories'
import {Feather} from '@expo/vector-icons';
import {setInstituteDetails,setInstituteAuth} from '../Actions'
import {fetch_instituteDetails} from '../Utils/DataHelper/Coaching'
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('window').width
import Toast from 'react-native-simple-toast';
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import {uploadFile} from '../Utils/DataHelper/FileHandler'
import {updateInstituteDetails} from '../Utils/DataHelper/EditInstitute'
class EditInstitute extends React.Component {
    state = {
        name: '',
        directorName: '',
        phone: '',
        email: '',
        password: '',
        logo:'', 
        address: '',
        state: '',
        city: '',
        about: '',
        id: this.props.institute.details.id,
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
        institute: {},
        loadingInstitute: true,
        changedLogo: ''
    }

    instituteCallback=(response) =>
    {
        if(response.status==200)
        {
            response.json().then(data=>
                {
                    console.log(data)
                    this.setState({name:data.name, directorName:data.directorName, phone:data.phone, email:data.email, password: data.password, about: data.about, address: data.address, city: data.city, state:data.state, loadingInstitute:false, logo:data.logo})
                })
            
        }
    }


    renderTextInput=(icon, placeholder, value, onPress)=>{
        return(
                    <>
                        <Text style={{fontFamily:'Raleway_600SemiBold',alignSelf: 'flex-start',marginLeft:10}}>{placeholder}</Text>
                        <TextInput style={styles.inputField} defaultValue={value} placeholder={"Enter "+placeholder} onChangeText={(text)=>onPress(text)} />
                    </>
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
        fetch_instituteDetails(this.props.institute.details.id,this.instituteCallback)
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
        this.setState({registerLoader: true})
        if(this.state.changedLogo)
        {
            console.log("file upload")
            uploadFile(this.state.changedLogo, this.fileCallBack)
        }
        else
        {
            console.log("details upload")
            this.update()
        }
    }

    update=()=>{
        console.log("hre")
        if(this.verifyFields(this.state))
        {
            console.log("verifyFields")
            updateInstituteDetails(this.state.id, this.state.about, this.state.address, this.state.city, this.state.directorName, this.state.email, this.state.logo, this.state.name, this.state.phone, this.state.state, this.state.password, this.updateDetailsCallback)  
        } 
        else
        {
            console.log("not verifyFields")
            this.setState({registerLoader: false})
            Toast.show("Please Fill All The Fields.")
        }
    }

    fileCallBack=(response)=>{
        console.log("file", response.status)
        if(response.status==201)
        {
            this.setState({logo: response.headers.map.location},()=>this.update())
        }
        else
        {
            console.log("error", response.status)
        }
    }

    updateDetailsCallback=(response)=>{
        this.setState({registerLoader: false})
        console.log("details", response.status)
        if(response.status==200)
        {
            Toast.show("Insititute Details Updated Successfully.")
        }
        else
        {
            Toast.show("Something Went Wrong. Please Try Again Later!!")
        }
    }
    
    verifyFields =({name,directorName,phone,email,password,address,city,state,about})=>{
        
        return name&&directorName&&phone&&email&&password&&address&&city&&state!=this.state.indianStates[0]&&about
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
                            {/* <TouchableWithoutFeedback onPress={()=>this.props.cnavigation.goBack()}> 
                                <Feather name="arrow-left" size={20} color={theme.greyColor}  />
                            </TouchableWithoutFeedback> */}
                        </View>
                        <View style={styles.headView}>
                            <Text style={styles.headText}>Update Your Institute Details</Text>
                        </View>
                        <TouchableOpacity style={styles.imageView} onPress={this.handleImageBtnClick}>
                            <Image source={this.state.changedLogo?(this.state.changedLogo):({uri: imageProvider(this.state.logo)})} style={styles.imageStyle}/>
                            <Text style={{fontFamily:'Raleway_600SemiBold',alignSelf: 'center'}}>{"Change Logo"}</Text>
                        </TouchableOpacity>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Institute Name',this.state.name,(name)=>{this.setState({name})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Director Name',this.state.directorName,(directorName)=>{this.setState({directorName})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Phone number',this.state.phone,(phone)=>{this.setState({phone})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'E-mail ID',this.state.email,(email)=>{this.setState({email})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Password',this.state.password,(password)=>{this.setState({password})})}
                        </View>
                        
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'About this Institute',this.state.about,(about)=>{this.setState({about})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Institute Address',this.state.address,(address)=>{this.setState({address})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'City',this.state.city,(city)=>{this.setState({city})})}
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
                                                

                        <View style={styles.regBtnView}>
                            <TouchableOpacity style={styles.regBtn} onPress={this.saveDetails}>
                                {this.state.registerLoader?(
                                    <ActivityIndicator color={theme.primaryColor} size={"large"}/>

                                ):(
                                    <Text style={styles.regBtnText}>Save Changes</Text>
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