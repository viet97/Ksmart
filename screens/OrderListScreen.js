import React, {Component} from 'react'
import DatePicker from 'react-native-datepicker'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Button,
    Picker,
    FlatList,
    TouchableHightLight
} from "react-native";
import URlConfig from "../configs/url";
import Color from '../configs/color'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Entypo'
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import {DialogComponent, SlideAnimation} from 'react-native-dialog-component';
import Dialog from '../components/Dialog'
import orderListData from '../dbcontext/orderListData'
import AtoZListView from 'react-native-atoz-listview';
import Search from 'react-native-search-box';
var {height} = Dimensions.get('window');
var GiftedListView = require('react-native-gifted-listview');

var NUMBER_ROW_RENDER = 10
var FIRST_LOADED = false;
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
            refreshing: false,
            rows: [],
            waiting: false,
            data: [],
            filtDialog: {
                status: 'false',
                numberPicktttt: 0,
                numberPickttgh: 0,
                numberPickttdh: 0,
                dateFrom: today,
                dateTo: today
            },
            urlGetData: URlConfig.getLinkOrderList(today, today),
            dataRender: [],
            orderListDataFull: [],
            orderListDataFilt: []
        }
    }

    getOrderListFromServer(datef, datet) {
        fetch(URlConfig.getLinkOrderList(datef, datet))
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    orderListDataFull: responseJson.data
                }, function () {
                    this.filtData(responseJson.data)
                });
            })
            .catch((error) => {
                console.error(error);
            });
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
        this.setState({orderListDataFilt: arr}, function () {
            this.setState({dataRender: this.state.orderListDataFilt.slice(0, NUMBER_ROW_RENDER)})
            NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
        })

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
            <View style={{flexDirection: 'row', justifyContent: 'space-between', height: 60, flex: 1, margin: 8}}>
                <TouchableOpacity style={{backgroundColor: 'white', flex: 1, marginRight: 4}}>
                    <Icon2 size={12} color={colorGH} name="controller-record"/>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        backgroundColor: 'transparent',
                        textAlign: 'center',
                        color: colorGH
                    }}>{URlConfig.OBJLOGIN.ttgh[rowData.trangthaigiaohang]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: 'white', flex: 1, marginLeft: 4}}>
                    <Icon2 size={12} color={colorTT} name="controller-record"/>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        backgroundColor: 'transparent',
                        textAlign: 'center',
                        color: colorTT
                    }}>{URlConfig.OBJLOGIN.tttt[rowData.trangthaithanhtoan]}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    getInfoKhachHang(rowData) {
        var color;
        switch (rowData.trangthaidonhang) {
            case 1:
                color = '#CE93D8'
                break;
            case 2:
                color = '#FF4081'
                break;
            case 3:
                color = '#9E9D24'
                break;
            case 4:
                color = '#D50000'
                break;
            case 5:
                color = '#64DD17'
                break;
            case 9:
                color = '#FF9800'
                break;
            case 12:
                color = '#76FF03'
                break;
            case 13:
                color = '#2E7D32'
                break;
            case 24:
                color = '#D500F9'
                break;
        }
        return (
            <TouchableOpacity style={{backgroundColor: color, marginLeft: 4, flex: 1, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center'}}>{URlConfig.OBJLOGIN.ttdh[rowData.trangthaidonhang]}</Text>
            </TouchableOpacity>
        )
    }

    loadMoreData() {
        if (!this.state.onEndReach) {
            console.log("LOADMORE")
            this.setState({onEndReach: true})
            this.setState({dataRender: this.state.orderListDataFilt.slice(0, NUMBER_ROW_RENDER + 10)})
            NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
        }
    }

    refreshData() {
        NUMBER_ROW_RENDER = 10
        this.getOrderListFromServer(this.state.filtDialog.dateFrom, this.state.filtDialog.dateTo)
    }

    render() {

        return (
            <View style={{flex: 1}}>

                <View style={styles.titleStyle}>
                    <TouchableOpacity onPress={() => this.props.backToHome()}
                                      style={styles.iconStyle}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>Danh sách đơn hàng</Text>
                    <View style={{backgroundColor: Color.backgroundNewFeed, width: 35, height: 35}}></View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: 300}}>
                        <Search
                            ref="search_box"
                        />
                    </View>
                    <Button title='click' onPress={() => {
                        this.showDialog();
                    }}/>
                </View>
                <View style={{backgroundColor: '#C5CAE9', flex: 9}}>
                    <FlatList
                        ref={(listV) => {
                            this.listV = listV
                        }}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.refreshData()
                        }}
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
                            <View

                                style={{
                                    margin: 4,
                                    backgroundColor: '#E0E0E0',
                                    height: height / 4, flex: 1
                                }}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 8}}>
                                    <Text style={{fontWeight: "bold", fontSize: 18}}>MĐH {item.mathamchieu} </Text>
                                    <Text style={{fontSize: 18}}>{item.tongtien} Đ </Text>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 8}}>
                                    <View style={{flex: 1, marginRight: 4}}>
                                        <Text style={{fontSize: 17}}>{item.tenkhachhang} </Text>
                                        <Text style={{fontSize: 10}}>{item.thoigianlapdon} </Text>
                                    </View>
                                    {this.getInfoKhachHang(item)}
                                </View>
                                {this.getGiaoHangHoacThanhToan(item)}

                            </View>
                        }
                    />
                </View>
            </View>

        )
    }

    showDialog() {
        DialogManager.show({

            title: 'Dialog',
            titleAlign: 'center',
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
    titleStyle: {
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
        marginLeft: 8
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
