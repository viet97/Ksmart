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
import MapListScreen from "./MapListScreen";
import Image from 'react-native-image-progress';
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
import TabNavigator from 'react-native-tab-navigator';
import Color from '../configs/color'
import DatePicker from 'react-native-datepicker'
import ChooseTypeItem from "../components/ChooseTypeItem";
import URlConfig from "../configs/url";
import LinearGradient from "react-native-linear-gradient";
import HeaderCustom from "../components/Header";

let {width, height} = Dimensions.get('window')
export default class ChooseTypeTravel extends Component {
    static navigationOptions = {
        header: null
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

    flatListorIndicator() {
        const {navigate} = this.props.navigation
        if (!this.state.data) {
            return (
                <View style={{flex: 9}}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"/>
                </View>)
        }
        return (
            <View style={{flex: 9}}>
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
                                goToDetail={() => navigate('Travel', {
                                    status: item.trangthai,
                                    dateFrom: this.state.dateFrom,
                                        dateTo: this.state.dateTo,
                                        reload: () => {
                                            fetch(URlConfig.getLinkSoKeHoach(this.state.dateFrom, this.state.dateTo))
                                                .then((response) => (response.json()))
                                                .then((responseJson) => {
                                                    if (responseJson.status) {
                                                        responseJson.danhsach[3].tenloai = 'Kế hoạch sắp tới (5 phút)'
                                                        this.setState({data: responseJson.danhsach})

                                                    }
                                                }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
                                        }
                                    }
                                )}
                            />
                        }
                    />

                </View>

            </View>)
    }

    render() {
        const {navigate} = this.props.navigation
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <HeaderCustom
                    title={"Kế hoạch viếng thăm"}
                    leftClick={() => this.props.navigation.goBack()}
                    rightChildren={
                    <TouchableOpacity
                        onPress={() => navigate('CustomerPlant',
                            {
                                setTravelNumber: (date, data) => {
                                    console.log(data)
                                    let currentDate = new Date();
                                    let currentDay;
                                    let moment = require('moment');
                                    currentDate = moment(currentDate, 'DD-MM-YYYY HH:mm:ss').toDate()
                                    console.log(currentDay, date, '12313123123')


                                    for (let item of data) {
                                        let dateInput = moment(date + ' ' + item.giovaodukien, 'DD-MM-YYYY HH:mm:ss').toDate();
                                        if ((dateInput.getTime() - currentDate.getTime()) / 1000 < 86400) {
                                            this.state.data[0].tongso += 1;
                                            this.state.data[1].tongso += 1;
                                        }
                                        if ((dateInput.getTime() - currentDate.getTime()) / 1000 < 300) {
                                            this.state.data[3].tongso += 1
                                        }
                                    }
                                    this.forceUpdate();
                                }
                            }
                        )}
                        style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            width: 60,
                            height: 60
                        }}>
                        <View style={{width: 60, height: 60, justifyContent: 'center', alignSelf: 'center'}}>
                            <Text style={{
                                color: 'white',
                                textAlign: 'center',
                                alignSelf: 'center',

                                fontSize: 16,
                                backgroundColor: 'transparent',

                            }}>Thêm</Text>
                        </View>
                    </TouchableOpacity>
                    }/>
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

                {this.flatListorIndicator()}
            </View>
        )
    }

    ondateChange(dateFrom, dateTo) {
        this.setState({
            dateFrom: dateFrom,
            dateTo: dateTo,
        }, function () {
            this.getDataFromSv()
        });

    }

    getDataFromSv() {
        this.setState({data: null})
        fetch(URlConfig.getLinkSoKeHoach(this.state.dateFrom, this.state.dateTo))
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    responseJson.danhsach[3].tenloai = 'Kế hoạch sắp tới (5 phút)'
                    this.setState({data: responseJson.danhsach})

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