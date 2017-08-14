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

    static getNumber() {
        return 2;
    }

    static BASE_URL_APP = '';
    static OBJLOGIN = null;

    static getLoginRouter(username, password, idct) {
        let DeviceInfo = require('react-native-device-info');
        let os = Platform.OS === 'ios' ? 1 : 2;
        return URlConfig.BASE_URL_APP + '/AppDangNhapQT_v2.aspx?token=' + md5.hex_md5(Date.now()) + '&trangthaigps=1&congty='

            + idct + '&taikhoan=' + username + '&matkhau=' + md5.hex_md5(password) + '&kinhdo=0&vido=0'
            + '&isFakeGPS=1&device=' + DeviceInfo.getSystemName() + '&idpush=' + DeviceInfo.getUniqueID() + '&os=' + os
            + '&ver='+DeviceInfo.getVersion()+'&accuracy=0&osversion=' + DeviceInfo.getSystemVersion() + '&dongmay=' + DeviceInfo.getModel() + '&doimay='
            + '&imei=124125125243&devicename='+DeviceInfo.getManufacturer()+'&isCheDoTietKiemPin=0'
            + '&ngaycaidat='
    }

    static getRevenuePerson(from, to) {
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppBieuDoDoanhThuNhanVien.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idct=' + data.idcongty + '&tungay=' + from + '&denngay=' + to;
    }


    static getOnlineChartLink(date) {
        // return 'http://jav.ksmart.vn/AppBieuOnlineTrongNgay.aspx?idct=1&idquanly=47&ngay=26-07-2017'
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppBieuOnlineTrongNgay.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idct=' + data.idcongty + '&ngay=' + date;
    }

    static getTravelChartLink(dateFrom, dateTo) {
        // return 'http://jav.ksmart.vn/AppBieuOnlineTrongNgay.aspx?idct=1&idquanly=47&ngay=26-07-2017'
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppBieuDoTanSuatViengThamNhanVien.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idct=' + data.idcongty + '&tungay=' + dateFrom + '&denngay=' + dateTo;
    }

    static getLinkSendMessage(id, tieude, noidung) {
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppGuiTinNhan.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&noidung=' + noidung + '&tieude=' + tieude + '&idnhanvien=' + id + '&loai=quanlyguinhanvien'
    }
    static getNewFeedLink(page, keyWord) {
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppNewFeed_v2.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&macongty=' + data.idct + '&page=' + page + '&timkiem=' + keyWord;
    }

    static getLinkOnlinePerson() {
        //http://jav.ksmart.vn/AppBaoCaoTrangChu.aspx?token=6e22b116f5111220741848ccd290e9e9bd8757498aeff45f479463cec823a1dc&idquanly=47&macongty=LACHONG
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppBaoCaoTrangChu.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&macongty=' + data.idct;
    }

    static getListNhanVienLink(page, id, keyword) {
        let data = URlConfig.OBJLOGIN;
        if (id !== null) {
            return data.urlserver + '/AppDanhSachNhanVien_v2.aspx?token=' + '&idquanly=' + data.id + '&macongty=' + data.idct + '&page=' + page + '&idnhom=' + id + '&timkiem=' + keyword;
        }
        return data.urlserver + '/AppDanhSachNhanVien_v2.aspx?token=' + '&idquanly=' + data.id + '&macongty=' + data.idct + '&timkiem=' + keyword + '&page=' + page;
    }

    static getLinkOrderList(from, to, page, keyword) {
        // return 'http://jav.ksmart.vn/AppDanhSachDonHang.aspx?6e22b116f5111220741848ccd290e9e9e60cd16030852326e0ebdcf522be1393&idquanly=47&idct=1&from=01-05-2017&to=10-07-2017&trangthaigps=0'
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppDanhSachDonHang_v2.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idct=' + data.idcongty + '&from=' + from + '&to=' + to + '&rangthaigps=0&page=' + page + '&timkiem=' + keyword;
    }

    static getLinkTravel(dateFrom, dateTo) {
        //http://jav.ksmart.vn/AppKeHoachDiChuyen_v3.aspx?token=6e22b116f5111220741848ccd290e9e9a281184550a212fd0a896d68f16f236e&idct=1&idquanly=47&from=13-07-2017&to=&00loai=chitietcacngaycokehoach
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppKeHoachDiChuyen_v3.aspx?token=' + md5.hex_md5(Date.now()) + '&idct=' + data.idcongty + '&idquanly=' + data.id + '&from=' + dateFrom + '&to=' + dateTo + '&loai=chitietcacngaycokehoach';
    }

    static getCustomerLink(page) {
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppDanhSachCuaHang_v3.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idct=' + data.idcongty + '&lastid=' + page;
    }

    static getMessageList(from, to) {
        // return 'http://jav.ksmart.vn/AppDanhSachDonHang.aspx?6e22b116f5111220741848ccd290e9e9e60cd16030852326e0ebdcf522be1393&idquanly=47&idct=1&from=01-05-2017&to=10-07-2017&trangthaigps=0'
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppDanhSachTinNhan.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idct=' + data.idcongty + '&tungay=' + from + '&denngay=' + to;
    }

    static getChartLink(monthYear) {
        let data = URlConfig.OBJLOGIN;
        var url =
            'http://jav.ksmart.vn/AppBieuDoDoanhThu.aspx?token=' +
            '6e22b116f5111220741848ccd290e9e9bd8757498aeff45f479463cec823a1dc&idquanly=47&macongty=LACHONG&thang=06-2017'
        return data.urlserver + '/AppBieuDoDoanhThu.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&macongty=' + data.idct + '&thang=' + monthYear;
    }
    static getReportList(from, to) {
        // return 'http://jav.ksmart.vn/AppDanhSachDonHang.aspx?6e22b116f5111220741848ccd290e9e9e60cd16030852326e0ebdcf522be1393&idquanly=47&idct=1&from=01-05-2017&to=10-07-2017&trangthaigps=0'
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppBaoCaoDoanhThu.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idct=' + data.idcongty + '&tungay=' + from + '&denngay=' + to;
    }

    static getLinkLapKeHoach(obj) {
        let data = URlConfig.OBJLOGIN;
        ///AppLapKeHoach.aspx?token=6e22b116f5111220741848ccd290e9e9d1e733ac2eb6f3e8bb6a31b4bcbc4809&idquanly=47&idct=1&dulieukehoach=

        return data.urlserver + '/AppLapKeHoach.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idct=' + data.idcongty + '&dulieukehoach=' + encodeURI(JSON.stringify(obj)) + '&type=themmoikehoach';
    }

    static getLinkNhomNhanVien() {
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppDanhSachNhomQuanLy.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&macongty=' + data.idct;

    }

    static getLinkDetailNhanVien(idnhanvien) {
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppChiTietNhanVien_v2.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idct=' + data.idcongty + '&idnhanvien=' + idnhanvien;

    }

    static getLinkTopDoanhThu(dateFrom, dateTo, type) {
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppBieuDoTopDoanhThu.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&macongty=' + data.idct + '&tungay=' + dateFrom + '&denngay=' + dateTo + '&loai=' + type;

    }

    static getLinkKhongCoDoanhThu(dateFrom, dateTo) {
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppBaoCaoNhanVienKhongCoDoanhThu.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&macongty=' + data.idct + '&tungay=' + dateFrom + '&denngay=' + dateTo;

    }

    static getLinkTimKiemKhachHang(keyWord) {
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppDanhSachCuaHang_v3.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idct=' + data.idcongty + '&loctatca=' + keyWord;
    }
}
