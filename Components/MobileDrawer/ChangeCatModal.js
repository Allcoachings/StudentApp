import React, { useEffect, useState } from 'react';
import { Text, View,Modal,StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'; 
import CardView from '../Utils/CardView';
import {screenMobileWidth, theme, appLogo} from '../config'
import {fetch_categories} from '../Utils/DataHelper/Categories'

import AsyncStorage from '@react-native-async-storage/async-storage';

import BrickList from 'react-native-masonry-brick-list';
import { Picker } from 'native-base';




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

      const [selectedCategory,setSelectedCategory] = useState();
      const [loadingCategory,setLoadingCategory] = useState(true);
      const [categories,setCategories] = useState([])


      useEffect(() => {

        fetch_categories((response)=>{
                if(response.status === 200)
                {
                    response.json().then(response=>
                        { 
                            let arr=[1,2,3]
                            let random = getRandomInt(0,2);
                            span = arr[random];
                            response.unshift({key:-1,label:"All",span:3})
                            let pancham   = response.map(item=>item.span=span)
                            // console.log(pancham,response,random);
                            setCategories(pancham);
                            setLoadingCategory(false);
                        })
                        
                }else
                {
                    console.log("something went wrong")
                }
       

        }) 
    })

    const renderCategory=(item)=>{
        return(
            <TouchableOpacity style={{flexDirection: 'row', borderWidth: 0.5, borderColor: 'black', borderRadius:20, height: 40, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    source={appLogo}
                    style={{height: 20, width: 20, marginRight: 5}}
                />
                <Text style={{fontFamily:'Raleway_400Regular', fontSize: 18}}>{item.label}</Text>
            </TouchableOpacity>
        )
    }

return(
    
    CardView(
        <Modal 
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          transparent={false}
          visible={props.isModalVisible}
          onRequestClose={props.closeModal}>

              <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
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
                                renderItem={renderCategory}
                                columns = {3}
                            />

                        </View>
                        <View style={{justifyContent: 'flex-end', alignItems: 'center', marginTop: '95%'}}>
                            <TouchableOpacity style={{ backgroundColor: theme.greyColor, padding: 10, width:'50%', justifyContent: 'center', alignItems: 'center',borderRadius: 30}}>
                                <Text style={{fontFamily:'Raleway_700Bold',fontSize:18, color: theme.primaryColor}}>Explore</Text>
                            </TouchableOpacity>
                        </View>
              </View>
          </Modal>
    ))
}

const styles = StyleSheet.create({
    
})

export default ChangeCatModal;
