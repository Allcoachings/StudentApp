import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView,ActivityIndicator} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { theme,dataLimit } from '../config';
import { Feather } from '@expo/vector-icons';
import { feedData } from '../../FakeDataService/FakeData' 
import {connect } from 'react-redux'
import CardView from '../Utils/CardView';
import {fetch_feed_all,fetch_feed_by_category} from '../Utils/DataHelper/Feed'
import FeedText from '../Feed/FeedText';
import FeedImage from '../Feed/FeedImage';
import FeedPoll from '../Feed/FeedPoll';

class Feed extends React.Component {
    state={
        offset:0,
        loadingData:true,
    }

    handleFeedCallBack=(response)=>
    {
        console.log(response.status)
            if(response.status==200){
                response.json().then(data=>{
                        console.log(data)

                        this.setState({feeds:data,loadingData:false})
                })
            }else
            {
                this.setState({loadingData:false})
            }
    }

    componentDidMount()
    {
        fetch_feed_all(this.state.offset,dataLimit,this.handleFeedCallBack);
    }

    header=() => {
        return(
            <View style={styles.headView}>
                <Feather name="chevron-left" size={30} />
                <Text style={styles.headText}>Feed</Text>
            </View>
        )
    }

    toggleCatMode=(mode,item)=>
    {
        switch(mode)
        {
            case true:
                this.setState({offset:0,loadingData:true,},()=>
                {
                    fetch_feed_by_category(item.name,this.state.offset,dataLimit,this.handleFeedCallBack)
                })
                break;
            case false:
            break;
        }
        
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

    render() {
        return(
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                catOnpress={this.toggleCatMode}
                scrollMode={'scroll'}
                catInHeader={true}
                catType="feed"
            >
                <ScrollView>
                    <View style={styles.container}>

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
                </ScrollView>
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
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(Feed); 