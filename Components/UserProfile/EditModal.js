import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Modal, TextInput} from 'react-native';
import { theme } from '../config';
import { EvilIcons } from '@expo/vector-icons';
import {connect } from 'react-redux'
import {singlequedata} from '../../FakeDataService/FakeData'
import CardView from '../Utils/CardView'

class EditModal extends React.Component {
  state = {
    modalVisible: true,
    
  };

    renderTextInput=(icon, placeholder, label)=>{
        return(
            CardView(
                <View>
                    <Text>{label}</Text>
                    <TextInput style={styles.inputField} placeholder={placeholder} placeholderTextColor={theme.secondaryColor}/>
                </View>
            ,{marginTop: 10, padding: 12, justifyContent: 'center'}
            )
        )
    }
   
  render() {
    const { isModalVisible,closeModal } = this.props;
    return (
        CardView(
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={closeModal}>
                <View style={[styles.centeredView, {width: this.props.screenWidth}]}>
                    <View style={styles.inputView}>
                            {this.renderTextInput('', 'Amit', 'First Name*')}
                    </View>
                    <View style={styles.inputView}>
                            {this.renderTextInput('', 'Kumar', 'Last Name*')}
                    </View>
                    <View style={styles.inputView}>
                            {this.renderTextInput('', '8924969862', 'Mobile Number*')}
                    </View>
                    <View style={styles.inputView}>
                            {this.renderTextInput('', '', 'Email*')}
                    </View>
                    <View style={styles.inputView}>
                            {this.renderTextInput('', 'AmitKumar-7376', 'User Name*')}
                    </View>

                    <View style={styles.saveBtnView}>
                        <TouchableOpacity style={styles.saveBtn}>
                            <Text style={styles.saveText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
          </Modal>)
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'column',
    height: '100%', 
    alignItems: 'center',
    backgroundColor: theme.primaryColor,
    borderWidth: 0.5,
    borderColor: theme.labelOrInactiveColor,
    marginTop: '15%'
  },
    inputView:
    {
        marginTop: 10
    },
        inputField:
        {
            fontSize: 18
        },
    saveBtnView:
    {
        marginTop: '10%'
    },
        saveBtn:
        {
            backgroundColor: theme.accentColor,
            borderRadius: 5
        },
            saveText:
            {
                fontSize: 24,
                color: theme.primaryColor,
                fontWeight: 'bold',
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 30,
                paddingRight: 30
            },
    
});

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(EditModal); 