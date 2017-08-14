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

let {height, width} = Dimensions.get('window')
export default class ModalSendMessage extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });

    constructor(props) {

        super(props)
        this.state = {
            text: '',
            title: '',
            IDNhanVien: '',
            receiver: '',
            listNhanVien: []
        }
        this.requestSearch.bind(this);
        this.loadAllSearch.bind(this);
    }

    componentDidMount() {
        const {params} = this.props.navigation.state;
        if (params !== undefined)
            this.setState({IDNhanVien: params.data.idnhanvien, receiver: params.data.tennhanvien})
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
                    this.state.listNhanVien.push(...responseJson.dsNhanVien)
                    if (!responseJson.endlist) {
                        this.loadAllSearch(this.state.receiver, responseJson.nextpage);
                    } else {
                        console.log('listttttt: ' + this.state.listNhanVien.length, this.state.listNhanVien)
                    }
                }
            ).catch((e) => Toast.show('Đường truyền có vấn đề, vui lòng kiểm tra lại'));

    }

    render() {

        return (
            <View style={{flex: 1}}>
                <Image source={require('../images/bg.png')}
                       style={{position: 'absolute', top: 0}}/>
                <View style={styles.titleStyle}>
                    <Image source={require('../images/bg.png')}
                           style={{position: 'absolute'}}/>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                      style={styles.iconStyle}>
                        <Icon2 style={styles.iconStyle} size={24} color="white" name="ios-arrow-back"/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, color: 'white', alignSelf: 'center', backgroundColor: 'transparent'}}>Soạn
                        tin
                        nhắn</Text>
                    <View/>
                </View>
                <View style={{flex: 9}}>
                    <View style={{
                        marginLeft: 16,
                        marginBottom: 16,
                        marginTop: 16,
                        flexDirection: 'row',
                        backgroundColor: 'transparent'
                    }}>
                        <Text style={{alignSelf: 'center', flex: 1}}>Người nhận: </Text>
                        <View style={{marginLeft: 8, flexDirection: 'row', backgroundColor: 'white', flex: 5}}>
                            <TextInput
                                style={{flex: 1, textAlignVertical: 'bottom'}}
                                onChangeText={(text) => {
                                    this.setState({receiver: text}, function () {
                                        this.requestSearch(text);
                                    })
                                }}
                                value={this.state.receiver}
                                returnKeyType={'done'}
                            />
                            <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => this.showDialog()}>
                                <Icon3 style={{alignSelf: 'center'}} size={24} color="black" name="add-user"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{margin: 16, backgroundColor: 'transparent'}}>
                        <Text style={{marginBottom: 8}}>Tiêu đề</Text>
                        <TextInput
                            style={{height: 44, width: width, backgroundColor: 'white'}}
                            onChangeText={(text) => this.setState({title: text})}
                            value={this.state.title}
                            returnKeyType={'done'}
                        />
                    </View>
                    <View style={{flex: 8, backgroundColor: 'transparent'}}>
                        <Text style={{marginLeft: 16, marginTop: 16, marginBottom: 16, flex: 1}}>
                            Nội dung
                        </Text>
                        <TextInput
                            multiline={true}
                            blurOnSubmit={true}
                            style={{flex: 10, margin: 8, backgroundColor: 'white', textAlignVertical: 'top'}}
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
            </View>
        )
    }

    sendMessage() {
        fetch(URlConfig.getLinkSendMessage(this.state.IDNhanVien, this.state.title, this.state.text))
            .then((response) => (response.json()))
            .then((responseJson) => {
                if (responseJson.status) {
                    Toast.show('Gửi tin nhắn thành công')
                    this.props.navigation.goBack()
                }
            })
    }

    showDialog() {
        DialogManager.show({
            animationDuration: 200,
            ScaleAnimation: new ScaleAnimation(),
            height: height,
            style: {bottom: 0},
            children: (
                <DialogCustom
                    callback={(id, name) => {
                        this.setState({IDNhanVien: id, receiver: name})
                    }}/>
            ),
        }, () => {
            console.log('callback - show');
        });
    }

}

const styles = StyleSheet.create({
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
        flexDirection: 'column',
        paddingHorizontal: 8,
        marginTop: 32,
        justifyContent: 'center',
    },
})