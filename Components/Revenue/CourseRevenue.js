import React, { useEffect, useState } from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure';
import { theme, dataLimit , Assets} from '../config';
import EmptyList from '../Utils/EmptyList'
import { getCourseRevenueTransaction } from '../Utils/DataHelper/Revenue'
// import {DataTable,Cell,Row,Header,HeaderCell} from "react-native-data-table" ddssd
import { DataTable } from 'react-native-paper';
import moment from 'moment';
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
 
const CourseRevenue = props => {
 const {item,institute} = props.route.params
 const [courseTransaction,setCourseTransaction] = useState( []);
 const [isLoading,setIsLoading] = useState(true);
 const [offset,setOffset] = useState(0);
 

 
 

useEffect(() => {
    setIsLoading(true)
    const transactionCallback = (response) => {
        console.log(response.status);
            if(response.status==200)
            {
                response.json().then(data=>
                    {
                         
                        setCourseTransaction(data)
                        console.log("transaction data",data)
                        setIsLoading(false)
                    })
                
            }
    }
    getCourseRevenueTransaction(item.courseId,offset,dataLimit,transactionCallback)
},[item])

const renderRow=(rowItem)=>
{
        return(
            <Row>
                <Cell>record.code</Cell>
                <Cell>record.name</Cell>
                <Cell>record.name</Cell>  
            </Row>
        )

}
const renderHeader=(rowItem)=>
{
        return(
            <Header style={{backgroundColor: 'white'}}>
                <HeaderCell textStyle={{ color:'#000'}}>record.code</HeaderCell>
                <HeaderCell>record.name</HeaderCell>
                <HeaderCell>record.name</HeaderCell>  
            </Header>
        )

}
    
    return (
    <PageStructure
        iconName={"arrow-left"}
        btnHandler={() => { props.navigation.goBack()}}
        titleonheader={"Course Revenue"}
        nosearchIcon={true}
        noNotificationIcon={true}
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
                        <Text style={styles.helloText}>Hello, {institute.details.name}</Text>
                    </View>

                    <View style={styles.rowContainer}>
                        <View style={[styles.colContainer, {backgroundColor: theme.redColor+"33"}]}>
                            <Text style={styles.leadText}>Total Course Revenue</Text>
                            <Text style={styles.priceText}>₹ {item.totalCourseRevenue}</Text>
                        </View>
                        {/* <View style={[styles.colContainer, {backgroundColor: theme.yellowColor+"33"}]}>
                            <Text style={styles.leadText}>Purchased Courses</Text>
                            <Text style={styles.priceText}>{this.state.Revenue.total_purchased_course}</Text>
                        </View> */}
                    </View>

                    <View style={styles.courseCol}>
                        <Text style={{fontFamily: 'Raleway_600SemiBold',marginVertical:10}}>Transactions Details : </Text>

                        {/* <FlatList 
                            data={this.state.Revenue.salesOverViewDataDtos} 
                            renderItem={this.courses}
                            keyExtractor={(item)=>item.id} 
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                            ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                        /> */}
                        {!isLoading?(
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>  Name</DataTable.Title>
                                <DataTable.Title  >Order Id</DataTable.Title>
                                <DataTable.Title  >Amount</DataTable.Title>
                                <DataTable.Title  >Date</DataTable.Title>
                            </DataTable.Header>


                                {courseTransaction.map((item,index) => {
                                    console.log(item)
                            return(        <DataTable.Row key={index}>
                                            <DataTable.Cell>{item.student.name}</DataTable.Cell>
                                            <DataTable.Cell  >{item.transaction.orderId}</DataTable.Cell>
                                            <DataTable.Cell  >₹{item.transaction.amount}</DataTable.Cell>
                                            <DataTable.Cell  >{moment(item.transaction.purchaseDate).format("MMM Do")}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                            
                        
                        
                            
                            </DataTable>
                        ):(
                            <CustomActivtiyIndicator mode="TransSkimmer"/>
                        )}
                        
                    </View> 
                </View>
                </ScrollView>
    </PageStructure>
    );
  
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
                 fontFamily: 'Raleway_600SemiBold',
            },
        helloView:
        {
            marginTop: '6%'
        },
            helloText: 
            {
                fontSize: 20,
                fontFamily: 'Raleway_600SemiBold',
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
                    fontFamily: 'Raleway_600SemiBold',
                    color: theme.secondaryColor
                },
                priceText:
                {
                    color: theme.greyColor,
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginTop:10
                },
    
       
        
            
})
export default CourseRevenue;