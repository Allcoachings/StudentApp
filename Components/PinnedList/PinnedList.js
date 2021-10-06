import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
// import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth, dataLimit,serverBaseUrl, Assets, imageProvider} from '../config'
import { Feather } from '@expo/vector-icons';
import {connect } from 'react-redux'
import {pinnedInstituteList} from '../Utils/DataHelper/Subscription'
import CardView from '../Utils/CardView'
import { AirbnbRating } from 'react-native-ratings';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import RenderSinglePinnedIns from './RenderSinglePinnedIns'
class PinnedList extends React.Component {
    
    state = {
        list: [],
        offset: 0,
        showLoadMore: true,
        isPinnedListLoading: true,
        loadingFooter: false,
    }

    componentDidMount(){
        this.fetch()
    }

    fetch=()=>{
        pinnedInstituteList(this.props.userInfo.id, this.state.offset, dataLimit, this.insListCallback)
    }

    insListCallback=(response)=>{
        console.log("inslist", response.status)
        if(response.status==200)
        {
            response.json().then(data=>
            {
                // this.setState({list:data}); 
                if(data.length>0)
                {
                    this.setState({list:[...this.state.list,...data],isPinnedListLoading:false, showLoadMore: true, loadingFooter:false});  
                }
                else
                {
                    this.setState({list:this.state.list,isPinnedListLoading:false, showLoadMore: false, loadingFooter: false}); 
                }                   
            })
        }
    }

    singleRow=(item)=>{
        console.log(item)
        return(
            
            <View style={{marginBottom: '5%'}}>
                <View style={styles.instituteheader}>
                    {CardView(
                        <Image source={{uri:imageProvider(item.institute.logo)}} style={styles.instituteheaderLogo}/>
                        ,[styles.logoCard,this.props.screenWidth<=screenMobileWidth?({width:"30%",height:90,borderRadius:15}):({width:200,height:150})])
                    } 
                    <View style={styles.instituteheaderMeta}>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Text style={styles.instituteheaderText}>{item.institute.name}</Text>
                        </View>
                        <Text style={styles.instituteDirector}>{item.institute.directorName}</Text>
                        <View style={styles.instituteRatingView}>
                            <AirbnbRating 
                                starContainerStyle={styles.instituteRating} 
                                count={5}
                                reviews={[]} 
                                isDisabled={true}
                                defaultRating={item.institute.totalRatingCount>0?(item.institute.totalRating/item.institute.totalRatingCount):(0)}
                                size={12}
                                selectedColor={theme.blueColor}
                                showRating={false}
                            />

                            <Text style={styles.voteCount}>{item.institute.totalRatingCount>0?(item.institute.totalRating/item.institute.totalRatingCount):(0)}</Text>
                        </View>
                        <View style={styles.followerView}>
                            <Text style={styles.follower}>{item.institute.followersCount} Followers</Text>
                        </View>
                    </View>
                    <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                </View>
            </View>
            
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
                nosearchIcon={true}
                noNotificationIcon={true}
                titleonheader={"Pinned Institutes"}
                
            >
                <ScrollView>
                    <View style={styles.container}>
                        <FlatList 
                            data={this.state.list} 
                            renderItem={({item})=><RenderSinglePinnedIns item={item} navigation={this.props.navigation}/>} 
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
                        />
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
            flex:0.2
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
    }
}
export default connect(mapStateToProps)(PinnedList); 