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
import Color from '../configs/color'
export default class Header extends React.Component {
    render() {
        return (
            <View style={styles.titleStyle}>
                <View >
                    <Image
                        source={require('../images/MenuBar.png')}
                        style={{width: 35, height: 35, alignSelf: 'center', marginLeft: 16}}/>
                    <Text style={{fontSize: 20, alignSelf: 'center'}}>{this.props.name}</Text>
                    <View style={{width: 35, height: 35}}></View>
                </View>
                <TouchableOpacity onPress={() => this.openControlPanel()}
                                  style={{marginLeft: 16, width: 35, height: 35, position: 'absolute'}}/>
            </View>
        )
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