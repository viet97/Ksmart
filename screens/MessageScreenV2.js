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

export default class MessageScreenV2 extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: 'React Native',
                    },
                },
                {
                    _id: 2,
                    text: 'HIHI',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Hao LT',
                    },
                },
                {
                    _id: 3,
                    text: 'HIHI',
                    createdAt: new Date(),
                    user: {
                        _id: 3,
                        name: 'Lien NH',
                    },
                },
            ],
        });
    }

    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <GiftedChat
                    isLoadingEarlier={true}
                    style={{flex: 1}}
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: 2,
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
                        return (<Text style={{alignSelf: 'flex-end', margin: 8}}>✔ Đã xem lúc 13:13</Text>)
                    }}
                    locale={'vi'}
                    dateFormat={"LLL"}
                    placeholder={"type....."}
                />
            </View>
        )
    }
}