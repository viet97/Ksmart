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

    static getPersonsInGroup(allData, allGroup, idNhom) {
        var arrGroupChild = []
        for (let item of allGroup) {
            if (item.ID_PARENT === idNhom) {
                arrGroupChild.push(item)
            }
        }
    }

    static getDate(d) {
        let date = new Date(d);
        date.setHours(date.getHours() - 7)
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        if (hours < 10) hours = '0' + hours
        if (minutes < 10) minutes = '0' + minutes
        if (seconds < 10) seconds = hours
        if (month < 10) month = '0' + month
        if (day < 10) day = '0' + day
        let dateString = day + '-' + month + '-' + date.getFullYear() + ' ' + hours + ':' + minutes + ':' + seconds
        return dateString;
    }

    static changeDateFormat(d, format = 'DD-MM-YYYY HH:mm:ss') {
        let date = new Date(d);
        date.setHours(date.getHours() - 7)
        let moment = require('moment');
        return moment(date).format(format);
    }

}