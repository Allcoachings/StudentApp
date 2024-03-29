import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {testSeriesData, storyLine} from '../../FakeDataService/FakeData'
import { theme, Assets } from '../config';
import { EvilIconsns } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Redirect } from 'react-router';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
class SingleTestSeries extends React.Component {
    state = { 
        
     }

    seriesRow=({item})=>{
        return(
            CardView(
                <TouchableOpacity onPress={null} style={styles.singleCard}>
                    <View style={styles.imageSection}>
                        <Image source={item.insLogo} style={styles.itemImage}/>
                    </View>
                    <View style={styles.infoSection}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardInsName}>{item.instituteName}</Text>
                        <View style={styles.timeMarksView}>
                            <Text style={styles.timeMarksStyle}>{item.time}</Text>
                            <Text style={styles.timeMarksStyle}> {item.marks}</Text>
                        </View>
                    </View>
                </TouchableOpacity>,{width: '100%', height:80, marginBottom: 20, display: 'flex', justifyContent: 'center', borderRadius: 4}
            )
        )
    }

    

    render(){
        return(
            <PageStructure
                iconName="navicon"
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                catInHeader={false}
                navigation={this.props.navigation}
            >
                <View style={styles.container}>
                    <View style={styles.headerSection}>
                        <Text style={styles.title}>{testSeriesData[0].title}</Text>
                        <View style={styles.more}>
                            <EvilIconsns name="chevron-right" size={20} />
                        </View>
                    </View>
                    <FlatList 
                        data={testSeriesData[0].data[0].list} 
                        renderItem={this.seriesRow} 
                        keyExtractor={(item)=>item.id}
                        showsVerticalScrollIndicator={false} 
                        ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                    />
                </View>
               
            </PageStructure>
        )
    }
}

const styles = StyleSheet.create({
    container:
    {
        display:'flex', 
        flexDirection: 'column',
    },
        headerSection:
        {
            display:'flex', 
            flexDirection: 'row', 
            justifyContent: 'space-between'
        },
            title:
            {
                fontSize: 24,
                fontWeight: '700',
                marginBottom: 10
            },
            more:
            {
                display:'flex', 
                flexDirection: 'row',
                marginTop: 5
            },
        singleCard:
        {
            display:'flex', 
            flexDirection: 'row', 
        },
            imageSection:
            {
                padding: 10,
            },
                itemImage: 
                {
                    height: 70,
                    width:70,
                    borderRadius: 35
                },
        infoSection:
        {
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-evenly'
        },
            cardTitle:
            {
                marginTop: 4,
                fontSize: 15, 
                fontWeight: '700'
            },
            cardInsName:
            {
                color: theme.labelOrInactiveColor
            },
            timeMarksView:
            {
                marginTop: 7,
                display: 'flex',
                flexDirection: 'row'
            },
                timeMarksStyle:
                {
                    fontWeight: '700',
                    color: theme.accentColor
                },
})

export default SingleTestSeries;