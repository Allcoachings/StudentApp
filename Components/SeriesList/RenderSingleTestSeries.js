import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions} from 'react-native';
import { theme, dataLimit, serverBaseUrl } from '../config';
import { Feather } from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import Instructions from './Instructions'
import Toast from 'react-native-simple-toast';

class RenderSingleTestSeries extends React.Component {
    state = {
        modalVisible: false,
    }

    closeModal = () =>{
        this.setState({modalVisible: false})                                                    
    }

    

    render(){
        return( 
            <View>
                {CardView(
                    <View style={styles.list}>
                        <View style={styles.topRow}>
                        <Text style={styles.queText}>{this.props.item.questionCount} Questions</Text>
                        <Text style={styles.timeText}>{this.props.item.timeDuration} Minutes</Text>
                        </View>
                        <View style={styles.bottomRow}>
                            <Text style={styles.titleText}>{this.props.item.title}</Text>
                            <TouchableOpacity style={styles.btnView} onPress={()=>{
                               
                               this.props.mode=="student"?(this.props.studentEnrolled?(
                                   <>
                                    {this.props.addToHistory("testSeries", this.props.item.id)}
                                    {this.setState({modalVisible: true})}
                                   </>
                                ):(Toast.show('You Have Not Enrolled For This Course.'))):(this.setState({modalVisible: true}))}}>
                                <Feather name="play" size={12} style={{color: theme.primaryColor, marginRight: 3}}/>
                                <Text style={styles.btnText}>Start</Text>
                            </TouchableOpacity>
                        </View>
                    </View>,{margin: 10, borderWidth: 1, borderRadius: 10, borderColor: theme.labelOrInactiveColor}
                    
                )}
                {this.state.modalVisible?(
                    <Instructions 
                        closeModal={this.closeModal} 
                        modalVisible={this.state.modalVisible}
                        item={this.props.item}
                        navigation={this.props.navigation}
                    />
                    
                ):(
                    null
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    list:
    {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
        topRow:
        {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
            queText:
            {
                fontSize: 16,
                color: theme.greyColor
            },
            timeText:
            { 
                fontSize: 16,
                color: theme.greyColor
            },
    bottomRow:
    {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
        titleText:
        {
            flex:0.95,
            fontSize: 18,
            color: theme.secondaryColor
        },
        btnView:
        {
            // borderWidth:1,
            flexDirection: 'row',
            backgroundColor: theme.accentColor,
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: 2,
            paddingBottom: 2,
            borderRadius: 3,
            justifyContent: 'space-between',
            alignItems: 'center'
        },
            btnText:
            {
                fontSize: 14,
                color: theme.primaryColor   
            }

})

export default RenderSingleTestSeries;