/**
 * Created by hao on 7/10/17.
 */
import React, {Component} from 'react';
import {
    AppRegistry, Button,
    StyleSheet,
    Text, Image,
    View, TabBarIOS, TouchableHighlight, Platform
} from 'react-native';
import Toast from 'react-native-simple-toast'
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';
import URlConfig from "../configs/url";
import Color from '../configs/color'
export default class MapListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 20.994953,
                longitude: 105.8307488,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            markers: []
        }
    }

    onRegionChange(region) {
        this.setState({region});
    }

    componentDidMount() {

        fetch(URlConfig.getListNhanVienLink())
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    this.setState({markers: responseJson.dsNhanVien});
                } else {
                    Toast.show(responseJson.msg)
                }
            }).catch((e) => {
            console.log('Có lỗi xảy ra, vui lòng kiểm tra kết nối internet')
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MapView

                    style={{flex: 1}}
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
                <TouchableHighlight style={{backgroundColor: 'white'}} onPress={() => {
                    this.setState({
                        region: {
                            latitude: 20.994953,
                            longitude: 105.8307488,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        },
                    })
                }}>
                    <Icon2 size={24} style={{position: 'absolute', right: 10, bottom: 10}} color="gray"
                           name="my-location"/>
                </TouchableHighlight>
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