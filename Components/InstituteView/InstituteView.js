import React from 'react';
import { Image, Text, View,StyleSheet,ScrollView,FlatList,TouchableOpacity, Modal, Dimensions, TextInput,ActivityIndicator,TouchableWithoutFeedback} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {instituteData} from '../../FakeDataService/FakeData'
import { AirbnbRating,Rating } from 'react-native-ratings';
import {theme,screenMobileWidth,serverBaseUrl,documentPlaceholder,dataLimit, Assets, imageProvider} from '../config'
import CardView from '../Utils/CardView';
import MarqueeText from 'react-native-marquee';
import { EvilIcons, Feather } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { List } from 'react-native-paper';
import StudentReview from './StudentReview'
import Review from '../ReviewAndRatings/Review'
import Accordian from '../Utils/Accordian'
import MockTest from '../MockTest/MockTest'
import CountDown from 'react-native-countdown-component';
import {fetch_instituteDetails} from '../Utils/DataHelper/Coaching'
import {fetch_institute_courses,fetch_courses_banners,addCourseBanner,fetch_video_playlist,fetch_document_playlist,fetch_courses_documents_with_hidden,fetch_courses_timetable,fetch_testSeries_with_hidden, fetch_latestUpcomingSchedule, fetch_testSeriesPlaylist,fetch_courses_videos_with_hidden} from '../Utils/DataHelper/Course'
import { checkUserEnrollment } from '../Utils/DataHelper/EnrollStudent'
import { saveStudentHistory } from '../Utils/DataHelper/StudentHistory'
import { SliderBox } from 'react-native-image-slider-box';
import FeedText from '../Feed/FeedText';
import FeedImage from '../Feed/FeedImage';
import FeedPoll from '../Feed/FeedPoll';
import {tabListInstitute} from '../../FakeDataService/FakeData'
import {addLead} from '../Utils/DataHelper/Leads'
import ImageZoomModal from './ImageZoomModal';
import { checkSubscription, subscribe, unsubscribe, pinInstitute, unPinInstitute,checkForPin }  from '../Utils/DataHelper/Subscription'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import RenderSingleTestSeries from '../SeriesList/RenderSingleTestSeries'
import RenderLiveClass from './RenderLiveClass'
import RenderDocument from './RenderDocument'
import RenderVideo from './RenderVideo'
import { LinearGradient } from "expo-linear-gradient";
import {fetch_institute_feed} from '../Utils/DataHelper/Feed'
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';
import { Toast } from 'native-base';
import ImageColors from 'react-native-image-colors'
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
        studentEnrolled: '',
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
        insNumber:'',
        docoffset: 0,
        vidoffset: 0,
        ttoffset: 0,
        tsoffset: 0,
        activeFilterId: -1,
        showLoadMore: true,
        courseDocuments:[],
        courseVideos:[], 
        courseTimeTable:[],
        courseTestSeries:[],
        pinId: '',
        checkPinned: '',
        actions: ['Change Playlist']
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
                if(data)
                {
                    this.setState({courses:data, courseId: data[0].id, activeCourse: data[0].id, activeCourseDetail: data[0]},()=>{
                        checkUserEnrollment(this.state.courseId, this.state.studentId, this.checkEnrollCallBack)
                        fetch_courses_banners(this.state.activeCourse,this.courseBannerCallback)
                    })
                }else
                {
                    Toast.show('No Course Found')
                }
                
            })
        }
    }
    checkEnrollCallBack=(response) =>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
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
         checkForPin({"institute":{id: this.state.instituteId},"student":{id: this.props.userInfo.id}}, this.checkPinCallBack)
          
          
    }

    checkPinCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>{
                // console.log("pindata success", data)
                if(data&&data.id)
                {
                    this.setState({checkPinned: true, pinId: data.id})
                }
                else if(data==null)
                {
                    this.setState({checkPinned: false})
                }
            })
            
        }
        else
        {
            // console.log("not pinned", response.status)
        }
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
            // console.log("something went wrong")
        }
    }

    updateComponent=()=>
    {
        if(this.props.route.params.insId!=this.state.instituteId)
        {
            this.setState({
            courses:[],
            courseDetails:{},
            instituteId:this.props.route.params.insId,
            loadingInstitute:true,
             activeCourse:'',
             courseId:'',
             bannerImg: [],
            courseTimetableLoaded:false,
            isCourseTimeTableLoading:true,
            courseTimeTable:[],
            courseDocumentPlaylistLoaded:false,
            isCourseDocumentPlaylistLoading:true,
            courseDocumentPlaylist:[],
            courseDocumentLoaded:false,
            isCourseDocumentLoading:true,
            courseDocuments:[],
            courseTestSeriesLoaded:false,
            isCourseTestSeriesLoading:true,
            courseTestSeries:[],
            courseTestSeriesPlaylistLoaded:false,
            isCourseTestSeriesPlaylistLoading:true,
            courseTestSeriesPlaylist:[],
            courseVideoPlaylistLoaded:false,
            isCourseVideoPlaylistLoading:true,
            courseVideosPlaylist:[],
            courseVideoLoaded:false,
            isCourseVideoLoading:true,
            courseVideos:[],
            activeTab: 'videos', 
            tabtoshow: 1,
            modalVisible: false,
            ReviewmodalVisible: false, 
            studentId:this.props.userInfo.id,
            studentEnrolled: '',
            review: '',
            feedOffset:0, 
            subscribe: '',
            zoomModal: false,
            zimage:'', 
            index: '',
            activeFilter: 'All', 
            insName:'',
            insNumber:'',
            docoffset: 0,
            vidoffset: 0,
            ttoffset: 0,
            tsoffset: 0,
            activeFilterId: -1,
            showLoadMore: true,
            courseDocuments:[],
            courseVideos:[], 
            courseTimeTable:[],
            courseTestSeries:[],
            pinId: '',
            checkPinned: '' 
        },()=>
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
            // console.log("hello done")
        }
        else
        {
            //  console.log("error")
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
            //  console.log("done")
         }
         else
         {
            //  console.log("something went wrong")
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
                courseVideoLoaded:false,isCourseVideoLoading:false,courseVideos:[], 
                
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
                <Image source={{uri:imageProvider(item.bannerImageLink)}} style={styles.bannerImage}/>
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
                onPress={()=>this.setState({showLoadMore: link=='timeTable'?(false):(true)},()=>this.activeTab(link))} 
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
                    if(data.length>0)
                    {
                        this.setState({courseTimeTable:[...this.state.courseTimeTable,...data],courseTimetableLoaded:true,isCourseTimetableLoading:false, showLoadMore: false, loadingFooter: false});
                    }
                    else
                    {
                        this.setState({courseTimeTable:this.state.courseTimeTable,courseTimetableLoaded:true,isCourseTimetableLoading:false, showLoadMore: false, loadingFooter: false});
                    } 
                    
                    
                })
            }
    }
    courseTestseriesCallback=(response)=>
    {
        if(response.status==200)
        {
            response.json().then(data=>
                {
                    if(data.length>0)
                    {
                        if(data.length==dataLimit)
                        {
                            this.setState({courseTestSeries:[...this.state.courseTestSeries,...data],courseTestSeriesLoaded:true,isCourseTestSeriesLoading:false, showLoadMore: true, loadingFooter: false});               
                        }
                        else
                        {
                            this.setState({courseTestSeries:[...this.state.courseTestSeries,...data],courseTestSeriesLoaded:true,isCourseTestSeriesLoading:false, showLoadMore: false, loadingFooter: false});               
                        }    
                    }   
                    else
                    {
                        this.setState({courseTestSeries:this.state.courseTestSeries,courseTestSeriesLoaded:true,isCourseTestSeriesLoading:false, showLoadMore: false, loadingFooter: false});
                    } 
                    
                    
                })
        }
    }
    courseDocumentCallback=(response)=>
    {
            if(response.status==200)
            {
                response.json().then(data=>
                {
                     
                    if(data.length>0)
                    {
                         
                        if(data.length==dataLimit)
                        {
                            this.setState({courseDocuments:[...this.state.courseDocuments,...data],courseDocumentLoaded:true,isCourseDocumentLoading:false, showLoadMore: true, loadingFooter: false});               
                        }
                        else
                        {
                            this.setState({courseDocuments:[...this.state.courseDocuments,...data],courseDocumentLoaded:true,isCourseDocumentLoading:false, showLoadMore: false, loadingFooter: false});               
                        } 
                    } 
                    else
                    {
                        this.setState({courseDocuments:this.state.courseDocuments,courseDocumentLoaded:true,isCourseDocumentLoading:false, showLoadMore: false, loadingFooter: false}); 
                    }

                                   
                })
            }
    }
    courseVideoCallback=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                if(data.length>0)
                {
                    if(data.length==dataLimit)
                    {
                         this.setState({courseVideos:[...this.state.courseVideos,...data],courseVideoLoaded:true,isCourseVideoLoading:false, showLoadMore: true, loadingFooter: false});             
                    }
                    else
                    {
                         this.setState({courseVideos:[...this.state.courseVideos,...data],courseVideoLoaded:true,isCourseVideoLoading:false, showLoadMore: false, loadingFooter: false});             
                    }
                }  
                else
                {
                    this.setState({courseVideos:this.state.courseVideos,courseVideoLoaded:true,isCourseVideoLoading:false, showLoadMore: false, loadingFooter: false}); 
                }
                
                if(data.length<4)
                {
                    this.setState({showLoadMore:false})
                }
            })
        }
    }
    courseDocumentPlaylistCallback=(response)=>{
            if(response.status==200)
            {
                response.json().then(data=>
                {
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
                    this.setState({courseVideosPlaylist:data,courseVideoPlaylistLoaded:true,isCourseVideoPlaylistLoading:false,activeFilter:"All"});                   
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
            <View style={{width: width-10}}>
            <Accordian
            header={this.accordianHeader(item.name," ","chevron-down")}
        > 
            
            <MockTest data={item.courseTimeTableItem} subjectId={item.id} mode="readonly" />
          
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
                    {this.state.courseTimetableLoaded?(<FlatList
                        data={item}
                        renderItem={({item}) =>this.renderTestItem(item)}
                        keyExtractor={(item)=>item.id}
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                    />):(<CustomActivtiyIndicator mode="skimmer"/>)}
                </View>
            // </Accordian>


        )
    }

    filterItemClick=(item)=>
    {
        switch(this.state.activeTab)
        {
          case 'videos':  
                this.setState({activeFilter: item.name, isCourseVideoLoading:true,courseVideoLoaded:false, activeFilterId: item.id, vidoffset: 0, showLoadMore: true,courseVideos: []},()=>
                {
                    fetch_courses_videos_with_hidden(false,this.state.vidoffset, dataLimit,this.state.activeCourse,this.courseVideoCallback,item.id);
                }) 
                break;
           case 'document':
                this.setState({activeFilter: item.name, isCourseDocumentLoading:true,courseDocumentLoaded:false, activeFilterId: item.id, docoffset: 0, showLoadMore: true, courseDocuments:[]},()=>
                {
                    fetch_courses_documents_with_hidden(false,this.state.docoffset, dataLimit, this.state.activeCourse,this.courseDocumentCallback,item.id);
                }) 
                break;
            case 'testSeries':
                this.setState({activeFilter: item.name, isCourseTestSeriesLoading:true,courseTestSeriesLoaded:false, activeFilterId: item.id, tsoffset: 0, showLoadMore: true, courseTestSeries: []},()=>
                {
                    fetch_testSeries_with_hidden(false,this.state.tsoffset, dataLimit,this.state.activeCourse,this.courseTestseriesCallback,item.id);
                }) 
                break;

        } 
    }

    showFilters=(tab)=>{
        switch(tab)
        {
            case 'videos':  
                    if(!this.state.courseVideoLoaded&&!this.state.isCourseVideoLoading&&this.state.activeCourse)
                    {
                        this.setState({isCourseVideoLoading:true, activeFilterId: -1})
                        fetch_courses_videos_with_hidden(false,this.state.vidoffset, dataLimit,this.state.activeCourse,this.courseVideoCallback);
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
                            this.setState({isCourseTestseriesLoading:true, activeFilterId: -1})
                            fetch_testSeries_with_hidden(false,this.state.tsoffset, dataLimit,this.state.activeCourse,this.courseTestseriesCallback,this.state.activeFilterId);
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
                                        />
                                    )

            case 'document':                
                        if(!this.state.courseDocumentLoaded&&!this.state.isCourseDocumentLoading&&this.state.activeCourse)
                        {
                            this.setState({isCourseDocumentLoading:true})
                            fetch_courses_documents_with_hidden(false,this.state.docoffset, dataLimit,this.state.activeCourse,this.courseDocumentCallback,this.state.activeFilterId);
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
                                                </View>

                                            </View>
                                            <TouchableWithoutFeedback>
                                                <View style={{backgroundColor:theme.accentColor,padding:15,borderRadius:10,alignItems: 'center',width:'95%'}}>
                                                    <Text style={{fontFamily:'Raleway_700Bold',fontSize:15,color:theme.primaryColor}}>
                                                        Notify Me
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>

                                    </View>):(<EmptyList image={Assets.noResult.noRes1}/>)                     
                )
            case 'videos':      
            
            if(this.state.courseVideos.length<4&&this.state.showLoadMore)
            {
                this.setState({showLoadMore:false})
            }
            return(
                                    this.state.courseVideoLoaded?(
                                    <FlatList 
                                        data={this.state.courseVideos} 
                                        renderItem={({item,index})=><RenderVideo userId={this.props.userInfo.id} item={item} navigation={this.props.navigation} addToHistory={this.addToHistory} mode="student" studentEnrolled={this.state.studentEnrolled} downloadMode={true} courseVideosPlaylist={this.state.courseVideosPlaylist}  action={this.state.actions}/>}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                        ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                                    />
                                    ):(
                                        <CustomActivtiyIndicator mode="video"/>
                                    ))
            case 'testSeries':  
            if(this.state.courseTestSeries.length<4&&this.state.showLoadMore)
            {
                this.setState({showLoadMore:false})
            }
            return(
                                    !this.state.courseTestSeriesLoaded?(
                                     <CustomActivtiyIndicator mode="testItem"/>
                                    ):(
                                     <FlatList 
                                        data={this.state.courseTestSeries} 
                                        renderItem={({item,index})=><RenderSingleTestSeries item={item} navigation={this.props.navigation} addToHistory={this.addToHistory} mode="student" studentEnrolled={this.state.studentEnrolled} courseTestSeriesPlaylist={this.state.courseTestSeriesPlaylist} actions={this.state.actions}/>}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                        ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                                    />))
            case 'document':    
            
            if(this.state.courseDocuments.length<4&&this.state.showLoadMore)
            {
                this.setState({showLoadMore:false})
            }
            return(
                                    this.state.courseDocumentLoaded?(<FlatList 
                                        data={this.state.courseDocuments} 
                                        renderItem={({item,index})=><RenderDocument userId={this.props.userInfo.id} item={item} navigation={this.props.navigation} addToHistory={this.addToHistory} mode="student" studentEnrolled={this.state.studentEnrolled} downloadMode={true} insName={this.state.insName} insNumber={this.state.insNumber} courseDocumentPlaylist={this.state.courseDocumentPlaylist} actions={this.state.actions} />}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                        ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                                    />):(<CustomActivtiyIndicator mode="document"/>))
            case 'timeTable':    
                        if(!this.state.courseTimetableLoaded&&!this.state.isCourseTimeTableLoading&&this.state.activeCourse)
                        {
                            this.setState({isCourseTimeTableLoading:true, shoeLoadMore: false})
                            fetch_courses_timetable(this.state.ttoffset, dataLimit,this.state.activeCourseDetail.id,this.courseTimeTableCallback);
                        }
                            return(
                                this.renderTimeTable(this.state.courseTimeTable)
                                    )
        }
    }

 
    handleFeedCallBack=(response)=>
    {
            if(response.status==200)
            {
                response.json().then(data=>
                {
                    this.setState({feeds: data, isFeedLoading: false, isFeedLoaded: true})
                })
            }
    }

    increseRating=(rating)=>{
            var obj = this.state.institute
            if(rating=='1')
            {
                obj.oneStarCount=parseInt(obj.oneStarCount)+1
            }
            else if(rating=='2')
            {
                obj.twoStarCount=parseInt(obj.twoStarCount)+1
            }
            else if(rating=='3')
            {
                obj.threeStarCount=parseInt(obj.threeStarCount)+1
            }
            else if(rating=='4')
            {
                obj.fourStarCount=parseInt(obj.fourStarCount)+1
            }
            else if(rating=='5')
            {
                obj.fiveStarCount=parseInt(obj.fiveStarCount)+1
            }
            obj.totalRating = parseInt(obj.totalRating)+rating;
            obj.totalRatingCount=parseInt(obj.totalRatingCount)+1
            this.setState({institute: obj})
    }

    handleFeedTabBtnClick=()=>
    {
        this.tabtoshow(3)
        if(!this.state.isFeedLoaded&&!this.state.isFeedLoading)
        {
            this.setState({isFeedLoading:true, isFeedLoaded:false})
            fetch_institute_feed(this.state.instituteId,this.state.feedOffset,dataLimit,this.handleFeedCallBack)
        }
    }

    renderFeedItem=(item)=>
    {
        
        switch(item.feed.feed.feedType)
        {
            case 1:
               
                return (
                    <FeedImage item={item} navigation={this.props.navigation} mode="all"/>
                )
            case 2:
                return (
                    <FeedPoll item={item} navigation={this.props.navigation} mode="all"/>
                )
            case 3:
                return (
                    <FeedText item={item} navigation={this.props.navigation} mode="all"/>
                )
        }
    }

    // tabs handling
    tabtoshow=(tabValue)=>{
        this.setState({tabtoshow:tabValue});
    }

    loadMoreOnPress=()=>{
        if(this.state.activeTab=='document')
        {
            this.setState({docoffset: parseInt(this.state.docoffset)+1},()=>{fetch_courses_documents_with_hidden(false,this.state.docoffset, dataLimit, this.state.activeCourse,this.courseDocumentCallback,this.state.activeFilterId);})
        }
        else if(this.state.activeTab=='timeTable')
        {
            this.setState({ttoffset: parseInt(this.state.ttoffset)+1, showLoadMore: false},()=>{fetch_courses_timetable(this.state.ttoffset, dataLimit,this.state.activeCourse,this.courseTimeTableCallback);})
        }
        else if(this.state.activeTab=='videos')
        {
            this.setState({vidoffset: parseInt(this.state.vidoffset)+1},()=>
            fetch_courses_videos_with_hidden(false,this.state.vidoffset, dataLimit,this.state.activeCourse,this.courseVideoCallback,this.state.activeFilterId)
            )
        }
        else if(this.state.activeTab=='testSeries')
        {
            this.setState({tsoffset: parseInt(this.state.tsoffset)+1},()=>{fetch_testSeries_with_hidden(false,this.state.tsoffset, dataLimit,this.state.activeCourse,this.courseTestseriesCallback,this.state.activeFilterId)})
        }
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
                    {this.state.activeCourse?(
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
                                <TouchableOpacity style={{backgroundColor:theme.accentColor,padding:10,borderRadius:10,flexDirection: 'row',}} onPress={()=>this.props.navigation.navigate('webview',{link: serverBaseUrl+"checkout/course/"+this.props.userInfo.id+"/"+this.state.activeCourse+"/"+this.state.instituteId})}>
                                     
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
                                    onPress={()=>{this.setState({ activeFilterId: -1, showLoadMore: false},()=>this.activeTab('liveClass'))}} style={[styles.liveClassOuter,this.state.activeTab=='liveClass'?({backgroundColor:'red'}):({backgroundColor: theme.primaryColor})]}>
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
                            {this.state.showLoadMore?(
                                <TouchableOpacity style={[styles.loadMoreView]} onPress={()=>this.loadMoreOnPress()}>
                                        <View style={{}}><EvilIcons name="chevron-down" size={20}/></View>
                                        <Text style={{margin:5}}>Load More</Text>
                                </TouchableOpacity>
                            ):(null)} 
                        </View> 
                    ):(null)}
                    </>
    
                )
            
            case 3:
                return(
                    <View style={styles.container}>
                           {this.state.isFeedLoading?(
                               <CustomActivtiyIndicator mode="skimmer"/>
                           ):( <FlatList
                            data={this.state.feeds}
                            renderItem={({item}) => this.renderFeedItem(item)}
                            keyExtractor={(item,index)=>index}
                            ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                        />)}
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
        
    pinCallBack=(response)=>{
        if(response.status==201)
        {
            // console.log("pin success")
            // console.log(response.headers.map.location)
            this.setState({pinId: response.headers.map.location, checkPinned: true})
        }
        else
        {
            // console.log("pin error", response.status)
        }
    }

    unPinCallBack=(response)=>{
        if(response.status==200)
        {
            // console.log("unpinned success")
            this.setState({checkPinned: false})
        }
        else
        {
            // console.log("unpin error", response.status)
        }
    }

    render() {
      console.log(this.props)
      this.updateComponent()
        const  {institute,loadingInstitute} = this.state;
        console.log(institute&&this.props.categories.filter(item=>item.id==institute.category)[0].name)
        return (
            <PageStructure 
                iconName={"chevron-left"}
                btnHandler={() => {
                    if(this.props.navigation.canGoBack())
                    {
                        this.props.navigation.goBack()
                    }else
                    {
                        this.props.navigation.navigate("Home")
                    }
                    
                
                }}
                catInHeader={false}
                titleonheader={institute&&this.props.categories.filter(item=>item.id==institute.category)[0].name}
                noBottomTab={true}
                noNotificationIcon={false}
                rightIconOnPress={()=>{this.setState({modalVisible:true})}} 
                nosearchIcon={true}
                pinIconName={!this.state.checkPinned?("paperclip"):("link")}
                pinUnpinIcon={true}
                searchReplace={true}
                showShareIcon={true}
            > 
            {loadingInstitute?
            (
                <CustomActivtiyIndicator mode="instituteView"/>
            ):(
            <ScrollView >
                <View style={styles.container}>
                        {/* <View style={styles.headerView}>
                            <Text style={styles.headText}>{instituteData.category}</Text>
                        </View> */}
                        <View style={styles.instituteheader}>
                            {CardView(
                                <Image source={{uri:imageProvider(institute.logo)}} style={styles.instituteheaderLogo}/>
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
                            {/* <EvilIcons name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}  onPress = {() => {this.toggleModal(true)}}/> */}
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
                        instituteId={this.state.instituteId}
                        courseId={this.state.activeCourse}
                        studentId={this.state.studentId}
                        total_rating_count={institute.totalRatingCount}
                        one_star_count={institute.oneStarCount}
                        two_star_count={institute.twoStarCount}
                        three_star_count={institute.threeStarCount}
                        four_star_count={institute.fourStarCount}
                        five_star_count={institute.fiveStarCount}
                        inslogo={serverBaseUrl+institute.logo}
                        institle={institute.name}
                        increseRating={this.increseRating}
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
                                                    <EvilIcons name="share" size={20}/>
                                                    <Text style={{marginLeft:5}}>Unfollow</Text>
                                                </TouchableOpacity>
                                            ):(
                                                <TouchableOpacity onPress={() =>subscribe(this.state.studentId,this.state.instituteId,this.subscribeCallback)} style={{flexDirection: 'row',margin:5}}>
                                                    <EvilIcons name="share" size={20}/>
                                                    <Text style={{marginLeft:5}}>Follow</Text>
                                                </TouchableOpacity>
                                            )}
                                            
                                            {!this.state.checkPinned?(
                                                    <TouchableOpacity onPress={()=>pinInstitute({"institute":{id: this.state.instituteId},"student":{id: this.props.userInfo.id}}, this.pinCallBack)} style={{flexDirection: 'row',margin:5}}>
                                                        <EvilIcons name="share" size={20}/>
                                                        <Text style={{marginLeft:5}}>Pin</Text>
                                                    </TouchableOpacity>
                                            ):(
                                                    <TouchableOpacity onPress={()=>unPinInstitute(this.state.pinId, this.unPinCallBack)} style={{flexDirection: 'row',margin:5}}>
                                                        <EvilIcons name="share" size={20}/>
                                                        <Text style={{marginLeft:5}}>UnPin</Text>
                                                    </TouchableOpacity>
                                            )}
                                            
                                            <View style={{flexDirection: 'row',margin:5}}>
                                                <EvilIcons name="share" size={20}/>
                                                <Text style={{marginLeft:5}}>Flag as inappropriate</Text>
                                            </View>
                                        </>,
                                        {width:'100%',height:'100%'}
                                    )} 
                                </TouchableOpacity>
                            </View>
                            </TouchableWithoutFeedback>
                        </Modal>
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
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '90%',
                    alignItems: 'center'
                },
                    accordianLeft:
                    {
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding:5,
                    },
                        accordianTitle:
                        {
                            fontSize:14,
                            marginTop: 5,
                            fontWeight:'bold',
                        },
                        accordianTestCount:
                        {
                            fontSize:12,
                            color:theme.labelOrInactiveColor,
                            
                        },
                    accordianMiddle:
                    { 
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
        categories:state.categories.categories
    }
}
export default connect(mapStateToProps)(InstituteView);
