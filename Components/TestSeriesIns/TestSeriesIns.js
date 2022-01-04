import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {insTestSeries} from '../../FakeDataService/FakeData'
import { theme, dataLimit,serverBaseUrl, Assets,imageProvider } from '../config';
import { EvilIconsns } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Redirect } from 'react-router';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import { fetch_testSeries_category } from '../Utils/DataHelper/TestSeries'
import {SearchTestSeries} from '../Utils/DataHelper/Search'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import { fetch_Banners } from '../Utils/DataHelper/Banners';
class TestSeriesIns extends React.Component {
    state = { 
        offset: 0,
        testSeries: [],
        category:'',
        tsLoading: true,
        banner:[]
     }

    componentDidMount() {
        fetch_testSeries_category(this.state.offset, dataLimit, this.testSeriesCallBack)
        fetch_Banners("test", this.bannerCallback)
    }

    testSeriesCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                console.log("Success cat", data)
                this.setState({tsLoading: false, testSeries: data, category: data[0]&&data[0].categoryName})
            })
        }
        else
        {
            console.log("something went wrong")
        }
    }

    search=(offset, search, callback)=>{
        SearchTestSeries(search, offset, dataLimit, callback)
    }

    singleItem=({item})=>{
       return(
            CardView(
                    <View  style={styles.singleItem}>
                        <View style={styles.imageView}>
                            <Image source={{uri: serverBaseUrl+item.image}} style={styles.itemImage}/>
                        </View>
                        <View style={styles.titleView}>
                            <Text style={styles.itemTitle}>{item.name}</Text>
                        </View>
                        <View style={styles.countView}>
                            <Text style={styles.itemCount}>{item.count}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("ViewInsTestSeriesList", {id: item.id, subCatName:item.name,catName: this.state.category, image: item.image})} style={styles.btnView}>
                            <Text style={styles.cardButton}>Open Exam</Text>
                        </TouchableOpacity>
                    </View>, { margin:5,width:((this.props.screenWidth/3.1)),borderWidth:1,borderColor:theme.labelOrInactiveColor,borderRadius:15 },2
            )
       )
    }


    singleRow=({item})=>
    {
        return(
        <View style={styles.singleRow}>
            <View style={styles.rowHeader}>
               <Text style={styles.rowHeadText}>{item.categoryName}</Text> 
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
    bannerCallback=(response)=>
    {
        if(response.status==200)
        {
            response.json().then(data=>
            {
                console.log("data",data);
                this.setState({banner: data})
            })
        }
        else
        {
            console.log("something went wrong", response.status)
        }
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
    render() {
        
        return (
            <PageStructure 
                // btnHandler={() => {this.props.navigation.toggleDrawer()}}
                // searchFun={this.search}
                // singleItem={this.singleRow}
                // titleWithImage={true}
                // titleonheader={"All Coaching"}
                // catInHeader={true} 
                // userIcon={() => {this.props.navigation.toggleDrawer()}}

                userIcon={() => {this.props.navigation.navigate("Profile")}}
                catInHeader={true} 
                selectedCat={this.state.selectedCat}
                rightIconOnPress={() =>this.props.navigation.navigate("Notification")}
                scrollMode={'scroll'}
                navigation={this.props.navigation} 
                titleWithImage={true}
                titleonheader={"All Coaching"} 
                catOnpress={this.toggleCatMode}
            >
                <ScrollView> 
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