import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
// import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth, dataLimit,serverBaseUrl, Assets} from '../config'
import { Feather } from '@expo/vector-icons';
import {connect } from 'react-redux'
import CardView from '../Utils/CardView'
import { AirbnbRating } from 'react-native-ratings';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {fetchNotifications} from '../Utils/DataHelper/Notification'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
class Notification extends React.Component {
    
    state = {
        notifications: [],
        offset: 0,
        showLoadMore: true,
        isNotificationLoading: true,
        loadingFooter: false,
    }

    componentDidMount(){
        this.fetch()
    }

    fetch=() => {
        if(this.props.mode=="student")
        {
            fetchNotifications(this.props.userInfo.id, 2, this.state.offset, dataLimit, this.notificationCallback)
        }
        else
        {
            fetchNotifications(this.props.institute.details.id, 1, this.state.offset, dataLimit, this.notificationCallback)
        }
    }

    notificationCallback=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                if(data.length>0)
                {
                    this.setState({notifications:[...this.state.notifications,...data],isNotificationLoading:false, showLoadMore: true, loadingFooter:false});  
                }
                else
                {
                    this.setState({notifications:this.state.notifications,isNotificationLoading:false, showLoadMore: false, loadingFooter: false}); 
                }                  
            })
        }
    }

    singleRow=({item})=>{
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('webview',{link:item.notification.redirectLinkkkkkkkkkkk,mode:'defaultAppHeader'})}>
                <View style={{marginBottom: '5%'}}>
                    <View style={styles.instituteheader}>
                        {CardView(
                            <Image source={{ uri: serverBaseUrl+item.senderObject.image }} style={styles.instituteheaderLogo}/>
                            ,[styles.logoCard,this.props.screenWidth<=screenMobileWidth?({width:"30%",height:80,borderRadius:15}):({width:80,height:80, borderRadius:40})])
                        } 
                        <View style={styles.instituteheaderMeta}>
                            <View style={{display: 'flex', flexDirection: 'row'}}>
                                <Text style={styles.instituteheaderText}>{item.senderObject.name}</Text>
                            </View>
                            <Text style={styles.instituteDirector}>{item.notification.message}</Text>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor:theme.labelOrInactiveColor}}/>
                </View>
            </TouchableOpacity>
        )
    }

    renderFooter = () => {
        try {
       
          if (this.state.loadingFooter) {
            return <CustomActivtiyIndicator/>;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
    };

    render() {
        return(
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                titleonheader={"Notifications"}
                noNotificationIcon={true}
                nosearchIcon={true}
            >
                <ScrollView>
                    <View style={styles.container}>
                        {this.state.isNotificationLoading?(
                            <CustomActivtiyIndicator mode="skimmer"/>
                        ):(
                            <FlatList 
                            data={this.state.notifications} 
                            renderItem={({item})=>this.singleRow({item})}
                            keyExtractor={(item)=>item.id} 
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                            ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                            onEndReachedThreshold={0.1}
                            refreshing={this.state.refreshing}
                            ListFooterComponent={this.renderFooter}
                            onEndReached={() => 
                            {
                                if(this.state.showLoadMore&&!this.state.loadingFooter)
                                {
                                    this.setState({ refreshing: true,loadingFooter:true,offset:parseInt(this.state.offset)+1},()=>this.fetch())
                                        
                                }
                            
                            }}
                        />)}
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
        padding:10,
    },
        headView:
        {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '5%'
        },
            headText:
            {
                fontSize: 24,
                fontWeight: 'bold'
            },
        instituteheader:
        {
            flexDirection:'row',
            flex:0.2,
            marginBottom: 5
        },
            logoCard:
            { 
                flexWrap:'wrap',
                
            }, 
                instituteheaderLogo:
                {
                    width:"100%",
                    height:"100%",
                    borderRadius:15,
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
                    fontSize:16,
                    fontFamily:'Raleway_700Bold'
                },  
                instituteDirector:
                {
                    color:theme.greyColor,
                    fontSize:12,
                    fontFamily:'Raleway_400Regular',
                },
                instituteRatingView:
                {
                    flex:1,
                    flexDirection:'row',
                    alignItems: 'center'
                    // justifyContent: 'center'    
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
                followerView:
                {
                    backgroundColor: theme.primaryColor,
                    borderColor: theme.labelOrInactiveColor, 
                    borderWidth:1,
                    padding: 5,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                    follower:
                    {
                        color: theme.blueColor, 
                        fontWeight: 'bold',
                        fontSize: 16
                    }

})

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth,
        userInfo:state.user.userInfo,
        institute:state.institute
    }
}
export default connect(mapStateToProps)(Notification); 