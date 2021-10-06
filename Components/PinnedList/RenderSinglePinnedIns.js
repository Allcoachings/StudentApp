import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, TouchableWithoutFeedback, Modal} from 'react-native';
// import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth, dataLimit,serverBaseUrl, Assets, imageProvider} from '../config'
import { Feather } from '@expo/vector-icons';
import {connect } from 'react-redux'
import {pinnedInstituteList} from '../Utils/DataHelper/Subscription'
import CardView from '../Utils/CardView'
import { AirbnbRating } from 'react-native-ratings';
import { unPinInstitute }  from '../Utils/DataHelper/Subscription'

class RenderSinglePinnedIns extends React.Component {
    
    state = {
        list: [],
        offset: 0,
        showLoadMore: true,
        isPinnedListLoading: true,
        loadingFooter: false,
        hide: false,
        modalVisible: false,
    }

    unPinCallBack=(response)=>{
        console.log(response.status, "check")
        if(response.status==200)
        {
            this.setState({hide: true})
        }
    }

    redirectTo =(id)=>
    {
        this.props.navigation.navigate('Institute',{insId:id})
    }

    render() {
        const {item } = this.props
        console.log("itemid", item.institute.id)
        return(
            <View style={[this.state.hide?({display: 'none'}):(null)]}>
                <TouchableOpacity style={{marginBottom: '5%'}} onPress={()=>this.redirectTo(item.institute.id)}>
                    <View style={styles.instituteheader}>
                        {CardView(
                            <Image source={{uri:imageProvider(item.institute.logo)}} style={styles.instituteheaderLogo}/>
                            ,[styles.logoCard,this.props.screenWidth<=screenMobileWidth?({width:"30%",height:90,borderRadius:15}):({width:150,height:100})])
                        } 
                        <View style={styles.instituteheaderMeta}>
                            <TouchableWithoutFeedback style={{display: 'flex', flexDirection: 'row'}} >
                                <Text style={styles.instituteheaderText}>{item.institute.name}</Text>
                            </TouchableWithoutFeedback>
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
                        <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                        <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <View style = {styles.container}>
                    <Modal animationType = {"fade"} 
                            transparent = {true}
                            visible = {this.state.modalVisible}
                            onRequestClose = {() => { console.log("Modal has been closed.") } }>
                        <TouchableOpacity  onPress={() =>this.setState({modalVisible:false})} style={{width:'100%',height:'100%'}}>
                            <TouchableOpacity style={{alignSelf: 'flex-end', width: 200, height: 120, padding: 6, backgroundColor: 'white',postion: 'absolute',top:20}}>
                                {CardView(
                                    <>
                                            <TouchableOpacity onPress={()=>unPinInstitute(item.institute.id, this.unPinCallBack)} style={{flexDirection: 'row',margin:5}}>
                                                <Feather name="share" size={20}/>
                                                <Text style={{marginLeft:5}}>UnPin</Text>
                                            </TouchableOpacity>
                                    </>,
                                    {width:'100%',height:'40%'}
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
export default RenderSinglePinnedIns