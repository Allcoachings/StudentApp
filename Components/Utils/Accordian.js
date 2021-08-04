import React, { Component } from 'react';
import { View, StyleSheet,TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

 class Accordian extends Component {
 
   state = {
       isContentVisible: false
    };
    
    accordionOnPress=()=>{
      this.setState({ isContentVisible:!this.state.isContentVisible})
      if(this.props.onPress)
      {
        this.props.onPress();
      }
    }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.accordianHeader}>
            <TouchableWithoutFeedback   onPress={()=>this.accordionOnPress()}>
                <View>
                  {this.props.header}
                </View> 
            </TouchableWithoutFeedback>
        </View>
        {this.state.isContentVisible?(
            this.props.children
        ):(null)}
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container:
    {
        width:'100%',
        // backgroundColor: "#000"
    },
        accordianHeader:
        {
            width:'100%',
            alignItems: 'center'
        }

});
export default Accordian