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
import Toast from 'react-native-simple-toast'
const timer = require('react-native-timer');
let arr = []
export default class RealtimeChartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            dataRender: [],
        }
    }
    ;

    componentDidMount() {
        timer.setInterval(this, "123", () => {
            fetch(URlConfig.getLinkOnlinePerson())
                .then((response) => response.json())
                .then((responseJson) => {


                    console.log('responjson', responseJson)
                    this.setState({data: responseJson})
                    var time = (new Date()).getTime() + 7 * 3600 * 1000
                    arr.push({x: time, y: responseJson.nhanvienonline})

                })
                .catch((error) => {
                    console.error(error);
                });
        }, 3000);
    }

    loadViewRealTime() {

    }

    render() {


        console.log('' + this.state.data.nhanvienonline)
        var Highcharts = 'Highcharts';
        var onLineconf = {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {
                        console.log('123')
                        var series = this.series[0];
                        setInterval(function () {
                            console.log('Interval')
                            var time = (new Date()).getTime() + 7 * 3600 * 1000,
                                y = this.state.data.sonhanvien

                        }, 3000);
                    }
                }
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: arr

            }]
        };
        var checkinConf = {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: this.loadViewRealTime
                }
            },
            title: {
                text: 'Nhân viên online'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime() + 7 * 3600 * 1000,
                        i;
                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 3000,
                            y: 0
                        });
                    }
                    console.log('vao vao1')
                    return data;
                }())
            }]
        };
        var DoanhThuConf = {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: this.loadViewRealTime
                }
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime() + 7 * 3600 * 1000,
                        i;
                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 3000,
                            y: 0
                        });
                    }
                    console.log('vao vao1')
                    return data;
                }())
            }]
        };
        var orderConf = {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: this.loadViewRealTime
                }
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime() + 7 * 3600 * 1000,
                        i;
                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 3000,
                            y: 0
                        });
                    }
                    console.log('vao vao1')
                    return data;
                }())
            }]
        };
        return (
            <View style={{flex: 1}}>
                <ChartView style={{flex: 1}} config={onLineconf}></ChartView>
                <View style={{flex: 1}}/>
                <View style={{flex: 1}}/>
                <View style={{flex: 1}}/>

            </View>
        );

    }
}