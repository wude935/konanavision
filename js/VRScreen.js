'use strict';

import React, { Component } from 'react';

import {StyleSheet, SafeAreaView} from 'react-native';

import {
    ViroScene,
    Viro360Image,
    ViroVRSceneNavigator,
} from 'react-viro';

class VRComponent extends Component{
    constructor() {
        super();

        this.state = {} // Set initial state here
    }

    render() {
        return (
            <ViroScene>
                <Viro360Image source={require('./res/ut360crop.jpg')} />
            </ViroScene>
        );
    }
}

export default class VRScreen extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;

        return {
          header: null,
            headerStyle: {
                //backgroundColor:'black',
            },
        };
    };

  constructor() {
    super();

    this.state = {} // Set initial state here
  }

  render() {
      return (
          <SafeAreaView style={styles.view}>
              <ViroVRSceneNavigator apiKey={this.props.navigation.getParam('apiKey')}
                                    initialScene={{scene: VRComponent}}
                                    style={styles.vrView}
                                    ref={ref => this.sceneNavigator = ref}
                                    onExitViro={this._onExitViro}
              >
              </ViroVRSceneNavigator>
          </SafeAreaView>
      );
  }

    _onExitViro = () => {
        this.props.navigation.goBack();
    }

}

var styles = StyleSheet.create({
    View: {
        flex: 1,
        backgroundColor: 'white'
    },
    vrView:{
        flex: 1,
        //borderRadius: 30
    },
});

module.exports = VRScreen;
