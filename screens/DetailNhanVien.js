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
    ScrollView
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
import ultils from "../configs/ultils";

var {width, height} = Dimensions.get('window');
export default class DetailNhanVien extends React.Component {
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

    getImage(url) {
        console.log(url)
        if (url === undefined) {
            console.log('1')
            return
        } else {
            console.log('2')
            if (url.length === 0)
                <Image
                    source={require('../images/bglogin.jpg')}
                    indicator={ProgressBar.Pie}
                    style={{alignSelf: 'center', width: 120, height: 120, borderRadius: 60}}/>
            else
                return (
                    <Image

                        source={{uri: url}}
                        indicator={ProgressBar.Pie}
                        style={{alignSelf: 'center', width: 120, height: 120, borderRadius: 60}}/>
                );
        }
    }

    isOnline(dangtructuyen) {
        if (dangtructuyen === 1)
            return <Icon2 style={{alignSelf: 'center'}} size={24} color="green" name="controller-record"/>
        else if (dangtructuyen === 2) return <Icon2 style={{alignSelf: 'center'}} size={24} color="red"
                                                    name="controller-record"/>
        else if (dangtructuyen === 0) return <Icon2 style={{alignSelf: 'center'}} size={24} color="gray"
                                                    name="controller-record"/>

    }

    render() {
        const {navigate} = this.props.navigation;
        let data = this.state.data
        return (
            <View style={{flex: 1}}>
                <View style={styles.titleStyle}>
                    <Image source={require('../images/bg.png')}
                           style={{position: 'absolute'}}/>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                        style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Thông
                        tin nhân viên</Text>
                    <TouchableOpacity style={{backgroundColor: 'transparent', alignSelf: 'center', marginRight: 8}}
                                      onPress={() => navigate('SendMessage', {data: this.state.data})}>
                        <Icon2 style={{backgroundColor: 'transparent', alignSelf: 'center'}} size={24} color="white"
                               name="new-message"/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 4, justifyContent: 'center'}}>
                    <Image source={require('../images/bg.png')}
                           style={{position: 'absolute', top: 0}}/>
                    {this.getImage(data.AnhDaiDien)}
                    <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'}}>
                        {this.isOnline(this.state.datadangtructuyen)}
                        <Text style={{
                            fontSize: 24,
                            color: 'white',
                            textAlign: 'center',
                            marginTop: 8,
                            backgroundColor: 'transparent'
                        }}> {this.isOnline(this.state.data.dangtructuyen)}
                            {this.state.data.tennhanvien}</Text>
                    </View>

                </View>
                <View style={{flex: 5,}}>
                    <IndicatorViewPager
                        style={{flex: 1, backgroundColor: 'white'}}
                        indicator={this._renderTitleIndicator()}
                    >
                        <ScrollView style={{flex: 1}}>
                            <View>
                                <View style={styles.viewCover}>
                                    <Text style={styles.text1}>Tên đăng nhập</Text>
                                    <Text style={styles.text2}>{data.tendangnhap}</Text>
                                </View>
                                <View style={styles.viewCover}>
                                    <Text style={styles.text1}>Tên đầy đủ</Text>
                                    <Text style={styles.text2}>{data.tennhanvien}</Text>
                                </View>
                                <View style={styles.viewCover}>
                                    <Text style={styles.text1}>Địa chỉ</Text>
                                    <Text style={styles.text2}>{data.DiaChi}</Text>
                                </View>
                                <View style={styles.viewCover}>
                                    <Text style={styles.text1}>Nhóm/Phòng:</Text>
                                    <Text style={styles.text2}>{data.phongban}</Text>
                                </View>
                                <View style={styles.viewCover}>
                                    <Text style={styles.text1}>Tình trạng pin</Text>
                                    <Text style={styles.text2}>{data.tinhtrangpin}</Text>
                                </View>
                                <View style={styles.viewCover}>
                                    <Text style={styles.text1}>Cập nhật lần cuối:</Text>
                                    <Text style={styles.text2}>{data.thoigianguitoadocuoi}</Text>
                                </View>
                                <View style={styles.viewCover}>
                                    <Text style={styles.text1}>Quê quán:</Text>
                                    <Text style={styles.text2}>{data.QueQuan}</Text>
                                </View>
                                <View style={styles.viewCover}>
                                    <Text style={styles.text1}>Ngày sinh:</Text>
                                    <Text style={styles.text2}>{ultils.getDate(data.NgaySinh)}</Text>
                                </View>
                                <View style={styles.viewCover}>
                                    <Text style={styles.text1}>Email</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 4,
                                        marginRight: 8,
                                        justifyContent: 'space-between'
                                    }}>
                                        <Text style={styles.text2}>1234@gmail.com</Text>
                                        <TouchableOpacity
                                            onPress={() => Communications.email(['123@gmail.com'], null, null, 'My Subject', 'My body text')}>
                                            <Icon4 size={24} color="yellow" name="mail"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.viewCover}>
                                    <Text style={styles.text1}>Số điện thoại</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 4,
                                        marginRight: 8,
                                        justifyContent: 'space-between'
                                    }}>
                                        <Text style={styles.text2}>01663616055</Text>
                                        <TouchableOpacity onPress={() => Communications.phonecall('01663616055', true)}>
                                            <Icon3 size={24} color="green" name="phone"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        <View>
                            <MapView
                                style={{flex: 1}}
                                initialRegion={this.state.region}>
                                <MapView.Marker.Animated
                                    coordinate={{
                                        latitude: this.state.region.latitude,
                                        longitude: this.state.region.longitude,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421
                                    }}

                                />
                            </MapView>
                        </View>

                    </IndicatorViewPager>

                </View>

            </View>
        )
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['Hồ sơ', 'Vị trí']}/>;
    }

    componentDidMount() {
        const {params} = this.props.navigation.state;
        fetch(URlConfig.getLinkDetailNhanVien(params.idNhanVien))
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status)
                    this.setState({data: responseJson.data}, function () {
                        console.log(this.state.data.AnhDaiDien)
                        this.setState({
                            region: {
                                latitude: this.state.data.vido,
                                longitude: this.state.data.kinhdo,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }
                        })
                    })
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))

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