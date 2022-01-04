import { EvilIcons } from '@expo/vector-icons';
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
      this.props.noCardView?(
        <View style={styles.container}>
          <View>
              <TouchableWithoutFeedback   onPress={()=>this.accordionOnPress()}>
                  <View style={{flexDirection: 'row', width: '100%'}}>
                    {this.props.hideIcon?(
                      null
                    ):(
                      <View style={{width: '10%'}}>
                        <EvilIcons name={this.state.isContentVisible?"chevron-up":"chevron-down"} size={24} />
                      </View>
                    )}
                    <View style={{width: '80%'}}>
                      {this.props.header}
                    </View>
                    
                    
                  </View> 
              </TouchableWithoutFeedback>
          </View>
          {this.state.isContentVisible?(
              this.props.children
          ):(null)}
        </View>
      ):(
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
                          <EvilIcons name={this.state.isContentVisible?"chevron-up":"chevron-down"} size={20} />
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
      )
    )
  }
}
const styles = StyleSheet.create({
    container:
    {
        flex: 1
    },
        accordianHeader:
        {
            alignItems: 'center',
        }

});
export default Accordian