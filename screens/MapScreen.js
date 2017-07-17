import React, {Component} from 'react';
import {
    AppRegistry, Button,
    StyleSheet,
    View, TabBarIOS, TouchableHighlight, Platform,
    Text, TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Color from '../configs/color'
export default class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 21.007069,
                longitude: 105.8206451,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
    }

    componentDidMount() {
        console.log(this.props.kinhdo, this.props.vido)
        this.setState({
                region: {
                    latitude: this.props.vido,
                    longitude: this.props.kinhdo,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },
                selectedTab: 'blueTab'
            }
        )

    }

    _renderContent(color: string, pageText: string, num?: number) {
        return (
            <MapView
                style={{flex: 1}}
                region={this.state.region}
                onRegionChange={this.onRegionChange.bind(this)}
            />
        );
    }

    onRegionChange(region) {
        this.setState({region: region});
    }

    render() {
            return (
                <View style={{flex: 1}}>
                    <View style={styles.titleStyle}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                        <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>Địa chỉ nhân viên</Text>
                        <View style={{backgroundColor: Color.backgroundNewFeed, width: 35, height: 35}}></View>
                    </View>

                    <TouchableOpacity onPress={() => this.props.backToListNhanVienFromMap()}
                                      style={{width: 50, height: 50, position: 'absolute'}}/>
                    <MapView
                        style={{flex: 9}}
                        initialRegion={this.state.region}>
                        <MapView.Marker.Animated
                            coordinate={ {
                                latitude: this.props.vido,
                                longitude: this.props.kinhdo,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421
                            }}

                        />
                    </MapView>

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
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: Color.backgroundNewFeed,
    },
    iconStyle: {
        alignSelf: 'center',
        width: 24,
        height: 24,
        backgroundColor: "transparent",
        marginLeft: 16
    }

})