import React, { Component } from 'react';
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AllStrings from './local/AllStrings';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from 'react-native-i18n';
// import Api from './services/AppApi'

I18n.fallbacks = true
I18n.translations = {
  "en": require("../src/translations/en.json"),
  "es": require("../src/translations/es.json")
};

class Suggestion extends Component {

  // const webviewSource = Image.resolveAssetSource(source);
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      suggestionOne: '',
      suggestionTwo: '',
      suggestionThree: '',
      loader: false

    };
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  _success() {
    Alert.alert(
      "",
      "Thanks for your suggestion on how to make the neurohack app better.",
      [
        {
          text: "OK", onPress: () => {
            console.log("OK Pressed"),
              // Actions.pop(),
              alert("S U C C E S S")
            this.setState({ loader: false })
          }
        }
      ],
      { cancelable: false }
    );
  }

  _Submit() {
    // console.log("suggestion:", this.state.suggestion);
    if (this.state.suggestionOne == '') {
      alert(I18n.t('pleaseFillAllAnswer'))
    } else if (this.state.suggestionTwo == '') {
      alert(I18n.t('pleaseFillAllAnswer'))
    } else if (this.state.suggestionThree == '') {
      alert(I18n.t('pleaseFillAllAnswer'))
    } else {

      this.setState({ loader: true })
      // Alert.alert(
      //   // "Alert Title",
      //   "Thanks for your suggestion on how to make the neurohack app better.",
      //   [
      //     { text: "OK", onPress: () => console.log("OK Pressed") }
      //   ],
      //   { cancelable: false }
      // );
      AsyncStorage.getItem("Token").then((tokenResponse) => {
        console.log("tokenResponse_____", JSON.parse(tokenResponse))
        let details = {
          'question_1': this.state.suggestionOne,
          'question_2': this.state.suggestionTwo,
          'question_3': this.state.suggestionThree
        };

        console.log("login_Details_________:", details);
        let formBody = [];
        for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        console.log("formbody____", formBody);

        fetch("https://neurohack.app/api/feedback", {
          method: 'POST',
          body: formBody,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(tokenResponse),
          },
        })
          .then((res) => res.json())
          .then(response => {
            console.log('+++++++++++++feedback_response++++++++++++++', response)
            // if (response.code == 200) {
            // alert("feedback done Successfully")
            this._success()
            // Alert("Thanks for your suggestion on how to make the neurohack app better.")
            // Actions.pop()
            // this.setState({ loader: false })
            // } else if (response.success == false) {
            //   alert(response.msg)
            // } else {
            //   alert('Somthing worng, please try later')
            // }
          })
      })
    }
  }


  render() {
    I18n.locale = "en"
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container} >
          <Text style={styles.header}>{I18n.t('suggestion')}</Text>
          <ScrollView>

            <View style={styles.textInputView}>
              <Text style={{ color: 'white' }}>{I18n.t('questionOne')}</Text>
              <TextInput
                placeholder={I18n.t('enterSuggestion')} placeholderTextColor='gray'
                style={styles.textInput}
                onChangeText={text => { this.setState({ suggestionOne: text }) }}
                value={this.state.suggestionOne}
              />
            </View>
            <View style={styles.textInputView}>
              <Text style={{ color: 'white' }}>{I18n.t('questionTwo')}</Text>
              <TextInput
                placeholder={I18n.t('enterSuggestion')} placeholderTextColor='gray'
                style={styles.textInput}
                onChangeText={text => { this.setState({ suggestionTwo: text }) }}
                value={this.state.suggestionTwo}
              />
            </View>
            <View style={styles.textInputView}>
              <Text style={{ color: 'white' }}>{I18n.t('questionThree')}</Text>
              <TextInput
                placeholder={I18n.t('enterSuggestion')} placeholderTextColor='gray'
                style={styles.textInput}
                onChangeText={text => { this.setState({ suggestionThree: text }) }}
                value={this.state.suggestionThree}
              />
            </View>

            <View style={styles.submitView}>
              <TouchableOpacity
                onPress={() => { this._Submit() }}
                style={styles.submitTouch}>
                <Text style={styles.submitText}>{I18n.t('submit')}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          {/* <WebView
          onLoad={() => this.hideSpinner()}
          style={{ flex: 1 }}
          source={{ uri: 'https://docs.google.com/forms/d/e/1FAIpQLScRT7J6gBbA61kwM0NPu73-3ndkwsxXaHY40zcYcn191PPESg/viewform?usp=sf_link' }}
        />
        {this.state.visible && (
          <ActivityIndicator
            style={styles.loader}
            size="large"
          />
        )} */}
          {this.state.loader && (
            <ActivityIndicator
              style={styles.loader}
              size="large"
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232E3F',
  },
  header: {
    color: 'white',
    // fontWeight: '700',
    fontSize: 22,
    marginVertical: 10,
    paddingLeft: 14,
    paddingRight: 14,
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
  },
  textInputView: {
    // alignItems: 'center',
    margin: 15,
    // justifyContent: 'space-around',
    // flexDirection: 'row',
    // margin: 5
  },
  textInput: {
    height: 20,
    fontSize: 12,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 3,
    padding: 2,
    marginTop: 5,
    color: "white"
  },
  submitView: {
    alignItems: 'center'
  },
  submitTouch: {
    elevation: 3,
    backgroundColor: '#5a85e3',
    paddingHorizontal: '40%',
    paddingVertical: 12,
    borderRadius: 30,
  },
  submitText: {
    color: 'white',
    fontSize: 16
  },
  loader: {
    position: "absolute",
    top: Dimensions.get('window').height / 3,
    left: Dimensions.get('window').width / 2
  },

});

export default Suggestion;
