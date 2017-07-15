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
var {height} = Dimensions.get('window');
export default class CustomerScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            onEndReach: true,
            dataRender: [],
        }

    }

    renderFooter = () => {
        console.log("Footer")
        if (ALL_LOADED || this.state.dataRender.length === 0) return null
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
    //
    // loadMoreData() {
    //     if (!this.state.onEndReach) {
    //         console.log("LOADMORE")
    //         this.setState({onEndReach: true})
    //         this.setState({dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER + 10)})
    //         NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
    //         if (NUMBER_ROW_RENDER > this.state.dataRender.length - 10) ALL_LOADED = true
    //     }
    // }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: Color.backGroundFlatList}}>
                <View style={styles.titleStyle}>
                    <TouchableOpacity onPress={() => this.props.backToHome()}>
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
                    <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>Tổng số khách hàng : 21</Text>
                </View>
                <View style={{
                    marginLeft: 8,
                    marginTop: 8,
                    marginBottom: 4,
                    marginTop: 4,
                    marginRight: 4
                }}>
                    <Search
                    />
                </View>
                <TouchableOpacity onPress={() => this.props.backToHome()}
                                  style={{width: 50, height: 50, position: 'absolute'}}/>
                <View style={{backgroundColor: Color.backGroundFlatList, flex: 9}}>

                    <FlatList
                        refreshing={this.state.refreshing}
                        ListFooterComponent={this.renderFooter}
                        ref="listview"
                        onEndReachedThreshold={0.2}
                        // onEndReached={() => {
                        //     this.loadMoreData()
                        // }}
                        onMomentumScrollBegin={() => {
                            this.setState({onEndReach: false})
                        }}
                        extraData={this.state.dataRender}
                        data={this.state.dataRender}
                        renderItem={({item}) =>
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
                                    }}>{item.tenkhachhang}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 8,
                                    marginTop: 4,
                                    marginRight: 8,
                                    marginBottom: 4
                                }}>
                                    <Icon size={24} color="white" name="location-pin"/>
                                    <Text style={{marginLeft: 8}}>{item.diachi}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 8,
                                    marginTop: 4,
                                    marginRight: 8,
                                    marginBottom: 4
                                }}>
                                    <Icon1 size={24} color="black" name="local-phone"/>
                                    <Text style={{marginLeft: 8}}>{item.sodienthoai}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginLeft: 8,
                                    marginTop: 4,
                                    marginRight: 8,
                                    marginBottom: 4
                                }}>
                                    <Icon2 size={24} color="black" name="ios-person-add-outline"/>
                                    <Text style={{marginLeft: 8}}>{item.ngaygio}</Text>
                                </View>

                            </View>
                        }
                    />
                </View>
            </View>
        )
    }

    componentDidMount() {
        var arr = [
            {
                tenkhachhang: 'Viet',
                diachi: 'so 5 duong buoi ngoc khanh',
                sodienthoai: '0967092691',
                ngaygio: '/1403/2017'
            },
            {
                tenkhachhang: 'Viet',
                diachi: 'so 5 duong buoi ngoc khanh',
                sodienthoai: '0967092691',
                ngaygio: '/1403/2017'
            },
            {
                tenkhachhang: 'Viet',
                diachi: 'so 5 duong buoi ngoc khanh',
                sodienthoai: '0967092691',
                ngaygio: '/1403/2017'
            },
            {
                tenkhachhang: 'Viet',
                diachi: 'so 5 duong buoi ngoc khanh',
                sodienthoai: '0967092691',
                ngaygio: '/1403/2017'
            },
            {
                tenkhachhang: 'Viet',
                diachi: 'so 5 duong buoi ngoc khanh',
                sodienthoai: '0967092691',
                ngaygio: '/1403/2017'
            },
            {
                tenkhachhang: 'Viet',
                diachi: 'so 5 duong buoi ngoc khanh',
                sodienthoai: '0967092691',
                ngaygio: '/1403/2017'
            },
            {
                tenkhachhang: 'Viet',
                diachi: 'so 5 duong buoi ngoc khanh',
                sodienthoai: '0967092691',
                ngaygio: '/1403/2017'
            },
            {
                tenkhachhang: 'Viet',
                diachi: 'so 5 duong buoi ngoc khanh',
                sodienthoai: '0967092691',
                ngaygio: '/1403/2017'
            },
        ]
        this.setState({dataRender: arr})
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
    }
})