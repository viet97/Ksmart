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
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Entypo'
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import {DialogComponent, SlideAnimation} from 'react-native-dialog-component';
import Dialog from '../components/Dialog'
import orderListData from '../dbcontext/orderListData'
import AtoZListView from 'react-native-atoz-listview';
import Search from 'react-native-search-box';
import Toast from 'react-native-simple-toast';
import ultils from "../configs/ultils";
import Communications from 'react-native-communications';

var {height, width} = Dimensions.get('window');
var GiftedListView = require('react-native-gifted-listview');

var NUMBER_ROW_RENDER = 0
var SEARCH_STRING = '';
var ALL_LOADED = false
export default class ReportScreen extends Component {
    static navigationOptions = {
        header: null,
    };

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
        this.state = {
            title: 'Báo cáo doanh thu sản lượng',
            reportStatus: [],
            numberPickType: 0,
            dateFrom: today,
            dateTo: today,
            refreshing: false,
            waiting: false,
            dataRender: null,
            dataFull: [],
        }
    }

    componentWillMount() {
        ALL_LOADED = true
        let arr = []
        arr.push('Doanh thu sản lượng')
        arr.push('10 nhân viên doanh thu cao nhất')
        arr.push('10 nhân viên doanh thu thấp nhất')
        arr.push('Nhân viên chưa có doanh thu trong ngày')
        this.setState({reportStatus: arr})
    }

    componentDidMount() {
        this.getReportListFromServer(this.state.dateFrom, this.state.dateTo)
    }

    getdate(date) {
        return date.replace(T, ' ')
    }
    getReportListFromServer(dateFrom, dateTo) {
        let url = ''

        switch (this.state.numberPickType) {
            case 0:
                url = URlConfig.getReportList(dateFrom, dateTo)
                this.setState({title: 'Báo cáo doanh thu sản lượng'})
                break
            case 1:
                url = URlConfig.getLinkTopDoanhThu(dateFrom, dateTo, 1)
                this.setState({title: '10 nhân viên doanh thu cao nhất'})
                break
            case 2:
                url = URlConfig.getLinkTopDoanhThu(dateFrom, dateTo, 2)
                this.setState({title: '10 nhân viên doanh thu thấp nhất'})
                break
            case 3:
                url = URlConfig.getLinkKhongCoDoanhThu(dateFrom, dateTo)
                this.setState({title: 'Nhân viên không có doanh thu'})
                break
        }

        this.setState({dataRender: null})
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {

                console.log(responseJson)
                if (responseJson.data !== null) {

                    this.setState({
                        dataFull: responseJson.data
                    }, function () {
                        this.setState({dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER + 10)})
                        if (this.state.dataFull.length === 0 || NUMBER_ROW_RENDER > this.state.dataFull.length) {
                            ALL_LOADED = true
                            this.forceUpdate()
                        }
                        else ALL_LOADED = false
                        NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10

                    })
                } else {
                    this.setState({dataRender: []})
                    ALL_LOADED = true
                    this.forceUpdate()
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    loadMoreData() {

        if (!this.state.onEndReach) {
            console.log("LOADMORE")
            this.setState({onEndReach: true})
            this.setState({
                dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER + 10),
            })

            NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
            if (NUMBER_ROW_RENDER > this.state.dataFull.length - 10) {
                ALL_LOADED = true
                this.forceUpdate()
            }
        }
    }

    refreshData() {
        NUMBER_ROW_RENDER = 10
        this.getReportListFromServer(this.state.dateFrom, this.state.dateTo)
    }

    renderKhongCoDoanhThu(item) {
        return (
            <TouchableOpacity onPress={() => Communications.phonecall(item.dienthoai, true)}>
                <View style={{
                    marginTop: 4, marginBottom: 4, marginLeft: 8, marginRight: 8,
                    backgroundColor: Color.backGroundItemFlatList,
                    borderTopColor: '#227878'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 8,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Text style={{alignSelf: 'center'}}>Tên nhân viên:</Text>
                        <Text style={{
                            marginLeft: 8,
                            fontSize: 18,
                            fontWeight: "bold"
                        }}>{item.tennhanvien}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Text>khách hàng cuối:</Text>
                        <Text style={{marginLeft: 8}}>{item.donhangcuoi_tenkhachhang}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Text>Đơn hàng cuối lúc:</Text>
                        <Text style={{marginLeft: 8}}>{item.donhangcuoi_thoigian}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderTopDoanhThu(item) {
        return (
            <TouchableOpacity onPress={() => Communications.phonecall(item.dienthoai, true)}>
                <View style={{
                    marginTop: 4, marginBottom: 4, marginLeft: 8, marginRight: 8,
                    backgroundColor: Color.backGroundItemFlatList,
                    borderTopColor: '#227878'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 8,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Icon1 size={24} color="black" name="ios-people-outline"/>
                        <Text style={{
                            marginLeft: 8,
                            fontSize: 18,
                            fontWeight: "bold"
                        }}>{item.tennhanvien}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Icon2 size={24} color="black" name="news"/>
                        <Text style={{marginLeft: 8}}>{item.DonHang}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Icon size={24} color="green" name="attach-money"/>
                        <Text style={{marginLeft: 8}}>{ultils.getMoney(item.TongTien, 0)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderDoanhThuSanLuong(item) {
        return (
            <View style={{
                marginTop: 4, marginBottom: 4, marginLeft: 8, marginRight: 8,
                backgroundColor: Color.backGroundItemFlatList,
                borderTopColor: '#227878'
            }}>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 8,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Icon1 size={24} color="black" name="ios-people-outline"/>
                    <Text style={{
                        marginLeft: 8,
                        fontSize: 18,
                        fontWeight: "bold"
                    }}>{item.tenkhachhang}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Icon2 size={24} color="red" name="location-pin"/>
                    <Text style={{marginLeft: 8}}>{item.diachikhachhang}</Text>

                </View>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Icon2 size={24} color="black" name="news"/>
                    <Text style={{marginLeft: 8}}>{item.sodonhang}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Icon size={24} color="green" name="attach-money"/>
                    <Text style={{marginLeft: 8}}>{ultils.getMoney(item.tongtien, 0)}</Text>
                </View>
            </View>
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

        if (!this.state.dataRender) {
            return (
                <View style={{backgroundColor: Color.backGroundFlatList, flex: 9}}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"/>
                </View>)
        }

        return (
            <View style={{backgroundColor: Color.backGroundFlatList, flex: 9}}>
                <FlatList
                    ListFooterComponent={this.renderFooter}
                    ref={(listV) => {
                        this.listV = listV
                    }}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.refreshData()
                    }}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (SEARCH_STRING.length === 0)
                            this.loadMoreData()
                    }}
                    onMomentumScrollBegin={() => {

                        this.setState({onEndReach: false})
                    }}
                    extraData={this.state.dataRender}
                    data={this.state.dataRender}
                    renderItem={({item}) => {
                        switch (this.state.numberPickType) {
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
        let reportStatusItem = this.state.reportStatus.map((s, i) => {
            return <Picker.Item key={i} value={i} label={s}/>
        });
        return (
            <View style={{flex: 1}}>

                <View style={styles.titleStyle}>
                    <Image source={require('../images/bg.png')} style={{position: 'absolute', right: 0, top: 0}}/>
                    <TouchableOpacity onPress={() => this.props.backToHome()}
                                      style={styles.iconStyle}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>{this.state.title}</Text>
                    <View style={{backgroundColor: 'transparent', width: 35, height: 35}}/>
                </View>
                <TouchableOpacity onPress={() => this.props.backToHome()}
                                  style={{
                                      width: 50,
                                      height: 50,
                                      position: 'absolute',
                                      left: 16,
                                      top: 0,
                                      right: 0,
                                      bottom: 0
                                  }}/>
                <View>
                    <View style={{width: width, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <DatePicker
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
                                }
                            }}
                            onDateChange={(date) => {

                                this.ondateChange(date, this.state.dateTo);
                            }}
                        />

                        <Text style={{alignSelf: 'center'}}>Đến ngày </Text>
                        <DatePicker
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
                    <Picker style={{height: 44, width: width}}
                            itemStyle={{color: 'red', height: 88}}
                            selectedValue={this.state.numberPickType}
                            onValueChange={(value) => {
                                this.setState({numberPickType: value}, function () {
                                    this.getReportListFromServer(this.state.dateFrom, this.state.dateTo)
                                })


                            }}>
                        {reportStatusItem}
                    </Picker>
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
        this.setState({dateFrom: dFrom})
        this.setState({dateTo: dTo})
        this.getReportListFromServer(from, to)

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
        marginTop: (Platform.OS === 'ios') ? 8 : 0
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
