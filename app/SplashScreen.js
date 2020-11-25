import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    BackHandler,
    Image
} from 'react-native';
import { Actions, Router } from 'react-native-router-flux';
import { images } from './assets';
import AsyncStorage from '@react-native-community/async-storage';

class SplashScreen extends React.Component {
    constructor(props) {
        super(props),
            this.state = {

            }
    }

    componentDidMount() {
        this.TimeOut()
    }

    async _getAllData() {
        let UserDetails = await AsyncStorage.getItem("UserDetails");
        let LoginToken = await AsyncStorage.getItem("Token")

        // UserDetails = null

        await console.log("UserDetails___", UserDetails, "Token:", LoginToken);
        if (LoginToken != null) {
            console.log("1st_if_condition");
            // alert("Osu Screen")
            Actions.osu()
        } else {
            console.log("2nd_else_condition");
            // alert("Welcome Screen")
            // Actions.osu()
            Actions.welcomeScreen()
        }
    }

    TimeOut() {
        setTimeout(() => {
            console.log("SplashScreen__");
            // Actions.osu()
            // Actions.signInScreen()
            // Actions.welcomeScreen()
            this._getAllData()
        }, 1000);
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
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({

});

export default SplashScreen;