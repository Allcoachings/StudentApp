import React from 'react';
import {Text, View,StyleSheet, TextInput, TouchableOpacity, ScrollView,ActivityIndicator,Dimensions} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth, serverBaseUrl, videoDefaultThumbnail} from '../config'
import {fetchAccountDetails, updateAccountDetails} from '../Utils/DataHelper/AccountDetails'
import {connect} from 'react-redux'
import Toast from 'react-native-simple-toast';
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
const width = Dimensions.get('window').width
const height = Dimensions.get('screen').width
class AccountDetails extends React.Component {
    state = {
        loadingData:true,
        accountDetails:[],
        name: '',
        bankName: '',
        accNumber: '',
        ifscCode: '',
    }

    componentDidMount () 
    {
        fetchAccountDetails(this.props.institute.details.id,this.handleAccountDetailsCallback)
    }

    handleAccountDetailsCallback=(response)=>{
        if(response.status==200)
        {
            response.json().then((data)=>
            {
                this.setState({name:data.accountHolderName, bankName: data.bankName, ifscCode: data.ifsc, accNumber: data.accountNumber, loadingData:false})
            })
        }
        else
        {
            console.log("error", response.status)
        }
    }

    handleSubmitButtonClick=()=>{
        if(this.state.ifscCode&&this.state.accNumber&&this.state.bankName&&this.state.name)
        {
            Toast.show("Please Wait...")
            updateAccountDetails(this.state.name, this.state.accNumber, this.state.bankName, this.state.ifscCode, this.props.institute.details.id, this.updateCallback)
        }
        else
        {
            Toast.show("Please Fill All The Details.")
        }
    }

    updateCallback=(response)=>{
        if(response.status==200)
        {
            Toast.show("Account Details Updated Successfully.")
        }
        else
        {
            console.log("up error", response.status)
            Toast.show("Something Went Wrong. Please Try Again Later.")
        }
    }

    render() {
         
        return(
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
            >
             {this.state.loadingData?(
                            <CustomActivtiyIndicator mode="skimmer"/>
            ):(     <ScrollView>
                    
                    <View style={styles.headView}>
                        <Text style={styles.headText}>Add Account Details</Text> 
                    </View>

                    <View style={styles.inputView}>
                            <Text style={styles.labelText}>Account Holder Name</Text>
                       
                                <TextInput 
                                    placeholderTextColor={theme.greyColor} 
                                    placeholder="Account Holder Name" 
                                    defaultValue={this.state.name} 
                                    onChangeText={(text)=>this.setState({name: text})} 
                                    style={styles.inputField}
                                /> 
                         
                    </View>
                    <View style={styles.inputView}>
                            <Text style={styles.labelText}>Bank Name</Text>
                   
                                <TextInput 
                                    placeholderTextColor={theme.greyColor} 
                                    placeholder="Bank Name" 
                                    onChangeText={(text)=>this.setState({bankName: text})} 
                                    defaultValue={this.state.bankName} 
                                    multiline={true}
                                    numberOfLines={2}
                                    style={styles.inputField}
                                /> 
                    </View>

                    <View style={styles.inputView}>
                            <Text style={styles.labelText}>Account Number</Text>
                       
                                <TextInput 
                                    placeholderTextColor={theme.greyColor} 
                                    placeholder="Account Number" 
                                    defaultValue={this.state.accNumber} 
                                    onChangeText={(text)=>this.setState({accNumber: text})} 
                                    style={styles.inputField}
                                /> 
                         
                    </View>
                    <View style={styles.inputView}>
                            <Text style={styles.labelText}>IFSC Code</Text>
                   
                                <TextInput 
                                    placeholderTextColor={theme.greyColor} 
                                    placeholder="IFSC Code" 
                                    onChangeText={(text)=>this.setState({ifscCode: text})} 
                                    defaultValue={this.state.ifscCode} 
                                    style={styles.inputField}
                                /> 
                    </View>
                   
                    <View style={styles.btnView}>
                        <TouchableOpacity style={styles.submitButton} onPress={this.handleSubmitButtonClick}>
                            {this.state.loadingAddVideo?(
                                <ActivityIndicator color={theme.primaryColor} style={"large"}/>
                            ):(
                                <Text style={styles.submitButtonText}>Submit</Text>
                            )}
                                
                        </TouchableOpacity>
                        
                    </View>
               
                </ScrollView>)}
           </PageStructure>
        )}
    }

const styles = StyleSheet.create({
    headView:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
        headText:
        {
            marginTop:10,
            fontSize: 24, 
            fontFamily: 'Raleway_600SemiBold',
            color: theme.secondaryColor
        },
    inputView: {
        marginTop:'5%',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10, 
    },
        labelText: {
             
            fontSize: 18,
            fontFamily: 'Raleway_600SemiBold',
            color: theme.secondaryColor,
            marginBottom: 10,
        },
        inputField:
        {
            borderRadius: 10,
            padding: 10,
            margin:10,
            borderWidth: 1,
            fontFamily: 'Raleway_600SemiBold',
            borderColor:theme.labelOrInactiveColor, 
        },
    btnView:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center', 
        marginTop:'auto',
        width: width-30,
        margin:10,
        alignItems: 'center'
    },
        submitButton:
        {
            borderRadius: 10,
            backgroundColor:theme.accentColor,
            padding: 10,
          
            width:'100%',
        },
            submitButtonText:
            {
                color: theme.primaryColor,
                textAlign: 'center'
            },
        addMoreButton:
        {
            borderRadius: 10,
            backgroundColor:theme.addMoreButtonColor,
            padding: 10,
            marginLeft: 10
        },
            addMoreButtonText:
            {
                color: theme.primaryColor
            },
})

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth,
        institute:state.institute
    }
}
export default connect(mapStateToProps)(AccountDetails);