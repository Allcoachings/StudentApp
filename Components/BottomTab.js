import { Feather } from '@expo/vector-icons';
import React from 'react';
// import BottomNavigation, {
//     FullTab
// } from 'react-native-material-bottom-navigation'
import { theme } from './config';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, View,StyleSheet,TouchableOpacity, FlatList} from 'react-native';
import CardView from './Utils/CardView'
import {setActiveBottomTab} from './Actions'
import { connect } from 'react-redux'
class BottomTab extends React.Component {
    tabs = [
    {
      key: 'Home',
      icon: 'compass',
      label: 'Explore',
      barColor: theme.primaryColor,
      pressColor: 'rgba(255, 255, 255, 0.16)',
      params:{}
    },
    {
      key: "TestSeries",
      icon: 'file-text',
      label: 'Test Series',
      barColor: theme.primaryColor,
      pressColor: 'rgba(255, 255, 255, 0.16)',
      params:{}
    },
    {
      key: "Subscription",
      icon: 'youtube',
      label: 'Followings',
      barColor: theme.primaryColor,
      pressColor: 'rgba(255, 255, 255, 0.16)',
      params:{}
    },
    {
      key: "Feed",
      icon: 'bell',
      label: 'Feed',
      barColor: theme.primaryColor,
      pressColor: 'rgba(255, 255, 255, 0.16)',
      params:{item: false}
    }
  ]
 
  state = {
    activeTab: 'explore'
  }
 
  renderIcon = icon => (isActive) => (
    <Feather size={24} color={isActive?theme.accentColor:theme.secondaryColor} name={icon} />
  )
 
//   renderTab = ({ tab, isActive }) => (
//     <FullTab
//       isActive={isActive}
//       key={tab.key}
//       label={tab.label}
//       labelStyle={{color: isActive?theme.accentColor:theme.secondaryColor}}
//       renderIcon={this.renderIcon(tab.icon)}
//     />
//   )

    clickHandler=(key, params)=>{
      this.setState({activeTab:key})
      this.props.stackNavigation.navigate(key, params)
      this.props.setActiveBottomTab(key)
    }
 
    renderTab=(tab,isActive)=>
    {
         
        return (
                
                <TouchableOpacity style={styles.TabContainer} onPress={()=>(this.clickHandler(tab.key, tab.params))}>
                        <Feather size={24} color={isActive?theme.accentColor:theme.secondaryColor} name={tab.icon} />
                    <Text style={{color: isActive?theme.accentColor:theme.secondaryColor,fontSize:12}}>{tab.label}</Text>
                </TouchableOpacity>
                
            
        )
    }

  render() { 
    console.log("bottom tab value:",this.props.activeBottomTab)      
    return ( 
     
        <View style={styles.container}>
            {CardView(

              this.props.replacBottomTab?(
                      this.props.bottomComponent
                ):(
                  <FlatList 
                      data={this.tabs} 
                      renderItem={({item})=>this.renderTab(item,this.props.activeBottomTab==item.key)}
                      keyExtractor={(item)=>item.key} 
                      numColumns={this.tabs.length}
                      columnWrapperStyle={{justifyContent:'space-between',flexDirection:'row'}}
                      />),
                      [{marginTop:'auto',paddingTop:10,width:'100%',paddingLeft:10,paddingRight:10,paddingBottom:5 ,     borderTopWidth:1, 
                      borderTopColor:theme.labelOrInactiveColor,},this.props.bottomComponentStyle]
                  )}
        </View>
       
    )
  }

}
const styles = StyleSheet.create({
    container: { 
        flex:1,  
        
    },
        TabContainer:
        {
            justifyContent: 'center',
            flexDirection:'column',
            alignItems: 'center' 
        },

})
const mapStateToProps =(state) =>
{
    return {
       stackNavigation:state.layout.stackNavigation,
       activeBottomTab:state.screen.activeBottomTab
    }
}
export default connect(mapStateToProps,{setActiveBottomTab})(BottomTab);