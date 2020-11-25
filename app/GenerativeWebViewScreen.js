import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Actions } from 'react-native-router-flux';

type Props = {};

class GenerativeWebViewScreen extends Component<Props>  {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <WebView
                    source={{
                        // uri: 'http://192.168.1.5:9966/'
                        uri: 'http://178.128.215.126:9966/'
                    }}
                    style={{ flex: 1 }}
                >
                </WebView>

                {/* <View style={{ position: "absolute", height: '20%', width: '100%' }}>
                    <TouchableOpacity
                        onPress={() => { Actions.pop() }}
                        style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5, marginHorizontal: 15, borderRadius: 20, borderWidth: 0.5, backgroundColor: '#C4C4C4' }}>
                        <Text style={{ color: 'white', fontSize: 23 }}>Close</Text>
                    </TouchableOpacity>
                </View> */}
            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({

})

export default GenerativeWebViewScreen