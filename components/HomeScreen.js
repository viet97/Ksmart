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
        console.log("12312321")
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

            <View >
                <View style={styles.titleStyle}>
                    {this.isToogleVisible()}
                    <Text style={{fontSize: 20}}>NewFeed</Text>
                    <View style={{backgroundColor: 'white', width: 35, height: 35}}></View>
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
            <View >
                <View style={{justifyContent: 'center', height: 50, backgroundColor: '#570A60', elevation: 15}}>
                    <Image source={require('../images/bg.png')} style={{flex:1}}/>
                    <Image source={require('../images/logoksmart.png')} style={{alignSelf:'center',position:'absolute'}}/>
                </View>
                <View style={{marginTop: 15,flexDirection:'row'}}>

                    <View style={styles.itemSideMenuStyle}>
                        <Icon1 size={24} color="black" name="ios-people-outline"/>
                        <Text style={{marginLeft: 10}}>Quản lý nhân viên</Text>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon2 size={24} color="black" name="archive"/>
                        <Text style={{marginLeft: 10}}>Đơn hàng</Text>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon2 size={24} color="black" name="user"/>
                        <Text style={{marginLeft: 10}}>Khách hàng</Text>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon2 size={24} color="black" name="aircraft-take-off"/>
                        <Text style={{marginLeft: 10}}>Viếng thăm</Text>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon3 size={24} color="black" name="bar-chart"/>
                        <Text style={{marginLeft: 10}}>Biểu đồ</Text>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon3 size={24} color="black" name="file-text-o"/>
                        <Text style={{marginLeft: 10}}>Báo cáo</Text>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon2 size={24} color="black" name="laptop"/>
                        <Text style={{marginLeft: 10}}>Kế hoạch</Text>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon2 size={24} color="black" name="mail"/>
                        <Text style={{marginLeft: 10}}>Tin nhắn</Text>
                    </View>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon1 size={24} color="black" name="ios-settings"/>
                        <Text style={{marginLeft: 10}}>Cài đặt</Text>
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
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    headerStyle: {
        elevation: 15, height: this.height / 7
    },
    itemSideMenuStyle: {
        flexDirection: 'row',
        margin: 10
    }
})