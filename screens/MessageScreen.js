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
    Platform
} from "react-native";
import PTRView from 'react-native-pull-to-refresh'
import Modal from 'react-native-modalbox';
import URlConfig from "../configs/url";
import Color from '../configs/color'
import Icon1 from 'react-native-vector-icons/Ionicons'
import {Icon} from "react-native-elements";
import Icon2 from 'react-native-vector-icons/Entypo'
import Image from 'react-native-image-progress';
import Toast from 'react-native-simple-toast'
import ProgressBar from 'react-native-progress/Bar';
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import {DialogComponent, SlideAnimation} from 'react-native-dialog-component';
import Dialog from '../components/DialogOrder'
import orderListData from '../dbcontext/orderListData'
import AtoZListView from 'react-native-atoz-listview';
import Search from 'react-native-search-box';
import ultils from "../configs/ultils";
import ModalSendMessage from "../components/ModalSendMessage";

var {height, width} = Dimensions.get('window');

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

    componentWillMount() {
        ALL_LOADED = true
    }

    componentDidMount() {
        this.getMessageListFromServer(this.state.dateFrom, this.state.dateTo)
    }

    getMessageListFromServer(dateFrom, dateTo) {
        this.setState({dataRender: null})
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
                        if (this.state.dataFull.length === 0 || NUMBER_ROW_RENDER > this.state.dataFull.length) {
                            console.log("da load het")
                            console.log(this.state.dataFull.length)
                            console.log(NUMBER_ROW_RENDER)
                            ALL_LOADED = true
                            this.forceUpdate()
                        }
                        else {
                            ALL_LOADED = false
                            console.log("chua load het")
                        }
                        NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10

                    })
                } else {
                    this.setState({dataRender: []})
                    ALL_LOADED = true
                    this.forceUpdate()
                }
            })
            .catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'));
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
        this.getMessageListFromServer(this.state.dateFrom, this.state.dateTo)
    }

    renderFooter = () => {
        console.log(ALL_LOADED)
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

    getTenNguoigui(item) {
        if (item.TrangThai) {
            return (<Text style={{backgroundColor: 'transparent'}}>{item.Ten_NGUOIGUI}</Text>)
        } else return (<Text style={{fontWeight: "bold", backgroundColor: 'transparent'}}>{item.Ten_NGUOIGUI}</Text>)
    }

    getNoiDungBenNgoai(item) {
        var string = item.NoiDung.slice(0, 50)
        if (item.NoiDung.length > 50)
            string = string + '...'
        return (<Text style={{marginTop: 4, backgroundColor: 'transparent'}}>{string}</Text>)
    }

    getIconMessage(item) {
        if (item.Loai)
            return (<Icon style={{alignSelf: 'center', backgroundColor: 'transparent'}} size={36} color='yellow'
                          name="message"/>)
        else return (<Icon2 style={{alignSelf: 'center', backgroundColor: 'transparent'}} size={36} color='blue'
                            name="paper-plane"/>)
    }

    flatListorIndicator() {

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
                <Text style={{alignSelf: 'center', textAlign: 'center', fontSize: 20, backgroundColor: 'transparent'}}>Không
                    có dữ liệu</Text>

            </View>)

        return (
            <View style={{flex: 9}}>
                <FlatList
                    ListFooterComponent={this.renderFooter}
                    ref={(listV) => {
                        this.listV = listV
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
                                    flex: 1, flexDirection: 'row'
                                }}>
                                <Image source={require('../images/bg1.png')}
                                       style={{
                                           width: width - 8,
                                           height: height / 7,
                                           flexDirection: 'row'
                                       }}>
                                    <View style={{flexDirection: 'column', flex: 6, margin: 4}}>
                                        {this.getTenNguoigui(item)}
                                        {this.getNoiDungBenNgoai(item)}
                                        <Text
                                            style={{
                                                marginTop: 4,
                                                backgroundColor: 'transparent'
                                            }}>{ultils.getDate(item.NgayGui)}</Text>
                                    </View>
                                    <View style={{flex: 1, justifyContent: 'center'}}>
                                        {this.getIconMessage(item)}
                                    </View>
                                </Image>
                            </View>
                        </TouchableOpacity>
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
                                      style={styles.iconStyle}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Tin
                        nhắn</Text>
                    <TouchableOpacity style={{backgroundColor: 'transparent', alignSelf: 'center', marginRight: 8}}
                                      onPress={() => {
                                          this.props.goToSendMessage()
                                      }}>
                        <Icon2 style={{backgroundColor: 'transparent', alignSelf: 'center'}} size={24} color="white"
                               name="new-message"/>
                    </TouchableOpacity>
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

                    <Text style={{alignSelf: 'center', backgroundColor: 'transparent'}}>Đến ngày </Text>
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
    },
    modal: {
        flexDirection: 'column',
        paddingHorizontal: 8,
        marginTop: 32,
        justifyContent: 'center',
    },
})