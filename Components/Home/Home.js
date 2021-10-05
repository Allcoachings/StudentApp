import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,TouchableWithoutFeedback,FlatList, Image,Platform,Dimensions,ActivityIndicator} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {storyLine,homeFeaturesData} from '../../FakeDataService/FakeData'
import { theme ,serverBaseUrl,dataLimit, paytmConfig, Assets, imageProvider} from '../config';
import { Feather } from '@expo/vector-icons';
import { AirbnbRating } from 'react-native-ratings';
import { Redirect } from 'react-router';
import { connect } from 'react-redux'
import CardView from '../Utils/CardView';
import {setNavigation} from '../Actions'

import {fetch_institute_courses,fetch_courses_banners,fetch_courses_videos,fetch_video_playlist,fetch_document_playlist,fetch_courses_documents,fetch_courses_timetable,fetch_testSeries} from '../Utils/DataHelper/Course'
import {fetch_homeData} from '../Utils/DataHelper/HomeData'
import {fetch_coachingByCategory, fetch_coachingByCategoryAndStatus} from '../Utils/DataHelper/Coaching'
import {SearchInstitute} from '../Utils/DataHelper/Search'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PaymentGateway from '../Utils/PaymentGateway';
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';

const windowWidth = Dimensions.get('window').width;

class Home extends React.Component {
    state = {  
       loadingData:true,
       homeMainContent:[],
       offset:0
    }

    handleHomeDataCallBack=(response) => {
      
            if(response.status==200)
            {
                    response.json().then(data=>
                        {
                          
                            this.setState({loadingData:false,homeMainContent:data});
                        })
            }else
            {
                this.setState({loadingData:false});
            }
    }
    componentDidMount() {
        this.props.setNavigation(this.props.navigation);
        this.checkForUserCat()
        fetch_homeData(this.handleHomeDataCallBack)
        
        // PaymentGateway({orderId:"123",mid:paytmConfig.mid,isStaging:paytmConfig.isStaging,appInvokeRestricted:paytmConfig.appInvokeRestricted,amount:10,tranxToken:"123",callback:(response)=>{console.log(response)}})
    }

    redirectTo =(item)=>
    {
        this.props.navigation.navigate('Institute',{insId:item.id})
    }

   
    renderMainContetnRow=({item})=>{

        if(item.data.length > 0)
        {
        switch(item.type)
        {
            case 'listing':
                return (
                    
                    <View style={styles.rowContainer}>
                        <View style={styles.rowHeader}>
                            <Text style={styles.rowHeaderTitle} numberOfLines={1}>{item.title}</Text>
                            <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate("CategoryList", {type: item.title,id:item.id})}>
                                <Feather name="arrow-right" size={25} color={theme.secondaryColor}/>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.rowBody}>
                            <FlatList 
                                data={item.data} 
                                renderItem={this.renderInstituteList} 
                                keyExtractor={(item)=>item.id}
                                horizontal={true} 
                                showsHorizontalScrollIndicator={false}
                            />
                        </View> 
                    </View>
                ) 
            case 'banner':
                return (
                        <View style={styles.rowContainer}>
                            <FlatList 
                            data={item.data} 
                            renderItem={this.renderBannerList} 
                            keyExtractor={(item)=>item.id}
                            horizontal={true} 
                            showsHorizontalScrollIndicator={false}
                            />

                        </View>
                )
        }
    }
        
    }
 
    renderInstituteList=({item})=>{
        return (
            <TouchableWithoutFeedback onPress={()=>this.redirectTo(item)}>
                <View style={styles.instituteItemContainer}>
                <View style={styles.instituteItemImageView}>
                    {CardView(
                        <Image source={{uri:imageProvider(item.logo)}} style={styles.instituteItemImage}/> 
                        ,{width:'100%',borderRadius:15}
                    )}
                    
                </View>
                <View style={styles.instituteMetaContainer}>
                    <View style={{display:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 2}}>
                        <Text style={styles.instituteTitle} numberOfLines={2}>
                            {item.name.length<=16?(item.name):(item.name.substr(0, 20)+"..")}</Text>
                    </View>
                    <View style={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{alignSelf:'flex-start', color: theme.greyColor,fontSize:12}}>{item.totalRatingCount>0?(item.totalRating/item.totalRatingCount):(0)+' • '}</Text> 
                        <AirbnbRating 
                            starContainerStyle={styles.instituteRating} 
                            count={5}
                            reviews={[]} 
                            isDisabled={true}
                            defaultRating={item.totalRatingCount>0?(item.totalRating/item.totalRatingCount):(0)}
                            size={12}
                            selectedColor={theme.blueColor}
                            showRating={false}
                        />
                    </View>
                </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    renderBannerList=({item})=>
    {
        
        return(
            <TouchableWithoutFeedback onPress={()=>item.bannerLink?(this.props.navigation.navigate('webview',{link:item.bannerLink,mode:'defaultAppHeader'})):(console.log("nolink"))}>
                <View style={styles.bannerItemContainer} >
                    <Image source={{uri:imageProvider(item.bannerImageLink)}} style={styles.bannerImage}/>
                </View>
            </TouchableWithoutFeedback  >
        )
    }

    coachingCallBack=(response)=>
    {
        if(response.status==200)
        {
            response.json().then(data=>
                {
                     
                    this.setState({institute:data,loadingData:false})
                })
        }
    }

    search=(offset, search, callback)=>{
        SearchInstitute(search, offset, dataLimit, callback)
    }
     
    checkForUserCat=()=>
    {
        AsyncStorage.getItem("userCat").then((response)=>{

             if(response)
             {
                 let obj = JSON.parse(response);
                 this.setState({selectedCat:obj.id})
                 if(obj.id==-1)
                 {
                    this.toggleCatMode(false,obj)
                 }else
                 {
                    this.toggleCatMode(true,obj)
                 }
                 
             }
        })
    }
    toggleCatMode=(mode,item)=>
    {
        switch(mode)
        {
            case true:
                this.setState({catMode:mode,catid:item.id,loadingData:true,},()=>
                {
                    fetch_coachingByCategoryAndStatus(this.state.catid,1,this.state.offset,dataLimit,this.coachingCallBack)
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
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                catInHeader={true}
                catOnpress={this.toggleCatMode}
                selectedCat={this.state.selectedCat}
                rightIconOnPress={() =>this.props.navigation.navigate("Notification")}
                scrollMode={'scroll'}
                navigation={this.props.navigation}
                searchFun={this.search}
                singleItem={this.renderInstituteList}
            >
                <View style={styles.container}> 
                    <View style={styles.mainContent}> 
                    {this.state.loadingData?(
                        <View style={{margin:10,padding:10}}>
                            <CustomActivtiyIndicator mode="homeShimmer" />
                        </View>
                    ):(
                        this.state.catMode?(
                            <View>
                            <FlatList 
                                data={this.state.institute}  
                                showsVerticalScrollIndicator={false} 
                                renderItem={this.renderInstituteList}
                                numColumns={3}
                                keyExtractor={item => item.id}
                                ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                            />
                            </View>
                        ):(
                            <FlatList 
                                data={this.state.homeMainContent}  
                                showsVerticalScrollIndicator={false} 
                                renderItem={this.renderMainContetnRow}
                                keyExtractor={item => item.id}
                                ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                            />
                        )
                    )}
                    
                        
                    </View>
                </View>
                
           </PageStructure>
        );
    }
}
 
const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        flexDirection: 'column',
    },
        mainContent:
        {
                flex:1,
                // marginTop:10
        },
            rowContainer:
            {
                // marginTop:5,
                // borderBottomWidth:0.2

            },
                rowHeader:
                {
                    flex:1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginRight: 10,
                    marginLeft: 10
                },
                    rowHeaderTitle:
                    {   
                        flex:0.9,
                        fontSize:18,
                        fontWeight:'bold'
                    },
                rowBody:
                {
                     flex:0.1 
                },
                    instituteItemContainer:
                    {
                        flexDirection:'column',
                        width:(windowWidth/3)-20,
                        height:180,
                        marginLeft:10,
                        marginTop:10
                    },
                        instituteItemImage:
                        {
                            width:'100%', 
                            height: 90,
                            borderRadius:15
                        },
                        instituteMetaContainer:
                        {
                            flexDirection:'column',
                            flexWrap:'wrap'
                        },
                            instituteTitle:
                            {
                                flexWrap:'wrap',
                                width:'100%', 
                                fontSize:12,
                                height:30
                            },
                            instituteRating:
                            {
                                alignSelf:'flex-start',
                                width:'80%'
                            },
                    bannerItemContainer:
                    {
                        marginBottom: 10,
                        height:160
                    },
                        bannerImage:
                        {
                            width:(windowWidth/1.1)-10,
                            height:150,
                            borderRadius:10,
                            marginLeft:10
                        }


})
const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth,
        userInfo:state.user.userInfo,
    }
}
export default connect(mapStateToProps,{setNavigation})(Home);