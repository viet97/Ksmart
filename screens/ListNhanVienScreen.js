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
} from 'react-native';
import ModalDropdown from "react-native-modal-dropdown";
import Toast from 'react-native-simple-toast';
import Search from 'react-native-search-box';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import URlConfig from "../configs/url";
import Icon2 from 'react-native-vector-icons/Entypo'
import React from 'react';
import Color from '../configs/color'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import TabNavigator from 'react-native-tab-navigator';
import MapListScreen from "./MapListScreen";
import {Dialog} from 'react-native-simple-dialogs';
import ListNhanVienItem from "../components/ListNhanVienItem";

let {height, width} = Dimensions.get('window');

let Page = 1;
let SEARCH_STRING = '';
let ALL_LOADED = false
export default class ListNhanVienScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            idNhom: null,
            isEndList: false,
            dataPartyNhanVien: [],
            numberPickParty: 0,
            partyNhanVienStatus: [],
            selectedTab: 'ListNhanVien',
            kinhdo: 0,
            vido: 0,
            refreshing: false,
            dataFull: [],
            dataSearch: [],
            dataRender: null,
            onEndReach: true,
            waiting: false,
            numberPickStatus: 0,
            dataPickStatus: [],
            dialogVisible: false,
            heightImage: 30,
        })
        this.state.dataPickStatus.push('Tất cả')
        this.state.dataPickStatus.push('Đang trực tuyến')
        this.state.dataPickStatus.push('Đang ngoại tuyến')
        this.state.dataPickStatus.push('Mất tín hiệu')
    }


    renderFooter = () => {

        if (ALL_LOADED) return null;
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

    getDataFromSv() {
        Page = 1
        ALL_LOADED = false
        this.setState({isEndList: false, dataRender: null})
        fetch(URlConfig.getListNhanVienLink(Page, this.state.idNhom, SEARCH_STRING))
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status) {
                    this.setState({
                        dataFull: responseJson.dsNhanVien,
                        isEndList: responseJson.endlist
                    }, function () {
                        if (this.state.isEndList) {
                            ALL_LOADED = true
                            this.forceUpdate()
                        }
                        let dataFill = this.fillData(responseJson.dsNhanVien)
                        this.setState({dataRender: dataFill}, function () {
                        })
                    });
                } else {
                    ALL_LOADED = true
                    this.forceUpdate()
                }
            })
            .catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại' + e));
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
                            let dataFull = this.state.dataFull
                            dataFull = dataFull.concat(responseJson.dsNhanVien)
                            this.setState({
                                dataFull: dataFull,
                                isEndList: responseJson.endlist
                            }, function () {
                                if (this.state.isEndList) {
                                    ALL_LOADED = true
                                    this.forceUpdate()
                                }
                                let dataFill = this.fillData(responseJson.dsNhanVien)
                                let dataRender = this.state.dataRender.concat(dataFill)
                                this.setState({dataRender: dataRender})
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

    fillData(data) {
        let arr = []
        switch (this.state.numberPickStatus) {
            case 0:
                arr = data
                break;
            case 1:

                for (let item of data) {
                    if (item.dangtructuyen === 1) {
                        arr.push(item)
                    }
                }
                break;
            case 2:
                for (let item of data) {
                    if (item.dangtructuyen === 0) {
                        arr.push(item)
                    }
                }
                break;
            case 3:
                for (let item of data) {
                    if (item.dangtructuyen === 2) {
                        arr.push(item)
                    }
                }
                console.log('' + arr.length)
                break;

        }

        return arr
    }

    refreshData() {
        this.getDataFromSv()
    }

    flatListorIndicator() {

        if (!this.state.dataRender) {
            return (
                <View style={{flex: 9}}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"/>
                </View>)
        } else if (this.state.dataFull.length === 0 && this.state.isEndList)
            return (    <View style={{flex: 9}}>
                <Text style={{alignSelf: 'center', textAlign: 'center', fontSize: 20, backgroundColor: 'transparent'}}>Không
                    có dữ liệu</Text>

            </View>);

        return (
            <View style={{flex: 9}}>

                <FlatList
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.refreshData()
                    }}
                    ListFooterComponent={this.renderFooter}
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
                        <ListNhanVienItem
                            callback={() => this.props.callback(item.KinhDo, item.ViDo, 'Địa điểm Nhân Viên')}
                            goToDetailNhanVien={() => this.props.goToDetailNhanVien(item.idnhanvien)}
                            data={item}/>
                    }
                />
            </View>)
    }


    onChangeText(text) {
        return new Promise((resolve, reject) => {
            resolve();
            var arr = []
            var a = text.toLowerCase()
            SEARCH_STRING = a
            console.log(a)
            this.getDataFromSv()
        });
    }

    setDataRender() {
        let data = this.state.dataFull
        let arr = []
        switch (this.state.numberPickStatus) {
            case 0:

                arr = data
                break;
            case 1:

                for (let item of data) {
                    if (item.dangtructuyen === 1) {
                        arr.push(item)
                    }
                }
                break;
            case 2:
                for (let item of data) {
                    if (item.dangtructuyen === 0) {
                        arr.push(item)
                    }
                }
                break;
            case 3:
                for (let item of data) {
                    if (item.dangtructuyen === 2) {
                        arr.push(item)
                    }
                }
                console.log('' + arr.length)
                break;

        }

        return arr

    }

    onCancel() {
        return new Promise((resolve, reject) => {
            resolve();
            console.log("onCancle")
            if (SEARCH_STRING.length !== 0) {
                SEARCH_STRING = ''
                this.getDataFromSv()
            }

        });
    }

    showDialog() {
        this.setState({dialogVisible: true})

    }

    render() {
        let NhanVienStatusItem = this.state.dataPickStatus.map((s, i) => {
            return <Picker.Item key={i} value={i} label={s}/>
        });
        let partyStatusItem = this.state.partyNhanVienStatus.map((s, i) => {
            return <Picker.Item key={i} value={i} label={s}/>
        });
        return (
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'ListNhanVien'}
                    title="Nhân Viên"
                    renderIcon={() => <Icon1 size={24} color="black" name="ios-people-outline"/>}
                    renderSelectedIcon={() => <Icon1 size={24} color="green" name="ios-people-outline"/>}
                    onPress={() => this.setState({selectedTab: 'ListNhanVien'})}>
                    <View style={{flex: 1}}>
                        <Image source={require('../images/bg.png')}
                               style={{position: 'absolute', top: 0}}/>
                        <View style={styles.titleStyle}>
                            <Image source={require('../images/bg.png')}
                                   style={{position: 'absolute'}}/>
                            <TouchableOpacity onPress={() => this.props.backToHome()}
                                              style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                                <Icon1 style={styles.iconStyle} size={24} color="white"
                                       name="ios-arrow-back"/></TouchableOpacity>
                            <Text style={{
                                fontSize: 20,
                                color: 'white',
                                alignSelf: 'center',
                                backgroundColor: 'transparent'
                            }}>Danh sách nhân viên</Text>
                            <TouchableOpacity style={{alignSelf: 'center'}}
                                              onPress={() => this.showDialog()}
                            >
                                <Text style={{
                                    textAlign: 'center',
                                    color: 'white',
                                    alignSelf: 'center',
                                    backgroundColor: 'transparent'
                                }}>Bộ lọc</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{width: width}}>
                            <Search
                                placeholder="Tìm kiếm"
                                cancelTitle="Huỷ bỏ"
                                ref="search_box"
                                onChangeText={(text) => this.onChangeText(text)}
                                onCancel={() => this.onCancel()}
                            />
                        </View>
                        {this.flatListorIndicator()}
                        <Dialog
                            visible={this.state.dialogVisible}
                            title="Bộ lọc nhân viên"
                            onTouchOutside={() => {
                                //this.setState({dialogVisible: false})
                            }}>
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
                                        this.setState({dialogVisible: false})
                                    }}>
                                    <Text style={{color: 'white', alignSelf: 'center'}}>Ok</Text>
                                </TouchableOpacity>

                            </View>
                        </Dialog>
                    </View>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'MapForAllLocation'}
                    title="Vị trí"
                    renderIcon={() => <Icon2 size={24} color="black" name="location"/>}
                    renderSelectedIcon={() => <Icon2 size={24} color="green" name="location"/>}
                    onPress={() => this.setState({selectedTab: 'MapForAllLocation'})}>
                    <MapListScreen/>
                </TabNavigator.Item>
            </TabNavigator>

        )
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

    _renderRowStatus(rowData, rowID, highlighted) {
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

    _renderSeparatorStatus(sectionID, rowID, adjacentRowHighlighted) {
        if (rowID === this.state.dataPickStatus.length - 1) return;
        let key = `spr_${rowID}`;
        return (<View style={styles.dropdown_2_separator}
                      key={key}
        />);
    }

    _renderSeparatorParty(sectionID, rowID, adjacentRowHighlighted) {
        if (rowID === this.state.partyNhanVienStatus.length - 1) return;
        let key = `spr_${rowID}`;
        return (<View style={styles.dropdown_2_separator}
                      key={key}
        />);
    }

    componentDidMount() {
        this.getDataFromSv()
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

    componentWillMount() {
        this.getNhomNhanVienFromSv()
        console.log('13123')
    }
}


const styles = StyleSheet.create({
    titleStyle: {
        marginTop: Platform.OS === 'ios' ? 16 : 0,
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
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
        marginLeft: 16,

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
    },
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