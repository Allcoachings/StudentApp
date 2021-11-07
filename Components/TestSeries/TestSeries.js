import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {testSeriesData, storyLine} from '../../FakeDataService/FakeData'
import { theme, Assets } from '../config';
import { EvilIcons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Redirect } from 'react-router';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
class TestSeries extends React.Component {
    state = {  }

    singleItem=({item})=>{
       return(
            CardView(
                    <TouchableOpacity onPress={null} style={styles.singleItem}>
                        <View style={styles.imageView}>
                            <Image source={item.image} style={styles.itemImage}/>
                        </View>
                        <View style={styles.titleView}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </View>
                        <View style={styles.countView}>
                            <Text style={styles.itemCount}>{item.count}</Text>
                        </View>
                        <View style={styles.btnView}>
                            <Text style={styles.cardButton}>{item.text}</Text>
                        </View>
                    </TouchableOpacity>, { margin:10,width:((this.props.screenWidth/3.5)) }
            )
       )
    }

    singleRow=({item})=>
    {
        return(
        <View style={styles.singleRow}>
            <View style={styles.rowHeader}>
                <EvilIcons name="star" size={16}/>
               <Text style={styles.rowHeadText}>{item.title}</Text> 
            </View>
            <View style={styles.rowBody}>
                <FlatList 
                    data={item.data} 
                    renderItem={this.singleItem}        
                    keyExtractor={(item)=>item.id}
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                />
            </View>
        </View>)
    }
    render() {
        // console.log("hehe this")
        return (
            <PageStructure
                iconName={"chevron-left"}
                btnHandler={() => {this.props.navigation.goBack()}}
                catInHeader={true}
            >
                <View style={styles.container}> 
                    <FlatList 
                        data={testSeriesData} 
                        renderItem={this.singleRow} 
                        keyExtractor={(item)=>item.id}
                        showsVerticalScrollIndicator={false} 
                        ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                    />
                </View> 
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
            marginTop:'10%'
        },
            rowHeader:
            {
                display:'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                marginLeft: 10,
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
                            color: theme.labelOrInactiveColor
                        },
                    countView:
                    {

                    },
                        itemCount: 
                        {
                            fontSize: 10,
                            padding: 4, 
                            color: theme.labelOrInactiveColor
                        },
                    btnView:
                    {
                        borderWidth: 1, 
                        borderColor: theme.labelOrInactiveColor, 
                        borderRadius: 2, 
                        margin: 3
                    },
                        cardButton:
                        {
                            fontSize: 8, padding: 5, marginLeft: 3, marginRight: 3, color: theme.labelOrInactiveColor
                        }


})

const mapStateToProps = (state)=>{
    return {
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(TestSeries);