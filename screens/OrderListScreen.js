import React, {Component} from 'react'
import DatePicker from 'react-native-datepicker'
import {Text, View} from "react-native";
import URlConfig from "../configs/url";

export default class OrderListScreen extends Component {
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
            dateFrom: today,
            dateTo: today,
            data: []
        }
    }

    render() {
        return (
            <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{marginLeft: 8}}>Từ ngày:</Text>
                    <DatePicker
                        date={this.state.dateFrom}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"

                        confirmBtnText="Xác nhận"
                        cancelBtnText="Huỷ bỏ"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 80,
                                top: 4,
                            },
                            dateInput: {
                                position: 'absolute',
                                left: 4
                            }
                        }}

                        onDateChange={(date) => {
                            this.setState({dateFrom: date});
                            this.ondateChange(date, this.state.dateTo);
                        }}
                    />
                    <Text>đến:</Text>
                    <DatePicker
                        date={this.state.dateTo}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"

                        confirmBtnText="Xác nhận"
                        cancelBtnText="Huỷ bỏ"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                right: 10

                            },
                            dateInput: {
                                position: 'absolute',
                                right: 44
                            }
                        }}

                        onDateChange={(date) => {
                            this.setState({dateTo: date});
                            this.ondateChange(this.state.dateFrom, date);
                        }}/>
                </View>
            </View>

        )
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
                    this.setState({data: responseJson.data});
                    console.log(responseJson.data)
                } else {
                    Toast.show(responseJson.msg)
                }
            }).catch((e) => {
            console.log('Có lỗi xảy ra, vui lòng kiểm tra kết nối internet');
        })
    }
}