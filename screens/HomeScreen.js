import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import Icon4 from 'react-native-vector-icons/Foundation'
import React from 'react';
import Drawer from 'react-native-drawer';
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
    Alert
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
import RevenuePerPersonnelScreen from "./RevenuePerPersonnelScreen";

var {height} = Dimensions.get('window').height;
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

    onSwipeRight(gestureState) {
        console.log("onSwipeRight")
        this.setState({myText: 'You swiped right!'});
        this.openControlPanel()
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
                    callback={(kinhdo, vido, previousScreen, title) => {
                        this.setState({
                            kinhdo: kinhdo,
                            vido: vido,
                            previousScreen: previousScreen,
                            titleMap: title
                        }, function () {
                            this.setState({screenName: 'Map'})
                        })
                    }}
                    goToDetailNhanVien={(data) => this.setState({idDetailNhanVien: data}, function () {
                        this.setState({screenName: 'DetailNhanVien'})
                    })}
                    clickMenu={() => this.openControlPanel()}
                    backToHome={() => {
                        this.setState({screenName: 'Menu'})
                    }}
                    goToMapFromListNhanVien={() => {
                        this.setState({screenName: 'Map'})
                    }}
                />
            case "Map":
                return <MapScreen backToListNhanVienFromMap={() => {
                    this.setState({screenName: this.state.previousScreen})
                }} kinhdo={this.state.kinhdo} vido={this.state.vido} titleMap={this.state.titleMap}/>
            case "Order":
                return <OrderListScreen backToHome={() => {
                    this.setState({screenName: 'Menu'})
                }}/>
            case "Customer":
                return <CustomerScreen
                    callback={(kinhdo, vido, previousScreen, title) => {
                        this.setState({
                            kinhdo: kinhdo,
                            vido: vido,
                            previousScreen: previousScreen,
                            titleMap: title
                        }, function () {
                            this.setState({screenName: 'Map'})
                        })
                    }}
                    backToHome={() => {
                        this.setState({screenName: 'Menu'})
                    }}/>
            case "Message":
                return <MessageScreen
                    dateFrom={this.state.dateFromForMessage}
                    dateTo={this.state.dateToForMessage}
                    moveToDetailMessage={(dateFrom, dateTo, nguoigui, thoigian, noidung) => this.setState({
                        dateFromForMessage: dateFrom,
                        dateToForMessage: dateTo,
                        messageFrom: nguoigui,
                        dateSendMessage: thoigian,
                        messageContent: noidung
                    }, function () {
                        this.setState({screenName: 'DetailMessage'})
                    })}
                    backToHome={() => {
                        this.setState({screenName: 'Menu'})
                    }}/>
            case "DetailMessage":
                return <DetailMessageScreen
                    nguoigui={this.state.messageFrom}
                    thoigian={this.state.dateSendMessage}
                    noidung={this.state.messageContent}
                    backToMessage={() => {
                        this.setState({screenName: 'Message'})
                    }}
                />
            case "Travel":
                return <TravelScreen
                    goToCustomerPlant={(date) => {
                        this.setState({datePlant: date}, function () {
                            this.setState({screenName: 'CustomerPlant'})
                        })
                    }}
                    backToHome={() => {
                        this.setState({screenName: 'Menu'})
                    }}
                    callback={(kinhdo, vido, previousScreen, title) => {
                        this.setState({
                            kinhdo: kinhdo,
                            vido: vido,
                            previousScreen: previousScreen,
                            titleMap: title
                        }, function () {
                            this.setState({screenName: 'Map'})
                        })
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
                    date={this.state.datePlant}
                    backToTravel={() => this.setState({screenName: 'Travel'})}
                />
            case "DetailNhanVien":
                return <DetailNhanVien
                    backToListNhanVienFromDetailNhanVien={() => this.setState({screenName: 'ListNhanVien'})}
                    idNhanVien={this.state.idDetailNhanVien}
                />
            case "AboutUs":
                return <AboutUsScreen backToHome={() => {
                    this.setState({screenName: 'Menu'})
                }}/>
        }
    }


    menuScreen() {
        return (
            <GestureRecognizer
                onSwipeRight={(state) => this.onSwipeRight(state)}
                style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <Image source={require('../images/bg.png')} style={{position: 'absolute'}}/>
                    <View style={styles.titleStyle}>
                        <TouchableOpacity onPress={() => this.openControlPanel()}
                                          style={{marginLeft: 16, width: 40, height: 40, alignSelf: 'center'}}>
                            <Image
                                source={require('../images/MenuBar.png')}
                                style={{width: 35, height: 35, alignSelf: 'center'}}/>
                        </TouchableOpacity>
                        <Animatable.Text animation="fadeInDown"
                                         style={{fontSize: 20, alignSelf: 'center'}}>😘😘Menu😂😂</Animatable.Text>
                        <View style={{width: 50, height: 50, backgroundColor: 'transparent'}}></View>
                    </View>

                    <View style={{flex: 9}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 16}}>
                            <TouchableOpacity onPress={() => this.setState({screenName: "NewFeed"})}>
                                <View style={{
                                    backgroundColor: Color.iconMenuColor,
                                    borderRadius: 15,
                                    width: 80,
                                    height: 80,
                                    justifyContent: 'center'
                                }}>
                                    <Icon style={{alignSelf: 'center'}} size={60} color="white" name="payment"/>
                                </View>
                                <Animatable.Text animation="slideInLeft" style={styles.titleIconsMenu}>Hoạt
                                    động</Animatable.Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({screenName: "ListNhanVien"})}>
                                <View style={{
                                    backgroundColor: Color.iconMenuColor,
                                    borderRadius: 15,
                                    width: 80,
                                    height: 80,
                                    justifyContent: 'center'
                                }}>
                                    <Icon1 style={{alignSelf: 'center'}} size={60} color="white"
                                           name="ios-people-outline"/>
                                </View>
                                <Animatable.Text animation="zoomIn" style={styles.titleIconsMenu}>Nhân
                                    viên</Animatable.Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({screenName: 'Order'})
                            }}>
                                <View style={{
                                    backgroundColor: Color.iconMenuColor,
                                    borderRadius: 15,
                                    width: 80,
                                    height: 80,
                                    justifyContent: 'center'
                                }}>
                                    <Icon2 style={{alignSelf: 'center'}} size={60} color="white" name="archive"/>
                                </View>
                                <Animatable.Text animation="slideInRight" style={styles.titleIconsMenu}>Đơn
                                    hàng</Animatable.Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 16}}>
                            <TouchableOpacity onPress={() => {
                                this.setState({screenName: 'Customer'})
                            }}>
                                <View style={{
                                    backgroundColor: Color.iconMenuColor,
                                    borderRadius: 15,
                                    width: 80,
                                    height: 80,
                                    justifyContent: 'center'
                                }}>
                                    <Icon2 style={{alignSelf: 'center'}} size={60} color="white" name="user"/>
                                </View>
                                <Animatable.Text animation="slideInLeft" style={styles.titleIconsMenu}> Khách
                                    hàng</Animatable.Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({screenName: 'Travel'})}>
                                <View style={{
                                    backgroundColor: Color.iconMenuColor,
                                    borderRadius: 15,
                                    width: 80,
                                    height: 80,
                                    justifyContent: 'center'
                                }}>
                                    <Icon2 style={{alignSelf: 'center'}} size={60} color="white"
                                           name="aircraft-take-off"/>
                                </View>
                                <Animatable.Text animation="flipInY" style={styles.titleIconsMenu}>Viếng
                                    thăm</Animatable.Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({screenName: 'Chart'})
                            }}>
                                <View style={{
                                    backgroundColor: Color.iconMenuColor,
                                    borderRadius: 15,
                                    width: 80,
                                    height: 80,
                                    justifyContent: 'center'
                                }}>
                                    <Icon3 style={{alignSelf: 'center'}} size={60} color="white" name="bar-chart"/>
                                </View>
                                <Animatable.Text animation="slideInRight" style={styles.titleIconsMenu}>Biểu
                                    đồ</Animatable.Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 16}}>
                            <TouchableOpacity onPress={() => this.setState({screenName: 'Report'})}>
                                <View style={{
                                    backgroundColor: Color.iconMenuColor,
                                    borderRadius: 15,
                                    width: 80,
                                    height: 80,
                                    justifyContent: 'center'
                                }}>
                                    <Icon3 style={{alignSelf: 'center'}} size={60} color="white" name="file-text-o"/>
                                </View>
                                <Animatable.Text animation="slideInLeft" style={styles.titleIconsMenu}>Báo
                                    cáo</Animatable.Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({screenName: "ChonNhanVien"})
                            }}>
                                <View style={{
                                    backgroundColor: Color.iconMenuColor,
                                    borderRadius: 15,
                                    width: 80,
                                    height: 80,
                                    justifyContent: 'center'
                                }}>
                                    <Icon2 style={{alignSelf: 'center'}} size={60} color="white" name="laptop"/>
                                </View>
                                <Animatable.Text animation="bounceIn" style={styles.titleIconsMenu}>Kế
                                    hoạch</Animatable.Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({screenName: "Message"})}>
                                <View style={{
                                    backgroundColor: Color.iconMenuColor,
                                    borderRadius: 15,
                                    width: 80,
                                    height: 80,
                                    justifyContent: 'center'
                                }}>
                                    <Icon2 style={{alignSelf: 'center'}} size={60} color="white" name="mail"/>
                                </View>
                                <Animatable.Text animation="slideInRight" style={styles.titleIconsMenu}>Tin
                                    nhắn</Animatable.Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </GestureRecognizer>
        )
    }

    sideMenuView() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{marginTop: (Platform.OS === 'ios') ? 16 : 0,}}>
                <View style={{
                    justifyContent: 'center',
                    height: 50,
                    elevation: (Platform.OS === 'ios') ? 0 : 15,
                }}>
                    <Image source={require('../images/bg.png')}/>
                </View>
                <View style={{paddingTop: 15, flexDirection: 'column'}}>
                    <Image style={{position: 'absolute'}} source={require('../images/bg.png')}/>

                    <View>
                        <TouchableOpacity style={styles.itemSideMenuStyle} onPress={() => {
                            this.setState({screenName: "NewFeed"});
                            this.closeControlPanel()
                        }}>
                            <Icon size={24} style={styles.iconStyle} color="white" name="payment"/>
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
                                              this.setState({screenName: "ChonNhanVien"});
                                              this.closeControlPanel()
                                          }}>
                            <Icon2 size={24} style={styles.iconStyle} color="white" name="laptop"/>
                            <Text style={styles.textStyle}>Kế hoạch</Text>
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
                            <Icon2 size={24} style={styles.iconStyle} color="white" name="aircraft-take-off"/>
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
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#90c3ef',
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
        marginLeft: 8
    },
    textStyle: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent'
    },
    titleIconsMenu: {
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