import React, { Component } from 'react';
import { View, Text,Modal,ScrollView,Platform,TouchableOpacity,ActivityIndicator,StyleSheet,TextInput } from 'react-native';
import {theme} from '../config'
import CardView from '../Utils/CardView';
import {addCourseTimetableItem} from '../Utils/DataHelper/Course'
import DateTimePicker from '@react-native-community/datetimepicker';
class AddItemModal extends Component { 
    state=
    {
        name:'',
        defaultDate:new Date(), 
        time:null,
        timePickerMode:'date',
        showTimePicker:false
    }

    setShow=(showTimePicker)=>
    {
        this.setState({showTimePicker});
    }
    setDate=(dateObject)=>
    {
        let month = (dateObject.getMonth()+1)
        if(month<10)
        {
            month = "0"+month;
        }
        let day = dateObject.getDate()
        if(day<10)
        {
            day = "0"+day;
        }
        let date  = day+"-"+month+"-"+dateObject.getFullYear();
        let dateReverse  = dateObject.getFullYear()+"-"+month+"-"+day;
        // console.log(date)
        this.setState({date,dateReverse});
    }
    setTime=(timeObject)=>
    {
        let hours = timeObject.getHours()
        let min = timeObject.getMinutes()
        if(hours<10)
        {
            hours = "0"+hours;
        }
        if(min<10)
        {
            min = "0"+min;
        }
        let time = hours+":"+min+":00"; 
        this.setState({time});
    }
    setMode=(mode)=>
    {
        this.setState({timePickerMode:mode});
    }
    onTimePickerChange = (event, selectedDate) => {

     
        const currentDate = selectedDate || this.state.date;
        this.setShow(Platform.OS === 'ios');
        if(this.state.timePickerMode=='date')
        {
            this.setDate(currentDate);
        }else
        {
            this.setTime(currentDate);
        }
            
    }
    showMode = (currentMode) => {
        this.setShow(true);
        this.setMode(currentMode);
      };

    showDatepicker = () => {
        this.showMode('date');
      };

    showTimepicker = () => {
        this.showMode('time');
      };
     
    handleAddItemCallBack=(reponse) =>
    {
            if(reponse.status ===201)
            {
                // console.log("created",reponse.headers.map.location)
                this.props.appendItems({title:this.state.title,subTitle:this.state.subTitle,date:this.state.date,time:this.state.time,subjectId:this.props.subjectId,id:reponse.headers.map.location})
                this.props.closeModal()
            }
            this.setState({addItemLoading:false})
    }
    handleAddItemClick=() =>
    {
        if(this.verify(this.state))
        {
            this.setState({addItemLoading:true})
            addCourseTimetableItem(this.state.title,this.state.subTitle,this.state.dateReverse,this.state.date,this.state.time,this.props.subjectId,this.props.insId,this.handleAddItemCallBack)
        }else
        {
            // console.log("empty filds")
        }
    }

    verify=({title,subTitle,date,time}) =>title&&subTitle&&date&&time

  render() {
      // console.log(this.props.subjectId)
    return (
        <Modal 
            animationType = {"fade"} 
            transparent = {false}
            visible = {this.props.isModalVisible}
            onRequestClose = {() => this.props.closeModal()}>
    
            <ScrollView>
                <View style={styles.headView}>
                    <Text style={styles.headText}>Add Video Item</Text>
                </View>
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Title</Text>
                         
                            <TextInput
                                placeholderTextColor={theme.greyColor}
                                placeholder="Title"
                                defaultValue={this.state.title}
                                onChangeText={(text)=>this.setState({title: text})}
                                style={styles.inputField}
                            /> 
                </View>
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Sub Title</Text>
                        
                            <TextInput
                                placeholderTextColor={theme.greyColor}
                                placeholder="Sub Title"
                                defaultValue={this.state.subTitle}
                                onChangeText={(text)=>this.setState({subTitle: text})}
                                style={styles.inputField}
                            /> 
                </View>
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Date</Text>
                        <View style={styles.inputView}> 
                            <TouchableOpacity style={styles.submitButton} onPress={this.showDatepicker}>
                                <Text style={styles.submitButtonText}>Choose Date</Text>
                            </TouchableOpacity>
                            {/* <Text style={{fontFamily: 'Raleway_600SemiBold'}}>{this.state.date}</Text> */}
                        </View>
                         
                            {/* <TextInput
                                placeholderTextColor={theme.greyColor}
                                placeholder="Date"
                                defaultValue={this.state.date}
                                onChangeText={(text)=>this.setState({date: text})}
                                style={styles.inputField}
                            />  */}
                </View>
                <View style={styles.inputView}>
                        <Text style={styles.labelText}>Time</Text>


                        <View style={styles.inputView}> 
                            <TouchableOpacity style={styles.submitButton} onPress={this.showTimepicker}>
                                <Text style={styles.submitButtonText}>Choose Time</Text>
                            </TouchableOpacity>
                            {/* <Text style={{fontFamily: 'Raleway_600SemiBold'}}>{this.state.time}</Text> */}
                        </View>
                       
                            {/* <TextInput
                                placeholderTextColor={theme.greyColor}
                                placeholder="Time"
                                defaultValue={this.state.time}
                                onChangeText={(text)=>this.setState({time: text})}
                                style={styles.inputField}
                            />  */}
                </View>
                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.submitButton} onPress={this.handleAddItemClick}>
                          {this.state.addItemLoading?
                          (
                            <ActivityIndicator color={theme.primaryColor} size={"large"}/>
                          ):( 
                               <Text style={styles.submitButtonText}>Submit</Text>
                            )}
                    </TouchableOpacity> 
                </View>
            </ScrollView>
   
            {this.state.showTimePicker && (
                <DateTimePicker
                testID="dateTimePicker"
                value={this.state.defaultDate}
                mode={this.state.timePickerMode}
                is24Hour={true}
                display="default"
                onChange={this.onTimePickerChange}
                />
            )}
    </Modal>

    );
  }
}

const styles = StyleSheet.create({
    headView:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
        headText:
        {
            marginTop:10,
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.secondaryColor
        },
        inputView: {
            marginTop:'5%',
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 10, 
        },
            labelText: {
                 
                fontSize: 18,
                fontFamily: 'Raleway_600SemiBold',
                color: theme.secondaryColor,
                marginBottom: 10,
            },
            inputField:
            {
                borderRadius: 10,
                padding: 10,
                margin:10,
                borderWidth: 1,
                fontFamily: 'Raleway_600SemiBold',
                borderColor:theme.labelOrInactiveColor, 
            },
    btnView:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
        submitButton:
        {
            borderRadius: 10,
            backgroundColor:theme.accentColor,
            padding: 10,
            marginRight:10
        },
            submitButtonText:
            {
                color: theme.primaryColor
            },
        addMoreButton:
        {
            borderRadius: 10,
            backgroundColor:theme.addMoreButtonColor,
            padding: 10,
            marginLeft: 10
        },
            addMoreButtonText:
            {
                color: theme.primaryColor
            },


    // add course css end
})
export default AddItemModal;
