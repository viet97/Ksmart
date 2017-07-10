import React, {Component} from 'react';
import {
    AppRegistry, Button,
    StyleSheet,
    Text,
    View, TabBarIOS, TouchableHighlight, Platform
} from 'react-native';
import MapView from 'react-native-maps';
export default class MapScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        header: null

    });

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 1,
                longitude: 2,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
    }

    componentDidMount() {
        this.setState({
                region: {
                    latitude: 21.007069,
                    longitude: 105.8206451,
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
        if (Platform.OS === 'ios') {
            return (
                <TabBarIOS
                    style={{top: 0, left: 0, right: 0, bottom: 0, position: 'absolute'}}
                    tintColor="white"
                    barTintColor="darkslateblue">
                    <TabBarIOS.Item
                        title="Blue Tab"
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                            });
                        }}>
                        {this._renderContent('#414A8C', 'Blue Tab')}
                    </TabBarIOS.Item>
                    <TabBarIOS.Item
                        systemIcon="history"
                        badge={'1'}
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'redTab',
                                notifCount: this.state.notifCount + 1,
                            });
                        }}>
                        {this._renderContent('#783E33', 'Red Tab', this.state.notifCount)}
                    </TabBarIOS.Item>
                </TabBarIOS>
            )
        } else {
            return (
                <View>
                    <Text>claque</Text>
                </View>
            );

        }
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
});