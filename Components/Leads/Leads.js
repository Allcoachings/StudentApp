import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { theme, dataLimit , Assets} from '../config';
import { EvilIcons } from '@expo/vector-icons';
import { feedData } from '../../FakeDataService/FakeData' 
import {connect } from 'react-redux'
import CardView from '../Utils/CardView';
import RenderCourseList from './RenderCourseList';
import { fetchLeads, fetchStudentList, getLeadCount } from '../Utils/DataHelper/Leads'
import { getCourseCount } from '../Utils/DataHelper/Course'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
class Leads extends React.Component {
    state={
        leads:[],
        offset: 0,
        courseList: [],
        leadCount: '',
        courseCount: ''
    }

    courses=({item})=>{
        return(
            <RenderCourseList item={item} fetchListFun={fetchStudentList}/>
        )
    }

    componentDidMount(){
        fetchLeads(this.props.institute.details.id,this.state.offset, dataLimit,this.fetchLeadsCallback)
        getLeadCount(this.props.institute.details.id, this.leadCountCallBack)
        getCourseCount(this.props.institute.details.id, this.courseCountCallBack)
    }

    leadCountCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>{
                this.setState({leadCount: data, loadingCount: false})
            })
        }
        else
        {
            this.setState({loadingCount: false})
        }
    }
    courseCountCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>{
                this.setState({courseCount: data, loadingCount: false})
            })
        }
        else
        {
            this.setState({loadingCount: false})
        }
    }

    fetchLeadsCallback=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                this.setState({leads: data})
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
                iconName={"chevron-left"}
                btnHandler={() => {this.props.navigation.goBack()}}
                titleonheader={"Leads"} 
                nosearchIcon={true}
                noNotificationIcon={true}
            >
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.helloView}>
                            <Text style={styles.helloText}>Hello, {this.props.institute.details.name}</Text>
                        </View>

                        <View style={styles.rowContainer}>
                            <View style={[styles.colContainer, {backgroundColor: theme.redColor+"33"}]}>
                                <Text style={styles.leadText}>Total Leads</Text>
                                <Text style={styles.priceText}>{this.state.leadCount}</Text>
                            </View>
                            <View style={[styles.colContainer, {backgroundColor: theme.yellowColor+"33"}]}>
                                <Text style={styles.leadText}>Total Courses</Text>
                                <Text style={styles.priceText}>{this.state.courseCount}</Text>
                            </View>
                        </View>

                        <View style={styles.courseCol}>
                            <FlatList 
                                data={this.state.leads} 
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
                    fontSize: 20,
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
export default connect(mapStateToProps)(Leads); 