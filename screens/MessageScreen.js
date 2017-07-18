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
    ActivityIndicator
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
var {height, width} = Dimensions.get('window');
var GiftedListView = require('react-native-gifted-listview');

var NUMBER_ROW_RENDER = 0
var SEARCH_STRING = '';
var ALL_LOADED = false
export default class OrderListScreen extends Component {
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
            ALL_LOADED: false,
            dateFrom: this.props.dateFrom,
            dateTo: this.props.dateTo,
            refreshing: false,
            waiting: false,
            dataRender: null,
            dataFull: [],
        }
    }


    componentDidMount() {
        this.getMessageListFromServer(this.state.dateFrom, this.state.dateTo)
    }

    getMessageListFromServer(dateFrom, dateTo) {
        this.setState({dataRender: null})
        ALL_LOADED = false
        console.log(URlConfig.getMessageList(dateFrom, dateTo))
        fetch(URlConfig.getMessageList(dateFrom, dateTo))
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (responseJson.status) {
                    this.setState({
                        dataFull: responseJson.data
                    }, function () {
                        this.setState({dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER + 10)})
                        NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
                        if (NUMBER_ROW_RENDER > this.state.dataFull.length - 10) ALL_LOADED = true
                    })
                } else {
                    this.setState({dataRender: []})
                    ALL_LOADED = true
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
            if (NUMBER_ROW_RENDER > this.state.dataFull.length - 10) ALL_LOADED = true
        }
    }

    refreshData() {
        NUMBER_ROW_RENDER = 0
        this.getMessageListFromServer(this.state.dateFrom, this.state.dateTo)
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

    getTenNguoigui(item) {
        if (item.TrangThai) {
            return (<Text >{item.Ten_NGUOIGUI}</Text>)
        } else return (<Text style={{fontWeight: "bold"}}>{item.Ten_NGUOIGUI}</Text>)
    }

    getNoiDungBenNgoai(item) {
        var string = item.NoiDung.slice(0, 50)
        if (item.NoiDung.length > 50)
            string = string + '...'
        return (<Text style={{marginTop: 4}}>{string}</Text>)
    }

    getIconMessage(item) {
        if (item.Loai)
            return (<Icon style={{alignSelf: 'center'}} size={36} color='yellow' name="message"/>)
        else return (<Icon2 style={{alignSelf: 'center'}} size={36} color='blue' name="paper-plane"/>)
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
                    renderItem={({item}) =>
                        <TouchableOpacity
                            onPress={() => this.props.moveToDetailMessage(
                                this.state.dateFrom,
                                this.state.dateTo,
                                item.Ten_NGUOIGUI,
                                item.NgayGui,
                                item.NoiDung)}>
                            <View
                                style={{
                                    margin: 4,
                                    backgroundColor: Color.backGroundItemFlatList,
                                    flex: 1, flexDirection: 'row'
                                }}>
                                <View style={{flexDirection: 'column', flex: 6, margin: 4}}>
                                    {this.getTenNguoigui(item)}
                                    {this.getNoiDungBenNgoai(item)}
                                    <Text style={{marginTop: 4}}>{item.NgayGui}</Text>
                                </View>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    {this.getIconMessage(item)}
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>)
    }

    render() {

        return (
            <View style={{flex: 1}}>

                <View style={styles.titleStyle}>
                    <TouchableOpacity onPress={() => this.props.backToHome()}
                                      style={styles.iconStyle}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>Danh sách đơn hàng</Text>
                    <View style={{backgroundColor: 'transparent', width: 35, height: 35}}/>
                </View>
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
        this.getMessageListFromServer(from, to)

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
        marginLeft: 8
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
