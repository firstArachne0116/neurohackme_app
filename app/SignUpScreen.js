import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Keyboard,
    BackHandler,
    Image,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    NativeModules
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Actions, Router } from 'react-native-router-flux';
import { Value } from 'react-native-reanimated';
import { images } from './assets';
import Api from './services/AppApi';
import auth from '@react-native-firebase/auth';
import { Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import {
    LoginManager, AccessToken
} from 'react-native-fbsdk';

import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

const { RNTwitterSignIn } = NativeModules

const Constants = {
    TWITTER_COMSUMER_KEY: "F2eieVo0lwm24gkH2cw89xptI",
    TWITTER_CONSUMER_SECRET: "UplRHuONieQr2xO4x5dImP5VzWMBjphabY5EQVJPU1hfPo6VBh"
}

class SignUpScreen extends React.Component {
    constructor(props) {
        super(props),
            this.state = {
                email: "",
                password: "",
                reTypePassword: "",
                checked: false,
                firebase_userUID: '',
                loader: false,
                hidePassword: true,
                hideTypePassword: true
            }
    }

    async UNSAFE_componentWillMount() {
        console.log("Sign_Up_innnnn");
        await GoogleSignin.configure({
            // iosClientId: '707370587885-8fgr6uhnibi9cqicnn0178dq5qaqhvr3.apps.googleusercontent.com',
            webClientId: '707370587885-8fgr6uhnibi9cqicnn0178dq5qaqhvr3.apps.googleusercontent.com'
        })
    }

    async componentDidMount() {

    }

    userSignUP_API(token, type) {
        console.log('id token', token, "type:", type)
        if (token) {
            fetch('https://neurohack.app/api/signup', {
                headers: {
                    'Authorization': token
                },
                method: 'POST'
            })
                .then((res) => {
                    console.log('RES', res)
                    return res.json()
                })
                .then((result) => {
                    console.log("resulte___", result);
                    // AsyncStorage.setItem("UserDetails", JSON.stringify(result.success))
                    AsyncStorage.setItem("Type", JSON.stringify(result.type))
                    if (result.type == "password") {
                        Actions.signInScreen()
                    } else {
                        Actions.osu()
                    }

                    this.setState({ loader: false })
                })
                .catch((error) => {
                    console.log('Error__', error)
                    this.setState({ loader: false })
                })
        }
    }

    async _SignUp() {
        console.log("email:", this.state.email, "password:", this.state.password, "ReTypePassword:", this.state.reTypePassword);
        let filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.email == '') {
            alert('Please enter email id')
        } else if (this.state.password == '') {
            alert('Please enter passweord')
        } else if (this.state.password.length < 8) {
            alert('Please enter passweord length is 8 character or more')
        } else if (this.state.reTypePassword == '') {
            alert('Please enter Re type passweord')
        } else if (this.state.password != this.state.reTypePassword) {
            alert('Passwords does not match')
        } else if (filter.test(this.state.email) == false) {
            alert('Please enter valid email address')
        } else if (this.state.checked == false) {
            alert('Please check the terms and privacy policy')
        } else {
            this.setState({ loader: true })
            // firebse auth Api........

            auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((response) => {
                    console.log("firebase_auth_response___", response);

                    auth().currentUser.getIdTokenResult()
                        .then(token => {
                            var IDtoken = token.token
                            console.log("token_____", IDtoken);
                            fetch('https://neurohack.app/api/signup', {
                                headers: {
                                    'Authorization': token
                                },
                                method: 'POST'
                            })
                                .then((res) => {
                                    console.log('RES', res)
                                    return res.json()
                                })
                                .then((result) => {
                                    console.log("resulte___", result);
                                    Actions.signInScreen()
                                    this.setState({ loader: false })
                                })
                                .catch((error) => {
                                    console.log('Error__', error)
                                    this.setState({ loader: false })
                                })
                        })
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                        alert('That email address is already in use!');
                        this.setState({ loader: false })

                    } else if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                        alert('That email address is invalid!');
                        this.setState({ loader: false })
                    }
                });
        }
    }

    OnFbLogin() {

        LoginManager.logInWithPermissions(["email"]).then((result) => {
            console.log("result__", result);
            if (result.isCancelled) {
                throw 'User cancelled the login process';
            } else
                if (result.isCancelled == false) {
                    AccessToken.getCurrentAccessToken().then(async (data) => {
                        console.log("Data___", data)
                        const { accessToken } = data
                        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
                        console.log("facebookCredential___", facebookCredential);
                        var user = await auth().signInWithCredential(facebookCredential);
                        var idToken = await auth().currentUser.getIdTokenResult()
                        console.log('ID token ---', idToken)
                        this.userSignUP_API(idToken.token)
                    })
                } else {
                    alert("somthing worng, please try later")
                }
        },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        )
    }

    async _twitterSignIn() {
        RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
        var twitterLogin = await RNTwitterSignIn.logIn()
        console.log('TWIETTER ', twitterLogin)
        const twitterCredential = await auth.TwitterAuthProvider.credential(twitterLogin.authToken, twitterLogin.authTokenSecret);
        console.log('auth provider', twitterCredential)
        var retriveCredentials = await auth().signInWithCredential(twitterCredential)
        console.log('retrive credentials', retriveCredentials)
        var getIdToken = await auth().currentUser.getIdTokenResult()
        console.log('ID TOkne', getIdToken)
        // this.SocialSignUP_API(getIdToken.token, getIdToken.signInProvider)
        this.userSignUP_API(getIdToken.token, getIdToken.signInProvider)
        // RNTwitterSignIn.logIn()
        //     .then(loginData => {
        //         console.log("twitter_loginData____", loginData)
        //         const { authToken, authTokenSecret, email } = loginData
        //         console.log("Emai_Id___", email,
        //             "authToken___", authToken,
        //             "authTokenSecret___", authTokenSecret);
        //         if (authToken && authTokenSecret) {
        //             console.log("twitter_In")

        //             const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);

        //             console.log("twitterCredential", twitterCredential);

        //             auth().currentUser.getIdTokenResult(twitterCredential)
        //                 .then(currentUser => {
        //                     console.log('email_pwd_TOKEN', currentUser)
        //                     this.userSignUP_API(currentUser.token)
        //                 }).catch(error => {
        //                     console.log("error__11", error)
        //                 })
        //         }
        //     })
        //     .catch(error => {
        //         console.log("error__22", error)
        //     }
        //     )
    }

    async OnGmailLogin() {
        GoogleSignin.signIn()
            .then(user => {
                const idToken = user.idToken;
                const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                auth().signInWithCredential(googleCredential)
                    .then(async (response) => {
                        console.log("in_response___", response);
                        var idToken = await auth().currentUser.getIdTokenResult()
                        console.log('ID TOKEN', idToken)

                        this.userSignUP_API(idToken.token, idToken.signInProvider)
                    })
            })
            .catch((err) => {
                console.log('----Error_response-------------', err);
            })
            .done();
    }

    // _Logout() {
    //     auth()
    //         .signOut()
    //         .then(() => console.log('User signed out!'));
    // }

    _iconPress() {
        this.setState({ hidePassword: this.state.hidePassword == true ? false : true })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }} >
                <ScrollView>

                    <View style={styles.mainView}>
                        <View style={{ width: '100%', flexDirection: 'row', }}>
                            <TouchableOpacity style={{ flex: 0.1 }}
                                onPress={() => { Actions.pop() }}>
                                <Icon name={'chevron-left'} type={'Feather'} style={{ flex: 0.1, fontSize: 25, }} />
                            </TouchableOpacity>
                            <View style={{ alignItems: 'center', flex: 0.8 }}>
                                <Text style={styles.headerText}>SIGN UP</Text>
                            </View>
                            <View style={{ flex: 0.1 }}></View>
                        </View>

                        <View style={styles.textInputViewStyle}>
                            <View style={{ borderColor: 'gray', borderBottomWidth: 0.7, flexDirection: 'row', alignSelf: 'center', justifyContent: 'center' }}>
                                <TextInput
                                    style={[styles.textInputStyle, { marginHorizontal: 0, padding: 0, borderBottomWidth: 0, }]}
                                    placeholder='Email'
                                    placeholderTextColor={'gray'}
                                    autoCapitalize='none'
                                    onChangeText={text => this.setState({ email: text })}
                                    value={this.state.email}
                                    returnKeyType='next'
                                    keyboardType="email-address"
                                    onSubmitEditing={() => this.passwordRef.focus()}
                                />
                            </View>

                            <View style={{ borderColor: 'gray', borderBottomWidth: 0.7, width: '95%', flexDirection: 'row', alignSelf: 'center', justifyContent: 'center' }}>
                                <TextInput
                                    style={[styles.textInputStyle, { borderBottomWidth: 0, paddingLeft: 5 }]}
                                    placeholder='Password'
                                    placeholderTextColor={'gray'}
                                    secureTextEntry={this.state.hidePassword == true ? true : false}
                                    onChangeText={text => this.setState({ password: text })}
                                    value={this.state.password}
                                    returnKeyType='next'
                                    ref={passwordRef => this.passwordRef = passwordRef}
                                    onSubmitEditing={() => this.reTypepasswordRef.focus()}
                                />
                                <Icon onPress={() => { this._iconPress() }}
                                    style={{
                                        fontSize: 16,
                                        alignSelf: 'center',
                                        paddingRight: 10,
                                        justifyContent: 'center',
                                        borderColor: '#DDDDE0',
                                        borderBottomWidth: 0.7,
                                        marginTop: 20,
                                        color: 'gray'
                                    }}
                                    name={this.state.hidePassword ? 'eye-off' : 'eye'}
                                    type={'Feather'} />
                            </View>

                            <View style={{
                                borderColor: 'gray',
                                borderBottomWidth: 0.7,
                                width: '95%',
                                flexDirection: 'row',
                                alignSelf: 'center',
                                justifyContent: 'center'
                            }}>
                                <TextInput
                                    style={[styles.textInputStyle, { borderBottomWidth: 0, paddingLeft: 5 }]}
                                    placeholder='Retype Password'
                                    placeholderTextColor={'gray'}
                                    secureTextEntry={this.state.hideTypePassword == true ? true : false}
                                    onChangeText={text => this.setState({ reTypePassword: text })}
                                    value={this.state.reTypePassword}
                                    ref={reTypepasswordRef => this.reTypepasswordRef = reTypepasswordRef}
                                />
                                <Icon onPress={() => { this.setState({ hideTypePassword: this.state.hideTypePassword == true ? false : true }) }}
                                    style={{ fontSize: 16, alignSelf: 'center', paddingRight: 10, justifyContent: 'center', borderColor: '#DDDDE0', borderBottomWidth: 0.7, marginTop: 20, color: 'gray' }}
                                    name={this.state.hideTypePassword ? 'eye-off' : 'eye'}
                                    type={'Feather'} />
                            </View>

                            <View style={styles.forgotPasswordView}>
                                <CheckBox
                                    checked={this.state.checked}
                                    containerStyle={{ marginRight: 0, paddingHorizontal: 0, }}
                                    onPress={() => this.setState({ checked: !this.state.checked })}
                                />
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={styles.forgotPasswordText}>I have read and agree to the </Text>
                                    <Text style={[styles.forgotPasswordText, { textDecorationLine: 'underline', color: '#5a85e3' }]}>terms </Text>
                                </View>
                            </View>
                            <View style={styles.tNcStyleView}>
                                <Text style={styles.forgotPasswordText}>and </Text>
                                <Text style={[styles.forgotPasswordText, { textDecorationLine: 'underline', color: '#5a85e3' }]}>privacy policy</Text>
                            </View>


                            <TouchableOpacity
                                onPress={() => { this._SignUp() }}
                                style={styles.submitTouch}>
                                <Text style={styles.submitText}>Create Account</Text>
                            </TouchableOpacity>

                            <View style={styles.signInView}>
                                <View style={styles.signInViewLine}></View>
                                <Text style={styles.signInText}>Sign in with</Text>
                                <View style={styles.signInViewLine}></View>
                            </View>

                            <View style={styles.iconView}>

                                <TouchableOpacity onPress={() => { this.OnFbLogin() }}>

                                    <Image
                                        source={images.facebook}
                                        resizeMode='contain'
                                        style={styles.iconStyle} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { this._twitterSignIn() }}>

                                    <Image
                                        source={images.twitter}
                                        resizeMode='contain'
                                        style={styles.iconStyle} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { this.OnGmailLogin() }}>
                                    <Image
                                        source={images.google}
                                        resizeMode='contain'
                                        style={styles.iconStyle} />
                                </TouchableOpacity>


                            </View>

                            <View style={styles.signUpView}>
                                <Text style={styles.signInText}>Already have an account? </Text>
                                <TouchableOpacity onPress={() => { Actions.signInScreen() }}>
                                    <Text style={styles.signUpText}>Sign In</Text>
                                </TouchableOpacity>
                            </View>

                            {/* <TouchableOpacity
                                onPress={() => { this._Logout() }}
                                style={styles.submitTouch}>
                                <Text style={styles.submitText}>Logout</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </ScrollView>
                {
                    this.state.loader && (
                        <ActivityIndicator
                            style={styles.loader}
                            size="large"
                        />
                    )
                }
            </SafeAreaView >
        );
    }
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 22,
        color: 'gray',
        fontWeight: '500',
        // width: '90%',
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInputViewStyle: {
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 5,
        width: '100%',
        marginTop: 30,
    },
    textInputStyle: {
        height: 40,
        width: '95%',
        fontSize: 16,
        borderBottomWidth: 0.7,
        borderColor: 'gray',
        padding: 2,
        marginHorizontal: 5,
        marginTop: 20,
    },
    tNcStyleView: {
        flexDirection: 'row',
        width: '100%',
        marginTop: -20,
        marginLeft: 110,
        marginBottom: 20
    },
    forgotPasswordView: {
        flexDirection: 'row',
        width: '100%',
        // paddingTop: 10,
        // paddingBottom: 15,
        alignItems: 'center',
    },
    forgotPasswordText: {
        fontSize: 13,
        color: 'gray'
    },
    submitTouch: {
        width: '95%',
        elevation: 3,
        justifyContent: 'center',
        backgroundColor: '#5a85e3',
        paddingVertical: 12,
        borderRadius: 30,
    },
    submitText: {
        color: 'white',
        fontSize: 16,
        alignSelf: 'center',
    },
    signInView: {
        flexDirection: 'row',
        marginTop: 10,
        width: '100%',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signInViewLine: {
        borderColor: 'gray',
        borderBottomWidth: 0.7,
        width: '30%',
        marginHorizontal: 20
    },
    signInText: {
        fontSize: 13,
        color: 'gray'
    },
    iconView: {
        marginVertical: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    iconStyle: {
        marginLeft: 10,
        height: 50,
        width: 50,
    },
    signUpView: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpText: {
        fontSize: 13,
        color: '#5a85e3',
        textDecorationLine: 'underline'
    },
    loader: {
        position: "absolute",
        top: Dimensions.get('window').height / 3,
        left: Dimensions.get('window').width / 2
    },

});

export default SignUpScreen;