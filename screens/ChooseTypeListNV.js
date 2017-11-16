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
import HeaderCustom from "../components/Header";

let goBack;
let {width, height} = Dimensions.get('window')
export default class ChooseTypeListNV extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            data: [],
            selectedTab: 'ListNhanVien',
        }
    }

    render() {
        return (
            <TabNavigator
                tabBarStyle={{backgroundColor: '#90CAF9'}}>
                <TabNavigator.Item
                    titleStyle={{color: 'black'}}

                    selected={this.state.selectedTab === 'ListNhanVien'}
                    title="Nhân Viên"
                    renderIcon={() => <Icon2 size={24} color="black" name="ios-people-outline"/>}
                    renderSelectedIcon={() => <Icon2 size={24} color="white" name="ios-people-outline"/>}
                    onPress={() => this.setState({selectedTab: 'ListNhanVien'})}>
                    <View style={{flex: 1}}>
                        <HeaderCustom
                            title={"Nhân viên"}
                            leftClick={() => this.props.navigation.goBack()}
                        />
                        {this.flatListorIndicator()}
                    </View>
                </TabNavigator.Item>
                <TabNavigator.Item
                    titleStyle={{color: 'black'}}
                    selected={this.state.selectedTab === 'MapForAllLocation'}
                    title="Vị trí"
                    renderIcon={() => <Icon size={24} color="black" name="location"/>}
                    renderSelectedIcon={() => <Icon size={24} color="white" name="location"/>}
                    onPress={() => this.setState({selectedTab: 'MapForAllLocation'})}>
                    <MapListScreen backToHome={() => this.setState({selectedTab: 'ListNhanVien'})}/>
                </TabNavigator.Item>
            </TabNavigator>
        )
    }

    flatListorIndicator() {
        const {navigate} = this.props.navigation
        if (!this.state.data) {
            return (
                <View style={{flex: 9}}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator} color={"green"}
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
                            goToDetail={() => navigate('ListNhanVien', {status: item.trangthai})}
                        />
                    }
                />

            </View>)
    }

    getDataFromSv() {
        this.setState({data: null});
        console.log(URlConfig.getLinkSoNhanVien(), '3333')
        fetch(URlConfig.getLinkSoNhanVien())
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    console.log(responseJson.danhsach)
                    this.setState({data: responseJson.danhsach})
                }
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }

    componentWillUnmount() {
        console.log(this.state.selectedTab)
        BackHandler.removeEventListener('hardwareBackPress', () => {
            if (this.state.selectedTab === 'ListNhanVien') {

                return false
            } else {
                this.setState({selectedTab: 'ListNhanVien'})
                return true
            }
        })
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.state.selectedTab === 'ListNhanVien') {
                console.log(this.state.selectedTab)
                return false
            } else {
                this.setState({selectedTab: 'ListNhanVien'})
                return true
            }
        })
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
