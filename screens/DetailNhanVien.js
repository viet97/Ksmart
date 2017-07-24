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

import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import URlConfig from "../configs/url";
import Icon2 from 'react-native-vector-icons/Entypo'
import React from 'react';
import Color from '../configs/color'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import TabNavigator from 'react-native-tab-navigator';
import MapListScreen from "./MapListScreen";
import MapView from 'react-native-maps';

var {width, height} = Dimensions.get('window');
export default class DetailNhanVien extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            region: {
                latitude: this.props.data.ViDo,
                longitude: this.props.data.KinhDo,
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
        return (
            <View style={{flex: 1}}>
                <View style={styles.titleStyle}>
                    <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    <Text
                        style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>{this.props.data.tennhanvien}</Text>
                    <View style={{backgroundColor: Color.backgroundNewFeed, width: 35, height: 35}}/>
                </View>
                <TouchableOpacity onPress={() => this.props.backToListNhanVienFromDetailNhanVien()}
                                  style={{width: 50, height: 50, position: 'absolute'}}/>
                <View style={{backgroundColor: Color.backGroundFlatList, flex: 5}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image style={{width: 100, height: 100, borderRadius: 50}}
                               source={require('../images/bglogin.jpg')}/>
                        <View>
                            <Text style={{fontWeight: 'bold', fontSize: 18}}>{this.props.data.tennhanvien}</Text>
                            {this.isOnline(this.props.data.dangtructuyen)}
                            <Text>Cập nhật lần cuối: {this.props.data.thoigiancapnhat}</Text>

                        </View>
                    </View>
                </View>
                <MapView
                    style={{flex: 4}}
                    initialRegion={this.state.region}>
                    <MapView.Marker.Animated
                        coordinate={ {
                            latitude: this.props.data.ViDo,
                            longitude: this.props.data.KinhDo,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}

                    />
                </MapView>
            </View>
        )
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
    }
})