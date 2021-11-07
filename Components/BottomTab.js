import { EvilIcons,MaterialCommunityIcons,MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
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
      activeIcon: <MaterialCommunityIcons size={22} name='home-variant'/>,
      normalIcon: <SimpleLineIcons size={20} name='home' />,
      label: this.props.mode=="student"?('Explore'):('Home'),
      barColor: theme.primaryColor,
      pressColor: 'rgba(255, 255, 255, 0.16)',
      params:{}
    },
    {
      key: this.props.mode=="student"?("TestSeries"):("Revenue"),
      activeIcon: <MaterialCommunityIcons size={22} name='file-document'/>,
      normalIcon: <SimpleLineIcons size={20} name='doc' />,
      label: this.props.mode=="student"?('Test Series'):('Revenue'),
      barColor: theme.primaryColor,
      pressColor: 'rgba(255, 255, 255, 0.16)',
      params:{}
    },
    {
      key: this.props.mode=="student"?("Subscription"):("Notification"),
      activeIcon: <MaterialCommunityIcons size={27} name='youtube'/>,
      normalIcon: <SimpleLineIcons size={25} name='social-youtube' />,
      label: this.props.mode=="student"?('Followings'):('Notifications'),
      barColor: theme.primaryColor,
      pressColor: 'rgba(255, 255, 255, 0.16)',
      params:this.props.mode=="student"?({}):({mode: 'institute'})
    },
    {
      key: "Feed",
      normalIcon: <EvilIcons size={27} name="bell"/>,
      activeIcon: <MaterialIcons size={25} name="notifications"/>,
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
    <EvilIcons size={24} color={isActive?theme.accentColor:theme.secondaryColor} name={icon} />
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
                    {isActive?(
                      tab.activeIcon
                    ):(
                      tab.normalIcon
                    )}
                    <Text style={[{color: theme.secondaryColor,fontSize:12},tab.label=="Followings"?{paddingBottom:5}:{}]}>{tab.label}</Text>
                </TouchableOpacity>
                
            
        )
    }

  render() { 
         
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
                      [{marginTop:'auto',width:'100%',paddingLeft:10,paddingRight:10,paddingBottom:5 ,     borderTopWidth:1, 
                      borderTopColor:theme.labelOrInactiveColor},this.props.bottomComponentStyle]
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