/**
 * Created by hao on 7/10/17.
 */

import React, {Component} from 'react';
import {
    View, Dimensions, Text, Picker, StyleSheet, TouchableOpacity, Image, Platform, FlatList, ActivityIndicator
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
import ModalDropdownCustom from "../components/ModalDropdownCustom";
import PTRView from 'react-native-pull-to-refresh'
import LinearGradient from "react-native-linear-gradient";
import HeaderCustom from "../components/Header";

var {height, width} = Dimensions.get('window');
export default class TravelChartScreen extends React.Component {
    static navigationOptions = {
        header: null
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
        var now = new Date();
        this.state = {
            refreshing: false,
            dateFrom: today,
            dateTo: today,
            isEmpty: false,
            data: [],
            arr: [],
            keyChart: 'TongKhachHangViengTham',
            type: [],
            numberTypePick: 0,
            dataRender: null,
        }
        this.state.type.push('Dạng chữ')
        this.state.type.push('Biểu đồ')
    }

    componentDidMount() {
        this.getDataChart();
    }

    refreshData() {
        this.setState({dataRender: null, isEmpty: false})

        fetch(URlConfig.getTravelChartLink(this.state.dateFrom, this.state.dateTo))
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.data !== null)
                    this.setState({
                        dataRender: responseJson.data
                    })
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }

    getDataChart() {
        this.setState({dataRender: null, isEmpty: false})
        fetch(URlConfig.getTravelChartLink(this.state.dateFrom, this.state.dateTo))
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.data !== null) {
                    this.setState({dataRender: responseJson.data})
                    console.log(responseJson.data)
                    var res = responseJson.data;
                    var dt = []

                    for (var item of res) {
                        var arr = []


                        var name = item['tennhanvien'];
                        item['name'] = name

                        arr.push(item)
                        dt.push(arr)
                    }
                    var dem = 0;
                    for (var item in res) {
                        if (res[item].TongKhachHangViengTham !== 0) {
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
                    console.log('dt', dt)
                } else this.setState({isEmpty: true})
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
                          height: height / 8.5
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
                        <Text style={{alignSelf: 'center', backgroundColor: 'transparent'}}>Tên nhân viên: </Text>
                        <Text style={{
                            marginLeft: 8,
                            backgroundColor: 'transparent'
                        }}>{item.tennhanvien}</Text>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Text style={{backgroundColor: 'transparent'}}>Số khách hàng viếng thăm: </Text>
                    <Text style={{
                        marginLeft: 8,
                        backgroundColor: 'transparent'
                    }}>{item.TongKhachHangViengTham}</Text>
                </View>

            </Image>
            </View>
        )
    }

    getChartorFlatListorNull(options) {

        if (!this.state.isEmpty) {

            if (!this.state.dataRender) {
                return (
                    <View style={{flex: 9}}>
                        <ActivityIndicator
                            animating={true}
                            style={styles.indicator}
                            size="large"/>
                    </View>
                )
            }
            if (this.state.numberTypePick === 0)
                return (
                    <View style={{flex: 9}}>
                        <FlatList
                            keyboardDismissMode="on-drag"
                            ref="listview"
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.refreshData()}
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
        } else return (
            <Text style={{alignSelf: 'center', textAlign: 'center', fontSize: 20, backgroundColor: 'transparent'}}>Không
                có dữ liệu</Text>)

    }

    getTitle() {
        let title
        if (this.state.numberTypePick === 0)
            title = 'Tần suất nhân viên viếng thăm'
        else title = 'Biểu đồ tần suất nhân viên viếng thăm'
        return title
    }

    getTitleChart() {
        var b = this.state.keyChart
        title = 'Biểu đồ tần suất nhân viên viếng thăm từ ngày ' + this.state.dateFrom + ' đến ngày ' + this.state.dateTo
        return (<Text
            style={{margin: 8, textAlign: 'center', backgroundColor: 'transparent', color: 'white'}}>{title}</Text>)
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
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E',
                    rotate: 270
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
        let type = this.state.type.map((s, i) => {
            return <Picker.Item key={i} value={i} label={s + ''}/>
        });
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>

                <HeaderCustom

                    title={this.getTitle()}
                    leftClick={() => this.props.navigation.goBack()}
                    rightChildren={
                        <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => {
                            this.showDialog();
                        }}>
                            <View/>
                        </TouchableOpacity>
                    }
                />
                <View style={{flexDirection: 'column', flex: 9}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
                        <Text style={{backgroundColor: 'transparent'}}>Từ</Text>
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
                        <Text style={{backgroundColor: 'transparent'}}>đến</Text>
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
                    <View style={{backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{color: 'black', alignSelf: 'center', marginRight: 4}}>Dạng hiển thị</Text>
                        <ModalDropdownCustom
                            data={this.state.type}
                            defaultValue={this.state.type[0]}
                            onSelect={(idx, value) => {
                                this.setState({numberTypePick: idx})
                            }}
                        />
                    </View>
                    {this.getChartorFlatListorNull(options)}


                </View>
            </View>
        )


    }

    ondateChange(from, to) {
        this.setState({dataRender: null})
        var dFrom = String(from);
        var dTo = String(to);
        dFrom.replace('/', '-');
        dTo.replace('/', '-');
        this.setState({dateFrom: dFrom})
        this.setState({dateTo: dTo})
        this.getDataChart(from, to)

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
const styles = StyleSheet.create({
    indicator: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    },
    titleStyle: {
        paddingTop: Platform.OS === 'ios' ? 16 : 0,
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