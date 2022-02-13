import { FlatList, StyleSheet, View,Dimensions, TouchableWithoutFeedback, Image, Text, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import React, { useEffect, useState } from 'react';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure';
import EmptyList from '../Utils/EmptyList';
import { Assets, dataLimit, imageProvider, theme } from '../config';
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import { fetch_testSeries_subcategoryByCategory } from '../Utils/DataHelper/TestSeries';
import CardView from '../Utils/CardView';
import SingleTestSeriesItem from '../TestSeriesIns/SingleTestSeriesItem';

const windowWidth = Dimensions.get('window').width;
function SubCategoryList({route,navigation}) {

    const categoryId  = route.params.id

    const [seriesData,setSeriesData] = useState()
    const [loading,setLoading] = useState(true)
    const [offset,setOffset] = useState(0)
    const [refreshing, setRefreshing] = useState(false)
    const [loadingFooter, setLoadingFooter] = useState(false)
    const [showLoadMore, setShowLoadMore] = useState(false)


    useEffect(()=>{
        // console.log(categoryId)
        initialFetch()
    },[categoryId,offset])

    const initialFetch = () =>{
        fetch_testSeries_subcategoryByCategory(categoryId,offset,dataLimit,(response)=>{
            if(response.status==200)
            {
                response.json().then(data=>{
                    setSeriesData(data)
                })
            }
            setRefreshing(false)
            setLoadingFooter(false) 
            setLoading(false)
            setRefreshing(false)
        })
    }


    const renderSeries=({item})=>{  
        return( 
        <SingleTestSeriesItem
                item={item}
                navigation={navigation}
                category={route.params.type}
        />
        )
    }
    
  const renderFooter = () => {
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
    const refreshingFun=()=>{
            setRefreshing(true);
            initialFetch();
    }

  return (
    <PageStructure
        iconName={"arrow-left"}
        btnHandler={() => {navigation.goBack()}}
        titleonheader={route.params.type}
        navigation={navigation}
        // searchFun={this.search}
        // singleItem={this.renderMain} 
        nosearchIcon={true} 
        noNotificationIcon={true}
    >
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} 
                onRefresh={refreshingFun} />
            }
            style={{flex: 1}}
        >
            <View style={styles.container}>
                {loading?(
                    <CustomActivtiyIndicator mode="skimmer"/>
                ):(
                    <FlatList 
                    data={seriesData}  
                    showsVerticalScrollIndicator={false} 
                    renderItem={renderSeries}
                    numColumns={3}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={renderFooter}
                    refreshing={refreshing}
                  
                    onEndReached={() => 
                    {
                        if(showLoadMore&&!loadingFooter)
                        {
                            // this.setState({ refreshing: true,loadingFooter:true,offset:parseInt(offset)+1},()=>this.fetch())
                            setRefreshing(true)
                            setLoadingFooter(true)
                            setOffset(parseInt(offset)+1)
                                
                        }
                    
                    }}
                />
                )}
            </View>
        </ScrollView>
    </PageStructure>
  );
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

export default SubCategoryList;
