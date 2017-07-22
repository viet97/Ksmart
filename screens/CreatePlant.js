import {
    AppRegistry,
    Text,
    View,
    Button, ListView, StyleSheet, StatusBar,
    TouchableOpacity,
    Dimensions,
    BackHandler,
    FlatList,
    ActivityIndicator,
    Platform
} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import URlConfig from "../configs/url";
import Icon2 from 'react-native-vector-icons/Entypo'
import React from 'react';
import Color from '../configs/color'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import TabNavigator from 'react-native-tab-navigator';
import MapListScreen from "./MapListScreen";
import DatePicker from "react-native-datepicker";

var NUMBER_ROW_RENDER = 10
ALL_LOADED = false
var {height} = Dimensions.get('window');
export default class CreatePlant extends React.Component {
    onSwipeRight(gestureState) {
        console.log("onSwipeRight")
        this.setState({myText: 'You swiped right!'});
        this.props.clickMenu()
    }

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

        today = dd + '/' + mm + '/' + yyyy;
        this.state = ({
            date: this.props.date,
            selectedTab: 'ListNhanVien',
            kinhdo: 0,
            vido: 0,
            refreshing: false,
            dataFull: [],
            dataRender: null,
            onEndReach: true,
            waiting: false,
            myText: 'I\'m ready to get swiped!',
            gestureName: 'none',
        })
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

                    source={{uri: 'http://jav.ksmart.vn' + url}}
                    indicator={ProgressBar.Pie}
                    style={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
            );
        }
    }

    isOnline(dangtructuyen) {
        if (dangtructuyen === 1)
            return <Icon2 size={36} color="green" name="controller-record"/>
        else if (dangtructuyen === 2) return <Icon2 size={24} color="red" name="controller-record"/>
        else if (dangtructuyen === 0) return <Icon2 size={24} color="gray" name="controller-record"/>

    }

    renderFooter = () => {
        console.log("Footer")
        if (ALL_LOADED || this.state.dataRender.length === 0) return null
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


    loadMoreData() {
        if (!this.state.onEndReach) {
            console.log("LOADMORE")
            this.setState({onEndReach: true})
            this.setState({dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER + 10)})
            NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
            if (NUMBER_ROW_RENDER > this.state.dataFull.length - 10) ALL_LOADED = true
        }
    }

    refreshData() {
        ALL_LOADED = false
        NUMBER_ROW_RENDER = 10
        fetch(URlConfig.getListNhanVienLink())
            .then((response) => (response.json()))
            .then((responseJson) => {
                    console.log(responseJson)
                    if (responseJson.status) {
                        this.setState({dataFull: responseJson.dsNhanVien}, function () {
                            console.log(this.state.dataFull)
                            this.setState({dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER)})
                            NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
                        })
                    }
                }
            )
    }

    flatListorIndicator() {

        if (!this.state.dataRender) {
            return (
                <View style={{backgroundColor: Color.itemListViewColor, flex: 9}}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"/>
                </View>)
        }

        return (


            <FlatList
                refreshing={this.state.refreshing}
                onRefresh={() => {
                    this.refreshData()
                }}
                ListFooterComponent={this.renderFooter}
                ref="listview"
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
                    <TouchableOpacity onPress={() => this.props.goToCustomerPlant(this.state.date, item.idnhanvien)}>
                        <View style={{
                            height: height / 7, flex: 1,
                            borderTopColor: '#227878', borderTopWidth: 1
                        }}>
                            <Text style={{textAlign: 'right', color: 'white', fontSize: 12}}> Cập nhật
                                lúc {item.thoigiancapnhat}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{justifyContent: 'center'}}>
                                    <Image indicator={ProgressBar.Pie}
                                           style={{margin: 8, width: 60, height: 60, borderRadius: 30}}
                                           source={require('../images/bglogin.jpg')}/>
                                </View>
                                <View style={{flex: 4, margin: 8, justifyContent: 'center'}}>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            color: Color.itemNameListViewColor
                                        }}>{item.tennhanvien}</Text>
                                    {this.isOnline(item.dangtructuyen)}
                                </View>
                                <TouchableOpacity onPress={() => {
                                    this.props.callback(item.KinhDo, item.ViDo, 'ChonNhanVien', 'Địa điểm Nhân Viên')
                                }}>
                                    <Icon2 size={30} color='white' name="location"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                }
            />
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.titleStyle}>
                    <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>Chọn nhân viên giao việc</Text>
                    <View style={{backgroundColor: Color.backgroundNewFeed, width: 35, height: 35}}/>
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
                <View style={{backgroundColor: Color.itemListViewColor, flex: 9}}>
                    <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
                        <Text style={{marginLeft: 8, alignSelf: 'center'}}>Chọn ngày </Text>
                        <DatePicker
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            confirmBtnText="Xác nhận"
                            cancelBtnText="Huỷ bỏ"
                            customStyles={{
                                dateIcon: {},
                                dateInput: {
                                    borderColor: 'transparent'
                                }
                            }}
                            onDateChange={(date) => {

                                this.ondateChange(date);
                            }}
                        />
                    </View>
                    {this.flatListorIndicator()}
                </View>
            </View>
        )
    }

    ondateChange(date) {
        var dFrom = String(date);
        date.replace('/', '-');
        this.setState({date: date})
    }

    componentDidMount() {
        fetch(URlConfig.getListNhanVienLink())
            .then((response) => (response.json()))
            .then((responseJson) => {
                    console.log(responseJson)
                    if (responseJson.status) {
                        this.setState({dataFull: responseJson.dsNhanVien}, function () {
                            console.log(this.state.dataFull)
                            this.setState({
                                    dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER)
                                }
                            )
                            NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
                        })
                    }
                }
            )
    }

}

const styles = StyleSheet.create({
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