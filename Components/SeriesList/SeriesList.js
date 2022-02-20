import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform,BackHandler, ScrollView, Dimensions, RefreshControl} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {insTestSeries} from '../../FakeDataService/FakeData'
import { theme, dataLimit, serverBaseUrl, Assets,imageProvider } from '../config';
import { EvilIcons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Redirect } from 'react-router';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import {seriesList, seriesListForUser} from '../Utils/DataHelper/TestSeries'
import { fetch_Banners } from '../Utils/DataHelper/Banners'
import Instructions from './Instructions'
import RenderSingleTestSeries from './RenderSingleTestSeries'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import { saveStudentHistory } from '../Utils/DataHelper/StudentHistory';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height;
let unsubscribeFocus=null,unsubscribeBlur=null;
class SeriesList extends React.Component {
    state = {
        id: this.props.route.params.id,
        offset:0,
        seriesList: [],
        modalVisible: false,
        item:{},
        showLoadMore: true,
        loadingFooter: false,
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
        tsLoading: true,
        refreshing: false
    }
    
    componentWillUnmount()
    {
        if(this.backHandler)
        {
            this.backHandler.remove()
        }
    }
    componentDidMount(){

         unsubscribe = this.props.navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
           if(this.backHandler)
           {
               console.log('backhandler ', this.backHandler)
              
               console.log('backhandler ',  this.backHandler.remove())
               console.log("back handler removed focus")
           }
            this.setState({shouldBeHandledHere:true})
            this.backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                ()=>{   
                    console.log(this.state.shouldBeHandledHere)
                    if(this.state.shouldBeHandledHere)
                    {
                        this.props.navigation.navigate("TestSeries")
                        return true;
                    }else
                    { 
                        return false;
                    }
                   
                }
              );
              // console.log("video focused")
          });
          
          unsubscribe = this.props.navigation.addListener('blur', () => {
            // The screen is focused
            // Call any action
            console.log("blurred")
            this.setState({shouldBeHandledHere:false})
           if(this.backHandler)
           {
            console.log("back handler removed blur")
               this.backHandler.remove()
           }
             
              
          });
      

         
        this.initialFetch()
    }

    initialFetch=() => {
        this.fetch()
        fetch_Banners("test", this.bannerCallback)
    }
    updateComponent=()=>
    {
        if(this.props.route.params.id!=this.state.id)
        {
            this.setState({
             id:this.props.route.params.id, 
             offset:0
        },fetch)
        }
    }
    

    fetch=() => {
        seriesListForUser(this.props.userInfo.id,this.state.id,this.state.offset,dataLimit,this.seriesListCallBack)
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
            // console.log("something went wrong", response.status)
        }
        this.setState({refreshing:false})
    }

    seriesListCallBack=(response)=>{
        
        if(response.status==200)
        {
            // console.log("success series list")
            response.json().then(data=>
            {
                // console.log(data)
                if(data.length>0)
                {
                    this.setState({seriesList:[...this.state.seriesList,...data],tsLoading:false, showLoadMore: true, loadingFooter:false});  
                }
                else
                {
                    this.setState({seriesList:this.state.seriesList,tsLoading:false, showLoadMore: false, loadingFooter: false}); 
                } 
            })
        }
        else
        {
            // console.log("something went wrong")
        }
        this.setState({refreshing: false})
    }

    closeModal = () =>{
        this.setState({modalVisible: false})
    }

    renderBannerList=({item})=>
    {
        return(
            <TouchableOpacity style={styles.bannerItemContainer}>
                    <Image source={{uri: imageProvider(item.bannerImageLink)}} style={[styles.bannerImage,{width:width-20    }]}/>
            </TouchableOpacity  >
        )
    }

    renderFooter = () => {
        try {
       
          if (this.state.loadingFooter) {
            return <CustomActivtiyIndicator mode="skimmer"/>;
          } else {
            return null;
          }
        } catch (error) {
          // console.log(error);
        }
    };

    addToHistory=(type, id)=>{
        saveStudentHistory(type,id,this.props.userInfo.id,this.addToHistoryCallBack)
     } 
     
    addToHistoryCallBack=(response)=>{
        if(response.status==201)
        {
            // // console.log("hello done")
        }
        else
        {
            //  // console.log("error")
        }
     }

     refreshing=()=>{
        this.setState({refreshing:true},()=>this.initialFetch());
    }

    render(){
        return(
            <PageStructure
                iconName={"arrow-left"}
                btnHandler={() => {this.props.navigation.goBack()}}
                catInHeader={false}
                titleonheader={this.props.route.params.catName} 
                nosearchIcon={true}
                navigation={this.props.navigation}
                noNotificationIcon={true}
            >
               <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} 
                        onRefresh={this.refreshing} />
                    }
                    style={{flex: 1}}
                >
                    <View style={styles.main}>
                        {/* <View 
                            style={{justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                            <Image 
                                source={{uri: imageProvider(this.props.route.params.image)}} 
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
                                    ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                                />
                            </View>
                        ):(null)}
                        
                        <View style={styles.container}>
                        {this.state.tsLoading?(
                                <CustomActivtiyIndicator mode="testItem"/>
                        ):(
                            <FlatList 
                                data={this.state.seriesList} 
                                renderItem={({item})=><RenderSingleTestSeries briefId={item?.insTestSeriesUserResponseBrief?.id} item={item.insTestSeries} status={item?.insTestSeriesUserResponseBrief?.status} navigation={this.props.navigation} addToHistory={this.addToHistory}/>}
                                keyExtractor={(item)=>item.id} 
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}
                                ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                                onEndReachedThreshold={0.1}
                                refreshing={this.state.refreshing}
                                ListFooterComponent={this.renderFooter}
                                onEndReached={() => 
                                {
                                    if(this.state.showLoadMore&&!this.state.loadingFooter)
                                    {
                                        this.setState({ refreshing: true,loadingFooter:true,offset:parseInt(this.state.offset)+1},()=>this.fetch())
                                            
                                    }
                                
                                }}
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

const mapStateToProps = (state)=>({
    userInfo:state.user.userInfo,
})
export default connect(mapStateToProps)(SeriesList);