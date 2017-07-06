import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import SplashScreen from './screens/SplashScreen.js'
import NewFeedScreen from './screens/NewFeedScreen'
import {StackNavigator} from 'react-navigation';
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import LoginScreen from "./screens/LoginScreen";

const Ksmart = StackNavigator({
    Splash: {screen: SplashScreen},
    Login: {screen: LoginScreen},
    Home: {screen: HomeScreecdn},
    Menu:{screen:MenuScreen}
});
AppRegistry.registerComponent('Ksmart', () => Ksmart);
