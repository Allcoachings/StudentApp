import React from 'react';
import { Text,View,StyleSheet,Dimensions,TouchableOpacity,FlatList,BackHandler, Image,Platform, ScrollView, TouchableWithoutFeedback} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { theme, Assets } from '../config';
import { EvilIcons } from '@expo/vector-icons';
import {connect } from 'react-redux'
import Solutions from '../Solutions/Solutions'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import { saveTestResult } from '../Utils/DataHelper/TestSeriesResponse';
import CardView from '../Utils/CardView';
import LeadersBoard from './LeadersBoard'
import {setStatusBarHidden,setTestResultData} from '../Actions'

const width = Dimensions.get('window').width

let backhandler,unsubscribe;
class ResultAnalysis extends React.Component {
    state={
       data:[
           {
               id: '1',
               type: 'Correct',
               que: this?.props?.testSeriesData?.testData?.brief?.correctQues
           },
           {
               id: '2',
               type: 'Wrong',
               que: this?.props?.testSeriesData?.testData?.brief?.wrongQues
           },
           {
               id: '3',
               type: 'Skipped',
               que: this?.props?.testSeriesData?.testData?.brief?.Unattempted
           },
       ]
    } 
    renderCategory=({item})=>{
        return(
            <TouchableOpacity onPress={()=>this.setState({activeTab: item.type})} style={[styles.btnView,
            item.type=='Correct'?
                (this.state.activeTab==item.type?
                    ({backgroundColor:theme.accentColor+"4D", borderColor: theme.primaryColor}):({borderColor: theme.accentColor, backgroundColor: theme.primaryColor})
            ):(item.type=='Incorrect'?
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

    renderSolution=({item})=>{
        return(
            <>
                <View style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{borderLeftWidth: 3, borderColor: theme.accentColor}}></View>
                    <View style={styles.solutionView}>
                        <View style={styles.queNoView}>
                            <View style={styles.queView}>
                                <Text style={styles.queText}>Q.{item.id}</Text>
                                <Text style={styles.typeText}>{item.type}</Text>
                            </View>
                            <Text style={styles.timeText}>Time: {item.time}</Text>
                        </View>
                        <View style={styles.ansView}>
                            <Text style={styles.ansStatement}>
                                Statements: {item.statement}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor}}/>
           </>
 
        )
    }


        updateCounts=()=>
        {
            if((this.state.data[0].que!=this.props?.testSeriesData?.testData?.brief?.correctQues)||(this.state.data[1].que!=this?.props?.testSeriesData?.testData?.brief?.wrongQues)||(this.state.data[2].que!=this?.props?.testSeriesData?.testData?.brief?.Unattempted))
            {
                this.setState({data:[
                    {
                        id: '1',
                        type: 'Correct',
                        que: this?.props?.testSeriesData?.testData?.brief?.correctQues
                    },
                    {
                        id: '2',
                        type: 'Wrong',
                        que: this?.props?.testSeriesData?.testData?.brief?.wrongQues
                    },
                    {
                        id: '3',
                        type: 'Skipped',
                        que: this?.props?.testSeriesData?.testData?.brief?.Unattempted
                    },
                ]})
            }
        }

    renderBoxView=({item})=>{ 
        return(
        CardView(
            <>
                {/* <View style={[styles.iconView, 
                item.type=='Correct'?
                ({backgroundColor: theme.accentColor+"33"}):(
                    item.type=='Wrong'?({backgroundColor: theme.redColor+"33"}):(
                        item.type=='Skipped'?(
                            {backgroundColor: theme.labelOrInactiveColor}):(null)))]}>
                    {item.type=='Correct'?(
                        <EvilIcons name="check" size={18}/>
                    ):(
                        item.type=='Wrong'?(
                            <EvilIcons name="x" size={18}/>
                        ):(
                            item.type=='Skipped'?(
                                <EvilIcons name="minus" size={18}/>
                            ):(null)))}
                </View> */}
                <View style={styles.typeView}>
                    <Text style={[styles.typeText,{fontSize:20,color:theme.primaryColor,fontFamily: 'Raleway_600SemiBold'}]}>{item.type}</Text>
                </View>
                <View style={styles.quesNoView}>
                    <Text style={[styles.quesNoText,{fontSize:25,color:theme.primaryColor,}]}>{item.que}</Text>
                </View>
                 
            </>,
            [styles.boxView, {flex:1/3},
                item.type=='Correct'?
                ({backgroundColor: theme.resultScreen.correctColor}):(
                    item.type=='Wrong'?({backgroundColor: theme.resultScreen.wrongColor}):(
                        item.type=='Skipped'?(
                            {backgroundColor: theme.resultScreen.skippedColor   }):(null)))],1
            )
        )
    }
    formatTimer =(seconds)=>
    {
        let duration = seconds;
        let hours = duration/3600;
        duration = duration % (3600);

        let min = parseInt(duration/60);
        duration = duration % (60);

        let sec = parseInt(duration);

        if (sec < 10) {
        sec = `0${sec}`;
        }
        if (min < 10) {
        min = `0${min}`;
        }
        if (parseInt(hours, 10) > 0) {
        return (`${parseInt(hours, 10)}:${min}:${sec}`)
        }
        return (`${min}:${sec}`) 
    }
    componentWillUnmount() {
        if(backhandler)
        {
            backhandler.remove()
        }
    }

    hardwareBackPressHandler=()=>
    {
        if(backhandler)
        {
            backhandler.remove()
        }
        backhandler =  BackHandler.addEventListener('hardwareBackPress',  ()=> {
            this.props.navigation.navigate('SingleTestSeries',{viewMode:true,item:this?.props?.testSeriesData?.testData?.brief?.item})
            if(backhandler)
            {
                backhandler.remove()
            }
            return true;
          });
    }
    componentDidMount(){     
        
        this.hardwareBackPressHandler();


        unsubscribe = this.props.navigation.addListener('focus', () => {
            this.hardwareBackPressHandler();
          });
          
         this.props.navigation.addListener('blur', () => {
            // The screen is focused
            // Call any action
            console.log("blurred")
            
           if(backhandler)
           {
            
               backhandler.remove()
           }
             
              
          });



        const{testSeriesData} = this.props;
        let accuracy = Math.round((testSeriesData?.testData?.brief?.score/testSeriesData?.testData?.series?.maxMarks)*100,3)
        let timeTaken = (testSeriesData?.testData?.series?.timeDuration-testSeriesData?.testData?.brief?.timeLeft)
        let seriesData = {...testSeriesData?.testData?.brief,status:2,studentId:this.props.userInfo.id,accuracy,timeTaken,skippedQues:this?.props?.testSeriesData?.testData?.brief?.Unattempted,userQuestionResponses:testSeriesData?.testData?.ques}
        saveTestResult( seriesData,(response) => {
            // console.log("save result status",response.status)
            if(response.status==201)
            {
                if(this.props?.testSeriesData?.testFuncs?.changeTestStatus){
                    this.props.testSeriesData?.testFuncs.changeTestStatus(2)
                }
                
                let data  = response.headers.map.location.split("*"); 
                if(!testSeriesData?.testData?.brief?.id)
                {
                    this.props.setTestResultData({...this.props?.testSeriesData,testData:{...this?.props?.testSeriesData?.testData,brief:{...testSeriesData?.testData?.brief,id:data[0]}},})
                } 
                
                this.setState({accuracy,savedTestResult:true,savedTestResultId:data[0],percentile:data[1],rank:data[2],totalStudent:data[3]})
            }
        }) 
    }
    
    viewSolutionHandler=()=>
    {

        if(this.props?.testSeriesData?.testData?.series?.practice)
        {

            this.setState({viewSolutions:true})
        }else
        {
            this.props.navigation.navigate('SingleTestSeries',{viewMode:true,item:this?.props?.testSeriesData?.testData?.brief?.item})
        }
        
    }
    render() {

        this.updateCounts()
        const{testSeriesData,userInfo} = this.props;
        // console.log(testSeriesData," result anaylsis")
        let timeTaken = (this.props?.testSeriesData?.testData?.series?.timeDuration*60)-this?.props?.testSeriesData?.testData?.brief?.timeLeft 

        return(
            <PageStructure
                iconName="arrow-left"
                btnHandler={() => {this.props.navigation.navigate('SingleTestSeries',{viewMode:true,item:this?.props?.testSeriesData?.testData?.brief?.item})}}
                titleonheader={testSeriesData?.testData?.series?.title}
                notificationreplaceshare={"share-2"}
                noNotificationIcon={true}
                navigation={this.props.navigation}
                nosearchIcon={true}
            >
                <ScrollView>
                    {!this.state.savedTestResult?(
                        <CustomActivtiyIndicator mode="resultSkimmer"/>
                    ):(
                        <>
                        <View style={styles.container}>
                            {/* <View style={styles.headView}>
                                <EvilIcons name="k" size={26} />
                                <Text style={styles.headText}>
                                    All Coachings
                                </Text>
                                <EvilIcons name="share-2" size={24} />
                            </View> */}

                            {/* <View style={styles.resultAnalysisView}>
                                <Text style={styles.resAnText}>Result Analysis</Text>
                            </View> */}
                            <View style={styles.headSection}>
                                <View style={styles.userNameView}>
                                    <Text style={styles.userNameHiText}>Hi,</Text>
                                    <Text style={styles.userNameText}>{userInfo.name}</Text>
                                </View>

                                {/* <View style={styles.imageView}>
                                    <Image style={styles.img} source={{uri: 'https://picsum.photos/200'}}/>
                                </View> */}
                                
                                <View style={styles.rowContainer}>
                                    <View style={styles.scoreView}>
                                        <Text style={styles.scoreRankText}>Score</Text>
                                        <View style={styles.marksView}>
                                            <Text style={styles.obtainedMarks}>{parseFloat(testSeriesData?.testData?.brief?.score).toFixed(3)}</Text>
                                            <Text> out of {testSeriesData?.testData?.series?.maxMarks} </Text> 
                                        </View>
                                    </View>
                                    <View style={styles.rankView}>
                                        <Text style={styles.scoreRankText}>RANK</Text>
                                        <View style={styles.marksView}>
                                            <Text style={styles.obtainedMarks}>{this.state.rank}</Text>
                                            
                                            <Text> out of {this.state.totalStudent} </Text>
                                            
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.outerBoxView}>
                                <FlatList 
                                    data={this.state.data} 
                                    renderItem={this.renderBoxView}
                                    keyExtractor={(item)=>item.id} 
                                    numColumns={3}
                                    ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                                />
                            </View>
                            <View style={{flexDirection: 'row',backgroundColor: theme.resultScreen.sectionBackground,paddingVertical:20}}>
                                <View style={styles.colContainer}>
                                    {CardView(
                                        <View style={styles.rowView}>
                                            <View style={styles.percentileView}>
                                                <Image source={Assets.resultScreen.percentileIcon} style={{width:20,height: 20,}}/>
                                                <Text style={styles.titleText}>PERCENTILE</Text>
                                            </View>
                                            <Text style={styles.moreText}>{this.state.percentile}%</Text>
                                            {/* <Text style={styles.moreText}>{'50%'}</Text> */}
                                        </View>,{backgroundColor:theme.resultScreen.sectionBackground,padding:10,borderRadius:10,height:40,justifyContent: 'center',margin:5,marginBottom:10,width:(width/1.7)},3
                                    )}

                                    {CardView(
                                        <View style={styles.rowView}>
                                            <View style={styles.percentileView}>
                                                <Image source={Assets.resultScreen.accuracy} style={{width:20,height: 20,}}/>
                                                <Text style={styles.titleText}>ACCURACY</Text>
                                            </View>
                                            <Text style={styles.moreText}>{this.state.accuracy}%</Text>
                                            {/* <Text style={styles.moreText}>{'50%'}</Text> */}
                                        </View>,{backgroundColor:theme.resultScreen.sectionBackground,padding:10,borderRadius:10,height:40,justifyContent: 'center',margin:5,marginBottom:10,width:(width/1.7)},3
                                    )}
                                    {CardView(
                                        <View style={styles.rowView}>
                                            <View style={styles.percentileView}>
                                                <Image source={Assets.resultScreen.timeTaken} style={{width:20,height: 20,}}/>
                                                <Text style={styles.titleText}>Time Taken</Text>
                                            </View>
                                            <Text style={styles.moreText}>{this.formatTimer(timeTaken)}</Text>
                                            {/* <Text style={styles.moreText}>{'50%'}</Text> */}
                                        </View>,{backgroundColor:theme.resultScreen.sectionBackground,padding:10,borderRadius:10,height:40,justifyContent: 'center',margin:5,marginBottom:10,width:(width/1.7)},3
                                    )}
                                    
                                
                                </View> 
                            </View>
                        </View> 
                        {!this.props?.testSeriesData?.testData?.series?.practice?
                        (
                            <LeadersBoard testId={this.props?.testSeriesData?.testData?.series?.id} />
                        ):(null)}

                        

                        {this.state.viewSolutions?(
                            <Solutions/>
                        ):(
                            <TouchableWithoutFeedback onPress={this.viewSolutionHandler}>
                                <View style={{padding:10,backgroundColor:theme.accentColor,width:width-20,margin:10,borderRadius:5,alignItems: 'center',alignSelf:'center'}}>
                                    <Text style={{color: theme.primaryColor,fontSize:16,fontFamily: 'Raleway_600SemiBold'}}>View Solution</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        
                        </>
                    )}
            </ScrollView>
            </PageStructure>
        )
    }
}

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        flexDirection: 'column',
        
    },
        headView:
        {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
            headText:
            {
                fontSize: 24,
                fontWeight: '700',
                color: theme.greyColor
            },
        resultAnalysisView:
        {
            marginLeft: '10%',
            // marginTop: '8%', 
        },
            resAnText:
            {
                fontSize: 24,
                fontWeight: '700'
            },
        headSection:
        {
            backgroundColor:theme.resultScreen.sectionBackground
        },
        userNameView:
        {
            display: 'flex',
            flexDirection: 'row', 
            marginLeft: 10,
            backgroundColor: theme.resultScreen.sectionBackground
        },
            userNameHiText:
            {
                fontSize: 18,
                fontFamily: 'Raleway_700Bold',
                color: theme.greyColor
            },
            userNameText:
            { 
                fontSize: 18, 
                fontFamily: 'Raleway_700Bold',
                color: theme.greyColor
            },
        imageView:
        {
            marginLeft: '70%',
            marginTop: 10
        },
            img:
            {
                height: 80,
                width: 80,
                borderRadius: 50
            },
        rowContainer:
        {
            display: 'flex',
            flexDirection: 'row',
            marginTop: 10,
            marginLeft: 5,
            justifyContent: 'center'
        },
            scoreView:
            {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            },

                scoreRankText:
                {
                    fontSize: 12,
                    color: theme.greyColor,
                    margin:5

                },
                marksView:
                {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                },
                    obtainedMarks:
                    {
                        fontSize: 30,
                        fontWeight: '700',
                    },
                    totalMarks:
                    {
                        fontSize: 14,
                        color: theme.greyColor
                    },
            rankView:
            {
                marginLeft: '20%',
                alignItems: 'center'
            },
        outerBoxView:
        {
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: 'center',
            // alignItems: 'center'

        },
            boxView:
            {
                
                height:110,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', 
                borderRadius: 10,
                margin: 5,
                marginVertical:30,
            },
            iconView:
            {
                borderRadius: 13,
                padding: 3
            },
            typeView:
            {
                marginTop: 5
            },
                typeText:
                {
                    fontSize: 15
                },
            quesNoView:
            {
                marginTop: 'auto',marginBottom:'auto',
                
            },
                quesNoText:
                {
                    fontSize: 18,
                    fontWeight: '700'
                },
            quesView:
            {
            },
                quesText:
                {
                    fontSize: 16,
                    color: theme.greyColor
                },
        colContainer:
        {
            display: 'flex',
            marginTop: 10,
            flexDirection: 'column',
        },
            rowView:
            {
                display: 'flex',
                flexDirection: 'row', 
                justifyContent: 'space-between'
            },
                percentileView:
                {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                   
                },
                    titleText:
                    {
                        fontSize: 18,
                        marginLeft: 10, 
                    },
                moreText:
                {
                    fontSize: 18
                },




               
                    headView:
                    {
                        flexDirection: 'row',
                        alignItems: 'center'
                    },
                        headText:
                        {
                            fontSize: 24,
                            fontWeight: '700',
                            marginLeft: 15
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
                            marginTop: 10
                        },
                            queView:
                            {
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            },
                                queText:
                                {
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    marginRight: 10,
                                },
                                typeText:
                                {
                                    marginLeft: 10,
                                    // fontWeight: '700',
                                    color: theme.accentColor, 
                                    fontSize:16
                                },
                            timeText:
                            {
                                color: theme.greyColor
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






})

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth,
        testSeriesData: state.testSeries.data,
        userInfo: state.user.userInfo
    }
}
export default connect(mapStateToProps,{setTestResultData})(ResultAnalysis); 