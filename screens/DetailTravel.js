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
import ultils from "../configs/ultils";

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
    }

    isOnline(dangtructuyen) {
        if (dangtructuyen === 1)
            return <Icon2 size={36} color="green" name="controller-record"/>
        else if (dangtructuyen === 2) return <Icon2 size={36} color="red" name="controller-record"/>
        else if (dangtructuyen === 0) return <Icon2 size={36} color="gray" name="controller-record"/>

    }

    render() {
        const {navigate} = this.props.navigation;
        const {params} = this.props.navigation.state;
        console.log(params.data.ThoiGianVaoDiemDuKien)
        var strVaoDiem = '';
        var strRaDiem = '';
        if (params.data.ThoiGianVaoDiemThucTe === '1900-01-01T00:00:00') {
            strVaoDiem = "Chưa vào điểm!"
        } else {
            var diffMins = this.millisToMinutes(params.data.ThoiGianVaoDiemDuKien, params.data.ThoiGianVaoDiemThucTe)
            strVaoDiem = 'Vào điểm lúc: ' + ultils.getDate(params.data.ThoiGianVaoDiemThucTe) + ' ' + strVaoDiem;
        }
        if (params.data.ThoiGianRaDiemThucTe === '1900-01-01T00:00:00') {
            strRaDiem = "Chưa ra điểm!"
        } else {
            diffMins = this.millisToMinutes(params.data.ThoiGianRaDiemDuKien, params.data.ThoiGianRaDiemThucTe)
            strRaDiem = 'Ra điểm lúc: ' + ultils.getDate(params.data.ThoiGianRaDiemThucTe) + ' ' + strRaDiem;
        }
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
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Thông
                        tin kế hoạch</Text>
                    <TouchableOpacity
                        onPress={() => navigate('EditTravel', {data: params.data})}
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
                            }}>{params.data.TenNhanVien}</Text>
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
                        }}>{params.data.TenCuaHang}</Text>
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
                        }}>{ultils.getDate(params.data.ThoiGianVaoDiemDuKien)}</Text>
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
                        }}>{params.data.text_color_mota}</Text>
                    </View>
                </View>
                <MapView
                    style={{flex: 5}}
                    initialRegion={this.state.region}>
                    <MapView.Marker.Animated
                        coordinate={{
                            latitude: params.data.ViDo,
                            longitude: params.data.KinhDo,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                    />
                </MapView>
            </View>
        )
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['Hồ sơ', 'Vị trí']}/>;
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
                region: {
                    latitude: params.data.ViDo,
                    longitude: params.data.KinhDo,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },
                selectedTab: 'blueTab'
            }
        )
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