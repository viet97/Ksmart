/**
 * Created by hao on 7/10/17.
 */
import React, {Component} from 'react';
import {
    AppRegistry, Button,
    StyleSheet,
    Text, Image,
    View, TabBarIOS, TouchableHighlight, Platform,TouchableOpacity
} from 'react-native';
import Toast from 'react-native-simple-toast'
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';
import URlConfig from "../configs/url";
import Color from '../configs/color'
import LinearGradient from "react-native-linear-gradient";
const default_location={
    latitude: 20.994953,
    longitude: 105.8307488,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}
export default class MapListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: default_location,
            markers: [],
            myRegion:default_location
        }
    }

    onRegionChange(region) {
        this.setState({region});
    }

    componentDidMount() {

        fetch(URlConfig.getAllNhanVien())
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    this.setState({markers: responseJson.dsNhanVien});
                } else {
                    Toast.show(responseJson.msg)
                }
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'));

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    myRegion:{
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    },
                    region:{
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                });
            },
            (error) => this.setState({ myRegion: default_location }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <LinearGradient colors={['#1b60ad', '#3dc4ea']} style={styles.titleStyle}>
                    <TouchableOpacity onPress={() => this.props.backToHome()}
                                      style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon1 style={styles.iconStyle} size={24} color="white"
                               name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Vị
                        trí nhân viên </Text>
                    <View/>
                </LinearGradient>
                <MapView

                    style={{flex: 9}}
                    region={this.state.region}
                    initialRegion={this.state.region}
                    onRegionChange={this.onRegionChange.bind(this)}>


                    {this.state.markers.map((marker, i) => (
                        <MapView.Marker
                            key={i}
                            coordinate={{
                                latitude: marker.ViDo,
                                longitude: marker.KinhDo
                            }
                            }
                            title={marker.tennhanvien}
                            description={this.getTimeUpdate(marker.thoigiancapnhat)}>
                            {this.getIconUser(marker.dangtructuyen)}
                            <MapView.Callout style={{width: 180}}>
                                {this.getImageNV(marker)}
                            </MapView.Callout>
                        </MapView.Marker>
                    ))}
                </MapView>
                <TouchableOpacity style={{backgroundColor: 'transparent'}} onPress={() => {
                    this.setState({
                        region: this.state.myRegion,
                    })
                }}>
                    <Icon2 size={24} style={{position: 'absolute', right: 10, bottom: 10}} color="gray"
                           name="my-location"/>
                </TouchableOpacity>
            </View>
        );
    }


    getTimeUpdate(time) {
        return 'Thời gian cập nhật: ' + time;
    }

    getImageNV(v) {
        var value = v.AnhDaiDien;
        if (value === undefined || value === null || value.length === 0) {
            return (
                <View style={{flexDirection: 'column'}}>
                    <Image source={require('../images/bglogin.jpg')}
                           style={{width: 50, height: 50, borderRadius: 25, alignSelf: 'center'}}/>
                    <Text style={{fontSize: 18}}>{v.tennhanvien}</Text>
                    <Text style={{fontSize: 15}}>{this.getTimeUpdate(v.thoigiancapnhat)}</Text>
                </View>
            );
        } else {
            return (
                <View style={{flexDirection: 'column', width: 120}}>
                    <Image source={{uri: URlConfig.BASE_URL_APP + value}}
                           style={{width: 50, height: 50, borderRadius: 25}}/>
                    <Text style={{fontSize: 18}}>{v.tennhanvien}</Text>
                    <Text style={{fontSize: 15}}>{this.getTimeUpdate(v.thoigiancapnhat)}</Text>
                </View>
            );
        }
    }

    getIconUser(state) {
        if (state === 1) {
            return (
                <Icon size={16} style={styles.iconStyle} color="#00FF47" name="controller-record"/>
            );
        } else if (state === 2) {
            return (
                <Icon size={16} style={styles.iconStyle} color="red" name="controller-record"/>
            );
        } else {
            return (
                <Icon size={16} style={styles.iconStyle} color="gray" name="controller-record"/>
            );
        }
    }
}
const styles = StyleSheet.create({
    titleStyle: {
        paddingTop: Platform.OS === 'ios' ? 16 : 0,
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
        borderBottomWidth: 1,
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
        marginLeft: 8
    },
    textStyle: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent'
    },
    titleIconsMenu: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        fontFamily: 'Al Nile'
    }
})