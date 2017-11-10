import React, {Component} from 'react'
import DatePicker from 'react-native-datepicker'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Button,
    Picker,
    FlatList,
    TouchableHightLight,
    ActivityIndicator,
    Platform,
    Animated
} from "react-native";
import URlConfig from "../configs/url";
import Color from '../configs/color'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
import Image from 'react-native-image-progress';
import Toast from 'react-native-simple-toast';
import LinearGradient from "react-native-linear-gradient";
import Utils from "../configs/ultils";
import HeaderCustom from "../components/Header";
import {getData, setData, data} from "../configs/OnlineReportData";

var {height, width} = Dimensions.get('window');
const timer = require('react-native-timer');
const moment = require('moment')
export default class ReportScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        let arr = [];
        arr.push('không bao giờ');
        arr.push('10 giây');
        arr.push('30 giây');
        arr.push('1 phút');
        arr.push('3 phút');
        arr.push('5 phút');

        this.state = {
            fadeAnim: new Animated.Value(0),
            refreshing: false,
            numberPickType: 0,
            time: 0,
            data: [],
            onlineReportStatus: arr,
            lastUpdate: ''
        }
    }

    refresh() {
        this.setState({data: ''}, () => {
            this.getOnlineReportListFromServer()
        })
    }

    getOnlineReportListFromServer() {

        this.setState({data: null, fadeAnim: new Animated.Value(0)})
        fetch(URlConfig.getLinkOnlinePerson())
            .then((response) => (response.json()))
            .then((responseJson) => {
                    console.log(responseJson);
                    if (responseJson.status) {
                        setData(responseJson)
                        this.setState({
                            data: getData(),
                            lastUpdate: moment().format('DD/MM/YYYY HH:mm:ss')
                            }, () =>
                                Animated.timing(
                                    this.state.fadeAnim,
                                    {
                                        toValue: 1,
                                        duration: 1000,
                                    }
                                ).start()
                        )
                    }
                }
            ).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại' + e))
    }

    componentWillUnmount() {
        timer.clearInterval(this)
    }

    componentDidMount() {
        this.getOnlineReportListFromServer()
        timer.clearInterval(this)
        timer.setInterval(this, "123", () => this.getOnlineReportListFromServer(), 30000);
    }

    flatListorIndicator() {
        const opacity = this.state.fadeAnim;

        console.log(this.state.data)
        const {navigate} = this.props.navigation
        if (!this.state.data) {
            return (

                <ActivityIndicator
                    animating={true}
                    style={styles.indicator} color={"green"}
                    size="large"/>
            )
        }
        return (
            <FlatList
                onRefresh={() => this.getOnlineReportListFromServer()}
                refreshing={this.state.refreshing}
                numColumns={2}
                keyboardDismissMode="on-drag"
                ref="listview"
                extraData={this.state.data}
                data={this.state.data}
                renderItem={({item}) =>
                    <Animated.View
                        style={{width: width / 2 - 32, height: width / 2 - 32, margin: 16, flex: 1, opacity}}>
                        <View style={{
                            flex: 1,
                            backgroundColor: '#0088C2',
                            justifyContent: 'center',
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5
                        }}>
                            <Text style={{textAlign: 'center', color: 'white'}}>{item.title}</Text>
                        </View>
                        <View style={{
                            flex: 3,
                            backgroundColor: '#009CDE',
                            justifyContent: 'center',
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: 'white',
                                fontSize: 20
                            }}>{item.content}</Text>
                        </View>
                    </Animated.View>
                }
            />)
    }

    render() {
        let onlineReportStatusItem = this.state.onlineReportStatus.map((s, i) => {
            return <Picker.Item key={i} value={i} label={s}/>
        });
        return (
            <View style={{flex: 1}}>
                <HeaderCustom
                    title={"Báo cáo online"}
                    leftClick={() => this.props.navigation.goBack()}
                />
                <View style={{flex: 9}}>

                    {this.flatListorIndicator()}
                    <Text style={{marginLeft: 16, backgroundColor: 'transparent'}}>Cài đặt thời gian cập nhập tin
                        tức: </Text>
                    <Picker style={{height: 44, width: width / 2, marginLeft: 16, alignSelf: 'center'}}
                            itemStyle={{color: 'black', height: 88}}
                            selectedValue={this.state.numberPickType}
                            onValueChange={(value) => {
                                this.setState({numberPickType: value}, () => {
                                        switch (value) {
                                            case 0 :
                                                timer.clearInterval(this);
                                                break;
                                            case 1 :
                                                timer.clearInterval(this);
                                                this.getOnlineReportListFromServer();
                                                timer.setInterval(this, "123", () => this.refresh(), 10000);
                                                break;
                                            case 2 :
                                                timer.clearInterval(this);
                                                this.getOnlineReportListFromServer();
                                                timer.setInterval(this, "123", () => this.refresh(), 30000);
                                                break;
                                            case 3 :
                                                timer.clearInterval(this);
                                                this.getOnlineReportListFromServer();
                                                timer.setInterval(this, "123", () => this.refresh(), 60000);
                                                break;
                                            case 4 :
                                                timer.clearInterval(this);
                                                this.getOnlineReportListFromServer();
                                                timer.setInterval(this, "123", () => this.refresh(), 180000);
                                                break;
                                            case 5 :
                                                timer.clearInterval(this);
                                                this.getOnlineReportListFromServer();
                                                timer.setInterval(this, "123", () => this.refresh(), 300000);
                                                break;
                                        }
                                    }
                                )
                            }}>
                        {onlineReportStatusItem}
                    </Picker>
                </View>
                <View
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                        style={{fontSize: 15}}>{this.state.lastUpdate ? `Cập nhật lần cuối lúc: ${this.state.lastUpdate}` : 'Chưa cập nhật'}</Text>
                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    view1: {
        flexDirection: 'row'
    },
    indicator: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    },
    titleStyle: {
        paddingTop: Platform.OS === 'ios' ? 16 : 0,
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
        borderBottomWidth: 1,
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
        marginLeft: 8,
    },
    textStyle: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent'
    },
    titleIconsMenu: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        fontFamily: 'Al Nile'
    }
})
