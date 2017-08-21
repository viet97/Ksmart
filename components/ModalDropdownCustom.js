import React, {Component, PropTypes} from 'react'
import DatePicker from 'react-native-datepicker'
import {
    Text, View, StyleSheet, TouchableOpacity, Dimensions, Button, Picker, ScrollView,
    TextInput, TouchableHighlight
} from "react-native";
import URlConfig from "../configs/url";
import Color from '../configs/color'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import {DialogComponent, SlideAnimation} from 'react-native-dialog-component';
import {TextInputLayout} from "rn-textinputlayout";
import orderListData from '../dbcontext/orderListData'
import DataTemp from "./DataTemp";
import ModalDropdown from "react-native-modal-dropdown";

export default class ModalDropdownCustom extends Component {

    constructor(props) {
        super(props)
        this.onSelect = this.props.onSelect.bind(this);
    }

    render() {
        return (
            <ModalDropdown
                options={this.props.data}
                style={{
                    borderWidth: 0.4,
                    width: 200,
                    padding: 8,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 4, backgroundColor: 'transparent'
                }}
                defaultValue={this.props.defaultValue}
                defaultIndex={0}
                onSelect={(idx, value) => {
                    this.onSelect(Number(idx), value);
                    console.log('dm hao', idx)
                }}
                renderRow={this._renderRowStatus.bind(this)}
                renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._renderSeparatorStatus(sectionID, rowID, adjacentRowHighlighted)}
            />

        )
    }

    _renderRowStatus(rowData, rowID, highlighted) {
        return (
            <TouchableHighlight underlayColor='cornflowerblue'>
                <View style={[styles.dropdown_2_row, {backgroundColor: 'white'}]}>
                    <Text style={[styles.dropdown_2_row_text, highlighted && {color: 'black', height: 20}]}>
                        {rowData}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    _renderSeparatorStatus(sectionID, rowID, adjacentRowHighlighted) {
        if (rowID === this.props.data.length - 1) return;
        let key = `spr_${rowID}`;
        return (<View style={styles.dropdown_2_separator}
                      key={key}
        />);
    }
}
const styles = StyleSheet.create({
    dropdown_2: {
        alignSelf: 'flex-end',
        width: 150,
        top: 32,
        right: 8,
        borderWidth: 0,
        borderRadius: 3,
        backgroundColor: 'cornflowerblue',
    },
    dropdown_2_text: {
        marginVertical: 10,
        marginHorizontal: 6,
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    dropdown_2_dropdown: {
        width: 150,
        height: 300,
        borderColor: 'cornflowerblue',
        borderWidth: 2,
        borderRadius: 3,
    },
    dropdown_2_row: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
    },
    dropdown_2_image: {
        marginLeft: 4,
        width: 30,
        height: 30,
    },
    dropdown_2_row_text: {
        marginHorizontal: 4,
        fontSize: 16,
        color: 'navy',
        textAlignVertical: 'center',
    },
    dropdown_2_separator: {
        height: 1,
        backgroundColor: 'cornflowerblue',
    }
})