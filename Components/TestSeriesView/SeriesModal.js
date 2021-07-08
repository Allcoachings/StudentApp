import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Modal,TouchableWithoutFeedback} from 'react-native';
import { theme } from '../config';
import { Feather } from '@expo/vector-icons';
import {connect } from 'react-redux'
import {singlequedata} from '../../FakeDataService/FakeData'
import CardView from '../Utils/CardView'

class SeriesModal extends React.Component {
  state = {
    modalVisible: true,
    
  };

  renderQuestion=({item})=>{
    return(
      <TouchableOpacity style={styles.queView}>
        <Text style={styles.queno}>{item.queno}</Text>
      </TouchableOpacity>
    )
  }
   
  render() {
    const { isModalVisible,closeModal } = this.props;
    return (
          CardView(<Modal 
            animationIn="slideInLeft"
            animationOut="slideOutRight"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={closeModal}>
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
                  <View style={styles.rowElement}>
                    <Text style={{fontSize:30,color: theme.featureYesColor}}> • </Text>
                    <Text style={{fontSize: 12,color: theme.greyColor}}>Correct (2)</Text>
                  </View>
                  <View style={styles.rowElement}>
                  <Text style={{fontSize:30,color: theme.featureNoColor}}> • </Text>
                    <Text style={{fontSize: 12,color: theme.greyColor}}>Wrong (2)</Text>
                  </View>
                  <View style={styles.rowElement}>
                   <Text style={{fontSize:30,color:theme.labelOrInactiveColor}}> • </Text> 
                    <Text style={{fontSize: 12,color: theme.greyColor}}>Unattempted (2)</Text>
                  </View>
                   
                </View>



                <View style={styles.questions}>
                  <FlatList
                      data={singlequedata.data}
                      renderItem={this.renderQuestion} 
                      numColumns={7}
                      keyExtractor={(item) => item.id}
                  />
                </View>
                

                <View style={styles.submitBtn}>
                  <Text style={styles.btntext}>Submit Test</Text>
                </View>


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
      }
    

    
});

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(SeriesModal); 