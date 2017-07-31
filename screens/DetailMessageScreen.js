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
    Platform
} from "react-native";
import URlConfig from "../configs/url";
import Color from '../configs/color'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Entypo'
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import {DialogComponent, SlideAnimation} from 'react-native-dialog-component';
import Dialog from '../components/Dialog'
import orderListData from '../dbcontext/orderListData'
import AtoZListView from 'react-native-atoz-listview';
import Search from 'react-native-search-box';
var {height, width} = Dimensions.get('window');
var GiftedListView = require('react-native-gifted-listview');
export default class DetailMessageScreen extends Component {
    render() {
        return (
            <View style={{flex: 1}}>

                <View style={styles.titleStyle}>
                    <TouchableOpacity onPress={() => this.props.backToMessage()}
                                      style={styles.iconStyle}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>Nội Dung Tin Nhắn</Text>
                    <View style={{backgroundColor: 'transparent', width: 35, height: 35}}/>
                </View>
                <TouchableOpacity onPress={() => this.props.backToMessage()}
                                  style={{
                                      width: 50,
                                      height: 50,
                                      position: 'absolute',
                                      left: 16,
                                      top: 0,
                                      right: 0,
                                      bottom: 0
                                  }}/>
                <View style={{backgroundColor: Color.backGroundFlatList, flex: 9}}>
                    <View style={{
                        width: width,
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginRight: 8,
                        marginTop: 8,
                        marginBottom: 4
                    }}>
                        <Text>Người gửi: </Text>
                        <Text style={{marginLeft: 4}}>{this.props.nguoigui}</Text>
                    </View>
                    <View style={{width: width, flexDirection: 'row', marginRight: 8, marginLeft: 8}}>
                        <Text>Thời gian: </Text>
                        <Text style={{marginLeft: 4}}>{this.props.thoigian}</Text>
                    </View>
                    <Text style={{margin: 8}}>Nội Dung</Text>
                    <View style={{flex: 1, backgroundColor: 'white', marginLeft: 8, marginRight: 8}}>
                        <Text style={{margin: 4}}>{this.props.noidung}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    indicator: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    },
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
        borderBottomWidth: 1,
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
        marginLeft: 8,
        marginTop: (Platform.OS === 'ios') ? 8 : 0
    },
    textStyle: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent'
    },
    titleIconsMenu: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        fontFamily: 'Al Nile'
    }
})
