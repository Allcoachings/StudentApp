import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,TouchableWithoutFeedback,Dimensions,Image } from 'react-native';
import {serverBaseUrl, theme, imageProvider} from '../config'
import {EvilIcons, FontAwesome, AntDesign} from '@expo/vector-icons';  
const width = Dimensions.get('window').width
import ReportQuestionModal from './ReportQuestionModal'
import RenderHtml ,{ defaultSystemFonts } from 'react-native-render-html'

const systemFonts = ["kruti_dev_010regular", "chanakyaregular","walkman_chanakya_901bold","walkman_chanakya_902bold","kruti_dev_010bold", ...defaultSystemFonts];
class Question extends Component {
  state={
      isPractice:this.props.isPractice,
      correctIndex:this.props.item.correctOpt,
      userOptionIndex:this.props.userResponse,
      isCorrect:this.props.status=="correct",
      isResponded:this.props.status?true:false,
      showSolution:false,
      isModalVisible: false,

  }

  closeModal = () => { this.setState({isModalVisible: false})}
  openModal = () => { this.setState({isModalVisible: true})}

  checkAnswer=(correct,selected)=>correct==selected
   
  handleOptionBtnClick=(index,correct,selected)=>
  {
      if(!this.state.isPractice&&selected==this.state.userOptionIndex)
      {
            this.props.clearQuestionAttemptStatus(index,null)
            this.setState({userOptionIndex:null,isResponded:false})
            return ;
      }
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
        //   <Text>{index,text,optionType,onPress}</Text>
        <TouchableWithoutFeedback style={styles.optionAns} onPress={onPress}>
            <View style={[styles.singleOptionView,this.provideOptionResponseStyle(this.state.userOptionIndex,index)]}>
                
                    <View style={styles.optionAns}>
                        <View style={[{marginRight:10,borderRadius:15,paddingHorizontal:10,padding:5,borderWidth:1,borderColor: theme.labelOrInactiveColor},this.provideOptionIndexResponseStyle(this.state.userOptionIndex,index)]}>
                            <Text>{index}</Text>
                        </View> 
                        {optionType==1?(
                            // <Text style={styles.optionText}>{text}</Text>
                            // <View style={{marginLeft:30}}>
                                <RenderHtml
                                contentWidth={width-100} 
                                source={{html: text}}
                                systemFonts={systemFonts} 
                                defaultTextProps={{style: styles.quizTextOption}}
                                defaultViewProps={{marginLeft:13}}
                                />
                            // </View>
                        ):(
                            <Image source={{uri:imageProvider(text)}} style={{borderWidth:0.5,borderColor: theme.labelOrInactiveColor,width:'85%',height:150}}/>
                        )} 
                    </View>
                     
                
            </View>
        </TouchableWithoutFeedback>
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
                        // <Text style={styles.quizText}>{item.question}
                            <RenderHtml
                                contentWidth={width-50} 
                                source={{html: item.question}}
                                systemFonts={systemFonts} 
                                defaultTextProps={{style: styles.quizText}}
                                />
                        // {/* </Text> */}
                    ); 
        case 2:
        case '2': 
        case 4:
        case '4':
                       
            return(
                // <Text style={styles.quizText}>{item.question}</Text>
             <Image source={{uri:imageProvider(item.question)}}  style={styles.questionImageStyle}/>
                 
            ); 

      }
  }
 componentDidMount() {
    // if (global.__fbBatchedBridge) {
    //     const origMessageQueue = global.__fbBatchedBridge;
    //     const modules = origMessageQueue._remoteModuleTable;
    //     const methods = origMessageQueue._remoteMethodTable;
    //     global.findModuleByModuleAndMethodIds = (moduleId, methodId) => {
    //       // console.log(`The problematic line code is in: ${modules[moduleId]}.${methods[moduleId][methodId]}`)
    //     }
    //     global.findModuleByModuleAndMethodIds(29, 0);
    //     // // console.log("modules",modules,"methods",methods)
    //   }
 }

  render() {
    
     const {item,testSeriesId} = this.props;
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
                    <View style={styles.marksCol}>
                        <View style={styles.posMarksView}>
                            <Text style={styles.tolMarksView}>+{this.props.correctMarks}</Text>
                        </View>
                        <View style={styles.negMarksView}>
                            <Text style={styles.tolMarksView}>-{this.props.wrongMarks}</Text>
                        </View>
                    </View> 
                <TouchableOpacity style={styles.alertView} onPress={()=>this.handleBookmarkClick(index-1)}> 
                    <FontAwesome name={this.state.bookmarked?"bookmark":"bookmark-o"} size={24} color={theme.silverColor}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.quizQuestionView}>
            <View>
                {this.renderQuestion(item)}
               
            </View>
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
            {this.props.isPractice&&this.state.isResponded?(
                this.state.showSolution?(
                    <>
                    
                        <View style={{flexDirection: 'row', width: '95%', margin:10,justifyContent: 'space-between',}}>
                            <TouchableWithoutFeedback onPress={()=>this.setState({showSolution:false})} >
                                <View style={{width: '80%', flexDirection: 'row'}}>
                                <EvilIcons name="chevron-up" color={theme.secondaryColor} size={24}/>
                                <Text style={{fontFamily: 'Raleway_700Bold', fontSize: 12, color:theme.darkYellowColor}}>HIDE</Text> 
                                </View>
                            </TouchableWithoutFeedback> 
                                <View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <TouchableOpacity onPress={()=>this.openModal()}>
                                            <AntDesign name="warning" size={16} color={theme.silverColor} />  
                                        </TouchableOpacity>     
                                </View>
                            </View>
                        </View>
                    <View style={{margin: 10}}>
                        <Text style={{fontFamily:'Raleway_400Regular', color:theme.featureYesColor, fontSize: 14, marginVertical: 5}}>
                            Correct Answer: {item.correctOpt}
                        </Text>
                        {/* <Text style={{fontFamily:'Raleway_600SemiBold', fontSize: 12, marginVertical: 5}}>
                            {item.explanation}
                        </Text> */}
                        <RenderHtml
                            contentWidth={width-100} 
                            source={{html: item.explanation}}
                            systemFonts={systemFonts} 
                            defaultTextProps={{style: { fontSize: 12, marginVertical: 5,fontWeight: 'normal'}}}
                            />
                    </View>
                    </>
                ):(
                    
                        <View  style={{flexDirection: 'row', width: '95%', margin:10,justifyContent: 'space-between',}}>
                            <TouchableWithoutFeedback onPress={()=>this.setState({showSolution:true})}>
                                <View style={{width: '80%', flexDirection: 'row'}}>
                                    <EvilIcons name={"chevron-down"} size={25} />
                                    <Text style={{fontFamily: 'Raleway_700Bold', fontSize: 13, color:theme.darkYellowColor}}>SEE SOLUTION</Text> 
                                </View>
                            </TouchableWithoutFeedback>
                            <View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={()=>this.openModal()}>
                                        <AntDesign name="warning" size={18} color={theme.silverColor} /> 
                                    </TouchableOpacity>      
                                </View>
                            </View>
                        </View>
                )
                
            ):(null)}
            <View style={{borderBottomWidth: 7, borderBottomColor: theme.labelOrInactiveColor, marginVertical: 15}}/>
        </View>
        {this.state.isModalVisible?(
            <ReportQuestionModal
                isModalVisible={this.state.isModalVisible}
                openModal={this.openModal}
                closeModal={this.closeModal}
                questionId={item.id}
                testSeriesId={testSeriesId}
            />
        ):(null)}
        </>
    );
  }
}


const styles = StyleSheet.create({
    quesRowSection:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom:5,
        borderBottomWidth: 0.5,
        borderBottomColor:theme.labelOrInactiveColor,
        margin:5,
        marginHorizontal:5
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
                            color: theme.silverColor

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
        marginTop: 10,
        marginHorizontal: 5
    },
        quizText:{
            fontSize: 18, 
            color: theme.secondaryColor,
            
            
        },
        quizTextOption:{
            fontSize: 18,
            width:width-100,
            flexWrap:'wrap',
            color: theme.secondaryColor,
            
            
        },
        questionImageStyle:{
            width: width,height: 150,resizeMode:'contain'
        },
        optionView:{
            flex: 1,
            flexDirection: 'column',
            borderBottomWidth:0.5,
            borderBottomColor:theme.labelOrInactiveColor
        },
        optionRow:{
            flex: 1,
            // flexDirection: 'row',
            justifyContent: 'space-evenly',
            // marginTop: 10
        },
            singleOptionView:{
                
                padding: 10,
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
                    fontSize: 17,
                    flexWrap:'wrap',
                    width: '87%',
                    // fontFamily: 'Raleway_600SemiBold',
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

        backgroundColor:theme.correctAnsColor+'66',

    },
    wrongAns:
    {

        backgroundColor:theme.featureNoColor+'66',  

    },
    attemptedAns:
    {
        backgroundColor:theme.selectedOptColor+'66',
        borderColor:theme.primaryColor,
        borderWidth:1,
        
    },
    correctAnsIndex:
    {
        backgroundColor:theme.correctAnsColor,

    },
    wrongAnsIndex:
    {
        backgroundColor:theme.featureNoColor,
    },
    attemptedAnsIndex:
    {
        backgroundColor:theme.selectedOptColor,
        

    }
    });
export default Question;
