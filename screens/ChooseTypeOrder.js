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
    ScrollView
} from 'react-native';
import {Tabs, Tab, Icon} from 'react-native-elements'
import Image from 'react-native-image-progress';
import DatePicker from 'react-native-datepicker'
import ChooseTypeItem from "../components/ChooseTypeItem";
import Color from '../configs/color'
import URlConfig from "../configs/url";
import LinearGradient from "react-native-linear-gradient";
import Toast from "react-native-simple-toast";
import ultils from "../configs/ultils";
import HeaderCustom from "../components/Header";

let {width, height} = Dimensions.get('window')
export default class ChooseTypeOrder extends Component {
    static navigationOptions = {
        header: null
    }

    flatListorIndicator() {
        const {navigate} = this.props.navigation
        if (!this.state.data) {
            return (
                <View style={{flex: 9}}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator} color={"green"}
                        size="large"/>
                </View>)
        }
        return (
            <View style={{flex: 9}}>
                <FlatList
                    onRefresh={() => this.getDataFromSv()}
                    refreshing={this.state.refreshing}
                    numColumns={2}
                    keyboardDismissMode="on-drag"
                    ref="listview"
                    extraData={this.state.data}
                    data={this.state.data}
                    renderItem={({item}) =>
                        <ChooseTypeItem
                            data={item}
                            goToDetail={() => navigate('Order', {
                                tentrangthai: item.tentrangthai,
                                status: item.trangthai,
                                dateFrom: this.state.dateFrom,
                                dateTo: this.state.dateTo
                            })}
                        />
                    }
                />

            </View>)
    }

    constructor(props) {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = dd + '-' + mm + '-' + yyyy;
        super(props)
        this.state = {
            refreshing: false,
            data: [],
            dateFrom: today,
            dateTo: today,
        }
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <HeaderCustom
                    title={"Đơn hàng"}
                    leftClick={() => this.props.navigation.goBack()}
                />
                <View style={{width: window.width, height: 80, elevation: 5}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 80}}>
                        <DatePicker
                            style={{marginLeft: 8}}
                            date={this.state.dateFrom}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"

                            confirmBtnText="Xác nhận"
                            cancelBtnText="Huỷ bỏ"
                            onDateChange={(date) => {
                                this.ondateChange(date, this.state.dateTo);
                            }}
                        />
                        <DatePicker
                            style={{marginLeft: 8}}
                            date={this.state.dateTo}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"

                            confirmBtnText="Xác nhận"
                            cancelBtnText="Huỷ bỏ"
                            onDateChange={(date) => {
                                this.ondateChange(this.state.dateFrom, date);
                            }}
                        />
                    </View>
                </View>

                <View style={{flex: 9}}>
                    {this.flatListorIndicator()}
                </View>
            </View>
        )
    }

    ondateChange(from, to) {
        let dFrom = String(from);
        let dTo = String(to);
        dFrom.replace('/', '-');
        dTo.replace('/', '-');
        this.setState({dateFrom: dFrom, dateTo: dTo}, function () {
            this.getDataFromSv()
        })
    }

    sortData(arr) {
        let temp
        let lastIndex = arr.length - 1
        temp = arr[lastIndex - 2]
        arr[lastIndex - 2] = arr[1]
        arr[1] = temp
        temp = arr[lastIndex - 1]
        arr[lastIndex - 1] = arr[2]
        arr[2] = temp
        temp = arr[lastIndex]
        arr[lastIndex] = arr[3]
        arr[3] = temp
    }
    getDataFromSv() {
        this.setState({data: null})
        console.log(URlConfig.getLinkSoDonHang(this.state.dateFrom, this.state.dateTo))
        fetch(URlConfig.getLinkSoDonHang(this.state.dateFrom, this.state.dateTo))
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    let arr = responseJson.lstTrangThai
                    this.sortData(arr)
                    console.log(arr[1], arr[2], arr[3])
                    arr[1].tongso = ultils.getMoney(arr[1].tongso)
                    arr[2].tongso = ultils.getMoney(arr[2].tongso)
                    arr[3].tongso = ultils.getMoney(arr[3].tongso)
                    this.setState({data: arr})
                }
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))

    }

    componentDidMount() {
        this.getDataFromSv()
    }
}
const styles = StyleSheet.create({
    view1: {
        flexDirection: 'row'
    },
    titleStyle: {
        paddingTop: Platform.OS === 'ios' ? 16 : 0,
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