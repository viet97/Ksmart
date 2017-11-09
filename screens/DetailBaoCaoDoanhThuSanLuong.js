import React, {Component} from 'react';
import {
    Button,
    StyleSheet,
    View, TabBarIOS, TouchableHighlight, Platform,
    Text, TouchableOpacity,
    Dimensions,
    Image,
    ScrollView
} from 'react-native';
import HeaderCustom from "../components/Header";
import ultils from "../configs/ultils";

let {width, height} = Dimensions.get('window')
export default class DetailBaoCaoDoanhThuSanLuong extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.state = {
            data: params.data,
        }
        console.log(params.data)
    }

    getElement(title, content) {
        return (
            <View style={{flexDirection: 'row', marginTop: 8, backgroundColor: 'white'}}>
                <Text style={{width: width / 3 - 4, marginLeft: 4, alignSelf: 'center'}}>{title}</Text>
                <View style={{
                    backgroundColor: '#ECF0F1',
                    width: width * 2 / 3 - 4,
                    marginRight: 4,
                    padding: 4,
                    height: 48,
                    flexDirection: 'row'
                }}>
                    <Text style={{alignSelf: 'center'}}>{content}</Text>
                </View>
            </View>
        )

    }

    render() {
        return (
            <View style={{flex: 1,backgroundColor:'white'}}>

                <HeaderCustom title={"Chi tiết báo cáo"} leftClick={() => this.props.navigation.goBack()}/>
                <View style={{flex: 9}}>

                    <ScrollView style={{flex: 1, marginBottom: 4}}>
                        {this.getElement('Tên khách hàng', this.state.data.tenkhachhang)}
                        {this.getElement('Địa chỉ', this.state.data.diachikhachhang)}
                        {this.getElement('Số đơn hàng', this.state.data.sodonhang)}
                        {this.getElement('Tổng giá trị đơn hàng', ultils.getMoney(this.state.data.tongtienchuachietkhau))}
                        {this.getElement('Tổng tiền chiếu khấu', ultils.getMoney(this.state.data.tongtienchietkhau))}
                        {this.getElement('Thành tiền', ultils.getMoney(this.state.data.tongtien))}
                        {this.getElement('Đã thanh toán', ultils.getMoney(this.state.data.tongtiendathanhtoan))}
                    </ScrollView>
                </View>

            </View>
        );

    }
}
const styles = StyleSheet.create({
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