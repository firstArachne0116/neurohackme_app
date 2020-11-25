import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Actions } from 'react-native-router-flux';

class InfoDetailWebViewScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <View style={styles.container}>

        <WebView
          onLoad={() => this.hideSpinner()}
          style={{ flex: 1 }}
          source={{ uri: 'http://neurohack.me/index.php/what-is-a-neurohack/' }}
        />
        {this.state.visible && (
          <ActivityIndicator
            style={styles.loader}
            size="large"
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  webContainer: {
    alignSelf: 'stretch',
  },
  loader: {
    position: "absolute",
    top: Dimensions.get('window').height / 3,
    left: Dimensions.get('window').width / 2
  }
});

export default InfoDetailWebViewScreen;

