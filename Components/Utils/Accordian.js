import { Feather } from '@expo/vector-icons';
import React, { Component } from 'react';
import { View, StyleSheet,TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import CardView from './CardView';

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

      CardView(
        <View style={styles.container}>
          <View style={styles.accordianHeader}>
              <TouchableWithoutFeedback   onPress={()=>this.accordionOnPress()}>
                  <View style={{flexDirection: 'row',marginHorizontal:10,marginTop:10}}>
                    <View>
                      {this.props.header}
                    </View>
                    <View >
                      <Feather name={this.state.isContentVisible?"chevron-up":"chevron-down"} size={20} />
                    </View>
                  </View> 
              </TouchableWithoutFeedback>
          </View>
          {this.state.isContentVisible?(
              this.props.children
          ):(null)}
        </View>,
        {
            width:'95%', 
            padding:5,
            margin:5,
           
        })
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