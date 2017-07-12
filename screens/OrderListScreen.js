import React, {Component} from 'react'
import DatePicker from 'react-native-datepicker'
import {Text, View, StyleSheet, TouchableOpacity, Dimensions, Button, Picker, TouchableHightLight} from "react-native";
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


export default class OrderListScreen extends Component {
    static navigationOptions = {
        header: null,
    }

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

        today = dd + '/' + mm + '/' + yyyy;
        this.state = {
            index: 0,
            waiting: false,
            dateFrom: today,
            dateTo: today,
            data: [],
        }
    }

    _onFetch(page = 1, callback, options) {
        console.log(URlConfig.getLinkOrderList(orderListData.dFrom, orderListData.dTo))
        var dem = 0;
        if (page === 1) {
            this.setState({index: 0})
            fetch(URlConfig.getLinkOrderList(orderListData.dFrom, orderListData.dTo))
                .then((response) => (response.json()))
                .then((responseJson) => {
                    if (responseJson.status) {
                        var arr = []
                        for (var item in responseJson.data) {
                            if (URlConfig.OBJLOGIN.ttdh[responseJson.data[item].trangthaidonhang] === orderListData.pickttdh || orderListData.pickttdh === 'Tất cả') {

                                console.log(responseJson.data[item])
                                console.log(responseJson.data[item].trangthaidonhang)
                                console.log(orderListData.pickttdh)
                                if (URlConfig.OBJLOGIN.ttgh[responseJson.data[item].trangthaigiaohang] === orderListData.pickttgh || orderListData.pickttgh === 'Tất cả') {
                                    console.log(responseJson.data[item])
                                    console.log(responseJson.data[item].trangthaigiaohang)
                                    console.log(orderListData.pickttgh)
                                    console.log(URlConfig.OBJLOGIN.tttt[responseJson.data[item].trangthaithanhtoan])
                                    console.log(orderListData.picktttt)
                                    if (URlConfig.OBJLOGIN.tttt[responseJson.data[item].trangthaithanhtoan] === orderListData.picktttt || orderListData.picktttt === 'Tất cả') {

                                        arr.push(responseJson.data[item])
                                    }
                                }
                            }
                        }
                        this.setState({data: arr}, function () {
                                setTimeout(() => {
                                    var a = this.state.data;
                                    var rows = [];
                                    while (dem < 7) {
                                        dem++;
                                        if (a[this.state.index] !== undefined) {
                                            rows.push(a[this.state.index]);
                                            this.setState({index: this.state.index + 1});
                                        }
                                    }
                                    if (this.state.index === this.state.data.length) {
                                        callback(rows, {
                                            allLoaded: true, // the end of the list is reached
                                        });
                                    } else {
                                        callback(rows);
                                    }
                                }, 1000);
                            }
                        );

                        console.log(this.state.data)
                    } else {
                        Toast.show(responseJson.msg)
                    }
                })
        } else {
            setTimeout(() => {
                var a = this.state.data;
                var rows = [];
                while (dem < 7) {
                    dem++;
                    if (a[this.state.index] !== undefined) {
                        rows.push(a[this.state.index]);
                        this.setState({index: this.state.index + 1});
                    }
                }
                if (this.state.index === this.state.data.length) {
                    callback(rows, {
                        allLoaded: true, // the end of the list is reached
                    });
                } else {
                    callback(rows);
                }
            }, 1000);
        }

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
                break
            case 2:
                color = '#FF4081'
                break
            case 3:
                color = '#9E9D24'
                break
            case 4:
                color = '#D50000'
                break
            case 5:
                color = '#64DD17'
                break
            case 9:
                color = '#FF9800'
                break
            case 12:
                color = '#76FF03'
                break
            case 13:
                color = '#2E7D32'
                break
            case 24:
                color = '#D500F9'
                break

        }
        return (
            <TouchableOpacity style={{backgroundColor: color, marginLeft: 4, flex: 1, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center'}}>{URlConfig.OBJLOGIN.ttdh[rowData.trangthaidonhang]}</Text>
            </TouchableOpacity>
        )
    }

    _renderRowView(rowData) {
        return (
            <View

                style={{
                    margin: 4,
                    backgroundColor: '#E0E0E0',
                    height: height / 4, flex: 1
                }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 8}}>
                    <Text style={{fontWeight: "bold", fontSize: 18}}>MĐH {rowData.mathamchieu} </Text>
                    <Text style={{fontSize: 18}}>{rowData.tongtien} Đ </Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 8}}>
                    <View style={{flex: 1, marginRight: 4}}>
                        <Text style={{fontSize: 17}}>{rowData.tenkhachhang} </Text>
                        <Text style={{fontSize: 10}}>{rowData.thoigianlapdon} </Text>
                    </View>
                    {this.getInfoKhachHang(rowData)}
                </View>
                {this.getGiaoHangHoacThanhToan(rowData)}

            </View>
        );
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
                    <GiftedListView
                        ref="listview"
                        rowView={this._renderRowView.bind(this)}
                        onFetch={this._onFetch.bind(this)}
                        firstLoader={true} // display a loader for the first fetching
                        pagination={true} // enable infinite scrolling using touch to load more
                        refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                        withSections={false} // enable sections
                        enableEmptySections={true}
                        refreshableTintColor="blue"
                        customStyles={{
                            paginationView: {
                                backgroundColor: '#C5CAE9',
                            },
                        }}
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
                <Dialog loadOrderListData={() => this.refs.listview._refresh()}/>
            ),
        }, () => {
            console.log('callback - show');
        });
    }

    updateDialog() {
        DialogManager.update({
            title: 'Dialog Updated',
            titleAlign: 'center',
            animationDuration: 200,
            ScaleAnimation: new ScaleAnimation(),
            children: (
                <DialogContent>
                    <View>
                        <Picker
                            selectedValue={this.state.language}
                            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue}, function () {
                                this.updateDialog();
                            })}>
                            <Picker.Item label="Java" value="java"/>
                            <Picker.Item label="JavaScript" value="js"/>
                        </Picker>
                    </View>
                </DialogContent>
            ),
        }, () => {
            console.log('callback - update dialog');
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
