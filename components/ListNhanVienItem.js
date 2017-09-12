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
    Platform,
    Picker, TouchableHighlight,
    Image
} from 'react-native';
import ModalDropdown from "react-native-modal-dropdown";
import Toast from 'react-native-simple-toast';
import Search from 'react-native-search-box';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import URlConfig from "../configs/url";
import Icon2 from 'react-native-vector-icons/Entypo'
import React from 'react';
import Color from '../configs/color'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import TabNavigator from 'react-native-tab-navigator';
import {Dialog} from 'react-native-simple-dialogs';

let {height, width} = Dimensions.get('window');
export default class ListNhanVienItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            height: 0
        }
    }

    getImage(url) {
        console.log(url)
        if (url.length === 0) {
            return (
                <Image
                    source={require('../images/bglogin.jpg')}
                    style={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
            );
        } else {
            return (
                <Image
                    source={{uri: url}}
                    style={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
            );
        }
    }

    isOnline(dangtructuyen) {
        if (dangtructuyen === 1)
            return (
                <View style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}}>
                    <Icon2 style={{backgroundColor: 'transparent'}} size={24} color="green"
                           name="controller-record"/>
                    <Text style={{alignSelf: 'center', fontSize: 11}}>Đang trực tuyến</Text>
                </View>)
        else if (dangtructuyen === 2)
            return (
                <View style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}}>
                    <Icon2 style={{backgroundColor: 'transparent'}} size={24} color="red"
                           name="controller-record"/>
                    <Text style={{alignSelf: 'center', fontSize: 11}}>Mất tín hiệu</Text>
                </View>)
        else if (dangtructuyen === 0)
            return (
                <View style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center',}}>
                    <Icon2 style={{backgroundColor: 'transparent'}} size={24} color="gray"
                           name="controller-record"/>
                    <Text style={{alignSelf: 'center', fontSize: 11}}>Ngoại tuyến</Text>
                </View>)

    }

    render() {
        let item = this.props.data
        return (
            <TouchableOpacity style={{}}
                              onPress={() => this.props.goToDetailNhanVien()}>

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
                    <Text style={{textAlign: 'right', fontSize: 12, backgroundColor: 'transparent', marginTop: 4}}>
                        Cập nhật
                        lúc {item.thoigiancapnhat}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{justifyContent: 'center'}}>
                            {this.getImage(item.AnhDaiDien)}
                        </View>
                        <View style={{
                            flex: 4,
                            margin: 8,
                            justifyContent: 'center',
                            backgroundColor: 'transparent'
                        }}>
                            <Text
                                style={{
                                    fontSize: 18, backgroundColor: 'transparent'
                                }}>{item.tennhanvien}</Text>
                            <Text>{item.tendangnhap}</Text>
                            {this.isOnline(item.dangtructuyen)}
                        </View>
                        <TouchableOpacity onPress={() => {
                            this.props.callback()
                        }}>
                            <Icon2 style={{backgroundColor: 'transparent'}} size={30} color='red'
                                   name="location"/>
                        </TouchableOpacity>
                    </View>
                </View>


            </TouchableOpacity>
        )

    }
}