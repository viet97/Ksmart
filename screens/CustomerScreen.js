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
    TextInput, RefreshControl
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
import HeaderCustom from "../components/Header";

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let ALL_LOADED = false
let SEARCH_STRING = '';
let PAGE = 0;
let ID;
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
            dataRender: ds,
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

    getDataFromSv(id) {

        PAGE = 0;
        this.setState({dataRender: null})
        ALL_LOADED = false;
        console.log('url', URlConfig.getCustomerLink(PAGE, SEARCH_STRING, id))
        fetch(URlConfig.getCustomerLink(PAGE, SEARCH_STRING, id))
            .then((response) => (response.json()))
            .then((responseJson) => {
                this.setState({customerCount: responseJson.tongsoitem})
                if (responseJson.status) {
                    PAGE = responseJson.lastid
                    if (responseJson.endlist) {
                        ALL_LOADED = true
                        this.forceUpdate()
                    }
                    if (responseJson.data)
                        this.setState({
                            dataFull: responseJson.data,
                            dataRender: ds.cloneWithRows(responseJson.data)
                        })
                    else
                        this.setState({
                            dataFull: [],
                            dataRender: null
                        })


                } else {
                    this.setState({dataFull: [], dataRender: ds.cloneWithRows([])})
                    ALL_LOADED = true
                    this.forceUpdate()
                }
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại ' + e))
    }

    refreshData(id) {
        this.getDataFromSv(id)
    }


    loadMoreData(id) {
            console.log("LOADMORE")
        fetch(URlConfig.getCustomerLink(PAGE, SEARCH_STRING, id))
                .then((response) => (response.json()))
                .then((responseJson) => {
                    console.log(responseJson)
                    if (responseJson.status) {
                        if (responseJson.endlist) {
                            ALL_LOADED = true
                            this.forceUpdate()
                        }
                        PAGE = responseJson.lastid
                        var arr = this.state.dataFull.concat(responseJson.data)
                        this.setState({
                            dataRender: ds.cloneWithRows(arr),
                            dataFull: arr
                        })

                    }
                }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))

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

                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.refreshData(ID)}
                        />
                    }
                    renderFooter={this.renderFooter}
                    ref="listview"
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        this.loadMoreData(ID)
                    }}
                    dataSource={this.state.dataRender}
                    renderRow={(item) =>

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
        const {params} = this.props.navigation.state;
        this.setState({isSearching: true})
        console.log("onChangeText")
        return new Promise((resolve, reject) => {
            resolve();
            console.log("promise")
            var keyword = text.toLowerCase()
            SEARCH_STRING = keyword
            timer.clearTimeout(this)
            timer.setTimeout(this, "123", () => this.getDataFromSv(params.id), 500);
        });
    }


    render() {

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <HeaderCustom
                    title={"Thông tin khách hàng"}
                    leftClick={() => this.props.navigation.goBack()}
                    rightChildren={
                        <TouchableOpacity activeOpacity={0.7} style={{alignSelf: 'center'}}
                                          onPress={() => {
                                              this.setState({dialogVisible: true})
                                          }}>
                            <Text style={{color: 'white', backgroundColor: 'transparent'}}>Chi tiết</Text>
                        </TouchableOpacity>
                    }
                />
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

                                <TouchableOpacity
                                    onPress={() => {
                                        ID = item.id
                                        this.getDataFromSv(item.id)
                                        this.setState({dialogVisible: false})
                                    }}
                                    style={{flexDirection: 'row', marginTop: 16}}>
                                    <View
                                        style={{width: 30, height: 30, borderRadius: 15, backgroundColor: item.color}}/>
                                    <Text style={{alignSelf: 'center', marginLeft: 8}}>{item.name}</Text>
                                </TouchableOpacity>
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
        const {params} = this.props.navigation.state;
        return new Promise((resolve, reject) => {
            resolve();
            console.log("onCancle")
            console.log("onCancle")
            if (SEARCH_STRING.length !== 0) {
                SEARCH_STRING = ''
                this.getDataFromSv(params.id)
            }
        });
    }

    componentDidMount() {
        const {params} = this.props.navigation.state;
        ID = params.id
        PAGE = 0
        SEARCH_STRING = ''
        this.getDataFromSv(params.id)
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