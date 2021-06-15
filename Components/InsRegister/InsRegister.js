import React from 'react';
import {Text, View,StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, CheckBox} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth} from '../config'
import CardView from '../Utils/CardView';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';

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
    }

    renderTextInput=(icon, placeholder)=>{
        return(
            CardView(
                // <View style={{flex: 1, flexDirection: 'row'}}>
                    <TextInput style={styles.inputField} placeholder={placeholder} />
               ,{marginTop: 10, padding: 12}
            )
        )
    }

    setSelection=()=>{
        this.setState({isSelected: !this.state.isSelected})
    }

    render() {
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
                        <View style={styles.imageView}>
                            <Image source={{uri: 'https://picsum.photos/200/300'}} style={styles.imageStyle}/>
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Institute Name')}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Director Name')}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Phone number')}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'E-mail ID')}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'New Password')}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'Institute Address')}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'City')}
                        </View>
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'State')}
                        </View>
                        
                        <View style={styles.inputView}>
                            {this.renderTextInput('', 'About this Coaching')}
                        </View>
                        
                        {CardView(
                            <View style={styles.dropdownView}>
                                <DropDownPicker
                                    placeholder="Select Category"
                                    placeholderTextColor={theme.greyColor}
                                    containerStyle={{borderColor: theme.greyColor}}
                                />
                            </View>, {marginTop: 10, padding: 12})}


                        {CardView(<View style={styles.checkboxContainer}>
                            <CheckBox
                                value={this.state.isSelected}
                                onValueChange={this.setSelection}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>By pressing 'Signup' you agree to our Terms & Conditions</Text>
                        </View>, {marginTop: 10, padding: 12})}

                        <View style={styles.regBtnView}>
                            <TouchableOpacity style={styles.regBtn}>
                                <Text style={styles.regBtnText}>Register</Text>
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

export default InsRegister;