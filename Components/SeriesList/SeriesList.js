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

class SeriesList extends React.Component {
    state = {

    }

    renderBannerList=({item})=>
    {
        return(
            <TouchableOpacity style={styles.bannerItemContainer}>
                    <Image source={item.image} style={styles.bannerImage}/>
            </TouchableOpacity  >
        )
    }

    renderList=({item})=>{
        return( 
             CardView(
                     <View style={styles.list}>
                         <View style={styles.topRow}>
                            <Text style={styles.queText}>{item.questions}</Text>
                            <Text style={styles.timeText}>{item.time}</Text>
                         </View>
                         <View style={styles.bottomRow}>
                             <Text style={styles.titleText}>{item.title}</Text>
                             <View style={styles.btnView}>
                                 <Feather name="play" size={12} style={{color: theme.primaryColor, marginRight: 3}}/>
                                 <Text style={styles.btnText}>Start</Text>
                             </View>
                         </View>
                     </View>,{margin: 10, borderWidth: 1, borderRadius: 10, borderColor: theme.labelOrInactiveColor}
             )
         )
     }

    render(){
        return(
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                catInHeader={true}
            >
               <ScrollView>
                    <View style={styles.main}>
                        <View style={styles.headTitleView}>
                            <Text style={styles.title}>UPSC CSE</Text>
                            <Feather name="share" size={16}/>
                        </View>
                        <View style={styles.rowContainer}>
                            <FlatList 
                                data={this.props.route.params.banner} 
                                renderItem={this.renderBannerList} 
                                keyExtractor={(item)=>item.id}
                                horizontal={true} 
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                        <View style={styles.container}>
                            <FlatList 
                                data={this.props.route.params.list} 
                                renderItem={this.renderList}
                                keyExtractor={(item)=>item.id} 
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>
                </ScrollView> 
            </PageStructure>
        )
    }
}

const styles = StyleSheet.create({
    main:
    {
        flex: 1,
        flexDirection: 'column'
    },
        headTitleView:
        {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10
        },
            title:
            {
                fontSize: 20, 
                fontWeight: '700'
            },
        rowContainer: 
        {
            marginBottom: 10,
            marginTop: 10
        },
            bannerItemContainer:
            {
                height:140,
            },
                bannerImage:
                {
                    width:300,
                    height:140,
                    borderRadius:10,
                    marginRight:10,
                },
        container:
        {

        },
            list:
            {
                flex: 1,
                flexDirection: 'column',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
            },
                topRow:
                {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                },
                    queText:
                    {
                        fontSize: 16,
                        color: theme.greyColor
                    },
                    timeText:
                    { 
                        fontSize: 16,
                        color: theme.greyColor
                    },
            bottomRow:
            {
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
                alignItems: 'center'
            },
                titleText:
                {
                    fontSize: 18,
                    color: theme.secondaryColor
                },
                btnView:
                {
                    flexDirection: 'row',
                    backgroundColor: theme.accentColor,
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 2,
                    paddingBottom: 2,
                    borderRadius: 3,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                },
                    btnText:
                    {
                        fontSize: 14,
                        color: theme.primaryColor   
                    }

})

export default SeriesList;