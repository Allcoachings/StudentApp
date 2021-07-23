import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {insTestSeries} from '../../FakeDataService/FakeData'
import { theme, dataLimit } from '../config';
import { Feather } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Redirect } from 'react-router';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import { fetch_testSeries_category } from '../Utils/DataHelper/TestSeries'

class TestSeriesIns extends React.Component {
    state = { 
        offset: 0,
        testSeries: [],
        category:''
     }

    componentDidMount() {
        fetch_testSeries_category(this.state.offset, dataLimit, this.testSeriesCallBack)
    }

    testSeriesCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                this.setState({testSeries: data, category: data[0].categoryName})
            })
        }
        else
        {
            console.log("something went wrong")
        }
    }

    singleItem=({item})=>{
        
       return(
            CardView(
                    <View  style={styles.singleItem}>
                        <View style={styles.imageView}>
                            <Image source={{uri: item.image}} style={styles.itemImage}/>
                        </View>
                        <View style={styles.titleView}>
                            <Text style={styles.itemTitle}>{item.name}</Text>
                        </View>
                        <View style={styles.countView}>
                            <Text style={styles.itemCount}>{item.count}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("ViewInsTestSeriesList", {id: item.id, catName: this.state.category})} style={styles.btnView}>
                            <Text style={styles.cardButton}>View Test Series</Text>
                        </TouchableOpacity>
                    </View>, { margin:10,width:((this.props.screenWidth/3.5)),borderWidth:1,borderColor:theme.labelOrInactiveColor,borderRadius:15 }
            )
       )
    }

    singleRow=({item})=>
    {
        return(
        <View style={styles.singleRow}>
            <View style={styles.rowHeader}>
               <Text style={styles.rowHeadText}>{item.categoryName}</Text> 
            </View>
            <View style={styles.rowBody}>
                <FlatList 
                    data={item.subCategories} 
                    renderItem={this.singleItem} 
                    keyExtractor={(item)=>item.id}
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>)
    }
    render() {
        return (
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
            >
                <ScrollView>
                    <View style={styles.container}> 
                        <FlatList 
                            data={this.state.testSeries} 
                            renderItem={this.singleRow} 
                            keyExtractor={(item)=>item.id}
                            showsVerticalScrollIndicator={false} 
                        />
                    </View> 
                </ScrollView>
           </PageStructure>
        );
    }
}
 
const styles = StyleSheet.create({
    container:
    {
        display:'flex', 
        flexDirection: 'column'
    },
        singleRow:
        {
            marginTop:15 ,
            marginBottom:15 ,
            borderBottomWidth: 1, 
            borderBottomColor: theme.labelOrInactiveColor
        },
            rowHeader:
            {
                display:'flex', 
                flexDirection: 'row',  
                marginLeft: 10,
            },
                rowHeadText:
                {
                    
                    fontSize: 16, 
                    fontWeight:'700'
                },
            rowBody:
            {
                marginTop: 10
            },  
                singleItem:
                {
                    padding: 10,
                    display:'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 8
                }, 
                    imageView:
                    {
                        
                    } ,
                        itemImage:
                        {
                            height: 45,
                            width:60, 
                            borderRadius:5
                        },
                    titleView:
                    {

                    }   , 
                        itemTitle:
                        {
                            fontSize: 14, 
                            padding: 2, 
                            fontWeight: '700', 
                            color: theme.secondaryColor
                        },
                    countView:
                    {

                    },
                        itemCount: 
                        {
                            fontSize: 10,
                            // padding: 4, 
                            color: theme.secondaryColor
                        },
                    btnView:
                    { 
                        borderRadius: 2, 
                        margin: 3,
                        backgroundColor: theme.accentColor
                    },
                        cardButton:
                        {
                            fontSize: 8, 
                            padding: 5, 
                            marginLeft: 3, 
                            marginRight: 3, 
                            color: theme.primaryColor,
                            flexShrink: 1
                        }


})

const mapStateToProps = (state)=>{
    return {
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(TestSeriesIns);