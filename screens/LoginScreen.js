/**
 * Created by hao on 7/5/17.
 */

import React from 'react';
import {
    Text, Alert, ScrollView,
    View, Platform, Switch, Animated,
    Button, ListView, Image, StyleSheet, StatusBar, TouchableHighlight,
    TouchableOpacity, findNodeHandle, TextInput, Dimensions
} from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';
import CheckBox from 'react-native-checkbox'
import Toast from 'react-native-root-toast';
import URlConfig from "../configs/url";
import * as Animatable from 'react-native-animatable';
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import {NavigationActions} from "react-navigation";
import LoginDialog from "../components/LoginDialog";
import {ProgressDialog} from 'react-native-simple-dialogs';
import ultils from "../configs/ultils";

let {width, height} = Dimensions.get('window')
const Realm = require('realm');
export default class LoginScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    showToast(msg, time = 3000) {
        let toast = Toast.show(msg, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            onShow: () => {
                // calls on toast\`s appear animation start
            },
            onShown: () => {
                // calls on toast\`s appear animation end.
            },
            onHide: () => {
                // calls on toast\`s hide animation start.
            },
            onHidden: () => {
                // calls on toast\`s hide animation end.
            }
        });

        setTimeout(function () {
            Toast.hide(toast);
        }, time);
    }

    constructor(props) {
        super(props);
        this.state = {
            checkOfCheckBox: true,
            idct: '',
            username: '',
            password: '',
            progressVisible: false
        };
    }


    componentWillMount() {
        let realm = new Realm({
            schema: [{
                name: 'LoginSave',
                properties: {idct: 'string', username: 'string', password: 'string'}
            }]
        });
    }

    componentDidMount() {
        let realm = new Realm();
        let login = realm.objects('LoginSave');
        console.log('didMount')
        if (login.length !== 0) {
            var loginOBJ = login[0];
            this.setState({
                idct: loginOBJ.idct,
                username: loginOBJ.username,
                password: loginOBJ.password,
                checkOfCheckBox: true
            })
        }
        var allData = [
            {
                idnhanvien: 10,
                KinhDo: 105.8310949,
                ViDo: 20.9948708,
                thoigiancapnhat: "25/03/2016 09:52:39",
                tennhanvien: "Le Van Phuc",
                tendangnhap: "phuclv",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 108,
                KinhDo: 105.7898534,
                ViDo: 20.9830416,
                thoigiancapnhat: "15/04/2017 08:02:26",
                tennhanvien: "Hoàng",
                tendangnhap: "hoangdh",
                dangtructuyen: 0,
                ID_Nhom: 1,
                TenNhom: "Phòng Kinh Doanh",
                AnhDaiDien: null
            },
            {
                idnhanvien: 11,
                KinhDo: 105.78922,
                ViDo: 21.03641,
                thoigiancapnhat: "21/08/2015 10:04:22",
                tennhanvien: "Nguyen VanTruong",
                tendangnhap: "truongnv",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 111,
                KinhDo: 105.8307677,
                ViDo: 20.9949004,
                thoigiancapnhat: "16/06/2016 13:45:07",
                tennhanvien: "Đỗ Thị Mai",
                tendangnhap: "maimai",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 114,
                KinhDo: 105.7846066667,
                ViDo: 20.993495,
                thoigiancapnhat: "12/10/2016 16:31:03",
                tennhanvien: "Mai Mai",
                tendangnhap: "ngocmai",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 115,
                KinhDo: 105.8306639,
                ViDo: 20.9947641,
                thoigiancapnhat: "07/09/2016 04:34:01",
                tennhanvien: "phan thị mai",
                tendangnhap: "mai",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 116,
                KinhDo: 105.7846066667,
                ViDo: 20.993495,
                thoigiancapnhat: "12/10/2016 13:57:54",
                tennhanvien: "Mai Linh Hà",
                tendangnhap: "haml",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 117,
                KinhDo: 105.7898922,
                ViDo: 20.9827781,
                thoigiancapnhat: "19/09/2016 18:33:33",
                tennhanvien: "pham quang tung",
                tendangnhap: "tung",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 12,
                KinhDo: 105.836071,
                ViDo: 20.9759346,
                thoigiancapnhat: "02/06/2017 13:49:56",
                tennhanvien: "Ho Son Tung",
                tendangnhap: "tunghs",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 13,
                KinhDo: 105.836082,
                ViDo: 20.9758539,
                thoigiancapnhat: "28/07/2017 16:12:32",
                tennhanvien: "Apple",
                tendangnhap: "anhnq",
                dangtructuyen: 0,
                ID_Nhom: 6,
                TenNhom: "Phòng Kỹ thuật",
                AnhDaiDien: null
            },
            {
                idnhanvien: 14,
                KinhDo: 105.83586,
                ViDo: 21.02701,
                thoigiancapnhat: "21/08/2015 10:04:28",
                tennhanvien: "Do Anh Noi",
                tendangnhap: "noida",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 15,
                KinhDo: 105.78229,
                ViDo: 21.01567,
                thoigiancapnhat: "21/08/2015 10:04:23",
                tennhanvien: "Kim Van Bao",
                tendangnhap: "baokv",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 158,
                KinhDo: 105.831369,
                ViDo: 21.0114903,
                thoigiancapnhat: "26/10/2016 07:38:47",
                tennhanvien: "test1",
                tendangnhap: "test1",
                dangtructuyen: 0,
                ID_Nhom: 4,
                TenNhom: "Nhóm test 1",
                AnhDaiDien: null
            },
            {
                idnhanvien: 159,
                KinhDo: 105.81869545,
                ViDo: 21.00336521,
                thoigiancapnhat: "16/10/2016 23:50:40",
                tennhanvien: "testios",
                tendangnhap: "testios",
                dangtructuyen: 0,
                ID_Nhom: 4,
                TenNhom: "Nhóm test 1",
                AnhDaiDien: null
            },
            {
                idnhanvien: 16,
                KinhDo: 105.77022816,
                ViDo: 21.03190162,
                thoigiancapnhat: "08/09/2015 21:47:16",
                tennhanvien: "Bui Thi Mai Linh",
                tendangnhap: "linhmai",
                dangtructuyen: 0,
                ID_Nhom: 4,
                TenNhom: "Nhóm test 1",
                AnhDaiDien: null
            },
            {
                idnhanvien: 17,
                KinhDo: 105.83614,
                ViDo: 20.975905,
                thoigiancapnhat: "07/04/2017 17:53:24",
                tennhanvien: "Mai Thi Thanh Nga",
                tendangnhap: "ngamtt",
                dangtructuyen: 0,
                ID_Nhom: 1,
                TenNhom: "Phòng Kinh Doanh",
                AnhDaiDien: null
            },
            {
                idnhanvien: 174,
                KinhDo: 105.7995393,
                ViDo: 20.996668,
                thoigiancapnhat: "28/02/2017 15:31:18",
                tennhanvien: "Nguyễn Thị Hương",
                tendangnhap: "huongnt",
                dangtructuyen: 0,
                ID_Nhom: 1,
                TenNhom: "Phòng Kinh Doanh",
                AnhDaiDien: null
            },
            {
                idnhanvien: 176,
                KinhDo: 105.8307367,
                ViDo: 20.994545,
                thoigiancapnhat: "01/10/2016 09:15:38",
                tennhanvien: "Phạm Trung Hiếu",
                tendangnhap: "hieupt",
                dangtructuyen: 0,
                ID_Nhom: 1,
                TenNhom: "Phòng Kinh Doanh",
                AnhDaiDien: null
            },
            {
                idnhanvien: 178,
                KinhDo: 105.8307269,
                ViDo: 20.9947995,
                thoigiancapnhat: "05/10/2016 14:20:19",
                tennhanvien: "Nguyễn Tuấn Anh",
                tendangnhap: "anhnt",
                dangtructuyen: 0,
                ID_Nhom: 4,
                TenNhom: "Nhóm test 1",
                AnhDaiDien: null
            },
            {
                idnhanvien: 18,
                KinhDo: 105.8307269,
                ViDo: 20.9947995,
                thoigiancapnhat: "11/10/2016 10:14:10",
                tennhanvien: "Huynh Thi Hanh",
                tendangnhap: "hanhht",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 181,
                KinhDo: 105.8361426,
                ViDo: 20.9759563,
                thoigiancapnhat: "20/06/2017 16:59:55",
                tennhanvien: "tester99-2",
                tendangnhap: "test99",
                dangtructuyen: 0,
                ID_Nhom: 4,
                TenNhom: "Nhóm test 1",
                AnhDaiDien: null
            },
            {
                idnhanvien: 182,
                KinhDo: 105.836047923,
                ViDo: 20.9758560677,
                thoigiancapnhat: "03/08/2017 16:51:59",
                tennhanvien: "tester99",
                tendangnhap: "tester99",
                dangtructuyen: 1,
                ID_Nhom: 4,
                TenNhom: "Nhóm test 1",
                AnhDaiDien: null
            },
            {
                idnhanvien: 183,
                KinhDo: 105.830815,
                ViDo: 20.9947083,
                thoigiancapnhat: "14/10/2016 15:21:05",
                tennhanvien: "testTab3",
                tendangnhap: "tab3",
                dangtructuyen: 0,
                ID_Nhom: 4,
                TenNhom: "Nhóm test 1",
                AnhDaiDien: null
            },
            {
                idnhanvien: 184,
                KinhDo: 105.8186802,
                ViDo: 21.0032683,
                thoigiancapnhat: "31/03/2017 00:59:08",
                tennhanvien: "note3",
                tendangnhap: "note3",
                dangtructuyen: 0,
                ID_Nhom: 4,
                TenNhom: "Nhóm test 1",
                AnhDaiDien: null
            },
            {
                idnhanvien: 185,
                KinhDo: 105.8361004,
                ViDo: 20.9758477,
                thoigiancapnhat: "21/07/2017 15:06:22",
                tennhanvien: "tester98",
                tendangnhap: "tester98",
                dangtructuyen: 0,
                ID_Nhom: 4,
                TenNhom: "Nhóm test 1",
                AnhDaiDien: null
            },
            {
                idnhanvien: 186,
                KinhDo: 105.8361086,
                ViDo: 20.9759888,
                thoigiancapnhat: "27/03/2017 10:28:48",
                tennhanvien: "PHẠM THANH TÚ",
                tendangnhap: "tumo91",
                dangtructuyen: 0,
                ID_Nhom: 16,
                TenNhom: "Kinh Doanh 2",
                AnhDaiDien: null
            },
            {
                idnhanvien: 188,
                KinhDo: 105.836082,
                ViDo: 20.9759218,
                thoigiancapnhat: "20/07/2017 13:34:44",
                tennhanvien: "Nguyễn Văn Thinh",
                tendangnhap: "thinhnv",
                dangtructuyen: 0,
                ID_Nhom: 6,
                TenNhom: "Phòng Kỹ thuật",
                AnhDaiDien: null
            },
            {
                idnhanvien: 189,
                KinhDo: 105.8307728,
                ViDo: 20.9947499,
                thoigiancapnhat: "09/01/2017 08:42:26",
                tennhanvien: "Chu Hoang Son",
                tendangnhap: "sonch",
                dangtructuyen: 0,
                ID_Nhom: 6,
                TenNhom: "Phòng Kỹ thuật",
                AnhDaiDien: null
            },
            {
                idnhanvien: 19,
                KinhDo: 105.8360935,
                ViDo: 20.9761358,
                thoigiancapnhat: "02/03/2017 14:31:53",
                tennhanvien: "Trinh Minh Vuong",
                tendangnhap: "vuongtm",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 191,
                KinhDo: 105.830773702,
                ViDo: 20.9949734621,
                thoigiancapnhat: "16/01/2017 11:04:36",
                tennhanvien: "Bùi Bích Phương3",
                tendangnhap: "pppp12",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 20,
                KinhDo: 105.8249362,
                ViDo: 20.9874594,
                thoigiancapnhat: "02/08/2017 22:00:48",
                tennhanvien: "Tran Viet Duc",
                tendangnhap: "ductv",
                dangtructuyen: 2,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 202,
                KinhDo: 105.7653308,
                ViDo: 21.009322,
                thoigiancapnhat: "30/11/2016 20:37:24",
                tennhanvien: "Nguyễn Mai Trúc",
                tendangnhap: "trucnm",
                dangtructuyen: 0,
                ID_Nhom: 4,
                TenNhom: "Nhóm test 1",
                AnhDaiDien: null
            },
            {
                idnhanvien: 203,
                KinhDo: 105.8302015,
                ViDo: 20.9944418,
                thoigiancapnhat: "26/12/2016 16:27:52",
                tennhanvien: "Tester 01",
                tendangnhap: "Test01",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 204,
                KinhDo: 105.8306196,
                ViDo: 20.9948162,
                thoigiancapnhat: "26/12/2016 16:23:39",
                tennhanvien: "Tester 02",
                tendangnhap: "Test02",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 206,
                KinhDo: 105.8361105,
                ViDo: 20.9760824,
                thoigiancapnhat: "13/04/2017 15:28:18",
                tennhanvien: "Nguyễn Văn Thinhkt",
                tendangnhap: "thinhnv2",
                dangtructuyen: 0,
                ID_Nhom: 4,
                TenNhom: "Nhóm test 1",
                AnhDaiDien: null
            },
            {
                idnhanvien: 207,
                KinhDo: 105.9117472,
                ViDo: 21.0561658,
                thoigiancapnhat: "02/01/2017 21:20:39",
                tennhanvien: "Demo",
                tendangnhap: "Demo",
                dangtructuyen: 0,
                ID_Nhom: 4,
                TenNhom: "Nhóm test 1",
                AnhDaiDien: null
            },
            {
                idnhanvien: 21,
                KinhDo: 105.83087408,
                ViDo: 20.99490488,
                thoigiancapnhat: "14/10/2016 10:25:19",
                tennhanvien: "Nguyen Thi Ngoc Mai",
                tendangnhap: "maintn",
                dangtructuyen: 0,
                ID_Nhom: 1,
                TenNhom: "Phòng Kinh Doanh",
                AnhDaiDien: null
            },
            {
                idnhanvien: 22,
                KinhDo: 105.82337,
                ViDo: 21.06631,
                thoigiancapnhat: "21/08/2015 10:04:23",
                tennhanvien: "Le Van Hoang",
                tendangnhap: "hoanglv",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 229,
                KinhDo: 105.8307079,
                ViDo: 20.9947722,
                thoigiancapnhat: "11/02/2017 09:32:57",
                tennhanvien: "Nhân viên hành chính",
                tendangnhap: "hanhchinh",
                dangtructuyen: 0,
                ID_Nhom: 13,
                TenNhom: "Phòng hành chính",
                AnhDaiDien: null
            },
            {
                idnhanvien: 23,
                KinhDo: 105.836088,
                ViDo: 20.9758524,
                thoigiancapnhat: "03/08/2017 12:16:06",
                tennhanvien: "Nguyen Manh Truong - Lạc Hồng",
                tendangnhap: "truongnm",
                dangtructuyen: 0,
                ID_Nhom: 1,
                TenNhom: "Phòng Kinh Doanh",
                AnhDaiDien: null
            },
            {
                idnhanvien: 231,
                KinhDo: 105.8360158,
                ViDo: 20.9759402,
                thoigiancapnhat: "02/08/2017 09:54:05",
                tennhanvien: "Bùi Bích Phương23",
                tendangnhap: "bbphuong",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 233,
                KinhDo: 105.8308749554,
                ViDo: 20.9949398926,
                thoigiancapnhat: "28/12/2016 08:52:08",
                tennhanvien: "TestDemo",
                tendangnhap: "momo11",
                dangtructuyen: 0,
                ID_Nhom: 14,
                TenNhom: "Công ty Lạc Hồng",
                AnhDaiDien: null
            },
            {
                idnhanvien: 24,
                KinhDo: 105.8308007,
                ViDo: 20.9949159,
                thoigiancapnhat: "22/12/2015 16:17:40",
                tennhanvien: "Vu Anh Dung",
                tendangnhap: "dungva",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 247,
                KinhDo: 105.8360655749,
                ViDo: 20.9758246715,
                thoigiancapnhat: "17/04/2017 09:08:47",
                tennhanvien: "Bùi Bích Phương1",
                tendangnhap: "bbphuongtest",
                dangtructuyen: 0,
                ID_Nhom: 1040,
                TenNhom: "Kinh Doanh 3",
                AnhDaiDien: null
            },
            {
                idnhanvien: 26,
                KinhDo: 105.78535,
                ViDo: 21.11217,
                thoigiancapnhat: "21/08/2015 10:04:36",
                tennhanvien: "Dang Thi Tram",
                tendangnhap: "tramdt",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 27,
                KinhDo: 105.9171337,
                ViDo: 21.0849329,
                thoigiancapnhat: "10/08/2015 02:30:58",
                tennhanvien: "Tran The Anh",
                tendangnhap: "anhtt",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 31,
                KinhDo: 105.7122327,
                ViDo: 20.9275641,
                thoigiancapnhat: "10/08/2015 02:37:04",
                tennhanvien: "Pham Khanh Hung",
                tendangnhap: "hungpk",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 311,
                KinhDo: 105.8455016083,
                ViDo: 21.0383665268,
                thoigiancapnhat: "13/03/2017 02:45:15",
                tennhanvien: "Đoàn Việt Anh",
                tendangnhap: "anhdv",
                dangtructuyen: 0,
                ID_Nhom: 6,
                TenNhom: "Phòng Kỹ thuật",
                AnhDaiDien: null
            },
            {
                idnhanvien: 313,
                KinhDo: 105.8360589,
                ViDo: 20.9760256,
                thoigiancapnhat: "02/03/2017 14:31:36",
                tennhanvien: "lachong1",
                tendangnhap: "lachong1",
                dangtructuyen: 0,
                ID_Nhom: 35,
                TenNhom: "Blackbox",
                AnhDaiDien: null
            },
            {
                idnhanvien: 317,
                KinhDo: 105.8361592,
                ViDo: 20.9758977,
                thoigiancapnhat: "03/08/2017 16:52:03",
                tennhanvien: "Đào Anh Tùng",
                tendangnhap: "tungda",
                dangtructuyen: 1,
                ID_Nhom: 6,
                TenNhom: "Phòng Kỹ thuật",
                AnhDaiDien: null
            },
            {
                idnhanvien: 318,
                KinhDo: 105.836082,
                ViDo: 20.9758539,
                thoigiancapnhat: "03/08/2017 15:12:17",
                tennhanvien: "Nguyễn Liên",
                tendangnhap: "liennh",
                dangtructuyen: 2,
                ID_Nhom: 6,
                TenNhom: "Phòng Kỹ thuật",
                AnhDaiDien: null
            },
            {
                idnhanvien: 32,
                KinhDo: 105.8307035,
                ViDo: 20.9951862,
                thoigiancapnhat: "18/09/2015 10:21:27",
                tennhanvien: "Vuong Van Phuong",
                tendangnhap: "phuongvv",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 324,
                KinhDo: 105.836105,
                ViDo: 20.9758291,
                thoigiancapnhat: "18/07/2017 14:03:12",
                tennhanvien: "apple",
                tendangnhap: "apple",
                dangtructuyen: 0,
                ID_Nhom: 4,
                TenNhom: "Nhóm test 1",
                AnhDaiDien: null
            },
            {
                idnhanvien: 340,
                KinhDo: 105.8332350479,
                ViDo: 21.0312011372,
                thoigiancapnhat: "25/07/2017 10:47:32",
                tennhanvien: "Anh Châu",
                tendangnhap: "Chaulh",
                dangtructuyen: 0,
                ID_Nhom: 1,
                TenNhom: "Phòng Kinh Doanh",
                AnhDaiDien: null
            },
            {
                idnhanvien: 350,
                KinhDo: 105.8360331794,
                ViDo: 20.9758536145,
                thoigiancapnhat: "23/03/2017 09:38:31",
                tennhanvien: "22031119",
                tendangnhap: "22031119",
                dangtructuyen: 0,
                ID_Nhom: 15,
                TenNhom: "Kinh Doanh 1",
                AnhDaiDien: null
            },
            {
                idnhanvien: 363,
                KinhDo: 105.8212522,
                ViDo: 20.9935461,
                thoigiancapnhat: "22/07/2017 21:37:46",
                tennhanvien: "TranHieu",
                tendangnhap: "hieuth",
                dangtructuyen: 0,
                ID_Nhom: 6,
                TenNhom: "Phòng Kỹ thuật",
                AnhDaiDien: null
            },
            {
                idnhanvien: 364,
                KinhDo: 105.83591,
                ViDo: 20.9759721,
                thoigiancapnhat: "10/05/2017 09:24:43",
                tennhanvien: "Trần Tiến Dũng",
                tendangnhap: "dungtt",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 37,
                KinhDo: 105.8308106,
                ViDo: 20.9948798,
                thoigiancapnhat: "11/01/2016 17:46:05",
                tennhanvien: "trieunt",
                tendangnhap: "trieunt",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 4,
                KinhDo: 105.81321538,
                ViDo: 21.0154269,
                thoigiancapnhat: "01/04/2016 00:12:37",
                tennhanvien: "Dao Duy Tuan",
                tendangnhap: "tuandd",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 5,
                KinhDo: 106.6853391,
                ViDo: 20.8591566,
                thoigiancapnhat: "13/05/2016 10:01:28",
                tennhanvien: "Do Van Tuong",
                tendangnhap: "tuongdv",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 64,
                KinhDo: 105.828468,
                ViDo: 20.994963,
                thoigiancapnhat: "24/12/2015 14:52:52",
                tennhanvien: "Cấn Thái Linh",
                tendangnhap: "linhct2",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 7,
                KinhDo: 105.8307488,
                ViDo: 20.994953,
                thoigiancapnhat: "27/04/2016 15:21:09",
                tennhanvien: "Cấn Thái Linh",
                tendangnhap: "linhct",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 8,
                KinhDo: 105.7846066667,
                ViDo: 20.993495,
                thoigiancapnhat: "12/10/2016 13:52:16",
                tennhanvien: "Nguyễn Việt Hà",
                tendangnhap: "hanv",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            },
            {
                idnhanvien: 9,
                KinhDo: 105.7902758,
                ViDo: 20.9826018,
                thoigiancapnhat: "03/12/2016 06:41:18",
                tennhanvien: "Pham Van Nhat",
                tendangnhap: "nhatpv",
                dangtructuyen: 0,
                ID_Nhom: 0,
                TenNhom: "",
                AnhDaiDien: null
            }
        ]
        var allGroup = [
            {
                ID_QLLH: 0,
                ID_Nhom: -2,
                ID_PARENT: 0,
                NgayTao: "0001-01-01T00:00:00",
                TrangThai: 0,
                TenNhom: "Tất cả",
                TenHienThi_NhanVien: "Tất cả (111)",
                TenHienThi_QuanLy: "Tất cả (11)",
                SoLuongNhanVien: 0,
                SoLuongQuanLy: 0
            },
            {
                ID_QLLH: 1,
                ID_Nhom: 1,
                ID_PARENT: 14,
                NgayTao: "2016-08-23T22:37:57",
                TrangThai: 1,
                TenNhom: "Phòng Kinh Doanh",
                TenHienThi_NhanVien: "Phòng Kinh Doanh (23)",
                TenHienThi_QuanLy: "Phòng Kinh Doanh (7)",
                SoLuongNhanVien: 23,
                SoLuongQuanLy: 7
            },
            {
                ID_QLLH: 1,
                ID_Nhom: 4,
                ID_PARENT: 14,
                NgayTao: "2016-09-08T13:51:10",
                TrangThai: 1,
                TenNhom: "Nhóm test 1",
                TenHienThi_NhanVien: "Nhóm test 1 (16)",
                TenHienThi_QuanLy: "Nhóm test 1 (5)",
                SoLuongNhanVien: 16,
                SoLuongQuanLy: 5
            },
            {
                ID_QLLH: 1,
                ID_Nhom: 6,
                ID_PARENT: 14,
                NgayTao: "2016-09-19T11:00:32",
                TrangThai: 1,
                TenNhom: "Phòng Kỹ thuật",
                TenHienThi_NhanVien: "Phòng Kỹ thuật (7)",
                TenHienThi_QuanLy: "Phòng Kỹ thuật (3)",
                SoLuongNhanVien: 7,
                SoLuongQuanLy: 3
            },
            {
                ID_QLLH: 1,
                ID_Nhom: 13,
                ID_PARENT: 14,
                NgayTao: "2016-09-28T16:24:15",
                TrangThai: 1,
                TenNhom: "Phòng hành chính",
                TenHienThi_NhanVien: "Phòng hành chính (2)",
                TenHienThi_QuanLy: "Phòng hành chính (3)",
                SoLuongNhanVien: 2,
                SoLuongQuanLy: 3
            },
            {
                ID_QLLH: 1,
                ID_Nhom: 14,
                ID_PARENT: 0,
                NgayTao: "2016-10-05T17:52:09",
                TrangThai: 1,
                TenNhom: "Công ty Lạc Hồng",
                TenHienThi_NhanVien: "Công ty Lạc Hồng (52)",
                TenHienThi_QuanLy: "Công ty Lạc Hồng (3)",
                SoLuongNhanVien: 52,
                SoLuongQuanLy: 3
            },
            {
                ID_QLLH: 1,
                ID_Nhom: 15,
                ID_PARENT: 1,
                NgayTao: "2016-10-05T17:56:48",
                TrangThai: 1,
                TenNhom: "Kinh Doanh 1",
                TenHienThi_NhanVien: "Kinh Doanh 1 (7)",
                TenHienThi_QuanLy: "Kinh Doanh 1 (8)",
                SoLuongNhanVien: 7,
                SoLuongQuanLy: 8
            },
            {
                ID_QLLH: 1,
                ID_Nhom: 16,
                ID_PARENT: 1,
                NgayTao: "2016-10-05T17:56:57",
                TrangThai: 1,
                TenNhom: "Kinh Doanh 2",
                TenHienThi_NhanVien: "Kinh Doanh 2 (3)",
                TenHienThi_QuanLy: "Kinh Doanh 2 (8)",
                SoLuongNhanVien: 3,
                SoLuongQuanLy: 8
            },
            {
                ID_QLLH: 1,
                ID_Nhom: 22,
                ID_PARENT: 1,
                NgayTao: "2016-12-07T15:07:37",
                TrangThai: 1,
                TenNhom: "Nhóm Kinh Doanh",
                TenHienThi_NhanVien: "Nhóm Kinh Doanh (1)",
                TenHienThi_QuanLy: "Nhóm Kinh Doanh (6)",
                SoLuongNhanVien: 1,
                SoLuongQuanLy: 6
            },
            {
                ID_QLLH: 1,
                ID_Nhom: 23,
                ID_PARENT: 22,
                NgayTao: "2016-12-07T15:08:41",
                TrangThai: 1,
                TenNhom: "Nhóm làm việc năng suất",
                TenHienThi_NhanVien: "Nhóm làm việc năng suất (1)",
                TenHienThi_QuanLy: "Nhóm làm việc năng suất (6)",
                SoLuongNhanVien: 1,
                SoLuongQuanLy: 6
            },
            {
                ID_QLLH: 1,
                ID_Nhom: 24,
                ID_PARENT: 1,
                NgayTao: "2016-12-07T15:14:14",
                TrangThai: 1,
                TenNhom: "Nhóm Thị Trường",
                TenHienThi_NhanVien: "Nhóm Thị Trường (0)",
                TenHienThi_QuanLy: "Nhóm Thị Trường (7)",
                SoLuongNhanVien: 0,
                SoLuongQuanLy: 7
            },
            {
                ID_QLLH: 1,
                ID_Nhom: 25,
                ID_PARENT: 14,
                NgayTao: "2016-12-09T10:23:12",
                TrangThai: 1,
                TenNhom: "Nhóm KD",
                TenHienThi_NhanVien: "Nhóm KD (3)",
                TenHienThi_QuanLy: "Nhóm KD (2)",
                SoLuongNhanVien: 3,
                SoLuongQuanLy: 2
            },
            {
                ID_QLLH: 1,
                ID_Nhom: 35,
                ID_PARENT: 4,
                NgayTao: "2016-12-26T21:52:45",
                TrangThai: 1,
                TenNhom: "Blackbox",
                TenHienThi_NhanVien: "Blackbox (2)",
                TenHienThi_QuanLy: "Blackbox (5)",
                SoLuongNhanVien: 2,
                SoLuongQuanLy: 5
            },
            {
                ID_QLLH: 1,
                ID_Nhom: 1035,
                ID_PARENT: 13,
                NgayTao: "2016-12-27T10:56:55",
                TrangThai: 1,
                TenNhom: "Nhóm nhân sự",
                TenHienThi_NhanVien: "Nhóm nhân sự (0)",
                TenHienThi_QuanLy: "Nhóm nhân sự (3)",
                SoLuongNhanVien: 0,
                SoLuongQuanLy: 3
            },
            {
                ID_QLLH: 1,
                ID_Nhom: 1036,
                ID_PARENT: 14,
                NgayTao: "2016-12-27T10:57:05",
                TrangThai: 1,
                TenNhom: "nhóm kế toán",
                TenHienThi_NhanVien: "nhóm kế toán (0)",
                TenHienThi_QuanLy: "nhóm kế toán (2)",
                SoLuongNhanVien: 0,
                SoLuongQuanLy: 2
            },
            {
                ID_QLLH: 1,
                ID_Nhom: 1040,
                ID_PARENT: 1,
                NgayTao: "2016-12-28T09:52:54",
                TrangThai: 1,
                TenNhom: "Kinh Doanh 3",
                TenHienThi_NhanVien: "Kinh Doanh 3 (1)",
                TenHienThi_QuanLy: "Kinh Doanh 3 (6)",
                SoLuongNhanVien: 1,
                SoLuongQuanLy: 6
            },
            {
                ID_QLLH: 1,
                ID_Nhom: 1063,
                ID_PARENT: 14,
                NgayTao: "2017-02-20T10:58:36",
                TrangThai: 1,
                TenNhom: "Nhóm chăm sóc Khách Hàng",
                TenHienThi_NhanVien: "Nhóm chăm sóc Khách Hàng (0)",
                TenHienThi_QuanLy: "Nhóm chăm sóc Khách Hàng (3)",
                SoLuongNhanVien: 0,
                SoLuongQuanLy: 3
            },
            {
                ID_QLLH: 1,
                ID_Nhom: 1064,
                ID_PARENT: 16,
                NgayTao: "2017-03-16T11:14:27",
                TrangThai: 1,
                TenNhom: "testKD1-12",
                TenHienThi_NhanVien: "testKD1-12 (0)",
                TenHienThi_QuanLy: "testKD1-12 (8)",
                SoLuongNhanVien: 0,
                SoLuongQuanLy: 8
            },
            {
                ID_QLLH: 1,
                ID_Nhom: 1065,
                ID_PARENT: 4,
                NgayTao: "2017-03-17T22:14:22",
                TrangThai: 1,
                TenNhom: "Whitebox",
                TenHienThi_NhanVien: "Whitebox (1)",
                TenHienThi_QuanLy: "Whitebox (5)",
                SoLuongNhanVien: 1,
                SoLuongQuanLy: 5
            },
            {
                ID_QLLH: 1,
                ID_Nhom: 1066,
                ID_PARENT: 1,
                NgayTao: "2017-03-21T17:09:35",
                TrangThai: 1,
                TenNhom: "Kinh doanh 4",
                TenHienThi_NhanVien: "Kinh doanh 4 (0)",
                TenHienThi_QuanLy: "Kinh doanh 4 (6)",
                SoLuongNhanVien: 0,
                SoLuongQuanLy: 6
            },
            {
                ID_QLLH: 0,
                ID_Nhom: -1,
                ID_PARENT: 14,
                NgayTao: "0001-01-01T00:00:00",
                TrangThai: 0,
                TenNhom: "Khác",
                TenHienThi_NhanVien: "Khác (59)",
                TenHienThi_QuanLy: "Khác (0)",
                SoLuongNhanVien: 0,
                SoLuongQuanLy: 0
            }
        ]
        ultils.getPersonsInGroup(allData, allData, 1065)
    }


    render() {
        var windowWidth = Dimensions.get('window').width;
        return (
            <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
                <Animatable.Image
                    source={require('../images/bg.png')}
                    style={styles.absolute}
                    resizeMode={Image.resizeMode.cover}
                    blurRadius={1}
                />
                <View style={{flexDirection: 'column', flex: 1, width: windowWidth - 2, justifyContent: 'center'}}>
                    <View>
                        <Image source={require('../images/logoksmart.png')}
                               style={{alignSelf: 'center', width: 100, height: 100}}/>
                    </View>
                    <View style={{alignSelf: 'center', width: windowWidth}}>
                        <TextInputLayout style={styles.inputLayout}
                                         hintColor='white' focusColor='white'>
                            <TextInput
                                returnKeyType={"next"}
                                value={this.state.idct}
                                style={styles.textInput}
                                placeholder={'Mã công ty'}
                                secureTextEntry={false}
                                onChangeText={(text) => this.setState({idct: text})}
                                onSubmitEditing={(event) => {
                                    this.refs.ipPass.focus();
                                }}

                            />
                        </TextInputLayout>
                        <TextInputLayout style={styles.inputLayout} hintColor='white' focusColor='white'>
                            <TextInput
                                ref="ipPass"
                                returnKeyType={"next"}
                                value={this.state.username}
                                style={styles.textInput}
                                placeholder={'Tên đăng nhập'}
                                secureTextEntry={false}
                                onChangeText={(text) => this.setState({username: text})}
                                onSubmitEditing={(event) => {
                                    this.refs.ipRePass.focus();
                                }}
                            />
                        </TextInputLayout>
                        <TextInputLayout style={styles.inputLayout} hintColor='white' focusColor='white'>
                            <TextInput
                                ref="ipRePass"
                                value={this.state.password}
                                style={styles.textInput}
                                returnKeyType={"done"}
                                placeholder={'Mật khẩu'}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({password: text})}
                            />
                        </TextInputLayout>
                    </View>
                    <View style={{flexDirection: 'column', alignSelf: 'center', marginTop: 16, alignItems: 'center'}}>
                        <CheckBox
                            checkedImage={require("../images/checked.png")}
                            uncheckedImage={require("../images/noncheck.png")}
                            labelStyle={{color: '#00B232'}}
                            underlayColor="transparent"
                            label='Ghi nhớ đăng nhập'
                            checked={this.state.checkOfCheckBox}
                            onChange={(checked) => {
                                this.setState({checkOfCheckBox: !this.state.checkOfCheckBox});
                                console.log(checked)
                            }}
                        />
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor="transparent"
                            style={{height: 48, backgroundColor: 'transparent', justifyContent: 'center', padding: 16}}
                            onPress={() => this.startLogin()}>
                            <Animatable.Text animation="fadeInDown" style={styles.loginTextButton}>Đăng
                                nhập</Animatable.Text>

                        </TouchableHighlight>
                    </View>
                </View>
                <ProgressDialog
                    visible={this.state.progressVisible}
                    title=""
                    message="Đang đăng nhập"
                />

            </View>
        );
    }

    getBaseURL() {

        fetch(URlConfig.getRouterApp(this.state.idct))
            .then((response) => response.json())
            .then((responseJson) => {
                if (!responseJson.status) {
                    console.log('vao day r')
                    this.showToast(responseJson.msg, 5000)
                    this.setState({progressVisible: false})
                } else {
                    this.requestLogin(responseJson)
                }
            })
            .catch((error) => {
                console.error(error);
                this.setState({progressVisible: false})
                this.showToast('Có lỗi xảy ra, kiểm tra cài đặt internet và thử lại sau')
            });
    }

    requestLogin(value) {
        console.log('valueeeee', value)
        if (value !== undefined && value.status) {
            URlConfig.BASE_URL_APP = value.data;
            let urlLogin = URlConfig.getLoginRouter(this.state.username, this.state.password, this.state.idct);
            console.log(urlLogin)
            fetch(urlLogin)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({progressVisible: false})
                    if (!responseJson.status) {
                        this.showToast(responseJson.msg);
                    } else {
                        if (this.state.checkOfCheckBox) {

                            let realm = new Realm();
                            let allLogin = realm.objects('LoginSave');

                            realm.write(() => {
                                realm.delete(allLogin);
                                realm.create('LoginSave', {
                                    idct: this.state.idct,
                                    username: this.state.username,
                                    password: this.state.password
                                });
                            });
                            realm.close()
                        } else {
                            let realm = new Realm();
                            let allLogin = realm.objects('LoginSave');
                            realm.write(() => {
                                realm.delete(allLogin);
                            })

                        }
                        this.handlDataLogin(responseJson)
                        const {navigate} = this.props.navigation;
                        this.setState({progressVisible: false})
                        this.props
                            .navigation
                            .dispatch(NavigationActions.reset(
                                {
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({routeName: 'Home'})
                                    ]
                                }));

                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.setState({progressVisible: false})
                    this.showToast('Có lỗi xảy ra, kiểm tra cài đặt internet và thử lại sau')
                });
        } else {
            this.showToast('Có lỗi xảy ra, thử lại sau')
            this.setState({progressVisible: false})
        }
    }


    startLogin() {

        if (this.state.password.length === 0 || this.state.username === 0 || this.state.idct === 0) {
            this.showToast('Vui lòng nhập đầy đủ thông tin đăng nhập!', 5000)
        } else {
            this.setState({progressVisible: true});
            this.getBaseURL();
        }

    }


    handlDataLogin(responseJson) {
        let data = responseJson.data;
        data['idct'] = this.state.idct;

        let ttdh = {}, tttt = {}, ttgh = {}, tthtdh = {}, color = {}, ttdhid = {}, ttttid = {}, ttghid = {};
        var i = 1;
        ttdhid[0] = -1;
        ttttid[0] = -1;
        ttghid[0] = -1;// vi dang de 0 la tat ca
        for (let item of responseJson.dulieutrangthaidonhang) {
            ttdh[item.ID_TrangThaiDonHang] = item.TenTrangThai;
            ttdhid[i] = item.ID_TrangThaiDonHang;
            i++;
        }

        for (let item of responseJson.dulieutrangthaidonhang) {
            color[item.ID_TrangThaiDonHang] = '#' + item.MauTrangThai;
        }
        i = 1;
        for (let item of responseJson.dulieutrangthaithanhtoan) {
            tttt[item.ID_TrangThaiThanhToan] = item.TenTrangThaiThanhToan;
            ttttid[i] = item.ID_TrangThaiThanhToan;
            i++;
        }
        i = 1;
        for (let item of responseJson.dulieutrangthaigiaohang) {
            ttgh[item.ID_TrangThaiGiaoHang] = item.TenTrangThaiGiaoHang;
            ttghid[i] = item.ID_TrangThaiGiaoHang;
            i++;
        }
        for (let item of responseJson.dulieutrangthaihoantatdonhang) {
            tthtdh[item.ID_TrangThaiHoanTatDonHang] = item.TenTrangThai;
        }
        data['ttdh'] = ttdh;
        data['tttt'] = tttt;
        data['ttgh'] = ttgh;
        data['tthtdh'] = tthtdh;
        data['color'] = color;
        data['ttdhid'] = ttdhid;
        data['ttttid'] = ttttid;
        data['ttghid'] = ttghid;
        URlConfig.OBJLOGIN = data;
        console.log('login complete', URlConfig.OBJLOGIN)
    }
}


const styles = StyleSheet.create({
    absolute: {
        top: 0, bottom: 0, left: 0, right: 0, position: 'absolute',
    },
    container: {
        flex: 1,
        paddingTop: 100
    },
    textInput: {
        fontSize: 16,
        height: 40
    },
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 36
    },
    loginTextButton: {
        fontSize: 16,
        fontFamily: 'Al Nile',
        color: 'darkblue'
    }
})