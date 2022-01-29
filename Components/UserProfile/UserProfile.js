import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,Dimensions,FlatList, Image, Platform, ScrollView, Modal, ActivityIndicator, TouchableWithoutFeedback} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
// import {connect} from 'react-redux'
import { theme,dataLimit,screenMobileWidth,serverBaseUrl,documentPlaceholder, Assets,imageProvider } from '../config';
import AddFeedModal from '../InsHome/AddFeedModal';
import { Entypo, EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Redirect } from 'react-router';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import EditModal from './EditModal'
import PurchageListRow from './PurchageListRow';
import {fetch_student_feed} from "../Utils/DataHelper/Feed"
import FeedText from '../Feed/FeedText';
import FeedImage from '../Feed/FeedImage';
import FeedPoll from '../Feed/FeedPoll';
import {fetch_student_history} from '../Utils/DataHelper/StudentHistory';
import {fetch_student_purchase} from '../Utils/DataHelper/UserProfile';
import Instructions from '../SeriesList/Instructions';
import RenderSingleTestSeries from '../SeriesList/RenderSingleTestSeries';
import RenderDocument from '../InstituteView/RenderDocument';
import RenderVideo from '../InstituteView/RenderVideo';
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import { isThisSecond } from 'date-fns/esm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toggleHeader } from '../Actions';
import { TOGGLE_HEADER } from '../Actions/types';

import SendMessage from '../InstituteView/SendMessage'
// import {Feed} from "../Feed/Feed"
const width = Dimensions.get('window').width
class UserProfile extends React.Component {

    state={
        isModalVisible: false,
        activeTab: 1,
        isPurchageModalVisible: false,
        isAddFeedModalVisible: false,
        feeds:[],
        offset: 0,
        loadingData: false,
        history:[],
        subActiveTab: "video", 
        purchase:[],
        modalVisible: false,
        loadingUserEnrollments: true,
        item:{},
        testSeries: [],
        video: [],
        document: [],
        vidOffset:0,
        docOffset:0,
        tsOffset:0,
        showLoadMore: true,
        loadingFooter: false,
        enrollOffset:0,
        enrollListLoading: true,
        recentData:[]
    }
     
    closeModal = () => {
        this.setState({ isModalVisible: false});
    }
    openModal = () => {
        this.setState({ isModalVisible: true });
    }

    openPurchageModal = ()=>{
        this.setState({ isPurchageModalVisible: true});
    }
    closePurchageModal = ()=>{
        this.setState({ isPurchageModalVisible: false});
    }

    componentDidMount() {
        this.fetch()
        this.checkForUserCat()
        this.props.toggleHeader(false) 
        this.unsubscribeFocusListeners = this.props.navigation.addListener('focus', () => {  
            this.props.toggleHeader(false) 
        });
            
            
          



    }

    fetch=()=>{
        fetch_student_purchase(this.props.userInfo.id, this.state.enrollOffset, dataLimit,this.purchaseCallback)
    }

    purchaseCallback=(response)=>{
        this.setState({loadingUserEnrollments:false})
        // console.log(response.status)
        if(response.status==200)
        {   
            response.json().then(data=>
            {
                // console.log(data)
                // this.setState({purchase: data})
                if(data.length>0)
                {
                    this.setState({purchase:[...this.state.purchase,...data],enrollListLoading:false, showLoadMore: true, loadingFooter:false});  
                }
                else
                {
                    this.setState({purchase:this.state.purchase,enrollListLoading:false, showLoadMore: false, loadingFooter: false}); 
                } 
            })
        }
        else
        {
            // console.log("something went wrong")
        }
    }
    componentWillUnmount()
    {
        this.props.toggleHeader(true)
        if( this.unsubscribeFocusListeners)
        {
            console.log(this.unsubscribeFocusListeners)
            this.unsubscribeFocusListeners()
        }
    }
    updateEditFeedState=()=>{}

    setUpdateEditFeedState=(ref)=>{
        this.updateEditFeedState=ref;
    }

    header=() => {
        return(
            <View style={{display: 'flex', flexDirection: 'row',  alignItems: 'center', padding: 10, width: '100%', justifyContent: 'space-between'}}>
                <EvilIcons name="chevron-left" size={22} />
                <Text style={{fontSize: 24, color: theme.secondaryColor, fontWeight: '700'}}>Profile</Text>
                <TouchableOpacity onPress={()=>this.openModal()}>
                <EvilIcons name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                </TouchableOpacity>
            </View>
        )
    }

    renderPurchageCourse=(item)=>{
        return(
            <PurchageListRow item={item} navigation={this.props.navigation}/>
        )
    }

    renderList=(text, icon, link)=>
    {
        return(
            <TouchableOpacity 
                onPress={()=>{this.setState({subActiveTab: link})}} 
                style={[styles.setList,this.state.activeTab==link?({backgroundColor:theme.secondaryColor}):(null)]}
            >
                    <EvilIcons name={icon} size={12} color={this.state.activeTab==link?(theme.primaryColor):(theme.secondaryColor)}/>
                    <Text style={[styles.listText,this.state.activeTab==link?({color:theme.primaryColor}):(null)]}>{text}</Text>
            </TouchableOpacity>
        )
    }


    openAddFeedModal = ()=>{
        this.setState({ isAddFeedModalVisible: true});
    }
    closeAddFeedModal = ()=>{
        this.setState({ isAddFeedModalVisible: false});
    }

    // tabs handling
    activeTab=(tabValue)=>{
        this.setState({activeTab:tabValue});
    }

    renderFeedItem=(item, index)=>
    {
        
        switch(item.feed.feed.feedType)
        {
            case 1:
                return (
                    <FeedImage item={item} type={2} navigation={this.props.navigation} mode="userProfile" updateEditFeedState={this.updateEditFeedState} index={index}/>
                )
            case 2:
           

                return (
                    <FeedPoll item={item} type={2} navigation={this.props.navigation} mode="userProfile" updateEditFeedState={this.updateEditFeedState} index={index}/>
                )
            case 3:
                return (
                    <FeedText item={item} type={2} navigation={this.props.navigation} mode="userProfile" updateEditFeedState={this.updateEditFeedState} index={index}/>
                )
        }
    }

   

    renderFooter = () => {
        try {
       
          if (this.state.loadingFooter) {
            return <CustomActivtiyIndicator mode="skimmer"/>;
          } else {
            return <View style={{height:10}}></View>;
          }
        } catch (error) {
          // console.log(error);
        }
    };

    updateSingleFeed=(item, index)=>{
        var obj=this.state.feeds
        // // console.log("obj before ", obj[index])
        obj[index]=item;
        // // console.log("obj after ", obj[index])
        this.setState({feeds: obj})
    }

    displayItems=(item)=>{
         
            switch(item.type)
            {
                case 'video': return (
                <View style={{marginLeft:10}}>
                        <RenderVideo item={item.data} mode="Profile" navigation={this.props.navigation}/>
                </View>)
                
                                
                case 'document': return (
                    <View style={{marginLeft:10}}>
                        <RenderDocument item={item.data} mode="Profile" navigation={this.props.navigation}/>
                    </View>
                    )
                                
                case 'testSeries':  
                 
                return <RenderSingleTestSeries item={item.data} mode="Profile" navigation={this.props.navigation}/>
                                 
            }
         
    }

   


    switchTab=(tab)=>{
        // switch(tab)
        // {
        //     case "video":   if(!this.state.isVideoLoaded&&!this.state.isVideoLoading)
        //                     {
        //                         this.setState({isVideoLoading: true},()=>
        //                         fetch_student_history(this.props.userInfo.id, this.state.subActiveTab, this.state.vidOffset, dataLimit, this.studentHistoryCallBack))
        //                     }
            
        //                     return(
        //                         !this.state.isVideoLoaded?(
        //                             <CustomActivtiyIndicator mode="video"/>
        //                         ):(<FlatList
        //                             data={this.state.video}
        //                             renderItem={({item}) => this.displayItems(item)}
        //                             keyExtractor={(item,index)=>index}
        //                             ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
        //                             onEndReachedThreshold={0.1}
        //                             refreshing={this.state.refreshing}
        //                             ListFooterComponent={this.renderFooter}
        //                             onEndReached={() => 
        //                             {
        //                                 if(this.state.showLoadMore&&!this.state.loadingFooter)
        //                                 {
        //                                     // console.log("end video")
        //                                     this.setState({ refreshing: true,loadingFooter:true,vidOffset:parseInt(this.state.vidOffset)+1},()=>this.loadMoreOnPress())
                                                
        //                                 }
                                    
        //                             }}
        //                         />)
        //                 )
        //                 break;
        //     case "document": 
        //                     if(!this.state.isDocumentLoaded&&!this.state.isDocumentLoading)
        //                     {
        //                         this.setState({isDocumentLoading: true},()=>
        //                         fetch_student_history(this.props.userInfo.id, this.state.subActiveTab, this.state.docOffset, dataLimit, this.studentHistoryCallBack))
        //                     }
        //                     return(
        //                         !this.state.isDocumentLoaded?(
        //                             <CustomActivtiyIndicator mode="document"/>
        //                         ):(<FlatList
        //                             data={this.state.document}
        //                             renderItem={({item}) => this.displayItems(item)}
        //                             keyExtractor={(item,index)=>index}
        //                             ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
        //                             onEndReachedThreshold={0.1}
        //                             refreshing={this.state.refreshing}
        //                             ListFooterComponent={this.renderFooter}
        //                             onEndReached={() => 
        //                             {
        //                                 if(this.state.showLoadMore&&!this.state.loadingFooter)
        //                                 {
                                           
        //                                     this.setState({ refreshing: true,loadingFooter:true,docOffset:parseInt(this.state.docOffset)+1},()=>this.loadMoreOnPress())
                                                
        //                                 }
                                    
        //                             }}
        //                         />)
        //                 )
        //                 break;
        //     case "testSeries": 
        //                     if(!this.state.isTestSeriesLoaded&&!this.state.isTestSeriesLoading)
        //                     {
        //                         this.setState({isTestSeriesLoading: true},()=>
        //                         fetch_student_history(this.props.userInfo.id, this.state.subActiveTab, this.state.tsOffset, dataLimit, this.studentHistoryCallBack))
        //                     }
        //                     return(
        //                         !this.state.isTestSeriesLoaded?(
        //                             <CustomActivtiyIndicator mode="testSeries"/>
        //                         ):(<FlatList
        //                             data={this.state.testSeries}
        //                             renderItem={({item}) => this.displayItems(item)}
        //                             keyExtractor={(item,index)=>index}
        //                             ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
        //                             onEndReachedThreshold={0.1}
        //                             refreshing={this.state.refreshing}
        //                             ListFooterComponent={this.renderFooter}
        //                             onEndReached={() => 
        //                             {
        //                                 if(this.state.showLoadMore&&!this.state.loadingFooter)
        //                                 {
        //                                     // console.log("end test")
        //                                     this.setState({ refreshing: true,loadingFooter:true,tsOffset:parseInt(this.state.tsOffset)+1},()=>this.loadMoreOnPress())
                                                
        //                                 }
                                    
        //                             }}
        //                         />)
        //                 )
        //                 break;
        // }



        if(!this.state.isLoaded&&!this.state.isLoading)
        {
            this.setState({isLoading: true},()=>
            fetch_student_history(this.props.userInfo.id,  this.state.vidOffset, dataLimit, this.studentHistoryCallBack))
        }

        return(
            !this.state.isLoaded?(
                <CustomActivtiyIndicator mode="video"/>
            ):( 
                <FlatList
                    data={this.state.recentData}
                    renderItem={({item}) => this.displayItems(item)}
                    keyExtractor={(item,index)=>index}
                    ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                    onEndReachedThreshold={0.1}
                    refreshing={this.state.refreshing}
                    ListFooterComponent={this.renderFooter}
                    onEndReached={() => 
                    {
                        if(this.state.showLoadMore&&!this.state.loadingFooter)
                        {
                            // console.log("end test")
                            this.setState({ refreshing: true,loadingFooter:true,tsOffset:parseInt(this.state.tsOffset)+1},()=>this.loadMoreOnPress())
                                
                        }
                    
                    }}
                />
            )
        )
    }
    checkForUserCat=()=>
    {
        AsyncStorage.getItem("userCat").then((response)=>{
            // console.log(response)
             if(response)
             {
                 // console.log(response)
                 let obj = JSON.parse(response);
                 this.setState({categoryId:obj.id}) 
             }else
             {
                this.setState({categoryId:null}) 
             }
        })
    }
    loadMoreOnPress=()=>{
        // if(this.state.subActiveTab=="video")
        // {
            // console.log(this.state.tsOffset)
            fetch_student_history(this.props.userInfo.id, this.state.tsOffset, dataLimit, this.studentHistoryCallBack)
        // }
        // else if(this.state.subActiveTab=="document")
        // {
        //    fetch_student_history(this.props.userInfo.id, this.state.subActiveTab, this.state.docOffset, dataLimit, this.studentHistoryCallBack)
        // }
        // else if(this.state.subActiveTab=="testSeries")
        // {
        //     fetch_student_history(this.props.userInfo.id, this.state.subActiveTab, this.state.tsOffset, dataLimit, this.studentHistoryCallBack)
        // }
    }


    switchTabRender=(activeTab)=>{
        switch (activeTab) {
            case 1:
                return(
                   
                    <View style={{marginBottom: 50}}>
                    {this.state.loadingUserEnrollments?(
                        <CustomActivtiyIndicator mode="skimmer"/>
                    ):(
                    
                    <FlatList
                        data={this.state.purchase}
                        renderItem={({item}) => this.renderPurchageCourse(item)}
                        keyExtractor={(item,index)=>index}
                        ListEmptyComponent={<EmptyList />}
                        ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                        onEndReachedThreshold={0.1}
                        refreshing={this.state.refreshing}
                        ListFooterComponent={this.renderFooter}
                        onEndReached={() => 
                        {
                            if(this.state.showLoadMore&&!this.state.loadingFooter)
                            {
                                this.setState({ refreshing: true,loadingFooter:true,enrollOffset:parseInt(this.state.enrollOffset)+1},()=>this.fetch())
                                    
                            }
                        
                        }}
                    />)}
                    </View>

                )
            case 2:
                return(
                    <View>
                            <View style={styles.content}>
                                {this.renderList('Videos', 'play-circle', 'video')}
                                {this.renderList('Test Series', 'copy', 'testSeries')}
                                {this.renderList('Document', 'file', 'document')}
                            </View>
                            <View style={styles.dataContainer}>
                                    {this.switchTab(this.state.subActiveTab)}
                            </View>
                            
                            
                    </View>
                )
            case 3:
            return(
                <View style={styles.container}>
                    {/* <TouchableOpacity  onPress={()=>this.openAddFeedModal()} style={{backgroundColor: theme.textColor, justifyContent: 'center', alignItems: 'center', padding:5, borderRadius:5}}> 
                        <Text style={{color: theme.primaryColor}}>Add Feed</Text>
                    </TouchableOpacity>            */}
                    <AddFeedModal 
                            addFeedCallBack={this.appendFeed}
                            isAddFeedModalVisible={this.state.isAddFeedModalVisible} 
                            closeModal={this.closeAddFeedModal}
                            posterId={this.props.userInfo.id} 
                            posterImage={this.props.userInfo.studentImage}
                            postedBy={2}
                            categoryId={this.state.categoryId}
                            instituteDetails={this.props.userInfo}
                            setUpdateFun={this.setUpdateEditFeedState}
                            updateSingleFeed={this.updateSingleFeed}
                    />
                    {this.state.isFeedLoading?(
                            <CustomActivtiyIndicator mode="skimmer"/>
                    ):(
                        <FlatList
                            data={this.state.feeds}
                            renderItem={({item, index}) => this.renderFeedItem(item, index)}
                            keyExtractor={(item,index)=>index}
                            ListEmptyComponent={<EmptyList />}
                            ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                        />
                    )}
                </View>
            )
        }

    }

    appendFeed=(feed)=>{
        let feeds = this.state.feeds
        feeds.unshift(feed)
        this.setState({feeds})
    }

    fetchFeedCallback=(response)=>{
        this.setState({loadingData:false})
        if(response.status==200)
        {
            response.json().then(data=>
            {

                this.setState({feeds: data, isFeedLoading: false})
            })
        }
        else
        {
            // console.log("something went wrong")
        }
    }

    studentHistoryCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {


                if(data.length>0)
                {
                    this.setState({recentData: [...this.state.recentData,...data], isLoading: false, isLoaded: true, showLoadMore: true, loadingFooter: false})
                }else
                {
                    this.setState({recentData: [...this.state.recentData,...data], isLoading: false, isLoaded: true, showLoadMore: false, loadingFooter: false})
                }
                
                // if(this.state.subActiveTab=="video")
                // {
                //     if(data.length>0)
                //     {    
                //         this.setState({video: [...this.state.video,...data], isVideoLoading: false, isVideoLoaded: true, showLoadMore: true, loadingFooter: false})
                //     }
                //     else
                //     {
                //         this.setState({video: this.state.video, isVideoLoading: false, isVideoLoaded: true, showLoadMore: false, loadingFooter: false})
                //     }
                // }
                // else if(this.state.subActiveTab=="document")
                // {
                //     if(data.length>0)
                //     { 
                //         this.setState({document: [...this.state.document,...data], isDocumentLoading: false, isDocumentLoaded: true, showLoadMore: true, loadingFooter: false})
                //     }
                //     else
                //     {
                //         this.setState({document: this.state.document, isDocumentLoading: false, isDocumentLoaded: true, showLoadMore: false, loadingFooter: false})
                //     }
                // }
                // else if(this.state.subActiveTab=="testSeries")
                // {
                //     if(data.length>0)
                //     { 
                //         this.setState({testSeries: [...this.state.testSeries,...data], isTestSeriesLoading: false, isTestSeriesLoaded: true, showLoadMore: true, loadingFooter: false})
                //     }
                //     else
                //     {
                //         this.setState({testSeries: [...this.state.testSeries,...data], isTestSeriesLoading: false, isTestSeriesLoaded: true, showLoadMore: false, loadingFooter: false})
                //     }
                // }
            })
        }
        else
        {
            // console.log("something went wrong")
        }
    }

    renderButton=(icon,label,fun)=>
    {
            return (
                <TouchableWithoutFeedback onPress={fun} >
                    <View style={{backgroundColor:theme.labelOrInactiveColor+'66',flexDirection: 'row',padding:10,alignItems: 'center',margin:10,borderRadius:5,width:(width/2)-10}}>
                        <Image source={icon} style={{width: 30,height: 30,marginRight:20}}/>
                        <Text style={{fontFamily: 'Raleway_600SemiBold'}}>{label}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
    }


    
    render(){
        // console.log(this.props.userInfo)
        // // console.log(this.props.userInfo)
        // // console.log(this.state.history)
        return (
            // <PageStructure
            //     iconName="navicon"
            //     btnHandler={() => {this.props.navigation.toggleDrawer()}}
            //     titleonheader={"Profile"}
            //     headerStyle={{ justifyContent: 'center'}}
            //     replaceBottomTab={false}
            //     nosearchIcon={true}
            //     noNotificationIcon={true}
            // >
            <>
                <ScrollView>
                    <View style={styles.container}>
                        <TouchableWithoutFeedback onPress={this.props.navigation.goBack}>
                            <View style={{margin:10}}>
                                <Entypo name="cross" size={30}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.userInfoSecView}>
                           
                            <View style={styles.imageView}>
                                <Image 
                                    source={ { uri:imageProvider(this.props.userInfo.studentImage)} } 
                                    style={styles.image}
                                    ref={(ref)=>this.imageRef=ref}
                                    onError={()=>
                                        {
                                            if(this.imageRef)
                                            {
                                                this.imageRef.setNativeProps({
                                                    src:[Image.resolveAssetSource(Assets.profile.profileIcon)]
                                                })
                                            }
                                        }}
                                />
                            </View>
                            <View style={styles.nameView}>
                                <Text style={styles.name}>{this.props.userInfo.name}</Text>
                                <Text style={styles.number}>@{this.props.userInfo.userId}</Text>
                            </View>
                            <TouchableWithoutFeedback onPress={() =>this.props.navigation.navigate('EditProfile')}>
                                <View style={{marginLeft:'auto',marginRight:10,borderWidth:1,borderColor:theme.labelOrInactiveColor,padding:5,borderRadius:5}}> 
                                        <Text style={{fontFamily: 'Raleway_600SemiBold'}}>Edit Profile</Text>
                                </View> 
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{marginVertical:10,height:10,borderTopWidth:8,borderColor:theme.labelOrInactiveColor+'66'}}/>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                            {this.renderButton(Assets.profile.enrollment,'Enrollments',()=>{this.props.navigation.navigate('Enrollments')})}
                            {this.renderButton(Assets.profile.downloadIcon,'Downloads',()=>{this.props.navigation.navigate('Downloads')})}
                        </View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                            {this.renderButton(Assets.profile.notifications,'Notification',()=>{this.props.navigation.navigate('Notification',{mode:'student'})})}
                            {this.renderButton(Assets.profile.people,'Community',()=>{this.props.navigation.navigate('UserCommunityPosts')})}
                        </View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                            {this.renderButton(Assets.profile.helpNsupport,'Help & Support',()=>{this.setState({helpAndSupportModalVisible:true})})}
                            {this.renderButton(Assets.profile.settings,'Settings',()=>{this.props.navigation.navigate('Settings')})}
                        </View>
                        <View style={{marginVertical:10,height:10,borderTopWidth:8,borderColor:theme.labelOrInactiveColor+'66'}}/>

                        <View style={{flexDirection:'row',alignItems: 'center',margin:10}}>
                                    <Image source={Assets.profile.recents} style={{width:15,height:15}} />
                                    <Text style={{fontFamily: 'Raleway_600SemiBold',marginLeft:10,fontSize:15}}>Recent Activity</Text>
                        </View>
                        {/* <View style={styles.profile_navigation}>
                                
                                <View style={[styles.btnView1,this.state.activeTab==1?({backgroundColor:theme.accentColor,borderColor:theme.accentColor}):({backgroundColor:theme.primaryColor,borderColor:theme.labelOrInactiveColor})]}>
                                    <Text style={[styles.btnText,{color:this.state.activeTab==1?theme.primaryColor:theme.greyColor}]} onPress={()=>{this.activeTab(1)}}>Enrollments</Text>
                                </View>
                                
                                <View style={[styles.btnView1,this.state.activeTab==2?({backgroundColor:theme.accentColor,borderColor:theme.accentColor}):({backgroundColor:theme.primaryColor,borderColor:theme.labelOrInactiveColor})]}>
                                    <Text style={[styles.btnText,{color:this.state.activeTab==2?theme.primaryColor:theme.greyColor}]} onPress={()=>this.activeTab(2) }>Recents</Text>
                                </View>
                               



                                <View style={[styles.btnView1,this.state.activeTab==3?({backgroundColor:theme.accentColor,borderColor:theme.accentColor}):({backgroundColor:theme.primaryColor,borderColor:theme.labelOrInactiveColor})]}>
                                    <Text style={[styles.btnText,{color:this.state.activeTab==3?theme.primaryColor:theme.greyColor}]} onPress={()=>{    this.activeTab(3),
                                        this.setState({isFeedLoading:true, offset: 0},()=>fetch_student_feed(this.props.userInfo.id,this.state.offset,dataLimit, this.fetchFeedCallback))}}>Feed</Text>
                                </View>
                                 
                        </View> */}

                        {/* <View style={{borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor, marginTop:10}}/> */}


                        {/* {this.switchTabRender(this.state.activeTab)} */}

                        {this.switchTab(this.state.subActiveTab)}
                       
                        

                    </View>      
                </ScrollView>
                {this.state.isModalVisible ? (
                    <EditModal
                        isModalVisible={this.state.isModalVisible}
                        closeModal={this.closeModal}
                    />
                ) : (null)}
                {/* {this.state.isAddFeedModalVisible?(
                        <AddFeedModal 
                            addFeedCallBack={this.appendFeed}
                            isAddFeedModalVisible={this.state.isAddFeedModalVisible} 
                            closeModal={this.closeAddFeedModal}
                            posterId={this.props.userInfo.id} 
                            postedBy={2}
                            instituteDetails={this.props.userInfo}
                        />
                ):(
                    null
                )} */}
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
                  {this.state.helpAndSupportModalVisible?(
                    <SendMessage
                        isVisible={this.state.helpAndSupportModalVisible}
                        closeModal={()=>this.setState({helpAndSupportModalVisible:false})}
                        forAdmin={true}  
                        studentId={this.props.userInfo.id}
                        title="Help & Support"
                        messageType="helpAndSupport"
                    />
                ):(null)}
            </>

            // </PageStructure>
            
        )
    }

}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        flexDirection: 'column',
        
    },
        userInfoSecView:
        {
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
        },
            imageView:
            {
                marginHorizontal: 20,
            },
                image:
                {
                    height: 50,
                    width: 50,
                    borderRadius: 25
                },
            nameView:
            {
                marginLeft: 5
            },
                name:
                {
                    fontSize: 18,
                    // fontWeight: 'bold',
                    color: theme.secondaryColor
                },
                number:
                {
                    fontSize: 12,
                    // fontWeight: 'bold',
                    color: theme.greyColor
                },


        profile_navigation:{
            flex:1,
            flexDirection: 'row',
            justifyContent: 'space-between', 
            // marginHorizontal: 20,
        },
            navlink:{
                fontSize: 20,
                color: theme.greyColor
            },


        btnView1:
            {
                flex: 0.4,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
                backgroundColor:theme.greyColor,
                borderRadius: 5,
                borderWidth:1,
                margin: 2, 
                justifyContent:'center',
                alignItems: 'center'
            },
                btnText:
                {
                    fontFamily: 'Raleway_600SemiBold',
                    fontSize: 16,
                    color: theme.greyColor
                },



        // feed wala style

        headView:
        {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 5,
        },
            headText:
            {
                fontSize: 24,
                fontWeight: 'bold',
                marginLeft: '10%'
            },
        boxView:
        {
            display: 'flex',
            flexDirection: 'column',
            // borderWidth: 1,
            borderColor: theme.labelOrInactiveColor,
            padding: 2
        },
            rowView:
            {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10
            },
                circleView:
                {
                    // height: 15,
                    // width: 15,
                    // borderRadius: 7,
                    // backgroundColor: theme.redColor
                },
                coaching:
                {
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: theme.accentColor
                },
                timeDateView:
                {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                },
                    timeDateText:
                    {
                        fontSize: 16,
                        color: theme.secondaryColor
                    },
            innerBoxView:
            {
                // borderWidth: 1,
                borderColor: theme.labelOrInactiveColor,
                borderRadius: 2,
                marginTop: 10,
                padding: 10,
            },
                img:
                {
                    height: 150,
                    width: '100%',
                },
                bottomRowContainer:
                {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10
                },
                    likeView:
                    {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center'
                    },
                        text:
                        {
                            fontSize: 18,
                            color: theme.greyColor
                        },
                // feed wala end


    // history wala

    purchage_coursewrapper:{
        flexDirection: 'row',
        marginTop: 20,
    },

    curvedimage:{
        height: 90,
        width: 100,
        marginRight: 12,
        borderRadius: 10,
    },
    content: 
    {
        marginTop: '6%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
                    liveClassOuter:
                    {
                        borderColor: 'red',
                        borderWidth:1,   
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 4,
                    },
                        liveClassInner:
                        {
                            padding: 3,
                            borderRadius: 1,
                            borderColor: theme.secondaryColor,
                            backgroundColor: 'red',  
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginLeft: 3,
                            marginRight: 3,
                            alignItems: 'center'
                        },
                            liveClassText:
                            {
                                fontSize:10,
                                fontWeight: '700',
                                color:theme.primaryColor
                            },
    
    setList:
    {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: theme.secondaryColor,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
        listText:
        {
            fontSize:9,
            fontWeight: '700',
            color:theme.secondaryColor,
            paddingTop: 3,
            paddingBottom: 3,
        },
    dataContainer:
    {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column'
    },
        videoContainer:
        {
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row'
        },
            videoImage:
            {
                height: 100,
                width:  130,
                borderRadius: 10,
            },
            videoColumn:
            {
                marginLeft: 5,
                display: 'flex', 
                flexDirection: 'column'
            },
            videoText:
            {
                marginBottom: 5,
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
                    },
        documentContainer:
        {
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
            // overflow: 'hidden'
            // justifyContent: 'center',
            // alignItems: 'center'
        },
            documentImage:
            {
                height: 100,
                width:  90,
                borderRadius: 10,
                marginRight: 10,
                borderColor: 'green', 
                // overflow: 'hidden'
            },
            documentTitle:
            {
                // flex: 1, 
                // flexWrap: 'wrap',
                flexShrink: 1,
                fontWeight: '700',
                
            },
            documentText:
            {
                color: theme.secondaryColor,
            },

})

const  mapStateToProps = (state)=>
{
    return {
        userInfo:state.user.userInfo,
    }
}
export default connect(mapStateToProps,{toggleHeader})(UserProfile);