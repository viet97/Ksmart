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
    ActivityIndicator
} from 'react-native';
import Image from 'react-native-image-progress';
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'

import Color from '../configs/color'
import URlConfig from "../configs/url";
import Search from "react-native-search-box";
var NUMBER_ROW_RENDER = 10
ALL_LOADED = false
var SEARCH_STRING = '';

var {height} = Dimensions.get('window');
export default class CustomerScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSearching: false,
            refreshing: false,
            dataSearch: [],
            dataFull: [],
            dataRender: null,
            onEndReach: true,
            dataRender: []
        }

    }

    renderFooter = () => {
        console.log("Footer")
        if (ALL_LOADED || this.state.isSearching) return null
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

    refreshData() {
        ALL_LOADED = false
        NUMBER_ROW_RENDER = 10
        fetch(URlConfig.getCustomerLink())
            .then((response) => (response.json()))
            .then((responseJson) => {
                    console.log(responseJson)
                    if (responseJson.status) {
                        this.setState({dataFull: responseJson.data}, function () {
                            console.log(this.state.dataFull)
                            this.setState({
                                dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER),
                                dataSearch: this.state.dataFull.slice(0, NUMBER_ROW_RENDER)
                            }, function () {
                                console.log(this.state.dataRender)
                            })
                            NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
                        })
                    }
                }
            )
    }


    loadMoreData() {
        if (!this.state.onEndReach) {
            console.log("LOADMORE")
            this.setState({onEndReach: true})
            this.setState({
                dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER + 10),
                dataSearch: this.state.dataFull.slice(0, NUMBER_ROW_RENDER + 10)
            })
            NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
            if (NUMBER_ROW_RENDER > this.state.dataFull.length - 10) ALL_LOADED = true
        }
    }

    flatListorIndicator() {

        if (!this.state.dataRender) {
            return (
                <View style={{backgroundColor: Color.itemListViewColor, flex: 9}}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"/>
                </View>)
        } else
            return (
                <View style={{backgroundColor: Color.backGroundFlatList, flex: 9}}>
                    <FlatList
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.refreshData()
                        }}
                        ListFooterComponent={this.renderFooter}
                        ref="listview"
                        onEndReachedThreshold={0.2}
                        onEndReached={() => {
                            this.loadMoreData()
                        }}
                        onMomentumScrollBegin={() => {
                            this.setState({onEndReach: false})
                        }}
                        extraData={this.state.dataRender}
                        data={this.state.dataRender}
                        renderItem={({item}) =>
                            <TouchableOpacity
                                onPress={() => this.props.callback(item.KinhDo, item.ViDo, 'Customer', 'Địa chỉ khách hàng')}>
                                <View style={{
                                    marginTop: 4, marginBottom: 4, marginLeft: 8, marginRight: 8,
                                    backgroundColor: Color.backGroundItemFlatList,
                                    borderTopColor: '#227878'
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginLeft: 8,
                                        marginTop: 8,
                                        marginRight: 8,
                                        marginBottom: 4
                                    }}>
                                        <Icon size={24} color="red" name="home"/>
                                        <Text style={{
                                            marginLeft: 8,
                                            fontSize: 18,
                                            fontWeight: "bold"
                                        }}>{item.TenCuaHang}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginLeft: 8,
                                        marginTop: 4,
                                        marginRight: 8,
                                        marginBottom: 4
                                    }}>
                                        <Icon1 size={24} color="black" name="people-outline"/>
                                        <Text style={{marginLeft: 8}}>{item.tennhomkhachhang}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginLeft: 8,
                                        marginTop: 4,
                                        marginRight: 8,
                                        marginBottom: 4
                                    }}>
                                        <Icon size={24} color="white" name="location-pin"/>
                                        <Text style={{marginLeft: 8}}>{item.DiaChi}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
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
            var arr = []
            var a = text.toLowerCase()
            SEARCH_STRING = a
            console.log(a)
            if (a.length === 0) this.setState({dataRender: this.state.dataSearch})
            else
                for (var item in this.state.dataSearch) {
                    if (a !== SEARCH_STRING) return
                    console.log(this.state.dataSearch[item])
                    if (this.state.dataSearch[item].TenCuaHang.toLowerCase().search(a) !== -1) {
                        console.log(this.state.dataSearch[item])
                        console.log(this.state.dataSearch[item])
                        arr.push(this.state.dataSearch[item])
                        console.log(arr)
                    }
                }

            if (a.length !== 0) this.setState({dataRender: arr})
            else this.setState({isSearching: false})
        });
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: Color.backGroundFlatList}}>
                <View style={styles.titleStyle}>
                    <TouchableOpacity style={styles.iconStyle} onPress={() => this.props.backToHome()}>
                        <Icon2 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>Thông tin khách hàng</Text>
                    <View style={{backgroundColor: Color.backgroundNewFeed, width: 35, height: 35}}/>
                </View>


                <View style={{
                    marginLeft: 8,
                    marginTop: 8,
                    marginBottom: 4,
                    marginTop: 4,
                    marginRight: 4,
                    backgroundColor: Color.backgroundNewFeed
                }}>
                    <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>Tổng số khách hàng
                        : {this.state.dataFull.length}</Text>
                </View>
                <View style={{
                    marginLeft: 8,
                    marginTop: 8,
                    marginBottom: 4,
                    marginTop: 4,
                    marginRight: 4
                }}>
                    <Search
                        ref="search_box"
                        onChangeText={(text) => this.onChangeText(text)}
                        onCancel={() => this.onCancel()}
                    />
                </View>
                <TouchableOpacity onPress={() => this.props.backToHome()}
                                  style={{width: 50, height: 50, position: 'absolute'}}/>
                {this.flatListorIndicator()}

            </View>
        )
    }

    onCancel() {
        return new Promise((resolve, reject) => {
            resolve();
            console.log("onCancle")
            SEARCH_STRING = ''
            this.setState({dataRender: this.state.dataSearch, isSearching: false})
        });
    }

    componentDidMount() {
        ALL_LOADED = false
        fetch(URlConfig.getCustomerLink())
            .then((response) => (response.json()))
            .then((responseJson) => {
                    console.log(responseJson)
                    if (responseJson.status) {
                        this.setState({dataFull: responseJson.data}, function () {
                            console.log(this.state.dataFull)
                            this.setState({
                                dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER),
                                dataSearch: this.state.dataFull.slice(0, NUMBER_ROW_RENDER)
                            })
                            NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
                        })
                    }
                }
            )
    }
}
const styles = StyleSheet.create({
    titleStyle: {
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
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 8,
        paddingBottom: 8
    }, iconStyle: {
        alignSelf: 'center',
        width: 35,
        height: 35,
        backgroundColor: "transparent",
        marginLeft: 16
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