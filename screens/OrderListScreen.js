import React, {Component} from 'react'
import DatePicker from 'react-native-datepicker'
import {Text, View,StyleSheet,TouchableOpacity,Dimensions} from "react-native";
import URlConfig from "../configs/url";
import Color from '../configs/color'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
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
            data: []
        }
    }
    _onFetch(page = 1, callback, options) {

        var dem = 0;
        if (page === 1) this.setState({index: 0})
        {
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
    _renderRowView(rowData) {
        return (
            <View style={{
                height: height / 6, flex: 1,
                borderTopColor: '#227878', borderTopWidth: 1
            }}>
                <Text style={{textAlign: 'right', color: 'white', fontSize: 12}}>Thời gian
                    lập: {rowData.thoigianlapdon}</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={{justifyContent: 'center'}}>
                        <Image
                            source={require('../images/bglogin.jpg')}
                            indicator={ProgressBar.Pie}
                            style={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
                    </View>
                    <View style={{flex: 4, margin: 8, justifyContent: 'center'}}>
                        <Text
                            style={{
                                fontSize: 18,
                                color: Color.itemNameListViewColor
                            }}>khách hàng: {rowData.tenkhachhang}</Text>
                        <Text style={{fontSize: 13, color: 'white'}}>Mã đơn hàng: {rowData.iddonhang}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Icon size={24} color='green' name="attach-money"/>
                            <Text style={{color: 'white'}}>: {rowData.tongtien}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );

    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.titleStyle}>
                    <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>Danh sách đơn hàng</Text>
                    <View style={{backgroundColor: Color.backgroundNewFeed, width: 35, height: 35}}></View>
                </View>

                <TouchableOpacity onPress={() => this.props.backToHome()}
                                  style={{width: 50, height: 50, position: 'absolute'}}/>
                <View style={{flexDirection: 'row', alignItems: 'center',flex:1}}>
                    <Text style={{marginLeft: 8, backgroundColor: 'transparent'}}>Từ ngày:</Text>
                    <DatePicker
                        date={this.state.dateFrom}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"

                        confirmBtnText="Xác nhận"
                        cancelBtnText="Huỷ bỏ"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 80,
                                top: 4,
                            },
                            dateInput: {
                                position: 'absolute',
                                left: 4
                            }
                        }}

                        onDateChange={(date) => {
                            this.setState({dateFrom: date});
                            this.ondateChange(date, this.state.dateTo);
                        }}
                    />
                    <Text style={{backgroundColor: 'transparent'}}>đến:</Text>
                    <DatePicker
                        date={this.state.dateTo}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"

                        confirmBtnText="Xác nhận"
                        cancelBtnText="Huỷ bỏ"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                right: 10

                            },
                            dateInput: {
                                position: 'absolute',
                                right: 44
                            }
                        }}

                        onDateChange={(date) => {
                            this.setState({dateTo: date});
                            this.ondateChange(this.state.dateFrom, date);
                        }}/>
                </View>
                <View style={{backgroundColor: Color.itemListViewColor, flex: 9}}>

                    <GiftedListView
                        ref="listview"
                        rowView={this._renderRowView.bind(this)}
                        onFetch={this._onFetch.bind(this)}
                        firstLoader={true} // display a loader for the first fetching
                        pagination={true} // enable infinite scrolling using touch to load more
                        refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                        withSections={false} // enable sections
                        enableEmptySections={true}
                        customStyles={{
                            paginationView: {
                                backgroundColor: Color.itemListViewColor,
                            },
                        }}

                        refreshableTintColor="blue"
                    />
                </View>
            </View>

        )
    }

    ondateChange(from, to) {
        var dFrom = String(from);
        var dTo = String(to);
        dFrom.replace('/', '-');
        dTo.replace('/', '-')
        var url = URlConfig.getLinkOrderList(dFrom, dTo);
        console.log(url);
        fetch(url)
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    this.setState({data: responseJson.data},function (){
                        this.refs.listview._refresh();
                        }

                    );

                    console.log(responseJson.data)
                } else {
                    Toast.show(responseJson.msg)
                }
            }).catch((e) => {
            console.log('Có lỗi xảy ra, vui lòng kiểm tra kết nối internet');
        })
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
