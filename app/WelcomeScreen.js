import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    BackHandler
} from 'react-native';
import { Actions, Router } from 'react-native-router-flux';
import { images } from './assets';
import { Icon } from 'native-base';

class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props),
            this.state = {
            }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', function () {
            const scene = Actions.currentScene;
            if (scene === 'welcomeScreen') {
                BackHandler.exitApp()
            } else {
                Actions.pop()
            }
            return true
        });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#D3E1E8' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: '10%' }}>
                    <Image
                        style={{ height: 180, width: 180, }}
                        source={images.welcomeLogo}
                        resizeMode='contain'
                    />
                    <View style={{ position: 'absolute', }}>
                        <Text style={{ fontStyle: 'italic', fontWeight: '900', color: 'white', fontSize: 50 }}> NEUROHACK</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: 'black', }}>WELCOME TO{"\n"}A BETTER YOU </Text>
                    </View>
                </View>
                <View style={{ elevation: 5, width: '100%', position: 'absolute', bottom: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-around", }}>
                        <TouchableOpacity
                            onPress={() => { Actions.signInScreen() }}
                            style={{ width: '90%', borderRadius: 5, alignItems: 'center', justifyContent: 'center', padding: 10, flexDirection: 'row', backgroundColor: '#2FC860' }}>
                            <Icon name={'login'} type={'SimpleLineIcons'} style={{ marginHorizontal: 5, color: 'white', fontWeight: '600', fontSize: 20 }} />
                            <Text style={{ fontSize: 12, color: 'white', fontWeight: '700' }}>Log in </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <Text style={{ fontSize: 12, color: 'gray', }}>Don't have account yet?</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-around", }}>
                        <TouchableOpacity
                            onPress={() => { Actions.signUpScreen() }}
                            style={{ width: '90%', borderRadius: 5, alignItems: 'center', justifyContent: 'center', padding: 10, flexDirection: 'row', backgroundColor: '#1E93DC' }}>
                            <Icon name={'user-plus'} type={'Feather'} style={{ marginHorizontal: 5, color: 'white', fontWeight: '600', fontSize: 20 }} />
                            <Text style={{ fontSize: 12, color: 'white', fontWeight: '700' }}>Sign up </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({

});

export default WelcomeScreen;