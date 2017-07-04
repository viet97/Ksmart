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

            <View style={{flex: 1}}>
                <View style={styles.titleStyle}>
                    {this.isToogleVisible()}
                    <Text style={{fontSize: 20, color: 'white'}}>NewFeed</Text>
                    <View style={{backgroundColor: Color.backgroundNewFeed, width: 35, height: 35}}></View>
                </View>

                <TouchableOpacity onPress={() => this.openControlPanel()}
                                  style={{width: 35, height: 35, position: 'absolute'}}/>
                <View style={{backgroundColor: Color.backgroundNewFeed, flex: 9}}>
                    <ListView
                        style={{backgroundColor:Color.itemListViewColor}}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => {this.itemListView(rowData)}}
                    />
                </View>
            </View>

        )
    }
    itemListView(data){
        return(
            <View style={{flexDirection:'row',height:height/6,flex:1}}>
                <Image source={{uri:data.url}} style={{flex:1 }}/>
                <View style={{flex:5}}>
                    <Text style={{fontSize:15,color:Color.itemNameListViewColor}}>{data.name}</Text>
                    <Text style={{fontSize:10,color:'white'}}> {data.action}</Text>
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
            <View>
                <View style={{justifyContent: 'center', height: 50, backgroundColor: '#570A60', elevation: 15}}>
                    <Image source={require('../images/bg.png')} style={{flex: 1}}/>
                    <Image source={require('../images/logoksmart.png')}
                           style={{alignSelf: 'center', position: 'absolute'}}/>
                </View>
                <View style={{paddingTop: 15, flexDirection: 'column'}}>
                    <Image style={{position: 'absolute'}} source={require('../images/bg.png')}/>
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

            <TabNavigator tabBarStyle={{backgroundColor: Color.tabbarColor}}>
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

    componentDidMout() {
        var arr = [
            {   name:'Đặng Quốc Việt',
                 url:'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-1/p160x160/1936235_1039707076102011_5958200926723814588_n.jpg?oh=95e45933baccb02bf6a965fe4ce4b2fe&oe=5A0728F5',
                 action:'Vừa Đăng nhập 10 phút trước'},
            {   name:'Hoàng trần Hoảng',
                url:'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/12369200_552344928266177_708527824307797917_n.jpg?oh=93ad512f12d70a1ed802fb8df6e03c85&oe=59CB9F2C',
                action:'Vừa Đăng nhập 10 phút trước'},
            {   name:'Nguyễn Đức Thắng',
                url:'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/12369200_552344928266177_708527824307797917_n.jpg?oh=93ad512f12d70a1ed802fb8df6e03c85&oe=59CB9F2C',
                action:'Vừa Đăng nhập 10 phút trước'},
            {   name:'Trần Hán Hiếu',
                url:'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/17799998_1949714765273125_6206086656656546584_n.jpg?oh=91e183590a290e6613918272f8c4ea4c&oe=59D9778D',
                action:'Vừa Đăng nhập 10 phút trước'}]
        this.setState({
            dataSource:this
        })

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
        margin: 10,
        paddingBottom: 8
    }
})