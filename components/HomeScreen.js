import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/MaterialIcons'
import React from 'react';
import Drawer from 'react-native-drawer';
import {
    AppRegistry,
    Text,
    View,
    Button, ListView, Image, StyleSheet, StatusBar,
    TouchableOpacity
} from 'react-native';
import NewFeedScreen from "./NewFeedScreen";
import MenuScreen from "./MenuScreen";
import Header from "./Header";
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        headerLeft: <Header />
    };

    constructor(props) {
        super(props)
        this.state = ({
            selectedTab: 'NewFeed',
            headerTitleStyle: {alignSelf: 'center'},
        })
    }

    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };

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
                    <NewFeedScreen/>

                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'Menu'}
                    title="Menu"
                    renderIcon={() => <Icon size={24} color="gray" name="menu"/>}
                    renderSelectedIcon={() => <Icon size={24} color="green" name="menu"/>}
                    onPress={() => this.setState({selectedTab: 'Menu'})}>
                    <MenuScreen />
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