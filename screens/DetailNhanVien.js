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
import ProgressBar from 'react-native-progress/Bar';
import URlConfig from "../configs/url";
import {Icon} from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import HeaderImageScrollView, {TriggeringView} from 'react-native-image-header-scroll-view';
import React from 'react';
import Color from '../configs/color'
import Toast from 'react-native-simple-toast'
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import ultils from "../configs/ultils";
import {Header} from 'react-navigation'
import MapView from 'react-native-maps';

const MIN_HEIGHT = Header.HEIGHT;
const MAX_HEIGHT = 250;
let {width, height} = Dimensions.get('window');
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
            return;
        } else {
            if (url.length === 0)
                return (
                    <Image
                        source={require('../images/bglogin.jpg')}
                        indicator={ProgressBar.Pie}
                        style={{alignSelf: 'center', width: 120, height: 120, borderRadius: 60}}/>)
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
            return <Icon type="entypo" style={{alignSelf: 'center'}} size={24} color="green" name="controller-record"/>
        else if (dangtructuyen === 2) return <Icon type="entypo" style={{alignSelf: 'center'}} size={24} color="red"
                                                   name="controller-record"/>
        else if (dangtructuyen === 0) return <Icon type="entypo" style={{alignSelf: 'center'}} size={24} color="gray"
                                                   name="controller-record"/>

    }

    render() {
        const {navigate} = this.props.navigation;
        let data = this.state.data
        let lastTime = ultils.getDate(data.thoigiandangnhapcuoicung);
        let sdt = '';
        if (data.DienThoai !== null) sdt = data.dienthoai

        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle="light-content"/>
                <HeaderImageScrollView
                    maxHeight={MAX_HEIGHT}
                    minHeight={MIN_HEIGHT}
                    maxOverlayOpacity={0.6}
                    minOverlayOpacity={0.3}
                    fadeOutForeground
                    renderHeader={() => <Image source={require('../images/bg.png')} style={styles.image}/>}
                    renderFixedForeground={() =>
                        <Animatable.View
                            style={styles.navTitleView}
                            ref={navTitleView => {
                                this.navTitleView = navTitleView;
                            }}
                        >
                            <Icon type="ionicon" style={{position: 'absolute', top: 8, left: 0, padding: 16}} size={24}
                                  color="white" name="ios-arrow-back"/>
                            <Text style={styles.navTitle}>{this.state.data.tennhanvien}</Text>
                        </Animatable.View>}
                    renderForeground={() =>
                        <View style={styles.titleContainer}>
                            <Icon type="ionicon" style={{position: 'absolute', top: 0, left: 0, padding: 16}} size={24}
                                  color="white" name="ios-arrow-back"/>
                            <Image source={{uri: this.state.data.AnhDaiDien}}
                                   style={{width: 60, height: 60, borderRadius: 30}}/>
                            <Text style={styles.imageTitle}>
                                {this.state.data.tennhanvien}
                            </Text>
                        </View>
                    }
                >
                    <View style={{flex: 1}}>
                        <TriggeringView
                            style={styles.section}
                            onHide={() => this.navTitleView.fadeInUp(200)}
                            onDisplay={() => this.navTitleView.fadeOut(100)}
                        >
                            <Text style={styles.title}>
                                <Text style={styles.name}>Thông tin cá nhân</Text>
                            </Text>
                        </TriggeringView>
                        <View style={styles.section}>
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
                                <Text style={styles.text2}>{lastTime}</Text>
                            </View>
                            <View style={styles.viewCover}>
                                <Text style={styles.text1}>Thời gian gửi tọa độ cuối:</Text>
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
                                        <Icon type={"foundation"} size={24} color="yellow" name="mail"/>
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
                                    <Text style={styles.text2}>{sdt}</Text>
                                    <TouchableOpacity onPress={() => Communications.phonecall('01663616055', true)}>
                                        <Icon type={"font-awesome"} size={24} color="green" name="phone"/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.keywords}>Vị trí</Text>
                        <MapView
                            style={{flex: 1, height: 200}}
                            initialRegion={this.state.region}>
                            <MapView.Marker.Animated
                                coordinate={this.state.region}
                            />
                           
                        </MapView>
                    </View>
                </HeaderImageScrollView>
            </View>
        )
        //TODO: Sua mapview o day
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['Hồ sơ', 'Vị trí']}/>;
    }

    componentDidMount() {
        const {params} = this.props.navigation.state;
        console.log('url', URlConfig.getLinkDetailNhanVien(params.idNhanVien))
        fetch(URlConfig.getLinkDetailNhanVien(params.idNhanVien))
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status)
                    this.setState(
                        {
                            data: responseJson.data,
                            region: {
                                latitude: responseJson.data.vido,
                                longitude: responseJson.data.kinhdo,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }
                        }
                    );
                else {
                    Toast.show("Có lỗi xảy ra, thử lại sau!");
                }
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
    },
    image: {
        height: MAX_HEIGHT,
        width: Dimensions.get('window').width,
        alignSelf: 'stretch',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20,
    },
    name: {
        fontWeight: 'bold',
    },
    section: {
        flex: 1,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: 'white',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionContent: {
        fontSize: 16,
        textAlign: 'justify',
    },
    keywords: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    keywordContainer: {
        backgroundColor: '#999999',
        borderRadius: 10,
        margin: 10,
        padding: 10,
    },
    keyword: {
        fontSize: 16,
        color: 'white',
    },
    titleContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageTitle: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 24,
    },
    navTitleView: {
        height: MIN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
        opacity: 0,

    },
    navTitle: {
        color: 'white',
        fontSize: 18,
        backgroundColor: 'transparent',
    },
    sectionLarge: {
        height: 600,
    },
})