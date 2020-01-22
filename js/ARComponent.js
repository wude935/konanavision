'use strict';

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
	Viro3DObject,
	ViroAmbientLight,
	ViroARPlaneSelector,
	ViroARScene,
	ViroConstants,
	ViroSound,
	ViroSpotLight,
	ViroText
} from 'react-viro';
//import ARComponent from './ARComponent.js'

// class Konana extends Component {
// 	componentDidMount() {
// 		// do work
// 	}

// 	render() {
// 		if (this.props.showKonana) {
// 			return <ViroText text={'test'}></ViroText>;
// 		}
// 		return (
// 			// <ViroText text={'Konana Loading'}></ViroText>
// 			<Viro3DObject
// 				source={require('./res/KonanaModel/Konana.glb')}
// 				position={[0, 0.5, -1]}
// 				rotation={[0, 0, 0]}
// 				scale={[2, 2, 2]}
// 				type='GLB'
// 				dragType='FixedDistance'
// 				highAccuracyEvents={true}
// 				onDrag={() => {}}
// 				onClick={() => this.setState({ soundPaused: false })}
// 			/>
// 		);
// 	}
// }

export default class ARComponent extends Component {
	constructor(props) {
		super(props);

		// Set initial state here

		this.state = {
			//reset: this.props.sceneNavigator.viroAppProps,
			soundPaused: true,
			text: 'Loading...',
			showKonana: false
		};

		// bind 'this' to functions
		this._onInitialized = this._onInitialized.bind(this);
	}
	//
	// componentDidMount(){
	//     alert(this.props.sceneNavigator.viroAppProps.reset)
	//     if (this.props.sceneNavigator.viroAppProps.reset){
	//         //this.props.ViroARPlaneSelector.reset();
	//         //this.setState(this.state.reset == false)
	//         alert('reset')
	//         //this.props.sceneNavigator.replace()
	//         this.props.ViroARPlaneSelector.reset()
	//         this.props.sceneNavigator.viroAppProps={reset: false}
	//     }
	// }

	//Model of Konana
	render() {
		return (
			<ViroARScene
				onTrackingUpdated={this._onInitialized}
				style={styles.ViroARScene}
			>
				<ViroText
					text={this.state.text}
					scale={[0.25, 0.25, 0.25]}
					position={[0, 0, -1.5]}
					width={3}
					style={styles.textStyle}
				/>
				<ViroSound
					paused={this.state.soundPaused}
					muted={false}
					source={require('./res/HypocrisyUnlimitedSound.m4a')}
					loop={false}
					volume={1.0}
					onFinish={() => this.setState({ soundPaused: true })}
				/>
				<ViroAmbientLight color={'#aaaaaa'} />
				<ViroSpotLight
					innerAngle={5}
					outerAngle={90}
					direction={[0, -1, -0.2]}
					position={[0, 3, 1]}
					color='#ffffff'
					castsShadow={true}
				/>

				<ViroARPlaneSelector
					maxPlanes={1}
					onClick={() => this.setState({ showKonana: true })}
				>
					<Viro3DObject
						source={require('./res/KonanaModel/Konana.glb')}
						position={[0, 0, -0.5]}
						rotation={[0, 0, 0]}
						scale={[2, 2, 2]}
						type='GLB'
						dragType='FixedDistance'
						highAccuracyEvents={true}
						onDrag={() => {}}
						onLoadStart={() =>
							this.setState({
								text: 'Loading Konana...\n(This might take a while)'
							})
						}
						onLoadEnd={() =>
							this.setState({ text: 'Professor Prabhudev Konana' })
						}
						onClick={() => this.setState({ soundPaused: false })}
					/>
					{/* <Konana showKonana={this.state.showKonana}></Konana> */}
				</ViroARPlaneSelector>
			</ViroARScene>
		);
	}

	_onInitialized(state, reason) {
		if (state == ViroConstants.TRACKING_NORMAL) {
			this.setState({
				text: 'Tap a plane to place Konana'
			});
		} else if (state == ViroConstants.TRACKING_NONE) {
			// Handle loss of tracking
		}
	}

	/*    _ARPlaneSelector(){
        if (this.props.sceneNavigator.viroAppProps == false){
            alert('not reset!')
            return (
                <ViroARPlaneSelector>
                    <Viro3DObject source={require('./res/KonanaModel/Konana.glb')}
                                  position={[0, 0, 0]}
                                  rotation={[0, 0, 0]}
                                  scale={[.5, .5, .5]}
                                  type="GLB"
                                  dragType="FixedDistance"
                                  highAccuracyEvents={true}
                                  onDrag={() => {
                                  }}
                                  onClick={() => this.setState({soundPaused: false})}
                    />
                </ViroARPlaneSelector>
            );
        }
        if (this.props.sceneNavigator.viroAppProps == true){
            ViroARPlaneSelector.reset();
        }
    }*/
}

var styles = StyleSheet.create({
	ViroARScene: {
		flex: 1
	},
	textStyle: {
		fontFamily: 'Arial',
		fontSize: 25,
		color: '#FFF',
		textAlignVertical: 'center',
		textAlign: 'center'
	}
});

module.exports = ARComponent;
