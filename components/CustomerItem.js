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
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Color, {} from '../configs/color'
import Communications from 'react-native-communications';
import {shadowProps} from "../configs/shadow";
import {getCustomer} from "../configs/customer";
import Toast from "react-native-simple-toast"

var {height, width} = Dimensions.get('window');
export default class NewFeedItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            height: 0,
            color: getCustomer(this.props.data.idloaikhachhang).color
        }
    }

    render() {
        let item = this.props.data;

        return (

            <TouchableOpacity
                onPress={() => this.props.callback()}
                style={{marginTop: 2}}>
                <View
                    style={{
                        fontSize: 17, ...shadowProps,
                    }}
                    activeOpacity={1}
                    onLayout={(e) => {
                        let {x, y, width, height} = e.nativeEvent.layout;
                        this.setState({height: height});
                        console.log(height)
                    }}
                >
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 8,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Icon style={{backgroundColor: 'transparent',}} size={24} color={this.state.color}
                              name="home"/>
                        <Text numberOfLines={1} style={{
                            backgroundColor: 'transparent',
                            marginLeft: 8,
                            fontSize: 18,
                            fontWeight: "500", alignSelf: 'center',
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
                        <Icon1 style={{backgroundColor: 'transparent',}} size={24} color={'black'}
                               name="people-outline"/>
                        <Text numberOfLines={1} style={{
                            backgroundColor: 'transparent',
                            marginLeft: 8,
                            paddingRight: 8,
                            marginRight: 20, alignSelf: 'center',
                            fontWeight: '100'
                        }}>{item.tennhomkhachhang}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Icon style={{backgroundColor: 'transparent',}} size={24} color={'black'}
                              name="location-pin"/>
                        <Text
                            numberOfLines={1}
                            style={{
                                backgroundColor: 'transparent',
                                marginLeft: 8,
                                marginRight: 20, alignSelf: 'center',
                                fontWeight: '100'
                            }}>{item.DiaChi}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4,
                    }}>
                        <TouchableOpacity onPress={() => {
                            item.DienThoai !== undefined && item.DienThoai === null && item.DienThoai.length > 0 ? Communications.phonecall(item.DienThoai, true) : console.log('rong');
                        }}>
                            <Icon style={{backgroundColor: 'transparent',}} size={24} color={this.state.color}
                                  name="phone"/>
                        </TouchableOpacity>
                        <Text
                            numberOfLines={1}
                            style={{
                                backgroundColor: 'transparent',
                                marginLeft: 8,
                                marginRight: 20,
                                alignSelf: 'center',
                                fontWeight: '100'
                            }}>{item.DienThoai}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }
}