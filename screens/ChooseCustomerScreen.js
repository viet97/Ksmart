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
    Platform
} from 'react-native';
import Image from 'react-native-image-progress';
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-simple-toast'
import Color from '../configs/color'
import URlConfig from "../configs/url";
import Search from "react-native-search-box";
import {StackNavigator} from 'react-navigation';
import CustomerItem from "../components/CustomerItem";
import PTRView from 'react-native-pull-to-refresh'
import LinearGradient from "react-native-linear-gradient";
import HeaderCustom from "../components/Header";
import {setCustomer} from "../configs/customer";

const timer = require('react-native-timer');

var ALL_LOADED = false
var SEARCH_STRING = '';
var PAGE = 0;
var {height, width} = Dimensions.get('window');
export default class ChooseCustomerScreen extends Component {
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
        }
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
        ALL_LOADED = false
        console.log('khach hang', URlConfig.getCustomerLink(PAGE, SEARCH_STRING))
        fetch(URlConfig.getCustomerLink(PAGE, SEARCH_STRING))
            .then((response) => (response.json()))
            .then((responseJson) => {
                console.log(URlConfig.getCustomerLink(PAGE, SEARCH_STRING), responseJson)
                if (responseJson.status) {
                    PAGE = responseJson.lastid
                    if (responseJson.endlist) {
                        ALL_LOADED = true
                        this.forceUpdate()
                    }
                    this.setState({
                        customerCount: responseJson.tongsoitem,
                        dataFull: responseJson.data,
                        dataRender: responseJson.data
                    })

                } else ALL_LOADED = true
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }

    refreshData() {
        this.getDataFromSv()
    }


    loadMoreData() {
        if (!this.state.onEndReach) {
            console.log("LOADMORE")
            this.setState({onEndReach: true})
            fetch(URlConfig.getCustomerLink(PAGE, SEARCH_STRING))
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
        if (!this.state.dataRender) {
            return (
                <View style={{flex: 9}}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"/>
                </View>)
        } else if (this.state.dataFull.length === 0)
            return (    <View style={{flex: 9}}>
                <Text style={{alignSelf: 'center', textAlign: 'center', fontSize: 20, backgroundColor: 'transparent'}}>Không
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
                    extraData={this.state.dataRender}
                    data={this.state.dataRender}
                    renderItem={({item}) =>

                        <CustomerItem
                            data={item}
                            callback={() => this.props.callback(item)}
                        />
                    }
                />
            </View>)

    }

    componentWillMount() {
        //lay mau cua khach hang
        let arrMaMau = []
        fetch(URlConfig.getLinkSoKhachHang())
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    for (let i in responseJson.danhsach) {
                        if (responseJson.danhsach[i].MaMau !== null) {
                            arrMaMau[responseJson.danhsach[i].ID_LoaiKhachHang] = '#' + responseJson.danhsach[i].MaMau
                        }
                        setCustomer(responseJson.danhsach[i].ID_LoaiKhachHang, responseJson.danhsach[i].TenLoaiKhachHang, responseJson.danhsach[i].MaMau);
                    }
                }
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))

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
            <View style={{flex: 1,backgroundColor:'white'}}>

                <HeaderCustom title={"Chọn khách hàng"} leftClick={() => this.props.backClick()}/>

                <View style={{
                    marginLeft: 8,
                    marginTop: 8,
                    marginBottom: 4,
                    marginRight: 4
                }}>
                    <Text style={{fontSize: 18, color: 'white', textAlign: 'center', backgroundColor: "transparent"}}>Tổng
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
        this.getDataFromSv()
    }
}
const styles = StyleSheet.create({
    titleStyle: {
        paddingTop: Platform.OS === 'ios' ? 16 : 0,
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: Color.backgroundNewFeed,
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
        width: 35,
        height: 35,
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