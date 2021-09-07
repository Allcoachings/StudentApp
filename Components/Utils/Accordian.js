import { Feather } from '@expo/vector-icons';
import React, { Component } from 'react';
import { View, StyleSheet,TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';
import CardView from './CardView';
import { theme } from '../config'
const width = Dimensions.get('window').width
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
                  <View style={{flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{justifyContent: 'center'}}>
                      {this.props.header}
                    </View>
                    {this.props.hideIcon?(
                      null
                    ):(
                      <View >
                        <Feather name={this.state.isContentVisible?"chevron-up":"chevron-down"} size={20} />
                      </View>
                    )}
                    
                  </View> 
              </TouchableWithoutFeedback>
          </View>
          {this.state.isContentVisible?(
              this.props.children
          ):(null)}
        </View>,
        {
            width: width-width*0.05,
            borderWidth: 0.5,
            borderColor: theme.greyColor,
            marginVertical: 5
        })
    );
  }
}
const styles = StyleSheet.create({
    container:
    {
        
    },
        accordianHeader:
        {
            alignItems: 'center',
        }

});
export default Accordian