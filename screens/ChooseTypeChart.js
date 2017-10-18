import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    Button, ListView, StyleSheet, StatusBar,
    TouchableOpacity,
    Dimensions, Image,
    Platform
} from 'react-native';
import Icon2 from 'react-native-vector-icons/Ionicons'

import ChooseTypeChartItem from "../components/ChooseTypeChartItem";
import LinearGradient from "react-native-linear-gradient";
import HeaderCustom from "../components/Header";

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

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 2
        };
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex})
    }


    render() {
        const {navigate} = this.props.navigation
        const buttons = [{element: component1}, {element: component2}, {element: component3}, {element: component4}]
        const {selectedIndex} = this.state;
        return (
            <View style={{
                flex: 1,
            }}>
                <HeaderCustom
                    title={"Chọn loại biểu đồ"}
                    leftClick={() => this.props.navigation.goBack()}

                />
                <View style={{flex: 9}}>
                    <View style={styles.view1}>
                        <TouchableOpacity
                            style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 8}}
                            onPress={() => {
                                navigate('Chart')
                            }}
                        >
                            <Image source={require('../images/bd1.png')} style={{width: width / 6, height: width / 6}}/>
                            <Text style={{height: 48, textAlign: 'center', fontSize: 16, color: 'black'}}>Doanh thu sản
                                lượng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 8}}
                            onPress={() => {
                                navigate('RevenuePerPersonnel')
                            }}
                        >
                            <Image source={require('../images/bd2.png')} style={{width: width / 6, height: width / 6}}/>
                            <Text style={{height: 48, textAlign: 'center', fontSize: 16, color: 'black'}}>Doanh thu sản
                                lượng theo nhân viên</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.view1}>
                        <TouchableOpacity
                            style={{flex: 1, justifyContent: 'center', marginHorizontal: 8}}

                            onPress={() => {
                                navigate('TravelChart')
                            }}>
                            <Image source={require('../images/bd3.png')}
                                   style={{width: width / 6, height: width / 6, alignSelf: 'center'}}/>
                            <Text style={{height: 48, textAlign: 'center', fontSize: 16, color: 'black'}}>Tần suất nhân
                                viên viếng thăm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{flex: 1, justifyContent: 'center', marginVertical: 8}}

                            onPress={() => {
                                navigate('OnlineChart')
                            }}
                        >
                            <Image source={require('../images/bd4.png')}
                                   style={{width: width / 6, height: width / 6, alignSelf: 'center'}}/>
                            <Text style={{height: 48, textAlign: 'center', fontSize: 16, color: 'black'}}>Tần suất nhân
                                viên online</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 2}}/>
                </View>


            </View>
        )
    }
}


const styles = StyleSheet.create({
    view1: {
        flexDirection: 'row', flex: 1, backgroundColor: 'transparent'
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
        paddingTop: Platform.OS === 'ios' ? 16 : 0,
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
    }

});