import URlConfig from "./url";

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}

if (mm < 10) {
    mm = '0' + mm
}
today = dd + '-' + mm + '-' + yyyy;

let data = [
    {
        tenloai: 'Nhân viên online',
        tongso: '',
        ScreenName: 'ListNhanVien',
        status: 1,
    },
    {
        tenloai: 'Doanh thu trong ngày',
        tongso: '',
        ScreenName: 'Report',
        trangthai: 0,
        dateFrom: today,
        dateTo: today
    },
    {
        tenloai: 'Đơn hàng trong ngày',
        tongso: '',
        ScreenName: 'Order',
        tentrangthai: '',
        status: 0,
        dateFrom: today,
        dateTo: today
    },
    {
        tenloai: 'Check-in trong ngày',
        tongso: '',
        ScreenName: 'NewFeed',
        status: 3,
    },
]

function setData(dataFromSv) {
    data[0].tongso = dataFromSv.nhanvienonline
    data[1].tongso = dataFromSv.tongdoanhthu
    data[2].tongso = dataFromSv.tongdonhang
    data[3].tongso = dataFromSv.tongluotcheckin
}

function getData() {
    return data
}

export {data, setData, getData}