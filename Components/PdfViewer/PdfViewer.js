import * as React from 'react'
import { View } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'

export default class App extends React.Component {
  render() {
      console.log(this.props.route.params)
    return (
      <PDFReader
        source={{
          uri: this.props.route.params.pdf,
        }}
      />
    )
  }
}