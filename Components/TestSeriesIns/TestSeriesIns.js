import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, TouchableWithoutFeedback, RefreshControl} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {insTestSeries} from '../../FakeDataService/FakeData'
import { theme, dataLimit,serverBaseUrl, Assets,imageProvider } from '../config';
import { EvilIconsns, Feather } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Redirect } from 'react-router';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import { fetch_testSeries_category, fetch_testSeries_subcategoryByCategory } from '../Utils/DataHelper/TestSeries'
import {SearchTestSeries} from '../Utils/DataHelper/Search'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import { fetch_Banners } from '../Utils/DataHelper/Banners';
import SingleTestSeriesItem from './SingleTestSeriesItem';
import SingleTestSeriesItemSearch from './SingleTestSeriesItemSearch';
class TestSeriesIns extends React.Component {
    state = { 
        offset: 0,
        testSeries: [],
        category:'',
        tsLoading: true,
        banner:[],
        refreshing: false
     }

    componentDidMount() {
        this.initialFetch()
    }

    initialFetch=() => {
        fetch_testSeries_category(this.state.offset, dataLimit, this.testSeriesCallBack)
        fetch_Banners("test", this.bannerCallback)
    }

    subCategoryByCategoryId=()=>{
        fetch_testSeries_subcategoryByCategory()
    }

    testSeriesCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                // console.log("Success cat", data)
                this.setState({tsLoading: false, testSeries: data, category: data[0]&&data[0].categoryName})
            })
        }
        else
        {
            // console.log("something went wrong")
        }
    }

    search=(offset, search, callback)=>{
        SearchTestSeries(search, offset, dataLimit, callback)
    }

    singleItem=({item})=>{
       return(
            <SingleTestSeriesItem
                item={item}
                navigation={this.props.navigation}
                category={this.state.category}
             />
       )
    }
    singleItemSearch=(item,closeModal)=>{
       return(
            <SingleTestSeriesItemSearch
                item={item}
                navigation={this.props.navigation}
                category={this.state.category}
                closeModal={closeModal}
             />
       )
    }


    singleRow=({item})=>
    {
        // console.log(item)
        return(
        <View style={styles.singleRow}>
            <View style={styles.rowHeader}>
               <Text style={styles.rowHeadText}>{item.categoryName}</Text> 
               <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("AdminTestSubCategoryList",{type:item.categoryName,id:item.categoryId})}}>
                <Feather name="arrow-right" size={20} />
               </TouchableWithoutFeedback>
            </View>
            <View style={styles.rowBody}>
                
                    <FlatList 
                        data={item.subCategories} 
                        renderItem={this.singleItem} 
                        keyExtractor={(item)=>item.id}
                        horizontal={true} 
                        showsHorizontalScrollIndicator={false}
                    />
            </View>
        </View>)
    }
    
    singleRowSearch=(item,closeModal)=>
    {

        console.log(item)
        return(
        <View>
            {/* <View style={styles.rowHeader}>
               <Text style={styles.rowHeadText}>{item.categoryName}</Text> 
               <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate("AdminTestSubCategoryList",{type:item.categoryName,id:item.categoryId})}}>
                <Feather name="arrow-right" size={20} />
               </TouchableWithoutFeedback>
            </View> */}
            <View> 
                    <FlatList 
                        data={item.subCategories} 
                        renderItem={({item})=>this.singleItemSearch(item,closeModal)} 
                        keyExtractor={(item)=>item.id} 
                        showsHorizontalScrollIndicator={false}
                    />
            </View>
        </View>)
    }
    bannerCallback=(response)=>
    {
        if(response.status==200)
        {
            response.json().then(data=>
            {
                // console.log("data",data);
                this.setState({banner: data})
            })
        }
        else
        {
            // console.log("something went wrong", response.status)
        }
        this.setState({refreshing:false})
    }
    renderBannerList=({item})=>
    {
       
        return(
            <TouchableOpacity style={styles.bannerItemContainer}>
                    <Image source={{uri: imageProvider(item.bannerImageLink)}} style={[styles.bannerImage,{ width:this.props.screenWidth-20    }]}/>
            </TouchableOpacity>
        )
    }

    toggleCatMode=(mode,item)=>
    {
        switch(mode)
        {
            case true:
                this.setState({catMode:mode,catid:item.id,loadingData:true,},()=>
                {
                    // fetch_coachingByCategoryAndStatus(this.state.catid,1,this.state.offset,dataLimit,this.coachingCallBack)
                })
                break;
            case false:
                this.setState({catMode:false})
            break;
        }
        
    }

    refreshing=()=>{
        this.setState({refreshing:true});
        this.initialFetch();

    }

    render() {
        
        return (
            <PageStructure 
                userIcon={() => {this.props.navigation.navigate("Profile")}}
                catInHeader={true} 
                selectedCat={this.state.selectedCat}
                rightIconOnPress={() =>this.props.navigation.navigate("Notification")}
                scrollMode={'scroll'}
                navigation={this.props.navigation} 
                titleWithImage={true}
                searchFun={this.search}
                singleItem={this.singleRowSearch}
                rowListing
                titleonheader={"All Coaching"} 
                catOnpress={this.toggleCatMode}

            >
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} 
                        onRefresh={this.refreshing} />
                    }
                    style={{flex: 1}}
                >
                    <View style={styles.container}> 
                    {this.state.catMode?(
                        this.state.tsLoading?(
                            <CustomActivtiyIndicator mode="testSeries"/>
                        ):(
                            <View>
                                
                                <FlatList 
                                    data={this.state.catTestSeries}  
                                    showsVerticalScrollIndicator={false} 
                                    renderItem={this.singleItem}
                                    numColumns={3}
                                    keyExtractor={item => item.id}
                                    ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                                    key="testseriesgrid"
                                />
                            </View>
                            )
                        ):(
                            <>
                                {this.state.banner.length>0?(
                                    <View style={styles.rowContainer}>
                                        <FlatList 
                                            data={this.state.banner} 
                                            renderItem={this.renderBannerList} 
                                            keyExtractor={(item)=>item.id}
                                            horizontal={true} 
                                            showsHorizontalScrollIndicator={false}
                                            ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                                        />       
                                    </View>
                                ):(null)}
                        
                                {this.state.tsLoading?(
                                    <CustomActivtiyIndicator mode="testSeries"/>
                                ):(
                                    <FlatList 
                                        data={this.state.testSeries} 
                                        renderItem={this.singleRow} 
                                        keyExtractor={(item)=>item.id}
                                        showsVerticalScrollIndicator={false} 
                                        ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                                    />
                                )}
                            </>
                        )}
                    </View> 
                </ScrollView>
           </PageStructure>
        );
    }
}
 
const styles = StyleSheet.create({
    container:
    {
        marginTop:10,
        flex: 1,
        flexDirection: 'column',
    },
        singleRow:
        {
            marginBottom:15 , 
        },
            rowHeader:
            {
                display:'flex', 
                flexDirection: 'row',  
                marginLeft: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
            },
                rowHeadText:
                {
                    
                    fontSize: 20, 
                    fontFamily: 'Raleway_700Bold',
                },
            rowBody:
            {
                marginTop: 10
            },  
                singleItem:
                {
                    padding: 10,
                    display:'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 8
                }, 
                    imageView:
                    {
                        
                    } ,
                        itemImage:
                        {
                            height: 40,
                            width:60, 
                            borderRadius:5,
                            resizeMode:'contain'
                        },
                    titleView:
                    {
                    
                    }, 
                        itemTitle:
                        {
                            fontSize: 12, 
                            padding: 2, 
                            fontWeight: '700', 
                            color: theme.secondaryColor,
                            textAlign: 'center'
                        },
                    countView:
                    {

                    },
                        itemCount: 
                        {
                            fontSize: 10,
                            // padding: 4, 
                            color: theme.secondaryColor
                        },
                    btnView:
                    { 
                        borderRadius: 2, 
                        margin: 3, 
                        backgroundColor: theme.secondaryColor
                    },
                        cardButton:
                        {
                            fontSize: 8, 
                            padding: 5, 
                            marginLeft: 3, 
                            marginRight: 3, 
                            color: theme.primaryColor,
                            flexShrink: 1
                        } ,


                        rowContainer: {
                            marginBottom: 10
                        },
                            bannerItemContainer:
                            {
                                height:140,
                                marginTop:10,
                            },
                                bannerImage:
                                {
                                   
                                    height:125,
                                    borderRadius:10,
                                    marginRight:10, 
                                     
                                },
})

const mapStateToProps = (state)=>{
    return {
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(TestSeriesIns);