import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Dimensions, Image,Platform, ScrollView,ActivityIndicator} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { theme,dataLimit, Assets, imageProvider } from '../config';
import {EvilIcons, AntDesign, Entypo} from '@expo/vector-icons';
import EmptyList from '../Utils/EmptyList'
import {connect } from 'react-redux'
import CardView from '../Utils/CardView';
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import {singleFeed,fetch_comments, add_comment} from '../Utils/DataHelper/Feed'
import FeedText from './FeedText';
import FeedImage from './FeedImage';
import FeedPoll from './FeedPoll';
import RenderSingleComment from './RenderSingleComment'
import moment from 'moment'
import Toast from 'react-native-simple-toast';
import RenderAddCommentBox from './RenderAddCommentBox'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class RenderSingleFeed extends React.Component {

    state={
        data: {},
        loadingFeed: true,
        commentData: [],
        loadingComments: true,
        comment:'',
        offset: 0
    }

    componentDidMount() {
        singleFeed(this.props.route.params.id, this.fetchCallBack)
        fetch_comments(this.props.route.params.id,this.state.offset,dataLimit,this.commentsCallback)
    }

    fetchCallBack=(response) => {
        if(response.status==200)
        {
            response.json().then(data=>{
                this.setState({data: data, loadingFeed: false})
            })
        }
        else
        {
            console.log(response.status)
        }
    }

    commentsCallback=(response)=>{
        if(response.status==200)
        {
              response.json().then(data=>{
              
                  this.setState({commentData:data,loadingComments:false})
              })
        }
    }

    add=(comment)=>{
        Toast.show("Please Wait...")
        this.setState({comment: comment},()=>
        add_comment(this.state.comment, 2, this.props.feedId, 0, this.props.userInfo.id, this.addCallback))
    }

    addCallback=(response)=>{
        
        if(response.status==201)
        {
                Toast.show("Comment Added Successfully!!")
            var obj={
                commenterObject: {
                    blocked: this.props.userInfo.blocked,
                    email: this.props.userInfo.email,
                    id: this.props.userInfo.id,
                    mobileNumber: this.props.userInfo.mobileNumber,
                    name: this.props.userInfo.name,
                    stateOfResidence: this.props.userInfo.stateOfResidence,
                    studentImage: this.props.userInfo.studentImage,
                    userId: this.props.userInfo.userId,
                },
                feedComments: {
                    comment: this.state.comment,
                    commenter: 2,
                    feedId: this.state.feedId,
                    id: response.headers.map.location,
                    insId: 0,
                    studentId: this.props.userInfo.id
                },
                }
            this.state.commentData.push(obj)
            this.setState({comment: ''})
        }
        else
        {
                Toast.show("Something Went Wrong. Please Try Again Later!!")
                console.log("error", response.status)
        }
    }

    switchType=(tab)=>{
        switch(tab)
        {
            case 1:
                return (
                    <FeedImage item={this.state.data} type={2} navigation={this.props.navigation} mode="single"/>
                )
            case 2:
                return (
                    <FeedPoll item={this.state.data} type={2} navigation={this.props.navigation} mode="single"/>
                )
            case 3:
                return (
                    <FeedText item={this.state.data} type={2} navigation={this.props.navigation} mode="single"/>
                )
        }
    }

    render(){
        return(
            <PageStructure
                iconName="navicon"
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                catOnpress={this.toggleCatMode}
                scrollMode={'scroll'}
                nosearchIcon={true}
                noNotificationIcon={true}
                replaceBottomTab={    <RenderAddCommentBox add={this.add}/>}
            >
                {this.state.loadingFeed?(
                    <CustomActivtiyIndicator mode="skimmer" />
                ):(
                    <View style={{flexDirection: 'column'}}>
                        <View  >
                            {this.switchType(this.state.data.feed.feed.feedType)}
                        </View>
                        <View  >
                            {this.state.loadingComments?(
                                <CustomActivtiyIndicator mode="skimmer"/>
                            ):(
                                <FlatList
                                    data={this.state.commentData}
                                    renderItem={({item}) => <RenderSingleComment item={item} addImage={this.addImage} mode="single"/>}
                                    keyExtractor={(item,index)=>index}
                                    ListFooterComponent={<View style={{height:150}}></View>}
                                    ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                                />
                            )}
                        </View>
                        
                    </View>
                )}
            </PageStructure>
        )
    }
}
const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth,
        userInfo:state.user.userInfo,
        keyboardHeight: state.screen.keyboardHeight
    }
}
export default connect(mapStateToProps)(RenderSingleFeed);