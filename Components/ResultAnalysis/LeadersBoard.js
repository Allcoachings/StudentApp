import React from 'react';
import { Text,View,StyleSheet,Dimensions,TouchableOpacity,FlatList,BackHandler, Image,Platform, ScrollView, TouchableWithoutFeedback} from 'react-native';
import { theme, Assets, appLogo } from '../config';
import { EvilIcons } from '@expo/vector-icons';
import CardView from '../Utils/CardView';
const width = Dimensions.get('window').width
let backhandler;
class LeadersBoard extends React.Component {
    state={}

    renderTopLeader=(item)=>{
        return(
            <View style={{flexDirection: 'row',margin:5}}>
                <Text style={{fontSize: 22, fontFamily: 'Raleway_700Bold'}}>{item.rank}</Text>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <View>
                        <Image source={Assets.profile.profileIcon} style={{height: 70, width: 70}}/>
                    </View>
                    <Text style={{fontFamily: 'Raleway_600SemiBold'}}>{item.name}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{fontSize: 12, fontFamily: 'Raleway_400Regular'}}>Score: </Text>
                        <Text style={{fontSize: 12, fontFamily: 'Raleway_600SemiBold'}}>{item.score}</Text>
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
                        <Image source={Assets.profile.profileIcon} style={{height: 26, width: 26}}/>
                    </View>
                    <Text style={{fontSize: 14, fontFamily: 'Raleway_700Bold'}}>Amit Kumar</Text>
                </View>
                <Text style={{fontSize: 14, fontFamily: 'Raleway_700Bold'}}>Score 44</Text>
                <Text style={{fontSize: 14, fontFamily: 'Raleway_700Bold'}}>#4</Text>
            </View>
        )
    }

    render() {
        return(
            <View style={{marginVertical: 15, flexDirection: 'column'}}>
                <View style={{flexDirection: 'row',backgroundColor:theme.labelOrInactiveColor+'4D',margin:10,padding:20,borderRadius:5}}>
                {/* <View style={{ flexDirection: 'row'}}> */}
                    <Image source={appLogo} style={{height: 30, width: 30}}/>
                    <Text style={{fontSize: 22, fontFamily: 'Raleway_700Bold', marginLeft: 10}}>Leader Board</Text>
                {/* </View> */}
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 15}}>
                    {this.renderTopLeader({name:'Amit',rank:'2nd',score:100})}
                    {this.renderTopLeader({name:'Mangal',rank:'1st',score:101})}
                    {this.renderTopLeader({name:'Ravi',rank:'3rd',score:99})}
                </View>
                {this.renderOtherLeaders()}
                {this.renderOtherLeaders()}
                {this.renderOtherLeaders()}
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10}}>
                    <TouchableOpacity style={{backgroundColor: theme.violetColor, paddingVertical: 2, paddingHorizontal:10, borderRadius: 5}}>
                        <Text style={{color: theme.primaryColor}}>See All</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default LeadersBoard