import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const data = [
    {
        title: 'Title 1',
        text: 'Description.\nSay something cool',
        // image: require('../../assets/1.jpg'),
        bg: '#59b2ab',
    },
    // {
    //     title: 'Title 2',
    //     text: 'Other cool stuff',
    //     // image: require('../../assets/2.jpg'),
    //     bg: '#febe29',
    // },
    {
        title: 'Rocket guy',
        text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
        // image: require('../../assets/3.jpg'),
        bg: '#22bcb5',
    },
];

// type Item = typeof data[0];

// export default class IntoScreen extends React.Component {
class IntoScreen extends React.Component {
    _renderItem = ({ item }: { item: Item }) => {
        // console.log("item____", item);
        return (
            <View
                style={{ flex: 1, backgroundColor: item.bg }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <Text style={styles.title}>{item.title}</Text>
                    {/* <Image source={item.image} style={styles.image} /> */}
                </SafeAreaView>
            </View>

            // <View
            //     style={[
            //         styles.slide,
            //         {
            //             backgroundColor: item.bg,
            //         },
            //     ]}>
            //     <Text style={styles.title}>{item.title}</Text>
            //     <Image source={item.image} style={styles.image} />
            //     <Text style={styles.text}>{item.text}</Text>
            // </View>
        );
    };

    _keyExtractor = (item: Item) => item.title;
    _renderButton = () => {
        <View
            style={{
                // flex: 1,
                backgroundColor: 'red',
                borderWidth: 5
            }}>

        </View>
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent backgroundColor="transparent" />
                <AppIntroSlider
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    bottomButton={this._renderButton}
                    // keyExtractor={this._keyExtractor}
                    // renderItem={this._renderItem}
                    showSkipButton
                    // data={data}
                    showPrevButton
                    data={data}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    image: {
        width: 320,
        height: 320,
        marginVertical: 32,
    },
    text: {
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
    },
    title: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
    },
});

export default IntoScreen;











///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////



// import React, { Component } from 'react';
// import { SafeAreaView, StatusBarIOS, StyleSheet, ScrollView, View, Text, StatusBar, BackHandler, Image } from 'react-native';
// import { Actions, Router } from 'react-native-router-flux';
// import { images } from './assets';
// import AsyncStorage from '@react-native-community/async-storage';
// import AppIntroSlider from 'react-native-app-intro-slider';

// const slides = [
//     {
//         key: 'one',
//         title: 'Title 1',
//         text: 'Description.\nSay something cool',
//         // image: require('./assets/1.jpg'),
//         backgroundColor: '#59b2ab'
//     },
//     {
//         key: 'two',
//         title: 'Title 2',
//         text: 'Other cool stuff',
//         // image: require('./assets/2.jpg'),
//         backgroundColor: '#febe29'
//     },
//     {
//         key: 'three',
//         title: 'Rocket guy',
//         text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
//         // image: require('./assets/3.jpg'),
//         backgroundColor: '#22bcb5'
//     }
// ];

// class IntoScreen extends React.Component {
//     constructor(props) {
//         super(props),
//             this.state = {

//             }
//     }

//     _renderItem(item) {
//         console.log("item___", item);
//         return (
//             <View style={{ flex: 1 }}>
//                 <Text >item.title</Text>
//                 {/* <Image source={item.image} /> */}
//                 <Text >item.text</Text>
//             </View>
//         );
//     }
//     _onDone() {
//         // User finished the introduction. Show real app through
//         // navigation or simply by controlling state
//         this.setState({ showRealApp: true });
//     }

//     render() {
//         return (
//             <View style={{ flex: 1 }}>
//                 {/* <StatusBar translucent backgroundColor="transparent" /> */}
//                 <AppIntroSlider renderItem={this._renderItem(slides)} data={slides} onDone={this._onDone()} />
//                 {/* <Text style={{ marginTop: 30 }}>Into Screen </Text> */}
//             </View>

//         );
//     }
// };

// const styles = StyleSheet.create({

// });

// export default IntoScreen;