import React, { Component } from 'react';
import {
    Button, Slider
} from 'react-native-elements';
import { ScrollView, View, Text, SafeAreaView, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
// import { Radio, } from 'native-base';
import AllStrings from './local/AllStrings';
import MusicDetailScreen from './MusicDetailScreen';
import I18n from 'react-native-i18n';

import Tts from "react-native-tts";
const inductionDicto = require('../resources/JSON/hypno_induction.json');
const deepeningDicto = require('../resources/JSON/hypno_deepening.json');
const hypno_defaultSessions = require('../resources/JSON/hypno_defaultSessions.json');
const subjectDicto = require('../resources/JSON/hypno_subject.json');
const endingDicto = require('../resources/JSON/hypno_ending.json');


const MusicList = [
    { name: "John (male voice)", iconName: 'waves', value: 0 },
    { name: "Laura (fmale voice)", iconName: 'camera-timer', value: 1 },
    { name: "Suzy (fmale voice)", iconName: 'headphones', value: 2 },
    { name: "Mark (male voice)", iconName: 'headphones', value: 3 }
]

type Props = {};

I18n.fallbacks = true
I18n.translations = {
    "en": require("../src/translations/en.json"),
    "es": require("../src/translations/es.json")
};

class ChooseVoiceScreen extends Component<Props>  {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            genrativeArtWebModal: false,
            HeaderTitle: '',

            voices: [],
            ttsStatus: "initiliazing",
            selectedVoice: null,
            speechRate: 0.5,
            speechPitch: 1,
            text: "Selected"
        };

        Tts.addEventListener("tts-start", event =>
            this.setState({ ttsStatus: "started" })
        );
        Tts.addEventListener("tts-finish", event =>
            this.setState({ ttsStatus: "finished" })
        );
        Tts.addEventListener("tts-cancel", event =>
            this.setState({ ttsStatus: "cancelled" })
        );
        Tts.setDefaultRate(this.state.speechRate);
        Tts.setDefaultPitch(this.state.speechPitch);
        // Tts.getInitStatus().then(this.initTts);

    }

    initTts = async () => {
        const voices = await Tts.voices();
        const availableVoices = voices
            .filter(v => !v.networkConnectionRequired && !v.notInstalled)
            .map(v => {
                console.log("v____", v);
                return { id: v.id, name: v.name, language: v.language };
            });
        let selectedVoice = null;
        if (voices && voices.length > 0) {
            selectedVoice = this.state.value == 0 || this.state.value == 3 ? voices[6].id : voices[5].id;
            try {
                await Tts.setDefaultLanguage(this.state.value == 0 || this.state.value == 3 ? voices[6].id : voices[5].language);
            } catch (err) {
                // My Samsung S9 has always this error: "Language is not supported" //1,4,
                console.log(`setDefaultLanguage error `, err);
            }
            await Tts.setDefaultVoice(this.state.value == 0 || this.state.value == 3 ? voices[6].id : voices[5].id);
            this.setState({
                voices: availableVoices,
                selectedVoice,
                ttsStatus: "initialized"
            });
        } else {
            this.setState({ ttsStatus: "initialized" });
        }
        // console.log("__voices__", this.state.voices);
    };

    async componentWillUnmount() {
        await Tts.stop();
    }
    onVoicePress = async voice => {
        await Tts.getInitStatus().then(this.initTts);

        // const voices = await Tts.voices();
        // const availableVoices = voices
        //     .filter(v => !v.networkConnectionRequired && !v.notInstalled)
        //     .map(v => {
        //         console.log("lang______1", voices);
        //         console.log("lang______2", v);
        //         console.log("lang______3", v.language);
        //         return { id: v.id, name: v.name, language: v.language };
        //     });

        // await Tts.speak(hypno_defaultSessions[0].defaultSessionName);
        await Tts.speak(this.state.text, { pitch: this.state.speechPitch, rate: this.state.speechRate });
        // await Tts.speak(this.state.text, { language: 'da-DK', pitch: this.state.speechPitch, rate: this.state.speechRate });

        // if (voice.value === 0) {
        //     await Tts.speak(hypno_defaultSessions[0].defaultSessionName);
        // } else if (voice.value === 1) {
        //     await Tts.speak(subjectDicto[0].defaultSessionName[0].subjectName);
        // }
    }

    renderItem(data, index) {
        return (
            <TouchableOpacity style={[styles.mainContain, { backgroundColor: this.state.value == index ? '#475060' : null }]}
                onPress={() => {
                    this.onVoicePress(data)
                    this.setState({ value: index, genrativeArtWebModal: true, HeaderTitle: data.name })
                }}>
                <View style={{ alignItems: 'center', flex: 0.1, justifyContent: 'center' }}>
                    <Icon name={'user'} type={'FontAwesome5'} style={{ color: this.state.value == index ? "#19E570" : 'white', fontSize: 14 }} />
                </View>

                <View style={{ alignItems: 'flex-start', flex: 0.8, }}>
                    <Text style={[styles.voiceNameText, { color: this.state.value == index ? "#19E570" : 'white' }]}>{data.name}</Text>
                </View>

                <View style={{ alignItems: 'center', flex: 0.1, }}>
                    <View style={{ borderRadius: 10, height: 20, width: 20, borderWidth: 1, borderColor: this.state.value == index ? "#19E570" : 'white', padding: 5, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => { this.state.value == item.value }}
                            style={{ padding: 5, borderRadius: 6, height: 12, width: 12, backgroundColor: this.state.value == index ? "#19E570" : 'white' }} >
                        </TouchableOpacity>
                    </View>
                    {/* <Radio
                        color={'white'}
                        selectedColor={"#19E570"}
                        selected={this.state.value == data.value} /> */}
                </View>
            </TouchableOpacity>
        )
    }

    loadEmptyView() {
        return (
            <View style={styles.emptyListView}>
                <Text style={styles.emptyText}>{I18n.t('noDataFound')}</Text>
            </View>
        );
    }

    async _close() {
        await Tts.stop();
        await this.props.onModalClose(false)
    }
    async _save() {
        await Tts.stop();
        alert(I18n.t('saveAlert'))
        // Editing Text to speech configuration on paid version
        // await this.props.onModalClose(false)
    }

    render() {
        I18n.locale = "en"
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>

                    <ScrollView>
                        <Text style={styles.header}>{I18n.t('speechVoice')}</Text>
                        <View style={{ marginHorizontal: 5, padding: 10 }}>
                            <Text style={{ color: 'white' }}>{I18n.t('speed')} : {this.state.speechRate.toFixed(2)}</Text>
                            <Slider
                                minimumTrackTintColor='#19E570'
                                maximumTrackTintColor='#D3D3D3'
                                thumbTintColor={'white'}
                                value={this.state.speechRate}
                                onValueChange={speechRate => this.setState({ speechRate })}
                            />

                            <Text style={{ color: 'white', marginTop: 5 }}>{I18n.t('pitch')} : {this.state.speechPitch.toFixed(2)}</Text>
                            <Slider
                                maximumValue={100}
                                minimumValue={0}
                                minimumTrackTintColor='#19E570'
                                maximumTrackTintColor='#D3D3D3'
                                thumbTintColor={'white'}
                                value={this.state.pi}
                                onValueChange={speechPitch => this.setState({ speechPitch })}
                            />

                        </View>
                        <View style={{ marginHorizontal: 20, marginVertical: 10, backgroundColor: '#636E80', borderRadius: 5 }}>
                            <FlatList
                                data={MusicList}
                                contentContainerStyle={styles.listContainer}
                                renderItem={({ item, index }) => this.renderItem(item, index)}
                                ListEmptyComponent={() => this.loadEmptyView()}
                            />
                        </View>
                    </ScrollView>

                    <View style={{ elevation: 5, backgroundColor: '#225371', width: '100%', position: 'absolute', bottom: 0 }}>
                        <View style={{ paddingHorizontal: 5, flexDirection: 'row', alignItems: 'center', justifyContent: "space-around", paddingVertical: 10, }}>
                            {/* <TouchableOpacity
                                onPress={() => { this._close() }}
                                style={{ width: '30%', borderRadius: 5, alignItems: 'center', justifyContent: 'center', padding: 5, flexDirection: 'row', backgroundColor: '#FA3E47' }}>
                                <Icon name={'close'} type={'AntDesign'} style={{ marginHorizontal: 5, color: 'white', fontSize: 20 }} />
                                <Text style={{ fontSize: 12, color: 'white', }}>{I18n.t('cancle')}</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity
                                onPress={() => { this._save() }}
                                style={{ width: '95%', borderRadius: 5, alignItems: 'center', justifyContent: 'center', padding: 5, flexDirection: 'row', backgroundColor: '#2FC860' }}>
                                <Icon name={'check'} type={'AntDesign'} style={{ marginHorizontal: 5, color: 'white', fontSize: 20 }} />
                                <Text style={{ fontSize: 12, color: 'white', }}>{I18n.t('saveChanges')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
        // marginTop: 70,
        color: 'white',
        fontWeight: '700',
        fontSize: 22,
        marginVertical: 10,
        paddingLeft: 14,
        paddingRight: 14,
    },
    listContainer: {
        // paddingBottom: '10%',
        // padding: 5,
        // backgroundColor: 'red'
    },
    emptyListView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 17,
    },
    mainContain: {
        // flex: 1,
        // height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        // marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    voiceNameText: {
        fontSize: 14,
        // color: 'white'
    },
    // modal style...........
    modalViewContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
    },
    modalText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '600',
        margin: 10
    },
    modalContainer: {
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
})

export default ChooseVoiceScreen