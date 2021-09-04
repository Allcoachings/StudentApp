import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image, Platform, ScrollView, Modal, ActivityIndicator} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
// import {connect} from 'react-redux'
import { theme,dataLimit,screenMobileWidth,serverBaseUrl,documentPlaceholder, Assets,imageProvider } from '../config';
import AddFeedModal from '../InsHome/AddFeedModal';
import { Feather } from '@expo/vector-icons';
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
// import {Feed} from "../Feed/Feed"

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
        fetch_student_purchase(this.props.userInfo.id, this.state.offset, dataLimit,this.purchaseCallback)
        this.checkForUserCat()
    }

    purchaseCallback=(response)=>{
        this.setState({loadingUserEnrollments:false})
        console.log(response.status)
        if(response.status==200)
        {   
            response.json().then(data=>
            {
                console.log(data)
                this.setState({purchase: data})
            })
        }
        else
        {
            console.log("something went wrong")
        }
    }

    updateEditFeedState=()=>{}

    setUpdateEditFeedState=(ref)=>{
        this.updateEditFeedState=ref;
    }

    header=() => {
        return(
            <View style={{display: 'flex', flexDirection: 'row',  alignItems: 'center', padding: 10, width: '100%', justifyContent: 'space-between'}}>
                <Feather name="chevron-left" size={22} />
                <Text style={{fontSize: 24, color: theme.secondaryColor, fontWeight: '700'}}>Profile</Text>
                <TouchableOpacity onPress={()=>this.openModal()}>
                <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
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
                    <Feather name={icon} size={12} color={this.state.activeTab==link?(theme.primaryColor):(theme.secondaryColor)}/>
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
            return <CustomActivtiyIndicator/>;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
    };

    updateSingleFeed=(item, index)=>{
        var obj=this.state.feeds
        // console.log("obj before ", obj[index])
        obj[index]=item;
        // console.log("obj after ", obj[index])
        this.setState({feeds: obj})
    }

    displayItems=(item)=>{
        if(this.state.subActiveTab==item.type)
        {
            switch(item.type)
            {
                case 'video': return <RenderVideo item={item.data} mode="Profile" navigation={this.props.navigation}/>
                                
                case 'document': return <RenderDocument item={item.data} mode="Profile" navigation={this.props.navigation}/>
                                
                case 'testSeries':  
                 
                return <RenderSingleTestSeries item={item.data} mode="Profile" navigation={this.props.navigation}/>
                                 
            }
        }    
    }


    switchTab=(tab)=>{
        switch(tab)
        {
            case "video":   if(!this.state.isVideoLoaded&&!this.state.isVideoLoading)
                            {
                                this.setState({isVideoLoading: true},()=>
                                fetch_student_history(this.props.userInfo.id, this.state.subActiveTab, this.state.vidOffset, dataLimit, this.studentHistoryCallBack))
                            }
            
                            return(
                                !this.state.isVideoLoaded?(
                                    <CustomActivtiyIndicator mode="video"/>
                                ):(<FlatList
                                    data={this.state.video}
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
                                            console.log("end video")
                                            this.setState({ refreshing: true,loadingFooter:true,vidOffset:parseInt(this.state.vidOffset)+1},()=>this.loadMoreOnPress())
                                                
                                        }
                                    
                                    }}
                                />)
                        )
                        break;
            case "document": 
                            if(!this.state.isDocumentLoaded&&!this.state.isDocumentLoading)
                            {
                                this.setState({isDocumentLoading: true},()=>
                                fetch_student_history(this.props.userInfo.id, this.state.subActiveTab, this.state.docOffset, dataLimit, this.studentHistoryCallBack))
                            }
                            return(
                                !this.state.isDocumentLoaded?(
                                    <CustomActivtiyIndicator mode="document"/>
                                ):(<FlatList
                                    data={this.state.document}
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
                                           
                                            this.setState({ refreshing: true,loadingFooter:true,docOffset:parseInt(this.state.docOffset)+1},()=>this.loadMoreOnPress())
                                                
                                        }
                                    
                                    }}
                                />)
                        )
                        break;
            case "testSeries": 
                            if(!this.state.isTestSeriesLoaded&&!this.state.isTestSeriesLoading)
                            {
                                this.setState({isTestSeriesLoading: true},()=>
                                fetch_student_history(this.props.userInfo.id, this.state.subActiveTab, this.state.tsOffset, dataLimit, this.studentHistoryCallBack))
                            }
                            return(
                                !this.state.isTestSeriesLoaded?(
                                    <CustomActivtiyIndicator mode="testSeries"/>
                                ):(<FlatList
                                    data={this.state.testSeries}
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
                                            console.log("end test")
                                            this.setState({ refreshing: true,loadingFooter:true,tsOffset:parseInt(this.state.tsOffset)+1},()=>this.loadMoreOnPress())
                                                
                                        }
                                    
                                    }}
                                />)
                        )
                        break;
        }
    }
    checkForUserCat=()=>
    {
        AsyncStorage.getItem("userCat").then((response)=>{
            console.log(response)
             if(response)
             {
                 console.log(response)
                 let obj = JSON.parse(response);
                 this.setState({categoryId:obj.id}) 
             }else
             {
                this.setState({categoryId:null}) 
             }
        })
    }
    loadMoreOnPress=()=>{
        if(this.state.subActiveTab=="video")
        {
            fetch_student_history(this.props.userInfo.id, this.state.subActiveTab, this.state.vidOffset, dataLimit, this.studentHistoryCallBack)
        }
        else if(this.state.subActiveTab=="document")
        {
           fetch_student_history(this.props.userInfo.id, this.state.subActiveTab, this.state.docOffset, dataLimit, this.studentHistoryCallBack)
        }
        else if(this.state.subActiveTab=="testSeries")
        {
            fetch_student_history(this.props.userInfo.id, this.state.subActiveTab, this.state.tsOffset, dataLimit, this.studentHistoryCallBack)
        }
    }


    switchTabRender=(activeTab)=>{
        switch (activeTab) {
            case 1:
                return(
                   
                    <View style={{marginBottom: 50}}>
                    {this.state.loadingUserEnrollments?(
                        <CustomActivtiyIndicator mode="skimmer"/>
                    ):(<FlatList
                        data={this.state.purchase}
                        renderItem={({item}) => this.renderPurchageCourse(item)}
                        keyExtractor={(item,index)=>index}
                        ListEmptyComponent={<EmptyList />}
                        ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
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
            console.log("something went wrong")
        }
    }

    studentHistoryCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                if(this.state.subActiveTab=="video")
                {
                    if(data.length>0)
                    {    
                        this.setState({video: [...this.state.video,...data], isVideoLoading: false, isVideoLoaded: true, showLoadMore: true, loadingFooter: false})
                    }
                    else
                    {
                        this.setState({video: this.state.video, isVideoLoading: false, isVideoLoaded: true, showLoadMore: false, loadingFooter: false})
                    }
                }
                else if(this.state.subActiveTab=="document")
                {
                    if(data.length>0)
                    { 
                        this.setState({document: [...this.state.document,...data], isDocumentLoading: false, isDocumentLoaded: true, showLoadMore: true, loadingFooter: false})
                    }
                    else
                    {
                        this.setState({document: this.state.document, isDocumentLoading: false, isDocumentLoaded: true, showLoadMore: false, loadingFooter: false})
                    }
                }
                else if(this.state.subActiveTab=="testSeries")
                {
                    if(data.length>0)
                    { 
                        this.setState({testSeries: [...this.state.testSeries,...data], isTestSeriesLoading: false, isTestSeriesLoaded: true, showLoadMore: true, loadingFooter: false})
                    }
                    else
                    {
                        this.setState({testSeries: [...this.state.testSeries,...data], isTestSeriesLoading: false, isTestSeriesLoaded: true, showLoadMore: false, loadingFooter: false})
                    }
                }
            })
        }
        else
        {
            console.log("something went wrong")
        }
    }

    render(){
        // console.log(this.props.userInfo)
        // console.log(this.state.history)
        return (
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                // headerComponent={this.header()}
                // replaceHeader={true}
                titleonheader={"Profile"}
                headerStyle={{ justifyContent: 'center'}}
                replaceBottomTab={false}
                nosearchIcon={true}
                noNotificationIcon={true}
                // notificationreplaceshare={"more-vertical"}
                // rightIconOnPress={()=>this.openModal()} 
            >
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.userInfoSecView}>
                            <View style={styles.imageView}>
                                <Image source={{ uri: imageProvider(this.props.userInfo.studentImage) }} style={styles.image}/>
                            </View>
                            <View style={styles.nameView}>
                                <Text style={styles.name}>{this.props.userInfo.name}</Text>
                                <Text style={styles.number}>{this.props.userInfo.mobileNumber}</Text>
                            </View>
                        </View>
                        <View style={{marginTop:10}}/>

                        <View style={styles.profile_navigation}>
                                <View style={[styles.btnView1,this.state.activeTab==1?({backgroundColor:theme.accentColor,borderColor:theme.accentColor}):({backgroundColor:theme.primaryColor,borderColor:theme.labelOrInactiveColor})]}>
                                    <Text style={[styles.btnText,{color:this.state.activeTab==1?theme.primaryColor:theme.greyColor}]} onPress={()=>{this.activeTab(1)}}>Enrollments</Text>
                                </View>
                                {/* <View>
                                    <Text style={[styles.navlink,{color:this.state.activeTab==1?theme.accentColor:theme.labelOrInactiveColor}]} onPress={()=>{this.activeTab(1)}}>Enrollments</Text>
                                </View> */}


                                <View style={[styles.btnView1,this.state.activeTab==2?({backgroundColor:theme.accentColor,borderColor:theme.accentColor}):({backgroundColor:theme.primaryColor,borderColor:theme.labelOrInactiveColor})]}>
                                    <Text style={[styles.btnText,{color:this.state.activeTab==2?theme.primaryColor:theme.greyColor}]} onPress={()=>this.activeTab(2) }>Recents</Text>
                                </View>
                               



                                <View style={[styles.btnView1,this.state.activeTab==3?({backgroundColor:theme.accentColor,borderColor:theme.accentColor}):({backgroundColor:theme.primaryColor,borderColor:theme.labelOrInactiveColor})]}>
                                    <Text style={[styles.btnText,{color:this.state.activeTab==3?theme.primaryColor:theme.greyColor}]} onPress={()=>{    this.activeTab(3),
                                        this.setState({isFeedLoading:true, offset: 0},()=>fetch_student_feed(this.props.userInfo.id,this.state.offset,dataLimit, this.fetchFeedCallback))}}>Feed</Text>
                                </View>
                                 
                        </View>

                        <View style={{borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor, marginTop:10}}/>


                        {this.switchTabRender(this.state.activeTab)}


                       
                        

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
            </PageStructure>
            
        )
    }

}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        flexDirection: 'column',
        marginTop:10
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
                    height: 80,
                    width: 80,
                    borderRadius: 40
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
                    fontSize: 16,
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
export default connect(mapStateToProps)(UserProfile);