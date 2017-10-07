/**
 * Created by Quoc Viet Dang on 7/4/2017.
 */
export default class Color {
    static red = '#123456';
    static backgroundNewFeed = '#7FC7BD';
    static tabbarColor = '#1695A3';
    static itemListViewColor = '#225378';
    static itemNameListViewColor = '#6AC7F1';
    static renderIconColor = '#EB7F00';
    static iconMenuColor = 'green';
    static backGroundFlatList = '#C5CAE9';
    static backGroundItemFlatList = '#E0E0E0';
}
const colors = [
    "#4344ce",
    "#40cf2e",
    "#f12942",
    "#e8c055",
    "#f800f3",
    "#76caef",
    '#2e9a48',
    "#C5CAE9"
];
let colorCustomers = {};

function getColorCustomers(id) {
    const randomColor = require('randomcolor');
    if (colorCustomers[id]) {
        colorCustomers[id] = randomColor();
    }
    return colorCustomers[id];
}

function setColorCustomer(id, color) {
    colorCustomers[id] = color;
}

function resetColorCustomer() {
    colorCustomers = {}
}

export {colors, getColorCustomers, setColorCustomer,}