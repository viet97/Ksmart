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
    Platform, DeviceEventEmitter
} from "react-native";
import {Icon} from 'react-native-elements'
import {GiftedChat, Send} from "react-native-gifted-chat";
import URlConfig from "../configs/url";
import Utils from "../configs/ultils";
import LinearGradient from "react-native-linear-gradient";
import {Header} from 'react-navigation'
import {nhanVienToQuanLy, quanLyToNhanVien} from "../configs/type";
import Toast from "react-native-simple-toast";

const failed = 'ios-warning';
const ok = 'ios-checkmark-outline';
const onSend = 'ios-refresh-circle-outline';
const moment = require('moment');
export default class DetailMessageScreenV2 extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: navigation.state.title,
        header: null
    });

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.state = {
            iconName: ok,
            id_nv: params._id,
            ALL_LOADED: false,
        }
    }

    handleMessage(listMsg = []) {
        let messages = [];
        let bottomMessage = '';
        console.log(listMsg)

        for (let item of listMsg) {
            let user = {};

            item['text'] = item.NoiDung;
            item['_id'] = item['ID_TINNHAN'];
            item['createdAt'] = moment(item.NgayGui, 'YYYY-MM-DDTHH:mm:ss').toDate();
            user['_id'] = item['Loai'];
            if (item['AnhDaiDien']) {
                user['avatar'] = URlConfig.BASE_URL_APP + item['AnhDaiDien']
            } else {
                user['avatar'] = null;
            }

            user['name'] = item['TenNhanVien'];
            item['user'] = user;
            messages.push(item)
        }
        if (listMsg[0].Loai === quanLyToNhanVien) {
            bottomMessage = "Đã gửi lúc " + Utils.getDate(listMsg[0].NgayGui)
        } else {
            bottomMessage = "Đã nhận lúc " + Utils.getDate(listMsg[0].NgayGui)
        }
        this.setState({
            messages: messages,
            bottomMessage: bottomMessage,
            ALL_LOADED: true
        })
    }

    componentWillMount() {
        const {params} = this.props.navigation.state;
        this.handleMessage(params.data);
    }

    componentDidMount() {
        const {params} = this.props.navigation.state;
        fetch(URlConfig.getLinkReadMessage(params.data[0].ID_TINNHAN))
            .then((response) => (response.json()))
            .then((responseJson) => {
                    console.log('doc tin nhan ok')
                }
            ).catch((e) => {
            Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại' + String(e));
        })
    }

    onSend(messages = []) {
        const {params} = this.props.navigation.state;
        this.setState({
            iconName: onSend,
            bottomMessage: "Đang gửi"
        });
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
        console.log('truoc gui', this.state.id_nv);
        fetch(URlConfig.getLinkSendMessage(this.state.id_nv, '', messages[0].text))
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    console.log(URlConfig.getLinkSendMessage(this.state.id_nv, '', messages[0].text));
                    this.setState({
                        bottomMessage: "Đã gửi lúc " + Utils.getDate(params.data[0].NgayGui),
                        iconName: ok
                    });
                } else {
                    this.setState({
                        iconName: failed
                    });
                    Toast.show('Có lỗi xảy ra, vui lòng liên hệ quản trị viên!');
                }
                }
            ).catch((e) => {
            Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại');
            this.setState({
                iconName: failed
            });
        })
    }

    chatListOrIndicator() {
        if (!this.state.ALL_LOADED) {
            return (
                <ActivityIndicator
                    animating={true}
                    style={styles.indicator}
                    size="large"/>

            )
        }
        return (
            <GiftedChat
                keyboardDismissMode="on-drag"
                isLoadingEarlier={true}
                style={{flex: 1}}
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                user={{
                    _id: quanLyToNhanVien,
                }}
                renderSend={(props) => {
                    return (
                        <Send
                            {...props}
                            containerStyle={{alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}
                        >
                            <Icon name={'send'} color={"blue"} size={24} type={this}/>
                        </Send>
                    );
                }}
                renderFooter={() => {
                    return (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{flexDirection: 'row', alignSelf: 'flex-end'}}
                            onPress={() => {
                                if (this.state.iconName === failed) {

                                }
                            }}
                        >
                            <Icon name={this.state.iconName} size={24} color={'gray'} type={"ionicon"}/>
                            <Text style={{
                                alignSelf: 'flex-end',
                                margin: 8,
                                fontSize: 11
                            }}>{this.state.bottomMessage}</Text>
                        </TouchableOpacity>
                    )
                }}
                locale={'vi'}
                dateFormat={"LLL"}
                placeholder={"Nhập tin nhắn . . ."}
            />

        )
    }

    render() {
        console.log(this.state.messages);
        const {params} = this.props.navigation.state;
        return (
            <View style={{flex: 1}}>
                <LinearGradient colors={['#1b60ad', '#3dc4ea']} style={styles.titleStyle}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                      style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon type={'ionicon'} style={styles.iconStyle} size={24} color="white"
                              name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 20,
                            color: 'white',
                            alignSelf: 'center',
                            backgroundColor: 'transparent'
                        }}>{params.title}</Text>
                    <View/>
                </LinearGradient>
                {this.chatListOrIndicator()}
            </View>
        )
    }
}

const
    styles = StyleSheet.create({
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