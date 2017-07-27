import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    Button, ListView, StyleSheet, StatusBar,
    TouchableOpacity,
    Dimensions,
    BackHandler,
    FlatList,
    ActivityIndicator,
    Platform
} from 'react-native';
import Image from 'react-native-image-progress';
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'

import Color from '../configs/color'
import URlConfig from "../configs/url";
export default class ChooseTypeChart extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flex: 1,
                marginTop: Platform.OS === 'ios' ? 16 : 0,

            }}>
                <View style={styles.titleStyle}>
                    <TouchableOpacity style={styles.iconStyle} onPress={() => this.props.backToHome()}>
                        <Icon2 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>Chọn loại biểu đồ</Text>
                    <View style={{backgroundColor: Color.backgroundNewFeed, width: 35, height: 35}}/>
                </View>
                <TouchableOpacity onPress={() => this.props.backToHome()}
                                  style={{
                                      width: 50,
                                      height: 50,
                                      position: 'absolute',
                                      left: 16,
                                      top: 0,
                                      right: 0,
                                      bottom: 0
                                  }}/>
                <View style={{flex: 9, justifyContent: 'center'}}>
                    <TouchableOpacity
                        onPress={() => this.props.goToDoanhThuChart()}
                        style={styles.touchableStyle}>
                        <Text style={styles.textStyle}>Biểu đồ doanh thu
                            sản lượng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableStyle} onPress={() => this.props.goToDoanhThuNVChart()}>
                        <Text style={styles.textStyle}>Biểu đồ doanh thu
                            sản lượng theo nhân viên</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.goToOnlineChart()}
                        style={styles.touchableStyle}>
                        <Text style={styles.textStyle}>Biểu đồ tần suất
                            nhân viên online</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.goToTravelChart()}
                        style={styles.touchableStyle}>
                        <Text style={styles.textStyle}>Biểu đồ tần suất
                            viếng thăm theo nhân viên</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const propView = 7 / 8;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    textStyle: {
        color: 'white', backgroundColor: 'transparent', fontSize: 16, textAlign: 'center', width: width * propView
    },
    touchableStyle: {
        borderRadius: 32,
        backgroundColor: '#19b5fe',
        marginBottom: 16,
        paddingVertical: 16,
        elevation: 10
    }, titleStyle: {
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: Color.backgroundNewFeed,
    },
    iconStyle: {
        alignSelf: 'center',
        width: 35,
        height: 35,
        backgroundColor: "transparent",
        marginLeft: 16,
        marginTop: (Platform.OS === 'ios') ? 8 : 0
    }

})