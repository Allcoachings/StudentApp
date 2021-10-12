import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,Dimensions,FlatList,StatusBar, Image,Platform, ScrollView, Modal,TouchableWithoutFeedback} from 'react-native';
import { theme , Assets, serverBaseUrl, imageProvider} from '../config';
import { Feather, FontAwesome } from '@expo/vector-icons';
import {connect } from 'react-redux'
import {singlequedata} from '../../FakeDataService/FakeData'
import CardView from '../Utils/CardView'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import {setTestResultData} from '../Actions'
const width = Dimensions.get('window').width
class SeriesModal extends React.Component {
  state = {
    modalVisible: true,
    correctQues:this.props.correctQues,
    wrongQues:this.props.wrongQues,
    Unattempted:this.props.totalQuestions-(this.props.attempted),
    attempted:this.props.attempted,
    questions:Object.values(this.props.questions),
    testSeriesDetails:this.props.testSeriesDetails,
    listModeIcon:'list',
    listMode:'list'
    
  };

  score=0;

  componentDidMount() {
    
    // let questions;
    // for(var i = 1;i<=this.props.totalQuestions;i++)
    // {
    //   questions = {...questions,[i]:{count:i,status:'unattempted'}}
    // }
  }
  provideQuestionItemStyle=(status)=>
  {
     
    if(this.props.isPractice)
    {
      if(status)
      {
         switch(status)
         {
              case 'correct':           
                return styles.correctQues
              case 'wrong':
                return styles.wrongQues
              case 'attempted':
                return styles.attemptedQues
         }
      }
    }else
    {
      if(status)
      {
         
         switch(status)
         {
              case 'attempted':
              case 'wrong':
              case 'correct':
                return styles.attemptedQues
              default:
                return styles.unAttemptedQues
         }
      }
    }
    
      
  }
  calculateScore=(status,correctScore,wrongScore) =>
  {
    if(status)
      {
         switch(status)
         {
              case 'correct':           
                this.score = this.score+correctScore
               break;
              case 'wrong':
                this.score = this.score-wrongScore
                break;
              
         }
      } 
  }
  renderQuestionGridItem=({item,index})=>{


    this.calculateScore(item.status,item.question.correctMarks,item.question.wrongMarks)
    return(
      <TouchableOpacity style={[styles.queView,this.provideQuestionItemStyle(item.status)]}>
        <Text style={styles.queno}>{index+1}</Text>
        {item.bookmarked?(
            <View style={{marginLeft:'auto',marginRight:10,position:'absolute',bottom:-5}}>
              <FontAwesome name="bookmark" size={20} color={theme.labelOrInactiveColor}/>
            </View>
          ):(null)}
      </TouchableOpacity>
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
                    <Text style={styles.queno}>{item.question}</Text>
                  ); 
      case 2:
      case '2': 
      case 4:
      case '4':

          return(
              <Image source={{uri: imageProvider(item.question)}} style={{width:width,height:150,resizeMode:'contain'}} />
          ); 

    }
}
  renderQuestionListItem=({item,index})=>
  {
    this.calculateScore(item.status,item.question.correctMarks,item.question.wrongMarks) 
     
    return(
      <View style={[{flex: 1,flexDirection: 'row',alignItems: 'center',flexWrap:'wrap',paddingBottom:10,marginVertical:5},this.provideQuestionItemStyle(item.status)]}>

          <TouchableOpacity style={[styles.queView,{borderWidth:0}]}>
            <Text style={styles.queno}>{index+1}</Text>
          </TouchableOpacity>
          <View>
              {/* <Text style={styles.queno}>{item.question}</Text> */}
              
              {this.renderQuestion(item.question)}
          </View>

          {item.bookmarked?(
            <View style={{marginLeft:'auto',marginRight:10}}>
              <FontAwesome name="bookmark" size={24} color={theme.labelOrInactiveColor}/>
            </View>
          ):(null)}
          <View>

          </View>
      </View>
    )
  }
  handleSubmitTestButtonClick=()=>
  {
     let data  ={ques:this.state.questions,series:this.state.testSeriesDetails,brief:{
      correctQues:this.state.correctQues,
      wrongQues:this.state.wrongQues,
      Unattempted:this.state.Unattempted,
      attempted:this.state.attempted,
      score:this.score,
      testSeriesId:this.props.testSeriesId,
      timeLeft:this.props.timeLeft
     }}
     this.props.setTestResultData(data);
     this.props.navigation.navigate("ResultAnalysis");
     this.props.closeModal() 
     this.props.setStatusBarHidden(false)
     window.clearInterval(this.props.intervalRef)
  }


  changeListMode=()=>
  {
        switch(this.state.listMode)
        {
          case 'list':
              this.setState({listMode: 'grid',listModeIcon:'grid'})
            break;
          case 'grid':
            this.setState({listMode: 'list',listModeIcon:'list'})

            break;
        }
  }

  renderQuestionList=()=>
  {


    switch(this.state.listMode)
    {
        case 'grid':
          return (
            <View>
              <FlatList
                data={this.state.questions}
                renderItem={this.renderQuestionGridItem} 
                numColumns={7}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                />  
              </View>
          )
        case 'list':
          return (
            <FlatList
              data={this.state.questions}
              renderItem={this.renderQuestionListItem}  
              keyExtractor={(item) => item.id}
              ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
              />  
          )
    }
    
  }
  render() {
    const { isModalVisible,closeModal,isPractice } = this.props;
     
    return (
          CardView(
          <Modal 
            animationIn="slideInLeft"
            animationOut="slideOutRight"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={this.props.timeOver?null:closeModal}>
            <TouchableOpacity onPress={()=>closeModal()} style={{width: this.props.screenWidth,height:'100%'}}>
              <TouchableWithoutFeedback>
              <View style={[styles.centeredView, {}]}>
                {/* <View style={styles.imageView}>
                  <Image source={singlequedata.image} style={styles.itemImage}/>
                  <Text style={styles.userName}>{singlequedata.name}</Text>
                </View>

                <View style={styles.viewStyle}>
                  <View style={styles.gridView}>
                    <Feather name="grid" size={20} style={{color: theme.greyColor}}/>
                    <Text style={{fontSize: 16, color: theme.greyColor}}>Grid View</Text>
                  </View>
                  <View style={{borderRightColor: theme.greyColor,
                    borderRightWidth: 1,}}/>
                  <View style={styles.listView}>
                    <Feather name="list" size={20} style={{color: theme.greyColor}}/>
                    <Text style={{fontSize: 16, color: theme.greyColor}}>List View</Text>
                  </View>
                </View>


                <View
                  style={{
                    borderBottomColor: theme.greyColor,
                    borderBottomWidth: 1,
                    marginTop: 10,
                  }}
                />


                <View style={styles.markedView}>
                  <View style={styles.MarkViewRow1}>
                    <View style={styles.markIcon}>
                      <Feather name="star" size={16} style={{color: 'pink', marginRight: 3}} />
                      <Text>Marked For View</Text>
                    </View>
                    <View style={styles.markIcon}>
                      <View style={{height: 15, width:15, borderRadius: 7.5, backgroundColor: 'blue', marginRight: 3}} />
                      <Text>Marked For View</Text>
                    </View>
                  </View>
                  <View style={styles.MarkViewRow2}>
                    <View style={styles.markIcon}>
                      <View 
                        style={{height: 15, width:15, borderRadius: 7.5, backgroundColor: theme.greyColor, marginRight: 3}} 
                      />
                      <Text>Marked For View</Text>
                    </View>
                    <View style={styles.markIcon}>
                      <View 
                        style={{height: 15, width:15, borderRadius: 7.5, backgroundColor: 'blue', marginRight: 3}} 
                      />
                      <Text>Marked For View</Text>
                    </View>
                  </View>
                </View>


                <View style={styles.analogyView}>
                  <Text style={{color: theme.greyColor, fontSize: 18, marginLeft: 10}}>
                    Analogy
                  </Text>
                  <View style={styles.analogyIcon}>
                    <Feather name="alert-circle" size={18} style={{color: theme.greyColor}}/>
                    <Feather name="chevron-up" size={18} style={{color: theme.greyColor}}/>
                  </View>
                </View> */}


                <View
                  style={{
                    // borderBottomColor: theme.greyColor,
                    // borderBottomWidth: 2,
                    // marginTop: 10,
                  }}
                />



                <View style={styles.numRow}>
                  {isPractice?(
                    <>
                      <View style={styles.rowElement}>
                        <Text style={{fontSize:30,color: theme.featureYesColor}}> • </Text>
                        <Text style={{fontSize: 12,color: theme.greyColor}}>Correct ({this.state.correctQues})</Text>
                      </View>
                      <View style={styles.rowElement}>
                        <Text style={{fontSize:30,color: theme.featureNoColor}}> • </Text>
                        <Text style={{fontSize: 12,color: theme.greyColor}}>Wrong ({this.state.wrongQues})</Text>
                      </View>
                    </>
                  ):(
                    <View style={styles.rowElement}>
                        <Text style={{fontSize:30,color: theme.secondaryColor}}> • </Text>
                        <Text style={{fontSize: 12,color: theme.greyColor}}>Attempted ({this.state.attempted})</Text>
                    </View>
                  )}
                    <View style={styles.rowElement}>
                      <Text style={{fontSize:30,color:theme.labelOrInactiveColor}}> • </Text> 
                      <Text style={{fontSize: 12,color: theme.greyColor}}>Unattempted ({this.state.Unattempted})</Text>
                    </View>
                    
                    <View style={styles.rowElement}>
                       
                        <Feather name={this.state.listModeIcon} size={20} onPress={this.changeListMode}/>
                      
                    </View> 
                </View>



                <View style={styles.questions}>
                  {this.renderQuestionList()}
                </View> 
                <TouchableOpacity style={styles.submitBtn} onPress={this.handleSubmitTestButtonClick}>
                  <Text style={styles.btntext}>Submit Test</Text>
                </TouchableOpacity> 
              </View>
              </TouchableWithoutFeedback>              
            </TouchableOpacity>
          </Modal>)
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'column',
    height: '100%', 
    backgroundColor: theme.primaryColor,
    borderWidth: 0.5,
    borderColor: theme.labelOrInactiveColor
  },
    imageView: 
    {
        marginTop: '20%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
      itemImage:
      {
          height: 40,
          width: 40,
          borderRadius: 20
      },
      userName:
      {
         color: theme.greyColor,
         fontSize: 18,
         justifyContent: 'center',
         alignItems: 'center',
         marginLeft: '10%'
      },
    viewStyle:
    {
      flexDirection: 'row',
      marginTop: '10%',
      justifyContent: 'space-evenly'
    },
      gridView:
      {
        flexDirection: 'row',
      },
      listView:
      {
        flexDirection: 'row'
      },
    markedView:
    {
      flexDirection: 'column',
      marginTop: '10%'
    },
      MarkViewRow1:
      {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
      },
          markIcon:
          {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          },
      MarkViewRow2:
      {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly'
      },
    analogyView:
    {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
      analogyIcon:
      {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
      },
    numRow:
    {
      display: 'flex',
      flexDirection: 'row',
      // marginTop: '10%',
      alignItems: 'center',
      borderBottomWidth:1,
      borderBottomColor:theme.labelOrInactiveColor
      ,
      justifyContent: 'space-evenly'
    },
        rowElement:
        {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        },
    questions:
    {
      flex:1,
      flexDirection: 'row',

      marginTop: '5%',
      justifyContent: 'space-between',
      // alignItems: 'center'
    },
      queView: 
      {
        height: 40,
        width:40,
        borderRadius: 20,
        margin: 5,
        borderWidth:1,
        borderColor: theme.labelOrInactiveColor,
        justifyContent: 'center',
        alignItems: 'center'
      },
        queno:
        {
          fontSize: 16,
          padding: 2,
          color: theme.greyColor,
        },
    submitBtn:
    {
      backgroundColor: theme.accentColor,
      // borderRadius: 3,
      marginTop: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
      // marginBottom: 10,
      padding: 10,
      // marginLeft: 4,
      // marginRight: 4,
    },
      btntext:
      {
        color: theme.primaryColor,
        fontSize: 16,
        fontWeight: 'bold'
      },
    

correctQues:
{
  borderColor:theme.featureYesColor,
  backgroundColor: theme.featureYesColor+'4D',
},
wrongQues:
{
  borderColor:theme.featureNoColor,
  backgroundColor: theme.featureNoColor+'4D',

},
attemptedQues:
{
  borderColor:theme.secondaryColor,
  borderWidth:1, 

}  ,
unAttemptedQues:
{
  borderColor:theme.greyColor,
  borderWidth:1, 

}
});

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps,{setTestResultData})(SeriesModal); 