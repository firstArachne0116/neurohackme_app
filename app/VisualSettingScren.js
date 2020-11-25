import React, { Component } from 'react';
import { TextInput, View, Modal, ScrollView, StyleSheet, Dimensions, FlatList, Switch, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, ThemeProvider, Text, ListItem, Avatar, Divider, SearchBar, Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Radio, Icon } from 'native-base';
import AllStrings from './local/AllStrings';
import GenerativeWebViewScreen from './GenerativeWebViewScreen'
import I18n from 'react-native-i18n';

const List = [
    { name: I18n.t('FlikerOnScreen'), value: false, frequency: 0 },
    { name: I18n.t('FlikerOnHeadGear'), value: false, frequency: 0 },
    { name: I18n.t('TCDS'), value: false, frequency: 0 },
    { name: I18n.t('generativeArt'), value: false },
    { name: I18n.t('virtualReality'), value: false }
]

type Props = {};

I18n.fallbacks = true
I18n.translations = {
    "en": require("../src/translations/en.json"),
    "es": require("../src/translations/es.json")
};

class VisualSettingScren extends Component<Props>  {
    constructor(props) {
        super(props);

        this.state = {
            value: false,
            leftFreqValue: '',
            rightFreqValue: '',
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
        // console.log("this.props_____", this.props);
    }

    Frequency() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.frequencyModal}
                onRequestClose={() => { this.setState({ frequencyModal: false }) }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <View style={styles.modalTitleView}>
                            <Text style={styles.modalTextNew}>  </Text>
                        </View>

                        <View style={{ marginVertical: 10, marginBottom: 80 }}>

                            <View style={styles.audioModalTextInputView}>
                                <Text>{I18n.t('frequency')} : </Text>
                                <TextInput
                                    placeholder='Enter Value' placeholderTextColor='#DDDDE0'
                                    style={styles.audioModalTextInput}
                                    onChangeText={text => { console.log("freq__", text), this.setState({ frequencyValue: text }) }}
                                    value={this.state.frequencyValue}
                                />
                                <Text>({I18n.t('Hz')})</Text>
                            </View>
                            {console.log("frequencyValue______", this.state.frequencyValue)}
                        </View>

                        <View style={styles.okCancleTextStyle}>
                            <Text onPress={() => { this.setState({ frequencyModal: false }) }} style={{ marginRight: 50, fontWeight: '700', color: 'blue' }}>{I18n.t('cancelCapital')}</Text>
                            <Text onPress={() => { this.setState({ frequencyModal: false }) }} style={{ marginRight: 10, fontWeight: '700', color: 'blue' }}>{I18n.t('ok')}</Text>
                        </View>
                    </View>
                </View>
            </Modal >
        )
    }

    async _Cancel() {
        this.props.onModalClose(false, false, false)
    }
    async _Ok() {
        await console.log("this.state.IndeX", this.state.IndeX)
        this.props.onModalClose(false, this.state.IndeX == 0 ? true : false, this.state.IndeX == 3)
    }

    _alert(data) {
        console.log("data_in_alert", data);
        data.value = false
        alert("Head gear coming VERY soon, we will update you!")
    }

    renderItem(data, index) {
        return (
            <View
                style={{ flexDirection: 'row', flex: 1, marginBottom: 20 }}>
                <View style={{ justifyContent: 'flex-start', alignItems: 'center', width: '60%' }}>
                    <Text style={{ fontSize: 16 }}>{data.name}</Text>
                </View>

                {/* <TouchableOpacity onPress={(val) => { data.frequency = this.setState({ frequencyModal: index == 1 ? true : false, frequencyIndex: index }) }} */}
                <TouchableOpacity onPress={(val) => { data.frequency = this.setState({ frequencyModal: false, frequencyIndex: index }) }}
                    style={{ alignItems: 'center', width: '20%' }}>
                    <Text style={{ fontSize: 16 }}>{
                        index < 3 ?
                            this.state.frequencyValue > 0 ? this.state.frequencyValue + ' Hz' : '10 Hz'
                            : ''}
                    </Text>
                </TouchableOpacity>

                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: 'center', width: '20%' }}>
                    <Switch
                        trackColor={{ false: "#767577", true: "green" }}
                        thumbColor={"#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        // onValueChange={(value) => { data.value = value, this.setState({ IndeX: index }), index == 0 ? this._alert(data) : null}}
                        onValueChange={(value) => {
                            console.log("inde___", index, "data___", data, "value__", value),
                                this.setState({ IndeX: index })
                            if (index == 1) {
                                // Virtual reality programs coming VERY soon, we will update you!
                                index == 1 ? this._alert(data) : null,
                                    data.value = value
                                this.setState({ IndeX: 0 })
                            } else if (index == 2 || index == 4) {
                                index == 2 ? alert("Transcranial Direct Stimulation gear coming VERY soon, we will update you!") : alert("Virtual reality programs coming VERY soon, we will update you!")
                                this.setState({ IndeX: 0 })
                            } else if (value == false) {
                                this.setState({ IndeX: null })
                            }

                        }}
                        // onValueChange={(value) => { this.setState({ IndeX: index }) }}
                        value={this.state.IndeX == index}
                    />
                </View>
            </View>
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

    render() {
        I18n.locale = "en"
        return (
            <View style={styles.modalView}>
                <View style={styles.modalTitleView}>
                    <Icon name={'lightbulb'} type={'Foundation'} style={styles.modalIconStyle} />
                    <Text style={styles.modalTextNew}>{I18n.t('visualSettings')}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <FlatList
                        data={List}
                        contentContainerStyle={styles.listContainer}
                        renderItem={({ item, index }) => this.renderItem(item, index)}
                        ListEmptyComponent={() => this.loadEmptyView()}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

                <View style={styles.okCancleTextStyle}>
                    {/* <Text onPress={() => this._Cancel()} style={{ marginRight: 50, fontWeight: '700', color: 'blue' }}>{I18n.t('cancelCapital')}</Text> */}
                    <Text onPress={() => this._Ok()} style={{ paddingHorizontal: 20, paddingVertical: 5, fontWeight: '700', color: 'blue' }}>{I18n.t('ok')}</Text>
                </View>
                {this.Frequency()}
            </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#DDDDE0',
        width: '100%',
        flexDirection: 'row',
        padding: 15,
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

export default VisualSettingScren