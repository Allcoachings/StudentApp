import React from 'react';
import { Text,View,StyleSheet,TouchableWithoutFeedback,FlatList, Image,Dimensions, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { theme, dataLimit,  Assets, imageProvider, screenMobileWidth,numFormatter} from '../config';
import { EvilIcons } from '@expo/vector-icons';
import { AirbnbRating } from 'react-native-ratings';
import { connect } from 'react-redux'
import CardView from '../Utils/CardView';
import {setNavigation,setPinnedInstituteCount} from '../Actions'
import {fetch_homeData} from '../Utils/DataHelper/HomeData'
import {fetch_coachingByCategoryAndStatus} from '../Utils/DataHelper/Coaching'
import {SearchInstitute} from '../Utils/DataHelper/Search'
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';

const windowWidth = Dimensions.get('window').width;

class Home extends React.Component {
    state = {  
       loadingData:true,
       homeMainContent:[],
       offset:0,
       count:0,
       refreshing: false
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
                this.setState({refreshing: false});
    }
    componentDidMount() {
        this.initialFetch()
        
        // PaymentGateway({orderId:"123",mid:paytmConfig.mid,isStaging:paytmConfig.isStaging,appInvokeRestricted:paytmConfig.appInvokeRestricted,amount:10,tranxToken:"123",callback:(response)=>{// console.log(response)}})
    }

    initialFetch=() => {
        this.props.setNavigation(this.props.navigation);
        this.checkForUserCat()
        fetch_homeData(this.handleHomeDataCallBack)
        
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(this.props.pinnedInstitute,"before " , this.props.pinnedInstituteCount)
        if(this.props?.pinnedInstitute[0]?.institute && this.props.pinnedInstituteCount==0)
        {
            // console.log(this.props.pinnedInstitute)
                this.props.setPinnedInstituteCount(1)
                this.redirectTo(this.props?.pinnedInstitute[0]?.institute)

        }
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
                                <EvilIcons name="chevron-right" size={25} color={theme.secondaryColor}/>
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
                        ,{width:'90%',borderRadius:15}
                    )}
                    
                </View>
                <View style={styles.instituteMetaContainer}>
                    <View style={{display:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 2}}>
                        <Text style={styles.instituteTitle} numberOfLines={2}>
                            {item.name}
                        </Text>
                    </View>
                    <View style={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{alignSelf:'flex-start', color: theme.greyColor,fontSize:12, marginRight: 2,}}>{item.totalRatingCount>0?((item.totalRating/item.totalRatingCount).toFixed(1)):(0)}</Text> 
                        <AirbnbRating 
                            starContainerStyle={styles.instituteRating} 
                            count={5}
                            reviews={[]} 
                            isDisabled={true}
                            defaultRating={item.totalRatingCount>0?((item.totalRating/item.totalRatingCount).toFixed(1)):(0)}
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
            <TouchableWithoutFeedback onPress={()=>item.bannerLink?(this.props.navigation.navigate('webview',{link:item.bannerLink,mode:'defaultAppHeader'})):( console.log("nolink"))}>
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

     renderSearchIns=(item,closeModal)=>{
         
        return(
            <View>
                <TouchableWithoutFeedback style={{marginBottom: '5%'}} onPress={()=>{closeModal();this.redirectTo(item)}}>
                    <View style={styles.instituteheader}>
                        {CardView(
                            <Image source={{uri:imageProvider(item.logo)}} style={styles.instituteheaderLogo}/>
                            ,[styles.logoCard,{width:"15%",height:50,borderRadius:10, marginLeft: 20}])
                        } 
                        <View style={styles.instituteheaderMeta}>
                            <View style={{flexDirection: 'column'}}>
                                <Text numberOfLines={1} style={[styles.instituteheaderText,{fontSize:12,fontFamily: 'Raleway_600SemiBold',width:"100%"}]}>{item.name}</Text>
                                <Text numberOfLines={1} style={[styles.instituteheaderText,{color:"grey",fontSize:10,fontFamily: 'Raleway_600SemiBold',width:"100%"}]}>{item.directorName}</Text>
                            </View>
                        </View>
                    </View>     
                </TouchableWithoutFeedback>
            </View>  
        )
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

    refreshing=()=>{
        this.setState({refreshing:true});
        this.initialFetch();

    }
    
    render() {
        return (
            <PageStructure
                // iconName="navicon"
                // btnHandler={() => {this.props.navigation.toggleDrawer()}}
                userIcon={() => {this.props.navigation.navigate("Profile")}}
                catInHeader={true}
                catOnpress={this.toggleCatMode}
                selectedCat={this.state.selectedCat}
                rightIconOnPress={() =>this.props.navigation.navigate("Notification")}
                scrollMode={'scroll'} 
                searchFun={this.search}
                titleWithImage={true}
                titleonheader={"All Coaching"}
                singleItem={this.renderSearchIns}
                navigation={this.props.navigation}
                refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} 
                    onRefresh={this.refreshing} />
                }

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
            marginTop:10,
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
                        width:(windowWidth/3.3)-10,
                        height:160,
                        marginLeft:10,
                        justifyContent: 'center',
                         
                        flexWrap:'wrap',
                        marginTop:10
                    },
                        instituteItemImage:
                        {
                            width:'100%', 
                            height: 80,
                            borderRadius:15,
                            resizeMode: 'contain',
                        },
                        instituteMetaContainer:
                        {
                            width:(windowWidth/3.3)-10,
                            flexDirection:'column',
                            flexWrap:'wrap'
                        },
                            instituteTitle:
                            {
                                flexWrap:'wrap',
                                width:(windowWidth/3.3)-10, 
                                fontSize:12,
                                height:30,
                                marginTop:5,
                            },
                            instituteRating:
                            {
                                // alignSelf:'flex-start',
                                
                            },
                    bannerItemContainer:
                    {
                        marginVertical: 10,
                        height:125,
                        width:windowWidth-25,
                        marginHorizontal:10

                    },
                        bannerImage:
                        {
                            width:windowWidth-25,
                            height:125, 
                            borderRadius:10, 
                        },

                        instituteheader:
                        {
                            flexDirection:'row',
                            flex:0.3,   
                            marginBottom:10,
                            marginTop:5
                        },
                            logoCard:
                            { 
                                flexWrap:'wrap',
                                overflow: 'hidden',
                            }, 
                                instituteheaderLogo:
                                {
                                    width:"100%",
                                    height:"100%",
                                    resizeMode:"contain", 
                                },  
                            instituteheaderMeta:
                            {
                                flex:1,
                                flexDirection:'column',
                                marginLeft:'5%',
                                marginRight:'5%'
                            },
                                instituteheaderText:
                                {
                                    flex:1,
                                    flexWrap:'wrap', 
                                    fontFamily: 'Raleway_700Bold',
                                    fontSize:14, 
                        
                                },  
                                instituteDirector:
                                {
                                    color:theme.accentColor,
                                    fontWeight:'bold',
                                    fontSize:12,
                                },
                                instituteRatingView:
                                {
                                    flex:1,
                                    flexDirection:'row',
                                    alignItems: 'center'
                                    // justifyContent: 'center'    
                                },
                                    instituteRating:
                                    {
                                        alignSelf:'flex-start',
                                        marginRight:10,
                                    },
                                    voteCount:
                                    {
                                        fontWeight:'bold',
                        
                                    },
                                btnView:
                                {
                                    backgroundColor: theme.accentColor,
                                    borderColor: theme.accentColor, 
                                    borderWidth:1,
                                    padding: 3,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop:'auto'
                                },
                                    follower:
                                    {
                                        color: theme.blueColor, 
                                        fontWeight: 'bold',
                                        fontSize: 18
                                    },
                        
                                courseItemContainer:
                                {  
                                    paddingLeft:12,
                                    paddingRight:12, 
                                    marginRight:10,
                                    paddingVertical: 3.5,
                                    marginTop:5 , 
                                    paddingHorizontal:2,
                                    borderWidth:1, 
                                    borderColor:theme.primaryColor,
                                    borderRadius:15,
                                        alignItems:'center',
                                        justifyContent: 'center'
                        
                                },
                                    courseTitle:
                                    {
                                        fontSize:14, 
                                        color:theme.greyColor,
                                        fontFamily: 'Raleway_700Bold',
                                    },


})
const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth,
        userInfo:state.user.userInfo,
        pinnedInstitute:state.user.pinnedInstitute,
        pinnedInstituteCount:state.user.count
        
    }
}
export default connect(mapStateToProps,{setNavigation,setPinnedInstituteCount})(Home);