import React from 'react';
import { Image, Text, View,StyleSheet,ScrollView,FlatList,TouchableOpacity, Modal, TextInput} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {instituteData} from '../../FakeDataService/FakeData'
import { AirbnbRating,Rating } from 'react-native-ratings';
import {theme,screenMobileWidth} from '../config'
import CardView from '../Utils/CardView';
import MarqueeText from 'react-native-marquee';
import { Feather } from '@expo/vector-icons';
import {connect} from 'react-redux'
import { List } from 'react-native-paper';
import StudentReview from './StudentReview'
import Review from '../ReviewAndRatings/Review'
import Accordian from '../Utils/Accordian'
import MockTest from '../MockTest/MockTest'
import { checkUserEnrollment } from '../Utils/DataHelper/EnrollStudent'


import {tabListInstitute} from '../../FakeDataService/FakeData'
class InstituteView extends React.Component {
    state = { 
        activeTab: 'videos',
        activeCourse:1,
        tabtoshow: 1,
        modalVisible: false,
        ReviewmodalVisible: false,
        courseId:1,
        instituteId: 1,
        studentId:1,
        studentEnrolled: false,
        review: '',
        rating: 0,
        totalRatingCount:15 ,
        oneStarCount:1,
        twoStarCount:2,
        threeStarCount:3,
        fourStarCount:4,
        fiveStarCount:5,
        inslogo:'wdsa',
        institle:'DUBUDDY',
     }

     componentDidMount(){
        checkUserEnrollment(this.state.courseId, this.state.studentId, this.checkEnrollCallBack)
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

    //  updateComponent=() =>{
    //      console.log("this.state.studentEnrolled",this.state.studentEnrolled)
    //      console.log("this.props.studentEnrolled",this.props.route.params.studentEnrolled)
    //      if(this.state.studentEnrolled!=this.props.route.params.studentEnrolled)
    //      {
    //          this.setState({studentEnrolled: this.props.route.params.studentEnrolled})
    //      }
    //  }


     renderTabItems=({item})=>
     {
         return (
             <TouchableOpacity style={[styles.courseItemContainer,this.state.activeCourse==item.id?({backgroundColor:theme.secondaryColor,borderColor:theme.secondaryColor}):({backgroundColor:theme.labelOrInactiveColor+'4D',borderColor:theme.labelOrInactiveColor})]} onPress={()=>this.setState({activeCourse:item.id})}> 
                     <Text style={[styles.courseTitle,this.state.activeCourse==item.id?({color:theme.primaryColor}):({color:theme.greyColor})]}>{item.name}</Text>
             </TouchableOpacity>
         );
     }
     toggleModal(visible) {
        this.setState({ modalVisible: visible });
     }



    renderCourseItems=({item})=>
    {
        return (
            <TouchableOpacity style={[styles.courseItemContainer,this.state.activeCourse==item.id?({backgroundColor:theme.secondaryColor}):(null)]} onPress={()=>this.setState({activeCourse:item.id})}> 
                    <Text style={[styles.courseTitle,this.state.activeCourse==item.id?({color:theme.primaryColor}):({color:theme.secondaryColor})]}>{item.name}</Text>
            </TouchableOpacity>
        );
    }
    renderBannerList=({item})=>
    {
        return(
            <TouchableOpacity style={styles.bannerItemContainer}>
                    <Image source={item.image} style={styles.bannerImage}/>
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
            <View 
                style={styles.singleSubject}>
                <Text style={styles.singleSubjectText}>{item.title}</Text>
            </View>
        )
    }

    renderVideos=({item})=>{
        return(
            <View style={styles.videoContainer}>
                <View>
                    <Image source={item.image} style={styles.videoImage}/>
                </View>
                <View style={styles.videoColumn}>
                    <View>
                        <Text style={styles.videoText}>{item.title}</Text>
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

    renderTimeTable=({item})=>{
        return(
            // <Accordian
            //     header={this.accordianHeader(item.title, " ", "chevron-down")}
            // >
                <View style={styles.weekView}> 
                    <FlatList 
                        data={item.data} 
                        renderItem={({item}) =>this.renderTestItem(item)}
                        keyExtractor={(item)=>item.id} 
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            // </Accordian>


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
            </View>
        )
    }

    showFilters=(tab)=>{
        switch(tab)
        {
            case 'liveClass':   return(
                                    <FlatList 
                                        data={instituteData.liveClassFilters} 
                                        renderItem={this.renderSubjectOptions}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    />)

            case 'videos':      return(
                                    <FlatList 
                                        data={instituteData.videoFilters} 
                                        renderItem={this.renderSubjectOptions}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    />)
            case 'testSeries':  return(
                                    <FlatList 
                                        data={instituteData.testSeriesFilters} 
                                        renderItem={this.renderSubjectOptions}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    />)

            case 'document':    return(
                                    <FlatList 
                                        data={instituteData.documentFilters} 
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
                                    <FlatList 
                                        data={instituteData.liveClasses} 
                                        renderItem={this.renderLiveClass}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                    />)
            case 'videos':      return(
                                    <FlatList 
                                        data={instituteData.videos} 
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
                                    <FlatList 
                                        data={instituteData.timeTable} 
                                        renderItem={this.renderTimeTable}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                    />)
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
                                        data={tabListInstitute} 
                                        renderItem={this.renderTabItems}
                                        keyExtractor={(item)=>item.id} 
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    /> 
                            </View>
                            <View style={styles.rowContainer}>
                                    <FlatList 
                                    data={instituteData.banners} 
                                    renderItem={this.renderBannerList} 
                                    keyExtractor={(item)=>item.id}
                                    horizontal={true} 
                                    showsHorizontalScrollIndicator={false}
                                    />
                                    <View style={styles.optionalRow}> 
                                        <TouchableOpacity style={{borderColor:theme.borderColor,borderWidth:1,borderRadius:10,padding:10}}>
                                            <Text style={{fontSize:10,color:theme.secondaryColor,fontWeight:'bold'}}>
                                                Upsc Cse- optional Subscription
                                            </Text>
                                        </TouchableOpacity>
                                        {this.state.studentEnrolled?(null):(<TouchableOpacity style={{backgroundColor:theme.accentColor,padding:10,borderRadius:10}} onPress={()=>this.props.navigation.navigate("Payment")}>
                                            <Text style={{fontSize:10,color:theme.primaryColor}}>
                                                Buy Pass : ₹10,000
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
                                { this.renderImagePost()}
                                { this.renderQuizPost()}
                                { this.renderTextPost()}
                            </View>
                        )
                        
                    }
            }
        

    render() {
        // this.updateComponent()
        return (
            <PageStructure 
                iconName={"arrow-left"}
                btnHandler={() => {this.props.navigation.goBack()}}
                catInHeader={false}
                titleonheader={"UPSC Coaching"}
                notificationreplaceshare={"more-vertical"}
                rightIconOnPress={()=>{this.setState({modalVisible:true})}} 
            > 
            <ScrollView>
                <View style={styles.container}>

                        {/* <View style={styles.headerView}>
                            <Text style={styles.headText}>{instituteData.category}</Text>
                        </View> */}
                        <View style={styles.instituteheader}>
                            {CardView(
                                <Image source={instituteData.logo} style={styles.instituteheaderLogo}/>
                            ,[styles.logoCard,this.props.screenWidth<=screenMobileWidth?({width:"30%",height:100}):({width:200,height:150})])
                            } 
                            <View style={styles.instituteheaderMeta}>
                                <Text style={styles.instituteheaderText} numberOfLines={3}>{instituteData.title}</Text>
                                <Text style={styles.instituteDirector}>{instituteData.directoy_name}</Text>
                                <View style={styles.instituteRatingView}>
                                    <Text style={{ color: theme.greyColor}}>{instituteData.rating+' • '}</Text>
                                    <AirbnbRating 
                                        starContainerStyle={styles.instituteRating} 
                                        count={5}
                                        reviews={[]} 
                                        isDisabled={true}
                                        defaultRating={instituteData.rating}
                                        size={12}
                                        selectedColor={theme.blueColor}
                                        showRating={false}
                                    />
                                    <Text style={styles.voteCount}>{instituteData.voteCount} Votes</Text>
                                </View>
                            </View>
                            {/* <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}  onPress = {() => {this.toggleModal(true)}}/> */}
                        </View>
                        <View style={styles.body}>
                            <View style={styles.btnRow}>
                                    <View style={[styles.btnView1,this.state.tabtoshow==1?({backgroundColor:theme.accentColor,borderColor:theme.accentColor}):({backgroundColor:theme.primaryColor,borderColor:theme.labelOrInactiveColor})]}>
                                        <Text style={[styles.btnText,{color:this.state.tabtoshow==1?theme.primaryColor:theme.greyColor}]} onPress={()=>{this.tabtoshow(1)}}>Courses</Text>
                                    </View>
                                    <View style={[styles.btnView2,this.state.tabtoshow==2?({backgroundColor:theme.accentColor,borderColor:theme.accentColor}):({backgroundColor:theme.primaryColor,borderColor:theme.labelOrInactiveColor})]}>
                                        <Text style={[styles.btnText,{color:theme.blueColor,fontWeight: 'bold'}]}>35K Follower</Text>
                                    </View>
                                    <View style={[styles.btnView3,this.state.tabtoshow==3?({backgroundColor:theme.accentColor,borderColor:theme.accentColor}):({backgroundColor:theme.primaryColor,borderColor:theme.labelOrInactiveColor})]}>
                                        <Text style={[styles.btnText,{color:this.state.tabtoshow==3?theme.primaryColor:theme.greyColor}]} onPress={()=>{this.tabtoshow(3)}}>Feed</Text>
                                    </View>
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
                    
                        <View style={{marginVertical: 20,}}>
                            <Text style={styles.RatingText}>About Us</Text>
                            <Text>lorem ipsum dolor sit lorem unkndown printer took a gallery. We need to write here someting about the applicaiton or about the institute</Text>
                        </View>

                    <StudentReview 
                        studentEnrolled={this.state.studentEnrolled}
                        instituteId={this.state.instituteId}
                        courseId={this.state.courseId}
                        studentId={this.state.studentId}
                        total_rating_count={this.state.totalRatingCount}
                        one_star_count={this.state.oneStarCount}
                        two_star_count={this.state.twoStarCount}
                        three_star_count={this.state.threeStarCount}
                        four_star_count={this.state.fourStarCount}
                        five_star_count={this.state.fiveStarCount}
                        inslogo={this.state.inslogo}
                        institle={this.state.institle}
                    />
                   

                    

                    

                
                    <View style = {styles.container}>
                        <Modal animationType = {"fade"} 
                                transparent = {true}
                                visible = {this.state.modalVisible}
                                onRequestClose = {() => { console.log("Modal has been closed.") } }>
                            <TouchableOpacity  onPress={() =>this.setState({modalVisible:false})} style={{width:'100%',height:'100%'}}>
                                <TouchableOpacity style={{alignSelf: 'flex-end', width: 200, height: 120, padding: 6, backgroundColor: 'white',postion: 'absolute',top:10}}>
                                    {CardView(
                                        <>
                                            <View style={{flexDirection: 'row',margin:5}}>
                                                <Feather name="share" size={20}/>
                                                <Text style={{marginLeft:5}}>Share</Text>
                                            </View>
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
                            </TouchableOpacity>
                        </Modal>
                        
                        {/* <TouchableOpacity onPress = {() => {this.toggleModal(true)}}>
                        <Text style = {styles.text}>Open Modal</Text>
                        </TouchableOpacity> */}
                    </View> 
                </ScrollView>
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
                            alignSelf:'flex-start',
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
                                flex: 0.2,
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
                                borderWidth:1,
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
                        
                        borderTopColor:theme.labelOrInactiveColor,
                        padding:5
                    },
                    courseItemContainer:
                    {  
                        paddingLeft:10,
                        paddingRight:10, 
                        marginRight:10,
                        // padding:5,
                        marginTop:5 ,
                        padding:2,
                        borderWidth:1, 
                        borderColor:theme.labelOrInactiveColor,
                        borderRadius:15
                    },
                        courseTitle:
                        {
                            fontSize:15, 
                            color:theme.greyColor
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
            marginTop: 10
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
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(InstituteView);
