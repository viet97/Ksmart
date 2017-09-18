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
            + '&ver=' + DeviceInfo.getVersion() + '&accuracy=0&osversion=' + DeviceInfo.getSystemVersion() + '&dongmay=' + DeviceInfo.getModel() + '&doimay='
            + '&imei=124125125243&devicename=' + DeviceInfo.getManufacturer() + '&isCheDoTietKiemPin=0'
            + '&ngaycaidat='
    }

    static getRevenuePerson(from, to) {
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppBieuDoDoanhThuNhanVien.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idct=' + data.idcongty + '&tungay=' + from + '&denngay=' + to;
    }


    static getOnlineChartLink(date) {
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

    static getNewFeedLink(page, keyWord, status) {

        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppNewFeed_v2.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&macongty=' + data.idct + '&page=' + page + '&timkiem=' + keyWord + '&loctrangthai=' + status;
    }

    static getLinkOnlinePerson() {
        //http://jav.ksmart.vn/AppBaoCaoTrangChu.aspx?token=6e22b116f5111220741848ccd290e9e9bd8757498aeff45f479463cec823a1dc&idquanly=47&macongty=LACHONG
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppBaoCaoTrangChu.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&macongty=' + data.idct;
    }

    static getListNhanVienLink(page, id, keyword = '', loctrangthai = -1) {

        let data = URlConfig.OBJLOGIN;
        let trangthai = ''
        let idnhom = ''
        if (loctrangthai !== -1) trangthai = '&loctrangthai=' + loctrangthai
        if (id !== null) idnhom = '&idnhom=' + id
        return data.urlserver + '/AppDanhSachNhanVien_v2.aspx?token=' + '&idquanly=' + data.id + '&macongty=' + data.idct + '&timkiem=' + keyword + idnhom + trangthai + '&page=' + page;
    }

    static getAllNhanVien() {
        //http://jav.ksmart.vn/AppBaoCaoTrangChu.aspx?token=6e22b116f5111220741848ccd290e9e9bd8757498aeff45f479463cec823a1dc&idquanly=47&macongty=LACHONG
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppDanhSachNhanVien.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&macongty=' + data.idct;
    }

    static getLinkOrderList(from, to, page, keyword) {
        // return 'http://jav.ksmart.vn/AppDanhSachDonHang.aspx?6e22b116f5111220741848ccd290e9e9e60cd16030852326e0ebdcf522be1393&idquanly=47&idct=1&from=01-05-2017&to=10-07-2017&trangthaigps=0'
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppDanhSachDonHang_v2.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idct=' + data.idcongty + '&from=' + from + '&to=' + to + '&rangthaigps=0&page=' + page + '&timkiem=' + keyword;
    }

    static getLinkDetailTravel(id) {
        // return 'http://jav.ksmart.vn/AppDanhSachDonHang.aspx?6e22b116f5111220741848ccd290e9e9e60cd16030852326e0ebdcf522be1393&idquanly=47&idct=1&from=01-05-2017&to=10-07-2017&trangthaigps=0'
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppChiTietKeHoach.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idcty=' + data.idcongty + '&idkehoach=' + id
    }

    static getLinkSoNewFeed() {
        // return 'http://jav.ksmart.vn/AppDanhSachDonHang.aspx?6e22b116f5111220741848ccd290e9e9e60cd16030852326e0ebdcf522be1393&idquanly=47&idct=1&from=01-05-2017&to=10-07-2017&trangthaigps=0'
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppSoNewFeed.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idcty=' + data.idcongty
    }

    static getLinkSoReport(dateF, dateT) {
        // return 'http://jav.ksmart.vn/AppDanhSachDonHang.aspx?6e22b116f5111220741848ccd290e9e9e60cd16030852326e0ebdcf522be1393&idquanly=47&idct=1&from=01-05-2017&to=10-07-2017&trangthaigps=0'
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppSoBaoCaoDoanhThu.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idcty=' + data.idcongty + '&tungay=' + dateF + '&denngay=' + dateT
    }

    static getLinkTravel(dateFrom, dateTo, page, status, minutes = 5, timkiem) {
        let data = URlConfig.OBJLOGIN;
        let loctrangthai = ''
        let timkiemStr = ''
        if (timkiem.length !== 0) timkiemStr = '&timkiem=' + timkiem
        switch (status) {
            case 0:
                loctrangthai = '&loctrangthai=' + status
                break
            case 1:
                loctrangthai = '&loctrangthai=' + status
                break
            case 2:
                loctrangthai = '&loctrangthai=' + status
                break
            case 3:
                loctrangthai = '&loctrangthai=' + status + '&sophut=' + minutes
                break

        }
        return data.urlserver + '/AppKeHoachDiChuyen_v4.aspx?token=' + md5.hex_md5(Date.now()) + '&idct=' + data.idcongty + '&idquanly=' + data.id + '&from=' + dateFrom + '&to=' + dateTo + '&loai=chitietcacngaycokehoach&page=' + page + loctrangthai + timkiemStr;
    }

    static getCustomerLink(page, keyword = '') {
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppDanhSachCuaHang_v3.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idct=' + data.idcongty + '&lastid=' + page + '&loctatca=' + keyword;
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

    static getReportList(from, to, page, keyword) {
        // return 'http://jav.ksmart.vn/AppDanhSachDonHang.aspx?6e22b116f5111220741848ccd290e9e9e60cd16030852326e0ebdcf522be1393&idquanly=47&idct=1&from=01-05-2017&to=10-07-2017&trangthaigps=0'
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppBaoCaoDoanhThu_v2.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idct=' + data.idcongty + '&tungay=' + from + '&denngay=' + to + '&page=' + page + '&timkiem=' + keyword;
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

    static getLinkSoNhanVien() {
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppSoNhanVien.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idcty=' + data.idcongty;

    }

    static getLinkSoKeHoach(dateF, dateT) {
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppSoKeHoach.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idcty=' + data.idcongty + '&tungay=' + dateF + "&denngay=" + dateT + '&loai=chitietcacngaycokehoach';

    }

    static getLinkKhongCoDoanhThu(dateFrom, dateTo, page, keyword) {
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppBaoCaoNhanVienKhongCoDoanhThu_v2.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&macongty=' + data.idct + '&tungay=' + dateFrom + '&denngay=' + dateTo + '&page=' + page + '&timkiem=' + keyword;

    }

    static getLinkDeleteTravel(idkehoach) {
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppXoaKeHoachDiChuyen.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idct=' + data.idcongty + '&idkehoach=' + idkehoach;
    }

    static getLinkEditTravel(obj) {
        ///AppSuaKeHoachDiChuyen.aspx?token=abc&idct=1&idquanly=47&dulieukehoach=%7B"idkehoach"%20%3A%205231%2C%20"idnhanvien"%20%3A%20317%2C%20"idkhachhang"%20%3A%202864%2C%20"thoigiandukien"%20%3A%20"18%2F08%2F2017%2012%3A12%3A12"%2C%20"thoigiancheckoutdukien"%20%3A%20"18%2F08%2F2017%2012%3A12%3A12"%7D
        let data = URlConfig.OBJLOGIN;
        return data.urlserver + '/AppSuaKeHoachDiChuyen.aspx?token=' + md5.hex_md5(Date.now()) + '&idquanly=' + data.id + '&idct=' + data.idcongty + '&dulieukehoach=' + encodeURI(JSON.stringify(obj));
    }

}
