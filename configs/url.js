/**
 *
 * Created by hao on 7/7/17.
 */
import {Platform} from 'react-native'
import md5 from "react-native-md5";

export default class URlConfig {
    static getRouterApp(idct) {
        let url = 'http://sv.ksmart.vn/AppRouterServer.aspx?token=6e22b116f5111220741848ccd290e9e98402c589dd551c5d9e0c31dd0024537f&idct=';
        return url + idct;
    }

    static BASE_URL_APP = '';
    static OBJLOGIN = null;

    static getLoginRouter(username, password, idct) {
        let DeviceInfo = require('react-native-device-info');
        let os = Platform.OS === 'ios' ? 1 : 2;
        return URlConfig.BASE_URL_APP + '/AppDangNhapQT.aspx?token=' + md5.hex_md5(Date.now()) + '&trangthaigps=1&congty='

            + idct + '&taikhoan=' + username + '&matkhau=' + md5.hex_md5(password) + '&kinhdo=0&vido=0'
            + '&isFakeGPS=1&device=' + DeviceInfo.getSystemName() + '&idpush=' + DeviceInfo.getUniqueID() + '&os=' + os
            + '&ver='+DeviceInfo.getVersion()+'&accuracy=0&osversion=' + DeviceInfo.getSystemVersion() + '&dongmay=' + DeviceInfo.getModel() + '&doimay='
            + '&imei=124125125243&devicename='+DeviceInfo.getManufacturer()+'&isCheDoTietKiemPin=0'
            + '&ngaycaidat='
    }
}
