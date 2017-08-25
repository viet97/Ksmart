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
import Image from 'react-native-image-progress';
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-simple-toast'
import Color from '../configs/color'
import URlConfig from "../configs/url";
import Search from "react-native-search-box";
import {StackNavigator} from 'react-navigation';
import CustomerItem from "../components/CustomerItem";
import PTRView from 'react-native-pull-to-refresh'
var ALL_LOADED = false
var SEARCH_STRING = '';
var PAGE = 0;
var {height, width} = Dimensions.get('window');
export default class CustomerScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerCount: 0,
            isSearching: false,
            refreshing: false,
            dataSearch: [],
            dataFull: [],
            dataRender: null,
            onEndReach: true,
        }

    }

    renderFooter = () => {

        console.log("Footer")
        if (ALL_LOADED) return null
        return (
            <View
                style={{
                    justifyContent: 'center',
                    borderColor: "green"
                }}
            >
                <ActivityIndicator animating={true} size="large"/>
            </View>
        );
    };

    getDataFromSv() {
        PAGE = 0;
        this.setState({dataRender: null})
        ALL_LOADED = false

        fetch(URlConfig.getCustomerLink(PAGE, SEARCH_STRING))
            .then((response) => (response.json()))
            .then((responseJson) => {
                console.log(URlConfig.getCustomerLink(PAGE, SEARCH_STRING), responseJson)
                if (responseJson.status) {
                    PAGE = responseJson.lastid
                    if (responseJson.endlist) {
                        ALL_LOADED = true
                        this.forceUpdate()
                    }
                    this.setState({
                        customerCount: responseJson.tongsoitem,
                        dataFull: responseJson.data,
                        dataRender: responseJson.data
                    })

                } else ALL_LOADED = true
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }

    refreshData() {
        this.getDataFromSv()
    }


    loadMoreData() {
        if (!this.state.onEndReach) {
            console.log("LOADMORE")
            this.setState({onEndReach: true})
            fetch(URlConfig.getCustomerLink(PAGE, SEARCH_STRING))
                .then((response) => (response.json()))
                .then((responseJson) => {
                    console.log(responseJson)
                    if (responseJson.status) {
                        if (responseJson.endlist) {
                            ALL_LOADED = true
                            this.forceUpdate()
                        }
                        PAGE = responseJson.lastid
                        var arr = this.state.dataRender.concat(responseJson.data)
                        this.setState({
                            dataRender: arr,
                            dataFull: arr
                        })

                    }
                }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))

        }
    }

    flatListorIndicator() {
        if (!this.state.dataRender) {
            return (
                <View style={{flex: 9}}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"/>
                </View>)
        } else if (this.state.dataFull.length === 0)
            return (    <View style={{flex: 9}}>
                <Text style={{alignSelf: 'center', textAlign: 'center', fontSize: 20, backgroundColor: 'transparent'}}>Không
                    có dữ liệu</Text>

            </View>)

        return (
            <View style={{flex: 9}}>

                <FlatList
                    ListFooterComponent={this.renderFooter}
                    ref="listview"
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                            this.loadMoreData()
                    }}
                    onMomentumScrollBegin={() => {
                        this.setState({onEndReach: false})
                    }}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.refreshData()}
                    extraData={this.state.dataRender}
                    data={this.state.dataRender}
                    renderItem={({item}) =>

                        <CustomerItem
                            data={item}
                            callback={() => this.props.callback(item.KinhDo, item.ViDo, 'Địa chỉ khách hàng', item)}
                        />
                    }
                />
            </View>)

    }

    onChangeText(text) {
        this.setState({isSearching: true})
        console.log("onChangeText")
        return new Promise((resolve, reject) => {
            resolve();
            console.log("promise")
            var keyword = text.toLowerCase()
            SEARCH_STRING = keyword
            this.getDataFromSv()

        });
    }

    render() {

        return (
            <View style={{flex: 1}}>
                <Image source={require('../images/bg.png')}
                       style={{position: 'absolute', top: 0}}/>
                <View style={styles.titleStyle}>
                    <Image source={require('../images/bg.png')}
                           style={{position: 'absolute'}}/>
                    <TouchableOpacity onPress={() => this.props.backToHome()}
                                      style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon2 style={styles.iconStyle} size={24} color="white"
                               name="ios-arrow-back"/></TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Thông
                        tin khách hàng</Text>
                    <View style={{width: 35, height: 35}}/>
                </View>

                <View style={{
                    marginLeft: 8,
                    marginTop: 8,
                    marginBottom: 4,
                    marginRight: 4
                }}>
                    <Text style={{fontSize: 18, color: 'white', textAlign: 'center', backgroundColor: "transparent"}}>Tổng
                        số khách hàng
                        : {this.state.customerCount}</Text>
                </View>
                <View style={{
                    marginLeft: 8,
                    marginTop: 8,
                    marginBottom: 4,
                    marginRight: 4
                }}>
                    <Search
                        ref="search_box"
                        placeholder="Tìm kiếm"
                        cancelTitle="Huỷ bỏ"
                        onChangeText={(text) => this.onChangeText(text)}
                        onCancel={() => this.onCancel()}
                    />
                </View>
                {this.flatListorIndicator()}
            </View>
        )
    }

    onCancel() {
        return new Promise((resolve, reject) => {
            resolve();
            console.log("onCancle")
            console.log("onCancle")
            if (SEARCH_STRING.length !== 0) {
                SEARCH_STRING = ''
                this.getDataFromSv()
            }
        });
    }

    componentDidMount() {
        PAGE = 0
        SEARCH_STRING = ''
        this.getDataFromSv()
    }
}
const styles = StyleSheet.create({
    titleStyle: {
        marginTop: Platform.OS === 'ios' ? 16 : 0,
        flex: 1,
        elevation: 15,
        padding: 8,
        justifyContent: 'space-between',
        flexDirection: 'row'
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
        backgroundColor: "transparent",
        marginLeft: 8,
        marginTop: (Platform.OS === 'ios') ? 4 : 0
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