import {
    AppRegistry,
    Text,
    View,
    Button, ListView, StyleSheet, StatusBar,
    TouchableOpacity,
    Dimensions,
    BackHandler
} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import URlConfig from "../configs/url";
import Icon2 from 'react-native-vector-icons/Entypo'
import React from 'react';
import Color from '../configs/color'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import TabNavigator from 'react-native-tab-navigator';
import MapListScreen from "./MapListScreen";


var {height} = Dimensions.get('window');
var GiftedListView = require('react-native-gifted-listview');
export default class ListNhanVienScreen extends React.Component {
    onSwipeRight(gestureState) {
        console.log("onSwipeRight")
        this.setState({myText: 'You swiped right!'});
        this.props.clickMenu()
    }

    constructor(props) {
        super(props)
        this.state = ({
            selectedTab:'ListNhanVien',
            kinhdo:0,
            vido:0,
            arr: [],
            index: 0,
            waiting: false,
            myText: 'I\'m ready to get swiped!',
            gestureName: 'none',
        })
    }

    _onFetch(page = 1, callback, options) {

        var dem = 0;
        if (page === 1) {
            this.setState({index: 0})
            fetch(URlConfig.getListNhanVienLink())
                .then((response) => (response.json()))
                .then((responseJson) => {
                    this.setState({arr: responseJson.data}, function () {
                            setTimeout(() => {
                                var a = this.state.arr;
                                var rows = [];
                                while (dem < 7) {
                                    dem++;
                                    if (a[this.state.index] !== undefined) {
                                        rows.push(a[this.state.index]);
                                        this.setState({index: this.state.index + 1});
                                    }
                                }
                                if (this.state.index === this.state.arr.length) {
                                    callback(rows, {
                                        allLoaded: true, // the end of the list is reached
                                    });
                                } else {
                                    callback(rows);
                                }
                            }, 1000);
                        }
                    );
                }).catch((e) => {
                console.log("12312312321" + e)
            })
        }
        else {
            setTimeout(() => {
                var a = this.state.arr;
                var rows = [];
                while (dem < 7) {
                    dem++;
                    if (a[this.state.index] !== undefined) {
                        rows.push(a[this.state.index]);
                        this.setState({index: this.state.index + 1});
                    }
                }
                if (this.state.index === this.state.arr.length) {
                    callback(rows, {
                        allLoaded: true, // the end of the list is reached
                    });
                } else {
                    callback(rows);
                }
            }, 1000);
        }

    }

    getImage(url) {
        if (url.length === 0) {
            return (

                <Image
                    source={require('../images/bglogin.jpg')}
                    indicator={ProgressBar.Pie}
                    style={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
            );
        } else {
            return (
                <Image

                    source={{uri: 'http://jav.ksmart.vn' + url}}
                    indicator={ProgressBar.Pie}
                    style={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
            );
        }
    }
    isOnline(dangtructuyen){
        if (dangtructuyen === 1)
        return <Icon2 size={36} color="green" name="controller-record"/>
        else if (dangtructuyen === 2) return <Icon2 size={24} color="red" name="controller-record"/>
        else if (dangtructuyen === 0) return <Icon2 size={24} color="gray" name="controller-record"/>

    }
    _renderRowView(rowData) {
        return (
            <View style={{
                height: height / 7, flex: 1,
                borderTopColor: '#227878', borderTopWidth: 1
            }}>
                <Text style={{textAlign: 'right', color: 'white', fontSize: 12}}> Cập nhật
                    lúc {rowData.thoigiancapnhat}</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={{justifyContent: 'center'}}>
                        <Image indicator={ProgressBar.Pie}
                               style={{margin: 8, width: 60, height: 60, borderRadius: 30}}
                               source={require('../images/bglogin.jpg')}/>
                    </View>
                    <View style={{flex: 4, margin: 8, justifyContent: 'center'}}>
                        <Text
                            style={{
                                fontSize: 18,
                                color: Color.itemNameListViewColor
                            }}>{rowData.tennhanvien}</Text>
                        {this.isOnline(rowData.dangtructuyen)}
                    </View>
                    <TouchableOpacity onPress={()=>{this.setState({
                        kinhdo:rowData.KinhDo,
                        vido:rowData.ViDo
                    }, function() {

                       this.props.goToMapFromListNhanVien()

                    }) }}>
                        <Icon2 size={30} color='white' name="location"/>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }


    render() {
        return (
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'ListNhanVien'}
                    title="Nhân Viên"
                    renderIcon={() =>  <Icon1 size={24} color="black" name="ios-people-outline"/>}
                    renderSelectedIcon={() => <Icon1 size={24} color="green" name="ios-people-outline"/>}
                    onPress={() => this.setState({ selectedTab: 'ListNhanVien' })}>
                    <View style={{flex: 1}}>
                        <View style={styles.titleStyle}>
                            <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                            <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>Danh sách nhân viên</Text>
                            <View style={{backgroundColor: Color.backgroundNewFeed, width: 35, height: 35}}/>
                        </View>

                        <TouchableOpacity onPress={() => this.props.backToHome()}
                                          style={{width: 50, height: 50, position: 'absolute'}}/>
                        <View style={{backgroundColor: Color.itemListViewColor, flex: 9}}>

                            <GiftedListView
                                rowView={this._renderRowView.bind(this)}
                                onFetch={this._onFetch.bind(this)}
                                firstLoader={true} // display a loader for the first fetching
                                pagination={true} // enable infinite scrolling using touch to load more
                                refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                                withSections={false} // enable sections
                                enableEmptySections={true}
                                customStyles={{
                                    paginationView: {
                                        backgroundColor: Color.itemListViewColor,
                                    },
                                }}

                                refreshableTintColor="blue"
                            />
                        </View>
                    </View>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'MapForAllLocation'}
                    title="Map"
                    renderIcon={() => <Icon2 size={24} color="black" name="location"/>}
                    renderSelectedIcon={() =><Icon2 size={24} color="green" name="location"/>}
                    onPress={() => this.setState({ selectedTab: 'MapForAllLocation' })}>
                    <MapListScreen/>
                </TabNavigator.Item>
            </TabNavigator>

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
        width: 24,
        height: 24,
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