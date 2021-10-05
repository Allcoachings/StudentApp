import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {insTestSeries} from '../../FakeDataService/FakeData'
import { theme, dataLimit,serverBaseUrl, Assets, imageProvider } from '../config';
import { Feather } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Redirect } from 'react-router';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import { fetchTestSeriesBySubCategory } from '../Utils/DataHelper/TestSeries'
import { fetch_Banners } from '../Utils/DataHelper/Banners'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
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
    }

    componentDidMount(){
        fetchTestSeriesBySubCategory(this.state.id, this.state.offset, dataLimit,this.SubCatTestSeriesCallback)
        fetch_Banners("test", this.bannerCallback)
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
            console.log("something went wrong")
        }
    }
    bannerCallback=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                console.log(data);
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
        console.log(imageProvider(item.bannerImageLink))
        return(
            <TouchableOpacity style={styles.bannerItemContainer}>
                    <Image source={{uri: imageProvider(item.bannerImageLink)}} style={styles.bannerImage}/>
            </TouchableOpacity  >
        )
    }

    renderSeries=({item})=>{
        return(
            CardView(
                <View  style={styles.singleItem}>
                    <View style={styles.imageView}>
                        <Image source={{uri: imageProvider(item.image)}} style={styles.itemImage}/>
                    </View>
                    <View style={styles.titleView}>
                        <Text style={styles.itemTitle}>{item.name}</Text>
                    </View>
                    <View style={styles.countView}>
                        <Text style={styles.itemCount}>{item.count}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("SeriesList", {id: item.id, catName: this.props.route.params.catName, image: item.image})} style={styles.btnView}>
                            <Text style={styles.cardButton}>View Test Series</Text>
                    </TouchableOpacity>
                </View>, { margin:7,width:((this.props.screenWidth/3.5)),borderWidth:1,borderColor:theme.labelOrInactiveColor,borderRadius:15 }
        )
        )
    }

    render() {
        return(
            <PageStructure
                iconName={"arrow-left"}
                btnHandler={() => {this.props.navigation.goBack()}} 
                titleonheader={this.props.route.params.catName}
                notificationreplaceshare={"share-2"}
                nosearchIcon={true}
                // catInHeader={false}
                
                noNotificationIcon={true} 
            >
                <ScrollView>
                    {/* <View style={styles.headTitleView}>
                        <Text></Text>
                        <Text style={styles.title}>UPSC CSE</Text>
                        <Feather name="share-2" size={18} style={{marginRight: 10}}/>
                    </View> */}
                    {/* <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                        <Image 
                            source={{uri: serverBaseUrl+this.props.route.params.image}} 
                            style={{height: 60, width: 60, borderRadius: 30}}
                        />
                    </View> */}
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
                    
                    <View style={styles.seriesView}>
                        {this.state.tsLoading?(
                            <CustomActivtiyIndicator mode="testSeries"/>
                        ):(
                            <FlatList
                                data={this.state.subCat}
                                renderItem={this.renderSeries}
                                numColumns={3}
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
                height:140,
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
                    height: 45,
                    width:60, 
                     
                },
            titleView:
            {

            }   , 
                itemTitle:
                {
                    fontSize: 14, 
                    padding: 2, 
                    fontWeight: '700', 
                    color: theme.secondaryColor
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
                backgroundColor: theme.accentColor
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