import React, { Component } from 'react';
import {
    Button,
} from 'react-native-elements';
import { View, Text, SafeAreaView, FlatList, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Radio, } from 'native-base';
import AllStrings from './local/AllStrings';
import MusicDetailScreen from './MusicDetailScreen'
import { images } from './assets';
import { Icon } from 'native-base';
import I18n from 'react-native-i18n';

const MusicList = [
    { name: "Electronic", iconName: 'waves', value: 0, thumbnail: images.bgImage },
    { name: "Celestial", iconName: 'camera-timer', value: 1, thumbnail: images.bgImage },
    { name: "Clasical", iconName: 'headphones', value: 2, thumbnail: images.bgImage },
    { name: "Etno", iconName: 'headphones', value: 3, thumbnail: images.bgImage },
    { name: "Shamanic", iconName: 'headphones', value: 3, thumbnail: images.bgImage },
    { name: "Acustic", iconName: 'headphones', value: 3, thumbnail: images.bgImage }
]

type Props = {};

I18n.fallbacks = true
I18n.translations = {
    "en": require("../src/translations/en.json"),
    "es": require("../src/translations/es.json")
};

class MusicGenScreen extends Component<Props>  {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            genrativeArtWebModal: false,
            HeaderTitle: '',
            playExpModal: false,
        };
    }

    renderItem(data, index) {
        return (
            // <>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 5, marginVertical: 5, }}>
                <TouchableOpacity
                    onPress={() => {
                        console.log("data____", data)
                        this.setState({ value: index, genrativeArtWebModal: true, HeaderTitle: data.name })
                    }}
                    style={{ elevation: 5, backgroundColor: 'rgba(0,135,187,0.9)', borderRadius: 5, width: '100%', }}>
                    <Image source={images.bgImage} style={{ height: 125, width: '100%', borderTopRightRadius: 5, borderTopLeftRadius: 5, borderBottomLeftRadius: 20 }} />
                    <Text style={{ marginHorizontal: 10, marginTop: 10, color: 'white', fontWeight: '700' }}>{data.name}</Text>
                    <Text style={{ marginHorizontal: 10, marginBottom: 10, color: 'white', fontSize: 12 }} numberOfLines={1}>details</Text>
                </TouchableOpacity>
            </View>


            //     <TouchableOpacity style={styles.mainContain}
            //         onPress={() => {
            //             console.log("data____", data)
            //             this.setState({ value: index, genrativeArtWebModal: true, HeaderTitle: data.name })
            //         }}>
            //         <View style={{ alignItems: 'center', flex: 0.2, }}>
            //             <Icon name={data.iconName} style={{ fontSize: 20 }} />
            //         </View>

            //         <View style={{ alignItems: 'flex-start', flex: 0.6, }}>
            //             <Text style={styles.currencyName}>{data.name}</Text>
            //         </View>

            //         <View style={{ alignItems: 'center', flex: 0.2, }}>

            //         </View>
            //     </TouchableOpacity>
            // </>
        )
    }


    loadEmptyView() {
        return (
            <View style={styles.emptyListView}>
                <Text style={styles.emptyText}>{I18n.t('noDataFound')}</Text>
            </View>
        );
    }

    genrativeArtWebModal() {
        console.log("IndeX___", this.state.IndeX)
        let item = MusicList[this.state.IndeX]
        console.log();

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.genrativeArtWebModal}
                onRequestClose={() => { this.setState({ genrativeArtWebModal: false }) }}>
                <View style={styles.modalViewContainer}>
                    <View style={{ elevation: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.34, shadowRadius: 6.27, paddingHorizontal: '5%', width: '100%', flexDirection: 'row', alignItems: 'center', height: '9%', backgroundColor: '#315e77' }}>
                        <Icon
                            style={{ fontSize: 20, color: 'white' }}
                            name='close'
                            type='FontAwesome'
                            onPress={() => this.setState({ genrativeArtWebModal: false })} />
                    </View>
                    <MusicDetailScreen headerData={{ title: this.state.HeaderTitle }}
                        onModalClose={(value) => this.setState({ genrativeArtWebModal: value })}
                        onModalMusic={(value) => { value == false ? this.props.onModalClose(false) : null }}
                    />
                </View>
            </Modal>
        )
    }

    render() {
        I18n.locale = "en"
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.header}>{I18n.t('musicTitle')}</Text>
                    <View style={{ marginBottom: 50, marginHorizontal: 10 }}>
                        <FlatList
                            numColumns={2}
                            data={MusicList}
                            keyExtractor={a => a.catTitle}
                            renderItem={({ item, index }) => this.renderItem(item, index)}
                        />
                    </View>
                </View>
                {/* <View style={{ alignItems: 'center', margin: 20 }}>
                    <Text style={{ fontSize: 20 }}>Music Genre</Text>
                </View>
                <View style={{ borderTopWidth: 1 }}>
                    <FlatList
                        data={MusicList}
                        contentContainerStyle={styles.listContainer}
                        renderItem={({ item, index }) => this.renderItem(item, index)}
                        ListEmptyComponent={() => this.loadEmptyView()}
                    />
                </View> */}
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
        // paddingHorizontal: 10,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#DDDDE0',
        height: 60,
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
    }
})

export default MusicGenScreen