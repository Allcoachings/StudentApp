import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Assets, dataLimit } from '../config'
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import PurchageListRow from '../UserProfile/PurchageListRow'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator' 
import { fetch_student_purchase } from '../Utils/DataHelper/UserProfile'
import EmptyList from '../Utils/EmptyList' 

function EnrollmentsTab({navigation}) {


    const userInfo = useSelector(state=>state.user.userInfo)
    const [loadingUserEnrollments,setLoadingUserEnrollments] = useState(true)
    const [userPurchases,setUserPurchases] = useState([])
    const [enrollListLoading,setEnrollListLoading] = useState(false)
    const [showLoadMore,setShowLoadMore] = useState(false)
    const [loadingFooter,setLoadingFooter] = useState(false)
    const [enrollOffset,setEnrollOffset] = useState(0)
    const [refreshing,setRefreshing] = useState(false)
    const renderPurchageCourse=(item)=>{
        return(
            
            <PurchageListRow item={item} navigation={navigation}/>
        )
    }


    const fetch=()=>{
        fetch_student_purchase(userInfo.id, enrollOffset, dataLimit,purchaseCallback)
    }
    const renderFooter = () => {
        try {
       
          if (loadingFooter) {
            return <CustomActivtiyIndicator mode="skimmer"/>;
          } else {
            return <></>;
          }
        } catch (error) {
          console.error(error);
        }
    };

    useEffect(() => {
        fetch()
    },[enrollOffset])

   const purchaseCallback=(response)=>{
        setLoadingUserEnrollments(false)
        // console.log(response.status)
        if(response.status==200)
        {   
            response.json().then(data=>
            {
                // console.log(data)
                // this.setState({purchase: data})
                if(data.length>0)
                {
                    setUserPurchases([...userPurchases, ...data])
                    setEnrollListLoading(false)
                    setShowLoadMore(true)
                    setLoadingFooter(false)

                    // this.setState({purchase:[...this.state.purchase,...data],enrollListLoading:false, showLoadMore: true, loadingFooter:false});  
                }
                else
                {
                    // setUserPurchases([...userPurchases, ...data])
                    setEnrollListLoading(false)
                    setShowLoadMore(false)
                    setLoadingFooter(false)
                    // this.setState({purchase:this.state.purchase,enrollListLoading:false, showLoadMore: false, loadingFooter: false}); 
                } 
            })
        }
        else
        {
            // console.log("something went wrong")
        }
    }

    return (
        // <PageStructure
        //     iconName={"arrow-left"}
        //     btnHandler={() => {navigation.goBack()}}
        //     titleonheader={"Enrollments"}
        //     nosearchIcon={true}
        //     noNotificationIcon={true}
        // >
            <View>
                <FlatList
                    data={userPurchases}
                    renderItem={({item}) => renderPurchageCourse(item)}
                    keyExtractor={(item,index)=>index} 
                    ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                    onEndReachedThreshold={0.1}
                    refreshing={refreshing}
                    // ListFooterComponent={renderFooter}
                    onEndReached={() => 
                    {
                        if(showLoadMore&&!loadingFooter)
                        {
                            setRefreshing(true)
                            setLoadingFooter(true)
                            setEnrollOffset(parseInt(enrollOffset)+1)
                        }
                    
                    }}
                />
            </View>
        // </PageStructure>
    )
}

export default EnrollmentsTab