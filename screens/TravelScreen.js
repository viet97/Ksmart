import {
    AppRegistry,
    Text,
    View,
    Button, ListView, StyleSheet, StatusBar,
    TouchableOpacity, ActivityIndicator,
    Dimensions,
    FlatList,
    Platform,
    Picker, RefreshControl
} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import Search from 'react-native-search-box';
import React from 'react';
import URlConfig from "../configs/url";
import Toast from 'react-native-simple-toast'
import TravelItem from "../components/TravelItem";
import HeaderCustom from "../components/Header";

const timer = require('react-native-timer');
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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
                            dataRender: ds.cloneWithRows(responseJson.data)
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
            dataRender: ds,
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
            timer.clearTimeout(this)
            timer.setTimeout(this, "123", () => this.getDataFromSv(), 500);
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
                            dataRender: ds.cloneWithRows(arr)
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
                <ActivityIndicator animating={true} color={"green"} size="large"/>
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
                        style={styles.indicator} color={"green"}
                        size="large"/>
                </View>)
        } else if (this.state.dataFull.length === 0 && this.state.isEndList)
            return (    <View style={{flex: 9}}>
                <Text style={{alignSelf: 'center', textAlign: 'center', fontSize: 20, backgroundColor: 'transparent'}}>Không
                    có dữ liệu</Text>

            </View>)

        return (
            <View style={{flex: 9}}>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.refreshData()}
                        />
                    }
                    renderFooter={this.renderFooter}
                    ref="listview"
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        this.loadMoreDataFromSv()
                    }}
                    dataSource={this.state.dataRender}
                    renderRow={(item) =>

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
        const {params} = this.props.navigation.state;
        return (
            <View style={{flex: 1,backgroundColor:'white'}}>
                <HeaderCustom
                    title={"Kế hoạch viếng thăm"}
                    leftClick={() => {
                        params.reload()
                        this.props.navigation.goBack()
                    }}
                    rightChildren={
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
                    }
                />
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