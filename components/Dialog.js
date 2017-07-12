/**
 * Created by hao on 7/12/17.
 */
import React, {Component} from 'react'
import DatePicker from 'react-native-datepicker'
import {
    Text, View, StyleSheet, TouchableOpacity, Dimensions, Button, Picker, ScrollView,
    TextInput
} from "react-native";
import URlConfig from "../configs/url";
import Color from '../configs/color'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import {DialogComponent, SlideAnimation} from 'react-native-dialog-component';
import {TextInputLayout} from "rn-textinputlayout";


let jsonChoose = {
    ttgh: 'Trạng thái giao hàng',
    tkh: 'Tên khách hàng',
    tttt: 'Trạng thái thanh toán',
    mch: 'Mã cửa hàng',
    id: 'ID đơn hàng',
    mtc: 'Mã tham chiếu'
};
export default class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerValue: 'ttgh',
            pickTtghValue: 'dg',
            idDhValue: ''
        }
    }

    render() {
        return (
            <DialogContent >

                <ScrollView >
                    <Text>Tìm {jsonChoose[this.state.pickerValue]}</Text>
                    <Picker
                        selectedValue={this.state.pickerValue}
                        onValueChange={(value) => {
                            this.setState({pickerValue: value});
                        }} itemStyle={{color: 'red'}}>
                        <Picker.Item label={'Trạng thái giao hàng'} value={'ttgh'}/>
                        <Picker.Item label={'ID đơn hàng'} value={'id'}/>
                        <Picker.Item label={'Trạng thái thanh toán'} value={'tttt'}/>
                        <Picker.Item label={'Mã tham chiếu'} value={'mtc'}/>
                        <Picker.Item label={'Mã cửa hàng'} value={'mch'}/>
                        <Picker.Item label={'Tên khách hàng'} value={'tkh'}/>
                        <Picker.Item label={'Tổng tiền'} value={'tt'}/>
                    </Picker>
                    {this.getCenterView()}

                </ScrollView>

                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity>
                        <Text>haha</Text>
                    </TouchableOpacity>
                    <View></View>
                    <TouchableOpacity>
                        <Text>hehe</Text>
                    </TouchableOpacity>
                </View>
            </DialogContent>
        );
    }

    getCenterView() {
        switch (this.state.pickerValue) {
            case 'ttgh':
                return (

                    <Picker
                        selectedValue={this.state.pickTtghValue}
                        onValueChange={(value) => {
                            this.setState({pickTtghValue: value});
                        }} itemStyle={{color: 'green'}}>
                        <Picker.Item label={'Đã giao'} value={'dg'}/>
                        <Picker.Item label={'Chưa giao'} value={'cg'}/>
                    </Picker>
                );
            case 'id':
                return (
                    <TextInputLayout style={styles.inputLayout} hintColor='white' focusColor='white'>
                        <TextInput
                            value={this.state.idDhValue}
                            style={styles.textInput}
                            placeholder='Nhập id đơn hàng'
                            placeholderTextColor="red"
                            secureTextEntry={false}
                            onChangeText={(text) => this.setState({idDhValue: text})}
                        />
                    </TextInputLayout>
                );
        }
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
        height: 40,
        color: 'red'
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