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
import Dialog from '../components/Dialog'
import Search from 'react-native-search-box';
import ultils from "../configs/ultils";
import Toast from 'react-native-simple-toast'

let {height, width} = Dimensions.get('window');

let Page = 1
let SEARCH_STRING = '';
let ALL_LOADED = false
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
                if (responseJson.status) {
                    this.setState({
                        orderListDataFull: responseJson.data,
                        isEndList: responseJson.endlist
                    }, function () {
                        if (this.state.isEndList) {
                            ALL_LOADED = true
                            this.forceUpdate()
                        }
                        let dataFill = this.filtData(responseJson.data)
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
                Page = Page + 1
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
                                let dataFill = this.filtData(responseJson.data)
                                this.setState({dataRender: dataRender})
                            });
                        } else {
                            ALL_LOADED = true
                            this.forceUpdate()
                        }
                    })
                    .catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'));
            }
        }
    }


    componentDidMount() {
        this.getOrderListFromServer(this.state.filtDialog.dateFrom, this.state.filtDialog.dateTo)
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


    refreshData() {
        this.getOrderListFromServer(this.state.filtDialog.dateFrom, this.state.filtDialog.dateTo, Page, SEARCH_STRING)
    }

    renderFooter = () => {
        Toast.show('' + ALL_LOADED)
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
                <View style={{backgroundColor: Color.backGroundFlatList, flex: 9}}>
                    <Image source={require('../images/bg.png')}
                           style={{position: 'absolute'}}/>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"/>
                </View>)
        } else if (this.state.orderListDataFull.length === 0 && this.state.isEndList)
            return (    <View style={{flex: 9}}>
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
            <View style={{backgroundColor: Color.backGroundFlatList, flex: 9}}>
                <Image source={require('../images/bg.png')}
                       style={{position: 'absolute'}}/>
                <FlatList
                    ListFooterComponent={this.renderFooter}
                    ref={(listV) => {
                        this.listV = listV
                    }}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.refreshData()
                    }}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        this.loadMoreDataFromSv()
                    }}
                    onMomentumScrollBegin={() => {

                        this.setState({onEndReach: false})
                    }}
                    extraData={this.state.dataRender}
                    data={this.state.dataRender}
                    renderItem={({item}) =>
                        <View
                            style={{
                                margin: 4,
                            }}>
                            <Image source={require('../images/bg1.png')}
                                   style={{
                                       width: width - 8,
                                       height: height / 4.5
                                   }}>
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
                            </Image>


                        </View>
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
                                      style={styles.iconStyle}>
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
                <TouchableOpacity onPress={() => this.props.backToHome()}
                                  style={{
                                      width: 50,
                                      height: 50,
                                      position: 'absolute',
                                      left: 16,
                                      top: 0,
                                      right: 0,
                                      bottom: 0
                                  }}/>
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
            </View>

        )
    }

    showDialog() {
        DialogManager.show({
            animationDuration: 200,
            ScaleAnimation: new ScaleAnimation(),
            children: (
                <Dialog deFaultData={this.state.filtDialog}
                        callback={(data) => {
                            this.setState({filtDialog: data}, function () {
                                if (this.state.filtDialog.status) {
                                    this.getOrderListFromServer(this.state.filtDialog.dateFrom, this.state.filtDialog.dateTo)
                                }
                            })
                        }}/>
            ),
        }, () => {
            console.log('callback - show');
        });
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
        backgroundColor: Color.backgroundNewFeed,
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
})