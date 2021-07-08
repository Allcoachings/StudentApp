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

    renderImagePost=() => {
        return(
            CardView(
                <View style={styles.boxView}>
                    <View style={styles.rowView}>
                        <View style={styles.circleView} />
                        <Text style={styles.coaching}>Saket IAS Allahabad</Text>
                        <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                    </View>
                    <View style={styles.timeDateView}>
                        <Text style={styles.timeDateText}>4:00 AM</Text>
                        <Text style={styles.timeDateText}>28/05/2021</Text>
                    </View>
                    <View style={styles.innerBoxView}>
                        <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.img}/>
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
    }

    renderQuizPost=() => {
        return(
            CardView(
                <View style={styles.boxView}>
                    <View style={styles.rowView}>
                        <View style={styles.circleView} />
                        <Text style={styles.coaching}>Chandra Institute Allahabad</Text>
                        <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                    </View>
                    <View style={styles.timeDateView}>
                        <Text style={styles.timeDateText}>4:00 AM</Text>
                        <Text style={styles.timeDateText}>28/05/2021</Text>
                    </View>
                    <View style={styles.innerBoxView}>
                        <Text style={{fontSize: 18, marginBottom: 10}}>In 1768, Captain James Cook set out to explore which ocean?</Text>
                        <View Style={{display: 'flex', flexDirection: 'column'}}>
                            <Text style={{fontSize: 16, marginTop: 3}}>Pacific Ocean</Text>
                            <Text style={{fontSize: 16, marginTop: 3}}>Atlantic Ocean</Text>
                            <Text style={{fontSize: 16, marginTop: 3}}>Indian Ocean</Text>
                            <Text style={{fontSize: 16, marginTop: 3}}>Arctic Ocean</Text>
                        </View>

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
    }


    renderTextPost=() => {
        return(
            CardView(
                <View style={styles.boxView}>
                    <View style={styles.rowView}>
                        <View style={styles.circleView} />
                        <Text style={styles.coaching}>Test Coachings</Text>
                        <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}}/>
                    </View>
                    <View style={styles.timeDateView}>
                        <Text style={styles.timeDateText}>4:00 AM</Text>
                        <Text style={styles.timeDateText}>28/05/2021</Text>
                    </View>
                    <View style={styles.innerBoxView}>
                        <Text style={{fontSize: 18, marginBottom: 5}}>Covid Live News Updates: AstraZeneca shots should be halted for over-60s too, says European Medicines Agency</Text>
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
    }

    header=() => {
        return(
            <View style={styles.headView}>
                <Feather name="chevron-left" size={30} />
                <Text style={styles.headText}>Feed</Text>
            </View>
        )
    }

    render() {
        return(
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                // headerComponent={this.header()}
                // replaceHeader={true}
                headerStyle={{flex:0.11, padding: 5}}
            >
                <ScrollView>
                    <View style={styles.container}>
                        
                        { this.renderImagePost()}
                        { this.renderQuizPost()}
                        { this.renderTextPost()}
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
        padding:15,
    },
        headView:
        {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 5,
        },
            headText:
            {
                fontSize: 24,
                fontWeight: 'bold',
                marginLeft: '10%'
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
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: theme.accentColor
                },
                timeDateView:
                {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                },
                    timeDateText:
                    {
                        fontSize: 16,
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
                        alignItems: 'center'
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