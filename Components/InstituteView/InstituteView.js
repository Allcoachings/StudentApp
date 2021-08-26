import React from 'react';
import { Image, Text, View,StyleSheet,ScrollView,FlatList,TouchableOpacity, Modal, Dimensions, TextInput,ActivityIndicator,TouchableWithoutFeedback} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {instituteData} from '../../FakeDataService/FakeData'
import { AirbnbRating,Rating } from 'react-native-ratings';
import {theme,screenMobileWidth,serverBaseUrl,documentPlaceholder,dataLimit, Assets} from '../config'

import CardView from '../Utils/CardView';
import MarqueeText from 'react-native-marquee';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { List } from 'react-native-paper';
import StudentReview from './StudentReview'
import Review from '../ReviewAndRatings/Review'
import Accordian from '../Utils/Accordian'
import MockTest from '../MockTest/MockTest'
import CountDown from 'react-native-countdown-component';
import {fetch_instituteDetails} from '../Utils/DataHelper/Coaching'
import {fetch_institute_courses,fetch_courses_banners,addCourseBanner,fetch_courses_videos,fetch_video_playlist,fetch_document_playlist,fetch_courses_documents,fetch_courses_timetable,fetch_testSeries, fetch_latestUpcomingSchedule, fetch_testSeriesPlaylist} from '../Utils/DataHelper/Course'
import { checkUserEnrollment } from '../Utils/DataHelper/EnrollStudent'
import { saveStudentHistory } from '../Utils/DataHelper/StudentHistory'
import { SliderBox } from 'react-native-image-slider-box';
import FeedText from '../Feed/FeedText';
import FeedImage from '../Feed/FeedImage';
import FeedPoll from '../Feed/FeedPoll';
import {tabListInstitute} from '../../FakeDataService/FakeData'
import {addLead} from '../Utils/DataHelper/Leads'
import ImageZoomModal from './ImageZoomModal';
import { checkSubscription, subscribe, unsubscribe }  from '../Utils/DataHelper/Subscription'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import RenderSingleTestSeries from '../SeriesList/RenderSingleTestSeries'
import RenderLiveClass from './RenderLiveClass'
import RenderDocument from './RenderDocument'
import RenderVideo from './RenderVideo'
import { LinearGradient } from "expo-linear-gradient";

import {fetch_institute_feed} from '../Utils/DataHelper/Feed'

const width = Dimensions.get('window').width
class InstituteView extends React.Component {
    state = { 
        activeTab: 'videos', 
        tabtoshow: 1,
        modalVisible: false,
        ReviewmodalVisible: false,
        courseId: ' ',
        instituteId: this.props.route.params.insId,
        studentId:this.props.userInfo.id,
        studentEnrolled: false,
        review: '',
        feedOffset:0,
        loadingInstitute:true,
        subscribe: '',
        zoomModal: false,
        zimage:'',
        bannerImg:[],
        index: '',
        activeFilter: 'All',
        activeCourse: '',
        insName:'',
        insNumber:''
     }

     
     instituteCallback=(response) =>
     {
         if(response.status==200)
         {
             response.json().then(data=>
                 {
                     this.setState({institute:data,loadingInstitute:false, insName: data.name, insNumber: data.phone})
                 })
             
         }
     }
     coursesCallBack=(response)=>   {
        if(response.status==200)
        {
            response.json().then((data)=>
            {
                this.setState({courses:data, courseId: data[0].id, activeCourse: data[0].id, activeCourseDetail: data[0]},()=>
                checkUserEnrollment(this.state.courseId, this.state.studentId, this.checkEnrollCallBack))
            })
        }
    }
    checkEnrollCallBack=(response) =>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                console.log("student enrolled", data)
                this.setState({studentEnrolled: data});                   
            })
        }
    }
    liveDataCallback=(response)=>
    {
        if(response.status==200)
        {
            response.json().then(data=>{

                var startDate = new Date(); 
                var endDate   = new Date(data.dateTime);
                var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
                this.setState({liveDataLoaded:true,liveData:data,eventSeconds:seconds});
                
            })
        }
            
    }
    componentDidMount() {
         fetch_instituteDetails(this.state.instituteId,this.instituteCallback)
         fetch_institute_courses(this.state.instituteId,this.coursesCallBack)
         checkSubscription(this.state.studentId,this.state.instituteId,this.checkSubscriptionCallback) 
         fetch_latestUpcomingSchedule(this.state.instituteId,this.liveDataCallback)
    }

    checkSubscriptionCallback=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                this.setState({subscribe: data})            
            })
        }
        else
        {
            console.log("something went wrong")
        }
    }

    updateComponent=()=>
    {
        if(this.props.route.params.insId!=this.state.instituteId)
        {
            this.setState({instituteId:this.props.route.params.insId,loadingInstitute:true, bannerImg: []},()=>
            {
            fetch_instituteDetails(this.state.instituteId,this.instituteCallback)
            fetch_institute_courses(this.state.instituteId,this.coursesCallBack)
            fetch_latestUpcomingSchedule(this.state.instituteId,this.liveDataCallback)
            })
        }
    }

     addToHistory=(type, id)=>{
        saveStudentHistory(type,id,this.props.userInfo.id,this.addToHistoryCallBack)
     }

     addToHistoryCallBack=(response)=>{
        if(response.status==201)
        {
            console.log("hello done")
        }
        else
        {
             console.log("error")
        }
     }

     courseBannerCallback=(response)=>
     {
         if(response.status==200)
         {
             response.json().then(data=>
                 { 
                     var images = data.map((item, key) =>serverBaseUrl+item.bannerImageLink)
                     this.setState({bannerImg: images})
                     this.setState({courseBanners:data});
                 })
         }
     }

     addLeadCallback=(response)=>{
         if(response.status==201)
         {
             console.log("done")
         }
         else
         {
             console.log("something went wrong")
         }
     }

     handleCourseItemClick=(item)=>
     {
         this.setState({
                activeCourse:item.id,activeCourseDetail:item,
                courseTimetableLoaded:false,isCourseTimeTableLoading:false,courseTimeTable:[],
                courseDocumentPlaylistLoaded:false,isCourseDocumentPlaylistLoading:false,courseDocumentPlaylist:[],
                courseDocumentLoaded:false,isCourseDocumentLoading:false,courseDocuments:[],
                courseTestSeriesLoaded:false,isCourseTestSeriesLoading:false,courseTestSeries:[],
                courseTestSeriesPlaylistLoaded:false,isCourseTestSeriesPlaylistLoading:false,courseTestSeriesPlaylist:[],
                courseVideoPlaylistLoaded:false,isCourseVideoPlaylistLoading:false,courseVideosPlaylist:[],
                courseVideoLoaded:false,isCourseVideoLoading:false,courseVideos:[] 
            },()=>{}  
            )
            checkUserEnrollment(item.id, this.state.studentId, this.checkEnrollCallBack)
            addLead(item.id, this.state.instituteId, this.state.studentId, this.addLeadCallback)
            fetch_courses_banners(item.id,this.courseBannerCallback)
     }

     renderTabItems=({item,index})=>
     {
        
        if(index==0&&!this.state.activeCourse)
        {
            this.setState({activeCourse:item.id,activeCourseDetail:item,activeTab: 'videos', })
            fetch_courses_banners(item.id,this.courseBannerCallback)
            addLead(item.id,this.state.instituteId, this.state.studentId, this.addLeadCallback)
        }
         return (
            // this.state.activeCourse==item.id?(
            //     <LinearGradient
            //         start={[1, 0.5]}
            //         end={[0, 0]}
            //         colors={['#9795ef',  '#f9c5d1']}
            //         style={{paddingLeft:12, paddingRight:12, marginRight:10,paddingVertical: 3.5,marginTop:5 ,paddingHorizontal:2,borderWidth:1, borderColor:theme.primaryColor,borderRadius:15}}
            //     >
            //         <TouchableOpacity style={[{backgroundColor:"transparent"}]} onPress={()=>this.handleCourseItemClick(item)}> 
            //             <Text style={[styles.courseTitle, {color:theme.primaryColor}]}>{item.title}</Text>
            //         </TouchableOpacity>
            //     </LinearGradient>
            // ):(
                <TouchableOpacity style={[styles.courseItemContainer,this.state.activeCourse==item.id?({backgroundColor:theme.darkPurpleColor, borderColor:theme.darkPurpleColor}):({backgroundColor:theme.purpleColor, borderColor:theme.darkPurpleColor})]} onPress={()=>this.handleCourseItemClick(item)}> 
                        <Text style={[styles.courseTitle,this.state.activeCourse==item.id?({color: theme.primaryColor}):({color:theme.darkPurpleColor})]}>{item.title}</Text>
                </TouchableOpacity>
            // )
            
         );
     }
     toggleModal(visible) {
        this.setState({ modalVisible: visible });
     }



    renderCourseItems=({item})=>
    {
        return (
            <TouchableOpacity style={[styles.courseItemContainer,this.state.activeCourse==item.id?({backgroundColor:theme.secondaryColor}):(null)]} onPress={()=>this.handleCourseItemClick(item)}> 
                <Text style={[styles.courseTitle,this.state.activeCourse==item.id?({color:theme.primaryColor}):({color:theme.secondaryColor})]}>{item.title}</Text>
            </TouchableOpacity>
        );
    }
    
    renderBannerList=({item})=>
    {
        return(
            <TouchableOpacity style={styles.bannerItemContainer} onPress={()=>this.openZoomModal(serverBaseUrl+item.bannerImageLink)}>
                <Image source={{uri:serverBaseUrl+item.bannerImageLink}} style={styles.bannerImage}/>
            </TouchableOpacity  >
        )
    }

    openZoomModal = () => {
        this.setState({ zimage: image, zoomModal: true});
    }

    activeTab=(item)=>{
        switch(item)
        {
            case 'liveClass': this.setState({activeTab: 'liveClass'})
                              break;
            case 'videos': this.setState({activeTab: 'videos'})
                              break;
            case 'document': this.setState({activeTab: 'document'})
                              break;
            case 'testSeries': this.setState({activeTab: 'testSeries'})
                              break;
            case 'timeTable': this.setState({activeTab: 'timeTable'})
                              break;
        }
    }

    renderList=(text, icon, link)=>
    {
        return(
            <TouchableOpacity 
                onPress={()=>{this.activeTab(link)}} 
                style={[styles.setList,this.state.activeTab==link?({backgroundColor:theme.secondaryColor}):(null)]}
            >
                    <Feather name={icon} size={12} color={this.state.activeTab==link?(theme.primaryColor):(theme.secondaryColor)}/>
                    <Text style={[styles.listText,this.state.activeTab==link?({color:theme.primaryColor}):(null)]}>{text}</Text>
            </TouchableOpacity>
        )
    }
    courseTimeTableCallback=(response)=>
    {
            if(response.status==200)
            {
                response.json().then(data=>
                {
                    this.setState({courseTimeTable:data,courseTimetableLoaded:true,isCourseTimetableLoading:false});                   
                })
            }
    }
    courseTestseriesCallback=(response)=>
    {
        if(response.status==200)
        {
            response.json().then(data=>
                {
                    this.setState({courseTestSeries:data,courseTestSeriesLoaded:true,isCourseTestSeriesLoading:false});                   
                })
        }
    }
    courseDocumentCallback=(response)=>
    {
            if(response.status==200)
            {
                response.json().then(data=>
                {
                    this.setState({courseDocuments:data,courseDocumentLoaded:true,isCourseDocumentLoading:false});                   
                })
            }
    }
    courseVideoCallback=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                this.setState({courseVideos:data,courseVideoLoaded:true,isCourseVideoLoading:false});                   
            })
        }
    }
    courseDocumentPlaylistCallback=(response)=>{
            if(response.status==200)
            {
                response.json().then(data=>
                {
                    
                    console.log("doc", data)
                    var playlist={"courseId": this.state.activeCourse, "id": -1, "name": "All"}
                    data.unshift(playlist)
                    this.setState({courseDocumentPlaylist:data,courseDocumentPlaylistLoaded:true,isCourseDocumentPlaylistLoading:false});                   
                })
            }
    }
    courseVideoPlaylistCallback=(response)=>{
        
            if(response.status==200)
            {
                response.json().then(data=>
                {
                    
                    var playlist={"courseId": this.state.activeCourse, "id": -1, "name": "All"}
                    data.unshift(playlist)
                    this.setState({courseVideosPlaylist:data,courseVideoPlaylistLoaded:true,isCourseVideoPlaylistLoading:false});                   
                })
            }
    }
    courseTestSeriesPlaylistCallback=(response)=>{
        
            if(response.status==200)
            {
                response.json().then(data=>
                {
                    
                    var playlist={"courseId": this.state.activeCourse, "id": -1, "name": "All"}
                    data.unshift(playlist)
                    this.setState({courseTestSeriesPlaylist:data,courseTestSeriesPlaylistLoaded:true,isCourseTestSeriesPlaylistLoading:false});                   
                })
            }
    }

    renderSubjectOptions=({item})=>
    {
        
        return(
        <TouchableOpacity 
            onPress={()=>{this.filterItemClick(item)}} 
            style={[styles.singleSubject,this.state.activeFilter==item.name?({backgroundColor:theme.secondaryColor}):(null)]}>
            <Text style={[styles.singleSubjectText,this.state.activeFilter==item.name?({color:theme.primaryColor}):(null)]}>{item.name}</Text>
        </TouchableOpacity>
        )
    }

    renderItem=(item)=>{
        return(
           
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin:5}}>
                <Text style={{fontSize: 16}}>{item.date}</Text>
                <Text style={{fontSize: 16}}>{item.time}</Text>
                <Text style={{fontSize: 16}}>{item.teacher}</Text>
            </View>
        )
    }

    accordianHeader = (title,testCount,rightIcon) =>
    {
        return(
            <View style={styles.accordianHeader}>
                        <View style={styles.accordianLeft}>
                            <Text style={styles.accordianTitle}>{title}</Text>
                            <Text style={styles.accordianTestCount}>{testCount}</Text> 
                        </View>
                        <View style={styles.accordianMiddle}>
                           
                        </View>
                        <View style={styles.accordianRight}>
                         
                        </View> 
            </View>
        )
    }

    renderTestItem=(item)=>{
        return(
            <View style={{margin:10}}>
            <Accordian
            header={this.accordianHeader(item.name," ","chevron-down")}
        > 
            {/* <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin:5, paddingLeft:20, paddingRight:20}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Date</Text>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Time</Text>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Teacher</Text>
            </View> */}
            <MockTest data={item.courseTimeTableItem} subjectId={item.id} mode="readonly" />
            {/* {CardView(
                <FlatList 
                    data={item.date} 
                    renderItem={({item}) =>this.renderItem(item)}
                    keyExtractor={(item)=>item.id} 
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                />,{width:'95%', padding:10, margin:5}
            )} */}
        </Accordian>
         </View>
        )
    }

    renderTimeTable=(item)=>{
        return(
            // <Accordian
            //     header={this.accordianHeader(item.title, " ", "chevron-down")}
            // >
                <View style={styles.weekView}> 
                    <FlatList
                        data={item}
                        renderItem={({item}) =>this.renderTestItem(item)}
                        keyExtractor={(item)=>item.id}
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                    />
                </View>
            // </Accordian>


        )
    }

    filterItemClick=(item)=>
    {
        console.log(item,this.state.activeTab);
        switch(this.state.activeTab)
        {
          case 'videos':  
                this.setState({activeFilter: item.name, isCourseVideoLoading:true,courseVideoLoaded:false},()=>
                {
                    fetch_courses_videos(null,this.courseVideoCallback,item.id);
                }) 
                break;
           case 'document':
                this.setState({activeFilter: item.name, isCourseDocumentLoading:true,courseDocumentLoaded:false},()=>
                {
                    fetch_courses_documents(null,this.courseDocumentCallback,item.id);
                }) 
                break;
            case 'testSeries':
                this.setState({activeFilter: item.name, isCourseTestSeriesLoading:true,courseTestSeriesLoaded:false},()=>
                {
                    fetch_testSeries(null,this.courseTestseriesCallback,item.id);
                }) 
                break;

        } 
    }

    showFilters=(tab)=>{
        switch(tab)
        {
            // case 'liveClass':   return(
            //                         <View> 
            //                                 <View style={styles.liveItemTextView}>
            //                                     <Text>lorem ipsum dolor sit amet, consectetur adipiscing elit and a long more dummy text to be written here</Text> 
            //                                 </View>
            //                                 <View style={{flexDirection: 'row'}}>
            //                                         <Feather name="wifi" size="large"/>
            //                                         <Text style={styles.liveInText}>Live in</Text>
            //                                 </View>
            //                                 <View style={{flexDirection: 'row'}}>
            //                                             <View>
            //                                                 <Text style={styles.timeText}>03</Text>
            //                                                 <Text style={styles.timelabel}>days</Text> 
            //                                             </View>
            //                                             <View>
            //                                                 <Text style={styles.timeText}>12</Text>
            //                                                 <Text style={styles.timelabel}>hours</Text> 
            //                                             </View>
            //                                             <View>
            //                                                 <Text style={styles.timeText}>47</Text>
            //                                                 <Text style={styles.timelabel}>minutes</Text> 
            //                                             </View>
            //                                 </View>
            //                                 <TouchableWithoutFeedback>
            //                                     <View style={{backgroundColor:theme.accentColor,padding:15,borderRadius:10,alignItems: 'center',width:'95%'}}>
            //                                         <Text style={{fontFamily:'Raleway_700Bold',fontSize:15,color:theme.primaryColor}}>
            //                                             Notify Me
            //                                         </Text>
            //                                     </View>
            //                                 </TouchableWithoutFeedback>

            //                         </View>
                                    // )

            case 'videos':    
           
                    if(!this.state.courseVideoLoaded&&!this.state.isCourseVideoLoading&&this.state.activeCourse)
                    {
                        this.setState({isCourseVideoLoading:true})
                        fetch_courses_videos(this.state.activeCourse,this.courseVideoCallback);
                    }
                    if(!this.state.courseVideoPlaylistLoaded&&!this.state.isCourseVideoPlaylistLoading&&this.state.activeCourse)
                    {
                        this.setState({isCourseVideoPlaylistLoading:true})
                        fetch_video_playlist(this.state.activeCourse,this.courseVideoPlaylistCallback);
                    }
                    return(
                        this.state.isCourseVideoLoading?
                        (
                            null
                        ):
                        (
                        <ScrollView>
                           <View style={styles.AddFilter}>

                               <FlatList 
                                   data={this.state.courseVideosPlaylist} 
                                   renderItem={this.renderSubjectOptions}
                                   keyExtractor={(item)=>item.id} 
                                   horizontal={true}
                                   showsHorizontalScrollIndicator={false}
                               />
                           </View>
                           </ScrollView>
                       )
                   )
            case 'testSeries':  
            
                        if(!this.state.courseTestseriesLoaded&&!this.state.isCourseTestseriesLoading&&this.state.activeCourse)
                        {
                            this.setState({isCourseTestseriesLoading:true})
                            fetch_testSeries(this.state.activeCourse,this.courseTestseriesCallback);
                        }
                        if(!this.state.courseTestSeriesPlaylistLoaded&&!this.state.isCourseTestSeriesPlaylistLoading&&this.state.activeCourse)
                        {
                            this.setState({isCourseTestSeriesPlaylistLoading:true})
                            fetch_testSeriesPlaylist(this.state.activeCourse,this.courseTestSeriesPlaylistCallback);
                             
                        }

                                return(
                                    <FlatList 
                                        data={this.state.courseTestSeriesPlaylist} 
                                        renderItem={this.renderSubjectOptions}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    />)

            case 'document':                
                        if(!this.state.courseDocumentLoaded&&!this.state.isCourseDocumentLoading&&this.state.activeCourse)
                        {
                            this.setState({isCourseDocumentLoading:true})
                            fetch_courses_documents(this.state.activeCourse,this.courseDocumentCallback);
                        }
                        if(!this.state.courseDocumentPlaylistLoaded&&!this.state.isCourseDocumentPlaylistLoading&&this.state.activeCourse)
                        {
                            this.setState({isCourseDocumentPlaylistLoading:true})
                            fetch_document_playlist(this.state.activeCourse,this.courseDocumentPlaylistCallback);
                        }
                                return(
                                    <FlatList 
                                        data={this.state.courseDocumentPlaylist} 
                                        renderItem={this.renderSubjectOptions}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    />)
        }
    }

    showContent=(tab)=>{
        switch(tab)
        {
            case 'liveClass':   return(
                                    this.state.liveData?(
                                        <View style={styles.liveContainer}>  
                                            <View style={styles.liveItemTextView}>
                                                <Text style={styles.liveItemText}>{this.state.liveData.title}</Text> 
                                            </View>
                                            <View style={styles.liveDataTimeConatiner}>
                                                <View style={{flexDirection: 'row'}}>
                                                        {/* <Feather name="wifi" size="large"/> */}
                                                        <Text style={styles.liveInText}>LIVE IN</Text>
                                                </View> 
                                                <View style={{flexDirection: 'row'}}>
                                                    <CountDown
                                                        until={this.state.eventSeconds}
                                                        onFinish={() => alert('finished')}
                                                        onPress={() => alert('hello')}
                                                        size={25}
                                                        style={{margin:10}}
                                                        separatorStyle={{marginHorizontal:10}}
                                                        digitStyle={styles.timeItemContainer}
                                                        timeToShow={['D','H','M', 'S']}
                                                    />
                                                    {/* <View style={styles.timeItemContainer}>
                                                        <Text style={styles.liveTimeText}>03</Text>
                                                        <Text style={styles.timelabel}>days</Text> 
                                                    </View>
                                                    <View style={styles.timeItemContainer}>
                                                        <Text style={styles.liveTimeText}>12</Text>
                                                        <Text style={styles.timelabel}>hours</Text> 
                                                    </View>
                                                    <View style={styles.timeItemContainer}>
                                                        <Text style={styles.liveTimeText}>47</Text>
                                                        <Text style={styles.timelabel}>minutes</Text> 
                                                    </View> */}
                                                </View>

                                            </View>
                                            <TouchableWithoutFeedback>
                                                <View style={{backgroundColor:theme.accentColor,padding:15,borderRadius:10,alignItems: 'center',width:'95%'}}>
                                                    <Text style={{fontFamily:'Raleway_700Bold',fontSize:15,color:theme.primaryColor}}>
                                                        Notify Me
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>

                                    </View>):(<Text>No Live Classes Available</Text>)                     
                )
            case 'videos':      return(
                                    <FlatList 
                                        data={this.state.courseVideos} 
                                        renderItem={({item})=><RenderVideo userId={this.props.userInfo.id} item={item} navigation={this.props.navigation} addToHistory={this.addToHistory} mode="institute" studentEnrolled={this.state.studentEnrolled} downloadMode={true}/>}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                        ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                                    />)
            case 'testSeries':  return(
                                    <FlatList 
                                        data={this.state.courseTestSeries} 
                                        renderItem={({item})=><RenderSingleTestSeries item={item} navigation={this.props.navigation} addToHistory={this.addToHistory} mode="institute" studentEnrolled={this.state.studentEnrolled} />}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                        ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                                    />)
            case 'document':    return(
                                    <FlatList 
                                        data={this.state.courseDocuments} 
                                        renderItem={({item})=><RenderDocument userId={this.props.userInfo.id} item={item} navigation={this.props.navigation} addToHistory={this.addToHistory} mode="institute" studentEnrolled={this.state.studentEnrolled} downloadMode={true} insName={this.state.insName} insNumber={this.state.insNumber}/>}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                        ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                                    />)
            case 'timeTable':    
                        if(!this.state.courseTimetableLoaded&&!this.state.isCourseTimeTableLoading&&this.state.activeCourse)
                        {
                           console.log("running")
                            this.setState({isCourseTimeTableLoading:true})
                            fetch_courses_timetable(this.state.activeCourseDetail.id,this.courseTimeTableCallback);
                        }
                            return(
                                this.renderTimeTable(this.state.courseTimeTable)
                                    )
        }
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
    handleFeedCallBack=(response)=>
    {
            if(response.status==200)
            {
                response.json().then(data=>
                {
                    this.setState({feeds: data})
                })
            }
    }

    handleFeedTabBtnClick=()=>
    {
        this.tabtoshow(3)
        if(!this.state.isFeedLoaded&&!this.state.isFeedLoading)
        {
            this.setState({isFeedLoading:true})
            fetch_institute_feed(this.state.instituteId,this.state.feedOffset,dataLimit,this.handleFeedCallBack)
        }
    }
    renderFeedItem=(item)=>
    {
        
        switch(item.feed.feed.feedType)
        {
            case 1:
               
                return (
                    <FeedImage item={item} navigation={this.props.navigation}/>
                )
            case 2:
                return (
                    <FeedPoll item={item} navigation={this.props.navigation}/>
                )
            case 3:
                return (
                    <FeedText item={item} navigation={this.props.navigation}/>
                )
        }
    }

    // tabs handling
    tabtoshow=(tabValue)=>{
        this.setState({tabtoshow:tabValue});
    }

    switchTabRender=(tabtoshow)=>{
        switch (tabtoshow) {
            case 1:
                return(
                <>
                <View style={[styles.catRow]}> 
                            <FlatList 
                                data={this.state.courses} 
                                renderItem={this.renderTabItems}
                                keyExtractor={(item)=>item.id} 
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            /> 
                    </View>
                    <View style={styles.rowContainer}>
                            {/* <FlatList 
                            data={this.state.courseBanners} 
                            renderItem={this.renderBannerList} 
                            keyExtractor={(item)=>item.id}
                            horizontal={true} 
                            showsHorizontalScrollIndicator={false}
                            /> */}
                            <TouchableOpacity style={styles.bannerItemContainer} onPress={this.openZoomModal} underlayColor='none'>
                                <SliderBox 
                                    dotColor={"transparent"} 
                                    inactiveDotColor={"transparent"} 
                                    images={this.state.bannerImg} 
                                    style={styles.bannerImage} 
                                    onCurrentImagePressed={index => this.setState({index: index, zoomModal: true})} 
                                    imageLoadingColor={theme.secondaryColor}
                                />
                            </TouchableOpacity>
                            
                            <View style={styles.optionalRow}> 
                                <TouchableOpacity style={{borderColor:theme.borderColor,borderWidth:1,borderRadius:10,padding:10}} onPress={() => this.props.navigation.navigate("AboutCourse", {id: this.state.activeCourse, activeCourseDetail: this.state.activeCourseDetail})}>
                                    <Text style={{fontSize:12,color:theme.secondaryColor,fontFamily:'Raleway_700Bold'}}>
                                        About Course
                                    </Text>
                                </TouchableOpacity>
                                {this.state.studentEnrolled?(null):(
                                <TouchableOpacity style={{backgroundColor:theme.accentColor,padding:10,borderRadius:10,flexDirection: 'row',}} onPress={()=>this.props.navigation.navigate("Payment", {insId:this.state.institute.id,courseId:this.state.activeCourse})}>
                                     
                                    <Text style={{fontSize:14,color:theme.primaryColor, fontFamily:'Raleway_700Bold'}}>
                                            Fees -  
                                        </Text>
                                        <Text style={{fontSize:14,color:theme.primaryColor}}>
                                            {this.state.activeCourseDetail&&this.state.activeCourseDetail.fees}
                                        </Text>
                                </TouchableOpacity>)}
                            </View>
                            <View style={styles.content}>
                                <TouchableOpacity 
                                    onPress={()=>{this.activeTab('liveClass')}} style={[styles.liveClassOuter,this.state.activeTab=='liveClass'?({backgroundColor:'red'}):({backgroundColor: theme.primaryColor})]}>
                                    <View style={styles.liveClassInner}>
                                        <Feather name="disc" size={13} color={theme.primaryColor}/>
                                        <Text style={styles.liveClassText}>Live Now</Text>
                                    </View>
                                </TouchableOpacity>
                                {this.renderList('Videos', 'play-circle', 'videos')}
                                {this.renderList('Test Series', 'copy', 'testSeries')}
                                {this.renderList('Document', 'file', 'document')}
                                {this.renderList('Time Table', 'clock', 'timeTable')}
                            </View>
                            <View style={styles.subOptions}>
                                {this.showFilters(this.state.activeTab)}
                            </View>
                            <View style={styles.dataContainer}>
                                {this.showContent(this.state.activeTab)}
                            </View> 
                            <View style={[styles.loadMoreView]}>
                                    <View style={{}}><Feather name="chevron-down" size={20}/></View>
                                    <Text style={{margin:5}}>Load More</Text>
                            </View>

                        </View>
                        </>
    
                )
            
            case 3:
                return(
                    <View style={styles.container}>
                            <FlatList
                            data={this.state.feeds}
                            renderItem={({item}) => this.renderFeedItem(item)}
                            keyExtractor={(item,index)=>index}
                            ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                        />
                        {/* { this.renderImagePost()}
                        { this.renderQuizPost()}
                        { this.renderTextPost()} */}
                    </View>
                )
                
            }
    }

    unsubscribeCallback=(response)=>{
        if(response.status==200)
        {
            this.setState({subscribe: false})
        }
    }

    subscribeCallback=(response)=>{
        if(response.status==201)
        {
            this.setState({subscribe: true})
        }
    }

    closeModal = () => {
        this.setState({ zoomModal: false });
      }
        

    render() {
       console.log(this.state.bannerImg)
      this.updateComponent()
        const  {institute,loadingInstitute} = this.state;
        // this.updateComponent()
        return (
            <PageStructure 
                iconName={"arrow-left"}
                btnHandler={() => {this.props.navigation.goBack()}}
                catInHeader={false}
                titleonheader={"UPSC Coaching"}
                noBottomTab={true}
                notificationreplaceshare={"more-vertical"}
                rightIconOnPress={()=>{this.setState({modalVisible:true})}} 
                nosearchIcon={true}
            > 
            {loadingInstitute?
            (
                <CustomActivtiyIndicator mode="skimmer"/>
            ):(
            <ScrollView >
                <View style={styles.container}>

                        {/* <View style={styles.headerView}>
                            <Text style={styles.headText}>{instituteData.category}</Text>
                        </View> */}
                        <View style={styles.instituteheader}>
                            {CardView(
                                <Image source={{uri:serverBaseUrl+institute.logo}} style={styles.instituteheaderLogo}/>
                            ,[styles.logoCard,this.props.screenWidth<=screenMobileWidth?({width:"30%",height:100}):({width:200,height:150})])
                            }
                            <View style={styles.instituteheaderMeta}>
                                <Text style={styles.instituteheaderText} numberOfLines={3}>{institute.name}</Text>
                                <Text style={styles.instituteDirector}>{institute.directorName}</Text>
                                <View style={styles.instituteRatingView}>
                                    <Text style={{ color: theme.greyColor}}>{institute.totalratingCount>0?institute.totalRating/institute.totalRatingCount:0+' • '}</Text>
                                    <AirbnbRating 
                                        starContainerStyle={styles.instituteRating} 
                                        count={5}
                                        reviews={[]} 
                                        isDisabled={true}
                                        defaultRating={institute.totalratingCount>0?institute.totalRating/institute.totalRatingCount:0}
                                        size={12}
                                        selectedColor={theme.blueColor}
                                        showRating={false}
                                    />
                                    <Text style={styles.voteCount}>{institute.totalRatingCount} Votes</Text>
                                </View>
                            </View>
                            {/* <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}  onPress = {() => {this.toggleModal(true)}}/> */}
                        </View>
                        <View style={styles.body}>
                            <View style={styles.btnRow}>
                                    <View style={[styles.btnView1,this.state.tabtoshow==1?({backgroundColor:theme.accentColor,borderColor:theme.accentColor}):({backgroundColor:theme.primaryColor,borderColor:theme.labelOrInactiveColor})]}>
                                        <Text style={[styles.btnText,{color:this.state.tabtoshow==1?theme.primaryColor:theme.greyColor}]} onPress={()=>{this.tabtoshow(1)}}>Courses</Text>
                                    </View>
                                    <View style={[styles.btnView2,this.state.tabtoshow==2?({backgroundColor:theme.accentColor}):({backgroundColor:theme.primaryColor})]}>
                                        <Text style={{color:theme.blueColor,fontSize:16,fontWeight: 'bold'}}>{institute.followersCount}</Text>
                                        <Text style={[styles.btnText,{color:theme.blueColor}]}> Follower</Text>
                                    </View>
                                    <TouchableOpacity style={[styles.btnView3,this.state.tabtoshow==3?({backgroundColor:theme.accentColor,borderColor:theme.accentColor}):({backgroundColor:theme.primaryColor,borderColor:theme.labelOrInactiveColor})]} onPress={this.handleFeedTabBtnClick}>
                                        <Text style={[styles.btnText,{color:this.state.tabtoshow==3?theme.primaryColor:theme.greyColor}]} >Feed</Text>
                                    </TouchableOpacity>
                            </View>
                            {/* <View style={styles.marquee}>
                                <Text style={styles.updateStyle}>
                                    Update
                                </Text>
                                <MarqueeText
                                    style={styles.marqueeContent}
                                    duration={5000}
                                    marqueeOnStart
                                    loop
                                    marqueeDelay={1000}
                                    marqueeResetDelay={1000}
                                    >
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry and typesetting industry. 
                                 </MarqueeText>
                            </View> */}
                            {/* <View style={styles.InstituteCourseListView}>
                                <FlatList 
                                    data={instituteData.courses} 
                                    renderItem={this.renderCourseItems}
                                    keyExtractor={(item)=>item.id} 
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                /> 
                            </View> */}
                            
                            {this.switchTabRender(this.state.tabtoshow)}


                        </View>
                    </View>

                    <View style={{borderBottomWidth: 1, borderBottomColor: theme.labelOrInactiveColor, marginBottom: 10}}/>
                    
                        <View style={{marginBottom:20}}>
                            <Text style={styles.RatingText}>About Institute</Text>
                            <Text style={{fontFamily: 'Raleway_600SemiBold'}}>{this.state.institute.about}</Text>
                        </View>

                    <StudentReview 
                        studentEnrolled={this.state.studentEnrolled}
                        instituteId={institute.id}
                        courseId={this.state.courseId}
                        studentId={this.state.studentId}
                        total_rating_count={institute.totalRatingCount}
                        one_star_count={institute.oneStarCount}
                        two_star_count={institute.twoStarCount}
                        three_star_count={institute.threeStarCount}
                        four_star_count={institute.fourStarCount}
                        five_star_count={institute.fiveStarCount}
                        inslogo={serverBaseUrl+institute.logo}
                        institle={institute.name}
                    />
                   

                    

                    

                
                    <View style = {styles.container}>
                        <Modal animationType = {"fade"} 
                                transparent = {true}
                                visible = {this.state.modalVisible}
                                onRequestClose = {() => { console.log("Modal has been closed.") } }>
                            <TouchableWithoutFeedback onPress={() =>this.setState({modalVisible:false})}>        
                            <View   style={{width:'100%',height:'100%'}}>
                                <TouchableOpacity style={{alignSelf: 'flex-end', width: 200, height: 120, padding: 6, backgroundColor: 'white',postion: 'absolute',top:10}}>
                                    {CardView(
                                        <>
                                            {this.state.subscribe?(
                                                <TouchableOpacity onPress={() =>unsubscribe(this.state.studentId,this.state.instituteId,this.unsubscribeCallback)} style={{flexDirection: 'row',margin:5}}>
                                                    <Feather name="share" size={20}/>
                                                    <Text style={{marginLeft:5}}>Unfollow</Text>
                                                </TouchableOpacity>
                                            ):(
                                            <TouchableOpacity onPress={() =>subscribe(this.state.studentId,this.state.instituteId,this.subscribeCallback)} style={{flexDirection: 'row',margin:5}}>
                                                <Feather name="share" size={20}/>
                                                <Text style={{marginLeft:5}}>Follow</Text>
                                            </TouchableOpacity>)}
                                            <View style={{flexDirection: 'row',margin:5}}>
                                                <Feather name="share" size={20}/>
                                                <Text style={{marginLeft:5}}>Add to wishlist</Text>
                                            </View>
                                            <View style={{flexDirection: 'row',margin:5}}>
                                                <Feather name="share" size={20}/>
                                                <Text style={{marginLeft:5}}>Flag as inappropriate</Text>
                                            </View>
                                        </>,
                                        {width:'100%',height:'100%'}
                                    )} 
                                </TouchableOpacity>
                            </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                        
                        {/* <TouchableOpacity onPress = {() => {this.toggleModal(true)}}>
                        <Text style = {styles.text}>Open Modal</Text>
                        </TouchableOpacity> */}
                    </View> 
                </ScrollView>
                )} 
                {this.state.zoomModal?(
                    <ImageZoomModal 
                        zoomModal={this.state.zoomModal}
                        closeModal={this.closeModal}
                        images={this.state.bannerImg}
                        index={this.state.index}
                        type="normal"
                    />
                ):(null)}
            </PageStructure>
        );
    }
}

const styles = StyleSheet.create({
        container: 
        {
            flex: 1,
            flexDirection:'column',
            paddingBottom:20
        },
            headerView:
            {
                justifyContent: 'center',
                alignItems: 'center',
            },
                headText:
                {
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: theme.secondaryColor
                },
            instituteheader:
            {
                flexDirection:'row',
                flex:0.2,
                marginTop: '6%'
            },
                logoCard:
                { 
                    flexWrap:'wrap',
                    borderRadius: 10,
                 
                }, 
                    instituteheaderLogo:
                    {   
                        borderRadius: 10,
                        width:"100%",
                        height:"100%",
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
                    },
                        instituteRating:
                        {
                            // alignSelf:'flex-start',
                            marginRight:10,
                            marginTop:3
                        },
                        voteCount:
                        {
                            fontWeight:'bold',

                        },


                        btnRow:
                        {
                            marginTop: 10,
                            display: 'flex',
                            flexDirection: 'row',
                            // justifyContent: 'space-between',
                            padding: 5
                        },
                            btnView1:
                            {
                                flex: 0.3,
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
                            btnView2:
                            {
                                flex: 0.6,
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 5,
                                paddingBottom: 5,
                                backgroundColor:theme.greyColor,
                                margin: 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent:'center',
                                alignItems: 'center'
                            },
                            btnView3:
                            {
                                flex: 0.2,
                                paddingLeft: 10,
                                paddingRight: 10,
                                borderWidth:1,
                                paddingTop: 5,
                                paddingBottom: 5,
                                backgroundColor:theme.greyColor,
                                borderRadius: 5,
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
            

            body:
            {
                flex:0.8,
                flexDirection:'column',
                marginTop:10,
            },
                marquee:
                { 
                    flexDirection:'row',
                    alignItems: 'center' ,
                    marginTop: 20
                },
                    updateStyle:
                    {
                        backgroundColor:theme.secondaryColor,
                        padding:8,
                        fontSize:12,
                        fontWeight: '700',
                        color:theme.primaryColor,
                        borderColor:theme.secondaryColor,
                        borderTopLeftRadius:5,
                        borderBottomLeftRadius:5,
                        borderWidth:1,
                    },
                        marqueeContent:
                        {
                            borderColor:theme.secondaryColor,
                            fontSize:14,
                            borderWidth:1,
                            borderTopRightRadius:5,
                            borderBottomRightRadius:5,
                            padding:7
                        },
                    catRow:
                    {
                        borderTopWidth:1,
                        marginBottom:10,
                        borderTopColor:theme.labelOrInactiveColor,
                        padding:5
                    },
                    courseItemContainer:
                    {  
                        paddingLeft:12,
                        paddingRight:12, 
                        marginRight:10,
                        paddingVertical: 3.5,
                        marginTop:5 , 
                        paddingHorizontal:2,
                        borderWidth:1, 
                        borderColor:theme.primaryColor,
                        borderRadius:15,
                         alignItems:'center',
                         justifyContent: 'center'

                    },
                        courseTitle:
                        {
                            fontSize:14, 
                            color:theme.greyColor,
                            fontFamily: 'Raleway_700Bold',
                        },
                bannerItemContainer:
                {
                    height:140,
                    marginTop:10,
                },
                    bannerImage:
                    {
                        height:140,
                        width: width-20,
                        borderRadius:10,
                        marginRight:10,
                        borderWidth: 0.6,
                        borderColor:theme.greyColor,
                    },
                optionalRow:
                { 
                    marginTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom:5,
                    borderBottomWidth: 1,
                        borderBottomColor:theme.labelOrInactiveColor,
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
                
                subOptions:
                {
                    marginTop: '6%',
                    display: 'flex',
                    flexDirection: 'row',
                },
                    singleSubject:
                    {
                        marginLeft: 5,
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        borderColor: theme.greyColor,
                        borderRadius: 20,
                    },
                        singleSubjectText:
                        {
                            marginLeft: 6,
                            marginRight:6,
                            paddingLeft: '4%',
                            paddingRight: '4%',
                            paddingTop: 4,
                            paddingBottom: 4,
                            fontSize:12,
                            color: theme.greyColor,
                        },
                dataContainer:
                {
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column'
                },
                    liveContainer:
                    {
                        margin:10,
                        alignItems: 'center'
                    },
                        liveItemText:
                        {
                            fontFamily: 'Raleway_600SemiBold',
                            fontSize:16
                        },
                        liveDataTimeConatiner:
                        {
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        },
                            liveInText:
                            {

                                color:theme.featureNoColor,
                                fontFamily: 'Raleway_600SemiBold',
                                fontSize:16,
                                margin:10
                            },
                            timeItemContainer:
                            {
                                borderWidth:0.3,
                                borderColor:theme.labelOrInactiveColor,
                                padding:10,
                                alignItems: 'center',
                                margin:5
                            },
                                liveTimeText:
                                {
                                    fontSize:25, 
                                    fontFamily: 'Raleway_700Bold',
                                    margin:10

                                },
                                timelabel:
                                {
                                    fontFamily: 'Raleway_600SemiBold'
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
                                fontFamily: 'Raleway_700Bold',
                                fontSize: 14,
                                color: theme.primaryColor   
                            },
                loadMoreView:
                {
                 
                    flexDirection: 'row',
                    justifyContent: 'center',
                    margin:5, 
                    borderRadius:15,

                    alignSelf:'center',
                    backgroundColor:theme.accentColor+'4D',
                    padding:5,
                    alignItems: 'center', 
                   
                    flexWrap: 'wrap'
                },
                accordianHeader:
                {
                    // flex:1,
                    flexDirection: 'row',
                    width: '100%', 
                    // justifyContent: 'space-between'
                    
                },
                    accordianLeft:
                    {
                        
                        justifyContent: 'flex-start',
                        margin:5
                    },
                        accordianTitle:
                        {
                            fontSize:14,
                            fontWeight:'bold',
                        },
                        accordianTestCount:
                        {
                            fontSize:12,
                            color:theme.labelOrInactiveColor,
                            
                        },
                    accordianMiddle:
                    { 
                        
                        margin:5,
                        alignSelf: 'flex-end',
                    },
                    accordianRight:
                    {
                        
                        // alignSelf: 'flex-end',
                        marginLeft:'auto', 
                        padding:5
    
                    },
                        weekView:
                        {
                            // marginVertical:10, 
                            // borderBottomWidth:1, 
                            // borderBottomColor:theme.labelOrInactiveColor,
                            // alignSelf: 'center',
                            // height:height
                        },
        RatingText:
        {
            fontSize: 20, 
            fontFamily: 'Raleway_700Bold',
        },


        reviewbutton:{
            flexDirection: 'row',
            backgroundColor: theme.accentColor,
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 5,
            paddingBottom: 5,
            borderRadius: 3,
            marginTop: 5,
            alignSelf: 'center',
            marginBottom: 20,
        },
        reviewbutton_text:{
            textAlign: 'center',
            fontSize: 18,
            color: theme.primaryColor,
            
        }

});

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth,
        userInfo:state.user.userInfo,
    }
}
export default connect(mapStateToProps)(InstituteView);
