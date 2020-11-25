import React, { Component } from 'react';
import { Platform, Alert, Dimensions, ActivityIndicator, View, Text, NativeModules, SafeAreaView, ScrollView, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { images } from './assets';
import { Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import {
  LoginManager, AccessToken
} from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import * as RNLocalize from "react-native-localize";
import I18n from 'react-native-i18n';
// import i18n from "i18n-js";
import memoize from "lodash.memoize";

const { RNTwitterSignIn } = NativeModules

const Constants = {
  TWITTER_COMSUMER_KEY: "F2eieVo0lwm24gkH2cw89xptI",
  TWITTER_CONSUMER_SECRET: "UplRHuONieQr2xO4x5dImP5VzWMBjphabY5EQVJPU1hfPo6VBh"
}

I18n.fallbacks = true
I18n.translations = {
  "en": require("../src/translations/en.json"),
  "es": require("../src/translations/es.json")
};

class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      loader: false,
    };
  }

  async UNSAFE_componentWillMount() {
    console.log("Profile_innnnn");
    await GoogleSignin.configure({
      //   iosClientId: '707370587885-8fgr6uhnibi9cqicnn0178dq5qaqhvr3.apps.googleusercontent.com"',
      webClientId: '707370587885-8fgr6uhnibi9cqicnn0178dq5qaqhvr3.apps.googleusercontent.com'
    })
  }

  async _logOut() {
    let TypeResponse = ""
    AsyncStorage.getItem("Type").then((typeResponse) => {
      TypeResponse = JSON.parse(typeResponse)
      console.log("TypeResponse__1111", JSON.parse(typeResponse))
    })

    Alert.alert(
      '',
      I18n.t("areYouSureToLogout"),
      [
        { text: I18n.t("no"), onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: I18n.t("yes"), onPress: () => {
            this.setState({ loader: true })
            AsyncStorage.getItem("Token").then((tokenResponse) => {
              console.log("logout_tokenResponse_____", JSON.parse(tokenResponse))
              fetch("https://neurohack.app/api/logout", {
                method: 'GET',
                headers: {
                  'Authorization': JSON.parse(tokenResponse),
                },
              })
                .then((res) => res.json())
                .then(response => {
                  console.log('Logout_response_______', response)
                  console.log("TypeResponse_______", TypeResponse)
                  auth().signOut()
                  // if (response.code == 200) {
                  if (TypeResponse == "facebook.com") {
                    LoginManager.logOut()
                    AsyncStorage.removeItem('Token'),
                      AsyncStorage.removeItem('SongData'),
                      Actions.welcomeScreen()
                    this.setState({ loader: false })
                    console.log("facebook_Done_Logout");
                  } else if (TypeResponse == "twitter.com") {
                    RNTwitterSignIn.logOut()
                    AsyncStorage.removeItem('Token'),
                      AsyncStorage.removeItem('SongData'),
                      Actions.welcomeScreen()
                    this.setState({ loader: false })
                    console.log("Twitter_Done_Logout");
                  } else if (TypeResponse == "google.com") {
                    GoogleSignin.signOut()
                    AsyncStorage.removeItem('Token'),
                      AsyncStorage.removeItem('SongData'),
                      Actions.welcomeScreen()
                    this.setState({ loader: false })
                    console.log("Twitter_Done_Logout");
                  }
                  else {
                    AsyncStorage.removeItem('Token'),
                      AsyncStorage.removeItem('SongData'),
                      Actions.welcomeScreen()
                    this.setState({ loader: false })
                    console.log("Done_Logout");
                  }
                  // } else if (response.success == false) {
                  //   alert(response.msg)
                  // } else {
                  //   alert('Somthing worng, please try later')
                  // }
                })
            })
          }
        },
      ],
      { cancelable: false }
    )
  }

  render() {
    I18n.locale = "en"
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>

          <ScrollView>

            <View style={styles.mainView}>
              <Image
                source={images.ribon}
                resizeMode='contain'
                style={{ alignSelf: 'center', position: 'absolute', top: -60 }} />
              <View style={styles.cardMainViewStyle}>

                <View style={styles.cardViewStyle}>
                  <Icon name={'shield'} type={'Feather'}
                    style={styles.cardIconStyle} />
                  {/* <Text style={styles.cardTitleText}> Easy </Text> */}
                  {/* <Text style={styles.cardTitleText}> {translate("easy")} </Text> */}
                  <Text style={styles.cardTitleText}> {I18n.t('easy')} </Text>
                  <Text style={styles.cardDetailText}> {I18n.t("current")} {'\n'} {I18n.t("level")} </Text>
                  {/* <Text style={styles.cardDetailText}> {translate("current")} {'\n'} {translate("level")} </Text> */}
                </View>

                <View style={styles.cardViewStyle}>
                  <Icon name={'stopwatch'} type={'Entypo'}
                    style={styles.cardIconStyle} />
                  <Text style={styles.cardTitleText}> 27 </Text>
                  <Text style={styles.cardDetailText}> {I18n.t("mindful")} {'\n'} {I18n.t("minutes")} </Text>
                </View>

                <View style={styles.cardViewStyle}>
                  <Icon name={'calendar'} type={'Feather'}
                    style={styles.cardIconStyle} />
                  <Text style={styles.cardTitleText}> 12 days </Text>
                  <Text style={styles.cardDetailText}> {I18n.t("longest")} {'\n'} {I18n.t("streak")} </Text>
                </View>

              </View>

              <TouchableOpacity
                onPress={() => { }}
                style={styles.touchStyle}>
                <Icon name={'sharealt'} type={'AntDesign'}
                  style={styles.touchIcon} />
                <Text style={styles.touchText}>{I18n.t("shareTofriends")}</Text>
              </TouchableOpacity>

            </View>

            {/* <TouchableOpacity disabled style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }}>
              <Icon name={'clipboard-check-outline'} type={'MaterialCommunityIcons'}
                style={[styles.cardIconStyle, { fontSize: 18 }]} />
              <Text style={{
                fontSize: 12,
                color: 'white',
              }}> Calendar {'&'} History</Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => { Actions.suggestion() }} style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }}>
              <Icon name={'calendar'} type={'Feather'}
                style={[styles.cardIconStyle, { fontSize: 18 }]} />
              <Text style={{ fontSize: 12, color: 'white', }}> {I18n.t("appSurvey")}</Text>
            </TouchableOpacity>

          </ScrollView>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>V1.1</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-around", marginBottom: 10, }}>
            <TouchableOpacity
              onPress={() => { this._logOut() }}
              style={{ width: '90%', borderRadius: 5, alignItems: 'center', justifyContent: 'center', padding: 7, flexDirection: 'row', backgroundColor: '#FA3E47' }}>
              <Icon name={'logout'} type={'SimpleLineIcons'} style={{ marginHorizontal: 5, color: 'white', fontSize: 20 }} />
              <Text style={{ fontSize: 12, color: 'white', }}>{I18n.t("logOut")}</Text>
            </TouchableOpacity>
          </View>

        </View>
        {
          this.state.loader && (
            <ActivityIndicator
              style={styles.loader}
              size="large"
            />
          )
        }
      </SafeAreaView >
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
    fontWeight: '700',
    marginVertical: 10,
    paddingLeft: 14,
    paddingRight: 14,
  },
  mainView: {
    marginTop: 70,
    backgroundColor: '#343F4F',
    borderRadius: 5,
    marginHorizontal: 15,
    borderWidth: 0.3,
    borderColor: 'white'
  },
  cardMainViewStyle: {
    marginHorizontal: 15,
    marginTop: 55,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  cardViewStyle: {
    alignItems: 'center'
  },
  cardIconStyle: {
    marginHorizontal: 5,
    color: 'white',
    fontSize: 14
  },
  cardTitleText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700'
  },
  cardDetailText: {
    textAlign: 'center',
    fontSize: 10,
    color: '#878F9A',
    fontWeight: '700'
  },
  touchStyle: {
    elevation: 3,
    margin: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#2FC860'
  },
  touchIcon: {
    marginHorizontal: 5,
    color: 'white',
    fontSize: 18
  },
  touchText: {
    fontSize: 10,
    color: 'white',
  },
  loader: {
    position: "absolute",
    top: Dimensions.get('window').height / 3,
    left: Dimensions.get('window').width / 2
  },
  iconStyle: {
    marginLeft: 10,
    height: '40%',
    width: '40%',
  },

});

export default ProfileScreen;
