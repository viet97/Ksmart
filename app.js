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
import OrderListScreen from "./screens/OrderListScreen";
import ChooseTypeChart from "./screens/ChooseTypeChart";
import OnlineChartScreen from "./screens/OnlineChartScreen";
import ListNhanVienScreen from "./screens/ListNhanVienScreen";
import DetailNhanVien from "./screens/DetailNhanVien";
import DetailMessageScreen from "./screens/DetailMessageScreen";
import DetailCustomer from "./screens/DetailCustomer";
import DetailTravel from "./screens/DetailTravel";
import SendMessageScreen from "./screens/SendMessageScreen";
import EditTravelScreen from "./screens/EditTravelScreen";
import TravelScreen from "./screens/TravelScreen";
import ChooseTypeListNV from "./screens/ChooseTypeListNV";
import ReportScreen from "./screens/ReportScreen";
import CustomerScreen from "./screens/CustomerScreen";
import DetailOrderScreen from "./screens/DetailOrderScreen";
import MessageScreen from "./screens/MessageScreen";
import ChooseTypeNew from "./screens/ChooseTypeNew";
import ChooseTypeCustomer from "./screens/ChooseTypeCustomer";
import ChooseTypeTravel from "./screens/ChooseTypeTravel";
import CustomerPlant from "./screens/CustomerPlant";
import RevenuePerPersonnelScreen from "./screens/RevenuePerPersonnelScreen";
import TravelChartScreen from "./screens/TravelChartScreen";
import ChooseTypeReport from "./screens/ChooseTypeReport";
import OnlineReportScreen from "./screens/OnlineReportScreen";
import AboutUsScreen from "./screens/AboutUsScreen";
import ChooseTypeOrder from "./screens/ChooseTypeOrder";
import DetailBaoCaoDoanhThuSanLuong from "./screens/DetailBaoCaoDoanhThuSanLuong";
import MessageScreenV2 from "./screens/MessageScreenV2";
import ConversationScreen from "./screens/ConversationScreen";

const Ksmart = StackNavigator({
    Splash: {screen: SplashScreen},
    NewFeed: {screen: NewFeedScreen},
    DetailOrder: {screen: DetailOrderScreen},
    Login: {screen: LoginScreen},
    Home: {screen: HomeScreen},
    Menu: {screen: MenuScreen},
    Map: {screen: MapScreen,},
    Travel: {screen: TravelScreen},
    Message: {screen: ConversationScreen},
    Report: {screen: ReportScreen},
    OnlineReport: {screen: OnlineReportScreen},
    ListNhanVien: {screen: ListNhanVienScreen},
    DetailNhanVien: {screen: DetailNhanVien},
    DetailMessage: {screen: DetailMessageScreen},
    TypeChart: {screen: ChooseTypeChart},
    DetailCustomer: {screen: DetailCustomer},
    DetailTravel: {screen: DetailTravel},
    SendMessage: {screen: SendMessageScreen},
    EditTravel: {screen: EditTravelScreen},
    AboutUs: {screen: AboutUsScreen},
    Customer: {screen: CustomerScreen},
    Order: {screen: OrderListScreen},
    OnlineChart: {screen: OnlineChartScreen},
    RevenuePerPersonnel: {screen: RevenuePerPersonnelScreen},
    Chart: {screen: ChartScreen},
    TravelChart: {screen: TravelChartScreen},
    CustomerPlant: {screen: CustomerPlant},
    ChooseTypeNewFeed: {screen: ChooseTypeNew},
    ChooseTypeChart: {screen: ChooseTypeChart},
    ChooseTypeListNV: {screen: ChooseTypeListNV},
    ChooseTypeCustomer: {screen: ChooseTypeCustomer},
    ChooseTypeTravel: {screen: ChooseTypeTravel},
    ChooseTypeReport: {screen: ChooseTypeReport},
    ChooseTypeOrder: {screen: ChooseTypeOrder},
    DetailBaoCaoDoanhThuSanLuong: {screen: DetailBaoCaoDoanhThuSanLuong}
    }
);
AppRegistry.registerComponent('Ksmart', () => Ksmart);
