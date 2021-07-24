import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image, Platform, ScrollView, Modal, ActivityIndicator, TextInput} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
// import {connect} from 'react-redux'
import { theme,dataLimit,screenMobileWidth,serverBaseUrl,documentPlaceholder } from '../config';
import { Feather } from '@expo/vector-icons';

import CardView from '../Utils/CardView'
import {connect } from 'react-redux'

// import {Feed} from "../Feed/Feed"

class Profile extends React.Component {

   state={}

    render(){
        // console.log(this.props.userInfo)
        // console.log(this.state.history)
        return (
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                // headerComponent={this.header()}
                // replaceHeader={true}
                titleonheader={"Profile"}
                headerStyle={{ justifyContent: 'center'}}
                replaceBottomTab={false}
                nosearchIcon={true}
                noNotificationIcon={true}
                // notificationreplaceshare={"more-vertical"}
                // rightIconOnPress={()=>this.openModal()} 
            >
                <ScrollView>
                    <View style={styles.container}>
                        <View>
                            <Text style={{ fontSize: 14, color: theme.greyColor}}>First Name*</Text>
                            <TextInput></TextInput>
                            <View style={{borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor}}/>
                        </View>
                    </View>
                </ScrollView>   
            </PageStructure>
            
        )
    }

}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        flexDirection: 'column',
        margin:15
    },
})
        

const  mapStateToProps = (state)=>
{
    return {
        userInfo:state.user.userInfo,
    }
}
export default connect(mapStateToProps)(Profile);