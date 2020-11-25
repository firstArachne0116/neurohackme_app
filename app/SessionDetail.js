import React, { Component } from 'react';
import { useState } from 'react';

import { View, Modal, ScrollView, StyleSheet, Dimensions, SectionList, TouchableOpacity } from 'react-native';
import {
    Button,
    ThemeProvider,
    Text,
    ListItem,
    Icon,
    Avatar,
    Divider,
    SearchBar,
    Switch,
    Input
} from 'react-native-elements';
import colors from '../config/colors';
import { Actions } from 'react-native-router-flux';
import AllStrings from './local/AllStrings';
import GenerativeScreen from './GenerativeScreen';
import MusicGenScreen from './MusicGenScreen';
import ChooseVoiceScreen from './ChooseVoiceScreen';

import '../config/global.js'

var props, switchBlink;

function newScreen() {

    global.blinkScreen_iOS = true;

    Actions.sessionScreen({ item: props.sessionItem, switchBlink: switchBlink })

}

function hypnosisScreen() {
    // Actions.hypnosisScreen()
    Actions.hypnosisScreen({ item: props.sessionItem, switchBlink: switchBlink })
}

function musicScreen() {
    Actions.musicScreen()
}

function generaativeArt() {
    // Actions.generativeScreen()

}

function funcaScreen() {
    console.log("slow!");
    Actions.functionalComp()
}

toggleModal = () => {
    // console.log("cacheo:" + props);
    //   setModalVisible(!isModalVisible);
    console.log('me llegsso');

};

class SessionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genrativeArtModal: false,
            chooseSongModal: false,
            musicModal: false,
            switchValue: false,
            selected: false,
        };
        console.log("propssssss", this.props);
    }

    componentDidMount() {
        // this.setState({
        //   message: 'i got changed',
        // }); 
        console.log('this_props___Session', this.props);
        props = this.props;
        switchBlink = false;
    }

    //switchero
    state = { switchValue: false }
    toggleSwitch = (value) => {
        //onValueChange of the switch this function will be called
        this.setState({ switchValue: value })
        console.log("chambeo: " + value)
        console.log("stado: " + !this.state.switchValue)

        switchBlink = !this.state.switchValue;
        //state changes according to switch
        //which will result in re-render the text
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

    musicModal() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.musicModal}
                onRequestClose={() => { this.setState({ musicModal: false }) }}>
                <View style={styles.modalViewContainer}>
                    <MusicGenScreen />
                </View>
            </Modal >
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
                    <ChooseVoiceScreen />
                </View>
                <View style={{ position: "absolute", bottom: 0, marginBottom: 10, width: '100%' }}>
                    <TouchableOpacity
                        onPress={() => { this.setState({ chooseSongModal: false }) }}
                        style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5, marginHorizontal: 15, borderRadius: 20, borderWidth: 0.5, backgroundColor: '#C4C4C4' }}>
                        <Text style={{ color: 'white', fontSize: 23 }}>All languages</Text>
                    </TouchableOpacity>
                </View>
            </Modal >
        )
    }

    render() {
        return (
            <ThemeProvider>
                <ScrollView>
                    <View style={styles.headerContainer}>
                        <Avatar
                            large
                            rounded
                            source={this.props.sessionIcon}
                            // source={this.props.sessionIcon.sessionIcon}
                            icon={"l.icon"}
                            title={"tito"}
                            key={"ff"}
                            activeOpacity={0.7}
                        />
                        <Text style={{ fontSize: 18, color: 'black' }}>{this.props.sessionItem.subtitle}</Text>
                        {/* <Text style={{ fontSize: 18, color: 'black' }}>{this.props.sessionItem.sessionItem.subtitle}</Text> */}
                        <Button
                            title={AllStrings.SessionDetail.loadSession}
                            buttonStyle={{
                                backgroundColor: 'green',
                                borderWidth: 2,
                                borderColor: 'white',
                                borderRadius: 30,
                            }}
                            containerStyle={{ marginVertical: 10, height: 50, width: 250 }}
                            titleStyle={{ fontWeight: 'bold' }}
                            onPress={() => newScreen()}
                        />
                    </View>
                    <View><Text style={{ marginLeft: 5 }}>{AllStrings.SessionDetail.visualSettings}</Text></View>
                    <View style={styles.list}>
                        <ListItem title={AllStrings.SessionDetail.blinkHeadGear}
                            leftIcon={{ name: 'eye', type: 'material-community' }}
                            switch={{
                                onValueChange: this.toggleSwitch,
                                value: !this.state.switchValue
                            }}
                            bottomDivider
                            onPress={() => toggleModal()}
                        />
                        <ListItem title={AllStrings.SessionDetail.flickerScreen}
                            leftIcon={{ name: 'surround-sound', type: 'material-community' }}
                            switch={{
                                onValueChange: this.toggleSwitch,
                                value: this.state.switchValue,
                            }}
                            bottomDivider />

                        <ListItem
                            title={AllStrings.SessionDetail.generativeArt}
                            leftIcon={{ name: 'music-note-sixteenth', type: 'material-community' }}
                            bottomDivider
                            containerStyle={{ height: 45 }}
                            // onPress={() => generaativeArt()}  
                            onPress={() => this.setState({ genrativeArtModal: true })} />

                        <ListItem
                            title={'Music Genre'}
                            leftIcon={{ name: 'music-note-sixteenth', type: 'material-community' }}
                            bottomDivider
                            containerStyle={{ height: 45 }}
                            // onPress={() => generaativeArt()}  
                            onPress={() => this.setState({ musicModal: true })} />

                        <ListItem
                            title={'Choose song'}
                            leftIcon={{ name: 'music-note-sixteenth', type: 'material-community' }}
                            bottomDivider
                            containerStyle={{ height: 45 }}
                            // onPress={() => generaativeArt()}  
                            onPress={() => this.setState({ chooseSongModal: true })} />

                    </View>
                    <View><Text style={{ marginLeft: 5 }}>{AllStrings.SessionDetail.audioSettings}</Text></View>
                    <View style={styles.list}>
                        <ListItem title={AllStrings.SessionDetail.binauralFrequency}
                            leftIcon={{ name: 'waves', type: 'material-community' }}
                            rightTitle={`${this.props.sessionItem.freqHz} Hz`}
                            rightTitleStyle={{ color: 'green' }} bottomDivider />
                        <ListItem title={AllStrings.SessionDetail.sessionDuration}
                            leftIcon={{ name: 'camera-timer', type: 'material-community' }}
                            rightTitle={`${this.props.sessionItem.durationMinutes} minutes`}
                            rightTitleStyle={{ color: 'green' }} bottomDivider />
                        <ListItem title={AllStrings.SessionDetail.leftFrequency}
                            leftIcon={{ name: 'headphones', type: 'material-community' }}
                            rightTitle={`${this.props.sessionItem.leftEarFreq} Hz`}
                            rightTitleStyle={{ color: 'green' }} bottomDivider />
                        <ListItem title={AllStrings.SessionDetail.rightFrequency}
                            leftIcon={{ name: 'headphones', type: 'material-community' }}
                            rightTitle={`${this.props.sessionItem.rightEarFreq} Hz`}
                            rightTitleStyle={{ color: 'green' }} bottomDivider bottomDivider
                            onPress={() => funcaScreen()} />
                        <ListItem title={AllStrings.SessionDetail.hypnoticInduction}
                            leftIcon={{ name: 'voicemail', type: 'material-community' }}
                            rightTitle={AllStrings.SessionDetail.whiteCubeByMe}
                            rightTitleStyle={{ color: 'green' }} bottomDivider bottomDivider
                            onPress={() => hypnosisScreen()} />
                        <ListItem title={AllStrings.SessionDetail.backgroundMusic}
                            leftIcon={{ name: 'music-note-sixteenth', type: 'material-community' }}
                            rightTitle={AllStrings.SessionDetail.chopin}
                            rightTitleStyle={{ color: 'green' }} bottomDivider bottomDivider
                            onPress={() => musicScreen()} />
                        <ListItem title={AllStrings.SessionDetail.backgroundNise}
                            leftIcon={{ name: 'ear-hearing', type: 'material-community' }}
                            rightTitle={AllStrings.SessionDetail.whiteNoise}
                            rightTitleStyle={{ color: 'green' }} bottomDivider bottomDivider />
                    </View>
                </ScrollView>
                {this.genrativeArtModal()}
                {this.musicModal()}
                {this.chooseSongModal()}
            </ThemeProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFF4',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#d3d3d3',
    },
    containerInline: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'

    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#000000',
    },
    webContainer: {
        alignSelf: 'stretch',

    },
    loader: {
        position: "absolute",
        top: Dimensions.get('window').height / 3,
        left: Dimensions.get('window').width / 2
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
    },
    separatorComponent: {
        backgroundColor: 'white',
    },
    separator: {
        marginLeft: 58,
    },
    headerSection: {
        height: 30,
    },
    list: {
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: colors.greyOutline,
        backgroundColor: '#fff',
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
});

export default SessionDetail;