import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal,TouchableOpacity, Image,} from 'react-native'
import { theme } from '../config';
import { Feather } from '@expo/vector-icons';


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
                <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.curvedimage}/>
            </View>
            <View>
                <Text style={styles.intitute_name}>{this.props.institute_name}</Text>
                <View style={styles.purchage_coursebtn}>
                    <TouchableOpacity style={styles.purchagebtn}>
                        <Text style={styles.purchageText} >Purchage Course</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity>
            <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginLeft: 60,}}/>

            </TouchableOpacity>

            

        </View>
        )
    }
}

const styles = StyleSheet.create({
    purchage_coursewrapper:{
        flexDirection: 'row',
        marginTop: 20,
    },

    curvedimage:{
        height: 90,
        width: 100,
        marginRight: 12,
        borderRadius: 10,
    },

    intitute_name:{
        // fontSize: 22,
        color: theme.greyColor,
        marginBottom: 10,
    },
    purchagebtn:
    {
        backgroundColor: theme.accentColor,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 50,
    },
    purchageText:
        {
            fontSize: 12,
            color: theme.primaryColor,
            fontWeight: 'bold',
            paddingVertical: 2,
            paddingHorizontal: 4,
        },

})
