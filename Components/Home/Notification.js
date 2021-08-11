import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
// import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth, dataLimit,serverBaseUrl} from '../config'
import { Feather } from '@expo/vector-icons';
import {connect } from 'react-redux'
import CardView from '../Utils/CardView'
import { AirbnbRating } from 'react-native-ratings';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'

class Notification extends React.Component {
    
    state = {
        subscription: [],
        offset: 0,
    }


    singleRow=()=>{
        return(
            
            <View style={{marginBottom: '5%'}}>
                <View style={styles.instituteheader}>
                    {CardView(
                        <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.instituteheaderLogo}/>
                        ,[styles.logoCard,this.props.screenWidth<=screenMobileWidth?({width:"30%",height:80,borderRadius:15}):({width:80,height:80, borderRadius:40})])
                    } 
                    <View style={styles.instituteheaderMeta}>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Text style={styles.instituteheaderText}>Institute Name</Text>
                        </View>
                        <Text style={styles.instituteDirector}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum, eros quis elementum malesuada,</Text>
                    </View>
                </View>
                <View style={{ borderBottomWidth: 1, borderBottomColor:theme.labelOrInactiveColor}}/>
            </View>
            
        )
    }

    render() {
        return(
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                titleonheader={"Notifications"}
                // notificationreplaceshare={"share-2"}
            >
                <ScrollView>
                    <View style={styles.container}>
                        {/* <View style={styles.headView}>
                            <TouchableOpacity onPress={null}>
                                <Feather name="chevron-left" size={26} />
                            </TouchableOpacity>
                            <Text style={styles.headText}>
                                Subscription
                            </Text>
                            <TouchableOpacity onPress={null}>
                                <Feather name="share-2" size={22} />
                            </TouchableOpacity>
                        </View> */}
                        {this.singleRow()}
                        {this.singleRow()}
                        {this.singleRow()}
                        {this.singleRow()}
                        {this.singleRow()}
                        {this.singleRow()}
                        {this.singleRow()}
                        {this.singleRow()}
                        {this.singleRow()}
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
    }
}
export default connect(mapStateToProps)(Notification); 