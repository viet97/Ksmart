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
import {ButtonGroup} from "react-native-elements";

import * as Animatable from 'react-native-animatable';
import ChooseTypeItem from "../components/ChooseTypeItem";
import ChooseTypeChartItem from "../components/ChooseTypeChartItem";

const propView = 7 / 8;
const {width, height} = Dimensions.get('window');
const component1 = () => <Text numberOfLines={1} style={{textAlign: 'center'}}>Doanh thu sản lượng</Text>
const component2 = () => <Text numberOfLines={1} style={{textAlign: 'center'}}>Doanh thu sản lượng theo nhân viên</Text>
const component3 = () => <Text numberOfLines={1} style={{textAlign: 'center'}}>Tần suất nhân viên online</Text>
const component4 = () => <Text numberOfLines={1} style={{textAlign: 'center'}}>Tần suất viếng thăm theo nhân viên</Text>
export default class ChooseTypeChart extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super()
        this.state = {
            selectedIndex: 2
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex})
    }


    render() {
        const buttons = [{element: component1}, {element: component2}, {element: component3}, {element: component4}]
        const {selectedIndex} = this.state
        return (
            <View style={{
                flex: 1,
            }}>
                <Image source={require('../images/bg.png')}
                       style={{position: 'absolute', top: 0}}/>
                <View style={styles.titleStyle}>
                    <Image source={require('../images/bg.png')}
                           style={{position: 'absolute'}}/>
                    <TouchableOpacity onPress={() => this.props.backToHome()}
                                      style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon2 style={styles.iconStyle} size={24} color="white"
                               name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Chọn
                        loại biểu đồ</Text>
                    <View style={{width: 35, height: 35}}/>
                </View>
                <View style={{flex: 9}}>
                    <View style={styles.view1}>
                        <ChooseTypeChartItem
                            goToChart={() => this.props.goToDoanhThuChart()}
                            title='Doanh thu sản lượng'
                        />
                        <ChooseTypeChartItem
                            goToChart={() => this.props.goToDoanhThuNVChart()}
                            title='Doanh thu sản lượng theo nhân viên'
                        />
                    </View>
                    <View style={styles.view1}>
                        <ChooseTypeChartItem
                            goToChart={() => this.props.goToTravelChart()}
                            title='Tần suất nhân viên viếng thăm'
                        />
                        <ChooseTypeChartItem
                            goToChart={() => this.props.goToOnlineChart()}
                            title='Tần suất nhân viên online'
                        />
                    </View>
                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    view1: {
        flexDirection: 'row'
    },
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
    },
    titleIconsMenu: {
        alignSelf: 'center',
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        fontFamily: 'Al Nile'
    },
    iconStyle: {

        alignSelf: 'center',
        backgroundColor: "transparent",
        marginLeft: 8,
        marginTop: (Platform.OS === 'ios') ? 8 : 0
    }

});