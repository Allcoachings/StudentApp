import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {homeFeaturesData} from '../../FakeDataService/FakeData'
import { theme,dataLimit, serverBaseUrl } from '../config';
import { Feather } from '@expo/vector-icons';
import { Rating ,AirbnbRating} from 'react-native-ratings';
import { Redirect } from 'react-router';
import {fetch_coachingByCategory} from '../Utils/DataHelper/Coaching'
class CategoryList extends React.Component {

    state={
        cat_id:this.props.route.params.id,
        offset:0,
        loadingInstitute:true,
        institute:[]
    }

    coachingCallBack=(response) => {
        console.log(response.status)
        if(response.status==200)
        {
            response.json().then(data=>
                {
                    console.log(data);
                    this.setState({institute:data,loadingInstitute:false})
                })
        }
    }
    componentDidMount() {
        fetch_coachingByCategory(this.state.cat_id,this.state.offset,dataLimit,this.coachingCallBack)
    }

    updateComponent=()=>{
        if(this.state.cat_id!=this.props.route.params.id)
        {
            console.log("this.state.cat_id",this.state.cat_id)
            console.log("this.props.route.params.id",this.props.route.params.id)
            this.setState({cat_id:this.props.route.params.id, offset: 0},()=>fetch_coachingByCategory(this.state.cat_id,this.state.offset,dataLimit,this.coachingCallBack))
            
        }
    }

    renderInstituteList=({item})=>{ 
        return (
                <TouchableOpacity style={styles.instituteItemContainer} onPress={()=> this.props.navigation.navigate('Institute') }>
                    <View style={styles.instituteItemImageView}>
                        <Image source={{uri:serverBaseUrl+item.logo}} style={styles.instituteItemImage}/> 
                    </View>
                    <View style={styles.instituteMetaContainer}>
                        <View style={{display:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 2}}>
                            <Text style={styles.instituteTitle} numberOfLines={2}>{item.name}</Text>
                        </View>
                        <View style={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{alignSelf:'flex-start', color: theme.greyColor}}>{item.totalRatingCount>0?item.totalRating/item.totalRatingCount:0}</Text>  
                            <AirbnbRating 
                                starContainerStyle={styles.instituteRating} 
                                count={5}
                                reviews={[]} 
                                isDisabled={true}
                                defaultRating={item.totalRatingCount>0?(item.totalRating/item.totalRatingCount):(0)}
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

    render() {
        this.updateComponent()
        return(
            <PageStructure
                iconName={"arrow-left"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                titleonheader={this.props.route.params.type}
            >
            <ScrollView>
            <View style={styles.container}>
                {/* <View style={styles.headerView}>
                    <Text style={styles.headText}>UPSC Coaching</Text>
                </View> */}

                <FlatList 
                    data={this.state.institute}  
                    showsVerticalScrollIndicator={false} 
                    renderItem={this.renderInstituteList}
                    numColumns={3}
                    keyExtractor={item => item.id}
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
                    width:102,
                    height:180,
                    marginLeft:10,
                    marginTop:10
                },
                    instituteItemImage:
                    {
                        width:102,
                        height:100,
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
                            
                            fontSize:10
                        },
                        instituteRating:
                        {
                            alignSelf:'flex-start'
                        },


})

export default CategoryList;