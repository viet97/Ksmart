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
import Swipeout from 'react-native-swipeout';
import ActionButton from 'react-native-action-button';
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
import Utils from "../configs/ultils";
import {ConfirmDialog} from 'react-native-simple-dialogs'

let {width, height} = Dimensions.get('window');
export default class TravelItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            height: 0,
            dialogVisible: false,
            closeSwipe: false,
        }
        this.deleteClick = this.deleteClick.bind(this);
        this.editClick = this.editClick.bind(this)
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

    deleteClick() {
        this.setState({dialogVisible: true, closeSwipe: !this.state.closeSwipe})

    }

    editClick() {
        this.props.editClick();

    }

    millisToMinutes(from, to) {
        var dateFrom = new Date(from)
        var dateTo = new Date(to)
        var millis = dateFrom - dateTo;
        var minutes = Math.floor(millis / 60000);
        return minutes;
    }


    render() {
        let item = this.props.data;
        var strVaoDiem = '';
        var strRaDiem = '';
        if (item.ThoiGianVaoDiemThucTe === '1900-01-01T00:00:00') {
            strVaoDiem = "Chưa vào điểm!"
        } else {
            strVaoDiem = 'Vào điểm lúc: ' + Utils.changeDateFormat(item.ThoiGianVaoDiemThucTe);
        }
        if (item.ThoiGianRaDiemThucTe === '1900-01-01T00:00:00') {
            strRaDiem = "Chưa ra điểm!"
        } else {
            strRaDiem = 'Ra điểm lúc: ' + Utils.changeDateFormat(item.ThoiGianRaDiemThucTe);
        }
        var swipeoutBtns = [
            {
                backgroundColor: 'green',
                text: 'Sửa',
                onPress: this.editClick,

                buttonWidth: 60
            },
            {
                backgroundColor: 'red',
                text: 'Xoá',
                onPress: this.deleteClick,
                buttonWidth: 60
            },
        ];
        let come = new Date(item.ThoiGianVaoDiemDuKien);
        let now = new Date();
        let showSwipe = false;
        if (come.getTime() - now.getTime() >= 5 * 60 * 1000) {
            showSwipe = true;
        }
        return (
            <Swipeout right={showSwipe ? swipeoutBtns : []} style={{backgroundColor: 'transparent'}}
                      close={this.state.closeSwipe}>
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
                        }}>Vào điểm dự kiến: {Utils.changeDateFormat(item.ThoiGianVaoDiemDuKien)}</Text>

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
                <ConfirmDialog
                    title={"Xoá " + item.TenCuaHang}
                    message={"Xoá lịch này?"}
                    visible={this.state.dialogVisible}
                    onTouchOutside={() => this.setState({dialogVisible: false})}
                    positiveButton={{
                        title: "Đồng ý",
                        onPress: () => {
                            this.setState({dialogVisible: false});
                            fetch(URlConfig.getLinkDeleteTravel(item.IDKeHoach))
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    if (responseJson.status) {
                                        Toast.show('Xoá thành công!')
                                        this.props.refreshData();
                                    } else {
                                        Toast.show('Xoá thất bại!')
                                    }
                                })
                                .catch((error) => {
                                    Toast.show('Lỗi mạng, thử lại sau, mã lỗi:' + error)
                                });
                        }
                    }}
                    negativeButton={{
                        title: "Huỷ bỏ",
                        onPress: () => {
                            this.setState({dialogVisible: false})
                        }
                    }}
                />
            </Swipeout>
        )
    }
}