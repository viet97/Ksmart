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

export default class RealtimeChartScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    static arr = [1, 2, 3];

    componentDidMount() {
        fetch(URlConfig.getLinkOnlinePerson())
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('responjson', responseJson)
                RealtimeChartScreen.arr.push(responseJson.nhanvienonline)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    loadViewRealTime() {
        var series = this.series[0];
        setInterval(function () {
            var x = (new Date()).getTime() + 7 * 3600 * 1000,
                y = 2;//TODO sua o day la no doc realtime
            series.addPoint([x, y], true, true);
        }, 3000);
    }

    render() {
        var Highcharts = 'Highcharts';
        var conf = {
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
            <ChartView style={{height: 300}} config={conf}></ChartView>
        );

    }
}