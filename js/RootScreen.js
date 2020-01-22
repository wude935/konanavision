/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


//import Orientation from "react-native-orientation-locker";

var sharedProps = {
    apiKey:"A4DC8B83-C1DE-41FC-906A-8ACEB7A53D14",
}

// Sets the default scene you want for AR and VR
//var InitialARScene = require('./js/ARScreen');
var InitialVRScene = require('./VRScreen');

var UNSET = "UNSET";
var VR_NAVIGATOR_TYPE = "VR";
var AR_NAVIGATOR_TYPE = "AR";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class RootScreen extends Component {
    constructor() {
        super();

        this.state = {
            navigatorType : defaultNavigatorType,
            sharedProps : sharedProps
        }
        this._getExperienceSelector = this._getExperienceSelector.bind(this);
        this._getARScreen = this._getARScreen.bind(this);
        this._getVRScreen = this._getVRScreen.bind(this);
        this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
        this._exitViro = this._exitViro.bind(this);
    }

    componentDidMount(){
        //Orientation.lockToLandscape();
        //alert(this.props.navigation.getParam('apiKey'))
    }

    render() {
        if (this.state.navigatorType == UNSET) {
            return this._getExperienceSelector();
        } else if (this.state.navigatorType == VR_NAVIGATOR_TYPE) {
            this._getVRScreen();
        } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
            this._getARScreen();
        }
    }

    // Presents the user with a choice of an AR or VR experience
    _getExperienceSelector() {
        return (
            <View style={localStyles.outer} >
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#bf5700"
                />
                <View style={localStyles.inner} >

                    <Text style={localStyles.titleText}>
                        Choose your desired experience:
                    </Text>

                    <TouchableOpacity style={localStyles.buttons}
                                      onPress={() => {this._getARScreen()}}
                                        //onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
                                        underlayColor={'#bf5700'} >

                        <Text style={localStyles.buttonText}>AR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={localStyles.buttons}
                                      onPress={() => {this._getVRScreen()}}
                        //onPress={this._getExperienceButtonOnPress(VR_NAVIGATOR_TYPE)}
                                        underlayColor={'#bf5700'} >

                        <Text style={localStyles.buttonText}>VR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // Returns the ViroARSceneNavigator which will start the AR experience
    _getARScreen() {
        this.props.navigation.navigate('AR',
            {
                apiKey: this.state.sharedProps.apiKey
            }
            )
        ;
    }

    // Returns the ViroSceneNavigator which will start the VR experience
    _getVRScreen() {
        this.props.navigation.navigate('VR',
            {
                apiKey: this.state.sharedProps.apiKey
            }
        )
        ;
    }

    // This function returns an anonymous/lambda function to be used
    // by the experience selector buttons
    _getExperienceButtonOnPress(navigatorType) {
        return () => {
            this.setState({
                navigatorType : navigatorType
            })
        }
    }

    // This function "exits" Viro by setting the navigatorType to UNSET.
    _exitViro() {
        this.setState({
            navigatorType : UNSET
        })
    }
}

var localStyles = StyleSheet.create({
    viroContainer :{
        flex : 1,
        backgroundColor: "white",
    },
    outer : {
        flex : 1,
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor: "white",
    },
    inner: {
        flex : 1,
        flexDirection: 'column',
        alignItems:'center',
        backgroundColor: "white",
        paddingBottom: 80
    },
    titleText: {
        paddingBottom: 20,
        color:'#bf5700',
        textAlign:'center',
        fontSize : 20
    },
    buttonText: {
        color:'white',
        textAlign:'center',
        fontSize : 20,
    },
    buttons : {
        height: 80,
        width: 150,
        paddingTop:20,
        paddingBottom:20,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor:'#bf5700',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#bf5700',
    },
    exitButton : {
        height: 50,
        width: 100,
        paddingTop:10,
        paddingBottom:10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor:'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#bf5700',
    }
});

module.exports = RootScreen;
