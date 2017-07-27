import React, {Component} from 'react';
import {
    View, Dimensions, Text, Picker, StyleSheet, TouchableOpacity, Image, Platform
} from "react-native";

export default class ChooseTypeChart extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                marginTop: Platform.OS === 'ios' ? 16 : 0,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TouchableOpacity
                    onPress={() => this.props.goToDoanhThuChart()}
                    style={styles.touchableStyle}>
                    <Text style={styles.textStyle}>Biểu đồ doanh thu
                        sản lượng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableStyle}>
                    <Text style={styles.textStyle}>Biểu đồ doanh thu
                        sản lượng theo nhân viên</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.goToOnlineChart()}
                    style={styles.touchableStyle}>
                    <Text style={styles.textStyle}>Biểu đồ tần suất
                        nhân viên online</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableStyle}>
                    <Text style={styles.textStyle}>Biểu đồ tần suất
                        viếng thăm theo nhân viên</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const propView = 7 / 8;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    textStyle: {
        color: 'white', backgroundColor: 'transparent', fontSize: 16, textAlign: 'center', width: width * propView
    },
    touchableStyle: {
        borderRadius: 32,
        backgroundColor: '#19b5fe',
        marginBottom: 16,
        paddingVertical: 16,
        elevation: 10
    }
})