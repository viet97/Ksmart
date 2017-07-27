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
import MapScreen from "./screens/MapScreen";
import ChartScreen from "./screens/ChartScreen";
import MapListScreen from "./screens/MapListScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ChooseTypeChart from "./screens/ChooseTypeChart";
import OnlineChartScreen from "./screens/OnlineChartScreen";

const Ksmart = StackNavigator({
    Splash: {screen: SplashScreen},
    Chart: {screen: ChartScreen},
    Login: {screen: LoginScreen},
    Home: {screen: HomeScreen},
    Menu: {screen: MenuScreen},
    Map: {screen: MapScreen},
    TypeChart: {screen: ChooseTypeChart}
});
AppRegistry.registerComponent('Ksmart', () => Ksmart);
