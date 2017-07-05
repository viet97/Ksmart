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
        };
    }

    imageLoaded() {
        this.setState({viewRef: findNodeHandle(this.backgroundImage)});
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
                                placeholder={'Tên đăng nhập'}
                                secureTextEntry={false}
                            />
                        </TextInputLayout>
                        <TextInputLayout style={styles.inputLayout} hintColor='white' focusColor='white'>
                            <TextInput
                                style={styles.textInput}
                                placeholder={'Mật khẩu'}
                                secureTextEntry={true}
                            />
                        </TextInputLayout>
                    </View>
                    <View style={{flexDirection: 'column', alignSelf: 'center', marginTop: 16, alignItems: 'center'}}>
                        <CheckBox
                            checkedImage={require("../images/ic_done_3x.png")}
                            uncheckedImage={require("../images/ic_crop_3_2_3x.png")}
                            labelStyle={{color: 'red'}}
                            underlayColor="transparent"
                            label='Ghi nho dang nhap'
                            checked={this.state.checkOfCheckBox}
                            onChange={(checked) => this.setState({checkOfCheckBox: !this.state.checkOfCheckBox})}
                        />
                        <TouchableOpacity
                            style={{height: 48, backgroundColor: 'transparent', justifyContent: 'center'}}>
                            <Text style={{fontSize: 16, alignSelf: 'center', color: 'blue'}}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        );
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