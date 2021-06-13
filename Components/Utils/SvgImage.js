import React from 'react'; 
import {SvgXml} from 'react-native-svg'

class SvgImage extends React.Component {
 
    render() {
        return (
            <SvgXml xml={this.props.svg} width={this.props.width} height={this.props.height}/>
        );
    }
}

export default SvgImage;