/**
 * Created by hao on 7/5/17.
 */

import React from 'react';
import {
    Text, Alert, ScrollView,
    View, Platform, Switch, Animated,
    Button, ListView, Image, StyleSheet, StatusBar, TouchableHighlight,
    TouchableOpacity, findNodeHandle, TextInput, Dimensions
} from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';
import Toast from 'react-native-root-toast';
import URlConfig from "../configs/url";
import * as Animatable from 'react-native-animatable';
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import {NavigationActions} from "react-navigation";
import LoginDialog from "../components/LoginDialog";
import {ProgressDialog} from 'react-native-simple-dialogs';
import ultils from "../configs/ultils";
import {CheckBox} from 'react-native-elements'
import Communications from 'react-native-communications';
import {Icon} from 'react-native-elements'

let {width, height} = Dimensions.get('window')
const Realm = require('realm');
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


    componentWillMount() {
        let realm = new Realm({
            schema: [{
                name: 'LoginSave',
                properties: {idct: 'string', username: 'string', password: 'string'}
            }]
        });
    }

    componentDidMount() {
        let realm = new Realm();
        let login = realm.objects('LoginSave');
        console.log('didMount', login)
        if (login.length !== 0) {
            var loginOBJ = login[0];
            this.setState({
                idct: loginOBJ.idct,
                username: loginOBJ.username,
                password: loginOBJ.password,
                checkOfCheckBox: true
            })
        }
    }


    render() {
        const hotline = '043.565.2626';
        let website = 'http://ksmart.vn';
        let windowWidth = Dimensions.get('window').width;
        return (
            <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'column', backgroundColor: 'white'}}>
                <Animatable.Image
                    source={require('../images/bg.png')}
                    style={styles.image}
                    resizeMode={Image.resizeMode.cover}
                    blurRadius={1}
                >
                    <View style={{alignSelf: 'center', backgroundColor: 'transparent'}}>
                        <Image source={require('../images/logoksmart.png')}
                               style={{alignSelf: 'center', width: 100, height: 100}}/>
                        <Text style={{
                            color: 'white',
                            fontSize: 30,
                            alignSelf: 'center',
                            marginTop: 8,
                            fontFamily: 'GillSans-Light'
                        }}>Ksmart Manager</Text>
                    </View>
                </Animatable.Image>
                <ScrollView style={{flex: 1, alignSelf: 'center', backgroundColor: 'white'}}
                            keyboardDismissMode="on-drag" scrollEnabled={false}>

                </ScrollView>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'absolute',
                    backgroundColor: 'white',
                    padding: 8,
                    top: height * 0.32, left: width * 0.05, right: width * 0.05, bottom: height * 0.3,
                }}>

                    <View style={{alignSelf: 'center', width: windowWidth}}>
                        <View style={styles.viewborder}>
                            <TextInput
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
                            <Icon name="account-balance" size={24} color="#90CAF9"/>
                        </View>
                        <View style={styles.viewborder}>
                            <TextInput
                                ref="ipPass"
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
                            <Icon name="user-circle-o" type="font-awesome" size={24} color="#90CAF9"/>
                        </View>
                        <View style={styles.viewborder}>
                            <TextInput
                                ref="ipRePass"
                                value={this.state.password}
                                style={styles.textInput}
                                returnKeyType={"done"}
                                placeholder={'Mật khẩu'}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({password: text})}
                            />
                            <Icon name="security" size={24} color="#90CAF9"/>
                        </View>

                    </View>
                    <View
                        style={{flexDirection: 'column', alignSelf: 'center', marginTop: 16, alignItems: 'center'}}>
                        <CheckBox
                            textStyle={{color: 'gray'}}
                            title='Ghi nhớ đăng nhập'
                            checked={this.state.checkOfCheckBox}
                            onPress={() => this.setState({checkOfCheckBox: !this.state.checkOfCheckBox})}
                            style={{backgroundColor: 'transparent'}}
                        />
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor="transparent"
                            style={{
                                height: 48,
                                marginTop: 16,
                                borderRadius: 24,
                                backgroundColor: '#4c91f8',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 16,
                                width: width - width * 0.1,
                            }}
                            onPress={() => this.startLogin()}>
                            <Animatable.Text style={styles.loginTextButton}>Đăng
                                nhập</Animatable.Text>

                        </TouchableHighlight>
                    </View>

                </View>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    width: Dimensions.get('window').width,
                    flexDirection: 'column', backgroundColor: 'transparent'
                }}>

                    <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                        <Text style={styles.textStyle}>Website: </Text>
                        <TouchableOpacity onPress={() => Communications.web(website)}>
                            <Text style={styles.textStyle}>{website}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                        <Text style={styles.textStyle}>Hotline: </Text>
                        <TouchableOpacity onPress={() => {
                            Communications.phonecall(hotline, true)
                        }}>
                            <Text style={styles.textStyle}>{hotline}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{alignSelf: 'center'}}>
                        <Text style={styles.textStyle}>Phien ban: 1.0.0</Text>
                    </View>
                </View>
                <ProgressDialog
                    visible={this.state.progressVisible}
                    title=""
                    activityIndicatorStyle={{padding: 24}}
                    message="Đang đăng nhập"
                />
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
            console.log(urlLogin)
            fetch(urlLogin)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({progressVisible: false})
                    if (!responseJson.status) {
                        this.showToast(responseJson.msg);
                    } else {
                        if (this.state.checkOfCheckBox) {

                            let realm = new Realm();
                            let allLogin = realm.objects('LoginSave');

                            realm.write(() => {
                                realm.delete(allLogin);
                                realm.create('LoginSave', {
                                    idct: this.state.idct,
                                    username: this.state.username,
                                    password: this.state.password
                                });
                            });
                            realm.close()
                        } else {
                            let realm = new Realm();
                            let allLogin = realm.objects('LoginSave');
                            realm.write(() => {
                                realm.delete(allLogin);
                            })

                        }
                        this.handlDataLogin(responseJson)
                        const {navigate} = this.props.navigation;
                        this.setState({progressVisible: false})
                        this.props
                            .navigation
                            .dispatch(NavigationActions.reset(
                                {
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({routeName: 'Home'})
                                    ]
                                }));

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
        width: width
    },
    container: {
        flex: 1,
        paddingTop: 100
    },
    textInput: {
        fontSize: 16,
        height: 40,
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
        color: 'gray'
    },
    viewborder: {
        borderBottomWidth: 0.5,
        marginTop: 16,
        marginHorizontal: 48,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#90CAF9'
    }
})