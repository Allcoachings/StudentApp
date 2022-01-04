import React from 'react';
import { Text,View,StyleSheet,Dimensions,TouchableOpacity,FlatList,BackHandler, Image,Platform, ScrollView, TouchableWithoutFeedback} from 'react-native';
import { theme, Assets, appLogo } from '../config';
import { EvilIcons } from '@expo/vector-icons';
import CardView from '../Utils/CardView';
const width = Dimensions.get('window').width
let backhandler;
class LeadersBoard extends React.Component {
    state={}

    renderTopLeader=()=>{
        return(
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 22, fontFamily: 'Raleway_700Bold'}}>2nd</Text>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{borderRadius: 50, borderWidth: 1}}>
                    <Image source={appLogo} style={{height: 50, width: 50}}/>
                    </View>
                    <Text>Amit Kumar</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{fontSize: 12, fontFamily: 'Raleway_400Regular'}}>Score: </Text>
                        <Text style={{fontSize: 12, fontFamily: 'Raleway_600SemiBold'}}>100</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderOtherLeaders=()=>{
        return(
            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <View style={{borderRadius: 50, borderWidth: 1, marginRight: 5}}>
                        <Image source={appLogo} style={{height: 26, width: 26}}/>
                    </View>
                    <Text style={{fontSize: 16, fontFamily: 'Raleway_700Bold'}}>Amit Kumar</Text>
                </View>
                <Text style={{fontSize: 14, fontFamily: 'Raleway_700Bold'}}>Score 44</Text>
                <Text style={{fontSize: 14, fontFamily: 'Raleway_700Bold'}}>#4</Text>
            </View>
        )
    }

    render() {
        return(
            <View style={{marginVertical: 15, flexDirection: 'column'}}>
                <View style={{marginLeft: 10, flexDirection: 'row'}}>
                    <Image source={appLogo} style={{height: 30, width: 30}}/>
                    <Text style={{fontSize: 22, fontFamily: 'Raleway_700Bold', marginLeft: 10}}>Leader Board</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 15}}>
                    {this.renderTopLeader()}
                    {this.renderTopLeader()}
                    {this.renderTopLeader()}
                </View>
                {this.renderOtherLeaders()}
                {this.renderOtherLeaders()}
                {this.renderOtherLeaders()}
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10}}>
                    <TouchableOpacity style={{backgroundColor: theme.violetColor, paddingVertical: 3, paddingHorizontal:6, borderRadius: 5}}>
                        <Text style={{color: theme.primaryColor}}>See All</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default LeadersBoard