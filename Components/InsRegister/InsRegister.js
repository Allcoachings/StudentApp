import React from 'react';
import {Text, View,StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, CheckBox,ActivityIndicator} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth} from '../config'
import CardView from '../Utils/CardView';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import {fetch_categories} from '../Utils/DataHelper/Categories'
import {registerCoaching} from '../Utils/DataHelper/Coaching'
import {Picker} from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';

import {setInstituteDetails} from '../Actions'
import { connect } from 'react-redux';

class InsRegister extends React.Component {
    state = {
        insName: '',
        dirName: '',
        number: '',
        email: '',
        password: '',
        insAddr: '',
        state: '',
        city: '',
        about: '',
        tandc: '',
        isSelected: false,
        loadingCategory:true,
        selectedCategory:-1,
        categories:[],
        open:false,
        registerLoader:false
    }


    renderTextInput=(icon, placeholder,onPress)=>{
        return(
            CardView(
                // <View style={{flex: 1, flexDirection: 'row'}}>
                    <TextInput style={styles.inputField} placeholder={placeholder} onChangeText={(text)=>onPress(text)} />
               ,{marginTop: 10, padding: 12}
            )
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
                console.log("response",response)
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

        
        console.log("component")
        fetch_categories(this.handleCatgoryCallback) 
        
        // fetch_categories((response)=>{console.log(response)})
    }
    renderPickerItem=(item)=>
    {
        return(
            <Picker.Item label={item.label} value={item.key} />
        )
    }
    setSelectedCategory=(selectedCategory)=>
    {
        console.log("callback")
            this.setState({selectedCategory})
    }
    
 
    registerCoachingCallBack =(response)=>
    {
            console.log("callback",response.status)
            if(response.status==201)
            {
                 
                this.setState({registerLoader:true})
                this.props.setInstituteDetails({id:response.headers.map.location,name:this.state.insName,directorName:this.state.dirName,email:this.state.email,phone:this.state.phone,password:this.state.password,address:this.state.address,city:this.state.city,state:this.state.state,category:this.state.category,about:this.state.about,logo:this.state.logo.uri,status:1})
                this.props.navigation.navigate("Home")

            }

    }
    registerCoachingClickHandler=()=>
    {
            
         
            if(this.verifyFields(this.state))
            {
                if(!this.state.registerLoader)
                {
                    this.setState({registerLoader:true}) 
                    let {insName,dirName,email,phone,pass,addr,city,state,selectedCategory,about,logo} =this.state;
                    registerCoaching(insName,dirName,email,phone,pass,addr,city,state,selectedCategory,about,logo,this.registerCoachingCallBack) 
                }
               
            }else
            {
                 
                this.setState({error:"Please Fill All the Fields"});
            }
    }
    
    verifyFields =({insName,dirName,phone,email,pass,addr,city,state,about,selectedCategory,logo})=>{
        
        return insName&&dirName&&phone&&email&&pass&&addr&&city&&state&&about&&selectedCategory!=-1&&logo.type=="success"
    }

    handleImageBtnClick=()=>
    {
        DocumentPicker.getDocumentAsync({type:"image/*",copyToCacheDirectory:true,multiple:false}).then(response=>
            {
                console.log(response)
                if(response.type=="success")
                {
                    this.setState({logo:response})
                }
            })
    }
    render() {
        // fetch_categories((response)=>{console.log(response)})
        return(
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
            >
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.headView}>
                            <Text style={styles.headText}>Welcome Back</Text>
                        </View>
                        <TouchableOpacity style={styles.imageView} onPress={this.handleImageBtnClick}>
                            <Image source={{uri: this.state.logo?this.state.logo.uri:'https://picsum.photos/200/300'}} style={styles.imageStyle}/>
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
                            {this.renderTextInput('', 'New Password',(pass)=>{this.setState({pass})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Institute Address',(addr)=>{this.setState({addr})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'City',(city)=>{this.setState({city})})}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'State',(state)=>{this.setState({state})})}
                        </View>
                        
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'About this Coaching',(about)=>{this.setState({about})})}
                        </View>
                        
                        {!this.state.loadingCategory?(
                            
                            CardView(
                                <View style={styles.dropdownView}>
                                    <Picker
                                        style={{height:30}}
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
                                </View> ,{marginTop: 10, padding: 12})
                        ):(null)}
                        


                        {CardView(<View style={styles.checkboxContainer}>
                            <CheckBox
                                value={this.state.isSelected}
                                onValueChange={this.setSelection}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>By pressing 'Signup' you agree to our Terms & Conditions</Text>
                        </View>, {marginTop: 10, padding: 12,zIndex:-10,elevation:-10})}

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
           </PageStructure>
        )}
    }

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center'
    },
        headView:
        {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
    
        },
            headText:
            {
                marginTop:10,
                fontSize: 28,
                fontWeight: 'bold',
                color: theme.secondaryColor
            },
        imageView:
        {
            marginTop: 10
        },
            imageStyle:
            {
                height: 60,
                width: 60,
                borderRadius: 30
            },
        inputView:
        {
            marginTop: 10
        },
            inputField:
            {
                fontSize: 18
            },
        checkboxContainer: 
        {
            flexDirection: "row",
            marginTop: 10,
            alignItems: "center"
        },
            checkbox: 
            {
                
            },
            label: 
            {
                fontSize: 12,
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
                padding: 10,
                borderRadius: 10
            },
                regBtnText:
                {
                    marginLeft: 15,
                    marginRight: 15,
                    fontSize: 18,
                    color: theme.primaryColor
                }
    
})

export default connect(null,{setInstituteDetails})(InsRegister);