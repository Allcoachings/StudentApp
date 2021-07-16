import React from 'react';
import { Image, Text, View,StyleSheet,ScrollView,FlatList,TouchableOpacity, Modal, TextInput ,ActivityIndicator} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {instituteData, insBanners} from '../../FakeDataService/FakeData'
import { Rating } from 'react-native-ratings';
import {theme,screenMobileWidth, serverBaseUrl,documentPlaceholder,dataLimit,addBannerImagePlaceholder} from '../config'
import CardView from '../Utils/CardView';
import MarqueeText from 'react-native-marquee';
import { Feather } from '@expo/vector-icons';
import {connect} from 'react-redux'
import { List } from 'react-native-paper';
import Accordian from '../Utils/Accordian'
import MockTest from '../MockTest/MockTest'
import AddCourseModal from './AddCourseModal';
import {fetch_institute_courses,fetch_courses_banners,addCourseBanner,fetch_courses_videos,fetch_video_playlist,fetch_document_playlist,fetch_courses_documents,fetch_courses_timetable,fetch_testSeries} from '../Utils/DataHelper/Course'
import {fetch_institute_reviews} from '../Utils/DataHelper/Reviews'
import {fetch_institute_feed} from '../Utils/DataHelper/Feed'
import InsReviews from './InsReviews'

import * as DocumentPicker from 'expo-document-picker';
import AddFeedModal from './AddFeedModal';
import FeedText from '../Feed/FeedText';
import FeedImage from '../Feed/FeedImage';
import FeedPoll from '../Feed/FeedPoll';
class InsHome extends React.Component {
    
    state = { 
        tabtoshow: 1, 
        activeFilter: '',
        addVideo: false,
        addPdf: false,
        addTest: false,
        activeSections: [],
        isAddCourseModalVisible: false,
        courseDocumentPlaylist:[],
        courseDocuments:[],
        courseVideos:[],
        courseVideosPlaylist:[],
        courseTimeTable:[],
        feeds:[],
        isAddFeedModalVisible: false,
        isFeedLoaded: false,
        isFeedLoading: false,
        feedOffset:0,
     }

     coursesCallBack=(response)=>
     {
            if(response.status==200)
            {
                response.json().then((data)=>
                {
                    this.setState({courses:data})
                })
            }
     }
     componentDidMount() {
        fetch_institute_courses(this.props.institute.details.id,this.coursesCallBack)
     }

    

      
    courseBannerCallback=(response)=>
    {
        if(response.status==200)
        {
            response.json().then(data=>
                {
                    

                    data.push({type:'add',bannerImageLink:addBannerImagePlaceholder})
                    this.setState({courseBanners:data});
                })
        }
    }
    handleCourseItemClick=(item)=>
    {
        this.setState({activeCourse:item.id,activeCourseDetail:item})
        
        fetch_courses_banners(item.id,this.courseBannerCallback)
    }
    renderCourseItems=({item,index})=>
    {
        console.log(index);
        if(index==0&&!this.state.activeCourse)
        {
            this.setState({activeCourse:item.id,activeCourseDetail:item,activeTab: 'videos', })
            fetch_courses_banners(item.id,this.courseBannerCallback)
        }
        return (
            <TouchableOpacity style={[styles.courseItemContainer,this.state.activeCourse==item.id?({backgroundColor:theme.secondaryColor}):(null)]} onPress={()=>this.handleCourseItemClick(item)}> 
                    <Text style={[styles.courseTitle,this.state.activeCourse==item.id?({color:theme.primaryColor}):({color:theme.secondaryColor})]}>{item.title}</Text>
            </TouchableOpacity>
        );
    }
    bannerCallback=(response)=>
    {
       
    }
    addCourseBanner=()=>
    {
        DocumentPicker.getDocumentAsync({type:"image/*",copyToCacheDirectory:true,multiple:false}).then(response=>
            {
                if(response.type=="success")
                {
                    addCourseBanner(response,this.state.activeCourse,(response)=>{
                        console.log("banner",response.status)
                        if(response.status==201)
                        {
                            let courseBanners = this.state.courseBanners;
                            let details = response.headers.map.location.split("*");
                             
                            courseBanners.unshift({id:details[0],bannerImageLink:details[1],courseId:this.state.activeCourse})
                            this.setState({courseBanners:courseBanners})
                
                        }
                    })
                }
            })
    }
    renderBannerList=({item})=>
    {
        if(item.type=='add')
        {
            return(
                <TouchableOpacity style={styles.bannerItemContainer} onPress={()=>this.addCourseBanner()}>
                    <Image source={{uri:item.bannerImageLink}} style={styles.bannerImage}/>
                </TouchableOpacity  >
            )
        } 
        return(
            <TouchableOpacity style={styles.bannerItemContainer} >
                    <Image source={{uri:serverBaseUrl+item.bannerImageLink}} style={styles.bannerImage}/>
            </TouchableOpacity  >
        )
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

    renderSubjectOptions=({item})=>
    {
        console.log(item.name)
        return(
            <TouchableOpacity 
                onPress={()=>{this.filterItemClick(item)}} 
                style={[styles.singleSubject,this.state.activeFilter==item.name?({backgroundColor:theme.secondaryColor}):(null)]}>
                <Text style={[styles.singleSubjectText,this.state.activeFilter==item.name?({color:theme.primaryColor}):(null)]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    filterItemClick=(item)=>
    {
        switch(this.state.activeTab)
        {
          case 'videos':  
                this.setState({activeFilter: item.name,isCourseVideoLoading:true,isCourseVideoLoaded:false},()=>
                {
                    fetch_courses_videos(null,this.courseVideoCallback,item.id);
                }) 
                break;
           case 'document':
                this.setState({activeFilter: item.name,isCourseDocumentLoading:true,isCourseDocumentLoaded:false},()=>
                {
                    fetch_courses_documents(null,this.courseDocumentCallback,item.id);
                }) 
                break;

        } 
    }
    renderVideos=({item})=>{
        console.log(item);
        return(
            <View style={styles.videoContainer}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("videoplayer",{videoUrl:serverBaseUrl+item.videoLocation})}>
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

    setExpanded = (expanded)=>{
        this.setState({expanded: expanded})
    }
      
    handlePress = () => {
        this.setExpanded(!this.state.expanded);
    }

    timeTableView=({item}) => {
        return( 
                <List.Item title={item.teacher} /> 
        )
    }

    itemList=({item})=>{
        return(
            <Accordian
                header={this.accordianHeader("folder",item.subject,"chevron-down")}
            >
                 <FlatList 
                        data={item.date} 
                        renderItem={this.timeTableView}
                        keyExtractor={(item)=>item.id} 
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                    />
        </Accordian>  
        )
    }

    accordianHeader = (leftIcon,title,rightIcon) =>
    {
        return(
            <View style={styles.accordianHeader}>
                        <View style={styles.accordianLeft}>
                            <Feather name={leftIcon} size={20}/>
                        </View>
                        <View style={styles.accordianMiddle}>
                            <Text>{title}</Text>
                        </View>
                        <View style={styles.accordianRight}>
                            <Feather name={rightIcon} size={20}/>
                        </View> 
            </View>
        )
    }

    renderTestSeries=({item})=>{
        return( 
             CardView(
                 <View style={styles.list}>
                     <View style={styles.topRow}>
                         <Text style={styles.queText}>{item.questionCount} Questions</Text>
                         <Text style={styles.timeText}>{item.timeDuration} minutes</Text>
                     </View>
                     <View style={styles.bottomRow}>
                         <Text style={styles.titleText}>{item.title}</Text>
                         <TouchableOpacity style={styles.btnView} onPress={()=>this.props.navigation.navigate("SingleTestSeries")}>
                             <Feather name="play" size={12} style={{color: theme.primaryColor, marginRight: 3}}/>
                             <Text style={styles.btnText}>Start</Text>
                         </TouchableOpacity>
                     </View>
                 </View>,{margin: 10, borderWidth: 1, borderRadius: 10, borderColor: theme.labelOrInactiveColor}
             )
         )
     }

    renderDocument=({item})=>{
        console.log(item)
        return(
            <View style={styles.documentContainer}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('pdfViewer',{pdf:serverBaseUrl+item.fileAddress})}>
                    <Image source={{uri:documentPlaceholder}} style={styles.documentImage}/>
                </TouchableOpacity>
                <View style={{flexShrink: 1}}>
                    <View style={{ display: 'flex', flexDirection: 'row'}}>
                        <Text style={styles.documentTitle}>{item.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.documentText}>{this.props.institute.details.name}</Text>
                    </View>
                    {/* <View>
                        <Text style={styles.documentText}>{item.Views} {item.date}</Text>
                    </View> */}
                </View>
            </View>
        )
    }

    renderLiveClass=({item})=>{
        return(
            <View style={styles.classContainer}>
                <View>
                    <Image source={item.image} style={styles.classImage}/>
                </View>
                <View style={{flexShrink: 1}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.classTitle}>{item.title}</Text>
                    </View>
                    <View>
                        <Text style={styles.classText}>{item.institute}</Text>
                    </View>
                    <View>
                        <Text style={styles.classText}>{item.Views} {item.date}</Text>
                    </View>
                </View>
                <View>
                    <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                </View>
            </View>
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
            CardView(<View style={styles.accordianHeader}>
                        <View style={styles.accordianLeft}>
                            <Text style={styles.accordianTitle}>{title}</Text>
                            <Text style={styles.accordianTestCount}>{testCount}</Text> 
                        </View>
                        <View style={styles.accordianMiddle}>
                           
                        </View>
                        <View style={styles.accordianRight}>
                            <Feather name={rightIcon} size={20}/>
                        </View> 
            </View>,
            {
                width:'95%', 
                padding:5,
                margin:5
            }
            )
        )
    }

    renderTestItem=(item)=>{
        console.log("subject",item.name)
        return(
            <Accordian
                header={this.accordianHeader(item.name," ","chevron-down")}
            > 
                {/* <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin:5, paddingLeft:20, paddingRight:20}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Date</Text>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Time</Text>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Teacher</Text>
                </View> */}
                <MockTest data={item.courseTimeTableItem} subjectId={item.id} />
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
        )
    }
    renderTimeTable=(item)=>{
        return(
            // <Accordian
            //     header={this.accordianHeader(item.title, " ", "chevron-down")}
            // >
            <>
                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', marginTop: '5%'}} onPress={()=>this.props.navigation.navigate("AddTimeTable",{courseId:this.state.activeCourse,appendSubject:this.appendCourseTimeTableSubject})}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Add Time Table+</Text>
                </TouchableOpacity>
                  <View style={styles.weekView}> 
                    <FlatList 
                        data={item} 
                        renderItem={({item}) =>this.renderTestItem(item)}
                        keyExtractor={(item)=>item.id} 
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                    />
                 </View>
         
            </>


        )
    }




    redirect=(value)=>{
        this.setState({activeFilter: value});
        if(value=='LiveAdd')
        {
              
        }
        else if(value=='TestAdd')
        {
            this.props.navigation.navigate("AddTestSeries",{courseId:this.state.activeCourse,appendCourseTestSeries:this.appendCourseTestSeries})
        }
        else if(value=='VideoAdd')
        {
            this.props.navigation.navigate("AddVideos",{courseId:this.state.activeCourse,appendVideo:this.appendCourseVideo,appendCourseVideoPlaylist:this.appendCourseVideoPlaylist})
        }
        else if(value=='PdfAdd')
        {
            this.props.navigation.navigate("AddDocument",{courseId:this.state.activeCourse,appendDocument:this.appendCourseDocument,appendCourseDocumentPlaylist:this.appendCourseDocumentPlaylist})
        }
        
    }

    courseTestseriesCallback=(response)=>
    {
        console.log(response.status)
        if(response.status==200)
        {
            response.json().then(data=>
                {
                    console.log(data)
                    this.setState({courseTestSeries:data,courseTestSeriesLoaded:true,isCourseTestSeriesLoading:false});                   
                })
        }
    }

    appendCourseTestSeries=(obj)=>
    {
        let courseTestSeries = this.state.courseTestSeries;
        courseTestSeries.push(obj)
        this.setState({courseTestSeries})
    }

    appendCourseTimeTableSubject=(obj)=>
    {
        let courseTimeTable = this.state.courseTimeTable;
        courseTimeTable.push(obj)
        this.setState({courseTimeTable})
    }
    courseTimeTableCallback=(response)=>
    {
        console.log(response.status)
            if(response.status==200)
            {
                response.json().then(data=>
                {
                    console.log(data);
                    this.setState({courseTimeTable:data,courseTimetableLoaded:true,isCourseTimetableLoading:false});                   
                })
            }
    }
    appendCourseDocumentPlaylist=(obj)=>
    {
        let courseDocumentPlaylist = this.state.courseDocumentPlaylist;
        courseDocumentPlaylist.push(obj)
        this.setState({courseDocumentPlaylist})
    }
    appendCourseDocument=(obj)=>
    {
        let courseDocuments = this.state.courseDocuments;
        courseDocuments.push(obj);
        this.setState({courseDocuments})
    }
    appendCourseVideo=(obj)=>
    {
        let courseVideos = this.state.courseVideos;
        courseVideos.push(obj);
        this.setState({courseVideos})
        
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
    courseVideoPlaylistCallback=(response)=>{
        console.log(response.status)
            if(response.status==200)
            {
                response.json().then(data=>
                {
                    console.log(data);
                    this.setState({courseVideosPlaylist:data,courseVideoPlaylistLoaded:true,isCourseVideoPlaylistLoading:false});                   
                })
            }
    }
    courseDocumentCallback=(response)=>
    {
        console.log(response.status)
            if(response.status==200)
            {
                response.json().then(data=>
                {
                    console.log(data);
                    this.setState({courseDocuments:data,courseDocumentLoaded:true,isCourseDocumentLoading:false});                   
                })
            }
    }
    courseDocumentPlaylistCallback=(response)=>{
        console.log(response.status)
            if(response.status==200)
            {
                response.json().then(data=>
                {
                    console.log(data);
                    this.setState({courseDocumentPlaylist:data,courseDocumentPlaylistLoaded:true,isCourseDocumentPlaylistLoading:false});                   
                })
            }
    }
    appendCourseVideoPlaylist =(obj)=>
    {
        let courseVideosPlaylist = this.state.courseVideosPlaylist;
        courseVideosPlaylist.push(obj)
        this.setState({courseVideosPlaylist})
    }
     

    showFilters=(tab)=>{
        switch(tab)
        {
            case 'liveClass':   return(
                                    <View style={styles.AddFilter}>
                                        <TouchableOpacity 
                                            onPress={()=>this.redirect('LiveAdd')} 
                                            style={[styles.singleSubject,this.state.activeFilter=='LiveAdd'?({backgroundColor:theme.secondaryColor, color: theme.primaryColor}):(null)]}>
                                                    <Text style={[styles.singleSubjectText,this.state.activeFilter=='LiveAdd'?({color:theme.primaryColor}):(null)]}>Go Live +</Text>
                                        </TouchableOpacity>
                                        <FlatList 
                                            data={instituteData.liveClassFilters} 
                                            renderItem={this.renderSubjectOptions}
                                            keyExtractor={(item)=>item.id} 
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                        />
                                    </View>)

            case 'videos':      
                    if(!this.state.courseVideoLoaded&&!this.state.isCourseVideoLoading)
                    {
                        console.log("active course id",this.state.activeCourseId)
                        this.setState({isCourseVideoLoading:true})
                        fetch_courses_videos(this.state.activeCourseDetail.id,this.courseVideoCallback);
                    }
                    if(!this.state.courseVideoPlaylistLoaded&&!this.state.isCourseVideoPlaylistLoading)
                    {
                        this.setState({isCourseVideoPlaylistLoading:true})
                        fetch_video_playlist(this.state.activeCourseDetail.id,this.courseVideoPlaylistCallback);
                    }
            
                         return(
                             this.state.isCourseVideoLoading?
                             (
                                 <ActivityIndicator color={theme.accentColor} style={"large"}/>
                             ):
                             (
                                 <ScrollView>
                                <View style={styles.AddFilter}>
                                    <TouchableOpacity 
                                        style={[styles.singleSubject,this.state.activeFilter=='VideoAdd'?({backgroundColor:theme.secondaryColor, color: theme.primaryColor}):(null)]} 
                                        onPress={()=>this.redirect('VideoAdd')}>
                                                <Text style={[styles.singleSubjectText,this.state.activeFilter=='VideoAdd'?({color:theme.primaryColor}):(null)]}>Add Videos +</Text>
                                    </TouchableOpacity>
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

                        if(!this.state.courseTestseriesLoaded&&!this.state.isCourseTestseriesLoading)
                        {
                            console.log("active course id",this.state.activeCourseId)
                            this.setState({isCourseTestseriesLoading:true})
                            fetch_testSeries(this.state.activeCourseDetail.id,this.courseTestseriesCallback);
                        }
                        // if(!this.state.courseTestseriesPlaylistLoaded&&!this.state.isCourseTestseriesPlaylistLoading)
                        // {
                        //     this.setState({isCourseTestseriesPlaylistLoading:true})
                        //     fetch_Testseries_playlist(this.state.activeCourseDetail.id,this.courseTestseriesPlaylistCallback);
                        // }
            
                            return(
                                <View style={styles.AddFilter}>
                                    <TouchableOpacity 
                                        style={[styles.singleSubject,this.state.activeFilter=='TestAdd'?({backgroundColor:theme.secondaryColor, color: theme.primaryColor}):(null)]} 
                                        onPress={()=>{this.setState(()=>this.redirect('TestAdd'))}}>
                                                <Text style={[styles.singleSubjectText,this.state.activeFilter=='TestAdd'?({color:theme.primaryColor}):(null)]}>Test +</Text>
                                    </TouchableOpacity>
                                    <FlatList 
                                        data={instituteData.testSeriesFilters} 
                                        renderItem={this.renderSubjectOptions}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>)

            case 'document':    
            
                        if(!this.state.courseDocumentLoaded&&!this.state.isCourseDocumentLoading)
                        {
                            console.log("active course id",this.state.activeCourseId)
                            this.setState({isCourseDocumentLoading:true})
                            fetch_courses_documents(this.state.activeCourseDetail.id,this.courseDocumentCallback);
                        }
                        if(!this.state.courseDocumentPlaylistLoaded&&!this.state.isCourseDocumentPlaylistLoading)
                        {
                            this.setState({isCourseDocumentPlaylistLoading:true})
                            fetch_document_playlist(this.state.activeCourseDetail.id,this.courseDocumentPlaylistCallback);
                        }
                            return(
                                <View style={styles.AddFilter}>
                                    <TouchableOpacity 
                                        style={[styles.singleSubject,this.state.activeFilter=='PdfAdd'?({backgroundColor:theme.secondaryColor, color: theme.primaryColor}):(null)]} 
                                        onPress={()=>this.redirect('PdfAdd')}>
                                            <Text style={[styles.singleSubjectText,this.state.activeFilter=='PdfAdd'?({color:theme.primaryColor}):(null)]}>Pdf +</Text>
                                    </TouchableOpacity>
                                    <FlatList 
                                        data={this.state.courseDocumentPlaylist} 
                                        renderItem={this.renderSubjectOptions}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>)
        }
    }

    showContent=(tab)=>{
        switch(tab)
        {
            case 'liveClass':   return(
                                    <FlatList 
                                        data={instituteData.liveClasses} 
                                        renderItem={this.renderLiveClass}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                    />)
            case 'videos':      return(
                                    <FlatList 
                                        data={this.state.courseVideos} 
                                        renderItem={this.renderVideos}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                    />)
            case 'testSeries':  return(
                                    <FlatList 
                                        data={this.state.courseTestSeries} 
                                        renderItem={this.renderTestSeries}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                    />)
            case 'document':    return(
                                    <FlatList 
                                        data={this.state.courseDocuments} 
                                        renderItem={this.renderDocument}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                    />)
            case 'timeTable':   
            
                        if(!this.state.courseTimetableLoaded&&!this.state.isCourseTimeTableLoading)
                        {
                           
                            this.setState({isCourseTimeTableLoading:true})
                            fetch_courses_timetable(this.state.activeCourseDetail.id,this.courseTimeTableCallback);
                        }
                       
            
                        return(
                            

                            this.renderTimeTable(this.state.courseTimeTable)
                            // keyExtractor={(item)=>item.id} 
                            // horizontal={false}
                            // showsHorizontalScrollIndicator={false}
                        )
        }
    }


    openAddCourseModal = ()=>{
        this.setState({ isAddCourseModalVisible: true});
    }
    
    openAddFeedModal = ()=>{
        this.setState({ isAddFeedModalVisible: true});
    }
    closeAddCourseModal = ()=>{
        this.setState({ isAddCourseModalVisible: false});
    }

    closeAddFeedModal = ()=>{
        this.setState({ isAddFeedModalVisible: false});
    }

    appendFeed=(feed)=>{
        let feeds = this.state.feeds
        feeds.push(feed)
        this.setState({feeds})
    }
    appendCourses=(course)=>{
        let courses = this.state.courses
        courses.push(course)
        this.setState({courses})
    }

    tabtoshow=(tabValue)=>{
        this.setState({tabtoshow:tabValue});
    }
    renderFeedItem=(item)=>
    {
        
        switch(item.feed.feed.feedType)
        {
            case 1:
                return (
                    <FeedImage item={item}/>
                )
            case 2:
                return (
                    <FeedPoll item={item}/>
                )
            case 3:
                return (
                    <FeedText item={item}/>
                )
        }
    }
    switchTabRender=(tabtoshow)=>{
        switch (tabtoshow) {
            case 1:


                return(
                   <>
                   
                            <View style={styles.InstituteCourseListView}>
                                <TouchableOpacity style={{marginTop: 20, borderWidth: 1, borderColor: theme.secondaryColor, marginRight: 10, borderRadius:10, paddingHorizontal: 10,}} onPress={()=>this.openAddCourseModal()}>
                                    <Text> + Add Course</Text>
                                </TouchableOpacity>

                                <FlatList 
                                    data={this.state.courses} 
                                    renderItem={this.renderCourseItems}
                                    keyExtractor={(item)=>item.id} 
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                /> 
                            </View>
                            <View style={styles.rowContainer}>
                                <FlatList 
                                    data={this.state.courseBanners} 
                                    renderItem={this.renderBannerList} 
                                    keyExtractor={(item)=>item.id}
                                    horizontal={true} 
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                            {this.state.activeCourse?(
                                <>
                                <View style={styles.optionalRow}> 
                                    <TouchableOpacity style={{borderColor:theme.borderColor,borderWidth:1,borderRadius:10,padding:10}}>
                                        <Text style={{fontSize:10,color:theme.secondaryColor,fontWeight:'bold'}}>
                                            About Course Chats
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{backgroundColor:theme.accentColor,padding:10,borderRadius:10}}>
                                        <Text style={{fontSize:10,color:theme.primaryColor}}>
                                            Fees - {this.state.activeCourseDetail&&this.state.activeCourseDetail.fees}
                                        </Text>
                                    </TouchableOpacity>
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

                                    </>
                            ):(null)}
                            {/* <View style={[styles.loadMoreView]}>
                                <View style={{}}><Feather name="chevron-down" size={20}/></View>
                                <Text style={{margin:5}}>Load More</Text>
                            </View>  */}

                   </>
    
                )
            
            case 3:
                // console.log(this.state.feeds)
                return(
                    <View style={styles.container}>
                        <TouchableOpacity style={{backgroundColor:theme.textColor,borderColor:theme.labelOrInactiveColor,borderWidth:1, padding:4, borderRadius:6, marginHorizontal:5, marginBottom:7, justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.openAddFeedModal()}>
                            <Text style={{color:theme.primaryColor, fontSize:16}}>Add</Text>
                            
                        </TouchableOpacity>
                        <FlatList
                            data={this.state.feeds}
                            renderItem={({item}) => this.renderFeedItem(item)}
                            keyExtractor={(item,index)=>index}
                        />
                        {/* <FeedImage/> */}
                        {/* { this.renderImagePost()} */}
                        {/* { this.renderQuizPost()} */}
                        {/* <FeedPoll/> */}
                        {/* { this.renderTextPost()} */}
                        {/* <FeedText/> */}
                    </View>
                )
                
            }
    }
    handleFeedCallBack=(response)=>
    {
            console.log(response.status)
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
            fetch_institute_feed(this.props.institute.details.id,this.state.feedOffset,dataLimit,this.handleFeedCallBack)
        }
    }
    render() {
       const institute = this.props.institute.details
         return (
        
        <PageStructure 
            iconName={"menu"}
            btnHandler={() => {this.props.navigation.toggleDrawer()}}
            catInHeader={false}
            titleonheader={"Dashboard"}
            notificationreplaceshare={"more-vertical"}
                rightIconOnPress={()=>{this.setState({modalVisible:true})}} 
        > 
            <ScrollView>
                <View style={styles.container}>
                        <View style={styles.instituteheader}>
                            {CardView(
                                <Image source={{uri:institute.logo}} style={styles.instituteheaderLogo}/>
                            ,[styles.logoCard,this.props.screenWidth<=screenMobileWidth?({width:"30%",height:100}):({width:200,height:150})])
                            } 
                            <View style={styles.instituteheaderMeta}>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <Text style={styles.instituteheaderText} numberOfLines={3}>{institute.name}</Text>
                                    <TouchableOpacity onPress={null}>
                                        <Feather name="edit-3" size={18} color={theme.secondaryColor} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.instituteDirector} >{institute.directorName}</Text>
                                <View style={styles.instituteRatingView}>
                                    <Text style={{ color: theme.greyColor}}>{institute.totalRatingCount?(institute.totalRating/institute.totalRatingCount):(0)+' • '}</Text>
                                    <Rating
                                        type='star'
                                        ratingCount={5}
                                        startingValue={institute.totalRatingCount?(institute.totalRating/institute.totalRatingCount):(0)}
                                        imageSize={15} 
                                        unSelectedColor={'yellow'}
                                        // tintColor={theme.appBackgroundColor}
                                        style={styles.instituteRating}
                                        readOnly={true} 
                                    />
                                    <Text style={styles.voteCount}>{institute.totalRatingCount?(institute.totalRatingCount):(0)} Votes</Text>
                                </View>
                                
                            </View>
                            {/* <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/> */}
                        </View>
                        <View style={styles.body}>
                        <View style={styles.btnRow}>
                                    <View style={[styles.btnView3,this.state.tabtoshow==1?({backgroundColor:theme.accentColor,borderColor:theme.accentColor}):({backgroundColor:theme.primaryColor,borderColor:theme.labelOrInactiveColor,borderWidth:1})]}>
                                        <Text style={[styles.btnText,{color:this.state.tabtoshow==1?theme.primaryColor:theme.greyColor}]} onPress={()=>{this.tabtoshow(1)}}>Courses</Text>
                                    </View>
                                     
                                    <View style={[styles.btnView2,this.state.tabtoshow==2?({backgroundColor:theme.accentColor+'4D',borderColor:theme.accentColor+'4D'}):({backgroundColor:theme.primaryColor,borderColor:theme.labelOrInactiveColor,borderWidth: 1})]}>
                                        <Text style={[styles.btnText,{color:theme.blueColor,fontWeight: 'bold'}]}>{institute.follower?institute.follower:0} Follower</Text>
                                    </View>
                                    <TouchableOpacity style={[styles.btnView3,this.state.tabtoshow==3?({backgroundColor:theme.accentColor,borderColor:theme.accentColor}):({backgroundColor:theme.primaryColor,borderColor:theme.labelOrInactiveColor,borderWidth:1})]} onPress={this.handleFeedTabBtnClick}>
                                        <Text style={[styles.btnText,{color:this.state.tabtoshow==3?theme.primaryColor:theme.greyColor}]} >Feed</Text>
                                    </TouchableOpacity>
                            </View>
                            {this.switchTabRender(this.state.tabtoshow)}

                            
                        </View>
                    </View>
                    <View style={{marginVertical: 20,}}>
                            <Text style={styles.RatingText}>About Us</Text>
                            <Text>{this.props.institute.details.about}</Text>
                        </View>
                    <InsReviews />  

                </ScrollView>
                {this.state.isAddCourseModalVisible?(
                        <AddCourseModal 
                            appendCourses={this.appendCourses}
                            isAddCourseModalVisible={this.state.isAddCourseModalVisible} 
                            closeModal={this.closeAddCourseModal}
                            instId={this.props.institute.details.id}
                            setInstituteDetails={this.props.setInstituteDetails}
                        />
                ):(
                    null
                )} 
                
                {this.state.isAddFeedModalVisible?(
                        <AddFeedModal 
                            addFeedCallBack={this.appendFeed}
                            isAddFeedModalVisible={this.state.isAddFeedModalVisible} 
                            closeModal={this.closeAddFeedModal}
                            posterId={this.props.institute.details.id} 
                            postedBy={1}
                            instituteDetails={institute}
                        />
                ):(
                    null
                )} 
            </PageStructure>
        );
    }
}

const styles = StyleSheet.create({
        container: 
        {
            flex: 1,
            flexDirection:'column',
        },
            instituteheader:
            {
                flexDirection:'row',
                flex:0.2
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
                            // marginTop:3
                        },
                        voteCount:
                        {
                            fontWeight:'bold',

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
                        flex: 0.2,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 5,
                        paddingBottom: 5,
                        backgroundColor:theme.accentColor,
                        borderRadius: 5,
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
                        borderRadius: 5,
                        margin: 2,
                        justifyContent:'center',
                        alignItems: 'center'
                    },
                    btnView3:
                    {
                        flex: 0.2,
                        paddingLeft: 10,
                        paddingRight: 10,
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
                            fontSize: 16,
                            color: theme.primaryColor
                        },
                
                InstituteCourseListView:{
                    flexDirection: 'row',
                    borderTopWidth:1,
                    borderTopColor: theme.labelOrInactiveColor
                },

                courseItemContainer:
                {
                    borderColor:theme.secondaryColor,
                    borderWidth:1,
                    // padding:5,
                    marginTop:'30%',
                    paddingLeft:10,
                    paddingRight:10,
                    paddingTop: 4,
                    paddingBottom: 4,
                    borderRadius:13,
                    marginRight:10,
                },
                    courseTitle:
                    {
                        fontSize:12,
                        color:theme.secondaryColor
                    },
                bannerItemContainer:
                {
                    height:140,
                    marginTop:30,
                },
                    bannerImage:
                    {
                        width:300,
                        height:140,
                        borderRadius:10,
                        marginRight:10,
                    },
                optionalRow:
                { 
                    marginTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth:1,
                    paddingBottom:10,
                     borderColor: theme.labelOrInactiveColor
                },
                content: 
                {
                    marginTop: '6%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
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
                    AddFilter:
                    {
                        display: 'flex',
                        flexDirection: 'row'
                    },
                        singleSubject:
                        {
                            marginLeft: 5,
                            borderWidth: 1,
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
                    classContainer:
                    {
                        marginTop: 10,
                        marginLeft: 10,
                        display: 'flex',
                        flexDirection: 'row',
                        // justifyContent: 'center',
                        // alignItems: 'center'
                    },
                        classImage:
                        {
                            height: 90,
                            width:  100,
                            borderRadius: 10,
                            marginRight: 10
                        },
                        classTitle:
                        {
                            // flex: 1, 
                            // flexWrap: 'wrap',
                            flexShrink: 1,
                            fontWeight: '700',
                            
                        },
                        classText:
                        {
                            color: theme.secondaryColor,
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
                            marginLeft:'auto', 
                            padding:5
                        },
                            weekView:
                            {
                                marginVertical:10, 
                                borderBottomWidth:1, 
                                borderBottomColor:theme.labelOrInactiveColor,
                                alignSelf: 'center',
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
            RatingText:
            {
                fontSize: 20, 
                marginTop: 10
            },


    // add course css

    headView:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
        headText:
        {
            marginTop:10,
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.secondaryColor
        },
    inputView: {
        marginTop:'5%',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10
    },
        labelText: {
            fontSize: 18,
            fontWeight: '700',
            color: theme.secondaryColor,
            marginBottom: 10,
        },
        inputField:
        {
            padding:10,
            fontSize: 16
        },
    btnView:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
        submitButton:
        {
            borderRadius: 10,
            backgroundColor:theme.accentColor,
            padding: 10,
            marginRight:10
        },
            submitButtonText:
            {
                color: theme.primaryColor
            },
        addMoreButton:
        {
            borderRadius: 10,
            backgroundColor:theme.addMoreButtonColor,
            padding: 10,
            marginLeft: 10
        },
            addMoreButtonText:
            {
                color: theme.primaryColor
            },


    // add course css end

});

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth,
        institute:state.institute
    }
}
export default connect(mapStateToProps)(InsHome);
