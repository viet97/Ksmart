import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import React from 'react';
import Drawer from 'react-native-drawer';
import {
    AppRegistry,
    Text,
    View,
    Platform,
    Button, ListView, Image, StyleSheet, StatusBar,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import NewFeedScreen from "./NewFeedScreen";
import MenuScreen from "./MenuScreen";
import Header from "./Header";
var {height} = Dimensions.get('window');
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
            state: false,
            width: 0,
            height: 0
        })

    };

    constructor(props) {
        super(props)
        this.state = ({
            width: 35,
            height: 35,
            status: true,
            selectedTab: 'NewFeed',
            headerTitleStyle: {alignSelf: 'center'},
        })
    }

    isToogleVisible() {
        if (this.state.status) {
            return (
                <Image source={require('../images/MenuBar.png')}
                       style={{width: this.state.width, height: this.state.height}}/>
            )
        }
    }

    showToogle() {
        this.setState({
            width: 35,
            height: 35
        })
        console.log("13")
    }

    newFeedScreen() {
        return (

            <View style={{marginTop: (Platform.OS === 'ios') ? 16 : 0,}}>
                <View style={styles.titleStyle}>
                    {this.isToogleVisible()}
                    <Text style={{fontSize: 20}}>NewFeed</Text>
                    <View style={{backgroundColor: 'transparent', width: 35, height: 35}}></View>
                </View>

                <TouchableOpacity onPress={() => this.openControlPanel()}
                                  style={{width: 35, height: 35, position: 'absolute'}}/>
            </View>

        )
    }

    menuScreen() {
        return (
            <View >
                <View style={styles.titleStyle}>
                    <Image
                        source={require('../images/MenuBar.png')}
                        style={{width: 35, height: 35}}/>
                    <Text style={{fontSize: 20}}>Menu</Text>
                    <View style={{backgroundColor: 'white', width: 35, height: 35}}></View>
                </View>
                <TouchableOpacity onPress={() => this.openControlPanel()}
                                  style={{width: 35, height: 35, position: 'absolute'}}/>
                <View style={{width: 100, height: 100, elevation: 20}}>
                    <Icon2  style ={{ alignSelf:'center',borderRadius:20,fontSize:100,backgroundColor:'green'}}size={24} color="black" name="user"/>
                </View>
            </View>
        )
    }

    sideMenuView() {
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
                <View style={{paddingTop: 15,flexDirection:'column'}}>
                    <Image style={{position:'absolute'}} source={require('../images/bg.png')}/>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon1 size={24}  style={styles.iconStyle} color="black" name="ios-people-outline"/>
                        <Text style={styles.textStyle}>Quản lý nhân viên</Text>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon2 size={24}  style={styles.iconStyle} color="black" name="archive"/>
                        <Text style={styles.textStyle}>Đơn hàng</Text>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon2 size={24}  style={styles.iconStyle} color="black" name="user"/>
                        <Text style={styles.textStyle}>Khách hàng</Text>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon2 size={24}  style={styles.iconStyle} color="black" name="aircraft-take-off"/>
                        <Text style={styles.textStyle}>Viếng thăm</Text>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon3 size={24}  style={styles.iconStyle} color="black" name="bar-chart"/>
                        <Text style={styles.textStyle}>Biểu đồ</Text>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon3 size={24}  style={styles.iconStyle} color="black" name="file-text-o"/>
                        <Text style={styles.textStyle}>Báo cáo</Text>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon2 size={24}  style={styles.iconStyle} color="black" name="laptop"/>
                        <Text style={styles.textStyle}>Kế hoạch</Text>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon2 size={24} style={styles.iconStyle}  color="black" name="mail"/>
                        <Text style={styles.textStyle}>Tin nhắn</Text>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon1 size={24} style={styles.iconStyle} color="black" name="ios-settings"/>
                        <Text style={styles.textStyle}>Cài đặt</Text>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                    </View>
                </View>
            </View>
        )
    }

    MainView() {
        return (

            <TabNavigator tabBarStyle={{backgroundColor: '#FBBF45'}}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'NewFeed'}
                    title="NewFeed"
                    renderIcon={() => <Icon size={24} color="white" name="list"/>}
                    renderSelectedIcon={() => <Icon size={24} color="green" name="list"/>}
                    badgeText="1"
                    onPress={() => this.setState({selectedTab: 'NewFeed'})}>
                    {this.newFeedScreen()}

                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'Menu'}
                    title="Menu"
                    renderIcon={() => <Icon size={24} color="white" name="menu"/>}
                    renderSelectedIcon={() => <Icon size={24} color="green" name="menu"/>}
                    onPress={() => this.setState({selectedTab: 'Menu'})}>
                    {this.menuScreen()}
                </TabNavigator.Item>

            </TabNavigator>

        )
    }

    render() {
        return (

            <Drawer
                ref={(ref) => this._drawer = ref}
                tapToClose={true}
                openDrawerOffset={0.4}
                onClose={() => this.showToogle()}
                content={this.sideMenuView()}>
                {this.MainView()}
            </Drawer>

        );
    }

}
const styles = StyleSheet.create({
    titleStyle: {
        elevation: (Platform.OS === 'ios') ? 0 : 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    headerStyle: {
        elevation: 15, height: this.height / 7
    },
    itemSideMenuStyle: {
        borderBottomWidth:0.5,
        borderBottomColor:'white',
        flexDirection: 'row',
        justifyContent:'space-between',
        margin: 10,
        paddingBottom:8
    },
    iconStyle:{
        width:24,
        height:24,
        backgroundColor:"transparent",
        marginLeft:8
    },
    textStyle:{
        backgroundColor:'transparent'
    }

})