import React, { useState, useEffect } from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
// import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth, dataLimit,serverBaseUrl, Assets, imageProvider} from '../config'
import { EvilIcons } from '@expo/vector-icons';
import {connect } from 'react-redux'
import {subscriptionNew} from '../../FakeDataService/FakeData'
import CardView from '../Utils/CardView'
import { AirbnbRating } from 'react-native-ratings';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { fetchSubscribedInstituteList } from '../Utils/DataHelper/Subscription'
import RenderSingleSubsInstitute from './RenderSingleSubsInstitute'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import { useSelector } from 'react-redux'

export default function SubscriptionNew(props) {
   

    const [subscription, setSubscription] = useState([]);
    const [offset, setOffset] = useState(0);
    const [showLoadMore, setShowLoadMore] = useState(true);
    const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(true);
    const [loadingFooter, setLoadingFooter] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const userInfo = useSelector((state) => state.user.userInfo)

    useEffect(()=>{
        console.log("idhar")
        fetchSubscribedInstituteList(userInfo.id, offset, dataLimit, subscriptionCallBack)
    },[offset])

    const subscriptionCallBack=(response)=>{
        console.log("subscription success")
        if(response.status==200)
        {
            response.json().then(data=>
            {
                console.log(data)
                // this.setState({subscription:data});
                if(data.length>0)
                {
                    setSubscription([...subscription, ...data])
                    setIsSubscriptionLoading(false);
                    setShowLoadMore(true)
                    setLoadingFooter(false)
                    // this.setState({subscription:[...subscription,...data],isSubscriptionLoading:false, showLoadMore: true, loadingFooter:false});  
                }
                else
                {
                    setSubscription(subscription)
                    setIsSubscriptionLoading(false);
                    setShowLoadMore(false)
                    setLoadingFooter(false)
                    // this.setState({subscription:subscription,isSubscriptionLoading:false, showLoadMore: false, loadingFooter: false}); 
                }                    
            })
        }
    }

    const renderFooter = () => {
        try {
       
          if (loadingFooter) {
            return <CustomActivtiyIndicator mode="skimmer"/>;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
    };
    console.log(loadingFooter)
    return(
        <PageStructure
            iconName={"chevron-left"}
            btnHandler={() => {props.navigation.goBack()}}
            titleonheader={"Subscription"}
            nosearchIcon={true}
            noNotificationIcon={true}
        >
            <ScrollView>
                <View style={styles.container}>
                    {/* <View style={styles.headView}>
                        <TouchableOpacity onPress={null}>
                            <EvilIcons name="chevron-left" size={26} />
                        </TouchableOpacity>
                        <Text style={styles.headText}>
                            Subscription
                        </Text>
                        <TouchableOpacity onPress={null}>
                            <EvilIcons name="share-2" size={22} />
                        </TouchableOpacity>
                    </View> */}
                    {isSubscriptionLoading?(
                        <CustomActivtiyIndicator mode="video" />
                    ):(<FlatList 
                        data={subscription} 
                        renderItem={({item})=><RenderSingleSubsInstitute item={item} navigation={props.navigation}/>} 
                        keyExtractor={(item)=>item.id}
                        horizontal={false} 
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                        onEndReachedThreshold={0.1}
                        refreshing={refreshing}
                        ListFooterComponent={renderFooter}
                        onEndReached={() => 
                        {
                            if(showLoadMore&&!loadingFooter)
                            {
                                setRefreshing(true);
                                setOffset(parseInt(offset)+1);
                                setLoadingFooter(true);                                      
                            }
                        
                        }}
                    />)}
                </View>
            </ScrollView>
        </PageStructure>
    )
}

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        flexDirection: 'column',
        padding:10,
    },
        headView:
        {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '5%'
        },
            headText:
            {
                fontSize: 24,
                fontWeight: 'bold'
            },
        instituteheader:
        {
            flexDirection:'row',
            flex:0.2
        },
            logoCard:
            { 
                flexWrap:'wrap',
                
            }, 
                instituteheaderLogo:
                {
                    width:"100%",
                    height:"100%",
                    borderRadius:15,
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
                    fontWeight: 'bold',
                    fontSize:16,

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
                followerView:
                {
                    backgroundColor: theme.primaryColor,
                    borderColor: theme.labelOrInactiveColor, 
                    borderWidth:1,
                    padding: 5,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                    follower:
                    {
                        color: theme.blueColor, 
                        fontWeight: 'bold',
                        fontSize: 16
                    }

})

// const  mapStateToProps = (state)=>
// {
//     return {
//         screenWidth: state.screen.screenWidth,
//         userInfo:state.user.userInfo,
//     }
// }
// export default connect(mapStateToProps)(SubscriptionNew); 