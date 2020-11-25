import React, { Component } from 'react';
import { KeyboardAvoidingView, TextInput, View, Modal, ScrollView, StyleSheet, Dimensions, Switch, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, ThemeProvider, Text, ListItem, Avatar, Divider, SearchBar, Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Radio, Icon } from 'native-base';
import AllStrings from './local/AllStrings';
import GenerativeWebViewScreen from './GenerativeWebViewScreen'
import I18n from 'react-native-i18n';

const List = [
    { name: "Fliker on head gear", value: false, frequency: 0 },
    { name: "Fliker on screen", value: false, frequency: 0 },
    { name: "TCDS", value: false, frequency: 0 },
    { name: "Generative art", value: false },
    { name: "Virtual reality", value: false }
]

type Props = {};

I18n.fallbacks = true
I18n.translations = {
    "en": require("../src/translations/en.json"),
    "es": require("../src/translations/es.json")
};

class AudioSettingScren extends Component<Props>  {
    constructor(props) {
        super(props);

        this.state = {
            // leftFreqValue: '',
            // rightFreqValue: '',
            leftFreqValue: this.props.leftFreqValue ? this.props.leftFreqValue.toString() : '',
            rightFreqValue: this.props.rightFreqValue ? this.props.rightFreqValue.toString() : '',
            binaralBeat: this.props.binauralBeat ? this.props.binauralBeat.toString() : '',
            frequencyValue: 0,
            switchValue: false,
            isEnabled: false,

            genrativeArtModal: false,
            chooseSongModal: false,
            VisualModal: false,
            frequencyModal: false,
            IndeX: null,
            frequencyIndex: null,

        };
        console.log("AudioSettingScren_this.props_____", this.props);
    }

    async _Cancel() {
        console.log("in_Cancel");
        // this.props.onModalClose_Audio(false, '', '')
        this.props.onModalClose_Audio(false, this.state.leftFreqValue, this.state.rightFreqValue)

    }
    async _Ok() {
        await console.log("In_Ok_Left", this.state.leftFreqValue, "In_Ok_Right", this.state.rightFreqValue)
        this.props.onModalClose_Audio(false, this.state.leftFreqValue, this.state.rightFreqValue)
    }

    render() {
        I18n.locale = "en"
        return (
            <KeyboardAvoidingView behavior="padding">
                <View style={[styles.modalView, {}]}>
                    <View style={styles.modalTitleView}>
                        <Icon name={'headphones'} type={'Feather'} style={styles.modalIconStyle} />
                        <Text style={styles.modalTextNew}>{I18n.t('audioSettings')}</Text>
                    </View>

                    <Text style={styles.audioModalTextStyle}>{I18n.t('binauralBeat')}: {this.state.binaralBeat}{I18n.t('Hz')}</Text>

                    <View style={{ marginVertical: 10, marginBottom: 80 }}>
                        <View style={styles.audioModalTextInputView}>
                            <Text>{I18n.t('leftFrequency')}  :</Text>
                            <TextInput
                                placeholder='Enter Value'
                                placeholderTextColor='#DDDDE0'
                                style={styles.audioModalTextInput}
                                onChangeText={text => { console.log("Left_text:", text), this.setState({ leftFreqValue: text }) }}
                                value={this.state.leftFreqValue}
                                keyboardType='number-pad'
                            />
                            <Text>({I18n.t('Hz')})</Text>
                        </View>

                        <View style={styles.audioModalTextInputView}>
                            <Text>{I18n.t('rightFrequency')} :</Text>
                            <TextInput
                                placeholder={this.state.rightFreqValue != '' ? this.state.rightFreqValue : 'Enter Value'}
                                // placeholder={this.state.rightFreqValue}
                                // placeholderTextColor='#DDDDE0'
                                style={styles.audioModalTextInput}
                                onChangeText={text => { console.log("Right_text:", text), this.setState({ rightFreqValue: text }) }}
                                value={this.state.rightFreqValue}
                                keyboardType='number-pad'
                            />
                            <Text>({I18n.t('Hz')})</Text>
                        </View>
                    </View>
                    <View style={styles.okCancleTextStyle}>
                        <Text onPress={() => this._Cancel()} style={{ marginRight: 50, fontWeight: '700', color: 'blue' }}>{I18n.t('cancelCapital')}</Text>
                        <Text onPress={() => this._Ok()} style={{ marginRight: 10, fontWeight: '700', color: 'blue' }}>{I18n.t('ok')}</Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
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
        paddingVertical: 10,
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

})

export default AudioSettingScren