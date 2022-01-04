import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,StatusBar,FlatList, Image,Platform, BackHandler,ScrollView,ActivityIndicator,Alert} from 'react-native';
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
import {fetch_testSeries_questions} from '../Utils/DataHelper/TestSeries'
import Question from './Question';
import moment from 'moment' 
import Timer from './Timer';
import {setStatusBarHidden} from '../Actions'
 
class TestSeriesView extends React.Component {

    state={
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
        testScore:0,
        backhandler:null,
        showLoadMore: true,
        isNQuestionLoading: true,
        loadingFooter: false,
    }

    questionCallback=(response) => 
    {
            
            if(response.status==200)
            {   
                    response.json().then(data=>
                    {
                     
                        StatusBar.setHidden(true);
                        this.props.setStatusBarHidden(true)
                        // this.setState({questions:{...this.state.questions,...data},isFirstTimeLoading:false,loadingQuestions:false})
                        if(data.length>0)
                        {
                            this.setState({questions:[...this.state.questions,...data],isQuestionLoading:false, showLoadMore: true, loadingFooter:false, isFirstTimeLoading:false,loadingQuestions:false});  
                            
                        }
                        else
                        {
                            this.setState({isQuestionLoading:false, showLoadMore: false, loadingFooter: false, isFirstTimeLoading:false,loadingQuestions:false}); 
                        } 
                    })
            }
    }

    componentDidMount() 
    {  
       
        
        this.fetch();

        // this.backHandlerListener() 
    }

    fetch=()=>{
        fetch_testSeries_questions(this.state.testSeriesId,this.state.offset,dataLimit,this.questionCallback)
    }

    renderFooter = () => {
        try {
       
          if (this.state.loadingFooter) {
            return <CustomActivtiyIndicator />
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
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
        Alert.alert("Warning!","Are you sure to quit quiz",[ 
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () =>{okFun();  this.props.navigation.goBack() }},
        ])
    }

      
        timeUpAction=(timeUpObj)=>
        {
            this.setState(timeUpObj);
            StatusBar.setHidden(false);
            this.props.setStatusBarHidden(false)
        }
        updateTimeInParent=(time)=>
        {
            this.setState({timeLeft:time});
        }
    header=()=>{
        return(
            // CardView(
                <View style={styles.headerSection}>
                    <View style={styles.headerRowSection}>
                        <View style={{marginLeft:10}}>
                            <Feather name="arrow-left" size={20} onPress={()=>this.showAlert()}/>
                        </View> 
                        <View style={styles.quizNameView}>
                            <Text numberOfLines={1} style={styles.quizName}>{this.state.testSeries.title}</Text>
                        </View>
                        <View style={styles.pauseBtnView}>
                            {/* <Feather name="pause-circle" size={13} color={theme.greyColor}/> */}
                                {/* <Text style={styles.pauseBtnText}> {this.formatTimer(this.state.time)}</Text> */}
                                {/* <Timer time={this.state.time} showAlert={(okFun)=>this.showAlert(okFun)}  updateTimeInParent={this.updateTimeInParent} refresh={this.refreshQuiz} navigation={this.props.navigation} timeUpAction={this.timeUpAction}/> */}
                        </View>
                        <TouchableOpacity style={styles.menuIcon} onPress={()=>this.openModal()}>
                            <Feather name="grid" size={25} color={theme.greyColor}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft:5,marginRight:5}} >
                            <Feather name="more-vertical" size={25} color={theme.greyColor}/>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={styles.headerRowSection2}>
                        <View style={styles.sectionView}>
                            <Text style={styles.sectionText}>SECTIONS</Text>
                        </View>
                        <View style={styles.optView}>
                            <Text style={styles.optText}>English Language</Text>
                        </View>
                        <View style={styles.optView}>
                            <Text style={styles.optText}>Reasoning</Text>
                        </View>
                        <View style={styles.optView}>
                            <Text style={styles.optText}>Quantitative</Text>
                        </View>
                    </View> */}
                </View>
                // ,{width: '100%', padding: 4, borderColor: theme.labelOrInactiveColor, borderWidth: 0.5}
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
    //         console.log("remove back listener",this.state.backhandler)
    //         this.state.backhandler.remove();
    //     }
    // }
    closeModal = () => {
        this.setState({ isModalVisible: false});
      }
      openModal = () => {
        this.setState({ isModalVisible: true });
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

             if(!questions[quesIndex]['status']||questions[quesIndex]['status']!=status)
             {


                if(questions[quesIndex]['status']=="wrong" &&  status=="correct")
                {
                    wrongQues--;
                }   
                if(questions[quesIndex]['status']=="correct" &&  status=="wrong")
                {
                    correctQues--;
                }


                if(status=="correct")
                {
                   correctQues++; 
                }else if(status=="wrong")
                {
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
             this.setState({questions,correctQues,wrongQues,attempted})
      }
      bookmarkQuestion=(quesIndex,status)=>
      {
            let questions = this.state.questions;  
            questions[quesIndex]['bookmarked']=status;
            this.setState({questions})
      }
    render(){
        
        this.updateComponent()  
        return (
            <> 
            <PageStructure
                // iconName={"arrow-left"} 
                // // headerComponent={this.header()}
                // // replaceHeader={false}
                // replaceBottomTab={true}
                // bottomComponent={this.renderBottom()}
                // headerStyle={{flex:0.0623}}
                // noBottomTab={true}
                // statusBarHidden={true}
                // bottomComponentStyle={{paddingLeft:0,paddingRight:0,paddingBottom:0}}


           
                noBottomTab={true}
                statusBarHidden={true}
                replaceBottomTab={true}
                singleItem={()=>{}}
                headerComponent={this.header()}
                replaceHeader={true}
                bottomComponent={this.renderBottom()}
                bottomComponentStyle={{paddingLeft:0,paddingRight:0,paddingBottom:0}}
            >
                
                {this.state.isFirstTimeLoading?(
                    <CustomActivtiyIndicator mode="questionSkimmer"/>
                ):(
                    <>
                    <View style={styles.container}> 
                        <FlatList 
                            data={Object.values(this.state.questions)}  //this.state.testSeries.isPractice
                            renderItem={({item,index}) =><Question item={item.question} index={index} isPractice={true} bookmarkQuestion={this.bookmarkQuestion} setQuestionAttemptStatus={this.setQuestionAttemptStatus}/>}
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
                            isPractice={this.state.testSeries.isPractice}
                            closeModal={this.closeModal}
                            testSeriesDetails={this.state.testSeries}
                            testSeriesId={this.state.testSeriesId}
                            timeOver ={this.state.timeOver}
                            timeLeft ={this.state.timeLeft}
                            intervalRef={this.state.interval}
                            setStatusBarHidden={setStatusBarHidden}
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
        paddingBottom:10
    },
        headerSection:
        {
            flexDirection: 'column',
            paddingTop:10, 
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
                    marginLeft: 5,
                },
                    quizName:
                    {
                      fontSize: 14 ,
                      fontWeight: '700' 
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


export default connect(null,{setStatusBarHidden})( TestSeriesView);