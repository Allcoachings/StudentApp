import React, { useEffect, useState } from 'react';
import { Text, View,Modal,StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'; 
import CardView from '../Utils/CardView';
import {screenMobileWidth, theme, appLogo} from '../config'
import {fetch_categories_normalized} from '../Utils/DataHelper/Categories'

import AsyncStorage from '@react-native-async-storage/async-storage';

import BrickList from 'react-native-masonry-brick-list';
import { Picker } from 'native-base';
import CatView from './CatView';




const renderPickerItem=(item)=>
{
    return(
        <Picker.Item label={item.label} value={item.key} />
    )
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ChangeCatModal = (props) => {

      const [selectedCategory,setSelectedCategory] = useState({});
      const [loadingCategory,setLoadingCategory] = useState(true);
      const [categories,setCategories] = useState([])


      useEffect(() => {

        fetch_categories_normalized("category",(response)=>{
                if(response.status === 200)
                {
                    response.json().then(response=>
                        { 
                            
                          
                            response.unshift({id:-1,name:"All",span:1})
                            // let pancham   = response.map(item=>({...item,id:item.key,span:arr[getRandomInt(0,2)]}))
                            // console.log(response)
                            setCategories(response);
                            setLoadingCategory(false);
                        })
                        
                }else
                {
                    // console.log("something went wrong")
                }
       

        }) 
    },[])

    const renderCategory=(item)=>{ 
        return(
                <TouchableOpacity style={{flexDirection: 'row', borderWidth: 0.5, borderColor: 'black', borderRadius:20, justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        source={appLogo}
                        style={{height: 20, width: 20, marginRight: 5}}
                    />
                    <Text style={{fontFamily:'Raleway_400Regular', fontSize: 18}}>{item.label}</Text>
                </TouchableOpacity>
        )
    }

const handleExplorePress=()=>
{
    // console.log(selectedCategory)
    AsyncStorage.setItem("userCat",JSON.stringify(selectedCategory)).then(()=>
    {
        props.closeModal()
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        })
    });
}
const setCatSelector=(item)=>{
    // console.log(item)
    setSelectedCategory(item)
    
    
}
return(
    
    CardView(
        <Modal 
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          transparent={true}
          visible={props.isModalVisible}
          onRequestClose={props.closeModal}>
              <ScrollView>
                <View style={{display: 'flex',backgroundColor:"#fff", flexDirection: 'column', justifyContent: 'center'}}>
                {/* {!loadingCategory?(
                                
                                CardView(
                                    <View style={styles.dropdownView}>
                                        <Picker

                                            style={{height:30}}
                                            selectedValue={selectedCategory}
                                            onValueChange={(itemValue, itemIndex) =>{
                                                    props.closeModal(),
                                                    props.navigation.navigate("CategoryList", {type: itemValue,id:itemIndex})}
                                            }>
                                            {categories&&categories.map((item)=>renderPickerItem(item))}
                                        </Picker> */}
                                        {/* <DropDownPicker
                                            placeholder="Select Category"
                                            placeholderTextColor={theme.greyColor}
                                            containerStyle={{borderColor: theme.greyColor}}
                                            items={this.state.categories}
                                            open={this.state.open}
                                            setOpen={this.open}
                                            value={this.state.selectedCategory}
                                            setValue={this.setValue}
                                            dropdownContainerStyle={{
                                                zIndex:1000,
                                                elevation:100
                                            }}
                                        /> */}
                                    {/* </View> ,{marginTop: 10, padding: 12})
                            ):(null)} */}
                            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: '10%'}}>
                                <Text style={{fontFamily:'Raleway_700Bold',fontSize: 24}}>Select  Category</Text>
                            </View>
                            <View style={{flexDirection: 'column', justifyContent: 'space-between', marginTop: '10%'}}>
                                {/* <FlatList
                                    data={categories}
                                    renderItem={renderCategory}
                                    numColumns={2}
                                    keyExtractor={(item) => item.id}
                                /> */}
                                {/* <BrickList
                                    data={categories}
                                    renderItem={renderCategory}
                                    numColumns={2}
                                /> */}
                                <BrickList
                                    data = {categories}
                                    renderItem={(item)=><CatView item={item} selectedCat={selectedCategory} setSelected={setCatSelector}/>}
                                    columns = {3}
                                    rowHeight={50}
                                />

                            </View>
                            <View style={{justifyContent: 'flex-end', alignItems: 'center', marginTop: '95%'}}>
                                <TouchableOpacity onPress={handleExplorePress} style={{ backgroundColor:  theme.accentColor, padding: 10, width:'50%', justifyContent: 'center', alignItems: 'center',borderRadius: 30}}>
                                    <Text style={{fontFamily:'Raleway_700Bold',fontSize:18, color: theme.primaryColor}}>Explore</Text>
                                </TouchableOpacity>
                            </View>
                </View>
              </ScrollView>
          </Modal>
    ))
}

const styles = StyleSheet.create({
    
})

export default ChangeCatModal;
