import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,StatusBar,FlatList, Image,Platform, BackHandler,TouchableWithoutFeedback,ScrollView,ActivityIndicator,Alert} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import { theme,dataLimit, Assets } from '../config';
import { EvilIcons, Feather } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Redirect } from 'react-router';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import SeriesModal from './SeriesModal';
import WarningModal from './WarningModal';
import {fetch_testSeries_questions} from '../Utils/DataHelper/TestSeries'
import Question from './Question';
import moment from 'moment' 
import Timer from './Timer';
import {setStatusBarHidden,setTestResultData} from '../Actions'
import BackArrow from '../Utils/Icons/BackArrow'
import SubmitModel from './SubmitModel';
import { getResponseByTestSeriesIdAndUserId, saveTestResultIntermediate } from '../Utils/DataHelper/TestSeriesResponse';
 import Toast from 'react-native-simple-toast';

class TestSeriesView extends React.Component {
    
    state={
        testSeries:this.props.route.params.item,
        time:this.props.route.params.item.timeDuration*60,
        testSeriesId:this.props.route.params.item.id,
        isModalVisible: false,
        isWarningModalVisible: false,
        loadingQuestions:true,
        isFirstTimeLoading:true,
        offset:0,
        questions:[],
        correctQues:0,
        wrongQues:0,
        attempted:0,
        testScore:0,
        backhandler:null,
        showLoadMore: true,
        isNQuestionLoading: true,
        loadingFooter: false,
        score:0
    }

    closeWarningModal = () => { this.setState({isWarningModalVisible: false})}
    openWarningModal = () => { this.setState({isWarningModalVisible: true})}


    questionCallback=(response) => 
    {
            
            if(response.status==200)
            {   
                    response.json().then(data=>
                    {
                     
                        // StatusBar.setHidden(true);
                        // this.props.setStatusBarHidden(true)
                        // this.setState({questions:{...this.state.questions,...data},isFirstTimeLoading:false,loadingQuestions:false})
                        if(data.length>0)
                        {
                            this.setState({questions:[...this.state.questions,...data],isQuestionLoading:false,startCountDown:true, showLoadMore: true, loadingFooter:false, isFirstTimeLoading:false,loadingQuestions:false});  
                            
                        }
                        else
                        {
                            this.setState({isQuestionLoading:false, showLoadMore: false, loadingFooter: false, startCountDown:true,isFirstTimeLoading:false,loadingQuestions:false}); 
                        } 
                    })
            }
    }

    componentDidMount() 
    {  
       
        // console.log()
        this.fetch();

        // this.backHandlerListener() 
    }

    fetch=()=>{
         
        if(this.props.route.params.testStatus==1)
        {
            getResponseByTestSeriesIdAndUserId(this.state.testSeriesId,this.props.userInfo.id,(response)=>{
                if(response.status==200)
                {
                    response.json().then(data=>{    
                         
                         if(data)
                         {
                            
                            this.setState({
                                questions:data.userQuestionResponses,
                                correctQues:data.correctQues,
                                wrongQues:data.wrongQues, 
                                attempted:this.state.testSeries.questionCount-(data.skippedQues),
                                score:data.score, 
                                timeLeft:data.timeLeft,
                                isTestCompleted:data.status==2,
                                briefId:data.id,
                                isQuestionLoading:false, 
                                showLoadMore: false, 
                                loadingFooter:false, 
                                isFirstTimeLoading:false,
                                startCountDown:true,
                                time:data.timeLeft,
                                loadingQuestions:false});  
                         }else
                         {
                            //  
                            fetch_testSeries_questions(this.state.testSeriesId,this.state.offset,dataLimit,this.questionCallback)

                         }
                        
    
                    })
                }else
                {
                    fetch_testSeries_questions(this.state.testSeriesId,this.state.offset,dataLimit,this.questionCallback)
                   
                }
            })
        }else
        {
            fetch_testSeries_questions(this.state.testSeriesId,this.state.offset,dataLimit,this.questionCallback)
        }
        this.setState({briefId:this.props.route.params.briefId})
        
    }

    renderFooter = () => {
        try {
       
          if (this.state.loadingFooter) {
            return <CustomActivtiyIndicator />
          } else {
              if(!this.state.showLoadMore&&!this.props.route.params?.viewMode)
              {
                  return (
                  <TouchableWithoutFeedback onPress={this.openModalSubmit}>
                    <View style={{padding: 10,backgroundColor:theme.accentColor,alignItems: 'center',borderRadius:10}}>
                        <Text style={{color:theme.primaryColor,fontFamily: 'Raleway_600SemiBold',fontSize:15    }}>Submit</Text>
                    </View>
                  </TouchableWithoutFeedback>)
              }else
              {
                return (<TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate('ResultAnalysis')}}>
                    <View style={{padding: 10,backgroundColor:theme.accentColor,alignItems: 'center',borderRadius:10}}>
                        <Text style={{color:theme.primaryColor,fontFamily: 'Raleway_600SemiBold',fontSize:15    }}>View Result</Text>
                    </View>
                </TouchableWithoutFeedback>)
              }
            
          }
        } catch (error) {
          // console.log(error);
        }
    };
    // backHandlerListener  =()=> { 
        
    //     let backhandler =  BackHandler.addEventListener('hardwareBackPress',  ()=> 
    //             {
    //                 this.showAlert()
                    
    //                 return true;
    //             });
    //     this.setState({backhandler});



    // }
    showAlert=(okFun)=>
    {
         // console.log("backpressed")
        if(this.props.route.params?.viewMode)
        {
            if(okFun)
            {
                okFun()
            };  
            this.props.navigation.navigate('ResultAnalysis')
            return null
        }else
        {

            this.setState({isWarningModalVisible:true})
            return
        }
    }


    saveResponseOnBackPress=()=>
    {
        let data  ={
            studentId:this.props.userInfo.id,
            userQuestionResponses:this.state.questions,     
            correctQues:this.state.correctQues,
            wrongQues:this.state.wrongQues,
            skippedQues:this.state.testSeries.questionCount-(this.state.attempted),
            attempted:this.state.attempted,
            score:this.state.score,
            testSeriesId:this.state.testSeriesId,
            timeLeft:this.state.timeLeft,
            status:1,
            id:this.state.briefId
        }
     
        saveTestResultIntermediate(data,(response)=>
        {
                  
            if(response.status==201)
            {
                if(this.props.route.params.changeTestStatus){
                    this.props.route.params.changeTestStatus(1)
                }
                this.setState({savingResultDone:true,isWarningModalVisible:false})
                this.props.navigation.goBack() 
            } else
            {
                Toast.show('Something Went Wrong. Unable To save Test Progress')
            }                      
        })
    }

    

      
        timeUpAction=(timeUpObj)=>
        {
            this.setState(timeUpObj);
            // StatusBar.setHidden(false);
            // this.props.setStatusBarHidden(false)
        }
        updateTimeInParent=(time)=>
        {
            this.setState({timeLeft:time});
        }
    header=()=>{
        return(
            // CardView( 
                <View style={{width: '100%', paddingVertical: 5,marginTop:10,height: '100%'}}>
                    <View style={styles.headerRowSection}>
                        <TouchableWithoutFeedback onPress={()=>(!this.props.route.params?.viewMode)?this.setState({isWarningModalVisible: true}):this.props.navigation.navigate('ResultAnalysis')}>
                            <View style={{marginLeft:10,height:24,alignItems: 'center'}}> 
                                <BackArrow height={24} width={24}/>
                            </View> 
                        </TouchableWithoutFeedback>
                        <View style={styles.quizNameView}>
                            <Text numberOfLines={1} style={styles.quizName}>{this.state.testSeries.title}</Text>
                        </View>
                        <View style={styles.pauseBtnView}> 
                                {(this.state.startCountDown&&!this.props.route.params?.viewMode)?(
                                    <Timer 
                                        handleSubmitTestButtonClick={this.handleSubmitTestButtonClick} 
                                        time={this.state.time}  
                                        showAlert={(okFun)=>this.showAlert(okFun)}  
                                        updateTimeInParent={this.updateTimeInParent} 
                                        refresh={this.refreshQuiz} 
                                        navigation={this.props.navigation} 
                                        timeUpAction={this.timeUpAction}
                                        correctQues={this.state.correctQues}
                                        incorrectQues={this.state.wrongQues}
                                        isPractice={this.state.testSeries.practice}
                                        unAttemptedQues={this.state.testSeries.questionCount-(this.state.attempted)}
                                        setTimeLeft={(timeLeft)=>this.setState({timeLeft})}
                                    />
                                ):(null)} 
                        </View>
                        <View style={{flexDirection:'row',alignItems: 'center',marginLeft:5}}>
                            <TouchableOpacity style={styles.menuIcon} onPress={()=>this.openModal()}>
                                <Feather name="grid" size={25} color={theme.greyColor}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft:5,marginRight:5}} >
                                <Feather name="more-vertical" size={25} color={theme.greyColor}/>
                            </TouchableOpacity>
                        </View>
                    </View> 
                </View>
            //     ,{width: '100%', paddingVertical: 10,height: '100%',},3
            // )
        )
    }

  

   

    renderBottom=()=>{
        return(
             <View></View>
        )
    }
    // removeBackListener=()=>
    // {
        
    //     if(this.state.backhandler)
    //     {
    //         // console.log("remove back listener",this.state.backhandler)
    //         this.state.backhandler.remove();
    //     }
    // }
    closeModal = () => {
        this.setState({ isModalVisible: false});
      }
      openModal = () => {
        this.setState({ isModalVisible: true });
      }
      closeModalSubmit = () => {
        this.setState({ isModalVisibleSubmit: false});
      }
      openModalSubmit = () => {
        this.setState({ isModalVisibleSubmit: true });
      }
    // componentWillUnmount() { 
            
    //         // this.removeBackListener();
          
    //     }
      updateComponent=()=>
      {
           
        //   if(this.state.testSeriesId!=this.props.route.params.item.id)
        //   {
        //     this.setState({testSeriesId:this.props.route.params.item.id,testSeries:this.props.route.params.item},()=>
        //     {
        //         fetch_testSeries_questions(this.state.testSeriesId,this.state.offset,dataLimit,this.questionCallback)
        //     })
        //   }
          
      }
      
      refreshQuiz=()=>
      {
           
           
            this.setState({ 
                testSeries:this.props.route.params.item,
                time:this.props.route.params.item.timeDuration*60,
                testSeriesId:this.props.route.params.item.id,
                isModalVisible: false,
                loadingQuestions:true,
                isFirstTimeLoading:true,
                offset:0,
                questions:[],
                correctQues:0,
                wrongQues:0,
                attempted:0,
                testScore:0},()=>
            {
                fetch_testSeries_questions(this.state.testSeriesId,this.state.offset,dataLimit,this.questionCallback)
            })
           
          
      }

      setQuestionAttemptStatus=(quesIndex,status,userResponse) => 
      {
             let questions = this.state.questions;   
             let  correctQues  = this.state.correctQues;
             let wrongQues = this.state.wrongQues;
             let attempted = this.state.attempted;
             let correctMarks  = this.state.testSeries.correctMarks
             let wrongMarks = this.state.testSeries.wrongMarks
             let user_score = this.state.score
             if(!questions[quesIndex]['status']||questions[quesIndex]['status']!=status)
             {


                if(questions[quesIndex]['status']=="wrong" &&  status=="correct")
                {
                    user_score = user_score + wrongMarks;
                    wrongQues--;
                }   
                if(questions[quesIndex]['status']=="correct" &&  status=="wrong")
                {
                    user_score = user_score - correctMarks;
                    correctQues--;
                }


                if(status=="correct")
                {
                   user_score = user_score + correctMarks;
                   correctQues++; 
                }else if(status=="wrong")
                {
                    user_score = user_score - wrongMarks;
                   wrongQues++;
                } 
             }
            
             
             if(!questions[quesIndex]['isAttempted'])
             {
                attempted++;
                questions[quesIndex]['isAttempted']=true;
             }
             questions[quesIndex]['status'] = status;
             questions[quesIndex]['userResponse'] = userResponse;
            //  console.log("user_score ",user_score ," state value ",this.state.score," wrongMarks ",wrongMarks," correctMarks ",correctMarks, " question ",questions[quesIndex]);
             this.setState({questions,correctQues,wrongQues,attempted,score:user_score})
      }
      clearQuestionAttemptStatus=(quesIndex,status) => 
      {
             let questions = this.state.questions;  
             let correctQues  = this.state.correctQues;
             let wrongQues = this.state.wrongQues;
             let attempted = this.state.attempted;
             let correctMarks  = this.state.testSeries.correctMarks
             let wrongMarks = this.state.testSeries.wrongMarks
             let user_score = this.state.score
             console.log("before ",attempted)
             if(!questions[quesIndex]['status']||questions[quesIndex]['status']!=status)
             {

                if(questions[quesIndex]['status']=="wrong" )
                {
                    user_score = user_score + wrongMarks;
                    wrongQues--;
                }   
                if(questions[quesIndex]['status']=="correct" )
                {
                    user_score = user_score - correctMarks;
                    correctQues--;
                }

                
             }
            
             
            //  if(questions[quesIndex]['isAttempted'])
            //  {
                attempted--;
                questions[quesIndex]['isAttempted']=false;
            //  }
            console.log("after ",attempted)
             questions[quesIndex]['status'] = status;
             questions[quesIndex]['userResponse'] = null;
             this.setState({questions,correctQues,wrongQues,attempted,score:user_score})
      }
      bookmarkQuestion=(quesIndex,status)=>
      {
            let questions = this.state.questions;  
            questions[quesIndex]['bookmarked']=status;
            this.setState({questions})
      }
      handleSubmitTestButtonClick=()=>
      {
         let data  =
         {
             testData:{
                 ques:this.state.questions,
                series:this.state.testSeries,
                brief:
                {
                    id:this.state.briefId,
                    correctQues:this.state.correctQues,
                    wrongQues:this.state.wrongQues,
                    Unattempted:this.state.testSeries.questionCount-(this.state.attempted),
                    attempted:this.state.attempted,
                    score:this.state.score,
                    testSeriesId:this.state.testSeriesId,
                    timeLeft:this.state.timeLeft,
                    item:this.props.route.params.item,
                    
                }
            },
            testFuncs:
            {
                changeTestStatus:this.props.route.params.changeTestStatus
            }
        }
         this.props.setTestResultData(data); 
         this.props.navigation.navigate("ResultAnalysis");
         this.closeModalSubmit()   
         window.clearInterval(this.state.intervalRef)
      }
      scrollToQuestion=(index)=>
      {
            if(this.flatlistRef)
            {
                this.flatlistRef.scrollTo(index)
            }
            this.closeModal()
      }
    render(){
        
        this.updateComponent()  
         
        const mode = this.props.route.params?.viewMode||this.state.testSeries.practice

        return (
            <> 
            <PageStructure 
                noBottomTab={true}
                // statusBarHidden={true}
                replaceBottomTab={true}
                singleItem={()=>{}}
                headerComponent={this.header()}
                replaceHeader={true}
                bottomComponent={this.renderBottom()}
                navigation={this.props.navigation}
                bottomComponentStyle={{paddingLeft:0,paddingRight:0,paddingBottom:0}}
            >
                
                {this.state.isFirstTimeLoading?(
                    <CustomActivtiyIndicator mode="questionSkimmer"/>
                ):(
                    <>
                 

                    <View style={styles.container}> 
                        <FlatList 
                            ref={ref=>this.flatlistRef}
                            data={Object.values(this.state.questions)}  //this.state.testSeries.isPractice
                            renderItem={({item,index}) =>(
                                <Question 
                                item={item.question} 
                                status={item.status}  
                                isTestCompleted={this.state.isTestCompleted} 
                                userResponse={item.userResponse} 
                                index={index} 
                                testSeriesId={this.state.testSeries.id}
                                isPractice={mode} 
                                correctMarks={this.state.testSeries.correctMarks}
                                wrongMarks={this.state.testSeries.wrongMarks}
                                clearQuestionAttemptStatus={this.clearQuestionAttemptStatus} 
                                bookmarkQuestion={this.bookmarkQuestion} 
                                setQuestionAttemptStatus={this.setQuestionAttemptStatus}
                                />
                            )}
                            keyExtractor={(item)=>item.id} 
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                            ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                            onEndReachedThreshold={0.8}
                            refreshing={this.state.refreshing}
                            ListFooterComponent={this.renderFooter}
                            onEndReached={() => 
                            {
                                if(this.state.showLoadMore&&!this.state.loadingFooter)
                                {
                                    this.setState({ refreshing: true,loadingFooter:true,offset:parseInt(this.state.offset)+1},()=>{this.fetch()})
                                        
                                }
                            
                            }}
                        />  
                    </View>
                    {this.state.isModalVisible ? (
                        <SeriesModal
                            navigation={this.props.navigation}
                            totalQuestions={this.state.testSeries.questionCount}
                            correctQues={this.state.correctQues}
                            wrongQues={this.state.wrongQues}
                            questions={this.state.questions}
                            attempted={this.state.attempted}
                            isModalVisible={this.state.isModalVisible} 
                            // isPractice={true}
                            briefId={this.state.briefId}
                            isPractice={this.state.testSeries.practice}
                            closeModal={this.closeModal}
                            testSeriesDetails={this.state.testSeries}
                            testSeriesId={this.state.testSeriesId}
                            timeOver ={this.state.timeOver}
                            timeLeft ={this.state.timeLeft}
                            intervalRef={this.state.interval}
                            // setStatusBarHidden={setStatusBarHidden}
                            item={this.props.route.params.item}
                            scrollToQuestion={this.scrollToQuestion}
                            viewMode={this.props.route.params?.viewMode}
                            handleSubmitTestButtonClick={this.handleSubmitTestButtonClick}
                        />
                    ) : (null)}
                    {this.state.isWarningModalVisible ? (
                        <WarningModal
                            isModalVisible={this.state.isWarningModalVisible}
                            openModal={this.openWarningModal}
                            closeModal={this.closeWarningModal}
                            yesFun={this.saveResponseOnBackPress}
                            correctQues={this.state.correctQues}
                            incorrectQues={this.state.wrongQues}
                            isPractice={this.state.testSeries.practice}
                            unAttemptedQues={this.state.testSeries.questionCount-(this.state.attempted)}
                        />
                    ) : (null)}
                    {this.state.isModalVisibleSubmit ? (
                        <SubmitModel
                            isModalVisible={this.state.isModalVisibleSubmit}
                            openModal={this.openModalSubmit}
                            closeModal={this.closeModalSubmit}
                            yesFun={this.handleSubmitTestButtonClick}
                            correctQues={this.state.correctQues}
                            incorrectQues={this.state.wrongQues}
                            isPractice={this.state.testSeries.practice}
                            unAttemptedQues={this.state.testSeries.questionCount-(this.state.attempted)}
                        />
                    ) : (null)}
              </>
                )}
                    
                
            </PageStructure>
            </>
        )
    }

}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        flexDirection: 'column',
        paddingBottom:10,
        marginTop:5
    },
        headerSection:
        {
            flexDirection: 'column',
            paddingTop:10
        },
            headerRowSection:
            {
                flex: 0.1,
                width:'100%',
                flexDirection: 'row',
                alignItems: 'center',
            //    justifyContent: 'space-between',
            },
                timer:
                { 
                    backgroundColor: theme.labelOrInactiveColor,
                    borderRadius: 2,
                    justifyContent: 'center',
                    padding: 4,
                    marginRight: 5
                },
                    timerText:
                    {
                        fontSize: 12
                    },
                quizNameView:
                {
                    marginRight: 5,
                    marginLeft: 10,
                },
                    quizName:
                    {
                      fontSize: 20 ,
                      fontWeight: 'bold' 
                    },
                pauseBtnView:
                { 
                    borderRadius: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingRight:3,
                    // marginHorizontal:'auto',
                    marginLeft:"auto",
                    flexDirection: 'row',
                },
                    pauseBtnText:
                    {
                        fontWeight:'bold',
                        color: theme.greyColor
                    },
                menuIcon:{ 
                        marginLeft:'auto',
                        marginRight:5,
                         
                        alignSelf: 'flex-end'
                },
            headerRowSection2:{
                flexDirection: 'row',
                marginTop: 10,
            },
                sectionView:{
                    marginRight: 10,
                    
                },
                    sectionText:{
                        color: theme.labelOrInactiveColor
                    },
                optView:{
                    backgroundColor: theme.labelOrInactiveColor,
                    borderRadius: 10,
                    marginLeft: 3,
                    padding: 3,
                    justifyContent: 'center',
                },
                    optText:{
                        color: theme.secondaryColor,
                        fontSize: 12
                    },
        quesRowSection:{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
            queView:
            {
                flex: 0.5,
                justifyContent: 'center'
            },
                queNum:{
                    fontSize: 16,
                    fontWeight: 'bold'
                },
            quesRow2:
            {
                flex: 0.3,
                // paddingTop:10?,
                alignItems: 'center',
                flexDirection: 'row',
                alignSelf: 'flex-end',
                justifyContent: 'space-evenly',
                // backgroundColor:'#000'
            },
                marksView:{
                    flex: 0.6,
                    flexDirection:'column',
                    alignItems: 'center',
                    marginRight: 2
                },
                    marksText:{
                        fontSize: 16
                    },
                    marksCol:{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft:'auto',
                        alignSelf:'flex-end'
                        
                        // justifyContent: 'space-evenly'
                    },
                        posMarksView:{
                            // backgroundColor: 'green',
                            // borderRadius: 7,
                            // paddingRight: 17,
                            // paddingLeft: 17,

                            marginRight: 10
                        },
                            tolMarksView:{
                                fontSize: 14,
                                color: theme.greyColor

                            },
                        negMarksView:{
                            // backgroundColor: 'red',
                            // borderRadius: 7,
                            // paddingRight: 17,
                            // paddingLeft: 17
                        },
                    timeColSection:{
                        flex: 0.3,
                        flexDirection: 'column',
                        marginLeft: 4
                    },
                        timeText:{
                            fontSize: 14
                        },
                    alertView:{
                        justifyContent: 'center',
                        marginRight:10, 
                    },
        quizQuestionView:{
            flexDirection: 'column',
            marginTop: 10
        },
            quizText:{
                fontSize: 16,
                color: theme.secondaryColor,
             
            },
            optionView:{
                flex: 1,
                flexDirection: 'column',
            },
            optionRow:{
                flex: 1,
                // flexDirection: 'row',
                justifyContent: 'space-evenly',
                // marginTop: 10
            },
                singleOptionView:{
                    // backgroundColor: theme.labelOrInactiveColor,
                    // padding: 10,
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                    marginHorizontal: 20,
                },
                    optionAns:{
                      flexDirection: 'row',
                      alignItems: 'center',
                    
                    },
                    optionText:{
                        fontSize: 16,
                        color: theme.secondaryColor
                    },
        footerView:
        {
            display: 'flex',
            flexDirection: 'row', 
            justifyContent: 'space-between',
            alignItems: 'flex-end'
        },
            reviewBtnView:
            {
                flex: 0.35
            },
                reviewBtn:
                {
                    backgroundColor: 'yellow',
                    padding: 5,
                    borderRadius: 5, 
                },
                    btnText:
                    {
                        fontSize: 14
                    },
            prevSaveBtnView:{
                flex: 0.5,
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            },
                previousBtn:
                {
                    backgroundColor: 'yellow',
                    padding: 5,
                    borderRadius: 5
                },
                saveBtn:
                {
                    backgroundColor: 'green',
                    padding: 5,
                    borderRadius: 5
                }
})

const  mapStateToProps = (state)=>
{
    return {
        
        userInfo: state.user.userInfo
    }
}
export default connect(mapStateToProps,{setStatusBarHidden,setTestResultData})( TestSeriesView);