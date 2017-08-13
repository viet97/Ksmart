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
    Picker, TouchableHighlight, TextInput
} from 'react-native';
import Icon2 from 'react-native-vector-icons/Entypo'

import {ProgressDialog} from 'react-native-simple-dialogs';
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import ModalDropdown from "react-native-modal-dropdown";
import URlConfig from "../configs/url";
import Search from "react-native-search-box";
import Toast from "react-native-simple-toast";

let Page = 1
let ALL_LOADED = false
let SEARCH_STRING = ''
let {width, height} = Dimensions.get('window')
export default class DialogCustom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onEndReach: true,
            refreshing: false,
            idNhom: null,
            dataRender: null,
            isEndList: false,
            progressVisible: false,
            listGroup: [],
            positionGroupChoose: -1,
            listNameGroup: [],
            listNhanVien: [],
            listNameNhanVien: [],
            nhanVienSelect: '',
            textSearch: '',
            idNhanVien: '',
        }
    }

    renderFooter = () => {
        if (ALL_LOADED) return null
        return (
            <View
                style={{
                    justifyContent: 'center',
                    borderColor: "green"
                }}
            >
                <ActivityIndicator animating={true} size="large"/>
            </View>
        );
    };

    getListNhanVienFromSv(id) {
        Page = 1
        this.setState({dataRender: null, isEndList: false})
        fetch(URlConfig.getListNhanVienLink(Page, id, SEARCH_STRING))
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    let arr = []
                    let dsnhanvien = responseJson.dsNhanVien
                    for (let item of dsnhanvien) {
                        arr.push(item.tennhanvien)
                    }
                    this.setState({
                        dataRender: responseJson.dsNhanVien,
                        isEndList: responseJson.endlist,
                        listNhanVien: dsnhanvien,
                        listNameNhanVien: arr,
                    }, function () {
                        if (this.state.isEndList) {
                            ALL_LOADED = true
                            this.forceUpdate()
                        }
                    })
                } else {
                    Toast.show('' + 123)
                    ALL_LOADED = true
                    this.forceUpdate()
                }

            })
            .catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại' + e))

    }

    loadMoreDataFromSv() {

        if (!this.state.onEndReach) {
            this.setState({onEndReach: true})

            if (!this.state.isEndList) {
                Page = Page + 1
                fetch(URlConfig.getListNhanVienLink(Page, this.state.idNhom, SEARCH_STRING))
                    .then((response) => response.json())
                    .then((responseJson) => {
                        if (responseJson.status) {
                            let arr = []
                            let dataFull = this.state.listNhanVien
                            dataFull = dataFull.concat(responseJson.dsNhanVien)
                            for (let item of dataFull) {
                                arr.push(item.tennhanvien)
                            }
                            this.setState({
                                dataRender: dataFull,
                                listNhanVien: dataFull,
                                listNameNhanVien: arr,
                                isEndList: responseJson.endlist
                            }, function () {
                                if (this.state.isEndList) {
                                    ALL_LOADED = true
                                    this.forceUpdate()
                                }
                            });
                        } else {
                            ALL_LOADED = true
                            this.forceUpdate()
                        }
                    })
                    .catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'));
            }
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
        this.getListNhanVienFromSv(this.state.idNhom)

    }

    render() {
        return (

            <View style={{flexDirection: 'column', flex: 1}}>
                <View style={{flexDirection: 'column', flex: 9}}>
                    <Text>Chọn phòng ban: </Text>
                    <ModalDropdown
                        options={this.state.listNameGroup}
                        style={{borderWidth: 0.4, width: 200, padding: 8, borderRadius: 10}}
                        defaultValue="- Chọn phòng ban- "
                        onSelect={(idx, value) => this._onSelect(idx, value)}
                        renderRow={this._renderRowGroup.bind(this)}
                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._renderSeparatorGroup(sectionID, rowID, adjacentRowHighlighted)}
                    />
                    <TextInput
                        ref='textinput'
                        style={{
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 0.4,
                            borderRadius: 10,
                            paddingLeft: 8,
                            marginTop: 10
                        }}
                        onChangeText={(textSearch) => {
                            if (this.state.positionGroupChoose === -1 || this.state.positionGroupChoose === '-1') {
                                SEARCH_STRING = textSearch
                                Toast.show('Vui long chon phong ban truoc')
                            } else {
                                SEARCH_STRING = textSearch
                                this.getListNhanVienFromSv(this.state.idNhom)
                            }
                            this.setState({textSearch: textSearch})
                        }}
                        onSubmitEditing={() => {
                            this.refs.nhanvien.show();
                        }}
                        value={this.state.textSearch}
                        placeholder={'Nhap ten nhan vien'}
                    />
                    <ModalDropdown
                        ref="nhanvien"
                        keyboardShouldPersistTaps='always'
                        options={this.state.listNameNhanVien}
                        disabled={true}
                        adjustFrame={style => this._adjustFrame(style)}
                        style={{borderWidth: 0.4, width: 0, height: 0}}
                        defaultValue="- Chọn nhân viên- "
                        onSelect={(idx, value) => {
                            this.setState({nhanVienSelect: this.state.listNhanVien[idx]})
                        }}
                        renderRow={this._renderRowNhanVien.bind(this)}
                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._renderSeparatorNhanVien(sectionID, rowID, adjacentRowHighlighted)}
                    />
                    <FlatList
                        ListFooterComponent={this.renderFooter}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.getListNhanVienFromSv(this.state.idNhom)
                        }}
                        ref="listview"
                        onEndReachedThreshold={0.2}
                        onEndReached={() => {
                            this.loadMoreDataFromSv()
                        }}
                        onMomentumScrollBegin={() => {
                            this.setState({onEndReach: false})
                        }}
                        extraData={this.state.dataRender}
                        data={this.state.dataRender}
                        renderItem={({item}) =>
                            <TouchableOpacity

                                onPress={() => this.setState({
                                textSearch: item.tennhanvien,
                                idNhanVien: item.idnhanvien
                            })}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{justifyContent: 'center'}}>
                                        <Image
                                            style={{margin: 8, width: 60, height: 60, borderRadius: 30}}
                                            source={require('../images/bglogin.jpg')}/>
                                    </View>
                                    <View style={{flex: 4, margin: 8, justifyContent: 'center'}}>
                                        <Text
                                            style={{
                                                fontSize: 18, backgroundColor: 'transparent'
                                            }}>{item.tennhanvien}</Text>
                                        <Text>{item.tendangnhap}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <TouchableOpacity
                        style={{paddingLeft: 16}}
                        onPress={() => {
                        DialogManager.dismiss();
                    }}>
                        <Text>Huy bo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{paddingLeft: 16}}
                        onPress={() => {
                        DialogManager.dismiss(() => {
                            this.props.callback(this.state.idNhanVien, this.state.textSearch)
                        });
                    }}>
                        <Text>Ap dung</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _adjustFrame(style) {
        style.top -= Dimensions.get('window').height / 2;
        return style;
    }

    _onSelect(id, value) {
        console.log('dmcc', id, value);
        console.log('dmcc', this.state.listGroup[id])
        this.setState({idNhom: this.state.listGroup[id].ID_Nhom, positionGroupChoose: id}, function () {
            this.getListNhanVienFromSv(this.state.listGroup[id].ID_Nhom)
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