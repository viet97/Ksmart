/**
 * Created by hao on 7/5/17.
 */

import React from 'react';
import {
    Text, Alert,
    View, Platform, Switch, Animated,
    Button, ListView, Image, StyleSheet, StatusBar, TouchableHighlight,
    TouchableOpacity, findNodeHandle, TextInput, Dimensions
} from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';
import CheckBox from 'react-native-checkbox'
import Toast from 'react-native-simple-toast';
import URlConfig from "../configs/url";
import * as Animatable from 'react-native-animatable';

import {NavigationActions} from "react-navigation";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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
        return (
            <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
                <Animatable.Image
                    source={require('../images/bg.png')}
                    style={styles.absolute}
                    resizeMode={Image.resizeMode.cover}
                    blurRadius={(Platform.OS === 'ios') ? 1 : 1}
                />
                <View style={{flexDirection: 'column', flex: 1, width: windowWidth - 2, justifyContent: 'center'}}>
                    <View>
                        <Image source={require('../images/logoksmart.png')}
                               style={{alignSelf: 'center',}}/>
                    </View>
                    <View style={{alignSelf: 'center', width: windowWidth}}>
                        <TextInputLayout style={styles.inputLayout}
                                         hintColor='white' focusColor='white'>
                            <TextInput
                                value={this.state.idct}
                                style={styles.textInput}
                                placeholder={'Mã công ty'}
                                secureTextEntry={false}
                                onChangeText={(text) => this.setState({idct: text})}

                            />
                        </TextInputLayout>
                        <TextInputLayout style={styles.inputLayout} hintColor='white' focusColor='white'>
                            <TextInput
                                value={this.state.username}
                                style={styles.textInput}
                                placeholder={'Tên đăng nhập'}
                                secureTextEntry={false}
                                onChangeText={(text) => this.setState({username: text})}
                            />
                        </TextInputLayout>
                        <TextInputLayout style={styles.inputLayout} hintColor='white' focusColor='white'>
                            <TextInput
                                value={this.state.password}
                                style={styles.textInput}
                                placeholder={'Mật khẩu'}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({password: text})}
                            />
                        </TextInputLayout>
                    </View>
                    <View style={{flexDirection: 'column', alignSelf: 'center', marginTop: 16, alignItems: 'center'}}>
                        <CheckBox
                            checkedImage={require("../images/checked.png")}
                            uncheckedImage={require("../images/noncheck.png")}
                            labelStyle={{color: 'red'}}
                            underlayColor="transparent"
                            label='Ghi nhớ đăng nhập'
                            checked={this.state.checkOfCheckBox}
                            onChange={(checked) => this.setState({checkOfCheckBox: !this.state.checkOfCheckBox})}
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

            </View>
        );
    }

    startLogin() {

        if (this.state.password.length === 0 || this.state.username === 0 || this.state.idct === 0) {
            Toast.show('Vui lòng nhập đầy đủ thông tin đăng nhập!', Toast.LONG)
        } else {

            fetch(URlConfig.getRouterApp(this.state.idct))
                .then((response) => response.json())
                .then((responseJson) => {
                    if (!responseJson.status) {
                        Toast.show(responseJson.msg);
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
                                    URlConfig.OBJLOGIN = responseJson;
                                    const {navigate} = this.props.navigation;

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
                            });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
}


const styles = StyleSheet.create({
    absolute: {
        top: 0, bottom: 0, left: 0, right: 0, position: 'absolute'
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