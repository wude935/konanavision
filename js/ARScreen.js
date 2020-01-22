'use strict';


import React, { Component } from 'react';

import {StyleSheet, View, Text, Alert, SafeAreaView, StatusBar, TouchableOpacity, Image} from 'react-native';

import {StackActions, NavigationActions} from 'react-navigation'

import Icon from 'react-native-ionicons'

import {
    ViroAmbientLight,
    ViroSpotLight,
    Viro3DObject,
    ViroARScene,
    ViroText,
    ViroConstants,
    ViroNode,
    ViroARPlaneSelector,
    ViroSound,
    ViroFlexView,
    ViroARSceneNavigator,
} from 'react-viro';

import ARComponent from './ARComponent.js'
//import Orientation from 'react-native-orientation-locker';


export default class ARScreen extends Component {

    constructor()
    {
        super();
        this.state = {
            reset: false,
        }
    }

    // componentWillUpdate(){
    // }



    componentDidMount(){
        //Orientation.lockToLandscape();
        //alert(this.props.navigation.getParam('apiKey'))
    }



    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.View}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#bf5700"
                />
                <ViroARSceneNavigator apiKey={this.props.navigation.getParam('apiKey', "A4DC8B83-C1DE-41FC-906A-8ACEB7A53D14")}
                                      initialScene={{scene: ARComponent}}
                                      style={styles.arView}
                                      //viroAppProps={{reset: this.state.reset}}
                                      ref={ref => this.sceneNavigator = ref}
                >
                </ViroARSceneNavigator>
                <View style={{position: 'absolute',  left: 0, right: 0, bottom: 77, alignItems: 'center'}}>
                    <TouchableOpacity style={styles.button}
                                        onPress={() => StackActions.reset({
                                            index: 0,
                                            actions: [this.props.navigation.replace('AR')],
                                        })}
                                        // onPress={() => this.setState(prevState => ({
                                        //     reset: !prevState.rest
                                        // }))
                                        // }
                                        //underlayColor={'#00000000'}
                    >
                        <Image
                            source={require('./res/reload.png')}
                            style={styles.image}
                        >
                        </Image>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    View: {
        flex: 1,
        backgroundColor: 'white'
    },
    arView:{
        flex: 1,
        //borderRadius: 30
    },
    button : {
        height: 50,
        width: 50,
        paddingTop:10,
        paddingBottom:10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#bf5700',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#ffffff00',
    },
    image : {
        justifyContent: "center",
        alignSelf: "center",
        height: 30,
        width: 30,
    },
})

module.exports = ARScreen;
