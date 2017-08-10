import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    Button, ListView, StyleSheet, StatusBar,
    TouchableOpacity,
    Dimensions,
    BackHandler,
    FlatList,
    ActivityIndicator,
    TextInput
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Image from 'react-native-image-progress';
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import DatePicker from "react-native-datepicker";
import Color from '../configs/color'
import URlConfig from "../configs/url";
import Search from "react-native-search-box";
import CheckBox from 'react-native-checkbox'
var {width} = Dimensions.get('window').width;

export default class CustomerPlantComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
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

            <View style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'black',
                marginTop: 4, marginBottom: 4, marginLeft: 8, marginRight: 8,
                backgroundColor: Color.backGroundItemFlatList,
                borderTopColor: '#227878'
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
                        <Icon size={24} color="red" name="home"/>
                        <Text style={{
                            marginLeft: 8,
                            fontSize: 18,
                            fontWeight: "bold"
                        }}>{item.TenCuaHang}</Text>
                    </View>
                    <View >
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
                    <Text>Thời gian vào điểm dự kiến: </Text>
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
                            if (this.checkTime(time))
                                this.onDateChange(time, this.state.timeOut);
                            else Toast.show('Thời gian nhỏ hơn hiện tại')
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
                    <Text>Thời gian ra điểm dự kiến: </Text>
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
                            if (this.checkTime(time))
                                this.onDateChange(this.state.timeCome, time);
                            else Toast.show('Thời gian ko hợp lý')
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
                    <Text style={{marginLeft: 8}}>{item.DiaChi}</Text>
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
        currentDate = new Date()
        currentTime = currentDate.getHours() + ":" + currentDate.getMinutes()
        let currentArr = currentTime.split(":")
        let timeArr = time.split(":")
        if (currentArr[0] > timeArr[0]) return false
        if (currentArr[0] === timeArr[0]) {
            if (currentArr[1] > timeArr[1]) return false
        }
        return true
    }

    compareTime(time1, time2) {

        let timeArr1 = time1.split(":")
        let timeArr2 = time2.split(":")
        console.log(timeArr1)
        console.log(timeArr2)
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
                idkhachhang: item.idcuahang, idnhanvien: this.props.idnhanvien, idkehoach: 0, giovaodukien: timeCome,
                gioradukien: timeOut, ghichu: this.state.ghichu, vieccanlam: this.state.vieccanlam
            }
            this.props.choseCustomer(data, this.state.checkOfCheckBox)

    }

    onDateChange(from, to) {
        var item = this.props.item;
        console.log(this.compareTime(from, to))
        if (this.compareTime(from, to) === true || this.state.timeOut === '00:00') {
                this.setState({
                    timeOut: to,
                    timeCome: from
                }, function () {
                    this.chooseCustomer(item)
                })

        } else Toast.show('giờ ra điểm nhỏ hơn giờ vào điểm')
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