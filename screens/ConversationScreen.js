import {
    AppRegistry,
    Text,
    View,
    Button, FlatList, Image, StyleSheet, StatusBar,
    TouchableOpacity, Platform
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
export default class ConversationScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Danh sách tin nhắn',
        header:null
    });

    constructor(props) {
        super(props);
        this.state = {
            convestationList: []
        }
        this.refechScreen.bind(this)

    }

    componentDidMount() {
        this.getConvestation();
    }

    getConvestation() {
        let url = URlConfig.getLinkConvestation();
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
                            item['lastmsg'] = item.DANHSACH[0].NoiDung;
                            item['isSeen'] = item['DANHSACH'][0].NgayXem !== '0001-01-01T00:00:00';
                            let lastUser = {};
                            if (item['DANHSACH'][0].AnhDaiDien)
                                lastUser['avatar'] = URlConfig.BASE_URL_APP + item['DANHSACH'][0].AnhDaiDien;
                            else
                                lastUser['avatar'] = null;
                            lastUser['name'] = item['DANHSACH'][0].TenNhanVien;
                            lastUser['_id'] = item['DANHSACH'][0].ID_NHANVIEN;
                            item['lastUser'] = lastUser;

                        }

                        convestationList.push(item);
                    }
                    this.setState({convestationList});
                    console.log(convestationList);
                } else {
                    Toast.show('Có lỗi xảy ra, vui lòng liên hệ quản trị viên!')
                }
            }).catch((e) => {
            Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại' + e)
        })
    }

    refechScreen() {

    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <LinearGradient colors={['#1b60ad', '#3dc4ea']} style={styles.titleStyle}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                      style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon type={'ionicon'} style={styles.iconStyle} size={24} color="white"
                               name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 20,
                        color: 'white',
                        alignSelf: 'center',
                        backgroundColor: 'transparent'
                    }}>Danh sách tin nhắn</Text>
                    <View style={{backgroundColor: 'transparent', width: 35, height: 35}}/>
                </LinearGradient>

                <FlatList
                    keyboardDismissMode="on-drag"
                    data={this.state.convestationList}
                    renderItem={({item}) =>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{
                                flexDirection: 'row',
                                justifyContent: "space-between",
                                marginTop: 16,
                                marginLeft: 16,
                                flex: 1,
                            }}
                            onPress={() => {
                                item['isSeen'] = true;
                                this.forceUpdate();
                                navigate('DetailMessage', {
                                    data: item.DANHSACH,
                                    _id: item.ID_NHANVIEN,
                                    title: item.TenNhanVien
                                })
                            }}>
                            <GiftedAvatar user={item} style={{width: 40, height: 40, borderRadius: 20}}/>
                            <View style={{flex: 1, marginRight: 4, marginLeft: 8}}>
                                <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: item.isSeen ? '200' : 'bold'
                                    }}>{item.name}</Text>
                                    <Text style={{
                                        fontSize: 14,
                                        fontWeight: item.isSeen ? '100' : 'bold'
                                    }}>{this.getTimeString(item.ThoiGian)}</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    marginTop: 4
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: item.isSeen ? '100' : 'bold'
                                    }}>{item.lastmsg}</Text>
                                    <GiftedAvatar user={item.lastUser} textStyle={{fontSize: 8}}
                                                  avatarStyle={{width: 15, height: 15, borderRadius: 7.5}}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }/>
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
        height:Header.height,
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