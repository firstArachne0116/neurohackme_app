import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  FlatList,
  BackHandler,
  Image,
  Alert,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Button,
  ThemeProvider,
  Text,
  ListItem,
  Icon
} from 'react-native-elements';
// import { Icon } from 'native-base';
import { LinearGradient } from '../src/components/LinearGradient';
import AllStrings from './local/AllStrings';
import { images } from './assets';
import AsyncStorage from '@react-native-community/async-storage';
// import * as RNFS from 'react-native-fs';
import messaging from '@react-native-firebase/messaging';
import { Notifications, NotificationAction, NotificationCategory } from 'react-native-notifications';
import * as RNLocalize from "react-native-localize";
import memoize from "lodash.memoize";
import I18n from 'react-native-i18n';

var RNFS = require('react-native-fs');
var uploadUrl = 'http://requestb.in/XXXXXXX';
// var path = RNFS.DocumentDirectoryPath + '/test.txt';

const sessionsArraya = require('../resources/JSON/sessions.json')
const categories = require('../resources/JSON/categories.json')

var ColorDataArray = [
  "#FA4248", "#7A5EFA", "#1776A7", "#ffb176", '#7CB5EC', '#90ED7D', '#F7A25D', '#8085E9', '#F15C80', '#9c27b0', "#009688", "#cddc39", "#4caf50", "#ff9800",
  "#e65100", "#9e9e9e", "#795548", "#fff176", "#ffab91", "#8d6e63", "#76ff03", "#1B5E20", "#FFFF00", "#EC407A"
]

const ImageArrary = [
  { catTitle: "Self Hypnosis", img: require('./assets/images/category/self.jpg') },
  { catTitle: "Energyse", img: require('./assets/images/category/energize.png') },
  { catTitle: "Meditate", img: require('./assets/images/category/meditate.png') },
  { catTitle: "Brain Booster", img: require('./assets/images/category/booster.png') },
  { catTitle: "Sleep", img: require('./assets/images/category/cat.jpg') },
  { catTitle: "Feel Better", img: require('./assets/images/category/better.jpeg') }
]

const imagesIcon = {
  experimentIcon: require('../resources/images/experiment.png'),
  selfHypnoIcon: require('../resources/images/mindsEye.png'),
  energyzeIcon: require('../resources/images/lightning-icon.png'),
  meditateIcon: require('../resources/images/yogo.png'),
  boosterIcon: require('../resources/images/bbooster.png'),
  sleepIcon: require('../resources/images/sleep.png'),
  feelBetterIcon: require('../resources/images/beHappy.png'),
}

const imagesDicto = {
  "Experiment": imagesIcon.experimentIcon,
  "Hypnosis": imagesIcon.selfHypnoIcon,
  "Energize": imagesIcon.energyzeIcon,
  "Meditate": imagesIcon.meditateIcon,
  "Booster": imagesIcon.boosterIcon,
  "Sleep": imagesIcon.sleepIcon,
  "Better": imagesIcon.feelBetterIcon,
}

function newScreen(catGuid, programs, titleSession, description, sessionImage) {
  Actions.sessionsList({ catGuid: catGuid, title: titleSession, sessionItems: programs, sessionDescription: description, sessionIcon: sessionImage })
}

I18n.fallbacks = true
I18n.translations = {
  "en": require("../src/translations/en.json"),
  "es": require("../src/translations/es.json")
};

class ExploreScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      songsData: []
    };
  }

  async UNSAFE_componentWillMount() {
    await this._DownloadSong()
  }

  async componentDidMount() {
    console.log("innnnn_____");

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // remoteMessage.notification
      // console.log("unsubscribe____", unsubscribe);
      console.log("remoteMessage_____", remoteMessage);
      // console.log("JSON.stringify(remoteMessage)____", JSON.stringify(remoteMessage));

      // console.log("remoteMessage_____", remoteMessage);
      Notifications.postLocalNotification({
        body: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        // sound: 'chime.aiff',
        // category: 'SOME_CATEGORY',
        // link: 'localNotificationLink',
      });
    });

    BackHandler.addEventListener('hardwareBackPress', function () {
      const scene = Actions.currentScene;
      if (scene === 'scarlet') {
        BackHandler.exitApp()
      } else {
        Actions.pop()
      }
      return true
    });
  }

  async _DownloadSong() {
    let songData = await AsyncStorage.getItem("SongData")
    console.log("SongData____", songData);
    if (songData == null) {
      // this._DownloadSong()

      AsyncStorage.getItem("Token").then((tokenResponse) => {
        // console.log("tokenResponse_____", JSON.parse(tokenResponse))
        fetch("https://neurohack.app/api/getData", {
          method: 'GET',
          headers: {
            'Authorization': JSON.parse(tokenResponse),
          },
        })
          .then((res) => res.json())
          .then(response => {
            // console.log('Download_response_______', response)
            // if (response.code == 200) {
            // alert("calling Successfully")
            // this.setState({ songsData: response.data })
            AsyncStorage.setItem("SongData", JSON.stringify(response.data))
            alert("Downloading basic pack")

            RNFS.readDir(RNFS.DocumentDirectoryPath).then(result => {
              // console.log('DocumentDirectoryPath GOT RESULT', result);
            });

            RNFS.downloadFile({
              fromUrl: 'https://mp3files.ams3.digitaloceanspaces.com/file_example_MP3_1MG.mp3',
              toFile: `${RNFS.DocumentDirectoryPath}/file_example_MP3_1MG.mp3`,
            }).promise.then((r) => {
              this.setState({ isDone: true })
            });
          })
      })
    }
  }

  render() {
    I18n.locale = "en"

    const renderRow = ({ item, index }) => {
      console.log("itemData___", item);
      const imagearrary = ImageArrary.filter((imagearrary) => imagearrary.catTitle === item.catTitle)
      return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 5, marginVertical: 5, }}>
          <TouchableOpacity
            onPress={() => { newScreen(item.catGuid, item.programs, item.catTitle, item.catDescription, imagesDicto[item.avatar_key]) }}
            style={{ elevation: 5, backgroundColor: ColorDataArray[index], borderRadius: 5, width: '100%' }}>
            {/* <Image source={{ uri: data.img }} */}

            {/* <Image source={images.bgImage} */}
            <Image source={imagearrary[0].img}
              style={{ height: 125, width: '100%', borderTopRightRadius: 5, borderTopLeftRadius: 5, borderBottomLeftRadius: 20 }} />

            <Text style={{ marginHorizontal: 10, marginTop: 10, color: 'white', fontWeight: '700' }}>{item.catTitle}</Text>
            <Text style={{ marginHorizontal: 10, marginBottom: 10, color: 'white', fontSize: 12 }} numberOfLines={1}>{item.catDescription}</Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      // <ThemeProvider>
      <View style={styles.container} >

        <Text style={styles.header}>{I18n.t('experirnces')}</Text>
        <View style={{ marginBottom: 50, marginHorizontal: 10 }}>
          <FlatList
            numColumns={2}
            // data={sessionsArraya}
            data={categories}
            keyExtractor={a => a.catTitle}
            renderItem={renderRow}
          />
        </View>
      </View>
      // </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232E3F',
  },
  containerInline: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000000',
  },
  webContainer: {
    alignSelf: 'stretch',

  },
  loader: {
    position: "absolute",
    top: Dimensions.get('window').height / 3,
    left: Dimensions.get('window').width / 2
  },
  header: {
    color: 'white',
    // fontWeight: '700',
    fontSize: 22,
    marginVertical: 10,
    paddingLeft: 14,
    paddingRight: 14,
  }
});

export default ExploreScreen;
