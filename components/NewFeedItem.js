import {
    AppRegistry,
    Text,
    View,
    Button, ListView, StyleSheet, StatusBar,
    TouchableOpacity, ActivityIndicator,
    Dimensions,
    FlatList,
    Platform, Image
} from 'react-native';
import Search from 'react-native-search-box';
// import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import React from 'react';
import Color from '../configs/color'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import URlConfig from "../configs/url";
import Toast from 'react-native-simple-toast'

let {width, height} = Dimensions.get('window');
export default class NewFeedItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            height: 0
        }
    }

    getImage(urlImage) {
        if (urlImage === undefined || urlImage.length === 0) {
            return (

                <Image
                    source={require('../images/bglogin.jpg')}
                    // indicator={ProgressBar.Pie}
                    style={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
            );
        } else {
            return (
                <Image
                    style={{margin: 8, width: 60, height: 60, borderRadius: 30}}
                    source={{uri: 'http://jav.ksmart.vn' + urlImage}}
                    // indicator={ProgressBar.Pie}
                />
            );
        }
    }

    render() {
        let item = this.props.data
        return (

            <View
                onLayout={(e) => {
                    var {x, y, width, height} = e.nativeEvent.layout;
                    this.setState({height: height})
                    console.log(height)
                }}
                style={{margin: 4}}>
                <Image source={require('../images/bg1.png')}
                       style={{
                           height: this.state.height,
                           flexWrap: 'wrap',
                           position: 'absolute',
                           width: width - 8

                       }}/>
                <Text style={{
                    textAlign: 'right',
                    fontSize: 12,
                    backgroundColor: 'transparent'
                }}>Cập nhật lần cuối: {item.thoigian_hienthi}</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={{justifyContent: 'center'}}>
                        {this.getImage(item.anhdaidien)}
                    </View>
                    <View style={{flex: 4, margin: 8, justifyContent: 'center'}}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                backgroundColor: 'transparent'
                            }}>{item.tennhanvien}</Text>
                        <Text style={{
                            fontSize: 13,
                            backgroundColor: 'transparent'
                        }}> {item.tenloai}</Text>
                    </View>
                </View>
            </View>
        )
    }
}