/**
 * Created by hao on 7/5/17.
 */

import React from 'react';
import {
    Text,
    View, Platform, Switch,
    Button, ListView, Image, StyleSheet, StatusBar,
    TouchableOpacity, findNodeHandle, TextInput, Dimensions
} from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';
import CheckBox from 'react-native-checkbox'
import Toast from 'react-native-simple-toast';
import URlConfig from "../configs/url";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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


    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
                <Image
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
                                style={styles.textInput}
                                placeholder={'Mã công ty'}
                                secureTextEntry={false}
                                onChangeText={(text)=>this.setState({idct:text})}

                            />
                        </TextInputLayout>
                        <TextInputLayout style={styles.inputLayout} hintColor='white' focusColor='white'>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Tên đăng nhập'}
                                secureTextEntry={false}
                                onChangeText={(text)=>this.setState({username:text})}
                            />
                        </TextInputLayout>
                        <TextInputLayout style={styles.inputLayout} hintColor='white' focusColor='white'>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Mật khẩu'}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({password:text})}
                            />
                        </TextInputLayout>
                    </View>
                    <View style={{flexDirection: 'column', alignSelf: 'center', marginTop: 16, alignItems: 'center'}}>
                        <CheckBox
                            checkedImage={require("../images/ic_done_3x.png")}
                            uncheckedImage={require("../images/ic_crop_3_2_3x.png")}
                            labelStyle={{color: 'red'}}
                            underlayColor="transparent"
                            label='Ghi nhớ đăng nhập'
                            checked={this.state.checkOfCheckBox}
                            onChange={(checked) => this.setState({checkOfCheckBox: !this.state.checkOfCheckBox})}
                        />
                        <TouchableOpacity
                            style={{height: 48, backgroundColor: 'transparent', justifyContent: 'center'}} onPress={()=>this.startLogin()}>
                            <Text style={{fontSize: 16, alignSelf: 'center', color: 'blue'}}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        );
    }
    startLogin(){
        // Toast.show('hihi do ngok',Toast.LONG)
        if(this.state.password.length===0||this.state.username===0||this.state.idct===0){
            Toast.show('Vui lòng nhập đầy đủ thông tin đăng nhập!',Toast.LONG)
        }else {

            fetch(URlConfig.getRouterApp(this.state.idct))
                .then((response) => response.json())
                .then((responseJson) => {
                    if (!responseJson.status){
                        Toast.show('Mã công ty không chính xác!');
                    }else{
                        URlConfig.BASE_URL_APP=responseJson.data;
                        let urlLogin=URlConfig.getLoginRouter(this.state.username,this.state.password,this.state.idct);
                        console.log(urlLogin)
                        fetch(urlLogin)
                            .then((response) => response.json())
                            .then((responseJson) => {
                                if (!responseJson.status){
                                    Toast.show('Mã công ty không chính xác!');
                                }else{
                                    Toast.show('hihi dc r');
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
    }
})