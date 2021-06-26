import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform,Dimensions} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {storyLine,homeFeaturesData} from '../../FakeDataService/FakeData'
import { theme } from '../config';
import { Feather } from '@expo/vector-icons';
import { AirbnbRating } from 'react-native-ratings';
import { Redirect } from 'react-router';
import CardView from '../Utils/CardView';
const windowWidth = Dimensions.get('window').width;

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
                    {CardView(
                        <Image source={item.image} style={styles.instituteItemImage}/> 
                        ,{width:'100%',borderRadius:15}
                    )}
                    
                </View>
                <View style={styles.instituteMetaContainer}>
                    <View style={{display:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 2}}>
                        <Text style={styles.instituteTitle} numberOfLines={2}>{item.title}</Text>
                    </View>
                    <View style={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{alignSelf:'flex-start', color: theme.greyColor,fontSize:12}}>{item.rating+' • '}</Text> 
                        <AirbnbRating 
                            starContainerStyle={styles.instituteRating} 
                            count={5}
                            reviews={[]} 
                            isDisabled={true}
                            defaultRating={item.rating}
                            size={12}
                            selectedColor={theme.blueColor}
                            showRating={false}
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
                // marginTop:5,
                // borderBottomWidth:0.2

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
                        // color: theme.greyColor,
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
                        width:(windowWidth/3)-20,
                        height:180,
                        marginLeft:10,
                        marginTop:10
                    },
                        instituteItemImage:
                        {
                            width:'100%', 
                            height: 90,
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
                                alignSelf:'flex-start',
                                width:'80%'
                            },
                    bannerItemContainer:
                    {
                        marginBottom: 10,
                        height:160
                    },
                        bannerImage:
                        {
                            width:(windowWidth/1.1)-10,
                            height:150,
                            borderRadius:10,
                            marginLeft:10
                        }


})
export default Home;