import React from 'react';
import { TextInput,View,TouchableOpacity,StyleSheet ,Text,ScrollView,Platform} from 'react-native';
import CardView from '../Utils/CardView';
import { EvilIcons } from '@expo/vector-icons'
import { theme,screenMobileWidth } from '../config';
import {connect} from 'react-redux'  
import Checkbox from 'expo-checkbox';
class Fields extends React.Component {
    state = {
        isChecked: false
      }

    renderTextInput=(label,changeHandler,icon)=>
    {
            return (
                CardView(
                    <View style={styles.textInputContainer}>
                        <EvilIcons name={icon} size={20} color={theme.secondaryColor} style={styles.inputIcon}/>
                        <TextInput placeholder={label}  style={styles.textInput}/>
                    </View>,
                    [styles.textInputCard,this.props.screenWidth<=screenMobileWidth?({padding:'3%', width:"80%"}):({padding:'2%', width:"65%"})]
                )
              
            )
    }
    render() {
        return (
        
            <View style={styles.container}>
                    <View style={styles.fieldContainer}>
                        {this.renderTextInput("Enter Email",()=>{},"mail")}
                        <View style={styles.passFieldContainer}>
                            {this.renderTextInput("Password",()=>{},"lock")}
                            {this.props.mode=="login"?(
                                <TouchableOpacity style={{alignSelf:'flex-end',marginRight:this.props.screenWidth<=screenMobileWidth?("10%"):("20%")}}>
                                    <Text>Forgot Password?</Text>
                                </TouchableOpacity>
                            ):(null)}
                        </View>
                        {this.props.mode=="signup"?(
                            this.renderTextInput("Mobile No.",()=>{},"mail")
                        ):(null)}
                    </View>
                    <View style={[styles.buttonContainer]}>
                        <View style={[styles.checkboxContainer,this.props.screenWidth<=screenMobileWidth?({marginLeft:'7%'}):({marginLeft:'17%'})]}>
                            <Checkbox
                                value={this.state.isChecked}
                                onValueChange={(value)=>{this.setState({isChecked:value})}}
                                style={styles.checkbox}
                                />
                                <Text style={styles.checkboxLabel}>{this.props.checkLabel}</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'center',marginLeft:'10%',marginRight:'10%'}}>
                            <TouchableOpacity style={styles.authModeBtn}>
                                <Text style={styles.btnText}>{this.props.btnLabel}</Text>
                                <EvilIcons name="log-in" size={20} color={theme.primaryColor} style={{marginTop:Platform.OS=='web'?5:0}}/> 
                            </TouchableOpacity>
                        </View>
                    </View>
            </View>
          
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
      
    },
        fieldContainer:
        {
            flex: 1,
            flexDirection:'column',
            alignItems: 'center',
            marginBottom:'5%'
        },
            textInputCard:
            {
                borderRadius:5, 
                margin:'2%'

            },
            textInputContainer:
            {
            flex:1,
            flexDirection:'row',
            },
            inputIcon:
            {
                marginTop:"1.5%",
                marginRight:"1.5%"
            },
            passFieldContainer:
            {
                width:'100%',
                flexDirection:'column',
                alignItems:'center'
            },
        buttonContainer:
        {
            flex:0.4,
            flexDirection:'column',
            paddingBottom:'5%'
            
        },
            checkboxContainer:
            {
                flex:1,
                flexDirection:'row', 

            },
                checkbox:
                {
                    margin:'1.1%'   
                },
                checkboxLabel:
                {
                    marginTop:10,
                    flexWrap: 'wrap',
                    flex:1

                },
            authModeBtn :
            {
                backgroundColor:theme.accentColor,
                padding:"5%",
                marginTop:'3%', 
                width:'80%',
                borderRadius:5,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection:'row',
                flex:1
            },
                btnText:
                {
                    color:theme.primaryColor,
                    fontSize:16,
                    fontWeight:'bold',
                    marginRight:10
                }


})

const mapStateToProps= (state)=>
{

    return {
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(Fields);