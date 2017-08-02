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

var {height, width} = Dimensions.get('window');
var NUMBER_ROW_RENDER = 10;
let ALL_LOADED = false;
const TIME_SAP_DEN_GIO = 10 * 60;//10 phut
export default class TravelScreen extends React.Component {
    onSwipeRight(gestureState) {
        console.log("onSwipeRight")
        this.setState({myText: 'You swiped right!'});
        this.props.clickMenu()

    }

    getDataFromSv() {
        fetch(URlConfig.getLinkTravel(this.state.date))
            .then((response) => (response.json()))
            .then((responseJson) => {
                    if (responseJson.status) {
                        this.setState({dataFull: responseJson.data}, function () {
                            this.setDataRender();
                        })
                    }
                }
            ).catch((e) => Toast.show('' + e))
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
            numberPickTravel: 0,
            travelStatus: [],
            refreshing: false,
            dataFull: [],
            date: today,
            dataRender: null,
            onEndReach: true,
            waiting: false,
            myText: 'I\'m ready to get swiped!',
            gestureName: 'none',
            URL: ''
        })
    }


    componentWillMount() {

        var arr = []
        arr.push('Tất cả')
        arr.push('Chưa vào điểm')
        arr.push('Đã vào điểm')
        arr.push('Sắp đến giờ');
        this.setState({travelStatus: arr})
        console.log(this.state.date)
        this.getDataFromSv()
    }

    setDataRender() {
        switch (this.state.numberPickTravel) {
            case 0:
                this.setState({dataRender: this.state.dataFull})
                break;
            case 1:
                let arr = []
                for (let item of this.state.dataFull) {
                    if (item.TrangThai === 0) {
                        arr.push(item)
                    }
                }
                this.setState({dataRender: arr});
                break;
            case 2:
                arr = [];
                for (let item of this.state.dataFull) {
                    if (item.TrangThai === 1) {
                        arr.push(item)
                    }
                }
                this.setState({dataRender: arr});
                break;
            case 3:
                arr = []
                for (let item of this.state.dataFull) {
                    let now = new Date();
                    let timeItem = new Date(item.ThoiGianVaoDiemDuKien);
                    let seconds = (timeItem.getTime() - 7 * 3600 * 1000 - now.getTime()) / 1000;
                    console.log('phut', seconds);
                    console.log(now, timeItem)
                    if (seconds >= 0 && seconds <= TIME_SAP_DEN_GIO) {
                        arr.push(item)
                    }

                }
                this.setState({dataRender: arr});
                break;

        }
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

    loadMoreData() {
        if (!this.state.onEndReach) {
            this.setState({onEndReach: true})
            this.setState({dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER + 10)})
            NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
            if (NUMBER_ROW_RENDER > this.state.dataFull.length - 10) {
                ALL_LOADED = true
                this.forceUpdate()
            }
        }
    }

    refreshData() {
        this.setState({dataRender: null})
        this.getDataFromSv()
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
            <View style={{backgroundColor: Color.itemListViewColor, flex: 9}}>

                <FlatList
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.refreshData()
                    }}
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
                        this.renderItem(item)
                    }
                />
            </View>)
    }

    renderItem(item) {
        var strVaoDiem = '';
        var strRaDiem = '';
        if (item.ThoiGianVaoDiemThucTe === '1900-01-01T00:00:00') {
            strVaoDiem = "Chưa vào điểm!"
        } else {
            var diffMins = this.millisToMinutes(item.ThoiGianVaoDiemDuKien, item.ThoiGianVaoDiemThucTe)
            strVaoDiem = 'Vào điểm lúc: ' + item.ThoiGianVaoDiemThucTe.replace('T', ' ') + ' ' + strVaoDiem;
        }
        if (item.ThoiGianRaDiemThucTe === '1900-01-01T00:00:00') {
            strRaDiem = "Chưa ra điểm!"
        } else {
            diffMins = this.millisToMinutes(item.ThoiGianRaDiemDuKien, item.ThoiGianRaDiemThucTe)
            strRaDiem = 'Ra điểm lúc: ' + item.ThoiGianRaDiemThucTe.replace('T', ' ') + ' ' + strRaDiem;
        }
        return (
            <TouchableOpacity onPress={() => this.props.callback(item.KinhDo, item.ViDo, 'Địa chỉ cửa hàng')}>
                <View style={{
                    borderTopColor: '#227878', borderTopWidth: 1
                }}>
                    <Text style={{
                        textAlign: 'right',
                        color: 'white',
                        fontSize: 12,
                        marginRight: 4
                    }}>Vào điểm dự kiến: {item.ThoiGianVaoDiemDuKien}</Text>

                    <Text style={{
                        textAlign: 'right',
                        color: 'white',
                        fontSize: 12,
                        marginRight: 4
                    }}>{strVaoDiem}</Text>
                    <Text style={{
                        textAlign: 'right',
                        color: 'white',
                        fontSize: 12,
                        marginRight: 4
                    }}>{strRaDiem}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{justifyContent: 'center'}}>
                            {this.getImage(item.anhdaidien === undefined ? '' : item.anhdaidien)}
                        </View>
                        <View style={{flex: 4, margin: 8, justifyContent: 'center'}}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: Color.itemNameListViewColor,
                                    margin: 4
                                }}>{item.TenCuaHang}</Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    margin: 4,
                                    color: Color.itemNameListViewColor
                                }}>{item.TenNhanVien}</Text>
                            <Text
                                style={{fontSize: 13, margin: 4, color: item.text_color}}>{item.text_color_mota}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        let travelStatusItem = this.state.travelStatus.map((s, i) => {
            return <Picker.Item key={i} value={i} label={s}/>
        });
        return (
            <GestureRecognizer
                onSwipeRight={(state) => this.onSwipeRight(state)}
                style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={styles.titleStyle}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                        <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>Viếng thăm</Text>
                        <TouchableOpacity
                            onPress={() => this.props.goToCustomerPlant(this.state.date)}
                            style={{
                                backgroundColor: Color.backgroundNewFeed,
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
                                    paddingRight: 8
                                }}>Thêm</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => this.props.backToHome()}
                                      style={{width: 50, height: 50, position: 'absolute'}}/>
                    <View style={{width: window.width, height: 45, elevation: 5}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <DatePicker
                                style={{marginLeft: 8}}
                                date={this.state.date}
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
                                    this.ondateChange(date);
                                }}
                            />

                            <Picker style={{height: 44, width: width / 2, alignSelf: 'center'}}
                                    itemStyle={{height: 44}}
                                    selectedValue={this.state.numberPickTravel}
                                    onValueChange={(value) => {
                                        this.setState({numberPickTravel: value}, function () {
                                            this.setDataRender();
                                        })
                                    }}>
                                {travelStatusItem}
                            </Picker>

                            <View></View>
                        </View>
                    </View>
                    {this.flatListorIndicator()}
                </View>
            </GestureRecognizer>
        )
    }


    ondateChange(date) {
        console.log('date', date)
        this.setState({
            date: date,
            URL: URlConfig.getLinkTravel(date)
        }, function () {
            this.refreshData()
        });

    }


    millisToMinutes(from, to) {
        var dateFrom = new Date(from)
        var dateTo = new Date(to)
        var millis = dateFrom - dateTo;
        var minutes = Math.floor(millis / 60000);
        return minutes;
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