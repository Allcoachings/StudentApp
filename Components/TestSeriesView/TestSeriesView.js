import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView,ActivityIndicator,Alert} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'

import { theme,dataLimit } from '../config';
import { Feather } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Redirect } from 'react-router';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import SeriesModal from './SeriesModal';
import {fetch_testSeries_questions} from '../Utils/DataHelper/TestSeries'
import Question from './Question';
import moment from 'moment'
import { StatusBar } from 'expo-status-bar';
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
        testScore:0
    }

    questionCallback=(response) => 
    {
            
            if(response.status==200)
            {   
                    response.json().then(data=>
                    {
                       
                      this.setState({questions:{...this.state.questions,...data},isFirstTimeLoading:false,loadingQuestions:false})
                    })
            }
    }

    componentDidMount() 
    {  
        fetch_testSeries_questions(this.state.testSeriesId,this.state.offset,dataLimit,this.questionCallback)
        this.timer();
    }


        timer=()=>
        {
          
            
           let interval =  window.setInterval(()=>{
                
                if(this.state.time<=0)
                {
                    window.clearInterval(interval);
                    //alert lagna hai 
                    // const button1 = {
                    //     text: "Cancel",
                    //     onPress: () => { notificationReceivedEvent.complete(); },
                    //     style: "cancel"
                    //  };
                    const button2 = { text: "Submit Test", onPress: () => { this.setState({timeOver:true,isModalVisible:true    })}};
                    Alert.alert("Alert ", "Time Up", [ button2], { cancelable: false });
                }else
                {
                    this.setState({time:this.state.time-1}) 
                }

            },1000)

         this.setState({interval})  
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
    header=()=>{
        return(
            // CardView(
                <View style={styles.headerSection}>
                    <View style={styles.headerRowSection}>
                        <View style={{marginLeft:10}}>
                            <Feather name="arrow-left" size={20} onPress={()=>this.props.navigation.goBack()}/>
                        </View> 
                        <View style={styles.quizNameView}>
                            <Text style={styles.quizName}>{this.state.testSeries.title}</Text>
                        </View>
                        <View style={styles.pauseBtnView}>
                            <Feather name="pause-circle" size={13} color={theme.greyColor}/>
                                <Text style={styles.pauseBtnText}> {this.formatTimer(this.state.time)}</Text>
                        </View>
                        <TouchableOpacity style={styles.menuIcon} onPress={()=>this.openModal()}>
                            <Feather name="grid" size={25} color={theme.labelOrInactiveColor}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft:5,marginRight:5}} >
                            <Feather name="more-vertical" size={25} color={theme.labelOrInactiveColor}/>
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

  

   

    renderFooter=()=>{
        return(
            CardView(
                <View style={styles.footerView}>
                    <View style={styles.reviewBtnView}>
                        <TouchableOpacity style={styles.reviewBtn}>
                            <Text style={styles.btnText}>Mark For Review</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.prevSaveBtnView}>
                        <TouchableOpacity style={styles.previousBtn}>
                            <Text style={styles.btnText}>Previous</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={styles.saveBtn}>
                            <Text style={styles.btnText}>Save & Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>, {width: '100%', marginTop:'auto',padding:10}
            )
        )
    }

    closeModal = () => {
        this.setState({ isModalVisible: false});
      }
      openModal = () => {
        this.setState({ isModalVisible: true });
      }
 
      updateComponent=()=>
      {
           
          if(this.state.testSeriesId!=this.props.route.params.item.id)
          {
            this.setState({testSeriesId:this.props.route.params.item.id,testSeries:this.props.route.params.item},()=>
            {
                fetch_testSeries_questions(this.state.testSeriesId,this.state.offset,dataLimit,this.questionCallback)
            })
          }
          
      }

      setQuestionAttemptStatus=(quesIndex,status) => 
      {
             let questions = this.state.questions;  
             let  correctQues  = this.state.correctQues;
             let wrongQues = this.state.wrongQues;
             let attempted = this.state.attempted;

             if(status=="correct")
             {
                correctQues++; 
             }else if(status=="wrong")
             {
                wrongQues++;
             } 
             
             if(!questions[quesIndex]['isAttempted'])
             {
                attempted++;
                questions[quesIndex]['isAttempted']=true;
             }
             questions[quesIndex]['status'] = status;
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
            <StatusBar hidden/>
            <PageStructure
                iconName={"arrow-left"}
                btnHandler={() => {this.props.navigation.goBack()}}
                headerComponent={this.header()}
                replaceHeader={true}
                replaceBottomTab={true}
                bottomComponent={this.renderFooter()}
                headerStyle={{flex:0.0623}}
                noBottomTab={true}
                bottomComponentStyle={{paddingLeft:0,paddingRight:0,paddingBottom:0}}
            >
                
                {this.state.isFirstTimeLoading?(
                    <ActivityIndicator color={theme.accentColor} style={"large"}/>
                ):(
                    <>
                    <View style={styles.container}>
                        {/* <ScrollView> */}
                            {/* <View style={{flex: 1}}>
                                {this.header()}
                            </View> */}
                              
                                     
                                <FlatList 
                                    data={Object.values(this.state.questions)} 
                                    renderItem={({item,index}) =><Question item={item} index={index} isPractice={true} bookmarkQuestion={this.bookmarkQuestion} setQuestionAttemptStatus={this.setQuestionAttemptStatus}/>}
                                    keyExtractor={(item)=>item.id} 
                                    horizontal={false}
                                    showsHorizontalScrollIndicator={false}
                                />
                                {/* {this.renderQuizQuestion(this.state.questions[0])} */}
                            
                        {/* </ScrollView> */}
                        {/* <View style={{flex: 1,marginTop:'auto'}}>
                            {this.renderFooter()}
                        </View> */}
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
                            isPractice={true}
                            // isPractice={this.state.testSeries.isPractice}
                            closeModal={this.closeModal}
                            testSeriesDetails={this.state.testSeries}
                            timeOver ={this.state.timeOver}
                            timeLeft ={this.state.time}
                            intervalRef={this.state.interval}
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


export default TestSeriesView;