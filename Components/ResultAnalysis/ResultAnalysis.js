import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import { theme } from '../config';
import { Feather } from '@expo/vector-icons';
import {connect } from 'react-redux'
class ResultAnalysis extends React.Component {
    state={
       data:[
           {
               id: '1',
               type: 'CORRECT',
               que: '6'
           },
           {
               id: '2',
               type: 'WRONG',
               que: '15 '
           },
           {
               id: '3',
               type: 'SKIPPED',
               que: '99'
           },
       ]
    }





    state={
        type: [
            {
                id: '1',
                type: 'Correct'
            },
            {
                id: '2',
                type: 'Incorrect'
            },
            {
                id: '3',
                type: 'Unattempted'
            },
        ],

        activeTab: 'Correct',

        solution:[
            {
                id: '1',
                type: 'CORRECT',
                time: '0m 2s',
                statement: 'All Wheat are barley. All peas are barley. Conclusion:I. Some wheats are peas II. No Wheats are Peas'
            },
            {
                id: '2',
                type: 'CORRECT',
                time: '0m 2s',
                statement: 'All Wheat are barley. All peas are barley. Conclusion:I. Some wheats are peas II. No Wheats are Peas'
            },
            {
                id: '3',
                type: 'CORRECT',
                time: '0m 2s',
                statement: 'All Wheat are barley. All peas are barley. Conclusion:I. Some wheats are peas II. No Wheats are Peas'
            },
            {
                id: '4',
                type: 'CORRECT',
                time: '0m 2s',
                statement: 'All Wheat are barley. All peas are barley. Conclusion:I. Some wheats are peas II. No Wheats are Peas'
            },
            {
                id: '5',
                type: 'CORRECT',
                time: '0m 2s',
                statement: 'All Wheat are barley. All peas are barley. Conclusion:I. Some wheats are peas II. No Wheats are Peas'
            },
            {
                id: '6',
                type: 'CORRECT',
                time: '0m 2s',
                statement: 'All Wheat are barley. All peas are barley. Conclusion:I. Some wheats are peas II. No Wheats are Peas'
            },
            {
                id: '7',
                type: 'CORRECT',
                time: '0m 2s',
                statement: 'All Wheat are barley. All peas are barley. Conclusion:I. Some wheats are peas II. No Wheats are Peas'
            },
            {
                id: '8',
                type: 'CORRECT',
                time: '0m 2s',
                statement: 'All Wheat are barley. All peas are barley. Conclusion:I. Some wheats are peas II. No Wheats are Peas'
            },
            {
                id: '9',
                type: 'CORRECT',
                time: '0m 2s',
                statement: 'All Wheat are barley. All peas are barley. Conclusion:I. Some wheats are peas II. No Wheats are Peas'
            },
        ]
    }

    renderCategory=({item})=>{
        return(
            <TouchableOpacity onPress={()=>this.setState({activeTab: item.type})} style={[styles.btnView,
            item.type=='Correct'?
                (this.state.activeTab==item.type?
                    ({backgroundColor:theme.accentColor+"4D", borderColor: theme.primaryColor}):({borderColor: theme.accentColor, backgroundColor: theme.primaryColor})
            ):(item.type=='Incorrect'?
                (this.state.activeTab==item.type?
                    ({backgroundColor:theme.redColor+'4D', borderColor: theme.primaryColor}):({borderColor: theme.redColor, backgroundColor: theme.primaryColor})
            ):(item.type=='Unattempted'?
                (this.state.activeTab==item.type?
                    ({backgroundColor:theme.labelOrInactiveColor, borderColor: theme.primaryColor}):({borderColor: theme.greyColor, backgroundColor: theme.primaryColor})
            ):(null)))]}>
               
               
                <Text style={[styles.btnText, item.type=='Correct'?({color: theme.accentColor}):(item.type=='Incorrect'?({color: theme.redColor}):(item.type=='Unattempted'?({color: theme.greyColor}):(null)))]}>{item.type}</Text>
            
            
            </TouchableOpacity>
        )
    }

    renderSolution=({item})=>{
        return(
            <>
                <View style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{borderLeftWidth: 3, borderColor: theme.accentColor}}></View>
                    <View style={styles.solutionView}>
                        <View style={styles.queNoView}>
                            <View style={styles.queView}>
                                <Text style={styles.queText}>Q.{item.id}</Text>
                                <Text style={styles.typeText}>{item.type}</Text>
                            </View>
                            <Text style={styles.timeText}>Time: {item.time}</Text>
                        </View>
                        <View style={styles.ansView}>
                            <Text style={styles.ansStatement}>
                                Statements: {item.statement}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor}}/>
           </>
 
        )
    }




    renderBoxView=({item})=>{
        return(
            <View style={[styles.boxView, {width: this.props.screenWidth/3.4},
                item.type=='CORRECT'?
                ({backgroundColor: theme.accentColor+"0D"}):(
                    item.type=='WRONG'?({backgroundColor: theme.redColor+"0D"}):(
                        item.type=='SKIPPED'?(
                            {backgroundColor: theme.labelOrInactiveColor+"26"}):(null)))]}>
                <View style={[styles.iconView, 
                item.type=='CORRECT'?
                ({backgroundColor: theme.accentColor+"33"}):(
                    item.type=='WRONG'?({backgroundColor: theme.redColor+"33"}):(
                        item.type=='SKIPPED'?(
                            {backgroundColor: theme.labelOrInactiveColor}):(null)))]}>
                    {item.type=='CORRECT'?(
                        <Feather name="check" size={18}/>
                    ):(
                        item.type=='WRONG'?(
                            <Feather name="x" size={18}/>
                        ):(
                            item.type=='SKIPPED'?(
                                <Feather name="minus" size={18}/>
                            ):(null)))}
                </View>
                <View style={styles.typeView}>
                    <Text style={[styles.typeText, 
                        item.type=='CORRECT'?
                        ({color: theme.accentColor}):(
                            item.type=='WRONG'?({color: theme.redColor}):(
                                item.type=='SKIPPED'?(
                                    {color: theme.greyColor}):(null)))]}>{item.type}</Text>
                </View>
                <View style={styles.quesNoView}>
                    <Text style={styles.quesNoText}>{item.que}</Text>
                </View>
                <View style={styles.quesView}>
                    <Text style={styles.quesText}>Ques</Text>
                </View>
            </View>
        )
    }

    render() {
        return(
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                titleonheader={"Result Analysis"}
                notificationreplaceshare={"share-2"}
            >
                <ScrollView>
                <View style={styles.container}>
                    {/* <View style={styles.headView}>
                        <Feather name="chevron-left" size={26} />
                        <Text style={styles.headText}>
                            All Coachings
                        </Text>
                        <Feather name="share-2" size={24} />
                    </View> */}

                    {/* <View style={styles.resultAnalysisView}>
                        <Text style={styles.resAnText}>Result Analysis</Text>
                    </View> */}
                    
                    <View style={styles.userNameView}>
                        <Text style={styles.userNameText}>Hi, User Name</Text>
                        <Text style={styles.tryHarderText}>Try harder next time!</Text>
                    </View>

                    <View style={styles.imageView}>
                        <Image style={styles.img} source={{uri: 'https://picsum.photos/200'}}/>
                    </View>
                    
                    <View style={styles.rowContainer}>
                        <View style={styles.scoreView}>
                            <Text style={styles.scoreRankText}>SCORE</Text>
                            <View style={styles.marksView}>
                                <Text style={styles.obtainedMarks}>2.25</Text>
                                <Text> / </Text>
                                <Text style={styles.totalMarks}>120</Text>
                            </View>
                        </View>
                        <View style={styles.rankView}>
                            <Text style={styles.scoreRankText}>RANK</Text>
                            <View style={styles.marksView}>
                                <Text style={styles.obtainedMarks}>6568</Text>
                                <Text> / </Text>
                                <Text style={styles.totalMarks}>7213</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{borderWidth:0.3, borderStyle:'dashed', borderRadius:1,borderColor:'black', marginTop: 10, marginBottom: 10}}></View>

                    <View style={styles.outerBoxView}>
                        <FlatList 
                            data={this.state.data} 
                            renderItem={this.renderBoxView}
                            keyExtractor={(item)=>item.id} 
                            numColumns={3}
                        />
                    </View>

                    <View style={styles.colContainer}>
                        <View style={styles.rowView}>
                            <View style={styles.percentileView}>
                                <Feather name="percent" size={20} style={{color: theme.addMoreButtonColor}}/>
                                <Text style={styles.titleText}>PERCENTILE</Text>
                            </View>
                            <Text style={styles.moreText}>8.96%</Text>
                        </View>
                        <View style={styles.rowView}>
                            <View  style={styles.percentileView}>
                                <Feather name="crosshair" size={20} style={{color: theme.accentColor}}/>
                                <Text style={styles.titleText}>ACCURACY</Text>
                            </View>
                            <Text style={styles.moreText}>28.0%</Text>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.percentileView}>
                                <Feather name="clock" size={20} style={{color: theme.yellowColor}}/>
                                <Text style={styles.titleText}>TIME TAKEN</Text>
                            </View>
                            <Text style={styles.moreText}>00hr 01mins</Text>
                        </View>
                    </View>

                </View>


                <View style={styles.container}>
                        <View style={{marginTop: 50,}}>
                            <View style={styles.headView}>
                                {/* <Feather name="chevron-left" size={26} style={{color: theme.greyColor}}/> */}
                                <Text style={styles.headText}>
                                    Solutions
                                </Text>
                            </View>
                            
                            <View style={{borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor, marginTop:10}}/>
                            
                            <View style={styles.chooseSectionView}>
                                <Text style={styles.sectionText}>Choose section</Text>
                                <View style={styles.chooseSection}>
                                    <Text style={styles.reasoningText}>Reasoning</Text>
                                </View>
                            </View>

                            <View style={{borderBottomWidth: 4, borderColor: theme.labelOrInactiveColor, marginTop:10}}/>

                            <View style={styles.categoryView}>
                                <FlatList 
                                    data={this.state.type} 
                                    renderItem={this.renderCategory}
                                    keyExtractor={(item)=>item.id} 
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={true}
                                />
                            </View>
                        </View>
                        <FlatList 
                            data={this.state.solution} 
                            renderItem={this.renderSolution}
                            keyExtractor={(item)=>item.id} 
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                        />
                        
                        
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
        padding:10,
    },
        headView:
        {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
            headText:
            {
                fontSize: 24,
                fontWeight: '700',
                color: theme.greyColor
            },
        resultAnalysisView:
        {
            marginLeft: '10%',
            // marginTop: '8%', 
        },
            resAnText:
            {
                fontSize: 24,
                fontWeight: '700'
            },
        userNameView:
        {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '6%',
            marginLeft: 10
        },
            userNameText:
            {
                fontSize: 16,
                color: theme.greyColor
            },
            tryHarderText:
            {
                marginTop: 10,
                fontSize: 20,
                fontWeight: '700'
            },
        imageView:
        {
            marginLeft: '70%',
            marginTop: 10
        },
            img:
            {
                height: 80,
                width: 80,
                borderRadius: 50
            },
        rowContainer:
        {
            display: 'flex',
            flexDirection: 'row',
            marginTop: 10,
            marginLeft: 5
        },
            scoreView:
            {
                display: 'flex',
                flexDirection: 'column',
            },
                scoreRankText:
                {
                    fontSize: 16,
                    color: theme.greyColor
                },
                marksView:
                {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                },
                    obtainedMarks:
                    {
                        fontSize: 24,
                        fontWeight: '700',
                    },
                    totalMarks:
                    {
                        fontSize: 14,
                        color: theme.greyColor
                    },
            rankView:
            {
                marginLeft: '20%'
            },
        outerBoxView:
        {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'

        },
            boxView:
            {
                padding:20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                margin: 5
            },
            iconView:
            {
                borderRadius: 13,
                padding: 3
            },
            typeView:
            {
                marginTop: 5
            },
                typeText:
                {
                    fontSize: 15
                },
            quesNoView:
            {
                marginTop: 5
            },
                quesNoText:
                {
                    fontSize: 18,
                    fontWeight: '700'
                },
            quesView:
            {
            },
                quesText:
                {
                    fontSize: 16,
                    color: theme.greyColor
                },
        colContainer:
        {
            display: 'flex',
            marginTop: 10,
            flexDirection: 'column'
        },
            rowView:
            {
                display: 'flex',
                flexDirection: 'row',
                marginTop: '10%',
                justifyContent: 'space-between'
            },
                percentileView:
                {
                    display: 'flex',
                    flexDirection: 'row',
                   
                },
                    titleText:
                    {
                        fontSize: 18,
                        marginLeft: 10,
                        color: theme.textColor
                    },
                moreText:
                {
                    fontSize: 18
                },




               
                    headView:
                    {
                        flexDirection: 'row',
                        alignItems: 'center'
                    },
                        headText:
                        {
                            fontSize: 24,
                            fontWeight: '700',
                            marginLeft: 15
                        },
                    chooseSectionView:
                    {
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                    },
                        sectionText:
                        {
                            fontSize: 18,
                            // marginLeft: 6,
                            color: theme.greyColor,
                            marginBottom: 5,
                            fontWeight: '600'
                        },
                        chooseSection:
                        {
                            borderWidth: 0.6,
                            borderColor: theme.greyColor,
                            borderRadius: 25
                        },
                            reasoningText:
                            {
                                fontSize: 17,
                                fontWeight: '700',
                                padding: 10
                            },
                    categoryView :
                    {
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 10
                    } ,
                        btnView:
                        {
                            borderColor: theme.greyColor,
                            borderWidth: 0.5,
                            borderRadius: 15,
                            margin: 5,
                        },
                            btnText:
                            {
                                paddingLeft: 15,
                                paddingRight: 15,
                                paddingTop: 4,
                                paddingBottom: 4,
                                color: theme.secondaryColor
                            },
                    solutionView:
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: 5,
                        marginBottom: 5,
                        padding: 10
                    },
                        queNoView:
                        {
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10
                        },
                            queView:
                            {
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            },
                                queText:
                                {
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    marginRight: 10,
                                },
                                typeText:
                                {
                                    marginLeft: 10,
                                    // fontWeight: '700',
                                    color: theme.accentColor, 
                                    fontSize:16
                                },
                            timeText:
                            {
                                color: theme.greyColor
                            },
                        ansView:
                        {
                            marginTop: 10
                        },
                            ansStatement:
                            {
                                fontSize: 16,
                                color: theme.textColor,
                                fontWeight: '600'
                            },






})

const  mapStateToProps = (state)=>
{
    return {
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(ResultAnalysis); 