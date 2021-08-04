import React from 'react';
import { Text, View } from 'react-native';

import PDFReader from 'rn-pdf-reader-js'

const PDFRenderer = (props) => (
  
        <PDFReader
        withPinchZoom={true}
        withScroll={true}
        useGoogleReader
        customStyle={
          {readerContainerZoomContainerButton:{height:0, width:0}}
        }
        source={{
          uri: props.pdf,
        }}  
      /> 
);

export default PDFRenderer;
