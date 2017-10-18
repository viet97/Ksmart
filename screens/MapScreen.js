import React, {Component} from 'react';
import {
    Button,
    StyleSheet,
    View, TabBarIOS, TouchableHighlight, Platform,
    Text, TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';
import MapView from 'react-native-maps';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Color from '../configs/color'
import * as Toast from "react-native-simple-toast";
import LinearGradient from "react-native-linear-gradient";
import HeaderCustom from "../components/Header";

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
                <MapView.Marker.Animated
                    coordinate={{
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
//Header
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