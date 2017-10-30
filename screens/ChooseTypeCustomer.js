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
import Color, {setColorCustomer} from '../configs/color'
import myStyles from '../configs/myStyles'
import ChooseTypeItem from "../components/ChooseTypeItem";
import URlConfig from "../configs/url";
import Toast from "react-native-simple-toast";
import LinearGradient from "react-native-linear-gradient";
import {setCustomer, setTypeCustomer} from "../configs/customer";
import HeaderCustom from "../components/Header";

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
            mamau: [],
        }
        this.getDataFromSv.bind(this)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <HeaderCustom title={"Khách hàng"} leftClick={() => this.props.navigation.goBack()}/>
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
                            goToDetail={() => navigate('Customer', {id: item.trangthai, mamau: this.state.mamau})}
                        />

                    }
                />

            </View>)
    }

    getDataFromSv() {
        this.setState({data: null})
        let arrMaMau = []
        arrMaMau[0] = '#f7f7f7'
        console.log(URlConfig.getLinkSoKhachHang())
        fetch(URlConfig.getLinkSoKhachHang())
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    setTypeCustomer(responseJson.danhsach)
                    var arr = []
                    for (let i in responseJson.danhsach) {
                        if (responseJson.danhsach[i].MaMau !== null) {
                            arrMaMau[responseJson.danhsach[i].ID_LoaiKhachHang] = '#' + responseJson.danhsach[i].MaMau
                        }
                        let obj = {
                            tongso: responseJson.danhsach[i].TongKhachHang,
                            trangthai: responseJson.danhsach[i].ID_LoaiKhachHang,
                            tenloai: responseJson.danhsach[i].TenLoaiKhachHang,
                        }
                        setCustomer(responseJson.danhsach[i].ID_LoaiKhachHang, responseJson.danhsach[i].TenLoaiKhachHang, responseJson.danhsach[i].MaMau);
                        arr.push(obj);
                    }
                    this.setState({data: arr, mamau: arrMaMau})
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