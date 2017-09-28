import React, {Component} from 'react'
import DatePicker from 'react-native-datepicker'
import {
    BackHandler,
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
    DeviceEventEmitter
} from "react-native";
import URlConfig from "../configs/url";
import Color from '../configs/color'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Image from 'react-native-image-progress';

var {height, width} = Dimensions.get('window');
var GiftedListView = require('react-native-gifted-listview');
export default class DetailMessageScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });

    constructor(props) {
        super(props)
        const {params} = this.props.navigation.state

    }

    componentWillUnmount() {
        const {params} = this.props.navigation.state;
    }

    componentDidMount() {
        const {params} = this.props.navigation.state;
        const url = URlConfig.getLinkReadMessage(params.id);
        console.log(params.typeSend)
        if (params.typeSend === 1) {
            fetch(url)
                .then((response) => (response.json()))
                .then((responseJson) => {
                    console.log(url, responseJson)
                }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'));
        }
    }

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={{flex: 1}}>
                <Image source={require('../images/bg3.png')}
                       style={{position: 'absolute', top: 0}}/>
                <View style={styles.titleStyle}>
                    <Image source={require('../images/bg3.png')}
                           style={{position: 'absolute'}}/>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        style={styles.iconStyle}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Chi
                        tiết tin nhắn </Text>
                    <View/>
                </View>

                <View style={{flex: 9}}>
                    <View style={{
                        width: width,
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginRight: 8,
                        marginTop: 8,
                        marginBottom: 4
                    }}>
                        <Text style={{backgroundColor: 'transparent'}}>Người gửi: </Text>
                        <Text style={{marginLeft: 4, backgroundColor: 'transparent'}}>{params.nguoigui}</Text>
                    </View>
                    <View style={{width: width, flexDirection: 'row', marginRight: 8, marginLeft: 8}}>
                        <Text style={{backgroundColor: 'transparent'}}>Thời gian: </Text>
                        <Text style={{marginLeft: 4, backgroundColor: 'transparent'}}>{params.thoigian}</Text>
                    </View>
                    <Text style={{margin: 8, backgroundColor: 'transparent'}}>Nội Dung</Text>
                    <View style={{flex: 1, backgroundColor: 'white', marginLeft: 8, marginRight: 8}}>
                        <Text style={{margin: 4, backgroundColor: 'transparent'}}>{params.noidung}</Text>
                    </View>
                </View>
            </View>
        )
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