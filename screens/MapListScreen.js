/**
 * Created by hao on 7/10/17.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text, Image,
    View, Platform, TouchableOpacity, BackHandler
} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';
import Toast from 'react-native-simple-toast'
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';
import URlConfig from "../configs/url";
import Color from '../configs/color'
import HeaderCustom from "../components/Header";
import ModalDropdownCustom from "../components/ModalDropdownCustom";
const default_location={
    latitude: 20.994953,
    longitude: 105.8307488,
    latitudeDelta: 0.0922 * 100,
    longitudeDelta: 0.0421 * 100,
}
let INDEX
export default class MapListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusPiker: ['Tất cả', 'Đang trực tuyến', 'Đang ngoại tuyến', 'Mất tín hiệu'],
            address: '',
            region: default_location,
            markers: [],
            myRegion: default_location,
            dialogVisible: false,
            index: 0,
        }
    }

    showDialog() {
        this.setState({dialogVisible: true})
    }

    onRegionChange(region) {
        this.setState({region});
        console.log(region)
    }

    componentDidMount() {
        console.log(URlConfig.getAllNhanVien(), '33333333')
        fetch(URlConfig.getAllNhanVien())
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    this.setState({markers: responseJson.dsNhanVien}, function () {
                        this.setState({
                            myRegion: {
                                latitude: this.state.markers[0].ViDo,
                                longitude: this.state.markers[0].KinhDo,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            },
                            region: {
                                latitude: this.state.markers[0].ViDo,
                                longitude: this.state.markers[0].KinhDo,
                                latitudeDelta: this.state.region.latitudeDelta,
                                longitudeDelta: this.state.region.longitudeDelta,
                            }
                        });
                    });
                } else {
                    Toast.show(responseJson.msg)
                }
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'));

        // navigator.geolocation.getCurrentPosition(
        //     (position) => {
        //         this.setState({
        //             myRegion:{
        //                 latitude: position.coords.latitude,
        //                 longitude: position.coords.longitude,
        //                 latitudeDelta: 0.0922,
        //                 longitudeDelta: 0.0421,
        //             },
        //             region:{
        //                 latitude: position.coords.latitude,
        //                 longitude: position.coords.longitude,
        //                 latitudeDelta: 0.0922,
        //                 longitudeDelta: 0.0421,
        //             }
        //         });
        //     },
        //     (error) => this.setState({ myRegion: default_location }),
        //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        // );

    }

    render() {
        console.log(this.state.region, 'region')
        return (
            <View style={{flex: 1}}>
                <HeaderCustom title={"Vị trí nhân viên "}
                              leftClick={() => this.props.backToHome()}
                              rightChildren={
                                  <TouchableOpacity
                                      style={{alignSelf: 'center', padding: 8}}
                                      onPress={() => {
                                          this.showDialog()
                                      }}
                                  >
                                      <Text style={{
                                          textAlign: 'center',
                                          color: 'white',
                                          alignSelf: 'center',
                                          backgroundColor: 'transparent'
                                      }}>Bộ lọc</Text>
                                  </TouchableOpacity>
                              }
                />
                <Dialog
                    visible={this.state.dialogVisible}
                    dialogStyle={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}
                >

                    <View style={{
                        flexDirection: 'column',
                        paddingBottom: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                    }}>
                        <Text style={{color: 'black'}}>Chọn trạng thái</Text>
                        <ModalDropdownCustom
                            data={this.state.statusPiker}
                            defaultValue={this.state.statusPiker[this.state.index]}
                            onSelect={(idx, value) => {
                                let status;
                                switch (idx) {
                                    case 0:
                                        INDEX = idx
                                        status = -1
                                        break;
                                    case 1:
                                        INDEX = idx
                                        status = 1
                                        break;
                                    case 2:
                                        INDEX = idx
                                        status = 0
                                        break;
                                    case 3:
                                        INDEX = idx
                                        status = 2
                                        break;
                                }
                                this.setState({status})
                            }}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: '#123'
                    }}>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#e8e8e8',
                                borderRightWidth: 0.5,
                                borderColor: 'white',
                                height: 46,
                            }}
                            onPress={() => {
                                this.setState({dialogVisible: false});
                            }}>
                            <Text style={{color: '#6a5aff', alignSelf: 'center'}}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'center',
                                justifyContent: 'center',
                                flex: 1,
                                backgroundColor: '#e8e8e8',
                                borderColor: 'white',
                                height: 46
                            }}
                            onPress={() => {
                                this.setState({
                                    dialogVisible: false, index: INDEX
                                }, function () {
                                    fetch(URlConfig.getAllNhanVien())
                                        .then((response) => (response.json()))
                                        .then((responseJson) => {
                                            console.log(responseJson.dsNhanVien)
                                            if (responseJson.status) {
                                                if (this.state.status === -1) {
                                                    this.setState({markers: responseJson.dsNhanVien});
                                                } else {
                                                    let markers = []
                                                    for (let item of responseJson.dsNhanVien) {
                                                        if (item.dangtructuyen === this.state.status) {
                                                            markers.push(item)
                                                        }
                                                    }

                                                    this.setState({markers}, function () {
                                                        if (markers.length !== 0)
                                                            this.setState({
                                                                region: {
                                                                    latitude: this.state.markers[0].ViDo,
                                                                    longitude: this.state.markers[0].KinhDo,
                                                                    latitudeDelta: this.state.region.latitudeDelta,
                                                                    longitudeDelta: this.state.region.longitudeDelta,
                                                                }
                                                            });
                                                    })
                                                }

                                            } else {
                                                Toast.show(responseJson.msg)
                                            }
                                        }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại' + e));


                                })
                            }}>
                            <Text style={{
                                color: '#6a5aff',
                                alignSelf: 'center',
                                fontWeight: 'bold'
                            }}>Ok</Text>
                        </TouchableOpacity>

                    </View>
                </Dialog>

                <MapView

                    style={{flex: 9}}
                    region={this.state.region}
                    initialRegion={this.state.region}
                    onRegionChange={this.onRegionChange.bind(this)}>


                    {this.state.markers.map((marker, i) => (
                        <MapView.Marker
                            onPress={() => {
                                console.log(URlConfig.getLocation(marker.KinhDo, marker.ViDo, marker.idnhanvien), '123123123321231')
                                fetch(URlConfig.getLocation(marker.KinhDo, marker.ViDo, marker.idnhanvien))
                                    .then((response) => (response.json()))
                                    .then((responseJson) => {
                                        if (responseJson.status) {
                                            this.setState({address: responseJson.data});
                                        } else {
                                            Toast.show(responseJson.msg)
                                        }
                                    }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại' + e));
                            }}
                            coordinate={{
                                latitude: marker.ViDo,
                                longitude: marker.KinhDo
                            }}
                            title={marker.tennhanvien}
                            description={this.getTimeUpdate(marker)}>
                            {this.getIconUser(marker.dangtructuyen)}
                            <MapView.Callout style={{width: 180}}>
                                {this.getImageNV(marker)}
                            </MapView.Callout>
                        </MapView.Marker>
                    ))}
                </MapView>
                <TouchableOpacity
                    style={{backgroundColor: 'transparent'}}
                    onPress={() => {
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
        let diachi = this.state.address
        return 'Thời gian cập nhật: ' + time + '\nVị trí: ' + diachi;
    }


    getImageNV(v) {
        let value = v.AnhDaiDien;
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
        console.log(state)
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
    },
    iconStyle: {
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
