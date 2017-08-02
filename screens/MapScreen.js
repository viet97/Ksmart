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
    static navigationOptions = ({navigation}) => ({
        title: ` ${navigation.state.params.title}`,
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: Color.backgroundNewFeed
        },
        headerTitleStyle: {
            alignSelf: 'center'
        }
    });
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
        const {params} = this.props.navigation.state;
        this.setState({
                region: {
                    latitude: params.vido,
                    longitude: params.kinhdo,
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
        const {params} = this.props.navigation.state;
            return (
                <View style={{flex: 1}}>
                    <MapView
                        style={{flex: 9}}
                        initialRegion={this.state.region}>
                        <MapView.Marker.Animated
                            coordinate={ {
                                latitude: params.vido,
                                longitude: params.kinhdo,
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
        marginTop: Platform.OS === 'ios' ? 16 : 0,
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