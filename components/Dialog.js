/**
 * Created by hao on 7/12/17.
 */
import React, {Component} from 'react'
import DatePicker from 'react-native-datepicker'
import {
    Text, View, StyleSheet, TouchableOpacity, Dimensions, Button, Picker, ScrollView,
    TextInput
} from "react-native";
import URlConfig from "../configs/url";
import Color from '../configs/color'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import {DialogComponent, SlideAnimation} from 'react-native-dialog-component';
import {TextInputLayout} from "rn-textinputlayout";
import orderListData from '../dbcontext/orderListData'
import DataTemp from "./DataTemp";

export default class Dialog extends React.Component {
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

        today = dd + '/' + mm + '/' + yyyy;
        console.log('Ngay truyen sang la: ' + this.props.deFaultData.dateFrom)
        this.state = {
            numberPicktttt: this.props.deFaultData.numberPicktttt,
            numberPickttgh: this.props.deFaultData.numberPickttgh,
            numberPickttdh: this.props.deFaultData.numberPickttdh,
            pickerValue: 'ttgh',
            pickTtghValue: 'dg',
            idDhValue: '',
            dateFrom: this.props.deFaultData.dateFrom,
            dateTo: this.props.deFaultData.dateTo,
            language: 'js',
            picktttt: '',
            pickttgh: '',
            pickttdh: '',
            orderStatus: [],
            shipStatus: [],
            payStatus: []
        }
    }

    componentWillMount() {
        var data = URlConfig.OBJLOGIN.ttdh;
        var arr1 = [], arr2 = [], arr3 = [];
        arr1.push('Tất cả')
        arr2.push('Tất cả')
        arr3.push('Tất cả')
        for (let item in data) {
            let value = data[item];
            arr1.push(value)
        }
        data = URlConfig.OBJLOGIN.ttgh
        for (let item in data) {
            let value = data[item];
            arr2.push(value)
        }
        data = URlConfig.OBJLOGIN.tttt
        for (let item in data) {
            let value = data[item];
            arr3.push(value)
        }
        this.setState({
            orderStatus: arr1,
            shipStatus: arr2,
            payStatus: arr3
        })
    }

    render() {
        let orderStatusItems = this.state.orderStatus.map((s, i) => {
            return <Picker.Item key={i} value={i} label={s}/>
        });
        let shipStatusItems = this.state.shipStatus.map((s, i) => {
            return <Picker.Item key={i} value={i} label={s}/>
        });
        let payStatusItems = this.state.payStatus.map((s, i) => {
            return <Picker.Item key={i} value={i} label={s}/>
        });
        return (
            <DialogContent>
                <Image source={require('../images/bg.png')}
                       style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}}/>
                <ScrollView style={{flexDirection: 'column', height: Dimensions.get('window').height - 100}}
                            keyboardShouldPersistTaps="always">

                    <View style={{flexDirection: 'column'}}>

                        <Text style={{color: 'white'}}>Từ ngày </Text>
                        <DatePicker
                            date={this.state.dateFrom}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            confirmBtnText="Xác nhận"
                            cancelBtnText="Huỷ bỏ"
                            customStyles={{
                                dateIcon: {},
                                dateInput: {
                                    borderColor: 'transparent'
                                }
                            }}
                            onDateChange={(date) => {

                                this.ondateChange(date, this.state.dateTo);
                            }}
                        />
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{color: 'white'}}>Đến ngày </Text>
                        <DatePicker
                            date={this.state.dateTo}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"

                            confirmBtnText="Xác nhận"
                            cancelBtnText="Huỷ bỏ"
                            customStyles={{
                                dateIcon: {},
                                dateInput: {
                                    borderColor: 'transparent'
                                }
                            }}
                            onDateChange={(date) => {
                                this.ondateChange(this.state.dateFrom, date);
                            }}
                        />
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{color: 'white'}}>Trạng thái đơn hàng</Text>
                        <Picker style={{height: 88}}
                                itemStyle={{color: 'red', height: 88}}
                                selectedValue={this.state.numberPickttdh}
                                onValueChange={(value) => {
                                    if (value === 0) {
                                        orderListData.pickttdh = 'Tất cả'
                                    }
                                    else {
                                        orderListData.pickttdh = this.state.orderStatus[value]
                                    }
                                    orderListData.numberPickttdh = value
                                    this.setState({numberPickttdh: value})
                                    console.log(orderListData.numberPickttdh)
                                }}>
                            {orderStatusItems}
                        </Picker>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{color: 'white'}}>Trạng thái giao hàng</Text>
                        <Picker style={{height: 88}}
                                itemStyle={{color: 'red', height: 88}}
                                selectedValue={this.state.numberPickttgh}
                                onValueChange={(value) => {
                                    if (value === 0) {
                                        orderListData.pickttgh = 'Tất cả'
                                    }
                                    else
                                        orderListData.pickttgh = this.state.shipStatus[value]
                                    orderListData.numberPickttgh = value
                                    this.setState({numberPickttgh: value})
                                    console.log(orderListData.numberPickttgh)
                                }}>
                            {shipStatusItems}
                        </Picker>
                    </View>
                    <View style={{flexDirection: 'column', paddingBottom: 16}}>
                        <Text style={{color: 'white'}}>Trạng thái thanh toán</Text>
                        <Picker style={{height: 88}}
                                itemStyle={{color: 'red', height: 88}}
                                selectedValue={this.state.numberPicktttt}
                                onValueChange={(value) => {

                                    console.log(value)
                                    if (value === 0) {
                                        orderListData.picktttt = 'Tất cả'
                                    }
                                    else {
                                        orderListData.picktttt = this.state.payStatus[value]
                                    }
                                    orderListData.numberPicktttt = value
                                    this.setState({numberPicktttt: value})
                                    console.log(orderListData.numberPicktttt)
                                }}>
                            {payStatusItems}
                        </Picker>

                    </View>
                </ScrollView>

                <View style={{
                    position: 'absolute',
                    left: 16,
                    backgroundColor: 'transparent',
                    bottom: 32,
                    borderRadius: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: Dimensions.get('window').width - 32
                }}>

                    <TouchableOpacity style={{alignItems: 'center', backgroundColor: 'transparent', height: 36}}
                                      onPress={() => {
                                          DialogManager.dismiss(() => {
                                              this.props.callback({
                                                  'status': false,
                                                  numberPicktttt: this.props.deFaultData.numberPicktttt,
                                                  numberPickttgh: this.props.deFaultData.numberPickttgh,
                                                  numberPickttdh: this.props.deFaultData.numberPickttdh,
                                                  dateFrom: this.props.deFaultData.dateFrom,
                                                  dateTo: this.props.deFaultData.dateTo
                                              })
                                          });
                                      }}>
                        <Text style={{
                            color: 'white',
                            backgroundColor: 'transparent',
                            padding: 8,
                            fontSize: 16,
                            alignSelf: 'center'
                        }}>Huỷ
                            bỏ</Text>
                    </TouchableOpacity>
                    <View style={{width: 5, height: 5}}/>

                    <TouchableOpacity style={{alignItems: 'center', backgroundColor: 'transparent', height: 36}}
                                      onPress={() => {
                                          DialogManager.dismiss(() => {
                                              var dFrom = String(this.state.dateFrom);
                                              var dTo = String(this.state.dateTo);
                                              dFrom.replace('/', '-');
                                              dTo.replace('/', '-');
                                              this.props.callback({
                                                  'status': true,
                                                  numberPicktttt: this.state.numberPicktttt,
                                                  numberPickttgh: this.state.numberPickttgh,
                                                  numberPickttdh: this.state.numberPickttdh,
                                                  dateFrom: dFrom,
                                                  dateTo: dTo
                                              });
                                          });
                                      }}>

                        <Text style={{
                            color: 'white',
                            backgroundColor: 'transparent',
                            padding: 8,
                            fontSize: 16,
                            alignSelf: 'center'
                        }}>Áp
                            dụng</Text>

                    </TouchableOpacity>
                </View>
            </DialogContent>
        );
    }

    ondateChange(from, to) {
        var dFrom = String(from);
        var dTo = String(to);
        dFrom.replace('/', '-');
        dTo.replace('/', '-');
        this.setState({dateFrom: dFrom})
        this.setState({dateTo: dTo})
    }
}
const styles = StyleSheet.create({
    absolute: {
        top: 0, bottom: 0, left: 0, right: 0, position: 'absolute',
    },
    container: {
        flex: 1,
        paddingTop: 100
    },
    textInput: {
        fontSize: 16,
        height: 40,
        color: 'red'
    },
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 36
    },
    loginTextButton: {
        fontSize: 16,
        fontFamily: 'Al Nile',
        color: 'darkblue'
    }
})