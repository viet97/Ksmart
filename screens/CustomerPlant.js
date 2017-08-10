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
    ActivityIndicator, Platform,
    Picker
} from 'react-native';

import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
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
import CustomerPlantComponent from '../components/CustomerPlantComponent'
import DialogCustom from "../components/DialogCustom";
var NUMBER_ROW_RENDER_PER_PAGE = 15
var ALL_LOADED = false
var SEARCH_STRING = '';
let PAGE = 0;
var {height, width} = Dimensions.get('window');
export default class CustomerPlant extends Component {
    constructor(props) {
        super(props)
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
        this.refsFlatList = [];

        today = dd + '-' + mm + '-' + yyyy;
        this.state = {
            datePlant: today,
            idNhanvien: '',
            dataChoose: [],
            checkOfCheckBox: false,
            timeCome: '20:00',
            timeOut: '20:00',
            isSearching: false,
            refreshing: false,
            dataSearch: [],
            dataFull: [],
            dataRender: null,
            onEndReach: true,
            numberPickNhanVien: 0,
            NhanVienStatus: [],
            dataNhanVien: [],
            namePerson: '- Chọn nhân viên-'
        }

    }

    renderFooter = () => {

        if (ALL_LOADED || this.state.isSearching) return null
        return (
            <View
                style={{
                    justifyContent: 'center',
                    borderColor: "green"
                }}
            >
                <ActivityIndicator animating={true} size="large"/>
            </View>
        );
    };

    refreshData() {
        PAGE = 0;
        this.setState({dataRender: null})
        ALL_LOADED = false
        fetch(URlConfig.getCustomerLink(PAGE))
            .then((response) => (response.json()))
            .then((responseJson) => {


                if (responseJson.status) {
                    if (responseJson.endlist) ALL_LOADED = true
                    this.setState({
                        dataRender: responseJson.data,
                        dataSearch: responseJson.data
                    })

                } else ALL_LOADED = true
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }


    loadMoreData() {
        PAGE = PAGE + NUMBER_ROW_RENDER_PER_PAGE
        if (!this.state.onEndReach) {

            this.setState({onEndReach: true})
            fetch(URlConfig.getCustomerLink(PAGE))
                .then((response) => (response.json()))
                .then((responseJson) => {

                    if (responseJson.status) {
                        if (responseJson.endlist) ALL_LOADED = true
                        var arr = this.state.dataRender.concat(responseJson.data)
                        this.setState({
                            dataRender: arr,
                            dataSearch: arr
                        })

                    }
                }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))

        }
    }

    flatListorIndicator() {

        if (!this.state.dataRender) {
            return (
                <View style={{backgroundColor: Color.backGroundFlatList, flex: 9}}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"/>
                </View>)
        } else
            return (
                <View style={{backgroundColor: Color.backGroundFlatList, flex: 9}}>
                    <FlatList
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.refreshData()
                        }}
                        keyExtractor={(item, index) => {
                            item.key = index
                        }}
                        ListFooterComponent={this.renderFooter}
                        onEndReachedThreshold={0.2}
                        onEndReached={() => {
                            this.loadMoreData()
                        }}
                        onMomentumScrollBegin={() => {
                            this.setState({onEndReach: false})
                        }}
                        extraData={this.state.dataRender}
                        data={this.state.dataRender}
                        renderItem={({item}) =>
                            <CustomerPlantComponent
                                idcuahang={item.idcuahang}
                                idnhanvien={this.state.idNhanvien}
                                item={item}
                                choseCustomer={(data, checked) => {
                                    var arr = this.state.dataChoose;
                                    if (checked) {
                                        var i;
                                        for (i = arr.length - 1; i >= 0; i--) {
                                            if (arr[i].idkhachhang === data.idkhachhang) {
                                                arr[i] = data
                                                break;
                                            }
                                        }
                                        if (i < 0) arr.push(data)

                                        this.setState({dataChoose: arr})
                                    } else {
                                        if (arr.length !== 0) {
                                            for (var i = arr.length - 1; i >= 0; i--) {
                                                if (arr[i].idkhachhang === data.idkhachhang) {
                                                    arr.splice(i, 1);
                                                    break;
                                                }
                                            }
                                            this.setState({dataChoose: arr})
                                        }
                                    }
                                }}/>
                        }
                    />
                </View>)

    }

    onChangeText(text) {
        this.setState({isSearching: true})

        return new Promise((resolve, reject) => {
            resolve();

            var arr = []
            var a = text.toLowerCase()
            SEARCH_STRING = a

            if (a.length === 0) this.setState({dataRender: this.state.dataSearch})
            else
                for (var item in this.state.dataSearch) {
                    if (a !== SEARCH_STRING) return

                    if (this.state.dataSearch[item].TenCuaHang.toLowerCase().search(a) !== -1) {
                        arr.push(this.state.dataSearch[item])
                    }
                }

            if (a.length !== 0) this.setState({dataRender: arr})
            else this.setState({isSearching: false})
        });
    }


    render() {

        return (
            <View style={{flex: 1, backgroundColor: Color.backGroundFlatList}}>
                <View style={styles.titleStyle}>
                    <TouchableOpacity style={styles.iconStyle} onPress={() => this.props.backToTravel()}>
                        <Icon2 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>Lập kế hoạch</Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.sendPlantToServer()
                        }}
                        style={styles.iconStyle}>
                        <Text style={{color: 'white', paddingRight: 8, paddingTop: 4}}>OK</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.props.backToTravel()}
                                  style={{
                                      width: 50,
                                      height: 50,
                                      position: 'absolute',
                                      left: 16,
                                      top: 0,
                                      right: 0,
                                      bottom: 0
                                  }}/>


                <View style={{
                    marginLeft: 8,
                    marginTop: 8,
                    marginBottom: 4,
                    marginRight: 4,
                    backgroundColor: Color.backgroundNewFeed
                }}>
                </View>
                <View style={{
                    marginLeft: 8,
                    marginTop: 8,
                    marginBottom: 4,
                    marginRight: 4
                }}>
                    <Search
                        placeholder="Tìm kiếm"
                        cancelTitle="Huỷ bỏ"
                        ref="search_box"
                        onChangeText={(text) => this.onChangeText(text)}
                        onCancel={() => this.onCancel()}
                    />
                </View>
                <View
                    style={{width: width, flexDirection: 'row', justifyContent: 'center', marginLeft: 16, height: 45}}>
                    <Text style={{textAlign: 'center', alignSelf: 'center', backgroundColor: 'transparent'}}>Chọn
                        ngày</Text>
                    <DatePicker
                        style={{marginLeft: 8}}
                        date={this.state.datePlant}
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
                            this.setState({datePlant: date})
                        }}
                    />
                </View>
                <View
                    style={{width: width, flexDirection: 'row', justifyContent: 'center', marginLeft: 16, height: 45}}>
                    <Text style={{
                        textAlign: 'center',
                        alignSelf: 'center',
                        backgroundColor: 'transparent',
                        marginRight: 8
                    }}>Nhân
                        viên:</Text>
                    <TouchableOpacity onPress={this.showDialogChoosePerson} style={{
                        textAlign: 'center',
                        alignSelf: 'center',
                        backgroundColor: 'transparent',
                        borderWidth: 0.5,
                        borderRadius: 5,
                        padding: 4
                    }}>
                        <Text>{this.state.namePerson}</Text>
                    </TouchableOpacity>
                </View>
                {this.flatListorIndicator()}

            </View>
        )
    }

    showDialogChoosePerson() {
        DialogManager.show({
            animationDuration: 200,
            ScaleAnimation: new ScaleAnimation(),
            children: (
                <DialogCustom callback={(nhanvien) => {
                    console.log(nhanvien)
                }}/>
            ),
        }, () => {
            console.log('callback - show');
        });
    }

    onCancel() {
        return new Promise((resolve, reject) => {
            resolve();

            SEARCH_STRING = ''
            this.setState({dataRender: this.state.dataSearch, isSearching: false})
        });
    }

    sendPlantToServer() {
        var obj = {
            ngaylapkehoach: this.state.datePlant,
            dulieulapkehoach: this.state.dataChoose,
            idnhanvien: this.state.idNhanvien
        }
        if (obj.dulieulapkehoach.length === 0) Toast.show('Vui lòng chọn kế hoạch cho nhân viên trước khi lập kế hoạch')
        else
        fetch(URlConfig.getLinkLapKeHoach(obj))
            .then((response) => (response.json()))
            .then((responseJson) => {
                console.log(responseJson)
                if (responseJson.status) {
                    if (responseJson.listkehoachmoi.length !== 0)
                        Toast.show('Lập kế hoạch thành công')
                    else
                        Toast.show('Kế hoạch đã bị trùng , vui lòng thử lại')
                    this.props.backToTravel()
                }
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))

    }

    componentDidMount() {
        ALL_LOADED = false
        fetch(URlConfig.getCustomerLink(PAGE))
            .then((response) => (response.json()))
            .then((responseJson) => {
                console.log(responseJson.data.length)
                if (responseJson.endlist) ALL_LOADED = true
                if (responseJson.status) {
                    this.setState({
                        dataRender: responseJson.data,
                        dataSearch: responseJson.data
                    })


                }
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
        fetch(URlConfig.getListNhanVienLink())
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    var arr = []
                    this.setState({
                        dataNhanVien: responseJson.dsNhanVien
                    }, function () {
                        for (var item in responseJson.dsNhanVien)
                            arr.push(responseJson.dsNhanVien[item].tennhanvien)
                        this.setState({NhanVienStatus: arr, idNhanvien: this.state.dataNhanVien[0].idnhanvien})
                    })

                }
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }
}
const styles = StyleSheet.create({
    titleStyle: {
        marginTop: Platform.OS === 'ios' ? 16 : 0,
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
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
        marginLeft: 16,
        marginTop: (Platform.OS === 'ios') ? 8 : 0
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