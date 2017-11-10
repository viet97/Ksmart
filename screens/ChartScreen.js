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
import {ProgressDialog} from 'react-native-simple-dialogs'
import LinearGradient from "react-native-linear-gradient";
import HeaderCustom from "../components/Header";
import Spinner from "react-native-loading-spinner-overlay";

let {height, width} = Dimensions.get('window');
export default class ChartScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

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
            refreshing: false,
            isEmpty: false,
            data: [],
            datefrom: today,
            dateto: today,
            arr: [],
            month: now.getMonth() + 1,
            year: now.getFullYear(),
            keyChart: 'TongTien',
            type: [],
            keyChartArr: [],
            numberTypePick: 0,
            dataRender: null,
            progressVisible: false
        }
        this.state.keyChartArr.push('Doanh thu')
        this.state.keyChartArr.push('Sản lượng')

        this.state.type.push('Dạng chữ')
        this.state.type.push('Biểu đồ')
    }

    refreshData() {
        this.setState({dataRender: null, isEmpty: false})
        let url = URlConfig.getChartLink(this.state.datefrom, this.state.dateto);
        this.setState({progressVisible: true})
        fetch(url)
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.data !== null)
                    this.setState({
                        tongdoanhthu: responseJson.tongdoanhthu,
                        dataRender: responseJson.data,
                        progressVisible: false
                    })
                else this.setState({tongdoanhthu: '0.00', dataRender: null, isEmpty: true})
            }).catch((e) => {
            this.setState({progressVisible: false});
            Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại')
        })
    }


    sortData(arr) {
        let data = arr
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data.length - 1; j++) {
                let time1 = data[j].thoigian.split("/")
                let time2 = data[j + 1].thoigian.split("/")
                if (time1[0] > time2[0]) {
                    let temp = data[j]
                    data[j] = data[j + 1]
                    data[j + 1] = temp
                }
            }
        }

        return data
    }

    componentWillMount() {
        this.getDataChart();
    }

    getDataChart() {

        var url = URlConfig.getChartLink(this.state.datefrom, this.state.dateto);
        console.log(url)
        this.setState({progressVisible: true, dataRender: null, isEmpty: false})
        fetch(url)
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.data !== null) {
                    this.setState({
                        tongdoanhthu: responseJson.tongdoanhthu,
                        dataRender: this.sortData(responseJson.data)
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
                            isEmpty: false,
                            progressVisible: false
                        })
                    }
                    else this.setState({isEmpty: true, progressVisible: false})
                } else this.setState({tongdoanhthu: '0.00', dataRender: null, isEmpty: true})
                }
            ).catch((e) => {
            this.setState({progressVisible: false});
            Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại' + e)
        })
    }

    renderItem(item) {
        return (
            <View style={{
                marginTop: 4, marginBottom: 4, marginLeft: 8, marginRight: 8,
                borderTopColor: '#227878'
            }}>
                <Image source={require('../images/bg1.png')}
                       style={{
                           width: width - 16,
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
                        }}>{ultils.getMoney(item.TongTien, 2)}</Text>
                    </View>
                </Image>
            </View>
        )
    }

    getChartorFlatListorNull(options) {

        if (!this.state.isEmpty) {
            if (!this.state.dataRender) {
                return (
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size={'large'} color={'green'} animating={true}/>
                    </View>
                )
            } else if (this.state.numberTypePick === 0)
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
            else return (
                    <View style={{marginLeft: 16}}>
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
            title = 'Biểu đồ sản lượng từ ' + this.state.datefrom + ' đến ' + this.state.dateto
        } else {
            title = 'Biểu đồ doanh thu  từ ' + this.state.datefrom + ' đến ' + this.state.dateto
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
            width: width - 60,
            height: 300,
            margin: {
                top: 20,
                left: 25,
                bottom: 20,
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
            <View style={{flex: 1, backgroundColor: 'white'}}>

                <HeaderCustom
                    title={this.getTitle()}
                    leftClick={() => this.props.navigation.goBack()}
                    rightChildren={
                        <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => {
                            this.showDialog();
                        }}/>
                    }/>

                <View style={{flexDirection: 'column', flex: 9}}>
                    <View style={{flexDirection: 'column', flex: 9}}>
                        <View
                            style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
                            <Text style={{backgroundColor: 'transparent'}}>Từ</Text>
                            <DatePicker
                                style={{marginLeft: 8}}
                                date={this.state.datefrom}
                                mode="date"
                                placeholder="select date"
                                format="DD-MM-YYYY"

                                confirmBtnText="Xác nhận"
                                cancelBtnText="Huỷ bỏ"
                                onDateChange={(date) => {
                                    this.setState({datefrom: date}, function () {
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
                                    this.setState({dateto: date}, () => {
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
                                justifyContent: 'center',
                                alignItems: 'center', marginLeft: 8,
                                flex: 1
                            }}>
                                <Text style={{
                                    color: 'black',
                                    textAlign: 'center',
                                }}>Tổng: {ultils.getMoney(this.state.tongdoanhthu)}</Text>
                            </View>
                        </View>
                        {this.getChartorFlatListorNull(options)}
                    </View>
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
            height: 80,
            color: 'black'
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