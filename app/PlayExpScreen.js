import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  Image,
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
import AllStrings from './local/AllStrings';
import { images } from './assets';
import Tts from "react-native-tts";
import { WebView } from 'react-native-webview';
// import '../config/global.js'
import TrackPlayer, { usePlaybackState } from "react-native-track-player";
import localTrack from "./assets/songs/medita.mp3";
import I18n from 'react-native-i18n';

var RNFS = require('react-native-fs');

const hypno_induction = require('../resources/JSON/hypno_induction.json');
let len = hypno_induction.length;
var RandomNumber = Math.floor(Math.random() * len) + 1;
let tts_speak_induction = hypno_induction[RandomNumber].inductionText

const deepeningDicto = require('../resources/JSON/hypno_deepening.json');
let lenDeepen = deepeningDicto.length;
var RandomNumberDeepen = Math.floor(Math.random() * lenDeepen) + 1;
let tts_speak_Deepen = deepeningDicto[RandomNumberDeepen].deepText

const hypno_defaultSessions = require('../resources/JSON/hypno_defaultSessions.json');

const subjectDicto = require('../resources/JSON/hypno_subject.json');
const hypno_script = require('../resources/JSON/hypno_script.json');

const endingDicto = require('../resources/JSON/hypno_ending.json');
let lenEnding = endingDicto.length;
var RandomNumberEnding = Math.floor(Math.random() * lenEnding) + 1;
let tts_speak_Ending = endingDicto[RandomNumberEnding].endingText

const HTML_iOS = require('../resources/nanoliner.html');
const isAndroid = Platform.OS === 'android';
var HTML_android;
var webView, props;

I18n.fallbacks = true
I18n.translations = {
  "en": require("../src/translations/en.json"),
  "es": require("../src/translations/es.json")
};

class PlayExpScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      voices: [],
      ttsStatus: "initiliazing",
      selectedVoice: "com.apple.ttsbundle.siri_female_en-AU_compact",
      speechRate: 0.4,
      speechPitch: 1,
      text: "",
      visible: true,
      // step: ScriptStepEnum.intro
      // loopingSound: undefined,
      tests: {},
      isDisableStop: true
    };
    // console.log("PlayExpScreen_PlayExpScreen___________")
    // this.onVoicePress()

  }

  componentDidMount() {
    // RNFS.readDir(RNFS.DocumentDirectoryPath).then(result => {
    //   console.log('DocumentDirectoryPath GOT RESULT', result);

    //   let arr = result.filter(this._getSongdata(result))
    // });

    HTML_android = 'file:///android_asset/nano2.html'
  }


  async _getSongdata(Item) {
    var data = Item[Item.length - 1]
    console.log("item__", data.name);
    console.log('splite', data.name.slice((0, -4)))
    var songs = Item.filter((item, index) => {
      if (item.name.slice((0, -4)) == '.mp3')
        return item
    })
    console.log('SOngs', songs)

    await TrackPlayer.play();
    await TrackPlayer.add({
      // id: "local-track",
      url: songs[1].path,
      // title: "Pure (Demo)",
      // artist: "David Chavez",
      // artwork: "https://i.picsum.photos/id/500/200/200.jpg",
      // duration: 28
    });
  }

  componentWillUnmount() {
    Tts.stop();
    TrackPlayer.stop();
  }

  _close() {
    Tts.stop();
    TrackPlayer.stop();
    const jacinto = {
      "leftEarFreq": 0,
      "rightEarFreq": 0,
      "switchBlink": false,
      "lightFreq": 0
    }
    console.log("close_jacinto____________", jacinto)
    var myJSON = JSON.stringify(jacinto);
    this.webView.postMessage(myJSON);

    this.props.onModalCloseP_PlayExpModal(false)
  }

  hideSpinner() {
    this.setState({ visible: false });
    this.onVoicePress()
  }

  async _PlayMp3() {
    TrackPlayer.updateOptions({
      stopWithApp: true
    });
    console.log("success__");

    await TrackPlayer.play();
    await TrackPlayer.add({
      // id: "local-track",
      url: localTrack,
      // title: "Pure (Demo)",
      // artist: "David Chavez",
      // artwork: "https://i.picsum.photos/id/500/200/200.jpg",
      // duration: 28
    });

  }

  onVoicePress = async voice => {
    // console.log("hypno_script____", hypno_script);
    console.log("this.props.sessionItem_____New", this.props.sessionItem);

    Tts.stop();
    // await Tts.speak(hypno_defaultSessions[0].steps[0].text);
    // console.log("programGuid_____", this.props.sessionItem.sessionItem.programGuid);
    // console.log("programStructure______", this.props.sessionItem.sessionItem.programStructure);
    // console.log("len___", len);
    // console.log("RandomNumber____", RandomNumber);

    // console.log("induction____", induction);
    //  this.props.sessionItem.sessionItem.programGuid 
    var tts_speak_Subject = ''

    hypno_script.map((item) => {
      console.log("item____>>>", item);
      console.log("this.props.sessionItem.sessionItem.programGuid>>>", this.props.sessionItem.sessionItem.programGuid);
      // console.log("condition___", item.subjectGuid == this.props.sessionItem.sessionItem.programGuid);
      if (item.subjectGuid == this.props.sessionItem.sessionItem.programGuid) {
        var _data = item.scriptext
        console.log('data_', _data);
        // _sl.push(_data)
        tts_speak_Subject = _data
      }
    })
    console.log('tts_speak_induction_____', tts_speak_induction);

    // console.log("lenDeepen___", lenDeepen);
    // console.log("RandomNumberDeepen______", RandomNumberDeepen);
    console.log("tts_speak_Deepen______", tts_speak_Deepen);

    // console.log("lenEnding___", lenEnding);
    // console.log("RandomNumberEnding____", RandomNumberEnding);
    console.log("tts_speak_Ending_____", tts_speak_Ending);



    // console.log('tts_speak_Deepen_____', tts_speak_Deepen);
    console.log('tts_speak____', tts_speak_Subject);
    // console.log('tts_speak_Ending_____', tts_speak_Ending);


    console.log('timer__', this.props.sessionItem.sessionItem.programStructure.subject.time_minutes);

    // await Tts.speak(hypno_script[0].steps[0].text);
    // console.log('timer__', this.props.sessionItem.sessionItem.programStructure.subject.time_minutes * 60000);
    if (this.props.sessionItem.sessionItem.programStructure.hasScript == true) {
      await Tts.speak(tts_speak_induction, { pitch: 1, rate: 0.4 });
      await Tts.speak(tts_speak_Deepen, { pitch: 1, rate: 0.4 });
      await Tts.speak(tts_speak_Subject, { pitch: 1, rate: 0.4 });
      await Tts.speak(tts_speak_Ending, { pitch: 1, rate: 0.4 });
    } else if (this.props.sessionItem.sessionItem.programStructure.hasScript == false) {
      setTimeout(() => {
        this._close()
      }, this.props.sessionItem.sessionItem.programStructure.subject.time_minutes * 60000);
    }

    const jacinto = {
      // "leftEarFreq": this.props.leftFreqValue != 250 ? Number(this.props.leftFreqValue) : this.props.sessionItem.sessionItem.leftEarFreq,
      // "rightEarFreq": this.props.rightFreqValue != 250 ? Number(this.props.rightFreqValue) : this.props.sessionItem.sessionItem.rightEarFreq,
      "leftEarFreq": this.props.leftFreqValue ? Number(this.props.leftFreqValue) : this.props.sessionItem.sessionItem.programStructure.subject.leftEarFreq,
      "rightEarFreq": this.props.rightFreqValue ? Number(this.props.rightFreqValue) : this.props.sessionItem.sessionItem.programStructure.subject.rightEarFreq,
      "switchBlink": this.props.switchBlink,
      "lightFreq": this.props.sessionItem.sessionItem.programStructure.subject.frequency

      // static........
      // "leftEarFreq": 240,
      // "lightFreq": 14,
      // "rightEarFreq": 254,
      // "switchBlink": true,
    }
    console.log("jacinto____________", jacinto)

    var myJSON = JSON.stringify(jacinto);
    this.webView.postMessage(myJSON);

    this._PlayMp3()
  };

  render() {
    I18n.locale = "en"
    return (
      <View style={styles.container}>
        <View style={{ paddingTop: 10, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)', flexDirection: 'row' }}>
          <View style={{ width: '70%', justifyContent: 'flex-end', padding: 10, }}>
            <Text style={styles.header}>{this.props.sessionItem.sessionItem.title}</Text>
            <Text style={styles.header}>{this.props.sessionItem.sessionItem.subtitle_2}</Text>
          </View>
          <View style={{ width: '30%', justifyContent: 'flex-end', alignItems: 'flex-end', padding: 10, }}>
            <Text style={[styles.header, { fontSize: 13 }]}>{this.props.sessionItem.sessionItem.duration}min</Text>
            {console.log("this.props.sessionItem>>>>", this.props.sessionItem)}
            <Text style={[styles.header, { fontSize: 13 }]}>{this.props.sessionItem.sessionItem.programStructure.subject.frequency}Hz</Text>
          </View>
        </View>

        <WebView
          onLoad={() => this.hideSpinner()}
          ref={(webView) => this.webView = webView}
          originWhitelist={['*']}
          style={styles.webContainer}
          source={
            console.log("genrativeArt___", this.props.genrativeArt),
            this.props.genrativeArt == true ?
              // { uri: 'http://192.168.0.103:9966/' }
              { uri: 'http://178.128.215.126:9966/' }
              :
              isAndroid ? { uri: HTML_android } : HTML_iOS}
        />

        {/* <WebView
          onLoad={() => this.hideSpinner()}
          ref={(webView) => this.webView = webView}
          originWhitelist={['*']}
          style={styles.webContainer}
          source={
            this.props.genrativeArt == true ?
              { uri: 'http://192.168.0.103:9966/'}
              :
              isAndroid ? { uri: HTML_android } : HTML_iOS}
        /> */}

        {/* <TouchableOpacity onPress={() => { this._close() }} style={{ width: '100%', position: 'absolute', bottom: 50, alignItems: 'center', backgroundColor: 'red' }}>
          <Text style={styles.header}>{AllStrings.SessionDetail.stopSession}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => { this._close() }} style={{ width: '100%', position: 'absolute', bottom: 0, alignItems: 'center', backgroundColor: 'red' }}>
          <Text style={[styles.header, { paddingVertical: 15 }]}>{I18n.t('stopSession')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  webContainer: {
    height: '100%',
    width: '100%',
    // flex: 1,
    alignSelf: 'stretch',
    color: 'yellow',
  },
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
    fontSize: 18,
  }
});

export default PlayExpScreen;
