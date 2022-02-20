import React from 'react';
import { Image, Text,Dimensions, View,StyleSheet,ScrollView,FlatList,TouchableOpacity, Modal, TextInput,ActivityIndicator} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { SliderBox } from 'react-native-image-slider-box';
import {theme, serverBaseUrl, imageProvider} from '../config'
import {fetch_courses_banners } from '../Utils/DataHelper/Course'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';

import RenderHTML,{defaultSystemFonts} from 'react-native-render-html';

const width = Dimensions.get('window').width
const systemFonts = ["kruti_dev_010regular", "chanakyaregular","walkman_chanakya_901bold","walkman_chanakya_902bold","kruti_dev_010bold", ...defaultSystemFonts];
class AboutCourse extends React.Component {
    state={
        sliderImg: [],
        id:this.props.route.params.id,
        activeCourseDetail: this.props.route.params.activeCourseDetail,
        loading: true,
    }

    componentDidMount() {
        fetch_courses_banners(this.state.id,this.courseBannerCallback)
    }

    courseBannerCallback=(response)=>
    {
        if(response.status==200)
        {
            response.json().then(data=>
                { 
                    var images = data.map((item, key) => imageProvider(item.bannerImageLink))
                    this.setState({sliderImg: images, loading:false})
                })
        }
    }

    updateComponent=()=>{
        if(this.props.route.params.id!=this.state.id)
        {
            this.setState({id: this.props.route.params.id, activeCourseDetail: this.props.route.params.activeCourseDetail, loading: true},()=>fetch_courses_banners(this.state.id,this.courseBannerCallback))
        }
    }

    render() {
        this.updateComponent()
        console.log(this.state.activeCourseDetail.description)
        return(
            <PageStructure
                iconName="arrow-left"
                btnHandler={() => {this.props.navigation.goBack()}}
                titleonheader={"About Course"}      
                nosearchIcon={true}
                navigation={this.props.navigation}
                noNotificationIcon={true}
            >
                {this.state.loading?(
                    <CustomActivtiyIndicator mode="skimmer"/>
                ):(<ScrollView>
                    <SliderBox images={this.state.sliderImg}  onCurrentImagePressed={index => this.setState({index: index, zoomModal: true})}/>
                    <View style={{marginTop: '6%', marginHorizontal: 10}}>
                        <Text style={styles.head}>{this.state.activeCourseDetail.title}</Text>
                    </View> 
                
                    <View style={{marginHorizontal:10, marginTop: '5%'}}>  
                        <RenderHTML
                            contentWidth={width}
                            systemFonts={systemFonts}
                            defaultTextProps={{style: {fontWeight: 'normal'}}}
                            source={{html:this.state.activeCourseDetail.description}}
                        />
                    </View>
                </ScrollView>)}
            </PageStructure>
        )
    }
}

const styles = StyleSheet.create({
    head:{
        fontFamily: 'Raleway_700Bold',
         
        fontSize: 20
    },
        body:{
            fontFamily: 'Raleway_600SemiBold',
            color: theme.greyColor  ,
            marginTop: 10 ,
            fontSize: 15 
        }
})

export default AboutCourse