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
import Toast from 'react-native-simple-toast';
import Search from 'react-native-search-box';

import Icon2 from 'react-native-vector-icons/Entypo'
import React from 'react';
import {shadowProps} from "../configs/shadow";

import {GiftedAvatar} from 'react-native-gifted-chat'
import Utils from "../configs/ultils";

let {height, width} = Dimensions.get('window');
export default class ListNhanVienItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            height: 0
        }
    }

    getImage(url) {
        if (!url || !Utils.isImageUrl(url)) {
            return (

                <GiftedAvatar
                    user={
                        {
                            _id: 1,
                            name: this.props.data.tennhanvien
                        }
                    }
                    avatarStyle={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
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
                <View style={{
                    backgroundColor: '#40cf2e',
                    borderRadius: 16,
                    height: 32,
                    width: 150,
                    padding: 8,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{fontSize: 16, color: 'white'}}>Trực tuyến</Text>
                </View>
            )
        else if (dangtructuyen === 2)
            return (
                <View style={{
                    backgroundColor: '#f12942',
                    borderRadius: 16,
                    width: 130,
                    height: 32,
                    padding: 8,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{fontSize: 16, color: 'white'}}>Mất tín hiệu</Text>
                </View>
            )
        else if (dangtructuyen === 0)
            return (
                <View style={{
                    backgroundColor: '#D3D3D3',
                    borderRadius: 16,
                    width: 130,
                    height: 32,
                    padding: 8,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{fontSize: 16, color: 'white'}}>Ngoại tuyến</Text>
                </View>
            )

    }

    render() {
        let item = this.props.data;
        return (
            <TouchableOpacity style={{marginTop: 2}} activeOpacity={1}
                              onPress={() => this.props.goToDetailNhanVien()}>
                <View
                    onLayout={(e) => {
                        let {x, y, width, height} = e.nativeEvent.layout;
                        this.setState({height: height})
                    }}
                    style={{
                        backgroundColor: '#f7f7f7',
                        fontSize: 20, ...shadowProps,
                    }}>
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
                                    fontSize: 18, backgroundColor: 'transparent', color: '#2d92dc',
                                }}>{item.tennhanvien}</Text>
                            <Text style={{paddingVertical: 8, marginLeft: 8}}>{item.tendangnhap}</Text>
                            {this.isOnline(item.dangtructuyen)}
                        </View>
                        <TouchableOpacity onPress={() => {
                            this.props.callback()
                        }}
                                          style={{alignSelf: 'center'}}
                        >
                            <Icon2 style={{backgroundColor: 'transparent'}} size={24} color='#2d92dc'
                                   name="location"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}