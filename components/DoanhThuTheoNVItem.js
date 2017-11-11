import React, {Component} from 'react';
import {
    View, Dimensions, Text, Picker, StyleSheet, TouchableOpacity, Image, Platform, FlatList
} from "react-native";
import Icon1 from 'react-native-vector-icons/Ionicons'
import Bar from "react-native-pathjs-charts/src/Bar";
import Radar from "react-native-pathjs-charts/src/Radar";
import StockLine from "react-native-pathjs-charts/src/StockLine";
import DatePicker from "react-native-datepicker";
import URlConfig from "../configs/url";
import Color from "../configs/color";
import Toast from 'react-native-simple-toast'
import ultils from "../configs/ultils";


let {width, height} = Dimensions.get('window');
export default class DoanhThuTheoNVItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            height: 0
        }
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
                    marginTop: 4, marginBottom: 4, marginLeft: 8, marginRight: 8,
                    borderTopColor: '#227878'
                }}>
                <Image source={require('../images/bg1.png')}
                       style={{
                           height: this.state.height,
                           flexWrap: 'wrap',
                           position: 'absolute',
                           width: width - 16

                       }}/>

                <View style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 8,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <Text style={{alignSelf: 'center', backgroundColor: 'transparent'}}>Nhân viên: </Text>
                        <Text style={{
                            flex: 1,
                            marginLeft: 8,
                            fontSize: 16,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            backgroundColor: 'transparent'
                        }}>{item.tennhanvien}</Text>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Text style={{backgroundColor: 'transparent'}}>Số đơn hàng: </Text>
                    <Text style={{
                        marginLeft: 8,
                        backgroundColor: 'transparent'
                    }}>{item.DonHang}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Text style={{backgroundColor: 'transparent'}}>Tổng tiền:</Text>
                    <Text style={{
                        marginLeft: 8,
                        backgroundColor: 'transparent'
                    }}>{ultils.getMoney(item.TongTien, 2)}</Text>
                </View>
            </View>
        )
    }
}