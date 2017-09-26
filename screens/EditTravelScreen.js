import {
    AppRegistry,
    Text,
    View,
    Button, ListView, StyleSheet, StatusBar,
    TouchableOpacity,
    Dimensions,
    BackHandler,
    FlatList,
    ActivityIndicator, Keyboard,
    Platform, Image,
    TextInput
} from 'react-native';
import {NavigationActions} from "react-navigation";
import Modal from 'react-native-modalbox';
import Search from 'react-native-search-box';
import Communications from 'react-native-communications';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Ionicons'
import URlConfig from "../configs/url";
import React from 'react';
import Color from '../configs/color'
import Toast from 'react-native-simple-toast'
import DatePicker from "react-native-datepicker";
import Autocomplete from "react-native-autocomplete-input";
import CustomerScreen from "./CustomerScreen";
import ChooseTypeChart from "./ChooseTypeChart";
import ChooseCustomerScreen from "./ChooseCustomerScreen";
import Utils from '../configs/ultils'

export default class EditTravelScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state
        this.state = {
            idnhanvien: '',
            idkehoach: null,
            idkhachhang: '',
            tennhanvien: '',
            tenkhachhang: '',
            dateCome: '',
            dateOut: '',
            hideResultsReceiver: true,
            hideResultsCustomer: true,
            listNhanVien: [],
            listKhachHang: [],
            customerSelect: null,
            personSelect: null,
            showHeader: true,
        }
        this.renderHeader = this.renderHeader.bind(this);
    }

    requestSearch(text) {
        this.setState({listNhanVien: []});
        this.loadAllSearch(text);
    }

    loadAllSearch(receiver, page = 1) {
        if (receiver !== this.state.receiver) {
            return;
        }
        fetch(URlConfig.getListNhanVienLink(page, null, receiver))
            .then((response) => (response.json()))
            .then((responseJson) => {
                    if (receiver !== this.state.receiver) {
                        return;
                    }
                    let arr = this.state.listNhanVien;
                    arr = arr.concat(responseJson.dsNhanVien);
                    this.setState({listNhanVien: arr});
                    if (!responseJson.endlist) {
                        this.loadAllSearch(receiver, responseJson.nextpage);
                    }
                }
            ).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'));
    }

    renderHeader() {
        const {params} = this.props.navigation.state;

        if (Platform.OS === 'ios') {
            return (
                <View style={styles.titleStyle}>
                    <Image source={require('../images/bg3.png')}
                           style={{position: 'absolute'}}/>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                        style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Chỉnh
                        sửa kế hoạch</Text>
                    <TouchableOpacity
                        onPress={() => {
                            let moment = require('moment');
                            let date1 = moment(this.state.dateCome, 'DD-MM-YYYY HH:mm:ss').toDate();
                            let date2 = moment(this.state.dateOut, 'DD-MM-YYYY HH:mm:ss').toDate();
                            let now = new Date();
                            if (this.state.dateComeReal !== '1900-01-01T00:00:00') {
                                Toast.show('Kế hoạch đã vào điểm, bạn không thể chỉnh sửa')
                            } else if (date1.getTime() - date2.getTime() >= 0 || date1.getTime() - now.getTime() < 0) {
                                Toast.show("Thời gian vào điểm phải trước ra điểm và sau thời điểm hiện tại , vui lòng thử lại!")
                            }
                            else {
                                let obj = {
                                    idkehoach: this.state.idkehoach,
                                    idnhanvien: this.state.idnhanvien,
                                    idkhachhang: this.state.idkhachhang,
                                    thoigiandukien: this.state.dateCome,
                                    thoigiancheckoutdukien: this.state.dateOut
                                };
                                fetch(URlConfig.getLinkEditTravel(obj))
                                    .then((response) => (response.json()))
                                    .then((responseJson) => {
                                        if (responseJson.status) {
                                            Toast.show('Sửa thành công!')
                                            const {params} = this.props.navigation.state
                                            params.reload()
                                            this.props.navigation.goBack();
                                        }
                                    })
                            }
                        }
                        }
                        style={
                            {
                                padding: 8,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'transparent'
                            }
                        }>
                        <Text
                            style={
                                {
                                    color: 'white',
                                    paddingRight: 8,
                                    paddingTop: 8
                                }
                            }>
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        } else if (this.state.showHeader) {
            console.log('vaooooo')
            return (
                <View style={styles.titleStyle}>
                    <Image source={require('../images/bg3.png')}
                           style={{position: 'absolute'}}/>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                        style={{padding: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon1 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 20,
                        color: 'white',
                        alignSelf: 'center',
                        backgroundColor: 'transparent'
                    }}>Chỉnh
                        sửa kế hoạch</Text>
                    <TouchableOpacity
                        onPress={() => {
                            let moment = require('moment')
                            let date1 = moment(this.state.dateCome, 'DD-MM-YYYY HH:mm:ss').toDate();
                            let date2 = moment(this.state.dateOut, 'DD-MM-YYYY HH:mm:ss').toDate();
                            let now = new Date();
                            if (this.state.dateComeReal !== '1900-01-01T00:00:00') {
                                Toast.show('Kế hoạch đã vào điểm, bạn không thể chỉnh sửa')
                            } else if (date1.getTime() - date2.getTime() >= 0 || date1.getTime() - now.getTime() < 0) {
                                Toast.show("Thời gian vào điểm phải trước ra điểm và sau thời điểm hiện tại , vui lòng thử lại!")
                            }
                            else {
                                let obj = {
                                    idkehoach: this.state.idkehoach,
                                    idnhanvien: this.state.idnhanvien,
                                    idkhachhang: this.state.idkhachhang,
                                    thoigiandukien: this.state.dateCome,
                                    thoigiancheckoutdukien: this.state.dateOut
                                };
                                fetch(URlConfig.getLinkEditTravel(obj))
                                    .then((response) => (response.json()))
                                    .then((responseJson) => {
                                            if (responseJson.status) {

                                                Toast.show('Sửa thành công!')
                                                this.props.navigation.goBack();
                                            } else {
                                                Toast.show('Sửa thất bại,vui lòng thử lại!')
                                            }
                                        }
                                    ).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
                            }
                        }}
                        style={{
                            padding: 8,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'transparent'
                        }}>
                        <Text style={{color: 'white', paddingRight: 8, paddingTop: 8}}>OK</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }


    render() {
        const {navigate} = this.props.navigation;
        const {params} = this.props.navigation.state;

        return (
            <View style={{flex: 1, backgroundColor: 'transparent'}}>
                <Image source={require('../images/bg3.png')}
                       style={{position: 'absolute', top: 0}}/>

                {this.renderHeader()}
                <View style={{
                    marginTop: 4, marginBottom: 4, marginLeft: 8, marginRight: 8,
                    flex: 9
                }}>
                    <Text>Tên nhân viên</Text>
                    <View style={styles.autocompleteContainer}>
                        <Autocomplete
                            hideResults={this.state.hideResultsReceiver}
                            data={this.state.listNhanVien}
                            defaultValue={this.state.tennhanvien}
                            placeholder="Nhập tên nhân viên"
                            style={{
                                width: Dimensions.get('window').width,
                                paddingLeft: 8,
                                height: 40,
                                backgroundColor: 'white'
                            }}
                            onChangeText={text => {
                                if (text.length !== 0) {
                                    this.setState({
                                        hideResultsCustomer: true,
                                        hideResultsReceiver: false,
                                        receiver: text
                                    }, function () {
                                        this.requestSearch(text);
                                    })
                                } else {
                                    this.setState({hideResultsReceiver: true})
                                }
                            }}
                            renderItem={(data) => (
                                <TouchableOpacity
                                    style={{flexDirection: 'row'}}
                                    onPress={() => {
                                        this.setState({
                                            nameInput: data.tennhanvien,
                                            tennhanvien: data.tennhanvien,
                                            idnhanvien: data.idnhanvien,
                                            hideResultsReceiver: true,
                                            personSelect: data
                                        });
                                        Keyboard.dismiss();
                                    }}>

                                    <View style={{justifyContent: 'center'}}>
                                        <Image
                                            style={{margin: 8, width: 30, height: 30, borderRadius: 15}}
                                            source={require('../images/bglogin.jpg')}/>
                                    </View>
                                    <Text style={{marginLeft: 16, alignSelf: 'center'}}>{data.tennhanvien}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <Text style={{marginTop: 60}}>Tên cửa hàng</Text>
                    <TouchableOpacity style={{
                        width: Platform.OS === 'ios' ? Dimensions.get('window').width : Dimensions.get('window').width - 16,
                        height: 40,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        paddingLeft: 16
                    }}
                                      onPress={() => {
                                          Keyboard.dismiss();
                                          this.setState({showHeader: false})
                                          this.refs.modal.open()
                                      }}
                    >
                        <Text style={{fontSize: 16}}>{this.state.tenkhachhang}</Text>
                    </TouchableOpacity>

                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Text style={{backgroundColor: 'transparent', fontSize: 16, alignSelf: 'center'}}>Vào điểm dự
                            kiến:</Text>

                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>

                        <Text style={{backgroundColor: 'transparent', alignSelf: 'center'}}>Thời gian: </Text>
                        <DatePicker
                            style={{marginLeft: 8, width: 120}}
                            date={this.state.dateCome}
                            mode="datetime"
                            format="DD-MM-YYYY HH:mm:ss"
                            confirmBtnText="Xác nhận"
                            cancelBtnText="Huỷ bỏ"
                            customStyles={{
                                dateIcon: {},
                                dateInput: {
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    borderRadius: 4, width: 120
                                },
                            }}
                            onDateChange={(date) => {
                                this.setState({dateCome: date})
                            }}
                        />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Text style={{backgroundColor: 'transparent', fontSize: 16, alignSelf: 'center'}}>Ra điểm dự
                            kiến:</Text>

                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 8,
                        marginTop: 4,
                        marginRight: 8,
                        marginBottom: 4
                    }}>
                        <Text style={{backgroundColor: 'transparent', alignSelf: 'center'}}>Thời gian: </Text>
                        <DatePicker
                            style={{marginLeft: 8, width: 120}}
                            date={this.state.dateOut}
                            mode="datetime"
                            format="DD-MM-YYYY HH:mm:ss"
                            confirmBtnText="Xác nhận"
                            cancelBtnText="Huỷ bỏ"
                            customStyles={{
                                dateIcon: {},
                                dateInput: {
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    borderRadius: 4, width: 120,
                                },
                            }}
                            onDateChange={(date) => {
                                this.setState({dateOut: date})
                            }}
                        />
                    </View>
                </View>
                <Modal
                    style={{marginTop: 16}}
                    ref={"modal"}
                    onOpened={() => {
                        this.setState({showHeader: false})
                    }}
                    onClosed={() => {
                        this.setState({showHeader: true})
                    }}
                    swipeToClose={true}>
                    <ChooseCustomerScreen
                        callback={(item) => {
                            this.setState({
                                customerSelect: item,
                                tenkhachhang: item.TenCuaHang,
                                idkhachhang: item.idcuahang
                            });
                            this.setState({showHeader: true})
                            this.refs.modal.close();
                        }}
                        backClick={() => {
                            this.setState({showHeader: true})
                            this.refs.modal.close()
                        }}
                    />
                </Modal>
            </View>
        )
    }

    millisToMinutes(from, to) {
        var dateFrom = new Date(from)
        var dateTo = new Date(to)
        var millis = dateFrom - dateTo;
        var minutes = Math.floor(millis / 60000);
        return minutes;
    }

    componentDidMount() {
        const {params} = this.props.navigation.state;
        fetch(URlConfig.getLinkDetailTravel(params.id))
            .then((response) => (response.json()))
            .then((responseJson) => {
                console.log(responseJson.data)
                if (responseJson.status) {
                    this.setState({
                        tennhanvien: responseJson.thongtin.TenNhanVien,
                        tenkhachhang: responseJson.thongtin.TenCuaHang,
                        idnhanvien: responseJson.thongtin.IDNhanVien,
                        idkhachhang: responseJson.thongtin.IDCuaHang,
                        idkehoach: responseJson.thongtin.IDKeHoach,
                        dateCome: Utils.changeDateFormat(responseJson.thongtin.ThoiGianVaoDiemDuKien),
                        dateOut: Utils.changeDateFormat(responseJson.thongtin.ThoiGianRaDiemDuKien),
                        dateComeReal: responseJson.thongtin.ThoiGianVaoDiemThucTe
                    })
                }
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }
}

const styles = StyleSheet.create({
    autocompleteContainer: {
        marginTop: 16,
        flex: 1,
        left: 0,
        position: 'absolute',
        top: 0,
        zIndex: 1,
        flexDirection: 'row'
    },
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
        marginTop: (Platform.OS === 'ios') ? 8 : 0
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
    text1: {
        fontSize: 12, marginTop: 4, marginRight: 8, color: 'black', backgroundColor: 'transparent'
    },
    text2: {
        fontSize: 18, fontWeight: 'bold', backgroundColor: 'transparent'
    },
    viewCover: {
        borderBottomWidth: 1, borderBottomColor: 'white', marginLeft: 16, marginTop: 8
    },
    list: {
        justifyContent: 'center',
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        margin: 3,
    },

})