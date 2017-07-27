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
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import TabNavigator from 'react-native-tab-navigator';
import MapListScreen from "./MapListScreen";
import MapView from 'react-native-maps';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
var {width, height} = Dimensions.get('window');
export default class DetailNhanVien extends React.Component {
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
        data = this.state.data
        return (
            <View style={{flex: 1}}>
                <View style={styles.titleStyle}>
                    <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    <Text
                        style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>Profile</Text>
                    <View style={{backgroundColor: Color.backgroundNewFeed, width: 35, height: 35}}/>
                </View>
                <TouchableOpacity onPress={() => this.props.backToListNhanVienFromDetailNhanVien()}
                                  style={{width: 50, height: 50, position: 'absolute'}}/>
                <View style={{flex: 4, justifyContent: 'center'}}>
                    <Image style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
                           source={{uri: 'http://www.designbolts.com/wp-content/uploads/2014/03/Yellow-blur-background1.jpg'}}/>

                    <Image style={{width: 120, height: 120, borderRadius: 60, alignSelf: 'center'}}
                           source={require('../images/bglogin.jpg')}/>
                    <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'}}>
                        {this.isOnline(this.state.datadangtructuyen)}
                        <Text style={{
                        fontSize: 24,
                        color: 'white',
                        textAlign: 'center',
                        marginTop: 8
                    }}>{this.state.data.tennhanvien}</Text>
                    </View>

                </View>
                <View style={{flex: 5,}}>
                    <IndicatorViewPager
                        style={{flex: 1, backgroundColor: 'white'}}
                        indicator={this._renderTitleIndicator()}
                    >
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
                                        <Icon4 size={36} color="yellow" name="mail"/>
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
                                        <Icon3 size={36} color="green" name="phone"/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View>
                            <MapView
                                style={{flex: 1}}
                                initialRegion={this.state.region}>
                                <MapView.Marker.Animated
                                    coordinate={ {
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
        fetch(URlConfig.getLinkDetailNhanVien(this.props.idNhanVien))
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status)
                    this.setState({data: responseJson.data}, function () {
                        this.setState({
                            region: {
                                latitude: this.state.data.vido,
                                longitude: this.state.data.kinhdo,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }
                        })
                    })
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
        fontSize: 12, marginTop: 4, marginRight: 8, color: 'red'
    },
    text2: {
        fontSize: 18, fontWeight: 'bold'
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