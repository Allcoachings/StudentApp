import React from 'react';
import { Image, Text, View,StyleSheet,ScrollView,FlatList,TouchableOpacity } from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {instituteData} from '../../FakeDataService/FakeData'
import { Rating } from 'react-native-ratings';
import {theme,screenMobileWidth} from '../config'
import CardView from '../Utils/CardView';
import MarqueeText from 'react-native-marquee';
import { Feather } from '@expo/vector-icons';
import {connect} from 'react-redux'
import { List } from 'react-native-paper';
import Review from '../ReviewAndRatings/Review'
import Accordian from '../Utils/Accordian'

class InstituteView extends React.Component {
    state = { 
        activeTab: 'videos',
        activeCourse:'1'
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
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin:5, paddingLeft:20, paddingRight:20}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Date</Text>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Time</Text>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Teacher</Text>
                </View>
                {CardView(
                    <FlatList 
                        data={item.date} 
                        renderItem={({item}) =>this.renderItem(item)}
                        keyExtractor={(item)=>item.id} 
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                    />,{width:'95%', padding:10, margin:5}
                )}
            </Accordian>
        )
    }

    renderTimeTable=({item})=>{
        return(
            <Accordian
                header={this.accordianHeader(item.title, " ", "chevron-down")}
            >
                <View style={styles.weekView}> 
                    <FlatList 
                        data={item.data} 
                        renderItem={({item}) =>this.renderTestItem(item)}
                        keyExtractor={(item)=>item.id} 
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </Accordian>


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

    render() {
        console.log(instituteData.category)
        return (
            <PageStructure 
            iconName={"menu"}
            btnHandler={() => {this.props.navigation.toggleDrawer()}}
            catInHeader={true}
            > 
            <ScrollView>
                <View style={styles.container}>

                        <View style={styles.headerView}>
                            <Text style={styles.headText}>{instituteData.category}</Text>
                        </View>
                        <View style={styles.instituteheader}>
                            {CardView(
                                <Image source={instituteData.logo} style={styles.instituteheaderLogo}/>
                            ,[styles.logoCard,this.props.screenWidth<=screenMobileWidth?({width:"30%",height:100}):({width:200,height:150})])
                            } 
                            <View style={styles.instituteheaderMeta}>
                                <Text style={styles.instituteheaderText}>{instituteData.title}</Text>
                                <Text style={styles.instituteDirector}>{instituteData.directoy_name}</Text>
                                <View style={styles.instituteRatingView}>
                                    <Text style={{alignSelf:'flex-start', color: theme.greyColor}}>{instituteData.rating}</Text>
                                    <Rating
                                        type='star'
                                        ratingCount={5}
                                        startingValue={instituteData.rating}
                                        imageSize={15} 
                                        unSelectedColor={'yellow'} 
                                        tintColor={theme.appBackgroundColor}
                                        style={styles.instituteRating}
                                        readOnly={true} 
                                    />
                                    <Text style={styles.voteCount}>{instituteData.voteCount} Votes</Text>
                                </View>
                            </View>
                            <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.marquee}>
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
                            </View>
                            {/* <View style={styles.InstituteCourseListView}>
                                <FlatList 
                                    data={instituteData.courses} 
                                    renderItem={this.renderCourseItems}
                                    keyExtractor={(item)=>item.id} 
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                /> 
                            </View> */}
                            <View style={styles.rowContainer}>
                                    <FlatList 
                                    data={instituteData.banners} 
                                    renderItem={this.renderBannerList} 
                                    keyExtractor={(item)=>item.id}
                                    horizontal={true} 
                                    showsHorizontalScrollIndicator={false}
                                    />

                            </View>
                            <View style={styles.optionalRow}> 
                                <TouchableOpacity style={{borderColor:theme.borderColor,borderWidth:1,borderRadius:10,padding:10}}>
                                    <Text style={{fontSize:10,color:theme.secondaryColor,fontWeight:'bold'}}>
                                        Upsc Cse- optional Subscription
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor:theme.accentColor,padding:10,borderRadius:10}}>
                                    <Text style={{fontSize:10,color:theme.primaryColor}}>
                                        Buy Pass : ₹10,000
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
                        </View>
                    </View>
                    <Text style={styles.RatingText}>Rating & Reviews</Text>
                    <Review />
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
                 
                }, 
                    instituteheaderLogo:
                    {
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
                        // alignItems: 'center'    
                    },
                        instituteRating:
                        {
                            alignSelf:'flex-start',
                            marginRight:10,
                        },
                        voteCount:
                        {
                            fontWeight:'bold',

                        },

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
                            marginVertical:10, 
                            borderBottomWidth:1, 
                            borderBottomColor:theme.labelOrInactiveColor,
                            alignSelf: 'center',
                            // height:height
                        },
        RatingText:
        {
            fontSize: 20, 
            marginTop: 10
        }

});

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(InstituteView);
