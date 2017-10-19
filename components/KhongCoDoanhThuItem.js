import React, {Component} from 'react'
import DatePicker from 'react-native-datepicker'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Button,
    Picker,
    FlatList,
    TouchableHightLight,
    ActivityIndicator,
    Platform,
} from "react-native";
import URlConfig from "../configs/url";
import Color from '../configs/color'
import Icon3 from 'react-native-vector-icons/FontAwesome'

import ultils from "../configs/ultils";
import Communications from 'react-native-communications';
import {shadowProps} from "../configs/shadow";

let {width, height} = Dimensions.get('window');
export default class KhongCoDoanhThuItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            height: 0
        }
    }

    getLastOrderTime(date) {
        if (date !== "1900-01-01T00:00:00")
            return (
                <Text style={{
                    marginLeft: 8,
                    backgroundColor: 'transparent'
                }}>{ultils.getDate(date)}</Text>
            )
        return null
    }
    render() {
        let item = this.props.data
        return (

            <View
                onLayout={(e) => {
                    var {x, y, width, height} = e.nativeEvent.layout;
                    this.setState({height: height})
                }}
                style={{
                    marginTop:2,
                    backgroundColor: '#f7f7f7',
                    fontSize: 20, ...shadowProps,
                }}
            >
                <View style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 8,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{alignSelf: 'center', backgroundColor: 'transparent'}}>Tên nhân viên:</Text>
                        <Text style={{
                            marginLeft: 8,
                            fontSize: 16,
                            fontWeight: "bold",
                            backgroundColor: 'transparent'
                        }}>{item.tennhanvien}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.props.call()}>
                        <Icon3 style={{backgroundColor: 'transparent'}} size={24} color="green" name="phone"/>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Text style={{backgroundColor: 'transparent'}}>khách hàng cuối:</Text>
                    <Text style={{
                        marginLeft: 8,
                        backgroundColor: 'transparent'
                    }}>{item.donhangcuoi_tenkhachhang}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Text style={{backgroundColor: 'transparent'}}>Đơn hàng cuối lúc:</Text>
                    {this.getLastOrderTime(item.donhangcuoi_thoigian)}
                </View>
                <View style={{

                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Text style={{backgroundColor: 'transparent'}}>Tổng tiền: </Text>
                    <Text style={{
                        marginLeft: 8,
                        backgroundColor: 'transparent'
                    }}>{item.donhangcuoi_tongtien}</Text>
                </View>
            </View>
        )
    }
}