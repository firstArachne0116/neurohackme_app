import React, { Component } from 'react';
import {
    Button,
} from 'react-native-elements';
import { View, Text, SafeAreaView, FlatList, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Radio, Icon } from 'native-base';
import AllStrings from './local/AllStrings';
import GenerativeWebViewScreen from './GenerativeWebViewScreen'
import I18n from 'react-native-i18n';


const ArtList = [
    { name: "Electronic", iconName: 'waves', value: 0 },
    { name: "Celestial", iconName: 'camera-timer', value: 1 },
    { name: "Clasical", iconName: 'headphones', value: 2 },
    { name: "Celestial", iconName: 'headphones', value: 3 }
]

type Props = {};

I18n.fallbacks = true
I18n.translations = {
    "en": require("../src/translations/en.json"),
    "es": require("../src/translations/es.json")
};

class GenerativeScreen extends Component<Props>  {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            genrativeArtWebModal: false,
        };
    }

    // nextScreen() {
    //     Actions.generativeWebViewScreen()
    // }

    renderItem(data, index) {
        return (
            <TouchableOpacity style={styles.mainContain}
                onPress={() => {
                    this.setState({ value: index, genrativeArtWebModal: true })
                    // this.nextScreen()
                }}>
                <View style={{ alignItems: 'center', flex: 0.2, }}>
                    <Icon name={data.iconName} type={'MaterialCommunityIcons'} style={{ fontSize: 20 }} />
                </View>

                <View style={{ alignItems: 'flex-start', flex: 0.6, }}>
                    <Text style={styles.currencyName}>{data.name}</Text>
                </View>

                <View style={{ alignItems: 'center', flex: 0.2, }}>
                    <Radio
                        selectedColor={"#5cb85c"}
                        selected={this.state.value == data.value} />
                </View>
            </TouchableOpacity>
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

    genrativeArtWebModal() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.genrativeArtWebModal}
                onRequestClose={() => { this.setState({ genrativeArtWebModal: false }) }}>
                <View style={styles.modalViewContainer}>
                    <GenerativeWebViewScreen />
                </View>
                <View style={{ position: "absolute", height: '20%', width: '100%' }}>
                    <TouchableOpacity
                        onPress={() => { this.setState({ genrativeArtWebModal: false }) }}
                        style={{ alignItems: 'center', height: 30, marginTop: 5, marginHorizontal: 15, borderRadius: 20, borderWidth: 0.5, backgroundColor: '#C4C4C4' }}>
                        <Text style={{ color: 'white', fontSize: 23 }}>{I18n.t('close')}</Text>
                    </TouchableOpacity>
                </View>
            </Modal >
        )
    }

    render() {
        I18n.locale = "en"
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ alignItems: 'center', margin: 20 }}>
                    <Text style={{ fontSize: 20 }}>{I18n.t('generativeArt')}</Text>
                </View>
                <View style={{ borderTopWidth: 1 }}>
                    <FlatList
                        data={ArtList}
                        contentContainerStyle={styles.listContainer}
                        renderItem={({ item, index }) => this.renderItem(item, index)}
                        ListEmptyComponent={() => this.loadEmptyView()}
                    />
                </View>
                {this.genrativeArtWebModal()}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
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
        borderColor: '#DDDDE0',
        borderBottomWidth: 0.5
    },
    currencyName: {
        fontSize: 20,
        color: 'black'
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

export default GenerativeScreen