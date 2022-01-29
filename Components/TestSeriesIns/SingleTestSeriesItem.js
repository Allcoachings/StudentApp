import React, { useCallback, useState } from 'react';
import CardView from '../Utils/CardView'
import { StyleSheet,View,Text,TouchableWithoutFeedback,Image ,Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width
import {theme,imageProvider} from '../config'
function SingleTestSeriesItem({item,navigation,category}) {
const [noOfLines,setNoOfLines]= useState(1) 
const onTextLayout = useCallback(e => {
    setNoOfLines(e.nativeEvent.lines.length); 
  }, []);
  return (
    CardView(
        <TouchableWithoutFeedback onPress={()=>navigation.navigate("ViewInsTestSeriesList", {id: item.id, subCatName:item.name,catName: category, image: item.image})} >
            <View  style={styles.singleItem}>
                <View style={styles.imageView}>
                    <Image source={{uri:imageProvider(item.image)}} style={styles.itemImage}/>
                </View>
                <View style={styles.titleView}>
                    <Text onTextLayout={onTextLayout} style={styles.itemTitle}>{item.name}</Text>
                </View>
                <View style={styles.countView}>
                    <Text style={styles.itemCount}>{item.count}</Text>
                </View>
                <View style={[styles.btnView,{marginTop:noOfLines>1?0:13}]}>
                    <Text style={styles.cardButton}>Open Exam</Text> 
                </View>
            </View>
        </TouchableWithoutFeedback>, { margin:5,width:((windowWidth/3.1)),borderWidth:1,borderColor:theme.labelOrInactiveColor,borderRadius:15 },2 
    )
  );



}


const styles = StyleSheet.create({

    btnView:
    { 
        borderRadius: 2, 
        margin: 3,  
        backgroundColor: theme.secondaryColor
    },
        singleItem:
                {
                    padding: 10,
                    display:'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 8
                }, 
                    imageView:
                    {
                        
                    } ,
                        itemImage:
                        {
                            height: 40,
                            width:60, 
                            borderRadius:5,
                            resizeMode:'contain'
                        },
                    titleView:
                    {
                    
                    }, 
                        itemTitle:
                        {
                            fontSize: 12, 
                            padding: 2, 
                            fontWeight: '700', 
                            color: theme.secondaryColor,
                            textAlign: 'center'
                        },
                    countView:
                    {

                    },
                        itemCount: 
                        {
                            fontSize: 10,
                            // padding: 4, 
                            color: theme.secondaryColor
                        },
                    cardButton:
                    {
                        fontSize: 8, 
                        padding: 5, 
                        marginLeft: 3, 
                        marginRight: 3, 
                        color: theme.primaryColor,
                        flexShrink: 1
                    } ,
})

export default SingleTestSeriesItem;

