import {
    AppRegistry,
    Text,
    View,
    Button, ListView, Image, StyleSheet, StatusBar,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import React from 'react';
export default class MenuScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {

        return (
            <Text style={{fontSize: 20}}>Menu Screen</Text>
        )
    }
}