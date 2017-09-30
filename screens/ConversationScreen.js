import {
    AppRegistry,
    Text,
    View,
    Button, FlatList, Image, StyleSheet, StatusBar,
    TouchableOpacity, Platform
} from 'react-native';
import Icon1 from 'react-native-vector-icons/Ionicons'
import React from 'react';

const moment = require('moment');
import {dateOfWeek} from "../configs/data";

export default class ConversationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    img: 'https://randomuser.me/api/portraits/men/90.jpg',
                    name: 'Fishing Team',
                    date: "2017-09-29 12:24:06",
                    lastmsg: 'dmcc'
                },
                {
                    img: 'https://randomuser.me/api/portraits/men/93.jpg',
                    name: 'Toàn Trương',
                    date: "2017-09-28 12:24:06",
                    lastmsg: 'dm'
                },
                {
                    img: 'https://randomuser.me/api/portraits/men/94.jpg',
                    name: 'Toàn Trương',
                    date: "2017-09-20 12:24:06",
                    lastmsg: 'hihi do ngok'
                }
            ]
        }

    }

    render() {

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <FlatList
                    keyboardDismissMode="on-drag"
                    data={this.state.data}
                    renderItem={({item}) =>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{
                                flexDirection: 'row',
                                justifyContent: "space-between",
                                marginTop: 16,
                                marginLeft: 16,
                                flex: 1
                            }}
                            onPress={() => {

                            }}>
                            <Image source={{uri: item.img}} style={{width: 40, height: 40, borderRadius: 20}}/>
                            <View style={{flex: 1, marginRight: 4, marginLeft: 8}}>
                                <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}>
                                    <Text style={{fontSize: 16}}>{item.name}</Text>
                                    <Text style={{fontSize: 14}}>{this.getTimeString(item.date)}</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    marginTop: 4
                                }}>
                                    <Text style={{fontSize: 16}}>{item.lastmsg}</Text>
                                    <Image source={{uri: item.img}} style={{width: 15, height: 15, borderRadius: 7.5}}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }/>
            </View>
        )

    }

    getTimeString(strDate, format = 'YYYY-MM-DD HH:mm:ss') {
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