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
    ActivityIndicator,
    Platform
} from 'react-native';
import Image from 'react-native-image-progress';
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-simple-toast'
import Color from '../configs/color'
import URlConfig from "../configs/url";
import Search from "react-native-search-box";

var {height, width} = Dimensions.get('window');
export default class NewFeedItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            height: 0
        }
    }

    render() {
        let item = this.props.data;
        return (

            <TouchableOpacity
                onPress={() => this.props.callback()}>

                <View
                    onLayout={(e) => {
                        var {x, y, width, height} = e.nativeEvent.layout;
                        this.setState({height: height})
                        console.log(height)
                    }}
                    style={{
                        marginTop: 4, marginBottom: 4, marginLeft: 4, marginRight: 4,
                    }}>
                    <Image source={require('../images/bg1.png')}
                           style={{
                               height: this.state.height,
                               flexWrap: 'wrap',
                               position: 'absolute',
                               width: width - 8

                           }}/>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 8,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Icon style={{backgroundColor: 'transparent',}} size={24} color="red"
                              name="home"/>
                        <Text numberOfLines={1} style={{
                            backgroundColor: 'transparent',
                            marginLeft: 8,
                            fontSize: 18,
                            marginRight: 8,
                            fontWeight: "bold",
                            marginRight: 20,
                        }}>{item.TenCuaHang}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Icon1 style={{backgroundColor: 'transparent',}} size={24} color="black"
                               name="people-outline"/>
                        <Text numberOfLines={1} style={{
                            backgroundColor: 'transparent',
                            marginLeft: 8,
                            paddingRight: 8,
                            marginRight: 20,
                        }}>{item.tennhomkhachhang}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Icon style={{backgroundColor: 'transparent',}} size={24} color="white"
                              name="location-pin"/>
                        <Text
                            numberOfLines={1}
                            style={{
                                backgroundColor: 'transparent',
                                marginLeft: 8,
                                marginRight: 20,
                            }}>
                            {item.DiaChi}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Icon style={{backgroundColor: 'transparent',}} size={24} color="green"
                              name="phone"/>
                        <Text
                            numberOfLines={1}
                            style={{
                                backgroundColor: 'transparent',
                                marginLeft: 8,
                                marginRight: 20,
                            }}>
                            {item.DienThoai}</Text>
                    </View>
                </View>

            </TouchableOpacity>

        )
    }
}