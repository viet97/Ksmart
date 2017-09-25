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
    ActivityIndicator,
    Platform,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native';
import {Keyboard} from 'react-native';
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import Image from 'react-native-image-progress';
import Icon3 from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-simple-toast'
import Color from '../configs/color'
import URlConfig from "../configs/url";
import Search from "react-native-search-box";
import {Icon} from "react-native-elements";
import DialogCustom from "../components/DialogCustom";
import Autocomplete from "react-native-autocomplete-input";
import Modal from 'react-native-modalbox';

let {height, width} = Dimensions.get('window')
export default class ModalSendMessage extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });

    constructor(props) {

        super(props)
        this.state = {
            hideResults: false,
            listNhanVien: [],
            text: '',
            title: '',
            IDNhanVien: '',
            receiver: '',
            nameInput: ''
        }
        this.requestSearch.bind(this);
        this.loadAllSearch.bind(this);
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
                    source={{uri: 'http://jav.ksmart.vn' + url}}
                    indicator={ProgressBar.Pie}
                    style={{margin: 8, width: 60, height: 60, borderRadius: 30}}/>
            );
        }
    }

    componentDidMount() {
        const {params} = this.props.navigation.state;
        if (params.data !== undefined)
            this.setState({
                IDNhanVien: params.data.idnhanvien,
                receiver: params.data.tennhanvien,
                nameInput: params.data.tennhanvien
            })
    }

    requestSearch(text) {
        this.setState({listNhanVien: []});
        this.loadAllSearch(text);
    }

    loadAllSearch(receiver, page = 1) {
        if (receiver !== this.state.receiver) {
            return;
        }

        console.log('goiii', receiver, page)
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

    render() {
        const {params} = this.props.navigation.state
        return (
            <View style={{flex: 1}}>
                <Image source={require('../images/bg3.png')}
                       style={{position: 'absolute', top: 0}}/>
                <View style={styles.titleStyle}>
                    <Image source={require('../images/bg3.png')}
                           style={{position: 'absolute'}}/>
                    <TouchableOpacity onPress={() => {

                        this.props.navigation.goBack()
                    }}
                                      style={styles.iconStyle}>
                        <Icon2 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Soạn
                        tin nhắn</Text>
                    <TouchableOpacity style={{alignSelf: 'center', backgroundColor: 'transparent', marginRight: 16}}
                                      onPress={() => this.showDialog()}>
                        <Icon3 style={{alignSelf: 'center'}} size={24} color="white" name="add-user"/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 9}}>
                    <View style={styles.autocompleteContainer}>
                        <Autocomplete
                            ref="autocp"
                            hideResults={this.state.hideResults}
                            data={this.state.listNhanVien}
                            defaultValue={this.state.nameInput}
                            placeholder="Nhập tên người nhận"
                            style={{width: width - 32, paddingLeft: 8, height: 40, backgroundColor: 'white'}}
                            onChangeText={text => {
                                if (text.length !== 0) {
                                    this.setState({
                                        hideResults: false,
                                        receiver: text,
                                        nameInput: text
                                    }, function () {
                                        this.requestSearch(text)
                                    })
                                } else {
                                    this.setState({hideResults: true, nameInput: ''})
                                }
                            }}
                            renderItem={(data) => (
                                <TouchableOpacity
                                    style={{flexDirection: 'row'}}
                                    onPress={() => {
                                        this.setState({
                                            nameInput: data.tennhanvien,
                                            IDNhanVien: data.idnhanvien,
                                            hideResults: true
                                        }, function () {
                                            Keyboard.dismiss();
                                        });
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
                    <View style={{marginHorizontal: 16, marginTop: 60, backgroundColor: 'transparent'}}>
                        <Text style={{marginBottom: 8}}>Tiêu đề</Text>
                        <TextInput
                            style={{height: 44, width: width - 32, backgroundColor: 'white', paddingLeft: 8}}
                            onChangeText={(text) => this.setState({title: text})}
                            value={this.state.title}
                            returnKeyType={'done'}
                        />
                    </View>
                    <View style={{flex: 8, backgroundColor: 'transparent', marginHorizontal: 8,}}>
                        <Text style={{marginTop: 16, marginBottom: 16, flex: 1}}>
                            Nội dung
                        </Text>
                        <TextInput
                            multiline={true}
                            blurOnSubmit={true}
                            style={{
                                flex: 10,
                                margin: 8,
                                backgroundColor: 'white',
                                textAlignVertical: 'top',
                                paddingLeft: 8
                            }}
                            onChangeText={(text) => this.setState({text: text})}
                            value={this.state.text}
                            onSubmitEditing={(event) => {
                                Keyboard.dismiss();
                            }}
                            returnKeyType={'done'}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => this.sendMessage()}
                        style={{flex: 1, width: width, backgroundColor: 'green', justifyContent: 'center'}}>
                        <Text style={{
                            alignSelf: 'center',
                            textAlign: 'center',
                            backgroundColor: 'transparent',
                            color: 'white'
                        }}>Gửi</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    style={[styles.modal]}
                    ref={"modal"}
                    swipeToClose={true}
                    onClosingState={this.onClosingState}>
                    <View style={{alignItems: 'flex-end', position: 'absolute', right: 8, top: 0}}>
                        <TouchableOpacity
                            onPress={() => {
                                this.refs.modal.close()
                            }}>
                            <Icon style={{paddingVertical: 8}} name="x" size={24} color="#EC433E" type="foundation"/>

                        </TouchableOpacity>
                    </View>
                    <DialogCustom
                        closeModal={() => {
                            this.refs.modal.close()
                        }}
                        callback={(id, name) => {
                            this.setState({IDNhanVien: id, receiver: name, nameInput: name})
                        }}
                    />
                </Modal>

            </View>
        )
    }

    sendMessage() {
        if (this.state.IDNhanVien.length == 0) Toast.show('Vui lòng nhập người gửi')
        else {
            if (this.state.text.length == 0) {
                Alert.alert(
                    'Nội dung tin nhắn không có gì',
                    'Bạn có chắc chắn muốn gửi ?',
                    [
                        {text: 'Hủy',},
                        {text: 'Gửi', onPress: () => this.startSendMessage()}
                    ],
                    {cancelable: false}
                )
            } else
                this.startSendMessage()
        }
    }

    startSendMessage() {
        fetch(URlConfig.getLinkSendMessage(this.state.IDNhanVien, this.state.title, this.state.text))
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    Toast.show('Gửi tin nhắn thành công');
                    const {params} = this.props.navigation.state
                    params.reload()
                    this.props.navigation.goBack()
                }
            }).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'))
    }

    showDialog() {
        this.refs.modal.open();
    }

}

const styles = StyleSheet.create({
    autocompleteContainer: {
        marginTop: 8,
        marginLeft: 16,
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 16,
        top: 0,
        zIndex: 1,
        flexDirection: 'row'
    },
    indicator: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    },
    titleStyle: {
        marginTop: Platform.OS === 'ios' ? 16 : 0,
        flex: 1,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: Color.backgroundNewFeed,
    },
    headerStyle: {
        elevation: 15, height: this.height / 7
    },
    itemSideMenuStyle: {
        borderBottomWidth: 1,
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
        marginLeft: 8,
    },
    textStyle: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent'
    },
    titleIconsMenu: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        fontFamily: 'Al Nile'
    },
    modal: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 8,
        marginTop: 36,
    },
})