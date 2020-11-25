import React, { Component } from 'react';
import {
    Button,
} from 'react-native-elements';
import { View, Text, StyleSheet, Dimensions, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Tts from "react-native-tts";
import { WebView } from 'react-native-webview';
// import '../config/global.js'
import TrackPlayer, { usePlaybackState } from "react-native-track-player";
import localTrack from "./assets/songs/medita.mp3";

// import sound from 'react-native-sound';
// var Sound = require('react-native-sound');
// Sound.setCategory('Playback');

// import RNFetchBlob from 'rn-fetch-blob';
// var RNFS = require('react-native-fs');
// var whoosh;

const inductionDicto = require('../resources/JSON/hypno_induction.json');
const deepeningDicto = require('../resources/JSON/hypno_deepening.json');
const hypno_defaultSessions = require('../resources/JSON/hypno_defaultSessions.json');

const subjectDicto = require('../resources/JSON/hypno_subject.json');
const endingDicto = require('../resources/JSON/hypno_ending.json');

const HTML_iOS = require('../resources/nanoliner.html');
const isAndroid = Platform.OS === 'android';
var HTML_android;
var webView, props;

// const ScriptStepEnum = Object.freeze({
//     "intro": 1,
//     "induction": 2,
//     "deepen": 3,
//     "subject": 4,
//     "ending": 5
// })

type Props = {};

// function stepPosition() {
//     console.log("finished")
// }
console.log("global.blinkScreen_iOS___" + global.blinkScreen_iOS)

class HypnosisScreen extends Component<Props>  {

    //the state of the class!
    // state = {
    //     voices: [],
    //     ttsStatus: "initiliazing",
    //     selectedVoice: "com.apple.ttsbundle.siri_female_en-AU_compact",
    //     speechRate: 0.5,
    //     speechPitch: 1,
    //     text: "",
    //     // step: ScriptStepEnum.intro
    // };

    //what is passed to it!
    constructor(props) {
        super(props);

        this.state = {
            voices: [],
            ttsStatus: "initiliazing",
            selectedVoice: "com.apple.ttsbundle.siri_female_en-AU_compact",
            speechRate: 0.5,
            speechPitch: 1,
            text: "",
            visible: true,
            // step: ScriptStepEnum.intro
            loopingSound: undefined,
            tests: {},
            isDisableStop: true
        };
        this.webView = null;
        // Sound.setCategory('Playback', true); // true = mixWithOthers

        // Special case for stopping
        // this.stopSoundLooped = () => {
        //     if (!this.state.loopingSound) {
        //         return;
        //     }

        //     this.state.loopingSound.stop().release();
        //     this.setState({ loopingSound: null, tests: { ...this.state.tests, ['mp3 in bundle (looped)']: 'win' } });
        // };
    }

    //nota el uso de setState, manipula estado
    // entonces, si manipulo estado, como se mantiene pura?

    async componentWillMount() {
        Tts.addEventListener("tts-start", event =>
            console.log("started"),
            this.setState({ ttsStatus: "started" })
        );
        Tts.addEventListener("tts-finish", event =>
            console.log("se fini"),

            // console.log("finished samu:" + this.ScriptStepEnum.intro),
            this.setState({ ttsStatus: "finished" })
        );
        Tts.addEventListener("tts-cancel", event =>
            console.log("cancelled"),
            this.setState({ ttsStatus: "cancelled" })
        );
        Tts.setDefaultRate(this.state.speechRate);
        Tts.setDefaultPitch(this.state.speechPitch);
        Tts.getInitStatus().then(this.initTts);
        this.state = {
        };

        // stopTTS = () => {
        //     console.log("cali");
        //   }
    }

    componentDidMount() {
        console.log("______item_________", this.props.item)
        HTML_android = 'file:///android_asset/nano2.html'
    }

    componentWillUnmount() {

        Tts.stop();
        TrackPlayer.stop();
        // {
        //     whoosh != undefined
        //     whoosh.pause();
        // }
        Tts.removeEventListener("tts-start", event =>
            console.log("removed")

        );
        Tts.removeEventListener("tts-finish", event =>
            console.log("finished samu:" + this.state.speechPitch),
        );
        Tts.removeEventListener("tts-cancel", event =>
            console.log("cancelled")
        );

    }

    aa() {
        console.log("hagale")
    }

    //   INITALO
    initTts = async () => {
        const voices = await Tts.voices();
        console.log("*** **** ** *voices")
        // console.log(voices)
        //filter only english ones for the moment!

        const availableVoices = voices
            .filter(v => !v.networkConnectionRequired &&
                !v.notInstalled && v.language.startsWith('en'))
            .map(v => {
                return { id: v.id, name: v.name, language: v.language };
            });
        let selectedVoice = null;
        if (voices && voices.length > 0) {
            selectedVoice = voices[0].id;
            try {
                await Tts.setDefaultLanguage(voices[0].language);
            } catch (err) {
                // My Samsung S9 has always this error: "Language is not supported"
                console.log(`setDefaultLanguage error `, err);
            }
            await Tts.setDefaultVoice(availableVoices[0].id);
            this.setState({
                voices: availableVoices,
                selectedVoice,
                ttsStatus: "initialized"
            });
        } else {
            this.setState({ ttsStatus: "initialized" });
        }

        ///


        try {
            await Tts.setDefaultLanguage("en-AU");
        } catch (err) {
            // My Samsung S9 has always this error: "Language is not supported"
            console.log(`setDefaultLanguage error `, err);
        }
        //   await Tts.setDefaultVoice("com.apple.ttsbundle.siri_female_en-AU_compact");
        //   this.setState({ selectedVoice: voice.id });


    };

    readText = async () => {
        Tts.stop();
        Tts.speak(this.state.text);
    };

    setSpeechRate = async rate => {
        await Tts.setDefaultRate(rate);
        this.setState({ speechRate: rate });
    };

    setSpeechPitch = async rate => {
        await Tts.setDefaultPitch(rate);
        this.setState({ speechPitch: rate });
    };

    hideSpinner() {
        this.setState({ visible: false });
    }

    async _PlayMp3() {
        //    ===============================================
        TrackPlayer.updateOptions({
            stopWithApp: true
        });

        await TrackPlayer.play();
        await TrackPlayer.add({
            // id: "local-track",
            url: localTrack,
            // title: "Pure (Demo)",
            // artist: "David Chavez",
            // artwork: "https://i.picsum.photos/id/500/200/200.jpg",
            // duration: 28
        });
        //    ===============================================


        // whoosh = new Sound('medita.mp3', Sound.MAIN_BUNDLE, (error) => {
        //     if (error) {
        //         console.log('failed to load the sound', error);
        //         return;
        //     }
        //     // loaded successfully
        //     console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

        //     // Play the sound with an onEnd callback
        //     whoosh.play((success) => {
        //         if (success) {
        //             console.log('successfully finished playing');
        //         } else {
        //             console.log('playback failed due to audio decoding errors');
        //         }
        //     });
        // });
    }

    stopSession = () => {
        Tts.stop();
        TrackPlayer.stop();
        // {
        //     whoosh != undefined
        //     whoosh.stop(() => { console.log("Close") })
        // }
        if (this.props && this.props.onModalClose) {
            console.log("innnn_Clode");
            this.props.onModalClose(false)
        }
    }

    onVoicePress = async voice => {
        console.log("this.props.hypnosis_____New", this.props);

        Tts.stop();
        // Tts.speak(inductionDicto[0].inductionText);
        await Tts.speak(hypno_defaultSessions[0].steps[0].text);

        const jacinto = {
            // Old.....
            // "leftEarFreq": this.props.item.leftEarFreq,
            // "rightEarFreq": this.props.item.rightEarFreq,
            // "switchBlink": this.props.switchBlink,
            // "lightFreq": this.props.item.freqHz

            // New.....
            "leftEarFreq": this.props.sessionItem.sessionItem.leftEarFreq,
            "rightEarFreq": this.props.sessionItem.sessionItem.rightEarFreq,
            "switchBlink": this.props.switchBlink,
            "lightFreq": this.props.sessionItem.sessionItem.freqHz
        }

        console.log("jacinto____________", jacinto)
        var myJSON = JSON.stringify(jacinto);
        this.webView.postMessage(myJSON);

        this._PlayMp3()
    };

    stopTTS = () => {
        Tts.stop();
        TrackPlayer.stop();
        // {
        //     whoosh != undefined
        //     whoosh.pause();
        // }
        // if (this.props && this.props.onModalClose) {
        //     console.log("innnn_stop");
        //     this.props.onModalClose(false)
        // }
        const jacinto = {

            "leftEarFreq": 0,
            "rightEarFreq": 0,
            "switchBlink": false,
            "lightFreq": 0
        }

        console.log("jacinto____________", jacinto)
        var myJSON = JSON.stringify(jacinto);
        this.webView.postMessage(myJSON);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginTop: 5, alignItems: 'center' }}>
                    <Text> HypnosisScreen </Text>
                    <Button
                        title="Close"
                        buttonStyle={{
                            backgroundColor: 'red',
                            borderWidth: 2,
                            borderColor: 'white',
                            borderRadius: 30,
                        }}
                        containerStyle={{ marginVertical: 5, width: '90%' }}
                        titleStyle={{ fontWeight: 'bold' }}
                        onPress={() => this.stopSession()}
                    />
                    <Button
                        title="Play"
                        buttonStyle={{
                            backgroundColor: 'blue',
                            borderWidth: 2,
                            borderColor: 'white',
                            borderRadius: 30
                        }}

                        containerStyle={{ marginVertical: 5, width: '90%' }}
                        titleStyle={{ fontWeight: 'bold' }}
                        onPress={() => this.onVoicePress()}
                    />

                    <Button
                        title="Stop"
                        buttonStyle={{
                            backgroundColor: 'orange',
                            borderWidth: 2,
                            borderColor: 'white',
                            borderRadius: 30
                        }}
                        disabled={this.state.isDisableStop}
                        // disabled
                        containerStyle={{ marginVertical: 5, width: '90%' }}
                        titleStyle={{ fontWeight: 'bold' }}
                        onPress={() => this.stopTTS()}
                    />
                </View>
                <WebView
                    onLoad={() => this.hideSpinner()}
                    ref={(webView) => this.webView = webView}
                    originWhitelist={['*']}
                    style={styles.webContainer}
                    source={isAndroid ? { uri: HTML_android } : HTML_iOS}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    webContainer: {
        flex: 1,
        alignSelf: 'stretch',
        color: '#FF0000',
    },
    loader: {
        position: "absolute",
        top: Dimensions.get('window').height / 3,
        left: Dimensions.get('window').width / 2
    }, button: {
        fontSize: 20,
        backgroundColor: 'rgba(220,220,220,1)',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(80,80,80,0.5)',
        overflow: 'hidden',
        padding: 7,
    },
    header: {
        textAlign: 'left',
    },
    feature: {
        flexDirection: 'row',
        padding: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgb(180,180,180)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(230,230,230)',
    },
});

export default HypnosisScreen