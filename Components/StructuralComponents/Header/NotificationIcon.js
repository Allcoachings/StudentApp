import { EvilIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../config';

import Notification from "../../Utils/Icons/Notification"

function NotificationIcon({rightIconOnPress,notificationreplaceshare}) {
     
  return(
      
        <TouchableOpacity style={{marginLeft:10,marginRight:15}}   onPress={() =>rightIconOnPress()}>
            {notificationreplaceshare ? (
                <EvilIcons
                name={notificationreplaceshare}
                size={25}
                color={theme.secondaryColor}
                style={styles.notiIcon}
                />
            ) : (
                <Notification height={24} width={24}/>
            )}
        </TouchableOpacity>
);
}
const styles = StyleSheet.create({
    notiIcon: {
        margin:15,
        
      },
})
export default React.memo(NotificationIcon);
