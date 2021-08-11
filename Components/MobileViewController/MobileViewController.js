import React from 'react';
import { Text } from 'react-native';
import MobileDrawer from '../MobileDrawer/MobileDrawer'
class MobileViewController extends React.Component {
    state = {  }
    render() {
        return (
            <MobileDrawer userAuth={this.props.userAuth} changeMode={this.props.changeMode} userInfo={this.props.userInfo}/>
        );
    }
}

export default MobileViewController;