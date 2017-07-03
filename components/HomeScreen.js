import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/MaterialIcons'
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
    };

    constructor(props) {
        super(props)
        this.state = ({
            selectedTab: 'NewFeed',
            headerTitleStyle: {alignSelf: 'center'},
        })
    }

    newFeedScreen() {
        return (
            <View >
                <View style={styles.titleStyle}>
                    <Image source={require('../images/MenuBar.png')}
                           style={{ width: 35, height: 35}}/>
                    <Text style={{fontSize: 20}}>NewFeed</Text>
                    <View style={{backgroundColor:'white',width:35,height:35}}></View>
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
                    <Image source={require('../images/MenuBar.png')}
                           style={{ width: 35, height: 35}}/>
                    <Text style={{fontSize: 20}}>Menu</Text>
                    <View style={{backgroundColor:'white',width:35,height:35}}></View>
                </View>

                <TouchableOpacity onPress={() => this.openControlPanel()}
                                  style={{width: 35, height: 35, position: 'absolute'}}/>
            </View>
        )
    }

    MainView() {
        return (

            <TabNavigator >
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'NewFeed'}
                    title="NewFeed"
                    renderIcon={() => <Icon size={24} color="gray" name="list"/>}
                    renderSelectedIcon={() => <Icon size={24} color="green" name="list"/>}
                    badgeText="1"
                    onPress={() => this.setState({selectedTab: 'NewFeed'})}>
                    {this.newFeedScreen()}

                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'Menu'}
                    title="Menu"
                    renderIcon={() => <Icon size={24} color="gray" name="menu"/>}
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
                openDrawerOffset={0.8}
                content={<Text style={{fontSize: 20}}>MENU</Text>}>
                {this.MainView()}
            </Drawer>

        );
    }

}
const styles = StyleSheet.create({
    titleStyle: {
        elevation:15,
        justifyContent: 'space-between',
        flexDirection:'row',
        backgroundColor: 'white',
    },
    headerStyle:{
        elevation: 15,height:this.height/8
    }
})