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
    Image,
    ActivityIndicator, Platform,
    Picker, TouchableHighlight
} from 'react-native';

import {ProgressDialog} from 'react-native-simple-dialogs';
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import ModalDropdown from "react-native-modal-dropdown";
import URlConfig from "../configs/url";

export default class DialogCustom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progressVisible: false,
            listGroup: [],
            listNameGroup: [],
            listNhanVien: [],
            listNameNhanVien: [],
            nhanVienSelect: ''
        }
    }

    componentWillMount() {
        fetch(URlConfig.getLinkNhomNhanVien())
            .then((response) => (response.json()))
            .then((responseJson) => {
                    let dsnhom = responseJson.danhsachnhom;
                    let arr = []
                    for (let item of dsnhom) {
                        arr.push(item.TenHienThi_NhanVien)
                    }
                    this.setState({listGroup: responseJson.danhsachnhom, listNameGroup: arr})
                }
            ).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))

    }

    render() {
        return (
            <DialogContent style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'column'}}>
                    <Text>Chọn phòng ban: </Text>
                    <ModalDropdown
                        options={this.state.listNameGroup}
                        style={{borderWidth: 0.4, width: 200, padding: 8, borderRadius: 10}}
                        defaultValue="- Chọn phòng ban- "
                        onSelect={(idx, value) => this._onSelect(idx, value)}
                        renderRow={this._renderRowGroup.bind(this)}
                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._renderSeparatorGroup(sectionID, rowID, adjacentRowHighlighted)}
                    />
                </View>
                <View style={{flexDirection: 'column'}}>
                    <Text>Chọn nhân viên: </Text>
                    <ModalDropdown
                        options={this.state.listNameNhanVien}
                        style={{borderWidth: 0.4, width: 200, padding: 8, borderRadius: 10}}
                        defaultValue="- Chọn nhân viên- "
                        onSelect={(idx, value) => {
                            this.setState({nhanVienSelect: this.state.listNhanVien[idx]})
                        }}
                        renderRow={this._renderRowNhanVien.bind(this)}
                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._renderSeparatorNhanVien(sectionID, rowID, adjacentRowHighlighted)}
                    />
                </View>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 16,
                    right: 16,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <TouchableOpacity onPress={() => {
                        DialogManager.dismiss();
                    }}>
                        <Text>Huy bo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        DialogManager.dismiss(() => {
                            this.props.callback(this.state.nhanVienSelect)
                        });
                    }}>
                        <Text>Ap dung</Text>
                    </TouchableOpacity>
                </View>
            </DialogContent>
        );
    }

    _onSelect(id, value) {
        console.log('dmcc', id, value);
        console.log('dmcc', this.state.listGroup[id])
        let url = URlConfig.getListNhanVienLink(this.state.listGroup[id].ID_Nhom);
        console.log('url', url)
        fetch(url)
            .then((response) => (response.json()))
            .then((responseJson) => {
                    let dsnhanvien = responseJson.dsNhanVien;
                    let arr = []
                    for (let item of dsnhanvien) {
                        arr.push(item.tennhanvien)
                    }
                    this.setState({listNhanVien: dsnhanvien, listNameNhanVien: arr})
                }
            ).catch((e) => {
            Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại')
        })

    }

    _renderRowGroup(rowData, rowID, highlighted) {
        let icon = highlighted ? require('../images/heart.png') : require('../images/flower.png');
        let evenRow = rowID % 2;
        return (
            <TouchableHighlight underlayColor='cornflowerblue'>
                <View style={[styles.dropdown_2_row, {backgroundColor: evenRow ? 'lemonchiffon' : 'white'}]}>
                    <Image style={styles.dropdown_2_image}
                           mode='stretch'
                           source={icon}
                    />
                    <Text style={[styles.dropdown_2_row_text, highlighted && {color: 'mediumaquamarine'}]}>
                        {rowData}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    _renderSeparatorGroup(sectionID, rowID, adjacentRowHighlighted) {
        if (rowID === this.state.listGroup.length - 1) return;
        let key = `spr_${rowID}`;
        return (<View style={styles.dropdown_2_separator}
                      key={key}
        />);
    }

    _renderRowNhanVien(rowData, rowID, highlighted) {
        let icon = highlighted ? require('../images/heart.png') : require('../images/flower.png');
        let evenRow = rowID % 2;
        return (
            <TouchableHighlight underlayColor='cornflowerblue'>
                <View style={[styles.dropdown_2_row, {backgroundColor: evenRow ? 'lemonchiffon' : 'white'}]}>
                    <Image style={styles.dropdown_2_image}
                           mode='stretch'
                           source={icon}
                    />
                    <Text style={[styles.dropdown_2_row_text, highlighted && {color: 'mediumaquamarine'}]}>
                        {rowData}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    _renderSeparatorNhanVien(sectionID, rowID, adjacentRowHighlighted) {
        if (rowID === this.state.listNhanVien.length - 1) return;
        let key = `spr_${rowID}`;
        return (<View style={styles.dropdown_2_separator}
                      key={key}
        />);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        height: 500,
        paddingVertical: 100,
        paddingLeft: 20,
    },
    textButton: {
        color: 'deepskyblue',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'deepskyblue',
        margin: 2,
    },

    dropdown_1: {
        flex: 1,
        top: 32,
        left: 8,
    },
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
    },
    dropdown_3: {
        width: 150,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 1,
    },
    dropdown_3_dropdownTextStyle: {
        backgroundColor: '#000',
        color: '#fff'
    },
    dropdown_3_dropdownTextHighlightStyle: {
        backgroundColor: '#fff',
        color: '#000'
    },
    dropdown_4: {
        margin: 8,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 1,
    },
    dropdown_4_dropdown: {
        width: 100,
    },
    dropdown_5: {
        margin: 8,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 1,
    },
    dropdown_6: {
        flex: 1,
        left: 8,
    },
    dropdown_6_image: {
        width: 40,
        height: 40,
    },
});