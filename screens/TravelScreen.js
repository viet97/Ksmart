import {
    AppRegistry,
    Text,
    View,
    Button, ListView, StyleSheet, StatusBar,
    TouchableOpacity, ActivityIndicator,
    Dimensions,
    FlatList,
    Platform,
    Picker
} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import React from 'react';
import Color from '../configs/color'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import URlConfig from "../configs/url";
import Toast from 'react-native-simple-toast'
import DatePicker from 'react-native-datepicker'
import ultils from "../configs/ultils";
import TravelItem from "../components/TravelItem";
import ModalDropdownCustom from "../components/ModalDropdownCustom";
import PTRView from 'react-native-pull-to-refresh'
let SEARCH_STRING = '';
let {width, height} = Dimensions.get('window');
let ALL_LOADED = false
let PAGE = 1
const TIME_SAP_DEN_GIO = 10 * 60;//10 phut
export default class TravelScreen extends React.Component {


    getDataFromSv() {
        ALL_LOADED = false
        this.setState({isEndList: false, dataRender: null})
        PAGE = 1
        fetch(URlConfig.getLinkTravel(this.state.dateFrom, this.state.dateTo, PAGE))
            .then((response) => (response.json()))
            .then((responseJson) => {
                    if (responseJson.status) {
                        this.setState({
                            dataFull: responseJson.data,
                            isEndList: responseJson.endlist,
                            dataRender: responseJson.data
                        }, function () {
                            if (this.state.isEndList) {
                                ALL_LOADED = true
                                this.forceUpdate()
                            }
                        })
                    }
                }
            ).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }

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

        today = dd + '-' + mm + '-' + yyyy;
        this.state = ({
            isEndList: false,
            numberPickTravel: 0,
            travelStatus: [],
            refreshing: false,
            dataFull: [],
            dateFrom: today,
            dateTo: today,
            dataRender: null,
            onEndReach: true,
            URL: ''
        })
    }


    componentWillMount() {

        let arr = [];
        arr.push('Tất cả');
        arr.push('Chưa vào điểm');
        arr.push('Đã vào điểm');
        arr.push('Sắp đến giờ');
        this.setState({travelStatus: arr});

        this.getDataFromSv()
    }

    setDataRender() {

        let data = this.state.dataFull.slice(0, NUMBER_ROW_RENDER + 10)
        NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
        let arr = []
        switch (this.state.numberPickTravel) {
            case 0:
                arr = data
                break;
            case 1:

                for (let item of data) {
                    if (item.TrangThai === 0) {
                        arr.push(item)
                    }
                }
                break;
            case 2:
                for (let item of data) {
                    if (item.TrangThai === 1) {
                        arr.push(item)
                    }
                }
                break;
            case 3:
                for (let item of data) {
                    let now = new Date();
                    let timeItem = new Date(item.ThoiGianVaoDiemDuKien);
                    let seconds = (timeItem.getTime() - 7 * 3600 * 1000 - now.getTime()) / 1000;
                    if (seconds >= 0 && seconds <= TIME_SAP_DEN_GIO) {
                        arr.push(item)
                    }

                }
                break;

        }
        this.setState({dataRender: arr})
    }


    getImage(url) {
        if (url.length === 0) {
            return (

                <Image
                    source={require('../images/bglogin.jpg')}
                    indicator={ProgressBar.Pie}
                    style={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
            );
        } else {
            return (
                <Image

                    source={{uri: URlConfig.OBJLOGIN.urlserver + '/' + url}}
                    indicator={ProgressBar.Pie}
                    style={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
            );
        }
    }

    loadMoreDataFromSv() {
        if (!this.state.onEndReach) {
            this.setState({onEndReach: true})

            if (!this.state.isEndList) {
                PAGE = PAGE + 1
                let url = URlConfig.getLinkTravel(this.state.dateFrom, this.state.dateTo, PAGE)
                console.log(url)
                fetch(url)
                    .then((response) => (response.json()))
                    .then((responseJson) => {
                        let arr = this.state.dataFull
                        arr = arr.concat(responseJson.data)
                        this.setState({
                            dataFull: arr,
                            isEndList: responseJson.endlist,
                            dataRender: arr
                        }, function () {
                            if (this.state.isEndList) {
                                ALL_LOADED = true
                                this.forceUpdate()
                            }
                        })
                    })
                    .catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
            }
        }
    }

    refreshData() {
        this.getDataFromSv()
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

    flatListorIndicator() {

        if (!this.state.dataRender) {
            return (
                <View style={{flex: 9}}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"/>
                </View>)
        } else if (this.state.dataFull.length === 0 && this.state.isEndList)
            return (    <View style={{flex: 9}}>
                <Text style={{alignSelf: 'center', textAlign: 'center', fontSize: 20, backgroundColor: 'transparent'}}>Không
                    có dữ liệu</Text>

            </View>)

        return (
            <View style={{flex: 9}}>

                <FlatList
                    ListFooterComponent={this.renderFooter}
                    ref="listview"
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        this.loadMoreDataFromSv()
                    }}
                    onMomentumScrollBegin={() => {
                        this.setState({onEndReach: false})
                    }}
                    extraData={this.state.dataRender}
                    data={this.state.dataRender}
                    renderItem={({item}) =>
                        <TravelItem
                            data={item}
                            callback={() => this.props.callback(item)}
                        />
                    }
                />
            </View>)
    }

    render() {

        return (
            <View style={{flex: 1}}>
                <Image source={require('../images/bg.png')}
                       style={{position: 'absolute', top: 0}}/>
                <View style={styles.titleStyle}>
                    <Image source={require('../images/bg.png')}
                           style={{position: 'absolute'}}/>
                    <TouchableOpacity onPress={() => this.props.backToHome()}
                                      style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon1 style={styles.iconStyle} size={24} color="white"
                               name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text
                        style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Viếng
                        thăm</Text>
                    <TouchableOpacity
                        onPress={() => this.props.goToCustomerPlant()}
                        style={{
                            alignSelf: 'center',
                            width: 35,
                            height: 35
                        }}>
                        <View style={{width: 50, height: 50, justifyContent: 'center', alignSelf: 'center'}}>
                            <Text style={{
                                color: 'white',
                                textAlign: 'center',
                                alignSelf: 'center',
                                paddingBottom: 8,
                                paddingRight: 8,
                                backgroundColor: 'transparent'
                            }}>Thêm</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{width: window.width, height: 45, elevation: 5}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <DatePicker
                            style={{marginLeft: 8}}
                            date={this.state.dateFrom}
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
                                this.ondateChange(date, this.state.dateTo);
                            }}
                        />
                        <Text style={{
                            textAlign: 'center',
                            alignSelf: 'center',
                            backgroundColor: 'transparent',
                            color: 'black'
                        }}>Đến
                            ngày</Text>
                        <DatePicker
                            style={{marginLeft: 8}}
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
                                this.ondateChange(this.state.dateFrom, date);
                            }}
                        />
                    </View>
                </View>
                <View style={{width: width, flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{
                        alignSelf: 'center',
                        textAlign: 'center',
                        backgroundColor: 'transparent',
                        color: 'black', marginRight: 8
                    }}>Trạng thái</Text>
                    <ModalDropdownCustom
                        data={this.state.travelStatus}
                        defaultValue={this.state.travelStatus[0]}
                        onSelect={(idx, value) =>
                            this.setState({numberPickTravel: idx})
                        }
                    />
                </View>
                <View
                    style={{flex: 9}}>
                    <PTRView
                        onRefresh={() => this.refreshData()}
                    >
                        {this.flatListorIndicator()}
                    </PTRView>
                </View>
            </View>
        )
    }


    ondateChange(dateFrom, dateTo) {
        this.setState({
            dateFrom: dateFrom,
            dateTo: dateTo,
            URL: URlConfig.getLinkTravel(dateFrom, dateTo)
        }, function () {
            this.getDataFromSv()
        });

    }


}
const styles = StyleSheet.create({
    titleStyle: {
        marginTop: Platform.OS === 'ios' ? 16 : 0,
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
        width: 24,
        height: 24,
        backgroundColor: "transparent",
        marginLeft: 16,

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