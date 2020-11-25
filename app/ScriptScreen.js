import React, { Component } from 'react';
import { ScrollView, View, Text, SafeAreaView, FlatList, StyleSheet, Modal, Image, TouchableOpacity } from 'react-native';
import { Icon, Form } from 'native-base';
import AllStrings from './local/AllStrings';
import { images } from './assets';
import ChooseVoiceScreen from './ChooseVoiceScreen';
import ScriptDetailsScreen from './ScriptDetailsScreen';
import I18n from 'react-native-i18n';
import AsyncStorage from '@react-native-community/async-storage';

const hypno_programs = require('../resources/JSON/hypno_programs.json')

let ProgramStructure = hypno_programs[0].programStructure;

const hypno_induction = require('../resources/JSON/hypno_induction.json')
let induction = hypno_induction[0]

const hypno_deepening = require('../resources/JSON/hypno_deepening.json')
let deeping = hypno_deepening[0]

const hypno_subject = require('../resources/JSON/hypno_subject.json')
let subject = hypno_subject[0].defaultSessionName[0]
console.log("hypno_subject____", subject);

const hypno_ending = require('../resources/JSON/hypno_ending.json')
let ending = hypno_ending[0]
console.log("ending____", ending);

const MusicList = [
    { name: "Master of your own destiny 1", iconName: 'waves', value: 0 },
    { name: "Master of your own destiny 2", iconName: 'camera-timer', value: 1 },
    { name: "Master of your own destiny 3", iconName: 'headphones', value: 2 },
    { name: "Master of your own destiny 4", iconName: 'headphones', value: 3 },
    { name: "Master of your own destiny 5", iconName: 'headphones', value: 4 },
    { name: "Master of your own destiny 6", iconName: 'headphones', value: 5 },
]
const SongList = [
    // { name: "Info", iconName: 'waves', value: 0 },
    { name: "Inducation: ", data: hypno_induction, iconName: 'camera-timer', value: 1 },
    { name: "Deepening: ", data: hypno_deepening, iconName: 'headphones', value: 2 },
    { name: "Subject: ", data: hypno_subject, iconName: 'headphones', value: 3 },
    { name: "Ending: ", data: hypno_ending, iconName: 'waves', value: 4 },
]

type Props = {};
// let hypno = hypno_programs;

I18n.fallbacks = true
I18n.translations = {
    "en": require("../src/translations/en.json"),
    "es": require("../src/translations/es.json")
};


class ScriptScreen extends Component<Props>  {
    constructor(props) {
        super(props);

        this.state = {
            value: null,
            programTitle: hypno_programs[0].title,
            genrativeArtWebModal: false,
            isOpne: null,
            inducationIsOpne: false,
            deepingIsOpne: false,
            subjectIsOpne: false,
            endingIsOpne: false,
            Guid: '',
            selectedScriptName: '',
            chooseSongModal: false,
            detailModal: false,
            title: '',
            detailData: [],
            DeepingTitle: "",
            AllDetailData: this.props.AllData,
            hasScript: this.props.AllData.programStructure.hasScript ? this.props.AllData.programStructure.hasScript : true,
            // hasScript: true,
            durattion: this.props.AllData.duration,

        };
        console.log("script____", this.props)
        console.log("ScriptScreen__AllData_____", this.props.AllData)
        console.log("ProgramStructure____111", hypno_programs)
        console.log("hasScript____", this.props.AllData.programStructure.hasScript)

    }

    UNSAFE_componentWillMount() {
        this.setState({ hasScript: this.props.AllData.programStructure ? this.props.AllData.programStructure.hasScript : true })
        AsyncStorage.getItem("porgramData").then((response) => {
            console.log('Client reg user--', JSON.parse(response))
            var ProgramDetail = JSON.parse(response)
            console.log("porgramData___", ProgramDetail);
        })

    }

    _close() {
        this.props.onModalClose(false)
    }

    renderItem(data, index) {
        console.log('scriptSereen__data__', data, index);
        console.log("inducation___", data.induction);
        // if (data.induction.length > 0) {
        //     console.log("innnnnnnn")
        //     let map = data.induction.map((item) => { console.log("item____", item) })
        //     console.log("innnnnnnn222222");

        // }

        // data.induction.map(() => { console.log("item____", item) })
        console.log("deeping___", data.deepening);
        console.log("subject___", data.subject);
        console.log("ending___", data.ending);

        return (
            <>
                <TouchableOpacity style={{
                    flex: 1,
                    paddingVertical: 9, paddingHorizontal: 15, marginHorizontal: 5, borderWidth: 0.5,
                    borderColor: 'white', borderTopLeftRadius: 5, borderTopRightRadius: 5,
                    justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: '#636E80',
                    borderBottomLeftRadius: this.state.isOpne == index ? 0 : 5,
                    borderBottomRightRadius: this.state.isOpne == index ? 0 : 5,
                    marginBottom: this.state.isOpne == index ? 0 : 5,
                }}
                    onPress={() => {
                        this.setState({ isOpne: this.state.isOpne == index ? null : index, title: data.name })
                    }}>
                    <View style={{ flex: 0.1, }}>
                        <Icon name={'text-document'} type={'Entypo'} style={{ color: 'white', fontSize: 24 }} />
                    </View>

                    <View style={{ flex: 0.8, }}>
                        <Text numberOfLines={1} style={styles.listTextStyle}>{data.name}{data.data[0].inductionTitle}</Text>
                        <Text numberOfLines={1} style={styles.listTextStyle}>{I18n.t('frequency')}: {} {I18n.t('Hz')}</Text>
                    </View>

                    <View style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'flex-end', }}>
                        {
                            this.state.isOpne == index ?
                                <Icon name={'caretup'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                                :
                                <Icon name={'caretdown'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                        }
                    </View>

                </TouchableOpacity >

                {
                    this.state.isOpne == index &&
                    <View style={{
                        flex: 1,
                        marginHorizontal: 5,
                        alignItems: 'center',
                        backgroundColor: '#3A4352',
                        paddingVertical: 5,
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                        borderWidth: 0.5,
                        borderColor: 'white',
                        marginBottom: 5
                    }}>

                        <TouchableOpacity onPress={() => { this.setState({ chooseSongModal: true }) }}
                            style={{ width: '90%', justifyContent: 'space-around', flexDirection: 'row', paddingVertical: 10, }}>
                            <View style={{ flex: 0.1, justifyContent: 'center' }}>
                                <Icon name={'user'} type={'FontAwesome5'} style={{ color: 'white', fontSize: 15 }} />
                            </View>

                            <View style={{ flex: 0.8, }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('voice')}: Helena ({I18n.t('female')})</Text>
                            </View>

                            <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                            </View>
                        </TouchableOpacity>

                        {
                            SongList.length > 0 ?
                                SongList.map((item, index) =>
                                    <TouchableOpacity style={[styles.isOpenView, {}]}
                                        onPress={() => {
                                            this.setState({ detailModal: true, detailData: item })
                                        }}>
                                        <View style={{ flex: 0.1, }}>
                                            <Icon name={'list'} type={'Foundation'} style={{ color: 'white', fontSize: 20 }} />
                                        </View>

                                        <View style={{ alignItems: 'flex-start', flex: 0.8, }}>
                                            <Text style={{ fontSize: 16, color: 'white' }}>{item.name}</Text>
                                        </View>

                                        <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                            <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                                        </View>
                                    </TouchableOpacity>
                                )
                                :
                                <View style={[styles.isOpenView, { justifyContent: 'center', }]}>
                                    <Text
                                        style={styles.emptyText}>
                                        No Data Found
                                    </Text>
                                </View>
                        }

                        {
                            SongList.length > 0 &&
                            <View style={{ width: '100%', }}>
                                <View style={{ paddingHorizontal: 5, flexDirection: 'row', alignItems: 'center', justifyContent: "space-around", paddingVertical: 10, }}>
                                    <TouchableOpacity
                                        onPress={() => { this.setState({ isOpne: null }) }}
                                        style={{ width: '90%', borderRadius: 5, alignItems: 'center', justifyContent: 'center', padding: 5, flexDirection: 'row', backgroundColor: '#2FC860' }}>
                                        <Icon name={'check'} type={'Entypo'} style={{ marginHorizontal: 5, color: 'white', fontSize: 20 }} />
                                        <Text style={{ fontSize: 12, color: 'white', }}>Select</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }

                    </View>

                }
            </>
        )
    }

    loadEmptyView() {
        return (
            <View style={styles.emptyListView}>
                <Text
                    style={styles.emptyText}>
                    {I18n.t('noDataFound')}
                </Text>
            </View>
        );
    }

    _AlertONPress(data) {
        console.log("___data___", data);
        console.log("___data___222", data.data);
        if (data.data == "BinauralBeat") {
            alert("Editing Binaural beat on paid version")
        } else if (data.data == "LeftEar") {
            alert("Editing Left ear frequency on paid version")
        } else if (data.data == "RightEar") {
            alert("Editing Right ear frequency on paid version")
        } else {
            alert("Editing must be on paid version")
        }
    }

    renderItem_induction(data, index) {
        console.log("data___index", data, index);
        console.log("enderItem_induction__data_____", data.inductionTitle)
        console.log("renderItem_induction__programStructure_______", ProgramStructure)
        console.log("induction______", induction)
        console.log("hasScript_state", this.state.hasScript)
        // console.log("induction.inductionTitle___", induction.inductionTitle)
        // inducationIsOpne
        return (
            <>
                {/* when close.... */}
                {
                    index == 0 &&
                    <TouchableOpacity style={{
                        flex: 1,
                        paddingVertical: 9, paddingHorizontal: 15, marginHorizontal: 5, borderWidth: 0.5,
                        borderColor: 'white', borderTopLeftRadius: 5, borderTopRightRadius: 5,
                        borderBottomLeftRadius: this.state.inducationIsOpne ? 0 : 5,
                        borderBottomRightRadius: this.state.inducationIsOpne ? 0 : 5,
                        justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: '#636E80',
                    }}
                        onPress={() => {
                            this.setState({
                                inducationIsOpne: this.state.inducationIsOpne == true ? false : true,
                                deepingIsOpne: false, subjectIsOpne: false, endingIsOpne: false,
                                title: induction.inductionTitle
                            })
                        }}>
                        <View style={{ flex: 0.1, }}>
                            <Icon name={'text-document'} type={'Entypo'} style={{ color: 'white', fontSize: 24 }} />
                        </View>

                        <View style={{ flex: 0.8, }}>
                            {console.log("hasScript___222", this.state.hasScript)}
                            <Text numberOfLines={1} style={styles.listTextStyle}>{I18n.t('inducation')}{this.state.hasScript == true ? ': ' + I18n.t('random') : ''}</Text>
                            {/* <Text numberOfLines={1} style={styles.listTextStyle}>{I18n.t('inducation')}{this.state.hasScript == true ? ': ' + data.inductionTitle : ''}</Text> */}
                            {/* <Text numberOfLines={1} style={styles.listTextStyle}>{I18n.t('inducation')}{this.state.hasScript == true ? ': ' + induction.inductionTitle : ''} </Text> */}
                            <Text numberOfLines={1} style={styles.listTextStyle}>{I18n.t('frequency')}: {ProgramStructure.induction.frequency} {I18n.t('Hz')}</Text>
                        </View>

                        <View style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'flex-end', }}>
                            {
                                this.state.inducationIsOpne ?
                                    <Icon name={'caretup'} type={'AntDesign'} style={{ color: 'white', fontSize: 14, }} />
                                    :
                                    <Icon name={'caretdown'} type={'AntDesign'} style={{ color: 'white', fontSize: 14, }} />
                            }
                        </View>
                    </TouchableOpacity >
                }

                {/* when open.......  */}
                {
                    this.state.inducationIsOpne &&
                    index == 0 &&
                    ProgramStructure.induction &&

                    <View style={{ flex: 1, marginHorizontal: 5, alignItems: 'center', backgroundColor: '#3A4352', paddingVertical: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 0.5, borderColor: 'white', }}>

                        {/* voice..... */}
                        {/* {
                            this.state.hasScript == true &&

                            <TouchableOpacity onPress={() => { this.setState({ chooseSongModal: true }) }}
                                style={{ width: '90%', justifyContent: 'space-around', flexDirection: 'row', paddingVertical: 10, }}>
                                <View style={{ flex: 0.1, justifyContent: 'center' }}>
                                    <Icon name={'user'} type={'FontAwesome5'} style={{ color: 'white', fontSize: 15 }} />
                                </View>

                                <View style={{ flex: 0.8, }}>
                                    <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('voice')}: Helena ({I18n.t('female')})</Text>
                                </View>

                                <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                    <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                                </View>
                            </TouchableOpacity>
                        } */}

                        {/* Hypnotic script/..... */}
                        <TouchableOpacity style={styles.isOpenView}
                            onPress={() => {
                                this.setState({ detailModal: true, Guid: induction.inductionScriptGuid, selectedScriptName: 'Induction' })
                            }}>
                            <View style={{ flex: 0.1, }}>
                                <Icon name={'list'} type={'Foundation'} style={{ color: 'white', fontSize: 20 }} />
                            </View>
                            <View style={{ alignItems: 'flex-start', flex: 0.8, }}>
                                {console.log("condition__", induction.inductionScriptGuid == ProgramStructure.induction.inductionScriptGuid)}
                                <Text style={{ fontSize: 16, color: 'white' }}>
                                    {/* {I18n.t('hypnoticScript')}: {induction.inductionScriptGuid == ProgramStructure.induction.inductionScriptGuid ? induction.inductionTitle : ""} */}
                                    {I18n.t('hypnoticScript')}{this.state.hasScript == true ? ': ' + data.inductionTitle : ''}
                                    {/* {I18n.t('hypnoticScript')}: {this.state.hasScript == false ? "" : ""} */}
                                </Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                            </View>
                        </TouchableOpacity>

                        {/* BinauralBeat..... */}
                        <TouchableOpacity style={styles.isOpenView}
                            onPress={() => {
                                this.state.hasScript == true ? null : this._AlertONPress({ data: 'BinauralBeat' })
                                // this.setState({ detailModal: true, detailData: item })
                            }}>
                            <View style={{ flex: 0.1, }}>
                                <Icon name={'list'} type={'Foundation'} style={{ color: 'white', fontSize: 20 }} />
                            </View>
                            <View style={{ alignItems: 'flex-start', flex: 0.8, }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('brainwaveFrequency')}: {ProgramStructure.induction.frequency} {I18n.t('Hz')}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                            </View>
                        </TouchableOpacity>

                        {/* LeftEar..... */}
                        <TouchableOpacity style={styles.isOpenView}
                            onPress={() => {
                                this.state.hasScript == true ? null : this._AlertONPress({ data: 'LeftEar' })
                                // this.setState({ detailModal: true, detailData: item })
                            }}>
                            <View style={{ flex: 0.1, }}>
                                <Icon name={'list'} type={'Foundation'} style={{ color: 'white', fontSize: 20 }} />
                            </View>
                            <View style={{ alignItems: 'flex-start', flex: 0.8, }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('leftEarFreq')}: {ProgramStructure.induction.leftEarFreq} {I18n.t('Hz')}</Text>
                            </View>

                            <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                            </View>
                        </TouchableOpacity>

                        {/* RightEar.... */}
                        <TouchableOpacity style={styles.isOpenView}
                            onPress={() => {
                                this.state.hasScript == true ? null : this._AlertONPress({ data: 'RightEar' })
                                // this.setState({ detailModal: true, detailData: item })
                            }}>
                            <View style={{ flex: 0.1, }}>
                                <Icon name={'list'} type={'Foundation'} style={{ color: 'white', fontSize: 20 }} />
                            </View>

                            <View style={{ alignItems: 'flex-start', flex: 0.8, }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('rightEarFreq')}: {ProgramStructure.induction.rightEarFreq} {I18n.t('Hz')}</Text>
                            </View>

                            <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                            </View>
                        </TouchableOpacity>



                    </View>
                }
            </>
        )
    }

    renderItem_deepening(data, index) {
        console.log("Data_______", data)
        console.log("programStructure_______", ProgramStructure)
        console.log("deeping___", deeping)
        return (
            <>
                {/* when drop down not open... */}
                {
                    index == 0 &&
                    <TouchableOpacity style={{
                        flex: 1,
                        paddingVertical: 9, paddingHorizontal: 15, marginHorizontal: 5, borderWidth: 0.5,
                        borderColor: 'white', borderTopLeftRadius: 5, borderTopRightRadius: 5,
                        borderBottomLeftRadius: this.state.deepingIsOpne ? 0 : 5,
                        borderBottomRightRadius: this.state.deepingIsOpne ? 0 : 5,
                        justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: '#636E80',
                    }}
                        onPress={() => {
                            this.setState({
                                deepingIsOpne: this.state.deepingIsOpne == true ? false : true,
                                inducationIsOpne: false, subjectIsOpne: false, endingIsOpne: false,
                                title: deeping.deepTitle
                            })
                        }}>
                        <View style={{ flex: 0.1, }}>
                            <Icon name={'text-document'} type={'Entypo'} style={{ color: 'white', fontSize: 24 }} />
                        </View>

                        <View style={{ flex: 0.8, }}>
                            <Text numberOfLines={1} style={styles.listTextStyle}>{I18n.t('deeping')}{this.state.hasScript == true ? ': ' + I18n.t('random') : ''}</Text>
                            {/* <Text numberOfLines={1} style={styles.listTextStyle}>{I18n.t('deeping')}{this.state.hasScript == true ? ': ' + data.deepName : ''}</Text> */}
                            <Text numberOfLines={1} style={styles.listTextStyle}>{I18n.t('frequency')}: {ProgramStructure.deepening.frequency} {I18n.t('Hz')}</Text>
                        </View>

                        <View style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'flex-end', }}>
                            {
                                this.state.deepingIsOpne ?
                                    <Icon name={'caretup'} type={'AntDesign'} style={{ color: 'white', fontSize: 14, }} />
                                    :
                                    <Icon name={'caretdown'} type={'AntDesign'} style={{ color: 'white', fontSize: 14, }} />
                            }
                        </View>
                    </TouchableOpacity >
                }

                {/* when drop down open.... */}
                {
                    this.state.deepingIsOpne &&
                    index == 0 &&
                    ProgramStructure.deepening &&

                    <View style={{ flex: 1, marginHorizontal: 5, alignItems: 'center', backgroundColor: '#3A4352', paddingVertical: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 0.5, borderColor: 'white', }}>

                        {/* voice.....    */}
                        {/* {
                            this.state.hasScript == true &&
                            <TouchableOpacity onPress={() => { this.setState({ chooseSongModal: true }) }}
                                style={{ width: '90%', justifyContent: 'space-around', flexDirection: 'row', paddingVertical: 10, }}>
                                <View style={{ flex: 0.1, justifyContent: 'center' }}>
                                    <Icon name={'user'} type={'FontAwesome5'} style={{ color: 'white', fontSize: 15 }} />
                                </View>

                                <View style={{ flex: 0.8, }}>
                                    <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('voice')}: Helena ({I18n.t('female')})</Text>
                                </View>

                                <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                    <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                                </View>
                            </TouchableOpacity>
                        } */}

                        {/* Hypnotic script.... */}
                        <TouchableOpacity style={styles.isOpenView}
                            onPress={() => {
                                this.setState({ detailModal: true, Guid: deeping.deepeningGuid, selectedScriptName: 'Deepening' })
                            }}>
                            <View style={{ flex: 0.1, }}>
                                <Icon name={'list'} type={'Foundation'} style={{ color: 'white', fontSize: 20 }} />
                            </View>
                            <View style={{ alignItems: 'flex-start', flex: 0.8, }}>
                                {/* <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('hypnoticScript')}: {deeping.deepeningGuid == ProgramStructure.deepening.deepeningGuid ? deeping.deepTitle : ""}</Text> */}
                                <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('hypnoticScript')}{this.state.hasScript == true ? ': ' + data.deepName : ''}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                            </View>
                        </TouchableOpacity>

                        {/* BinauralBeat..... */}
                        <TouchableOpacity style={styles.isOpenView}
                            onPress={() => {
                                // this.setState({ detailModal: true, detailData: item })
                            }}>
                            <View style={{ flex: 0.1, }}>
                                <Icon name={'list'} type={'Foundation'} style={{ color: 'white', fontSize: 20 }} />
                            </View>
                            <View style={{ alignItems: 'flex-start', flex: 0.8, }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('brainwaveFrequency')}: {ProgramStructure.deepening.frequency} {I18n.t('Hz')}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                            </View>
                        </TouchableOpacity>

                        {/* left ear..... */}
                        <TouchableOpacity style={styles.isOpenView}
                            onPress={() => {
                                // this.setState({ detailModal: true, detailData: item })
                            }}>
                            <View style={{ flex: 0.1, }}>
                                <Icon name={'list'} type={'Foundation'} style={{ color: 'white', fontSize: 20 }} />
                            </View>
                            <View style={{ alignItems: 'flex-start', flex: 0.8, }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('leftEarFreq')}: {ProgramStructure.deepening.leftEarFreq} {I18n.t('Hz')}</Text>
                            </View>

                            <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                            </View>
                        </TouchableOpacity>

                        {/* right ear.... */}
                        <TouchableOpacity style={styles.isOpenView}
                            onPress={() => {
                                // this.setState({ detailModal: true, detailData: item })
                            }}>
                            <View style={{ flex: 0.1, }}>
                                <Icon name={'list'} type={'Foundation'} style={{ color: 'white', fontSize: 20 }} />
                            </View>

                            <View style={{ alignItems: 'flex-start', flex: 0.8, }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('rightEarFreq')}: {ProgramStructure.deepening.rightEarFreq} {I18n.t('Hz')}</Text>
                            </View>

                            <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </>
        )
    }

    renderItem_subject(data, index) {
        console.log("__data_____subject", data)
        console.log("subject___hasScript_state", this.state.hasScript)
        return (
            <>
                {/* when drop down close... */}
                {
                    index == 0 &&
                    <TouchableOpacity style={{
                        flex: 1,
                        paddingVertical: 9, paddingHorizontal: 15, marginHorizontal: 5, borderWidth: 0.5,
                        borderColor: 'white', borderTopLeftRadius: 5, borderTopRightRadius: 5,
                        borderBottomLeftRadius: this.state.subjectIsOpne ? 0 : 5,
                        borderBottomRightRadius: this.state.subjectIsOpne ? 0 : 5,
                        justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: '#636E80',
                    }}
                        onPress={() => {
                            this.setState({
                                subjectIsOpne: this.state.subjectIsOpne == true ? false : true,
                                inducationIsOpne: false, deepingIsOpne: false, endingIsOpne: false,
                                title: subject.subjectTitle
                            })

                            // this.setState({ isOpne: this.state.isOpne == index ? null : index, title: data.name })
                        }}>
                        <View style={{ flex: 0.1, }}>
                            <Icon name={'text-document'} type={'Entypo'} style={{ color: 'white', fontSize: 24 }} />
                        </View>

                        <View style={{ flex: 0.8, }}>
                            <Text numberOfLines={1} style={styles.listTextStyle}>{I18n.t('subject')}{this.state.hasScript == true ? ': ' + data.defaultSessionName[0].subjectName.charAt(0).toUpperCase() + data.defaultSessionName[0].subjectName.substr(1).toLowerCase() : ''}</Text>
                            {/* <Text numberOfLines={1} style={styles.listTextStyle}>{I18n.t('subject')}{this.state.hasScript == true ? ': ' + data.defaultSessionName[0].subjectName.titleCase() : ''}</Text> */}
                            <Text numberOfLines={1} style={styles.listTextStyle}>{I18n.t('frequency')}: {ProgramStructure.subject.frequency} {I18n.t('Hz')}</Text>
                        </View>

                        <View style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'flex-end', }}>
                            {
                                this.state.subjectIsOpne ?
                                    <Icon name={'caretup'} type={'AntDesign'} style={{ color: 'white', fontSize: 14, }} />
                                    :
                                    <Icon name={'caretdown'} type={'AntDesign'} style={{ color: 'white', fontSize: 14, }} />
                            }
                        </View>
                    </TouchableOpacity >
                }
                {/* .......................................................... */}

                {/* when drop down open... */}
                {
                    this.state.subjectIsOpne &&
                    index == 0 &&
                    ProgramStructure.subject &&
                    // subject
                    <View style={{ flex: 1, marginHorizontal: 5, alignItems: 'center', backgroundColor: '#3A4352', paddingVertical: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 0.5, borderColor: 'white', }}>

                        {/* voice.... */}
                        {/* {
                            this.state.hasScript == true &&
                            <TouchableOpacity onPress={() => { this.setState({ chooseSongModal: true }) }}
                                style={{ width: '90%', justifyContent: 'space-around', flexDirection: 'row', paddingVertical: 10, }}>
                                <View style={{ flex: 0.1, justifyContent: 'center' }}>
                                    <Icon name={'user'} type={'FontAwesome5'} style={{ color: 'white', fontSize: 15 }} />
                                </View>

                                <View style={{ flex: 0.8, }}>
                                    <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('voice')}: Helena ({I18n.t('female')})</Text>
                                </View>

                                <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                    <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                                </View>
                            </TouchableOpacity>
                        } */}

                        {/* Hypnotic script... */}
                        <TouchableOpacity style={styles.isOpenView}
                            onPress={() => {
                                this.setState({ detailModal: true, Guid: subject.subjectGuid, selectedScriptName: 'Subject' })
                            }}>
                            <View style={{ flex: 0.1, }}>
                                <Icon name={'list'} type={'Foundation'} style={{ color: 'white', fontSize: 20 }} />
                            </View>
                            <View style={{ alignItems: 'flex-start', flex: 0.8, }}>
                                {/* <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('hypnoticScript')}: {subject.subjectGuid == ProgramStructure.subject.subjectGuid ? subject.subjectTitle : ""}</Text> */}
                                <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('hypnoticScript')}{this.state.hasScript == true ? ': ' + data.defaultSessionName[0].subjectName : ''}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                            </View>
                        </TouchableOpacity>

                        {/* Binaural.... */}
                        <TouchableOpacity style={styles.isOpenView}
                            onPress={() => {
                                this.state.hasScript == true ? null : this._AlertONPress({ data: 'BinauralBeat' })
                                // this.setState({ detailModal: true, detailData: item })
                            }}>
                            <View style={{ flex: 0.1, }}>
                                <Icon name={'list'} type={'Foundation'} style={{ color: 'white', fontSize: 20 }} />
                            </View>
                            <View style={{ alignItems: 'flex-start', flex: 0.8, }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('brainwaveFrequency')}: {ProgramStructure.subject.frequency} {I18n.t('Hz')}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                            </View>
                        </TouchableOpacity>

                        {/* Left Ear.... */}
                        <TouchableOpacity style={styles.isOpenView}
                            onPress={() => {
                                this.state.hasScript == true ? null : this._AlertONPress({ data: 'LeftEar' })
                                // this.setState({ detailModal: true, detailData: item })
                            }}>
                            <View style={{ flex: 0.1, }}>
                                <Icon name={'list'} type={'Foundation'} style={{ color: 'white', fontSize: 20 }} />
                            </View>
                            <View style={{ alignItems: 'flex-start', flex: 0.8, }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('leftEarFreq')}: {ProgramStructure.subject.leftEarFreq} {I18n.t('Hz')}</Text>
                            </View>

                            <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                            </View>
                        </TouchableOpacity>

                        {/* Roght Ear.... */}
                        <TouchableOpacity style={styles.isOpenView}
                            onPress={() => {
                                this.state.hasScript == true ? null : this._AlertONPress({ data: 'RightEar' })
                                // this.setState({ detailModal: true, detailData: item })
                            }}>
                            <View style={{ flex: 0.1, }}>
                                <Icon name={'list'} type={'Foundation'} style={{ color: 'white', fontSize: 20 }} />
                            </View>

                            <View style={{ alignItems: 'flex-start', flex: 0.8, }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('rightEarFreq')}: {ProgramStructure.subject.rightEarFreq} {I18n.t('Hz')}</Text>
                            </View>

                            <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                }
                {/* .......................................................... */}
            </>
        )
    }

    renderItem_ending(data, index) {
        console.log("__data_____ending", data)
        console.log("Ending___hasScript_state", this.state.hasScript)

        return (
            <>
                {
                    index == 0 &&
                    <TouchableOpacity style={{
                        flex: 1,
                        paddingVertical: 9, paddingHorizontal: 15, marginHorizontal: 5, borderWidth: 0.5,
                        borderColor: 'white', borderTopLeftRadius: 5, borderTopRightRadius: 5,
                        borderBottomLeftRadius: this.state.endingIsOpne ? 0 : 5,
                        borderBottomRightRadius: this.state.endingIsOpne ? 0 : 5,
                        justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: '#636E80',
                    }}
                        onPress={() => {
                            this.setState({
                                endingIsOpne: this.state.endingIsOpne == true ? false : true,
                                deepingIsOpne: false, subjectIsOpne: false, inducationIsOpne: false,
                                title: ending.endingTitle
                            })
                        }}>
                        <View style={{ flex: 0.1, }}>
                            <Icon name={'text-document'} type={'Entypo'} style={{ color: 'white', fontSize: 24 }} />
                        </View>

                        <View style={{ flex: 0.8, }}>
                            <Text numberOfLines={1} style={styles.listTextStyle}>{I18n.t('ending')}{this.state.hasScript == true ? ': ' + I18n.t('random') : ''}</Text>
                            {/* <Text numberOfLines={1} style={styles.listTextStyle}>{I18n.t('ending')}{this.state.hasScript == true ? ': ' + data.endingName : ''}</Text> */}
                            <Text numberOfLines={1} style={styles.listTextStyle}>{I18n.t('frequency')}: {ProgramStructure.ending.frequency} {I18n.t('Hz')}</Text>
                        </View>

                        <View style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'flex-end', }}>
                            {
                                this.state.endingIsOpne ?
                                    <Icon name={'caretup'} type={'AntDesign'} style={{ color: 'white', fontSize: 14, }} />
                                    :
                                    <Icon name={'caretdown'} type={'AntDesign'} style={{ color: 'white', fontSize: 14, }} />
                            }
                        </View>
                    </TouchableOpacity >
                }

                {
                    this.state.endingIsOpne &&
                    index == 0 &&
                    ProgramStructure.ending &&
                    // subject
                    <View style={{ flex: 1, marginHorizontal: 5, alignItems: 'center', backgroundColor: '#3A4352', paddingVertical: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 0.5, borderColor: 'white', }}>

                        {/* voice.... */}
                        {/* {
                            this.state.hasScript == true &&
                            <TouchableOpacity onPress={() => { this.setState({ chooseSongModal: true }) }}
                                style={{ width: '90%', justifyContent: 'space-around', flexDirection: 'row', paddingVertical: 10, }}>
                                <View style={{ flex: 0.1, justifyContent: 'center' }}>
                                    <Icon name={'user'} type={'FontAwesome5'} style={{ color: 'white', fontSize: 15 }} />
                                </View>

                                <View style={{ flex: 0.8, }}>
                                    <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('voice')}: Helena ({I18n.t('female')})</Text>
                                </View>

                                <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                    <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                                </View>
                            </TouchableOpacity>
                        } */}

                        {/* Hypnotic script.... */}
                        <TouchableOpacity style={styles.isOpenView}
                            onPress={() => {
                                this.setState({ detailModal: true, Guid: ending.endingGuid, selectedScriptName: 'Ending' })
                            }}>
                            <View style={{ flex: 0.1, }}>
                                <Icon name={'list'} type={'Foundation'} style={{ color: 'white', fontSize: 20 }} />
                            </View>
                            <View style={{ alignItems: 'flex-start', flex: 0.8, }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('hypnoticScript')}{this.state.hasScript == true ? ': ' + data.endingName : ''}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                            </View>
                        </TouchableOpacity>

                        {/* Binaural... */}
                        <TouchableOpacity style={styles.isOpenView}
                            onPress={() => {
                                this.state.hasScript == true ? null : this._AlertONPress({ data: 'BinauralBeat' })
                                // this.setState({ detailModal: true, detailData: item })
                            }}>
                            <View style={{ flex: 0.1, }}>
                                <Icon name={'list'} type={'Foundation'} style={{ color: 'white', fontSize: 20 }} />
                            </View>
                            <View style={{ alignItems: 'flex-start', flex: 0.8, }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('brainwaveFrequency')}: {ProgramStructure.ending.frequency} {I18n.t('Hz')}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                            </View>
                        </TouchableOpacity>

                        {/* left ear.... */}
                        <TouchableOpacity style={styles.isOpenView}
                            onPress={() => {
                                this.state.hasScript == true ? null : this._AlertONPress({ data: 'LeftEar' })
                                // this.setState({ detailModal: true, detailData: item })
                            }}>
                            <View style={{ flex: 0.1, }}>
                                <Icon name={'list'} type={'Foundation'} style={{ color: 'white', fontSize: 20 }} />
                            </View>
                            <View style={{ alignItems: 'flex-start', flex: 0.8, }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('leftEarFreq')}: {ProgramStructure.ending.leftEarFreq} {I18n.t('Hz')}</Text>
                            </View>

                            <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                            </View>
                        </TouchableOpacity>

                        {/* right ear.... */}
                        <TouchableOpacity style={styles.isOpenView}
                            onPress={() => {
                                this.state.hasScript == true ? null : this._AlertONPress({ data: 'RightEar' })
                                // this.setState({ detailModal: true, detailData: item })
                            }}>
                            <View style={{ flex: 0.1, }}>
                                <Icon name={'list'} type={'Foundation'} style={{ color: 'white', fontSize: 20 }} />
                            </View>

                            <View style={{ alignItems: 'flex-start', flex: 0.8, }}>
                                <Text style={{ fontSize: 16, color: 'white' }}>{I18n.t('rightEarFreq')}: {ProgramStructure.ending.rightEarFreq} {I18n.t('Hz')}</Text>
                            </View>

                            <View style={{ alignItems: 'flex-end', flex: 0.1, }}>
                                <Icon name={'caretright'} type={'AntDesign'} style={{ color: 'white', fontSize: 14 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </>
        )
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

    detailModal() {
        // console.log("modal___", this.state.detailData);
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.detailModal}
                onRequestClose={() => { this.setState({ detailModal: false }) }}>
                <View style={styles.modalViewContainer}>
                    <View style={{
                        elevation: 10,
                        paddingTop: 10,
                        shadowColor: "#000", shadowOffset: { width: 0, height: 5, },
                        shadowOpacity: 0.34, shadowRadius: 6.27,
                        paddingHorizontal: '5%', width: '100%',
                        flexDirection: 'row', alignItems: 'center', height: '9%', backgroundColor: '#315e77'
                    }}>
                        <View style={{ width: '20%', }}>
                            <Icon
                                style={{ padding: 10, fontSize: 20, color: 'white' }}
                                name='close'
                                type='FontAwesome'
                                onPress={() => this.setState({ detailModal: false })} />
                        </View>
                        <View style={{ width: '60%', alignItems: 'center', }}>
                            <Text style={{ padding: 10, fontSize: 20, color: 'white', marginLeft: 30 }} numberOfLines={1} >
                                {this.state.selectedScriptName}
                            </Text>
                        </View>
                        <View style={{ paddingTop: 10, paddingLeft: 20, width: '20%', justifyContent: 'flex-end', }}>
                            <TouchableOpacity
                                onPress={() => { this.setState({ chooseSongModal: true }) }}>

                                <Image
                                    source={images.manSpeak}
                                    resizeMode='contain'
                                    style={{ width: '70%', height: '70%' }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScriptDetailsScreen
                        detailData={this.state.detailData}
                        HeaderTitle={this.state.title}
                        GetGuid={this.state.Guid}
                        // DeepeningGuid={deeping.deepeningGuid}
                        // InductionScriptGuid={induction.inductionScriptGuid}
                        // voiceModal={this.state.chooseSongModal}
                        onModalClose={(value) => this.setState({ detailModal: value })}
                    // onModalVoiceClose={(value) => this.setState({ chooseSongModal: this.state.chooseSongModal })} 
                    />
                </View>
                {this.chooseSongModal()}
            </Modal>
        )
    }

    render() {
        I18n.locale = "en"
        console.log("render_prog_structure___", ProgramStructure);
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.header}>{this.state.programTitle}</Text>
                        {/* <Text style={styles.header}>{I18n.t('programTitle')}</Text> */}
                        {/* <View style={{ marginBottom: 50, marginHorizontal: 5 }}>
                            <FlatList
                                // data={MusicList}
                                // data={sessionsArraya}
                                data={SongList}
                                // data={ProgramStructure}
                                contentContainerStyle={styles.listContainer}
                                renderItem={({ item, index }) => this.renderItem(item, index)}
                                ListEmptyComponent={() => this.loadEmptyView()}
                            />
                        </View> */}

                        <View style={{ marginBottom: 5, marginHorizontal: 5 }}>
                            <FlatList
                                data={hypno_induction}
                                // data={hypno_programs}
                                contentContainerStyle={[styles.listContainer, { paddingBottom: 0, }]}
                                renderItem={({ item, index }) => this.renderItem_induction(item, index)}
                                ListEmptyComponent={() => this.loadEmptyView()}
                            />
                        </View>

                        {
                            this.state.hasScript == true &&
                            <View style={{ marginBottom: 5, marginHorizontal: 5 }}>
                                <FlatList
                                    // data={hypno_programs}
                                    data={hypno_deepening}
                                    contentContainerStyle={[styles.listContainer, { paddingBottom: 0, }]}
                                    renderItem={({ item, index }) => this.renderItem_deepening(item, index)}
                                    ListEmptyComponent={() => this.loadEmptyView()}
                                />
                            </View>
                        }

                        <View style={{ marginBottom: 5, marginHorizontal: 5 }}>
                            <FlatList
                                data={hypno_subject}
                                contentContainerStyle={[styles.listContainer, { paddingBottom: 0, }]}
                                renderItem={({ item, index }) => this.renderItem_subject(item, index)}
                                ListEmptyComponent={() => this.loadEmptyView()}
                            />
                        </View>
                        <View style={{ marginBottom: 5, marginHorizontal: 5 }}>
                            <FlatList
                                data={hypno_ending}
                                contentContainerStyle={[styles.listContainer, { paddingBottom: 0, }]}
                                renderItem={({ item, index }) => this.renderItem_ending(item, index)}
                                ListEmptyComponent={() => this.loadEmptyView()}
                            />
                        </View>



                    </ScrollView>
                </View>
                {/* {this.chooseSongModal()} */}
                {this.detailModal()}
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
        fontSize: 22,
        marginVertical: 10,
        paddingLeft: 14,
        paddingRight: 14,
    },
    image: {
        flex: 1,
        resizeMode: "contain",
        // justifyContent: "center"
    },
    listContainer: {
        paddingBottom: '10%',
        padding: 5
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
        flex: 1,
        height: 60,
        // paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 0.2
    },
    listTextStyle: {
        fontSize: 14,
        color: 'white'
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
    isCloseMainView: {
        flex: 1,
        paddingVertical: 9,
        paddingHorizontal: 15,
        marginHorizontal: 5,
        borderWidth: 0.5,
        borderColor: 'white',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#636E80'
    },
    isOpenView: {
        width: '90%',
        // justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor: '#3A4352',
        paddingVertical: 10,

        // borderBottomLeftRadius: 5,
        // borderBottomRightRadius: 5,
        // borderWidth: 0.5,
        // borderColor: 'white',
        // marginBottom: 5,
    },
    isOpenTopView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    isOpenSecondView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    isOpneTextView: {
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 10,
    },
    textStyle: {
        color: 'white'
    },
})

export default ScriptScreen