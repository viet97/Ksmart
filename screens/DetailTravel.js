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
    Platform, Image
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
import Utils from "../configs/ultils";

var {width, height} = Dimensions.get('window');
export default class DetailTravel extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
        this.id = this.state.data.IDKeHoach
        this.getData = this.getDataFromSv()
    }

    isOnline(dangtructuyen) {
        if (dangtructuyen === 1)
            return <Icon2 size={36} color="green" name="controller-record"/>
        else if (dangtructuyen === 2) return <Icon2 size={36} color="red" name="controller-record"/>
        else if (dangtructuyen === 0) return <Icon2 size={36} color="gray" name="controller-record"/>

    }

    getDataFromSv() {
        const {params} = this.props.navigation.state
        fetch(URlConfig.getLinkDetailTravel(params.id))
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    this.setState({
                            data: responseJson.thongtin,
                            region: {
                                latitude: responseJson.thongtin.ViDo,
                                longitude: responseJson.thongtin.KinhDo,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            },
                            selectedTab: 'blueTab'
                        }
                    )
                }
                console.log(URlConfig.getLinkDetailTravel(params.id))
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))

    }

    render() {
        let come = new Date(this.state.data.ThoiGianVaoDiemDuKien);
        let now = new Date();
        let showSwipe = false;
        if (come.getTime() - now.getTime() >= 5 * 60 * 1000) {
            showSwipe = true;
        }
        const {navigate} = this.props.navigation
        var strVaoDiem = '';
        var strRaDiem = '';
        if (this.state.data.ThoiGianVaoDiemThucTe === '1900-01-01T00:00:00') {
            strVaoDiem = "Chưa vào điểm!"
        } else {
            strVaoDiem = 'Vào điểm lúc: ' + Utils.changeDateFormat(this.state.data.ThoiGianVaoDiemThucTe)
        }
        if (this.state.data.ThoiGianRaDiemThucTe === '1900-01-01T00:00:00') {
            strRaDiem = "Chưa ra điểm!"
        } else {
            strRaDiem = 'Ra điểm lúc: ' + Utils.changeDateFormat(this.state.data.ThoiGianRaDiemThucTe);
        }
        return (
            <View style={{flex: 1}}>
                <Image source={require('../images/bg3.png')}
                       style={{position: 'absolute', top: 0}}/>
                <View style={styles.titleStyle}>
                    <Image source={require('../images/bg3.png')}
                           style={{position: 'absolute'}}/>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                        style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Thông
                        tin kế hoạch</Text>
                    {function () {
                        if (showSwipe) {
                            return (
                                <TouchableOpacity
                                    onPress={() => {

                                        navigate('EditTravel', {
                                            id: this.id,
                                            reload: () => this.getData
                                        })
                                    }}
                                    style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                                    <Icon2 style={{
                                        alignSelf: 'center',
                                        width: 24,
                                        height: 24,
                                        backgroundColor: "transparent",
                                        marginLeft: 16,
                                        marginTop: (Platform.OS === 'ios') ? 8 : 0,
                                    }} size={24} color="white" name="edit"/>
                                </TouchableOpacity>
                            )
                        }
                        else {
                            return (
                                <View/>
                            )
                        }
                    }()}
                </View>
                <View style={{
                    marginTop: 4, marginBottom: 4, marginLeft: 8, marginRight: 8,
                }}>
                    <View style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 8,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{alignSelf: 'center', backgroundColor: 'transparent'}}>Tên nhân viên: </Text>
                            <Text style={{
                                marginLeft: 8,
                                backgroundColor: 'transparent'
                            }}>{this.state.data.TenNhanVien}</Text>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Text style={{backgroundColor: 'transparent'}}>Tên khách hàng: </Text>
                        <Text style={{
                            marginLeft: 8,
                            backgroundColor: 'transparent'
                        }}>{this.state.data.TenCuaHang}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Text style={{backgroundColor: 'transparent'}}>Vào điểm dự kiến:</Text>
                        <Text style={{
                            marginLeft: 8,
                            backgroundColor: 'transparent'
                        }}>{Utils.changeDateFormat(this.state.data.ThoiGianVaoDiemDuKien)}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Text style={{
                            backgroundColor: 'transparent'
                        }}>{strVaoDiem}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Text style={{
                            backgroundColor: 'transparent'
                        }}>{strRaDiem}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Text style={{backgroundColor: 'transparent'}}>Trạng thái: </Text>
                        <Text style={{
                            marginLeft: 8,
                            backgroundColor: 'transparent'
                        }}>{this._handleString()}</Text>
                    </View>
                </View>
                <MapView
                    style={{flex: 5}}
                    region={this.state.region}
                    initialRegion={this.state.region}>
                    <MapView.Marker.Animated
                        coordinate={{
                            latitude: this.state.data.ViDo,
                            longitude: this.state.data.KinhDo,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                    />
                </MapView>
            </View>
        )
    }

    _handleString() {
        const str = this.state.data.text_color_mota;
        if (str) {
            let arr = str.split(`<br/>`);
            console.log(arr);
            if (arr.length > 1) {
                return arr[1];
            }
        }
        return this.state.data.text_color_mota || ''
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['Hồ sơ', 'Vị trí']}/>;
    }

    millisToMinutes(from, to) {
        var dateFrom = new Date(from);
        var dateTo = new Date(to);
        var millis = dateFrom - dateTo;
        return Math.floor(millis / 60000);
    }

    componentDidMount() {
        this.getDataFromSv()
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
});