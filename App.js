import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ARScreen from './js/ARScreen.js';
import RootScreen from './js/RootScreen.js';
import VRScreen from './js/VRScreen.js';

class Logo extends React.Component {
	render() {
		return (
			<Image
				source={require('./js/res/Logo.png')}
				style={{ width: 150, height: 30 }}
			/>
		);
	}
}

const RootStack = createStackNavigator(
	{
		Root: RootScreen,
		AR: ARScreen,
		VR: VRScreen
	},
	{
		initialRouteName: 'Root',
		/* The header config from HomeScreen is now here */
		navigationOptions: {
			headerTitle: <Logo></Logo>,
			headerStyle: {
				backgroundColor: '#bf5700',
				height: 40
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold'
			}
		}
	}
);

export default class App extends React.Component {
	render() {
		return <RootStack />;
	}
}
