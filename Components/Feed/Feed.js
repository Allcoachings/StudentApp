import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { theme } from '../config';
import { Feather } from '@expo/vector-icons';
import { feedData } from '../../FakeDataService/FakeData' 
import {connect } from 'react-redux'
import CardView from '../Utils/CardView';
class Feed extends React.Component {
    state={
    }


    renderLikeShareRow=()=>{
        return(
            <View style={styles.bottomRowContainer}>
                <View style={styles.likeView}>
                    <Feather name="thumbs-up" size={18} />
                    <Text style={styles.text}>Like</Text>
                </View>
                <View style={styles.likeView}>
                    <Feather name="message-square" size={18} />
                    <Text style={styles.text}>Comment</Text>
                </View>
                <View style={styles.likeView}>
                    <Feather name="send" size={18} />
                    <Text style={styles.text}>Share</Text>
                </View>
            </View>
        )
    }

    selectType=({item})=>{
        console.log(item)
        switch(item.type)
        {
            case 'imagePost':
                return(
                    CardView(
                        <View style={styles.boxView}>
                            <View style={styles.rowView}>
                                <View style={styles.circleView} />
                                <Text style={styles.coaching}>{item.insName}</Text>
                                <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                            </View>
                            <View style={styles.timeDateView}>
                                <Text style={styles.timeDateText}>{item.time}</Text>
                                <Text style={styles.timeDateText}>{item.date}</Text>
                            </View>
                            <View style={styles.innerBoxView}>
                                <Image source={item.image} style={styles.img}/>
                                <View style={styles.bottomRowContainer}>
                                    <View style={styles.likeView}>
                                        <Feather name="thumbs-up" size={18} />
                                        <Text style={styles.text}>Like</Text>
                                    </View>
                                    <View style={styles.likeView}>
                                        <Feather name="message-square" size={18} />
                                        <Text style={styles.text}>Comment</Text>
                                    </View>
                                    <View style={styles.likeView}>
                                        <Feather name="send" size={18} />
                                        <Text style={styles.text}>Share</Text>
                                    </View>
                                </View>
                            </View>
                        </View>,{width: '100%', padding: 6, marginBottom: 10}
                    )
                ) 
            case 'quiz':
                return(
                    CardView(
                        <View style={styles.boxView}>
                            <View style={styles.rowView}>
                                <View style={styles.circleView} />
                                <Text style={styles.coaching}>{item.insName}</Text>
                                <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                            </View>
                            <View style={styles.timeDateView}>
                                <Text style={styles.timeDateText}>{item.time}</Text>
                                <Text style={styles.timeDateText}>{item.date}</Text>
                            </View>
                            <View style={[styles.innerBoxView, {display: 'flex', flexDirection: 'column'}]}>
                                <Text>{item.que}</Text>
                                <Text>{item.opt1}</Text>
                                <Text>{item.opt2}</Text>
                                <Text>{item.opt3}</Text>
                                <Text>{item.opt4}</Text>
                            </View>
                        </View>,{width: '100%', padding: 6, marginBottom: 10}
                    )
                )
            case 'text':
                return(
                    CardView(
                        <View style={styles.boxView}>
                            <View style={styles.rowView}>
                                <View style={styles.circleView} />
                                <Text style={styles.coaching}>{item.insName}</Text>
                                <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                            </View>
                            <View style={styles.timeDateView}>
                                <Text style={styles.timeDateText}>{item.time}</Text>
                                <Text style={styles.timeDateText}>{item.date}</Text>
                            </View>
                            <View style={styles.innerBoxView}>
                                <Text>{item.text}</Text>
                            </View>
                        </View>,{width: '100%', padding: 6, marginBottom: 10}
                    )
                )
        }
    }

    render() {
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.headView}>
                        <Text style={styles.headText}>Feed</Text>
                    </View>
                    <FlatList 
                        data={feedData} 
                        renderItem={this.selectType} 
                        keyExtractor={(item)=>item.id}
                        horizontal={true} 
                        showsHorizontalScrollIndicator={false}
                    />
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
        padding:15,
        marginTop: '10%'
    },
        headView:
        {
            marginBottom: '6%',
            justifyContent: 'center',
            alignItems: 'center'
        },
            headText:
            {
                fontSize: 30,
                fontWeight: 'bold',
            },
        boxView:
        {
            display: 'flex',
            flexDirection: 'column',
            // borderWidth: 1,
            borderColor: theme.labelOrInactiveColor,
            padding: 2
        },
            rowView:
            {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10
            },
                circleView:
                {
                    // height: 15,
                    // width: 15,
                    // borderRadius: 7,
                    // backgroundColor: theme.redColor
                },
                coaching:
                {
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: theme.redColor
                },
                timeDateView:
                {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10
                },
                    timeDateText:
                    {
                        fontSize: 18,
                        color: theme.secondaryColor
                    },
            innerBoxView:
            {
                // borderWidth: 1,
                borderColor: theme.labelOrInactiveColor,
                borderRadius: 2,
                marginTop: 10,
                padding: 10,
            },
                img:
                {
                    height: 150,
                    width: '100%',
                },
                bottomRowContainer:
                {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10
                },
                    likeView:
                    {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    },
                        text:
                        {
                            fontSize: 18,
                            color: theme.greyColor
                        }
            
})

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(Feed); 