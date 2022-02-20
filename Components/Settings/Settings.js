import { EvilIcons ,Feather} from '@expo/vector-icons';
import React, { Component ,useState} from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Dimensions } from 'react-native';
import { theme } from '../config';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure';
import {useSelector,useDispatch} from 'react-redux'
import SendMessage from '../InstituteView/SendMessage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_INSTITUTE_DETAILS, USER_AUTH_STATUS } from '../Actions/types';
import LogoutAlert from './LogoutAlert'
const windowWidth = Dimensions.get('window').width

 

const Settings =  ({navigation})=> {
  


  const [helpAndSupportModalVisible,setHelpAndSupportModalVisible] = useState(false)
  const [feedbackModalVisible,setFeedbackModalVisible] = useState(false)
  const [logoutAlertModal,setLogoutAlertModal] = useState(false)
  const userInfo = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  const renderSettingItem=(label,icon,onPress)=>
  {
      return (
          <TouchableOpacity style={{flexDirection: 'row',padding:10,margin:10,alignItems: 'center',borderBottomWidth:1,borderBottomColor:theme.labelOrInactiveColor}} onPress={onPress}>
              <View style={{backgroundColor: theme.labelOrInactiveColor,borderRadius:30,padding:9}}>
                <Feather name={icon} size={20}/>
              </View>
              <Text style={{marginLeft:10,fontSize:15}}>{label}</Text>
              <EvilIcons name="chevron-right" size={20} style={{marginLeft:'auto',alignSelf:'flex-end'}}/>
          </TouchableOpacity>
      )
  }

  const logout=()=>
  {
    AsyncStorage.removeItem("authInfo")
    dispatch({type:USER_AUTH_STATUS,payload:{authStatus:false}})
    dispatch({type:SET_INSTITUTE_DETAILS,payload:{details:null}})
  }
 
    return (
        <PageStructure
            iconName={"arrow-left"}
            btnHandler={() => {navigation.goBack()}}
            titleonheader={"Settings"}
            noNotificationIcon={true}
            navigation={navigation}
            nosearchIcon={true}
        >
                
                    
                    <View style={styles.container}>
                      {renderSettingItem('Account','user',()=>{(navigation.navigate("EditProfile"))})}
                      {renderSettingItem('Help & Support','help-circle',()=>{setFeedbackModalVisible(false);setHelpAndSupportModalVisible(true);})}
                      {renderSettingItem('Rate us on Play Store','disc',()=>{})}
                      {/* {renderSettingItem('Refer n earn','gift',()=>{})} */}
                      {renderSettingItem('Privacy Policy','lock',()=>{})}
                      {renderSettingItem('Terms and Conditions','calendar',()=>{})}
                      {renderSettingItem('FeedBack','refresh-cw',()=>{setHelpAndSupportModalVisible(false);setFeedbackModalVisible(true)})}
                      {renderSettingItem('Logout','log-out',()=>{setLogoutAlertModal(true)})}
                    </View>
                    {feedbackModalVisible?(
                    <SendMessage
                        isVisible={feedbackModalVisible}
                        closeModal={()=>setFeedbackModalVisible(false)}
                        forAdmin={true}  
                        title="FeedBack"
                        studentId={userInfo.id}
                        messageType="feedback"
                    />
                ):(null)}
              {helpAndSupportModalVisible?(
                    <SendMessage
                        isVisible={helpAndSupportModalVisible}
                        closeModal={()=>setHelpAndSupportModalVisible(false)}
                        forAdmin={true}  
                        studentId={userInfo.id}
                        title="Help & Support"
                        messageType="helpAndSupport"
                    />
                ):(null)}
              {logoutAlertModal?(
                <LogoutAlert
                  visible={logoutAlertModal}
                  closeModal={()=>setLogoutAlertModal(false)}
                  yesFun={()=>logout()}
                
                />
              ):(null)}

      </PageStructure>
    );
  
}
const styles = StyleSheet.create({
    
});
export default Settings;
