import React from 'react';
import {connect} from 'react-redux'
import {screenMobileWidth} from '../../config'
import HeaderMobile from './HeaderMobile';
import HeaderWeb from './HeaderWeb';
import { ScrollView, View,StyleSheet,FlatList,TouchableOpacity,Text } from 'react-native';
import CardView from '../../Utils/CardView';
import {fetch_categories_normalized} from '../../Utils/DataHelper/Categories';
import {theme} from '../../config'
import {tabListInstitute} from '../../../FakeDataService/FakeData'
import {setCategories,showCategoriesInHeader} from '../../Actions/'
class index extends React.Component {
    state = { 
        activeTab: this.props.selectedCat||-1,
        tabListInstitute:[],
        activeTabIndex:0
    }
    flatListRef=null
    componentDidMount=()=>{ 
        if(this.props.catType)
        {
          
            fetch_categories_normalized(this.props.catType,this.categoriesCallBack)
        }  
        else
        {
            
            fetch_categories_normalized('main',(response)=>this.categoriesCallBack(response,true))
        }  
    }

    categoriesCallBack=(response,isMain)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
             
                if(isMain)
                {
                    let obj = {icon:'',name:'All',sortOrder:1,id:-1}
                    data.unshift(obj) 
                    this.props.setCategories(data)
                } 
                this.setState({tabListInstitute:data,activeTab:this.props.selectedCat||-1});                   
            })
        }
    }

    handleCatPress=(item,index)=>
    {
        
        if(index > this.state.activeTabIndex)
        {
            this.scrollForward()
        }else if(index < this.state.activeTabIndex)
        {
            this.scrollBackward()
        }
        if(item.id==-1)
        {
            this.props.catOnpress(false)
        }else
        {
            this.props.catOnpress(true,item)
        }
        this.setState({activeTab:item.id,activeTabIndex:index})
        
    }
    scrollForward = () => {
        if(this.flatListRef)
        {
            this.flatListRef.scrollToIndex({ animated: true, index: 0 });
        }
        
    };
  
    scrollBackward = () => {
        if(this.flatListRef)
        {
            this.flatListRef.scrollToIndex({animated: true, index: 1});
        }
        
    };
    renderTabItems=({item,index})=>
    {
        return (
            <TouchableOpacity style={[styles.courseItemContainer,this.state.activeTab==item.id?({backgroundColor:theme.secondaryColor+'A8',borderColor:theme.secondaryColor+'CC'}):({backgroundColor:theme.labelOrInactiveColor+'4D',borderColor:theme.labelOrInactiveColor})]} onPress={()=>this.handleCatPress(item)}> 
                    <Text style={[styles.courseTitle,this.state.activeTab==item.id?({color:theme.primaryColor}):({color:theme.secondaryColor})]}>{item.name}</Text>
            </TouchableOpacity>
        );
    }
    
    render() {
        return (
            <ScrollView
                onScroll={this.handleScroll}
            >
            
                    <View style={styles.container}>
                        {/* <View style={styles.headerRow}> */}
                            
                                {/* <HeaderMobile iconName={this.props.iconName}
                                    titleonheader={this.props.titleonheader} 
                                    replaceHeader={this.props.replaceHeader} 
                                    headerComponent={this.props.headerComponent} 
                                    btnHandler={this.props.btnHandler} 
                                    notificationreplaceshare={this.props.notificationreplaceshare} 
                                    rightIconOnPress={this.props.rightIconOnPress}
                                    nosearchIcon={this.props.nosearchIcon}
                                    noNotificationIcon={this.props.noNotificationIcon}
                                    searchFun={this.props.searchFun}
                                    singleItem={this.props.singleItem}
                                    catInHeader={this.props.catInHeader}
                                    selectedCat={this.props.selectedCat}
                                    titleWithImage={this.props.titleWithImage}
                                    userIcon={this.props.userIcon}
                                    pinIconName={this.props.pinIconName}
                                    pinUnpinIcon={this.props.pinUnpinIcon}
                                    searchReplace={this.props.searchReplace}
                                    showShareIcon={this.props.showShareIcon}
                                    pinUnpinFunction={this.props.pinUnpinFunction}
                                    showTitle={this.props.showTitle}
                                /> */}
                             
                        {/* </View> */}
                        {this.props.catInHeader&&this.state.tabListInstitute.length?( 
                            <View style={[styles.catRow, this.props.catStyle]}> 
                                <FlatList 
                                    data={this.state.tabListInstitute} 
                                    renderItem={this.renderTabItems}
                                    keyExtractor={(item)=>item.id} 
                                    horizontal={true}
                                    ref={ref=>this.flatListRef=ref}
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
            
             
            padding:5,
            // borderTopWidth:0.5,
            // borderTopColor:theme.labelOrInactiveColor
        },
            courseItemContainer:
            {  
                paddingLeft:10,
                paddingRight:10, 
                marginRight:10,
                padding:5,
                 alignItems: "center",
                borderWidth:0.7, 
                borderColor:theme.labelOrInactiveColor,
                borderRadius:15
            },
                courseTitle:
                {
                    fontSize:14,  
                    // fontFamily: 'Raleway_400Regular',

                },
})
const mapStateToProps = (state)=>
{
    return{
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps,{setCategories,showCategoriesInHeader})(index);