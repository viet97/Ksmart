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
    Picker, TouchableHighlight, ScrollView, RefreshControl,
    Alert
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
import PTRView from 'react-native-pull-to-refresh'
import ListNhanVienItem from "../components/ListNhanVienItem";
import LinearGradient from "react-native-linear-gradient";
import ModalDropdownCustom from "../components/ModalDropdownCustom";
import HeaderCustom from "../components/Header";

let {height, width} = Dimensions.get('window');
const timer = require('react-native-timer');

let Page = 1
let SEARCH_STRING = '';
let ALL_LOADED = false;
let pickStatus = 0;
let pickParty = 0;
let id_nhom = null;
export default class ListNhanVienScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = ({
            idNhom: null,
            isEndList: false,
            dataPartyNhanVien: [],
            numberPickParty: 0,
            partyNhanVienStatus: [],
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
        })
        this.state.dataPickStatus.push('Tất cả');
        this.state.dataPickStatus.push('Đang ngoại tuyến');
        this.state.dataPickStatus.push('Đang trực tuyến');
        this.state.dataPickStatus.push('Mất tín hiệu');
    }


    getImage(url) {
        if (url.length === 0) {
            return (

                <Image
                    source={require('../images/bglogin.jpg')}
                    indicator={ProgressBar.Pie}
                    style={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
            );
        } else {
            return (
                <Image

                    source={{uri: url}}
                    indicator={ProgressBar.Pie}
                    style={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
            );
        }
    }

    isOnline(dangtructuyen) {
        if (dangtructuyen === 1)
            return (
                <View style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}}>
                    <Icon2 style={{backgroundColor: 'transparent'}} size={24} color="green"
                           name="controller-record"/>
                    <Text style={{alignSelf: 'center', fontSize: 11}}>Trực tuyến</Text>
                </View>)
        else if (dangtructuyen === 2)
            return (
                <View style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}}>
                    <Icon2 style={{backgroundColor: 'transparent'}} size={24} color="red"
                           name="controller-record"/>
                    <Text style={{alignSelf: 'center', fontSize: 11}}>Mất tín hiệu</Text>
                </View>)
        else if (dangtructuyen === 0)
            return (
                <View style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}}>
                    <Icon2 style={{backgroundColor: 'transparent'}} size={24} color="gray"
                           name="controller-record"/>
                    <Text style={{alignSelf: 'center', fontSize: 11}}>Ngoại tuyến</Text>
                </View>)

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
        const {params} = this.props.navigation.state
        Page = 1;
        ALL_LOADED = false;
        this.setState({isEndList: false, dataRender: null})
        fetch(URlConfig.getListNhanVienLink(Page, id_nhom, SEARCH_STRING, params.status))
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
                        this.setState({dataRender: this.state.dataFull})
                    });
                } else {
                    ALL_LOADED = true
                    this.forceUpdate()
                }
            })
            .catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'));
    }

    loadMoreDataFromSv() {
        console.log('LOAD MORE!!!!!!!!')
        const {params} = this.props.navigation.state
        if (!this.state.onEndReach) {
            this.setState({onEndReach: true})

            if (!this.state.isEndList) {
                Page = Page + 1
                fetch(URlConfig.getListNhanVienLink(Page, id_nhom, SEARCH_STRING, params.status))
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

                                this.setState({dataRender: this.state.dataFull})
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
        let arr = [];
        switch (this.state.numberPickStatus) {
            case 0:
                arr = data;
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
        const {navigate} = this.props.navigation
        if (!this.state.dataRender) {
            return (
                <View style={{flex: 9}}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"/>
                </View>)
        } else if (this.state.dataFull.length === 0 && this.state.isEndList)
            return (
                <View style={{flex: 9}}>
                    <Text style={{
                        alignSelf: 'center',
                        textAlign: 'center',
                        fontSize: 20,
                        backgroundColor: 'transparent'
                    }}>Không
                        có dữ liệu</Text>

                </View>
            )
        return (
            <View style={{flex: 9}}>

                <FlatList
                    keyboardDismissMode="on-drag"
                    ListFooterComponent={this.renderFooter}
                    ref="listview"
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        this.loadMoreDataFromSv()
                    }}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.refreshData()
                    }}
                    onMomentumScrollBegin={() => {
                        this.setState({onEndReach: false})
                    }}

                    extraData={this.state.dataRender}
                    data={this.state.dataRender}
                    renderItem={({item}) =>
                        <ListNhanVienItem
                            data={item}
                            goToDetailNhanVien={() => navigate('DetailNhanVien', {idNhanVien: item.idnhanvien})}
                            callback={() => navigate('Map', {
                                kinhdo: item.KinhDo,
                                vido: item.ViDo,
                                title: 'Địa điểm Nhân Viên'
                            })}
                        />
                    }
                />
            </View>)
    }

    onChangeText(text) {
        return new Promise((resolve, reject) => {
            resolve();
            let arr = []
            var a = text.toLowerCase();
            SEARCH_STRING = a
            console.log(a)
            timer.clearTimeout(this)
            timer.setTimeout(this, "123", () => this.getDataFromSv(), 500);

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

        return (

            <View style={{flex: 1, backgroundColor: 'white'}}>
                <HeaderCustom
                    title={"Danh sách nhân viên"}
                    leftClick={() => this.props.navigation.goBack()}
                    rightChildren={
                        <TouchableOpacity
                            style={{alignSelf: 'center'}}
                            onPress={() => this.showDialog()}>
                            <Text style={{
                                textAlign: 'center',
                                color: 'white',
                                alignSelf: 'center',
                                backgroundColor: 'transparent'
                            }}>Bộ lọc</Text>
                        </TouchableOpacity>
                    }/>

                <View style={{width: width, marginTop: 16, marginBottom: 16}}>
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
                    dialogStyle={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}
                >

                    <View style={{
                        flexDirection: 'column',
                        paddingBottom: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                    }}>
                        <Text style={{color: 'black'}}>Chọn phòng ban</Text>
                        <ModalDropdownCustom
                            data={this.state.partyNhanVienStatus}
                            defaultValue={this.state.partyNhanVienStatus[pickParty]}
                            onSelect={(idx, value) => this._onSelectParty(idx, value)}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: '#123'
                    }}>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#e8e8e8',
                                borderRightWidth: 0.5,
                                borderColor: 'white',
                                height: 46,
                            }}
                            onPress={() => {
                                this.setState({dialogVisible: false});
                                console.log('Huỷ bỏ ', this.state.numberPickStatus, this.state.numberPickParty);
                            }}>
                            <Text style={{color: '#6a5aff', alignSelf: 'center'}}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'center',
                                justifyContent: 'center',
                                flex: 1,
                                backgroundColor: '#e8e8e8',
                                borderColor: 'white',
                                height: 46
                            }}
                            onPress={() => {
                                this.setState({
                                    dialogVisible: false,
                                    numberPickParty: pickParty,
                                    idNhom: id_nhom,
                                    numberPickStatus: pickStatus
                                }, function () {
                                    this.getDataFromSv();

                                })
                            }}>
                            <Text style={{
                                color: '#6a5aff',
                                alignSelf: 'center',
                                fontWeight: 'bold'
                            }}>Ok</Text>
                        </TouchableOpacity>

                    </View>
                </Dialog>
            </View>

        )
    }

    _onSelectParty(id, value) {
        id_nhom = this.state.dataPartyNhanVien[this.state.partyNhanVienStatus[id]].IDNhom;
        pickParty = id;

        // this.setState({numberPickParty: id, idNhom: idNhom}, function () {
        //     this.getDataFromSv()
        // })
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
        pickStatus = 0;
        pickParty = 0;
        id_nhom = null;
        SEARCH_STRING = ''
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
        console.log('13123');
    }
}


const styles = StyleSheet.create({
    titleStyle: {
        paddingTop: Platform.OS === 'ios' ? 16 : 0,
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