import Toast from "react-native-simple-toast";

export default class Utils {
    static getMoney(n, dp) {
        if (n === undefined || n === null) {
            n = 0;
        }
        var e = '', s = e + n, l = s.length, b = n < 0 ? 1 : 0,
            i = s.lastIndexOf('.'), j = i === -1 ? l : i,
            r = e, d = s.substr(j + 1, dp);
        while ((j -= 3) > b) {
            r = ',' + s.substr(j, 3) + r;
        }
        return s.substr(0, j + 3) + r +
            (dp ? '.' + d + ( d.length < dp ?
                ('00000').substr(0, dp - d.length) : e) : e);
    };

    static formatMoney(n) {
        return n.toFixed(2)
    };

    static getPersonsInGroup(allData, allGroup, idNhom) {
        var arrGroupChild = []
        for (let item of allGroup) {
            if (item.ID_PARENT === idNhom) {
                arrGroupChild.push(item)
            }
        }
    }

    static getDate(d) {
        const moment = require('moment');
        return moment(d).format('DD-MM-YYYY HH:mm:ss');
    }

    static changeDateFormat(d, format = 'DD-MM-YYYY HH:mm:ss') {

        const moment = require('moment');
        return moment(d).format(format);
    }

}