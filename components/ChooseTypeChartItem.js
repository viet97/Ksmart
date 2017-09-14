import React, {Component} from 'react';
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
    Platform
} from 'react-native';

let {width, height} = Dimensions.get('window')
export default class ChooseTypeChartItem extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View style={{flex: 1, justifyItems: 'center',}}>
                <TouchableOpacity
                    onPress={() => this.props.goToChart()}
                    style={{width: width / 2 - 32, height: width / 2 - 32, margin: 16}}>
                    <View style={{
                        flex: 1,
                        backgroundColor: '#0088C2',
                        justifyContent: 'center',
                        borderRadius: 5

                    }}>
                        <Text style={{textAlign: 'center', color: 'white'}}>{this.props.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        )
    }
}