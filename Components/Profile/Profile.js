import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image, Platform, ScrollView, Modal, ActivityIndicator, TextInput} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
// import {connect} from 'react-redux'
import { theme,dataLimit,screenMobileWidth,serverBaseUrl,documentPlaceholder,imageProvider, Assets } from '../config';
import { EvilIcons } from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import * as DocumentPicker from 'expo-document-picker';
import { updateStudentDetails, updateStudentImage } from '../Utils/DataHelper/UserProfile';
import {setUserInfo} from '../Actions'  
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
// import {Feed} from "../Feed/Feed"
import * as ImagePicker from 'expo-image-picker';
import { Picker } from 'native-base';
import OtpModal from './OtpModal';
class Profile extends React.Component {

   state={
       studentImage: this.props.userInfo.studentImage,
       studentImagePrev: {uri: imageProvider(this.props.userInfo.studentImage)},
       name: this.props.userInfo.name,
       email: this.props.userInfo.email,
       mobileNumber: this.props.userInfo.mobileNumber,
       stateOfResidence: this.props.userInfo.stateOfResidence,
       indianStates:[
        "Select",
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
     
   }

    check = async () => 
   {
       if (Platform.OS !== 'web') 
       {
           const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
           if (status !== 'granted') 
           {
               alert('Sorry, we need camera roll permissions to make this work!');
           }
           else
           {
               this.handleImageBtnClick();
           }
       }
   }
    setSelectedState=(state)=>
    {
        
            this.setState({state})
    }

    onFocus=(name)=>
    {
        this.setState({focusedInput:name})
    } 
    onBlur=(name)=>
    {
        if(this.state.focusedInput==name)
        {
            this.setState({focusedInput:''})
        }
    }
    handleImageBtnClick=async()=>
    {


        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
          });


          if(result.uri != null)
          {
              // this.setState({localUri : result.uri})
            //   setImageUri(result.uri);
            //   // console.log(result);
            //   setImageLoading(true);
              this.setState({changedImage:result,studentImagePrev:{uri:result.uri}})
              // this.setState({imageLoading:true})
            //   let filename = result.uri.split('/').pop();
            //   let match = /\.(\w+)$/.exec(filename);
            //   let type = match ? `image/${match[1]}` : `image`;
            //   uploadImageToServer(result.uri,filename,type,userDetails.id,uploadImageCallback)
          }
        
        // DocumentPicker.getDocumentAsync({type:"image/*",copyToCacheDirectory:true,multiple:false}).then(response=>
        // {
        //     // console.log(response)
        //     if(response.type=="success")
        //     {
        //         this.setState({changedImage:response,studentImagePrev:{uri:response.uri}})
        //         // console.log(response)
        //     }
        // })
    }

    setMobileVerificationStatus=()=>{
        this.setState({mobileVerified:true})
    }
    setEmailVerificationStatus=()=>{
        this.setState({emailVerified:true})
    }
    saveBtnHandler = ()=>
    {
        if(this.verify(this.state))
        {
            if( this.state.email!=this.props.userInfo.email||this.state.mobileNumber!=this.props.userInfo.mobileNumber)
            {

                this.setState({otpModalVisible:true,isToVerifiedEmail:this.state.email!=this.props.userInfo.email,isToVerifiedMobile:this.state.mobileNumber!=this.props.userInfo.mobileNumber})
            }else
            {
                this.saveDetails()
            }
        }
    }

    saveDetails=()=>{
       
        
            this.setState({loader: true})
            if(this.state.changedImage)
            {
                updateStudentImage(this.props.userInfo.id, this.state.changedImage, this.imageCallback)
            }
            else
            {
            
                    updateStudentDetails(this.props.userInfo.id, this.props.userInfo.userId, this.state.email, this.state.name, this.state.stateOfResidence, this.state.mobileNumber, this.state.studentImage, this.props.userInfo.blocked,this.updateStudentCallback)
            
                
            }
        
    }

    imageCallback=(response)=>{
        if(response.status==201)
        {
            this.setState({studentImage:response.headers.map.location})
            
            updateStudentDetails(this.props.userInfo.id, this.props.userInfo.userId, this.state.email, this.state.name, this.state.stateOfResidence, this.state.mobileNumber, this.state.studentImage, this.props.userInfo.blocked,this.updateStudentCallback)
        }
        else
        {
            // console.log("image error", response.status)
            Toast.show("Failed To Update Image. Please Try Again Later.")
        }
    }

    updateStudentCallback=(response)=>{
        this.setState({loader: false})
        if(response.status==201)
        {
            var obj={
                name: this.state.name, 
                email: this.state.email, 
                mobileNumber: this.state.mobileNumber, 
                studentImage: this.state.studentImage, 
                authType: this.props.userInfo.authType, 
                blocked: this.props.userInfo.blocked, 
                stateOfResidence: this.state.stateOfResidence, 
                userId: this.props.userInfo.userId,
                id: this.props.userInfo.id,
            }
            // console.log("obj", obj)

            this.props.setUserInfo(obj)
            AsyncStorage.setItem('userDetails', JSON.stringify(obj))
            Toast.show("Profile Updated Successfully.")
        }
        else
        {
            Toast.show("Something Went Wrong. Please Try Again Later.")
        }
    }

    renderTextInput=(label, dValue, onchange)=>{
        return(
            <View style={{marginTop: '7%'}}>
                <Text style={{ fontSize: 14, color: theme.greyColor, marginTop: '7%'}}>{label}</Text>
                <TextInput   defaultValue={dValue} onChangeText={onchange}/>
                <View style={{borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor}}/>
            </View>
        )
    }
    renderPickerItem=(item)=>
    {
        return(
            <Picker.Item label={item} value={item} />
        )
    }

    verify=({email,name,state,mobileNumber})=>
    {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
        if(!name)
        {
            this.setState({error:'Please Enter Full Name' , fieldName:"fullname"})
            return false
        }
        if(!reg.test(email))
        {
            this.setState({error:'Invalid Email' , fieldName:"email"})
            return false
        }
        if(state=="Select")
        {
            this.setState({error:'Please Choose State' , fieldName:"state"})
            return false
        }
        // console.log(mobileNumber.length)
        if(mobileNumber.length!=10)
        {
            this.setState({error:'Mobile Number must be of 10 digits' , fieldName:"mobile"})
            return false
        }
        return true
    }
    render(){
    
        return (
            <PageStructure
                iconName="arrow-left"
                btnHandler={() => {this.props.navigation.goBack()}}
                titleonheader={"Edit Profile"}
                headerStyle={{ justifyContent: 'center'}}
                replaceBottomTab={false}
                navigation={this.props.navigation}
                nosearchIcon={true}
                noNotificationIcon={true}
            >
                <ScrollView>
                    <View style={styles.container}>
                        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={this.handleImageBtnClick}>
                            <Image 
                                ref={(ref)=>this.imageRef=ref}
                                source={this.state.studentImagePrev} style={{height: 100, width: 100, borderRadius: 50}}
                                onError={()=>
                                    {
                                        if(this.imageRef)
                                        {
                                            this.imageRef.setNativeProps({
                                                src:[Image.resolveAssetSource(Assets.profile.profileIcon)]
                                            })
                                        }
                                    }}
                            />
                        </TouchableOpacity> 
                        <View style={styles.nameView}>
                                <Text style={styles.name}>{this.props.userInfo.name}</Text>
                                <Text style={styles.number}>@{this.props.userInfo.userId}</Text>
                        </View>
                        <View style={{alignItems: 'center',marginTop:10}}>
                            {this.state.error?( 
                                    <Text style={styles.errorText}>{this.state.error}</Text>
                                ):(null)}
                        </View>
                        <View style={{marginTop:10}}>
                            <Text   style={[{marginLeft:15,fontFamily:'Raleway_600SemiBold',color:theme.greyColor}]}>Full Name</Text>
                        </View>
                        <View style={styles.queDescView}>
                            <TextInput 
                                style={[styles.queDesc,{borderColor:this.state.fieldName=="fullname"?theme.redColor:theme.greyColor}]}
                                onChangeText={(text)=>this.setState({name: text})}  
                                placeholder="Enter full name" 
                                placeholderTextColor={ theme.greyColor}
                                value={this.state.name}
                            />
                        </View> 
                        <View style={{marginTop:15}}>
                        <Text style={[{marginLeft:15,fontFamily:'Raleway_600SemiBold',color:theme.greyColor}]}>State Of residence</Text>
                        </View>
                        <View style={[styles.queDesc,{borderWidth:1,marginHorizontal:10,marginTop:10},{borderColor:this.state.fieldName=="state"?theme.redColor:theme.greyColor}]}> 
                            <Picker
                                style={[styles.queDesc,{height:30}]}
                                selectedValue={this.state.stateOfResidence} 
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({stateOfResidence:itemValue})
                                }>
                                    {/* <Picker.Item label="Java" value="java" />
                                    <Picker.Item label="JavaScript" value="js" /> */}
                                {this.state.indianStates&&this.state.indianStates.map((item)=>this.renderPickerItem(item))}
                            </Picker>
                        </View> 
                        <View style={{marginTop:15}}>
                            <Text style={[{marginLeft:15,fontFamily:'Raleway_600SemiBold',color:theme.greyColor}]}>Mobile Number</Text>
                        </View>
                        <View style={styles.queDescView}>
                                <TextInput
                                    style={[styles.queDesc,{borderColor:this.state.fieldName=="mobile"?theme.redColor:theme.greyColor}]}   
                                    onChangeText={(text)=>this.setState({mobileNumber: text})} 
                                    placeholder="Enter Mobile Number" 
                                    placeholderTextColor={theme.greyColor}
                                   value={this.state.mobileNumber}
                                />
                        </View>
                         <View style={{marginTop:15}}>
                            <Text style={[{marginLeft:15,fontFamily:'Raleway_600SemiBold',color:theme.greyColor}]}>Email address</Text>
                        </View>
                        <View style={styles.queDescView}>
                                <TextInput 
                                    style={[styles.queDesc,{borderColor:this.state.fieldName=="email"?theme.redColor:theme.greyColor}]}   
                                    onChangeText={(text)=>this.setState({email: text})}  
                                    placeholder="Enter email address" 
                                    value={this.state.email}
                                    placeholderTextColor={theme.greyColor}/>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity 
                            style={{borderRadius: 10, marginTop: '7%', paddingHorizontal: 50, paddingVertical:10, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.accentColor}}
                             onPress={()=>this.saveBtnHandler()}>
                               {this.state.loader?(
                                    <ActivityIndicator color={theme.primaryColor} size={"large"}/>
                                ):(
                                   <Text style={{color: theme.primaryColor, fontSize:18, fontWeight: 'bold'}}>Save</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>  
                {this.state.otpModalVisible?(
                    <OtpModal  
                        isVisible={this.state.otpModalVisible} 
                        closeModal={()=>this.setState({otpModalVisible: false})}
                        setMobileVerificationStatus={this.setMobileVerificationStatus}
                        setEmailVerificationStatus={this.setEmailVerificationStatus}
                        email={this.state.email}
                        mobile={this.state.mobileNumber}
                        saveDetails={this.saveDetails}
                        isToVerifiedEmail={this.state.isToVerifiedEmail}
                        isToVerifiedMobile={this.state.isToVerifiedMobile}
                    /> 
                ):(null)}
                
            </PageStructure>
            
        )
    }

}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        flexDirection: 'column',
        margin:15,
        // justifyContent: 'center', 

    },
    nameView:
    {
        alignItems: 'center',
        marginVertical:10
    },
    queDescView:
    {
        marginTop: '1%',
        padding: 10
    },
        queDesc:
        {
            borderRadius: 10,
            padding: 10,
            borderWidth: 1,
            fontFamily: 'Raleway_600SemiBold',
            borderColor:theme.labelOrInactiveColor, 
        },
    errorText:
    {
        fontFamily: 'Raleway_600SemiBold',
        textAlign: 'center', 
        color:theme.featureNoColor 
    },
})
        

const  mapStateToProps = (state)=>
{
    return {
        userInfo:state.user.userInfo,
    }
}
export default connect(mapStateToProps,{setUserInfo})(Profile);