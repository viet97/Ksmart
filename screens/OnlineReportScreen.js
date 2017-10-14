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

} from "react-native";
import URlConfig from "../configs/url";
import Color from '../configs/color'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
import Image from 'react-native-image-progress';
import Toast from 'react-native-simple-toast';
import LinearGradient from "react-native-linear-gradient";
import Utils from "../configs/ultils";

var {height, width} = Dimensions.get('window');
const timer = require('react-native-timer');

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
            numberPickType: 0,
            time: 0,
            data: [],
            onlineReportStatus: arr
        }
    }

    refresh() {

        this.setState({data: ''}, function () {
            this.getOnlineReportListFromServer()
        })
    }

    getOnlineReportListFromServer() {
        fetch(URlConfig.getLinkOnlinePerson())
            .then((response) => (response.json()))
            .then((responseJson) => {
                console.log(responseJson);
                    if (responseJson.status)
                        this.setState({data: responseJson})
                }
            ).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }

    componentWillUnmount() {
        timer.clearInterval(this)
    }

    componentDidMount() {
        this.getOnlineReportListFromServer()
        timer.clearInterval(this)
        timer.setInterval(this, "123", () => this.getOnlineReportListFromServer(), 30000);
    }
    render() {

        let onlineReportStatusItem = this.state.onlineReportStatus.map((s, i) => {
            return <Picker.Item key={i} value={i} label={s}/>
        });
        return (
            <View style={{flex: 1}}>
                <LinearGradient colors={['#1b60ad', '#3dc4ea']} style={styles.titleStyle}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                      style={styles.iconStyle}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Báo
                        cáo online</Text>
                    <TouchableOpacity
                        onPress={() => this.refresh()}
                        style={{backgroundColor: 'transparent', width: 35, height: 35, alignSelf: 'center'}}>
                        <Icon3 style={{alignSelf: 'center'}} size={24} color="white"
                               name="reload"/>
                    </TouchableOpacity>

                </LinearGradient>
                <View style={{flex: 9}}>
                    <View style={styles.view1}>
                        <View
                            style={{width: width / 2 - 32, height: width / 2 - 32, margin: 16, flex: 1}}>
                            <View style={{
                                flex: 1,
                                backgroundColor: '#0088C2',
                                justifyContent: 'center',
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5
                            }}>
                                <Text style={{textAlign: 'center', color: 'white'}}>Nhân viên online</Text>
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
                                }}>{this.state.data.nhanvienonline}</Text>
                            </View>
                        </View>
                        <View
                            style={{width: width / 2 - 32, height: width / 2 - 32, margin: 16, flex: 1}}>
                            <View style={{
                                flex: 1,
                                backgroundColor: '#0088C2',
                                justifyContent: 'center',
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5
                            }}>
                                <Text style={{textAlign: 'center', color: 'white'}}>Doanh thu trong ngày</Text>
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
                                }}>{Utils.getMoney(this.state.data.tongdoanhthu)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.view1}>
                        <View
                            style={{width: width / 2 - 32, height: width / 2 - 32, margin: 16, flex: 1}}>
                            <View style={{
                                flex: 1,
                                backgroundColor: '#0088C2',
                                justifyContent: 'center',
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5
                            }}>
                                <Text style={{textAlign: 'center', color: 'white'}}>Đơn hàng trong ngày</Text>
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
                                }}>{this.state.data.tongdonhang}</Text>
                            </View>
                        </View>
                        <View
                            style={{width: width / 2 - 32, height: width / 2 - 32, margin: 16, flex: 1}}>
                            <View style={{
                                flex: 1,
                                backgroundColor: '#0088C2',
                                justifyContent: 'center',
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5
                            }}>
                                <Text style={{textAlign: 'center', color: 'white'}}>Check-in trong ngày</Text>
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
                                }}>{this.state.data.tongluotcheckin}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={{marginLeft: 16, backgroundColor: 'transparent'}}>Cài đặt thời gian cập nhập tin
                        tức: </Text>
                    <Picker style={{height: 44, width: width / 2, marginLeft: 16, alignSelf: 'center'}}
                            itemStyle={{color: 'black', height: 88}}
                            selectedValue={this.state.numberPickType}
                            onValueChange={(value) => {
                                this.setState({numberPickType: value}, function () {
                                        switch (value) {
                                            case 0 :
                                                timer.clearInterval(this);
                                                break;
                                            case 1 :
                                                timer.clearInterval(this);
                                                timer.setInterval(this, "123", () => this.refresh(), 10000);
                                                break;
                                            case 2 :
                                                timer.clearInterval(this);
                                                timer.setInterval(this, "123", () => this.refresh(), 30000);
                                                break;
                                            case 3 :
                                                timer.clearInterval(this);
                                                timer.setInterval(this, "123", () => this.refresh(), 60000);
                                                break;
                                            case 4 :
                                                timer.clearInterval(this);
                                                timer.setInterval(this, "123", () => this.refresh(), 180000);
                                                break;
                                            case 5 :
                                                timer.clearInterval(this);
                                                timer.setInterval(this, "123", () => this.refresh(), 300000);
                                                break;
                                        }
                                    }
                                )
                            }}>
                        {onlineReportStatusItem}
                    </Picker>
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
