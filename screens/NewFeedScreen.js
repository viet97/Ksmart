import {
    AppRegistry,
    Text,
    View,
    Button, ListView, StyleSheet, StatusBar,
    TouchableOpacity, ActivityIndicator,
    Dimensions,
    FlatList,
    Platform, Image
} from 'react-native';
import Search from 'react-native-search-box';
// import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import React from 'react';
import Color from '../configs/color'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import URlConfig from "../configs/url";
import Toast from 'react-native-simple-toast'
var SEARCH_STRING = '';
var {width, height} = Dimensions.get('window');
var ALL_LOADED = false
let PAGE = 1
export default class NewFeedScreen extends React.Component {


    constructor(props) {
        super(props)
        this.state = ({
            isSearching: false,
            refreshing: false,
            dataFull: [],
            dataRender: null,
            onEndReach: true,
            isEndList: false,
        })
    }

    getDataFromSv() {
        ALL_LOADED = false
        this.setState({isEndList: false, dataRender: null})
        PAGE = 1
        let url = URlConfig.getNewFeedLink(PAGE, SEARCH_STRING)
        fetch(url)
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status)
                    this.setState({
                        dataFull: responseJson.data,
                        isEndList: responseJson.endlist,
                        dataRender: responseJson.data
                    }, function () {
                        if (this.state.isEndList) {
                            ALL_LOADED = true
                            this.forceUpdate()
                        }
                    })
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }

    loadMoreDataFromSv() {
        PAGE = PAGE + 1
        let url = URlConfig.getNewFeedLink(PAGE, SEARCH_STRING)
        console.log(url)
        fetch(url)
            .then((response) => (response.json()))
            .then((responseJson) => {
                let arr = this.state.dataFull
                arr = arr.concat(responseJson.data)
                this.setState({
                    dataFull: arr,
                    isEndList: responseJson.endlist,
                    dataRender: arr
                }, function () {
                    if (this.state.isEndList) {
                        ALL_LOADED = true
                        this.forceUpdate()
                    }
                })
            })
            .catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }

    getImage(urlImage) {
        console.log(urlImage)
        if (urlImage === undefined || urlImage.length === 0) {
            return (

                <Image
                    source={require('../images/bglogin.jpg')}
                    // indicator={ProgressBar.Pie}
                    style={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
            );
        } else {
            return (
                <Image
                    style={{margin: 8, width: 60, height: 60, borderRadius: 30}}
                    source={{uri: 'http://jav.ksmart.vn' + urlImage}}
                    // indicator={ProgressBar.Pie}
                />
            );
        }
    }

    loadMoreData() {
        if (!this.state.onEndReach) {
            this.setState({onEndReach: true})
            if (!this.state.isEndList) this.loadMoreDataFromSv()
        }
    }

    refreshData() {
        this.getDataFromSv()
    }

    renderFooter = () => {

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

    flatListorIndicator() {

        if (!this.state.dataRender) {
            return (
                <View style={{flex: 9}}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"/>
                </View>)
        } else if (this.state.dataFull.length === 0 && this.state.isEndList)
            return (    <View style={{flex: 9}}>
                <Text style={{alignSelf: 'center', textAlign: 'center', fontSize: 20, backgroundColor: 'transparent'}}>Không
                    có dữ liệu</Text>

            </View>)

        return (
            <View style={{flex: 9}}>

                <FlatList
                    ListFooterComponent={this.renderFooter}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.refreshData()
                    }}
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
                        <View style={{
                            margin: 4,
                        }}>
                            <Image source={require('../images/bg1.png')}
                                   style={{
                                       width: width - 8,
                                       height: height / 6
                                   }}>
                                <Text style={{
                                    textAlign: 'right',
                                    fontSize: 12,
                                    backgroundColor: 'transparent'
                                }}>Cập nhật lần cuối: {item.thoigian_hienthi}</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{justifyContent: 'center'}}>
                                        {this.getImage(item.anhdaidien)}
                                    </View>
                                    <View style={{flex: 4, margin: 8, justifyContent: 'center'}}>
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: 18,
                                                backgroundColor: 'transparent'
                                            }}>{item.tennhanvien}</Text>
                                        <Text style={{
                                            fontSize: 13,
                                            backgroundColor: 'transparent'
                                        }}> {item.tenloai}</Text>
                                    </View>
                                </View>
                            </Image>
                        </View>
                    }
                />
            </View>)
    }

    onChangeText(text) {
        this.setState({isSearching: true})
        return new Promise((resolve, reject) => {
            resolve();

            var arr = []
            var a = text.toLowerCase()
            SEARCH_STRING = a
            this.getDataFromSv()
        });
    }

    onCancel() {
        return new Promise((resolve, reject) => {
            resolve();
            console.log("onCancle")
            if (SEARCH_STRING.length !== 0) {
                SEARCH_STRING = ''
                this.getOrderListFromServer(this.state.filtDialog.dateFrom, this.state.filtDialog.dateTo)
            }
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
                    <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Hoạt
                        động</Text>
                    <View style={{backgroundColor: 'transparent', width: 35, height: 35}}></View>
                </View>

                <TouchableOpacity onPress={() => this.props.backToHome()}
                                  style={{width: 50, height: 50, position: 'absolute'}}/>
                <View style={{width: width}}>
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

    componentDidMount() {
        this.getDataFromSv()
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
        width: 24,
        height: 24,
        backgroundColor: "transparent",
        paddingLeft: 8,
        paddingTop: (Platform.OS === 'ios') ? 4 : 0
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