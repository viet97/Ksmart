/**
 * Created by hao on 7/5/17.
 */

import React from 'react';
import {
    Text,
    View, Platform, Image, StyleSheet,
    TouchableOpacity, TextInput, Dimensions, ScrollView
} from 'react-native';
import Toast from 'react-native-root-toast';
import URlConfig from "../configs/url";
import * as Animatable from 'react-native-animatable';
import {NavigationActions, StackActions} from "react-navigation";
import {ProgressDialog} from 'react-native-simple-dialogs';
import {CheckBox} from 'react-native-elements'
import Communications from 'react-native-communications';
import {Icon} from 'react-native-elements'
import {shadowProps} from '../configs/shadow'
import {getPrefData, savePrefData} from "../sharePref/SharePref";
import {COMPANY_KEY, PASSWORD_KEY, USERNAME_KEY} from "../configs/type";

let {width, height} = Dimensions.get('window');
export default class LoginScreen extends React.Component {

    static navigationOptions = {
        header: null
    };

    showToast(msg, time = 3000) {
        let toast = Toast.show(msg, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            onShow: () => {
                // calls on toast\`s appear animation start
            },
            onShown: () => {
                // calls on toast\`s appear animation end.
            },
            onHide: () => {
                // calls on toast\`s hide animation start.
            },
            onHidden: () => {
                // calls on toast\`s hide animation end.
            }
        });

        setTimeout(function () {
            Toast.hide(toast);
        }, time);
    }

    constructor(props) {
        super(props);
        this.state = {
            checkOfCheckBox: true,
            idct: '',
            username: '',
            password: '',
            progressVisible: false
        };
    }


    async componentDidMount() {
        let username = await getPrefData(USERNAME_KEY);
        let password = await getPrefData(PASSWORD_KEY);
        let idct = await getPrefData(COMPANY_KEY);
        if (username && password && idct) {
            this.setState({
                idct,
                username,
                password,
                checkOfCheckBox: true
            })
        }
    }


    render() {
        const hotline = '0243.565.2626';
        let website = 'http://ksmart.vn';
        let windowWidth = Dimensions.get('window').width;
        return (
            <View
                style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white',}}>

                <View style={{
                    height: '40%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image source={require('../design/bg_logo.png')}
                           style={{
                               position: 'absolute',
                               resizeMode: 'stretch',
                               height: '100%'
                           }}/>
                    <Image source={require('../design/logo_ks.png')}
                           style={{width: width / 2.5, height: width / 2.5, resizeMode: 'stretch'}}/>
                    <Text style={{
                        color: 'white',
                        fontFamily: 'Roboto-Medium',
                        fontSize: 20,
                        backgroundColor: 'transparent',
                        marginTop: 16
                    }}>KSMART MANAGER</Text>
                </View>
                <View style={{alignSelf: 'center', width: '100%', height: "60%"}}>
                    <View style={styles.viewborder}>
                        <Icon name="account-balance" size={24} color="#2F3A51"/>
                        <TextInput
                            autoCapitalize={'characters'}
                            underlineColorAndroid="transparent"
                            hintColor='gray' focusColor='black'
                            returnKeyType={"next"}
                            value={this.state.idct}
                            style={styles.textInput}
                            placeholder={'Mã công ty'}

                            secureTextEntry={false}
                            onChangeText={(text) => this.setState({idct: text})}
                            onSubmitEditing={(event) => {
                                this.refs.ipPass.focus();
                            }}
                        />

                    </View>
                    <View style={styles.viewborder}>
                        <Icon name="user-circle-o" type="font-awesome" size={24} color="#2F3A51"/>
                        <TextInput
                            ref="ipPass"
                            underlineColorAndroid="transparent"
                            returnKeyType={"next"}
                            value={this.state.username}
                            style={styles.textInput}
                            placeholder={'Tên đăng nhập'}
                            secureTextEntry={false}
                            onChangeText={(text) => this.setState({username: text})}
                            onSubmitEditing={(event) => {
                                this.refs.ipRePass.focus();
                            }}
                        />

                    </View>
                    <View style={styles.viewborder}>
                        <Icon name="security" size={24} color="#2F3A51"/>
                        <TextInput
                            ref="ipRePass"
                            underlineColorAndroid="transparent"
                            value={this.state.password}
                            style={styles.textInput}
                            returnKeyType={"done"}
                            placeholder={'Mật khẩu'}
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({password: text})}
                        />

                    </View>
                    <View
                        style={{flexDirection: 'column', alignSelf: 'center', marginTop: 16, alignItems: 'center'}}>
                        <CheckBox
                            textStyle={{color: 'gray', fontFamily: 'System'}}
                            title='Ghi nhớ đăng nhập'
                            checked={this.state.checkOfCheckBox}
                            onPress={() => this.setState({checkOfCheckBox: !this.state.checkOfCheckBox})}
                            style={{backgroundColor: 'transparent'}}
                        />
                        <TouchableOpacity
                            activeOpacity={0.6}
                            underlayColor="transparent"
                            style={{

                                height: 48,
                                marginTop: 16,
                                borderRadius: 24,
                                backgroundColor: '#3dc4ea',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 16,
                                width: width - width * 0.2, ...shadowProps
                            }}
                            onPress={() => this.startLogin()}>
                            <Animatable.Text style={styles.loginTextButton}>Đăng nhập</Animatable.Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        position: 'absolute',
                        bottom: 8,
                        left: 0,
                        right: 0,
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <Text style={{color: 'gray', backgroundColor: 'transparent', alignSelf: 'center'}}>
                            Phiên bản 1.0.8
                        </Text>

                        <View style={{justifyContent: 'center', flexDirection: 'row',}}>
                            <Text style={{
                                color: 'gray', fontFamily: 'Roboto-Thin'
                            }}>Copyright © <Text style={{}} onPress={() => {
                                Communications.web(website)
                            }}>Ksmart.vn</Text>. Hotline: </Text>
                            <Text style={{
                                color: 'gray', fontFamily: 'Roboto-Thin'
                            }} onPress={() => {
                                Communications.phonecall(hotline, true)
                            }}>{hotline}</Text>
                        </View>
                    </View>
                    <ProgressDialog
                        visible={this.state.progressVisible}
                        title=""
                        message="Đang đăng nhập"
                    />
                </View>
            </View>
        );
    }

    getBaseURL() {

        fetch(URlConfig.getRouterApp(this.state.idct))
            .then((response) => response.json())
            .then((responseJson) => {
                if (!responseJson.status) {
                    console.log('vao day r')
                    this.showToast(responseJson.msg, 5000)
                    this.setState({progressVisible: false})
                } else {
                    this.requestLogin(responseJson)
                }
            })
            .catch((error) => {
                console.error(error);
                this.setState({progressVisible: false})
                this.showToast('Có lỗi xảy ra, kiểm tra cài đặt internet và thử lại sau')
            });
    }

    requestLogin(value) {
        console.log('valueeeee', value)
        if (value !== undefined && value.status) {
            URlConfig.BASE_URL_APP = value.data;
            let urlLogin = URlConfig.getLoginRouter(this.state.username, this.state.password, this.state.idct);
            console.log("hihi", urlLogin)
            fetch(urlLogin)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("login xong", responseJson)
                    this.setState({progressVisible: false})
                    if (!responseJson.status) {
                        this.showToast(responseJson.msg);
                    } else {
                        if (this.state.checkOfCheckBox) {
                            savePrefData(USERNAME_KEY, this.state.username);
                            savePrefData(COMPANY_KEY, this.state.idct);
                            savePrefData(PASSWORD_KEY, this.state.password);

                        } else {
                            savePrefData(USERNAME_KEY);
                            savePrefData(COMPANY_KEY);
                            savePrefData(PASSWORD_KEY);
                        }
                        this.handlDataLogin(responseJson)
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({routeName: 'Home'})],
                        });
                        this.setState({progressVisible: false});
                        this.props
                            .navigation
                            .dispatch(resetAction);

                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.setState({progressVisible: false})
                    this.showToast('Có lỗi xảy ra, kiểm tra cài đặt internet và thử lại sau')
                });
        } else {
            this.showToast('Có lỗi xảy ra, thử lại sau')
            this.setState({progressVisible: false})
        }
    }


    startLogin() {

        if (this.state.password.length === 0 || this.state.username === 0 || this.state.idct === 0) {
            this.showToast('Vui lòng nhập đầy đủ thông tin đăng nhập!', 5000)
        } else {
            this.setState({progressVisible: true});
            this.getBaseURL();
        }

    }


    handlDataLogin(responseJson) {
        let data = responseJson.data;
        data['idct'] = this.state.idct;

        let ttdh = {}, tttt = {}, ttgh = {}, tthtdh = {}, color = {}, ttdhid = {}, ttttid = {}, ttghid = {};
        var i = 1;
        ttdhid[0] = -1;
        ttttid[0] = -1;
        ttghid[0] = -1;// vi dang de 0 la tat ca
        for (let item of responseJson.dulieutrangthaidonhang) {
            ttdh[item.ID_TrangThaiDonHang] = item.TenTrangThai;
            ttdhid[i] = item.ID_TrangThaiDonHang;
            i++;
        }

        for (let item of responseJson.dulieutrangthaidonhang) {
            color[item.ID_TrangThaiDonHang] = '#' + item.MauTrangThai;
        }
        i = 1;
        for (let item of responseJson.dulieutrangthaithanhtoan) {
            tttt[item.ID_TrangThaiThanhToan] = item.TenTrangThaiThanhToan;
            ttttid[i] = item.ID_TrangThaiThanhToan;
            i++;
        }
        i = 1;
        for (let item of responseJson.dulieutrangthaigiaohang) {
            ttgh[item.ID_TrangThaiGiaoHang] = item.TenTrangThaiGiaoHang;
            ttghid[i] = item.ID_TrangThaiGiaoHang;
            i++;
        }
        for (let item of responseJson.dulieutrangthaihoantatdonhang) {
            tthtdh[item.ID_TrangThaiHoanTatDonHang] = item.TenTrangThai;
        }
        data['ttdh'] = ttdh;
        data['tttt'] = tttt;
        data['ttgh'] = ttgh;
        data['tthtdh'] = tthtdh;
        data['color'] = color;
        data['ttdhid'] = ttdhid;
        data['ttttid'] = ttttid;
        data['ttghid'] = ttghid;
        URlConfig.OBJLOGIN = data;
        console.log('login complete', URlConfig.OBJLOGIN)
    }
}


const styles = StyleSheet.create({
    image: {
        height: height * 0.36, justifyContent: 'center', alignItems: 'center',
        width: width,
        opacity: 0.7
    },
    container: {
        flex: 1,
        paddingTop: 100
    },
    textInput: {
        color: '#2c3e50',
        fontSize: 16,
        height: 38,
        marginLeft: 8,
        paddingHorizontal: 8,
        width: width - width * 0.1 - 80,
    },
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 36
    },
    loginTextButton: {
        fontSize: 16,
        fontFamily: 'Al Nile',
        color: 'white'
    },
    textStyle: {
        color: 'black',
        fontFamily: 'System',
        fontSize: 15
    },
    viewborder: {
        marginTop: 16,
        marginHorizontal: 48,
        borderRadius: 24,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ecf0f1',
    }
})