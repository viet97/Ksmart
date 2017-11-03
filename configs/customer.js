let customers = {}
let typeCustomers = {}
const randomColor = require('randomcolor');

function setTypeCustomer(data) {
    typeCustomers = data
}

function getTypeCustomer(id) {
    for (let item of typeCustomers) {
        if (item.ID_LoaiKhachHang === id) {
            return item.TenLoaiKhachHang
        }

    }
}
function setCustomer(id, name, color) {

    if (color) {
        customers[id] = {
            id: id,
            name: name,
            color: `#${color}`
        };
    } else {
        customers[id] = {
            id: id,
            name: name,
            color: randomColor()
        };
    }
}

function getCustomer(id) {
    console.log(id, customers[id])
    return customers[id];
}

function getListCustomer() {
    return Object.values(customers);
}

export {setCustomer, getCustomer, getListCustomer, setTypeCustomer, getTypeCustomer}