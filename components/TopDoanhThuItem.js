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
    Platform,
} from "react-native";
import URlConfig from "../configs/url";
import Color from '../configs/color'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Entypo'
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import {DialogComponent, SlideAnimation} from 'react-native-dialog-component';
import Dialog from './DialogOrder'
import orderListData from '../dbcontext/orderListData'
import AtoZListView from 'react-native-atoz-listview';
import Search from 'react-native-search-box';
import Toast from 'react-native-simple-toast';
import ultils from "../configs/ultils";
import Communications from 'react-native-communications';
import {shadowProps} from "../configs/shadow";

let {width, height} = Dimensions.get('window');
export default class TopDoanhThuItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            height: 0
        }
    }

    render() {
        let item = this.props.data
        return (
            <View
                onLayout={(e) => {
                    var {x, y, width, height} = e.nativeEvent.layout;
                    this.setState({height: height})
                }}
                style={{
                    marginTop:2,
                    backgroundColor: '#f7f7f7',
                    fontSize: 20, ...shadowProps,
                }}
>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginLeft: 8,
                        marginTop: 8,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                    <View style={{flexDirection: 'row'}}>
                        <Icon1 style={{backgroundColor: 'transparent'}} size={24} color="gray"
                               name="ios-people"/>
                        <Text style={{
                            width: width - 80,
                            marginLeft: 8,
                            fontSize: 16,
                            fontWeight: "bold", backgroundColor: 'transparent'
                        }}>{item.tennhanvien}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.props.call()}>
                        <Icon3 style={{backgroundColor: 'transparent', marginRight: 4}} size={24} color="green"
                               name="phone"/>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Icon2 style={{backgroundColor: 'transparent'}} size={24} color="yellow" name="news"/>
                    <Text style={{marginLeft: 8, backgroundColor: 'transparent'}}>{item.DonHang}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 8,
                    marginTop: 4,
                    marginRight: 8,
                    marginBottom: 4
                }}>
                    <Icon style={{backgroundColor: 'transparent'}} size={24} color="green" name="attach-money"/>
                    <Text style={{
                        marginLeft: 8,
                        backgroundColor: 'transparent'
                    }}>{ultils.getMoney(item.TongTien, 2)}</Text>
                </View>
            </View>
        )
    }
}