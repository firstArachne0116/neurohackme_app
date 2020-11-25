import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Dimensions,
    ActivityIndicator,
    Image,
    TextInput,
    TouchableOpacity,
    NativeModules
} from 'react-native';
import { Actions, Router } from 'react-native-router-flux';
import { Value } from 'react-native-reanimated';
import { images } from './assets';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'native-base';

import auth from '@react-native-firebase/auth';
import {
    LoginManager, AccessToken
} from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

const { RNTwitterSignIn } = NativeModules

const Constants = {
    TWITTER_COMSUMER_KEY: "F2eieVo0lwm24gkH2cw89xptI",
    TWITTER_CONSUMER_SECRET: "UplRHuONieQr2xO4x5dImP5VzWMBjphabY5EQVJPU1hfPo6VBh"
}

class SignInScreen extends React.Component {
    constructor(props) {
        super(props),
            this.state = {
                email: "",
                password: "",
                loader: false
            }
    }

    async UNSAFE_componentWillMount() {
        console.log("Sign_Up_innnnn");
        await GoogleSignin.configure({
            webClientId: '707370587885-8fgr6uhnibi9cqicnn0178dq5qaqhvr3.apps.googleusercontent.com'
        })
    }

    componentDidMount() {
    }

    userSignUP_API(token) {
        console.log('id_token', token)

        if (token) {
            let details = {
                'email': this.state.email.toString(),
                'password': this.state.password.toString(),
            };
            console.log("login_Details_________:", details);
            let formBody = [];
            for (let property in details) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            fetch("https://neurohack.app/api/login", {
                method: 'POST',
                body: formBody,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token
                },
            })
                .then((res) => {
                    // console.log('RES__', res)
                    return res.json()
                })
                .then((result) => {
                    console.log('RESULT____', result)
                    if (result.data != null) {
                        AsyncStorage.setItem("UserDetails", JSON.stringify(result.data))
                        AsyncStorage.setItem("Type", JSON.stringify(result.type))
                        this.temp()
                        Actions.osu()
                        this.setState({ loader: false })
                    } else if (result.msg == "Your account has not been verified.") {
                        console.log('in not verofied', result)
                        this.setState({ loader: false })
                    } else {

                    }
                })
                .catch((error) => {
                    console.log('Error__', error)
                    this.setState({ loader: false })
                })
        }
    }


    _SignIn() {
        console.log("email:", this.state.email, "password:", this.state.password);
        let filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.email == '') {
            alert('Please enter email id')
        } else if (this.state.password == '') {
            alert('Please enter passweord')
        } else if (filter.test(this.state.email) == false) {
            alert('Please enter valid email address')
        } else {
            this.setState({ loader: true })

            auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((response) => {
                    console.log("firebase_auth_response___", response);

                    auth().currentUser.getIdTokenResult()
                        .then(token => {
                            var IDtoken = token.token
                            console.log("token_____", IDtoken);
                            this.userSignUP_API(IDtoken)
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

    temp() {
        AsyncStorage.getItem("Token").then((responseuser) => {
            console.log("Token_reaponse", JSON.parse(responseuser))
            let token = JSON.parse(responseuser)
            console.log("token_____", token);
        })
    }

    SocialSignUP_API(token, type) {
        this.setState({ loader: true })
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
                .then(async (result) => {
                    console.log("resulte___", result);
                    await AsyncStorage.setItem("Token", JSON.stringify(result.data))
                    await AsyncStorage.setItem("Type", JSON.stringify(result.type))
                    this.temp()
                    Actions.osu()
                    this.setState({ loader: false })
                })
                .catch((error) => {
                    console.log('Error__', error)
                    this.setState({ loader: false })
                })
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
                        this.SocialSignUP_API(idToken.token)
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

    firebaseTwitterAuth(token) {
        console.log('GOT TOKEN', token);

    }

    async _twitterSignIn() {
        RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
        // RNTwitterSignIn.logIn().then(async (loginData) => {
        //     console.log("twitter_loginData____", loginData)
        //     const { authToken, authTokenSecret, email } = loginData
        //     console.log("Emai_Id___", email,
        //         "authToken___", authToken,
        //         "authTokenSecret___", authTokenSecret);
        //     if (authToken && authTokenSecret) {
        //         console.log("twitter_In")

        //         const twitterCredential = await auth.TwitterAuthProvider.credential(authToken, authTokenSecret);

        //         console.log("twitterCredential", twitterCredential);
        //         // var idToken = await auth().currentUser.getIdTokenResult()
        //         // console.log('twitter id token', idToken)
        //         // auth().currentUser.getIdTokenResult()
        //         //     .then(currentUser => {
        //         //         console.log('email_pwd_TOKEN', currentUser)
        //         //         this.SocialSignUP_API(currentUser.token)
        //         //     }).catch((error) => {
        //         //         console.log('twitter weror', error);
        //         //     })

        //     }
        // }).catch(error => {
        //     console.log('test', error)
        //     // alert("please try later")
        // })
        var twitterLogin = await RNTwitterSignIn.logIn()
        console.log('TWIETTER ', twitterLogin)
        const twitterCredential = await auth.TwitterAuthProvider.credential(twitterLogin.authToken, twitterLogin.authTokenSecret);
        console.log('auth provider', twitterCredential)
        var retriveCredentials = await auth().signInWithCredential(twitterCredential)
        console.log('retrive credentials', retriveCredentials)
        var getIdToken = await auth().currentUser.getIdTokenResult()
        console.log('ID TOkne', getIdToken)
        this.SocialSignUP_API(getIdToken.token, getIdToken.signInProvider)

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

                        this.SocialSignUP_API(idToken.token, idToken.signInProvider)
                    })
            })
            .catch((err) => {
                console.log('----Error_response-------------', err);
            })
            .done();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <ScrollView>

                    <View style={styles.mainView}>
                        <View style={{ width: '100%', flexDirection: 'row', }}>
                            <TouchableOpacity style={{ flex: 0.1 }}
                                onPress={() => { Actions.pop() }}>
                                <Icon name={'chevron-left'} type={'Feather'} style={{ flex: 0.1, fontSize: 25, }} />
                            </TouchableOpacity>
                            <View style={{ alignItems: 'center', flex: 0.8 }}>
                                <Text style={styles.headerText}>SIGN IN</Text>
                            </View>
                            <View style={{ flex: 0.1 }}></View>
                        </View>


                        <View style={styles.textInputViewStyle}>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder='Email'
                                placeholderTextColor={'gray'}
                                autoCapitalize='none'
                                onChangeText={text => this.setState({ email: text })}
                                value={this.state.email}
                                returnKeyType='next'
                                keyboardType="email-address"
                                onSubmitEditing={() => this.passwordRef.focus()}
                            />
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder='Password'
                                placeholderTextColor={'gray'}
                                secureTextEntry={true}
                                onChangeText={text => this.setState({ password: text })}
                                value={this.state.password}
                                ref={passwordRef => this.passwordRef = passwordRef}
                            />

                            <View style={styles.forgotPasswordView}>
                                <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                            </View>

                            <View style={styles.submitView}>
                                <TouchableOpacity
                                    onPress={() => { this._SignIn() }}
                                    style={styles.submitTouch}>
                                    <Text style={styles.submitText}>Submit</Text>
                                </TouchableOpacity>
                            </View>

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
                                <Text style={styles.signInText}>Don't have an account? </Text>
                                <TouchableOpacity onPress={() => { Actions.signUpScreen() }}>
                                    <Text style={styles.signUpText}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </ScrollView>
                {this.state.loader && (
                    <ActivityIndicator
                        style={styles.loader}
                        size="large"
                    />
                )}
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
        fontWeight: '500'
    },
    textInputViewStyle: {
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 5,
        width: '100%',
        marginTop: 80,
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
    forgotPasswordView: {
        width: '100%',
        paddingTop: 25,
        paddingBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    forgotPasswordText: {
        fontSize: 13,
        color: 'gray'
    },
    submitView: {
        alignItems: 'center'
    },
    submitTouch: {
        elevation: 3,
        backgroundColor: '#5a85e3',
        paddingHorizontal: '40%',
        paddingVertical: 12,
        borderRadius: 30,
    },
    submitText: {
        color: 'white',
        fontSize: 16
    },
    signInView: {
        flexDirection: 'row',
        marginTop: 20,
        width: '100%',
        paddingVertical: 20,
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

export default SignInScreen;