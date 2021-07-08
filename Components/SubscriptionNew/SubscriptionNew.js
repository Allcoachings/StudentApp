import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
// import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {theme,screenMobileWidth} from '../config'
import { Feather } from '@expo/vector-icons';
import {connect } from 'react-redux'
import {subscriptionNew} from '../../FakeDataService/FakeData'
import CardView from '../Utils/CardView'
import { AirbnbRating } from 'react-native-ratings';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'

class SubscriptionNew extends React.Component {
    
    state = {
        
    }

    singleRow=({item})=>{
        return(
            
            <View style={{marginBottom: '5%'}}>
                <View style={styles.instituteheader}>
                    {CardView(
                        <Image source={item.logo} style={styles.instituteheaderLogo}/>
                        ,[styles.logoCard,this.props.screenWidth<=screenMobileWidth?({width:"30%",height:120,borderRadius:15}):({width:200,height:150})])
                    } 
                    <View style={styles.instituteheaderMeta}>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Text style={styles.instituteheaderText}>{item.title}</Text>
                        </View>
                        <Text style={styles.instituteDirector}>{item.directoy_name}</Text>
                        <View style={styles.instituteRatingView}>
                            <Text style={{alignSelf:'flex-start', color: theme.greyColor}}>{item.rating}</Text>
                            {/* <Rating
                                type='star'
                                ratingCount={5}
                                startingValue={item.rating}
                                imageSize={15} 
                                unSelectedColor={'yellow'} 
                                tintColor={theme.appBackgroundColor}
                                style={styles.instituteRating}
                                readOnly={true} 
                            /> */}
                            <AirbnbRating 
                                        starContainerStyle={styles.instituteRating} 
                                        count={5}
                                        reviews={[]} 
                                        isDisabled={true}
                                        defaultRating={item.rating}
                                        size={12}
                                        selectedColor={theme.blueColor}
                                        showRating={false}
                                    />
                            <Text style={styles.voteCount}>{item.count}</Text>
                        </View>
                        <View style={styles.followerView}>
                            <Text style={styles.follower}>{item.follower} Followers</Text>
                        </View>
                    </View>
                    <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                </View>
            </View>
            
        )
    }

    render() {
        return(
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                // titleonheader={"Subscription"}
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
                        <FlatList 
                            data={subscriptionNew} 
                            renderItem={this.singleRow} 
                            keyExtractor={(item)=>item.id}
                            horizontal={false} 
                            showsHorizontalScrollIndicator={false}
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
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(SubscriptionNew); 