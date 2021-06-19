import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'

import { theme } from '../config';
import { Feather } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Redirect } from 'react-router';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import EditModal from './EditModal'

class UserProfile extends React.Component {

    state={
        isModalVisible: false
    }

    closeModal = () => {
        this.setState({ isModalVisible: false});
      }
      openModal = () => {
        this.setState({ isModalVisible: true });
      }

      header=() => {
          return(
              <View style={{display: 'flex', flexDirection: 'row',  alignItems: 'center', padding: 10, width: '100%', justifyContent: 'space-between'}}>
                  <Feather name="chevron-left" size={22} />
                  <Text style={{fontSize: 24, color: theme.secondaryColor, fontWeight: '700'}}>Profile</Text>
                  <TouchableOpacity onPress={()=>this.openModal()}>
                    <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                  </TouchableOpacity>
              </View>
          )
      }

    render(){
        return (
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                headerComponent={this.header()}
                replaceHeader={true}
                headerStyle={{flex:0.123, justifyContent: 'center'}}
                replaceBottomTab={false}
            >
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.userInfoSecView}>
                            <View style={styles.imageView}>
                                <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.image}/>
                            </View>
                            <View style={styles.nameView}>
                                <Text style={styles.name}>Amit Kumar</Text>
                                <Text style={styles.number}>8924969862</Text>
                            </View>
                        </View>
                    </View>      
                </ScrollView>
                {this.state.isModalVisible ? (
                    <EditModal
                        isModalVisible={this.state.isModalVisible}
                        closeModal={this.closeModal}
                    />
                ) : (null)}
            </PageStructure>
            
        )
    }

}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        flexDirection: 'column',
    },
        userInfoSecView:
        {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
            imageView:
            {
                marginRight: 5
            },
                image:
                {
                    height: 100,
                    width: 100,
                    borderRadius: 50
                },
            nameView:
            {
                marginLeft: 5
            },
                name:
                {
                    fontSize: 18,
                    // fontWeight: 'bold',
                    color: theme.secondaryColor
                },
                number:
                {
                    fontSize: 16,
                    // fontWeight: 'bold',
                    color: theme.greyColor
                },
})


export default UserProfile;