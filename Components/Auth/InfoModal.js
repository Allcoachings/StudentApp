import React, { Component ,useState} from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text,StyleSheet,ScrollView,TouchableOpacity,Dimensions,Image, Modal, TextInput, ImageBackground } from 'react-native';
import CardView from '../Utils/CardView';
import {theme, Assets} from '../config'
import { StackActions, ThemeProvider } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Rating, AirbnbRating } from 'react-native-ratings';
const width = Dimensions.get('window').width
const height = Dimensions.get('screen').height
var rate ;

class InfoModal extends React.Component {
    state = {
        heading : 'Personal Information',
        
    }
    
    render() {
        return(
            <Modal
            animationType="fade"
            transparent={true}
            // style={{height:500,width:5001}}
            visible={this.props.isModalVisible}
            >
                <View>
                {CardView(
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.postQueText}>{this.state.heading}</Text>
                            {/* <TouchableOpacity onPress={()=>this.props.closeModal()}>
                                <Image source={Assets.discussions.closeIcon} style={styles.closeIcon}/>
                            </TouchableOpacity> */}
                             
                        </View>
                        
                        <View style={{marginTop:height*0.04}}>
                            <Text style={{marginLeft:15}}>Full Name</Text>
                        </View>
                        <View style={styles.queDescView}>
                            <TextInput style={styles.queDesc} onChangeText={(text)=>this.setState({review: text})}  placeholder="Full Name" placeholderTextColor={theme.labelOrInactiveColor}/>
                        </View>
                        <View style={{marginTop:15}}>
                            <Text style={{marginLeft:15}}>Email </Text>
                        </View>
                        <View style={styles.queDescView}>
                            <TextInput style={styles.queDesc} onChangeText={(text)=>this.setState({review: text})}  placeholder="Email" placeholderTextColor={theme.labelOrInactiveColor}/>
                        </View>
                        <View style={{marginTop:15}}>
                            <Text style={{marginLeft:15}}>State</Text>
                        </View>
                        <View style={styles.queDescView}>
                            <TextInput style={styles.queDesc} onChangeText={(text)=>this.setState({review: text})}  placeholder="State" placeholderTextColor={theme.labelOrInactiveColor}/>
                        </View>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center',marginLeft:'10%',marginRight:'10%'}}>
                                <TouchableOpacity  style={styles.authModeBtn} >
                                    <Text style={styles.btnText}>Submit</Text>
                                    <Feather name="log-in"  size={20} color={theme.primaryColor} style={{marginTop:Platform.OS=='web'?5:0}}/> 
                                </TouchableOpacity>
                            </View>
                            
                        
                    </View>,{width: width, height: height, marginLeft: 'auto', marginRight:'auto',}
                )}
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        flexDirection: 'column',
        // width:width*0.65,
        // height: height*0.6,
        margin:'auto'
        // borderWidth: 1
    },
        header:
        {
            flexDirection: 'row',
            width: width*0.65,
            height: height*0.05,
            alignItems: 'center',
            justifyContent: 'space-between',
        },
            postQueText:
            {
               fontSize: width*0.06,
               marginLeft: '5%',
               marginTop: '2%'
            },
            closeIcon:
            {
                height: height*0.027,
                alignSelf: 'flex-end',
                width: width*0.06,
                marginLeft: '15%',
                marginBottom: 10,
                marginRight: 10
            },
        queView:
        {
            marginTop: '1%',
            padding: 10
        },
            
        queDescView:
        {
            marginTop: '1%',
            padding: 10
        },
            queDesc:
            {
                borderRadius: 10,
                padding: 4,
                // borderWidth: 0.5,
                backgroundColor:'rgb(242, 242, 242)'
            },
        btnView: 
        {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            backgroundColor:theme.themeColor,
            width: '50%',
            marginBottom:10
        },
                       
            btnText: 
            {
                fontSize: 18,
                fontWeight:'bold',
                color: theme.primaryColor,
                padding: 10,
            },
            authModeBtn :
            {
                backgroundColor:theme.accentColor,
                padding:"5%",
                marginTop:'3%', 
                width:'100%',
                marginTop:25,
                height:height*0.05,
                borderRadius:5,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection:'row',
                flex:1
            },
                

})

export default InfoModal;
