import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { theme } from '../config';
import { Feather } from '@expo/vector-icons';
import {connect } from 'react-redux'
import {MockTest} from '../../FakeDataService/FakeData'
class ResultAnalysis extends React.Component {
    state={
    }

    render() {
        return(
            <ScrollView>
                <View style={styles.container}>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        flexDirection: 'column',
        padding:10,
        marginTop: '10%'
    },
})

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(ResultAnalysis); 