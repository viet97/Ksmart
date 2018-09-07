import React, {Component} from 'react'
import DatePicker from 'react-native-datepicker'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Entypo'

import ultils from "../configs/ultils";
import {shadowProps} from "../configs/shadow";

let {width, height} = Dimensions.get('window');
export default class DoanhThuReportItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            height: 0
        }
    }

    render() {
        let item = this.props.data;
        return (

            <TouchableOpacity
                onPress={() => this.props.goToDetail()}
                onLayout={(e) => {
                    var {x, y, width, height} = e.nativeEvent.layout;
                    this.setState({height: height})
                }}
                style={{
                    marginTop:2,
                    backgroundColor: '#f7f7f7',
                    fontSize: 20, ...shadowProps,
                }}>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 8,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Icon1 style={{backgroundColor: 'transparent'}} size={24} color="gray"
                           name="ios-people"/>
                    <Text style={{

                        marginLeft: 8,
                        fontSize: 18,
                        fontWeight: "bold"
                        , backgroundColor: 'transparent'
                    }}>{item.tenkhachhang}</Text>
                </View>
                <View style={{
                    width: width - 36,
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Icon2 style={{backgroundColor: 'transparent'}} size={24} color="red" name="location-pin"/>
                    <Text style={{marginLeft: 8, backgroundColor: 'transparent'}}>{item.diachikhachhang}</Text>

                </View>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Icon2 style={{backgroundColor: 'transparent'}} size={24} color="yellow" name="news"/>
                    <Text style={{marginLeft: 8, backgroundColor: 'transparent'}}>{item.sodonhang}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Icon size={24} style={{backgroundColor: 'transparent'}} color="green" name="attach-money"/>
                    <Text style={{
                        marginLeft: 8,
                        backgroundColor: 'transparent'
                    }}>{ultils.getMoney(item.tongtien, 2)}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}