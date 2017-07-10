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
var {height} = Dimensions.get('window').height;
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
        this.setState({
            width: 0,
            height: 0
        })

    };

    constructor(props) {
        super(props)
        this.state = ({
            backCount: 0,
            arr: [],
            myText: 'I\'m ready to get swiped!',
            gestureName: 'none',
            width: 35,
            height: 35,
            selectedTab: 'NewFeed',
            headerTitleStyle: {alignSelf: 'center'},
            screenName: 'Menu',
            longittude:0,
            latitude:0,
        })
    }


    showToogle() {
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
        const {navigate} = this.props.navigation
        switch (this.state.screenName) {
            case "Menu":
                return this.menuScreen();
            case "NewFeed":
                return <NewFeedScreen clickMenu={() => this.openControlPanel()} backToHome={() => {
                    this.setState({screenName: 'Menu'})
                }} data={this.state.arr}/>
            case "ListNhanVien":
                return <ListNhanVienScreen
                    ref="ListNhanVien"
                    clickMenu={() => this.openControlPanel()}
                    backToHome={() => {this.setState({screenName: 'Menu'})}}
                    goToMapFromListNhanVien={()=>{this.setState({screenName:'Map'})}}
                />
            case "Map":
                return <MapScreen   backToListNhanVienFromMap={() => {this.setState({screenName: 'ListNhanVien'})}} kinhdo={this.refs.ListNhanVien.state.kinhdo}  vido={this.refs.ListNhanVien.state.vido}/>
        }
    }

    componentDidMount() {
        fetch('http://jav.ksmart.vn/AppNewFeed.aspx?token=6e22b116f5111220741848ccd290e9e9bd8757498aeff45f479463cec823a1dc&idquanly=47&idct=LACHONG')
            .then((response) => (response.json()))
            .then((responseJson) => {
                this.setState({arr: responseJson})
            })
    }

    menuScreen() {
        return (
            <GestureRecognizer
                onSwipeRight={(state) => this.onSwipeRight(state)}
                style={{flex: 1}}
            >
                <View style={{flex: 1}}>
                    <Image
                        source={{uri: 'https://s-media-cache-ak0.pinimg.com/originals/b2/a9/23/b2a9231806f6cd4b3da559eedc249880.jpg'}}
                        style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}/>
                    <View style={styles.titleStyle}>
                        <TouchableOpacity onPress={() => this.openControlPanel()}
                                          style={{marginLeft: 16, width: 40, height: 40, alignSelf: 'center'}}>
                            <Image
                                source={require('../images/MenuBar.png')}
                                style={{width: 35, height: 35, alignSelf: 'center'}}/>
                        </TouchableOpacity>
                        <Text style={{fontSize: 20, alignSelf: 'center'}}>Menu</Text>
                        <View style={{width: 50, height: 50}}></View>
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
                                <Text style={styles.titleIconsMenu}>Hoạt động</Text>
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
                                <Text style={styles.titleIconsMenu}>Nhân viên</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{
                                    backgroundColor: Color.iconMenuColor,
                                    borderRadius: 15,
                                    width: 80,
                                    height: 80,
                                    justifyContent: 'center'
                                }}>
                                    <Icon2 style={{alignSelf: 'center'}} size={60} color="white" name="archive"/>
                                </View>
                                <Text style={styles.titleIconsMenu}>Đơn hàng</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 16}}>
                            <TouchableOpacity>
                                <View style={{
                                    backgroundColor: Color.iconMenuColor,
                                    borderRadius: 15,
                                    width: 80,
                                    height: 80,
                                    justifyContent: 'center'
                                }}>
                                    <Icon2 style={{alignSelf: 'center'}} size={60} color="white" name="user"/>
                                </View>
                                <Text style={styles.titleIconsMenu}> Khách hàng</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
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
                                <Text style={styles.titleIconsMenu}>Viếng thăm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{
                                    backgroundColor: Color.iconMenuColor,
                                    borderRadius: 15,
                                    width: 80,
                                    height: 80,
                                    justifyContent: 'center'
                                }}>
                                    <Icon3 style={{alignSelf: 'center'}} size={60} color="white" name="bar-chart"/>
                                </View>
                                <Text style={styles.titleIconsMenu}>Biểu đồ</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 16}}>
                            <TouchableOpacity>
                                <View style={{
                                    backgroundColor: Color.iconMenuColor,
                                    borderRadius: 15,
                                    width: 80,
                                    height: 80,
                                    justifyContent: 'center'
                                }}>
                                    <Icon3 style={{alignSelf: 'center'}} size={60} color="white" name="file-text-o"/>
                                </View>
                                <Text style={styles.titleIconsMenu}>Báo cáo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{
                                    backgroundColor: Color.iconMenuColor,
                                    borderRadius: 15,
                                    width: 80,
                                    height: 80,
                                    justifyContent: 'center'
                                }}>
                                    <Icon2 style={{alignSelf: 'center'}} size={60} color="white" name="laptop"/>
                                </View>
                                <Text style={styles.titleIconsMenu}>Kế hoạch</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{
                                    backgroundColor: Color.iconMenuColor,
                                    borderRadius: 15,
                                    width: 80,
                                    height: 80,
                                    justifyContent: 'center'
                                }}>
                                    <Icon2 style={{alignSelf: 'center'}} size={60} color="white" name="mail"/>
                                </View>
                                <Text style={styles.titleIconsMenu}>Tin nhắn</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </GestureRecognizer>
        )
    }

    sideMenuView() {
        const {navigate} = this.props.navigation
        return (
            <View style={{marginTop: (Platform.OS === 'ios') ? 16 : 0,}}>
                <View style={{
                    justifyContent: 'center',
                    height: 50,
                    backgroundColor: '#570A60',
                    elevation: (Platform.OS === 'ios') ? 0 : 15,
                }}>
                    <Image source={require('../images/bg.png')}/>
                </View>
                <View style={{paddingTop: 15, flexDirection: 'column'}}>
                    <Image style={{position: 'absolute'}} source={require('../images/bg.png')}/>

                    <View  >
                        <TouchableOpacity style={styles.itemSideMenuStyle} onPress={() => {
                            this.setState({screenName: "NewFeed"}), this.closeControlPanel()
                        }}>
                            <Icon size={24} style={styles.iconStyle} color="white" name="payment"/>
                            <Text style={styles.textStyle}>Hoạt động</Text>
                            <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.itemSideMenuStyle} onPress={() => {
                            this.setState({screenName:"ListNhanVien"}), this.closeControlPanel()
                        }} >
                            <Icon1 size={24} style={styles.iconStyle} color="white" name="ios-people-outline"/>
                            <Text style={styles.textStyle}>Nhân viên</Text>
                            <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                        </TouchableOpacity >
                    </View>
                    <View >
                        <TouchableOpacity style={styles.itemSideMenuStyle}>
                            <Icon2 size={24} style={styles.iconStyle} color="white" name="archive"/>
                            <Text style={styles.textStyle}>Đơn hàng</Text>
                            <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.itemSideMenuStyle}>
                            <Icon2 size={24} style={styles.iconStyle} color="white" name="user"/>
                            <Text style={styles.textStyle}>Khách hàng</Text>
                            <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.itemSideMenuStyle}>
                            <Icon2 size={24} style={styles.iconStyle} color="white" name="aircraft-take-off"/>
                            <Text style={styles.textStyle}>Viếng thăm</Text>
                            <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.itemSideMenuStyle}>
                            <Icon3 size={24} style={styles.iconStyle} color="white" name="bar-chart"/>
                            <Text style={styles.textStyle}>Biểu đồ</Text>
                            <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.itemSideMenuStyle}>
                            <Icon3 size={24} style={styles.iconStyle} color="white" name="file-text-o"/>
                            <Text style={styles.textStyle}>Báo cáo</Text>
                            <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.itemSideMenuStyle}>
                            <Icon2 size={24} style={styles.iconStyle} color="white" name="laptop"/>
                            <Text style={styles.textStyle}>Kế hoạch</Text>
                            <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.itemSideMenuStyle}>
                            <Icon2 size={24} style={styles.iconStyle} color="white" name="mail"/>
                            <Text style={styles.textStyle}>Tin nhắn</Text>
                            <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.itemSideMenuStyle} onPress={() => {
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
        backgroundColor: Color.backgroundNewFeed,
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
    }
})
var backcount = 0
BackHandler.addEventListener('hardwareBackPress', function () {
    backcount++
    if (backcount < 2) {
        Toast.show('Bấm thêm lần nữa để thoát')
        return true
    }
    else  return false
});