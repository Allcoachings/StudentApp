import moment from 'moment';
import React from 'react';
import { Text, View,Image,TouchableOpacity,TextInput } from 'react-native';
import { serverBaseUrl, theme } from '../config';
  
const AddComment = (props) => {
const item = props.item;
 
    return(
        <View>
        <View style={{ flexDirection: 'row', margin: 5, padding: 10,borderBottomWidth:1,borderBottomColor: theme.labelOrInactiveColor,alignItems: 'center'}}> 
            <Image source={{uri: "https://dubuddy.in/shortLinks/userAvatar"}} style={{height: 40, width: 40, borderRadius: 20, borderWidth: 0.6, borderColor:theme.greyColor,}}/>
            <View style={{flex: 1, flexDirection: 'column', marginLeft: 10, marginTop: 2}}>
                 <TextInput style={{}}
                    placeholder="Add a publi comment..."
                 />
            </View>
        </View>
        </View>
    )
}

export default AddComment;
