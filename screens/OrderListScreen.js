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
import DialogOrder from '../components/DialogOrder'
import Search from 'react-native-search-box';
import ultils from "../configs/ultils";
import Toast from 'react-native-simple-toast'
import OrderListItem from "../components/OrderListItem";
import PTRView from 'react-native-pull-to-refresh'
import {ConfirmDialog} from 'react-native-simple-dialogs';

let {height, width} = Dimensions.get('window');
let NUMBER_ITEM_PER_PAGE = 10;
let Page = 1;
let SEARCH_STRING = '';
let ALL_LOADED = false;
export default class OrderListScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        today = dd + '-' + mm + '-' + yyyy;
        this.state = {
            dialogVisible: false,
            onEndReach: true,
            isEndList: false,
            ALL_LOADED: false,
            isSearching: false,
            refreshing: false,
            rows: [],
            waiting: false,
            data: [],
            dataSearch: [],
            filtDialog: {
                status: 'false',
                numberPicktttt: 0,
                numberPickttgh: 0,
                numberPickttdh: 0,
                dateFrom: today,
                dateTo: today
            },
            urlGetData: URlConfig.getLinkOrderList(today, today),
            dataRender: null,
            orderListDataFull: [],
            orderListDataFilt: []
        }
    }


    getOrderListFromServer(datef, datet) {
        Page = 1
        ALL_LOADED = false
        this.setState({isEndList: false, dataRender: null})
        fetch(URlConfig.getLinkOrderList(datef, datet, Page, SEARCH_STRING))
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('url', URlConfig.getLinkOrderList(datef, datet, Page, SEARCH_STRING))
                if (responseJson.status) {
                    this.setState({
                        orderListDataFull: responseJson.data,
                        isEndList: responseJson.endlist
                    }, function () {
                        let dataFill = this.filtData(responseJson.data)
                        if (dataFill.length < NUMBER_ITEM_PER_PAGE || this.state.isEndList) {
                            ALL_LOADED = true;
                            this.forceUpdate()
                        }
                        this.setState({dataRender: dataFill})
                    });
                } else {
                    ALL_LOADED = true
                    this.forceUpdate()
                }
            })
            .catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'));
    }

    refreshData() {
        this.getOrderListFromServer(this.state.filtDialog.dateFrom, this.state.filtDialog.dateTo)
    }

    filtData(data) {

        var arr = []
        var tttt = this.state.filtDialog.numberPicktttt
        var ttdh = this.state.filtDialog.numberPickttdh
        var ttgh = this.state.filtDialog.numberPickttgh
        console.log(URlConfig.OBJLOGIN.ttdhid[ttdh])
        for (var item in data)
            if (URlConfig.OBJLOGIN.ttdhid[ttdh] === data[item].trangthaidonhang || ttdh === 0) {
                if (URlConfig.OBJLOGIN.ttghid[ttgh] === data[item].trangthaigiaohang || ttgh === 0) {
                    if (URlConfig.OBJLOGIN.ttttid[tttt] === data[item].trangthaithanhtoan || tttt === 0) {
                        arr.push(data[item])
                    }
                }
            }

        return arr
    }

    loadMoreDataFromSv() {

        if (!this.state.onEndReach) {
            this.setState({onEndReach: true})

            if (!this.state.isEndList) {
                Page = Page + 1;
                fetch(URlConfig.getLinkOrderList(this.state.filtDialog.dateFrom, this.state.filtDialog.dateTo, Page, SEARCH_STRING))
                    .then((response) => response.json())
                    .then((responseJson) => {
                        if (responseJson.status) {
                            let dataFull = this.state.orderListDataFull
                            dataFull = dataFull.concat(responseJson.data)
                            this.setState({
                                orderListDataFull: dataFull,
                                isEndList: responseJson.endlist
                            }, function () {
                                if (this.state.isEndList) {
                                    ALL_LOADED = true
                                    this.forceUpdate()
                                }
                                let dataFill = this.filtData(dataFull)
                                this.setState({dataRender: dataFill})
                            });
                        } else {
                            ALL_LOADED = true
                            this.forceUpdate()
                        }
                    })
                    .catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại' + e));
            }
        }
    }


    componentDidMount() {
        SEARCH_STRING = ''
        this.getOrderListFromServer(this.state.filtDialog.dateFrom, this.state.filtDialog.dateTo)
    }

    refreshData() {
        this.getOrderListFromServer(this.state.filtDialog.dateFrom, this.state.filtDialog.dateTo)
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

    onChangeText(text) {
        return new Promise((resolve, reject) => {
            resolve();
            var arr = []
            var a = text.toLowerCase()
            SEARCH_STRING = a
            console.log(a)
            this.getOrderListFromServer(this.state.filtDialog.dateFrom, this.state.filtDialog.dateTo)
        });
    }

    onCancel() {
        return new Promise((resolve, reject) => {
            resolve();
            console.log("onCancle")
            if (SEARCH_STRING.length !== 0) {
                SEARCH_STRING = ''
                this.getOrderListFromServer(this.state.filtDialog.dateFrom, this.state.filtDialog.dateTo)
            }

        });
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
        } else if (this.state.orderListDataFull.length === 0 && this.state.isEndList)
            return (
                <View style={{flex: 9}}>
                    <Text style={{
                        alignSelf: 'center',
                        textAlign: 'center',
                        fontSize: 20,
                        backgroundColor: 'transparent'
                    }}>Không
                        có dữ liệu</Text>

                </View>
            )

        return (
            <View style={{flex: 9}}>
                <FlatList
                    keyboardDismissMode="on-drag"
                    ListFooterComponent={this.renderFooter}
                    ref={(listV) => {
                        this.listV = listV
                    }}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        this.loadMoreDataFromSv()
                    }}
                    onMomentumScrollBegin={() => {

                        this.setState({onEndReach: false})
                    }}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.refreshData()}
                    extraData={this.state.dataRender}
                    data={this.state.dataRender}
                    renderItem={({item}) =>
                        <OrderListItem
                            data={item}
                            goToDetail={() => this.props.goToDetail(item.iddonhang)}
                        />
                    }
                />
            </View>)
    }

    render() {

        return (
            <View style={{flex: 1}}>
                <Image source={require('../images/bg.png')}
                       style={{position: 'absolute', top: 0}}/>
                <View style={styles.titleStyle}>
                    <Image source={require('../images/bg.png')}
                           style={{position: 'absolute'}}/>
                    <TouchableOpacity onPress={() => this.props.backToHome()}
                                      style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Danh
                        sách đơn hàng</Text>
                    <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => {
                        this.showDialog();
                    }}>
                        <Text style={{color: 'white', padding: 8, backgroundColor: 'transparent'}}>Bộ lọc</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: width}}>
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
                    positiveButton={{
                        title: "Áp dụng",
                        onPress: () => {

                            var dialogState = this.refs.dialogOrder.state;
                            var dFrom = String(dialogState.dateFrom);
                            var dTo = String(dialogState.dateTo);
                            dFrom.replace('/', '-');
                            dTo.replace('/', '-');

                            let data = {
                                'status': true,
                                numberPicktttt: dialogState.numberPicktttt,
                                numberPickttgh: dialogState.numberPickttgh,
                                numberPickttdh: dialogState.numberPickttdh,
                                dateFrom: dFrom,
                                dateTo: dTo
                            };
                            console.log('data', data);
                            this.setState({filtDialog: data}, function () {
                                this.setState({dialogVisible: false})
                                if (this.state.filtDialog.status) {
                                    this.getOrderListFromServer(this.state.filtDialog.dateFrom, this.state.filtDialog.dateTo)
                                }
                            })
                        }
                    }}
                    negativeButton={{
                        title: "Huỷ bỏ",
                        onPress: () => this.setState({dialogVisible: false})
                    }}
                >
                    <DialogOrder
                        ref="dialogOrder"
                        deFaultData={this.state.filtDialog}
                        callback={(data) => {
                            this.setState({filtDialog: data}, function () {
                                this.setState({dialogVisible: false})
                                if (this.state.filtDialog.status) {
                                    this.getOrderListFromServer(this.state.filtDialog.dateFrom, this.state.filtDialog.dateTo)
                                }
                            })
                        }}/>

                </ConfirmDialog>
            </View>

        )
    }

    showDialog() {
        this.setState({dialogVisible: true})
    }
}
const styles = StyleSheet.create({
    indicator: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    },
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
        borderBottomWidth: 1,
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
        marginLeft: 8,

    },
    textStyle: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent'
    },
    titleIconsMenu: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        fontFamily: 'Al Nile'
    }
});