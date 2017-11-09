let data = [
    {
        title: 'Nhân viên online',
        content: ''
    },
    {
        title: 'Doanh thu trong ngày',
        content: ''
    },
    {
        title: 'Đơn hàng trong ngày',
        content: ''
    },
    {
        title: 'Check-in trong ngày',
        content: ''
    },
]

function setData(dataFromSv) {
    data[0].content = dataFromSv.nhanvienonline
    data[1].content = dataFromSv.tongdoanhthu
    data[2].content = dataFromSv.tongdonhang
    data[3].content = dataFromSv.tongluotcheckin
}

function getData() {
    return data
}

export {data, setData, getData}