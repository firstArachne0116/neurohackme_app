import React, { Component } from 'react';
import { useState } from 'react';

import { TextInput, View, Modal, ScrollView, StyleSheet, Dimensions, Switch, TouchableOpacity, ImageBackground } from 'react-native';
import {
    Button,
    ThemeProvider,
    Text,
    ListItem,
    Avatar,
    Divider,
    SearchBar,
    Input
} from 'react-native-elements';
import colors from '../config/colors';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import AllStrings from './local/AllStrings';
import GenerativeScreen from './GenerativeScreen';
import HypnosisScreen from './HypnosisScreen';
import MusicGenScreen from './MusicGenScreen';
import ChooseVoiceScreen from './ChooseVoiceScreen';
import AudioSettingScren from './AudioSettingScren';
import VisualSettingScren from './VisualSettingScren';
import PlayExpScreen from './PlayExpScreen';
import ScriptScreen from './ScriptScreen';
import { images } from './assets';
import { FlatList } from 'react-native-gesture-handler';
import { Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Share from "react-native-share";
import I18n from 'react-native-i18n';
import AsyncStorage from '@react-native-community/async-storage';

const hypno_programs = require('../resources/JSON/hypno_programs.json')
// console.log("condition___", item.catGuid[0] == this.props.catGuid)
// console.log("condition___", this.props.sessionListProgramGuid == this.props.catGuid)
// if (item.catGuid[0] == this.props.catGuid) {
//     console.log("__Innnnn__")
//     sessionArray.push(item)
// }
// console.log("sessionArray_____", sessionArray);
let All_hypno_programs_data = hypno_programs[0]

var props, switchBlink;
const List = [
    { name: "Fliker on head gear", value: false, frequency: 0 },
    { name: "Fliker on screen", value: false, frequency: 0 },
    { name: "TCDS", value: false, frequency: 0 },
    { name: "Generative art", value: false },
    { name: "Virtual reality", value: false }
]

function newScreen() {

    global.blinkScreen_iOS = true;

    Actions.sessionScreen({ item: props.sessionItem, switchBlink: switchBlink })

}

function hypnosisScreen() {
    Actions.hypnosisScreen({ item: props.sessionItem, switchBlink: true })
}

function musicScreen() {
    Actions.musicScreen()
}

function generaativeArt() {
    // Actions.generativeScreen()

}

function funcaScreen() {
    // console.log("slow!");
    Actions.functionalComp()
}

toggleModal = () => {
    // console.log("cacheo:" + props);
    //   setModalVisible(!isModalVisible);
    // console.log('me llegsso');
};

I18n.fallbacks = true
I18n.translations = {
    "en": require("../src/translations/en.json"),
    "es": require("../src/translations/es.json")
};

class NewSessionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // leftFreqValue: '',
            // rightFreqValue: '',
            leftFreqValue: this.props.sessionItem.sessionItem.programStructure.subject ? this.props.sessionItem.sessionItem.programStructure.subject.leftEarFreq : '',
            rightFreqValue: this.props.sessionItem.sessionItem.programStructure.subject ? this.props.sessionItem.sessionItem.programStructure.subject.rightEarFreq : '',
            binaralBeat: this.props.sessionItem.sessionItem.programStructure.subject ? this.props.sessionItem.sessionItem.programStructure.subject.frequency : '00',
            frequencyValue: 0,
            switchBlink: false,
            genrativeArt: false,
            isEnabled: false,
            sessionListProgramGuid: this.props.sessionListProgramGuid,
            AllData: this.props.sessionItem.sessionItem,
            // selected: false,
            // dataList: false,
            // selectedListValue: 'Selected',

            genrativeArtModal: false,
            chooseSongModal: false,
            hypnosisModal: false,
            musicModal: false,
            audioModal: false,
            VisualModal: false,
            playExpModal: false,
            scriptModal: false,
            IndeX: null,
            frequencyIndex: null
        };
    }

    async componentDidMount() {
        // this.setState({
        //   message: 'i got changed',
        // }); 
        console.log('this_props___NewSession', this.props);
        props = this.props;

        await AsyncStorage.setItem('porgramData', JSON.stringify(this.props))
        // AsyncStorage.setItem('login_data', JSON.stringify(response.data))

        console.log("Data_stored_in_AsyncStorage_Successfully");
        // await hypno_programs.map(async (item) => {
        //     console.log("item>>>>", item)
        //     console.log("condition__", item.catGuid[0] == this.props.sessionItem.sessionItem.catGuid[0])
        //     if (item.catGuid[0] == this.props.catGuid) {
        //         console.log("__Innnnn__")
        //         All_hypno_programs_data.push(item)
        //     }
        //     console.log("All_hypno_programs_data______", All_hypno_programs_data);
        //     // await this.setState({ sessionData: sessionArray })
        // })
        // this._test()
        switchBlink = false;
    }

    _test() {
        AsyncStorage.getItem("porgramData").then((response) => {
            console.log('Client reg user--', JSON.parse(response))
            var ProgramDetail = JSON.parse(response)
            console.log("porgramData___", ProgramDetail);
        })
    }

    genrativeArtModal() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.genrativeArtModal}
                onRequestClose={() => { this.setState({ genrativeArtModal: false }) }}>
                <View style={styles.modalViewContainer}>
                    <GenerativeScreen />
                </View>
            </Modal >
        )
    }

    hypnosisModal() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.hypnosisModal}
                onRequestClose={() => { this.setState({ hypnosisModal: false }) }}>
                <View style={styles.modalViewContainer}>
                    <HypnosisScreen
                        sessionItem={this.props.sessionItem}
                        switchBlink={true}
                        onModalClose={(value) => this.setState({ hypnosisModal: value })} />
                </View>
            </Modal >
        )
    }

    musicModal() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.musicModal}
                onRequestClose={() => { this.setState({ musicModal: false }) }}>
                <View style={styles.modalViewContainer}>
                    <View style={{ paddingTop: 10, elevation: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.34, shadowRadius: 6.27, paddingHorizontal: '5%', width: '100%', flexDirection: 'row', alignItems: 'center', height: '9%', backgroundColor: '#315e77' }}>
                        <Icon
                            style={{ padding: 10, fontSize: 20, color: 'white' }}
                            name='close'
                            type='FontAwesome'
                            onPress={() => this.setState({ musicModal: false })} />
                        <Text style={{ padding: 10, fontSize: 20, color: 'white', marginLeft: 30, }} numberOfLines={1} ></Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <MusicGenScreen
                            onModalClose={(value) => this.setState({ musicModal: value })}
                            onModalMusic={(value) => this.setState({ musicModal: value })}
                        />
                    </View>
                </View>
            </Modal >
        )
    }

    // chooseSongModal() {
    //     return (
    //         <Modal
    //             animationType="slide"
    //             transparent={false}
    //             visible={this.state.chooseSongModal}
    //             onRequestClose={() => { this.setState({ chooseSongModal: false }) }}>
    //             <View style={styles.modalViewContainer}>
    //                 <ChooseVoiceScreen />
    //             </View>
    //             <View style={{ position: "absolute", bottom: 0, marginBottom: 10, width: '100%' }}>
    //                 <TouchableOpacity
    //                     onPress={() => { this.setState({ chooseSongModal: false }) }}
    //                     style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5, marginHorizontal: 15, borderRadius: 20, borderWidth: 0.5, backgroundColor: '#C4C4C4' }}>
    //                     <Text style={{ color: 'white', fontSize: 23 }}>All languages</Text>
    //                 </TouchableOpacity>
    //             </View>
    //         </Modal >
    //     )
    // }

    AudioSettingScren() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.audioModal}
                onRequestClose={() => { this.setState({ audioModal: false }) }}>
                <View style={styles.centeredView}>
                    <AudioSettingScren
                        binauralBeat={this.state.binaralBeat}
                        leftFreqValue={this.state.leftFreqValue}
                        rightFreqValue={this.state.rightFreqValue}
                        onModalClose_Audio={(value, leftValue, rightValue) => {
                            console.log("AudioSettingScren_value:",
                                value, "___leftValue:,", leftValue, "___rightValue:", rightValue),
                                this.setState({ audioModal: value, leftFreqValue: leftValue, rightFreqValue: rightValue })
                        }} />
                    {console.log("leftFreqValue____:", this.state.leftFreqValue, "rightFreqValue____:", this.state.rightFreqValue)}
                </View>
            </Modal >
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

    VisualModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.VisualModal}
                onRequestClose={() => { this.setState({ VisualModal: false }) }}>
                <View style={styles.centeredView}>
                    <VisualSettingScren
                        onModalClose={(value, blink, art) => {
                            console.log("value:", value, "blink:", blink, "art:", art),
                                this.setState({ VisualModal: value, switchBlink: blink, genrativeArt: art })
                        }}
                    />
                    {/* {console.log("switchBlink:", this.state.switchBlink, "genrativeArt:", this.state.genrativeArt)} */}
                </View>
            </Modal >
        )
    }

    PlayExpModal() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.playExpModal}
                onRequestClose={() => { this.setState({ playExpModal: false }) }}>
                <View style={styles.modalViewContainer}>
                    <PlayExpScreen
                        leftFreqValue={this.state.leftFreqValue}
                        rightFreqValue={this.state.rightFreqValue}
                        switchBlink={this.state.switchBlink}
                        genrativeArt={this.state.genrativeArt}
                        sessionItem={this.props.sessionItem}
                        onModalCloseP_PlayExpModal={(value) => this.setState({ playExpModal: value })} />
                </View>
            </Modal >
        )
    }

    ScriptModal() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.scriptModal}
                onRequestClose={() => { this.setState({ scriptModal: false }) }}>
                <View style={styles.modalViewContainer}>
                    <View style={{ paddingTop: 10, elevation: 10, paddingHorizontal: '5%', width: '100%', flexDirection: 'row', alignItems: 'center', height: '9%', backgroundColor: '#315e77' }}>
                        <Icon
                            style={{ padding: 10, fontSize: 20, color: 'white' }}
                            name='close'
                            type='FontAwesome'
                            onPress={() => this.setState({ scriptModal: false })} />
                        <Text style={{ padding: 10, fontSize: 20, color: 'white', marginLeft: 30, }} numberOfLines={1} >Program Structure</Text>
                    </View>
                    <ScriptScreen
                        AllData={this.state.AllData}
                        ProgramGuid={this.state.sessionListProgramGuid}
                        onModalClose={(value) => this.setState({ scriptModal: value })} />
                </View>
            </Modal >
        )
    }

    _shareTest() {
        Share.open(options)
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });
    }
    _share() {
        Share.open({
            // title: 'data',
            subject: "Subject Detail",
            message: "Hey Welcome." + "\n" + "Download NeuroHack here : ",
        })
    }

    render() {
        console.log("sessionListProgramGuid__", this.state.sessionListProgramGuid);
        I18n.locale = "en"
        console.log('render_this_props', this.props);
        console.log('render_this_props_sessionItem_sessionItem', this.props.sessionItem.sessionItem);

        All_hypno_programs_data = this.props.sessionItem.sessionItem
        console.log("verNew_Session_hypno_programs____", All_hypno_programs_data);

        console.log("___is_Check____", this.state.sessionListProgramGuid === All_hypno_programs_data.programGuid);

        return (
            <ImageBackground source={images.bgImage} style={styles.image}>
                {/* 2B3646 */}
                <LinearGradient colors={['#11282F3B', '#2A3545']} style={styles.linearGradient}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
                        <View style={styles.nameViewStyle}>
                            {/* <Text style={{ color: 'white', }}>{I18n.t('by')} {this.state.sessionListProgramGuid === All_hypno_programs_data.programGuid ? All_hypno_programs_data.author : ""} </Text> */}
                            {/* <Text style={{ color: 'white', }}>{this.state.sessionListProgramGuid === All_hypno_programs_data.programGuid ? All_hypno_programs_data.duration : ""}{I18n.t('min')}</Text> */}
                            <View style={{ flex: 0.2, justifyContent: 'center' }}>
                                <Text style={{ color: 'white', }}>{I18n.t('by')} {All_hypno_programs_data.author ? All_hypno_programs_data.author : ""} </Text>
                            </View>
                            <View style={{ flex: 0.6, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 25, color: 'white', }} numberOfLines={1}> {All_hypno_programs_data.subtitle_1}</Text>
                            </View>
                            <View style={{ flex: 0.2, justifyContent: 'center' }}>
                                <Text style={{ color: 'white', textAlign: 'right' }}>{this.props.sessionItem.sessionItem ? this.props.sessionItem.sessionItem.duration : '00'}{I18n.t('min')}</Text>
                            </View>
                            {/* <Text style={{ color: 'white', }}>{All_hypno_programs_data.duration ? All_hypno_programs_data.duration : ""}{I18n.t('min')}</Text> */}
                        </View>

                        <View style={styles.headerContainer}>
                            {/* <Text style={{ margin: 3, fontSize: 25, color: 'white', textAlign: 'center' }} numberOfLines={1}> {this.state.sessionListProgramGuid === All_hypno_programs_data.programGuid ? All_hypno_programs_data.subtitle_1 : ""}</Text> */}
                            {/* <Text style={{ margin: 3, fontSize: 25, color: 'white', textAlign: 'center' }} numberOfLines={1}> {this.state.sessionListProgramGuid === All_hypno_programs_data.programGuid ? All_hypno_programs_data.subtitle_2 : ""}</Text> */}
                            {/* <Text style={{ margin: 3, fontSize: 25, color: 'white', textAlign: 'center' }} numberOfLines={1}> {All_hypno_programs_data.subtitle_1}</Text> */}
                            <Text style={{ margin: 3, fontSize: 25, color: 'white', textAlign: 'center' }} numberOfLines={3}> {All_hypno_programs_data.subtitle_2}</Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => { this.setState({ scriptModal: true }) }}
                            style={styles.listViewStyle}>
                            <Icon name={'text-document'} type={'Entypo'} style={{ marginHorizontal: 10, color: 'white', fontSize: 20 }} />
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>{I18n.t('script')}</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, }}>
                            {/* <TouchableOpacity onPress={() => this.setState({ audioModal: true })} style={styles.audioVisualView}>
                                <View style={styles.cardViewStyle}>
                                    <Icon name={'headphones'} type={'Feather'} style={styles.iconStyle2} />
                                    <Text style={styles.audioVisualText}>{I18n.t('audio')}</Text>
                                    <Icon name={'pencil'} type={'EvilIcons'} style={{ marginHorizontal: 10, color: 'white', fontSize: 20 }} />
                                </View>
                                <View style={styles.audioVisualTextView}>
                                    <Text style={styles.textStyle}>{I18n.t('binauralBeat')}: {All_hypno_programs_data.programStructure.subject.frequency}Hz</Text>
                                    <Text style={{ color: 'white' }}>{I18n.t('left')}: {this.state.leftFreqValue == '' ? '00' : this.state.leftFreqValue}Hz</Text>
                                    <Text style={{ color: 'white' }}>{I18n.t('right')}: {this.state.rightFreqValue == '' ? '00' : this.state.rightFreqValue}Hz</Text>
                                </View>
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={() => { this.setState({ VisualModal: true }) }} style={[styles.audioVisualView, { width: '100%' }]}>
                                <View style={[styles.cardViewStyle, {
                                    backgroundColor: '#ffb176',
                                    borderBottomLeftRadius: 40
                                }]}>
                                    <Icon name={'lightbulb'} type={'Foundation'} style={styles.iconStyle2} />
                                    <Text style={styles.audioVisualText}>{I18n.t('visual')}</Text>
                                    <Icon name={'pencil'} type={'EvilIcons'} style={styles.iconStyle3} />
                                </View>
                                <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                                    <Text style={{ color: 'white' }}>Screen flicker</Text>
                                    {/* <Text style={{ color: 'white' }}>{I18n.t('binauralBeat')}: 13Hz</Text>
                                    <Text style={{ color: 'white' }}>{I18n.t('left')}: 240Hz</Text>
                                    <Text style={{ color: 'white' }}>{I18n.t('right')}: 240Hz</Text> */}
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, }}>
                            <TouchableOpacity onPress={() => { this.setState({ musicModal: true }) }} style={styles.songTouchStyle}>
                                <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', paddingVertical: 10, }}>
                                    <Icon name={'music'} type={'Feather'} style={styles.iconStyle2} />
                                    <Text style={{ flex: 0.9, fontSize: 16, color: 'white', fontWeight: '700' }}>{I18n.t('song')}</Text>
                                    <Icon name={'pencil'} type={'EvilIcons'} style={styles.iconStyle3} />
                                </View>
                                <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name={'playcircleo'} type={'AntDesign'} style={{ marginHorizontal: 5, color: 'white', fontSize: 35 }} />
                                    <View style={{}}>
                                        <Text style={{ color: 'white' }}>{I18n.t('artist')}: {I18n.t('ComingSoon')}</Text>
                                        <Text style={{ flex: 0.8, color: 'white' }}>{I18n.t('song')}: {I18n.t('ComingSoon')}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 15, }}>
                            <TouchableOpacity style={styles.shareRewardStyle} onPress={() => { this._share() }}>
                                <Icon name={'sharealt'} type={'AntDesign'} style={styles.iconStyle4} />
                                <Text style={{ fontSize: 13, color: 'white', fontWeight: '700' }}>{I18n.t('shareWithFriend')}</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={styles.shareRewardStyle}>
                            <Icon type={'FontAwesome5'} name={'hand-holding-heart'} style={styles.iconStyle4} />
                            <Text style={{ fontSize: 13, color: 'white', fontWeight: '700' }}>Reward this artist</Text>
                        </TouchableOpacity> */}
                        </View>


                    </ScrollView>
                </LinearGradient>

                <View style={{ width: '100%', position: 'absolute', bottom: 0 }}>

                    <TouchableOpacity
                        style={{ alignItems: 'center', justifyContent: "center", paddingVertical: 10, backgroundColor: '#38CA76' }}
                        onPress={() => { this.setState({ playExpModal: true }) }}>
                        <Text style={{ fontSize: 19, color: 'white', fontWeight: '700' }}>{I18n.t('startSession')}</Text>
                        {console.log("this.props.sessionItem_____", this.props.sessionItem)}
                        <Text style={{ fontSize: 14, color: 'white', fontWeight: '700' }}>~{this.props.sessionItem.sessionItem ? this.props.sessionItem.sessionItem.duration : '00'} {I18n.t('min')}</Text>
                    </TouchableOpacity>
                </View>
                {this.genrativeArtModal()}
                {/* {this.chooseSongModal()} */}
                {/* =-=-=-=-=-=-=-=-= */}
                {this.musicModal()}
                {this.hypnosisModal()}
                {this.AudioSettingScren()}
                {this.VisualModal()}
                {this.PlayExpModal()}
                {this.ScriptModal()}

            </ImageBackground >
        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        marginBottom: 50
    },
    listContainer: {
        paddingBottom: '10%',
        padding: 5
    },
    headerContainer: {
        marginHorizontal: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        resizeMode: "contain",
        justifyContent: "center"
    },
    dropDownCurrencyContainer: {
        borderColor: 'blue',
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dropDownTitle: {
        fontSize: 20,
    },
    iconStyle: {
        fontSize: 18,
        paddingTop: 5,
        justifyContent: 'center',
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
    // --------
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: '80%',
        backgroundColor: "white",
        borderRadius: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        padding: 10,
        elevation: 2
    },
    textStyleNew: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalTextNew: {
        marginBottom: 15,
        fontWeight: '700',
        fontSize: 18,
        textAlign: "center"
    },
    // ==============
    nameViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 7,
    },
    listViewStyle: {
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(112,121,136,0.9)',
        marginHorizontal: 15,
        borderRadius: 5,
        paddingVertical: 10,
        padding: 5
    },
    audioVisualView: {
        marginVertical: 10,
        backgroundColor: 'rgba(112,121,136,0.9)',
        borderRadius: 5,
        paddingBottom: 10,
        width: '48%'
    },
    cardViewStyle: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        backgroundColor: '#47cdc4',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 30
    },
    textStyle: {
        color: 'white'
    },
    audioVisualTextView: {
        marginHorizontal: 15,
        marginTop: 10
    },
    audioVisualText: {
        flex: 0.8,
        fontSize: 15,
        color: 'white',
        fontWeight: '700'
    },
    shareRewardStyle: {
        flexDirection: 'row',
        backgroundColor: 'rgba(112,121,136,0.5)',
        marginVertical: 10,
        padding: 5,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: 'white',
        height: 40,
        borderRadius: 5,
        width: '48%'
    },
    iconStyle2: {
        marginLeft: 15,
        color: 'white',
        fontSize: 18
    },
    iconStyle3: {
        marginHorizontal: 10,
        color: 'white',
        fontSize: 20
    },
    iconStyle4: {
        marginHorizontal: 5,
        color: 'white',
        fontSize: 18
    },
    songTouchStyle: {
        backgroundColor: 'rgba(0,135,187,0.9)',
        paddingBottom: 10,
        borderRadius: 5,
        width: '100%'
    },
    audioModalTextStyle: {
        marginRight: 10,
        marginVertical: 10,
        fontSize: 20
    },
    audioModalTextInputView: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        margin: 5
    },
    audioModalTextInput: {
        height: 20,
        fontSize: 12,
        borderColor: '#DDDDE0',
        borderBottomWidth: 0.5,
        borderColor: '#DDDDE0',
        borderRadius: 3,
        padding: 2,
        marginHorizontal: 5
    },
    okCancleTextStyle: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#DDDDE0',
        width: '100%',
        flexDirection: 'row',
        padding: 20,
    },
    modalTitleView: {
        alignSelf: 'flex-start',
        padding: 15,
        flexDirection: 'row'
    },
    modalIconStyle: {
        fontSize: 22,
        marginHorizontal: 10,
        color: 'black'
    }

});

export default NewSessionDetail;