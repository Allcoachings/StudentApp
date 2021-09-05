import React from 'react';
import { Image, Text, View,StyleSheet,ScrollView,FlatList,TouchableOpacity, Modal, TextInput,ActivityIndicator} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { SliderBox } from 'react-native-image-slider-box';
import {theme, serverBaseUrl, imageProvider} from '../config'
import {fetch_courses_banners } from '../Utils/DataHelper/Course'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
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
        return(
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                titleonheader={"About Course"}      
                nosearchIcon={true}
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
                        <Text style={styles.body}>{this.state.activeCourseDetail.description}</Text>
                    </View>
                </ScrollView>)}
            </PageStructure>
        )
    }
}

const styles = StyleSheet.create({
    head:{
        fontFamily: 'Raleway_700Bold',
        fontSize: 26
    },
        body:{
            fontFamily: 'Raleway_600SemiBold',
            color: theme.greyColor  ,
            marginTop: 10 ,
            fontSize: 15 
        }
})

export default AboutCourse