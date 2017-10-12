let customers = {}
const randomColor = require('randomcolor');

function setCustomer(id, name, color) {

    if (color) {
        customers[id] = {
            name: name,
            color: `#${color}`
        };
    } else {
        customers[id] = {
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

export {setCustomer, getCustomer, getListCustomer}