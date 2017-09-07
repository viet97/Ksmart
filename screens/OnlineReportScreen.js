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
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import {DialogComponent, SlideAnimation} from 'react-native-dialog-component';
import Dialog from '../components/DialogOrder'
import orderListData from '../dbcontext/orderListData'
import AtoZListView from 'react-native-atoz-listview';
import Search from 'react-native-search-box';
import Toast from 'react-native-simple-toast';
import ultils from "../configs/ultils";
import Communications from 'react-native-communications';
import ChooseTypeItem from "../components/ChooseTypeItem";

var {height, width} = Dimensions.get('window');
const timer = require('react-native-timer');

export default class ReportScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        let arr = []
        arr.push('không bao giờ')
        arr.push('10 giây')
        arr.push('30 giây')
        arr.push('1 phút')
        arr.push('3 phút')
        arr.push('5 phút')

        this.state = {
            numberPickType: 0,
            time: 0,
            data: [],
            onlineReportStatus: arr
        }
    }

    getOnlineReportListFromServer() {
        fetch(URlConfig.getLinkOnlinePerson())
            .then((response) => (response.json()))
            .then((responseJson) => {
                    console.log(responseJson)
                    if (responseJson.status)
                        this.setState({data: responseJson})
                }
            ).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
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
                <Image source={require('../images/bg.png')}
                       style={{position: 'absolute', top: 0}}/>
                <View style={styles.titleStyle}>
                    <Image source={require('../images/bg.png')}
                           style={{position: 'absolute'}}/>
                    <TouchableOpacity onPress={() => this.props.backToHome()}
                                      style={styles.iconStyle}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>Báo cáo online</Text>
                    <TouchableOpacity
                        onPress={() => this.getOnlineReportListFromServer()}
                        style={{backgroundColor: 'transparent', width: 35, height: 35, alignSelf: 'center'}}>
                        <Icon3 style={{alignSelf: 'center'}} size={24} color="white"
                               name="reload"/>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity onPress={() => this.props.backToHome()}
                                  style={{
                                      width: 50,
                                      height: 50,
                                      position: 'absolute',
                                      left: 16,
                                      top: 0,
                                      right: 0,
                                      bottom: 0
                                  }}/>
                <View style={{flex: 9}}>
                    <View style={styles.view1}>
                        <ChooseTypeItem
                            goToDetail={() => this.props.goToTravel(0)}
                            title='Nhân viên online'
                            content={this.state.data.nhanvienonline}
                        />
                        <ChooseTypeItem
                            goToDetail={() => this.props.goToTravel(1)}
                            title='Doanh thu trong ngày'
                            content={this.state.data.tongdoanhthu}
                        />
                    </View>
                    <View style={styles.view1}>
                        <ChooseTypeItem
                            goToDetail={() => this.props.goToTravel(2)}
                            title='Đơn hàng trong ngày'
                            content={this.state.data.tongdonhang}
                        />
                        <ChooseTypeItem
                            goToDetail={() => this.props.goToTravel(3)}
                            title='Check-in trong ngày'
                            content={this.state.data.tongluotcheckin}
                        />
                    </View>
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
        marginTop: Platform.OS === 'ios' ? 16 : 0,
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
        marginTop: (Platform.OS === 'ios') ? 8 : 0
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
