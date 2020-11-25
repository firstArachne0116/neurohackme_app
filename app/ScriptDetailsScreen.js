import React, { Component } from 'react';
import {
    Button, Slider
} from 'react-native-elements';
import { ScrollView, View, Alert, Text, SafeAreaView, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import { Radio, } from 'native-base';
import AllStrings from './local/AllStrings';
import MusicDetailScreen from './MusicDetailScreen'
import ChooseVoiceScreen from './ChooseVoiceScreen';
import Tts from "react-native-tts";
import I18n from 'react-native-i18n';

const hypno_programs = require('../resources/JSON/hypno_programs.json')
let ProgramStructure = hypno_programs[0].programStructure;
console.log("ProgramStructure____", ProgramStructure);

const hypno_induction = require('../resources/JSON/hypno_induction.json')
let induction = hypno_induction[0]
console.log("induction____", induction);

const hypno_deepening = require('../resources/JSON/hypno_deepening.json')
let deeping = hypno_deepening[0]
console.log("deeping____", deeping);

const hypno_subject = require('../resources/JSON/hypno_subject.json')
let subject = hypno_subject[0].defaultSessionName[0]
console.log("subject____", subject);

const hypno_ending = require('../resources/JSON/hypno_ending.json')
let ending = hypno_ending[0]
console.log("ending____", ending);

type Props = {};


I18n.fallbacks = true
I18n.translations = {
    "en": require("../src/translations/en.json"),
    "es": require("../src/translations/es.json")
};

class ScriptDetailsScreen extends Component<Props>  {
    constructor(props) {
        super(props);

        this.state = {
            chooseSongModal: false,
            speechRate: 0.4,
            speechPitch: 1,
            // Guid: this.props.DeepeningGuid ? this.props.DeepeningGuid : " "
        };
        console.log("props>>>>>>>>", this.props);
        // console.log("props1111", this.props.GetGuid);
        // console.log("props2222", subject.subjectGuid);
        // console.log("props3333", subject);
    }

    async _read() {

        await Tts.getInitStatus().then(this.initTts);

        if (this.props.GetGuid == induction.inductionScriptGuid) {
            await Tts.speak(induction.inductionText, { pitch: this.state.speechPitch, rate: this.state.speechRate });
        } else if (this.props.GetGuid == deeping.deepeningGuid) {
            // { deeping.deepText }
            await Tts.speak(deeping.deepText, { pitch: this.state.speechPitch, rate: this.state.speechRate });
        } else if (this.props.GetGuid == subject.subjectGuid) {
            // { subject.text }
            await Tts.speak(subject.text, { pitch: this.state.speechPitch, rate: this.state.speechRate });
        } else if (this.props.GetGuid == ending.endingGuid) {
            // { ending.endingText }
            await Tts.speak(ending.endingText, { pitch: this.state.speechPitch, rate: this.state.speechRate });
        }
        // await Tts.speak('hello', { pitch: this.state.speechPitch, rate: this.state.speechRate });



        // this.props.onModalClose(false)
    }
    _editAlert() {
        Alert.alert(
            "",
            I18n.t('editAlert'),
            [
                {
                    text: "OK", onPress: () => { }
                }
            ],
            { cancelable: false }
        );
    }

    chooseSongModal() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.chooseSongModal}
                onRequestClose={() => { this.setState({ chooseSongModal: false }) }}>
                <View style={styles.modalViewContainer}>
                    <View style={{ elevation: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.34, shadowRadius: 6.27, paddingHorizontal: '5%', width: '100%', flexDirection: 'row', alignItems: 'center', height: '9%', backgroundColor: '#315e77' }}>
                        <Icon
                            style={{ fontSize: 20, color: 'white' }}
                            name='close'
                            type='FontAwesome'
                            onPress={() => this.setState({ chooseSongModal: false })} />
                        <Text style={{ padding: 10, fontSize: 20, color: 'white', marginLeft: 30, }} numberOfLines={1} >{I18n.t('TTSHeader')}</Text>

                    </View>
                    <ChooseVoiceScreen onModalClose={(value) => this.setState({ chooseSongModal: value })} />
                </View>
            </Modal >
        )
    }
    async componentWillUnmount() {
        await Tts.stop();
    }

    render() {
        I18n.locale = "en"
        // console.log("Guid>>>>>>>>", this.state.Guid);
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>

                    <ScrollView>
                        {/* <Text style={styles.header}>{this.props.detailData.name}</Text> */}
                        <View style={{ marginVertical: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.header}>{this.props.HeaderTitle}</Text>
                            <TouchableOpacity onPress={() => { this._editAlert() }} style={{ backgroundColor: '#1A83B7', borderWigth: 2, width: '20%', alignItems: 'center', marginRight: 20, marginVertical: 5, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, color: 'white', fontWeight: '600' }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginHorizontal: 15, marginVertical: 5, backgroundColor: '#636E80', borderRadius: 5, padding: 10, marginBottom: 60 }}>
                            {
                                this.props.GetGuid == induction.inductionScriptGuid &&
                                <Text style={{ color: 'white', fontSize: 16, }}>{induction.inductionText}</Text>
                            }
                            {
                                this.props.GetGuid == deeping.deepeningGuid &&
                                <Text style={{ color: 'white', fontSize: 16, }}>{deeping.deepText}</Text>
                            }
                            {
                                this.props.GetGuid == subject.subjectGuid &&

                                <Text style={{ color: 'white', fontSize: 16, }}>{subject.text}</Text>
                            }
                            {
                                this.props.GetGuid == ending.endingGuid &&
                                <Text style={{ color: 'white', fontSize: 16, }}>{ending.endingText} </Text>
                            }
                        </View>
                    </ScrollView>

                    <View style={{ paddingHorizontal: 5, flexDirection: 'row', alignItems: 'center', justifyContent: "space-around", paddingVertical: 10, elevation: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.34, shadowRadius: 6.27, backgroundColor: '#225371', width: '100%', position: 'absolute', bottom: 0 }}>
                        <TouchableOpacity
                            onPress={() => { this._read() }}
                            style={{ width: '95%', borderRadius: 5, alignItems: 'center', justifyContent: 'center', padding: 7, flexDirection: 'row', backgroundColor: '#2FC860' }}>
                            <Text style={{ fontSize: 12, color: 'white', }}>{I18n.t('read')}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                {this.chooseSongModal()}

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
        fontWeight: '700',
        fontSize: 20,
        marginVertical: 10,
        marginLeft: 15
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

export default ScriptDetailsScreen