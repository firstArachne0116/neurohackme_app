import React, { Component } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { images } from './assets';

const DataList = [
  { name: "What is flicker stimulation?", iconName: 'waves', value: 0, thumbnail: images.bgImage },
  { name: "What is flicker stimulation?", iconName: 'waves', value: 1, thumbnail: images.bgImage },
  { name: "What is flicker stimulation?", iconName: 'waves', value: 2, thumbnail: images.bgImage },
  { name: "What is flicker stimulation?", iconName: 'waves', value: 3, thumbnail: images.bgImage },
  { name: "What is flicker stimulation?", iconName: 'waves', value: 4, thumbnail: images.bgImage },
  { name: "What is flicker stimulation?", iconName: 'waves', value: 5, thumbnail: images.bgImage },
]

class WhatIsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  // hideSpinner() {
  //   this.setState({ visible: false });
  // }

  _OnPress() {
    Actions.InfoDetail()
  }

  renderItem(data, index) {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 5, marginVertical: 5, }}>
        <TouchableOpacity
          onPress={() => {
            console.log("data____", data)
            this.setState({ value: index, genrativeArtWebModal: true, HeaderTitle: data.name })
            this._OnPress()
          }}
          style={{ elevation: 5, backgroundColor: 'rgba(251, 130, 107,0.9)', borderRadius: 5, width: '100%', }}>
          <Image source={images.bgImage} style={{ height: 125, width: '100%', borderTopRightRadius: 5, borderTopLeftRadius: 5, borderBottomLeftRadius: 20 }} />
          <Text style={{ marginHorizontal: 10, marginVertical: 10, color: 'white', fontWeight: '700' }}>{data.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }


  loadEmptyView() {
    return (
      <View style={styles.emptyListView}>
        <Text style={styles.emptyText}>No Data Found</Text>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.header}></Text>
          <View style={{ marginBottom: 50, marginHorizontal: 10 }}>
            <FlatList
              numColumns={2}
              data={DataList}
              keyExtractor={a => a.catTitle}
              renderItem={({ item, index }) => this.renderItem(item, index)}
            />
          </View>
        </View>

        {/* <WebView
        onLoad={() => this.hideSpinner()}
        style={{ flex: 1 }}
        source={{ uri: 'http://neurohack.me/index.php/what-is-a-neurohack/' }}
      />
      {this.state.visible && (
        <ActivityIndicator
          style={styles.loader}
          size="large"
        />
      )} */}

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  emptyListView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 17,
  },
  container: {
    flex: 1,
    backgroundColor: '#232E3F',
  },
  header: {
    color: 'white',
    fontWeight: '700',
    // fontSize: 22,
    marginVertical: 10,
    paddingLeft: 14,
    paddingRight: 14,
  }
});

export default WhatIsScreen;
