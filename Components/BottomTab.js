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
import { connect } from 'react-redux'
class BottomTab extends React.Component {
    tabs = [
    {
      key: 'explore',
      icon: 'compass',
      label: 'Explore',
      barColor: theme.primaryColor,
      pressColor: 'rgba(255, 255, 255, 0.16)',
      onPress: "() =>"
    },
    {
      key: 'test-series',
      icon: 'file-text',
      label: 'Test Series',
      barColor: theme.primaryColor,
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'following',
      icon: 'youtube',
      label: 'Following',
      barColor: theme.primaryColor,
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'feed',
      icon: 'bell',
      label: 'Feed',
      barColor: theme.primaryColor,
      pressColor: 'rgba(255, 255, 255, 0.16)'
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

    clickHandler=(key)=>{
      this.setState({activeTab:key})
      this.props.navigation.navigate("ViewInsTestSeriesList")
    }
 
    renderTab=(tab,isActive)=>
    {
         
        return (
                
                <TouchableOpacity style={styles.TabContainer} onPress={()=>(this.clickHandler(tab.key))}>
                        <Feather size={24} color={isActive?theme.accentColor:theme.secondaryColor} name={tab.icon} />
                    <Text style={{color: isActive?theme.accentColor:theme.secondaryColor,fontSize:12}}>{tab.label}</Text>
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
                      renderItem={({item})=>this.renderTab(item,this.state.activeTab==item.key)}
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
       stackNavigation:state.layout.stackNavigation
    }
}
export default connect(mapStateToProps)(BottomTab);