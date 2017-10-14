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
    Platform,
    TextInput
} from 'react-native';

const timer = require('react-native-timer');

import Image from 'react-native-image-progress';
import {Icon} from 'react-native-elements';
import Icon2 from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-simple-toast'
import Color from '../configs/color'
import URlConfig from "../configs/url";
import Search from "react-native-search-box";
import {StackNavigator} from 'react-navigation';
import CustomerItem from "../components/CustomerItem";
import PTRView from 'react-native-pull-to-refresh'
import LinearGradient from "react-native-linear-gradient";
import {getListCustomer} from "../configs/customer";
import {Dialog} from "react-native-simple-dialogs";

let ALL_LOADED = false
let SEARCH_STRING = '';
let PAGE = 0;
let {height, width} = Dimensions.get('window');
export default class CustomerScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            customerCount: 0,
            isSearching: false,
            refreshing: false,
            dataSearch: [],
            dataFull: [],
            dataRender: null,
            onEndReach: true,
            dialogVisible: false
        }
        console.log('ccqqkk', getListCustomer());
    }

    renderFooter = () => {

        console.log("Footer")
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

    getDataFromSv() {
        PAGE = 0;
        this.setState({dataRender: null})
        ALL_LOADED = false;
        const {params} = this.props.navigation.state;
        console.log('url', URlConfig.getCustomerLink(PAGE, SEARCH_STRING, params.id))
        fetch(URlConfig.getCustomerLink(PAGE, SEARCH_STRING, params.id))
            .then((response) => (response.json()))
            .then((responseJson) => {
                this.setState({customerCount: responseJson.tongsoitem})
                if (responseJson.status) {
                    PAGE = responseJson.lastid
                    if (responseJson.endlist) {
                        ALL_LOADED = true
                        this.forceUpdate()
                    }
                    this.setState({
                        dataFull: responseJson.data,
                        dataRender: responseJson.data
                    })

                } else {
                    this.setState({dataRender: []})
                    ALL_LOADED = true
                    this.forceUpdate()
                }
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại '))
    }

    refreshData() {
        this.getDataFromSv()
    }


    loadMoreData() {
        const {params} = this.props.navigation.state
        if (!this.state.onEndReach) {
            console.log("LOADMORE")
            this.setState({onEndReach: true})
            fetch(URlConfig.getCustomerLink(PAGE, SEARCH_STRING, params.id))
                .then((response) => (response.json()))
                .then((responseJson) => {
                    console.log(responseJson)
                    if (responseJson.status) {
                        if (responseJson.endlist) {
                            ALL_LOADED = true
                            this.forceUpdate()
                        }
                        PAGE = responseJson.lastid
                        var arr = this.state.dataRender.concat(responseJson.data)
                        this.setState({
                            dataRender: arr,
                            dataFull: arr
                        })

                    }
                }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))

        }
    }

    flatListorIndicator() {
        const {navigate} = this.props.navigation;
        const {params} = this.props.navigation.state
        if (!this.state.dataRender) {
            return (
                <View style={{flex: 9}}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"/>
                </View>)
        } else if (this.state.dataFull.length === 0)
            return (
                <View style={{flex: 9}}>
                    <Text style={{
                        alignSelf: 'center',
                        textAlign: 'center',
                        fontSize: 20,
                        backgroundColor: 'transparent'
                    }}>Không
                        có dữ liệu</Text>

                </View>)

        return (
            <View style={{flex: 9}}>

                <FlatList
                    keyboardDismissMode="on-drag"
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

                        <CustomerItem
                            mamau={params.mamau[item.idloaikhachhang]}
                            data={item}
                            callback={() => navigate('DetailCustomer', {
                                id: item.idcuahang,
                                title: 'Địa chỉ khách hàng',
                                kinhdo: item.KinhDo,
                                vido: item.ViDo,
                                item: item
                            })}
                        />
                    }
                />
            </View>)

    }

    onChangeText(text) {
        this.setState({isSearching: true})
        console.log("onChangeText")
        return new Promise((resolve, reject) => {
            resolve();
            console.log("promise")
            var keyword = text.toLowerCase()
            SEARCH_STRING = keyword
            timer.clearTimeout(this)
            timer.setTimeout(this, "123", () => this.getDataFromSv(), 500);
        });
    }


    render() {

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <LinearGradient colors={['#1b60ad', '#3dc4ea']} style={styles.titleStyle}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                      style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon2 style={styles.iconStyle} size={24} color="white"
                               name="ios-arrow-back"/></TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Thông
                        tin khách hàng</Text>
                    <TouchableOpacity activeOpacity={0.7} style={{alignSelf: 'center'}}
                                      onPress={() => {
                                          this.setState({dialogVisible: true})
                                      }}>
                        <Text style={{color: 'white', backgroundColor: 'transparent'}}>Chi tiết</Text>
                    </TouchableOpacity>
                </LinearGradient>

                <View style={{
                    marginLeft: 8,
                    marginTop: 8,
                    marginBottom: 4,
                    marginRight: 4
                }}>
                    <Text style={{fontSize: 18, color: 'black', textAlign: 'center', backgroundColor: "transparent"}}>Tổng
                        số khách hàng
                        : {this.state.customerCount}</Text>
                </View>
                <View style={{
                    marginLeft: 8,
                    marginTop: 8,
                    marginBottom: 4,
                    marginRight: 4
                }}>
                    <Search

                        ref="search_box"
                        placeholder="Tìm kiếm"
                        cancelTitle="Huỷ bỏ"
                        onChangeText={(text) => this.onChangeText(text)}
                        onCancel={() => this.onCancel()}
                    />
                </View>
                {this.flatListorIndicator()}
                <Dialog
                    visible={this.state.dialogVisible}
                    onTouchOutside={() => this.setState({dialogVisible: false})}>
                    <View style={{}}>
                        <FlatList
                            keyboardDismissMode="on-drag"
                            ref="listview"
                            data={getListCustomer()}
                            renderItem={({item}) =>

                                <View style={{flexDirection: 'row', marginTop: 16}}>
                                    <View
                                        style={{width: 30, height: 30, borderRadius: 15, backgroundColor: item.color}}/>
                                    <Text style={{alignSelf: 'center', marginLeft: 8}}>{item.name}</Text>
                                </View>
                            }
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            right: 8,
                            top: 8
                        }}
                        onPress={() => {
                            this.setState({dialogVisible: false})
                        }}>
                        <Icon name={'x'} size={24} type={'foundation'} color={'red'}/>
                    </TouchableOpacity>
                </Dialog>
            </View>
        )
    }

    onCancel() {
        return new Promise((resolve, reject) => {
            resolve();
            console.log("onCancle")
            console.log("onCancle")
            if (SEARCH_STRING.length !== 0) {
                SEARCH_STRING = ''
                this.getDataFromSv()
            }
        });
    }

    componentDidMount() {
        PAGE = 0
        SEARCH_STRING = ''
        this.getDataFromSv()
    }
}
const styles = StyleSheet.create({
    titleStyle: {
        paddingTop: Platform.OS === 'ios' ? 16 : 0,
        flex: 1,
        elevation: 15,
        padding: 8,
        justifyContent: 'space-between',
        flexDirection: 'row'
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
        backgroundColor: "transparent",
        marginLeft: 8,
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