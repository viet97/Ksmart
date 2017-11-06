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
    Platform,
    ScrollView
} from 'react-native';
import Image from 'react-native-image-progress';
import Icon2 from 'react-native-vector-icons/Ionicons'
import ChooseTypeItem from "../components/ChooseTypeItem";
import URlConfig from "../configs/url";
import LinearGradient from "react-native-linear-gradient";
import HeaderCustom from "../components/Header";
import {NavigationActions} from "react-navigation";

let {width, height} = Dimensions.get('window')
export default class ChooseTypeNew extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            refreshing: false,
        }
    }

    flatListorIndicator() {
        const {navigate} = this.props.navigation
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
                            goToDetail={() => {
                                const resetAction = NavigationActions.reset({
                                    index: 3,
                                    actions: [
                                        NavigationActions.navigate({routeName: 'Login'}),
                                        NavigationActions.navigate({routeName: 'Home'}),
                                        NavigationActions.navigate({routeName: 'ChooseTypeNewFeed'}),
                                        NavigationActions.navigate({
                                            routeName: 'NewFeed',
                                            params: {status: item.trangthai}
                                        }),
                                    ]
                                });
                                this.props.navigation.dispatch(resetAction);
                            }}
                        />
                    }
                />

            </View>)
    }

    render() {
        return (
            <View style={{flex: 1}}>

                <HeaderCustom
                    title={"Hoạt động"}
                    leftClick={() => this.props.navigation.goBack()}
                />
                {this.flatListorIndicator()}
            </View>
        )
    }

    ondateChange(from, to) {
        this.setState({dataRender: null})
        var dFrom = String(from);
        var dTo = String(to);
        dFrom.replace('/', '-');
        dTo.replace('/', '-');
        this.setState({dateFrom: dFrom, dateTo: dTo}, function () {
            //keo lai data tư sv xuống
        })
    }

    getDataFromSv() {
        this.setState({data: null})
        fetch(URlConfig.getLinkSoNewFeed())
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    this.setState({data: responseJson.danhsach})
                    console.log(responseJson.danhsach)
                }
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }

    componentDidMount() {
        this.getDataFromSv()
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