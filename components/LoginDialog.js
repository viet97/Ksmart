import React, {Component} from 'react'
import DatePicker from 'react-native-datepicker'
import {
    Text, View, StyleSheet, TouchableOpacity, Dimensions, Button, Picker, ScrollView,
    TextInput, ActivityIndicator
} from "react-native";
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';


export default class LoginDialog extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <View style={{justifyContent: 'center', borderRadius: 10}}>
                <DialogContent  >
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <ActivityIndicator
                            animating={true}
                            style={styles.indicator}
                            size="large"/>
                        <Text style={{fontSize: 16, fontWeight: 'bold', alignSelf: 'center', textAlign: 'center'}}>Đang
                            đăng
                            nhập...</Text>
                    </View>
                </DialogContent>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    absolute: {
        top: 0, bottom: 0, left: 0, right: 0, position: 'absolute',
    },
    container: {
        flex: 1,
        paddingTop: 100
    },
    textInput: {
        fontSize: 16,
        height: 40,
        color: 'red'
    },
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 36
    },
    loginTextButton: {
        fontSize: 16,
        fontFamily: 'Al Nile',
        color: 'darkblue'
    },
    indicator: {
        alignSelf: 'center',
    }
})