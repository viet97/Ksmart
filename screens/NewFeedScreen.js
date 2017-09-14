import {
    AppRegistry,
    Text,
    View,
    Button, ListView, StyleSheet, StatusBar,
    TouchableOpacity, ActivityIndicator, ScrollView,
    Dimensions,
    FlatList,
    Platform, Image
} from 'react-native';
import Search from 'react-native-search-box';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import React from 'react';
import URlConfig from "../configs/url";
import Toast from 'react-native-simple-toast'
import NewFeedItem from "../components/NewFeedItem";

import {ConfirmDialog} from 'react-native-simple-dialogs';
import {colors} from "../configs/color";

let SEARCH_STRING = '';
let {width, height} = Dimensions.get('window');
let ALL_LOADED = false
let PAGE = 1;
const timer = require('react-native-timer');
export default class NewFeedScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
                isSearching: false,
                refreshing: false,
                dataFull: [],
                dataRender: null,
                onEndReach: true,
                isEndList: false,
                dialogVisible: false,
                itemSelect: undefined
            }
        )
        this.getDetail = this._getDetail.bind(this);
    }

    getDataFromSv() {
        ALL_LOADED = false;
        this.setState({isEndList: false, dataRender: null})
        PAGE = 1;
        let url = URlConfig.getNewFeedLink(PAGE, SEARCH_STRING)
        console.log(url)
        fetch(url)
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status)
                    this.setState({
                        dataFull: responseJson.data,
                        isEndList: responseJson.endlist,
                        dataRender: responseJson.data
                    }, function () {
                        if (this.state.isEndList) {
                            ALL_LOADED = true
                            this.forceUpdate()
                        }
                    })
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại' + e))
    }

    loadMoreDataFromSv() {
        if (!this.state.onEndReach) {
            this.setState({onEndReach: true})

            if (!this.state.isEndList) {
                PAGE = PAGE + 1
                let url = URlConfig.getNewFeedLink(PAGE, SEARCH_STRING)
                console.log(url)
                fetch(url)
                    .then((response) => (response.json()))
                    .then((responseJson) => {
                        let arr = this.state.dataFull
                        arr = arr.concat(responseJson.data)
                        this.setState({
                            dataFull: arr,
                            isEndList: responseJson.endlist,
                            dataRender: arr
                        }, function () {
                            console.log(this.state.dataRender.length)
                            if (this.state.isEndList) {
                                ALL_LOADED = true;
                                this.forceUpdate()
                            }
                        })
                    })
                    .catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại' + e))
            }
        }
    }


    loadMoreData() {
        this.loadMoreDataFromSv()
    }

    refreshData() {
        this.getDataFromSv()
    }

    renderFooter = () => {

        if (ALL_LOADED) return null
        return (
            <View
                style={{
                    justifyContent: 'center',
                    borderColor: "green"
                }}
            >
                <ActivityIndicator animating={true} size="large"/>
            </View>
        );
    };

    flatListorIndicator() {

        if (!this.state.dataRender) {
            return (
                <View style={{flex: 9}}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"/>
                </View>)
        } else if (this.state.dataFull.length === 0 && this.state.isEndList)
            return (
                <View style={{flex: 9}}>
                    <Text style={{
                        alignSelf: 'center',
                        textAlign: 'center',
                        fontSize: 20,
                        backgroundColor: 'transparent'
                    }}>Không có dữ liệu</Text>

                </View>
            )

        return (
            <View style={{flex: 9}}>

                <FlatList
                    keyboardDismissMode="on-drag"
                    style={{flex: 1}}
                    ListFooterComponent={this.renderFooter}
                    ref="listview"
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        this.loadMoreData()
                    }}
                    onMomentumScrollBegin={() => {
                        this.setState({onEndReach: false})
                    }}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.refreshData()}
                    extraData={this.state.dataRender}
                    data={this.state.dataRender}
                    renderItem={({item}) =>
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={() => {
                                              this.setState({itemSelect: item, dialogVisible: true});
                                          }}>
                            <NewFeedItem
                                data={item}
                            />
                        </TouchableOpacity>
                    }
                />
            </View>)
    }

    onChangeText(text) {
        this.setState({isSearching: true})
        return new Promise((resolve, reject) => {
            resolve();
            var a = text.toLowerCase();
            SEARCH_STRING = a;
            this.getDataFromSv()
        });
    }

    onCancel() {
        return new Promise((resolve, reject) => {
            resolve();
            console.log("onCancle");
            if (SEARCH_STRING.length !== 0) {
                SEARCH_STRING = '';
                this.getDataFromSv()
            }
        });
    }

    render() {
        return (

            <View
                style={{flex: 1}}>
                <Image source={require('../images/flyhight.png')}
                       style={{
                           position: 'absolute',
                           top: 0,
                           bottom: 0,
                           left: 0,
                           right: 0,
                           resizeMode: 'cover',
                           width: '100%',
                           height: '100%',
                           opacity: 0.6
                       }}/>
                <View style={styles.titleStyle}>
                    <TouchableOpacity onPress={() => this.props.backToHome()}
                                      style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon1 style={styles.iconStyle} size={24} color="white"
                               name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text
                        style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Hoạt
                        động</Text>
                    <View/>
                </View>
                <View style={{width: width, padding: 8}}>
                    <Search
                        ref="search_box"
                        placeholder="Tìm kiếm"
                        cancelTitle="Huỷ bỏ"
                        onChangeText={(text) => this.onChangeText(text)}
                        onCancel={() => this.onCancel()}
                    />
                </View>
                {this.flatListorIndicator()}
                <ConfirmDialog
                    visible={this.state.dialogVisible}
                    onTouchOutside={() => this.setState({dialogVisible: false})}
                    positiveButton={{
                        title: "OK",
                        onPress: () => this.setState({dialogVisible: false})
                    }}>
                    {this.getDetail()}
                </ConfirmDialog>
            </View>

        )
    }

    _getDetail() {
        const item = this.state.itemSelect;
        if (item === undefined) {
            console.log('item', item)
            return;
        }

        console.log('item', item)
        switch (item.loai) {
            case 1:
                //đăng nhập:
                console.log('dang nhap click')
                return (

                    <View style={{flexDirection: 'row', flex: 1, paddingBottom: 64, paddingTop: 16}}>
                        <Image source={{uri: item.anhdaidien}} style={{width: 60, height: 60, borderRadius: 30}}/>
                        <View style={{flex: 1, marginLeft: 8,}}>
                            <Text style={{
                                color: colors[1],
                                fontSize: 18,
                                alignSelf: 'center',
                                marginBottom: 12
                            }}>{item.tennhanvien}</Text>
                            <Text>Đã đăng nhập: {item.thoigian_hienthi}</Text>
                        </View>
                    </View>
                )
            case 2:
                return (

                    <View style={{flexDirection: 'row', flex: 1, paddingBottom: 64, paddingTop: 16}}>
                        <Image source={{uri: item.anhdaidien}} style={{width: 60, height: 60, borderRadius: 30}}/>
                        <View style={{flex: 1, marginLeft: 8,}}>
                            <Text style={{
                                color: colors[2],
                                fontSize: 18,
                                alignSelf: 'center',
                                marginBottom: 12
                            }}>{item.tennhanvien}</Text>
                            <Text>Đã đăng xuất: {item.thoigian_hienthi}</Text>
                        </View>
                    </View>
                )
            case 3:
                return (
                    <View style={{flexDirection: 'row', flex: 1, paddingBottom: 120, paddingTop: 16}}>
                        <Image source={{uri: item.anhdaidien}} style={{width: 60, height: 60, borderRadius: 30}}/>
                        <View style={{flex: 1, marginLeft: 8}}>
                            <Text style={{
                                color: colors[3],
                                fontSize: 18,
                                alignSelf: 'center',
                                marginBottom: 12
                            }}>{item.tennhanvien}</Text>
                            <Text>Khách hàng: {item.tenkhachhang}</Text>
                            <Text>Địa chỉ: {item.diachi}</Text>
                            <Text>Vào điểm: {item.thoigian_hienthi}</Text>
                        </View>
                    </View>
                )
            case 4:
                return (
                    <View style={{flexDirection: 'row', flex: 1, paddingBottom: 120, paddingTop: 16}}>
                        <Image source={{uri: item.anhdaidien}} style={{width: 60, height: 60, borderRadius: 30}}/>
                        <View style={{flex: 1, marginLeft: 8}}>
                            <Text style={{
                                color: colors[4],
                                fontSize: 18,
                                alignSelf: 'center',
                                marginBottom: 12
                            }}>{item.tennhanvien}</Text>
                            <Text>Khách hàng: {item.tenkhachhang}</Text>
                            <Text>Địa chỉ: {item.diachi}</Text>
                            <Text>Ra điểm: {item.thoigian_hienthi}</Text>
                        </View>
                    </View>
                )
            case 5:
                return (
                    <View style={{flexDirection: 'row', flex: 1, paddingBottom: 120, paddingTop: 16}}>
                        <Image source={{uri: item.anhdaidien}} style={{width: 60, height: 60, borderRadius: 30}}/>
                        <View style={{flex: 1, marginLeft: 8}}>
                            <Text style={{
                                color: colors[5],
                                fontSize: 18,
                                alignSelf: 'center',
                                marginBottom: 12
                            }}>{item.tennhanvien}</Text>
                            <Text>Khách hàng: {item.tenkhachhang || "<trống>"}</Text>
                            <Text>Địa chỉ: {item.diachi}</Text>
                            <Text>Chụp ảnh: {item.thoigian_hienthi}</Text>
                            <Text>Số lượng ảnh: {item.soluonganh}</Text>
                        </View>
                    </View>
                )
            case 6:
                return (
                    <View style={{flexDirection: 'row', flex: 1, paddingBottom: 120, paddingTop: 16}}>
                        <Image source={{uri: item.anhdaidien}} style={{width: 60, height: 60, borderRadius: 30}}/>
                        <View style={{flex: 1, marginLeft: 8}}>
                            <Text style={{
                                color: colors[6],
                                fontSize: 18,
                                alignSelf: 'center',
                                marginBottom: 12
                            }}>{item.tennhanvien}</Text>
                            <Text>Khách hàng: {item.tenkhachhang || "<trống>"}</Text>
                            <Text>Địa chỉ: {item.diachi}</Text>
                            <Text>Lập đơn hàng: {item.thoigian_hienthi}</Text>
                            <Text>Tổng tiền: {item.TongTien}</Text>
                        </View>
                    </View>
                )
        }
    }

    componentDidMount() {
        SEARCH_STRING = '';
        this.getDataFromSv();
    }

}
const styles = StyleSheet.create({
    titleStyle: {
        marginTop: Platform.OS === 'ios' ? 16 : 0,
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    headerStyle: {
        elevation: 15, height: this.height / 7
    },
    itemSideMenuStyle: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 8,
        paddingBottom: 8
    }, iconStyle: {
        alignSelf: 'center',
        width: 24,
        height: 24,
        backgroundColor: "transparent",
        paddingLeft: 8,
        paddingTop: (Platform.OS === 'ios') ? 4 : 0
    },
    textStyle: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent'
    },
    titleIconsMenu: {
        textAlign: 'center',
        color: 'white'
    },
    indicator: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    }
})