import { EvilIcons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Dimensions } from 'react-native';
import { theme } from '../config';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure';
const windowWidth = Dimensions.get('window').width
class Settings extends Component {
  state ={}

  renderSettingItem=(label,icon,onPress)=>
  {
      return (
          <TouchableOpacity style={{flexDirection: 'row',padding:10,margin:10,alignItems: 'center',borderBottomWidth:1,borderBottomColor:theme.labelOrInactiveColor}} onPress={onPress}>
              <View style={{backgroundColor: theme.labelOrInactiveColor,borderRadius:30,padding:9}}>
                <EvilIcons name={icon} size={20}/>
              </View>
              <Text style={{marginLeft:10,fontSize:15}}>{label}</Text>
              <EvilIcons name="chevron-right" size={20} style={{marginLeft:'auto',alignSelf:'flex-end'}}/>
          </TouchableOpacity>
      )
  }

  render() {
    return (
        <PageStructure
            iconName={"arrow-left"}
            btnHandler={() => {this.props.navigation.goBack()}}
            titleonheader={"Settings"}
            noNotificationIcon={true}
            nosearchIcon={true}
        >
                
                    
                    <View style={styles.container}>
                      {this.renderSettingItem('Account','user',()=>{this.props.route.params.mode=="institute"?(this.props.navigation.navigate("EditInstitute")):(this.props.navigation.navigate("EditProfile"))})}
                      {this.renderSettingItem('Help & Support','help-circle',()=>{})}
                      {this.renderSettingItem('Rate us on Play Store','disc',()=>{})}
                      {/* {this.renderSettingItem('Refer n earn','gift',()=>{})} */}
                      {this.renderSettingItem('Privacy Policy','lock',()=>{})}
                      {this.renderSettingItem('Terms and Conditions','calendar',()=>{})}
                      {this.renderSettingItem('FeedBack','refresh-cw',()=>{})}
                    </View>
      </PageStructure>
    );
  }
}
const styles = StyleSheet.create({
    
});
export default Settings;
