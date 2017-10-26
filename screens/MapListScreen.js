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
import HeaderCustom from "../components/Header";
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
            address: '',
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
                <HeaderCustom title={"Vị trí nhân viên "} leftClick={() => this.props.backToHome()}/>

                <MapView

                    style={{flex: 9}}
                    region={this.state.region}
                    initialRegion={this.state.region}
                    onRegionChange={this.onRegionChange.bind(this)}>


                    {this.state.markers.map((marker, i) => (
                        <MapView.Marker
                            onPress={() => {
                                console.log(URlConfig.getLocation(marker.KinhDo, marker.ViDo, marker.idnhanvien))
                                fetch(URlConfig.getLocation(marker.KinhDo, marker.ViDo, marker.idnhanvien))
                                    .then((response) => (response.json()))
                                    .then((responseJson) => {
                                        if (responseJson.status) {
                                            this.setState({address: responseJson.data}, function () {

                                            });
                                        } else {
                                            Toast.show(responseJson.msg)
                                        }
                                    }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại' + e));
                            }}
                            coordinate={{
                                latitude: marker.ViDo,
                                longitude: marker.KinhDo
                            }
                            }
                            title={marker.tennhanvien}
                            description={this.getTimeUpdate(marker)}>
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
        console.log(this.state.address)
        let diachi = this.state.address
        return 'Thời gian cập nhật: ' + time + '\nVị trí: ' + diachi;
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
                <View style={{
                    width: 20,
                    height: 20,
                    borderColor: '#00FF47',
                    borderWidth: 1,
                    borderRadius: 10,
                    justifyContent: 'center'
                }}>
                    <Icon size={16} style={styles.iconStyle} color="#00FF47" name="controller-record"/>
                </View>
            );
        } else if (state === 2) {
            return (
                <View style={{
                    width: 20,
                    height: 20,
                    borderColor: 'red',
                    borderWidth: 1,
                    borderRadius: 10,
                    justifyContent: 'center'
                }}>
                    <Icon size={16} style={styles.iconStyle} color="red" name="controller-record"/>
                </View>
            );
        } else {
            return (
                <View style={{
                    width: 20,
                    height: 20,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 10,
                    justifyContent: 'center'
                }}>
                    <Icon size={16} style={styles.iconStyle} color="gray" name="controller-record"/>

                </View>
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
        backgroundColor: "transparent",
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