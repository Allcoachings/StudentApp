import React from 'react';
import { Text } from 'react-native';
import MobileDrawerIns from '../MobileDrawerIns/MobileDrawerIns'
class MobileViewControllerIns extends React.Component {
    state = {  }
    render() {
        return (
            <MobileDrawerIns insAuth={this.props.insAuth}/>
        );
    }
}

export default MobileViewControllerIns;