import React, {Component} from 'react';
import {
    Button,
    StyleSheet,
    View, TabBarIOS, TouchableHighlight, Platform,
    Text, TouchableOpacity,
    Dimensions,
    Image,
    ScrollView
} from 'react-native';
import MapView from 'react-native-maps';
import {Icon} from 'react-native-elements'
import Color from '../configs/color'
import Toast from "react-native-simple-toast";
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import URlConfig from "../configs/url";
import Communications from 'react-native-communications';

let {width, height} = Dimensions.get('window')
export default class DetailCustomer extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        const item = params.item;
        this.state = {
            data: [],
            region: {
                latitude: item.ViDo,
                longitude: item.KinhDo,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        }
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['Hồ sơ', 'Vị trí']}/>;
    }

    componentDidMount() {
        const {params} = this.props.navigation.state
        fetch(URlConfig.getLinkDetailCustomer(params.id))
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    console.log(responseJson.data)
                    this.setState({data: responseJson.data})
                }
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))

    }

    getLoaiKhachHang(loai) {
        let str = ''
        fetch(URlConfig.getLinkSoKhachHang())
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    for (let item in responseJson.danhsach) {
                        if (responseJson.danhsach.ID_LoaiKhachHang === loai)
                            str = str + responseJson.danhsach.TenLoaiKhachHang
                        break
                    }
                }
            })
    }

    getElement(title, content) {
        return (
            <View style={{flexDirection: 'row', marginTop: 8}}>
                <Text style={{width: width / 3 - 4, marginLeft: 4, alignSelf: 'center'}}>{title}</Text>
                <View style={{
                    backgroundColor: 'white',
                    width: width * 2 / 3 - 4,
                    marginRight: 4,
                    height: 30,
                    padding: 4,
                    flexDirection: 'row'
                }}>
                    <Text numberOfLines={2} style={{alignSelf: 'center',}}>{content} </Text>
                </View>
            </View>
        )

    }

    getElementPhoneNumber(title, phoneNumber) {
        return (
            <View style={{flexDirection: 'row', marginTop: 8}}>
                <Text style={{width: width / 3 - 4, marginLeft: 4, alignSelf: 'center'}}>{title}</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        backgroundColor: 'white',
                        width: width * 2 / 3 - 4,
                        marginRight: 4,
                        height: 30,
                        padding: 4,
                        flexDirection: 'row'
                    }}
                    onPress={() => {
                        if (phoneNumber) {
                            Communications.phonecall(phoneNumber, true)
                        }
                    }}
                >
                    <Text style={{alignSelf: 'center',}}>{phoneNumber} </Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const {params} = this.props.navigation.state;

        const item = params.item;
        return (
            <View style={{flex: 1, backgroundColor: 'transparent'}}>
                <Image source={require('../images/bg3.png')}
                       style={{position: 'absolute', top: 0}}/>
                <View style={styles.titleStyle}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                      style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon style={styles.iconStyle}
                              size={24} color="white"
                              name="ios-arrow-back"
                              type="ionicon"
                        />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 20,
                        color: 'white',
                        alignSelf: 'center',
                        backgroundColor: 'transparent'
                    }}>Chi tiết khách hàng</Text>
                    <View/>
                </View>
                <IndicatorViewPager
                    style={{flex: 9, backgroundColor: 'white'}}
                    indicator={this._renderTitleIndicator()}
                >

                    <View style={{flex: 1, backgroundColor: 'transparent'}}>
                        <Image source={require('../images/bg3.png')}
                               style={{position: 'absolute', top: 0}}/>
                        <ScrollView style={{flex: 1, marginBottom: 4}}>
                            {this.getElement('Tên cửa hàng', this.state.data.TenCuaHang)}
                            {this.getElement('Tên nhóm khách hàng', this.state.data.tennhomkhachhang)}
                            {this.getElement('Loại khách hàng', this.getLoaiKhachHang(this.state.data.idloaikhachhang))}
                            {this.getElement('Địa chỉ', this.state.data.DiaChi)}
                            {this.getElementPhoneNumber('Số điện thoại 1', this.state.data.SoDienThoai)}
                            {this.getElementPhoneNumber('Số điện thoại 2', this.state.data.SoDienThoai2)}
                            {this.getElementPhoneNumber('Số điện thoại 3', this.state.data.SoDienThoai3)}
                            {this.getElement('Email', this.state.data.Email)}
                            {this.getElement('Fax', this.state.data.Fax)}
                            {this.getElement('Website', this.state.data.Website)}
                            {this.getElement('Tài khoản ngân hàng', this.state.data.TKNganHang)}
                            {this.getElement('Mã số thuế', this.state.data.MaSoThue)}
                            {this.getElement('Ghi chú', this.state.data.GhiChu)}
                            {this.getElement('Ngày tạo', this.state.data.ngaytao)}
                            {this.getElement('Tỉnh', this.state.data.tentinh)}
                            {this.getElement('Quận', this.state.data.tenquan)}
                            {this.getElement('Phường', this.state.data.tenphuong)}
                            {this.getElement('Đường', this.state.data.DuongPho)}
                        </ScrollView>
                    </View>
                    <MapView
                        style={{flex: 9}}
                        initialRegion={this.state.region}>
                        <MapView.Marker
                            coordinate={{
                                latitude: item.ViDo,
                                longitude: item.KinhDo
                            }
                            }>
                            <Icon style={styles.iconStyle} size={24} color="green" name="home" type="font-awesome"/>
                            <MapView.Callout>
                                <View
                                    style={{
                                        width: 300,
                                    }}>
                                    <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <Icon style={{backgroundColor: 'transparent',}} size={24} color="red"
                                              name="home" type="font-awesome"/>
                                        <Text style={{
                                            backgroundColor: 'transparent',
                                            marginLeft: 8,
                                            fontSize: 18,
                                            fontWeight: "bold"
                                        }}>{item.TenCuaHang}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <Icon style={{backgroundColor: 'transparent',}} size={24} color="black"
                                              name="people-outline" type="ionicons"/>
                                        <Text style={{
                                            backgroundColor: 'transparent',
                                            marginLeft: 8
                                        }}>{item.tennhomkhachhang}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',

                                    }}>

                                        <Icon
                                            name='location-pin'
                                            type='entypo'
                                            color='green'
                                        />
                                        <Text
                                            style={{backgroundColor: 'transparent', marginLeft: 8}}>{item.DiaChi}</Text>
                                    </View>
                                </View>
                            </MapView.Callout>
                        </MapView.Marker>
                    </MapView>

                </IndicatorViewPager>


            </View>
        );

    }
}
var styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
    titleStyle: {
        marginTop: Platform.OS === 'ios' ? 16 : 0,
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },
    iconStyle: {
        alignSelf: 'center',
        width: 24,
        height: 24,
        backgroundColor: "transparent",
        marginLeft: 16
    }

})