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
    Platform,
    Picker
} from 'react-native';
import Search from 'react-native-search-box';
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

var NUMBER_ROW_RENDER = 10
var ALL_LOADED = false
var SEARCH_STRING = '';
var {width, height} = Dimensions.get('window');
export default class ListNhanVienScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            dataPartyNhanVien: [],
            numberPickParty: 0,
            partyNhanVienStatus: [],
            isSearching: false,
            selectedTab: 'ListNhanVien',
            kinhdo: 0,
            vido: 0,
            refreshing: false,
            dataFull: [],
            dataSearch: [],
            dataRender: null,
            onEndReach: true,
            waiting: false,
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


    loadMoreData() {
        if (!this.state.onEndReach) {

            this.setState({onEndReach: true})
            this.setState({
                dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER + 10),
                dataSearch: this.state.dataFull.slice(0, NUMBER_ROW_RENDER + 10)
            })
            NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
            if (NUMBER_ROW_RENDER > this.state.dataFull.length - 10) ALL_LOADED = true
        }
    }

    fillData(data) {
        var status = this.state.numberPickParty
        var arr = []

        for (var item in data) {
            if (data[item].TenNhom === this.state.partyNhanVienStatus[status] || status === 0)
                arr.push(data[item])
        }
        return arr
    }

    refreshData() {
        this.setState({dataRender: null})
        ALL_LOADED = false
        NUMBER_ROW_RENDER = 10
        fetch(URlConfig.getListNhanVienLink())
            .then((response) => (response.json()))
            .then((responseJson) => {


                if (responseJson.status) {
                    var arr = this.fillData(responseJson.dsNhanVien)
                    this.setState({dataFull: arr}, function () {
                        if (NUMBER_ROW_RENDER > this.state.dataFull.length) ALL_LOADED = true
                            this.setState({
                                dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER),
                                dataSearch: this.state.dataFull.slice(0, NUMBER_ROW_RENDER)
                            })

                    })
                }
                else ALL_LOADED = true
                NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
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
                        <TouchableOpacity onPress={() => this.props.goToDetailNhanVien(item.idnhanvien)}>
                            <View style={{
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
                                        this.props.callback(item.KinhDo, item.ViDo, 'ListNhanVien', 'Địa điểm Nhân Viên')
                                    }}>
                                        <Icon2 size={30} color='white' name="location"/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>)
    }

    onChangeText(text) {
        this.setState({isSearching: true})
        return new Promise((resolve, reject) => {
            resolve();

            var arr = []
            var a = text.toLowerCase()
            SEARCH_STRING = a

            if (a.length === 0) this.setState({dataRender: this.state.dataSearch})
            else
                for (var item in this.state.dataSearch) {
                    if (a !== SEARCH_STRING) return

                    if (this.state.dataSearch[item].tennhanvien.toLowerCase().search(a) !== -1) {

                        arr.push(this.state.dataSearch[item])

                    }
                }

            if (a.length !== 0) this.setState({dataRender: arr})
            else this.setState({isSearching: false})
        });
    }

    onCancel() {
        return new Promise((resolve, reject) => {
            resolve();

            SEARCH_STRING = ''
            this.setState({dataRender: this.state.dataSearch, isSearching: false})
        });
    }

    render() {

        let partyStatusItem = this.state.partyNhanVienStatus.map((s, i) => {
            return <Picker.Item key={i} value={i} label={s}/>
        });
        return (
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'ListNhanVien'}
                    title="Nhân Viên"
                    renderIcon={() => <Icon1 size={24} color="black" name="ios-people-outline"/>}
                    renderSelectedIcon={() => <Icon1 size={24} color="green" name="ios-people-outline"/>}
                    onPress={() => this.setState({selectedTab: 'ListNhanVien'})}>
                    <View style={{flex: 1}}>
                        <View style={styles.titleStyle}>
                            <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                            <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>Danh sách nhân viên</Text>
                            <View style={{backgroundColor: Color.backgroundNewFeed, width: 35, height: 35}}/>
                        </View>

                        <TouchableOpacity onPress={() => this.props.backToHome()}
                                          style={{width: 50, height: 50, position: 'absolute'}}/>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{alignSelf: 'center', fontSize: 15, color: 'black'}}>Nhóm/Phòng</Text>
                            <Picker style={{height: 44, width: width * 3 / 4, marginLeft: 8}}
                                    itemStyle={{height: 44, alignSelf: 'center'}}
                                    selectedValue={this.state.numberPickParty}
                                    onValueChange={(value) => {
                                        this.setState({numberPickParty: value}, function () {
                                            this.refreshData()
                                        })
                                    }}>
                                {partyStatusItem}
                            </Picker>
                        </View>
                        <View style={{width: width}}>
                            <Search
                                ref="search_box"
                                onChangeText={(text) => this.onChangeText(text)}
                                onCancel={() => this.onCancel()}
                            />
                        </View>
                        {this.flatListorIndicator()}
                    </View>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'MapForAllLocation'}
                    title="Vị trí"
                    renderIcon={() => <Icon2 size={24} color="black" name="location"/>}
                    renderSelectedIcon={() => <Icon2 size={24} color="green" name="location"/>}
                    onPress={() => this.setState({selectedTab: 'MapForAllLocation'})}>
                    <MapListScreen/>
                </TabNavigator.Item>
            </TabNavigator>

        )
    }

    componentDidMount() {

        fetch(URlConfig.getListNhanVienLink())
            .then((response) => (response.json()))
            .then((responseJson) => {

                if (responseJson.status) {
                        this.setState({dataFull: responseJson.dsNhanVien}, function () {

                            if (NUMBER_ROW_RENDER > this.state.dataFull.length) ALL_LOADED = true
                            this.setState({
                                dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER),
                                dataSearch: this.state.dataFull.splice(0, NUMBER_ROW_RENDER)
                                }
                            )

                        })
                } else ALL_LOADED = true
                NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
                }
            )
    }

    componentWillMount() {
        fetch(URlConfig.getLinkNhomNhanVien())
            .then((response) => (response.json()))
            .then((responseJson) => {
                    arr = this.state.partyNhanVienStatus
                    if (responseJson.status) {
                        for (var item in responseJson.danhsachnhom) {
                            arr.push(responseJson.danhsachnhom[item].TenNhom)
                        }
                        this.setState({partyNhanVienStatus: arr})
                    }
                }
            )

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