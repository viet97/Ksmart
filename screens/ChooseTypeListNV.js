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
                    titleStyle={{color:'black'}}

                    selected={this.state.selectedTab === 'ListNhanVien'}
                    title="Nhân Viên"
                    renderIcon={() => <Icon2 size={24} color="black" name="ios-people-outline"/>}
                    renderSelectedIcon={() => <Icon2 size={24} color="white" name="ios-people-outline"/>}
                    onPress={() => this.setState({selectedTab: 'ListNhanVien'})}>
                    <View style={{flex: 1}}>
                        <Image source={require('../images/bg3.png')}
                               style={{position: 'absolute', top: 0}}/>
                        <View style={styles.titleStyle}>
                            {function () {
                                if (Platform.OS !== 'ios')
                                    return (<Image source={require('../images/bg3.png')}
                                                   style={{position: 'absolute'}}/>)
                            }()}
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
                                }}>Nhân viên</Text>
                            <View style={{backgroundColor: 'transparent', width: 35, height: 35}}/>
                        </View>
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
                    <MapListScreen backToHome={() => this.props.navigation.goBack()}/>
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
                            goToDetail={() => navigate('ListNhanVien', {status: item.trangthai})}

                        />
                    }
                />

            </View>)
    }

    getDataFromSv() {
        this.setState({data: null})
        fetch(URlConfig.getLinkSoNhanVien())
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    console.log(responseJson.danhsach)
                    this.setState({data: responseJson.danhsach})
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
        marginTop: Platform.OS === 'ios' ? 16 : 0,
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