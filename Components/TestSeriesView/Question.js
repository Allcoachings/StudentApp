import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,TouchableOpacity,TouchableWithoutFeedback,Dimensions } from 'react-native';
import {serverBaseUrl, theme} from '../config'
import {Feather, FontAwesome} from '@expo/vector-icons';
 const width = Dimensions.get('window').width
class Question extends Component {
  state={
      isPractice:this.props.isPractice,
      correctIndex:this.props.item.correctOpt,
      userOptionIndex:'',
      isCorrect:false,
      isResponded:false,
      showSolution:false,
      

  }



  checkAnswer=(correct,selected)=>correct==selected
   
  handleOptionBtnClick=(index,correct,selected)=>
  {
       if(!this.state.isPractice||!this.state.isResponded)
       {
            if(this.checkAnswer(correct,selected))
            {
                this.setState({userOptionIndex:selected,isCorrect:true,isResponded:true})
                 
                    this.props.setQuestionAttemptStatus(index,"correct",selected)  
                    
                  
                
            }else
            {
                this.setState({userOptionIndex:selected,isCorrect:false,isResponded:true})
                 
                    this.props.setQuestionAttemptStatus(index,"wrong",selected)  
                 
                
            }
       }
      
  }
  handleBookmarkClick=(index)=>{
        this.setState({bookmarked:!this.state.bookmarked},()=>{
            this.props.bookmarkQuestion(index,this.state.bookmarked)
        })
     
          
  }

  provideOptionResponseStyle=(selectedIndex,currentIndex)=>
  {
       
      if(this.props.isPractice)
      {
        
        if(!this.state.isResponded)
        {
         
            return ""
        }else if(this.state.isCorrect||this.state.correctIndex==currentIndex)
        {
          if(selectedIndex==currentIndex||this.state.correctIndex==currentIndex)
          {
            return styles.correctAns
          }
            
        }else
        {
           
            if(selectedIndex==currentIndex)
            {
              return styles.wrongAns
            }
        }


      }else if(this.state.isResponded && selectedIndex==currentIndex)
      {
            return styles.attemptedAns
      }
       
            
  }
  
  provideOptionIndexResponseStyle=(selectedIndex,currentIndex)=>
  {
       
      if(this.props.isPractice)
      {
        
        if(!this.state.isResponded)
        {
         
            return ""
        }else if(this.state.isCorrect||this.state.correctIndex==currentIndex)
        {
          if(selectedIndex==currentIndex||this.state.correctIndex==currentIndex)
          {
            return styles.correctAnsIndex
          }
            
        }else
        {
           
            if(selectedIndex==currentIndex)
            {
              return styles.wrongAnsIndex
            }
        }


      }else if(this.state.isResponded && selectedIndex==currentIndex)
      {
            return styles.attemptedAnsIndex
      }
       
            
  }
  renderOption=(index, text,optionType,onPress)=>
  {
      
      return(
            <View style={[styles.singleOptionView,this.provideOptionResponseStyle(this.state.userOptionIndex,index)]}>
                <TouchableWithoutFeedback style={styles.optionAns} onPress={onPress}>
                    <View style={styles.optionAns}>
                        <View style={[{marginRight:10,borderRadius:15,paddingHorizontal:10,padding:5,borderWidth:1,borderColor: theme.labelOrInactiveColor},this.provideOptionIndexResponseStyle(this.state.userOptionIndex,index)]}>
                            <Text>{index}</Text>
                        </View> 
                        {optionType==1?(
                            <Text style={styles.optionText}>{text}</Text>
                        ):(
                            <Image source={{uri:serverBaseUrl+text}} style={{borderWidth:0.5,borderColor: theme.labelOrInactiveColor,width:'85%',height:150}}/>
                        )} 
                    </View>
                </TouchableWithoutFeedback>
            </View>
      )
  }
  renderQuestion=(item) => {
      switch (item.questionType)
      {
          case 1:
          case '1':
          case '3': 
          case 3:
                    return(
                        <Text style={styles.quizText}>{item.question}</Text>
                    ); 
        case 2:
        case '2': 
        case 4:
        case '4':

            return(
                 <Image source={{uri: serverBaseUrl+item.question}} style={{width:width,height:150,resizeMode:'contain'}} />
            ); 

      }
  }
 
  render() {

     const {item} = this.props;
     const propsIndex = this.props.index;
     const  index = propsIndex+1 
    return (
        <>
        <View style={styles.quesRowSection}>
            <View style={styles.queView}>
                <Text style={styles.queNum}>
                    Q. {index}
                </Text>
            </View>
            <View style={styles.quesRow2}>
                {/* <View style={styles.marksView}> */}
                    {/* <Text style={styles.marksText}>Marks</Text> */}
                    <View style={styles.marksCol}>
                        <View style={styles.posMarksView}>
                            <Text style={styles.tolMarksView}>+{item.correctMarks}</Text>
                        </View>
                        <View style={styles.negMarksView}>
                            <Text style={styles.tolMarksView}>-{item.wrongMarks}</Text>
                        </View>
                    </View>
                {/* </View> */}
                {/* <View style={styles.timeColSection}>
                    <Text style={styles.timeText}>Time</Text>
                    <Text style={styles.timeText}>00:00</Text>
                </View> */}
                <TouchableOpacity style={styles.alertView} onPress={()=>this.handleBookmarkClick(index-1)}> 
                    <FontAwesome name={this.state.bookmarked?"bookmark":"bookmark-o"} size={24} color={theme.labelOrInactiveColor}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.quizQuestionView}>
            {this.renderQuestion(item)}
           
            <View style={styles.optionView}>
                <View style={styles.optionRow}>
                    {this.renderOption("A",item.optionA,item.optionType,()=>{this.handleOptionBtnClick(propsIndex,item.correctOpt,"A")})}
                    {this.renderOption("B",item.optionB,item.optionType,()=>{this.handleOptionBtnClick(propsIndex,item.correctOpt,"B")})}
                </View> 
                <View style={styles.optionRow}>
                    {this.renderOption("C",item.optionC,item.optionType,()=>{this.handleOptionBtnClick(propsIndex,item.correctOpt,"C")})}
                    {this.renderOption("D",item.optionD,item.optionType,()=>{this.handleOptionBtnClick(propsIndex,item.correctOpt,"D")})}  
                </View> 
            </View>
            {this.state.isPractice&&this.state.isResponded?(
                this.state.showSolution?(
                    <>
                    <View style={{alignItems: 'flex-end',margin:10}}>
                        <TouchableWithoutFeedback onPress={()=>this.setState({showSolution:false})}>
                            <View style={{flexDirection:'row', }}>
                                <Text style={{color:theme.accentColor}}>Hide</Text>
                                <Feather name="chevron-up" color={theme.accentColor} size={20}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.explanationView}>
                        <Text style={styles.correctAnswer}>Correct Answer: {item.correctOpt}</Text>
                        <Text style={styles.explanation}>{this.props.item.explanation}</Text>
                    </View> 
                    </>
                ):(
                    <View style={{alignItems: 'flex-end',margin:10}}>
                        <TouchableWithoutFeedback onPress={()=>this.setState({showSolution:true})}>
                            <View style={{flexDirection:'row', }}>
                                <Text style={{fontFamily:'Raleway_600SemiBold',color:theme.accentColor}}>View Solution</Text>
                                <Feather name="chevron-down" color={theme.accentColor} size={20}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                )
                
            ):(null)}
            
        </View>
        </>
    );
  }
}


const styles = StyleSheet.create({
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
            fontFamily: 'Raleway_600SemiBold',
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
                padding: 5,
                width:width,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                // marginHorizontal: 20,
            },
                optionAns:{
                    flexDirection: 'row',
                    alignItems: 'center',
                
                },
                optionText:{
                    fontSize: 16,
                    fontFamily: 'Raleway_600SemiBold',
                    color: theme.secondaryColor
                },
        explanationView:
        {
            // backgroundColor:theme.labelOrInactiveColor,
            margin:5
        },
            heading:
            {
                color: theme.secondaryColor,
                fontWeight:'bold',
                margin:10
            },
            correctAnswer:
            {
                color:theme.featureYesColor,
                fontFamily: 'Raleway_600SemiBold',
                marginLeft:10,
                marginBottom:5,
            },
            explanation:
            {
                 marginLeft:10,
                 marginBottom:5,
                 fontFamily: 'Raleway_600SemiBold'
            },

    correctAns:
    {

        backgroundColor:theme.featureYesColor+'4D',

    },
    wrongAns:
    {

        backgroundColor:theme.featureNoColor+'4D',  

    },
    attemptedAns:
    {

        borderColor:theme.labelOrInactiveColor,
        borderWidth:1,
        
    },
    correctAnsIndex:
    {
        backgroundColor:theme.featureYesColor+'4D',

    },
    wrongAnsIndex:
    {
        backgroundColor:theme.featureNoColor+'4D',
    },
    attemptedAnsIndex:
    {
        backgroundColor:theme.labelOrInactiveColor,
        

    }
    });
export default Question;
