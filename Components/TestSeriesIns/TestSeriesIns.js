import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {insTestSeries} from '../../FakeDataService/FakeData'
import { theme } from '../config';
import { Feather } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Redirect } from 'react-router';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
class TestSeriesIns extends React.Component {
    state = {  }

    singleItem=({item})=>{
       return(
            CardView(
                    <View  style={styles.singleItem}>
                        <View style={styles.imageView}>
                            <Image source={item.image} style={styles.itemImage}/>
                        </View>
                        <View style={styles.titleView}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </View>
                        <View style={styles.countView}>
                            <Text style={styles.itemCount}>{item.count}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("ViewInsTestSeriesList", {banner: item.banner, series: item.list})} style={styles.btnView}>
                            <Text style={styles.cardButton}>{item.text}</Text>
                        </TouchableOpacity>
                    </View>, { margin:10,width:((this.props.screenWidth/3.5)) }
            )
       )
    }

    singleRow=({item})=>
    {
        return(
        <View style={styles.singleRow}>
            <View style={styles.rowHeader}>
               <Text style={styles.rowHeadText}>{item.name}</Text> 
            </View>
            <View style={styles.rowBody}>
                <FlatList 
                    data={item.data} 
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
                catInHeader={true}
            >
                <ScrollView>
                    <View style={styles.container}> 
                        <FlatList 
                            data={insTestSeries} 
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
            marginBottom:'10%'
        },
            rowHeader:
            {
                display:'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                marginLeft: 10,
                borderTopWidth:0.2,
            },
                rowHeadText:
                {
                    
                    fontSize: 16, 
                    fontWeight:'700'
                },
            rowBody:
            {
                marginTop: '5%'
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
                        borderWidth: 1
                    } ,
                        itemImage:
                        {
                            height: 45,
                            width:60, 
                            borderColor: theme.secondaryColor
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
                            padding: 4, 
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