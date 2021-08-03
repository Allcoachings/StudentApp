import React from 'react';
import { Image, Text, View,StyleSheet,ScrollView,FlatList,TouchableOpacity, Modal, TextInput,ActivityIndicator} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { SliderBox } from 'react-native-image-slider-box';
import {theme} from '../config'

class AboutCourse extends React.Component {
    state={
        sliderImg: [
            "http://192.168.179.76:8080/files/162721149010620210527_070834.jpg",
            "http://192.168.179.76:8080/files/162721150713620210527_204800.jpg",
            "http://192.168.179.76:8080/files/162721154100120210527_204451.jpg",
            "http://192.168.179.76:8080/files/1627745597792IMG-20210731-WA0019.jpg",
          ]
    }

    render() {
        return(
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                titleonheader={"About Course"}
            >
                <SliderBox images={this.state.sliderImg}  onCurrentImagePressed={index => this.setState({index: index, zoomModal: true})}/>
                <View style={{marginTop: '6%', marginHorizontal: 10}}>
                    <Text style={styles.head}>Course Name</Text>
                </View>
                <ScrollView>
                    <View style={{marginHorizontal:10, marginTop: '5%'}}>
                    <Text style={styles.body}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut metus magna. Integer mollis nulla justo, ac euismod leo bibendum sit amet. Mauris eget lorem eu lorem ornare hendrerit imperdiet eget orci. Maecenas ac orci pharetra, consequat lectus vitae, eleifend tortor. Phasellus semper rutrum arcu, cursus consequat enim iaculis a. Mauris aliquet eget justo eget ultricies. Nullam sed turpis efficitur, facilisis nibh at, egestas eros.</Text>

                    <Text style={styles.body}>In ac ornare quam, vel interdum arcu. In sed feugiat nulla, non pulvinar sem. Ut ac eleifend est. Donec pellentesque fermentum nunc, ac dictum purus aliquam in. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam sed gravida urna, ut aliquam enim. Vestibulum et lorem libero.</Text>

                    <Text style={styles.body}>Proin dui mi, rhoncus at elementum ac, consequat vel sapien. Maecenas varius elit at mattis aliquam. Morbi fringilla ligula nec sem rutrum, non maximus sem varius. Integer fringilla nunc sem. Mauris molestie, mi eu rhoncus vestibulum, nunc ipsum gravida ligula, ut tincidunt augue diam sit amet tellus. Etiam scelerisque diam id blandit hendrerit. Sed iaculis, elit eget pulvinar laoreet, magna arcu congue ipsum, eu sagittis magna est nec turpis. Aliquam erat volutpat. </Text>

                    <Text style={styles.body}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut metus magna. Integer mollis nulla justo, ac euismod leo bibendum sit amet. Mauris eget lorem eu lorem ornare hendrerit imperdiet eget orci. Maecenas ac orci pharetra, consequat lectus vitae, eleifend tortor. Phasellus semper rutrum arcu, cursus consequat enim iaculis a. Mauris aliquet eget justo eget ultricies. Nullam sed turpis efficitur, facilisis nibh at, egestas eros.

                    In ac ornare quam, vel interdum arcu. In sed feugiat nulla, non pulvinar sem. Ut ac eleifend est. Donec pellentesque fermentum nunc, ac dictum purus aliquam in. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam sed gravida urna, ut aliquam enim. Vestibulum et lorem libero.

                    Proin dui mi, rhoncus at elementum ac, consequat vel sapien. Maecenas varius elit at mattis aliquam. Morbi fringilla ligula nec sem rutrum, non maximus sem varius. Integer fringilla nunc sem. Mauris molestie, mi eu rhoncus vestibulum, nunc ipsum gravida ligula, ut tincidunt augue diam sit amet tellus. Etiam scelerisque diam id blandit hendrerit. Sed iaculis, elit eget pulvinar laoreet, magna arcu congue ipsum, eu sagittis magna est nec turpis. Aliquam erat volutpat.</Text>
                </View>
                </ScrollView>
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