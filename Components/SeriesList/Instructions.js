import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Image, TouchableOpacity, View, TextInput, Dimensions,ScrollView } from "react-native";
import {theme} from '../config'
import CardView from '../Utils/CardView'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height;

class Instructions extends React.Component {
  state = {
    modalVisible: true,
  };
  //general instructions
 section1Data=[
    {
      index:1,
      text:"The clock has been set at the server and the countdown timer at the top right corner of your screen will display the time remaining for you to complete the exam. When the clock runs out the exam ends by default - you are not required to end or submit your exam."
    },
    {
      index:2,
      text:"The question palette at the right of screen shows one of the following statuses of each of the questions numbered:",
      subPoints:
      [
        {
          image:{uri:"https://dubuddy.in/shortLinks/userAvatar"},
          text:"You have not visited the question yet."
        },
        {
          image:{uri:"https://dubuddy.in/shortLinks/userAvatar"},
          text:"You have not answered the question."
        },
        {
          image:{uri:"https://dubuddy.in/shortLinks/userAvatar"},
          text:"You have answered the question."
        },
        {
          image:{uri:"https://dubuddy.in/shortLinks/userAvatar"},
          text:"You have NOT answered the question but have marked the question for review."
        },
        {
          image:{uri:"https://dubuddy.in/shortLinks/userAvatar"},
          text:"You have answered the question but marked it for review."
        },
        {
          text:"The Marked for Review status simply acts as a reminder that you have set to look at the question again. If an answer is selected for a question that is Marked for Review, the answer will be considered in the final evaluation.",
          isSpecial :true,
          style:{color:theme.featureNoColor}
        },
      ]
    }, 
  ]

  section2Data= 
  [
    {
      index:3,
      text:'To select a question to answer, you can do one of the following:',
      subPoints:[
        {
          index:'a. ',
          text:"Click on the question number on the question palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question."
        },
        {
          index:'b. ',
          text:"Click on Save and Next to save answer to current question and to go to the next question in sequence."
        },
        {
          index:'c. ',
          text:"Click on Mark for Review to save answer to current question, mark it for review, and to go to the next question in sequence."
        },
      ]
    }, 
    {
      index:4,
      text:'You can view the entire paper by clicking on the gread view button.', 
    }, 
  ]

  section3Data=[
    {
      index:5,
      text:"For multiple choice type question :",
      subPoints:[
        {
          index:'a. ',
          text:"To select your answer, click on one of the option buttons"
        },
        {
          index:'b. ',
          text:"To change your answer, click the another desired option button"
        },
        {
          index:'c. ',
          text:"To save your answer, you MUST click on Save & Next"
        },
        {
          index:'d. ',
          text:"To deselect a chosen answer, click on the chosen option again or click on the Clear Response button."
        },
        {
          index:'e. ',
          text:"To mark a question for review click on Mark for Review . If an answer is selected for a question that is Marked for Review, the answer will be considered in the final evaluation."
        },

      ]

    },
    {
      index:6,
      text:"To change an answer to a question, first select the question and then click on the new answer option followed by a click on the Save & Next button."
    },
    {
      index:7,
      text:"Questions that are saved or marked for review after answering will ONLY be considered for evaluation."
    },

  ]

  section4Data=[
   {
     index:8,
     text:"Sections in this question paper are displayed on the top bar of the screen. Questions in a section can be viewed by clicking on the section name. The section you are currently viewing is highlighted."
   },
   {
     index:9,
     text:"After clicking the Save & Next button on the last question for a section, you will automatically be taken to the first question of the next section."
   },
   {
     index:10,
     text:"You can move the mouse cursor over the section names to view the status of the questions for that section."
   },
   {
     index:11,
     text:"You can shuffle between sections and questions anytime during the examination as per your convenience"
   },
  ]

  renderHeading=(text)=>
  {
      return (<Text style={{fontFamily: 'Raleway_700Bold'}}>{text}</Text>)
  }
  renderNormalText =(text,style)=>
  {
    return (<Text style={[{fontFamily: 'Raleway_400Regular'},style]}>{text}</Text>)
  }
  renderHighlightedText=(text)=>
  {
    return (<Text style={{fontFamily:'Raleway_600SemiBold'}}>{text}</Text>)
  }
  renderListPoint=(pointNumber,text)=>
  {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{marginRight:3}}>{this.renderHighlightedText(pointNumber)}</View>
        <View>{this.renderNormalText(text)}</View>
      </View>
    )
  }

  renderpointWithImage=(img,text)=>
  {
    return (
      <View style={{flexDirection: 'row',alignItems: 'center'}}>
        <View style={{marginRight:3}}>
            <Image source={img} style={{height:20,width:20}}/> 
        </View>
        <View>{this.renderNormalText(text)}</View>
      </View>
    )
  }
  renderInstructionSection = (sectionHeading, pointData)=>
  {
    return (
          <View>
              <View>
                  {this.renderHeading(sectionHeading)}
              </View> 
              {pointData.map((item,index)=>
                  <View style={{marginLeft:10}}>
                      {this.renderListPoint(item.index,item.text)}
                   
                      {item.subPoints&&item.subPoints.map((subpoint)=>(
                        <View style={{marginLeft:10}}> 

                            {subpoint.isSpecial?this.renderNormalText(subpoint.text,subpoint.style)
                              :
                              subpoint.image?
                                          this.renderpointWithImage(subpoint.image,subpoint.text)
                                          :
                                          (this.renderListPoint(subpoint.index,subpoint.text))}
                        </View>
                      ))}
                  </View> 
              )}
          </View>
    )
  }
  render() {
    const { closeModal } = this.props;
    return (
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={closeModal}>
          {CardView(<View style={styles.centeredView}>
            <View style={{borderBottomWidth:1,borderBottomColor:theme.labelOrInactiveColor,padding:10,}}>
                <Text style={{fontFamily:'Raleway_700Bold',fontSize:20}}>Instructions</Text>
            </View>
            <ScrollView>
              <View style={{margin:10}}>
                    <View>
                      {this.renderHeading("Please read the following instructions carefully")}
                  </View>
                  {/* section one of instructions */}
                  {this.renderInstructionSection("General Instructions:",this.section1Data)}
                  {this.renderInstructionSection("Navigating to a question :",this.section2Data)}
                  {this.renderInstructionSection("Answering questions :",this.section3Data)}
                  {this.renderInstructionSection("Navigating through sections :",this.section4Data)}

              </View>
            </ScrollView>
            <View style={{marginTop:'auto',marginBottom: 20}}>
                <TouchableOpacity style={{backgroundColor:theme.accentColor,padding:10,alignItems: 'center'}} onPress={()=>{this.props.navigation.navigate("SingleTestSeries", {item: this.props.item}), closeModal()}}>
                    <Text style={{fontFamily:'Raleway_600SemiBold',fontSize:18,color:theme.primaryColor}}>Continue</Text>
                </TouchableOpacity >
                {/* <TouchableOpacity style={styles.btn} onPress={closeModal}>
                    <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity> */}
            </View>
          </View>,{height: height, width: width})}
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: 
  {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },  
     
    
});

export default Instructions;