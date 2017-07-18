/**
 * Created by hao on 7/10/17.
 */

import React, {Component} from 'react';
import {
    View, Dimensions
} from "react-native";
import Bar from "react-native-pathjs-charts/src/Bar";
import Radar from "react-native-pathjs-charts/src/Radar";
import StockLine from "react-native-pathjs-charts/src/StockLine";
export default class ChartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            arr: []
        }
    }

    componentWillMount() {
        var url =
            'http://jav.ksmart.vn/AppBieuDoDoanhThu.aspx?token=' +
            '6e22b116f5111220741848ccd290e9e9bd8757498aeff45f479463cec823a1dc&idquanly=47&macongty=LACHONG&thang=06-2017'
        fetch(url)
            .then((response) => (response.json()))
            .then((responseJson) => {

                    var res = responseJson.data;
                    var dt = []

                    for (var item of res) {
                        var arr = []


                        var date = item['thoigian'].split('/')[0];
                        item['name'] = date

                        arr.push(item)
                        dt.push(arr)
                        var date = item['thoigian'].split('/')[0];
                        item['name'] = date

                    }
                    this.setState({
                        data: dt,
                        arr: res
                    })
                }
            )
    }

    render() {
        var {height, width} = Dimensions.get('window');
        let options = {
            width: width - 40,
            height: 300,
            margin: {
                top: 20,
                left: 25,
                bottom: 50,
                right: 20
            },
            color: '#2980B9',
            gutter: 20,
            animate: {
                type: 'oneByTrue',
                duration: 200,
                fillTransition: 3
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 2,
                    fontWeight: true,
                    fill: '#34495E'
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E'
                }
            }
        }
        return (

            <View>

                <Bar data={this.state.data} options={options} accessorKey='TongTien'/>

            </View>
        )


    }

    render1() {
        let options = {
            width: 250,
            height: 250,
            color: '#2980B9',
            margin: {
                top: 10,
                left: 35,
                bottom: 30,
                right: 10
            },
            animate: {
                type: 'delayed',
                duration: 200
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                tickValues: [],
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E'
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                tickValues: [],
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E'
                }
            }
        }

        return (
            <View>
                <StockLine data={this.state.arr} options={options} xKey='x' yKey='y'/>
            </View>
        )
    }
}