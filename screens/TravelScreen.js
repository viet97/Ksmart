import {
    AppRegistry,
    Text,
    View,
    Button, ListView, StyleSheet, StatusBar,
    TouchableOpacity, ActivityIndicator,
    Dimensions,
    FlatList
} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import React from 'react';
import Color from '../configs/color'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import URlConfig from "../configs/url";
var {height} = Dimensions.get('window');
var NUMBER_ROW_RENDER = 10;
export default class TravelScreen extends React.Component {
    onSwipeRight(gestureState) {
        console.log("onSwipeRight")
        this.setState({myText: 'You swiped right!'});
        this.props.clickMenu()
    }

    URL = URlConfig.getLinkTravel('13-06-2017');

    constructor(props) {
        super(props)
        this.state = ({
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

    loadMoreData() {
        if (!this.state.onEndReach) {
            this.setState({onEndReach: true})
            this.setState({dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER + 10)})
            NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
            if (NUMBER_ROW_RENDER > this.state.dataFull.length - 10) ALL_LOADED = true
        }
    }

    refreshData() {
        NUMBER_ROW_RENDER = 10
        fetch(this.URL)
            .then((response) => (response.json()))
            .then((responseJson) => {
                    console.log(responseJson)
                    if (responseJson.status) {
                        this.setState({dataFull: responseJson.data}, function () {
                            console.log(this.state.dataFull)
                            this.setState({dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER)})
                            NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10;

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
            strVaoDiem = diffMins > 0 ? ('Sớm ' + diffMins + ' phút') : 'Muộn ' + Math.abs(diffMins) + ' phút';
            strVaoDiem = item.ThoiGianVaoDiemThucTe.replace('T', ' ') + ' ' + strVaoDiem;
        }
        if (item.ThoiGianRaDiemThucTe === '1900-01-01T00:00:00') {
            strRaDiem = "Chưa ra điểm!"
        } else {
            diffMins = this.millisToMinutes(item.ThoiGianRaDiemDuKien, item.ThoiGianRaDiemThucTe)
            strRaDiem = diffMins > 0 ? ('Sớm ' + diffMins + ' phút') : 'Muộn ' + Math.abs(diffMins) + ' phút';
            strRaDiem = item.ThoiGianRaDiemThucTe.replace('T', ' ') + ' ' + strRaDiem;
        }
        return (
            <TouchableOpacity onPress={() => this.props.callback(item.KinhDo, item.ViDo, 'Travel', 'Địa chỉ cửa hàng')}>
                <View style={{
                    borderTopColor: '#227878', borderTopWidth: 1
                }}>
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
        return (
            <GestureRecognizer
                onSwipeRight={(state) => this.onSwipeRight(state)}
                style={{flex: 1}}
            >
                <View style={{flex: 1}}>
                    <View style={styles.titleStyle}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                        <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>Viếng thăm</Text>
                        <View style={{backgroundColor: Color.backgroundNewFeed, width: 35, height: 35}}></View>
                    </View>

                    <TouchableOpacity onPress={() => this.props.backToHome()}
                                      style={{width: 50, height: 50, position: 'absolute'}}/>
                    {this.flatListorIndicator()}
                </View>
            </GestureRecognizer>

        )
    }

    componentDidMount() {
        console.log(this.URL)
        fetch(this.URL)
            .then((response) => (response.json()))
            .then((responseJson) => {
                    if (responseJson.status) {
                        this.setState({dataFull: responseJson.data}, function () {
                            console.log('dataFull', this.state.dataFull)
                            this.setState({dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER)}, function () {
                                console.log('datarender', this.state.dataRender)

                            })
                            NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10;
                        })
                    }
                }
            )
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
        marginLeft: 16
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