import React from 'react';
import {connect} from 'react-redux'
import {screenMobileWidth} from '../../config'
import HeaderMobile from './HeaderMobile';
import HeaderWeb from './HeaderWeb';
import { ScrollView, View,StyleSheet,FlatList,TouchableOpacity,Text } from 'react-native';
import CardView from '../../Utils/CardView';
import {theme} from '../../config'
import {tabListInstitute} from '../../../FakeDataService/FakeData'
class index extends React.Component {
    state = { 
        activeTab: 1
     }

    renderTabItems=({item})=>
    {
        return (
            <TouchableOpacity style={[styles.courseItemContainer]} onPress={()=>this.setState({activeTab:item.id})}> 
                    <Text style={[styles.courseTitle,this.state.activeTab==item.id?({color:theme.accentColor}):({color:theme.greyColor})]}>{item.name}</Text>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <ScrollView>
            
                    <View style={styles.container}>
                        <View style={styles.headerRow}>
                            {this.props.screenWidth<=screenMobileWidth?
                            (
                                <HeaderMobile iconName={this.props.iconName}
                                titleonheader={this.props.titleonheader} 
                                replaceHeader={this.props.replaceHeader} 
                                headerComponent={this.props.headerComponent} 
                                btnHandler={this.props.btnHandler} 
                                notificationreplaceshare={this.props.notificationreplaceshare} />
                            )
                            :
                            (
                                <HeaderWeb/>
                            )}
                        </View>
                        {this.props.catInHeader?( 
                            <View style={styles.catRow}> 
                                <FlatList 
                                    data={tabListInstitute} 
                                    renderItem={this.renderTabItems}
                                    keyExtractor={(item)=>item.id} 
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                /> 
                            </View>
                        ):(null)} 
                    </View> 
                   
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

    container:
    {
        flex:1,
        flexDirection: 'column',
        margin:3, 
    },
        headerRow:
        {
            flexDirection: 'row',
            
        },
        catRow:{
            borderTopWidth:0.2,
            // borderBottomColor:theme.labelOrInactiveColor
        },
            courseItemContainer:
            {  
                paddingLeft:10,
                paddingRight:10, 
                marginRight:10,
                padding:5,
                marginTop:5 ,
                borderWidth:1, 
                borderRadius:15
            },
                courseTitle:
                {
                    fontSize:15, 
                    color:theme.greyColor
                },
})
const mapStateToProps = (state)=>
{
    return{
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(index);