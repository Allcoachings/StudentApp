import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {insTestSeries} from '../../FakeDataService/FakeData'
import { theme, dataLimit, serverBaseUrl, Assets,imageProvider } from '../config';
import { Feather } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Redirect } from 'react-router';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import {seriesList} from '../Utils/DataHelper/TestSeries'
import { fetch_Banners } from '../Utils/DataHelper/Banners'
import Instructions from './Instructions'
import RenderSingleTestSeries from './RenderSingleTestSeries'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height;

class SeriesList extends React.Component {
    state = {
        id: this.props.route.params.id,
        offset:0,
        seriesList: [],
        modalVisible: false,
        item:{},
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
        tsLoading: true
    }

    componentDidMount(){
        seriesList(this.state.id,this.state.offset,dataLimit,this.seriesListCallBack)
        fetch_Banners("test", this.bannerCallback)
    }

    bannerCallback=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                this.setState({banner: data})
            })
        }
        else
        {
            console.log("something went wrong", response.status)
        }
    }

    seriesListCallBack=(response)=>{
        if(response.status==200)
        {
            console.log("success series list")
            response.json().then(data=>
            {
                this.setState({seriesList: data, tsLoading:false})
            })
        }
        else
        {
            console.log("something went wrong")
        }
    }

    closeModal = () =>{
        this.setState({modalVisible: false})
    }

    renderBannerList=({item})=>
    {
        return(
            <TouchableOpacity style={styles.bannerItemContainer}>
                    <Image source={{uri: imageProvider(item.bannerImageLink)}} style={styles.bannerImage}/>
            </TouchableOpacity  >
        )
    }


    render(){
        return(
            <PageStructure
                iconName={"arrow-left"}
                btnHandler={() => {this.props.navigation.goBack()}}
                catInHeader={false}
                titleonheader={this.props.route.params.catName}
                notificationreplaceshare={"share-2"}
            >
               <ScrollView>
                    <View style={styles.main}>
                        <View 
                            style={{justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                            <Image 
                                source={{uri: imageProvider(this.props.route.params.image)}} 
                                style={{height: 60, width: 60, borderRadius: 30}}
                            />
                        </View>
                        <View style={styles.rowContainer}>
                            <FlatList 
                                data={this.state.banner} 
                                renderItem={this.renderBannerList} 
                                keyExtractor={(item)=>item.id}
                                horizontal={true} 
                                ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                            />
                        </View>
                        <View style={styles.container}>
                        {this.state.tsLoading?(
                                <CustomActivtiyIndicator mode="testSeries"/>
                        ):(
                            <FlatList 
                                data={this.state.seriesList} 
                                renderItem={({item})=><RenderSingleTestSeries item={item} navigation={this.props.navigation}/>}
                                keyExtractor={(item)=>item.id} 
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}
                                ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                            />
                        )}
                        </View>
                    </View>
                    
                </ScrollView>
                
                {this.state.modalVisible?(
                    <Instructions 
                        closeModal={this.closeModal} 
                        modalVisible={this.state.modalVisible}
                        item={this.state.item}
                        navigation={this.props.navigation}
                    />
                    
                ):(
                    null
                )}

            </PageStructure>
        )
    }
}

const styles = StyleSheet.create({
    main:
    {
        flex: 1,
        flexDirection: 'column'
    },
        headTitleView:
        {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10
        },
            title:
            {
                fontSize: 20, 
                fontWeight: '700'
            },
        rowContainer: 
        {
            marginBottom: 10,
            marginTop: 10
        },
            bannerItemContainer:
            {
                height:140,
            },
                bannerImage:
                {
                    width:300,
                    height:140,
                    borderRadius:10,
                    marginRight:10,
                },
        container:
        {

        },
            list:
            {
                flex: 1,
                flexDirection: 'column',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
            },
                topRow:
                {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                },
                    queText:
                    {
                        fontSize: 16,
                        color: theme.greyColor
                    },
                    timeText:
                    { 
                        fontSize: 16,
                        color: theme.greyColor
                    },
            bottomRow:
            {
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
                alignItems: 'center'
            },
                titleText:
                {
                    flex:0.95,
                    fontSize: 18,
                    color: theme.secondaryColor
                },
                btnView:
                {
                    // borderWidth:1,
                    flexDirection: 'row',
                    backgroundColor: theme.accentColor,
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 2,
                    paddingBottom: 2,
                    borderRadius: 3,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                },
                    btnText:
                    {
                        fontSize: 14,
                        color: theme.primaryColor   
                    }

})

export default SeriesList;