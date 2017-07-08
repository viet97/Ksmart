import React from 'react';
import {
    AppRegistry,
    Text,
    View,
    Button, ListView, Image, StyleSheet, StatusBar
} from 'react-native';
import {NavigationActions} from "react-navigation";


export default class SplashScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        state = {
            onDone: false,

        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../images/bg.png')}
                       style={{flex: 1}}/>
                <Image source={require('../images/logoksmart.png') }
                       style={{alignSelf: 'center', position: 'absolute'}}/>

            </View>
        );
    }

    componentDidMount() {

        const timer = require('react-native-timer');
        timer.setTimeout(
            this, 'hideMsg', () => this._onDone(), 1000
        )
    }

    _onDone() {
        const {navigate} = this.props.navigation;

        this.props
            .navigation
            .dispatch(NavigationActions.reset(
                {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Login'})
                    ]
                }));
    }

}
let styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        position: 'absolute',
        marginTop: 48,
        fontSize: 29,
        fontWeight: 'bold',
        alignSelf: 'center',
        backgroundColor: '#99FF0000',
        color: 'white'

    },
    activeTitle: {
        color: 'red',
    },
    backgroundImage: {
        flex: 1,
        width: 400,
        height: 400,
        resizeMode: 'cover', // or 'stretch'
    }
});