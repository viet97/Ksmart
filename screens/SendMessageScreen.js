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
    Platform,
    TextInput,
    ScrollView
} from 'react-native';

import Image from 'react-native-image-progress';
import Icon3 from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-simple-toast'
import Color from '../configs/color'
import URlConfig from "../configs/url";
import Search from "react-native-search-box";
import {Icon} from "react-native-elements";

let {height, width} = Dimensions.get('window')
export default class ModalSendMessage extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });

    constructor(props) {

        super(props)
        this.state = {
            text: ''
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Image source={require('../images/bg.png')}
                       style={{position: 'absolute', top: 0}}/>
                <View style={styles.titleStyle}>
                    <Image source={require('../images/bg.png')}
                           style={{position: 'absolute'}}/>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                      style={styles.iconStyle}>
                        <Icon2 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Soạn
                        tin
                        nhắn</Text>
                    <View></View>
                </View>
                <View style={{flex: 9}}>
                    <View style={{flex: 8}}>
                        <Text style={{marginLeft: 16, marginTop: 16, marginBottom: 16}}>
                            Nội dung
                        </Text>
                        <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
                            <TextInput
                                multiline={true}
                                style={{height: height, textAlignVertical: 'top'}}
                                onChangeText={(text) => this.setState({text: text})}
                                value={this.state.text}
                            />
                        </ScrollView>
                    </View>
                    <TouchableOpacity
                        style={{flex: 1, width: width, backgroundColor: 'green', justifyContent: 'center'}}>
                        <Text style={{
                            alignSelf: 'center',
                            textAlign: 'center',
                            backgroundColor: 'transparent',
                            color: 'white'
                        }}>Gửi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    indicator: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    },
    titleStyle: {
        marginTop: Platform.OS === 'ios' ? 16 : 0,
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: Color.backgroundNewFeed,
    },
    headerStyle: {
        elevation: 15, height: this.height / 7
    },
    itemSideMenuStyle: {
        borderBottomWidth: 1,
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
        marginLeft: 8,
    },
    textStyle: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent'
    },
    titleIconsMenu: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        fontFamily: 'Al Nile'
    },
    modal: {
        flexDirection: 'column',
        paddingHorizontal: 8,
        marginTop: 32,
        justifyContent: 'center',
    },
})