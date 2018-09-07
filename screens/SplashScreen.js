import React from 'react';
import {
    AppRegistry,
    Text,
    View, Dimensions,
    Button, ListView, Image, StyleSheet, StatusBar
} from 'react-native';
import {StackActions, NavigationActions} from "react-navigation";
import orderListData from '../dbcontext/orderListData'

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
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={require('../images/flyhight.png')}
                       style={{
                           flex: 1,
                           opacity: 0.6,
                           resizeMode: 'stretch',
                           width: '100%'
                       }}/>
                <Image source={require('../images/logoksmart.png')}
                       style={{
                           alignSelf: 'center',
                           position: 'absolute',
                           width: Dimensions.get('window').width / 3,
                           height: Dimensions.get('window').width / 3
                       }}/>
            </View>

        );
    }

    componentDidMount() {
        console.disableYellowBox = true;
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = dd + '/' + mm + '/' + yyyy;

        orderListData.dTo = today
        orderListData.dFrom = today
        const timer = require('react-native-timer');
        timer.setTimeout(
            this, 'hideMsg', this._onDone.bind(this), 1000
        )
    }

    _onDone() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Login'})],
        });
        this.props.navigation.dispatch(resetAction);
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
        resizeMode: 'stretch', // or 'stretch'
    }
});