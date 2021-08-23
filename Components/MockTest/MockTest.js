import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Dimensions,Image,Platform, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { theme } from '../config';
import { Feather } from '@expo/vector-icons';
import {connect } from 'react-redux'
import {MockTest} from '../../FakeDataService/FakeData'
import Accordian from '../Utils/Accordian'
import CardView from '../Utils/CardView';
import moment from 'moment';
import AddItemModal from './AddItemModal';
const height = Dimensions.get('screen').height
class ResultAnalysis extends React.Component {
    state={
        data:this.props.data
    }




    accordianHeader = (title,testCount,rightIcon) =>
    {
        return(
            CardView(<View style={styles.accordianHeader}>
                        <View style={styles.accordianLeft}>
                            <Text style={styles.accordianTitle}>{title}</Text>
                            <Text style={styles.accordianTestCount}>{testCount} Tests</Text> 
                        </View>
                        <View style={styles.accordianMiddle}>
                           
                        </View>
                        <View style={styles.accordianRight}>
                            <Feather name={rightIcon} size={20}/>
                        </View> 
            </View>,
            {
                width:'99%', 
                padding:5,
                margin:5
            }
            )
        )
    }

    renderTestItem=(item)=>
    {
        console.log("test data",item)
        
        let date  = moment(item.date, 'DD/MM/YYYY');
        let month = date.format('MMM')
        let day = date.format('DD')
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date(date);
        var dayName = d.toString().split(' ')[0];
        var today  = moment().format('DD/MM/YYYY'); 
        return(
            <>
                <View style={styles.testItemContainer}>
                    <View style={styles.testItemLeft}>
                        <Text style={[styles.testItemMonth, dayName=='Sat'||dayName=='Sun'?({color: theme.featureNoColor}):({color: theme.blueColor})]}>{month}</Text>
                        <Text style={[styles.testItemDay, dayName=='Sat'||dayName=='Sun'?({color: theme.featureNoColor}):({color: theme.blueColor})]}>{day}</Text>
                        <View style={styles.testItemEmptySpace}></View>  
                    </View>
                    <View style={styles.testItemMiddle}>
                        <Text style={styles.testItemName}>{item.title}</Text>
                        <Text style={styles.testItemTestTime}>Start Class {item.test} • {item.time}</Text>
                    </View>
                </View>
                  
            </>
        )

    }

    renderMockTestWeekItem =(item) => {
        console.log("test data",item)
        return(
            // <Accordian
            //     header={this.accordianHeader(item.title,item.testCount,"chevron-down")}
            // >
            //     <View style={styles.weekView}> 
            <>
               
                    <FlatList 
                            data={item} 
                            renderItem={({item}) =>this.renderTestItem(item)}
                            keyExtractor={(item)=>item.id} 
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                        />
            </>
            //     </View>

            // </Accordian> 
        )
     }
     openModal=()=>
     {
         this.setState({isModalVisible: true})
     }
     closeModal=()=>
     {
         this.setState({isModalVisible: false})
     }
     appendItems=(obj)=>
    {
        let data = this.state.data;
        data.push(obj)
        this.setState({data})  
    }
    render() {
        console.log("data item", this.props.subjectId)
        return( 
            // <PageStructure
            //     iconName={"menu"}
            //     btnHandler={() => {this.props.navigation.toggleDrawer()}}
            // >
                <View style={styles.container}>
                    {this.props.mode!='readonly'?
                    (
                        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', marginTop: '5%'}} onPress={()=>this.openModal()}>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Add  +</Text>
                        </TouchableOpacity>
                    ):(null)
                }
                
                     <FlatList 
                            data={this.state.data} 
                            renderItem={({item}) =>this.renderTestItem(item)}
                            keyExtractor={(item)=>item.id} 
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    {/* <View style={styles.enrollBtnView}>
                        <TouchableOpacity style={styles.enrollBtn}>
                            <Text style={styles.enrollText}>Enroll</Text>
                        </TouchableOpacity>
                    </View> */}
                    {this.state.isModalVisible?(
                        <AddItemModal    appendItems={this.appendItems} isModalVisible={this.state.isModalVisible} closeModal={this.closeModal} insId={this.props.insId} subjectId={this.props.subjectId}/>
                ):(
                    null
                )}
                </View> 
            // </PageStructure>
        )
    }
}

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        flexDirection: 'column',
        padding:10, 
    },
            accordianHeader:
            {
                // flex:1,
                flexDirection: 'row',
                width: '100%', 
                // justifyContent: 'space-between'
                
            },
                accordianLeft:
                {
                    
                    justifyContent: 'flex-start',
                    margin:5
                },
                    accordianTitle:
                    {
                        fontSize:14,
                        fontWeight:'bold',
                    },
                    accordianTestCount:
                    {
                        fontSize:12,
                        color:theme.labelOrInactiveColor,
                        
                    },
                accordianMiddle:
                { 
                    
                    margin:5,
                    alignSelf: 'flex-end',
                },
                accordianRight:
                {
                    
                    // alignSelf: 'flex-end',
                    marginLeft:'auto', 
                    padding:5

                },
                    weekView:
                    {
                        marginVertical:10, 
                        borderBottomWidth:1, 
                        borderBottomColor:theme.labelOrInactiveColor,
                        alignSelf: 'center',
                        // height:height
                    },
                    testItemContainer:
                    {
                        flex:1,
                        flexDirection: 'row'
                    },
                        testItemLeft:{
                            alignSelf: 'flex-start',
                            // padding:5,
                            paddingTop:5,
                            flexDirection: 'column',
                            alignItems: 'center'

                        },
                            testItemMonth:
                            {
                                fontWeight:'bold',
                                fontSize:16         
                            },
                            testItemDay:
                            {
                                fontWeight:'bold',
                                fontSize:16 ,
                                textAlign: 'center' ,
                                marginTop:5      
                            },
                            testItemEmptySpace:
                            {
                                height:30,
                                borderLeftWidth:1,
                                borderLeftColor:theme.labelOrInactiveColor
                                // marginLeft:10
                            },
                        testItemMiddle:
                        {
                          padding:5 ,
                          marginLeft:10 
                        },
                            testItemName:
                            {
                                fontWeight:'700',
                                fontSize:16        
                            },
                            testItemTestTime:
                            {
                                
                                fontSize:14,
                                marginTop:5,
                                color:theme.greyColor      
                            },
        enrollBtnView:
        {
            marginTop: 'auto'
        },
            enrollBtn:
            {
                backgroundColor: theme.accentColor,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center'
            },
                enrollText:
                {
                    fontSize: 24,
                    color: theme.primaryColor,
                    fontWeight: 'bold',
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 30,
                    paddingRight: 30
                },
                                        

                            
})

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(ResultAnalysis); 