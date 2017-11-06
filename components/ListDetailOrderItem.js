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
    TextInput,
    TouchableWithoutFeedback
} from 'react-native';
import Color from '../configs/color'
import {SegmentedControls} from 'react-native-radio-buttons'
import ultil from "../configs/ultils";
import {shadowProps} from "../configs/shadow";
import {BANBUON, BANKHAC, BANLE} from "../configs/type";

let {height, width} = Dimensions.get('window');

export default class CustomerPlantComponent extends Component {

    constructor(props) {
        super(props)
        let item = this.props.item
        this.state = {
            height: 0,
            indexSellType: this.props.item.hinhthucban,
            giatien: item.giaban
        }
    }

    setSelectedOption(sellType, index) {
        let item = this.props.item
        let loai = ''
        console.log('12312321')
        if (index === BANBUON) loai = 'giabuon'
        if (index === BANLE) loai = 'giale'
        if (index === BANKHAC) loai = 'giakhac'
        console.log(item[loai])
        this.setState({
            indexSellType: index,
            giatien: item[loai]
        });
    }

    getGiaTien() {
        let item = this.props.item
        let str = ''
        let giatien = ultil.getMoney(this.state.giatien * item.soluong, 2)
        str = str + giatien
        return str
    }

    render() {
        let item = this.props.item
        const options = [
            "Bán lẻ",
            "Bán buôn",
            "Khác"
        ];

        return (
            <View
                onLayout={(e) => {
                    var {x, y, width, height} = e.nativeEvent.layout;
                    this.setState({height: height})
                }}
                style={{
                    marginTop:2,
                    backgroundColor: '#f7f7f7',
                    fontSize: 20, ...shadowProps,
                }}
>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Text>Tên mặt hàng:</Text>
                    <Text style={{marginLeft: 8}}>{item.tenhang}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Text>Mã hàng:</Text>
                    <Text style={{marginLeft: 8}}>{item.mahang}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Text>Đơn vị:</Text>
                    <Text style={{marginLeft: 8}}>{item.tendonvi}</Text>
                </View>
                <View style={{
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <SegmentedControls
                        tint={'#007AFF'}
                        selectedTint={'white'}
                        backTint={'#ffffff'}
                        optionStyle={{fontFamily: 'AvenirNext-Medium'}}
                        optionContainerStyle={{flex: 1}}
                        allowFontScaling={false} // default: true
                        options={options}
                        onSelection={(value, index) => this.setSelectedOption(value, index)}
                        selectedIndex={this.state.indexSellType}
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Text>Đơn giá:</Text>
                    <Text style={{marginLeft: 8}}>{ultil.getMoney(this.state.giatien, 2)}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Text>Số lượng </Text>
                    <Text style={{marginLeft: 8}}>{item.soluong}</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Text>Thành tiền:</Text>
                    <Text style={{marginLeft: 8}}>{this.getGiaTien()}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Text>CTKM:</Text>
                    <Text style={{marginLeft: 8}}>{item.tenctkm}</Text>
                </View>
            </View>

        )
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
            idkhachhang: item.idcuahang, idnhanvien: this.props.idnhanvien, idkehoach: 0, giovaodukien: timeCome,
            gioradukien: timeOut, ghichu: this.state.ghichu, vieccanlam: this.state.vieccanlam
        }
        this.props.choseCustomer(data, this.state.checkOfCheckBox)

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