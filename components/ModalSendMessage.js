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
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }

    render() {
        return (
            <View style={{height: height - height / 9}}>
                <View style={{position: 'absolute', right: 8, top: 0}}>
                    <TouchableOpacity

                        onPress={() => {
                            this.refs.modal.close()
                        }}>
                        <Icon style={{paddingVertical: 8}} name="x" size={24} color="#EC433E" type="foundation"/>

                    </TouchableOpacity>

                </View>
                <Text style={{marginLeft: 16}}>
                    Nội dung
                </Text>
                <View style={{flex: 7}}>
                    <ScrollView style={{margin: 16, flex: 1}}>
                        <TextInput
                            style={{flex: 1}}
                            onChangeText={(text) => this.setState({text: text})}
                            value={this.state.text}
                        />
                    </ScrollView>
                </View>
                <TouchableOpacity style={{flex: 2}}>
                    <Text style={{alignSelf: 'center', textAlign: 'center'}}>Gửi</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
