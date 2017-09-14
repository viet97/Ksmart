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
    Platform,
    ScrollView
} from 'react-native';
import Image from 'react-native-image-progress';
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
import DatePicker from 'react-native-datepicker'
import ChooseTypeItem from "../components/ChooseTypeItem";
import Color from '../configs/color'

let {width, height} = Dimensions.get('window')
export default class ChooseTypeNew extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = dd + '-' + mm + '-' + yyyy;
        super(props)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Image source={require('../images/bg.png')}
                       style={{position: 'absolute', top: 0}}/>
                <View style={styles.titleStyle}>
                    {function () {
                        if (Platform.OS !== 'ios')
                            return (<Image source={require('../images/bg.png')}
                                           style={{position: 'absolute'}}/>)
                    }()}
                    <TouchableOpacity onPress={() => this.props.backToHome()}
                                      style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon2 style={styles.iconStyle} size={24} color="white"
                               name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 20,
                            color: 'white',
                            alignSelf: 'center',
                            backgroundColor: 'transparent'
                        }}>Hoạt động</Text>
                    <View style={{backgroundColor: 'transparent', width: 35, height: 35}}/>
                </View>
                <View style={{flex: 9}}>
                    <ScrollView>
                        <View style={styles.view1}>
                            <ChooseTypeItem
                                goToDetail={() => this.props.goToOrder(0)}
                                title='Tất cả'
                            />
                        </View>

                        <View style={styles.view1}>
                            <ChooseTypeItem
                                goToDetail={() => this.props.goToOrder(0)}
                                title='Đăng nhập'
                            />
                            <ChooseTypeItem
                                goToDetail={() => this.props.goToOrder(1)}
                                title='Đăng xuất'
                            />
                        </View>
                        <View style={styles.view1}>
                            <ChooseTypeItem
                                goToDetail={() => this.props.goToOrder(2)}
                                title='Vào điểm'
                            />
                            <ChooseTypeItem
                                goToDetail={() => this.props.goToOrder(3)}
                                title='Ra điểm'
                            />
                        </View>
                        <View style={styles.view1}>
                            <ChooseTypeItem
                                goToDetail={() => this.props.goToOrder(2)}
                                title='Chụp ảnh'
                            />
                            <ChooseTypeItem
                                goToDetail={() => this.props.goToOrder(3)}
                                title='Lập đơn hàng'
                            />
                        </View>

                    </ScrollView>
                </View>
            </View>
        )
    }

    ondateChange(from, to) {
        this.setState({dataRender: null})
        var dFrom = String(from);
        var dTo = String(to);
        dFrom.replace('/', '-');
        dTo.replace('/', '-');
        this.setState({dateFrom: dFrom, dateTo: dTo}, function () {
            //keo lai data tư sv xuống
        })
    }

    componentDidMount() {
        // keo data tu server xuong
    }
}
const styles = StyleSheet.create({
    view1: {
        flexDirection: 'row'
    },
    titleStyle: {
        marginTop: Platform.OS === 'ios' ? 16 : 0,
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    headerStyle: {
        elevation: 15, height: this.height / 7
    },
    itemSideMenuStyle: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 8,
        paddingBottom: 8
    }, iconStyle: {
        alignSelf: 'center',
        width: 24,
        height: 24,
        backgroundColor: "transparent",
        paddingLeft: 8,
        paddingTop: (Platform.OS === 'ios') ? 4 : 0
    },
    textStyle: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent'
    },
    titleIconsMenu: {
        textAlign: 'center',
        color: 'white'
    },
    indicator: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    }
})