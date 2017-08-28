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
import Modal from 'react-native-modalbox';
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import Toast from 'react-native-simple-toast';
import Image from 'react-native-image-progress';
import Icon1 from 'react-native-vector-icons/Entypo'
import PTRView from 'react-native-pull-to-refresh'
import Icon2 from 'react-native-vector-icons/Ionicons'
import DatePicker from "react-native-datepicker";
import Color from '../configs/color'
import URlConfig from "../configs/url";
import Search from "react-native-search-box";
import CheckBox from 'react-native-checkbox'
import CustomerPlantComponent from '../components/CustomerPlantComponent'
import DialogCustom from "../components/DialogCustom";
import {Icon} from "react-native-elements";

var NUMBER_ROW_RENDER_PER_PAGE = 15
var ALL_LOADED = false
var SEARCH_STRING = '';
let PAGE = 0;
let IDNhanVien = '';
var {height, width} = Dimensions.get('window');
export default class CustomerPlant extends Component {
    constructor(props) {
        super(props)
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        console.disableYellowBox = true;
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
            namePerson: '- Chọn nhân viên -'

        }

    }

    renderFooter = () => {

        if (ALL_LOADED) return null
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
        fetch(URlConfig.getCustomerLink(PAGE, SEARCH_STRING))
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    if (responseJson.endlist) ALL_LOADED = true
                    this.setState({
                        dataRender: responseJson.data,
                        dataSearch: responseJson.data
                    }, function () {

                    })

                } else ALL_LOADED = true
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }


    loadMoreData() {
        PAGE = PAGE + NUMBER_ROW_RENDER_PER_PAGE
        if (!this.state.onEndReach) {

            this.setState({onEndReach: true})
            fetch(URlConfig.getCustomerLink(PAGE, SEARCH_STRING))
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
        } else if (this.state.dataFull.length === 0)
            return (
                <View style={{flex: 9}}>
                    <Text style={{
                        alignSelf: 'center',
                        textAlign: 'center',
                        fontSize: 20,
                        backgroundColor: 'transparent'
                    }}>Không có dữ liệu</Text>

                </View>
            )

        return (
            <View style={{backgroundColor: Color.backGroundFlatList, flex: 9}}>
                <FlatList

                    keyboardDismissMode="on-drag"
                    keyExtractor={(item, index) => {
                        item.key = index
                    }}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.refreshData()}
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
                            date={this.state.datePlant}
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
                                console.log(arr)
                            }}/>
                    }
                />
            </View>)

    }

    getDataFromSv() {
        ALL_LOADED = false
        this.setState({dataRender: null})
        PAGE = 0
        fetch(URlConfig.getCustomerLink(PAGE, SEARCH_STRING))
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.endlist || responseJson.data.length === 0) {
                    ALL_LOADED = true
                    this.forceUpdate()

                }
                if (responseJson.status) {
                    this.setState({
                        dataRender: responseJson.data,
                        dataFull: responseJson.data
                    })
                } else {
                    ALL_LOADED = true
                    this.forceUpdate()
                }
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))

    }

    onChangeText(text) {

        return new Promise((resolve, reject) => {
            resolve();
            var keyWord = text.toLowerCase()
            SEARCH_STRING = keyWord
            this.getDataFromSv()
        });
    }


    render() {

        return (
            <View style={{flex: 1, backgroundColor: Color.backGroundFlatList}}>
                <View style={styles.titleStyle}>
                    <TouchableOpacity onPress={() => this.props.backToTravel()}
                                      style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon2 style={styles.iconStyle} size={24} color="white"
                               name="ios-arrow-back"/></TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>Lập kế hoạch</Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.sendPlantToServer()
                        }}
                        style={styles.iconStyle}>
                        <Text style={{color: 'white', paddingRight: 8, paddingTop: 4}}>OK</Text>
                    </TouchableOpacity>
                </View>
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
                    <TouchableOpacity onPress={() => this.showDialogChoosePerson()} style={{
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
                <Modal
                    style={[styles.modal]}
                    ref={"modal"}
                    swipeToClose={true}
                    onClosingState={this.onClosingState}>
                    <View style={{alignItems: 'flex-end', position: 'absolute', right: 8, top: 0}}>
                        <TouchableOpacity onPress={() => {
                            this.refs.modal.close()
                        }}>
                            <Icon style={{paddingVertical: 8}} name="x" size={24} color="#EC433E" type="foundation"/>

                        </TouchableOpacity>
                    </View>
                    <DialogCustom closeModal={() => {
                        this.refs.modal.close()
                    }} callback={(id, tennhanvien) => {
                        this.setState({idNhanvien: id, namePerson: tennhanvien})
                        if (this.state.dataChoose.length !== 0) {
                            for (let i = 0; i < this.state.dataChoose.length; i++) {
                                this.state.dataChoose[i].idnhanvien = id
                            }
                        }
                    }}/>
                </Modal>

            </View>
        )
    }

    showDialogChoosePerson() {
        // DialogManager.show({
        //     animationDuration: 200,
        //     ScaleAnimation: new ScaleAnimation(),
        //     children: (
        //         <DialogCustom
        //             callback={(nhanvien) => {
        //                 this.setState({idNhanvien: nhanvien.idnhanvien, namePerson: nhanvien.tennhanvien})
        //         }}/>
        //     ),
        // }, () => {
        //     console.log('callback - show');
        // });
        this.refs.modal.open()
    }

    onCancel() {
        return new Promise((resolve, reject) => {
            resolve();
            if (SEARCH_STRING.length !== 0) {
                SEARCH_STRING = ''
                this.getDataFromSv()
            }
        });
    }

    sendPlantToServer() {
        var obj = {
            ngaylapkehoach: this.state.datePlant,
            dulieulapkehoach: this.state.dataChoose,
            idnhanvien: this.state.idNhanvien
        }
        console.log(obj);
        if (obj.dulieulapkehoach.length === 0 || this.state.idNhanvien.length === 0) Toast.show('Vui lòng chọn kế hoạch cho nhân viên trước khi lập kế hoạch')
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
        SEARCH_STRING = ''
        this.getDataFromSv()

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
    },
    modal: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 8,
        marginTop: 32,

    },
})