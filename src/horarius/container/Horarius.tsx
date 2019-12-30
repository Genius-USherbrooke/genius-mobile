import React, { Component } from 'react';
import { WebView } from "react-native-webview";

export default class Horarius extends Component {
  render() {
    return <WebView
      source={{uri: 'https://www.gel.usherbrooke.ca/horarius/'}}
      style={{marginTop: 20}}
    />;
  }
}