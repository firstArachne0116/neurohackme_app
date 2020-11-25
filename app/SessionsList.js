import React, { Component } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Dimensions, Modal,
    TouchableOpacity,
    Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    Button,
    ThemeProvider,
    Text,
    ListItem,
} from 'react-native-elements';
// import TouchableScale from 'react-native-touchable-scale';
// import { LinearGradient } from '../src/components/LinearGradient';
// import SessionDetail from './SessionDetail';
import NewSessionDetail from './NewSessionDetail';
import SessionDetail from './SessionDetail';
import { images } from './assets';
import { Icon } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import ColorDataArray from '../config/ColorDataArray';
var imageSession;
const sessionsArraya = require('../resources/JSON/hypno_programs.json')

// var ColorDataArray = [
//     "#FA4248", "#7A5EFA", "#1776A7", "#ffb176", '#7CB5EC', '#90ED7D', '#F7A25D', '#8085E9', '#F15C80', '#9c27b0', "#009688", "#cddc39", "#4caf50", "#ff9800",
//     "#e65100", "#9e9e9e", "#795548", "#fff176", "#ffab91", "#8d6e63", "#76ff03", "#1B5E20", "#FFFF00", "#EC407A"
// ]

function newScreen(item) {
    Actions.sessionDetail({ title: item.title, sessionItem: item, sessionIcon: imageSession })
}

class SessionsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            IndeX: null,
            sessionData: []
        };
    }

    async componentDidMount() {
        imageSession = this.props.sessionIcon
        this.setState({ sessionData: [] })
        await this._SessionData()
    }

    _SessionData() {
        var sessionArray = []
        console.log("SessionsList_this_props__________", this.props);
        console.log("SessionsList__________", sessionsArraya);
        sessionsArraya.map(async (item) => {
            console.log("item__", item)
            console.log("item_catTitle_this_props_catGui__", item.catGuid[0] == this.props.catGuid)
            if (item.catGuid[0] == this.props.catGuid) {
                console.log("__Innnnn__")
                sessionArray.push(item)
            }
            console.log("sessionArray_____", sessionArray);
            await this.setState({ sessionData: sessionArray })
        })
    }

    newScreen() {
        console.log("sessionData_____", this.state.sessionData);
        console.log("___item____________Open", this.props.sessionItems);
        console.log("___IndeX", this.state.IndeX);
        // console.log("data___", this.props.sessionItems[this.state.IndeX]);
        console.log("data___", this.state.sessionData[this.state.IndeX]);
        let item = this.state.sessionData[this.state.IndeX]
        console.log("modal_item__", item);
        console.log("item.programGuid__", item.programGuid);

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => { this.setState({ modalVisible: false }) }}>
                <View style={styles.modalViewContainer}>
                    <View style={{
                        elevation: 10,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 5, },
                        shadowOpacity: 0.34, shadowRadius: 6.27,
                        paddingHorizontal: '5%', width: '100%', flexDirection: 'row',
                        alignItems: 'center', height: '9%', backgroundColor: '#315e77',
                        paddingTop: 10,
                    }}>
                        <Icon
                            style={{ padding: 10, fontSize: 22, color: 'white' }}
                            name='close'
                            type='FontAwesome'
                            onPress={() => this.setState({ modalVisible: false })} />

                        <Text style={{ fontSize: 20, color: 'white', marginLeft: 30, }} numberOfLines={1} >{item.title}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        {/* <SessionDetail title={{ title: item.title }} sessionItem={{ sessionItem: item }} sessionIcon={{ sessionIcon: imageSession }} /> */}
                        <NewSessionDetail
                            title={{ title: item.title }}
                            sessionItem={{ sessionItem: item }}
                            sessionIcon={{ sessionIcon: imageSession }}
                            sessionListProgramGuid={item.programGuid}
                        />
                    </View>
                    {/* <TouchableOpacity
                        style={{ alignItems: 'center', justifyContent: "center", height: '11%', backgroundColor: '#7cfb77' }}
                        onPress={() => this.setState({ modalVisible: false })}>
                        <Text style={{ fontSize: 17, color: 'white', fontWeight: '700' }}>Start Session</Text>
                        <Text style={{ fontSize: 17, color: 'white', fontWeight: '700' }}>~00 min</Text>
                    </TouchableOpacity> */}
                </View>
            </Modal >
        )
    }

    render() {
        const renderRow = ({ item, index }) => {
            console.log("index___", index, "session_item___", item);
            // console.log("index___IndeX", this.state.IndeX);
            return (
                <View style={{ flex: 1, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 5, marginVertical: 5, }}>
                    <TouchableOpacity
                        // Old....
                        // onPress={() => { newScreen(item) }}

                        // New...
                        onPress={() => { this.setState({ modalVisible: true }), this.setState({ IndeX: index }) }}

                        style={{ elevation: 5, backgroundColor: ColorDataArray[index], borderRadius: 5, width: '100%', }}>
                        {/* style={{ elevation: 5, backgroundColor: [...ColorDataArray.repeat[index]], borderRadius: 5, width: '100%', }}> */}
                        <Image source={images.bgImage} style={{ height: 125, width: '100%', borderTopRightRadius: 5, borderTopLeftRadius: 5, borderBottomLeftRadius: 20 }} />
                        <Text numberOfLines={1} style={{ marginHorizontal: 10, marginTop: 10, color: 'white', fontWeight: '700' }}>{item.title}</Text>
                        {/* <Text numberOfLines={1} style={{ marginHorizontal: 10, marginTop: 10, color: 'white', fontWeight: '700' }}>{item.title} | {item.durationMinutes} min | {item.freqHz}Hz </Text> */}
                        <Text style={{ marginHorizontal: 10, color: 'white', fontSize: 12 }} numberOfLines={1}>{item.subtitle_1}</Text>
                        <View style={{ flexDirection: 'row', }}>
                            <Icon
                                style={{ margin: 5, color: 'white', fontSize: 18 }}
                                name='timer'
                                type='MaterialIcons'
                            />
                            <Text style={{ color: 'white', alignSelf: 'center' }}>{item.duration} min</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                // <ListItem
                //     component={TouchableScale}
                //     friction={90}
                //     tension={100}
                //     activeScale={0.95}
                //     leftIcon={{ name: item.iconName, type: item.iconType }}
                //     onPress={() => { newScreen(item) }}
                //     // onPress={() => { this.setState({ modalVisible: true }), this.setState({ IndeX: index }) }}
                //     ViewComponent={LinearGradient}
                //     title={item.title}
                //     titleStyle={{ color: 'black', fontWeight: 'bold' }}
                //     subtitleStyle={{ color: 'black' }}
                //     subtitle={item.subtitle}
                //     chevronColor="black"
                //     containerStyle={{ marginHorizontal: 16, marginVertical: 8, borderRadius: 8, }}
                // />
            );
        };
        console.log("this.props.sessionItems___", this.props.sessionItems);
        return (
            <ThemeProvider>
                <View style={styles.container}>
                    <Text style={styles.header}>{this.props.sessionDescription} </Text>
                    <FlatList
                        data={this.state.sessionData}
                        // data={this.props.sessionItems}
                        keyExtractor={a => a.title}
                        renderItem={renderRow}
                    />
                </View>
                {
                    this.state.IndeX != null &&
                    this.newScreen()
                }
            </ThemeProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginBottom: 50,
        backgroundColor: '#232E3F',
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
    header: {
        marginVertical: 10,
        fontSize: 18,
        paddingLeft: 14,
        paddingRight: 14,
        color: 'white'
    },
    // modal style...........
    modalViewContainer: {
        flex: 1,
        backgroundColor: '#1c272c',
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

export default SessionsList;
