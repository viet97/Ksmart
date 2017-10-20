import React, {Component} from 'react';
import {
    Text,
    View, StyleSheet,
    Dimensions,
    TextInput
} from 'react-native';
import Image from 'react-native-image-progress';
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import DatePicker from "react-native-datepicker";
import Color from '../configs/color'
import CheckBox from 'react-native-checkbox'

import Toast from 'react-native-simple-toast';

let {height, width} = Dimensions.get('window');
const moment = require('moment')
export default class CustomerPlantComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            ghichu: '',
            vieccanlam: '',
            checkOfCheckBox: false,
            timeCome: '00:00',
            timeOut: '00:00',
        }
    }

    render() {
        var item = this.props.item;
        return (

            <View
                onLayout={(e) => {
                    var {x, y, width, height} = e.nativeEvent.layout;
                    this.setState({height: height})
                }}
                style={{
                    borderRadius: 10,
                    marginTop: 4, marginBottom: 4, marginLeft: 8, marginRight: 8, backgroundColor: 'transparent'
                }}>
                <Image source={require('../images/bg1.png')}
                       style={{
                           height: this.state.height,
                           flexWrap: 'wrap',
                           position: 'absolute',
                           width: width - 16
                       }}/>

                <View style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 8,
                    marginRight: 12,
                    marginBottom: 4,

                }}>
                    <View style={{flexDirection: 'row'}}>
                        <Icon size={24} color="red" name="home"/>
                        <Text style={{
                            marginLeft: 8,
                            fontSize: 18,
                            fontWeight: "bold"
                        }}>{item.TenCuaHang}</Text>
                    </View>
                    <View>
                        <CheckBox
                            checkedImage={require("../images/checked.png")}
                            uncheckedImage={require("../images/noncheck.png")}
                            underlayColor="transparent"
                            label=''
                            checked={this.state.checkOfCheckBox}
                            onChange={(checked) => {
                                this.setState({checkOfCheckBox: !this.state.checkOfCheckBox}, function () {
                                    this.chooseCustomer(item)
                                })
                            }}
                        />
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Icon1 size={24} color="black" name="people-outline"/>
                    <Text style={{marginLeft: 8}}>{item.tennhomkhachhang}</Text>
                </View>
                <View style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <View style={{width: width / 2 - 12, justifyContent: 'center'}}>
                        <Text style={{width: width / 2 - 12}}>Thời gian vào điểm dự kiến: </Text>
                    </View>
                    <DatePicker
                        date={this.state.timeCome}
                        mode="time"
                        placeholder="select date"
                        format="HH:mm"
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
                        onDateChange={(time) => {
                            let currentDate = new Date();
                            let moment = require('moment');
                            currentDate = moment(currentDate, 'DD-MM-YYYY HH:mm:ss').toDate()
                            let currentDay = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear()
                            if (this.props.date === currentDay) {
                                if (time > moment().format("HH:mm"))
                                    this.onDateComeChange(time);
                                else
                                    this.props.showToast('Thời gian nhỏ hơn hiện tại', Toast.LONG)
                            } else {
                                this.onDateComeChange(time);
                            }
                        }}
                    />
                </View>
                <View style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <View style={{width: width / 2 - 12, justifyContent: 'center'}}>
                        <Text style={{width: width / 2 - 12}}>Thời gian ra điểm dự kiến: </Text>
                    </View>
                    <DatePicker
                        date={this.state.timeOut}
                        mode="time"
                        placeholder="select date"
                        format="HH:mm"
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
                        onDateChange={(time) => {
                            if (time > this.state.timeCome)
                                this.onDateToChange(time)
                            else
                                this.props.showToast('Thời ra điểm phải sau thời gian vào điểm')
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Icon size={24} color="white" name="location-pin"/>
                    <Text style={{marginLeft: 8, width: width - 50}}>{item.DiaChi}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Text style={{marginLeft: 8, alignSelf: 'center'}}>Ghi chú: </Text>
                    <TextInput
                        style={{
                            height: 40,
                            flex: 1,
                            borderColor: 'gray',
                            borderWidth: 1,
                            backgroundColor: 'white',
                            paddingLeft: 8,
                            marginLeft: 32
                        }}
                        onChangeText={(text) => {
                            this.setState({ghichu: text}, function () {
                                this.chooseCustomer(item)
                            })

                        }}

                        value={this.state.ghichu}
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Text style={{marginLeft: 8, alignSelf: 'center'}}>Việc cần làm: </Text>

                    <TextInput
                        style={{
                            height: 40,
                            flex: 1,
                            borderColor: 'gray',
                            borderWidth: 1,
                            backgroundColor: 'white',
                            paddingLeft: 8
                        }}
                        onChangeText={(text) => {
                            this.setState({vieccanlam: text}, function () {
                                this.chooseCustomer(item)
                            })
                        }}
                        value={this.state.vieccanlam}
                    />

                </View>
            </View>

        )
    }

    checkTime(time) {
        let currentDate = new Date();
        console.log(this.props.date + ' ' + time + ':00')
        var moment = require('moment');
        var dateInput = moment(this.props.date + ' ' + time + ':00', 'DD-MM-YYYY HH:mm:ss').toDate();
        if (dateInput.getTime() - currentDate.getTime() > 0) {
            console.log('return', true);
            return true;
        }
        else {
            console.log('return', false);
            return false
        }
    }

    compareTime(time1, time2) {

        let timeArr1 = time1.split(":")
        let timeArr2 = time2.split(":")

        if (timeArr1[0] > timeArr2[0]) return false
        if (timeArr1[0] === timeArr2[0]) {
            if (timeArr1[1] > timeArr2[1]) return false
        }
        return true
    }

    chooseCustomer(item) {

        var timeOut = this.state.timeOut + ':00'
        var timeCome = this.state.timeCome + ':00'
        var data = {
            idkhachhang: item.idcuahang,
            idnhanvien: this.props.idnhanvien,
            idkehoach: 0,
            giovaodukien: timeCome,
            gioradukien: timeOut,
            ghichu: this.state.ghichu,
            vieccanlam: this.state.vieccanlam,
            tenkhachhang: item.TenCuaHang
        }

        this.props.choseCustomer(data, this.state.checkOfCheckBox)

    }

    onDateComeChange(from) {
        let item = this.props.item;
        this.setState({timeCome: from}, function () {
            this.chooseCustomer(item)
        })
    }

    onDateToChange(to) {
        let item = this.props.item;
        this.setState({timeOut: to}, function () {
            this.chooseCustomer(item)
        })
    }
}
const styles = StyleSheet.create({
    titleStyle: {
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: Color.backgroundNewFeed,
    },
    headerStyle: {
        elevation: 15, height: this.height / 7
    },
    itemSideMenuStyle: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 8,
        paddingBottom: 8
    }, iconStyle: {
        alignSelf: 'center',
        width: 35,
        height: 35,
        backgroundColor: "transparent",
        marginLeft: 16
    },
    textStyle: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent'
    },
    titleIconsMenu: {
        textAlign: 'center',
        color: 'white'
    },
    indicator: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    }
})