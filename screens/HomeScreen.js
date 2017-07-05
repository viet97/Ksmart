import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import React from 'react';
import Drawer from 'react-native-drawer';
import Color from '../configs/color'

import {
    AppRegistry,
    Text,
    View,
    Button, ListView, Image, StyleSheet, StatusBar,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';

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
            gestureName: 'none',
            width: 35,
            height: 35,
            status: true,
            selectedTab: 'NewFeed',
            headerTitleStyle: {alignSelf: 'center'},
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        })
    }

    isToogleVisible() {
        if (this.state.status) {
            return (
                <Icon style={styles.iconStyle} size={24} color="white" name="menu"/>
            )
        }
    }

    showToogle() {
        this.setState({
            width: 35,
            height: 35
        })

    }

    newFeedScreen() {
        return (

            <View style={{flex: 1}}>
                <View style={styles.titleStyle}>
                    {this.isToogleVisible()}
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>NewFeed</Text>
                    <View style={{backgroundColor: Color.backgroundNewFeed, width: 35, height: 35}}></View>
                </View>

                <TouchableOpacity onPress={() => this.openControlPanel()}
                                  style={{width: 50, height: 50, position: 'absolute'}}/>
                <View style={{backgroundColor: Color.backgroundNewFeed, flex: 9}}>
                    <ListView
                        style={{backgroundColor: Color.itemListViewColor}}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) =>
                            <View style={{flexDirection: 'row', height: height / 6, flex: 1}}>
                                <View style={{justifyContent: 'center'}}>
                                    <Image source={{uri: rowData.url}}
                                           style={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
                                </View>
                                <View style={{flex: 4, margin: 8, justifyContent: 'center'}}>
                                    <Text
                                        style={{fontSize: 20, color: Color.itemNameListViewColor}}>{rowData.name}</Text>
                                    <Text style={{fontSize: 13, color: 'white'}}> {rowData.action}</Text>
                                </View>
                            </View>
                        }
                    />
                </View>
            </View>

        )
    }

    itemListView(data) {
        return (
            <View style={{flexDirection: 'row', height: height / 6, flex: 1}}>
                <Image source={{uri: data.url}} style={{flex: 1}}/>
                <View style={{flex: 5}}>
                    <Text style={{fontSize: 15, color: Color.itemNameListViewColor}}>{data.name}</Text>
                    <Text style={{fontSize: 10, color: 'white'}}> {data.action}</Text>
                </View>
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
                    <View style={{width: 35, height: 35}}></View>
                </View>
                <TouchableOpacity onPress={() => this.openControlPanel()}
                                  style={{width: 35, height: 35, position: 'absolute'}}/>
                <View style={{width: 100, height: 100, elevation: 20}}>
                    <Icon2 style={{alignSelf: 'center', borderRadius: 20, fontSize: 100, backgroundColor: 'green'}}
                           size={24} color="black" name="user"/>
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
                <View style={{paddingTop: 15, flexDirection: 'column'}}>
                    <Image style={{position: 'absolute'}} source={require('../images/bg.png')}/>
                    <View style={styles.itemSideMenuStyle}>
                        <Icon1 size={24} style={styles.iconStyle} color="white" name="ios-people-outline"/>
                        <Text style={styles.textStyle}>Quản lý nhân viên</Text>
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
                    <View style={styles.itemSideMenuStyle}>
                        <Icon1 size={24} style={styles.iconStyle} color="white" name="ios-settings"/>
                        <Text style={styles.textStyle}>Cài đặt</Text>
                        <Icon2 size={24} style={styles.iconStyle} color="white" name="chevron-small-right"/>
                    </View>
                </View>
            </View>
        )
    }

    MainView() {
        return (

            <TabNavigator tabBarStyle={{backgroundColor: Color.tabbarColor}}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'NewFeed'}
                    title="NewFeed"
                    titleStyle={{color: 'white'}}
                    selectedTitleStyle={{color: Color.renderIconColor}}
                    renderIcon={() => <Icon size={24} color="white" name="payment"/>}
                    renderSelectedIcon={() => <Icon size={24} color={Color.renderIconColor} name="payment"/>}
                    badgeText="1"
                    onPress={() => this.setState({selectedTab: 'NewFeed'})}>
                    {this.newFeedScreen()}

                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'Menu'}
                    title="Menu"
                    titleStyle={{color: 'white'}}
                    selectedTitleStyle={{color: Color.renderIconColor}}
                    renderIcon={() => <Icon size={24} color="white" name="menu"/>}
                    renderSelectedIcon={() => <Icon size={24} color={Color.renderIconColor} name="menu"/>}
                    onPress={() => this.setState({selectedTab: 'Menu'})}>
                    {this.menuScreen()}
                </TabNavigator.Item>

            </TabNavigator>

        )
    }

    componentDidMount() {

        var arr = [
            {
                name: 'Đặng Quốc Việt',
                url: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/p160x160/1936235_1039707076102011_5958200926723814588_n.jpg?oh=95e45933baccb02bf6a965fe4ce4b2fe&oe=5A0728F5',
                action: 'Vừa Đăng Nhập 10 phút trước'
            },
            {
                name: 'Hoàng Trần Hảo',
                url: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/12369200_552344928266177_708527824307797917_n.jpg?oh=93ad512f12d70a1ed802fb8df6e03c85&oe=59CB9F2C',
                action: 'Vừa Đăng Nhập 10 phút trước'
            },
            {
                name: 'Nguyễn Đức Thắng',
                url: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/12369200_552344928266177_708527824307797917_n.jpg?oh=93ad512f12d70a1ed802fb8df6e03c85&oe=59CB9F2C',
                action: 'Vừa Đăng Nhập 10 phút trước'
            },
            {
                name: 'Trần Hán Hiếu',
                url: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/17799998_1949714765273125_6206086656656546584_n.jpg?oh=91e183590a290e6613918272f8c4ea4c&oe=59D9778D',
                action: 'Vừa Đăng Nhập 10 phút trước'
            }]
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(arr),
        })
        console.log(arr),
            console.log(this.state.dataSource)

    }

    render() {
        return (

            <Drawer
                ref={(ref) => this._drawer = ref}
                tapToClose={true}
                openDrawerOffset={0.4}
                negotiatePan={true}
                onCloseStart={() => this.showToogle()}
                content={this.sideMenuView()}>
                {this.MainView()}
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
    }
})