import React, {Component} from 'react'
import DatePicker from 'react-native-datepicker'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Button,
    Picker,
    FlatList,
    TouchableHightLight,
    ActivityIndicator,
    Platform,
    ListView, RefreshControl
} from "react-native";
import URlConfig from "../configs/url";
import Color from '../configs/color'
import Search from 'react-native-search-box';
import Toast from 'react-native-simple-toast';
import Communications from 'react-native-communications';
import DoanhThuReportItem from "../components/DoanhThuReportItem";
import TopDoanhThuItem from "../components/TopDoanhThuItem";
import KhongCoDoanhThuItem from "../components/KhongCoDoanhThuItem";
import HeaderCustom from "../components/Header";

const timer = require('react-native-timer');
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let SEARCH_STRING = '';
let {width, height} = Dimensions.get('window');
let ALL_LOADED = false
let PAGE = 1
export default class ReportScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state
        this.state = {
            isEndList: false,
            title: 'Báo cáo doanh thu sản lượng',
            dateFrom: params.dateFrom,
            dateTo: params.dateTo,
            refreshing: false,
            waiting: false,
            dataRender: ds,
            dataFull: [],
            isSearchExist: false
        }
    }

    componentWillMount() {
        ALL_LOADED = true
    }

    componentDidMount() {
        const {params} = this.props.navigation.state
        SEARCH_STRING = ''
        switch (params.status) {
            case 0:
                this.setState({isSearchExist: true})
                break;
            case 1:
                this.setState({isSearchExist: false})
                break;
            case 2:
                this.setState({isSearchExist: false})
                break;
            case 3:
                this.setState({isSearchExist: true})
                break;
        }
        this.getReportListFromServer()
    }

    getTypeLinkOfReport() {
        let url = ''
        const {params} = this.props.navigation.state;
        switch (params.status) {

            case 0:
                console.log('0')
                url = URlConfig.getReportList(params.dateFrom, params.dateTo, PAGE, SEARCH_STRING)
                this.setState({title: 'Báo cáo doanh thu sản lượng'})
                break
            case 1:
                console.log('1')
                url = URlConfig.getLinkTopDoanhThu(params.dateFrom, params.dateTo, 1)
                this.setState({title: 'Nhân viên doanh thu cao nhất'})
                break
            case 2:
                console.log('2')
                url = URlConfig.getLinkTopDoanhThu(params.dateFrom, params.dateTo, 2)
                this.setState({title: 'Nhân viên doanh thu thấp nhất'})
                break
            case 3:
                console.log('3')
                url = URlConfig.getLinkKhongCoDoanhThu(params.dateFrom, params.dateTo, PAGE, SEARCH_STRING)
                this.setState({title: 'Nhân viên không có doanh thu'})
                break
        }
        return url
    }

    getReportListFromServer() {
        const {params} = this.props.navigation.state
        ALL_LOADED = false
        this.setState({isEndList: false, dataRender: null})
        PAGE = 1;
        let url = this.getTypeLinkOfReport();
        console.log(url)
        fetch(url)
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (params.status !== 1 && params.status !== 2) {
                    if (responseJson.status) {
                        this.setState({
                            dataFull: responseJson.data,
                            isEndList: responseJson.endlist,
                            dataRender: ds.cloneWithRows(responseJson.data)
                        }, function () {
                            if (this.state.isEndList) {
                                ALL_LOADED = true
                                this.forceUpdate()
                            }
                        })
                    }
                } else {
                    if (!responseJson.status) {
                        ALL_LOADED = true
                        let data = ''
                        if (responseJson.data === null) {
                            data = []
                        } else data = responseJson.data
                        this.setState({dataFull: data, dataRender: ds.cloneWithRows(data), isEndList: true})

                    }
                }
                }
            ).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }

    loadMoreDataFromSv() {
            if (!this.state.isEndList) {
                PAGE = PAGE + 1
                let url = this.getTypeLinkOfReport()
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
        this.getReportListFromServer()
    }

    onChangeText(text) {
        this.setState({isSearching: true})
        return new Promise((resolve, reject) => {
            resolve();
            var a = text.toLowerCase()
            SEARCH_STRING = a
            timer.clearTimeout(this)
            timer.setTimeout(this, "123", () => this.getReportListFromServer(), 500);

        });
    }

    onCancel() {
        return new Promise((resolve, reject) => {
            resolve();
            console.log("onCancle")
            if (SEARCH_STRING.length !== 0) {
                SEARCH_STRING = ''
                this.getReportListFromServer()
            }
        });
    }


    renderKhongCoDoanhThu(item) {
        return (
            <KhongCoDoanhThuItem
                data={item}
                call={() => Communications.phonecall(item.dienthoai, true)}
            />
        )
    }

    renderTopDoanhThu(item) {
        return (
            <TopDoanhThuItem
                data={item}
                call={() => Communications.phonecall(item.dienthoai, true)}
            />
        )
    }

    renderDoanhThuSanLuong(item) {
        const {navigate} = this.props.navigation
        return (
            <DoanhThuReportItem
                goToDetail={() => navigate('DetailBaoCaoDoanhThuSanLuong', {data: item})}
                data={item}
            />
        )
    }

    renderFooter = () => {
        console.log("Footer")
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
        console.log(this.state.dataRender, 'DATARENDER')
        const {params} = this.props.navigation.state
        if (!this.state.dataRender) {
            return (
                <View style={{flex: 9}}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"/>
                </View>)
        } else if (this.state.dataFull.length === 0 && this.state.isEndList)
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
                    renderRow={(item) => {
                        switch (params.status) {
                            case 0:
                                return this.renderDoanhThuSanLuong(item)
                            case 1:
                                return this.renderTopDoanhThu(item)
                            case 2:
                                return this.renderTopDoanhThu(item)
                            case 3:
                                return this.renderKhongCoDoanhThu(item)
                        }
                    }}
                />
            </View>)
    }

    render() {
        return (
            <View style={{flex: 1,backgroundColor:'white'}}>
                <HeaderCustom
                    title={this.state.title}
                    leftClick={() => this.props.navigation.goBack()}
                />
                <View>
                    {this.renderSearch()}

                </View>
                {this.flatListorIndicator()}
            </View>

        )
    }

    renderSearch() {
        if (this.state.isSearchExist)
            return (
                <View style={{width: width, marginTop: 16, marginBottom: 16}}>
                    <Search
                        visible={true}
                        ref="search_box"
                        placeholder="Tìm kiếm"
                        cancelTitle="Huỷ bỏ"
                        onChangeText={(text) => this.onChangeText(text)}
                        onCancel={() => this.onCancel()}
                    />
                </View>

            );
        else return null
    }
    ondateChange(from, to) {
        this.setState({dataRender: null})
        var dFrom = String(from);
        var dTo = String(to);
        dFrom.replace('/', '-');
        dTo.replace('/', '-');
        this.setState({dateFrom: dFrom, dateTo: dTo}, function () {
            this.getReportListFromServer()
        })


    }
}
const styles = StyleSheet.create({
    indicator: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    },
    titleStyle: {
        paddingTop: Platform.OS === 'ios' ? 16 : 0,
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
        borderBottomWidth: 1,
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
        marginLeft: 8,
    },
    textStyle: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent'
    },
    titleIconsMenu: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        fontFamily: 'Al Nile'
    }
})