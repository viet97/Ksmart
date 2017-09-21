import React, {Component} from 'react';
import {
    Button,
    StyleSheet,
    View, TabBarIOS, TouchableHighlight, Platform,
    Text, TouchableOpacity,
    Dimensions,
    Image,
    ScrollView, FlatList,
    StatusBar
} from 'react-native';
import MapView from 'react-native-maps';
import {Icon} from 'react-native-elements'
import Color from '../configs/color'
import Toast from "react-native-simple-toast";
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import URlConfig from "../configs/url";
import ultil from "../configs/ultils";
import ListDetailOrderItem from "../components/ListDetailOrderItem";

let {width, height} = Dimensions.get('window')
export default class DetailOrderScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });

    constructor(props) {
        super(props);

        this.state = {
            data: [],
        }
    }


    componentDidMount() {
        StatusBar.setBackgroundColor('gray', true)
        const {params} = this.props.navigation.state
        fetch(URlConfig.getLinkDetailOrder())
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    this.setState({data: responseJson.data})
                }
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại' + e))

    }


    getElement(title, content) {
        return (
            <View style={{marginTop: 8,backgroundColor:'transparent'}}>
                <Text style={{flexDirection: 'row', marginLeft: 4, fontSize: 16}}>{title}</Text>
                <View style={{
                    marginTop: 4,
                    backgroundColor: 'white',
                    width: width - 16,
                    marginRight: 8,
                    marginLeft: 8,
                    height: 44,
                    flexDirection: 'row'
                }}>
                    <Text style={{alignSelf: 'center', marginLeft: 4}}>{content} </Text>
                </View>
            </View>
        )

    }

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={{flex: 1}}>
                <Image source={require('../images/bg.png')}
                       style={{position: 'absolute', top: 0}}/>
                <View style={styles.titleStyle}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                      style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon style={styles.iconStyle}
                              size={24} color="white"
                              name="ios-arrow-back"
                              type="ionicon"
                        />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 20,
                        color: 'white',
                        alignSelf: 'center',
                        backgroundColor: 'transparent'
                    }}>Chi tiết đơn hàng</Text>
                    <View/>
                </View>
                <View style={{flex: 9,backgroundColor:'transparent'}}>
                    <Image source={require('../images/bg.png')}
                           style={{position: 'absolute', top: 0}}/>
                    <ScrollView style={{flex: 1, marginBottom: 4}}>
                        {this.getElement('Mã đơn hàng', this.state.data.mathamchieu)}
                        {this.getElement('Tên khách hàng', this.state.data.tenkhachhang)}
                        {this.getElement('Tổng tiền', ultil.getMoney(this.state.data.tongtien, 2))}
                        {this.getElement('Thời gian tạo', ultil.getDate(this.state.data.thoigiantao))}
                        {this.getElement('Chiết khấu phần trăm', this.state.data.chietkhauphantram)}
                        {this.getElement('Chiết khấu tiền', ultil.getMoney(this.state.data.chietkhautien, 2))}
                        {this.getElement('Tổng tiền chiết khấu', ultil.getMoney(this.state.data.tongtienchietkhau))}
                        {this.getElement('Chương trình khuyến mại', this.state.data.tenctkm)}
                        {this.getElement('Ghi chú', this.state.data.ghichu)}
                        <Text style={{marginTop: 8, marginLeft: 8, fontWeight: 'bold'}}>Danh sách mặt hàng</Text>
                        <FlatList
                            keyboardDismissMode="on-drag"
                            extraData={this.state.data.chitietdonhang}
                            data={this.state.data.chitietdonhang}
                            renderItem={({item}) =>
                                <ListDetailOrderItem
                                    item={item}/>
                            }/>
                    </ScrollView>
                </View>
            </View>
        );

    }
}
var styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
    titleStyle: {
        marginTop: Platform.OS === 'ios' ? 16 : 0,
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    iconStyle: {
        alignSelf: 'center',
        width: 24,
        height: 24,
        backgroundColor: "transparent",
        marginLeft: 16
    }

})