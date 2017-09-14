import React, {Component} from 'react';
import {
    Button,
    StyleSheet,
    View, TabBarIOS, TouchableHighlight, Platform,
    Text, TouchableOpacity,
    Dimensions,
    Image,
    ScrollView
} from 'react-native';
import MapView from 'react-native-maps';
import {Icon} from 'react-native-elements'
import Color from '../configs/color'
import * as Toast from "react-native-simple-toast";
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';

export default class DetailCustomer extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });


    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        const item = params.item;
        this.state = {
            region: {
                latitude: item.ViDo,
                longitude: item.KinhDo,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        }
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['Hồ sơ', 'Vị trí']}/>;
    }


    render() {
        const {params} = this.props.navigation.state;

        const item = params.item;
        return (
            <View style={{flex: 1}}>
                <Image source={require('../images/bg.png')}
                       style={{position: 'absolute', top: 0}}/>
                <View style={styles.titleStyle}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                      style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon style={styles.iconStyle}
                              size={24} color="white"
                              name="ios-arrow-back"
                              type="ionicon"
                        />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 20,
                        color: 'white',
                        alignSelf: 'center',
                        backgroundColor: 'transparent'
                    }}>{params.title}</Text>
                    <View/>
                </View>
                <IndicatorViewPager
                    style={{flex: 9, backgroundColor: 'white'}}
                    indicator={this._renderTitleIndicator()}
                >
                    <ScrollView style={{flex: 1}}>
                        <Text>1231313213123</Text>
                    </ScrollView>
                    <MapView
                        style={{flex: 9}}
                        initialRegion={this.state.region}>
                        <MapView.Marker
                            coordinate={{
                                latitude: item.ViDo,
                                longitude: item.KinhDo
                            }
                            }>
                            <Icon style={styles.iconStyle} size={24} color="green" name="home" type="font-awesome"/>
                            <MapView.Callout>
                                <View
                                    style={{
                                        width: 300,
                                    }}>
                                    <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <Icon style={{backgroundColor: 'transparent',}} size={24} color="red"
                                              name="home" type="font-awesome"/>
                                        <Text style={{
                                            backgroundColor: 'transparent',
                                            marginLeft: 8,
                                            fontSize: 18,
                                            fontWeight: "bold"
                                        }}>{item.TenCuaHang}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <Icon style={{backgroundColor: 'transparent',}} size={24} color="black"
                                              name="people-outline" type="ionicons"/>
                                        <Text style={{
                                            backgroundColor: 'transparent',
                                            marginLeft: 8
                                        }}>{item.tennhomkhachhang}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',

                                    }}>

                                        <Icon
                                            name='location-pin'
                                            type='entypo'
                                            color='green'
                                        />
                                        <Text
                                            style={{backgroundColor: 'transparent', marginLeft: 8}}>{item.DiaChi}</Text>
                                    </View>
                                </View>
                            </MapView.Callout>
                        </MapView.Marker>
                    </MapView>

                </IndicatorViewPager>


            </View>
        );

    }
}
var styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
    titleStyle: {
        marginTop: Platform.OS === 'ios' ? 16 : 0,
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