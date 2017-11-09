import React, {Component} from 'react';
import {
    Button,
    StyleSheet,
    View, TabBarIOS, TouchableHighlight, Platform,
    Text, TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';

import URlConfig from "../configs/url";
import MapView from 'react-native-maps';
import HeaderCustom from "../components/Header";
import {Icon} from "react-native-elements";
import {GiftedAvatar} from "react-native-gifted-chat";
import {ConfirmDialog} from "react-native-simple-dialogs";
import Utils from "../configs/ultils";
import Toast from "react-native-simple-toast";

var {height, width} = Dimensions.get('window');
var title = '12312321'
export default class MapScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 21.007069,
                longitude: 105.8206451,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            address: ''
        }
    }

    componentDidMount() {
        const {params} = this.props.navigation.state;
        console.log('vao map roi', params.data);
        if (params.data && params.data.idnhanvien) {
            console.log(URlConfig.getLocation(params.data.KinhDo, params.data.ViDo, params.data.idnhanvien))
            fetch(URlConfig.getLocation(params.data.KinhDo, params.data.ViDo, params.data.idnhanvien))
                .then((response) => (response.json()))
                .then((responseJson) => {
                    if (responseJson.status) {
                        this.setState({address: responseJson.data});
                    } else {
                        Toast.show(responseJson.msg)
                    }
                }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại!'));
        }
        this.setState({
                region: {
                    latitude: params.vido,
                    longitude: params.kinhdo,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },
            selectedTab: 'blueTab',
            dialogVisible: false
            }
        )

    }


    onRegionChange(region) {
        this.setState({region: region});
    }

    render() {

        const {params} = this.props.navigation.state;

        return (
            <View style={{flex: 1}}>
                <HeaderCustom title={params.title} leftClick={() => this.props.navigation.goBack()}/>
                <MapView
                    style={{flex: 9}}
                    initialRegion={this.state.region}>
                    <MapView.Marker
                        title={params.data.tennhanvien || ''}
                        onPress={() => {
                            this.setState({
                                dialogVisible: true
                            })
                        }}
                        coordinate={{
                            latitude: params.vido,
                            longitude: params.kinhdo,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}>
                        <Icon size={36} color={'green'} name="person-pin-circle" type=""/>
                    </MapView.Marker>
                </MapView>
                <ConfirmDialog
                    visible={this.state.dialogVisible}
                    onTouchOutside={() => this.setState({dialogVisible: false})}
                    positiveButton={{
                        title: "OK",
                        onPress: () => {
                            this.setState({dialogVisible: false})
                        }
                    }}>
                    <View style={{flexDirection: 'column'}}>
                        {(() => {
                            if (params.data.AnhDaiDien && Utils.isImageUrl(params.data.AnhDaiDien)) {
                                return (
                                    <Image source={{uri: params.data.AnhDaiDien}}
                                           style={{
                                               width: 60,
                                               height: 60,
                                               borderRadius: 30,
                                               alignSelf: 'center',
                                               marginVertical: 8
                                           }}/>
                                );
                            }
                            return (
                                <GiftedAvatar
                                    user={
                                        {
                                            _id: 1,
                                            name: params.data.tennhanvien || ''
                                        }
                                    }
                                    avatarStyle={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 30,
                                        alignSelf: 'center',
                                        marginVertical: 8
                                    }}/>
                            )
                        })()}
                        <Text style={{fontSize: 18}}>Tên: {params.data.tennhanvien}</Text>
                        <Text style={{fontSize: 15}}>Địa
                            chỉ: {this.state.address ? this.state.address : 'Không khả dụng'}</Text>
                    </View>
                </ConfirmDialog>
            </View>
        );

    }
}
const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
    titleStyle: {
        paddingTop: Platform.OS === 'ios' ? 16 : 0,
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    iconStyle: {
        alignSelf: 'center',
        width: 24,
        height: 24,
        backgroundColor: "transparent",
        marginLeft: 16
    }

})