import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Modal} from 'react-native';
// import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth, dataLimit,serverBaseUrl} from '../config'
import { Feather } from '@expo/vector-icons';
import {connect } from 'react-redux'
import {subscriptionNew} from '../../FakeDataService/FakeData'
import CardView from '../Utils/CardView'
import { AirbnbRating } from 'react-native-ratings';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { checkSubscription, subscribe, unsubscribe }  from '../Utils/DataHelper/Subscription'

class RenderSingleSubsInstitute extends React.Component {
    
    state = {
        subscription: [],
        offset: 0,
        modalVisible: false,
        instituteId: this.props.item.id,
        subscribe: true,
        studentId: this.props.userInfo.id,
        hide: false,

    }

    componentDidMount(){
        // checkSubscription(this.state.studentId,this.state.instituteId,this.checkSubscriptionCallback)
    }

    // checkSubscriptionCallback=(response)=>{
    //     if(response.status==200)
    //     {
    //         response.json().then(data=>
    //         {
    //             this.setState({subscribe: data})            
    //         })
    //     }
    //     else
    //     {
    //         console.log("something went wrong")
    //     }
    // }

    
    unsubscribeCallback=(response)=>{
        if(response.status==200)
        {
            this.setState({subscribe: false, hide: true})
        }
    }

    // subscribeCallback=(response)=>{
    //     if(response.status==201)
    //     {
    //         this.setState({subscribe: true})
    //     }
    // }

    render() {
        return(
            <View style={[this.state.hide?({display: 'none'}):(null)]}>
                <View style={{marginBottom: '5%'}}>
                    <View style={styles.instituteheader}>
                        {CardView(
                            <Image source={{uri:serverBaseUrl+this.props.item.logo}} style={styles.instituteheaderLogo}/>
                            ,[styles.logoCard,this.props.screenWidth<=screenMobileWidth?({width:"30%",height:120,borderRadius:15}):({width:200,height:150})])
                        } 
                        <View style={styles.instituteheaderMeta}>
                            <View style={{display: 'flex', flexDirection: 'row'}}>
                                <Text style={styles.instituteheaderText}>{this.props.item.name}</Text>
                            </View>
                            <Text style={styles.instituteDirector}>{this.props.item.directorName}</Text>
                            <View style={styles.instituteRatingView}>
                                <AirbnbRating 
                                    starContainerStyle={styles.instituteRating} 
                                    count={5}
                                    reviews={[]} 
                                    isDisabled={true}
                                    defaultRating={this.props.item.totalRatingCount>0?(this.props.item.totalRating/this.props.item.totalRatingCount):(0)}
                                    size={12}
                                    selectedColor={theme.blueColor}
                                    showRating={false}
                                />
                                
                                <Text style={styles.voteCount}>{this.props.item.totalRatingCount>0?(this.props.item.totalRating/this.props.item.totalRatingCount):(0)}</Text>
                            </View>
                            <View style={styles.followerView}>
                                <Text style={styles.follower}>{this.props.item.followersCount} Followers</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=>{this.setState({modalVisible:true})}}>
                            <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {styles.container}>
                    <Modal animationType = {"fade"} 
                            transparent = {true}
                            visible = {this.state.modalVisible}
                            onRequestClose = {() => { console.log("Modal has been closed.") } }>
                        <TouchableOpacity  onPress={() =>this.setState({modalVisible:false})} style={{width:'100%',height:'100%'}}>
                            <TouchableOpacity style={{alignSelf: 'flex-end', width: 200, height: 120, padding: 6, backgroundColor: 'white',postion: 'absolute',top:10}}>
                                {CardView(
                                    <>
                                        {/* {this.state.subscribe?( */}
                                            <TouchableOpacity onPress={() =>unsubscribe(this.state.studentId,this.state.instituteId,this.unsubscribeCallback)} style={{flexDirection: 'row',margin:5}}>
                                                <Feather name="share" size={20}/>
                                                <Text style={{marginLeft:5}}>Unfollow</Text>
                                            </TouchableOpacity>
                                        {/* // ):( */}
                                        {/* <TouchableOpacity onPress={() =>subscribe(this.state.studentId,this.state.instituteId,this.subscribeCallback)} style={{flexDirection: 'row',margin:5}}>
                                            <Feather name="share" size={20}/>
                                            <Text style={{marginLeft:5}}>Follow</Text>
                                        </TouchableOpacity>)} */}
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
                </View> 

            </View>  
        )
    }
}

const styles = StyleSheet.create({
    
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
export default connect(mapStateToProps)(RenderSingleSubsInstitute); 