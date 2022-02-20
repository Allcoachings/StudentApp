import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform,Dimensions, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {homeFeaturesData} from '../../FakeDataService/FakeData'
import { theme,dataLimit, serverBaseUrl, Assets, imageProvider } from '../config';
import { EvilIcons } from '@expo/vector-icons';
import { Rating ,AirbnbRating} from 'react-native-ratings';
import { Redirect } from 'react-router';
import {fetch_coachingByCategory, fetch_coachingByCategoryAndStatus} from '../Utils/DataHelper/Coaching'
import {SearchInstituteByCategory} from '../Utils/DataHelper/Search'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
const windowWidth = Dimensions.get('window').width;
class CategoryList extends React.Component {

    state={
        cat_id:this.props.route.params.id,
        offset:0,
        loadingInstitute:true,
        institute:[]
    }

    coachingCallBack=(response) => {
        if(response.status==200)
        {
            response.json().then(data=>
            {
                this.setState({institute:data,loadingInstitute:false})
            })
        }
    }
    componentDidMount() {
        fetch_coachingByCategoryAndStatus(this.state.cat_id,1,this.state.offset,dataLimit,this.coachingCallBack)
    }

    updateComponent=()=>{
        if(this.state.cat_id!=this.props.route.params.id)
        {
            this.setState({cat_id:this.props.route.params.id, offset: 0},()=>fetch_coachingByCategoryAndStatus(this.state.cat_id,1,this.state.offset,dataLimit,this.coachingCallBack))
        }
    }

    renderInstituteList=({item})=>{ 
        return (
                <TouchableOpacity style={styles.instituteItemContainer} onPress={()=> this.props.navigation.navigate('Institute',{insId:item.id}) }>
                    <View style={styles.instituteItemImageView}>
                        <Image source={{uri: imageProvider(item.logo)}} style={styles.instituteItemImage}/> 
                    </View>
                    <View style={styles.instituteMetaContainer}>
                        <View style={{display:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 2}}>
                            <Text style={styles.instituteTitle} numberOfLines={2}>{item.name}</Text>
                        </View>
                        <View style={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{alignSelf:'flex-start', color: theme.greyColor}}>{item.totalRatingCount>0?(item.totalRating/item.totalRatingCount).toFixed(1):0}</Text>  
                            <AirbnbRating 
                                starContainerStyle={styles.instituteRating} 
                                count={5}
                                reviews={[]} 
                                isDisabled={true}
                                defaultRating={item.totalRatingCount>0?((item.totalRating/item.totalRatingCount).toFixed(1)):(0)}
                                size={12}
                                selectedColor={theme.blueColor}
                                showRating={false}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
        )
    }

    renderMain=({item})=>{
        return(
                
                <View style={styles.rowContainer}>
                    <View style={styles.rowBody}>
                        <FlatList 
                            data={item} 
                            renderItem={this.renderInstituteList} 
                            numColumns={3}
                            keyExtractor={(item) => item.id}
                        />
                    </View> 
                </View>
            
        )
    }

    search=(offset, search, callback)=>{
        SearchInstituteByCategory(search, this.state.cat_id, offset, dataLimit, callback)
    }

    render() {
        this.updateComponent()
        return(
            <PageStructure
                iconName={"arrow-left"}
                btnHandler={() => {this.props.navigation.goBack()}}
                titleonheader={this.props.route.params.type}
                searchFun={this.search}
                singleItem={this.renderMain} 
                nosearchIcon={true} 
                noNotificationIcon={true}
                navigation={this.props.navigation}
            >
            <ScrollView>
            <View style={styles.container}>
                {this.state.loadingInstitute?(
                    <CustomActivtiyIndicator mode="skimmer"/>
                ):(
                    <FlatList 
                    data={this.state.institute}  
                    showsVerticalScrollIndicator={false} 
                    renderItem={this.renderInstituteList}
                    numColumns={3}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
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
    },
        headerView:
        {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10
        },
            headText:
            {
                fontSize: 18,
                fontWeight: 'bold'
            },
        rowContainer:
        {
            marginTop:10
        },
            rowBody:
            {
                flex:0.1 
            },
                instituteItemContainer:
                {
                    flexDirection:'column',
                    width:(windowWidth/3)-20,
                    height:180,
                    marginLeft:10,
                    marginTop:10
                },
                    instituteItemImage:
                    {
                        width:'100%',
                        height:90,
                        borderRadius:15
                    },
                    instituteMetaContainer:
                    {
                        flexDirection:'column',
                        flexWrap:'wrap'
                    },
                        instituteTitle:
                        {
                            flexWrap:'wrap',
                                width:'100%', 
                                fontSize:12,
                                height:30
                        },
                        instituteRating:
                        {
                            alignSelf:'flex-start'
                        },


})

export default CategoryList;