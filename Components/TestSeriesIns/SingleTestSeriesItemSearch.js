import React, { useCallback, useState } from 'react';
import CardView from '../Utils/CardView'
import { StyleSheet,View,Text,TouchableWithoutFeedback,Image ,Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width
import {theme,imageProvider} from '../config'
function SingleTestSeriesItemSearch({item,navigation,category,closeModal}) {
const [noOfLines,setNoOfLines]= useState(1) 
const onTextLayout = useCallback(e => {
    setNoOfLines(e.nativeEvent.lines.length); 
  }, []);
  return (
    
        <TouchableWithoutFeedback onPress={()=>{closeModal();navigation.navigate("ViewInsTestSeriesList", {id: item.id, subCatName:item.name,catName: category, image: item.image})}} >
            <View  style={styles.singleItem}>
              {CardView( 
                <View style={styles.imageView}>
                    <Image source={{uri:imageProvider(item.image)}} style={styles.itemImage}/>
                </View>
                , { margin:5,width:50,alignItems: 'center',justifyContent: 'center',height:50,overflow: 'hidden',borderWidth:1,borderColor:theme.labelOrInactiveColor,borderRadius:10 },2 )}
                <View>
                    <View style={styles.titleView}>
                        <Text onTextLayout={onTextLayout} style={styles.itemTitle}>{item.name}</Text>
                    </View>
                    <View style={styles.titleView}>
                        <Text onTextLayout={onTextLayout} style={{fontSize:10,color:"grey"}}>{category}</Text>
                    </View>
                    {/* <View style={styles.countView}>
                        <Text style={styles.itemCount}>{item.count}</Text>
                    </View> */}
                </View>
                {/* <View style={[styles.btnView,{marginTop:noOfLines>1?0:13}]}>
                    <Text style={styles.cardButton}>Open Exam</Text> 
                </View> */}
                
            </View>
        </TouchableWithoutFeedback>
    
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
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 8
                }, 
                    imageView:
                    {
                        
                    } ,
                        itemImage:
                        {
                            height: 50,
                            width:50, 
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
                             fontFamily:'Raleway_600SemiBold',
                            color: theme.secondaryColor, 
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

export default SingleTestSeriesItemSearch;

