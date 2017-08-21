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
    Platform, Image,
    TextInput
} from 'react-native';
import Search from 'react-native-search-box';
import Communications from 'react-native-communications';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import URlConfig from "../configs/url";
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import Icon4 from 'react-native-vector-icons/Foundation'
import React from 'react';
import Color from '../configs/color'
import Toast from 'react-native-simple-toast'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import TabNavigator from 'react-native-tab-navigator';
import MapListScreen from "./MapListScreen";
import MapView from 'react-native-maps';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import MapScreen from "./MapScreen";
import ultils from "../configs/ultils";
import DatePicker from "react-native-datepicker";

var {width, height} = Dimensions.get('window');
export default class DetailTravel extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });

    constructor(props) {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        today = dd + '-' + mm + '-' + yyyy;
        super(props)
        this.state = {
            tennhanvien: '',
            tenkhachhang: '',
            dateCome: today,
            dateOut: today,
            timeCome: '00:00',
            timeOut: '00:00'
        }
    }

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={{flex: 1}}>
                <Image source={require('../images/bg.png')}
                       style={{position: 'absolute', top: 0}}/>
                <View style={styles.titleStyle}>
                    <Image source={require('../images/bg.png')}
                           style={{position: 'absolute'}}/>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                        style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Chỉnh
                        sửa kế hoạch</Text>
                    <TouchableOpacity
                        style={{
                            padding: 8,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'transparent'
                        }}>
                        <Text style={{color: 'white', paddingRight: 8, paddingTop: 8}}>OK</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginTop: 4, marginBottom: 4, marginLeft: 8, marginRight: 8,
                    flex: 9
                }}>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 8,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Text style={{
                            backgroundColor: 'transparent',
                            fontSize: 16,
                            alignSelf: 'center'
                        }}>Tên nhân viên: </Text>
                        <TextInput
                            style={{
                                height: 40,
                                flex: 1,
                                borderColor: 'gray',
                                borderWidth: 1,
                                backgroundColor: 'white',
                                paddingLeft: 8,
                                marginLeft: 32
                            }}
                            onChangeText={(text) => {
                                this.setState({tennhanvien: text})

                            }}

                            value={this.state.tennhanvien}
                        />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Text style={{backgroundColor: 'transparent', fontSize: 16, alignSelf: 'center'}}>Tên khách
                            hàng: </Text>
                        <TextInput
                            style={{
                                height: 40,
                                flex: 1,
                                borderColor: 'gray',
                                borderWidth: 1,
                                backgroundColor: 'white',
                                paddingLeft: 8,
                                marginLeft: 18
                            }}
                            onChangeText={(text) => {
                                this.setState({tenkhachhang: text})

                            }}

                            value={this.state.tenkhachhang}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Text style={{backgroundColor: 'transparent', fontSize: 16}}>Vào điểm dự kiến:</Text>

                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Text style={{backgroundColor: 'transparent', alignSelf: 'center'}}>Ngày: </Text>
                        <DatePicker
                            style={{marginLeft: 8}}
                            date={this.state.dateCome}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"

                            confirmBtnText="Xác nhận"
                            cancelBtnText="Huỷ bỏ"
                            customStyles={{
                                dateIcon: {},
                                dateInput: {
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    borderRadius: 4,
                                },
                            }}
                            onDateChange={(date) => {
                                this.setState({dateCome: date})
                            }}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Text style={{backgroundColor: 'transparent', fontSize: 16, alignSelf: 'center'}}>Giờ: </Text>
                        <DatePicker
                            style={{marginLeft: 14}}
                            date={this.state.timeCome}
                            mode="time"
                            placeholder="select date"
                            format="HH:mm"
                            confirmBtnText="Xác nhận"
                            cancelBtnText="Huỷ bỏ"
                            customStyles={{
                                dateIcon: {},
                                dateInput: {
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    borderRadius: 4,
                                },
                            }}
                            onDateChange={(time) => {
                                this.setState({timeCome: time})
                            }}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Text style={{backgroundColor: 'transparent', fontSize: 16, alignSelf: 'center'}}>Ra điểm dự
                            kiến:</Text>

                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Text style={{backgroundColor: 'transparent', alignSelf: 'center'}}>Ngày: </Text>
                        <DatePicker
                            style={{marginLeft: 8}}
                            date={this.state.dateOut}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"

                            confirmBtnText="Xác nhận"
                            cancelBtnText="Huỷ bỏ"
                            customStyles={{
                                dateIcon: {},
                                dateInput: {
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    borderRadius: 4,
                                },
                            }}
                            onDateChange={(date) => {
                                this.setState({dateOut: date})
                            }}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Text style={{backgroundColor: 'transparent', fontSize: 16, alignSelf: 'center'}}>Giờ: </Text>
                        <DatePicker
                            style={{marginLeft: 14}}
                            date={this.state.timeOut}
                            mode="time"
                            placeholder="select date"
                            format="HH:mm"
                            confirmBtnText="Xác nhận"
                            cancelBtnText="Huỷ bỏ"
                            customStyles={{
                                dateIcon: {},
                                dateInput: {
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    borderRadius: 4,
                                },
                            }}
                            onDateChange={(time) => {
                                this.setState({timeOut: time})
                            }}
                        />
                    </View>

                </View>
            </View>
        )
    }

    millisToMinutes(from, to) {
        var dateFrom = new Date(from)
        var dateTo = new Date(to)
        var millis = dateFrom - dateTo;
        var minutes = Math.floor(millis / 60000);
        return minutes;
    }

    componentDidMount() {
        const {params} = this.props.navigation.state;
        this.setState({
            tennhanvien: params.data.TenNhanVien,
            tenkhachhang: params.data.TenCuaHang
        })
    }
}

const styles = StyleSheet.create({
    titleStyle: {
        marginTop: Platform.OS === 'ios' ? 16 : 0,
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: Color.backgroundNewFeed,
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
        marginLeft: 16,
        marginTop: (Platform.OS === 'ios') ? 8 : 0
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
    },
    text1: {
        fontSize: 12, marginTop: 4, marginRight: 8, color: 'black', backgroundColor: 'transparent'
    },
    text2: {
        fontSize: 18, fontWeight: 'bold', backgroundColor: 'transparent'
    },
    viewCover: {
        borderBottomWidth: 1, borderBottomColor: 'white', marginLeft: 16, marginTop: 8
    },
    list: {
        justifyContent: 'center',
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        margin: 3,
    }
})