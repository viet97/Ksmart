import {
    AppRegistry,
    Text,
    View,
    Button, ListView, Image, StyleSheet, StatusBar,
    TouchableOpacity, Platform
} from 'react-native';
import Icon1 from 'react-native-vector-icons/Ionicons'
import React from 'react';
import Color from '../configs/color'
import Communications from 'react-native-communications';
import LinearGradient from "react-native-linear-gradient";
import HeaderCustom from "../components/Header";

export default class AboutUsScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
    }

    render() {
        const phonenumber = '0243.565.2626';
        const hotline = '0902.295.486';
        const email = 'phanmem@lachongmedia.vn';

        return (
            <View style={{flexDirection: 'column', flex: 1}}>

                <HeaderCustom title={"Liên hệ"} leftClick={() => this.props.navigation.goBack()}/>
                <View style={{flex: 9, flexDirection: 'column', backgroundColor: 'transparent', margin: 16}}>
                    <Image source={require('../images/logolh.png')}
                           style={{width: 250, height: 100, alignSelf: 'center'}}
                           resizeMode='contain'/>
                    <Text>
                        {'Công ty cổ phần giải pháp công nghệ Lạc Hồng \nĐịa chỉ: Tầng 2,Toà nhà Ngôi Sao, B15 Khu ĐTM Đại Kim, đường Nguyễn Cảnh Dị, phường Đại Kim, quận Hoàng Mai, Hà Nội.'}
                    </Text>
                    <View style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
                        <Text>Điện thoại: </Text>
                        <TouchableOpacity onPress={() => {
                            Communications.phonecall(phonenumber, true)
                        }}>
                            <Text style={{color: 'blue'}}>{phonenumber}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
                        <Text>Hotline: </Text>
                        <TouchableOpacity onPress={() => {
                            Communications.phonecall(hotline, true)
                        }}>
                            <Text style={{color: 'blue'}}>{hotline}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
                        <Text>Website: </Text>
                        <TouchableOpacity onPress={() => Communications.web('http://ksmart.vn')}>
                            <Text style={{color: 'blue'}}>http://ksmart.vn</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
                        <Text>Email: </Text>
                        <TouchableOpacity
                            onPress={() => Communications.email([email], null, null, 'My Subject', 'My body text')}>
                            <Text style={{color: 'blue'}}>{email}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
                        <Text style={{alignSelf: 'center', color: 'blue'}}>
                            Phiên bản 1.0.8
                        </Text>
                    </View>
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
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
        marginLeft: 8
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