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

const moment = require('moment');
export default class DetailMessageScreenV2 extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: navigation.state.title
    });
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let messages = [];
        let bottomMessage = '';

        const {params} = this.props.navigation.state;
        console.log('iddddd', params._id)
        for (let item of params.data) {
            let user = {};

            item['text'] = item.NoiDung;
            item['_id'] = item['ID_TINNHAN'];
            item['createdAt'] = moment(item.NgayGui, 'YYYY-MM-DDTHH:mm:ss').toDate();
            user['_id'] = item['ID_NHANVIEN'];
            if (item['AnhDaiDien']) {
                user['avatar'] = URlConfig.BASE_URL_APP + item['AnhDaiDien']
            } else {
                user['avatar'] = null;
            }

            user['name'] = item['TenNhanVien'];
            item['user'] = user;
            messages.push(item)
        }
        bottomMessage = "Đã gửi lúc " + Utils.getDate(params.data[0].NgayGui)
        this.setState({
            messages: messages,
            id_nv: params._id,
            bottomMessage: bottomMessage
        })
    }

    onSend(messages = []) {
        console.log(messages);
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
        console.log('truoc gui', this.state.id_nv)
        fetch(URlConfig.getLinkSendMessage(this.state.id_nv, '', messages[0].text))
            .then((response) => (response.json()))
            .then((responseJson) => {
                    console.log(responseJson)
                }
            ).catch((e) => {
            Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại' + e)
        })

    }

    render() {
        console.log(this.state.messages);
        return (
            <View style={{flex: 1}}>
                <GiftedChat
                    isLoadingEarlier={true}
                    style={{flex: 1}}
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: this.state.id_nv,
                    }}
                    renderSend={(props) => {
                        return (
                            <Send
                                {...props}
                                containerStyle={{alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}
                            >
                                <Icon name={'send'} color={"blue"} size={24}/>
                            </Send>
                        );
                    }}
                    renderFooter={() => {
                        return (
                            <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                                <Icon name={'ios-checkmark-outline'} size={24} color={'gray'} type={"ionicon"}/>
                                <Text style={{
                                    alignSelf: 'flex-end',
                                    margin: 8,
                                    fontSize: 11
                                }}>{this.state.bottomMessage}</Text>
                            </View>
                        )
                    }}
                    locale={'vi'}
                    dateFormat={"LLL"}
                    placeholder={"Nhập tin nhắn . . ."}
                />
            </View>
        )
    }
}