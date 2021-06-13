import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'

import { theme } from '../config';
import { Feather } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Redirect } from 'react-router';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import SeriesModal from './SeriesModal';

class TestSeriesView extends React.Component {

    state={
        isModalVisible: false
    }

    header=()=>{
        return(
            // CardView(
                <View style={styles.headerSection}>
                    <View style={styles.headerRowSection}>
                        <View style={styles.timer}>
                            <Text style={styles.timerText}>11:20:22</Text>
                        </View>
                        <View style={styles.quizNameView}>
                            <Text style={styles.quizName}>IBPS PO Prelims Mock Test 1</Text>
                        </View>
                        <View style={styles.pauseBtnView}>
                            <Feather name="pause-circle" size={13} color={theme.redColor}/>
                            <Text style={styles.pauseBtnText}>Pause</Text>
                        </View>
                        <TouchableOpacity style={styles.menuIcon} onPress={()=>this.openModal()}>
                            <Feather name="menu" size={25} color={theme.secondaryColor}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headerRowSection2}>
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
                    </View>
                </View>
                // ,{width: '100%', padding: 4, borderColor: theme.labelOrInactiveColor, borderWidth: 0.5}
            // )
        )
    }

    queSection=()=>{
        return(
            CardView(
                <View style={styles.quesRowSection}>
                    <View style={styles.queView}>
                        <Text style={styles.queNum}>
                            Ques no. 1
                        </Text>
                    </View>
                    <View style={styles.quesRow2}>
                        <View style={styles.marksView}>
                            <Text style={styles.marksText}>Marks</Text>
                            <View style={styles.marksCol}>
                                <View style={styles.posMarksView}>
                                    <Text style={styles.tolMarksView}>+2</Text>
                                </View>
                                <View style={styles.negMarksView}>
                                    <Text style={styles.tolMarksView}>0.5</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.timeColSection}>
                            <Text style={styles.timeText}>Time</Text>
                            <Text style={styles.timeText}>00:00</Text>
                        </View>
                        <View style={styles.alertView}>
                            <Feather name="alert-circle" size={24} color={theme.secondaryColor}/>
                        </View>
                    </View>
                </View>,{width: '100%', padding: 4, borderColor: theme.labelOrInactiveColor, borderWidth: 0.5}
                
            )
        )
    }

    renderQuizQuestion=()=>{
        return(
        <View style={styles.quizQuestionView}>
            <Text style={styles.quizText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            <View style={styles.optionView}>
                <View style={styles.optionRow}>
                    <View style={styles.singleOptionView}>
                        <TouchableOpacity style={styles.optionAns}></TouchableOpacity>
                        <Text style={styles.optionText}>Stumbled</Text>
                    </View>
                    <View style={styles.singleOptionView}>
                        <TouchableOpacity style={styles.optionAns}></TouchableOpacity>
                        <Text style={styles.optionText}>Littered</Text>
                    </View>
                </View >
                <View style={styles.optionRow}>
                    <View style={styles.singleOptionView}>
                        <TouchableOpacity style={styles.optionAns}></TouchableOpacity>
                        <Text style={styles.optionText}>Stumbled</Text>
                    </View>
                    <View style={styles.singleOptionView}>
                        <TouchableOpacity style={styles.optionAns}></TouchableOpacity>
                        <Text style={styles.optionText}>Littered</Text>
                    </View>
                </View>
            </View>
        </View>
    )}

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

    render(){
        return (
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                headerComponent={this.header()}
                replaceHeader={true}
                replaceBottomTab={true}
                bottomComponent={this.renderFooter()}
                headerStyle={{flex:0.123}}
                bottomComponentStyle={{paddingLeft:0,paddingRight:0,paddingBottom:0}}
            >
                
                    <View style={styles.container}>
                        <ScrollView>
                            {/* <View style={{flex: 1}}>
                                {this.header()}
                            </View> */}
                            <View >
                                {this.queSection()}
                            </View> 
                            <View >
                                {this.renderQuizQuestion()}
                            </View>
                        </ScrollView>
                        {/* <View style={{flex: 1,marginTop:'auto'}}>
                            {this.renderFooter()}
                        </View> */}
                    </View>
                    {this.state.isModalVisible ? (
                        <SeriesModal
                            isModalVisible={this.state.isModalVisible}
                            closeModal={this.closeModal}
                        />
                    ) : (null)}
              
                
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
        headerSection:
        {
            flexDirection: 'column'
        },
            headerRowSection:
            {
                flex: 1,
                flexDirection: 'row',
               alignItems: 'center',
               justifyContent: 'space-evenly',
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
                    marginRight: 5
                },
                    quizName:
                    {
                      fontSize: 14 ,
                      fontWeight: '700' 
                    },
                pauseBtnView:
                {
                    backgroundColor: 'pink',
                    borderRadius: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingRight:3,
                    flexDirection: 'row',
                },
                menuIcon:{ 
                        marginLeft:10
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
            justifyContent: 'center'
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
                flex: 0.7,
                flexDirection: 'row',
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
                        justifyContent: 'space-evenly'
                    },
                        posMarksView:{
                            backgroundColor: 'green',
                            borderRadius: 7,
                            paddingRight: 17,
                            paddingLeft: 17,
                            marginRight: 3
                        },
                            tolMarksView:{
                                fontSize: 12,
                                color: theme.secondaryColor
                            },
                        negMarksView:{
                            backgroundColor: 'red',
                            borderRadius: 7,
                            paddingRight: 17,
                            paddingLeft: 17
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
                        justifyContent: 'center'
                    },
        quizQuestionView:{
            flexDirection: 'column',
            marginTop: 10
        },
            quizText:{
                fontSize: 16,
                color: theme.secondaryColor,
                textAlign: 'center'
            },
            optionView:{
                flex: 1,
                flexDirection: 'column',
            },
            optionRow:{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 10
            },
                singleOptionView:{
                    backgroundColor: theme.labelOrInactiveColor,
                    padding: 10,
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center'
                },
                    optionAns:{
                        height: 25,
                        width: 25,
                        borderRadius: 13,
                        backgroundColor: theme.greyColor,
                        marginRight: 10,
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