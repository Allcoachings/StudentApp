import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {insTestSeries} from '../../FakeDataService/FakeData'
import { theme, dataLimit, serverBaseUrl } from '../config';
import { Feather } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Redirect } from 'react-router';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import {seriesList} from '../Utils/DataHelper/TestSeries'
import Instructions from './Instructions'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height;

class SeriesList extends React.Component {
    state = {
        id: this.props.route.params.id,
        offset:0,
        seriesList: [],
        modalVisible: false,
        item:{},
        banner:[
            {
                id: '1',
                image: { uri: 'https://picsum.photos/200/300' },
                clickHandler: () => { },

            },
            {
                id: '3',
                image: { uri: 'https://picsum.photos/200/300' },
                clickHandler: () => { },
            },
            {
                id: '4',
                image: { uri: 'https://picsum.photos/200/300' },
                clickHandler: () => { },
            },
            {
                id: '5',
                image: { uri: 'https://picsum.photos/200/300' },
                clickHandler: () => { },
            },
            {
                id: '6',
                image: { uri: 'https://picsum.photos/200/300' },
                clickHandler: () => { },
            },
        ],
    }

    componentDidMount(){
        seriesList(this.state.id,this.state.offset,dataLimit,this.seriesListCallBack)
    }

    seriesListCallBack=(response)=>{
        if(response.status==200)
        {
            console.log("success series list")
            response.json().then(data=>
            {
                this.setState({seriesList: data})
            })
        }
        else
        {
            console.log("something went wrong")
        }
    }

    closeModal = () =>{
        this.setState({modalVisible: false})
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
                            <Text style={styles.queText}>{item.questionCount} Questions</Text>
                            <Text style={styles.timeText}>{item.timeDuration} Minutes</Text>
                         </View>
                         <View style={styles.bottomRow}>
                             <Text style={styles.titleText}>{item.title}</Text>
                             <TouchableOpacity style={styles.btnView} onPress={()=>this.setState({modalVisible: true, item: item})}>
                                 <Feather name="play" size={12} style={{color: theme.primaryColor, marginRight: 3}}/>
                                 <Text style={styles.btnText}>Start</Text>
                             </TouchableOpacity>
                         </View>
                     </View>,{margin: 10, borderWidth: 1, borderRadius: 10, borderColor: theme.labelOrInactiveColor}
             )
         )
     }

    render(){
        return(
            <PageStructure
                iconName={"arrow-left"}
                btnHandler={() => {this.props.navigation.goBack()}}
                catInHeader={false}
                titleonheader={this.props.route.params.catName}
                notificationreplaceshare={"share-2"}
            >
               <ScrollView>
                    <View style={styles.main}>
                        {/* <View style={styles.headTitleView}>
                            <Text></Text>
                            <Text style={styles.title}>UPSC CSE</Text>
                            <Feather name="share-2" size={18} style={{marginRight: 10}}/>
                        </View> */}
                        <View 
                            style={{justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                            <Image 
                                source={{uri: serverBaseUrl+this.props.route.params.image}} 
                                style={{height: 60, width: 60, borderRadius: 30}}
                            />
                        </View>
                        <View style={styles.rowContainer}>
                            <FlatList 
                                data={this.state.banner} 
                                renderItem={this.renderBannerList} 
                                keyExtractor={(item)=>item.id}
                                horizontal={true} 
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                        <View style={styles.container}>
                            <FlatList 
                                data={this.state.seriesList} 
                                renderItem={this.renderList}
                                keyExtractor={(item)=>item.id} 
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>
                    
                </ScrollView>
                
                {this.state.modalVisible?(
                    <Instructions 
                        closeModal={this.closeModal} 
                        modalVisible={this.state.modalVisible}
                        item={this.state.item}
                        navigation={this.props.navigation}
                    />
                    
                ):(
                    null
                )}

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
            justifyContent: 'space-between',
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
                    flex:0.95,
                    fontSize: 18,
                    color: theme.secondaryColor
                },
                btnView:
                {
                    // borderWidth:1,
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