import React from 'react';
import {Text, View,StyleSheet, TextInput,TouchableWithoutFeedback, TouchableOpacity, ScrollView,ActivityIndicator,Dimensions} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth, serverBaseUrl, videoDefaultThumbnail, dataLimit} from '../config'
import {fetchAccountDetails, updateAccountDetails} from '../Utils/DataHelper/AccountDetails'
import {connect} from 'react-redux'
import Toast from 'react-native-simple-toast';
import { DataTable } from 'react-native-paper';
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import { fetchInsPayouts, fetchInsPayoutsTotal, fetchInsPayoutsTotalToday } from '../Utils/DataHelper/Payout';
import moment from 'moment';

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
        showReports:false,
        loadingPayouts:true,
        offset:0,
        payouts:[]
    }

    componentDidMount () 
    {
        fetchAccountDetails(this.props.institute.details.id,this.handleAccountDetailsCallback)
        fetchInsPayouts({id:this.props.institute.details.id},this.state.offset,dataLimit,this.institutePayoutCallback)
        fetchInsPayoutsTotalToday({id:this.props.institute.details.id},this.totalPayoutTodaycallback)
        fetchInsPayoutsTotal({id:this.props.institute.details.id},this.totalPayoutCallBack)
    }
    totalPayoutTodaycallback=(response)=>
    {
        if(response.status==200)
        {
            response.json().then(data=>{
                // // // console.log("Total today",data);
                this.setState({totalPayoutToday:data})
            })
        }
    }
    totalPayoutCallBack=(response)=>
    {
        if(response.status==200)
        {
            response.json().then(data=>{
                // console.log("Total",data);
                this.setState({totalPayout:data})
            })
            
        }
    }
    institutePayoutCallback=(response)=>
    {
        // console.log(response.status)
        if(response.status==200)
        {
            response.json().then(data=>
                {
                    // console.log(data)
                        this.setState({payouts:data,loadingPayouts:false})
                })
        }else
        {
            this.setState({loadingPayouts:false})
        }
    }
    handleAccountDetailsCallback=(response)=>{
        if(response.status==200)
        {
            response.json().then((data)=>
            {
                if(data.accountNumber)
                {
                    this.setState({name:data.accountHolderName, bankName: data.bankName, ifscCode: data.ifsc, accNumber: data.accountNumber, loadingData:false,showReports:true})
                }else
                {
                    this.setState({name:data.accountHolderName, bankName: data.bankName, ifscCode: data.ifsc, accNumber: data.accountNumber, loadingData:false,showReports:false})
                }
                
            })
        }
        else
        {
            // console.log("error", response.status)
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
            // console.log("up error", response.status)
            Toast.show("Something Went Wrong. Please Try Again Later.")
        }
    }


    renderAccountForm=()=>{
        return (
                <>
                    <View style={styles.headView}>
                        <Text style={styles.headText}>Add Account Details</Text>
                        {this.state.showReportsBack?(  
                            <TouchableWithoutFeedback onPress={() => this.setState({showReports:true,showReportsBack:false})}>
                                <Text style={{fontFamily: 'Raleway_600SemiBold'}}>Payout Details</Text>
                            </TouchableWithoutFeedback> 
                        ):(null)}
                        
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
                </>
               
        );
    }

    renderReportsPage=(item)=>
    {
        return (
            <View style={stylesReport.container}>
                    {/* {CardView(
                        <View style={stylesReport.headView}>
                            <EvilIcons name="chevron-left" size={28} />
                            <Text style={stylesReport.headText}>Revenue</Text>
                        </View>,{paddingTop: 5,justifyContent: 'center'}
                    )} */}

                    <View style={stylesReport.helloView}>
                        <Text style={stylesReport.helloText}>Hello, {this.props.institute.details.name}</Text>
                        <TouchableWithoutFeedback onPress={() => this.setState({showReports:false,showReportsBack:true})}>
                            <Text style={{fontFamily: 'Raleway_600SemiBold'}}>Account Details</Text>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={stylesReport.rowContainer}>
                        <View style={[stylesReport.colContainer, {backgroundColor: theme.redColor+"33"}]}>
                            <Text style={stylesReport.leadText}>Todays Payout</Text>  
                            <Text style={stylesReport.priceText}>₹ {this.state.totalPayoutToday}</Text>
                        </View>
                        <View style={[stylesReport.colContainer, {backgroundColor: theme.yellowColor+"33"}]}>
                            <Text style={stylesReport.leadText}>Today Payout</Text>
                            <Text style={stylesReport.priceText}>₹ {this.state.totalPayout}</Text>
                        </View>
                    </View>

                    <View style={stylesReport.courseCol}>
                        <Text style={{fontFamily: 'Raleway_600SemiBold',marginVertical:10}}>Transactions Details : </Text>

                      
                        <DataTable>
                            <DataTable.Header> 
                                <DataTable.Title  >Order Id</DataTable.Title>
                                <DataTable.Title  >Amount</DataTable.Title>
                                <DataTable.Title  >Date</DataTable.Title>
                            </DataTable.Header>


                                {this.state.payouts.map((item,index) => {
                                    // console.log(item)
                            return(        <DataTable.Row key={index}> 
                                            <DataTable.Cell  >{item.orderId}</DataTable.Cell>
                                            <DataTable.Cell  >₹{item.amount}</DataTable.Cell>
                                            <DataTable.Cell  >{moment(item.payoutTime).format("MMM Do")}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                            
                        
                        
                            
                            </DataTable>
                       
                        
                    </View> 
                </View>
        )
    }
    renderpageContent=(showReports) => {
            switch (showReports)
            {
                case true:
                    return this.renderReportsPage({});
                case false:
                    return this.renderAccountForm();
            }
    }
    render() {
         
        return(
            <PageStructure
                iconName={"chevron-left"}
                btnHandler={() => {this.props.navigation.goBack()}}
                nosearchIcon={true}
                noNotificationIcon={true}
                navigation={this.props.navigation}
            >
             {this.state.loadingData||(this.state.showReports&&this.state.loadingPayouts)?(
                            <CustomActivtiyIndicator mode="skimmer"/>
                ):(     
                <ScrollView>
                    
                    {this.renderpageContent(this.state.showReports)}
                </ScrollView>)}
           </PageStructure>
        )}
    }

const styles = StyleSheet.create({
    headView:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
const stylesReport = StyleSheet.create({
    container: 
    {
        flex: 1,
        flexDirection: 'column',
    },
        headView:
        {
            flexDirection: 'row',
            // justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10
        },
            headText:
            {
                fontSize: 24,
                 fontFamily: 'Raleway_600SemiBold',
            },
        helloView:
        {
            marginTop: '6%',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
            helloText: 
            {
                fontSize: 20,
                fontFamily: 'Raleway_600SemiBold',
                color: theme.greyColor
            },
        rowContainer:
        {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: '10%'
        },
            colContainer:
            {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
                borderRadius: 5
            },
                leadText:
                {
                    fontSize: 15,
                    fontFamily: 'Raleway_600SemiBold',
                    color: theme.secondaryColor
                },
                priceText:
                {
                    color: theme.greyColor,
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginTop:10
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
 