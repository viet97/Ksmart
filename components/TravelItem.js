import {
    AppRegistry,
    Text,
    View,
    Button, ListView, StyleSheet, StatusBar,
    TouchableOpacity, ActivityIndicator,
    Dimensions,
    FlatList,
    Platform,
    Picker
} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import React from 'react';
import Color from '../configs/color'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import URlConfig from "../configs/url";
import Toast from 'react-native-simple-toast'
import DatePicker from 'react-native-datepicker'
import ultils from "../configs/ultils";

let {width, height} = Dimensions.get('window');
export default class TravelItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            height: 0
        }
    }

    getImage(url) {
        if (url.length === 0) {
            return (

                <Image
                    source={require('../images/bglogin.jpg')}
                    indicator={ProgressBar.Pie}
                    style={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
            );
        } else {
            return (
                <Image

                    source={{uri: URlConfig.OBJLOGIN.urlserver + '/' + url}}
                    indicator={ProgressBar.Pie}
                    style={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
            );
        }
    }

    millisToMinutes(from, to) {
        var dateFrom = new Date(from)
        var dateTo = new Date(to)
        var millis = dateFrom - dateTo;
        var minutes = Math.floor(millis / 60000);
        return minutes;
    }

    render() {
        let item = this.props.data
        var strVaoDiem = '';
        var strRaDiem = '';
        if (item.ThoiGianVaoDiemThucTe === '1900-01-01T00:00:00') {
            strVaoDiem = "Chưa vào điểm!"
        } else {
            var diffMins = this.millisToMinutes(item.ThoiGianVaoDiemDuKien, item.ThoiGianVaoDiemThucTe)
            strVaoDiem = 'Vào điểm lúc: ' + ultils.getDate(item.ThoiGianVaoDiemThucTe) + ' ' + strVaoDiem;
        }
        if (item.ThoiGianRaDiemThucTe === '1900-01-01T00:00:00') {
            strRaDiem = "Chưa ra điểm!"
        } else {
            diffMins = this.millisToMinutes(item.ThoiGianRaDiemDuKien, item.ThoiGianRaDiemThucTe)
            strRaDiem = 'Ra điểm lúc: ' + ultils.getDate(item.ThoiGianRaDiemThucTe) + ' ' + strRaDiem;
        }
        return (
            <TouchableOpacity
                onPress={() => this.props.callback()}>
                <View
                    onLayout={(e) => {
                        var {x, y, width, height} = e.nativeEvent.layout;
                        this.setState({height: height})
                    }}
                    style={{
                    margin: 4
                }}>
                    <Image source={require('../images/bg1.png')}
                           style={{
                               height: this.state.height,
                               flexWrap: 'wrap',
                               position: 'absolute',
                               width: width - 8

                           }}/>
                        <Text style={{
                            textAlign: 'right',
                            backgroundColor: 'transparent',
                            fontSize: 12,
                            marginRight: 4
                        }}>Vào điểm dự kiến: {ultils.getDate(item.ThoiGianVaoDiemDuKien)}</Text>

                        <Text style={{
                            textAlign: 'right',
                            backgroundColor: 'transparent',
                            fontSize: 12,
                            marginRight: 4
                        }}>{strVaoDiem}</Text>
                        <Text style={{
                            textAlign: 'right',
                            backgroundColor: 'transparent',
                            fontSize: 12,
                            marginRight: 4
                        }}>{strRaDiem}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{justifyContent: 'center'}}>
                                {this.getImage(item.anhdaidien === undefined ? '' : item.anhdaidien)}
                            </View>
                            <View style={{flex: 4, margin: 8, justifyContent: 'center'}}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        backgroundColor: 'transparent',
                                        margin: 4
                                    }}>{item.TenCuaHang}</Text>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        margin: 4,
                                        backgroundColor: 'transparent',
                                    }}>{item.TenNhanVien}</Text>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        margin: 4,
                                        color: item.text_color,
                                        backgroundColor: 'transparent',
                                    }}>{item.text_color_mota}</Text>
                            </View>
                        </View>
                </View>
            </TouchableOpacity>
        )
    }
}