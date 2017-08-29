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

export default class AboutUsScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const phonenumber = '043.565.2626';
        const hotline = '0902.295.486';
        const email = 'phanmem@lachongmedia.vn';
        return (
            <View style={{flexDirection: 'column', flex: 1}}>
                <Image source={require('../images/bg.png')}
                       style={{position: 'absolute', top: 0}}/>
                <View style={styles.titleStyle}>
                    <Image source={require('../images/bg.png')}
                           style={{position: 'absolute'}}/>
                    <TouchableOpacity onPress={() => this.props.backToHome()}
                                      style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon1 style={styles.iconStyle} size={24} color="white"
                               name="ios-arrow-back"/></TouchableOpacity>
                    <Text style={{
                        fontSize: 20,
                        color: 'white',
                        alignSelf: 'center',
                        textAlign: 'center',
                        backgroundColor: 'transparent',
                    }}>Liên hệ</Text>
                    <View/>
                </View>
                <View style={{flex: 9, flexDirection: 'column', backgroundColor: 'transparent', margin: 16}}>
                    <Image source={require('../images/logolh.png')}
                           style={{width: 250, height: 100, alignSelf: 'center'}}
                           resizeMode='contain'/>
                    <Text>
                        {'Công ty cổ phần truyền thông Lạc Hồng \nVPGD: Tầng 2,Toà nhà Ngôi Sao, B15 Khu ĐTM Đại Kim, đường Nguyễn Cảnh Dị, phường Đại Kim, quận Hoàng Mai, Hà Nội.'}
                    </Text>
                    <View style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
                        <Text>Điện thoại: </Text>
                        <TouchableOpacity onPress={() => {
                            Communications.phonecall(phonenumber, true)
                        }}>
                            <Text style={{color: 'white'}}>{phonenumber}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
                        <Text>Hotline: </Text>
                        <TouchableOpacity onPress={() => {
                            Communications.phonecall(hotline, true)
                        }}>
                            <Text style={{color: 'white'}}>{hotline}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
                        <Text>Website: </Text>
                        <TouchableOpacity onPress={() => Communications.web('http://ksmart.vn')}>
                            <Text style={{color: 'white'}}>http://ksmart.vn</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
                        <Text>Email: </Text>
                        <TouchableOpacity
                            onPress={() => Communications.email([email], null, null, 'My Subject', 'My body text')}>
                            <Text style={{color: 'white'}}>{email}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
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