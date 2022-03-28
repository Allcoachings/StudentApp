import React,{useState,useEffect} from 'react';
    import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform,Dimensions, ScrollView, TouchableWithoutFeedback} from 'react-native';
// import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth, dataLimit,serverBaseUrl, Assets, imageProvider} from '../config'
import { EvilIcons } from '@expo/vector-icons';
import {connect } from 'react-redux'
import CardView from '../Utils/CardView'
import { AirbnbRating } from 'react-native-ratings';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {fetchNotifications,updateNotificationSeenStatus} from '../Utils/DataHelper/Notification'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import {useSelector} from 'react-redux'
import { getHeaderTitle } from '@react-navigation/elements';
import moment from 'moment';
import SingleNotification from './SingleNotification';



const  Notification = ({route,navigation}) => {
    

    const [notifications,setNotifications] = useState([])
    const [offset,setOffset] = useState(0)
    const [showLoadMore, setShowLoadMore] = useState(true)
    const [isNotificationLoading,setIsNotificationLoading] = useState(false)
    const [loadingFooter,setLoadingFooter] = useState(true)
    // const [type,setType] = useState(route?.params?.type)
    const [refreshing,setRefreshing] = useState(true)
    const userInfo = useSelector(state=>state.user.userInfo)
 
 
     useEffect(() =>{
        const title =  route.name
        const type = title=="Course" ? "course" :"general";
        fetchNotifications(userInfo.id, 2, type, offset, dataLimit, notificationCallback)
     },[offset,route.name])

    

  

    const notificationCallback=(response)=>
    {
        
         
        if(response.status==200)
        {
            response.json().then(data=>
            {
                 
                 console.log(data)
                     
                    setNotifications([...notifications,...data])
                    setIsNotificationLoading(false)
                    setShowLoadMore(true)
                    setLoadingFooter(false)
                    setRefreshing(false)
                                 
            })
        }
    }

    // updateComponent=()=>{
    //     if(type!=this.props.route.params.type)
    //     {
    //         this.setState({type:this.props.route.params.type, notifications:[], offset: 0,isNotificationLoading: true},()=>this.fetch())  
    //     }
    // }

   

    const singleRow=({item})=>{
        return(
            <SingleNotification item={item} navigation={navigation} />
        )
    }

   const  renderFooter = () => {
        try {
       
          if (loadingFooter) {
            return <CustomActivtiyIndicator mode="skimmer"/>;
          } else {
            return null;
          }
        } catch (error) {
          // console.log(error);
        }
    };

     
         
        return(
            // <PageStructure
            //     iconName={"arrow-left"}
            //     btnHandler={() => {navigation.goBack()}}
            //     titleonheader={"Notifications"}
            //     noNotificationIcon={true}
            //     navigation={navigation}
            //     nosearchIcon={true}
            // >
                // <ScrollView>
                    <View style={styles.container}>
                        {isNotificationLoading?(
                            <CustomActivtiyIndicator mode="skimmer"/>
                        ):(
                            <FlatList 
                            data={notifications} 
                            renderItem={({item})=>singleRow({item})}
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

                                     
                                   
                                 
                                  
                                    setLoadingFooter(false)
                                    setRefreshing(true)
                                    setOffset(parseInt(offset)+1)

                                     
                                } 
                            }}
                        />)}
                    </View>
                //  </ScrollView>
            // </PageStructure>
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
            flex:0.2,
            marginBottom: 5
        },
            logoCard:
            { 
                flexWrap:'wrap',
                width:40,
                height:40, 
                borderRadius:20
                
            }, 
                instituteheaderLogo:
                {
                    width:30,
                    height:30,
                    borderRadius:10,
                },  
            instituteheaderMeta:
            {
                flex:1,
                flexDirection:'column',
                marginLeft:'2%',
                marginRight:'5%'
            },
                instituteheaderText:
                {
                    flex:1,
                    flexWrap:'wrap',
                    fontSize:16,
                    fontFamily:'Raleway_700Bold'
                },  
                instituteDirector:
                {
                    color:theme.greyColor,
                    fontSize:15,
                    fontFamily:'Raleway_600SemiBold',
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

 
export default Notification; 