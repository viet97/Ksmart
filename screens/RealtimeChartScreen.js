import React, {Component} from 'react';
import ChartView from 'react-native-highcharts';
import {
    View, Dimensions, Text, Picker, StyleSheet, TouchableOpacity, Image, Platform
} from "react-native";
import Icon1 from 'react-native-vector-icons/Ionicons'
import Bar from "react-native-pathjs-charts/src/Bar";
import Radar from "react-native-pathjs-charts/src/Radar";
import StockLine from "react-native-pathjs-charts/src/StockLine";
import DatePicker from "react-native-datepicker";
import URlConfig from "../configs/url";
import Color from "../configs/color";
import Toast from 'react-native-simple-toast';

const timer = require('react-native-timer')

export default class RealtimeChartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                status: true,
                nhanvienonline: 0,
                tongdoanhthu: 0,
                tongdonhang: 0,
                tongluotcheckin: 0,
                msg: "Xử lý thành công."
            },
            listData: [1, 2, 4],
            timeUpdate: 10

        }

    }

    componentWillMount() {
        this.getDatafromServer();
    }

    componentDidUpdate() {
        timer.clearInterval(this);
        if (this.state.timeUpdate !== 0)
            timer.setInterval(this, '123', () => this.getDatafromServer(), this.state.timeUpdate * 1000)
    }

    getDatafromServer() {
        fetch(URlConfig.getLinkOnlinePerson())
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('responjson', responseJson)
                this.setState({data: responseJson})
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getDataForChar() {

    }

    getConfigSmall() {
        var currentdate = new Date();
        var datetime = "Last Sync: " + currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        let conf = {
            chart: {
                type: 'bar',

            },
            title: {
                text: ' '
            },
            xAxis: {
                categories: ['Nhân viên online', 'Tổng đơn hàng', 'Số lượt checkin']
            },
            yAxis: {
                title: {
                    text: 'Cập nhật mỗi ' + this.state.timeUpdate + ' giây'
                }
            },
            series: [{
                name: datetime,
                data: [1, 0, 4]
            },]
        }
        console.log(conf);
        return conf;
    }

    getConfigTongDoanhThu() {
        var currentdate = new Date();
        var datetime = "Last Sync: " + currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        let conf = {
            chart: {
                type: 'bar',

            },
            title: {
                text: ' '
            },
            xAxis: {
                categories: ['Tổng doanh thu']
            },
            yAxis: {
                title: {
                    text: 'Cập nhật mỗi ' + this.state.timeUpdate + ' giây'
                }
            },
            series: [{
                name: datetime,
                data: [this.state.data.tongdoanhthu, 0, 0]
            },]
        }
        console.log(conf);
        return conf;
    }

    render() {

        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <ChartView config={this.getConfigSmall()} style={{padding: 16, flex: 1}}/>
                    <Text style={{alignSelf: 'center', textAlign: 'center', width: Dimensions.get('window').width / 2}}>Biểu
                        đồ số lượng nhân viên online, checkin, đơn hàng</Text>
                </View>
                <View style={{flex: 1, marginTop: 40}}>
                    <ChartView style={{padding: 16, flex: 1}} config={this.getConfigTongDoanhThu()}/>
                    <Text style={{alignSelf: 'center', textAlign: 'center'}}>Biểu đồ doanh thu</Text>
                </View>
                <View style={{flex: 1, marginTop: 40, flexDirection: 'row'}}>
                    <Text style={{flex: 1, height: 70, alignSelf: 'center', textAlign: 'center'}}>Cập nhật</Text>
                    <Picker style={{flex: 3, height: 70}}
                            itemStyle={{height: 60}}
                            selectedValue={this.state.timeUpdate}
                            onValueChange={(value) => {
                                this.setState({timeUpdate: value})
                            }}>
                        <Picker.Item key={0} value={0} label={'Không bao giờ'}/>
                        <Picker.Item key={1} value={10} label={'Mỗi 10 giây'}/>
                        <Picker.Item key={2} value={30} label={'Mỗi 30 giây'}/>
                        <Picker.Item key={3} value={60} label={'Mỗi 60 giây'}/>
                        <Picker.Item key={4} value={180} label={'Mỗi 3 phút'}/>
                        <Picker.Item key={5} value={300} label={'Mỗi 5 phút'}/>
                    </Picker>
                </View>

            </View>
        );

    }
}