import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, TouchableWithoutFeedback, RefreshControl} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {insTestSeries} from '../../FakeDataService/FakeData'
import { theme, dataLimit,serverBaseUrl, Assets, imageProvider } from '../config';
import { EvilIcons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Redirect } from 'react-router';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import { fetchTestSeriesBySubCategory } from '../Utils/DataHelper/TestSeries'
import { fetch_Banners } from '../Utils/DataHelper/Banners'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import { SearchInstituteByCategory } from '../Utils/DataHelper/Search';
class InsTestSeriesList extends React.Component {

    state={
        id: this.props.route.params.id,
        subCat: [],
        offset: 0,
        tsLoading: true,
        banner:[
            {
                id: '1',
                image: { uri: 'https://picsum.photos/200/300' },
                clickHandler: () => { },

            },
            {
                id: '3',
                image: { uri: 'https://picsum.photos/200/300' },
                clickHandler: () => { },
            },
            {
                id: '4',
                image: { uri: 'https://picsum.photos/200/300' },
                clickHandler: () => { },
            },
            {
                id: '5',
                image: { uri: 'https://picsum.photos/200/300' },
                clickHandler: () => { },
            },
            {
                id: '6',
                image: { uri: 'https://picsum.photos/200/300' },
                clickHandler: () => { },
            },
        ],
        refreshing: false,
    }

    componentDidMount(){
        this.initialFetch()
    }

    initialFetch=() => {
        fetchTestSeriesBySubCategory(this.state.id, this.state.offset, dataLimit,this.SubCatTestSeriesCallback)
        fetch_Banners("test", this.bannerCallback)
    }

    updateComponent=()=>
    {
        if(this.props.route.params.id!=this.state.id)
        {
            this.setState({
             id:this.props.route.params.id, 
             offset:0
        },()=>
            {
                fetchTestSeriesBySubCategory(this.state.id, this.state.offset, dataLimit,this.SubCatTestSeriesCallback)
            })
        }
    }
    
    SubCatTestSeriesCallback=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                this.setState({subCat: data, tsLoading:false})
            })
        }
        else
        {
            // console.log("something went wrong")
        }
        this.setState({refreshing: false})
    }
    bannerCallback=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                // console.log(data);
                this.setState({banner: data})
            })
        }
        else
        {
            // console.log("something went wrong", response.status)
        }
        this.setState({refreshing: false})
    }
    renderBannerList=({item})=>
    {
        // console.log(imageProvider(item.bannerImageLink))
        return(
            <TouchableOpacity style={styles.bannerItemContainer}>
                    <Image source={{uri: imageProvider(item.bannerImageLink)}} style={[styles.bannerImage,{width:this.props.screenWidth-20}]}/>
            </TouchableOpacity  >
        )
    }

    renderSeries=({item})=>{  
        return(
            <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate("SeriesList", {id: item.id, catName: item.name, image: item.image})}>
                <View style={{flexDirection: 'row',alignItems: 'center',marginBottom: 10,marginTop: 10}}>
                    {CardView( 
                        <Image source={{uri: imageProvider(item.image)}} style={styles.itemImage}/>
                    ,{width:120,height:120,borderRadius:15,borderColor: theme.labelOrInactiveColor,borderWidth:1,alignItems: 'center',justifyContent: 'center'},5
                    )}
                    <View style={{marginLeft:10,alignItems: 'center'}}>
                        <View style={styles.titleView}>
                            <Text numberOfLines={2} style={styles.itemTitle}>{item.name}</Text>
                        </View>
                        <View style={styles.countView}>
                            {/* <Text style={styles.itemCount}>{item.count}</Text> */}
                            <Text style={styles.itemCount}>10 Question Paper</Text>
                        </View>
                    </View>
                    
                </View>
            </TouchableWithoutFeedback>
        )
    }

    refreshing=()=>{
        this.setState({refreshing:true});
        this.initialFetch();

    }
    
    render() {
        this.updateComponent()
        return(
            <PageStructure
                iconName={"arrow-left"}
                btnHandler={() => {this.props.navigation.goBack()}} 
                titleonheader={this.props.route.params.catName}
                notificationreplaceshare={"share-2"}
                navigation={this.props.navigation}
                nosearchIcon={true}
                
                // catInHeader={false}
                
                noNotificationIcon={true} 
            >
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} 
                        onRefresh={this.refreshing} />
                    }
                    style={{flex: 1}}
                >
                    {/* <View style={styles.headTitleView}>
                        <Text></Text>
                        <Text style={styles.title}>UPSC CSE</Text>
                        <EvilIcons name="share-2" size={18} style={{marginRight: 10}}/>
                    </View> */}
                    {/* <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                        <Image 
                            source={{uri: serverBaseUrl+this.props.route.params.image}} 
                            style={{height: 60, width: 60, borderRadius: 30}}
                        />
                    </View> */}
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
                    <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
                            {CardView(<Image source={{uri: imageProvider(this.props.route.params.image)}} style={{height:80,width:80,borderRadius:15}}/>,{height:80,width:80,borderRadius:15})}
                            <View style={{flexDirection: 'column',marginLeft: 10,flexWrap:'wrap',width:this.props.screenWidth-120}}> 
                                <Text numberOfLines={1} style={{fontSize:22,fontFamily: 'Raleway_700Bold',flexWrap: 'wrap',width:this.props.screenWidth-120}}>{this.props.route.params.catName}</Text>
                                <Text numberOfLines={1} style={{fontSize:12,fontFamily: 'Raleway_600SemiBold'}}>{this.props.route.params.subCatName}</Text>
                            </View>
                    </View>
                    
                    <View style={styles.seriesView}>
                        {this.state.tsLoading?(
                            <CustomActivtiyIndicator mode="testSeries"/>
                        ):(
                            <FlatList
                                data={this.state.subCat}
                                renderItem={this.renderSeries} 
                                keyExtractor={(item) => item.id}
                                ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                            />
                        )}
                    </View> 
                </ScrollView>
            </PageStructure>
        )      
    }
}

const styles = StyleSheet.create({
    headTitleView:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
        title:{
            fontSize: 20, 
            fontWeight: '700'
        },
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
                width:300,
                height:130,
                borderRadius:10,
                marginRight:10, 
            },
    seriesView:{

    },
        singleItem:
        {
            padding: 10,
            display:'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 8, 
            marginTop: 10
        }, 
            imageView:
            {
              
            } ,
                itemImage:
                {
                    height: 110,
                    width:110,  
                     
                },
            titleView:
            {

            }   , 
                itemTitle:
                {
                    fontSize: 16, 
                    padding: 2, 
                     fontFamily: 'Raleway_700Bold',
                    color: theme.secondaryColor
                },
            countView:
            {

            },
                itemCount: 
                {
                    fontSize: 12,
                    padding: 4, 
                    fontFamily: 'Raleway_600SemiBold',
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
                }

})

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(InsTestSeriesList); 