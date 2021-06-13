import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {homeFeaturesData} from '../../FakeDataService/FakeData'
import { theme } from '../config';
import { Feather } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Redirect } from 'react-router';

class CategoryList extends React.Component {

    state={

    }

    renderInstituteList=({item})=>{
        console.log(item)
        return (
                <TouchableOpacity style={styles.instituteItemContainer} onPress={()=> this.props.navigation.navigate('Institute') }>
                    <View style={styles.instituteItemImageView}>
                        <Image source={item.image} style={styles.instituteItemImage}/> 
                    </View>
                    <View style={styles.instituteMetaContainer}>
                        <View style={{display:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 2}}>
                            <Text style={styles.instituteTitle}>{item.title}</Text>
                        </View>
                        <View style={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{alignSelf:'flex-start', color: theme.greyColor}}>{item.rating}</Text> 
                            <Rating
                                type='star'
                                ratingCount={5}
                                startingValue={item.rating}
                                imageSize={15}  
                                tintColor={theme.appBackgroundColor}
                                style={styles.instituteRating}
                                readOnly={true} 
                            />
                        </View>
                    </View>
                </TouchableOpacity>
        )
    }

    renderMain=({item})=>{
        return(
            item.type=='listing' && this.props.route.params.type==item.title?(
                <View style={styles.rowContainer}>
                    <View style={styles.rowBody}>
                        <FlatList 
                            data={item.data} 
                            renderItem={this.renderInstituteList} 
                            numColumns={3}
                            keyExtractor={(item) => item.id}
                        />
                    </View> 
                </View>
            ):(null)
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.headText}>UPSC Coaching</Text>
                </View>

                <FlatList 
                    data={homeFeaturesData}  
                    showsVerticalScrollIndicator={false} 
                    renderItem={this.renderMain}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        flexDirection: 'column',
        marginTop: '10%'
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
                    width:120,
                    height:180,
                    marginLeft:10,
                    marginTop:10
                },
                    instituteItemImage:
                    {
                        width:120,
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
                            fontSize:12
                        },
                        instituteRating:
                        {
                            alignSelf:'flex-start'
                        },


})

export default CategoryList;