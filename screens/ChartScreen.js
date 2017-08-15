/**
 * Created by hao on 7/10/17.
 */

import React, {Component} from 'react';
import {
    View, Dimensions, Text, Picker, StyleSheet, TouchableOpacity, Image, Platform, FlatList
} from "react-native";
import Icon1 from 'react-native-vector-icons/Ionicons'
import Bar from "react-native-pathjs-charts/src/Bar";
import Radar from "react-native-pathjs-charts/src/Radar";
import StockLine from "react-native-pathjs-charts/src/StockLine";
import DatePicker from "react-native-datepicker";
import URlConfig from "../configs/url";
import Color from "../configs/color";
import Toast from 'react-native-simple-toast'
import ultils from "../configs/ultils";

let {height, width} = Dimensions.get('window');
export default class ChartScreen extends React.Component {
    constructor(props) {
        super(props);
        var now = new Date();
        this.state = {
            refreshing: false,
            isEmpty: true,
            data: [],
            arr: [],
            month: now.getMonth() + 1,
            year: now.getFullYear(),
            montArr: [],
            yearArr: [],
            keyChart: 'TongTien',
            type: [],
            numberTypePick: 0,
            dataRender: null,
        }
        this.state.type.push('Dạng chữ')
        this.state.type.push('Biểu đồ')
    }

    refreshData() {
        this.setState({dataRender: null})
        let month = this.state.month;
        if (this.state.month < 10) {
            month = '0' + month;
        }
        let url = URlConfig.getChartLink(month + '-' + this.state.year);
        fetch(url)
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.data !== null)
                    this.setState({
                        dataRender: responseJson.data
                    })
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại' + e))
    }

    setMonthAndYear() {
        let YEART_START = 2000;
        let YEAR_END = 2100;
        var monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var yearList = [];
        for (var i = YEART_START; i < YEAR_END; i++) {
            yearList.push(i)
        }

        this.setState({
            montArr: monthList,
            yearArr: yearList,
        });
    }

    componentWillMount() {
        this.setMonthAndYear();
        this.getDataChart();
    }

    getDataChart() {
        var month = this.state.month;
        if (this.state.month < 10) {
            month = '0' + month;
        }
        var url = URlConfig.getChartLink(month + '-' + this.state.year);

        fetch(url)
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.data !== null) {
                    this.setState({
                        dataRender: responseJson.data
                    })
                    var res = responseJson.data;
                    var dt = []

                    for (var item of res) {
                        var arr = []


                        var date = item['thoigian'].split('/')[0];
                        item['name'] = date

                        arr.push(item)
                        dt.push(arr)
                        date = item['thoigian'].split('/')[0];
                        item['name'] = date

                    }
                    var dem = 0;
                    for (var item in res) {
                        if (res[item].TongTien !== 0) {
                            dem = dem + 1;
                            break;
                        }
                    }
                    if (dem > 0) {
                        this.setState({
                            data: dt,
                            arr: res,
                            isEmpty: false
                        })
                    }
                    else this.setState({isEmpty: true})
                }
                }
            ).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }

    renderItem(item) {
        return (
            <View style={{
                marginTop: 4, marginBottom: 4, marginLeft: 8, marginRight: 8,
                borderTopColor: '#227878'
            }}><Image source={require('../images/bg1.png')}
                      style={{
                          width: width - 8,
                          height: height / 7
                      }}>
                <View style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 8,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{alignSelf: 'center', backgroundColor: 'transparent'}}>Ngày: </Text>
                        <Text style={{
                            marginLeft: 8,
                            backgroundColor: 'transparent'
                        }}>{item.thoigian}</Text>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Text style={{backgroundColor: 'transparent'}}>Số đơn hàng: </Text>
                    <Text style={{
                        marginLeft: 8,
                        backgroundColor: 'transparent'
                    }}>{item.DonHang}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Text style={{backgroundColor: 'transparent'}}>Tổng tiền:</Text>
                    <Text style={{
                        marginLeft: 8,
                        backgroundColor: 'transparent'
                    }}>{ultils.getMoney(item.TongTien)}</Text>
                </View>
            </Image>
            </View>
        )
    }

    getChartorFlatListorNull(options) {

        if (!this.state.isEmpty) {
            if (this.state.numberTypePick === 0)
                return (
                    <View style={{flex: 9}}>
                        <FlatList
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.refreshData()
                            }}
                            ref="listview"
                            extraData={this.state.dataRender}
                            data={this.state.dataRender}
                            renderItem={({item}) => {
                                return this.renderItem(item)
                            }
                            }
                        />
                    </View>
                )
            else
                return (
                    <View>
                        <Bar data={this.state.data} options={options} accessorKey={this.state.keyChart}/>
                        {this.getTitleChart()}
                    </View>
                )

            return (
                <View>
                    <Bar data={this.state.data} options={options} accessorKey={this.state.keyChart}/>
                    {this.getTitleChart()}
                </View>
            )
        }
        return (
            <Text style={{alignSelf: 'center', textAlign: 'center', fontSize: 20, backgroundColor: 'transparent'}}>Không
                có dữ liệu</Text>)

    }

    getTitleChart() {
        let a = 'TongTien';
        let b = this.state.keyChart;
        let title = '';
        if (b.localeCompare(a)) {
            title = 'Biểu đồ sản lượng tháng ' + this.state.month + ' năm ' + this.state.year
        } else {
            title = 'Biểu đồ doanh thu tháng ' + this.state.month + ' năm ' + this.state.year
        }
        return (<Text style={{margin: 8, textAlign: 'center', backgroundColor: 'transparent'}}>{title}</Text>)
    }

    getTitle() {
        let title
        if (this.state.numberTypePick === 0)
            title = 'Doanh Thu'
        else title = 'Biểu đồ doanh thu'
        return title
    }
    render() {
        let {height, width} = Dimensions.get('window');
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
        let yearItems = this.state.yearArr.map((s, i) => {
            return <Picker.Item key={s} value={s} label={s + ''}/>
        });
        let monthItems = this.state.montArr.map((s, i) => {
            return <Picker.Item key={s} value={s} label={s + ''}/>
        });
        let type = this.state.type.map((s, i) => {
            return <Picker.Item key={i} value={i} label={s + ''}/>
        });
        return (
            <View style={{flex: 1}}>
                <Image source={require('../images/bg.png')}
                       style={{position: 'absolute', top: 0}}/>
                <View style={styles.titleStyle}>
                    <Image source={require('../images/bg.png')}
                           style={{position: 'absolute'}}/>
                    <TouchableOpacity onPress={() => this.props.backToChooseTypeChart()}
                                      style={styles.iconStyle}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>{this.getTitle()}</Text>
                    <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => {
                        this.showDialog();
                    }}>
                        <View></View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.props.backToChooseTypeChart()}
                                  style={{
                                      width: 50,
                                      height: 50,
                                      position: 'absolute',
                                      left: 16,
                                      top: 0,
                                      right: 0,
                                      bottom: 0
                                  }}/>
                <View style={{flexDirection: 'column', flex: 9}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', height: 44}}>
                        <Text style={{
                            alignSelf: 'center',
                            backgroundColor: 'transparent',
                            color: 'white'
                        }}>Tháng</Text>
                        <Picker
                            style={{height: 44, width: 50, alignSelf: 'center'}}
                            itemStyle={{color: 'white', height: 44}}
                            selectedValue={this.state.month}
                            onValueChange={(itemValue) => this.setState({month: itemValue}, function () {
                                this.getDataChart();
                            })}>
                            {monthItems}
                        </Picker>
                        <Text
                            style={{alignSelf: 'center', backgroundColor: 'transparent', color: 'white'}}>Năm</Text>
                        <Picker
                            style={{height: 44, width: 73}}
                            itemStyle={{color: 'white', height: 44}}
                            selectedValue={this.state.year}
                            onValueChange={(itemValue) => this.setState({year: itemValue}, function () {
                                this.getDataChart();
                            })}>
                            {yearItems}
                        </Picker>
                        <Text style={{
                            alignSelf: 'center',
                            backgroundColor: 'transparent',
                            color: 'white'
                        }}>Theo</Text>
                        <Picker
                            style={{height: 44, width: 110}}
                            itemStyle={{color: 'white', height: 44}}
                            selectedValue={this.state.keyChart}
                            onValueChange={(itemValue) => this.setState({keyChart: itemValue})}>
                            <Picker.Item label="Doanh thu" value="TongTien"/>
                            <Picker.Item label="Sản lượng" value="DonHang"/>
                        </Picker>
                    </View>
                    <Picker
                        style={{height: 44, width: 160}}
                        itemStyle={{color: 'white', height: 44}}
                        selectedValue={this.state.numberTypePick}
                        onValueChange={(itemValue) => this.setState({numberTypePick: itemValue})}>
                        {type}
                    </Picker>
                    {this.getChartorFlatListorNull(options)}

                </View>
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

const
    styles = StyleSheet.create({
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
            backgroundColor: 'transparent'
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