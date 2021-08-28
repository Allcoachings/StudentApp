import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView,Dimensions} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { theme , Assets, serverBaseUrl} from '../config';
import { MaterialIcons } from '@expo/vector-icons';
import EmptyList from '../Utils/EmptyList'
import { connect } from 'react-redux';
const windowWidth = Dimensions.get('window').width
class Solutions extends React.Component {
    state={
        type: [
            {
                id: '1',
                type: 'Correct'
            },
            {
                id: '2',
                type: 'Wrong'
            },
            {
                id: '3',
                type: 'Unattempted'
            },
        ],

        activeTab: 'Correct',

        solution:[
            {
                id: '1',
                type: 'CORRECT',
                time: '0m 2s',
                statement: 'All Wheat are barley. All peas are barley. Conclusion:I. Some wheats are peas II. No Wheats are Peas'
            },
            {
                id: '2',
                type: 'CORRECT',
                time: '0m 2s',
                statement: 'All Wheat are barley. All peas are barley. Conclusion:I. Some wheats are peas II. No Wheats are Peas'
            },
            {
                id: '3',
                type: 'CORRECT',
                time: '0m 2s',
                statement: 'All Wheat are barley. All peas are barley. Conclusion:I. Some wheats are peas II. No Wheats are Peas'
            },
            {
                id: '4',
                type: 'CORRECT',
                time: '0m 2s',
                statement: 'All Wheat are barley. All peas are barley. Conclusion:I. Some wheats are peas II. No Wheats are Peas'
            },
            {
                id: '5',
                type: 'CORRECT',
                time: '0m 2s',
                statement: 'All Wheat are barley. All peas are barley. Conclusion:I. Some wheats are peas II. No Wheats are Peas'
            },
            {
                id: '6',
                type: 'CORRECT',
                time: '0m 2s',
                statement: 'All Wheat are barley. All peas are barley. Conclusion:I. Some wheats are peas II. No Wheats are Peas'
            },
            {
                id: '7',
                type: 'CORRECT',
                time: '0m 2s',
                statement: 'All Wheat are barley. All peas are barley. Conclusion:I. Some wheats are peas II. No Wheats are Peas'
            },
            {
                id: '8',
                type: 'CORRECT',
                time: '0m 2s',
                statement: 'All Wheat are barley. All peas are barley. Conclusion:I. Some wheats are peas II. No Wheats are Peas'
            },
            {
                id: '9',
                type: 'CORRECT',
                time: '0m 2s',
                statement: 'All Wheat are barley. All peas are barley. Conclusion:I. Some wheats are peas II. No Wheats are Peas'
            },
        ]
    }

    renderCategory=({item})=>{
        return(
            <TouchableOpacity onPress={()=>this.setState({activeTab: item.type})} style={[styles.btnView,
            item.type=='Correct'?
                (this.state.activeTab==item.type?
                    ({backgroundColor:theme.accentColor+"4D", borderColor: theme.primaryColor}):({borderColor: theme.accentColor, backgroundColor: theme.primaryColor})
            ):(item.type=='Wrong'?
                (this.state.activeTab==item.type?
                    ({backgroundColor:theme.redColor+'4D', borderColor: theme.primaryColor}):({borderColor: theme.redColor, backgroundColor: theme.primaryColor})
            ):(item.type=='Unattempted'?
                (this.state.activeTab==item.type?
                    ({backgroundColor:theme.labelOrInactiveColor, borderColor: theme.primaryColor}):({borderColor: theme.greyColor, backgroundColor: theme.primaryColor})
            ):(null)))]}>
               
               
                <Text style={[styles.btnText, item.type=='Correct'?({color: theme.accentColor}):(item.type=='Incorrect'?({color: theme.redColor}):(item.type=='Unattempted'?({color: theme.greyColor}):(null)))]}>{item.type}</Text>
            
            
            </TouchableOpacity>
        )
    }




    questionStatusTypeProvider=(status)=>
    {
        switch(status)
        {
            case 'correct':
                return 'CORRECT'; 
            case 'wrong':
                return 'WRONG'; 
            default:
                return 'UNATTEMPTED';
        }
    }

    questionStatusStyle=(status)=>
    {
        console.log(status)
        switch(status)
        {
            case 'correct':
                return {borderColor:theme.featureYesColor,color:theme.featureYesColor}; 
            case 'wrong':
                return {borderColor:theme.featureNoColor,color:theme.featureNoColor}; 
            default:
                return   {borderColor:theme.labelOrInactiveColor,color:theme.labelOrInactiveColor}; ;
        }
    }

    tabNstatusMatching=(status)=>
    {
        if(this.state.activeTab=="Unattempted"&&!status)
        {
            return true;
        }else if(this.state.activeTab.toLocaleLowerCase()==status)
        {
            return true;
        }
    }
    renderQuestion=(item) => {
        switch (item.questionType)
        {
            case 1:
            case '1':
            case '3': 
            case 3:
                      return(
                          <Text style={styles.ansStatement}>{item.question}</Text>
                      ); 
          case 2:
          case '2': 
          case 4:
          case '4':
  
              return(
                   <Image source={{uri: serverBaseUrl+item.question}} style={{width:'100%',height:150,resizeMode:'contain'}} />
              ); 
  
        }
    }
    renderSolution=({item,index})=>{

        if(this.tabNstatusMatching(item.status))
        {
                return(
                    <>
                        <View style={{display: 'flex',flexDirection: 'row'}}>
                            <View style={[{borderLeftWidth: 3},this.questionStatusStyle(item.status)]}></View>
                            <View style={styles.solutionView}>
                                <View style={styles.queNoView}>
                                    <View style={styles.queView}>
                                        <Text style={styles.queText}>Q.{index+1}</Text>
                                        <Text style={[styles.typeText,this.questionStatusStyle(item.status)]}>{this.questionStatusTypeProvider(item.status)}</Text>
                                    </View>
                                    {/* <Text style={styles.timeText}>Time: {item.time}</Text> */}
                                </View>
                                <View style={styles.ansView}>
                                    {/* <Text style={styles.ansStatement}>
                                         {item.question}
                                    </Text> */}
                                    {this.renderQuestion(item)}
                                    <View style={styles.explanationView}>
                                        <Text style={styles.correctAnswer}>
                                            Correct answer :  ({item.correctOpt})  {item.optionType==1?item["option"+item.correctOpt]:null}
                                        </Text> 
                                        {item.optionType==2?(
                                             <Image source={{uri:serverBaseUrl+item["option"+item.correctOpt]}} style={{borderWidth:0.5,borderColor: theme.labelOrInactiveColor,width:'85%',height:150,marginLeft:10}}/>
                                        ):(null)}
                                        <Text style={styles.explanation}>{item.explanation}</Text>
                                    </View> 
                                </View>
                            </View>
                        </View>
                        <View style={{borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor}}/>
                </>
        
                )
        }
    }

    render() {

      
        return(
            // <PageStructure
            //     iconName={"menu"}
            //     btnHandler={() => {this.props.navigation.toggleDrawer()}}
            // >
            //     <ScrollView>
                    <View style={styles.container}>
                        <View style={{padding: 10}}>
                            <View style={styles.headView}>
                                {/* <Feather name="chevron-left" size={26} style={{color: theme.greyColor}}/> */}
                                <Text style={styles.headText}>
                                    Solutions
                                </Text>
                                <View style={{justifyContent: 'flex-end'}}>
                                    <MaterialIcons name="report-problem" size={24} color="black" />
                                </View>
                            </View>
                            
                            <View style={{borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor, marginTop:10}}/>
                            
                            {/* <View style={styles.chooseSectionView}>
                                <Text style={styles.sectionText}>Choose section</Text>
                                <View style={styles.chooseSection}>
                                    <Text style={styles.reasoningText}>Reasoning</Text>
                                </View>
                            </View> */}

                            <View style={{  borderColor: theme.labelOrInactiveColor, marginTop:10}}/>

                            <View style={styles.categoryView}>
                                <FlatList 
                                    data={this.state.type} 
                                    renderItem={this.renderCategory}
                                    keyExtractor={(item)=>item.id} 
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={true}
                                />
                            </View>
                        </View>
                        <FlatList 
                            data={this.props.testSeriesData.ques} 
                            renderItem={this.renderSolution}
                            keyExtractor={(item)=>item.id} 
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                            ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                        />
                        
                        
                    </View>
            //     </ScrollView>
            // </PageStructure>
        )
    }
}

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        flexDirection: 'column',
        // padding: 10
    },
        headView:
        {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
            headText:
            {
                fontSize: 24,
                fontWeight: '700',
                // marginLeft: 15
            },
        chooseSectionView:
        {
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
        },
            sectionText:
            {
                fontSize: 18,
                // marginLeft: 6,
                color: theme.greyColor,
                marginBottom: 5,
                fontWeight: '600'
            },
            chooseSection:
            {
                borderWidth: 0.6,
                borderColor: theme.greyColor,
                borderRadius: 25
            },
                reasoningText:
                {
                    fontSize: 17,
                    fontWeight: '700',
                    padding: 10
                },
        categoryView :
        {
            display: 'flex',
            flexDirection: 'row',
            marginTop: 10
        } ,
            btnView:
            {
                borderColor: theme.greyColor,
                borderWidth: 0.5,
                borderRadius: 15,
                margin: 5,
            },
                btnText:
                {
                    paddingLeft: 15,
                    paddingRight: 15, 
                    paddingTop: 4,
                    paddingBottom: 4,
                    color: theme.secondaryColor
                },
        solutionView:
        {
            display: 'flex',
            flexDirection: 'column',
            marginTop: 5,
            marginBottom: 5, 
            padding: 10
        },
            queNoView:
            {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                // backgroundColor:theme.secondaryColor,
                marginTop: 10,
                 

            },
                queView:
                {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                },
                    queText:
                    {
                        fontFamily: 'Raleway_600SemiBold',
                        fontWeight: 'bold',
                        fontSize: 18,
                        marginRight: 10,
                    },
                    typeText:
                    {
                        fontFamily: 'Raleway_600SemiBold',
                        marginLeft: 10,
                        // fontWeight: '700',
                        color: theme.accentColor, 
                        fontSize:16
                    },
                timeText:
                {
                    // marginLeft: 10,
                    color: theme.greyColor,
                    alignSelf:'flex-end'

                },
            ansView:
            {
                marginTop: 10
            },
                ansStatement:
                {
                    fontSize: 16,
                    color: theme.textColor,
                    fontWeight: '600'
                },
                explanationView:
                {
                    // backgroundColor:theme.labelOrInactiveColor,
                    margin:5,
                    width:windowWidth/1.2,
                },
                    correctAnswer:
                    {
                        color: theme.featureYesColor, 
                        fontFamily: 'Raleway_600SemiBold',
                        margin:10
                    },
                    explanation:
                    {
                        fontFamily: 'Raleway_600SemiBold',
                        marginLeft:10,
                        marginBottom:5
                    },

})

const mapStateToProps = (state)=>
{
    return {

        testSeriesData: state.testSeries.data,
      

    }
}
export default connect(mapStateToProps)(Solutions)