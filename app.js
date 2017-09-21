import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
    Image,
    Dimensions
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
import ListNhanVienScreen from "./screens/ListNhanVienScreen";
import DetailNhanVien from "./screens/DetailNhanVien";
import DetailMessageScreen from "./screens/DetailMessageScreen";
import Icon1 from 'react-native-vector-icons/Ionicons'
import Color from './configs/color'
import DetailCustomer from "./screens/DetailCustomer";
import DetailTravel from "./screens/DetailTravel";
import SendMessageScreen from "./screens/SendMessageScreen";
import EditTravelScreen from "./screens/EditTravelScreen";
import TravelScreen from "./screens/TravelScreen";
import ChooseTypeListNV from "./screens/ChooseTypeListNV";
import ReportScreen from "./screens/ReportScreen";
import CustomerScreen from "./screens/CustomerScreen";
import DetailOrderScreen from "./screens/DetailOrderScreen";

var {height, width} = Dimensions.get('window');
const Ksmart = StackNavigator({
    Splash: {screen: SplashScreen},
    Chart: {screen: ChartScreen},
    DetailOrder: {screen: DetailOrderScreen},
    Login: {screen: LoginScreen},
    Home: {screen: HomeScreen},
    Menu: {screen: MenuScreen},
    Map: {screen: MapScreen,},
    Travel: {screen: TravelScreen},
    NewFeed: {screen: NewFeedScreen},
    Report: {screen: ReportScreen},
    ListNhanVien: {screen: ListNhanVienScreen},
    DetailNhanVien: {screen: DetailNhanVien},
    DetailMessage: {screen: DetailMessageScreen},
    TypeChart: {screen: ChooseTypeChart},
    DetailCustomer: {screen: DetailCustomer},
    DetailTravel: {screen: DetailTravel},
    SendMessage: {screen: SendMessageScreen},
    EditTravel: {screen: EditTravelScreen},
    Customer: {screen: CustomerScreen}
    }, {
        mode: 'modal'
    }
);
AppRegistry.registerComponent('Ksmart', () => Ksmart);
