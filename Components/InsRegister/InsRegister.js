import React from 'react';
import {Text, View,StyleSheet, TextInput, TouchableOpacity,TouchableWithoutFeedback, Image, ScrollView, CheckBox,ActivityIndicator,Dimensions} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth} from '../config'
import CardView from '../Utils/CardView';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import {fetch_categories} from '../Utils/DataHelper/Categories'
import {registerCoaching} from '../Utils/DataHelper/Coaching'
import { Picker } from 'native-base';
import * as DocumentPicker from 'expo-document-picker';
import {EvilIcons} from '@expo/vector-icons';
import {setInstituteDetails,setInstituteAuth} from '../Actions'
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('window').width
import Toast from 'react-native-simple-toast';

class InsRegister extends React.Component {
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
        ]
    }

    validateEmail = (text) => {
        // // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
          // console.log("Email is Not Correct");
        //   this.setState({ email: text })
         Toast.show('ENter a valid Email');
          return false;
        }
        else {
        //   this.setState({ email: text })
          // console.log("Email is Correct");
          return true;
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
            // console.log("something went wrong")
        }
        
    }
    componentDidMount()
    {

     
        fetch_categories(this.handleCatgoryCallback) 
        
        // fetch_categories((response)=>{// console.log(response)})
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
    registerCoachingCallBack =(response)=>
    {
           
            if(response.status==201)
            {
                Toast.show('Institute Added Successfully.');
                this.setState({registerLoader:false})
                this.props.setInstituteDetails({id:response.headers.map.location,name:this.state.insName,directorName:this.state.dirName,email:this.state.email,phone:this.state.phone,password:this.state.password,address:this.state.address,city:this.state.city,state:this.state.state,category:this.state.category,about:this.state.about,logo:this.state.logo.uri,status:1})
                this.props.setInstituteAuth(true);
                AsyncStorage.setItem('authInfo', JSON.stringify({id:response.headers.map.location,name:this.state.insName,directorName:this.state.dirName,email:this.state.email,phone:this.state.phone,password:this.state.password,address:this.state.address,city:this.state.city,state:this.state.state,category:this.state.category,about:this.state.about,logo:this.state.logo.uri,status:1,authType:'ins'}))
                this.props.navigation.navigate("Home")

            }
            else
            {
                Toast.show('Something Went Wrong. Please Try Again Later.');
            }

    }
    registerCoachingClickHandler=()=>
    {
            
         
            if(this.verifyFields(this.state)&&this.validateEmail(this.state.email))
            {
                if(!this.state.registerLoader)
                {
                    this.setState({registerLoader:true}) 
                    let {insName,dirName,email,phone,pass,addr,city,state,selectedCategory,about,logo} =this.state;
                    registerCoaching(insName,dirName,email,phone,pass,addr,city,state,selectedCategory,about,logo,this.registerCoachingCallBack) 
                }
               
            }else
            {
                 
                Toast.show('Please Fill All The Fields.');
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
                    this.setState({logo:response})
                }
            })
    }
    render() {
        // fetch_categories((response)=>{// console.log(response)})
 
        return(
            // <PageStructure
            //     iconName="navicon"
            //     btnHandler={() => {this.props.navigation.toggleDrawer()}}
            // >
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            {/* <AuthHeader/>                         */}
                            <TouchableWithoutFeedback onPress={()=>this.props.changeAuthMode(1)}> 
                                <EvilIcons name="chevron-left" size={20} color={theme.greyColor}  />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.headView}>
                            <Text style={styles.headText}>{this.props.route&&this.props.route.params&&this.props.route.params.mode=="edit"?("Edit"):("Submit")} Your Institute Details</Text>
                        </View>
                        <TouchableOpacity style={styles.imageView} onPress={this.handleImageBtnClick}>
                            <Image source={{uri: this.state.logo?this.state.logo.uri:'https://picsum.photos/200/300'}} style={styles.imageStyle}/>
                            <Text style={{fontFamily:'Raleway_600SemiBold',alignSelf: 'center'}}>{"Choose Logo"}</Text>
                        </TouchableOpacity>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Institute Name',(insName)=>{this.setState({insName})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Director Name',(dirName)=>{this.setState({dirName})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Phone number',(phone)=>{this.setState({phone})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'E-mail ID',(email)=>{this.setState({email})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Password',(pass)=>{this.setState({pass})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'ConfirmPassword',(pass)=>{this.setState({pass})})}
                        </View>
                        
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'About this Institute',(about)=>{this.setState({about})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Institute Address',(addr)=>{this.setState({addr})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'City',(city)=>{this.setState({city})})}
                        </View>
                        <View style={styles.inputField}>
                            {/* {this.renderTextInput('', 'State',(state)=>{this.setState({state})})} */}
                            <Picker 
                            style={[styles.dropDownView,{height:30}]}
                            selectedValue={this.state.state}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setSelectedState(itemValue)
                            }>
                                {/* <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" /> */}
                            {this.state.indianStates&&this.state.indianStates.map((item)=>this.renderPickerItemState(item))}
                            </Picker>
                        </View>
                        
                        
                        {!this.state.loadingCategory?(
                            
                            // CardView(
                                <View style={styles.inputField}>
                                    <Picker

                                        style={[styles.dropDownView,{height:30}]}
                                        selectedValue={this.state.selectedCategory}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setSelectedCategory(itemValue)
                                        }>
                                            {/* <Picker.Item label="Java" value="java" />
                                            <Picker.Item label="JavaScript" value="js" /> */}
                                        {this.state.categories&&this.state.categories.map((item)=>this.renderPickerItem(item))}
                                    </Picker>
                                    {/* <DropDownPicker
                                        placeholder="Select Category"
                                        placeholderTextColor={theme.greyColor}
                                        containerStyle={{borderColor: theme.greyColor}}
                                        items={this.state.categories}
                                        open={this.state.open}
                                        setOpen={this.open}
                                        value={this.state.selectedCategory}
                                        setValue={this.setValue}
                                        dropdownContainerStyle={{
                                            zIndex:1000,
                                            elevation:100
                                        }}
                                    /> */}
                                </View> 
                                // ,{marginTop: 10, padding: 12})
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
        //    </PageStructure>
        )}
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

export default connect(null,{setInstituteDetails,setInstituteAuth})(InsRegister);