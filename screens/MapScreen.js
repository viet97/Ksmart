import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import MapView from 'react-native-maps';
export default class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
    }

    componentDidMount() {
        this.setState({
                region: {
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }
            }
        )
    }

    onRegionChange(region) {
        this.setState({region: region});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MapView
                    style={{flex: 1}}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange.bind(this)}
                />
            </View>
        )
    }
}