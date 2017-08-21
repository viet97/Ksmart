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
    Picker, TouchableHighlight, TextInput, Keyboard
} from 'react-native';

export default class DialogFilterListNhanVien extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            partyNhanVienStatus: [],
            dataPickStatus: []
        }
        this.state.dataPickStatus.push('Tất cả')
        this.state.dataPickStatus.push('Đang trực tuyến')
        this.state.dataPickStatus.push('Đang ngoại tuyến')
        this.state.dataPickStatus.push('Mất tín hiệu')
    }

    componentWillMount() {
        let party = this.props.partyNhanVienStatus;
        if (party === undefined || party === null || party.length === 0)
            this.getNhomNhanVienFromSv();
        else
            this.setState({partyNhanVienStatus: party})
    }

    _onSelectParty(id, value) {
        let idNhom = this.state.dataPartyNhanVien[this.state.partyNhanVienStatus[id]].IDNhom;

        this.setState({numberPickParty: id, idNhom: idNhom}, function () {
            this.getDataFromSv()
        })
    }

    _onSelectStatus(id, value) {
        console.log('id', id, value);
        this.setState({numberPickStatus: id}, function () {
            let dataFill = this.fillData(this.state.dataFull)
            this.setState({dataRender: dataFill})
        })
    }

    getNhomNhanVienFromSv() {
        fetch(URlConfig.getLinkNhomNhanVien())
            .then((response) => (response.json()))
            .then((responseJson) => {
                    arr = this.state.partyNhanVienStatus;

                    let dsnhom = {};
                    if (responseJson.status) {
                        let data = responseJson.danhsachnhom;
                        for (let item in responseJson.danhsachnhom) {
                            arr.push(data[item].TenNhom)
                            let obj = {IDNhom: data[item].ID_Nhom, IDParent: data[item].ID_PARENT};
                            dsnhom[data[item].TenNhom] = obj;
                        }

                        this.setState({
                            dataPartyNhanVien: dsnhom,
                            partyNhanVienStatus: arr
                        })
                    }
                }
            ).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }

    render() {
        return (
            <View style={{flexDirection: 'column'}}>
                <Text>Chon phong ban</Text>
                <ModalDropdown
                    options={this.state.partyNhanVienStatus}
                    style={{
                        borderWidth: 0.4,
                        width: 200,
                        padding: 8,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 16,
                        marginTop: 4
                    }}
                    defaultValue={this.state.partyNhanVienStatus[0]}
                    defaultIndex={0}
                    onSelect={(idx, value) => this._onSelectParty(idx, value)}
                    renderRow={this._renderRowStatus.bind(this)}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._renderSeparatorParty(sectionID, rowID, adjacentRowHighlighted)}
                />
                <Text>Chon trang thai</Text>
                <ModalDropdown
                    options={this.state.dataPickStatus}
                    style={{
                        borderWidth: 0.4,
                        width: 200,
                        padding: 8,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 4
                    }}
                    defaultValue={this.state.dataPickStatus[0]}
                    defaultIndex={0}
                    onSelect={(idx, value) => this._onSelectStatus(idx, value)}
                    renderRow={this._renderRowStatus.bind(this)}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._renderSeparatorStatus(sectionID, rowID, adjacentRowHighlighted)}
                />
                <View>
                    <TouchableOpacity
                        style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            marginTop: 16,
                            width: Dimensions.get('window').width / 4,
                            height: 48,
                            backgroundColor: 'green'
                        }}
                        onPress={() => {

                        }}>
                        <Text style={{color: 'white', alignSelf: 'center'}}>Ok</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}