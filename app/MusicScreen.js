// WHY IS ADDING ONE LISTENER ALWAYS???
import React, { Component, useState, useEffect } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Button, } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Tts from "react-native-tts";

const inductionDicto = require('../resources/JSON/hypno_induction.json');
const deepeningDicto = require('../resources/JSON/hypno_deepening.json');
const subjectDicto = require('../resources/JSON/hypno_subject.json');
const endingDicto = require('../resources/JSON/hypno_ending.json');
const hypnoStepMasterDicto = require('../resources/JSON/hypno_defaultSessions.json')

export default function MusicScreen() {
  //LAS VARS incluidas estado...
  // const [text, setText] = useState('');
  console.log("empezo");
  const [hypnoStepIndex, setHypnoStepIndex] = useState(0);

  // function increment(){
  //   console.log("escucho")
  //   setHypnoStepIndex(hypnoStepIndex + 1);
  //   console.log(hypnoStepIndex)
  // }
  //mount n umMount signals

  //TOGETHER MOUNT Y UNMOUNT
  useEffect(() => {
    Tts.addEventListener("tts-start", event =>
      console.log("started"),
      // this.setState({ ttsStatus: "started" })
    );
    Tts.addEventListener("tts-finish", event => {
      console.log("se fini le larvae"),
        console.log("LASRVAE EST"),
        finishedStep()
    }

      // console.log("finished samu:" + this.ScriptStepEnum.intro),
      // this.setState({ ttsStatus: "finished" })
    );
    Tts.addEventListener("tts-cancel", event =>
      console.log("cancelled"),
      // this.setState({ ttsStatus: "cancelled" })
    );
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1);
    Tts.getInitStatus().then(initTts)

    //NO FUNCIONA AUN????
    return () => {
      Tts.removeEventListener("tts-start", event =>
        console.log("removed start")
      );
      Tts.removeEventListener("tts-finish", event =>
        console.log("removed finish")
      );
      Tts.removeEventListener("tts-cancel", event =>
        console.log("removed cancel")
      );
    }
  }, []);

  function stopSession() {
    Actions.pop()
  }

  const finishedStep = () => {
    setHypnoStepIndex(3)
    console.log("cali:" + hypnoStepIndex);

    // console.log("cali2:"+ hypnoStepIndex);
    // // Tts.speak("in lak ech mako this is the portal opening");

    // const hypnoStepMaster = hypnoStepMasterDicto[0];
    // console.log(hypnoStepMaster.defaultSessionName)
    // const stepItem = hypnoStepMaster.steps[hypnoStepIndex]
    // const textStep = stepItem.text
    // console.log(textStep)

    // // Tts.stop();
    // Tts.speak(textStep);
    console.log("finik")
  }

  function addEventListeners() {
    console.log("JUST monto.");

    Tts.addEventListener("tts-start", event =>
      console.log("started"),
      // this.setState({ ttsStatus: "started" })
    );
    Tts.addEventListener("tts-finish", event =>
      console.log("se fini le larvae"),
      finishedStep()

      // console.log("finished samu:" + this.ScriptStepEnum.intro),
      // this.setState({ ttsStatus: "finished" })
    );
    Tts.addEventListener("tts-cancel", event =>
      console.log("cancelled"),
      // this.setState({ ttsStatus: "cancelled" })
    );
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1);
    Tts.getInitStatus().then(initTts);
  }

  //   INITALO
  const initTts = async () => {
    const voices = await Tts.voices();
    console.log("*** **** ** *voices")
    console.log(voices)
    //filter only english ones for the moment!

    const availableVoices = voices
      .filter(v => !v.networkConnectionRequired &&
        !v.notInstalled && v.language.startsWith('en'))
      .map(v => {
        return { id: v.id, name: v.name, language: v.language };
      });
    let selectedVoice = null;
    if (voices && voices.length > 0) {
      selectedVoice = voices[0].id;
      try {
        await Tts.setDefaultLanguage(voices[0].language);
      } catch (err) {
        // My Samsung S9 has always this error: "Language is not supported"
        console.log(`setDefaultLanguage error `, err);
      }
      await Tts.setDefaultVoice(availableVoices[0].id);
      // this.setState({
      //   voices: availableVoices,
      //   selectedVoice,
      //   ttsStatus: "initialized"
      // });
    } else {
      // this.setState({ ttsStatus: "initialized" });
    }
    try {
      await Tts.setDefaultLanguage("en-AU");
    } catch (err) {
      // My Samsung S9 has always this error: "Language is not supported"
      console.log(`setDefaultLanguage error `, err);
    }
    //   await Tts.setDefaultVoice("com.apple.ttsbundle.siri_female_en-AU_compact");
    //   this.setState({ selectedVoice: voice.id });

  };

  // function nextTrack() {
  //   console.log("cali");

  //   // Tts.stop();
  //   Tts.speak("in lak ech mako this is the portal opening");
  // };

  const setSpeechRate = async rate => {
    await Tts.setDefaultRate(rate);
    // this.setState({ speechRate: rate });
  };

  const setSpeechPitch = async rate => {
    await Tts.setDefaultPitch(rate);
    // this.setState({ speechPitch: rate });
  };

  // const onVoicePress = async voice => {
  //   console.log("champii")
  //   Tts.stop();
  //   Tts.speak(inductionDicto[0].inductionText);
  // };

  function stopTTS() {
    Tts.stop();
  }

  const nextSpeechTrack = async voice => {
    console.log("*** say 1")

    // const hypnoStepMaster = hypnoStepMasterDicto[0];
    // console.log(hypnoStepMaster.defaultSessionName)
    // const stepItem = hypnoStepMaster.steps[hypnoStepIndex]
    // const textStep = stepItem.text
    // console.log(textStep)

    // Tts.stop();
    // Tts.speak(deepeningDicto[0].deepText);

    Tts.speak("one")
    console.log("step:" + hypnoStepIndex)
    setHypnoStepIndex(hypnoStepIndex + 1);
    console.log("step:" + hypnoStepIndex)
  }

  return (
    <View style={{ padding: 10 }}>
      <Text> HypnosisScreen </Text>
      <Button
        title="Close Hypnotic"
        buttonStyle={{
          backgroundColor: 'red',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 30,
        }}
        containerStyle={{ marginVertical: 10, height: 50, width: 250 }}
        titleStyle={{ fontWeight: 'bold' }}
        onPress={() => stopSession()}
      />
      <Button
        title="play script Hypnotic"
        buttonStyle={{
          backgroundColor: 'blue',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 30
        }}
        containerStyle={{ marginVertical: 10, height: 50, width: 250 }}
        titleStyle={{ fontWeight: 'bold' }}
        onPress={nextSpeechTrack}
      />
      <Button
        title="Stop script Hypnotic"
        buttonStyle={{
          backgroundColor: 'orange',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 30
        }}
        containerStyle={{ marginVertical: 10, height: 50, width: 250 }}
        titleStyle={{ fontWeight: 'bold' }}
        onPress={stopTTS}
      />
    </View>
  );
}