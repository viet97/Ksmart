import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker'
import {
    Text, View, StyleSheet, TouchableOpacity, Dimensions, Button, Picker, ScrollView,
    TextInput, TouchableHighlight
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";

let width;
export default class ModalDropdownCustom extends Component {

    constructor(props) {
        super(props)
        this.onSelect = this.props.onSelect.bind(this);
        this.state = {
            width: 0,
            height: 0,
        }
    }

    render() {
        return (
            <ModalDropdown
                width={this.state.width}
                dropdownHeight={this.state.height}
                options={this.props.data}
                style={{
                    borderWidth:1,
                    width: this.state.width,
                    padding: 8,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 4, backgroundColor: 'transparent'
                }}
                textStyle={{color: 'black'}}
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

    componentDidUpdate(data) {
        if (this.state.height === 0) {
            if (this.props.data.length < 4)
                this.setState({height: this.props.data.length * 40})
            else this.setState({height: 160})
        }
    }

    componentDidMount() {
        if (this.props.width !== undefined)
            this.setState({width: this.props.width})
        else this.setState({width: 200})
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
        paddingBottom: 10,
        paddingTop: 10,
        flexDirection: 'row',
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
});