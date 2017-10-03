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
import Search from 'react-native-search-box';
import React from 'react';
import Color from '../configs/color'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import URlConfig from "../configs/url";
import Toast from 'react-native-simple-toast'
import DatePicker from 'react-native-datepicker'
import TravelItem from "../components/TravelItem";
import ModalDropdownCustom from "../components/ModalDropdownCustom";
import {shadowProps} from "../configs/shadow";
import LinearGradient from "react-native-linear-gradient";

let SEARCH_STRING = '';
let {width, height} = Dimensions.get('window');
let ALL_LOADED = false
let PAGE = 1
const TIME_SAP_DEN_GIO = 10 * 60;//10 phut
export default class TravelScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    getDataFromSv() {
        const {params} = this.props.navigation.state;
        console.log(URlConfig.getLinkTravel(params.dateFrom, params.dateTo, PAGE, params.status, 5, SEARCH_STRING))
        ALL_LOADED = false
        this.setState({isEndList: false, dataRender: null})
        PAGE = 1;
        fetch(URlConfig.getLinkTravel(params.dateFrom, params.dateTo, PAGE, params.status, 5, SEARCH_STRING))
            .then((response) => (response.json()))
            .then((responseJson) => {
                console.log(responseJson.data)
                    if (responseJson.status) {
                        this.setState({
                            dataFull: responseJson.data,
                            isEndList: responseJson.endlist,
                            dataRender: responseJson.data
                        }, function () {
                            if (this.state.isEndList) {
                                ALL_LOADED = true;
                                this.forceUpdate()
                            }
                        })
                    }
                }
            ).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }

    constructor(props) {
        super(props);

        this.state = ({

            isEndList: false,
            numberPickTravel: 0,
            travelStatus: [],
            refreshing: false,
            dataFull: [],
            dataRender: null,
            onEndReach: true,
            URL: ''
        })
    }

    onChangeText(text) {
        return new Promise((resolve, reject) => {
            resolve();
            var arr = []
            var keyWord = text.toLowerCase();
            SEARCH_STRING = keyWord
            this.getDataFromSv()
        });
    }

    onCancel() {
        return new Promise((resolve, reject) => {
            resolve();
            console.log("onCancle")
            if (SEARCH_STRING.length !== 0) {
                SEARCH_STRING = ''
                this.getDataFromSv()
            }

        });
    }

    componentWillMount() {
        SEARCH_STRING = ''
        let arr = [];
        arr.push('Tất cả');
        arr.push('Chưa vào điểm');
        arr.push('Đã vào điểm');
        arr.push('Sắp đến giờ');
        this.setState({travelStatus: arr});
        this.getDataFromSv()
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
        const {params} = this.props.navigation.state;
        if (!this.state.onEndReach) {
            this.setState({onEndReach: true})

            if (!this.state.isEndList) {
                PAGE = PAGE + 1;
                let url = URlConfig.getLinkTravel(params.dateFrom, params.dateTo, PAGE, params.status, 5, SEARCH_STRING)
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
        const {navigate} = this.props.navigation;
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
                    keyboardDismissMode="on-drag"
                    ListFooterComponent={this.renderFooter}
                    ref="listview"
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.refreshData()}
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
                            refreshData={() => this.refreshData()}
                            data={item}
                            goToDetail={
                                () => navigate('DetailTravel', {id: item.IDKeHoach})
                            }
                            goToEditTravel={
                                () => navigate('EditTravel', {
                                    idnhanvien: item.IDNhanVien,
                                    idkhachhang: item.IDCuaHang,
                                    tennhanvien: item.TenNhanVien,
                                    tenkhachhang: item.TenCuaHang,
                                    id: item.IDKeHoach,
                                    reload: () => this.getDataFromSv()
                                })
                            }
                        />
                    }
                />
            </View>)
    }

    render() {

        return (
            <View style={{flex: 1,backgroundColor:'white'}}>
                <LinearGradient colors={['#1b60ad', '#3dc4ea']} style={styles.titleStyle}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                      style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon1 style={styles.iconStyle} size={24} color="white"
                               name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text
                        style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Kế
                        hoạch viếng thăm</Text>
                    <TouchableOpacity
                        onPress={() => this.props.goToCustomerPlant()}
                        style={{
                            alignSelf: 'center',
                            width: 35,
                            height: 35
                        }}>
                        <View style={{width: 50, height: 50, justifyContent: 'center', alignSelf: 'center'}}>
                        </View>
                    </TouchableOpacity>
                </LinearGradient>
                <View style={{width: width,marginTop:16,marginBottom:16}}>
                    <Search
                        placeholder="Tìm kiếm"
                        cancelTitle="Huỷ bỏ"
                        ref="search_box"
                        onChangeText={(text) => this.onChangeText(text)}
                        onCancel={() => this.onCancel()}
                    />
                </View>

                {this.flatListorIndicator()}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    titleStyle: {
        paddingTop: Platform.OS === 'ios' ? 16 : 0,
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
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