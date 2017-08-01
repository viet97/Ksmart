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
import CheckBox from 'react-native-checkbox'
import Toast from 'react-native-simple-toast';
import URlConfig from "../configs/url";
import * as Animatable from 'react-native-animatable';
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import {NavigationActions} from "react-navigation";
import LoginDialog from "../components/LoginDialog";
import {ProgressDialog} from 'react-native-simple-dialogs';

let {width, height} = Dimensions.get('window')
const Realm = require('realm');
export default class LoginScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            checkOfCheckBox: false,
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
        console.log('didMount')
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
        var windowWidth = Dimensions.get('window').width;
        return (
            <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
                <Animatable.Image
                    source={require('../images/bg.png')}
                    style={styles.absolute}
                    resizeMode={Image.resizeMode.cover}
                    blurRadius={1}
                />
                <View style={{flexDirection: 'column', flex: 1, width: windowWidth - 2, justifyContent: 'center'}}>
                    <View>
                        <Image source={require('../images/logoksmart.png')}
                               style={{alignSelf: 'center', width: 100, height: 100}}/>
                    </View>
                    <View style={{alignSelf: 'center', width: windowWidth}}>
                        <TextInputLayout style={styles.inputLayout}
                                         hintColor='white' focusColor='white'>
                            <TextInput
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
                        </TextInputLayout>
                        <TextInputLayout style={styles.inputLayout} hintColor='white' focusColor='white'>
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
                        </TextInputLayout>
                        <TextInputLayout style={styles.inputLayout} hintColor='white' focusColor='white'>
                            <TextInput
                                ref="ipRePass"
                                value={this.state.password}
                                style={styles.textInput}
                                returnKeyType={"done"}
                                placeholder={'Mật khẩu'}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({password: text})}
                                onSubmitEditing={(event) => {
                                    this.startLogin();
                                }}
                            />
                        </TextInputLayout>
                    </View>
                    <View style={{flexDirection: 'column', alignSelf: 'center', marginTop: 16, alignItems: 'center'}}>
                        <CheckBox
                            checkedImage={require("../images/checked.png")}
                            uncheckedImage={require("../images/noncheck.png")}
                            labelStyle={{color: '#00B232'}}
                            underlayColor="transparent"
                            label='Ghi nhớ đăng nhập'
                            checked={this.state.checkOfCheckBox}
                            onChange={(checked) => {
                                this.setState({checkOfCheckBox: !this.state.checkOfCheckBox});
                                console.log(checked)
                            }}
                        />
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor="transparent"
                            style={{height: 48, backgroundColor: 'transparent', justifyContent: 'center', padding: 16}}
                            onPress={() => this.startLogin()}>
                            <Animatable.Text animation="fadeInDown" style={styles.loginTextButton}>Đăng
                                nhập</Animatable.Text>

                        </TouchableHighlight>
                    </View>
                </View>
                <ProgressDialog
                    visible={this.state.progressVisible}
                    title=""
                    message="Đang đăng nhập"
                />

            </View>
        );
    }

    startLogin() {
        this.setState({progressVisible: true})
        if (this.state.password.length === 0 || this.state.username === 0 || this.state.idct === 0) {
            Toast.show('Vui lòng nhập đầy đủ thông tin đăng nhập!', Toast.LONG)
            this.setState({progressVisible: false})
        } else {

            fetch(URlConfig.getRouterApp(this.state.idct))
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("123123")
                    if (!responseJson.status) {
                        Toast.show(responseJson.msg);
                        this.setState({progressVisible: false})
                    } else {
                        URlConfig.BASE_URL_APP = responseJson.data;
                        let urlLogin = URlConfig.getLoginRouter(this.state.username, this.state.password, this.state.idct);
                        console.log(urlLogin)
                        fetch(urlLogin)
                            .then((response) => response.json())
                            .then((responseJson) => {
                                if (!responseJson.status) {
                                    Toast.show(responseJson.msg);
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
                                this.setState({progressVisible: true})
                                Toast.show('Có lỗi xảy ra, thử lại sau')
                            });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.setState({progressVisible: true})
                    Toast.show('Có lỗi xảy ra, thử lại sau')
                });
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
    absolute: {
        top: 0, bottom: 0, left: 0, right: 0, position: 'absolute',
    },
    container: {
        flex: 1,
        paddingTop: 100
    },
    textInput: {
        fontSize: 16,
        height: 40
    },
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 36
    },
    loginTextButton: {
        fontSize: 16,
        fontFamily: 'Al Nile',
        color: 'darkblue'
    }
})