import React from 'react';
import { Text,View,StyleSheet,TouchableWithoutFeedback,FlatList, Image,Platform, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { theme, dataLimit , Assets} from '../config';
import { Feather } from '@expo/vector-icons';
import { feedData } from '../../FakeDataService/FakeData' 
import {connect } from 'react-redux'
import CardView from '../Utils/CardView';
import RenderCourseList from '../Leads/RenderCourseList';
import { fetchRevenueOverview, getLeadCount,fetchStudentList } from '../Utils/DataHelper/Revenue'
import { getCourseCount } from '../Utils/DataHelper/Course'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator'; 
class Revenue extends React.Component {
    state={
        Revenue:[],
        offset: 0,
        courseList: [],
        leadCount: '',
        courseCount: ''
    }
    navigateToCourseRevenue=(item,institute)=>
    {
        console.log(institute)
        this.props.navigation.navigate("courseRevenue",{item,institute})
    }
    courses=({item})=>{
        return(
            
              
                    <RenderCourseList item={item} OnPress={()=>this.navigateToCourseRevenue(item,this.props.institute)}  fetchListFun={fetchStudentList}/>
            
    
        )
    }

    componentDidMount(){
        fetchRevenueOverview(this.props.institute.details.id,this.fetchRevenueOverviewCallback)
        
    }
 
    fetchRevenueOverviewCallback=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                console.log(data);
                this.setState({Revenue: data})
            })
        }
        else
        {
            console.log("something went wrong")
        }
    }

    render() {
        return(
            <PageStructure
                iconName={"arrow-left"}
                btnHandler={() => {this.props.navigation.goBack()}}
                titleonheader={"Revenue"}
            >
                <ScrollView>
                    <View style={styles.container}>
                        {/* {CardView(
                            <View style={styles.headView}>
                                <Feather name="chevron-left" size={28} />
                                <Text style={styles.headText}>Revenue</Text>
                            </View>,{paddingTop: 5,justifyContent: 'center'}
                        )} */}

                        <View style={styles.helloView}>
                            <Text style={styles.helloText}>Hello, {this.props.institute.details.name}</Text>
                        </View>

                        <View style={styles.rowContainer}>
                            <View style={[styles.colContainer, {backgroundColor: theme.redColor+"33"}]}>
                                <Text style={styles.leadText}>Total Revenue</Text>
                                <Text style={styles.priceText}>₹ {this.state.Revenue.total_revenue}</Text>
                            </View>
                            {/* <View style={[styles.colContainer, {backgroundColor: theme.yellowColor+"33"}]}>
                                <Text style={styles.leadText}>Purchased Courses</Text>
                                <Text style={styles.priceText}>{this.state.Revenue.total_purchased_course}</Text>
                            </View> */}
                        </View>

                        <View style={styles.courseCol}>
                            <FlatList 
                                data={this.state.Revenue.salesOverViewDataDtos} 
                                renderItem={this.courses}
                                keyExtractor={(item)=>item.id} 
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}
                                ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                            />
                        </View>
                        
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
        headView:
        {
            flexDirection: 'row',
            // justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10
        },
            headText:
            {
                fontSize: 24,
                fontWeight: 'bold',
            },
        helloView:
        {
            marginTop: '6%'
        },
            helloText: 
            {
                fontSize: 20,
                color: theme.greyColor
            },
        rowContainer:
        {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: '10%'
        },
            colContainer:
            {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
                borderRadius: 5
            },
                leadText:
                {
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: theme.secondaryColor
                },
                priceText:
                {
                    color: theme.greyColor,
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginTop:10
                },
        courseCol:
        {
            marginTop: '10%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
            corsePriceView:
            {
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: theme.blueColor+"0D",
                borderRadius: 5,
                justifyContent: 'space-between',
                padding: 15,
                marginBottom: 10
            },
                courseText:
                {
                    color: theme.blueColor,
                    fontSize: 20
                },
                coursePriceText:
                {
                    fontSize: 20,
                    color: theme.greyColor
                }
        
            
})

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth,
        institute:state.institute
    }
}
export default connect(mapStateToProps)(Revenue); 