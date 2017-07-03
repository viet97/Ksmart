import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import SplashScreen from './components/SplashScreen.js'
import NewFeedScreen from './components/NewFeedScreen'
import {StackNavigator} from 'react-navigation';
import HomeScreen from "./components/HomeScreen";
import MenuScreen from "./components/MenuScreen";

const Ksmart = StackNavigator({
    Splash: {screen: SplashScreen},
    Home: {screen: HomeScreen},
    NewFeed:{screen:NewFeedScreen},
    Menu:{screen:MenuScreen}
});
AppRegistry.registerComponent('Ksmart', () => Ksmart);
