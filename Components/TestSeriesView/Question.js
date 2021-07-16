import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import {theme} from '../config'
import {Feather} from '@expo/vector-icons';
class Question extends Component {
  state={
      isPractice:this.props.isPractice,
      correctIndex:this.props.item.correctOpt,
      userOptionIndex:'',
      isCorrect:false,
      isResponded:false,

  }



  checkAnswer=(correct,selected)=>correct==selected
   
  handleOptionBtnClick=(index,correct,selected)=>
  {
       if(!this.state.isPractice||!this.state.isResponded)
       {
            if(this.checkAnswer(correct,selected))
            {
                this.setState({userOptionIndex:selected,isCorrect:true,isResponded:true})
                 
                    this.props.setQuestionAttemptStatus(index,"correct")  
                  
                
            }else
            {
                this.setState({userOptionIndex:selected,isCorrect:false,isResponded:true})
                 
                    this.props.setQuestionAttemptStatus(index,"wrong")  
                 
                
            }
       }
      
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
  renderOption=(index, text,onPress)=>
  {
      return(
            <View style={[styles.singleOptionView,this.provideOptionResponseStyle(this.state.userOptionIndex,index)]}>
                <TouchableOpacity style={styles.optionAns} onPress={onPress}>
                    <View style={{marginRight:10,borderRadius:15,paddingHorizontal:10,padding:5,borderWidth:1,borderColor: theme.labelOrInactiveColor}}>
                        <Text>{index}</Text>
                    </View> 
                    <Text style={styles.optionText}>{text}</Text>
                </TouchableOpacity>
            </View>
      )
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
                <View style={styles.alertView}>
                    <Feather name="bookmark" size={24} color={theme.labelOrInactiveColor}/>
                </View>
            </View>
        </View>
        <View style={styles.quizQuestionView}>
            <Text style={styles.quizText}>{item.question}</Text>
            <View style={styles.optionView}>
                <View style={styles.optionRow}>
                    {this.renderOption("A",item.optionA,()=>{this.handleOptionBtnClick(propsIndex,item.correctOpt,"A")})}
                    {this.renderOption("B",item.optionB,()=>{this.handleOptionBtnClick(propsIndex,item.correctOpt,"B")})}
                </View> 
                <View style={styles.optionRow}>
                    {this.renderOption("C",item.optionC,()=>{this.handleOptionBtnClick(propsIndex,item.correctOpt,"C")})}
                    {this.renderOption("D",item.optionD,()=>{this.handleOptionBtnClick(propsIndex,item.correctOpt,"D")})}  
                </View> 
            </View>
            {this.state.isPractice&&this.state.isResponded?(
                <View style={styles.explanationView}>
                    <Text style={styles.heading}>Reason</Text>
                    <Text style={styles.explanation}>{this.props.item.explanation}</Text>
                </View> 
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
        explanationView:
        {
            backgroundColor:theme.labelOrInactiveColor,
            margin:5
        },
            heading:
            {
                color: theme.secondaryColor,
                fontWeight:'bold',
                margin:10
            },
            explanation:
            {
                 marginLeft:10,
                 marginBottom:5
            },

correctAns:
{
    backgroundColor:theme.featureYesColor
},
wrongAns:
{
    backgroundColor:theme.featureNoColor
},
attemptedAns:
{
    backgroundColor:theme.labelOrInactiveColor
}
});
export default Question;