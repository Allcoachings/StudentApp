import React from 'react';
import {TouchableOpacity, View,Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {imageProvider} from '../../../config'
const ChildItem = ({
  item,
  style,
  onPress,
  index,
  imageKey,
  local,
  height,
  serverBaseUrl
}) => {
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => onPress(index)}>
        <View>
          <Image
            style={[styles.image, style, {height: height}]}
            source={local ? item[imageKey] : {uri: serverBaseUrl+item[imageKey]}}
          />
      </View>
    </TouchableWithoutFeedback>
  );
};
export default ChildItem

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 230,
    resizeMode: 'cover',
  },
});
