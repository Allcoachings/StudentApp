import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image, Platform, ScrollView, Modal, ActivityIndicator} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
// import {connect} from 'react-redux'
import { theme,dataLimit,screenMobileWidth,serverBaseUrl,documentPlaceholder } from '../config';
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
        subActiveTab: "video"
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

      renderPurchageCourse=(institute_name)=>{
          return(
            <PurchageListRow institute_name={institute_name} />
          )
      }


    //   hadle history wala
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


    //   feed wala

    renderLikeShareRow=()=>{
        return(
            <View style={styles.bottomRowContainer}>
                <View style={styles.likeView}>
                    <Feather name="thumbs-up" size={18} />
                    <Text style={styles.text}>Like</Text>
                </View>
                <View style={styles.likeView}>
                    <Feather name="message-square" size={18} />
                    <Text style={styles.text}>Comment</Text>
                </View>
                <View style={styles.likeView}>
                    <Feather name="send" size={18} />
                    <Text style={styles.text}>Share</Text>
                </View>
            </View>
        )
    }

    renderImagePost=() => {
        return(
            CardView(
                <View style={styles.boxView}>
                    <View style={styles.rowView}>
                        <View style={styles.circleView} />
                        <Text style={styles.coaching}>Saket IAS Allahabad</Text>
                        <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                    </View>
                    <View style={styles.timeDateView}>
                        <Text style={styles.timeDateText}>4:00 AM</Text>
                        <Text style={styles.timeDateText}>28/05/2021</Text>
                    </View>
                    <View style={styles.innerBoxView}>
                        <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.img}/>
                        <View style={styles.bottomRowContainer}>
                            <View style={styles.likeView}>
                                <Feather name="thumbs-up" size={18} />
                                <Text style={styles.text}>Like</Text>
                            </View>
                            <View style={styles.likeView}>
                                <Feather name="message-square" size={18} />
                                <Text style={styles.text}>Comment</Text>
                            </View>
                            <View style={styles.likeView}>
                                <Feather name="send" size={18} />
                                <Text style={styles.text}>Share</Text>
                            </View>
                        </View>
                    </View>
                </View>,{width: '100%', padding: 6, marginBottom: 10}
            )
        )
    }

    renderQuizPost=() => {
        return(
            CardView(
                <View style={styles.boxView}>
                    <View style={styles.rowView}>
                        <View style={styles.circleView} />
                        <Text style={styles.coaching}>Chandra Institute Allahabad</Text>
                        <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                    </View>
                    <View style={styles.timeDateView}>
                        <Text style={styles.timeDateText}>4:00 AM</Text>
                        <Text style={styles.timeDateText}>28/05/2021</Text>
                    </View>
                    <View style={styles.innerBoxView}>
                        <Text style={{fontSize: 18, marginBottom: 10}}>In 1768, Captain James Cook set out to explore which ocean?</Text>
                        <View Style={{display: 'flex', flexDirection: 'column'}}>
                            <Text style={{fontSize: 16, marginTop: 3}}>Pacific Ocean</Text>
                            <Text style={{fontSize: 16, marginTop: 3}}>Atlantic Ocean</Text>
                            <Text style={{fontSize: 16, marginTop: 3}}>Indian Ocean</Text>
                            <Text style={{fontSize: 16, marginTop: 3}}>Arctic Ocean</Text>
                        </View>

                        <View style={styles.bottomRowContainer}>
                            <View style={styles.likeView}>
                                <Feather name="thumbs-up" size={18} />
                                <Text style={styles.text}>Like</Text>
                            </View>
                            <View style={styles.likeView}>
                                <Feather name="message-square" size={18} />
                                <Text style={styles.text}>Comment</Text>
                            </View>
                            <View style={styles.likeView}>
                                <Feather name="send" size={18} />
                                <Text style={styles.text}>Share</Text>
                            </View>
                        </View>
                    </View>
                </View>,{width: '100%', padding: 6, marginBottom: 10}
            )
        )
    }


    renderTextPost=() => {
        return(
            CardView(
                <View style={styles.boxView}>
                    <View style={styles.rowView}>
                        <View style={styles.circleView} />
                        <Text style={styles.coaching}>Test Coachings</Text>
                        <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                    </View>
                    <View style={styles.timeDateView}>
                        <Text style={styles.timeDateText}>4:00 AM</Text>
                        <Text style={styles.timeDateText}>28/05/2021</Text>
                    </View>
                    <View style={styles.innerBoxView}>
                        <Text style={{fontSize: 18, marginBottom: 5}}>Covid Live News Updates: AstraZeneca shots should be halted for over-60s too, says European Medicines Agency</Text>
                        <View style={styles.bottomRowContainer}>
                            <View style={styles.likeView}>
                                <Feather name="thumbs-up" size={18} />
                                <Text style={styles.text}>Like</Text>
                            </View>
                            <View style={styles.likeView}>
                                <Feather name="message-square" size={18} />
                                <Text style={styles.text}>Comment</Text>
                            </View>
                            <View style={styles.likeView}>
                                <Feather name="send" size={18} />
                                <Text style={styles.text}>Share</Text>
                            </View>
                        </View>
                    </View>
                </View>,{width: '100%', padding: 6, marginBottom: 10}
            )
        )
    }

    // feed wala end

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

    renderFeedItem=(item)=>
    {
        
        switch(item.feed.feed.feedType)
        {
            case 1:
                return (
                    <FeedImage item={item} type={2}/>
                )
            case 2:
                return (
                    <FeedPoll item={item} type={2}/>
                )
            case 3:
                return (
                    <FeedText item={item} type={2}/>
                )
        }
    }

    displayItems=(item)=>{
        if(this.state.subActiveTab==item.type)
        {
            switch(item.type)
            {
                case 'video': return this.renderVideos(item.data)
                                break;
                case 'document': return this.renderDocument(item.data)
                                break;
                case 'testSeries': return this.renderTestSeries(item.data)
                                break;
            }
        }    
    }

    renderVideos=(item)=>{
        return(
            <View style={styles.videoContainer}>
            <TouchableOpacity onPress={()=>{
                this.addToHistory("video", item.id)
                this.props.navigation.navigate("videoplayer",{videoUrl:serverBaseUrl+item.videoLocation})}
            }>
                <Image source={{uri:item.videoThumb}} style={styles.videoImage}/>
            </TouchableOpacity>
            <View style={styles.videoColumn}>
                <View>
                    <Text style={styles.videoText}>{item.name}</Text>
                </View>
                <View>
                    <Text style={styles.videoText}>{item.description}</Text>
                </View>
                <View>
                    <Text style={styles.videoText}>{item.date}</Text>
                </View>
            </View>
        </View>
        )
    }

    renderTestSeries=(item)=>{
        return( 
            CardView(
                <View style={styles.list}>
                    <View style={styles.topRow}>
                        <Text style={styles.queText}>{item.questionCount} Questions</Text>
                        <Text style={styles.timeText}>{item.timeDuration} minutes</Text>
                    </View>
                    <View style={styles.bottomRow}>
                        <Text style={styles.titleText}>{item.title}</Text>
                        <TouchableOpacity style={styles.btnView} onPress={()=>{
                            this.addToHistory("testSeries", item.id)
                            this.props.navigation.navigate("SingleTestSeries",{item:item})}}>
                            <Feather name="play" size={12} style={{color: theme.primaryColor, marginRight: 3}}/>
                            <Text style={styles.btnText}>Start</Text>
                        </TouchableOpacity>
                    </View>
                </View>,{margin: 10, borderWidth: 1, borderRadius: 10, borderColor: theme.labelOrInactiveColor}
            )
        )
    }

    renderDocument=(item)=>{
        return(
            <View style={styles.documentContainer}>
                <TouchableOpacity onPress={()=>{
                    this.addToHistory("document", item.id)
                    this.props.navigation.navigate('pdfViewer',{pdf:serverBaseUrl+item.fileAddress})}}>
                    <Image source={{uri:documentPlaceholder}} style={styles.documentImage}/>
                </TouchableOpacity>
                <View style={{flexShrink: 1}}>
                    <View style={{ display: 'flex', flexDirection: 'row'}}>
                        <Text style={styles.documentTitle}>{item.name}</Text>
                    </View>
                    {/* <View>
                        <Text style={styles.documentText}>{this.state.institute.name}</Text>
                    </View> */}
                    <View>
                        <Text style={styles.documentText}>{item.Views} {item.date}</Text>
                    </View>
                </View>
            </View>
        )
    }

    switchTabRender=(activeTab)=>{
        switch (activeTab) {
            case 1:
                return(
                   
                    <View style={{marginBottom: 50}}>
                    {this.renderPurchageCourse('Chandan Institiute for ssc,bank,Coaching')}
                    {this.renderPurchageCourse('Chandan Institiute for ssc,bank,Coaching')}
                    </View>

                )
            case 2:
                return(
                    <View>
                            <View style={styles.content}>
                                {/* <TouchableOpacity 
                                    onPress={()=>{this.activeTab('liveClass')}} style={[styles.liveClassOuter,this.state.activeTab=='liveClass'?({backgroundColor:'red'}):({backgroundColor: theme.primaryColor})]}>
                                    <View style={styles.liveClassInner}>
                                        <Feather name="disc" size={13} color={theme.primaryColor}/>
                                        <Text style={styles.liveClassText}>Live Now</Text>
                                    </View>
                                </TouchableOpacity> */}
                                {this.renderList('Videos', 'play-circle', 'video')}
                                {this.renderList('Test Series', 'copy', 'testSeries')}
                                {this.renderList('Document', 'file', 'document')}
                            </View>
                            <View style={styles.dataContainer}>
                                {this.state.loadingData?(
                                    <ActivityIndicator color={theme.accentColor} size={"large"}/>
                                ):(
                                    <FlatList
                                        data={this.state.history}
                                        renderItem={({item}) => this.displayItems(item)}
                                        keyExtractor={(item,index)=>index}
                                    />
                                )}
                            </View>
                            
                            {/* <View style={styles.purchage_coursewrapper}>
                            <View>
                                <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.curvedimage}/>
                            </View>
                           
                                <View>
                                    <Text>The Course-2</Text>
                                    <Text>Chapter two realease</Text>
                                    <Text>Module-3</Text>
                                </View>
                            </View> */}
                    </View>
                )
            case 3:
            return(
                <View style={styles.container}>
                    <TouchableOpacity  onPress={()=>this.openAddFeedModal()} style={{backgroundColor: theme.textColor, justifyContent: 'center', alignItems: 'center', padding:5, borderRadius:5}}> 
                        <Text style={{color: theme.primaryColor}}>Add Feed</Text>
                    </TouchableOpacity>           
                    {this.state.loadingData?(
                            <ActivityIndicator color={theme.accentColor} size={"large"}/>
                    ):(
                        <FlatList
                            data={this.state.feeds}
                            renderItem={({item}) => this.renderFeedItem(item)}
                            keyExtractor={(item,index)=>index}
                        />
                    )}
                </View>
            )
        }

    }

    appendFeed=(feed)=>{
        let feeds = this.state.feeds
        feeds.push(feed)
        this.setState({feeds})
    }

    fetchFeedCallback=(response)=>{
        this.setState({loadingData:false})
        if(response.status==200)
        {
            response.json().then(data=>
            {

                this.setState({feeds: data})
            })
        }
        else
        {
            console.log("something went wrong")
        }
    }

    studentHistoryCallBack=(response)=>{
        this.setState({loadingData:false})
        if(response.status==200)
        {
            response.json().then(data=>
            {
                this.setState({history: data})
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
                                <Image source={{ uri: this.props.userInfo.studentImage }} style={styles.image}/>
                            </View>
                            <View style={styles.nameView}>
                                <Text style={styles.name}>{this.props.userInfo.name}</Text>
                                <Text style={styles.number}>{this.props.userInfo.mobileNumber}</Text>
                            </View>
                        </View>
                        <View style={{borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor, marginTop:10}}/>

                        <View style={styles.profile_navigation}>
                                <View>
                                    <Text style={[styles.navlink,{color:this.state.activeTab==1?theme.accentColor:theme.labelOrInactiveColor}]} onPress={()=>{this.activeTab(1)}}>Purchase</Text>
                                </View>
                                <View>
                                    <Text style={[styles.navlink,{color:this.state.activeTab==2?theme.accentColor:theme.labelOrInactiveColor}]} onPress={()=>{
                                        this.activeTab(2)
                                        this.setState({loadingData: true, offset: 0},()=>fetch_student_history(this.props.userInfo.id, this.state.offset, dataLimit, this.studentHistoryCallBack))
                                    }}>History</Text>
                                </View>
                                <View>
                                    <Text style={[styles.navlink,{color:this.state.activeTab==3?theme.accentColor:theme.labelOrInactiveColor}]} onPress={()=>{
                                        this.activeTab(3),
                                        this.setState({loadingData:true, offset: 0},()=>fetch_student_feed(this.props.userInfo.id,this.state.offset,dataLimit, this.fetchFeedCallback))
                                    }}>Feed</Text>
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
                {this.state.isAddFeedModalVisible?(
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 20,
        },
            navlink:{
                fontSize: 20,
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