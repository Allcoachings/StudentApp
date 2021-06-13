import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform} from 'react-native';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import {subscription} from '../../FakeDataService/FakeData'
import { theme } from '../config';
import { Feather } from '@expo/vector-icons';
import { Video } from 'expo-av';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'

class Subscription extends React.Component {
    state = {  }

    renderTestSeriesList=({item})=>{
        return(
            CardView(
                    <TouchableOpacity onPress={null} style={styles.singleItem}>
                        <View style={styles.imageView}>
                            <Image source={item.image} style={styles.itemImage}/>
                        </View>
                        <View style={styles.titleView}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </View>
                        <View style={styles.countView}>
                            <Text style={styles.itemCount}>{item.count}</Text>
                        </View>
                        <View style={styles.btnView}>
                            <Text style={styles.cardButton}>{item.text}</Text>
                        </View>
                    </TouchableOpacity>, { margin:10,width:((this.props.screenWidth/3)) }
            )
       )
    }

    renderVideoList=({item})=>{
        return(
            CardView(
                <View style={styles.videoMain}>
                    <Video
                        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                        rate={1.0}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay
                        style={{ width: 120, height: 120, padding:10 }}
                    /> 
                    <Text style={styles.videoTitle}>{item.title}</Text>
                    <Text style={styles.videoInsName}>{item.insName}</Text>
                </View>, {margin:10,width:((this.props.screenWidth/3)) }
        ) )
    }

    renderDocumentList=({item})=>{
        return(
            CardView(
                <View style={styles.documentMain}>
                    <Image source={item.image} style={styles.itemImage}/>
                    <Text style={styles.docTitle}>{item.title}</Text>
                    <Text style={styles.insName}>{item.insName}</Text>
                </View>, { margin:10,width:((this.props.screenWidth/3)) }
            )
        )
    }

    renderMainContentRow=({item})=>{

        switch(item.type)
        {
            case 'Videos':
                return (
                    <View style={styles.rowContainer}>
                        
                        <View style={styles.rowHeader}>
                            <Text style={styles.rowHeaderTitle}>{item.title}</Text>
                            <Feather name="arrow-right" size={25} color={theme.secondaryColor}/>
                        </View>
                        <View style={styles.typeView}>
                            <Text style={styles.type}>{item.type}</Text>
                        </View>
                        <View style={styles.rowBody}>
                            <FlatList 
                                data={item.data} 
                                renderItem={this.renderVideoList} 
                                keyExtractor={(item)=>item.id}
                                horizontal={true} 
                                showsHorizontalScrollIndicator={false}
                            />
                        </View> 
                    </View>
                ) 
            case 'Document':
                return (
                        <View style={styles.rowContainer}>
                            <View style={styles.typeView}>
                                <Text style={styles.type}>{item.type}</Text>
                            </View>
                            <FlatList 
                                data={item.data} 
                                renderItem={this.renderDocumentList} 
                                keyExtractor={(item)=>item.id}
                                horizontal={true} 
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>    
                )
            case 'Test Series':
                return (
                        <View style={styles.rowContainer}>
                            <View style={styles.typeView}>
                                <Text style={styles.type}>{item.type}</Text>
                            </View>
                            <FlatList 
                                data={item.data} 
                                renderItem={this.renderTestSeriesList} 
                                keyExtractor={(item)=>item.id}
                                horizontal={true} 
                                showsHorizontalScrollIndicator={false}
                            />

                        </View>
                )
        }
        
    }

    
    render() {
        return(
            <PageStructure
                iconName={"menu"}
                btnHandler={() => {this.props.navigation.toggleDrawer()}}
                catInHeader={true}
            >
                <View style={styles.container}> 
                    <View style={styles.mainContent}> 
                        <FlatList 
                        data={subscription}  
                        showsVerticalScrollIndicator={false} 
                        renderItem={this.renderMainContentRow}
                        keyExtractor={item => item.id}/>
                    </View>
                </View>
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
        mainContent:
        {
                flex:1,
                // marginTop:10
        },
            rowContainer:
            {
                flex: 1,
                marginTop:10
            },
                rowHeader:
                {
                    flex:1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginRight: 10,
                    marginLeft: 10
                },
                    rowHeaderTitle:
                    {
                        fontSize:18,
                        fontWeight:'bold'
                    },
                typeView:
                {
                    
                },
                    type:
                    {
                        marginLeft: 10,
                        fontSize: 16,
                        fontWeight:'bold',
                        color: theme.accentColor
                    },
                rowBody:
                {
                        flex:0.1 
                },
                    videoMain:
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                        videoTitle:
                        {
                            fontSize: 12,
                            textAlign: 'center',
                            marginTop: 10,
                        },
                        videoInsName:
                        {
                            fontSize: 12,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            marginBottom: 10,
                        },
                    documentMain:
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: 10,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                        docTitle:
                        {
                            marginTop: 5,
                            textAlign: 'center',
                        },
                        insName:
                        {
                            textAlign: 'center',
                            fontWeight: 'bold',
                        },
                    singleItem:
                    {
                        padding: 10,
                        display:'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 8, 
                        marginTop: 10,
                    }, 
                        imageView:
                        {
                            borderWidth: 1
                        } ,
                            itemImage:
                            {
                                height: 85,
                                width:120, 
                                borderColor: theme.secondaryColor
                            },
                        titleView:
                        {
                            marginTop: 5,
                        }   , 
                            itemTitle:
                            {
                                fontSize: 14, 
                                padding: 2, 
                                fontWeight: '700', 
                                color: theme.labelOrInactiveColor
                            },
                        countView:
                        {

                        },
                            itemCount: 
                            {
                                fontSize: 10,
                                padding: 4, 
                                color: theme.labelOrInactiveColor
                            },
                        btnView:
                        {
                            borderWidth: 1, 
                            borderColor: theme.labelOrInactiveColor, 
                            borderRadius: 2, 
                            margin: 3
                        },
                            cardButton:
                            {
                                fontSize: 8, padding: 5, marginLeft: 3, marginRight: 3, color: theme.labelOrInactiveColor
                            },
})

const mapStateToProps = (state)=>{
    return {
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(Subscription);
