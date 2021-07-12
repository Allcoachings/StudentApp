import React from 'react';
import { Image, Text, View,StyleSheet,ScrollView,FlatList,TouchableOpacity, Modal, TextInput } from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {instituteData, insBanners} from '../../FakeDataService/FakeData'
import { Rating } from 'react-native-ratings';
import {theme,screenMobileWidth, serverBaseUrl, dataLimit} from '../config'
import CardView from '../Utils/CardView';
import MarqueeText from 'react-native-marquee';
import { Feather } from '@expo/vector-icons';
import {connect} from 'react-redux'
import { List } from 'react-native-paper';
import Accordian from '../Utils/Accordian'
import MockTest from '../MockTest/MockTest'
import AddCourseModal from './AddCourseModal';
import {fetch_institute_courses,fetch_courses_banners,addCourseBanner,fetch_courses_videos} from '../Utils/DataHelper/Course'
import {fetch_institute_reviews} from '../Utils/DataHelper/Reviews'
import InsReviews from './InsReviews'

import * as DocumentPicker from 'expo-document-picker';
class InsHome extends React.Component {
    
    state = { 
        tabtoshow: 1,
        activeTab: 'liveClass',
        activeCourse:'1',
        activeFilter: '',
        addVideo: false,
        addPdf: false,
        addTest: false,
        activeSections: [],
        isAddCourseModalVisible: false,
       
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
    courseBannerCallback=(response)=>
    {
        if(response.status==200)
        {
            response.json().then(data=>
                {
                    

                    data.push({type:'add',bannerImageLink:'https://picsum.photos/200/300'})
                    this.setState({courseBanners:data});
                })
        }
    }
    handleCourseItemClick=(item)=>
    {
        this.setState({activeCourse:item.id,activeCourseDetail:item})
        
        fetch_courses_banners(item.id,this.courseBannerCallback)
    }
    renderCourseItems=({item})=>
    {
        return (
            <TouchableOpacity style={[styles.courseItemContainer,this.state.activeCourse==item.id?({backgroundColor:theme.secondaryColor}):(null)]} onPress={()=>this.handleCourseItemClick(item)}> 
                    <Text style={[styles.courseTitle,this.state.activeCourse==item.id?({color:theme.primaryColor}):({color:theme.secondaryColor})]}>{item.title}</Text>
            </TouchableOpacity>
        );
    }
    bannerCallback=(response)=>
    {
        if(response.status==201)
        {
            let courseBanners = this.state.courseBanners;
            let details = response.headers.map.location.split("*");
            courseBanners.unshift({id:details[0],bannerImageLink:serverBaseUrl+details[1],courseId:this.state.activeCourse})

        }
    }
    addCourseBanner=()=>
    {
        DocumentPicker.getDocumentAsync({type:"image/*",copyToCacheDirectory:true,multiple:false}).then(response=>
            {
                if(response.type=="success")
                {
                    addCourseBanner(response,this.state.activeCourse,this.bannerCallback)
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
        return(
            <TouchableOpacity 
                onPress={()=>{this.setState({activeFilter: item.title})}} 
                style={[styles.singleSubject,this.state.activeFilter==item.title?({backgroundColor:theme.secondaryColor}):(null)]}>
                <Text style={[styles.singleSubjectText,this.state.activeFilter==item.title?({color:theme.primaryColor}):(null)]}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    renderVideos=({item})=>{
        return(
            <View style={styles.videoContainer}>
                <View>
                    <Image source={{uri:item.videoThumb}} style={styles.videoImage}/>
                </View>
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
                         <Text style={styles.queText}>{item.questions}</Text>
                         <Text style={styles.timeText}>{item.time}</Text>
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
        return(
            <View style={styles.documentContainer}>
                <View>
                    <Image source={item.image} style={styles.documentImage}/>
                </View>
                <View style={{flexShrink: 1}}>
                    <View style={{ display: 'flex', flexDirection: 'row'}}>
                        <Text style={styles.documentTitle}>{item.title}</Text>
                    </View>
                    <View>
                        <Text style={styles.documentText}>{item.institute}</Text>
                    </View>
                    <View>
                        <Text style={styles.documentText}>{item.Views} {item.date}</Text>
                    </View>
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
        return(
            <Accordian
                header={this.accordianHeader(item.subject," ","chevron-down")}
            > 
                {/* <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin:5, paddingLeft:20, paddingRight:20}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Date</Text>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Time</Text>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Teacher</Text>
                </View> */}
                <MockTest />
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
                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', marginTop: '5%'}} onPress={()=>this.props.navigation.navigate("AddTimeTable")}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Add Time Table+</Text>
                </TouchableOpacity>
                  <View style={styles.weekView}> 
                    <FlatList 
                        data={item.data} 
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
            this.props.navigation.navigate("AddTestSeries")
        }
        else if(value=='VideoAdd')
        {
            this.props.navigation.navigate("AddVideos",{courseId:this.state.activeCourse,appendVideo:this.appendCourseVideo})
        }
        else if(value=='PdfAdd')
        {
            this.props.navigation.navigate("AddDocument")
        }
        
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
    handleCourseVideoCallback=()=>
    {
        
        fetch_courses_videos(this.state.activeCourse,this.courseVideoCallback)
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
                        this.setState({isCourseVideoLoading:true})
                        fetch_courses_videos(this.state.activeCourseId,this.handleCourseVideoCallback);
                    }
            
                         return(
                             this.isCourseVideoLoading?
                             (
                                 <ActivityIndicator color={theme.accentColor} style={"large"}/>
                             ):
                             (
                                <View style={styles.AddFilter}>
                                    <TouchableOpacity 
                                        style={[styles.singleSubject,this.state.activeFilter=='VideoAdd'?({backgroundColor:theme.secondaryColor, color: theme.primaryColor}):(null)]} 
                                        onPress={()=>this.redirect('VideoAdd')}>
                                                <Text style={[styles.singleSubjectText,this.state.activeFilter=='VideoAdd'?({color:theme.primaryColor}):(null)]}>Add Videos +</Text>
                                    </TouchableOpacity>
                                    <FlatList 
                                        data={instituteData.videoFilters} 
                                        renderItem={this.renderSubjectOptions}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>
                            )
                        )
            case 'testSeries':  return(
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

            case 'document':    return(
                                <View style={styles.AddFilter}>
                                    <TouchableOpacity 
                                        style={[styles.singleSubject,this.state.activeFilter=='PdfAdd'?({backgroundColor:theme.secondaryColor, color: theme.primaryColor}):(null)]} 
                                        onPress={()=>this.redirect('PdfAdd')}>
                                            <Text style={[styles.singleSubjectText,this.state.activeFilter=='PdfAdd'?({color:theme.primaryColor}):(null)]}>Pdf +</Text>
                                    </TouchableOpacity>
                                    <FlatList 
                                        data={instituteData.documentFilters} 
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
                                        data={instituteData.testSeries} 
                                        renderItem={this.renderTestSeries}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                    />)
            case 'document':    return(
                                    <FlatList 
                                        data={instituteData.document} 
                                        renderItem={this.renderDocument}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                    />)
            case 'timeTable':    return(
                                     
                                        this.renderTimeTable(instituteData.timeTable[0])
                                        // keyExtractor={(item)=>item.id} 
                                        // horizontal={false}
                                        // showsHorizontalScrollIndicator={false}
                                    )
        }
    }


    openAddCourseModal = ()=>{
        this.setState({ isAddCourseModalVisible: true});
    }
    closeAddCourseModal = ()=>{
        this.setState({ isAddCourseModalVisible: false});
    }

    appendCourses=(course)=>{
        let courses = this.state.courses
        courses.push(course)
        this.setState({courses})
    }

    tabtoshow=(tabValue)=>{
        this.setState({tabtoshow:tabValue});
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
                            <View style={[styles.loadMoreView]}>
                                <View style={{}}><Feather name="chevron-down" size={20}/></View>
                                <Text style={{margin:5}}>Load More</Text>
                            </View> 

                   </>
    
                )
            
            case 3:
                return(
                    <View style={styles.container}>
                        { this.renderImagePost()}
                        { this.renderQuizPost()}
                        { this.renderTextPost()}
                    </View>
                )
                
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
                                    <TouchableOpacity>
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
                                    <View style={[styles.btnView3,this.state.tabtoshow==3?({backgroundColor:theme.accentColor,borderColor:theme.accentColor}):({backgroundColor:theme.primaryColor,borderColor:theme.labelOrInactiveColor,borderWidth:1})]}>
                                        <Text style={[styles.btnText,{color:this.state.tabtoshow==3?theme.primaryColor:theme.greyColor}]} onPress={()=>{this.tabtoshow(3)}}>Feed</Text>
                                    </View>
                            </View>
                                {this.switchTabRender(this.state.tabtoshow)}

                            
                        </View>
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
                             
                            alignSelf:'flex-start',
                            marginRight:10,
                            marginTop:3
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
