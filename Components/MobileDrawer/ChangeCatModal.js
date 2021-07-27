import React, { useEffect, useState } from 'react';
import { Text, View,Modal,StyleSheet } from 'react-native'; 
import CardView from '../Utils/CardView';

import {fetch_categories} from '../Utils/DataHelper/Categories'

import AsyncStorage from '@react-native-async-storage/async-storage';



import { Picker } from 'native-base';








const renderPickerItem=(item)=>
{
    return(
        <Picker.Item label={item.label} value={item.key} />
    )
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
                        console.log("response",response)
                        response.unshift({key:-1,label:"Select Category"})
                        setCategories(response);
                        setLoadingCategory(false);
                        })
                        
                }else
                {
                    console.log("something went wrong")
                }
       

        }) 
      })

return(
    CardView(
        <Modal 
          animationIn="slideInLeft"
          animationOut="slideOutRi ght"
          transparent={false}
          visible={props.isModalVisible}
          onRequestClose={props.closeModal}>

              <View>
              {!loadingCategory?(
                            
                            CardView(
                                <View style={styles.dropdownView}>
                                    <Picker

                                        style={{height:30}}
                                        selectedValue={selectedCategory}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectedCategory(itemValue)
                                        }>
                                            {/* <Picker.Item label="Java" value="java" />
                                            <Picker.Item label="JavaScript" value="js" /> */}
                                        {categories&&categories.map((item)=>renderPickerItem(item))}
                                    </Picker>
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
                                </View> ,{marginTop: 10, padding: 12})
                        ):(null)}
                        
              </View>
          </Modal>
    ))
}

const styles = StyleSheet.create({
    
})

export default ChangeCatModal;
