import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { theme } from '../config';
import { Feather } from '@expo/vector-icons';
import { feedData } from '../../FakeDataService/FakeData' 
import {connect } from 'react-redux'
import CardView from '../Utils/CardView';
class Leads extends React.Component {
    state={
    }

    render() {
        return(
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                titleonheader={"Leads"}
            >
                <ScrollView>
                    <View style={styles.container}>
                        {/* {CardView(
                            <View style={styles.headView}>
                                <Feather name="chevron-left" size={28} />
                                <Text style={styles.headText}>Leads</Text>
                            </View>,{paddingTop: 5,justifyContent: 'center'}
                        )} */}

                        <View style={styles.helloView}>
                            <Text style={styles.helloText}>Hello, Coaching</Text>
                        </View>

                        <View style={styles.rowContainer}>
                            <View style={[styles.colContainer, {backgroundColor: theme.redColor+"33"}]}>
                                <Text style={styles.leadText}>Today Leads</Text>
                                <Text style={styles.priceText}>220</Text>
                            </View>
                            <View style={[styles.colContainer, {backgroundColor: theme.yellowColor+"33"}]}>
                                <Text style={styles.leadText}>Total Leads</Text>
                                <Text style={styles.priceText}>5000</Text>
                            </View>
                        </View>

                        <View style={styles.courseCol}>
                            <View style={styles.corsePriceView}>
                                <Text style={styles.courseText}>Course 1</Text>
                                <Text style={styles.coursePriceText}>5000</Text>
                            </View>
                            <View style={styles.corsePriceView}>
                                <Text style={styles.courseText}>Course 1</Text>
                                <Text style={styles.coursePriceText}>5000</Text>
                            </View>
                            <View style={styles.corsePriceView}>
                                <Text style={styles.courseText}>Course 1</Text>
                                <Text style={styles.coursePriceText}>5000</Text>
                            </View>
                            <View style={styles.corsePriceView}>
                                <Text style={styles.courseText}>Course 1</Text>
                                <Text style={styles.coursePriceText}>5000</Text>
                            </View>
                            <View style={styles.corsePriceView}>
                                <Text style={styles.courseText}>Course 1</Text>
                                <Text style={styles.coursePriceText}>5000</Text>
                            </View>
                            <View style={styles.corsePriceView}>
                                <Text style={styles.courseText}>Course 1</Text>
                                <Text style={styles.coursePriceText}>5000</Text>
                            </View>
                            <View style={styles.corsePriceView}>
                                <Text style={styles.courseText}>Course 1</Text>
                                <Text style={styles.coursePriceText}>5000</Text>
                            </View>
                            <View style={styles.corsePriceView}>
                                <Text style={styles.courseText}>Course 1</Text>
                                <Text style={styles.coursePriceText}>5000</Text>
                            </View>
                            <View style={styles.corsePriceView}>
                                <Text style={styles.courseText}>Course 1</Text>
                                <Text style={styles.coursePriceText}>5000</Text>
                            </View>
                            <View style={styles.corsePriceView}>
                                <Text style={styles.courseText}>Course 1</Text>
                                <Text style={styles.coursePriceText}>5000</Text>
                            </View>
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
        padding:5,
    },
        headView:
        {
            flexDirection: 'row',
            // justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10
        },
            headText:
            {
                fontSize: 24,
                fontWeight: 'bold',
            },
        helloView:
        {
            marginTop: '6%'
        },
            helloText: 
            {
                fontSize: 20,
                color: theme.greyColor
            },
        rowContainer:
        {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: '10%'
        },
            colContainer:
            {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
                borderRadius: 5
            },
                leadText:
                {
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: theme.secondaryColor
                },
                priceText:
                {
                    color: theme.greyColor,
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginTop:10
                },
        courseCol:
        {
            marginTop: '10%',
            display: 'flex',
            flexDirection: 'column',
            padding: 5
        },
            corsePriceView:
            {
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: theme.blueColor+"0D",
                borderRadius: 5,
                justifyContent: 'space-between',
                padding: 15,
                marginBottom: 10
            },
                courseText:
                {
                    color: theme.blueColor,
                    fontSize: 20
                },
                coursePriceText:
                {
                    fontSize: 20,
                    color: theme.greyColor
                }
        
            
})

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(Leads); 