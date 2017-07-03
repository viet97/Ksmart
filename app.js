import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import SplashScreen from './Components/SplashScreen.js'

import {StackNavigator} from 'react-navigation';
import HomeScreen from "./Components/HomeScreen";

const Ksmart = StackNavigator({
    Splash: {screen: SplashScreen},
    Home: {screen: HomeScreen}
});
AppRegistry.registerComponent('Ksmart', () => Ksmart);
