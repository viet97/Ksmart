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
                            onChange={(checked) => this.chooseCustomer(item)}
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
                            this.ondateComeChange(time);
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
                            this.ondateOutChange(time);
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
                        editable={!this.state.checkOfCheckBox}
                        style={{height: 40, flex: 1, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
                        onChangeText={(text) => {
                            if (!this.state.checkOfCheckBox)
                                this.setState({ghichu: text})
                            else   Toast.show('Vui lòng bỏ chọn trước khi chỉnh sửa')
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
                        editable={!this.state.checkOfCheckBox}
                        style={{height: 40, flex: 1, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
                        onChangeText={(text) => {
                            if (!this.state.checkOfCheckBox)
                                this.setState({vieccanlam: text})
                            else   Toast.show('Vui lòng bỏ chọn trước khi chỉnh sửa')
                        }}
                        value={this.state.vieccanlam}
                    />

                </View>
            </View>

        )
    }

    chooseCustomer(item) {
        this.setState({checkOfCheckBox: !this.state.checkOfCheckBox}, function () {
            var timeOut = this.state.timeOut + ':00'
            var timeCome = this.state.timeCome + ':00'
            var data = {
                idkhachhang: item.idcuahang, idnhanvien: this.props.idnhanvien, idkehoach: 0, giovaodukien: timeCome,
                gioradukien: timeOut, ghichu: this.state.ghichu, vieccanlam: this.state.vieccanlam
            }
            console.log(data)
            this.props.choseCustomer(data, this.state.checkOfCheckBox)
        })

    }

    ondateOutChange(time) {
        if (!this.state.checkOfCheckBox)
            this.setState({timeOut: time})
        else   Toast.show('Vui lòng bỏ chọn trước khi chỉnh sửa')

    }

    ondateComeChange(time) {
        if (!this.state.checkOfCheckBox)
            this.setState({timeCome: time})
        else   Toast.show('Vui lòng bỏ chọn trước khi chỉnh sửa')
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