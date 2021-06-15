import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Dimensions,Image,Platform, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { theme } from '../config';
import { Feather } from '@expo/vector-icons';
import {connect } from 'react-redux'
import {MockTest} from '../../FakeDataService/FakeData'
import Accordian from '../Utils/Accordian'
import CardView from '../Utils/CardView';
const height = Dimensions.get('screen').height
class ResultAnalysis extends React.Component {
    state={
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
        return(
            <>
                <View style={styles.testItemContainer}>
                    <View style={styles.testItemLeft}>
                        <Text style={styles.testItemMonth}>{item.month}</Text>
                        <Text style={styles.testItemDay}>{item.day}</Text>
                        <View style={styles.testItemEmptySpace}></View>  
                    </View>
                    <View style={styles.testItemMiddle}>
                        <Text style={styles.testItemName}>{item.name}</Text>
                        <Text style={styles.testItemTestTime}>Test {item.test} • {item.time}</Text>
                    </View>
                </View>
                  
            </>
        )

    }

    renderMockTestWeekItem =(item) => {
        return(
            <Accordian
                header={this.accordianHeader(item.title,item.testCount,"chevron-down")}
            >
                <View style={styles.weekView}> 
                    <FlatList 
                            data={item.data} 
                            renderItem={({item}) =>this.renderTestItem(item)}
                            keyExtractor={(item)=>item.id} 
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                        />
                </View>
            </Accordian> 
        )
     }
    render() {
        return( 
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
            >
                <View style={styles.container}>
                    <FlatList
                        data={MockTest}
                        keyExtractor={(item)=>item.id}
                        renderItem={({item})=>this.renderMockTestWeekItem(item)} 
                    />
                </View> 
            </PageStructure>
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
                                fontSize:13         
                            },
                            testItemDay:
                            {
                                fontWeight:'bold',
                                fontSize:13 ,
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
                                fontSize:13        
                            },
                            testItemTestTime:
                            {
                                
                                fontSize:12,
                                marginTop:5,
                                color:theme.labelOrInactiveColor      
                            },
                        

                            
})

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(ResultAnalysis); 