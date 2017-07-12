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


let jsonChoose = {
    ttgh: 'Trạng thái giao hàng',
    tkh: 'Tên khách hàng',
    tttt: 'Trạng thái thanh toán',
    mch: 'Mã cửa hàng',
    id: 'ID đơn hàng',
    mtc: 'Mã tham chiếu'
};
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
        this.state = {
            pickerValue: 'ttgh',
            pickTtghValue: 'dg',
            idDhValue: '',
            dateFrom: today,
            dateTo: today,
            language: 'js',
            pickttdh: 'tttt',
            orderStatus: URlConfig.OBJLOGIN.ttdh,
            shipStatus: URlConfig.ttgh
        }
    }

    render() {
        let serviceItems = this.state.services.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s}/>
        });
        var {width, height} = Dimensions.get('window');
        return (
            <DialogContent >

                <ScrollView style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'column'}}>
                        <Text>Từ ngày </Text>
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
                                this.setState({dateFrom: date});
                                this.ondateChange(date, this.state.dateTo);
                            }}
                        />
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <Text>Đến ngày </Text>
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
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    borderRadius: 4,
                                },
                            }}
                            onDateChange={(date) => {
                                this.setState({dateTo: date});
                                this.ondateChange(date, this.state.dateTo);
                            }}
                        />
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <Text>Trạng thái đơn hàng</Text>
                        <Picker
                            selectedValue={this.state.pickttdh}
                            onValueChange={(value) => {
                                this.setState({pickttdh: value});
                            }} itemStyle={{color: 'red'}}>
                            <Picker.Item label={URlConfig.OBJLOGIN.ttdh[1]} value={1}/>
                            <Picker.Item label={URlConfig.OBJLOGIN.ttdh[2]} value={'id'}/>
                            <Picker.Item label={URlConfig.OBJLOGIN.ttdh[3]} value={'tttt'}/>
                            <Picker.Item label={URlConfig.OBJLOGIN.ttdh[4]} value={'mtc'}/>
                            <Picker.Item label={URlConfig.OBJLOGIN.ttdh[5]} value={'mch'}/>
                            <Picker.Item label={URlConfig.OBJLOGIN.ttdh[9]} value={'tkh'}/>
                            <Picker.Item label={URlConfig.OBJLOGIN.ttdh[1]} value={'tt'}/>
                        </Picker>
                    </View>
                </ScrollView>


                <TouchableOpacity style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={{alignSelf: 'center'}}>haha</Text>
                </TouchableOpacity>

            </DialogContent>
        );
    }


    ondateChange(from, to) {
        var dFrom = String(from);
        var dTo = String(to);
        dFrom.replace('/', '-');
        dTo.replace('/', '-')
        var url = URlConfig.getLinkOrderList(dFrom, dTo);
        console.log(url);
        fetch(url)
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    this.setState({data: responseJson.data}, function () {
                            this.refs.listview._refresh();
                        }
                    );

                    console.log(responseJson.data)
                } else {
                    Toast.show(responseJson.msg)
                }
            }).catch((e) => {
            console.log('Có lỗi xảy ra, vui lòng kiểm tra kết nối internet');
        })
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