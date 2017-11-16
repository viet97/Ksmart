import React, {Component} from 'react'
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
    Platform
} from "react-native";
import URlConfig from "../configs/url";
import Color from '../configs/color'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Entypo'
import Image from 'react-native-image-progress';
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import Dialog from './DialogOrder'
import Search from 'react-native-search-box';
import ultils from "../configs/ultils";
import Toast from 'react-native-simple-toast'
import {shadowProps} from "../configs/shadow";

let {height, width} = Dimensions.get('window');
export default class OrderListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 0
        }
    }

    getGiaoHangHoacThanhToan(rowData) {
        let colorGH;
        let colorTT;
        switch (rowData.trangthaithanhtoan) {
            case 1:
                colorTT = 'red'
                break
            case 2:
                colorTT = 'yellow'
                break
            case 3:
                colorTT = 'darkyellow'
                break
            case 4:
                colorTT = 'green'
                break
        }
        switch (rowData.trangthaigiaohang) {
            case 1:
                colorGH = 'red'
                break
            case 2:
                colorGH = 'yellow'
                break
            case 4:
                colorGH = 'green'
                break
        }
        return (
            <View style={{flexDirection: 'row', flex: 1, margin: 8}}>
                <View style={{
                    borderRadius: 16,
                    paddingBottom: 8,
                    paddingTop: 8,
                    flexDirection: 'row',
                    backgroundColor: colorGH,
                    marginRight: 4,
                    width: width / 2 - 12,
                    justifyContent: 'center'
                }}>
                    <Icon2 style={{alignSelf: 'center', marginRight: 8}} size={12} color={'white'}
                           name="controller-record"/>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        backgroundColor: 'transparent',
                        alignSelf: 'center',
                        textAlign: 'center',
                        color: 'white',
                    }}>{URlConfig.OBJLOGIN.ttgh[rowData.trangthaigiaohang]}</Text>
                </View>
                <View style={{
                    borderRadius: 16,
                    paddingBottom: 8,
                    paddingTop: 8,
                    flexDirection: 'row',
                    backgroundColor: colorTT,
                    marginLeft: 4,
                    width: width / 2 - 12,
                    justifyContent: 'center',

                }}>
                    <Icon2 style={{alignSelf: 'center', marginRight: 8}} size={12} color={'white'}
                           name="controller-record"/>
                    <Text
                        numberOfLines={1}
                        style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        backgroundColor: 'transparent',
                        textAlign: 'center',
                        alignSelf: 'center',
                        color: 'white',
                    }}>{URlConfig.OBJLOGIN.tttt[rowData.trangthaithanhtoan]}</Text>
                </View>
            </View>
        );
    }

    getInfoKhachHang(rowData) {
        let info = URlConfig.OBJLOGIN.ttdh[rowData.trangthaidonhang]
        let color = URlConfig.OBJLOGIN.color[rowData.trangthaidonhang]
        return (
            <View style={{
                borderRadius: 16,
                paddingTop: 8,
                paddingBottom: 8,
                backgroundColor: color,
                marginLeft: 4,
                width: width / 2 - 12,
                justifyContent: 'center'
            }}>
                <Text numberOfLines={1}
                      style={{textAlign: 'center', width: width / 2 - 20, paddingLeft: 4,color:'white'}}>{info}</Text>
            </View>
        )
    }

    render() {
        let item = this.props.data
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.props.goToDetail()}
                onLayout={(e) => {
                    var {x, y, width, height} = e.nativeEvent.layout;
                    this.setState({height: height})
                }}
                style={{
                    backgroundColor: '#f7f7f7',
                    fontSize: 20, ...shadowProps,
                }}>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 8}}>
                    <Text numberOfLines={1} style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        backgroundColor: 'transparent'
                    }}>MĐH {item.mathamchieu} </Text>
                    <Text numberOfLines={1} style={{
                        fontSize: 18,
                        backgroundColor: 'transparent'
                    }}>{ultils.getMoney(item.tongtien, 2)} </Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 8}}>
                    <View style={{flex: 1, marginRight: 4}}>
                        <Text numberOfLines={1} style={{
                            fontSize: 17,
                            backgroundColor: 'transparent'
                        }}>{item.tenkhachhang} </Text>
                        <Text numberOfLines={1} style={{
                            fontSize: 10,
                            backgroundColor: 'transparent'
                        }}>{function () {
                            let moment = require('moment')
                            let date = moment(item.thoigianlapdon, 'DD-MM-YY HH:mm:ss').toDate();
                            return moment(date).format('DD-MM-YYYY HH:mm:ss');
                        }()}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        {this.getInfoKhachHang(item)}
                    </View>
                </View>
                {this.getGiaoHangHoacThanhToan(item)}

            </TouchableOpacity>
        )
    }
}