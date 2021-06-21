import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {storyLine,homeFeaturesData} from '../../FakeDataService/FakeData'
import { theme } from '../config';
import { Feather } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Redirect } from 'react-router';

class Home extends React.Component {
    state = {  }

    redirectTo =()=>
    {
        this.props.navigation.navigate('Institute') 
    }

    renderMainContetnRow=({item})=>{

        switch(item.type)
        {
            case 'listing':
                return (
                    <View style={styles.rowContainer}>
                        <View style={styles.rowHeader}>
                            <Text style={styles.rowHeaderTitle}>{item.title}</Text>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate("CategoryList", {type: item.title})}>
                                <Feather name="arrow-right" size={25} color={theme.secondaryColor}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowBody}>
                            <FlatList 
                                data={item.data} 
                                renderItem={this.renderInstituteList} 
                                keyExtractor={(item)=>item.id}
                                horizontal={true} 
                                showsHorizontalScrollIndicator={false}
                            />
                        </View> 
                    </View>
                ) 
            case 'banner':
                return (
                        <View style={styles.rowContainer}>
                            <FlatList 
                            data={item.data} 
                            renderItem={this.renderBannerList} 
                            keyExtractor={(item)=>item.id}
                            horizontal={true} 
                            showsHorizontalScrollIndicator={false}
                            />

                        </View>
                )
        }
        
    }

    renderInstituteList=({item})=>{
        return (
            <TouchableOpacity style={styles.instituteItemContainer} onPress={()=>this.redirectTo()}>
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
    renderBannerList=({item})=>
    {
        return(
            <TouchableOpacity style={styles.bannerItemContainer}>
                    <Image source={item.image} style={styles.bannerImage}/>
            </TouchableOpacity  >
        )
    }
    render() {
        return (
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                catInHeader={true}
                scrollMode={'scroll'}
            >
                <View style={styles.container}> 
                    <View style={styles.mainContent}> 
                        <FlatList 
                        data={homeFeaturesData}  
                        showsVerticalScrollIndicator={false} 
                        renderItem={this.renderMainContetnRow}
                        keyExtractor={item => item.id}/>
                    </View>
                </View>
                
           </PageStructure>
        );
    }
}
 
const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        flexDirection: 'column',
    },
        mainContent:
        {
                flex:1,
                // marginTop:10
        },
            rowContainer:
            {
                marginTop:10
            },
                rowHeader:
                {
                    flex:1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginRight: 10,
                    marginLeft: 10
                },
                    rowHeaderTitle:
                    {
                        fontSize:18,
                        fontWeight:'bold'
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
                    bannerItemContainer:
                    {
                        marginBottom: 10,
                        height:160
                    },
                        bannerImage:
                        {
                            width:300,
                            height:150,
                            borderRadius:10,
                            marginLeft:10
                        }


})
export default Home;