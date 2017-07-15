import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    Button, ListView, StyleSheet, StatusBar,
    TouchableOpacity,
    Dimensions,
    BackHandler,
    FlatList,
    ActivityIndicator
} from 'react-native';
import Image from 'react-native-image-progress';
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'

import Color from '../configs/color'
import URlConfig from "../configs/url";
import Search from "react-native-search-box";
var NUMBER_ROW_RENDER = 10
ALL_LOADED = false
var {height} = Dimensions.get('window');
export default class MessageScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            onEndReach: true,
            dataRender: [],
        }

    }

    renderFooter = () => {
        console.log("Footer")
        if (ALL_LOADED || this.state.dataRender.length === 0) return null
        return (
            <View
                style={{
                    justifyContent: 'center',
                    borderColor: "green"
                }}
            >
                <ActivityIndicator animating={true} size="large"/>
            </View>
        );
    };
    //
    // loadMoreData() {
    //     if (!this.state.onEndReach) {
    //         console.log("LOADMORE")
    //         this.setState({onEndReach: true})
    //         this.setState({dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER + 10)})
    //         NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
    //         if (NUMBER_ROW_RENDER > this.state.dataRender.length - 10) ALL_LOADED = true
    //     }
    // }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: Color.backGroundFlatList}}>
                <View style={styles.titleStyle}>
                    <TouchableOpacity onPress={() => this.props.backToHome()} style={{alignSelf: 'center'}}>
                        <Icon2 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>Tin Nhắn</Text>
                    <View style={{backgroundColor: Color.backgroundNewFeed, width: 35, height: 35}}/>
                </View>
                <TouchableOpacity onPress={() => this.props.backToHome()}
                                  style={{width: 50, height: 50, position: 'absolute'}}/>
                <View style={{backgroundColor: Color.backGroundFlatList, flex: 9}}>

                </View>
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
        width: 35,
        height: 35,
        backgroundColor: "transparent",
        marginLeft: 16
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