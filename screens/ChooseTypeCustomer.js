import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    Button, ListView, StyleSheet, StatusBar,
    TouchableOpacity,
    Dimensions,
    BackHandler,
    FlatList,
    ActivityIndicator,
    Platform
} from 'react-native';
import MapListScreen from "./MapListScreen";
import Image from 'react-native-image-progress';
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
import TabNavigator from 'react-native-tab-navigator';
import Color from '../configs/color'
import myStyles from '../configs/myStyles'
import ChooseTypeItem from "../components/ChooseTypeItem";
import URlConfig from "../configs/url";
import Toast from "react-native-simple-toast";
import LinearGradient from "react-native-linear-gradient";

let {width, height} = Dimensions.get('window')
export default class ChooseTypeCustomer extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            data: [],
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>

                <LinearGradient colors={['#1b60ad', '#3dc4ea']} style={styles.titleStyle}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                      style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon2 style={styles.iconStyle} size={24} color="white"
                               name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 20,
                            color: 'white',
                            alignSelf: 'center',
                            backgroundColor: 'transparent'
                        }}>Khách hàng</Text>
                    <View style={{backgroundColor: 'transparent', width: 35, height: 35}}/>
                </LinearGradient>
                {this.flatListorIndicator()}
            </View>
        )
    }

    flatListorIndicator() {
        const {navigate} = this.props.navigation;
        if (!this.state.data) {
            return (
                <View style={{flex: 9}}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"/>
                </View>)
        }
        return (
            <View style={{flex: 9}}>
                <FlatList
                    onRefresh={() => this.getDataFromSv()}
                    refreshing={this.state.refreshing}
                    numColumns={2}
                    keyboardDismissMode="on-drag"
                    ref="listview"
                    extraData={this.state.data}
                    data={this.state.data}
                    renderItem={({item}) =>
                        <ChooseTypeItem
                            data={item}
                            goToDetail={() => navigate('Customer', {id: item.trangthai})}
                        />
                    }
                />

            </View>)
    }

    getDataFromSv() {
        this.setState({data: null})
        console.log(URlConfig.getLinkSoKhachHang())
        fetch(URlConfig.getLinkSoKhachHang())
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    var arr = []
                    for (let i in responseJson.danhsach) {
                        let obj = {
                            tongso: responseJson.danhsach[i].TongKhachHang,
                            trangthai: responseJson.danhsach[i].ID_LoaiKhachHang,
                            tenloai: responseJson.danhsach[i].TenLoaiKhachHang
                        }
                        arr.push(obj);
                    }
                    this.setState({data: arr})
                }
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }

    componentDidMount() {
        this.getDataFromSv()
    }
}
const styles = StyleSheet.create({
    view1: {
        flexDirection: 'row'
    },
    titleStyle: {
        paddingTop: Platform.OS === 'ios' ? 16 : 0,
        flex: 1,
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