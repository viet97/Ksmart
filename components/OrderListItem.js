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

let {height, width} = Dimensions.get('window');
export default class OrderListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 0
        }
    }

    getGiaoHangHoacThanhToan(rowData) {
        var colorGH;
        var colorTT;
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
                    paddingBottom: 8,
                    paddingTop: 8,
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    marginRight: 4,
                    width: width / 2 - 12,
                    justifyContent: 'center'
                }}>
                    <Icon2 style={{alignSelf: 'center', marginRight: 8}} size={12} color={colorGH}
                           name="controller-record"/>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        backgroundColor: 'transparent',
                        alignSelf: 'center',
                        textAlign: 'center',
                        color: colorGH,
                    }}>{URlConfig.OBJLOGIN.ttgh[rowData.trangthaigiaohang]}</Text>
                </View>
                <View style={{
                    paddingBottom: 8,
                    paddingTop: 8,
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    marginLeft: 4,
                    width: width / 2 - 12,
                    justifyContent: 'center'

                }}>
                    <Icon2 style={{alignSelf: 'center', marginRight: 8}} size={12} color={colorTT}
                           name="controller-record"/>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        backgroundColor: 'transparent',
                        textAlign: 'center',
                        alignSelf: 'center',
                        color: colorTT,
                    }}>{URlConfig.OBJLOGIN.tttt[rowData.trangthaithanhtoan]}</Text>
                </View>
            </View>
        );
    }

    getInfoKhachHang(rowData) {
        var color;
        switch (rowData.trangthaidonhang) {
            case 1:
                color = URlConfig.OBJLOGIN.color[1]
                break;
            case 2:
                color = URlConfig.OBJLOGIN.color[2]
                break;
            case 3:
                color = URlConfig.OBJLOGIN.color[3]
                break;
            case 4:
                color = URlConfig.OBJLOGIN.color[4]
                break;
            case 5:
                color = URlConfig.OBJLOGIN.color[5]
                break;
            case 9:
                color = URlConfig.OBJLOGIN.color[9]
                break;
            case 12:
                color = URlConfig.OBJLOGIN.color[12]
                break;
            case 13:
                color = URlConfig.OBJLOGIN.color[13]
                break;
            case 24:
                color = URlConfig.OBJLOGIN.color[24]
                break;
        }
        let info = URlConfig.OBJLOGIN.ttdh[rowData.trangthaidonhang]
        return (
            <View style={{
                paddingTop: 8,
                paddingBottom: 8,
                backgroundColor: color,
                marginLeft: 4,
                width: width / 2 - 12,
                justifyContent: 'center'
            }}>
                <Text numberOfLines={1}
                      style={{textAlign: 'center', width: width / 2 - 20, paddingLeft: 4}}>{info}</Text>
            </View>
        )
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
                    margin: 4,
                }}>
                <Image source={require('../images/bg1.png')}
                       style={{
                           height: this.state.height,
                           flexWrap: 'wrap',
                           position: 'absolute',
                           width: width - 8

                       }}/>
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
                        }}>{item.thoigianlapdon} </Text>
                    </View>
                    <View style={{flex: 1}}>
                        {this.getInfoKhachHang(item)}
                    </View>
                </View>
                {this.getGiaoHangHoacThanhToan(item)}

            </View>
        )
    }
}