import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  Text
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
//screens
import SplashScreen from './SplashScreen';
import IntoScreen from './IntoScreen';
import WelcomeScreen from './WelcomeScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ExploreScreen from './ExploreScreen';
import WhatIsScreen from './WhatIsScreen';
import InfoDetailWebViewScreen from './InfoDetailWebViewScreen';
import ProfileScreen from './ProfileScreen';
import Suggestion from './Suggestion';
import SessionsList from './SessionsList'
import SessionDetail from './SessionDetail'
import SessionScreen from './SessionScreen'
import HypnosisScreen from './HypnosisScreen'
import MusicScreen from './MusicScreen'
import GenerativeScreen from './GenerativeScreen'
import GenerativeWebViewScreen from './GenerativeWebViewScreen'
import FunctionalComp from './FunctionalComp'
import { color } from 'react-native-reanimated';
import { View } from 'native-base';
import * as RNLocalize from "react-native-localize";
import I18n from 'react-native-i18n';
import { images } from './assets';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

console.disableYellowBox = true;

ExploreIcon = require('../resources/images/explore_icon.png');
FaqIcon = require('../resources/images/faq_icon.png');
SuggestionsIcon = require('../resources/images/ideas_icon.png');

const ImagesDicto = {
  // 'Explore': 'compass-alt',
  'WhatIs': 'question',
  'Suggestions': 'user'
}
const Title = {
  'Explore': I18n.t('exploreTab'),
  'WhatIs': I18n.t('whatisTab'),
  'Suggestions': I18n.t('suggestionsTab')
}
const ImagesType = {
  // 'Explore': 'evilicon',
  'WhatIs': 'evilicon',
  'Suggestions': 'evilicon'
}

// Simple component to render something in place of icon
const TabIcon = ({ focused, selected, title }) => {
  console.log("focused__", focused);
  return (

    <View style={[styles.tabIconStyle, { borderBottomColor: focused ? '#fff' : '#225371' }]}>

      {
        Title[title] == 'Explore' ?
          <Image
            source={images.explore}
            resizeMode='contain'
            style={{ width: scale(17), height: verticalScale(22), tintColor: focused ? '#ffff' : '#99AFBC' }} />
          :
          <Icon
            size={27}
            type={ImagesType[title]}
            name={ImagesDicto[title]}
            color={focused ? '#ffff' : '#99AFBC'}
          />
      }

      <Text style={{ marginHorizontal: 3, fontWeight: '700', color: focused ? '#ffff' : '#99AFBC', fontSize: 12 }}>{focused ? Title[title] : Title[title]}</Text>
    </View>

  );
}

I18n.fallbacks = true
I18n.translations = {
  "en": require("../src/translations/en.json"),
  "es": require("../src/translations/es.json")
};

class App extends Component {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null
  };

  render() {
    I18n.locale = "en"
    return (
      <Router
        navigationBarStyle={styles.navBar}
        titleStyle={styles.navTitle}
        tintColor='white'>
        <Scene key="modal" modal>

          <Scene key="root" hideNavBar={1}>
            <Scene key="splashScreen" component={SplashScreen} title="Post" hideNavBar={true} initial />
            {/* <Scene key="intoScreen" component={IntoScreen} title="Post" hideNavBar={true}  /> */}
            <Scene key="welcomeScreen" component={WelcomeScreen} title="Post" hideNavBar={true} />
            <Scene key="signInScreen" component={SignInScreen} renderBackButton={() => null} title="Post" hideNavBar={true} />
            <Scene key="signUpScreen" component={SignUpScreen} title="Post" hideNavBar={true} />

            {/* Tab Container */}
            <Scene key="tabbar" tabs={true} showLabel={false}
              tabBarStyle={styles.tabStyle}  >

              {/* Tab and it's scenes */}
              <Scene key="osu" title="Explore" icon={TabIcon} labelStyle={{ fontSize: 10 }}>
                <Scene key="scarlet" component={ExploreScreen} title={I18n.t('exploreTab')} />
                <Scene key="sessionsList" component={SessionsList} title={I18n.t('sessions')} />
                <Scene key="sessionDetail" component={SessionDetail} title={I18n.t('sessionDetail')} />
              </Scene>

              {/* Tab and it's scenes */}
              <Scene key="um" title="WhatIs" icon={TabIcon}>
                <Scene key="Info" component={WhatIsScreen} title={I18n.t('info')} />
                <Scene key="InfoDetail" component={InfoDetailWebViewScreen} title={I18n.t('info')} />
              </Scene>

              {/* Tab and it's scenes */}
              <Scene key="vu" title="Suggestions" icon={TabIcon}>
                <Scene key="profile" component={ProfileScreen} title={I18n.t('profile')} />
                <Scene key="suggestion" component={Suggestion} title={I18n.t('suggestions')} />
              </Scene>

            </Scene>
          </Scene>

          {/* Modal Scenes */}

          <Scene key="sessionScreen" component={SessionScreen} title="Post" hideNavBar={true} />

          <Scene key="hypnosisScreen" component={HypnosisScreen} title="Post" hideNavBar={true} />

          <Scene key="generativeScreen" component={GenerativeScreen} title="Post" hideNavBar={true} />

          <Scene key="generativeWebViewScreen" component={GenerativeWebViewScreen} title="Post" hideNavBar={true} />

          <Scene key="musicScreen" component={MusicScreen} title="Post" hideNavBar={true} />

          <Scene key="functionalComp" component={FunctionalComp} title="Post" hideNavBar={true} />

        </Scene>

      </Router>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#225371',
    // changing navbar color
  },
  navTitle: {
    color: 'white', // changing navbar title color
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageTabContainer: {
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  tabStyle: {
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#225371',
  },
  tabIconStyle: {
    alignItems: 'center',
    borderBottomWidth: 2,
    width: '75%',
    height: '90%',
    marginTop: 3,
  }
});

export default App;


////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////


// import React, { Component } from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text
// } from 'react-native';
// import { Router, Scene } from 'react-native-router-flux';
// import { Icon } from 'react-native-elements';
// //screens
// import SplashScreen from './SplashScreen';
// import IntoScreen from './IntoScreen';
// import WelcomeScreen from './WelcomeScreen';
// import SignInScreen from './SignInScreen';
// import SignUpScreen from './SignUpScreen';
// import ExploreScreen from './ExploreScreen';
// import WhatIsScreen from './WhatIsScreen';
// import InfoDetailWebViewScreen from './InfoDetailWebViewScreen';
// import ProfileScreen from './ProfileScreen';
// import Suggestion from './Suggestion';
// import SessionsList from './SessionsList'
// import SessionDetail from './SessionDetail'
// import SessionScreen from './SessionScreen'
// import HypnosisScreen from './HypnosisScreen'
// import MusicScreen from './MusicScreen'
// import GenerativeScreen from './GenerativeScreen'
// import GenerativeWebViewScreen from './GenerativeWebViewScreen'
// import FunctionalComp from './FunctionalComp'
// import { color } from 'react-native-reanimated';
// import { View } from 'native-base';
// import * as RNLocalize from "react-native-localize";
// // import I18n from 'react-native-i18n';
// import i18n from "i18n-js";
// import memoize from "lodash.memoize";
// import { bestLanguageTag } from "./i18n";
// import AsyncStorage from '@react-native-community/async-storage';

// console.disableYellowBox = true;

// ExploreIcon = require('../resources/images/explore_icon.png');
// FaqIcon = require('../resources/images/faq_icon.png');
// SuggestionsIcon = require('../resources/images/ideas_icon.png');

// const translationGetters = {
//   en: () => require('../src/translations/en.json'),
//   es: () => require('../src/translations/es.json')
// }
// const translate = memoize(
//   (key, config) => i18n.t(key, config),
//   (key, config) => (config ? key + JSON.stringify(config) : key)
// )
// const setI18nConfig = () => {
//   const fallback = { languageTag: 'en', isRTL: false }
//   const { languageTag, isRTL } =
//     RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
//     fallback
//   console.log("fallback____", fallback);

//   translate.cache.clear()
//   // I18nManager.forceRTL(isRTL);

//   i18n.translations = { [languageTag]: translationGetters[languageTag]() }
//   console.log("i18n.___", i18n);
//   console.log("i18n.translations___", i18n.translations);
//   i18n.locale = languageTag
// }

// const ImagesDicto = {
//   'Explore': 'star',
//   'WhatIs': 'question',
//   'Suggestions': 'user'
// }

// const Title = {
//   'Explore': translate("exploreTab"),
//   'WhatIs': translate("whatisTab"),
//   'Suggestions': translate("suggestionsTab")
// }
// // const Title = {
// //   'Explore': "Explore",
// //   'WhatIs': 'WhatIs',
// //   'Suggestions': 'Suggestions'
// // }
// const ImagesType = {
//   'Explore': 'evilicon',
//   'WhatIs': 'evilicon',
//   'Suggestions': 'evilicon'
// }

// // Simple component to render something in place of icon
// const TabIcon = ({ focused, selected, title }) => {
//   console.log("focused__", focused);
//   return (

//     <View style={{
//       justifyContent: 'center', alignItems: 'center',
//       width: '75%', backgroundColor: focused ? '#3F6A85' : '',
//       borderRadius: 5, padding: 3, flexDirection: 'row'
//     }}>

//       <Icon
//         size={25}
//         type={ImagesType[title]}
//         name={ImagesDicto[title]}
//         color={'white'}
//       />
//       <Text style={{ marginHorizontal: 3, color: 'white', fontSize: 10 }}>{focused ? Title[title] : ''}</Text>
//     </View>

//   );
// }

// class App extends Component {
//   constructor(props) {
//     super(props)
//     i18n.locale = 'en';
//     if (i18n.locale !== bestLanguageTag) {
//       console.log("forceUpdate");
//       this.forceUpdate();
//     }
//     // this.locale()
//   }


//   componentDidMount() {
//     RNLocalize.addEventListener("change", this.handleLocalizationChange());
//   }

//   componentWillUnmount() {
//     RNLocalize.removeEventListener("change", this.handleLocalizationChange);
//   }

//   handleLocalizationChange() {
//     setI18nConfig();
//     this.forceUpdate();
//   };

//   static navigationOptions = {
//     //To hide the NavigationBar from current Screen
//     header: null
//   };

//   render() {
//     i18n.locale = "en";
//     return (
//       <Router
//         navigationBarStyle={styles.navBar}
//         titleStyle={styles.navTitle}
//         tintColor='white'>
//         <Scene key="modal" modal>

//           <Scene key="root" hideNavBar={1}>
//             <Scene key="splashScreen" component={SplashScreen} title="Post" hideNavBar={true} initial />
//             {/* <Scene key="intoScreen" component={IntoScreen} title="Post" hideNavBar={true}  /> */}
//             <Scene key="welcomeScreen" component={WelcomeScreen} title="Post" hideNavBar={true} />
//             <Scene key="signInScreen" component={SignInScreen} renderBackButton={() => null} title="Post" hideNavBar={true} />
//             <Scene key="signUpScreen" component={SignUpScreen} title="Post" hideNavBar={true} />

//             {/* Tab Container */}
//             <Scene key="tabbar" tabs={true} showLabel={false} tabBarStyle={{
//               elevation: 3,
//               shadowOffset: { width: 0, height: 2 },
//               shadowOpacity: 0.25,
//               shadowRadius: 3.84,

//               // borderWidth: 1,
//               // borderBottomColor: 'red',
//               // marginTop: 10,

//               // height: 55,
//               // alignItems: 'center',
//               // justifyContent: 'center',
//               // margin: 10,

//               backgroundColor: '#225371'
//             }} >

//               {/* Tab and it's scenes */}
//               <Scene key="osu" title="Explore" icon={TabIcon} labelStyle={{ fontSize: 10 }}>
//                 <Scene key="scarlet" component={ExploreScreen} title="Explore" />
//                 <Scene key="sessionsList" component={SessionsList} title="Sessions" />
//                 <Scene key="sessionDetail" component={SessionDetail} title="SessionDetail" />
//               </Scene>


//               {/* Tab and it's scenes */}
//               <Scene key="um" title="WhatIs" icon={TabIcon}>
//                 <Scene key="Info" component={WhatIsScreen} title="Info" />
//                 <Scene key="InfoDetail" component={InfoDetailWebViewScreen} title="Info" />
//               </Scene>

//               {/* Tab and it's scenes */}
//               <Scene key="vu" title="Suggestions" icon={TabIcon}>
//                 <Scene key="profile" component={ProfileScreen} title="Profile" />
//                 <Scene key="suggestion" component={Suggestion} title="Suggestions" />
//               </Scene>

//             </Scene>
//           </Scene>

//           {/* Modal Scenes */}

//           <Scene key="sessionScreen" component={SessionScreen} title="Post" hideNavBar={true} />

//           <Scene key="hypnosisScreen" component={HypnosisScreen} title="Post" hideNavBar={true} />

//           <Scene key="generativeScreen" component={GenerativeScreen} title="Post" hideNavBar={true} />

//           <Scene key="generativeWebViewScreen" component={GenerativeWebViewScreen} title="Post" hideNavBar={true} />

//           <Scene key="musicScreen" component={MusicScreen} title="Post" hideNavBar={true} />

//           <Scene key="functionalComp" component={FunctionalComp} title="Post" hideNavBar={true} />

//         </Scene>

//       </Router>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   navBar: {
//     backgroundColor: '#225371',
//     // changing navbar color
//   },
//   navTitle: {
//     color: 'white', // changing navbar title color
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   imageTabContainer: {
//     flex: 1,
//     width: 50,
//     height: 50,
//     resizeMode: 'contain'
//   }
// });

// export default App;
