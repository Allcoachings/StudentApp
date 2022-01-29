import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal,TouchableOpacity, Image,Dimensions} from 'react-native'
import { theme,serverBaseUrl,imageProvider, numFormatter, screenMobileWidth } from '../config';
import { EvilIcons, Feather } from '@expo/vector-icons';
import CardView from '../Utils/CardView';
const windowWidth = Dimensions.get('window').width

export default class PurchageListRow extends Component {

    state = {
        isPurchageModalVisible: false,
    }

    openPurchageModal = ()=>{
        this.setState({ isPurchageModalVisible: true});
    }
    closePurchageModal = ()=>{
        this.setState({ isPurchageModalVisible: false});
    }

    render() {
        return (
            <View style={styles.purchage_coursewrapper}>
            <View>
                {CardView(
                    <Image source={{ uri: imageProvider(this.props.item.insImage) }} style={styles.curvedimage}/>,
                    [{width:'90%',height:100,borderRadius:10}]
                )}
                
            </View>
            <View style={{width:'60%',}}>
                {/* <Text style={styles.intitute_name} numberOfLines={2}>{this.props.item.insName}</Text> */}
                <View style={{alignItems: 'center',flexDirection: 'column'}}>
                    <Text style={styles.instituteheaderText}>{this.props.item.insName}</Text>                          
                    <Text style={styles.follower}>{numFormatter(this.props.item.followersCount)}16 Followers</Text>
                </View>
                <View style={styles.purchage_coursebtn}>
                    {/* <TouchableOpacity style={styles.purchagebtn} onPress={()=>this.props.navigation.navigate('Institute',{insId:this.props.item.insId})}>
                        <Text style={styles.purchageText} >{this.props.item.courseName}</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={[styles.courseItemContainer,{backgroundColor:theme.purpleColor, borderColor:theme.darkPurpleColor}]} onPress={()=>this.handleCourseItemClick(item)}> 
                                <Text style={[styles.courseTitle,{color:theme.darkPurpleColor}]}>{this.props.item.courseName}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <TouchableOpacity onPress={()=>this.openPurchageModal()}>
            <Feather name="more-vertical" size={20} color={theme.secondaryColor}  />

            </TouchableOpacity> */}

            <Modal animationType = {"fade"} 
                transparent = {true}
                visible = {this.state.isPurchageModalVisible}
                onRequestClose = {() => { console.log("Modal has been closed.") } }>
            <TouchableOpacity  onPress={() =>this.setState({isPurchageModalVisible:false})} style={{width:'100%',height:'100%'}}>
                <TouchableOpacity style={{alignSelf: 'flex-end', width: 200, height: 120, padding: 6, backgroundColor: 'white',postion: 'absolute',top:250}}>
                    {CardView(
                        <>
                            <View style={{flexDirection: 'row',margin:5}}>
                                <EvilIcons name="share" size={20}/>
                                <Text style={{marginLeft:5}}>Share</Text>
                            </View>
                            <View style={{flexDirection: 'row',margin:5}}>
                                <EvilIcons name="share" size={20}/>
                                <Text style={{marginLeft:5}}>Add to wishlist</Text>
                            </View>
                            <View style={{flexDirection: 'row',margin:5}}>
                                <EvilIcons name="share" size={20}/>
                                <Text style={{marginLeft:5}}>Flag as inappropriate</Text>
                            </View>
                        </>,
                        {width:'100%',height:'100%'}
                    )} 
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>

        </View>
        )
    }
}

const styles = StyleSheet.create({
    purchage_coursewrapper:{
        flexDirection: 'row',
        margin: 10,
        width:windowWidth,
        flexWrap:'wrap',
    },

    curvedimage:{
        height: 90,
        width: 100,
        marginRight: 12,
        borderRadius: 10,
    },

    intitute_name:{
        fontSize: 16,
        color: theme.greyColor,
        marginBottom: 10,
        flex:1, 
        flexWrap: 'wrap',
    },
    purchagebtn:
    {
        backgroundColor: theme.primaryColor,
        borderColor: theme.labelOrInactiveColor,
        borderWidth:1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 50,
        padding:5
    },
    purchageText:
        {
            fontSize: 12,
            color: theme.blueColor,
            fontWeight: 'bold',
            paddingVertical: 2,
            paddingHorizontal: 4,
        },
    courseItemContainer:
    {  
        paddingLeft:12,
        paddingRight:12, 
        marginRight:10,
        paddingVertical: 3.5,
        marginTop:5 , 
        paddingHorizontal:2,
        borderWidth:1, 
        borderColor:theme.primaryColor,
        borderRadius:15,
            alignItems:'center',
            justifyContent: 'center'

    },
        courseTitle:
        {
            fontSize:14, 
            color:theme.greyColor,
            fontFamily: 'Raleway_700Bold',
        },
    instituteheaderText:
    {
        flex:1,
        flexWrap:'wrap', 
        fontFamily: 'Raleway_700Bold',
        fontSize:19,

    },  
    follower:
    {
        color: theme.blueColor, 
        fontWeight: 'bold',
        fontSize: 18
    },


})
