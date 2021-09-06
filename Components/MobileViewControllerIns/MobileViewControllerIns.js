import React from 'react';
import { Text } from 'react-native';
import MobileDrawerIns from '../MobileDrawerIns/MobileDrawerIns'
class MobileViewControllerIns extends React.Component {
    state = {  }
    render() {
        return (
            <MobileDrawerIns changeMode={this.props.changeMode} insAuth={this.props.insAuth} institute={this.props.institute}/>
        );
    }
}

export default MobileViewControllerIns;