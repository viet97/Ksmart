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
    Platform,
    Picker, TouchableHighlight,
    Image
} from 'react-native';
import React from 'react';
import Color from '../configs/color'

let {width, height} = Dimensions.get('window')
export default class ChooseTypeItem extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (

            <View style={{flex: 1, justifyItems: 'center',}}>
                <TouchableOpacity
                    onPress={() => this.props.goToDetail()}
                    style={{width: width / 2 - 32, height: width / 2 - 32, margin: 16}}>
                    <View style={{
                        flex: 1,
                        backgroundColor: '#0088C2',
                        justifyContent: 'center',
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5
                    }}>
                        <Text style={{textAlign: 'center', color: 'white'}}>{this.props.title}</Text>
                    </View>
                    <View style={{
                        flex: 3,
                        backgroundColor: '#009CDE',
                        justifyContent: 'center',
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5
                    }}>
                        <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>{this.getContent()}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        )
    }

    getContent() {
        if (this.props.content !== undefined)
            return this.props.content
        return null
    }
}
const styles = StyleSheet.create({
    view1: {
        flex: 1,
        flexDirection: 'row'
    },
    titleStyle: {
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerStyle: {
        elevation: 15, height: this.height / 7
    },
    itemSideMenuStyle: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 8,
        paddingBottom: 8
    }, iconStyle: {
        alignSelf: 'center',
        width: 24,
        height: 24,
        backgroundColor: "transparent",
        paddingLeft: 8,
        paddingTop: (Platform.OS === 'ios') ? 4 : 0
    },
    textStyle: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent'
    },
    titleIconsMenu: {
        textAlign: 'center',
        color: 'white'
    },
    indicator: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    }
})