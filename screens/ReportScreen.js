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
} from "react-native";
import URlConfig from "../configs/url";
import Color from '../configs/color'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Entypo'
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import {DialogComponent, SlideAnimation} from 'react-native-dialog-component';
import Dialog from '../components/DialogOrder'
import orderListData from '../dbcontext/orderListData'
import AtoZListView from 'react-native-atoz-listview';
import Search from 'react-native-search-box';
import Toast from 'react-native-simple-toast';
import ultils from "../configs/ultils";
import Communications from 'react-native-communications';
import DoanhThuReportItem from "../components/DoanhThuReportItem";
import TopDoanhThuItem from "../components/TopDoanhThuItem";
import KhongCoDoanhThuItem from "../components/KhongCoDoanhThuItem";
import ModalDropdownCustom from "../components/ModalDropdownCustom";
import PTRView from 'react-native-pull-to-refresh'
import LinearGradient from "react-native-linear-gradient";
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
            dataRender: null,
            dataFull: [],
        }
    }

    componentWillMount() {
        ALL_LOADED = true
    }

    componentDidMount() {
        SEARCH_STRING = ''
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
                this.setState({title: '10 nhân viên doanh thu cao nhất'})
                break
            case 2:
                console.log('2')
                url = URlConfig.getLinkTopDoanhThu(params.dateFrom, params.dateTo, 2)
                this.setState({title: '10 nhân viên doanh thu thấp nhất'})
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
        fetch(url)
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (params.status !== 1 && params.status !== 2) {
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
                } else {
                    if (!responseJson.status) {
                        ALL_LOADED = true
                        let data = ''
                        if (responseJson.data === null) {
                            data = []
                        } else data = responseJson.data
                        this.setState({dataFull: data, dataRender: data, isEndList: true})
                    }
                }
                }
            ).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }

    loadMoreDataFromSv() {
        if (!this.state.onEndReach) {
            this.setState({onEndReach: true})

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
        this.getReportListFromServer()
    }

    onChangeText(text) {
        this.setState({isSearching: true})
        return new Promise((resolve, reject) => {
            resolve();
            var a = text.toLowerCase()
            SEARCH_STRING = a
            this.getReportListFromServer()
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
        const {params} = this.props.navigation.state
        if (!this.state.dataRender) {
            return (
                <View style={{flex: 9}}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"/>
                </View>)
        } else if (this.state.dataRender.length === 0)
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
                <FlatList
                    keyboardDismissMode="on-drag"
                    ListFooterComponent={this.renderFooter}
                    ref={(listV) => {
                        this.listV = listV
                    }}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        this.loadMoreDataFromSv()
                    }}
                    onMomentumScrollBegin={() => {
                        this.setState({onEndReach: false})
                    }}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.refreshData()}
                    extraData={this.state.dataRender}
                    data={this.state.dataRender}
                    renderItem={({item}) => {
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
                <LinearGradient colors={['#1b60ad', '#3dc4ea']} style={styles.titleStyle}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                      style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon1 style={styles.iconStyle} size={24} color="white"
                               name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 20,
                        color: 'white',
                        alignSelf: 'center',
                        backgroundColor: 'transparent'
                    }}>{this.state.title}</Text>
                    <View style={{backgroundColor: 'transparent', width: 35, height: 35}}/>
                </LinearGradient>
                <View>
                    <View style={{width: width,marginTop:16,marginBottom:16}}>
                        <Search
                            ref="search_box"
                            placeholder="Tìm kiếm"
                            cancelTitle="Huỷ bỏ"
                            onChangeText={(text) => this.onChangeText(text)}
                            onCancel={() => this.onCancel()}
                        />
                    </View>

                </View>
                {this.flatListorIndicator()}
            </View>

        )
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