import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView,ActivityIndicator, RefreshControl, TouchableWithoutFeedback,Dimensions} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { theme,dataLimit, Assets } from '../config';
import { EvilIcons, Feather } from '@expo/vector-icons';
import { feedData } from '../../FakeDataService/FakeData' 
import {connect } from 'react-redux'
import CardView from '../Utils/CardView';
import {fetch_feed_all,fetch_feed_by_category} from '../Utils/DataHelper/Feed'
import FeedText from '../Feed/FeedText';
import FeedImage from '../Feed/FeedImage';
import FeedPoll from '../Feed/FeedPoll';
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddFeedModal from '../InsHome/AddFeedModal';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
class Feed extends React.Component {
    state={
        offset:0,
        loadingData:true,
        shoeLoadMore:true,
        feeds:[],
        loadingFooter: false,
        refreshing: false
    }

    handleFeedCallBack=(response)=>
    {
        
        if(response.status==200){
            response.json().then(data=>{
        
                if(data.length>0)
                {
                    if(this.state.offset!=0)
                    {
                       
                        this.setState({feeds:[...this.state.feeds,...data],loadingData:false, showLoadMore: true, loadingFooter: false})
                    }else
                    {
                        
                        this.setState({feeds:data,loadingData:false, showLoadMore: true, loadingFooter: false})
                    }
                    
                }
                else
                {
                    this.setState({feeds:this.state.feeds,showLoadMore: false,loadingData:false, loadingFooter: false})
                }   
            })
        }else
        {
            this.setState({loadingData:false})
        }
        this.setState({refreshing: false})
    }

    componentDidMount()
    {
        AsyncStorage.getItem("authInfo").then((data)=>{

            if(data)
            {
                let obj = JSON.parse(data) 
                this.setState({authType: obj.authType=='user'?2:1,})
            }
          })
        this.initialFetch()
    }

    initialFetch=() => {
         
            fetch_feed_all(this.state.offset,dataLimit,this.handleFeedCallBack); 
    }

    header=() => {
        return(
            <View style={styles.headView}>
                <EvilIcons name="chevron-left" size={30} />
                <Text style={styles.headText}>Feed</Text>
            </View>
        )
    }

   
    
    toggleCatMode=(mode,item)=>
    { 
         console.log(mode," ",item)
        switch(mode)
        {
            case true:
                this.setState({offset:0,mode,item,loadingData:true,feeds:[]},()=>
                {
                    fetch_feed_by_category(item.id,this.state.offset,dataLimit,this.handleFeedCallBack)
                })
                break;
                
            case false:
            default:

                this.setState({offset:0,loadingData:true,feeds:[]},()=>
                {
                    fetch_feed_all(this.state.offset,dataLimit,this.handleFeedCallBack);
                })
                
            break;
        }
        
    }

    renderFeedItem=(item)=>
    {
        
        switch(item.feed.feed.feedType)
        {
            case 1:
                return (
                    <FeedImage actions={['Share','Report','Copy Link']} updateEditFeedState={this.updateEditFeedState} item={item} type={this.state.authType} navigation={this.props.navigation} mode="all"/>
                )
            case 2:
                return (
                    <FeedPoll actions={['Share','Report','Copy Link']} updateEditFeedState={this.updateEditFeedState} item={item} type={this.state.authType} navigation={this.props.navigation} mode="all"/>
                )
            case 3:
                return (
                    <FeedText actions={['Share','Report','Copy Link']} updateEditFeedState={this.updateEditFeedState} item={item} type={this.state.authType} navigation={this.props.navigation} mode="all"/>
                )
        }
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

    refreshing=()=>{
        
        this.setState({refreshing:true,offset:0},()=>{ 
         
            this.toggleCatMode(this.state.mode,this.state.item)
        });
     
        

    }
    appendFeed=(feed)=>{
        let feeds_arr =[...this.state.feeds]
        feeds_arr.unshift(feed)
        this.setState({feeds:feeds_arr})
    }
    
    updateEditFeedState=()=>{}
    setUpdateEditFeedState=(ref)=>{
        this.updateEditFeedState=ref;
    }

    updateSingleFeed=(item, index)=>{
        var obj=[...this.state.feeds] 
        obj[index]=item; 
        this.setState({feeds:obj})
    }
    render() {
        console.log(width," ",height)
        return(
            <PageStructure 
                userIcon={() => {this.props.navigation.navigate("Profile")}}
                catInHeader={true}
                catOnpress={this.toggleCatMode} 
                rightIconOnPress={() =>this.props.navigation.navigate("Notification")}
                scrollMode={'scroll'}
                navigation={this.props.navigation}
                searchFun={this.search}
                titleWithImage={true}
                titleonheader={"Community"} 
                refreshControl={
                    <RefreshControl
                     refreshing={this.state.refreshing} 
                        onRefresh={this.refreshing} />
                }
                absolutePositionedElement={

                    <TouchableOpacity activeOpacity={0.8} style={{position: "absolute",backgroundColor:theme.accentColor,borderRadius:25,bottom: 30,right:10,padding:15}} onPress={()=>{console.log("called");this.setState({isAddFeedModalVisible:true})}}>
                        <View>
                            <Feather color={theme.primaryColor} name="plus" size={20}/>
                        </View>
                    </TouchableOpacity>
                }
          
            >
                
               

                    <View style={styles.container}>

                    {this.state.loadingData?(
                            <CustomActivtiyIndicator mode="skimmer"/>
                    ):(
                        <FlatList
                            data={this.state.feeds}
                            renderItem={({item}) => this.renderFeedItem(item)}
                            keyExtractor={(item,index)=>index}
                            ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                            onEndReachedThreshold={0.1}
                            refreshing={this.state.refreshing}
                            ListFooterComponent={this.renderFooter}
                            onEndReached={() => 
                            {
                                
                                if(this.state.showLoadMore&&!this.state.loadingFooter)
                                {
                                    // console.log("here")
                                    this.setState({ refreshing: true,loadingFooter:true,offset:parseInt(this.state.offset)+1},()=>fetch_feed_all(this.state.offset,dataLimit,this.handleFeedCallBack));
                                        
                                }
                            
                            }}
                        />
                    )} 
                    </View> 
                
                {this.state.isAddFeedModalVisible?(
                    <AddFeedModal
                        isVisible={this.state.isAddFeedModalVisible}
                        closeModal = {()=>this.setState({isAddFeedModalVisible:false})}
                        addFeedCallBack={this.appendFeed}
                        posterId={this.props.userInfo.id} 
                        posterImage={this.props.userInfo.studentImage}
                        postedBy={2}
                        instituteDetails={this.props.userInfo}
                        setUpdateFun={this.setUpdateEditFeedState} 
                        updateSingleFeed={this.updateSingleFeed}
                        mode="modal"

                    /> 
                ):(null)}
                
            </PageStructure>
        )
    }
}

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        flexDirection: 'column',
        padding:15,
    },
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
                        }
            
})

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth,
        userInfo: state.user.userInfo,
    }
}
export default connect(mapStateToProps)(Feed); 