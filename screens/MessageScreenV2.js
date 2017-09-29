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
import {GiftedChat} from "react-native-gifted-chat";

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
                    style={{flex: 1}}
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: 2,
                    }}
                    locale={'vi'}
                    dateFormat={"LLL"}
                    placeholder={"type....."}
                />
            </View>
        )
    }
}