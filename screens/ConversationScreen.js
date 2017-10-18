import {
    AppRegistry,
    Text,
    View,
    Button, FlatList, Image, StyleSheet, StatusBar,
    TouchableOpacity, Platform, ActivityIndicator, DeviceEventEmitter
} from 'react-native';
import {Icon} from 'react-native-elements'
import React from 'react';
import {GiftedAvatar} from 'react-native-gifted-chat'
import Toast from 'react-native-simple-toast'

const moment = require('moment');
import {dateOfWeek} from "../configs/data";
import URlConfig from "../configs/url";
import LinearGradient from "react-native-linear-gradient";
import {Header} from 'react-navigation'
import {quanLyToNhanVien} from "../configs/type";
import HeaderCustom from "../components/Header";

let LAST_ID
let ALL_LOADED = false

export default class ConversationScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Danh sách tin nhắn',
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            onEndReach: true,
            convestationList: null,
            refreshing: false,
        }
        this.refechScreen.bind(this)
        this.flatListOrIndicator.bind(this)

    }

    componentDidMount() {
        this.getConvestation();
        //0 quan ly gui, 1 nhan vien
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

    loadMoreConvestation() {
        const {navigate} = this.props.navigation
        let url = URlConfig.getLinkConvestation(LAST_ID);
        fetch(url)
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    if (responseJson.endlist) {
                        ALL_LOADED = true
                        this.forceUpdate()
                    }

                    let convestationList = this.state.convestationList;
                    for (let item of responseJson.data) {
                        item['_id'] = item['ID_NHANVIEN'];
                        item['name'] = item['TenNhanVien'];
                        if (item['AnhDaiDien']) {
                            item['avatar'] = URlConfig.BASE_URL_APP + item['AnhDaiDien'];
                        } else {
                            item['avatar'] = null;
                        }

                        if (item.DANHSACH[0]) {
                            item['lastmsg'] = item.NoiDung;
                            item['isSeen'] = item['DANHSACH'][0].NgayXem !== '0001-01-01T00:00:00';
                            let lastUser = {};
                            if (item['DANHSACH'][0].AnhDaiDien)
                                lastUser['avatar'] = URlConfig.BASE_URL_APP + item['DANHSACH'][0].AnhDaiDien;
                            else
                                lastUser['avatar'] = null;
                            lastUser['name'] = item.TenNhanVien;
                            lastUser['_id'] = item.ID_NHANVIEN;
                            item['lastUser'] = lastUser;

                        }
                        LAST_ID = LAST_ID + 3
                        convestationList.push(item);
                    }
                    this.setState({convestationList: convestationList});

                } else {
                    Toast.show('Có lỗi xảy ra, vui lòng liên hệ quản trị viên!')
                }
            }).catch((e) => {
            Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại')
        })

    }

    getConvestation() {
        LAST_ID = 0
        ALL_LOADED = false;
        const {navigate} = this.props.navigation
        this.setState({convestationList: null})
        let url = URlConfig.getLinkConvestation(LAST_ID);
        console.log('url', url);
        fetch(url)
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    let convestationList = [];
                    for (let item of responseJson.data) {
                        item['_id'] = item['ID_NHANVIEN'];
                        item['name'] = item['TenNhanVien'];
                        if (item['AnhDaiDien']) {
                            item['avatar'] = URlConfig.BASE_URL_APP + item['AnhDaiDien'];
                        } else {
                            item['avatar'] = null;
                        }

                        if (item.DANHSACH[0]) {
                            item['lastmsg'] = item.NoiDung;
                            item['isSeen'] = item['DANHSACH'][0].NgayXem !== '0001-01-01T00:00:00';
                            let lastUser = {};
                            if (item['DANHSACH'][0].AnhDaiDien)
                                lastUser['avatar'] = URlConfig.BASE_URL_APP + item['DANHSACH'][0].AnhDaiDien;
                            else
                                lastUser['avatar'] = null;
                            lastUser['name'] = item.TenNhanVien;
                            lastUser['_id'] = item.ID_NHANVIEN;
                            item['lastUser'] = lastUser;

                        }
                        LAST_ID = LAST_ID + 3
                        convestationList.push(item);
                    }
                    this.setState({convestationList: convestationList});
                    if (responseJson.endlist) {
                        ALL_LOADED = true
                        this.forceUpdate()
                    }
                } else {
                    Toast.show('Có lỗi xảy ra, vui lòng liên hệ quản trị viên!')
                }
            }).catch((e) => {
            Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại')
        })
    }

    refechScreen() {
        LAST_ID = 0
        ALL_LOADED = false;
        const {navigate} = this.props.navigation
        let url = URlConfig.getLinkConvestation(LAST_ID);
        console.log('url', url);
        fetch(url)
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    let convestationList = [];
                    for (let item of responseJson.data) {
                        item['_id'] = item['ID_NHANVIEN'];
                        item['name'] = item['TenNhanVien'];
                        if (item['AnhDaiDien']) {
                            item['avatar'] = URlConfig.BASE_URL_APP + item['AnhDaiDien'];
                        } else {
                            item['avatar'] = null;
                        }

                        if (item.DANHSACH[0]) {
                            item['lastmsg'] = item.NoiDung;
                            item['isSeen'] = item['DANHSACH'][0].NgayXem !== '0001-01-01T00:00:00';
                            let lastUser = {};
                            if (item['DANHSACH'][0].AnhDaiDien)
                                lastUser['avatar'] = URlConfig.BASE_URL_APP + item['DANHSACH'][0].AnhDaiDien;
                            else
                                lastUser['avatar'] = null;
                            lastUser['name'] = item.TenNhanVien;
                            lastUser['_id'] = item.ID_NHANVIEN;
                            item['lastUser'] = lastUser;

                        }
                        LAST_ID = LAST_ID + 3
                        convestationList.push(item);
                    }
                    this.setState({convestationList: convestationList});
                    if (responseJson.endlist) {
                        ALL_LOADED = true
                        this.forceUpdate()
                    }
                } else {
                    Toast.show('Có lỗi xảy ra, vui lòng liên hệ quản trị viên!')
                }
            }).catch((e) => {
            Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại')
        })
    }

    componentWillUnmount() {
        DeviceEventEmitter.emit('reloadMsg')
    }

    flatListOrIndicator() {
        const {navigate} = this.props.navigation
        if (!this.state.convestationList) {
            return (
                <ActivityIndicator
                    animating={true}
                    style={styles.indicator}
                    size="large"/>

            )
        } else if (this.state.convestationList.length === 0)
            return (
                <Text style={{
                    alignSelf: 'center',
                    textAlign: 'center',
                    fontSize: 20,
                    backgroundColor: 'transparent'
                }}>Không có dữ liệu</Text>

            )
        return (
            <FlatList
                keyboardDismissMode="on-drag"
                ListFooterComponent={this.renderFooter}
                ref="listview"
                onEndReachedThreshold={0.2}
                onEndReached={() => {
                    this.loadMoreConvestation()
                }}
                onMomentumScrollBegin={() => {
                    this.setState({onEndReach: false})
                }}
                refreshing={this.state.refreshing}
                onRefresh={() => this.refechScreen()}
                data={this.state.convestationList}
                renderItem={({item}) =>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            marginTop: 32,
                            marginLeft: 16,
                            marginRight: 8,
                            flex: 1,
                        }}
                        onPress={() => {
                            item['isSeen'] = true;
                            this.forceUpdate();
                            navigate('DetailMessage', {
                                data: item.DANHSACH,
                                _id: item.ID_NHANVIEN,
                                title: item.TenNhanVien,
                                updateLastMsg: (message) => {
                                    item.lastmsg = message.NoiDung;
                                    item.DANHSACH.unshift(message);
                                    this.forceUpdate();
                                }
                            })
                            console.log('click', item);
                        }}>
                        <GiftedAvatar user={item} style={{width: 40, height: 40, borderRadius: 20}}/>
                        <View style={{flex: 1, marginRight: 4, marginLeft: 8}}>
                            <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}>
                                <Text numberOfLines={1} style={{
                                    fontSize: 16, width: '50%',
                                    fontWeight: item.isSeen || item.DANHSACH[0].Loai === quanLyToNhanVien ? '200' : 'bold'
                                }}>{item.name}</Text>
                                <Text numberOfLines={1} style={{
                                    fontSize: 14,
                                    fontWeight: item.isSeen || item.DANHSACH[0].Loai === quanLyToNhanVien ? '100' : 'bold'
                                }}>{this.getTimeString(item.ThoiGian)}</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 4
                            }}>
                                <Text numberOfLines={1}
                                      style={{
                                          fontSize: 16, width: '73%',
                                          fontWeight: item.isSeen || item.DANHSACH[0].Loai === quanLyToNhanVien ? '100' : 'bold'
                                      }}>{item.lastmsg}</Text>
                                <GiftedAvatar user={item.lastUser} textStyle={{fontSize: 8}}
                                              avatarStyle={{width: 15, height: 15, borderRadius: 7.5,}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                }/>
        )
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <HeaderCustom
                    title={"Danh sách tin nhắn"}
                    leftClick={
                        () => this.props.navigation.goBack()
                    }
                    rightChildren={
                        <TouchableOpacity style={{padding: 16,}}
                                          onPress={() => {
                                              navigate('SendMessage', {reload: () => this.refechScreen()})
                                          }
                                          }>
                            <Icon type="entypo"
                                  size={24}
                                  color="white" name="new-message"/>
                        </TouchableOpacity>
                    }
                />
                {this.flatListOrIndicator()}
            </View>
        )
    }

    getTimeString(strDate, format = 'YYYY-MM-DDTHH:mm:ss') {
        const startDate = moment(strDate, format).toDate();
        const diff = this.getHourBetweenDates(startDate, new Date());
        if (diff < 24) {
            return moment(startDate).format('HH:mm');
        } else if (diff < 24 * 7) {
            return dateOfWeek[moment(strDate).format('e')]
        }
        return moment(strDate).format('DD-MM-YYYY')
    }

    getHourBetweenDates(startDate, endDate) {
        var diff = endDate.getTime() - startDate.getTime();
        return Math.floor(diff / (60000 * 60));
    }
}
const styles = StyleSheet.create({
    titleStyle: {
        height: Header.height,
        paddingTop: Platform.OS === 'ios' ? 16 : 0,
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
        paddingLeft: 8,
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