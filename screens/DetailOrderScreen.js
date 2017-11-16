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
import {Icon} from 'react-native-elements'
import Toast from "react-native-simple-toast";
import URlConfig from "../configs/url";
import ultil from "../configs/ultils";
import ListDetailOrderItem from "../components/ListDetailOrderItem";
import LinearGradient from "react-native-linear-gradient";
import HeaderCustom from "../components/Header";

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
        const {params} = this.props.navigation.state
        console.log(URlConfig.getLinkDetailOrder(params.id))
        fetch(URlConfig.getLinkDetailOrder(params.id))
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    this.setState({data: responseJson.data})
                }
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))

    }


    getElement(title, content) {
        return (
            <View style={{marginTop: 8,backgroundColor:'white'}}>
                <Text style={{flexDirection: 'row', marginLeft: 4, fontSize: 16}}>{title}</Text>
                <View style={{
                    marginTop: 4,
                    backgroundColor: '#ECF0F1',
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
            <View style={{flex: 1,backgroundColor:'white'}}>

                <HeaderCustom title={"Chi tiết đơn hàng"} leftClick={() => this.props.navigation.goBack()}/>
                <View style={{flex: 9,backgroundColor:'transparent'}}>
                    <ScrollView style={{flex: 1, marginBottom: 4}}>
                        {this.getElement('Mã đơn hàng', this.state.data.mathamchieu)}
                        {this.getElement('Tên khách hàng', this.state.data.tenkhachhang)}
                        {this.getElement('Tổng tiền', ultil.getMoney(this.state.data.tongtien, 2))}
                        {this.getElement('Thời gian tạo', ultil.getDate(this.state.data.thoigiantao))}
                        {this.getElement('Trạng thái thanh toán', URlConfig.OBJLOGIN.tttt[this.state.data.trangthaithanhtoan])}
                        {this.getElement('Trạng thái giao hàng', URlConfig.OBJLOGIN.ttgh[this.state.data.trangthaigiaohang])}
                        {this.getElement('Trạng thái đơn hàng', URlConfig.OBJLOGIN.ttdh[this.state.data.trangthaidonhang])}
                        {this.getElement('Thời gian tạo', ultil.getDate(this.state.data.thoigiantao))}
                        {this.getElement('Chiết khấu phần trăm', ultil.getMoney(this.state.data.chietkhauphantram, 2))}
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
        paddingTop: Platform.OS === 'ios' ? 16 : 0,
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