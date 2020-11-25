import React, { Component } from 'react';
import { Button, } from 'react-native-elements';
import { ScrollView, View, Text, SafeAreaView, FlatList, StyleSheet, ImageBackground, Alert, Modal, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Radio, Icon } from 'native-base';
import AllStrings from './local/AllStrings';
import GenerativeWebViewScreen from './GenerativeWebViewScreen'
import { images } from './assets';
import I18n from 'react-native-i18n';
// import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const MusicList = [
    { name: "Artist 1", iconName: 'waves', value: 0 },
    { name: "Artist 2", iconName: 'camera-timer', value: 1 },
    { name: "Artist 3", iconName: 'headphones', value: 2 },
    { name: "Artist 4", iconName: 'headphones', value: 3 },
    { name: "Artist 5", iconName: 'headphones', value: 4 },
    { name: "Artist 6", iconName: 'headphones', value: 5 },
]
const SongList = [
    { name: "Song name 1", iconName: 'waves', value: 0 },
    { name: "Song name 2", iconName: 'camera-timer', value: 1 },
    { name: "Song name 3", iconName: 'headphones', value: 2 },
    { name: "Song name 4", iconName: 'headphones', value: 3 },
    { name: "Song name 15", iconName: 'waves', value: 4 },
    // { name: "Song name 52", iconName: 'camera-timer', value: 5 },
    // { name: "Song name 663", iconName: 'headphones', value: 6 },
    // { name: "Song name 54", iconName: 'headphones', value: 7 },
    // { name: "Song name 13", iconName: 'waves', value: 8 },
    // { name: "Song name 24", iconName: 'camera-timer', value: 9 },
    // { name: "Song name 363", iconName: 'headphones', value: 10 },
    // { name: "Song name 43", iconName: 'headphones', value: 11 },
]

type Props = {};

I18n.fallbacks = true
I18n.translations = {
    "en": require("../src/translations/en.json"),
    "es": require("../src/translations/es.json")
};

class MusicDetailScreen extends Component<Props>  {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            genrativeArtWebModal: false,
            isOpne: false,
            selectedDate: []
        };
        console.log("prop_________>>>>>", this.props);
    }

    _close() {
        this.props.onModalClose(false)
    }
    _save() {
        // alert(I18n.t('AlertFeature'))
        Alert.alert(
            "",
            I18n.t('AlertFeature'),
            [
                {
                    text: "OK", onPress: () => {
                        this.props.onModalClose(false)
                        this.props.onModalMusic(false)
                    }
                }
            ],
            { cancelable: false }
        );

        // this.props.onModalClose(false)
    }

    renderItem(data, index) {
        return (
            <>
                <TouchableOpacity style={[styles.isCloseMainView, {
                    borderBottomLeftRadius: this.state.isOpne == index ? 0 : 5,
                    borderBottomRightRadius: this.state.isOpne == index ? 0 : 5,
                    marginBottom: this.state.isOpne == index ? 0 : 5,
                }]}
                    onPress={() => { this.setState({ isOpne: this.state.isOpne == index ? null : index }) }}>
                    <View style={{ alignItems: 'center', }}>
                        <Icon name={'folder-music'} type={'Entypo'} style={{ color: 'white', fontSize: 20 }} />
                    </View>

                    <View style={{ alignItems: 'flex-start', flex: 0.8, }}>
                        <Text style={styles.currencyName}>{data.name}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        {
                            this.state.isOpne == index ?
                                <Icon name={'checksquareo'} type={'AntDesign'} style={{ color: 'white', fontSize: 20 }} />
                                :
                                null
                        }
                        {
                            this.state.isOpne == index ?
                                <Icon name={'caretup'} type={'AntDesign'} style={{ color: 'white', fontSize: 16, marginHorizontal: 10 }} />
                                :
                                <Icon name={'caretdown'} type={'AntDesign'} style={{ color: 'white', fontSize: 16, marginHorizontal: 10 }} />
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
                        {
                            SongList.length > 0 ?
                                SongList.map((item, index) =>
                                    <TouchableOpacity style={styles.isOpenView}
                                        onPress={() => {
                                            console.log("selected_item_____", item)
                                            this.setState({ value: index, selectedDate: item })
                                        }}
                                    >
                                        <View style={{ alignItems: 'center', }}>
                                            <Icon name={'music'} type={'Feather'} style={{ marginRight: 10, marginLeft: -10, color: this.state.value == index ? "#5cb85c" : 'white', fontSize: 20 }} />
                                        </View>

                                        <View style={{ alignItems: 'flex-start', flex: 0.8 }}>
                                            <Text style={{ fontSize: 16, color: this.state.value == index ? "#5cb85c" : 'white' }}>{item.name}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            <Icon onPress={() => { alert("Downloading mp3") }} name={'cloud-download'} type={'Octicons'} style={{ marginHorizontal: 10, color: this.state.value == index ? "#5cb85c" : 'white', fontSize: 20 }} />

                                            <View style={{ borderRadius: 10, height: 20, width: 20, borderWidth: 1, borderColor: this.state.value == index ? "#5cb85c" : 'white', padding: 5, alignItems: 'center', justifyContent: 'center' }}>
                                                <TouchableOpacity
                                                    onPress={() => { this.state.value == item.value }}
                                                    style={{ padding: 5, borderRadius: 6, height: 12, width: 12, backgroundColor: this.state.value == index ? "#5cb85c" : 'white' }} >
                                                </TouchableOpacity>
                                            </View>

                                            {/* <Radio
                                                color="white"
                                                selectedColor={"#5cb85c"}
                                                selected={this.state.value == item.value} /> */}
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

    render() {
        I18n.locale = "en"
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground source={images.bgImage} style={styles.image}>
                    <ScrollView>
                        <View style={{ alignItems: 'center', marginVertical: 30, marginTop: 80 }}>
                            <Text style={{ fontSize: 30, color: 'white', fontWeight: '700' }}>{this.props.headerData.title}</Text>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <FlatList
                                data={MusicList}
                                contentContainerStyle={styles.listContainer}
                                renderItem={({ item, index }) => this.renderItem(item, index)}
                                ListEmptyComponent={() => this.loadEmptyView()}
                            />
                        </View>
                    </ScrollView>

                    <View style={{ backgroundColor: '#225371', width: '100%', position: 'absolute', bottom: 0 }}>
                        <View style={{ paddingHorizontal: 5, flexDirection: 'row', alignItems: 'center', justifyContent: "space-around", paddingVertical: 10, }}>
                            <TouchableOpacity
                                onPress={() => { this._close() }}
                                style={{ width: '30%', borderRadius: 5, alignItems: 'center', justifyContent: 'center', padding: 5, flexDirection: 'row', backgroundColor: '#FA3E47' }}>
                                <Icon name={'close'} type={'AntDesign'} style={{ marginHorizontal: 5, color: 'white', fontSize: 20 }} />
                                <Text style={{ fontSize: 12, color: 'white', }}>{I18n.t('cancle')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { this._save() }}
                                style={{ width: '65%', borderRadius: 5, alignItems: 'center', justifyContent: 'center', padding: 5, flexDirection: 'row', backgroundColor: '#2FC860' }}>
                                <Icon name={'check'} type={'AntDesign'} style={{ marginHorizontal: 5, color: 'white', fontSize: 20 }} />
                                <Text style={{ fontSize: 12, color: 'white', }}>{I18n.t('saveChanges')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
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
    currencyName: {
        fontSize: 20,
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
        flex: 1,
        // justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#3A4352',
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

export default MusicDetailScreen