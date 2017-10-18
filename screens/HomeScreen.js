import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import Icon4 from 'react-native-vector-icons/Foundation'
import {Icon} from 'react-native-elements';
import React from 'react';
import Drawer from 'react-native-drawer';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import * as Animatable from 'react-native-animatable';
import {
    AppRegistry,
    Text,
    View, BackHandler,
    Button, FlatList, Image, StyleSheet, StatusBar,
    TouchableOpacity,
    Dimensions,
    Platform,
    DeviceEventEmitter,
    ScrollView,
    Alert, Animated
} from 'react-native';
import Badge from 'react-native-smart-badge'
import {NavigationActions} from "react-navigation";
import Toast from 'react-native-simple-toast';
import URlConfig from "../configs/url";
import {onChangeMessage} from "../networks/Network";
import menus, {menuSwiper} from "../configs/menus";
import LinearGradient from 'react-native-linear-gradient';
import {getPrefData} from "../sharePref/SharePref";
import {COMPANY_KEY, PASSWORD_KEY, USERNAME_KEY} from "../configs/type";
import HeaderCustom from "../components/Header";
import {Header} from 'react-navigation'

var {height} = Dimensions.get('window');
var func;
var backcount = 0;
var isLoginScreen = true;
const ICON_SIZE = 32;
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    closeControlPanel = () => {
        if (this._drawer)
            this._drawer.close();
        backcount = 0
    };
    openControlPanel = () => {
        if (this._drawer) {
            this._drawer.open();
            this.setState({
                width: 0,
                height: 0
            })
        }

    };

    componentWillMount() {

        backcount = 0
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
            orderStatus: 0,
            reportStatus: 0,
            NhanVienStatus: -1,
            travelStatus: 0,
            fadeAnim: new Animated.Value(0),
            myText: 'I\'m ready to get swiped!',
            width: 35,
            height: 35,
            screenName: 'Menu',
            kinhdo: 0,
            vido: 0,
        })
        DeviceEventEmitter.addListener('reloadMsg', this.reloadMsg.bind(this))
    }

    async reloadMsg() {
        let username = await getPrefData(USERNAME_KEY);
        let password = await getPrefData(PASSWORD_KEY);
        let idct = await getPrefData(COMPANY_KEY);
        if (username && password && idct) {
            await onChangeMessage(username, password, idct);
            this.forceUpdate();
            console.log('update unread', URlConfig.OBJLOGIN.messageUnread)
        }
    }

    constructor(props) {
        super(props);
    }

    showToogle() {
        backcount = 0;
        this.setState({
            width: 35,
            height: 35
        })

    }

    onSwipeRight(gestureState) {
        console.log("onSwipeRight");
        this.setState({myText: 'You swiped right!'});
        this.openControlPanel()
    }

    renderContentSwiper(navigate) {
        let width = Dimensions.get('window').width;
        return (
            <FlatList
                scrollEnabled={true}
                numColumns={1}
                contentContainerStyle={{flex: 1, backgroundColor: '#3d94d8'}}
                keyboardDismissMode="on-drag"
                data={menuSwiper}
                keyExtractor={(item) => item.screenName}
                renderItem={({item}) =>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                            backgroundColor: 'transparent',
                            flexDirection: 'row', marginLeft: 24, marginTop: 16
                        }}
                        onPress={() => {
                            if (item.screenName === 'SignOut') {
                                Alert.alert(
                                    'Đăng xuất',
                                    'Bạn có chắc chắn muốn đăng xuất ?',
                                    [
                                        {text: 'Hủy',},
                                        {text: 'Xác nhận', onPress: () => this.logout()}
                                    ],
                                    {cancelable: false}
                                )

                            } else navigate(item.screenName)
                        }}>
                        <Icon containerStyle={{width: 24, height: 24}} color={"white"} name={item.iconName}
                              type={"font-awesome"} size={24}/>
                        <Text numberOfLines={1} style={{
                            fontSize: 16,
                            color: 'white',
                            paddingLeft: 16,
                            alignSelf: 'center'
                        }}>{item.title}</Text>
                        {
                            function () {
                                if (item.screenName === 'Message') {
                                    return <Badge style={{marginLeft: 4}}>{URlConfig.OBJLOGIN.messageUnread}</Badge>
                                }
                            }()
                        }
                    </TouchableOpacity>
                }
            />
        );
    }

    renderContentMenu(navigate) {
        let width = Dimensions.get('window').width;
        return (
            <FlatList
                scrollEnabled={false}
                numColumns={3}
                contentContainerStyle={{flex: 1, alignItems: 'center', backgroundColor: 'white', paddingTop: 16}}
                keyboardDismissMode="on-drag"
                data={menus}
                keyExtractor={(item) => item.screenName}
                renderItem={({item}) =>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                            backgroundColor: 'transparent',
                            margin: width / 40
                        }}
                        onPress={() => {
                            navigate(item.screenName)
                        }}>
                        <View style={{
                            backgroundColor: '#3cbdef', borderRadius: 10, width: width / 4,
                            height: width / 4, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Icon color={"white"} name={item.iconName} type={"font-awesome"} size={24}/>
                        </View>
                        <Text numberOfLines={1} style={styles.titleIconsMenu}>{item.title}</Text>
                    </TouchableOpacity>
                }
            />
        );
    }


    menuScreen() {
        const {navigate} = this.props.navigation;
        return (
            <GestureRecognizer
                onSwipeRight={(state) => this.onSwipeRight(state)}
                style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <StatusBar
                        backgroundColor="#1b60ad"
                        barStyle="light-content"
                    />
                    <View style={{flex: 1}}>
                        <HeaderCustom
                            title={"Trang Chủ"}
                            leftClick={() => this.openControlPanel()}
                            iconName={"ios-menu"}
                        />
                        <View style={{flex: 9}}>
                            {this.renderContentMenu(navigate)}
                        </View>
                    </View>
                </View>
            </GestureRecognizer>
        )
    }

    componentDidMount() {

        const {params} = this.props.navigation.state
        if (params !== undefined)
            this.setState({screenName: params.name})
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 10000,              // Make it take a while
            }
        ).start();
        console.log('login', URlConfig.OBJLOGIN)

    }

    sideMenuView() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex: 1, backgroundColor: '#3d94d8', height: height - 56}}>

                <HeaderCustom title={URlConfig.OBJLOGIN.tendangnhap} iconColor={"transparent"}/>

                <View style={{paddingTop: 8, flexDirection: 'column', flex: 9}}>
                    {this.renderContentSwiper(navigate)}
                </View>

            </View>

        )
    }

    renderBagde(size) {

        if (URlConfig.OBJLOGIN.messageUnread > 0) {
            console.log('vao day rrrrr');
            return (
                <Badge textStyle={{
                    color: '#fff', fontSize: size
                }}
                       style={{
                           position: 'absolute',
                           top: 0,
                           right: 12
                       }}>
                    {URlConfig.OBJLOGIN.messageUnread}
                </Badge>)
        } else {
            console.log('vao else')
        }


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
                {this.menuScreen()}
            </Drawer>

        );
    }

}
const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
        marginTop: 32,
    },
    titleStyle: {
        paddingTop: Platform.OS === 'ios' ? 16 : 0,
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerStyle: {
        elevation: 15, height: this.height / 7
    },
    itemSideMenuStyle: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
        marginTop: 16, marginLeft: 4, backgroundColor: 'transparent',
        flex: 1, justifyContent: 'center', alignItems: 'center',

    }, iconStyle: {
        alignSelf: 'center',
        backgroundColor: "transparent",
    },
    textStyle: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent'
    },
    titleIconsMenu: {
        marginTop: 4,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Roboto-Medium',
        color: 'black',
        fontSize: 12,
        backgroundColor: 'transparent',
    },
    absolute: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
    },
    touchable: {
        flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, flex: 1
    }
})

BackHandler.addEventListener('hardwareBackPress', function () {
    backcount++
    console.log(isLoginScreen)

    if (backcount < 2) {
        if (!isLoginScreen)
            func()
        Toast.show('Bấm thêm lần nữa để thoát')
        return true
    }
    else {
        isLoginScreen = true
        backcount = 0
        return false
    }


});