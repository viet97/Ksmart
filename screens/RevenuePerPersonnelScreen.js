/**
 * Created by hao on 7/10/17.
 */

import React, {Component} from 'react';
import {
    View, Dimensions, Text, Picker, StyleSheet, TouchableOpacity, Image, Platform, FlatList
} from "react-native";
import Icon1 from 'react-native-vector-icons/Ionicons'
import Bar from "react-native-pathjs-charts/src/Bar";
import StockLine from "react-native-pathjs-charts/src/StockLine";
import DatePicker from "react-native-datepicker";
import URlConfig from "../configs/url";
import Toast from 'react-native-simple-toast'
import DoanhThuTheoNVItem from "../components/DoanhThuTheoNVItem";
import ModalDropdownCustom from "../components/ModalDropdownCustom";
import LinearGradient from "react-native-linear-gradient";
import HeaderCustom from "../components/Header";
import ultils from "../configs/ultils";

export default class RevenuePerPersonnelScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
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
        var now = new Date();
        this.state = {
            tongdoanhthu: '0.00',
            date: today,
            dateto: today,
            isEmpty: true,
            data: [],
            arr: [],
            keyChart: 'TongTien',
            numberTypePick: 0,
            dataRender: null,
            refreshing: false,
            type: [],
        };
        this.state.type.push('Dạng chữ');
        this.state.type.push('Biểu đồ')
    }

    componentDidMount() {
        this.getDataChart();
    }

    refreshData() {
        this.setState({dataRender: null});
        fetch(URlConfig.getRevenuePerson(this.state.date, this.state.dateto))
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.data !== null) {
                    this.setState({
                        dataRender: responseJson.data,
                        tongdoanhthu: responseJson.tongdoanhthu
                    }, function () {
                        console.log(this.state.tongdoanhthu, 'tong doanh thuuuuuuuu')
                    })
                }
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }

    getDataChart() {
        console.log(URlConfig.getRevenuePerson(this.state.date, this.state.dateto))
        fetch(URlConfig.getRevenuePerson(this.state.date, this.state.dateto))
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.data !== null) {
                    console.log(responseJson, 'tong doanh thuuuuuuuu')
                    this.setState({
                        dataRender: responseJson.data,
                        tongdoanhthu: responseJson.tongdoanhthu
                    }, function () {

                    })
                    console.log(responseJson.data)
                    let res = responseJson.data;
                    let dt = []

                    for (let item of res) {
                        let arr = []


                        let name = item['tennhanvien'];
                        item['name'] = name
                        arr.push(item)
                        dt.push(arr)
                    }
                    let dem = 0;
                    for (let item in res) {
                        if (res[item].sonhanvien !== 0) {
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
                } else this.setState({tongdoanhthu: '0.00'})
                }
            )
    }

    getTitle() {
        let title
        if (this.state.numberTypePick === 0)
            title = 'Doanh thu sản lượng \n theo nhân viên'
        else title = 'Biểu đồ doanh thu sản lượng \n theo nhân viên'
        return title
    }

    renderItem(item) {
        return (
            <DoanhThuTheoNVItem
                data={item}
            />
        )
    }

    getChartorFlatListorNull(options) {
        console.log(this.state.numberTypePick)
        if (!this.state.isEmpty) {
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
                            }}
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
        }
        return (
            <Text style={{alignSelf: 'center', textAlign: 'center', fontSize: 20, backgroundColor: 'transparent'}}>Không
                có dữ liệu</Text>)

    }

    getTitleChart() {
        var b = this.state.keyChart
        title = 'Biểu đồ doanh thu sản lượng theo nhân viên từ ngày ' + this.state.date + ' đến ngày ' + this.state.dateto
        return (<Text style={{margin: 8, textAlign: 'center', backgroundColor: 'transparent'}}>{title}</Text>)
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
                    fontSize: 10,
                    fontWeight: true,
                    fill: '#34495E',
                    rotate: 270,
                    textAlign: 'justify'
                },
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
                    fill: '#34495E',
                    transform: [{rotate: '90deg'}]
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
                        </TouchableOpacity>
                    }
                />
                <View style={{flexDirection: 'column', flex: 9}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
                        <Text style={{backgroundColor: 'transparent'}}>Từ</Text>
                        <DatePicker
                            style={{marginLeft: 8}}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"

                            confirmBtnText="Xác nhận"
                            cancelBtnText="Huỷ bỏ"
                            onDateChange={(date) => {
                                this.setState({date: date}, function () {
                                    this.getDataChart()
                                })
                            }}
                        />
                        <Text style={{backgroundColor: 'transparent'}}>đến</Text>
                        <DatePicker
                            style={{marginLeft: 8}}
                            date={this.state.dateto}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"

                            confirmBtnText="Xác nhận"
                            cancelBtnText="Huỷ bỏ"
                            onDateChange={(date) => {
                                this.setState({dateto: date}, function () {
                                    this.getDataChart()
                                })
                            }}
                        />
                    </View>
                    <View style={{
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        marginLeft: 8,
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            flex: 1
                        }}>
                            <Text style={{color: 'black', alignSelf: 'center', marginRight: 4}}>Dạng hiển thị</Text>
                            <ModalDropdownCustom
                                width={width / 4}
                                data={this.state.type}
                                defaultValue={this.state.type[0]}
                                onSelect={(idx, value) => {
                                    this.setState({numberTypePick: idx})
                                }}
                            />
                        </View>
                        <View style={{
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            flex: 1
                        }}>
                            <Text
                                style={{color: 'black', alignSelf: 'center', marginLeft: 8, flex: 1}}>
                                Tổng: </Text>
                            <Text style={{
                                color: 'black',
                                alignSelf: 'center',
                                marginRight: 8,
                                flex: 2
                            }}> {ultils.getMoney(this.state.tongdoanhthu)}</Text>
                        </View>
                    </View>
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
        backgroundColor: "transparent",
        padding: 8,
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