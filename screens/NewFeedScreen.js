import {
    AppRegistry,
    Text,
    View,
    Button, ListView, StyleSheet, StatusBar,
    TouchableOpacity,
    Dimensions,
    FlatList
} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import React from 'react';
import Color from '../configs/color'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import URlConfig from "../configs/url";
var {height} = Dimensions.get('window');
var GiftedListView = require('react-native-gifted-listview');
var NUMBER_ROW_RENDER = 10
export default class NewFeedScreen extends React.Component {
    onSwipeRight(gestureState) {
        console.log("onSwipeRight")
        this.setState({myText: 'You swiped right!'});
        this.props.clickMenu()
    }

    constructor(props) {
        super(props)
        this.state = ({
            refreshing: false,
            dataFull: [],
            dataRender: [],
            onEndReach: true,
            waiting: false,
            myText: 'I\'m ready to get swiped!',
            gestureName: 'none',
        })
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

    renderRow(rowData) {
        return (
            <View style={{
                height: height / 7, flex: 1,
                borderTopColor: '#227878', borderTopWidth: 1
            }}>
                <Text style={{textAlign: 'right', color: 'white', fontSize: 12}}> {rowData.thoigian_hienthi}</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={{justifyContent: 'center'}}>
                        {this.getImage(rowData.anhdaidien)}
                    </View>
                    <View style={{flex: 4, margin: 8, justifyContent: 'center'}}>
                        <Text
                            style={{
                                fontSize: 18,
                                color: Color.itemNameListViewColor
                            }}>{rowData.tennhanvien}</Text>
                        <Text style={{fontSize: 13, color: 'white'}}> {rowData.tenloai}</Text>
                    </View>
                </View>
            </View>
        );

    }

    loadMoreData() {
        if (!this.state.onEndReach) {
            this.setState({onEndReach: true})
            this.setState({dataRender: this.state.dataFull.slice(NUMBER_ROW_RENDER, NUMBER_ROW_RENDER + 10)})
            NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
        }
    }

    refreshData() {
        NUMBER_ROW_RENDER = 10
        fetch(URlConfig.getNewFeedLink())
            .then((response) => (response.json()))
            .then((responseJson) => {
                    console.log(responseJson)
                    if (responseJson.status) {
                        this.setState({dataFull: responseJson.data}, function () {
                            console.log(this.state.dataFull)
                            this.setState({dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER)})
                            NUMBER_ROW_RENDER = NUMBER_ROW_RENDER + 10
                        })
                    }
                }
            )
    }

    render() {
        return (
            <GestureRecognizer
                onSwipeRight={(state) => this.onSwipeRight(state)}
                style={{flex: 1}}
            >
                <View style={{flex: 1}}>
                    <View style={styles.titleStyle}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                        <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>NewFeed</Text>
                        <View style={{backgroundColor: Color.backgroundNewFeed, width: 35, height: 35}}></View>
                    </View>

                    <TouchableOpacity onPress={() => this.props.backToHome()}
                                      style={{width: 50, height: 50, position: 'absolute'}}/>
                    <View style={{backgroundColor: Color.itemListViewColor, flex: 9}}>

                        <FlatList
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
                            renderItem={({item}) => {
                                this.renderRow(item)
                            }
                            }
                        />
                    </View>
                </View>
            </GestureRecognizer>

        )
    }

    componentDidMount() {
        fetch(URlConfig.getNewFeedLink())
            .then((response) => (response.json()))
            .then((responseJson) => {
                    console.log(responseJson)
                    if (responseJson.status) {
                        this.setState({dataFull: responseJson.data}, function () {
                            console.log(this.state.dataFull)
                            this.setState({dataRender: this.state.dataFull.slice(0, NUMBER_ROW_RENDER)})
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