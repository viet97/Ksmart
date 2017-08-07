import TabNavigator from 'react-native-tab-navigator';
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import Icon4 from 'react-native-vector-icons/Foundation'
import React from 'react';
import Drawer from 'react-native-drawer';
import {Icon} from 'react-native-elements'
import Color from '../configs/color'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import DetailMessageScreen from './DetailMessageScreen'
import DetailNhanVien from './DetailNhanVien'
import * as Animatable from 'react-native-animatable';
import {
    AppRegistry,
    Text,
    View, BackHandler,
    Button, ListView, Image, StyleSheet, StatusBar,
    TouchableOpacity,
    Dimensions,
    Platform,
    ScrollView,
    Alert, Animated
} from 'react-native';
import NewFeedScreen from "./NewFeedScreen";
import ListNhanVienScreen from "./ListNhanVienScreen";
import MapScreen from "./MapScreen";
import {NavigationActions} from "react-navigation";
import Toast from 'react-native-simple-toast';
import OrderListScreen from "./OrderListScreen";
import CustomerScreen from "./CustomerScreen";
import MessageScreen from "./MessageScreen";
import TravelScreen from "./TravelScreen";
import ReportScreen from "./ReportScreen";
import ChartScreen from "./ChartScreen";
import URlConfig from "../configs/url";
import CustomerPlant from "./CustomerPlant";
import AboutUsScreen from "./AboutUsScreen";
import ChooseTypeChart from "./ChooseTypeChart";
import OnlineChartScreen from "./OnlineChartScreen";
import TravelChartScreen from "./TravelChartScreen";
import RevenuePerPersonnelScreen from "./RevenuePerPersonnelScreen";
import RealtimeChartScreen from "./RealtimeChartScreen";
import OnlineReportScreen from "./OnlineReportScreen";

var {height} = Dimensions.get('window');
var func;
var backcount = 0
var isLoginScreen = true
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    closeControlPanel = () => {
        this._drawer.close()
        backcount = 0
    };
    openControlPanel = () => {
        this._drawer.open()
        this.setState({
            width: 0,
            height: 0
        })
    };

    constructor(props) {

        super(props);
        isLoginScreen = false
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        today = dd + '-' + mm + '-' + yyyy;
        this.state = ({
            fadeAnim: new Animated.Value(0),
            idDetailNhanVien: '',
            dataNhanVien: [],
            datePlant: today,
            idNhanVienPlant: '',
            messageContent: [],
            dateSendMessage: '',
            messageFrom: '',
            dateFromForMessage: today,
            dateToForMessage: today,
            previousScreen: '',
            titleMap: '',
            backCount: 0,
            myText: 'I\'m ready to get swiped!',
            gestureName: 'none',
            width: 35,
            height: 35,
            selectedTab: 'NewFeed',
            headerTitleStyle: {alignSelf: 'center'},
            screenName: 'Menu',
            kinhdo: 0,
            vido: 0,
        })
    }

    showToogle() {
        backcount = 0
        this.setState({
            width: 35,
            height: 35
        })

    }


    renderSomething() {
        const {navigate} = this.props.navigation;
        switch (this.state.screenName) {
            case "Menu":
                return this.menuScreen();
            case "NewFeed":
                return <NewFeedScreen clickMenu={() => this.openControlPanel()} backToHome={() => {
                    this.setState({screenName: 'Menu'})
                }}/>
            case "ListNhanVien":
                return <ListNhanVienScreen
                    ref="ListNhanVien"
                    callback={(kinhdo, vido, title) => {
                        navigate('Map', {title: title, kinhdo: kinhdo, vido: vido})
                    }}
                    goToDetailNhanVien={(data) => navigate('DetailNhanVien', {idNhanVien: data})}
                    clickMenu={() => this.openControlPanel()}
                    backToHome={() => {
                        this.setState({screenName: 'Menu'})
                    }}
                    goToMapFromListNhanVien={() => {
                        this.setState({screenName: 'Map'})
                    }}
                />
            case "Map":
                return <MapScreen />
            case "Order":
                return <OrderListScreen backToHome={() => {
                    this.setState({screenName: 'Menu'})
                }}/>
            case "Customer":
                return <CustomerScreen
                    callback={(kinhdo, vido, title, objCustomer) => {
                        navigate('DetailCustomer', {title: title, kinhdo: kinhdo, vido: vido, item: objCustomer})
                    }}
                    backToHome={() => {
                        this.setState({screenName: 'Menu'})
                    }}/>
            case "Message":
                return <MessageScreen
                    dateFrom={this.state.dateFromForMessage}
                    dateTo={this.state.dateToForMessage}
                    moveToDetailMessage={(dateFrom, dateTo, nguoigui, thoigian, noidung) => {
                        navigate('DetailMessage', {nguoigui: nguoigui, thoigian: thoigian, noidung: noidung})
                    }
                    }
                    backToHome={() => {
                        this.setState({screenName: 'Menu'})
                    }}/>
            case "DetailMessage":
                return <DetailMessageScreen />
            case "Travel":
                return <TravelScreen
                    goToCustomerPlant={(date) => {
                            this.setState({screenName: 'CustomerPlant'})
                    }}
                    backToHome={() => {
                        this.setState({screenName: 'Menu'})
                    }}
                    callback={(kinhdo, vido, title) => {
                        navigate('Map', {title: title, kinhdo: kinhdo, vido: vido})
                    }}
                />
            case "Chart":
                return <ChooseTypeChart
                    backToHome={() => {
                        this.setState({screenName: 'Menu'})
                    }}
                    goToOnlineChart={() => {
                        this.setState({screenName: 'OnlineChart'})
                    }}
                    goToDoanhThuNVChart={() => {
                        this.setState({screenName: 'DoanhThuNVChart'})
                    }}
                    goToTravelChart={() => {
                        this.setState({screenName: 'TravelChart'})
                    }}
                    goToDoanhThuChart={() => {
                        this.setState({screenName: 'DoanhThuChart'})
                    }}
                />
            case 'DoanhThuNVChart':
                return <RevenuePerPersonnelScreen backToChooseTypeChart={() => this.setState({screenName: 'Chart'})}/>
            case 'OnlineChart':
                return <OnlineChartScreen
                    backToChooseTypeChart={() => this.setState({screenName: 'Chart'})}/>
            case 'DoanhThuChart':
                return <ChartScreen
                    backToChooseTypeChart={() => this.setState({screenName: 'Chart'})}/>

            case "Report":
                return <ReportScreen backToHome={() => {
                    this.setState({screenName: 'Menu'})
                }}/>
            case "CustomerPlant":
                return <CustomerPlant
                    backToTravel={() => this.setState({screenName: 'Travel'})}
                />
            case "DetailNhanVien":
                return <DetailNhanVien/>
            case "AboutUs":
                return <AboutUsScreen
                    backToHome={() => {
                        this.setState({screenName: 'Menu'})
                    }}/>
            case 'TravelChart':
                return <TravelChartScreen
                    backToChooseTypeChart={() => this.setState({screenName: 'Chart'})}/>
            case 'RealtimeChart':
                return <RealtimeChartScreen backToHome={() => {
                    this.setState({screenName: 'Menu'})
                }}/>
        }
    }

    onSwipeRight(gestureState) {
        console.log("onSwipeRight")
        this.setState({myText: 'You swiped right!'});
        this.openControlPanel()
    }


    menuScreen() {
        return (
            <GestureRecognizer
                onSwipeRight={(state) => this.onSwipeRight(state)}
                style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <Image source={require('../images/bg.png')}
                           style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}/>
                    <ScrollView style={{flex: 1}}>
                        <View style={styles.titleStyle}>
                            <Image source={require('../images/bg.png')}
                                   style={{position: 'absolute', left: 0, bottom: -height * 9 / 10, height: 50}}/>
                            <TouchableOpacity onPress={() => this.openControlPanel()}
                                              style={{marginLeft: 16, width: 40, height: 40, alignSelf: 'center'}}>
                                <Icon1
                                    style={{alignSelf: 'center', backgroundColor: 'transparent'}}
                                    size={35}
                                    color="white" name="ios-menu"
                                />
                            </TouchableOpacity>

                            <Animatable.Text animation="fadeInDown"
                                             style={{
                                                 backgroundColor: 'transparent',
                                                 fontSize: 20,
                                                 alignSelf: 'center',
                                                 color: 'white'
                                             }}>Menu</Animatable.Text>

                            <View style={{width: 50, height: 50, backgroundColor: 'transparent'}}></View>
                        </View>

                        <View style={{flex: 9}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 16}}>
                                <TouchableOpacity
                                    style={{alignSelf: 'center', width: 90}}
                                    onPress={() => this.setState({screenName: "NewFeed"})}>
                                    <Image style={{width: 60, height: 60, borderRadius: 10, alignSelf: 'center'}}
                                           source={require('../images/thinglist-2013.png')}/>

                                    <Animatable.Text animation="slideInLeft" style={styles.titleIconsMenu}>Hoạt
                                        động</Animatable.Text>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{alignSelf: 'center', width: 90}}
                                    onPress={() => this.setState({screenName: "ListNhanVien"})}>
                                    <Image style={{width: 60, height: 60, borderRadius: 10, alignSelf: 'center'}}

                                           source={require('../images/linkedin-contacts-2013.png')}/>

                                    <Animatable.Text animation="zoomIn" style={styles.titleIconsMenu}>Nhân
                                        viên</Animatable.Text>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{alignSelf: 'center', width: 90}}
                                    onPress={() => this.setState({screenName: "Order"})}>
                                    <Image style={{width: 60, height: 60, borderRadius: 10, alignSelf: 'center'}}
                                           source={require('../images/120-in-1-applets-2013.png')}/>

                                    <Animatable.Text animation="slideInRight" style={styles.titleIconsMenu}>Đơn
                                        hàng </Animatable.Text>

                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 16}}>
                                <TouchableOpacity
                                    style={{alignSelf: 'center', width: 90}}
                                    onPress={() => this.setState({screenName: "Customer"})}>
                                    <Image style={{width: 60, height: 60, borderRadius: 10, alignSelf: 'center'}}
                                           source={require('../images/myface-for-facebook-2013.png')}/>

                                    <Animatable.Text animation="slideInLeft" style={styles.titleIconsMenu}>Khách
                                        hàng </Animatable.Text>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{alignSelf: 'center', width: 90}}
                                    onPress={() => this.setState({screenName: "Travel"})}>
                                    <Image style={{width: 60, height: 60, borderRadius: 10, alignSelf: 'center'}}
                                           source={require('../images/flight-live-status-weather-2014.png')}/>
                                    <Animatable.Text animation="flipInY" style={styles.titleIconsMenu}>Viếng
                                        thăm</Animatable.Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{alignSelf: 'center', width: 90}}
                                    onPress={() => this.setState({screenName: "Chart"})}>
                                    <Image style={{width: 60, height: 60, borderRadius: 10, alignSelf: 'center'}}
                                           source={require('../images/moneybook-2011.png')}/>

                                    <Animatable.Text animation="flipInY" style={styles.titleIconsMenu}>Biểu
                                        đồ</Animatable.Text>

                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 16}}>
                                <TouchableOpacity
                                    style={{alignSelf: 'center', width: 90}}
                                    onPress={() => this.setState({screenName: "Report"})}>
                                    <Image style={{width: 60, height: 60, borderRadius: 10, alignSelf: 'center'}}
                                           source={require('../images/appadvice-2017.png')}/>

                                    <Animatable.Text animation="slideInLeft" style={styles.titleIconsMenu}>Báo
                                        cáo</Animatable.Text>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{alignSelf: 'center', width: 90}}
                                    onPress={() => this.setState({screenName: "RealtimeChart"})}>
                                    <Image style={{width: 60, height: 60, borderRadius: 10, alignSelf: 'center'}}
                                           source={require('../images/turboscan-2015.png')}/>

                                    <Animatable.Text animation="bounceIn"
                                                     style={styles.titleIconsMenu}>Online</Animatable.Text>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{alignSelf: 'center', width: 90}}
                                    onPress={() => this.setState({screenName: "Message"})}>
                                    <Image style={{width: 60, height: 60, borderRadius: 10, alignSelf: 'center'}}
                                           source={require('../images/webmail-2012.png')}/>

                                    <Animatable.Text animation="slideInRight" style={styles.titleIconsMenu}>Tin
                                        nhắn</Animatable.Text>

                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </GestureRecognizer>
        )
    }

    componentDidMount() {
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 10000,              // Make it take a while
            }
        ).start();
    }

    sideMenuView() {
        const {navigate} = this.props.navigation;
        return (

            <View style={{flex: 1}}>
                <View style={{
                    justifyContent: 'center',
                    flex: 1,
                    elevation: (Platform.OS === 'ios') ? 0 : 15,
                }}>
                    <Image source={require('../images/bg.png')}/>
                </View>

                <View style={{paddingTop: 15, flexDirection: 'column', flex: 9}}>
                    <Image style={{position: 'absolute'}} source={require('../images/bg.png')}/>
                    <ScrollView style={{marginTop: (Platform.OS === 'ios') ? 16 : 0,}}>
                        <View>
                            <TouchableOpacity style={styles.itemSideMenuStyle} onPress={() => {
                                this.setState({screenName: "NewFeed"});
                                this.closeControlPanel()
                            }}>
                                <IconMaterial size={24} style={styles.iconStyle} color="white" name="payment"/>
                                <Text style={styles.textStyle}>Hoạt động</Text>
                                <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.itemSideMenuStyle} onPress={() => {
                                this.setState({screenName: "ListNhanVien"});
                                this.closeControlPanel()
                            }}>
                                <Icon1 size={24} style={styles.iconStyle} color="white" name="ios-people-outline"/>
                                <Text style={styles.textStyle}>Nhân viên</Text>
                                <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.itemSideMenuStyle} onPress={() => {
                                this.setState({screenName: 'Order'})
                                this.closeControlPanel()
                            }}>
                                <Icon2 size={24} style={styles.iconStyle} color="white" name="archive"/>
                                <Text style={styles.textStyle}>Đơn hàng</Text>
                                <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.itemSideMenuStyle} onPress={() => {
                                this.setState({screenName: 'Customer'}), this.closeControlPanel()
                            }}>
                                <Icon2 size={24} style={styles.iconStyle} color="white" name="user"/>
                                <Text style={styles.textStyle}>Khách hàng</Text>
                                <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.itemSideMenuStyle}
                                              onPress={() => {
                                                  this.setState({screenName: "Travel"});
                                                  this.closeControlPanel()
                                              }}>
                                <Icon2 size={24} style={styles.iconStyle} color="white" name="aircraft-take-off"/>
                                <Text style={styles.textStyle}>Viếng thăm</Text>
                                <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.itemSideMenuStyle} onPress={() => {
                                this.setState({screenName: "Chart"});
                                this.closeControlPanel()
                            }}>
                                <Icon3 size={24} style={styles.iconStyle} color="white" name="bar-chart"/>
                                <Text style={styles.textStyle}>Biểu đồ</Text>
                                <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.itemSideMenuStyle}
                                              onPress={() => {
                                                  this.setState({screenName: "Report"});
                                                  this.closeControlPanel()
                                              }}>
                                <Icon3 size={24} style={styles.iconStyle} color="white" name="file-text-o"/>
                                <Text style={styles.textStyle}>Báo cáo</Text>
                                <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.itemSideMenuStyle}
                                              onPress={() => {
                                                  this.setState({screenName: "RealtimeChart"});
                                                  this.closeControlPanel()
                                              }}>
                                <Icon2 size={24} style={styles.iconStyle} color="white" name="laptop"/>
                                <Text style={styles.textStyle}>Báo cáo online</Text>
                                <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.itemSideMenuStyle}
                                              onPress={() => {
                                                  this.setState({screenName: "Message"});
                                                  this.closeControlPanel()
                                              }}>
                                <Icon2 size={24} style={styles.iconStyle} color="white" name="mail"/>
                                <Text style={styles.textStyle}>Tin nhắn</Text>
                                <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.itemSideMenuStyle}
                                              onPress={() => {
                                                  this.setState({screenName: "AboutUs"});
                                                  this.closeControlPanel()
                                              }}>
                                <IconMaterial size={24} style={styles.iconStyle} color="white" name="info-outline"/>
                                <Text style={styles.textStyle}>Về chúng tôi</Text>
                                <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.itemSideMenuStyle} onPress={() => {
                                this.closeControlPanel()
                                this.logout()
                            }}>
                                <Icon4 size={24} style={styles.iconStyle} color="white" name="power"/>
                                <Text style={styles.textStyle}>Đăng xuất</Text>
                                <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

            </View>

        )
    }

    logout() {
        const {navigate} = this.props.navigation;

        this.props
            .navigation
            .dispatch(NavigationActions.reset(
                {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Login'})
                    ]
                }));
    }


    render() {
        func = () => this.openControlPanel()
        const {navigate} = this.props.navigation
        return (

            <Drawer
                ref={(ref) => this._drawer = ref}
                tapToClose={true}
                openDrawerOffset={0.4}
                negotiatePan={true}
                onCloseStart={() => this.showToogle()}
                content={this.sideMenuView()}>
                {this.renderSomething()}
            </Drawer>

        );
    }

}
const styles = StyleSheet.create({
    titleStyle: {
        marginTop: Platform.OS === 'ios' ? 16 : 0,
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    headerStyle: {
        elevation: 15, height: this.height / 7
    },
    itemSideMenuStyle: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 8,
        paddingBottom: 8
    }, iconStyle: {
        alignSelf: 'center',
        width: 24,
        height: 24,
        backgroundColor: "transparent",
        marginLeft: 16
    },
    textStyle: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent'
    },
    titleIconsMenu: {
        alignSelf: 'center',
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        fontFamily: 'Al Nile'
    }, absolute: {
        top: 0, bottom: 0, left: 0, right: 0, position: 'absolute',
    }
})

BackHandler.addEventListener('hardwareBackPress', function () {
    backcount++
    console.log(isLoginScreen)
    if (isLoginScreen) return false
    if (backcount < 2) {
        func()
        console.log("back")
        Toast.show('Bấm thêm lần nữa để thoát')
        return true
    }
    else return false
});