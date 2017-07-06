import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import React from 'react';
import Drawer from 'react-native-drawer';
import Color from '../configs/color'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {
    AppRegistry,
    Text,
    View,
    Button, ListView, Image, StyleSheet, StatusBar,
    TouchableOpacity,
    Dimensions,
    Platform,
    ScrollView
} from 'react-native';
import NewFeedScreen from "./NewFeedScreen";

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
            myText: 'I\'m ready to get swiped!',
            gestureName: 'none',
            width: 35,
            height: 35,
            selectedTab: 'NewFeed',
            headerTitleStyle: {alignSelf: 'center'},
            dataSourceIconMenu: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2}),
            screenName: 'Menu'
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


    // itemListView(data) {
    //     return (
    //         <View style={{flexDirection: 'row', height: height / 6, flex: 1}}>
    //             <Image source={{uri: data.url}} style={{flex: 1}}/>
    //             <View style={{flex: 5}}>
    //                 <Text style={{fontSize: 15, color: Color.itemNameListViewColor}}>{data.name}</Text>
    //                 <Text style={{fontSize: 10, color: 'white'}}> {data.action}</Text>
    //             </View>
    //         </View>
    //     )
    // }
    renderSomething() {
        switch (this.state.screenName) {
            case "Menu":
                return this.menuScreen();
            case "NewFeed":
                return <NewFeedScreen clickMenu={() => this.openControlPanel()} backToHome={() => {
                    this.setState({screenName: 'Menu'})
                } }/>
        }
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
                        <Image
                            source={require('../images/MenuBar.png')}
                            style={{width: 35, height: 35, alignSelf: 'center', marginLeft: 16}}/>
                        <Text style={{fontSize: 20, alignSelf: 'center'}}>Menu</Text>
                        <View style={{width: 35, height: 35}}></View>
                    </View>
                    <TouchableOpacity onPress={() => this.openControlPanel()}
                                      style={{marginLeft: 16, width: 35, height: 35, position: 'absolute'}}/>
                    <View style={{flex: 9}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 16}}>
                            <View>
                                <View style={{
                                    backgroundColor: Color.iconMenuColor,
                                    borderRadius: 15,
                                    width: 80,
                                    height: 80,
                                    justifyContent: 'center'
                                }}>
                                    <Icon style={{alignSelf: 'center'}} size={60} color="white" name="payment"/>
                                </View>
                                <Text style={styles.titleIconsMenu}> Hoat Dong</Text>
                            </View>
                            <View>
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
                                <Text style={styles.titleIconsMenu}>nhân viên</Text>
                            </View>
                            <View>
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
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 16}}>
                            <View>
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
                            </View>
                            <View>
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
                            </View>
                            <View>
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
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 16}}>
                            <View>
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
                            </View>
                            <View>
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
                            </View>
                            <View>
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
                            </View>
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
                            <Text style={styles.textStyle}>Hoat Dong</Text>
                            <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon1 size={24} style={styles.iconStyle} color="white" name="ios-people-outline"/>
                        <Text style={styles.textStyle}>Nhân viên</Text>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="archive"/>
                        <Text style={styles.textStyle}>Đơn hàng</Text>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="user"/>
                        <Text style={styles.textStyle}>Khách hàng</Text>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="aircraft-take-off"/>
                        <Text style={styles.textStyle}>Viếng thăm</Text>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon3 size={24} style={styles.iconStyle} color="white" name="bar-chart"/>
                        <Text style={styles.textStyle}>Biểu đồ</Text>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon3 size={24} style={styles.iconStyle} color="white" name="file-text-o"/>
                        <Text style={styles.textStyle}>Báo cáo</Text>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="laptop"/>
                        <Text style={styles.textStyle}>Kế hoạch</Text>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="mail"/>
                        <Text style={styles.textStyle}>Tin nhắn</Text>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                    </View>
                </View>
            </View>
        )
    }

    // MainView() {
    //     return (
    //
    //         <View style={{flex: 1}}>
    //             <View style={styles.titleStyle}>
    //                 {this.isToogleVisible()}
    //                 <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>Menu</Text>
    //                 <View style={{backgroundColor: Color.backgroundNewFeed, width: 35, height: 35}}></View>
    //             </View>
    //             <TouchableOpacity onPress={() => this.openControlPanel()}
    //                               style={{width: 50, height: 50, position: 'absolute'}}/>
    //             <View style={{flex: 9, backgroundColor: 'white'}}>
    //                 <ListView
    //                     dataSource={this.state.dataSourceIconMenu}
    //                     renderRow={(r) =>
    //                         <View>
    //                             <View style={{backgroundColor:r.backGroundColor , borderRadius:10}}>
    //                                 <Icon size={24} color='green' name ={r.iconName}/>
    //                             </View>
    //                             <Text> {r.titleIcon}</Text>
    //                         </View>
    //                       }
    //                 />
    //             </View>
    //         </View>
    //
    //     )
    // }

    componentDidMount() {

        var arrIcon =
            [{
                backGroundColor: Color.iconMenuColor,
                titleIcon: 'Hoạt Động',
                iconName: 'payment'
            }, {
                backGroundColor: Color.iconMenuColor,
                titleIcon: 'Quản lý nhân viên',
                iconName: 'ios-people-outline'
            }, {
                backGroundColor: Color.iconMenuColor,
                title: 'Đơn hàng',
                iconName: 'archive'
            }, {
                backGroundColor: Color.iconMenuColor,
                titleIcon: 'Khách hàng',
                iconName: 'user'
            }, {
                backGroundColor: Color.iconMenuColor,
                titleIcon: 'Viếng thăm',
                iconName: 'aircraft-take-off'
            }, {
                backGroundColor: Color.iconMenuColor,
                titleIcon: 'Biểu đồ',
                iconName: 'bar-chart'
            }, {
                backGroundColor: Color.iconMenuColor,
                titleIcon: 'Báo cáo',
                iconName: 'file-text-o'
            }, {
                backGroundColor: Color.iconMenuColor,
                titleIcon: 'Kế hoạch',
                iconName: 'laptop'
            }, {
                backGroundColor: Color.iconMenuColor,
                titleIcon: 'Tin nhắn',
                iconName: 'mail'
            },
            ]
        this.setState({
            dataSourceIconMenu: this.state.dataSourceIconMenu.cloneWithRows(arrIcon),
        })

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
        borderBottomWidth: 0.5,
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
        color: 'white'
    }
})