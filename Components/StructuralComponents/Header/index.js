import React from 'react';
import {connect} from 'react-redux'
import {screenMobileWidth} from '../../config'
import HeaderMobile from './HeaderMobile';
import HeaderWeb from './HeaderWeb';
import { ScrollView, View,StyleSheet,FlatList,TouchableOpacity,Text } from 'react-native';
import CardView from '../../Utils/CardView';
import {fetch_categories} from '../../Utils/DataHelper/Categories';
import {theme} from '../../config'
import {tabListInstitute} from '../../../FakeDataService/FakeData'
class index extends React.Component {
    state = { 
        activeTab: 1,
        tabListInstitute:[]
     }

    componentDidMount=()=>{
        console.log("heeeeeeeeeeeeelllllllllllllllooooooooooooo")
        fetch_categories(this.categoriesCallBack)
    }

    categoriesCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                this.setState({tabListInstitute:data});                   
            })
        }
    }

    renderTabItems=({item})=>
    {
        return (
            <TouchableOpacity style={[styles.courseItemContainer,this.state.activeTab==item.key?({backgroundColor:theme.secondaryColor,borderColor:theme.accentColor+'4D'}):({backgroundColor:theme.labelOrInactiveColor+'4D',borderColor:theme.labelOrInactiveColor})]} onPress={()=>this.setState({activeTab:item.key})}> 
                    <Text style={[styles.courseTitle,this.state.activeTab==item.key?({color:theme.primaryColor}):({color:theme.greyColor})]}>{item.label}</Text>
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
                                notificationreplaceshare={this.props.notificationreplaceshare} 
                                rightIconOnPress={this.props.rightIconOnPress}
                                nosearchIcon={this.props.nosearchIcon}
                                noNotificationIcon={this.props.noNotificationIcon}

                                />
                            )
                            :
                            (
                                <HeaderWeb/>
                            )}
                        </View>
                        {this.props.catInHeader?( 
                            <View style={[styles.catRow, this.props.catStyle]}> 
                                <FlatList 
                                    data={this.state.tabListInstitute} 
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
        // margin:3, 
    },
        headerRow:
        {
            flexDirection: 'row',
            
        },
        catRow:{
            
            paddingTop:5,
            paddingBottom:10,
            borderTopWidth:1,
            borderTopColor:theme.labelOrInactiveColor
        },
            courseItemContainer:
            {  
                paddingLeft:10,
                paddingRight:10, 
                marginRight:10,
                padding:2,
                marginTop:5 ,
                borderWidth:1, 
                borderColor:theme.labelOrInactiveColor,
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