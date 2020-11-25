import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    Button,
} from 'react-native-elements';
import { WebView } from 'react-native-webview';
import '../config/global.js'
import AllStrings from './local/AllStrings';


const HTML_iOS = require('../resources/nanoliner.html');


const isAndroid = Platform.OS === 'android';
var HTML_android;
var webView, props;

console.log("Session screen loaded")
console.log("global.blinkScreen_iOS:: " + global.blinkScreen_iOS)



// function stopSession() {
//     Actions.pop()

//     // console.log("this.webView: "+this.webView)

//     // this.webView.postMessage( "Post message from react native" );

// }

// function startSession() {
//     // this.state.playingSession = true;

//     // console.log("*** playing: "+this.props.state )

//     // console.log(webView)
//     const jacinto = {
//         "leftEarFreq": props.item.leftEarFreq,
//         "rightEarFreq": props.item.rightEarFreq,
//         "switchBlink": props.switchBlink
//     }


//     console.log(jacinto)
//     var myJSON = JSON.stringify(jacinto);

//     webView.postMessage(myJSON);

// }

class SessionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playingSession: false
        };
        this.webView = null;
        this.startSession = this.startSession.bind(this);
    }

    componentDidMount() {

        console.log("global.blinkScreen_iOS:: " + global.blinkScreen_iOS)
        console.log("this.props" + this.props)

        webView = this.webView;

        HTML_android = 'file:///android_asset/nano2.html'

        // HTML_android = `file:///android_asset/nano.html?leftEar=${this.props.item.leftEarFreq}&rightEar=${this.props.item.rightEarFreq}&lightBlink=${this.props.switchBlink}&lightFreq=11`


        // HTML_ios = require(`../resources/nano.html?leftEar=${this.props.item.leftEarFreq}&rightEar=${this.props.item.rightEarFreq}&lightBlink=${this.props.switchBlink}&lightFreq=11`);

        const path0 = `../resources/nano.html?leftEar=${this.props.item.leftEarFreq}`
        // HTML_ios = require(path0);

        // HTML_android = `file:///android_asset/nano.html?leftEar=500&rightEar=550`

        // HTML_android = 'file:///android_asset/binaura.html'

        console.log("*** this.props.item :")
        console.log("item_________", this.props.item)

        props = this.props;
        console.log("*** this.state.playingSession :" + this.state.playingSession)
        // this.webView.postMessage( "abc" );
        // startSession();
    }

    hideSpinner() {
        this.setState({ visible: false });
    }

    startSession() {
        console.log("trollo llo ")
        // console.log(this.state.playingSession)

        // this.state.playingSession = true;
        this.setState({ playingSession: true });
        // console.log("*** playing: "+this.props.state )

        // console.log(webView)
        const jacinto = {
            "leftEarFreq": props.item.leftEarFreq,
            "rightEarFreq": props.item.rightEarFreq,
            "switchBlink": props.switchBlink,
            "lightFreq": props.item.freqHz
        }

        console.log("*** * *** saliendo auzx: " + props.item.freqHz)
        console.log(jacinto)
        var myJSON = JSON.stringify(jacinto);
        webView.postMessage(myJSON);
    }

    stopSession() {
        Actions.pop()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.welcome}> {this.props.item.title} </Text>
                    {this.state.playingSession ?
                        <Button
                            title={AllStrings.SessionDetail.stopSession}
                            buttonStyle={{
                                backgroundColor: 'red',
                                borderWidth: 2,
                                borderColor: 'white',
                                borderRadius: 30,
                            }}
                            containerStyle={{ marginVertical: 10, height: 50, width: 250 }}
                            titleStyle={{ fontWeight: 'bold' }}
                            onPress={this.stopSession}
                        /> :
                        <Button
                            title={AllStrings.SessionDetail.startSession}
                            buttonStyle={{
                                backgroundColor: 'green',
                                borderWidth: 2,
                                borderColor: 'white',
                                borderRadius: 30,
                            }}
                            containerStyle={{ marginVertical: 10, height: 50, width: 250 }}
                            titleStyle={{ fontWeight: 'bold' }}
                            onPress={this.startSession}
                        />}

                </View>

                <WebView
                    onLoad={() => this.hideSpinner()}
                    ref={(webView) => this.webView = webView}
                    originWhitelist={['*']}
                    style={styles.webContainer}
                    source={isAndroid ? { uri: HTML_android } : HTML_iOS}
                />
                {this.state.visible && (
                    <ActivityIndicator
                        style={styles.loader}
                        size="large"
                    />
                )}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',

    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    containerInline: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'

    },
    welcome: {
        paddingTop: 50,
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
    webContainer: {
        alignSelf: 'stretch',
        color: '#FF0000',

    },
    loader: {
        position: "absolute",
        top: Dimensions.get('window').height / 3,
        left: Dimensions.get('window').width / 2
    }
});

export default SessionScreen;